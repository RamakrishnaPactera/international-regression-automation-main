/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver General Information card Details - Functional Testcases
 Test Cases List
 Authored By : Jyothi Prasad
 Date : 09-05-2023
 Functions/Calling References : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included : ME-153529 Verify no cosmetic errors in Driver Professional Information | Assets - Driver General Tab | Regression
                    : ME-153527 Add Driver Professional Information | Assets - Driver General Tab | Regression
                    : ME-153533 Edit Driver Professional Information | Assets - Driver General Tab | Regression
                    : ME-153835, ME-153843, ME-153845 Verify Driver Awards card UI design, Field validations & Mandatory fields | Assets - Driver General Tab | Regression
                    : ME-153868 Verify user can be able to add the Driver Award card details | Assets - Driver General Tab | Regression
                    : ME-153877 Verify user can be able to edit the Driver Award card details | Assets - Driver General Tab | Regression
                    : ME-153834 Verify user can be able to delete the Driver Award card details | Assets - Driver General Tab | Regression
                    : ME-31239, ME-31238 Verify user can be able to validate Driver Profile Summary details | Assets - Driver General Tab | Regression
                    : ME-154362 Verify Driver General Information card field validations | Assets - Driver General Tab | Regression
                    : ME-154361 Verify user can able to add Driver General Information card | Assets - Driver General Tab | Regression
                    : ME-154363 Verify user can able to edit Driver General Information card | Assets - Driver General Tab | Regression
                    : ME-31102 Verify user can validate Driver Equipment card | Assets - Driver General Tab | Regression
Authored By : Shashi Jaiswal, Mamatha Polapalli
Date : 17-05-2023
Test case Included:
ME-156100 : Verify Driver General Screen Alignment for General Info, Org Details and Professional Info card
ME-156101 : Verify Driver General Screen Alignment for Professional Info, Addresses and Driver Schedule card
ME-156102 : Verify Driver General Screen Alignment for Fleet relationships, Identifier & Equipment card
ME-156107 : Verify Driver General Screen Alignment for Time off, Certifications, Contacts card
ME-156108 : Verify Driver General Screen Alignment for Planned Time off, Reps card
ME-63397 : Verify Driver Add New Screen Alignment for General Info, Org Details, Professional Info card etc
----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  viewFullPage, toastWithMsg, selectItemFromButtonTypeDropDown, verifyAttrText, getMinionValues, waitSometime, dropDownIncludesTextClick, clearText, getTDMData, verifyLabelUsingMapArray,
  verifyVisible, verifyReadOnly, clickAction, verifyContains, verifyBorderColour, verifyDrpDwnAllValuesText, verifyMaxExactLength, sortArrayAsc, scrollIntoViewVerify, verifyValue, clickActionWait, clickOkOnWindowAlert, verifyDoesNotExist, verifyTextContains, typeDrpDwnWithMachtingText, typeText, generateRandomNumberByLength, verifyTextWithElemIndex, verifyIfEnabled, clearTextType, verifyAttrValueContains,
} from '../../../../../utilities/commonUtils/genericUtils';
import addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import { navigateToDriverAddNewPage, enterDriverMandatoryFields, driverSaveAction, addDriverAward, clickOptionsInKebabMenuInTable, clickDeleteInLastRow, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import { datePicker, returnfutureDateMMDDYY, returntodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import { genrateRandomName } from '../../../../../tdm/lib/utilities/utilities';
const { txtFieldDriverFirstName, txtFieldDriverLastName } = homePage;
const {
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  tdmDriverData,
} = historyData.staticData;
const {
  dayCountVal,
  monthCountVal,
  boolValueTrue,
} = historyData.userDefinedData;
const {
  driverHiredDate,
  driverTerminationDate,
  drpDwncompany,
  drpDwnProfessionalClass,
  drpDwnProfessionalType,
  partnerCode,
  trainerCode,
  lblProfInfoType,
  lblProfInfoPartner,
  lblProfInfoHireDate,
  lblProfInfoYrsOfService,
  lblProfInfoTerminationDate,
  lblProfInfoTrainer,
  lblProfInfoClass,
  lblProfInfoCompany,
  verifyPartnerCode,
  tabAwards,
  btnAwardsPlusIcon,
  drpDwnDriverAwardType,
  txtFieldAwardDesc,
  txtFieldAwardDate,
  lblAwardDescription,
  lblDriverAwardDate,
  rowDriverAwards,
  btnKebabAwards,
  menuOptionEditInKebab,
  btnAddNewContact,
  drpdwnDivisionTerm,
  lblDriverName,
  lblProfDriverCode,
  drpdwnPhoneNumCountry,
  txtFieldPhoneNumber,
  lblOtherProfileSum,
  txtFieldMiddleName,
  drpDwnSuffix,
  txtFieldNickName,
  txtDriverCode,
  txtFieldEmail,
  txtphoneNumber,
  drpdwnPhoneNumberCountry,
  lblDriverFirst,
  lblDriverMiddle,
  lblDriverLast,
  lblDriverDisplayName,
  lblDriverSuffix,
  lblDriverNickName,
  driverCodeLbl,
  lblDriverPrimaryEmail,
  labelPhoneNumber,
} = addDriverPage;
const {
  minionDrpDwndriverGeneralProfessionalClass,
  minionDrpDwndriverGeneralProfessionalType,
  valueAttr,
  lblType,
  lblPartner,
  lblHireDate,
  lblYearsOfService,
  lblCompany,
  lblClass,
  lblTerminationDate,
  lblTrainer,
  lblDescription,
  lblAwardDate,
  minionDrpDwnAwardType,
  titleAwards,
  minionDrpDwnDivision,
  lblFirst,
  lblMiddle,
  lblLast,
  lblDisplayName,
  lblSuffix,
  lblNickName,
  lblDriverCode,
  lblPrimaryEmail,
  lblMobilePhone,
  lblEquipment,
  lblCount,
  lblAssetID,
  lblIssued,
  lblRecovered,
  lblCondition,
  cssClass,
} = addDriverData.staticData;
const {
  msgUpdated,
  companyTxt,
  companyValue,
  trainerValue,
  partnerSecondTxt,
  partnerSecondValue,
  colorCodeVal,
} = addDriverData.expectedData;
const { titleEquipment, addEquipmentBtn, eqipmentDailog, lblEquipCount, lblEquipAssetID, lblEquipIssued, lblEquipRecovered, drpDwnConditionTerm, lblEquipType } = addDriverPage.equipmentDetails;
const { asterisk, typeEmptyVal, maxLength250, drpdwnCountryName, middleName, suffix, nickName, emailLength, emailSuffix, firstName, lastName, equipmentDialogTitle } = addDriverData.userDefinedData;
const { shortWait, css } = commonData;
const { tabDriverGeneral, cards, tabDriverOperations, daysInService } = driverCommonPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const locatorsGeneralInfo = [lblDriverFirst, lblDriverLast, driverCodeLbl];
const equipmentMandLbl = [lblEquipType, lblAwardDescription, lblEquipCount, lblEquipAssetID, drpDwnConditionTerm];
const awardLabelData = new Map([[drpDwnDriverAwardType, lblType], [lblAwardDescription, lblDescription], [lblDriverAwardDate, lblAwardDate]]);
let drpDwnDriverProfessionalClass, drpDwnDriverProfessionalClass1, driverDataTDM, drpDwnDriverProfessionalType, drpDwnDriverProfessionalType1, drpDwnDriverAwardOption1,
  drpDwnDriverAwardOption2, drpDwnDriverAwardOptions, generalInfoData, emailNumb, email, updatedEmail, equipmentLabelData, drpDwnDriverDivision, driverPhNum;
describe('Driver General Information - Regression Test Case Preparation and Execution [ME-153529, ME-153527, ME-153533, ME-153835, ME-153843, ME-153845, ME-153868, ME-153877, ME-153834, ME-154362, ME-154361, ME-154363, ME-31102, ME-31239, ME-149467, ME-31238, ME-133936]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    getMinionValues(minionDrpDwndriverGeneralProfessionalType, 2).then((resultOptions) => {
      drpDwnDriverProfessionalType = resultOptions[0];
      drpDwnDriverProfessionalType1 = resultOptions[1];
    });
    getMinionValues(minionDrpDwndriverGeneralProfessionalClass, 2).then((resultOptions) => {
      drpDwnDriverProfessionalClass = resultOptions[0];
      drpDwnDriverProfessionalClass1 = resultOptions[1];
    });
    getMinionValues(minionDrpDwnAwardType, 5).then(resultOptions => {
      drpDwnDriverAwardOption1 = resultOptions[0];
      drpDwnDriverAwardOption2 = resultOptions[1];
      drpDwnDriverAwardOptions = resultOptions;
    });
    getMinionValues(minionDrpDwnDivision, 3).then(resultOptions => {
      drpDwnDriverDivision = resultOptions;
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
    driverPhNum = generateRandomNumberByLength({ lengthOfNum: 10 });
  });
  it('ME-153529 Verify no cosmetic errors in Driver Professional Information | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      const profInfoLabelData = new Map([
        [lblProfInfoType, lblType],
        [lblProfInfoPartner, lblPartner],
        [lblProfInfoCompany, lblCompany],
        [lblProfInfoHireDate, lblHireDate],
        [lblProfInfoYrsOfService, lblYearsOfService],
        [lblProfInfoClass, lblClass],
        [lblProfInfoTerminationDate, lblTerminationDate],
        [lblProfInfoTrainer, lblTrainer],
      ]);
      navigateToDriverAddNewPage();
      //Verifying Professional Information field labels
      verifyLabelUsingMapArray({ map: profInfoLabelData });
    });

  it('ME-153527 Add Driver Professional Information | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and Professional Information
      enterDriverMandatoryFields();
      //Add the Driver Professional Information details
      selectItemFromButtonTypeDropDown({ locator: drpDwnProfessionalType, dropdownVal: drpDwnDriverProfessionalType });
      dropDownIncludesTextClick({ element: partnerCode, typeText: driverDataTDM.displayName, containText: driverDataTDM.displayName });
      dropDownIncludesTextClick({ element: drpDwncompany, typeText: companyTxt, containText: companyValue });
      dropDownIncludesTextClick({ element: trainerCode, typeText: trainerValue, containText: trainerValue });
      waitSometime(shortWait);
      datePicker({ dateLocator: driverHiredDate, dataText: returntodayDateMMDDYY() });
      datePicker({ dateLocator: driverTerminationDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      selectItemFromButtonTypeDropDown({ locator: drpDwnProfessionalClass, dropdownVal: drpDwnDriverProfessionalClass });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    });

  it('ME-153533 Edit Driver Professional Information | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and Professional Information
      enterDriverMandatoryFields();
      //Add the Driver Professional Information details
      selectItemFromButtonTypeDropDown({ locator: drpDwnProfessionalType, dropdownVal: drpDwnDriverProfessionalType });
      dropDownIncludesTextClick({ element: partnerCode, typeText: driverDataTDM.displayName, containText: driverDataTDM.displayName });
      dropDownIncludesTextClick({ element: drpDwncompany, typeText: companyTxt, containText: companyValue });
      dropDownIncludesTextClick({ element: trainerCode, typeText: trainerValue, containText: trainerValue });
      waitSometime(shortWait);
      datePicker({ dateLocator: driverHiredDate, dataText: returntodayDateMMDDYY() });
      datePicker({ dateLocator: driverTerminationDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      selectItemFromButtonTypeDropDown({ locator: drpDwnProfessionalClass, dropdownVal: drpDwnDriverProfessionalClass });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Edit the Driver Professional Information details
      selectItemFromButtonTypeDropDown({ locator: drpDwnProfessionalType, dropdownVal: drpDwnDriverProfessionalType1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnProfessionalClass, dropdownVal: drpDwnDriverProfessionalClass1 });
      clearText({ locator: partnerCode });
      dropDownIncludesTextClick({ element: partnerCode, typeText: partnerSecondTxt, containText: partnerSecondValue });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Verify updated values
      verifyAttrText({ locator: drpDwnProfessionalType, attribute: valueAttr, verifyText: drpDwnDriverProfessionalType1 });
      verifyAttrText({ locator: drpDwnProfessionalClass, attribute: valueAttr, verifyText: drpDwnDriverProfessionalClass1 });
      verifyAttrText({ locator: verifyPartnerCode, attribute: valueAttr, verifyText: partnerSecondValue });
    });

  it('ME-153835, ME-153843, ME-153845 Verify Driver Awards card UI design, Field validations & Mandatory fields | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //Verifying Mandatory fields in Award card
      scrollIntoViewVerify({ locator: tabAwards, containsText: titleAwards });
      clickAction({ locator: tabAwards });
      verifyVisible({ element: btnAwardsPlusIcon });
      clickAction({ locator: btnAwardsPlusIcon });
      verifyContains({ locator: drpDwnDriverAwardType, containsText: asterisk });
      verifyBorderColour({ locator: txtFieldAwardDesc, colourValue: colorCodeVal });
      verifyBorderColour({ locator: txtFieldAwardDate, colourValue: colorCodeVal });
      verifyLabelUsingMapArray({ map: awardLabelData });
      //Verifying Award type field
      drpDwnDriverAwardOptions = sortArrayAsc({ unSortedArray: drpDwnDriverAwardOptions });
      drpDwnDriverAwardOptions.unshift(typeEmptyVal);
      verifyDrpDwnAllValuesText({ drpDwnLocator: drpDwnDriverAwardType, drpDwnTextArray: drpDwnDriverAwardOptions });
      verifyMaxExactLength({ locator: txtFieldAwardDesc, maxLength: maxLength250 });
    });

  it('ME-153868 Verify user can be able to add the Driver Award card details | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields();
      //Adding a Driver Award
      addDriverAward({ drpDwnAwardType: drpDwnDriverAwardOption1 });
      //Verifying created award data
      verifyValue({ locator: rowDriverAwards, value: drpDwnDriverAwardOption1 });
      verifyValue({ locator: rowDriverAwards, value: returntodayDateMMDDYY() });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    });

  it('ME-153877 Verify user can be able to edit the Driver Award card details | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields();
      //Adding a Driver Award
      addDriverAward({ drpDwnAwardType: drpDwnDriverAwardOption1 });
      //Edit an Award
      clickOptionsInKebabMenuInTable({ kebabMenuLocator: btnKebabAwards, optionLocator: menuOptionEditInKebab, indexNumber: 1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnDriverAwardType, dropdownVal: drpDwnDriverAwardOption2 });
      clickActionWait({ locator: btnAddNewContact });
      //Verifying updated award data
      verifyValue({ locator: rowDriverAwards, value: drpDwnDriverAwardOption2 });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    });

  it('ME-153834 Verify user can be able to delete the Driver Award card details | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields();
      //Adding a Driver Award
      addDriverAward({ drpDwnAwardType: drpDwnDriverAwardOption1 });
      //Verifying created award data
      verifyValue({ locator: rowDriverAwards, value: drpDwnDriverAwardOption1 });
      verifyValue({ locator: rowDriverAwards, value: returntodayDateMMDDYY() });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Delete Driver Award
      clickDeleteInLastRow();
      clickOkOnWindowAlert();
      //Verifying record deletion
      verifyDoesNotExist({ element: btnKebabAwards });
    });

  it('ME-31239, ME-31238 Verify user can be able to validate Driver Profile Summary details | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      typeDrpDwnWithMachtingText({ locator: drpdwnPhoneNumCountry, drpDwnVal: drpdwnCountryName });
      typeText({ locator: txtFieldPhoneNumber, dataText: driverPhNum });
      selectItemFromButtonTypeDropDown({ locator: drpDwnProfessionalType, dropdownVal: drpDwnDriverProfessionalType });
      dropDownIncludesTextClick({ element: trainerCode, typeText: trainerValue, containText: trainerValue });
      selectItemFromButtonTypeDropDown({ locator: drpDwnProfessionalClass, dropdownVal: drpDwnDriverProfessionalClass });
      selectItemFromButtonTypeDropDown({ locator: drpdwnDivisionTerm, dropdownVal: drpDwnDriverDivision[0] });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Verifying details in Profile Summary
      verifyTextContains({ locator: lblDriverName, containsText: driverDataTDM.displayName });
      verifyTextContains({ locator: lblProfDriverCode, containsText: driverDataTDM.driverCode });
      verifyTextWithElemIndex({ locator: lblOtherProfileSum, indexNum: 5, verifyText: drpDwnDriverProfessionalType });
      verifyTextWithElemIndex({ locator: lblOtherProfileSum, indexNum: 6, verifyText: trainerValue });
      verifyTextWithElemIndex({ locator: lblOtherProfileSum, indexNum: 8, verifyText: drpDwnDriverProfessionalClass });
      verifyTextWithElemIndex({ locator: lblOtherProfileSum, indexNum: 9, verifyText: drpDwnDriverDivision[0] });
    });

  it('ME-154362 Verify Driver General Information card field validations | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      generalInfoData = new Map([
        [lblDriverFirst, lblFirst],
        [lblDriverMiddle, lblMiddle],
        [lblDriverLast, lblLast],
        [lblDriverDisplayName, lblDisplayName],
        [lblDriverSuffix, lblSuffix],
        [lblDriverNickName, lblNickName],
        [driverCodeLbl, lblDriverCode],
        [lblDriverPrimaryEmail, lblPrimaryEmail],
        [labelPhoneNumber, lblMobilePhone],
      ]);
      navigateToDriverAddNewPage();
      //Verify whether the all driver General Information details field are functionally enabled
      verifyIfEnabled({ locator: txtFieldDriverFirstName });
      verifyIfEnabled({ locator: txtFieldMiddleName });
      verifyIfEnabled({ locator: txtFieldDriverLastName });
      verifyIfEnabled({ locator: drpDwnSuffix });
      verifyIfEnabled({ locator: txtFieldNickName });
      verifyIfEnabled({ locator: txtDriverCode });
      verifyIfEnabled({ locator: txtFieldEmail });
      verifyIfEnabled({ locator: txtphoneNumber });
      verifyIfEnabled({ locator: drpdwnPhoneNumberCountry });
      //Verifying General Information field labels
      verifyLabelUsingMapArray({ map: generalInfoData });
      //Verifying Mandatory fields
      locatorsGeneralInfo.forEach((element) => {
        verifyContains({ locator: element, containsText: asterisk });
      });
    });

  it('ME-154361 Verify user can able to add Driver General Information card | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
    //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and General Information
      enterDriverMandatoryFields();
      clearTextType({ element: txtFieldMiddleName, typeText: middleName });
      selectItemFromButtonTypeDropDown({ locator: drpDwnSuffix, dropdownVal: suffix });
      clearTextType({ element: txtFieldNickName, typeText: nickName });
      emailNumb = generateRandomNumberByLength({ lengthOfNum: emailLength });
      email = genrateRandomName() + emailNumb + emailSuffix;
      clearTextType({ element: txtFieldEmail, typeText: email });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    });

  it('ME-154363 Verify user can able to edit Driver General Information card | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
    //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and General Information
      enterDriverMandatoryFields();
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Edit Driver
      clearTextType({ element: txtFieldDriverFirstName, typeText: firstName });
      clearTextType({ element: txtFieldDriverLastName, typeText: lastName });
      emailNumb = generateRandomNumberByLength({ lengthOfNum: emailLength });
      updatedEmail = firstName + lastName + emailNumb + emailSuffix;
      clearTextType({ element: txtFieldEmail, typeText: updatedEmail });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Verify updated values
      verifyAttrText({ locator: txtFieldDriverFirstName, attribute: valueAttr, verifyText: firstName });
      verifyAttrText({ locator: txtFieldDriverLastName, attribute: valueAttr, verifyText: lastName });
      verifyAttrText({ locator: txtFieldEmail, attribute: valueAttr, verifyText: updatedEmail });
    });

  it('ME-31102 Verify user can validate Driver Equipment card | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      equipmentLabelData = new Map([
        [lblEquipType, lblType],
        [lblAwardDescription, lblDescription],
        [lblEquipCount, lblCount],
        [lblEquipAssetID, lblAssetID],
        [lblEquipIssued, lblIssued],
        [lblEquipRecovered, lblRecovered],
        [drpDwnConditionTerm, lblCondition],
      ]);
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Veriying Equipment card
      verifyTextContains({ locator: titleEquipment, containsText: lblEquipment });
      clickAction({ locator: addEquipmentBtn });
      verifyTextContains({ locator: eqipmentDailog, containsText: equipmentDialogTitle });
      //Verifying Equipment field labels
      verifyLabelUsingMapArray({ map: equipmentLabelData });
      //Verifying mandatory fields
      equipmentMandLbl.forEach((element) => {
        verifyContains({ locator: element, containsText: asterisk });
      });
    });
});

describe('Verify Driver General Screen Card Alignment', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-156100, ME-63398, ME-156101, ME-156102, ME-156107, ME-156108] Verify Driver General Screen Alignment for General Info, Org Details, Professional Info card etc',
    () => {
      //Navigate to driver record
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      //Verify positioning & alignment
      verifyVisible({ element: cards.genInfo });
      verifyVisible({ element: cards.orgDetails });
      verifyVisible({ element: cards.opsDetails });
      verifyAttrValueContains({ locator: cards.genInfo, attribute: cssClass, verifyText: css.genInfoRow });
      verifyAttrValueContains({ locator: cards.orgDetails, attribute: cssClass, verifyText: css.genInfoRow });
      verifyAttrValueContains({ locator: cards.opsDetails, attribute: cssClass, verifyText: css.genInfoRow });
      verifyVisible({ element: cards.profInfo });
      verifyVisible({ element: cards.addresses });
      verifyVisible({ element: cards.drvSch });
      verifyAttrValueContains({ locator: cards.profInfo, attribute: cssClass, verifyText: css.profInfoRow });
      verifyAttrValueContains({ locator: cards.addresses, attribute: cssClass, verifyText: css.profInfoRow });
      verifyAttrValueContains({ locator: cards.drvSch, attribute: cssClass, verifyText: css.profInfoRow });
      verifyVisible({ element: cards.fleet });
      verifyVisible({ element: cards.identifier });
      verifyVisible({ element: cards.equipment });
      verifyAttrValueContains({ locator: cards.fleet, attribute: cssClass, verifyText: css.fleetRow });
      verifyAttrValueContains({ locator: cards.identifier, attribute: cssClass, verifyText: css.fleetRow });
      verifyAttrValueContains({ locator: cards.equipment, attribute: cssClass, verifyText: css.fleetRow });
      verifyVisible({ element: cards.timeOff });
      verifyVisible({ element: cards.certification });
      verifyVisible({ element: cards.contacts });
      verifyVisible({ element: cards.plnTOff });
      verifyVisible({ element: cards.reps });
      verifyAttrValueContains({ locator: cards.timeOff, attribute: cssClass, verifyText: css.timeOffRow });
      verifyAttrValueContains({ locator: cards.certification, attribute: cssClass, verifyText: css.timeOffRow });
      verifyAttrValueContains({ locator: cards.contacts, attribute: cssClass, verifyText: css.timeOffRow });
      verifyAttrValueContains({ locator: cards.plnTOff, attribute: cssClass, verifyText: css.timeOffRow });
      verifyAttrValueContains({ locator: cards.reps, attribute: cssClass, verifyText: css.timeOffRow });
    });
  it('[ME-63397] Verify Driver Add New Screen Alignment for General Info, Org Details, Professional Info card etc',
    () => {
      //Navigate to driver record
      navigateToDriverAddNewPage();
      //Verify positioning & alignment
      verifyVisible({ element: cards.genInfo });
      verifyVisible({ element: cards.orgDetails });
      verifyVisible({ element: cards.opsDetails });
      verifyAttrValueContains({ locator: cards.genInfo, attribute: cssClass, verifyText: css.genInfoRow });
      verifyAttrValueContains({ locator: cards.orgDetails, attribute: cssClass, verifyText: css.genInfoRow });
      verifyAttrValueContains({ locator: cards.opsDetails, attribute: cssClass, verifyText: css.genInfoRow });
      verifyVisible({ element: cards.profInfo });
      verifyVisible({ element: cards.addresses });
      verifyVisible({ element: cards.drvSch });
      verifyAttrValueContains({ locator: cards.profInfo, attribute: cssClass, verifyText: css.profInfoRow });
      verifyAttrValueContains({ locator: cards.addresses, attribute: cssClass, verifyText: css.profInfoRow });
      verifyAttrValueContains({ locator: cards.drvSch, attribute: cssClass, verifyText: css.profInfoRow });
      verifyVisible({ element: cards.identifier });
      verifyVisible({ element: cards.equipment });
      verifyAttrValueContains({ locator: cards.identifier, attribute: cssClass, verifyText: css.fleetRow });
      verifyAttrValueContains({ locator: cards.equipment, attribute: cssClass, verifyText: css.fleetRow });
      verifyVisible({ element: cards.timeOff });
      verifyVisible({ element: cards.certification });
      verifyVisible({ element: cards.contacts });
      verifyVisible({ element: cards.plnTOff });
      verifyAttrValueContains({ locator: cards.timeOff, attribute: cssClass, verifyText: css.timeOffRow });
      verifyAttrValueContains({ locator: cards.certification, attribute: cssClass, verifyText: css.timeOffRow });
      verifyAttrValueContains({ locator: cards.contacts, attribute: cssClass, verifyText: css.timeOffRow });
      verifyAttrValueContains({ locator: cards.plnTOff, attribute: cssClass, verifyText: css.timeOffRow });
    });
  it('ME-133936 Verify Service field as a read-only field in status card - Driver Operational Details - Regression Testcase | Assets - Driver Add New - Operational Details | Regression',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and General Information
      const { driverCode } = enterDriverMandatoryFields(false);
      driverSaveAction();
      searchDriverWithCode({ driverCode });
      clickActionWait({ locator: tabDriverOperations });
      verifyReadOnly({ locator: daysInService, condition: boolValueTrue });
    });
});