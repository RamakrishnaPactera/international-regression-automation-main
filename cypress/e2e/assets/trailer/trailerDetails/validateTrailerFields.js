/*---------------------------------------------------------------------------------------------------------------
Test Equipment modals consistency with Driver, Trailer, & Power_UI Testcases
Test Cases List
Authored By                   : Shashi Jaiswal
Date                          : 24-05-2023
Functions/Calling References  : genericUtils,resourceUtilis,trailerDetailsData,trailerPage
Test case Included:
ME-158243 : Verify if the fields of Trailer Add New Equipment Card while adding a trailer are in consistency with Driver Add New Equipment Card
ME-158245 : Verify if the fields of Trailer Add New Equipment Card while editing a Trailer are in consistency with Driver Add New Equipment Card
ME-158598 : Verify if the Equipment card for trailer is added and trailer is saved when Recovered and Issued fields are visible and also given with data along with other required fields.
ME-158604 : Verify if the Equipment card for trailer is added and trailer is saved when Recovered & Issued fields are visible and also given with data along with other required fields while editing a trailer.
ME-158919 : Verify mandatory fields with * symbol in the Trailer Add New Equipment Card
ME-158931 : Verify mandatory fields with * symbol while editing Trailer in Add New Equipment Card
ME-158988 : Verify Recovered & Issued fields in Equipment card grid while creating a Trailer.
ME-158991 : Verify Recovered & Issued fields in Equipment card grid while editing a Trailer.
ME-160720 : Trailer Specs - Verify whether all the fields under Trailer Specs section are functionally enabled
ME-160724 : Trailer Specs - Verify Length text Field
ME-160728 : Trailer Specs - Verify Length measurement dropdown field
ME-160733 : Trailer Specs - Verify External Width Field
ME-160739 : Trailer Specs - Verify External Width measurement dropdown field
ME-160743 : Trailer Specs - Verify GVWR Field
ME-160751 : Trailer Specs - Verify GVWR measurement dropdown field
ME-160758 : Trailer Specs - Verify Weight Field
ME-160764 : Trailer Specs - Verify Weight measurement dropdown field
ME-160768 : Trailer Specs - Verify Front Interior Height Field
ME-160771 : Trailer Specs - Verify Front Interior Height measurement dropdown field
ME-160974 : Trailer Specs - Verify GAWR Field
ME-160975 : Trailer Specs - Verify GAWR measurement dropdown field
ME-160982 : Trailer Specs - Verify Rear Interior Height Field
ME-160986 : Trailer Specs - Verify Rear Interior Height measurement dropdown field
ME-160989 : Trailer Specs - Verify Interior Width Field
ME-160991 : Trailer Specs - Verify Interior Width measurement dropdown field
ME-160993 : Trailer Specs - Verify Door Width Field
ME-160996 : Trailer Specs - Verify Door Width measurement dropdown field
ME-160997 : Trailer Specs - Verify Landing Gear Field
ME-160998 : Trailer Specs - Verify Suspension Field
ME-161228 : Trailer Specs - Verify Liftgate Type field
ME-161229 : Trailer Specs - Verify Axle Type field
ME-161230 : Trailer Specs - Verify Axle Count field
ME-161231 : Trailer Specs - Verify E-Tracks field
ME-160719 : Trailer Specs - Verify the fields displayed under Trailer Specs Section
ME-161232 : Test Trailer Specs - Container : Verify Length field
ME-161233 : Test Trailer Specs - Container : Verify Length dropdown field
ME-161234 : Test Trailer Specs - Container : Verify Exterior Height field
ME-161297 : Test Trailer Specs - Container : Verify Exterior height dropdown field
ME-161299 : Test Trailer Specs - Container : Verify GVWR field
ME-161301 : Test Trailer Specs - Container : Verify GVWR dropdown field
ME-161306 : Test Trailer Specs - Container : Verify Weight field
ME-161307 : Test Trailer Specs - Container : Verify Weight dropdown field
ME-161309 : Test Trailer Specs - Container : Verify Landing Gear field
ME-161310 : Test Trailer Specs - Container : Verify Suspension field
ME-161690 : Test Trailer Specs - Container : Verify Exterior Width field
ME-161707 : Test Trailer Specs - Container : Verify Exterior width dropdown field
----------------------------------------------------------------------------------------------------------*/
import {
  clickAction,
  viewFullPage,
  getTDMData,
  waitSometime,
  generateRandomAlphaNumByLength,
  getMinionValues,
  typeDrpDwnWithMachtingText,
  typeText,
  verifyTableRowElementText,
  verifyLblHaveValue,
  verifyMandatoryFields,
  verifyIfEnabled,
  scrollIntoView,
  validateSpecNumField,
  validateDrpDwnAllOptions,
  verifyElementValue,
  verifyVisible,
  verifyElementText,
} from '../../../../utilities/commonUtils/genericUtils';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { navigateToAddTrailer, searchTrailerWithCode, verifyEquipmentFields, createTrailerWithMandatoryFields, saveTrailer } from '../../../../utilities/assetUtils/resourceUtilis';
import trailerDetailsData from '../../../../testData/assets/trailer/trailerDetailsData.json';
import trailerPage from '../../../../pageObjects/assets/trailer/trailerPage.json';
import { returnTodayDateMinusOne, returntodayDateMMDDYY } from '../../../../utilities/commonUtils/dateTimeUtils';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  equipment,
  tabTrailerGeneral,
  btnSaveModal,
  specs,
  spec,
} = trailerPage;
const { shortWait } = commonData;
const {
  tdmTrailerData,
  tdmTrailerReq,
  tdmTrailerCommonScenario,
  minionTrailerEquipCode,
  minionTrailerEquipCond,
  typeAdjustableChasis,
  minionTrailerLanGear,
  minionTrailerSusp,
  minionTrailerLiftgateType,
  minionTrailerAxleType,
  minionTrailerETracks,
  specDetailsEle,
  typeContainer,
} = trailerDetailsData.staticData;
const { minionImpDimensionsUOM, minionImpWeightUOM } = trailerDetailsData;
let trailerDataTDM, drpDwnEquipVal, drpDwnCondVal, dimensionData, weightData, gearData, suspData, liftGateData, axleData, eTracksData;

const addTrailerEquipment = ({ description: desc, issueDate: issuedDt, recoverDate: recoverDt }) => {
  typeDrpDwnWithMachtingText({ locator: equipment.drpDwnTypeTerm, drpDwnVal: drpDwnEquipVal });
  typeText({ locator: equipment.txtDesc, dataText: desc });
  typeText({ locator: equipment.txtCount, dataText: 1 });
  typeText({ locator: equipment.txtIssued, dataText: issuedDt });
  typeText({ locator: equipment.txtRecovered, dataText: recoverDt });
  typeDrpDwnWithMachtingText({ locator: equipment.drpDwnCond, drpDwnVal: drpDwnCondVal });
  clickAction({ locator: btnSaveModal });
};

const verifyTrailerEquipment = ({ index: idx, description: desc }) => {
  verifyTableRowElementText({ locator: equipment.rowDesc, index: idx, verifyText: desc });
  verifyLblHaveValue({ locator: equipment.rowIssued });
  verifyLblHaveValue({ locator: equipment.rowRecovered });
};

describe('Test Equipment modals consistency with Driver, Trailer, & Power_UI Testcases', () => {
  before(() => {
    cy.log('***creating trailer using TDM***');
    getTDMData({ dataType: tdmTrailerData, dataCondition: tdmTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM = Cypress.env('inputVal');
    });
    getMinionValues(minionTrailerEquipCode, 1).then((resultOptions) => {
      drpDwnEquipVal = resultOptions[0];
    });
    getMinionValues(minionTrailerEquipCond, 1).then((resultOptions) => {
      drpDwnCondVal = resultOptions[0];
    });
    getMinionValues(minionImpDimensionsUOM, 2).then((resultOptions) => {
      dimensionData = resultOptions;
    });
    getMinionValues(minionImpWeightUOM, 4).then((resultOptions) => {
      weightData = resultOptions;
    });
    getMinionValues(minionTrailerLanGear, 3).then((resultOptions) => {
      gearData = resultOptions;
    });
    getMinionValues(minionTrailerSusp, 5).then((resultOptions) => {
      suspData = resultOptions;
    });
    getMinionValues(minionTrailerLiftgateType, 4).then((resultOptions) => {
      liftGateData = resultOptions;
    });
    getMinionValues(minionTrailerAxleType, 7).then((resultOptions) => {
      axleData = resultOptions;
    });
    getMinionValues(minionTrailerETracks, 1).then((resultOptions) => {
      eTracksData = resultOptions[0];
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-158243, ME-160686,  Verify if the fields of Trailer Add New Equipment Card while adding a trailer are in consistency with Driver Add New Equipment Card',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      clickAction({ locator: equipment.addEquipmentBtn });
      verifyEquipmentFields({ locator: equipment.modalEquipment });
    });

  it('ME-158245, Verify , if the fields of Trailer Add New Equipment Card while editing a Trailer are in consistency with Driver Add New Equipment Card',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      searchTrailerWithCode({ trailerCode: trailerDataTDM.trailerCode });
      clickAction({ locator: tabTrailerGeneral });
      waitSometime(shortWait);
      clickAction({ locator: equipment.addEquipmentBtn });
      verifyEquipmentFields({ locator: equipment.modalEquipment });
    });

  it('[ME-158598, ME-158604, ME-158988, ME-158991] : Verify if the Equipment card for trailer is added and trailer is saved when Recovered and Issued fields are visible and also given with data along with other required fields while creating and editing a trailer.',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      const trailerCode = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      createTrailerWithMandatoryFields(trailerCode);
      clickAction({ locator: equipment.addEquipmentBtn });
      //add equipment
      const issueDt = returnTodayDateMinusOne();
      const recoverDt = returntodayDateMMDDYY();
      const desc = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      addTrailerEquipment({ description: desc, issueDate: issueDt, recoverDate: recoverDt });
      saveTrailer();
      //verify trailer
      searchTrailerWithCode({ trailerCode });
      clickAction({ locator: tabTrailerGeneral });
      waitSometime(shortWait);
      verifyTrailerEquipment({ index: 0, description: desc });
      clickAction({ locator: equipment.addEquipmentBtn });
      const desc2 = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      addTrailerEquipment({ description: desc2, issueDate: issueDt, recoverDate: recoverDt });
      saveTrailer();
      verifyTrailerEquipment({ index: 1, description: desc2 });
    });

  it('[ME-158919, ME-158931] Verify mandatory fields with * symbol while creating and editing Trailer in Add New Equipment Card',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      //Creating trailer
      navigateToAddTrailer();
      clickAction({ locator: equipment.addEquipmentBtn });
      const fields = [equipment.spanEquipType, equipment.spanDesc, equipment.spanCount, equipment.spanIssued, equipment.spanCond];
      verifyMandatoryFields(fields);
      //Editing trailer
      searchTrailerWithCode({ trailerCode: trailerDataTDM.trailerCode });
      clickAction({ locator: tabTrailerGeneral });
      waitSometime(shortWait);
      clickAction({ locator: equipment.addEquipmentBtn });
      verifyMandatoryFields(fields);
    });

  it('[ME-160720, ME-160724, ME-160728, ME-160733, ME-160739, ME-160743, ME-160751, ME-160758, ME-160764, ME-160768, ME-160771], Trailer Specs - Verify whether all the fields under Trailer Specs section are functionally enabled',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      typeDrpDwnWithMachtingText({ locator: trailerPage.drpDwnTypeTerm, drpDwnVal: typeAdjustableChasis });
      verifyIfEnabled({ locator: specs.txtLength });
      verifyIfEnabled({ locator: specs.txtExtWidth });
      verifyIfEnabled({ locator: specs.txtGvwr });
      verifyIfEnabled({ locator: specs.txtGawr });
      verifyIfEnabled({ locator: specs.txtWeight });
      verifyIfEnabled({ locator: specs.txtFIntHeight });
      verifyIfEnabled({ locator: specs.txtRIntHeight });
      verifyIfEnabled({ locator: specs.txtIntrWidth });
      verifyIfEnabled({ locator: specs.txtDoorWidth });
      verifyIfEnabled({ locator: specs.drpDwnLandingGear });
      verifyIfEnabled({ locator: specs.drpDwnSuspension });
      scrollIntoView({ locator: specs.txtLength });
      //validate numeric & dropdowns fields
      validateSpecNumField({ locator: specs.txtLength, drpDwn: specs.drpDwnLength, drpBtn: specs.btnDrpDwnLength, optArray: dimensionData });
      validateSpecNumField({ locator: specs.txtExtWidth, drpDwn: specs.drpDwnExtWidth, drpBtn: specs.btnDrpDwnExtWidth, optArray: dimensionData });
      validateSpecNumField({ locator: specs.txtGvwr, drpDwn: specs.drpDwnGvwr, drpBtn: specs.btnDrpDwnGvwr, optArray: weightData });
      validateSpecNumField({ locator: specs.txtWeight, drpDwn: specs.drpDwnWeight, drpBtn: specs.btnDrpDwnWeight, optArray: weightData });
      validateSpecNumField({ locator: specs.txtFIntHeight, drpDwn: specs.drpDwnFIntHeight, drpBtn: specs.btnDrpDwnFIntHeight, optArray: dimensionData });
    });

  it('[ME-160974, ME-160975, ME-160982, ME-160986, ME-160989, ME-160991, ME-160993, ME-160996, ME-160997, ME-160998], Trailer Specs - Verify different spec fields',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      typeDrpDwnWithMachtingText({ locator: trailerPage.drpDwnTypeTerm, drpDwnVal: typeAdjustableChasis });
      scrollIntoView({ locator: specs.txtLength });
      //validate numeric & dropdowns fields
      validateSpecNumField({ locator: specs.txtGawr, drpDwn: specs.drpDwnGawr, drpBtn: specs.btnDrpDwnGawr, optArray: weightData });
      validateSpecNumField({ locator: specs.txtRIntHeight, drpDwn: specs.drpDwnRIntHeight, drpBtn: specs.btnDrpDwnRIntHeight, optArray: dimensionData });
      validateSpecNumField({ locator: specs.txtIntrWidth, drpDwn: specs.drpDwnIntrWidth, drpBtn: specs.btnDrpDwnIntrWidth, optArray: dimensionData });
      validateSpecNumField({ locator: specs.txtDoorWidth, drpDwn: specs.drpDwnWidth, drpBtn: specs.btnDrpDwnWidth, optArray: dimensionData });
      validateDrpDwnAllOptions({ locator1: specs.drpDwnLandingGear, locator2: specs.btnDrpDwnLandingGear, optionsArray: gearData });
      validateDrpDwnAllOptions({ locator1: specs.drpDwnSuspension, locator2: specs.btnDrpDwnSuspension, optionsArray: suspData });
    });

  it('[ME-161228, ME-161229, ME-161230, ME-161231, ME-160719], Trailer Specs - Verify Liftgate, Axle Type, Axle Count, E-Tracks field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      typeDrpDwnWithMachtingText({ locator: trailerPage.drpDwnTypeTerm, drpDwnVal: typeAdjustableChasis });
      scrollIntoView({ locator: specs.txtLength });
      //validate spec labels
      specDetailsEle.forEach((element) => {
        const elementLoc = `${spec.trailerSpecFieldLabelFirst}${element}${spec.trailerSpecFieldLabelSecond}`;
        verifyVisible({ element: elementLoc });
        verifyIfEnabled({ locator: elementLoc });
      });
      //validate numeric & dropdowns fields
      validateDrpDwnAllOptions({ locator1: specs.drpDwnLiftGType, locator2: specs.btnDrpDwnLiftGType, optionsArray: liftGateData });
      validateDrpDwnAllOptions({ locator1: specs.drpDwnAxleType, locator2: specs.btnDrpDwnAxleType, optionsArray: axleData });
      typeText({ locator: specs.txtAxleCount, dataText: trailerDetailsData.expectedData.permanentDriver });
      verifyElementValue({ locator: specs.txtAxleCount, verifyText: '' });
      typeText({ locator: specs.txtAxleCount, dataText: 5 });
      verifyElementValue({ locator: specs.txtAxleCount, verifyText: 5 });
      typeDrpDwnWithMachtingText({ locator: specs.drpDwnETracks, drpDwnVal: eTracksData });
      verifyElementText({ locator: specs.btnDrpDwnETracks, verifyText: eTracksData });
    });

  it('[ME-161232, ME-161233, ME-161234, ME-161297, ME-161299, ME-161301], Test Trailer Specs - Container : Verify Length, Exterior height, GVWR field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      typeDrpDwnWithMachtingText({ locator: trailerPage.drpDwnTypeTerm, drpDwnVal: typeContainer });
      scrollIntoView({ locator: specs.txtLength });
      const dimVal = dimensionData[0];
      typeText({ locator: specs.txtLength, dataText: 5 });
      verifyElementValue({ locator: specs.txtLength, verifyText: 5 });
      typeDrpDwnWithMachtingText({ locator: specs.drpDwnLength, drpDwnVal: dimVal });
      verifyElementText({ locator: specs.btnDrpDwnLength, verifyText: dimVal });
      validateSpecNumField({ locator: specs.txtExteriorHeight, drpDwn: specs.drpDwnExtHeight, drpBtn: specs.btDdrpDwnExtHeight, optArray: dimensionData });
      validateSpecNumField({ locator: specs.txtGvwr, drpDwn: specs.drpDwnGvwr, drpBtn: specs.btnDrpDwnGvwr, optArray: weightData });
    });

  it('[ME-161306, ME-161307, ME-161309, ME-161310, ME-161690, ME-161707], Test Trailer Specs - Container : Verify Weight, Exterior width, Landing gear, Suspension fields',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      typeDrpDwnWithMachtingText({ locator: trailerPage.drpDwnTypeTerm, drpDwnVal: typeContainer });
      validateSpecNumField({ locator: specs.txtWeight, drpDwn: specs.drpDwnWeight, drpBtn: specs.btnDrpDwnWeight, optArray: weightData });
      validateDrpDwnAllOptions({ locator1: specs.drpDwnLandingGear, locator2: specs.btnDrpDwnLandingGear, optionsArray: gearData });
      validateDrpDwnAllOptions({ locator1: specs.drpDwnSuspension, locator2: specs.btnDrpDwnSuspension, optionsArray: suspData });
      validateSpecNumField({ locator: specs.txtExtWidth, drpDwn: specs.drpDwnExtWidth, drpBtn: specs.btnDrpDwnExtWidth, optArray: dimensionData });
    });
});