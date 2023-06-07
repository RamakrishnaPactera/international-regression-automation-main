/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Driver History - Search Driver with drivercode and Validate Training Card Fields
 Test Cases List
 Authored By : Hima Bindu Pulukurthi
 Date : 15-05-2023,
 Functions/Calling References : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-90701][ME-155174][ME-155168][ME-155176][ME-155184][ME-155191] Verify Training Cards| Assets - Driver History Tab| Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { clickActionWait, verifyVisible, viewFullPage, clickAction, getTDMData, verifyAttrValueContains } from '../../../../../utilities/commonUtils/genericUtils';
import { searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import { datePicker, returnTodayDateMinusOneDD, returntodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';
import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
const { btnAddNewTarget, drpdwnCarrotBtnTraining, btnCarrotMenuexpandTrainingCards, btnHistoryTypeTerm, drpdwnDueDate, drpdwnCompletedDate, drpdwnTypeTermHistory, btnDialogSubmit, btnExpandDropDwnTypeTerm } = historyPage;
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
const day = returnTodayDateMinusOneDD();
const locator = `[aria-label="day-${day}"]`;
let driverDataTDM;
describe('Verify Training Cards> History [ME-90701][ME-155174][ME-155168][ME-155176][ME-155184][ME-155191]', () => {
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
  it('ME-90701 Verify "Due Date" In Default View > Driver > Training Cards',
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
    });
  it('ME-155174 Verify "Completed Date" In Default View > Driver > Training Cards',
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
      datePicker({ dateLocator: drpdwnCompletedDate, dataText: returntodayDateMMDDYY() });
      clickAction({ locator: btnDialogSubmit });
    });
  it('ME-155168 Verify "Due Date" In Expand View > Driver > Training Cards',
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
    });
  it('ME-155176 Verify "Completed Date" In Expand View > Driver > Training Cards',
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
      datePicker({ dateLocator: drpdwnCompletedDate, dataText: returntodayDateMMDDYY() });
      clickAction({ locator: btnDialogSubmit });
    });
  it('ME-155184 Verify "Due Date" should not be able to select dates which is before the creation date. > Driver > Training Cards',
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
      clickAction({ locator: drpdwnDueDate });
      verifyAttrValueContains({ locator, attribute: 'aria-disabled', verifyText: 'true' });
      clickAction({ locator: btnDialogSubmit });
    });
  it('ME-155191 Verify "Completed Date" should not be able to select dates which is before the creation date. > Driver > Training Cards',
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
      clickAction({ locator: drpdwnCompletedDate });
      verifyAttrValueContains({ locator, attribute: 'aria-disabled', verifyText: 'true' });
      clickAction({ locator: btnDialogSubmit });
    });
});