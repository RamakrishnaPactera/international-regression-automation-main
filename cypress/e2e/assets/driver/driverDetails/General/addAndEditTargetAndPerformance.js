import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { clickActionWait, verifyVisible, viewFullPage, clickVisibleElement, clickAction, getTDMData, generateRandomNumberByLength, clearAndTypeWithWait, verifyToolTipsWithText, clearText, toastMsgErrorWithDate, updatedAlert, clickFirstElementIn } from '../../../../../utilities/commonUtils/genericUtils';
import { searchDriverWithCode, verifyDataFormattingWeek } from '../../../../../utilities/assetUtils/resourceUtilis';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import { datePicker, getTodayDatePlusSevenMMDD, returntodayDateMMDDYY, returntodayDateMMDD } from '../../../../../utilities/commonUtils/dateTimeUtils';
import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import targetsAndPerformanceData from '../../../../../testData/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformanceData.json';
const {
  weeklyTargetRequiredField,
  WeekstartdateMsg,
} = targetsAndPerformanceData.expectedData;
const { btnAddNewTarget, txtFieldWeekStarting, btnCarrotTargetAndPerformance, btnExpandTargetAndPerformance, txtFieldTargetDays, btnAddWeeklyTarget, btnKebabWeeklyTargets, btnMenuEditWeeklyTargets } = historyPage;
const {
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddDriverReq,
} = addDriverData.staticData;
const {
  tabDriverTargetsPerformance,
  snapShot,
} = driverCommonPage;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;
describe('Validating Weekly target fields > Driver > Target and Performance [ME-90621][ME-152969][ME-90628][ME-90625]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.log('***creating customer using TDM***');
  });

  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-90621 Can User add and save Target Metrics > Driver > Target and Performance',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
    });
  it('ME-152969 Verify the date picker displayed below the Calendar icon highlighted with the previously selected week> Driver > Target and Performance',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
      clickAction({ locator: btnKebabWeeklyTargets });
      clickAction({ locator: btnMenuEditWeeklyTargets });
      clickAction({ locator: txtFieldWeekStarting });
    });
  it('ME-90628 validation message saying “Week Starting is required” when hovering over the ADD button',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
      clickAction({ locator: btnKebabWeeklyTargets });
      clickAction({ locator: btnMenuEditWeeklyTargets });
      clearText({ locator: txtFieldWeekStarting });
      clickAction({ locator: btnAddWeeklyTarget });
    });
  it('ME-90625, ME-82099, ME-82102 Verify the selected DATE displayed in the WEEK STARTING or starting with sunday field.',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
      clickAction({ locator: btnKebabWeeklyTargets });
      clickAction({ locator: btnMenuEditWeeklyTargets });
      clickAction({ locator: btnMenuEditWeeklyTargets });
      clearText({ locator: txtFieldWeekStarting });
      getTodayDatePlusSevenMMDD();
    });
  it('ME-90631 Verify that user can see same Previous data after Without changing any target fields and click save',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
      clickAction({ locator: btnKebabWeeklyTargets });
      clickAction({ locator: btnMenuEditWeeklyTargets });
      clickAction({ locator: btnAddWeeklyTarget });
    });
  it('ME-90633 Verify that pop-up is closed and correct Data formatting in Weekly Targets Card',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDD() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
      clickAction({ locator: btnKebabWeeklyTargets });
      verifyDataFormattingWeek();
    });
  it('ME-90630, ME-82108 Verify message saying “There is an overlap” when hovered over the Add button',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
      updatedAlert();
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
      toastMsgErrorWithDate();
    });

  it('ME-154149 Data should be reflected in Weekly Targets using carrot menu and expand view option',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickActionWait({ locator: btnCarrotTargetAndPerformance });
      clickVisibleElement({ locator: btnExpandTargetAndPerformance });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDD() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
    });
  it('ME-82109 expand view validation message saying “There is an overlap” when hovered over the Add button',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickActionWait({ locator: btnCarrotTargetAndPerformance });
      clickFirstElementIn({ locator: btnExpandTargetAndPerformance });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDD() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
      updatedAlert();
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
      toastMsgErrorWithDate();
    });
  it('ME-82103 [expand view] Verify the selected DATE displayed in the WEEK STARTING',
    () => {
      //Navigating to general tab
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickActionWait({ locator: btnCarrotTargetAndPerformance });
      clickFirstElementIn({ locator: btnExpandTargetAndPerformance });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddWeeklyTarget });
      clickAction({ locator: btnKebabWeeklyTargets });
      clickAction({ locator: btnMenuEditWeeklyTargets });
      clickAction({ locator: btnMenuEditWeeklyTargets });
      clearText({ locator: txtFieldWeekStarting });
      getTodayDatePlusSevenMMDD();
    });
  it('ME-82104 the validation message saying “Week Starting is required” when hovered over the Add button',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      verifyToolTipsWithText({ locator: btnAddWeeklyTarget, verifyText: WeekstartdateMsg });
    });
  it('ME-82105 expand view the validation message saying “Week Starting is required” when hovered over the Add button',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickActionWait({ locator: btnCarrotTargetAndPerformance });
      clickFirstElementIn({ locator: btnExpandTargetAndPerformance });
      clickAction({ locator: btnAddNewTarget });
      clearAndTypeWithWait({ element: txtFieldTargetDays, typeText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      verifyToolTipsWithText({ locator: btnAddWeeklyTarget, verifyText: WeekstartdateMsg });
    });
  it('ME-82106 The validation message saying “One Target field value is required” when hovered over the Add button',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clickAction({ locator: txtFieldTargetDays });
      verifyToolTipsWithText({ locator: txtFieldTargetDays, verifyText: weeklyTargetRequiredField });
    });
  it('ME-82107 [expand view] The validation message saying “One Target field value is required” when hovered over the Add button',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverTargetsPerformance });
      verifyVisible({ element: snapShot });
      clickActionWait({ locator: btnCarrotTargetAndPerformance });
      clickFirstElementIn({ locator: btnExpandTargetAndPerformance });
      clickAction({ locator: btnAddNewTarget });
      datePicker({ dateLocator: txtFieldWeekStarting, dataText: returntodayDateMMDDYY() });
      clickAction({ locator: txtFieldTargetDays });
      verifyToolTipsWithText({ locator: txtFieldTargetDays, verifyText: weeklyTargetRequiredField });
    });
});