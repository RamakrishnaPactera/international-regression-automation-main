import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  addTrainingWithAllFields,
  clickDeleteInLastRow,
  openTrainingTblExpandView,
  searchDriverWithCode,
  verifyRowData,
  verifySaveFunctionality,
  verifyTabAddNewTraining,
} from '../../../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  getMinionValues,
  getTDMData,
  toastWithMsg,
  typeDropDwnClick,
  verifyDoesNotExist,
  verifyToExist,
  viewFullPage,
  waitSometime,
  verifyContains,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  getTodayDateAlongwithTimeWithoutSlash,
  returntodayDateMMDDYY,
} from '../../../../../utilities/commonUtils/dateTimeUtils';
import { genrateRandomName } from '../../../../../tdm/lib/utilities/utilities';
import sqlData from '../../../../../testData/sqlData/sqlData.json';
import moment from 'moment';
const { azureSQLUrl } = Cypress.env('endPointUrl')[Cypress.env('environment')];

const { txtDriverName } = driverSearchPage;
const {
  longWait,
} = commonData;
const {
  btnTrainingAddNew,
  dialogPopup,
  drpdwnTypeTerm,
  rowInExpandView,
  rowsWithDataTrainingTable,
  tabDriverHistory,
  tblTraining,
  lblAddNewTraining,
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
  trainingCompletedDate,
  trainingDescription,
  trainingDueDate,
  trainingFacility,
  trainingOutcome,
  trainingTrainer,
  trainingType,
  titleAddNewTrainingDialog,
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
const {
  driverKey,
  drivertestdatabase,
  drivertestuser,
  testDriverHistoryTrainingQuery,
  testportVal,
} = sqlData.sqlData;
let trainingData, trainerName, drpDwnTypeOption1, drpDwnTypeOption2, drpDwnOutcomeOption1, driverDataTDM, facilityDataTDM;
describe('Add training in driver training table [ME-112032,ME-106520,ME-90722,ME-137687,ME-90698,ME-156571,ME-90704,ME-90721,ME-137514]', () => {
  before(() => {
    getMinionValues(minionDrpDwnType, 7).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
      drpDwnTypeOption2 = resultOptions[1];
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
        [trainingTrainer, trainerName],
        [trainingDescription, descriptionValue],
      ]);
    });
    viewFullPage();
    verifyToExist({ element: txtDriverName });
    clickAction({ locator: tabDriverHistory });
    verifyToExist({ element: tblTraining });
  });
  it('ME-112032, ME-90698 : Can I Add Training with Mandatory fields Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      //validations in defaultView
      //verifying Add training popup is displaying or not
      clickAction({ locator: btnTrainingAddNew });
      //adding data to Add Training popup fields with mandatory fields
      typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: drpDwnTypeOption1 });
      //validating save functionality and toast message
      verifySaveFunctionality({ locator: rowsWithDataTrainingTable, dataText: drpDwnTypeOption1 });
      //validations in expandView
      openTrainingTblExpandView();
      //verifying Add training popup is displaying or not
      clickAction({ locator: btnTrainingAddNew });
      //adding data to Add Training popup fields
      typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: drpDwnTypeOption2 });
      //validating save functionality and toast message
      verifySaveFunctionality({ locator: rowInExpandView, dataText: drpDwnTypeOption2 });
    });
  it('ME-106520,ME-137687,ME-156571, ME-90704, ME-137514, ME-90722- Can I Add Training with all fields Driver > Resources |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      //adding record with all data fields
      addTrainingWithAllFields({ map: trainingData });
      //verifying toast message
      toastWithMsg({ message: msgAddTraining });
      verifyDoesNotExist({ element: dialogPopup });
      waitSometime(longWait);
      //verifying row data in each column
      verifyRowData({ locator: rowsWithDataTrainingTable, inputDataObj: trainingData });
      //Validating DB*
      cy.url().then((text) => {
        cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: `${testDriverHistoryTrainingQuery}${driverDataTDM.driverCode}'` }).then((results) => {
          cy.log('Selected record ' + JSON.stringify(results));
          expect(results[0].typeTerm).to.contain(drpDwnTypeOption1);
          const duedateDB = moment(results[0].dueDate).format('MM/DD/YY');
          expect(duedateDB).to.contain(returntodayDateMMDDYY());
          const completedDateDB = moment(results[0].completedDate).format('MM/DD/YY');
          expect(completedDateDB).to.contain(returntodayDateMMDDYY());
          expect(results[0].outcomeTerm).to.contain(drpDwnOutcomeOption1);
          expect(results[0].trainerName).to.contain(trainerName);
          expect(results[0].description).to.contain(descriptionValue);
        });
      });
      clickDeleteInLastRow();
      //validations in expandView
      //opening expand view
      openTrainingTblExpandView();
      //adding training record with all fields
      addTrainingWithAllFields({ map: trainingData });
      //verifying toast message
      toastWithMsg({ message: msgAddTraining });
      verifyDoesNotExist({ element: dialogPopup });
      //verifying row data in each column
      verifyRowData({ locator: rowInExpandView, inputDataObj: trainingData });
      //Validating DB*
      cy.url().then((text) => {
        cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: `${testDriverHistoryTrainingQuery}${driverDataTDM.driverCode}'` }).then((results) => {
          cy.log('Selected record ' + JSON.stringify(results));
          expect(results[0].typeTerm).to.contain(drpDwnTypeOption1);
          const duedateDB = moment(results[0].dueDate).format('MM/DD/YY');
          expect(duedateDB).to.contain(returntodayDateMMDDYY());
          const completedDateDB = moment(results[0].completedDate).format('MM/DD/YY');
          expect(completedDateDB).to.contain(returntodayDateMMDDYY());
          expect(results[0].outcomeTerm).to.contain(drpDwnOutcomeOption1);
          expect(results[0].trainerName).to.contain(trainerName);
          expect(results[0].description).to.contain(descriptionValue);
        });
      });
    });
  it('ME-90721 Verify tab order in the "Add Training" Popup window in the both Default and Expanded views |  Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@P1',
      ],
    }, () => {
      //validations in defaultView
      clickAction({ locator: btnTrainingAddNew });
      verifyContains({ locator: lblAddNewTraining, containsText: titleAddNewTrainingDialog });
      //Verifying tab order
      verifyTabAddNewTraining();
    });
});