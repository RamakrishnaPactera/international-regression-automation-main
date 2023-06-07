/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating add and edit training functionality with no mandatory data in default and expand view
 Test Cases List
 Authored By : Mamatha Polapalli
 Date : 15-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-137539] : [FE]validate add training functionality with no mandatory data > Driver > Resources > History
                    : [ME-137536] : [FE]validate edit training functionality with no mandatory data > Driver > Resources > History
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import * as historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import * as dateTimeUtils from '../../../../../utilities/commonUtils/dateTimeUtils';
import * as utilities from '../../../../../tdm/lib/utilities/utilities';
import sqlData from '../../../../../testData/sqlData/sqlData.json';
import moment from 'moment';
const { azureSQLUrl } = Cypress.env('endPointUrl')[Cypress.env('environment')];

const {
  minionDrpDwnType,
  tdmAddDriverReq,
  tdmDriverData,
} = historyData.staticData;
const {
  driverKey,
  drivertestdatabase,
  drivertestuser,
  testDriverHistoryTrainingQuery,
  testportVal,
} = sqlData.sqlData;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverScenario, driverDataTDM, drpDwnTypeOption1, trainingDataWithNoMandatoryField, drpDwnOutcomeOption1, trainerName;
describe('Validating add and edit training with no manadatory data in default and expand view > Driver > Resources [ME-137539][ME-137536] [ME-137517]', () => {
  before(() => {
    genericUtils.getMinionValues(minionDrpDwnType, 2).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
    genericUtils.getMinionValues(historyData.staticData.minionDrpDwnOutcome, 2).then((resultOptions) => {
      drpDwnOutcomeOption1 = resultOptions[0];
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
    trainerName = `${utilities.genrateRandomName()}` + dateTimeUtils.getTodayDateAlongwithTimeWithoutSlash();
    trainingDataWithNoMandatoryField = new Map([
      [historyData.staticData.trainingDueDate, dateTimeUtils.returntodayDateMMDDYY()],
      [historyData.staticData.trainingCompletedDate, dateTimeUtils.returntodayDateMMDDYY()],
      [historyData.staticData.trainingOutcome, drpDwnOutcomeOption1],
      [historyData.staticData.trainingTrainer, trainerName],
      [historyData.staticData.trainingDescription, historyData.userDefinedData.descriptionValue],
    ]);
  });
  it('[ME-137539] : [FE]can user verify add training with no mandatory data in default and expand view > Driver > Resources |  Assets - Driver | Regression',
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
      resourceUtilis.verifyAddTrainingWithNoMandatoryField({ map: trainingDataWithNoMandatoryField });
      //validations in expand view
      resourceUtilis.openTrainingTblExpandView();
      resourceUtilis.verifyAddTrainingWithNoMandatoryField({ map: trainingDataWithNoMandatoryField });
    });
  it('[ME-137536] : [FE]can user verify edit training with no mandatory data in default view and expand view > Driver > Resources |  Assets - Driver | Regression',
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
      resourceUtilis.addTraining({ typrDrpDwnVal: drpDwnTypeOption1, date: dateTimeUtils.returntodayDateMMDDYY() });
      resourceUtilis.clickEditInLastRow();
      resourceUtilis.verifyAddTrainingWithNoMandatoryField({ map: trainingDataWithNoMandatoryField });
      //valiations in expand view
      resourceUtilis.openTrainingTblExpandView();
      resourceUtilis.clickEditInLastRow();
      resourceUtilis.verifyAddTrainingWithNoMandatoryField({ map: trainingDataWithNoMandatoryField });
    });

  it('ME-137517- Driver History tab --> Training card --> Edit Training record functionality in both default and expand view__Regression Testcase > Driver > Resources |  Assets - Driver | Regression',
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
      resourceUtilis.addTraining({ typrDrpDwnVal: drpDwnTypeOption1, date: dateTimeUtils.returntodayDateMMDDYY() });
      resourceUtilis.clickEditInLastRow();
      resourceUtilis.editDriverHistryTraining({ map: trainingDataWithNoMandatoryField });
      //Validating DB*
      cy.url().then((text) => {
        cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: `${testDriverHistoryTrainingQuery}${driverDataTDM.driverCode}'` }).then((results) => {
          cy.log('Selected record ' + JSON.stringify(results));
          expect(results[0].typeTerm).to.contain(drpDwnTypeOption1);
          const duedateDB = moment(results[0].dueDate).format('MM/DD/YY');
          expect(duedateDB).to.contain(dateTimeUtils.returntodayDateMMDDYY());
          const completedDateDB = moment(results[0].completedDate).format('MM/DD/YY');
          expect(completedDateDB).to.contain(dateTimeUtils.returntodayDateMMDDYY());
          expect(results[0].outcomeTerm).to.contain(drpDwnOutcomeOption1);
          expect(results[0].trainerName).to.contain(trainerName);
          expect(results[0].description).to.contain(historyData.userDefinedData.descriptionValue);
        });
      });
      //valiations in expand view
      resourceUtilis.openTrainingTblExpandView();
      resourceUtilis.clickEditInLastRow();
      resourceUtilis.editDriverHistryTraining({ map: trainingDataWithNoMandatoryField });
      //Validating DB*
      cy.url().then((text) => {
        cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: `${testDriverHistoryTrainingQuery}${driverDataTDM.driverCode}'` }).then((results) => {
          cy.log('Selected record ' + JSON.stringify(results));
          expect(results[0].typeTerm).to.contain(drpDwnTypeOption1);
          const duedateDB = moment(results[0].dueDate).format('MM/DD/YY');
          expect(duedateDB).to.contain(dateTimeUtils.returntodayDateMMDDYY());
          const completedDateDB = moment(results[0].completedDate).format('MM/DD/YY');
          expect(completedDateDB).to.contain(dateTimeUtils.returntodayDateMMDDYY());
          expect(results[0].outcomeTerm).to.contain(drpDwnOutcomeOption1);
          expect(results[0].trainerName).to.contain(trainerName);
          expect(results[0].description).to.contain(historyData.userDefinedData.descriptionValue);
        });
      });
    });
});