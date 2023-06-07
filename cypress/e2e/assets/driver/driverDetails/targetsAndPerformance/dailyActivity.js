/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver Contact Details - UI Testcase
 Test Cases List                : ME-152943,ME-152957,ME-152959
 Authored By                    : Sainath
 Date                           : 08-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             :
                                   ME-152943,ME-156571 : Test Weekly & Daily Activities: Daily Activity table in Default View should exist. Assets > Driver > Targets & Performance | Regression
                                   ME-152957 : Test Weekly & Daily Activities: Daily Activity column header should display in Default View. Assets > Driver > Targets & Performance | Regression
                                   ME-152959 : Test Weekly & Daily Activities: Daily Activity columns displayed in the same order mentioned- Default View. Assets > Driver > Targets & Performance | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as targetsAndPerformancePage from '../../../../../pageObjects/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformancePage.json';
import * as targetsAndPerformanceData from '../../../../../testData/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformanceData.json';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;

describe('Driver Daily Activity validations [ME-152943,ME-152957,ME-152959,ME-156571]', () => {
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
  it('ME-152943,ME-156571 : Test Weekly & Daily Activities: Daily Activity table in Default View should exist. Assets > Driver > Targets & Performance | Regression',
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
      resourceUtilis.verifyTargetPerformanceTblAndHeader(targetsAndPerformancePage.dailyActivityTbl);
    });
  it('ME-152957 : Test Weekly & Daily Activities: Daily Activity column header should display in Default View. Assets > Driver > Targets & Performance | Regression',
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
      resourceUtilis.verifyTargetPerformanceTblAndHeader(targetsAndPerformancePage.dailyActivityTblHeader);
    });
  it('ME-152959 : Test Weekly & Daily Activities: Daily Activity columns displayed in the same order mentioned- Default View. Assets > Driver > Targets & Performance | Regression',
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
      resourceUtilis.verifyTargetPerformanceTblsHeaderSeq(targetsAndPerformanceData.expectedData.dailyActivityHeaders, targetsAndPerformancePage.dailyActivityTblHeaderNames);
    });
});