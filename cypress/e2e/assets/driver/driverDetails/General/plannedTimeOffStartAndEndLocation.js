/*---------------------------------------------------------------------------------------------------------------
User can Add Edit and Delete Planned time off record in Driver
Test Cases List
Authored By                   : Sainath
Date                          : 19-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis
Test case Included            : [ME-70962,ME-70963,ME-70964,ME-70965,ME-70966,ME-70967,ME-70968,ME-70969,ME-70970,ME-70976,70977,70978,70979,ME-70971]
----------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import * as homePage from '../../../../../pageObjects/homePage/homePage.json';
import * as dateTimeUtils from '../../../../../utilities/commonUtils/dateTimeUtils';
import { datePicker, getTodayDatePlusOne, returntodayDateMMDDYY, todayDatePlusFive, todayDatePlusThree } from '../../../../../utilities/commonUtils/dateTimeUtils';
let drpDwnDriverTimeOffType, driverDataTDM;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const dateOne = dateTimeUtils.returntodayDateMMDDYY();
const dateTwo = dateTimeUtils.returnfutureDateMMDDYY({ dayCount: 2, monthCount: 0 });
const { plannedDrpDwnMedical, plannedType, plannedStartDate, plannedDrpDwnVacation, plannedEndDate } = driverCommonPage;
const { btnDriverSave } = homePage;
const { btnTimeOffSave, sickDaysRemaining, vacationDaysRemaining } = addDriverPage.timeOff;

describe('Driver scenarios: Add edit and delete Planned time off record in Driver > Resources | Assets - Driver General Tab | Regression [ME-70962,ME-70963,ME-70964,ME-70965,ME-70966,ME-70967,ME-70968,ME-70969,ME-70970,ME-70976,70977,70978,70979,ME-133925,ME-133927,ME-15742,ME-70971,ME-138298, ME-159321]', () => {
  before(() => {
    genericUtils.getMinionValues(addDriverData.staticData.minionDriverGeneralTimeOff, 5).then(resultOptions => {
      drpDwnDriverTimeOffType = resultOptions[0];
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
  it('[ME-70962,ME-70971] : Verify new fields ""startLocation" and "endLocation" under Driver General - Planned TimeOff card and remianing POP Up UI design in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.navigateToPlannedTimeOffAddPopup();
      resourceUtilis.verifyPlannedTimeOffPopupFieldsExist();
    });
  it('ME-70963 : Verify the fields ""startLocation" and "endLocation"  are search and select type and follows GeoAutoComplete in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.navigateToPlannedTimeOffAddPopup();
      resourceUtilis.enterAndValidateStartAndEndLoc(addDriverData.staticData.newYorkCityLoc, addDriverData.staticData.newYorkCityLoc);
    });
  it('ME-70964 : Verify whether the values are pulled and sorted  in the search and select fields "startLocation" and "endLocation" based on the user input to the fields  in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.navigateToPlannedTimeOffAddPopup();
      resourceUtilis.driverAddPlannedTimeOff({ driverTimeOffType: drpDwnDriverTimeOffType });
      genericUtils.verifyText({ locator: addDriverPage.timeOff.timeOffType, verifyText: drpDwnDriverTimeOffType });
    });
  it('[ME-70965,ME-70966] : Verify  "startLocation" and "endLocation"  fields are optional fields  And Verify while creating new driver whether the TimeOff record  added successfully or not in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.navigateToPlannedTimeOffAddPopup();
      resourceUtilis.driverAddPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc });
      resourceUtilis.enterDriverMandatoryFields(false);
      resourceUtilis.driverSaveAndVerifyUpdatedMsg();
    });
  it('ME-70967 : Verify Planned Time Off Edit Functionality in Add New Driver Page in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.navigateToPlannedTimeOffAddPopup();
      resourceUtilis.driverAddPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc });
      genericUtils.verifyText({ locator: addDriverPage.timeOff.timeOffType, verifyText: drpDwnDriverTimeOffType });
      genericUtils.clickAction({ locator: addDriverPage.timeOff.btnKebabTimeOff });
      genericUtils.clickVisibleElement({ locator: addDriverPage.timeOff.editBtn });
      resourceUtilis.driverEditPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newJerseyLoc, endLoc: addDriverData.staticData.newJerseyLoc });
      genericUtils.verifyTextContains({ locator: addDriverPage.timeOff.startLocColVal, containsText: addDriverData.staticData.newJerseyLoc });
    });
  it('ME-70968 : Verify Planned Time Off - Add Record Functionality in Existing Driver in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickActionWait({ locator: driverCommonPage.tabDriverGeneral });
      resourceUtilis.driverAddPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc });
      resourceUtilis.driverSaveAndVerifyUpdatedMsg();
    });
  it('ME-70969 : Verify Planned Time Off Edit Functionality in Existing Driver Record in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickActionWait({ locator: driverCommonPage.tabDriverGeneral });
      resourceUtilis.driverAddPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc });
      genericUtils.verifyText({ locator: addDriverPage.timeOff.timeOffType, verifyText: drpDwnDriverTimeOffType });
      genericUtils.clickAction({ locator: addDriverPage.timeOff.btnKebabTimeOff });
      genericUtils.clickVisibleElement({ locator: addDriverPage.timeOff.editBtn });
      resourceUtilis.driverEditPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newJerseyLoc, endLoc: addDriverData.staticData.newJerseyLoc });
      genericUtils.verifyTextContains({ locator: addDriverPage.timeOff.startLocColVal, containsText: addDriverData.staticData.newJerseyLoc });
      resourceUtilis.driverSaveAndVerifyUpdatedMsg();
    });
  it('ME-70970 : Verify Planned Time Off Delete Functionality in Existing Driver Record in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickActionWait({ locator: driverCommonPage.tabDriverGeneral });
      resourceUtilis.driverAddPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc });
      genericUtils.verifyText({ locator: addDriverPage.timeOff.timeOffType, verifyText: drpDwnDriverTimeOffType });
      genericUtils.clickAction({ locator: addDriverPage.timeOff.btnKebabTimeOff });
      genericUtils.clickVisibleElement({ locator: addDriverPage.timeOff.deleteBtn });
      genericUtils.verifyToNotExist({ element: addDriverPage.timeOff.btnKebabTimeOff });
      resourceUtilis.driverSaveAndVerifyUpdatedMsg();
    });
  it('ME-70976 : In Add New Driver page verify whether the user able to add multiple Planned TimeOff records of same type in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.navigateToPlannedTimeOffAddPopup();
      resourceUtilis.driverAddPlannedTimeOffWithAllFieldsParms({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc, startDate: dateOne, endDate: dateOne });
      resourceUtilis.clickPlannedTimeOffSaveBtn();
      genericUtils.verifyText({ locator: addDriverPage.timeOff.timeOffType, verifyText: drpDwnDriverTimeOffType });
      resourceUtilis.driverAddPlannedTimeOffWithAllFieldsParms({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc, startDate: dateTwo, endDate: dateTwo });
      resourceUtilis.clickPlannedTimeOffSaveBtn();
      genericUtils.verifyTableRowElementText({ locator: addDriverPage.timeOff.timeOffType, index: 1, verifyText: drpDwnDriverTimeOffType });
    });
  it('ME-70977 : In Add New Driver page , verify No two Planned time off records should overlap with same date in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.navigateToPlannedTimeOffAddPopup();
      resourceUtilis.driverAddPlannedTimeOffWithAllFieldsParms({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc, startDate: dateOne, endDate: dateOne });
      resourceUtilis.clickPlannedTimeOffSaveBtn();
      genericUtils.verifyText({ locator: addDriverPage.timeOff.timeOffType, verifyText: drpDwnDriverTimeOffType });
      resourceUtilis.driverAddPlannedTimeOffWithAllFieldsParms({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc, startDate: dateOne, endDate: dateOne });
      genericUtils.verifyToDisabled({ element: addDriverPage.timeOff.btnTimeOffSave });
    });
  it('ME-70978 : In Existing Driver Record Verify whether the user able to add multiple TimeOff records of same type in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickActionWait({ locator: driverCommonPage.tabDriverGeneral });
      resourceUtilis.driverAddPlannedTimeOffWithAllFieldsParms({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc, startDate: dateOne, endDate: dateOne });
      resourceUtilis.clickPlannedTimeOffSaveBtn();
      genericUtils.verifyText({ locator: addDriverPage.timeOff.timeOffType, verifyText: drpDwnDriverTimeOffType });
      resourceUtilis.driverAddPlannedTimeOffWithAllFieldsParms({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc, startDate: dateTwo, endDate: dateTwo });
      resourceUtilis.clickPlannedTimeOffSaveBtn();
      genericUtils.verifyTableRowElementText({ locator: addDriverPage.timeOff.timeOffType, index: 1, verifyText: drpDwnDriverTimeOffType });
    });
  it('ME-70979 : In Existing Driver Record , verify No two Planned time off records should overlap with same date in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickActionWait({ locator: driverCommonPage.tabDriverGeneral });
      resourceUtilis.driverAddPlannedTimeOffWithAllFieldsParms({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc, startDate: dateOne, endDate: dateOne });
      resourceUtilis.clickPlannedTimeOffSaveBtn();
      genericUtils.verifyText({ locator: addDriverPage.timeOff.timeOffType, verifyText: drpDwnDriverTimeOffType });
      resourceUtilis.driverAddPlannedTimeOffWithAllFieldsParms({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc, startDate: dateOne, endDate: dateOne });
      genericUtils.verifyToDisabled({ element: addDriverPage.timeOff.btnTimeOffSave });
    });
  it('ME-133925, ME-133927, ME- 133928 : Verify Sick days remaining  - Planned TimeOff card in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.navigateToPlannedTimeOffAddPopup();
      genericUtils.clickAction({ locator: plannedType });
      genericUtils.clickAction({ locator: plannedDrpDwnMedical });
      datePicker({ dateLocator: plannedStartDate, dataText: returntodayDateMMDDYY() });
      datePicker({ dateLocator: plannedEndDate, dataText: getTodayDatePlusOne() });
      genericUtils.clickAction({ locator: btnTimeOffSave });
      genericUtils.clickAction({ locator: sickDaysRemaining });
      genericUtils.verifyIfEnabled({ locator: sickDaysRemaining });
      genericUtils.clickAction({ locator: btnDriverSave });
    });
  it('ME-15742 : Verify Vacation days remaining  - Planned TimeOff card in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.navigateToPlannedTimeOffAddPopup();
      genericUtils.clickAction({ locator: plannedType });
      genericUtils.clickAction({ locator: plannedDrpDwnVacation });
      datePicker({ dateLocator: plannedStartDate, dataText: todayDatePlusThree() });
      datePicker({ dateLocator: plannedEndDate, dataText: todayDatePlusFive() });
      genericUtils.clickAction({ locator: btnTimeOffSave });
      genericUtils.clickAction({ locator: vacationDaysRemaining });
      genericUtils.verifyIfEnabled({ locator: vacationDaysRemaining });
      genericUtils.clickAction({ locator: btnDriverSave });
    });
  it("ME-138298: verify 'PlannedTimeoff' table on the Edit and View in Default View | Driver > Resources |  Assets - Driver General Tab | Regression",
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.enterDriverMandatoryFields(false);
      resourceUtilis.driverAddPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc });
      genericUtils.clickAction({ locator: addDriverPage.timeOff.btnKebabMenuPlnTmOff });
      genericUtils.clickVisibleElement({ locator: addDriverPage.timeOff.editBtn });
      resourceUtilis.driverEditPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newJerseyLoc, endLoc: addDriverData.staticData.newJerseyLoc });
      genericUtils.verifyTextContains({ locator: addDriverPage.timeOff.firstRowStartLoc, containsText: addDriverData.staticData.newJerseyLoc });
      genericUtils.verifyTextContains({ locator: addDriverPage.timeOff.firstRowEndLoc, containsText: addDriverData.staticData.newJerseyLoc });
      resourceUtilis.driverSaveAction();
      genericUtils.updatedAlert();
    });
  it("ME-159321: verify 'PlannedTimeoff' table on the Edit and View in Expand View | Driver > Resources |  Assets - Driver General Tab | Regression",
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.enterDriverMandatoryFields(false);
      genericUtils.clickAction({ locator: addDriverPage.timeOff.carrotBtnExpand });
      genericUtils.clickAction({ locator: addDriverPage.timeOff.btnExpand });
      resourceUtilis.driverAddPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newYorkCityLoc, endLoc: addDriverData.staticData.newYorkCityLoc });
      genericUtils.clickAction({ locator: addDriverPage.timeOff.btnKebabMenuPlnTmOff });
      genericUtils.clickVisibleElement({ locator: addDriverPage.timeOff.editBtn });
      resourceUtilis.driverEditPlannedTimeOffWithAllFields({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: addDriverData.staticData.newJerseyLoc, endLoc: addDriverData.staticData.newJerseyLoc });
      genericUtils.verifyTextContains({ locator: addDriverPage.timeOff.firstRowStartLoc, containsText: addDriverData.staticData.newJerseyLoc });
      genericUtils.verifyTextContains({ locator: addDriverPage.timeOff.firstRowEndLoc, containsText: addDriverData.staticData.newJerseyLoc });
      resourceUtilis.driverSaveAction();
      genericUtils.updatedAlert();
    });
});