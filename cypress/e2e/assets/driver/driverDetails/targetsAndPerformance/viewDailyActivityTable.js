/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver view daily activity - Regression Testcase
 Test Cases List                : ME-92722,ME-92749
 Authored By                    : Mamatha Polapalli
 Date                           : 25-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             : ME-137685 : To verify user is able to add weekly targets and view daily activity data is reflecting in DB
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as targetsAndPerformancePage from '../../../../../pageObjects/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformancePage.json';
import * as targetsAndPerformanceData from '../../../../../testData/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformanceData.json';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import * as sqlData from '../../../../../testData/sqlData/sqlData.json';

const {
  testserver,
  testDriverDailyActivityAddRecordQuery,
} = sqlData.sqlData;
const startDateObj = genericUtils.getNextWeekFirstDay();
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;
const weekDayStartMMDDYY = startDateObj.mm + '/' + startDateObj.dd + '/' + startDateObj.yy;
const weekDayStartMMDD = startDateObj.mm + '/' + startDateObj.dd;

describe('Driver view daily activity DB validations - Regression Testcase [ME-137685]', () => {
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
  it('ME-137685: Weekly Target: user can Add New Weekly Target and view daily activity data in DB Assets > Driver > Targets & Performance | Regression',
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
      //validations in default view
      genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
      resourceUtilis.addWeeklytargets(weekDayStartMMDDYY, targetsAndPerformanceData.expectedData.recurringWeekVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal, targetsAndPerformanceData.expectedData.targetDaysVal);
      genericUtils.toastMsg();
      genericUtils.verifyAttrText({ locator: targetsAndPerformancePage.weeklyActivityWeekOfHeader, attribute: historyData.staticData.attrTitle, verifyText: weekDayStartMMDD });
      //validations in DB
      cy.url().then((text) => {
        const expectedValue = targetsAndPerformanceData.expectedData.weekDay;
        cy.task('azureSQL', { user: sqlData.sqlData.drivertestuser, password: sqlData.sqlData.driverKey, server: testserver, portVal: sqlData.sqlData.testportVal, database: sqlData.sqlData.drivertestdatabase, query: testDriverDailyActivityAddRecordQuery }).then((results) => {
          cy.log('Selected record ' + JSON.stringify(results));
          const actualValue = results[0].weekDay;
          expect(actualValue).to.eq(expectedValue);
        });
      });
    });
});