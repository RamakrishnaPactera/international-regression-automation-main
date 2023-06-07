import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  addTrainingIfNotExist,
  clickDeleteInLastRow,
  openTrainingTblExpandView,
  searchDriverWithCode,
  verifyLastRowContainsColumnTxt,
} from '../../../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  clickCancelOnWindowAlert,
  getMinionValues,
  getTDMData,
  toastWithMsg,
  verifyToExist,
  verifyWindowAlertWithMessage,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { txtDriverName } = driverSearchPage;
const {
  shortWait,
} = commonData;
const {
  rowInExpandView,
  tabDriverHistory,
  tblTraining,
} = historyPage;
const {
  minionDrpDwnType,
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  tdmDriverData,
  trainingType,
} = historyData.staticData;
const {
  alertMsgForDeleteTraining,
  msgDeleteTraining,
} = historyData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let drpDwnTypeOption1, driverDataTDM;

describe('Delete training in driver training table [ME-108815,ME-137687] [ME-137524]', () => {
  before(() => {
    getMinionValues(minionDrpDwnType, 7).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
  });
  beforeEach(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });

    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
    });
    viewFullPage();
    verifyToExist({ element: txtDriverName });
    clickAction({ locator: tabDriverHistory });
    verifyToExist({ element: tblTraining });
  });
  it('ME-108815, ME-137687, ME-137524- Can I delete training Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@p1',
      ],
    }, () => {
      //Pre-Requisite
      addTrainingIfNotExist({ typrDrpDwnVal: drpDwnTypeOption1 });
      //clicking Delete from kebab menu
      clickDeleteInLastRow();
      //validating window prompt
      verifyWindowAlertWithMessage({ msgToVerify: alertMsgForDeleteTraining });
      //clicking cancel on window prompt and validating row should not delete
      clickCancelOnWindowAlert();
      //Select Delete from Kebab menu and validating row is deleted or not
      clickDeleteInLastRow();
      toastWithMsg({ message: msgDeleteTraining });
      waitSometime(shortWait);
      //adding pre-requisite data
      addTrainingIfNotExist({ typrDrpDwnVal: drpDwnTypeOption1 });
      //validations in expandView
      //opening expand view
      openTrainingTblExpandView();
      verifyLastRowContainsColumnTxt({ locator: rowInExpandView, locatorColumn: trainingType, containsText: drpDwnTypeOption1 });
      //select delete from kebab menu
      clickDeleteInLastRow();
      //validating window prompt
      verifyWindowAlertWithMessage({ msgToVerify: alertMsgForDeleteTraining });
      //clicking cancel on window prompt and validating row should not delete
      clickCancelOnWindowAlert();
      //Select Delete from Kebab menu and validating row row is deleted or not
      clickDeleteInLastRow();
      toastWithMsg({ message: msgDeleteTraining });
    });
});