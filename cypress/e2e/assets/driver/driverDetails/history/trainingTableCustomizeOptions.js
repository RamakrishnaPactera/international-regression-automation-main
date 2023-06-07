/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating training card customize options and drag and drop validation
 Test Cases List
 Authored By : Mamatha Polapalli
 Date : 10-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-97850,ME-97854,ME-97845,ME-97851,ME-97848,ME-97853,ME-137531] : [FE]validate customize options in default view of training card > Driver > Resources > History
                    : [ME-97855,ME-97849,ME-97852,ME-97847,ME-97844,ME-97846,ME-137531]  :[FE]validate customize options in expand view of training card > Driver > Resources > History
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import * as historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';

const {
  tdmAddDriverReq,
  tdmDriverData,
} = historyData.staticData;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverScenario, driverDataTDM;
describe('Validating customize options in training card > Driver > Resources [ME-97850,ME-97854,ME-97845,ME-97851,ME-97848,ME-97853][ME-97855,ME-97849,ME-97852,ME-97847,ME-97844,ME-97846]', () => {
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
  it('[ME-97850,ME-97854,ME-97845,ME-97851,ME-97848,ME-97853,ME-137531] : [FE]can user verify customize options and drad and drop in training table-default view > Driver > Resources |  Assets - Driver | Regression',
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
      resourceUtilis.verifyCustomizeOptionsTraining(historyData.userDefinedData.defaultView);
      genericUtils.verifyTableColumnsHeaders({ locator: historyPage.tblHeaderColumns, columnNames: historyData.staticData.columnHeaderTraining });
      resourceUtilis.hideOptionInTrainingCustomize(historyData.userDefinedData.defaultView);
      resourceUtilis.enableHideOptionInTrainingTable(historyData.userDefinedData.defaultView);
      resourceUtilis.verifyTrainingCustomizeDragAndDrop(historyData.userDefinedData.defaultView);
    });
  it('[ME-97855,ME-97849,ME-97852,ME-97847,ME-97844,ME-97846,ME-137531] : [FE]can user verify customize options and drad and drop in training table- expand view > Driver > Resources |  Assets - Driver | Regression',
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
      //validations in expand view
      resourceUtilis.openTrainingInExpandView();
      resourceUtilis.verifyCustomizeOptionsTraining(historyData.userDefinedData.expandView);
      resourceUtilis.openTrainingInExpandView();
      resourceUtilis.hideOptionInTrainingCustomize(historyData.userDefinedData.expandView);
      resourceUtilis.openTrainingInExpandView();
      resourceUtilis.enableHideOptionInTrainingTable(historyData.userDefinedData.expandView);
      resourceUtilis.openTrainingInExpandView();
      resourceUtilis.verifyTrainingCustomizeDragAndDrop(historyData.userDefinedData.expandView);
    });
});