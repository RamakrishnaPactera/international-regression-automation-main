/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating add training tab order in default and expand view
 Test Cases List
 Authored By : Mamatha Polapalli
 Date : 16-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-137538] : [FE]validate add new training fields with tab key in default view and expand view of training card > Driver > Resources > History
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
describe('Validating carrot button and add new training in training card > Driver > Resources [ME-137538]', () => {
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
  it('[[ME-137538] : [FE]can user verify carrot button in default view and expand view of training card > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@p2',
      ],
    },
    () => {
      //validations in default view
      resourceUtilis.verifyTrainingTableOrderWithTabKey();
      //validations in expand view
      resourceUtilis.openTrainingInExpandView();
      resourceUtilis.verifyTrainingTableOrderWithTabKey();
    });
});