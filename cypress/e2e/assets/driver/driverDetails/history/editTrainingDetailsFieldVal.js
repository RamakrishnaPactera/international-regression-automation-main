/*-----------------------------------------------------------------------------------------------------------------------------------------------------
Verify Edit training in driver - UI Changes
Test Cases List
Authored By                   : K.Santhosh
Date                          : 21-04-2023
Functions/Calling References  : resourceUtilis, genericUtils, loginUtils, dateTimeUtils, utilities
Test Cases Included           : ME-98395 Can User Edit Training with editing Due Date field Driver > Resources |  Assets - Driver Training | Regression
--------------------------------------------------------------------------------------------------------------------------------------------------------*/
import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  addTrainingWithAllFields,
  clickEditInLastRow,
  openTrainingTblExpandView,
  searchDriverWithCode,
  verifyRowData,
} from '../../../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  getMinionValues,
  getTDMData,
  typeDropDwnClick,
  verifyIfDisabled,
  verifyToExist,
  viewFullPage,
  waitSometime,
  verifyToolTips,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  datePicker,
  getTodayDateAlongwithTimeWithoutSlash,
  returnfutureDateMMDDYY,
  returntodayDateMMDDYY,
} from '../../../../../utilities/commonUtils/dateTimeUtils';
import { genrateRandomName } from '../../../../../tdm/lib/utilities/utilities';
const { txtDriverName } = driverSearchPage;
const {
  longWait,
} = commonData;
const {
  btnDialogSubmit,
  drpdwnCompletedDate,
  drpdwnDueDate,
  drpdwnTypeTerm,
  rowInExpandView,
  rowsWithDataTrainingTable,
  tabDriverHistory,
  tblTraining,
} = historyPage;
const {
  minionDrpDwnOutcome,
  minionDrpDwnType,
  tdmAddDriverReq,
  tdmAddFacilityReq,
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmFacilityCommonScenario,
  tdmFacilityData,
  trainingCity,
  trainingCompletedDate,
  trainingDescription,
  trainingDueDate,
  trainingFacility,
  trainingOutcome,
  trainingTrainer,
  trainingType,
} = historyData.staticData;
const {
  dayCountVal,
  descriptionValue,
  monthCountVal,
  toolTipMsg,
  typeEmptyVal,
} = historyData.userDefinedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let trainingData, trainerName, drpDwnTypeOption1, drpDwnOutcomeOption1, driverDataTDM, facilityDataTDM;

describe('Edit training in driver training table [ME-98395, ME-98396, ME-98397, ME-98398, ME-98691, ME-98693, ME-98694, ME-98695, ME-98696, ME-98697]', () => {
  before(() => {
    getMinionValues(minionDrpDwnType, 7).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnOutcome, 2).then((resultOptions) => {
      drpDwnOutcomeOption1 = resultOptions[0];
    });
  });
  beforeEach(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.log('***creating facility using TDM***');
    getTDMData({ dataType: tdmFacilityData, dataCondition: tdmAddFacilityReq, dataScenario: tdmFacilityCommonScenario });
    cy.then(() => {
      facilityDataTDM = Cypress.env('inputVal');
    });

    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      trainerName = `${genrateRandomName()}` + getTodayDateAlongwithTimeWithoutSlash();
      trainingData = new Map([
        [trainingType, drpDwnTypeOption1],
        [trainingDueDate, returntodayDateMMDDYY()],
        [trainingCompletedDate, returntodayDateMMDDYY()],
        [trainingOutcome, drpDwnOutcomeOption1],
        [trainingFacility, facilityDataTDM.facilityName],
        [trainingCity, facilityDataTDM.city + ' , ' + facilityDataTDM.state],
        [trainingTrainer, trainerName],
        [trainingDescription, descriptionValue],
      ]);
    });
    viewFullPage();
    verifyToExist({ element: txtDriverName });
    clickAction({ locator: tabDriverHistory });
    verifyToExist({ element: tblTraining });
  });
  it('ME-98395 Can User Edit Training with editing Due Date field Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      clickEditInLastRow();
      datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      clickAction({ locator: btnDialogSubmit });
      verifyRowData({ locator: rowsWithDataTrainingTable, inputDataObj: trainingData });
    });
  it('ME-98396 Can User Edit Training with editing Due Date field Driver in Expand View > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      openTrainingTblExpandView();
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      clickEditInLastRow();
      datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      clickAction({ locator: btnDialogSubmit });
      verifyRowData({ locator: rowInExpandView, inputDataObj: trainingData });
    });
  it('ME-98397 Can User Edit Training with editing Completed Date field Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      clickEditInLastRow();
      datePicker({ dateLocator: drpdwnCompletedDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      clickAction({ locator: btnDialogSubmit });
      verifyRowData({ locator: rowsWithDataTrainingTable, inputDataObj: trainingData });
    });
  it('ME-98398 Can User Edit Training with editing Completed Date field Driver in Expand View > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      openTrainingTblExpandView();
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      clickEditInLastRow();
      datePicker({ dateLocator: drpdwnCompletedDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      clickAction({ locator: btnDialogSubmit });
      verifyRowData({ locator: rowInExpandView, inputDataObj: trainingData });
    });
  it('ME-98691 Can User Edit Training with editing Type field as blank Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      verifyRowData({ locator: rowsWithDataTrainingTable, inputDataObj: trainingData });
      clickEditInLastRow();
      typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: typeEmptyVal });
      verifyIfDisabled({ locator: btnDialogSubmit });
      verifyToolTips({ locator: btnDialogSubmit, verifyText: toolTipMsg });
    });
  it('ME-98693 Can User Edit Training with editing Type field as blank Driver in Expand View > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      openTrainingTblExpandView();
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      verifyRowData({ locator: rowInExpandView, inputDataObj: trainingData });
      clickEditInLastRow();
      typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: typeEmptyVal });
      verifyIfDisabled({ locator: btnDialogSubmit });
      verifyToolTips({ locator: btnDialogSubmit, verifyText: toolTipMsg });
    });
  it('ME-98694 Can User Edit Training with missing the mandatory fields Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      verifyRowData({ locator: rowsWithDataTrainingTable, inputDataObj: trainingData });
      clickEditInLastRow();
      typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: typeEmptyVal });
      verifyIfDisabled({ locator: btnDialogSubmit });
    });
  it('ME-98695 Can User Edit Training with missing the mandatory fields Driver in Expand View > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      openTrainingTblExpandView();
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      verifyRowData({ locator: rowInExpandView, inputDataObj: trainingData });
      clickEditInLastRow();
      typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: typeEmptyVal });
      verifyIfDisabled({ locator: btnDialogSubmit });
    });
  it('ME-98696 Can User Edit Training with fill the mandatory field Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      verifyRowData({ locator: rowsWithDataTrainingTable, inputDataObj: trainingData });
    });
  it('ME-98697 Can User Edit Training with fill the mandatory field Driver in Expand View > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      openTrainingTblExpandView();
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      verifyRowData({ locator: rowInExpandView, inputDataObj: trainingData });
    });
});