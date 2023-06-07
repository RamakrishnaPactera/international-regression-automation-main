/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Verify the "Add New Driver Schedule " popup info
 Test Cases List
 Authored By :Sanjeev Bandari
 Date : 12-05-2023
 Functions/Calling References : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included : ME-154450 Driver Schedule : Verify the "Driver Schedule" Card info
                    : ME-154451 Driver Schedule : Driver Schedule Card & Verify
                    : ME-154452 Driver Schedule : Verify the "Add New Driver Schedule " popup info
                    : ME-154453 Verify Uncheck the Off check box  & Enter  From & To Time in Monday Time Picker
                    : ME-154454 Driver Schedule : Verify Add Timeslot
                    : ME-154455 Driver Schedule : Verify and Enter all the mandatory field information
                    : ME-154456 Verify save Functionality -Add Driver Schedule
                    : ME-154806, ME-156540 Verify the "Driver schedule Details" in Operations Tab
                    : ME-154807 Verify the user should able to update the driver details after adding the Schedule
                    : ME-154808 Click on Operations Tab & Verify the Driver Schedule info  under Schedule  card
                    : ME-154809 Verify the user should able to update the driver details
                    : ME-154810 Verify System should display same Schedule details which are pulled from the Driver General tab → Schedule card
                    : ME-41617,ME-156543 Test Business Scenario for P2 - Verify the Driver’s capacity Details
                    : ME-154813 Test Business Scenario for P2 - Verify the information displayed in each field under Capacity Card
                    : ME-137490 Driver Capacity - UI Component P2 : Regression Testcase
                    : ME-137493 Show the driver schedule in the next availability card (schedule tab)  P2 : Regression Testcase
                    : ME-137505 Driver Schedule P2 : Regression TestCase
----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { viewFullPage, clickAction, waitSometime, verifyTextContains, typeText, verifyIfEnabled, verifyExists, clickActionWait, verifyIfDisabled, getTDMData, toastWithMsg, verifyTableColumnsHeaders } from '../../../../../utilities/commonUtils/genericUtils';
import addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import { navigateToDriverAddNewPage, addNewDriverSchedule, searchDriverWithCode, driverSaveAction } from '../../../../../utilities/assetUtils/resourceUtilis';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import { returntodayDateMMDDYY, todayDatePlusTwo } from '../../../../../utilities/commonUtils/dateTimeUtils';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
const {
  schedule,
} = addDriverPage;
const {
  capacityFieldNames,
  capacityFieldNames1,
  driverScheduleNotAvailableMsg,
  locale,
  scheduleDialogTitle,
  slotEndTime,
  slotStartTime,
  tblCapacityValue,
} = addDriverData.userDefinedData;
const {
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  tdmDriverData,
} = preferencesData.expectedData;
const {
  msgUpdated,
} = addDriverData.expectedData;
const { shortWait } = commonData;
const { tabDriverOperations, scheduleTabOperations, tabDriverGeneral, driverScheduleNotAvailable, capacityColHeaders, capacityColHeaders1, tblCapacityFieldsEmpty } = driverCommonPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;
describe('Verify the "Add New Driver Schedule " popup info [ME-154450][ME-154451][ME-154452][ME-154455][ME-154456][ME-154453][ME-154454][ME-154806][ME-154807][ME-154808][ME-154809][ME-154810][ME-41617][ME-154813] [ME-156540][ME-137490] [ME-137493] [ME-137505]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-154450][ME-154451][ME-154452] [ME-137505] Verify the "Add New Driver Schedule " popup info| Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //Verify System should display Driver Schedule Card in driver General Tab
      verifyExists({ element: schedule.scheduleCard });
      clickActionWait({ locator: schedule.btnAddNewSch });
      //Verify System should display Add New Driver Schedule popup
      verifyTextContains({ locator: schedule.scheduleDailog, containsText: scheduleDialogTitle });
      //Verify the "Add New Driver Schedule " popup info
      verifyExists({ element: schedule.txtEffectiveDate });
      verifyExists({ element: schedule.txtExpirationDate });
      typeText({ locator: schedule.txtFieldEffDate, dataText: todayDatePlusTwo() });
      verifyExists({ element: schedule.mondayCheckbox });
      verifyExists({ element: schedule.mondayStartTime });
      verifyExists({ element: schedule.mondayEndTime });
      verifyExists({ element: schedule.tuesdayCheckbox });
      verifyExists({ element: schedule.tuesdayStartTime });
      verifyExists({ element: schedule.tuesdayEndTime });
      verifyExists({ element: schedule.thursdayCheckbox });
      verifyExists({ element: schedule.thursdayStartTime });
      verifyExists({ element: schedule.thursdayEndTime });
      verifyExists({ element: schedule.fridayCheckbox });
      verifyExists({ element: schedule.fridayStartTime });
      verifyExists({ element: schedule.fridayEndTime });
      verifyExists({ element: schedule.saturdayCheckbox });
      verifyExists({ element: schedule.saturdayStartTime });
      verifyExists({ element: schedule.saturdayEndTime });
      verifyExists({ element: schedule.sundayCheckbox });
      verifyExists({ element: schedule.sundayStartTime });
      verifyExists({ element: schedule.sundayEndTime });
      verifyExists({ element: schedule.copyAcrossLink });
      verifyIfDisabled({ locator: schedule.addDriverScheduleBtn });
    });

  it('[ME-154455][ME-154456] Verify save Functionality -Add Driver Schedule | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      clickActionWait({ locator: schedule.btnAddNewSch });
      //Verify the "Add New Driver Schedule " popup info
      const fromDate = returntodayDateMMDDYY();
      addNewDriverSchedule(fromDate, fromDate, locale, slotStartTime, slotEndTime);
      //verify Add Driver Schedule button should be enabled
      verifyIfEnabled({ locator: schedule.addDriverScheduleBtn });
      clickAction({ locator: schedule.addDriverScheduleBtn });
      waitSometime(shortWait);
      //All the added driver schedule information should be displayed under Driver Schedule Card
      verifyTextContains({ locator: schedule.scheduleRowData, containsText: fromDate });
      verifyTextContains({ locator: schedule.scheduleRowData, containsText: slotStartTime });
      verifyTextContains({ locator: schedule.scheduleRowData, containsText: slotEndTime });
    });

  it('[ME-154453][ME-154454] Verify Add Timeslot | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      clickActionWait({ locator: schedule.btnAddNewSch });
      const effDate = returntodayDateMMDDYY();
      //verify Same time info what has been chosen for Monday  should be copied to all the other days.
      typeText({ locator: schedule.txtFieldEffDate, dataText: effDate });
      waitSometime(shortWait);
      typeText({ locator: schedule.mondayStartTime + ' input', dataText: slotStartTime });
      typeText({ locator: schedule.mondayEndTime + ' input', dataText: slotEndTime });
      clickAction({ locator: schedule.copyAcrossLink });
      clickAction({ locator: schedule.timeSlotsPlusBtn });
      verifyExists({ element: schedule.mondayStartSlot });
      verifyExists({ element: schedule.mondayEndSlot });
      typeText({ locator: schedule.mondayStartSlot + ' input', dataText: slotStartTime });
      typeText({ locator: schedule.mondayEndSlot + ' input', dataText: slotEndTime });
    });
  it('[ME-154806][ME-154807][ME-154808][ME-154809][ME-154810] [ME-156542] [ME-137493] Verify user is able to show the driver schedule in the next availability card (schedule tab)',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p2',
      ],
    },
    () => {
      //open driver via search driver and navigating to driver edit page
      cy.log(driverDataTDM.driverCode);
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      //Verify System should display "Driver Schedule Not Available'" text  as there is no driver schedule details in General Tab under Driver Schedule card
      verifyTextContains({ locator: driverScheduleNotAvailable, containsText: driverScheduleNotAvailableMsg });
      clickActionWait({ locator: schedule.btnAddNewSch });
      //Verify the "Add New Driver Schedule " popup info
      const fromDate = returntodayDateMMDDYY();
      addNewDriverSchedule(fromDate, fromDate, locale, slotStartTime, slotEndTime);
      //verify Add Driver Schedule button should be enabled
      verifyIfEnabled({ locator: schedule.addDriverScheduleBtn });
      clickAction({ locator: schedule.addDriverScheduleBtn });
      //Verify User should able to update the driver details
      waitSometime(shortWait);
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      clickAction({ locator: tabDriverOperations });
      clickAction({ locator: scheduleTabOperations });
      waitSometime(shortWait);
      //Verify All the added driver schedule information should be displayed under Driver Schedule
      verifyTextContains({ locator: schedule.scheduleRowData, containsText: fromDate });
      verifyTextContains({ locator: schedule.scheduleRowData, containsText: slotStartTime });
      verifyTextContains({ locator: schedule.scheduleRowData, containsText: slotEndTime });
    });
  it('[ME-41617][ME-154813][ME-156543] [ME-137490] Verify the Driver’s capacity Details',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p2',
      ],
    },
    () => {
      //open driver via search driver and navigating to driver edit page
      cy.log(driverDataTDM.driverCode);
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      clickAction({ locator: tabDriverOperations });
      clickAction({ locator: scheduleTabOperations });
      waitSometime(shortWait);
      //Verify System should display below Driver’s capacity data fields  under capacity  card in driver Operations Tab
      verifyTableColumnsHeaders({ locator: capacityColHeaders, columnNames: capacityFieldNames });
      verifyTableColumnsHeaders({ locator: capacityColHeaders1, columnNames: capacityFieldNames1 });
      //Verify capacity fields should not show any data and will be blank.
      verifyTextContains({ locator: tblCapacityFieldsEmpty, containsText: tblCapacityValue });
    });
});