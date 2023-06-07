/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver - Targets and Performance - Regression Testcases
 Test Cases List                : ME-137613,ME-137679,ME-137540,ME-137550,ME-137597,ME-137690,ME-137689,ME-137682,ME-137544,ME-137547
 Authored By                    : Mamatha Polapalli
 Date                           : 17-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             :
                                   ME-137613,ME-137679 : Weekly Target: user can verify carrot menu options in default and expand view Assets > Driver > Targets & Performance | Regression
                                   ME-137540,ME-137550 : Weekly Target: user can see all the cards in targets and performance tab. Assets > Driver > Targets & Performance | Regression
                                   ME-137597 : Weekly Target: user can verify kebab menu options. Assets > Driver > Targets & Performance | Regression
                                   ME-137690 : Weekly Target: user can verify Add New Weekly Target Popup with no mandatory fields Assets > Driver > Targets & Performance | Regression
                                   ME-137689 : Weekly Target: user can verify Add New Weekly Target Popup with no mandatory fields  Assets > Driver > Targets & Performance | Regression
                                   ME-137682 : Weekly Target: user can verify add weekly target and verify if weekly activity is updated Assets > Driver > Targets & Performance | Regression
                                   ME-137544 : Weekly Target: user can verify delete weekly target Assets > Driver > Targets & Performance | Regression
                                   ME-137547,ME-137546 : Weekly Target: User can select no in delete confirm popup and able to see record exist. Assets > Driver > Targets & Performance | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as targetsAndPerformancePage from '../../../../../pageObjects/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformancePage.json';
import * as targetsAndPerformanceData from '../../../../../testData/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformanceData.json';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
const startDateObj = genericUtils.getNextWeekFirstDay();

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;
const weekDayStartMMDDYY = startDateObj.mm + '/' + startDateObj.dd + '/' + startDateObj.yy;
const weekDayStartMMDD = startDateObj.mm + '/' + startDateObj.dd;

describe('Driver weekly targets validations - Regression Testcase [ME-137613,ME-137679,ME-137540,ME-137550,ME-137597,ME-137690,ME-137689,ME-137682,ME-137544,ME-137547]', () => {
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
  it('ME-137613,ME-137679 : Weekly Target: user can verify carrot menu options in default and expand view Assets > Driver > Targets & Performance | Regression',
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
      resourceUtilis.verifyCustomizeAndExpandIfClickable(targetsAndPerformancePage.weeklyTargetCarrotBtn);
      //genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
      genericUtils.clickExpand();
      resourceUtilis.verifyCustomizeAndExpandIfClickable(targetsAndPerformancePage.drpdwnCarrotBtnWeeklyTargetInExpand);
    });
  it('ME-137540,ME-137550 : Weekly Target: user can see all the cards in targets and performance tab Assets > Driver > Targets & Performance | Regression',
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
      resourceUtilis.verifyTargetsAndPerformanceCards();
    });
  it('ME-137597 : Weekly Target: user can verify kebab menu options Assets > Driver > Targets & Performance | Regression',
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
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.verifyKebabMenuOptions();
      //validation in expand view
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
      genericUtils.clickExpand();
      resourceUtilis.verifyKebabMenuOptions();
    });
  it('ME-137690 : Weekly Target: user can verify Add New Weekly Target Popup with no mandatory fields Assets > Driver > Targets & Performance | Regression',
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
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.verifyAddWeeklyTargetWithNoMandatoryField(targetsAndPerformanceData.expectedData.targetDaysVal);
      //validation in expand view
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
      genericUtils.clickExpand();
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.verifyAddWeeklyTargetWithNoMandatoryField(targetsAndPerformanceData.expectedData.targetDaysVal);
    });
  it('ME-137689 : Weekly Target: user can verify Add New Weekly Target Popup with no mandatory fields Assets > Driver > Targets & Performance | Regression',
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
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.editBtn });
      resourceUtilis.editWeeklyTargetWithNoMandatoryField();
      //validation in expand view
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
      genericUtils.clickExpand();
      genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
      genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.editBtn });
      resourceUtilis.editWeeklyTargetWithNoMandatoryField();
    });
  it('ME-137682 : Weekly Target: user can verify add weekly target and verify if weekly activity is updated Assets > Driver > Targets & Performance | Regression',
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
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.verifyAttrText({ locator: targetsAndPerformancePage.weeklyActivityWeekOfHeader, attribute: historyData.staticData.attrTitle, verifyText: weekDayStartMMDD });
      //validation in expand view
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
      genericUtils.clickExpand();
      genericUtils.verifyAttrText({ locator: targetsAndPerformancePage.weeklyActivityWeekOfHeader, attribute: historyData.staticData.attrTitle, verifyText: weekDayStartMMDD });
    });
  it('ME-137544 : Weekly Target: user can verify delete weekly target Assets > Driver > Targets & Performance | Regression',
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
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.verifyConfirmAlertMessage({ msgToVerify: targetsAndPerformanceData.expectedData.weeklyTargetDeleteConfirmMsg });
      genericUtils.clickOkOnWindowAlertConfirm();
      genericUtils.toastMsg();
      genericUtils.verifyToNotExist({ element: targetsAndPerformancePage.weekOfHeaderValue });
      //validation in expand view
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
      genericUtils.clickExpand();
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.verifyConfirmAlertMessage({ msgToVerify: targetsAndPerformanceData.expectedData.weeklyTargetDeleteConfirmMsg });
      genericUtils.clickOkOnWindowAlertConfirm();
      genericUtils.toastMsg();
      genericUtils.verifyToNotExist({ element: targetsAndPerformancePage.weekOfHeaderValue });
    });
  it('ME-137547,ME-137546 : Weekly Target: User can select no in delete confirm popup and able to see record exist. Assets > Driver > Targets & Performance | Regression',
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
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.clickCancelOnWindowAlertConfirm();
      genericUtils.verifyVisibleElemPartialText({ locator: targetsAndPerformancePage.weekOfHeaderValue, value: weekDayStartMMDD });
      //validation in expand view
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
      genericUtils.clickExpand();
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      resourceUtilis.clickDeleteBtn();
      genericUtils.clickCancelOnWindowAlertConfirm();
      genericUtils.verifyVisibleElemPartialText({ locator: targetsAndPerformancePage.weekOfHeaderValue, value: weekDayStartMMDD });
    });
});