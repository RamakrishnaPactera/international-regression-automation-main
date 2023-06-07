/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating training card carrot button and add new training record
 Test Cases List
 Authored By : Mamatha Polapalli
 Date : 09-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-96798][ME-96799][ME-96800][ME-96801][ME-137531] : [FE]validate carrot button in default view and expand view of training card > Driver > Resources > History
                    : [ME-96802][ME-96803][ME-96804][ME-96805][ME-96806][ME-96807][ME-137531] : [FE]validate add new training in training card > Driver > Resources > History
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import * as historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import * as commonPage from '../../../../../pageObjects/commonPage/commonPage.json';
import * as dateTimeUtils from '../../../../../utilities/commonUtils/dateTimeUtils';

const {
  minionDrpDwnType,
  tdmAddDriverReq,
  tdmDriverData,
} = historyData.staticData;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverScenario, driverDataTDM, drpDwnTypeOption1;
describe('Validating carrot button and add new training in training card > Driver > Resources [ME-96798][ME-96799][ME-96800][ME-96801][ME-96802][ME-96803][ME-96804][ME-96805][ME-96806][ME-96807][ME-137531', () => {
  before(() => {
    genericUtils.getMinionValues(minionDrpDwnType, 2).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
  });
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
  it('[[ME-96798,ME-96799,ME-96800,ME-96801][ME-137531] : [FE]can user verify carrot button in default view and expand view of training card > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      genericUtils.verifyExists({ element: historyPage.drpdwnCarrotBtnTraining });
      resourceUtilis.verifyCustomizeAndExpandIfClickable(historyPage.drpdwnCarrotBtnTraining);
      resourceUtilis.openTrainingTblExpandView();
      resourceUtilis.verifyIfExpandNotClickable(commonPage.contextMenuBtn);
    });
  it('[ME-96802,ME-96803,ME-96804,ME-96805,ME-96806,ME-96807][ME-137531] : [FE]verify if user can add new training from > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      genericUtils.verifyExists({ element: historyPage.btnTrainingAddNew });
      resourceUtilis.addTraining({ typrDrpDwnVal: drpDwnTypeOption1, date: dateTimeUtils.returntodayDateMMDDYY() });
      resourceUtilis.verifyKebabMenuInEachRow({ locator: historyPage.tblTraining });
      resourceUtilis.openTrainingTblExpandView();
      genericUtils.verifyExists({ element: historyPage.btnTrainingAddNew });
      resourceUtilis.verifyCloseIconInExpandView();
    });
});