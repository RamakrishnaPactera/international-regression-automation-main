import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { clickActionWait, verifyVisible, viewFullPage, clickAction, getTDMData } from '../../../../../utilities/commonUtils/genericUtils';
import { searchDriverWithCode, verifyDateFormatMMDDYY } from '../../../../../utilities/assetUtils/resourceUtilis';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import { datePicker, returntodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';
import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
const { btnAddNewTarget, drpdwnCarrotBtnTraining, btnCarrotMenuexpandTrainingCards, btnHistoryTypeTerm, drpdwnDueDate, drpdwnTypeTermHistory, btnDialogSubmit, btnExpandDropDwnTypeTerm } = historyPage;
const {
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddDriverReq,
} = addDriverData.staticData;
const {
  tabDriverHistory,
  snapShot,
} = driverCommonPage;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;
describe('Verify Training Cards> History [ME-90703][ME-155645]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.log('***creating customer using TDM***');
  });

  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-90703 Verify "Due Date" date format In Default View > Driver > Training Cards',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigating to history tab
      clickActionWait({ locator: tabDriverHistory });
      verifyVisible({ element: snapShot });
      clickAction({ locator: btnAddNewTarget });
      clickAction({ locator: btnHistoryTypeTerm });
      clickAction({ locator: btnExpandDropDwnTypeTerm });
      clickAction({ locator: drpdwnTypeTermHistory });
      datePicker({ dateLocator: drpdwnDueDate, dataText: returntodayDateMMDDYY() });
      clickAction({ locator: btnDialogSubmit });
      verifyDateFormatMMDDYY();
    });
  it('ME-155645 Verify "Due Date" date format In Expand View > Driver > Training Cards',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigating to history tab
      clickActionWait({ locator: tabDriverHistory });
      verifyVisible({ element: snapShot });
      clickAction({ locator: drpdwnCarrotBtnTraining });
      clickAction({ locator: btnCarrotMenuexpandTrainingCards });
      clickAction({ locator: btnAddNewTarget });
      clickAction({ locator: btnHistoryTypeTerm });
      clickAction({ locator: btnExpandDropDwnTypeTerm });
      clickAction({ locator: drpdwnTypeTermHistory });
      datePicker({ dateLocator: drpdwnDueDate, dataText: returntodayDateMMDDYY() });
      clickAction({ locator: btnDialogSubmit });
      verifyDateFormatMMDDYY();
    });
});