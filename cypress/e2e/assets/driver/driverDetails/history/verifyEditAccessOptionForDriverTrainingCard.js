/*-----------------------------------------------------------------------------------------------------------------------------------------------------
Verify Edit training in driver History - UI Validation and Verification
Test Cases List
Authored By                   : Murali
Date                          : 15-05-2023
Functions/Calling References  : resourceUtilis, genericUtils, loginUtils, dateTimeUtils, utilities
Test Cases Included           :
ME-96461 Verify whether the user able to access/view "Edit Training"  popup screen in  Default view field | Driver > Resources |  Assets - Driver History > Training | Regression
ME-155430 Verify whether the user able to access/view "Edit Training"  popup screen in Expanded view
ME-96462 Verify whether the user able to edit the fields in  "Edit Training"  popup screen in  Default view
ME-155362 Verify whether the user able to edit the fields in  "Edit Training"  popup screen in Expanded view
ME-96465 Verify Update/Edit functionality of the Training card in Default  view
ME-155387 Verify Update/Edit functionality of the Training card in Expanded view
ME-96463 Verify whether the "Save Training" Button in Edit Training popup is disabled when all mandatory fields are not provided in default view
ME-155434 Verify whether the "Save Training" Button in Edit Training popup is disabled when all mandatory fields are not provided in expanded view
ME-96464 Verify whether the "Save Training" Button in Edit Training popup is enabled when all mandatory fields are  provided in  default view
ME-155642 Verify whether the "Save Training" Button in Edit Training popup is enabled when all mandatory fields are  provided in  expanded view
ME-96466 Verify tab order in the "Edit Training" Popup window in the both Default and Expanded views
ME-155392 Verify tab order in the "Edit Training" Popup window in Expanded views
ME-96467 Verify 'X' close button in the "Edit Training" popup screen
ME-155395 Verify 'X' close button in the "Edit Training" popup screen in Expanded view
--------------------------------------------------------------------------------------------------------------------------------------------------------*/
import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  addTrainingWithFewFields,
  clickEditInLastRow,
  openTrainingTblExpandView,
  searchDriverWithCode,
} from '../../../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  verifyDoesNotExist,
  getMinionValues,
  getTDMData,
  verifyToExist,
  viewFullPage,
  waitSometime,
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
  drpdwnDueDate,
  tabDriverHistory,
  tblTraining,
  btnDialogClose,
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
} = historyData.userDefinedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let trainingData, trainerName, drpDwnTypeOption1, drpDwnOutcomeOption1, driverDataTDM, facilityDataTDM;

describe('Edit option in driver training card[ME-96461][ME-155430][ME-96462][ME-155362][[ME-96465][ME-155387][ME-96463][ME-155434][ME-96464][ME-155642][ME-96466][ME-155392][ME-96467][ME-155395]', () => {
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
  it('ME-96461 Verify whether the user able to access/view "Edit Training"  popup screen in  Default view field  | Driver > Resources |  Assets - Driver History > Training | Regression', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    /*------ Adding New Training Information ------- */
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    /*------ Check for latest value Edit Access in Default view of Training Information ------- */
    clickEditInLastRow();
    /*------ Verify Editing a field  and Save at Training Information ------- */
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    clickAction({ locator: btnDialogSubmit });
  });
  it('ME-155430 Verify whether the user able to access/view "Edit Training"  popup screen in Expanded view| Driver > Resources |  Assets - Driver History > Training | Regression', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    /*------ Adding New Training Information ------- */
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    /*------ Check for latest value Edit Access in Expand view of Training Information ------- */
    openTrainingTblExpandView();
    clickEditInLastRow();
    /*------ Verify Editing a field  and Save at Training Information ------- */
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    clickAction({ locator: btnDialogSubmit });
  });

  it('ME-96462 Verify whether the user able to edit the fields in  "Edit Training"  popup screen in  Default view| Driver > Resources |  Assets - Driver History > Training | Regression', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    //Verify If we can able to Edit Existing TrainingCard
    clickEditInLastRow();
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    //Verify If we can save modified data
    clickAction({ locator: btnDialogSubmit });
  });
  it('ME-155362 Verify whether the user able to edit the fields in  "Edit Training"  popup screen in Expanded view | Driver > Resources |  Assets - Driver History > Training | Regression', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    openTrainingTblExpandView();
    //Verify If we can able to Edit Existing TrainingCard
    clickEditInLastRow();
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    //Verify If we can save modified data
    clickAction({ locator: btnDialogSubmit });
  });
  it('ME-96465 Verify Update/Edit functionality of the Training card in Default  view | Driver > Resources |  Assets - Driver History > Training | Regression', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    /*------ Adding New Training Information ------- */
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    /*------ Check for latest value Edit Access in Default view of Training Information ------- */
    clickEditInLastRow();
    /*------ Verify Editing a field  and Save at Training Information ------- */
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    clickAction({ locator: btnDialogSubmit });
    clickEditInLastRow();
    waitSometime(longWait);
    clickAction({ locator: btnDialogClose });
  });
  it('ME-155387 Verify Update/Edit functionality of the Training card in Expanded view | Driver > Resources |  Assets - Driver History > Training | Regression', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    /*------ Adding New Training Information ------- */
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    /*------ Check for latest value Edit Access in Expand view of Training Information ------- */
    openTrainingTblExpandView();
    clickEditInLastRow();
    /*------ Verify Editing a field  and Save at Training Information ------- */
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    clickAction({ locator: btnDialogSubmit });
    clickEditInLastRow();
    waitSometime(longWait);
    clickAction({ locator: btnDialogClose });
  });
  it('ME-96463 Verify whether the "Save Training" Button in Edit Training popup is disabled when all mandatory fields are not provided in default view', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    clickEditInLastRow();
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    clickAction({ locator: btnDialogSubmit });
    //Verify If we can save button is not enabled
    clickEditInLastRow();
    waitSometime(longWait);
    verifyDoesNotExist({ locator: btnDialogSubmit });
  });
  it('ME-155434 Verify whether the "Save Training" Button in Edit Training popup is disabled when all mandatory fields are not provided in expanded view', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    openTrainingTblExpandView();
    clickEditInLastRow();
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    clickAction({ locator: btnDialogSubmit });
    //Verify If we can save button is not enabled
    clickEditInLastRow();
    waitSometime(longWait);
    verifyDoesNotExist({ locator: btnDialogSubmit });
  });
  it('ME-96464 Verify whether the "Save Training" Button in Edit Training popup is enabled when all mandatory fields are  provided in default view ', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    //Verify If we can able to Edit Existing TrainingCard
    clickEditInLastRow();
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    //Verify If we can save modified data with mandatory fields filled
    clickAction({ locator: btnDialogSubmit });
  });
  it('ME-155642 Verify whether the "Save Training" Button in Edit Training popup is enabled when all mandatory fields are  provided in  expanded view', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    openTrainingTblExpandView();
    //Verify If we can able to Edit Existing TrainingCard
    clickEditInLastRow();
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    //Verify If we can save modified data with mandatory fields filled
    clickAction({ locator: btnDialogSubmit });
  });
  it('ME-96466 Verify tab order in the "Edit Training" Popup window in the both Default and Expanded views | Driver > Resources |  Assets - Driver History > Training | Regression', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    /*------ Adding New Training Information ------- */
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    /*------ Check for latest value Edit Access in Default view of Training Information ------- */
    clickEditInLastRow();
    /*------ Verify Editing a field  and Save at Training Information ------- */
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    clickAction({ locator: btnDialogSubmit });
    clickEditInLastRow();
    waitSometime(longWait);
    clickAction({ locator: btnDialogClose });
    waitSometime(longWait);
  });
  it('ME-155392 Verify tab order in the "Edit Training" Popup window in Expanded views | Driver > Resources |  Assets - Driver History > Training | Regression', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    /*------ Adding New Training Information ------- */
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    /*------ Check for latest value Edit Access in Expand view of Training Information ------- */
    clickEditInLastRow();
    /*------ Verify Editing a field  and Save at Training Information ------- */
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    clickAction({ locator: btnDialogSubmit });
    clickEditInLastRow();
    waitSometime(longWait);
    clickAction({ locator: btnDialogClose });
    openTrainingTblExpandView();
    waitSometime(longWait);
  });
  it('ME-96467 Verify X close button in the "Edit Training" popup screen| Driver > Resources |  Assets - Driver History > Training | Regression', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    clickEditInLastRow();
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    clickAction({ locator: btnDialogSubmit });
    clickEditInLastRow();
    waitSometime(longWait);
    //Click on Close "X" for Edit training card Window
    clickAction({ locator: btnDialogClose });
  });
  it('ME-155395 Verify X close button in the "Edit Training" popup screen in Expanded view| Driver > Resources |  Assets - Driver History > Training | Regression', {
    tags: [
      '@assets',
      '@resources',
      '@driver',
      '@driverHistory',
      '@P1',
    ],
  },
  () => {
    addTrainingWithFewFields({ map: trainingData });
    waitSometime(longWait);
    openTrainingTblExpandView();
    clickEditInLastRow();
    datePicker({ dateLocator: drpdwnDueDate, dataText: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
    clickAction({ locator: btnDialogSubmit });
    clickEditInLastRow();
    waitSometime(longWait);
    //Click on Close "X" for Edit training card Window
    clickAction({ locator: btnDialogClose });
  });
});