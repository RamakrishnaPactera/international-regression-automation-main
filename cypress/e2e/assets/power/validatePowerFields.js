/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validate 'Search Drivers' (light grey text) within the 'Permanent Driver' field
 Authored By                   : Shashi Jaiswal
 Date                          : 22-05-2023,
 Functions/Calling References  : powerDetails, genericUtils, loginUtils
 Test case Included:
 ME-141581 : Validate 'Search Drivers' (light grey text) within the 'Permanent Driver' field (respectfully) prior to entering data in Operational Details card
 ME-158246 : Verify if the fields of Power Add New Equipment Card while adding a power are in consistency with Driver Add New Equipment Card
 ME-158247 : Verify if the fields of Power Add New Equipment Card while editing a power are in consistency with Driver Add New Equipment Card
 ME-158606 : Verify if the Equipment card for Power is added and Power is saved when these Recovered & Issued fields are given along with other required fields.
 ME-158973 : Verify mandatory fields with * symbol while creating Power in Add New Equipment Card
 ME-37605  : Power General - Operating Status and Location - Functional and UI Test Cases
 ME-159327 : Power General - Verify status value in Asset Summary card
 ME-159362 : Verify that all fields of the Power Operations - Location card is functionally enabled
 ME-159397 : Power Operations - Location - Verify the Last Ping Location field
 ME-159398 : Power Operations - Location - Verify the Last Ping Date Tm field
 ME-159399 : Power Operations - Location - Verify the Last Facility field
 ME-159400 : Power Operations - Location - Verify the Facility Location field
 ME-159401 : Power Operations - Location - Verify the saved data
 ME-159628 : Power General Information - Verify Add New Power link
 ME-159602 : Power General Information - Verify saving of General Information data
 ME-159604 : Power General Information - Verify edit functionality
 ME-159661 : Power General Information - Verify Make & Model fields
 ME-159663 : Power General Information - Verify Type & Year fields
 ME-159664 : Power General Information - Verify Display, Carb, Measurement fields
 ME-160008 : Test Power Ops Details - Verify whether all fields of Power Operational Details are functionally enabled
 ME-160012 : Test Power Ops Details - Verify the correctness of values when user click on "Class" dropdown field
 ME-160016 : Test Power Ops Details - Verify the correctness of values when user click on "Division" dropdown field
 ME-160043 : Test Power Ops Details - Verify User should be able to enter only numeric values in the "Odometer" text field
 ME-160050 : Test Power Ops Details - Verify User should not be able to enter the alphabets and special symbols in the "Odometer" field.
 ME-160058 : Test Power Ops Details - Verify the "Odometer" field value length
 ME-160060 : Test Power Ops Details - Verify "Odometer" field empty
 ME-160037 : Test Power Ops Details - Verify unique driver id in the "Permanent Driver" field
 ME-160041 : Test Power Ops Details - Verify User should be able to enter the unique trailer id in the "Permanent Trailer" text field.
 ME-160217 : Test Power Ops Details - Verify various SI units to select in the "Odometer" field.
 ME-160220 : Test Power Ops Details - Verify User should be able to see the "Permanent Driver" in a large view.
 ME-160221 : Test Power Ops Details - Verify User should be able to see the "Permanent Trailer" in a large view.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  clickAction,
  verifyAttrValueContains,
  verifyToExist,
  viewFullPage,
  waitSometime,
  getTDMData,
  typeText,
  typeDrpDwnWithMachtingText,
  getMinionValues,
  generateRandomAlphaNumByLength,
  verifyTableRowElementText,
  verifyLblHaveValue,
  verifyMandatoryFields,
  generateRandomNumberByLength,
  verifyVisible,
  verifyElementTextContains,
  clearText,
  verifyElementValue,
  verifyElementText,
  verifyElementHaveValue,
  verifyIfEnabled,
  validateDrpDwnAllOptions,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  resourcesMenu,
} from '../../../pageObjects/homePage/homePage.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import { navigateToAddPowerNewPage, verifyEquipmentFields, navigateToPowerSearch, createPowerWithMandatoryFields, submitPowerAndVerifyToastMsg } from '../../../utilities/assetUtils/resourceUtilis';
import powerSearch from '../../../pageObjects/assets/power/powerSearch/powerSearchPage.json';
import { returnTodayDateMinusOne, returntodayDateMMDDYY, getTodayDateAlongwithTime } from '../../../utilities/commonUtils/dateTimeUtils';
import addDriverData from '../../../testData/assets/driver/addDriver/addDriverData.json';
import trailerDetailsData from '../../../testData/assets/trailer/trailerDetailsData.json';

const {
  labelDisplayName,
  btnAddPower,
  permanentDriverCodesDrpDwn,
  txtDriverCode,
  tabGeneral,
  equipment,
  btnDialogSubmit,
  drpDwnOperatingStatus,
  txtLastPing,
} = powerDetails;
const {
  placeHolder,
  srchDriver,
  tdmAddPowerReq,
  tdmPowerCommonScenario,
  tdmPowerData,
  minionPowerGenEquipCode,
  minionPowerGeneralEquipCond,
  minionPowerOpStatus,
  minionPowerGenInfoMake,
  minionPowerGenInfoModel,
  minionPowerGenInfoType,
  minionGenInfoMeasurement,
  YesValue,
  minionPowerGenOpsClass,
  typeNullVal,
  minionDivision,
  maxlength,
  minionImpeUOMOdometr,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const { shortWait, longWait } = commonData;
const { linkPower, btnSearchSubmitPower, txtPowerUnitCode } = powerSearch;
const { tdmDriverCommonScenario, tdmDriverData, tdmAddDriverReq } = addDriverData.staticData;
const { tdmTrailerData, tdmTrailerReq, tdmTrailerCommonScenario } = trailerDetailsData.staticData;
let powerDataTDM, drpDwnEquipVal, drpDwnCondVal, drpDwnOpsVal, makeValue1, makeValue2, modelValue, typeValue, measureValue;
let classData, divisionData, driverDataTDM, trailerDataTDM, odometerValue;

const navigateToPower = (powerCodeVal) => {
  navigateToPowerSearch();
  typeText({ locator: txtPowerUnitCode, dataText: powerCodeVal });
  clickAction({ locator: btnSearchSubmitPower });
  clickAction({ locator: linkPower });
  waitSometime(shortWait);
};

const addPowerEquipment = ({ description: desc, issueDate: issuedDt, recoverDate: recoverDt }) => {
  typeDrpDwnWithMachtingText({ locator: equipment.drpDwnTypeTerm, drpDwnVal: drpDwnEquipVal });
  typeText({ locator: equipment.txtDesc, dataText: desc });
  typeText({ locator: equipment.txtCount, dataText: 1 });
  typeText({ locator: equipment.txtIssued, dataText: issuedDt });
  typeText({ locator: equipment.txtRecovered, dataText: recoverDt });
  typeDrpDwnWithMachtingText({ locator: equipment.drpDwnCond, drpDwnVal: drpDwnCondVal });
  clickAction({ locator: btnDialogSubmit });
};

const verifyPowerEquipment = ({ index: idx, description: desc }) => {
  verifyTableRowElementText({ locator: equipment.rowDesc, index: idx, verifyText: desc });
  verifyLblHaveValue({ locator: equipment.rowIssued });
  verifyLblHaveValue({ locator: equipment.rowRecovered });
};

const addPowerGenInfo = ({ year: yearValue, display: displayValue, carb: carbValue }) => {
  typeDrpDwnWithMachtingText({ locator: powerDetails.drpDwnMake, drpDwnVal: makeValue1 });
  typeDrpDwnWithMachtingText({ locator: powerDetails.drpDwnModelTerm, drpDwnVal: modelValue });
  typeDrpDwnWithMachtingText({ locator: powerDetails.drpdwnTypeTerm, drpDwnVal: typeValue });
  typeText({ locator: powerDetails.txtYear, dataText: yearValue });
  typeText({ locator: powerDetails.txtDisplayName, dataText: displayValue });
  typeDrpDwnWithMachtingText({ locator: powerDetails.drpDwnCarb, drpDwnVal: carbValue });
  typeDrpDwnWithMachtingText({ locator: powerDetails.drpDwnMeasure, drpDwnVal: measureValue });
};

describe('Validate `Search Drivers` (light grey text) within the `Permanent Driver` field', () => {
  before(() => {
    cy.log('***creating power using TDM***');
    getTDMData({ dataType: tdmPowerData, dataCondition: tdmAddPowerReq, dataScenario: tdmPowerCommonScenario });
    cy.then(() => {
      powerDataTDM = Cypress.env('inputVal');
    });
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.log('***creating trailer using TDM***');
    getTDMData({ dataType: tdmTrailerData, dataCondition: tdmTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM = Cypress.env('inputVal');
    });
    getMinionValues(minionPowerGenEquipCode, 1).then((resultOptions) => {
      drpDwnEquipVal = resultOptions[0];
    });
    getMinionValues(minionPowerGeneralEquipCond, 1).then((resultOptions) => {
      drpDwnCondVal = resultOptions[0];
    });
    getMinionValues(minionPowerOpStatus, 1).then((resultOptions) => {
      drpDwnOpsVal = resultOptions[0];
    });
    getMinionValues(minionPowerGenInfoMake, 2).then((resultOptions) => {
      makeValue1 = resultOptions[0];
      makeValue2 = resultOptions[1];
    });
    getMinionValues(minionPowerGenInfoModel, 1).then((resultOptions) => {
      modelValue = resultOptions[0];
    });
    getMinionValues(minionPowerGenInfoType, 1).then((resultOptions) => {
      typeValue = resultOptions[0];
    });
    getMinionValues(minionGenInfoMeasurement, 1).then((resultOptions) => {
      measureValue = resultOptions[0];
    });
    getMinionValues(minionPowerGenOpsClass, 8).then((resultOptions) => {
      classData = resultOptions;
    });
    getMinionValues(minionDivision, 7).then((resultOptions) => {
      divisionData = resultOptions;
    });
    getMinionValues(minionImpeUOMOdometr, 1).then((resultOptions) => {
      odometerValue = resultOptions[0];
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-141581 : Validate `Search Drivers` (light grey text) within the `Permanent Driver` field (respectfully) prior to entering data in Operational Details card',
    () => {
      clickAction({ locator: resourcesMenu });
      clickAction({ locator: btnAddPower });
      verifyToExist({ element: labelDisplayName });
      clickAction({ locator: permanentDriverCodesDrpDwn });
      verifyAttrValueContains({ locator: txtDriverCode, attribute: placeHolder, verifyText: srchDriver });
    });

  it('ME-158246, Verify if the fields of Power Add New Equipment Card while adding a power are in consistency with Driver Add New Equipment Card',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      clickAction({ locator: equipment.addEquipmentBtn });
      verifyEquipmentFields({ locator: equipment.modalEquipment });
    });

  it('ME-158247, Verify if the fields of Power Add New Equipment Card while editing a power are in consistency with Driver Add New Equipment Card',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToPower(powerDataTDM.powerCode);
      clickAction({ locator: tabGeneral });
      waitSometime(shortWait);
      clickAction({ locator: equipment.addEquipmentBtn });
      verifyEquipmentFields({ locator: equipment.modalEquipment });
    });

  it('[ME-158606, ME-158973] Verify if the Equipment card for Power is added and Power is saved when these Recovered & Issued fields are given along with other required fields.',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      createPowerWithMandatoryFields();
      clickAction({ locator: equipment.addEquipmentBtn });
      const fields = [equipment.spanEquipType, equipment.spanDesc, equipment.spanCount, equipment.spanIssued, equipment.spanCond];
      verifyMandatoryFields(fields);
      //add equipment
      const issueDt = returnTodayDateMinusOne();
      const recoverDt = returntodayDateMMDDYY();
      const desc = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      addPowerEquipment({ description: desc, issueDate: issueDt, recoverDate: recoverDt });
      submitPowerAndVerifyToastMsg();
      verifyPowerEquipment({ index: 0, description: desc });
    });

  it('[ME-37605, ME-159327] Power General - Operating Status and Location - Functional and UI Test Cases',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToPower(powerDataTDM.powerCode);
      typeDrpDwnWithMachtingText({ locator: drpDwnOperatingStatus, drpDwnVal: drpDwnOpsVal });
      const randomLoc = generateRandomNumberByLength({ lengthOfNum: 5 });
      typeText({ locator: txtLastPing, dataText: randomLoc });
      submitPowerAndVerifyToastMsg();
      verifyVisible({ element: powerDetails.lblStatus });
      verifyElementTextContains({ locator: powerDetails.lblStatus, verifyText: drpDwnOpsVal });
    });

  it('[ME-159362, ME-159397, ME-159398, ME-159399, ME-159400, ME-159401] Verify that all fields of the Power Operations - Location card is functionally enabled',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToPower(powerDataTDM.powerCode);
      //Verify input fields
      clearText({ locator: powerDetails.txtLastPing });
      clearText({ locator: powerDetails.txtLastPingDtTm });
      clearText({ locator: powerDetails.txtLastFac });
      clearText({ locator: powerDetails.txtFacLoc });
      const randomVal = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      const lastPing = `${randomVal} &^`;
      const lastFac = `${randomVal} ^`;
      const facLoc = `${randomVal} >`;
      const dateTime = getTodayDateAlongwithTime();
      //set data
      typeText({ locator: powerDetails.txtLastPing, dataText: lastPing });
      typeText({ locator: powerDetails.txtLastPingDtTm, dataText: dateTime });
      typeText({ locator: powerDetails.txtLastFac, dataText: lastFac });
      typeText({ locator: powerDetails.txtFacLoc, dataText: facLoc });
      submitPowerAndVerifyToastMsg();
      navigateToPower(powerDataTDM.powerCode);
      //verify values
      verifyElementValue({ locator: powerDetails.txtLastPing, verifyText: lastPing });
      verifyElementHaveValue({ locator: powerDetails.txtLastPingDtTm });
      verifyElementValue({ locator: powerDetails.txtLastFac, verifyText: lastFac });
      verifyElementValue({ locator: powerDetails.txtFacLoc, verifyText: facLoc });
    });

  it('[ME-159628, ME-159604, ME-159602, ME-159661, ME-159663, ME-159664] Power General Information - Verify saving of General Information data',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      const yearValue = new Date().getFullYear();
      const displayValue = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      //create power
      createPowerWithMandatoryFields();
      addPowerGenInfo({ year: yearValue, display: displayValue, carb: YesValue });
      submitPowerAndVerifyToastMsg();
      //update value
      typeDrpDwnWithMachtingText({ locator: powerDetails.drpDwnMake, drpDwnVal: makeValue2 });
      submitPowerAndVerifyToastMsg();
      //verify values
      verifyElementText({ locator: powerDetails.buttonMake, verifyText: makeValue2 });
      verifyElementText({ locator: powerDetails.buttonModel, verifyText: modelValue });
      verifyElementText({ locator: powerDetails.btnExpandDropDwnTypeTerm, verifyText: typeValue });
      verifyElementText({ locator: powerDetails.buttonMeasure, verifyText: measureValue });
      verifyElementText({ locator: powerDetails.buttonCarb, verifyText: YesValue });
      verifyElementValue({ locator: powerDetails.txtYear, verifyText: yearValue });
      verifyElementValue({ locator: powerDetails.txtDisplayName, verifyText: displayValue });
    });

  it('[ME-160008, ME-160012, ME-160016, ME-160043, ME-160050, ME-160058, ME-160060] Test Power Ops Details - Verify whether all fields of Power Operational Details are functionally enabled',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      //verify input fields enabled
      verifyIfEnabled({ locator: powerDetails.txtFieldPower });
      verifyIfEnabled({ locator: powerDetails.drpDwnClass });
      verifyIfEnabled({ locator: powerDetails.txtPowerOdometer });
      verifyIfEnabled({ locator: powerDetails.drpdwnPowerOdometer });
      verifyIfEnabled({ locator: powerDetails.permanentDriverCodesDrpDwn });
      verifyIfEnabled({ locator: powerDetails.drpDwnTrailer });
      verifyIfEnabled({ locator: powerDetails.drpdwnDivisionTerm });
      //verify dropdown values
      classData.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: powerDetails.drpDwnClass, locator2: powerDetails.buttonDrpDwnClass, optionsArray: classData });
      divisionData.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: powerDetails.drpdwnDivisionTerm, locator2: powerDetails.buttonDrpDwnDivision, optionsArray: divisionData });
      //validate odometer field
      verifyElementValue({ locator: powerDetails.txtPowerOdometer, verifyText: '0.00' });
      typeText({ locator: powerDetails.txtPowerOdometer, dataText: '~Power' });
      verifyElementValue({ locator: powerDetails.txtPowerOdometer, verifyText: 0 });
      typeText({ locator: powerDetails.txtPowerOdometer, dataText: 5 });
      verifyElementValue({ locator: powerDetails.txtPowerOdometer, verifyText: 5 });
      verifyAttrValueContains({ locator: powerDetails.txtPowerOdometer, attribute: maxlength, verifyText: 9 });
    });

  it('[ME-160037, ME-160041, ME-160217, ME-160220, ME-160221] Test Power Ops Details - Verify unique driver id in the "Permanent Driver" field',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      //verify odometer SI units
      typeDrpDwnWithMachtingText({ locator: powerDetails.drpDwnOdometer, drpDwnVal: odometerValue });
      verifyElementText({ locator: powerDetails.drpDwnOdometer, verifyText: odometerValue });
      //verify permanent driver fields
      clickAction({ locator: powerDetails.permanentDriverCodesDrpDwn });
      typeText({ locator: powerDetails.txtDriverCode, dataText: driverDataTDM.driverCode });
      waitSometime(longWait);
      clickAction({ locator: powerDetails.permanentDriverCodesDrpDwnChkBx });
      //verify permanent trailer fields
      clickAction({ locator: powerDetails.buttonTrailer });
      typeText({ locator: powerDetails.txtTrailerSrch, dataText: trailerDataTDM.trailerCode });
      waitSometime(longWait);
      clickAction({ locator: powerDetails.trailerCodesDrpDwnChkBx });
    });
});