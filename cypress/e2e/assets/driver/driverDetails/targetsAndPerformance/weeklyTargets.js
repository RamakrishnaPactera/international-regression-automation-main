/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver Contact Details - UI Testcase
 Test Cases List                : ME-152437,ME-152303,ME-152304,ME-152305,ME-152306,ME-152307,ME-152308,ME-152928,ME-152932,ME-152936,ME-152963,ME-152964,ME-81577,ME-81587,ME-81594,ME-81598,ME-81605
                                  ME-81606,ME-81881, ME-81885, ME-81892,ME-81879,ME-81609,ME-81891, ME-81607, ME-81880, ME-81882, ME-81888,ME-81883,ME-81884,ME-81948,ME-81947,ME-81893,ME-81949,
                                  ME-81896, ME-81939,ME-81897, ME-81919, ME-81946,ME-81898,ME-81899, ME-81921,ME-81950,ME-81895, ME-88301,ME-88303,ME-88317, ME-88323, ME-88333, ME-88301,ME-88302,
                                  ME-88310,ME-88308,ME-88314, ME-88320, ME-88321,ME-88322, ME-88332,ME-88324,ME-88331
 Authored By                    : Sainath
 Date                           : 06-05-2023,
 Updated Date                   : 19-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             :
                                   ME-152437 : Weekly Target: user can see Add New Weekly Target Popup Assets > Driver > Targets & Performance | Regression
                                   ME-152303 : Weekly Target: Add Weekly Targets in expand view and close verify popup to closed. Assets > Driver > Targets & Performance | Regression
                                   ME-152304,ME-156571 : Weekly Target: Add Weekly Targets in expand view and close verify data should reflect in weekly target. Assets > Driver > Targets & Performance | Regression
                                   ME-152305 : Weekly Target: Click Edit option in Kebab menu and User should see the Edit Weekly Target modal popup is opened. Assets > Driver > Targets & Performance | Regression
                                   ME-152306 : Weekly Target: Verify user can Edit in expand view by clicking Kebab menu.  Assets > Driver > Targets & Performance | Regression
                                   ME-152307 : Weekly Target: Verify user can see Kebab menu after adding record. Assets > Driver > Targets & Performance | Regression
                                   ME-152308 : Weekly Target: User can see Edit and Delete option in Kebab menu. Assets > Driver > Targets & Performance | Regression
                                   ME-152928 : Test Weekly Target: Delete option in Kebab menu and verify see the prompt with the message. Assets > Driver > Targets & Performance | Regression
                                   ME-152932 : Test Weekly Target: Click Delete option in Kebab menu and verify toast message. Assets > Driver > Targets & Performance | Regression
                                   ME-152936 : Test Weekly Target: Delete option in Kebab menu and verify record got deleted. Assets > Driver > Targets & Performance | Regression
                                   ME-152963 : Test Weekly Target: User should see column headers should display in Expand View. Assets > Driver > Targets & Performance | Regression
                                   ME-152964 : Test Weekly Target: User can see weekly target table column headers same order mentioned. Assets > Driver > Targets & Performance | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as targetsAndPerformancePage from '../../../../../pageObjects/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformancePage.json';
import * as preferencesPage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import * as targetsAndPerformanceData from '../../../../../testData/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformanceData.json';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import sqlData from '../../../../../testData/sqlData/sqlData.json';
import * as commonData from '../../../../../testData/staticData/commonData/commonData.json';
const startDateObj = genericUtils.getNextWeekFirstDay();

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;
const weekDayStartMMDDYY = startDateObj.mm + '/' + startDateObj.dd + '/' + startDateObj.yy;
const weekDayStartMMDD = startDateObj.mm + '/' + startDateObj.dd;
const {
  driverKey,
  drivertestdatabase,
  drivertestuser,
  testserver,
  driverWeeklyTargetquery,
} = sqlData.sqlData;
describe('Driver weekly targets validations [ME-152437,ME-152303,ME-152304,ME-152305,ME-152306,ME-152307,ME-152308,ME-152928,ME-152932,ME-152936,ME-152963,ME-152964,ME-81896, ME-81939,ME-81897, ME-81919, ME-81946,ME-81898,ME-81899, ME-81921,ME-81950,ME-81895, ME-156571]', () => {
  beforeEach(() => {
    cy.then(() => {
      cy.log('***creating driver using TDM***');
      genericUtils.getTDMData({ dataType: historyData.staticData.tdmDriverData, dataCondition: historyData.staticData.tdmAddDriverReq, dataScenario: historyData.staticData.tdmDriverCommonScenario });
      cy.then(() => {
        driverDataTDM = Cypress.env('inputVal');
      });
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-152437, ME-81577, ME-81606 : Weekly Target: user can see Add New Weekly Target Popup Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      genericUtils.verifyText({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addDialogPopupTitle, verifyText: targetsAndPerformanceData.expectedData.weeklyTargetAddPopupTitle });
    });
  it('ME-152303, ME-81587, ME-156571 : Weekly Target: Add Weekly Targets in expand view and close verify popup to closed. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      genericUtils.verifyToNotExist({ element: targetsAndPerformancePage.weeklyTargetAddPopup.addDialogPopupTitle });
    });
  it('ME-152304 : Weekly Target: Add Weekly Targets in expand view and close verify data should reflect in weekly target. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.verifyVisibleElemPartialText({ locator: targetsAndPerformancePage.weekOfHeaderValue, value: weekDayStartMMDD });
    });
  it('ME-152305, ME-81895, ME-88305 : Weekly Target: Click Edit option in Kebab menu and User should see the Edit Weekly Target modal popup is opened. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.editBtn });
      genericUtils.verifyText({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addDialogPopupTitle, verifyText: targetsAndPerformanceData.expectedData.weeklyTargetEditPopupTitle });
    });
  it('ME-152306, ME-81950, ME-88301,ME-88303,ME-88317, ME-88323, ME-88333  : Weekly Target: Verify user can Edit in expand view by clicking Kebab menu.  Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      cy.log(weekDayStartMMDDYY);
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.editBtn });
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.weekDayVal, targetsAndPerformanceData.expectedData.weekDayVal, targetsAndPerformanceData.expectedData.weekDayVal, targetsAndPerformanceData.expectedData.weekDayVal);
      genericUtils.toastMsg();
      genericUtils.verifyVisibleElemPartialText({ locator: targetsAndPerformancePage.weeklyTargetTargetDaysColVal, value: targetsAndPerformanceData.expectedData.weekDayVal });
      genericUtils.verifyElementTextContains({ locator: preferencesPage.lblWeeklyActivity, verifyText: weekDayStartMMDD });
    });
  it('ME-152307, ME-81881, ME-81885, ME-81892 : Weekly Target: Verify user can see Kebab menu after adding record. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      genericUtils.verifyExists({ element: targetsAndPerformancePage.weeklyTargetMenuBtn });
    });
  it('ME-152308, ME-81879, ME-88301 : Weekly Target: User can see Edit and Delete option in Kebab menu. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.verifyVisible({ element: targetsAndPerformancePage.editBtn });
      genericUtils.verifyVisible({ element: targetsAndPerformancePage.deleteBtn });
    });
  it('ME-152928 : Test Weekly Target: Delete option in Kebab menu and verify see the prompt with the message. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.verifyConfirmAlertMessage({ msgToVerify: targetsAndPerformanceData.expectedData.weeklyTargetDeleteConfirmMsg });
    });
  it('ME-152932 : Test Weekly Target: Click Delete option in Kebab menu and verify toast message. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.clickOkOnWindowAlertConfirm();
      genericUtils.toastMsg();
    });
  it('ME-152936 , ME-90606: Test Weekly Target: Delete option in Kebab menu and verify record got deleted. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.clickOkOnWindowAlertConfirm();
      genericUtils.toastMsg();
      genericUtils.verifyToNotExist({ element: targetsAndPerformancePage.weekOfHeaderValue });
    });
  it('ME-152963, ME-81594: Test Weekly Target: User should see column headers should display in Expand View. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverTargetsPerformance });
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
      genericUtils.clickExpand();
      genericUtils.verifyExists({ element: targetsAndPerformancePage.weeklyTargetExpandViewColHeader });
    });
  it('ME-152964, ME-81609 : Test Weekly Target: User can see weekly target table column headers same order mentioned. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverTargetsPerformance });
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
      genericUtils.clickExpand();
      targetsAndPerformanceData.expectedData.weeklyTargetsHeaders.forEach((val, index) => {
        genericUtils.verifyTextWithElemIndex({ locator: targetsAndPerformancePage.weeklyTargetExpandViewColHeaderNames, indexNum: index, verifyText: val });
      });
    });
  it('ME-153324, ME-81598 : Weekly Target: User can select No option in Delete option. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.clickCancelOnWindowAlertConfirm();
    });
  it('ME-153328, ME-81948 : Weekly Target: User can select no in delete confirm popup and able to see record exist. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.clickCancelOnWindowAlertConfirm();
      genericUtils.verifyVisibleElemPartialText({ locator: targetsAndPerformancePage.weekOfHeaderValue, value: weekDayStartMMDD });
    });
  it('ME-153331, ME-81891 : Weekly Target: User can Delete option in Kebab menu and verify see the prompt with the message in default view.. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      resourceUtilis.clickDeleteBtn();
      genericUtils.verifyConfirmAlertMessage({ msgToVerify: targetsAndPerformanceData.expectedData.weeklyTargetDeleteConfirmMsg });
    });
  it('ME-153333, ME-81947, ME-90607,ME-90608 : Test Weekly Target: Click Delete option in Kebab menu and verify toast message in Default view. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.clickOkOnWindowAlertConfirm();
      genericUtils.toastMsg();
    });
  it('ME-153335, ME-88302, ME-90605 : Test Weekly Target: Delete option in Kebab menu and verify record got deleted in Default view. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      resourceUtilis.clickDeleteBtn();
      genericUtils.clickOkOnWindowAlertConfirm();
      genericUtils.verifyToNotExist({ element: targetsAndPerformancePage.weekOfHeaderValue });
    });
  it('ME-81605, ME-81607, ME-81880, ME-81882, ME-81888 : Test Weekly Target: User should see column headers should display in Expand View and add, able to enter all fields. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverTargetsPerformance });
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
      genericUtils.clickExpand();
      targetsAndPerformanceData.expectedData.weeklyTargetsHeaders.forEach((val, index) => {
        genericUtils.verifyTextWithElemIndex({ locator: targetsAndPerformancePage.weeklyTargetExpandViewColHeaderNames, indexNum: index, verifyText: val });
      });
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.verifyWeeklyTargetFields();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.waitSometime(commonData.shortWait);
      genericUtils.toastMsg();
    });
  it('ME-81883 : Weekly Target: User can Add new with Any one(WeekStarting) of the mandatory fields is not filled with data',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.recurringWeeksTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetDaysTxtBx, typeText: targetsAndPerformanceData.expectedData.targetDaysVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetLoadedMiTxtBx, typeText: targetsAndPerformanceData.expectedData.targetDaysVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetMtMiTxtBx, typeText: targetsAndPerformanceData.expectedData.targetDaysVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetRevenueTxtBx, typeText: targetsAndPerformanceData.expectedData.targetDaysVal });
      genericUtils.verifyIfDisabled({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addWeeklyTargetBtn });
    });
  it('ME-81884 : Weekly Target: User can Add new with Any one(Target Days) of the mandatory fields is not filled with data',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.weekStartingTxtBx, typeText: weekDayStartMMDDYY });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.recurringWeeksTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.verifyIfDisabled({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addWeeklyTargetBtn });
    });
  it('ME-81893, ME-81949 : Test Weekly Target: able to click on the individual field of popup , enter all the mandatory fields is  filled with data, And User click on the Save Weekly Target button Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
    });
  it('ME-81896, ME-81939 : Test Weekly Target: User click "+" on the Weekly Target card,then modal popup will be display And User should click on the X button on the modal popup Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      genericUtils.verifyExists({ element: preferencesPage.btnCloseIcon });
      genericUtils.clickAction({ locator: preferencesPage.btnCloseIcon });
    });
  it('ME-81897, ME-81919, ME-81946 : Test Weekly Target: User click "+" on the Weekly Target card,then modal popup will be display And User should click on the X button on the modal popup Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      genericUtils.verifyExists({ element: preferencesPage.btnCloseIcon });
      genericUtils.clickAction({ locator: preferencesPage.btnCloseIcon });
    });
  it('ME-81898 : Test Weekly Target: User can validate The WEEKLY ACTIVITY card is updated with the newly saved data Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      genericUtils.verifyElementTextContains({ locator: preferencesPage.lblWeeklyActivity, verifyText: weekDayStartMMDD });
    });
  it('ME-81899, ME-81921 : Test Weekly Target: User can validate The WEEKLY ACTIVITY card is updated with the newly saved data Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      genericUtils.clickAction({ locator: preferencesPage.btnCloseIcon });
      genericUtils.verifyElementTextContains({ locator: preferencesPage.lblWeeklyActivity, verifyText: weekDayStartMMDD });
    });
  it('ME-88310 : Weekly Target edit: User can Add new with Any one(Target Days) of the mandatory fields is not filled with data',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.editBtn });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.weekStartingTxtBx, typeText: weekDayStartMMDDYY });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.recurringWeeksTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetDaysTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetLoadedMiTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetMtMiTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetRevenueTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.verifyIfDisabled({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addWeeklyTargetBtn });
    });
  it('ME-88308 : Weekly Target edit: User can Add new with Any one(Target Days) of the mandatory fields is not filled with data',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.editBtn });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.weekStartingTxtBx, typeText: weekDayStartMMDDYY });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.recurringWeeksTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetDaysTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetLoadedMiTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetMtMiTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetRevenueTxtBx, typeText: targetsAndPerformanceData.expectedData.recurringWeekVal });
      genericUtils.verifyIfDisabled({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addWeeklyTargetBtn });
    });
  it('ME-88314, ME-88320, ME-88321,ME-88322, ME-88332 : Weekly Target edit: User can Add new with  the mandatory fields filled with data',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.editBtn });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.weekStartingTxtBx, typeText: weekDayStartMMDDYY });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.recurringWeeksTxtBx, typeText: targetsAndPerformanceData.expectedData.weekDayVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetDaysTxtBx, typeText: targetsAndPerformanceData.expectedData.weekDayVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetLoadedMiTxtBx, typeText: targetsAndPerformanceData.expectedData.weekDayVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetMtMiTxtBx, typeText: targetsAndPerformanceData.expectedData.weekDayVal });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetRevenueTxtBx, typeText: targetsAndPerformanceData.expectedData.weekDayVal });
      genericUtils.verifyVisible({ element: targetsAndPerformancePage.weeklyTargetAddPopup.addWeeklyTargetBtn });
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addWeeklyTargetBtn });
      genericUtils.toastMsg();
      genericUtils.verifyElementTextContains({ locator: preferencesPage.lblWeeklyActivity, verifyText: weekDayStartMMDD });
    });
  it('ME-88324 : Weekly Target edit: User can click on the X button on the modal popup',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.editBtn });
      genericUtils.verifyExists({ element: preferencesPage.btnCloseIcon });
      genericUtils.clickAction({ locator: preferencesPage.btnCloseIcon });
    });
  it('ME-88331 : Weekly Target edit: User can expand and click on the X button on the modal popup',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.editBtn });
      genericUtils.verifyExists({ element: preferencesPage.btnCloseIcon });
      genericUtils.clickAction({ locator: preferencesPage.btnCloseIcon });
    });
  it('ME-90609: Test Weekly Target: Click Delete option in Kebab menu and verify No butoon. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.clickCancelOnWindowAlertConfirm();
    });
  it('ME-90610: Test Weekly Target: Delete option in Kebab menu and verify delete with X. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.clickCancelOnWindowAlertConfirm();
    });
  it('ME-90611: Test Weekly Target: User click the kebab menu on the Weekly Target card and select the DELETE option,And User select X from the prompt> Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
    });
  it('ME-90612: Test Weekly Target: Delete option in Kebab menu and verify delete with X. Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.verifyExists({ element: preferencesPage.btnCloseIcon });
      genericUtils.clickAction({ locator: preferencesPage.btnCloseIcon });
    });
  it('ME-81889: Test Weekly Target: User able to save the Weekly Target card and verify in DB Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: testserver, database: drivertestdatabase, query: driverWeeklyTargetquery }).then((results) => {
        const dbValue = results[0].targetDays;
        const expectedVal = targetsAndPerformanceData.expectedData.targetDaysVal;
        expect(expectedVal).to.contain(dbValue);
      });
    });
  it('ME-81890: Test Weekly Target: [expand view] User able to save the Weekly Target card and verify in DB Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: testserver, database: drivertestdatabase, query: driverWeeklyTargetquery }).then((results) => {
        const dbValue = results[0].targetDays;
        const expectedVal = targetsAndPerformanceData.expectedData.targetDaysVal;
        expect(expectedVal).to.contain(dbValue);
      });
    });
  it('[ME-88319, ME-88319] : Weekly Target: Verify user can Edit in expand view in DB validation.  Assets > Driver > Targets & Performance | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      cy.log(weekDayStartMMDDYY);
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.editBtn });
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.weekDayVal, targetsAndPerformanceData.expectedData.weekDayVal, targetsAndPerformanceData.expectedData.weekDayVal, targetsAndPerformanceData.expectedData.weekDayVal);
      genericUtils.toastMsg();
      cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: testserver, database: drivertestdatabase, query: driverWeeklyTargetquery }).then((results) => {
        const dbValue = results[0].targetDays;
        const expectedVal = targetsAndPerformanceData.expectedData.targetDaysVal;
        expect(expectedVal).to.contain(dbValue);
      });
    });
  it('ME-82098, ME-82100 : Weekly Target : date picker displayed below the Calendar icon with only the Sundays as clickable',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.clickWeeklyTargetAddIcon();
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.weekStartingTxtBx, typeText: weekDayStartMMDDYY });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.recurringWeeksTxtBx, typeText: targetsAndPerformanceData.expectedData.weekDayVal });
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.weekStartingTxtBx });
    });
  it('ME-82099, ME-82101 : Weekly Target : [expand view] date picker displayed below the Calendar icon with only the Sundays as clickable',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@targetsAndPerformance',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      resourceUtilis.navigateExpandViewWeeklyTargetAddPopup();
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.weekStartingTxtBx, typeText: weekDayStartMMDDYY });
      genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.recurringWeeksTxtBx, typeText: targetsAndPerformanceData.expectedData.weekDayVal });
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.weekStartingTxtBx });
    });
});