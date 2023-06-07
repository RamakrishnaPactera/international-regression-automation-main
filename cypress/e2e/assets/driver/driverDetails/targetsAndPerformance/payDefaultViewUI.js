/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver Event Details - UI Testcase
 Test Cases List                : ME-92723
 Authored By                    : Madhu Manyam
 Date                           : 15-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             : ME-92723,ME-156571 : To verify user is able to see Default view of the Pay table in Targets & Performances
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;

describe('User is able to see Default view of the Pay tab columns in Targets & Performances [ME-92723,ME-156571]', () => {
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
  it('ME-92723,ME-156571 : User is able to see Default view of the Pay table column headers in Targets & Performances. Assets > Driver > Targets & Performance | Regression',
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
      genericUtils.clickAction({ locator: driverCommonPage.tabPay });
      cy.get(driverCommonPage.tblPayTable).find(driverCommonPage.tblHeaderNames).should('not.exist');
    });
});