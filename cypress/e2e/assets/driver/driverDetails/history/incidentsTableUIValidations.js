/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating Incidents card
 Test Cases List
 Authored By : Mamatha Polapalli
 Date : 09-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-97957][ME-97958][ME-97960][ME-97961][ME-137529][ME-156571] : [FE]validate Incidents table UI validations > Driver > Resources > History
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import * as historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';

const {
  tdmAddDriverReq,
  tdmDriverData,
} = historyData.staticData;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverScenario, driverDataTDM;
describe('UI validations of Incidents table > Driver > Resources [ME-97957][ME-97958][ME-97960][ME-97961][ME-137529][ME-156571]', () => {
  beforeEach(() => {
    cy.log('***creating driver using TDM***');
    genericUtils.getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: driverScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
    });
    genericUtils.verifyToExist({ element: driverSearchPage.txtDriverName });
    genericUtils.clickAction({ locator: historyPage.tabDriverHistory });
    genericUtils.verifyToExist({ element: historyPage.tblTraining });
  });
  it('[ME-97957,ME-97958,ME-97960,ME-979615,ME-137529,ME-156571] : [FE]can user verify Incidents table UI validations > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      genericUtils.verifyExists({ element: historyPage.tabIncidents });
      genericUtils.verifyTableColumnsHeaders({ locator: historyPage.colHeadersIncidents, columnNames: historyData.staticData.colHeadersIncidents });
      genericUtils.verifyVisible({ element: historyPage.drpDwnTypeFilterIncidents });
      resourceUtilis.verifyShowClosedCheckBoxChecked();
      resourceUtilis.verifyIncidentsTableToBeBlank();
    });
});