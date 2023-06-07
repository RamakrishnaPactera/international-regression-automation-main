/*-----------------------------------------------------------------------------------------------------------------------------------------------------
Verify Edit training in driver History - UI Validation and Verification
Authored By                   : Murali
Date                          : 15-05-2023
Functions/Calling References  : resourceUtilis, genericUtils, loginUtils, dateTimeUtils, utilities
Test Cases Included           :
ME-96454 Verify Delete option in the kebab menu in Default view
ME-155108 Verify Delete option in the kebab menu in Expanded view
ME-96455 Verify Delete option and click on Delete in the kebab menu in Default view
ME-155133 Verify Delete option and click on delete in the kebab menu in Expanded view
ME-96456 Verify Delete functionality of the Training card in Default view when user  choose  'Ok' for the alert 'Are you sure you want to delete this Training'
ME-155415 Verify Delete functionality of the Training card in Expanded view when user  choose 'Ok' for the alert 'Are you sure you want to delete this Training'
ME-96457 Verify Delete functionality of the Training card in  Default view when user choose "Cancel" for the alert "Are you sure you want to delete this Training
ME-155383  Verify Delete functionality of the Training card in Expanded view when user choose 'Cancel' for the alert 'Are you sure you want to delete this Training'
--------------------------------------------------------------------------------------------------------------------------------------------------------*/
import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  addTrainingWithFewFields,
  verifyDeleteInLastRow,
  clickDeleteInLastRow,
  openTrainingTblExpandView,
  searchDriverWithCode,
} from '../../../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  clickOkOnWindowAlert,
  clickCancelOnWindowAlert,
  getMinionValues,
  getTDMData,
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
const { txtDriverName } = driverSearchPage;
const {
  longWait,
} = commonData;
const {
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
  descriptionValue,
} = historyData.userDefinedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let trainingData, trainerName, drpDwnTypeOption1, drpDwnOutcomeOption1, driverDataTDM, facilityDataTDM;

describe('Delete option in driver training card [ME-96454][ME-155108][ME-96455][ME-155133][ME-96456][ME-155415][ME-96457][ME-155383]', () => {
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
  it('ME-96454 Verify Delete option in the kebab menu in Default view', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    //Adding a New Training Card
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    //Verify Delete option in the kebab menu in Default view
    verifyDeleteInLastRow();
  });
  it('ME-155108 Verify Delete option in the kebab menu in Expanded view', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    //Adding a New Training Card
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    openTrainingTblExpandView();
    //Verify Delete option in the kebab menu in Expand view
    verifyDeleteInLastRow();
  });
  it('ME-96455 Verify Delete option and click on Delete in the kebab menu in Default view', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    //Adding a New Training Card
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    //Verify Delete Access and click in the kebab menu to See confirmation prompt in Default view
    clickDeleteInLastRow();
  });
  it('ME-155133 Verify Delete option and click on delete in the kebab menu in Expanded view', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    //Adding a New Training Card
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    openTrainingTblExpandView();
    //Verify Delete Access and click in the kebab menu to See confirmation prompt in Expand view
    clickDeleteInLastRow();
  });
  it('MME-96456 Verify Delete functionality of the Training card in Default view when user  choose  Ok for the alert Are you sure you want to delete this Training', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    //Adding a New Training Card
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    //Verify Delete Access and click in the kebab menu to See confirmation prompt in Default view
    clickDeleteInLastRow();
    waitSometime(longWait);
    clickOkOnWindowAlert();
  });
  it('ME-155415 Verify Delete functionality of the Training card in Expanded view when user choose Ok for the alert Are you sure you want to delete this Training', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    //Adding a New Training Card
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    openTrainingTblExpandView();
    //Verify Delete Access and click in the kebab menu to See confirmation prompt in Expand view
    clickDeleteInLastRow();
    waitSometime(longWait);
    clickOkOnWindowAlert();
  });
  it('ME-96457 Verify Delete functionality of the Training card in  Default view when user choose Cancel for the alert "Are you sure you want to delete this Training', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    //Adding a New Training Card
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    //Verify Delete Access and click in the kebab menu to See confirmation prompt in Default view
    clickDeleteInLastRow();
    waitSometime(longWait);
    //Verify Delete Option by clicking CANCEL confirmation in Detail View
    clickCancelOnWindowAlert();
  });
  it('ME-155383  Verify Delete functionality of the Training card in Expanded view when user choose Cancel for the alert Are you sure you want to delete this Training', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    //Adding a New Training Card
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    openTrainingTblExpandView();
    //Verify Delete Access and click in the kebab menu to See confirmation prompt in Expand view
    clickDeleteInLastRow();
    waitSometime(longWait);
    //Verify Delete Option by clicking CANCEL confirmation in Detail View
    clickCancelOnWindowAlert();
  });
});