/*---------------------------------------------------------------------------------------------------------------
User can validate General Tab CRUD Functionality
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 24-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis
Test case Included            : [ME-63395,ME-63396]
----------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as dateTimeUtils from '../../../../../utilities/commonUtils/dateTimeUtils';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let drpDwnDriverDivision, drpDwnDriverGeneralOpDetailsStatus, drpDwnTypeTermData, drpDwnClassTermData, equipmentTypeDrpDwn, equipmentConditionDrpDwn, drpDwnDriverCertificationType, drpDwnDriverAwardOption, drpDwnDriverTimeOffType, driverDataTDM;
//const dateObjToday = genericUtils.getDateWithTargetDay({ targetDate: 0 });
//const currentDate = dateObjToday.mm + '/' + dateObjToday.dd + '/' + dateObjToday.yy;

describe('Driver scenarios: Validate Driver General Tab CRUD Functionality Driver > Resources | Assets - Driver General Tab | Regression [ME-63395,ME-63396]', () => {
  before(() => {
    genericUtils.getMinionValues('driverGeneralEquipmentType', 1).then(typeValue => {
      equipmentTypeDrpDwn = typeValue[0];
    });
    genericUtils.getMinionValues(generalData.staticData.minionDrpDwnDivision, 7).then(resultOptions => {
      drpDwnDriverDivision = resultOptions;
    });
    genericUtils.getMinionValues(addDriverData.staticData.minionDrpDwnDriverGeneralOpDetailsStatus, 3).then(resultOptions => {
      drpDwnDriverGeneralOpDetailsStatus = resultOptions;
    });
    genericUtils.getMinionValues(generalData.staticData.minionDrpDwnProfessionalType, 1).then((resultOptions) => {
      drpDwnTypeTermData = resultOptions[0];
    });
    genericUtils.getMinionValues(generalData.staticData.minionDrpDwnDriverClass, 1).then((resultOptions) => {
      drpDwnClassTermData = resultOptions[0];
    });
    genericUtils.getMinionValues(addDriverData.staticData.minionDrpDwnDriverCertificationType, 6).then(resultOptions => {
      drpDwnDriverCertificationType = resultOptions;
    });
    genericUtils.getMinionValues(addDriverData.staticData.minionDrpDwnAwardType, 3).then(resultOptions => {
      drpDwnDriverAwardOption = resultOptions;
    });
    genericUtils.getMinionValues(addDriverData.staticData.minionDriverGeneralTimeOff, 5).then(resultOptions => {
      drpDwnDriverTimeOffType = resultOptions[0];
    });
    genericUtils.getMinionValues('driverGeneralEquipmentCondition', 1).then(conditionVal => {
      equipmentConditionDrpDwn = conditionVal[0];
    });
  });
  beforeEach(() => {
    cy.log('***creating driver using TDM***');
    genericUtils.getTDMData({ dataType: addDriverData.staticData.tdmDriverData, dataCondition: addDriverData.staticData.tdmAddDriverReq, dataScenario: addDriverData.staticData.tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-63395] Verify user can able to Validate CRUD Functionality in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.enterDriverMandatoryFields();
      genericUtils.selectItemFromButtonTypeDropDown({ locator: addDriverPage.drpdwnDivisionTerm, dropdownVal: drpDwnDriverDivision[1] });
      genericUtils.dropDownExactClick({ element: addDriverPage.operationalDetails.drpDwnOpDetailsStatus, ddValue: drpDwnDriverGeneralOpDetailsStatus[1] });
      //add proffessional information
      resourceUtilis.addnlDrvrProfInfo({ drpDwnClassValue: drpDwnClassTermData, drpDwnTypeValue: drpDwnTypeTermData, partnerDriver: generalData.staticData.partnerDriverName });
      //add driver schedule
      genericUtils.clickActionWait({ locator: addDriverPage.schedule.btnAddNewSch });
      const fromDate = dateTimeUtils.returntodayDateMMDDYY();
      resourceUtilis.addNewDriverSchedule(fromDate, fromDate, addDriverData.userDefinedData.locale, addDriverData.userDefinedData.slotStartTime, addDriverData.userDefinedData.slotEndTime);
      //add Identifier
      resourceUtilis.addIdentifier({ typeOfIdentifier: generalData.staticData.defaultIdentifierType });
      //add Equipment details
      genericUtils.clickAction({ locator: addDriverPage.equipmentDetails.addEquipmentBtn });
      genericUtils.selectItemFromDropDown({ element: addDriverPage.equipmentDetails.drpDwnTypeTerm, ddValue: equipmentTypeDrpDwn });
      genericUtils.clearTypeAndEnter({ element: addDriverPage.equipmentDetails.description, typeText: addDriverData.userDefinedData.txtDescription });
      const countValue = genericUtils.generateRandomNumberByLength({ lengthOfNum: 1 });
      genericUtils.clearTypeAndEnter({ element: addDriverPage.equipmentDetails.typeCount, typeText: countValue });
      const assetIdValue = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 5 });
      genericUtils.clearTypeAndEnter({ element: addDriverPage.equipmentDetails.assetId, typeText: assetIdValue });
      dateTimeUtils.datePicker({ dateLocator: addDriverPage.equipmentDetails.issueDate, dataText: dateTimeUtils.returntodayDateMMDDYY() });
      dateTimeUtils.datePicker({ dateLocator: addDriverPage.equipmentDetails.recoveredDate, dataText: dateTimeUtils.returntodayDateMMDDYY() });
      genericUtils.selectItemFromDropDown({ element: addDriverPage.equipmentDetails.drpDwnConditionTerm, ddValue: equipmentConditionDrpDwn });
      genericUtils.clickAction({ locator: addDriverPage.equipmentDetails.saveEquipmentBtn });
      //creating certifications and permit details with past exp. date
      genericUtils.clickAction({ locator: addDriverPage.btnCertificateAddNew });
      genericUtils.dropDownExactClick({ element: addDriverPage.drpdwnCertficateTypeTerm, ddValue: drpDwnDriverCertificationType[2] });
      genericUtils.getPastDate({ locator: addDriverPage.txtFieldExpirationDate, Day: 1, Month: 1 });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldCertificationOrPermitId, typeText: genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 25 }) });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      //creating Awards
      genericUtils.clickAction({ locator: addDriverPage.tabAwards });
      genericUtils.clickAction({ locator: addDriverPage.btnAwardsPlusIcon });
      resourceUtilis.addDriverAward({ drpDwnAwardType: drpDwnDriverAwardOption[0] });
      //creating driver contact details
      genericUtils.clickAction({ locator: addDriverPage.btnContactsAddNew });
      genericUtils.clearTextType({ element: addDriverPage.txtNewContactName, typeText: genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      genericUtils.selectItemFromButtonTypeDropDown({ locator: addDriverPage.drpdwnContactType, dropdownVal: addDriverData.userDefinedData.contactType });
      genericUtils.typeDrpDwnWithMachtingText({ locator: addDriverPage.drpdwnContactsCountry, drpDwnVal: addDriverData.userDefinedData.drpdwnCountryName });
      const mobileNumber = genericUtils.generateRandomNumberByLength({ lengthOfNum: 10 });
      genericUtils.typeText({ locator: addDriverPage.txtContactsPhoneNumber, dataText: mobileNumber });
      const phoneExtn = genericUtils.generateRandomNumberByLength({ lengthOfNum: 3 });
      genericUtils.typeText({ locator: addDriverPage.txtContactsPhoneExtn, dataText: phoneExtn });
      genericUtils.typeDrpDwnWithMachtingText({ locator: addDriverPage.drpdwnFaxNumberCountry, drpDwnVal: addDriverData.userDefinedData.drpdwnCountryName });
      genericUtils.typeText({ locator: addDriverPage.txtContactsfaxNumberExtn, dataText: addDriverData.userDefinedData.faxExtn });
      genericUtils.typeText({ locator: addDriverPage.txtContactsEmailAddress, dataText: addDriverData.userDefinedData.emailValue });
      genericUtils.clickAction({ locator: addDriverPage.btnAddNewContact });
      //create planned time off
      resourceUtilis.navigateToPlannedTimeOffAddPopup();
      resourceUtilis.driverAddPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc });
      //add timeoff
      resourceUtilis.addTimeOff({ typeOfTimeOff: generalData.staticData.defaultTimeOffType });
      resourceUtilis.driverSaveAction();
      //edit any card in added driver
      genericUtils.selectItemFromButtonTypeDropDown({ locator: addDriverPage.drpdwnDivisionTerm, dropdownVal: drpDwnDriverDivision[1] });
      //Delete any card
      genericUtils.clickAction({ locator: addDriverPage.timeOff.btnKebabTimeOff });
      genericUtils.clickVisibleElement({ locator: addDriverPage.timeOff.deleteBtn });
      genericUtils.verifyToNotExist({ element: addDriverPage.timeOff.btnKebabTimeOff });
    });
  it('[ME-63396] Verify user can able to Validate CRUD Functionality with existing driver in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickActionWait({ locator: driverCommonPage.tabDriverGeneral });
      //edit any card in added driver
      genericUtils.selectItemFromButtonTypeDropDown({ locator: addDriverPage.drpdwnDivisionTerm, dropdownVal: drpDwnDriverDivision[1] });
      //add Identifier
      resourceUtilis.addIdentifier({ typeOfIdentifier: generalData.staticData.defaultIdentifierType });
      //deleting driver Identifiers
      resourceUtilis.clickDeleteInFirstRow();
    });
});