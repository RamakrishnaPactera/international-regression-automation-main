import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  addTrainingIfNotExist,
  addTrainingWithAllFields,
  clickDeleteInLastRow,
  clickEditInLastRow,
  editTrainingWithAllFields,
  openTrainingTblExpandView,
  searchDriverWithCode,
  verifyRowData,
  verifySaveFunctionality,
} from '../../../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  getMinionValues,
  getTDMData,
  toastWithMsg,
  typeDropDwnClick,
  verifyTextContains,
  verifyToExist,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  getTodayDateAlongwithTimeWithoutSlash,
  returntodayDateMMDDYY,
} from '../../../../../utilities/commonUtils/dateTimeUtils';
import { genrateRandomName } from '../../../../../tdm/lib/utilities/utilities';
const { expandViewDialogWindow, txtDriverName } = driverSearchPage;
const {
  longWait,
} = commonData;
const {
  btnDialogSubmit,
  drpdwnOutcome,
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
  titleEditTrainingDialog,
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
  msgAddTraining,
} = historyData.expectedData;
const {
  descriptionValue,
} = historyData.userDefinedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let trainingData, trainerName, drpDwnTypeOption1, drpDwnTypeOption2, drpDwnOutcomeOption1, drpDwnOutcomeOption2, driverDataTDM, facilityDataTDM;

describe('Edit training in driver training table [ME-108813.ME-112033,ME-112036,ME-137687]', () => {
  before(() => {
    getMinionValues(minionDrpDwnType, 7).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
      drpDwnTypeOption2 = resultOptions[1];
    });
    getMinionValues(minionDrpDwnOutcome, 2).then((resultOptions) => {
      drpDwnOutcomeOption1 = resultOptions[0];
      drpDwnOutcomeOption2 = resultOptions[1];
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
  it('ME-108813 Can I Edit Training with Mandatory fields Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      //Pre-Requisite
      addTrainingIfNotExist({ typrDrpDwnVal: drpDwnTypeOption1 });
      waitSometime(longWait);
      //validations in defaultView
      //verifying Edit training popup is displaying or not
      clickEditInLastRow();
      verifyTextContains({ locator: expandViewDialogWindow, containsText: titleEditTrainingDialog });
      //editing Type field values in Edit training popup
      typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: drpDwnTypeOption2 });
      //validating save functionality and toast message
      verifySaveFunctionality({ locator: rowsWithDataTrainingTable, dataText: drpDwnTypeOption2 });
      //validations in expandView
      //opening expand view
      openTrainingTblExpandView();
      //verifying Edit training popup is displaying or not
      clickEditInLastRow();
      verifyTextContains({ locator: expandViewDialogWindow, containsText: titleEditTrainingDialog });
      //editing Type field values in Edit training popup
      typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: drpDwnTypeOption1 });
      //validating save functionality and toast message
      verifySaveFunctionality({ locator: rowInExpandView, dataText: drpDwnTypeOption1 });
    });
  it('ME-112033,ME-137687 Can I Edit Training with adding optional fields Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      //Pre-Requisite
      addTrainingIfNotExist({ typrDrpDwnVal: drpDwnTypeOption1 });
      waitSometime(longWait);
      //validations in defaultView
      //editing Type field values in Edit training popup
      editTrainingWithAllFields({ map: trainingData });
      //validating save functionality and toast message
      toastWithMsg({ message: msgAddTraining });
      waitSometime(longWait);
      verifyRowData({ locator: rowsWithDataTrainingTable, inputDataObj: trainingData });
      clickDeleteInLastRow();
      waitSometime(longWait);
      addTrainingIfNotExist({ typrDrpDwnVal: drpDwnTypeOption1 });
      waitSometime(longWait);
      //validations in expandView
      //opening expand view
      openTrainingTblExpandView();
      //verifying Edit training popup is displaying or not
      editTrainingWithAllFields({ map: trainingData });
      //validating save functionality and toast message
      toastWithMsg({ message: msgAddTraining });
      waitSometime(longWait);
      verifyRowData({ locator: rowInExpandView, inputDataObj: trainingData });
    });
  it('ME-112036 Can I Edit Training with editing optional fields Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      //Pre-Requisite
      addTrainingWithAllFields({ map: trainingData });
      waitSometime(longWait);
      //validations in defaultView
      clickEditInLastRow();
      typeDropDwnClick({ locator: drpdwnOutcome, drpDwnVal: drpDwnOutcomeOption2 });
      clickAction({ locator: btnDialogSubmit });
      verifyRowData({ locator: rowsWithDataTrainingTable, inputDataObj: trainingData });
      //validations in expandView
      //opening expand view
      openTrainingTblExpandView();
      //verifying Edit training popup is displaying or not
      clickEditInLastRow();
      typeDropDwnClick({ locator: drpdwnOutcome, drpDwnVal: drpDwnOutcomeOption1 });
      clickAction({ locator: btnDialogSubmit });
      verifyRowData({ locator: rowInExpandView, inputDataObj: trainingData });
    });
});