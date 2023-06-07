/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Driver General Information - Create Driver with mandatory fields and general infotmation and edit Driver
 Test Cases List
 Authored By : Jyothi Prasad, PruthviRaj, Sanjeev, SathyaDEV
 Date : 12-04-2023,
 Functions/Calling References : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included : ME-137405 Verify user can be able to add and edit the Driver General Information card details | Assets - Driver General Tab | Regression
                    : ME-137407 Verify Driver Operational Details - Regression Testcase | Assets - Driver Add New - Operational Details | Regression
                    : ME-137399 Verify Driver Operational Details - Regression Test case Preparation and Execution | Assets - Driver Add New - Operational Details | Regression
                    : ME-137402 Verify user can be able to add and edit the Driver Personal Information card details | Assets - Driver General Tab | Regression
                    : ME-137396 Verify user can be able to add, edit and delete driver address details in Driver Address card details | Assets - Driver Address Tab | Regression
                    : ME-154714, ME-154723, ME-154719, ME-137398 Verify user can be able to add driver time-off details in Driver Time off card details | Assets - Driver Address Tab | Regression
                    : ME-154726 Verify user can be able to click Cancel button on Delete popup in Driver Time off card details | Assets - Driver Address Tab | Regression
                    : ME-137403 Verify user can be able to add and edit the Driver Professional Information details | Assets - Driver General Tab | Regression
                    : ME-137395 Verify user can be able to add and edit the Driver Contact Details| Assets - Driver General Tab | Regression
                    : ME-137400 Verify user can be able to add, edit and delete driver identifier card details | Assets - Driver Address Tab | Regression
                    : ME-137401 Verify user can be able to add and edit the Driver Organizational Details| Assets - Driver General Tab | Regression
                    : ME-28146 Verify Organizational Details fields  validation | Assets - Driver General Tab | Regression
                    : ME-29790 Verify the Test Driver General Information - Functional Testcase | Assets - Driver General Tab | Regression
                    : ME-29941 Verify Driver Professional Information fields validation | Assets - Driver General Tab | Regression
                    : ME-30120 Verify Driver Address Details fields validation | Assets - Driver General Tab | Regression
                    : ME-29925 Verify Driver General Information fields validation | Assets - Driver General Tab | Regression
                    : ME-31098 Verify user can be able to add and edit the Driver Award card details | Assets - Driver General Tab | Regression
                    : ME-28243 Verify Driver Operational Details - Functional and UI Testcase | Assets - Driver General Tab | Regression
                    : ME-28382 Verify the Driver Time-Off Details - Functional and UI Testcase | Assets - Driver Time-Off Tab | Regression
                    : ME-138200 - Verify user is able to Add data in professional information card when user have scope/permission to Edit and also View
----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  viewFullPage, toastWithMsg, verifyMaxExactLength, selectItemFromButtonTypeDropDown, clearTextType, clickAction, verifyAttrText, getMinionValues, waitSometime,
  verifyElementTextContains, dropDownIncludesTextClick, clearText, getTDMData, verifyTextContains, sortArrayAsc, verifyAttrValueContains, dropDownContainsValueCheckBoxSelection,
  verifySingleSelectDropDownFunction, selectValueDropDownInputType, selectItemFromDropDown, textClear, scrollIntoView, typeDrpDwnWithMachtingText, typeText, typeDropDwn,
  verifyClosePopup, clickOkOnWindowAlert, verifyIfEnabled, verifyEmailID, verifyIfDisabled, verifyContains, verifyToolTips, verifyDrpDwnAllValuesText, clickOkOnWindowAlertConfirm,
  verifyLengthOfText, verifyBorderColour, verifyLabelUsingMapArray, clickActionWait, validateDropDownFunction, clickCancelOnWindowAlertConfirm, verifyExists,
} from '../../../../../utilities/commonUtils/genericUtils';
import addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import { genrateRandomName, generateRandomNumberByLength, generateRandomAlphaNumByLength } from '../../../../../tdm/lib/utilities/utilities';
import { navigateToDriverAddNewPage, enterDriverMandatoryFields, driverSaveAction, addDriverPersonalInfo, addIdentifier, clickEditInIdentifier, addAddress, clickDeleteAddress, clickDeleteInFirstRow, addDriverAward, clickOptionsInKebabMenuInTable, addTimeOff, clickEditTimeOff, verifyRowData, clickDeleteInLastRow } from '../../../../../utilities/assetUtils/resourceUtilis';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import { datePicker, returnfutureDateMMDDYY, returntodayDateMMDDYY, getPastYearDateWithYear, verifyTodayDateMMDDYY, verifyfutureDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
const { colorCodeVal } = crmIndustryData.expectedData;
const { txtFieldDriverFirstName, txtFieldDriverLastName, btnDriverSave, txtFieldAddDriverCode } = homePage;

const {
  tdmAddPowerData,
  tdmAddPowerReq,
  tdmAddTrailerData,
  tdmAddTrailerReq,
  tdmPowerCommonScenario,
  tdmTrailerCommonScenario,
} = historyData.staticData;
const {
  dayCountVal,
  monthCountVal,
} = historyData.userDefinedData;
const {
  timeOffStartDate,
  timeOffEndDate,
  drpDwnGenderPronoun,
  drpDwnMaritalStatus,
  btnAddNewContact,
  btnContactsAddNew,
  btnKabobMenu,
  deleteButton,
  driverFirstName,
  driverHiredDate,
  driverLastName,
  driverTerminationDate,
  drpDwnBusinessUnits,
  drpDwncompany,
  drpdwnContactsCountry,
  drpdwnContactType,
  drpdwnDivisionTerm,
  drpdwnFaxNumberCountry,
  drpdwnImService,
  drpDwnPersonalInfoType,
  drpdwnPhoneNumberCountry,
  drpDwnProfessionalClass,
  drpDwnProfessionalType,
  drpDwnStatus,
  drpDwnSuffix,
  editButton,
  IsPayContactAllowedParty,
  mainCheckbox,
  partnerCode,
  toolTipFirstName,
  toolTipLastName,
  trainerCode,
  txtContactsEmailAddress,
  txtContactsfaxNumberExtn,
  txtContactsPhoneExtn,
  txtContactsPhoneNumber,
  txtDriverCode,
  txtFieldEmail,
  txtFieldMiddleName,
  txtFieldNickName,
  txtImUsername,
  txtNewContactName,
  txtphoneNumber,
  btnDialogSubmit,
  divYearsOfService,
  lblProfInfoType,
  lblProfInfoPartner,
  lblProfInfoHireDate,
  lblProfInfoYrsOfService,
  lblAddressType,
  lblAddressCountry,
  lblAddressStreet1,
  lblAddressCity,
  lblAddressPostCode,
  btnAddressAddNew,
  lblGenInfoMidName,
  lblGenInfoDisplayName,
  lblGenInfoSuffix,
  lblGenInfoNickName,
  lblGenInfoDriverCode,
  lblGenInfoEmail,
  labelPhoneNumber,
  verifyPartnerCode,
  tabAwards,
  drpDwnDriverAwardType,
  txtFieldAwardDesc,
  txtFieldAwardDate,
  btnAwardsPlusIcon,
  btnCloseIcon,
  lblAwardDescription,
  lblDriverAwardDate,
  btnKebabAwards,
  menuOptionEditInKebab,
  menuOptionDeleteInKebab,
  drpDwnHosRule,
} = addDriverPage;
const {
  drpDwnDetailsPermanentPower,
  drpDwnHosRuleTerm,
  drpDwnHosRuleTermBtn,
  drpDwnOpDetailsStatus,
  drpDwnStatusValue,
  drpDwnOpDetailsStatusBtn,
  drpDwnpermanentTrailer,
  drpDwnPermanentTrailerValue,
  labelHOSRule,
  labelPermanentPower,
  labelPermanentTrailers,
  labelStatus,
  titleOperationalDetails,
} = addDriverPage.operationalDetails;
const {
  btnPlannedTimeOffPlus,
  dropdwnType,
  titleTimeOff,
  txtFieldEndDate,
  txtFieldNote,
  txtFieldStartDate,
  txtFieldNoteTxt,
  btnTimeOffSave,
  rowDriverTimeOff,
  timeOffType,
} = addDriverPage.timeOff;
const {
  txtHeaderAddContacts,
} = addDriverPage.contacts;
const {
  asterickSymbol,
  contactType,
  drpdwnCountryName,
  emailLength,
  emailSuffix,
  emailUpdated,
  emailValue,
  faxExtn,
  firstName,
  imServiceType,
  lastName,
  maxLength100,
  maxLength25,
  maxLength500,
  maxLength60,
  middleName,
  nickName,
  operationalDetailslabelValue,
  suffix,
  suffixDrpDwnValues,
  titleOperationalDetailsValue,
  tooltipFirstName,
  tooltipLastName,
  typeEmptyVal,
  yearsOfService,
} = addDriverData.userDefinedData;
const {
  defaultAddressType,
  defaultIdentifierType,
  minionDrpDwnDivision,
  minionDrpDwnBusinessUnit,
  defaultTimeOffType,
  timeOffVacation,
} = generalData.staticData;
const { asterisk } = generalData.userDefinedData;
const {
  minionDriverGeneralTimeOff,
  minionDrpDwnDriverGeneralOpDetailsHOS,
  minionDrpDwnDriverGeneralOpDetailsStatus,
  minionDrpDwndriverGeneralProfessionalClass,
  minionDrpDwndriverGeneralProfessionalType,
  minionDrpDwnDriverStatus,
  minionDrpDwnDriverType,
  titleAttr,
  titleTimeOffValue,
  txtHeaderAddPlannedTimeOff,
  typeAttr,
  valueAttr,
  lblType,
  lblPartner,
  lblHireDate,
  lblYearsOfService,
  lblCountry,
  lblStreetAddress,
  lblCity,
  lblPostCode,
  lblFirst,
  lblMiddle,
  lblLast,
  lblDisplayName,
  lblSuffix,
  lblNickName,
  lblDriverCode,
  lblPrimaryEmail,
  lblMobilePhone,
  minionDrpDwnAwardType,
  lblDescription,
  lblAwardDate,
  lblStartDate,
  lblEndDate,
} = addDriverData.staticData;
const {
  emptyData,
  msgUpdated,
  partnerTxt,
  partnerValue,
  companyTxt,
  companyValue,
  trainerValue,
  partnerSecondTxt,
  partnerSecondValue,
} = addDriverData.expectedData;
const locatorsHomepage = [txtFieldDriverFirstName, txtFieldDriverLastName, txtFieldAddDriverCode];
const locatorsAddress = [lblAddressType, lblAddressCountry, lblAddressStreet1, lblAddressCity, lblAddressPostCode];
const profInfoLabelData = new Map([[lblProfInfoType, lblType], [lblProfInfoPartner, lblPartner], [lblProfInfoHireDate, lblHireDate], [lblProfInfoYrsOfService, lblYearsOfService]]);
const addressDetailsData = new Map([[lblAddressType, lblType], [lblAddressCountry, lblCountry], [lblAddressStreet1, lblStreetAddress], [lblAddressCity, lblCity], [lblAddressPostCode, lblPostCode]]);
const generalInfoLabelData = new Map([
  [driverFirstName, lblFirst], [lblGenInfoMidName, lblMiddle], [driverLastName, lblLast], [lblGenInfoDisplayName, lblDisplayName], [lblGenInfoSuffix, lblSuffix],
  [lblGenInfoNickName, lblNickName], [lblGenInfoDriverCode, lblDriverCode], [lblGenInfoEmail, lblPrimaryEmail], [labelPhoneNumber, lblMobilePhone],
]);
const awardLabelData = new Map([[drpDwnDriverAwardType, lblType], [lblAwardDescription, lblDescription], [lblDriverAwardDate, lblAwardDate]]);
const { shortWait } = commonData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let email, updatedEmail, drpDwnDriverType, drpDwnDriverStatus,
  drpDwnDriverGender1, drpDwnDriverGender2, drpDwnDriverMarriageStatus1,
  drpDwnDriverMarriageStatus2, powerDataTDM, powerDataTDM2, trailerDataTDM,
  trailerDataTDM2, drpDwnDriverGeneralOpDetailsStatus, drpDwnDriverGeneralOpDetailsHOS,
  drpDwnDriverProfessionalClass, drpDwnDriverProfessionalClass1, drpDwnDriverDivision, drpDwnDriverBusinessUnit, emailNumb, drpDwnDriverAwardOption,
  drpDwnDriverProfessionalType, drpDwnDriverProfessionalType1, drpDwnDriverTimeOffType,
  drpDwnDriverBusinessUnit1, drpDwnDriverBusinessUnit2;

describe('Driver General Information - Regression Test Case Preparation and Execution [ME-137405], [ME-137407], [ME-137399], [ME-137402], [ME-137396], [ME-154714], [ME-137400],[ ME-137403], [ME-137395], [ME-137401], [ME-28146], [ME-29790], [ME-29941], [ME-30120] [ME-28382] [ME-29925] [ME-31098] [ME-28243], [ME-154723], [ME-154719], [ME-154726], [ME-137398]', () => {
  before(() => {
    getMinionValues(minionDriverGeneralTimeOff, 5).then(resultOptions => {
      drpDwnDriverTimeOffType = resultOptions;
    });
    getMinionValues(minionDrpDwnDivision, 7).then(resultOptions => {
      drpDwnDriverDivision = resultOptions;
    });
    getMinionValues(minionDrpDwnAwardType, 3).then(resultOptions => {
      drpDwnDriverAwardOption = resultOptions;
    });
    getMinionValues(minionDrpDwnBusinessUnit, 2).then(resultOptions => {
      drpDwnDriverBusinessUnit = resultOptions;
      drpDwnDriverBusinessUnit1 = resultOptions[0];
      drpDwnDriverBusinessUnit2 = resultOptions[1];
    });
    getMinionValues(minionDrpDwnDriverType, 1).then(resultOptions => {
      drpDwnDriverType = resultOptions[0];
    });
    getMinionValues(minionDrpDwnDriverStatus, 1).then(resultOptions => {
      drpDwnDriverStatus = resultOptions[0];
    });
    getMinionValues(minionDrpDwnDriverGeneralOpDetailsStatus, 3).then(resultOptions => {
      drpDwnDriverGeneralOpDetailsStatus = resultOptions;
    });
    getMinionValues(minionDrpDwnDriverGeneralOpDetailsHOS, 3).then(resultOptions => {
      drpDwnDriverGeneralOpDetailsHOS = resultOptions;
    });
    getTDMData({ dataType: tdmAddPowerData, dataCondition: tdmAddPowerReq, dataScenario: tdmPowerCommonScenario });
    cy.then(() => {
      powerDataTDM = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmAddPowerData, dataCondition: tdmAddPowerReq, dataScenario: tdmPowerCommonScenario });
    cy.then(() => {
      powerDataTDM2 = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmAddTrailerData, dataCondition: tdmAddTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmAddTrailerData, dataCondition: tdmAddTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM2 = Cypress.env('inputVal');
      getMinionValues(minionDrpDwndriverGeneralProfessionalType, 2).then((resultOptions) => {
        drpDwnDriverProfessionalType = resultOptions[0];
        drpDwnDriverProfessionalType1 = resultOptions[1];
      });
      getMinionValues(minionDrpDwndriverGeneralProfessionalClass, 2).then((resultOptions) => {
        drpDwnDriverProfessionalClass = resultOptions[0];
        drpDwnDriverProfessionalClass1 = resultOptions[1];
      });
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-137405 Verify user can be able to add and edit the Driver General Information card details | Assets - Driver General Tab | Regression',
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
      //Edit Driver
      clearTextType({ element: txtFieldDriverFirstName, typeText: firstName });
      clearTextType({ element: txtFieldDriverLastName, typeText: lastName });
      updatedEmail = firstName + lastName + emailNumb + emailSuffix;
      clearTextType({ element: txtFieldEmail, typeText: updatedEmail });
      selectItemFromButtonTypeDropDown({ locator: drpDwnPersonalInfoType, dropdownVal: drpDwnDriverType });
      selectItemFromButtonTypeDropDown({ locator: drpDwnStatus, dropdownVal: drpDwnDriverStatus });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Verify updated values
      verifyAttrText({ locator: txtFieldDriverFirstName, attribute: valueAttr, verifyText: firstName });
      verifyAttrText({ locator: txtFieldDriverLastName, attribute: valueAttr, verifyText: lastName });
      verifyAttrText({ locator: txtFieldEmail, attribute: valueAttr, verifyText: updatedEmail });
      verifyAttrText({ locator: drpDwnPersonalInfoType, attribute: typeAttr, verifyText: drpDwnDriverType });
      verifyAttrText({ locator: drpDwnStatus, attribute: typeAttr, verifyText: drpDwnDriverStatus });
    });

  it('ME-137407, ME-137399- Verify Driver Operational Details - Regression Testcase | Assets - Driver Add New - Operational Details | Regression',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p3'],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and General Information
      enterDriverMandatoryFields();
      verifyElementTextContains({ locator: titleOperationalDetails, verifyText: titleOperationalDetailsValue });
      //verifying Operational Details Status
      drpDwnDriverGeneralOpDetailsStatus = sortArrayAsc({ unSortedArray: drpDwnDriverGeneralOpDetailsStatus });
      drpDwnDriverGeneralOpDetailsStatus.unshift(typeEmptyVal);
      verifyElementTextContains({ locator: labelStatus, verifyText: operationalDetailslabelValue[0] });
      validateDropDownFunction({ drpDwnEle: drpDwnOpDetailsStatus, drpDwnBtnEle: drpDwnOpDetailsStatusBtn, drpDwnOptionEle: drpDwnStatusValue, drpDwnOptions: drpDwnDriverGeneralOpDetailsStatus });
      verifySingleSelectDropDownFunction({ drpDwnEle: drpDwnOpDetailsStatusBtn, drpDwnOptions: drpDwnDriverGeneralOpDetailsStatus });
      //verifying Operational Details HOS Rule
      drpDwnDriverGeneralOpDetailsHOS = sortArrayAsc({ unSortedArray: drpDwnDriverGeneralOpDetailsHOS });
      drpDwnDriverGeneralOpDetailsHOS.unshift(typeEmptyVal);
      verifyElementTextContains({ locator: labelHOSRule, verifyText: operationalDetailslabelValue[1] });
      verifySingleSelectDropDownFunction({ drpDwnEle: drpDwnHosRuleTermBtn, drpDwnOptions: drpDwnDriverGeneralOpDetailsHOS });
      //verifying Operational Details Permanent Power
      verifyElementTextContains({ locator: labelPermanentPower, verifyText: operationalDetailslabelValue[2] });
      verifyTextContains({ locator: drpDwnDetailsPermanentPower, containsText: emptyData });
      selectValueDropDownInputType({ element: drpDwnDetailsPermanentPower, ddValue: powerDataTDM.powerCode });
      verifyAttrValueContains({ locator: drpDwnDetailsPermanentPower, attribute: valueAttr, verifyText: powerDataTDM.powerCode });
      //verifying Operational Details Permanent Power
      verifyElementTextContains({ locator: labelPermanentTrailers, verifyText: operationalDetailslabelValue[3] });
      verifyTextContains({ locator: drpDwnpermanentTrailer, containsText: emptyData });
      dropDownContainsValueCheckBoxSelection({ element: drpDwnpermanentTrailer, ddValue: trailerDataTDM.trailerCode });
      verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: trailerDataTDM.trailerCode });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Verify updated values
      const validationOfDriverOperationalDetails = ({ dataStatus: statusValue, dataHosRuleTerm: hosRuleTermValue, dataPermanentPower: permanentPowerValue, dataPermanentTrailerValue: permanentTrailerValueValue }) => {
        verifyTextContains({ locator: drpDwnOpDetailsStatus, containsText: statusValue });
        verifyTextContains({ locator: drpDwnHosRuleTerm, containsText: hosRuleTermValue });
        verifyAttrValueContains({ locator: drpDwnDetailsPermanentPower, attribute: valueAttr, verifyText: permanentPowerValue });
        verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: permanentTrailerValueValue });
      };
      validationOfDriverOperationalDetails({
        dataStatus: drpDwnDriverGeneralOpDetailsStatus[1],
        dataHosRuleTerm: drpDwnDriverGeneralOpDetailsHOS[1],
        dataPermanentPower: powerDataTDM.powerCode,
        dataPermanentTrailerValue: trailerDataTDM.trailerCode,
      });
      //Edit Driver
      selectItemFromDropDown({ element: drpDwnOpDetailsStatusBtn, ddValue: drpDwnDriverGeneralOpDetailsStatus[2] });
      selectItemFromDropDown({ element: drpDwnHosRuleTermBtn, ddValue: drpDwnDriverGeneralOpDetailsHOS[2] });
      textClear({ locator: drpDwnDetailsPermanentPower });
      selectValueDropDownInputType({ element: drpDwnDetailsPermanentPower, ddValue: powerDataTDM2.powerCode });
      dropDownContainsValueCheckBoxSelection({ element: drpDwnpermanentTrailer, ddValue: trailerDataTDM.trailerCode });
      dropDownContainsValueCheckBoxSelection({ element: drpDwnpermanentTrailer, ddValue: trailerDataTDM2.trailerCode });
      //Save Driver and verifying toastMsg
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Verify updated values
      validationOfDriverOperationalDetails({
        dataStatus: drpDwnDriverGeneralOpDetailsStatus[2],
        dataHosRuleTerm: drpDwnDriverGeneralOpDetailsHOS[2],
        dataPermanentPower: powerDataTDM2.powerCode,
        dataPermanentTrailerValue: trailerDataTDM2.trailerCode,
      });
    });
  //The below 'it' block is skipped due to field removed in Driver Personal Information card details
  it.skip('ME-137402 Verify user can be able to add and edit the Driver Personal Information card details | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p3',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and General Information
      enterDriverMandatoryFields();
      //Entering Driver Personal informarion
      addDriverPersonalInfo({ genderValue: drpDwnDriverGender1, maritalStatusValue: drpDwnDriverMarriageStatus1 });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Edit Personal Information
      selectItemFromButtonTypeDropDown({ locator: drpDwnGenderPronoun, dropdownVal: drpDwnDriverGender2 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnMaritalStatus, dropdownVal: drpDwnDriverMarriageStatus2 });
      verifyAttrText({ locator: drpDwnGenderPronoun, attribute: titleAttr, verifyText: drpDwnDriverGender2 });
      verifyAttrText({ locator: drpDwnMaritalStatus, attribute: titleAttr, verifyText: drpDwnDriverMarriageStatus2 });
    });

  it('ME-137396 Verify user can be able to add, edit and delete driver address details in Driver Address card details | Assets - Driver Address Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driver', '@driverGeneral', '@p3'],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //adding driver address
      addAddress({ typeOfAddress: defaultAddressType });
      //editing driver address
      clickOkOnWindowAlertConfirm();
      //deleting driver address
      clickDeleteAddress({ rowIndex: 0 });
      clickOkOnWindowAlertConfirm();
    });

  it('ME-154714, ME-154723, ME-154719, ME-137398 Verify user can be able to add, edit and delete driver time-off details in Driver Time off card details | Assets - Driver Address Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driver', '@driverGeneral', '@p3', '@phase2'],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //adding time-Off details
      addTimeOff({ typeOfTimeOff: defaultTimeOffType });
      datePicker({ dateLocator: timeOffStartDate, dataText: returntodayDateMMDDYY() });
      const futureTimeOffDate = returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal });
      datePicker({ dateLocator: timeOffEndDate, dataText: futureTimeOffDate });
      clickActionWait({ locator: btnDialogSubmit });
      const timeOffData = new Map([
        [lblType, defaultTimeOffType],
        [lblStartDate, returntodayDateMMDDYY()],
        [lblEndDate, futureTimeOffDate],
      ]);
      verifyRowData({ locator: rowDriverTimeOff, inputDataObj: timeOffData });
      //editing time-Off details
      clickEditTimeOff({ kababIndex: 0 });
      verifyAttrValueContains({ locator: timeOffType, attribute: titleAttr, verifyText: timeOffVacation });
      //deleting driver address
      clickDeleteInLastRow();
      clickOkOnWindowAlertConfirm();
    });

  it('ME-154726 Verify user can be able to click Cancel button on Delete popup in Driver Time off card details | Assets - Driver Address Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driver', '@driverGeneral', '@p3', '@phase2'],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //adding time-Off details
      addTimeOff({ typeOfTimeOff: defaultTimeOffType });
      datePicker({ dateLocator: timeOffStartDate, dataText: returntodayDateMMDDYY() });
      datePicker({ dateLocator: timeOffEndDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      clickActionWait({ locator: btnDialogSubmit });
      //Verifying Cancel button on Delete popup
      clickDeleteInLastRow();
      clickCancelOnWindowAlertConfirm();
      //Verifying record not deleted
      verifyExists({ element: rowDriverTimeOff });
    });

  it('ME-137403, ME-138200 - Verify user can be able to add and edit the Driver Professional Information details | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverProfessional',
        '@driverGeneral',
        '@driverContactDetails',
        '@p1',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and Professional Information
      enterDriverMandatoryFields();
      waitSometime(shortWait);
      //Add the Driver Professional Information details
      dropDownIncludesTextClick({ element: trainerCode, typeText: trainerValue, containText: trainerValue });
      selectItemFromButtonTypeDropDown({ locator: drpDwnProfessionalType, dropdownVal: drpDwnDriverProfessionalType });
      dropDownIncludesTextClick({ element: partnerCode, typeText: partnerTxt, containText: partnerValue });
      dropDownIncludesTextClick({ element: drpDwncompany, typeText: companyTxt, containText: companyValue });
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

  it('ME-137395 Verify user can be able to add and edit the Driver Contact Details| Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverProfessional',
        '@driverGeneral',
        '@driverContactDetails',
        '@p1',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and General Information
      enterDriverMandatoryFields();
      scrollIntoView({ locator: btnContactsAddNew });
      clickAction({ locator: btnContactsAddNew });
      waitSometime(shortWait);
      clearTextType({ element: txtNewContactName, typeText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      selectItemFromButtonTypeDropDown({ locator: drpdwnContactType, dropdownVal: contactType });
      typeDrpDwnWithMachtingText({ locator: drpdwnContactsCountry, drpDwnVal: drpdwnCountryName });
      const mobileNumber = generateRandomNumberByLength({ lengthOfNum: 10 });
      typeText({ locator: txtContactsPhoneNumber, dataText: mobileNumber });
      const phoneExtn = generateRandomNumberByLength({ lengthOfNum: 3 });
      typeText({ locator: txtContactsPhoneExtn, dataText: phoneExtn });
      typeDrpDwnWithMachtingText({ locator: drpdwnFaxNumberCountry, drpDwnVal: drpdwnCountryName });
      typeText({ locator: txtContactsfaxNumberExtn, dataText: faxExtn });
      typeText({ locator: txtContactsEmailAddress, dataText: emailValue });
      typeDropDwn({ locator: drpdwnImService, drpDwnVal: imServiceType });
      typeText({ locator: txtImUsername, dataText: firstName });
      clickAction({ locator: mainCheckbox });
      clickAction({ locator: IsPayContactAllowedParty });
      clickAction({ locator: btnAddNewContact });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      //Edit the contact Details
      clickAction({ locator: btnKabobMenu });
      clickAction({ locator: editButton });
      const newContactName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      clearTextType({ element: txtNewContactName, typeText: newContactName });
      const phoneExtnUpdated = generateRandomNumberByLength({ lengthOfNum: 3 });
      clearTextType({ element: txtContactsPhoneExtn, typeText: phoneExtnUpdated });
      clearTextType({ element: txtContactsEmailAddress, typeText: emailUpdated });
      clickAction({ locator: btnAddNewContact });
      waitSometime(shortWait);
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Verify updated values
      clickAction({ locator: btnKabobMenu });
      clickAction({ locator: editButton });
      verifyAttrText({ locator: txtNewContactName, attribute: valueAttr, verifyText: newContactName });
      verifyAttrText({ locator: txtContactsPhoneExtn, attribute: valueAttr, verifyText: phoneExtnUpdated });
      verifyAttrText({ locator: txtContactsEmailAddress, attribute: valueAttr, verifyText: emailUpdated });
      verifyClosePopup();
      //Delete the contact Details record
      clickAction({ locator: btnKabobMenu });
      clickAction({ locator: deleteButton });
      clickOkOnWindowAlert();
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    });

  it('ME-137400 Verify user can be able to add, edit and delete driver identifier card details | Assets - Driver Address Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverIdentifier',
        '@p3',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //adding driver Identifiers
      addIdentifier({ typeOfIdentifier: defaultIdentifierType });
      //editing driver Identifiers
      clickEditInIdentifier();
      //deleting driver Identifiers
      clickDeleteInFirstRow();
    });

  it('ME-137401 Verify user can be able to add and edit the Driver Organizational Details| Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverIdentifier',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Adding Driver Mandatory fields
      enterDriverMandatoryFields();
      //Adding Driver Organizational details
      selectItemFromButtonTypeDropDown({ locator: drpdwnDivisionTerm, dropdownVal: drpDwnDriverDivision[1] });
      selectItemFromButtonTypeDropDown({ locator: drpDwnBusinessUnits, dropdownVal: drpDwnDriverBusinessUnit1 });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Edit Driver Organizational details
      selectItemFromButtonTypeDropDown({ locator: drpdwnDivisionTerm, dropdownVal: drpDwnDriverDivision[2] });
      selectItemFromButtonTypeDropDown({ locator: drpDwnBusinessUnits, dropdownVal: drpDwnDriverBusinessUnit2 });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Verify updated values
      verifyAttrText({ locator: drpdwnDivisionTerm, attribute: typeAttr, verifyText: drpDwnDriverDivision[2] });
      verifyAttrText({ locator: drpDwnBusinessUnits, attribute: typeAttr, verifyText: drpDwnDriverBusinessUnit2 });
    });

  it('ME-28146 Verify Driver Organizational Details fields validation | Assets - Driver General Tab | Regression',
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
      //Verifying Division and Business Unit drop down values
      drpDwnDriverDivision = sortArrayAsc({ unSortedArray: drpDwnDriverDivision });
      drpDwnDriverDivision.unshift(typeEmptyVal);
      drpDwnDriverBusinessUnit = sortArrayAsc({ unSortedArray: drpDwnDriverBusinessUnit });
      drpDwnDriverBusinessUnit.unshift(typeEmptyVal);
      verifyDrpDwnAllValuesText({ drpDwnLocator: drpdwnDivisionTerm, drpDwnTextArray: drpDwnDriverDivision });
      verifyDrpDwnAllValuesText({ drpDwnLocator: drpDwnBusinessUnits, drpDwnTextArray: drpDwnDriverBusinessUnit });
    });

  it('ME-29790 Verify the Test Driver General Information - Functional Testcase | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p3',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
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
      verifyIfEnabled({ locator: txtFieldDriverLastName });
      //Verify "First" , "middle" and "Last" ,"DriverID","Email","Nickname" Fields should accept Text with minimum length and Maximum length characters.
      verifyMaxExactLength({ locator: txtFieldDriverFirstName, maxLength: maxLength60 });
      verifyMaxExactLength({ locator: txtFieldMiddleName, maxLength: maxLength60 });
      verifyMaxExactLength({ locator: txtFieldDriverLastName, maxLength: maxLength60 });
      verifyMaxExactLength({ locator: txtDriverCode, maxLength: maxLength25 });
      verifyMaxExactLength({ locator: txtFieldEmail, maxLength: maxLength100 });
      verifyMaxExactLength({ locator: txtFieldNickName, maxLength: maxLength60 });
      //Verify Dropdown field  "Suffix"
      verifyDrpDwnAllValuesText({ drpDwnLocator: drpDwnSuffix, drpDwnTextArray: suffixDrpDwnValues });
      //Verify standard email validation for field Email
      clearTextType({ element: txtFieldEmail, typeText: emailValue });
      verifyEmailID({ emailID: emailValue });
      waitSometime(shortWait);
      //Verify missed to fill first and last fields , either in screen refresh or any other scenario driver should not get save instead should show the error to fill all mandatory fields
      cy.reload();
      enterDriverMandatoryFields();
      clearText({ locator: txtFieldDriverFirstName });
      clearText({ locator: txtFieldDriverLastName });
      scrollIntoView({ locator: btnDriverSave });
      verifyIfDisabled({ locator: btnDriverSave });
      verifyContains({ locator: driverFirstName, containsText: asterickSymbol });
      verifyToolTips({ locator: toolTipFirstName, verifyText: tooltipFirstName });
      verifyContains({ locator: driverLastName, containsText: asterickSymbol });
      verifyToolTips({ locator: toolTipLastName, verifyText: tooltipLastName });
    });

  it('ME-29941 Verify Driver Professional Information fields validation | Assets - Driver General Tab | Regression',
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
      //Verifying Professional Information field labels
      verifyLabelUsingMapArray({ map: profInfoLabelData });
      //Verifying Mandatory fields
      locatorsHomepage.forEach((element) => {
        verifyBorderColour({ locator: element, colourValue: colorCodeVal });
      });
      enterDriverMandatoryFields();
      selectItemFromButtonTypeDropDown({ locator: drpDwnPersonalInfoType, dropdownVal: drpDwnDriverType });
      dropDownIncludesTextClick({ element: partnerCode, typeText: partnerTxt, containText: partnerValue });
      datePicker({ dateLocator: driverHiredDate, dataText: getPastYearDateWithYear() });
      //Verifying the Years Of Service field is reflecting automatically
      verifyAttrText({ locator: divYearsOfService, attribute: titleAttr, verifyText: yearsOfService });
    });

  it('ME-30120 Verify Driver Address Details fields validation | Assets - Driver General Tab | Regression',
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
      clickActionWait({ locator: btnAddressAddNew });
      //Verifying Address field labels
      verifyLabelUsingMapArray({ map: addressDetailsData });
      //Verifying Mandatory fields
      locatorsAddress.forEach((element) => {
        verifyContains({ locator: element, containsText: asterisk });
      });
    });

  it('ME-29925 Verify Driver General Information fields validation | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Verifying General Information field labels
      verifyLabelUsingMapArray({ map: generalInfoLabelData });
      //Verifying Mandatory fields
      locatorsHomepage.forEach((element) => {
        verifyBorderColour({ locator: element, colourValue: colorCodeVal });
      });
      //Verifying field character length
      verifyMaxExactLength({ locator: txtFieldDriverFirstName, maxLength: maxLength60 });
      verifyMaxExactLength({ locator: txtFieldMiddleName, maxLength: maxLength60 });
      verifyMaxExactLength({ locator: txtFieldDriverLastName, maxLength: maxLength60 });
      verifyMaxExactLength({ locator: txtDriverCode, maxLength: maxLength25 });
      verifyMaxExactLength({ locator: txtFieldEmail, maxLength: maxLength100 });
      verifyMaxExactLength({ locator: txtFieldNickName, maxLength: maxLength60 });
    });

  it('ME-31098 Verify user can be able to add and edit the Driver Award card details | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields();
      //Verifying Mandatory fields in Award card
      clickAction({ locator: tabAwards });
      clickAction({ locator: btnAwardsPlusIcon });
      verifyContains({ locator: drpDwnDriverAwardType, containsText: asterisk });
      verifyBorderColour({ locator: txtFieldAwardDesc, colourValue: colorCodeVal });
      verifyBorderColour({ locator: txtFieldAwardDate, colourValue: colorCodeVal });
      verifyLabelUsingMapArray({ map: awardLabelData });
      clickAction({ locator: btnCloseIcon });
      //Adding an Award
      addDriverAward({ drpDwnAwardType: drpDwnDriverAwardOption[0] });
      //Edit an Award
      clickOptionsInKebabMenuInTable({ kebabMenuLocator: btnKebabAwards, optionLocator: menuOptionEditInKebab, indexNumber: 1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnDriverAwardType, dropdownVal: drpDwnDriverAwardOption[1] });
      clickActionWait({ locator: btnAddNewContact });
      //Delete an Award
      clickOptionsInKebabMenuInTable({ kebabMenuLocator: btnKebabAwards, optionLocator: menuOptionDeleteInKebab, indexNumber: 1 });
      clickOkOnWindowAlertConfirm();
    });

  it('ME-28243 Verify Driver Operational Details - Functional and UI Testcase | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Verifying Status and HOS Role dropdown values
      drpDwnDriverGeneralOpDetailsStatus = sortArrayAsc({ unSortedArray: drpDwnDriverGeneralOpDetailsStatus });
      drpDwnDriverGeneralOpDetailsStatus.unshift(typeEmptyVal);
      drpDwnDriverGeneralOpDetailsHOS = sortArrayAsc({ unSortedArray: drpDwnDriverGeneralOpDetailsHOS });
      drpDwnDriverGeneralOpDetailsHOS.unshift(typeEmptyVal);
      verifyDrpDwnAllValuesText({ drpDwnLocator: drpDwnStatus, drpDwnTextArray: drpDwnDriverGeneralOpDetailsStatus });
      verifyDrpDwnAllValuesText({ drpDwnLocator: drpDwnHosRule, drpDwnTextArray: drpDwnDriverGeneralOpDetailsHOS });
      //verifying Permanent Power
      verifyElementTextContains({ locator: labelPermanentPower, verifyText: operationalDetailslabelValue[2] });
      verifyTextContains({ locator: drpDwnDetailsPermanentPower, containsText: emptyData });
      selectValueDropDownInputType({ element: drpDwnDetailsPermanentPower, ddValue: powerDataTDM.powerCode });
      verifyAttrValueContains({ locator: drpDwnDetailsPermanentPower, attribute: valueAttr, verifyText: powerDataTDM.powerCode });
      //verifying Permanent Trailer
      verifyElementTextContains({ locator: labelPermanentTrailers, verifyText: operationalDetailslabelValue[3] });
      verifyTextContains({ locator: drpDwnpermanentTrailer, containsText: emptyData });
      dropDownContainsValueCheckBoxSelection({ element: drpDwnpermanentTrailer, ddValue: trailerDataTDM.trailerCode });
      verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: trailerDataTDM.trailerCode });
    });

  it('ME-28382 Verify the Driver Time-Off Details - Functional and UI Testcase | Assets - Driver Time-Off Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driver', '@driverTimeOff', '@p3'],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      verifyElementTextContains({ locator: titleTimeOff, verifyText: titleTimeOffValue });
      clickAction({ locator: btnPlannedTimeOffPlus });
      verifyElementTextContains({ locator: txtHeaderAddContacts, verifyText: txtHeaderAddPlannedTimeOff });
      drpDwnDriverTimeOffType.unshift(typeEmptyVal);
      verifySingleSelectDropDownFunction({ drpDwnEle: dropdwnType, drpDwnOptions: drpDwnDriverTimeOffType });
      const todayDate = returntodayDateMMDDYY();
      clearTextType({ element: txtFieldStartDate, typeText: todayDate });
      verifyTodayDateMMDDYY({ dateLocator: txtFieldStartDate, attribute: valueAttr });
      clearTextType({ element: txtFieldEndDate, typeText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      verifyfutureDateMMDDYY({ dateLocator: txtFieldEndDate, dayCount: dayCountVal, monthCount: monthCountVal, attribute: valueAttr });
      clearTextType({ element: txtFieldNote, typeText: generateRandomAlphaNumByLength({ lengthOfString: 500 }) });
      verifyLengthOfText({ locator: txtFieldNoteTxt, maxLength: maxLength500 });
      verifyIfEnabled({ locator: btnTimeOffSave });
      clickAction({ locator: btnTimeOffSave });
      //verifying for duplicate time-off record
      clickAction({ locator: btnPlannedTimeOffPlus });
      selectItemFromDropDown({ element: dropdwnType, ddValue: drpDwnDriverTimeOffType[2] });
      clearTextType({ element: txtFieldStartDate, typeText: todayDate });
      clearTextType({ element: txtFieldEndDate, typeText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      clearTextType({ element: txtFieldNote, typeText: generateRandomAlphaNumByLength({ lengthOfString: 25 }) });
      verifyIfDisabled({ locator: btnTimeOffSave });
      //verifying for non-duplicate time-off record and max note textfield length
      clickAction({ locator: btnPlannedTimeOffPlus });
      selectItemFromDropDown({ element: dropdwnType, ddValue: drpDwnDriverTimeOffType[2] });
      clearTextType({ element: txtFieldStartDate, typeText: returnfutureDateMMDDYY({ dayCount: 4, monthCount: 3 }) });
      verifyIfDisabled({ locator: btnTimeOffSave });
      clearTextType({ element: txtFieldEndDate, typeText: returnfutureDateMMDDYY({ dayCount: 5, monthCount: 4 }) });
      clearTextType({ element: txtFieldNote, typeText: generateRandomAlphaNumByLength({ lengthOfString: 501 }) });
      selectItemFromDropDown({ element: dropdwnType, ddValue: drpDwnDriverTimeOffType[2] });
      verifyIfDisabled({ locator: btnTimeOffSave });
      clearTextType({ element: txtFieldNote, typeText: generateRandomAlphaNumByLength({ lengthOfString: 25 }) });
      selectItemFromDropDown({ element: dropdwnType, ddValue: drpDwnDriverTimeOffType[2] });
      verifyIfEnabled({ locator: btnTimeOffSave });
      clickAction({ locator: btnTimeOffSave });
    });
});