/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver Event Details - UI Testcase
 Test Cases List                : ME-92741,ME-92743
 Authored By                    : Madhu Manyam
 Date                           : 15-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             : ME-92741,ME-92743 : To verify user is able to see Default view, Expand of the ROUTE List title, columns in Targets & Performances
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as targetsAndPerformanceData from '../../../../../testData/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformanceData.json';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import * as targetsAndPerformancePage from '../../../../../pageObjects/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformancePage.json';
import * as commonPage from '../../../../../pageObjects/commonPage/commonPage.json';

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;

describe('User is able to see Default view of the Rouet List columns header in Targets & Performances [ME-92741, ME-92743]', () => {
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
  it('ME-92741 : User is able to see Route list columns headers in Default view in Targets & Performances. Assets > Driver > Targets & Performance | Regression',
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
      resourceUtilis.verifyTargetPerformanceTblsHeaderSeq(targetsAndPerformanceData.expectedData.routeListHeaders, driverCommonPage.tblRouteListTable + ' ' + driverCommonPage.tblHeaderNames);
    });
  it('ME-92743 : User is able to see Route list columns headers in Expand view in Targets & Performances. Assets > Driver > Targets & Performance | Regression',
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
      genericUtils.clickAction({ locator: targetsAndPerformancePage.btnRoueListCustomCarrot });
      genericUtils.clickExpand();
      resourceUtilis.verifyTargetPerformanceTblsHeaderSeq(targetsAndPerformanceData.expectedData.routeListHeaders, commonPage.dialogTable + ' ' + driverCommonPage.tblHeaderNames);
    });
});