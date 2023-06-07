/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver Contact Details - UI Testcase
 Test Cases List                : ME-152309,ME-152310,ME-152311
 Authored By                    : Sainath
 Date                           : 06-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             :
                                   ME-152309,ME-156571 : Weekly Activities: Weekly Activity table should exist in Default View Assets > Driver > Targets & Performance | Regression
                                   ME-152310 : Weekly & Daily Activities: User should Verify Weekly Activity table headers- Default View. Assets > Driver > Targets & Performance | Regression
                                   ME-152311 : Weekly & Daily Activities: user should see column headers in Weekly Activity- Default View. Assets > Driver > Targets & Performance | Regression
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

describe('Driver weekly Activity validations [ME-152309,ME-152310,ME-152311,ME-156571]', () => {
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
  it('ME-152309, ME-156571 : Weekly Activities: Weekly Activity table should exist in Default View Assets > Driver > Targets & Performance | Regression',
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
      resourceUtilis.verifyTargetPerformanceTblAndHeader(targetsAndPerformancePage.weeklyActivityTbl);
    });
  it('ME-152310 : Weekly & Daily Activities: User should Verify Weekly Activity table headers- Default View. Assets > Driver > Targets & Performance | Regression',
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
      resourceUtilis.verifyTargetPerformanceTblAndHeader(targetsAndPerformancePage.weeklyActivityTblHeader);
    });
  it('ME-152311 : Weekly & Daily Activities: user should see column headers in Weekly Activity- Default View. Assets > Driver > Targets & Performance | Regression',
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
      resourceUtilis.verifyTargetPerformanceTblsHeaderSeq(targetsAndPerformanceData.expectedData.weeklyActivityColHeaders, targetsAndPerformancePage.weeklyActivityTblHeaderNames);
    });
});