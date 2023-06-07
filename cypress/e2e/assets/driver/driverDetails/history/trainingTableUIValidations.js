import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import {
  addMultipleTrainingAndVerifyAddedAtLast,
  addTraining,
  addTrainingIfNotExist,
  customizeTablColumns,
  editTrainingPopupFieldValidations,
  navigateToAddTrainingPopup,
  openTrainingTblExpandView,
  searchDriverWithCode,
  validateDueDateAndCompleteDate,
  validateFacilityFields,
  validateSortingbtwTwoViews,
  validateStateOfAddTrainingBtn,
  validateTrainerAndDescnFields,
  validateTypeTermDrpDwn,
  verifySortOrder,
  verifyVerticalScrollBar,
} from '../../../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  clickAndVerifyGridAlignment,
  clickCloseXIcon,
  getMinionValues,
  getTDMData,
  verifyAttrText,
  verifyOrderListDefaultOrderAfterDragRearrangeReset,
  verifyToExist,
  viewFullPage,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  getTodayDateAlongwithTimeWithoutSlash,
  returnfutureDateMMDDYY,
  returntodayDateMMDDYY,
} from '../../../../../utilities/commonUtils/dateTimeUtils';
import { genrateRandomName } from '../../../../../tdm/lib/utilities/utilities';
const { txtDriverName } = driverSearchPage;
const {
  colHeaderDueDateParent,
  colHeaderDueDateParentInExpandView,
  colHeadersTrainingTable,
  colHeadersTrainingTableInExpandView,
  tabDriverHistory,
  tblInExpandView,
  tblTraining,
  tblTrainingDueDateColumnHeader,
  trainingTableBody,
  trainingTableBodyInExpandView,
} = historyPage;
const {
  attrTitle,
  minionDrpDwnOutcome,
  minionDrpDwnType,
  sortByDueDateTooltip,
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
  defaultView,
  descriptionValue,
  expandView,
  monthCountVal,
  rowCountVertBar,
  rowCountVertBarExpandView,
} = historyData.userDefinedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverScenario, trainerName, trainingData;
let driverDataTDM, facilityDataTDM, drpDwnTypeOption1, drpDwnTypeOption2, drpDwnOutcomeOption1;

const trainingTblColms = [
  trainingType,
  trainingDueDate,
  trainingCompletedDate,
  trainingOutcome,
  trainingFacility,
  trainingCity,
  trainingTrainer,
  trainingDescription,
];
describe('Can I validate add popup, edit popup fields, columns sorting and customize in driver training table [ME-106841,ME-106519,ME-108820,ME-112776,ME-107242,ME-137528,ME-92913]', () => {
  before(() => {
    getMinionValues(minionDrpDwnType, 2).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
      drpDwnTypeOption2 = resultOptions[1];
    });
    getMinionValues(minionDrpDwnOutcome, 2).then((resultOptions) => {
      drpDwnOutcomeOption1 = resultOptions[0];
    });
  });
  beforeEach(() => {
    switch (Cypress.currentTest.title) {
      case 'ME-108820 can I validate UI components columns and vertical bar in default view in Driver > Resources | Assets - Driver Training | Regression':
        driverScenario = 'driverTrainingDefaultMaxRows';
        break;
      case 'ME-112776 can I validate UI components columns and vertical bar in expand view in Driver > Resources | Assets - Driver Training | Regression':
        driverScenario = 'driverTrainingExpndMaxRows';
        break;
      default:
        driverScenario = tdmDriverCommonScenario;
        break;
    }
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: driverScenario });
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
      trainingData = {
        trainingType: drpDwnTypeOption1,
        trainingDueDate: returntodayDateMMDDYY(),
        trainingCompletedDate: returntodayDateMMDDYY(),
        trainingOutcome: drpDwnOutcomeOption1,
        trainingFacility: facilityDataTDM.facilityName,
        trainingCity: facilityDataTDM.city + ' ,' + facilityDataTDM.state,
        trainingTrainer: trainerName,
        trainingDescription: descriptionValue,
      };
    });
    verifyToExist({ element: txtDriverName });
    clickAction({ locator: tabDriverHistory });
    verifyToExist({ element: tblTraining });
  });
  it("ME-106841,ME-137528 Can I validate 'Edit popup' fields Driver > Resources | Assets - Driver Training | Regression",
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@p2',
      ],
    }, () => {
      //input data
      addTrainingIfNotExist({ typrDrpDwnVal: drpDwnTypeOption1 });
      const dataObjForEditTraining = { ...trainingData };
      //verifying edit popup fields validations in default view
      editTrainingPopupFieldValidations({ viewOfTable: defaultView, inputDataObj: dataObjForEditTraining });
      //verifying edit popup fields validations in expand view
      editTrainingPopupFieldValidations({ viewOfTable: expandView, inputDataObj: dataObjForEditTraining });
    });

  it("ME-106519 Can I 'Sort' and validate table by due date column Driver > Resources | Assets - Driver Training | Regression",
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@p2',
      ],
    }, () => {
      //Default View
      //Verify recently added row should be displayed on the bottom
      addTraining({ typrDrpDwnVal: drpDwnTypeOption1, date: returntodayDateMMDDYY() });
      addTraining({ typrDrpDwnVal: drpDwnTypeOption2, date: returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      addMultipleTrainingAndVerifyAddedAtLast({ typrDrpDwnVal: drpDwnTypeOption1, totalTrainings: 4 });
      //Verify "Sort by Due Date" in tool tip text
      verifyAttrText({ locator: tblTrainingDueDateColumnHeader, attribute: attrTitle, verifyText: sortByDueDateTooltip });
      //Verify rows are sorted based on the selected column in ascending/Descending order
      verifySortOrder();
      //Verify see up (ascending)/down (descending) arrow displayed in the column header
      clickAndVerifyGridAlignment({ locator: colHeaderDueDateParent, element: tblTrainingDueDateColumnHeader });
      //Customize due date and verify should see rows are sorted based on the selected column in ascending/Descending order
      customizeTablColumns({ viewOfTable: defaultView });
      verifySortOrder();
      //Customize due date and select column then naviagte to expand view. Verify sort order of the rows remains the same as I switch from one view to another
      validateSortingbtwTwoViews({ viewOfTable: defaultView });
      //Expand View
      //Verify "Sort by Due Date" in tool tip text
      verifyAttrText({ locator: tblTrainingDueDateColumnHeader, attribute: attrTitle, verifyText: sortByDueDateTooltip });
      //Verify rows are sorted based on the selected column in ascending/Descending order
      verifySortOrder();
      //Verify see up (ascending)/down (descending) arrow displayed in the column header
      clickAndVerifyGridAlignment({ locator: colHeaderDueDateParentInExpandView, element: tblTrainingDueDateColumnHeader });
      //Customize due date and verify should see rows are sorted based on the selected column in ascending/Descending order
      customizeTablColumns({ viewOfTable: expandView });
      openTrainingTblExpandView();
      verifySortOrder();
      //Customize due date and select column then naviagte to expand view. Verify sort order of the rows remains the same as I switch from one view to another
      validateSortingbtwTwoViews({ viewOfTable: expandView });
    });

  it('ME-108820,ME-92913 can I validate UI components columns and vertical bar in default view in Driver > Resources | Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@p3',
      ],
    }, () => {
      //validations in defaultView
      verifyToExist({ element: colHeadersTrainingTable });
      verifyOrderListDefaultOrderAfterDragRearrangeReset({ locator: tblTraining, columnNames: trainingTblColms });
      verifyVerticalScrollBar({ locator: trainingTableBody, viewOfTable: defaultView, maxRowCount: rowCountVertBar });
    });
  it('ME-112776 can I validate UI components columns and vertical bar in expand view in Driver > Resources | Assets - Driver Training | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@p3',
      ],
    }, () => {
      //validations in expand view
      //open table in expand view
      openTrainingTblExpandView();
      verifyToExist({ element: colHeadersTrainingTableInExpandView });
      verifyOrderListDefaultOrderAfterDragRearrangeReset({ locator: tblInExpandView, columnNames: trainingTblColms });
      verifyVerticalScrollBar({ locator: trainingTableBodyInExpandView, viewOfTable: expandView, maxRowCount: rowCountVertBarExpandView });
    });

  it("ME-107242,ME-137528 Can I validate 'Add popup' fields Driver > Resources | Assets - Driver Training | Regression",
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverHistory',
        '@p2',
      ],
    }, () => {
      const dataObjForAddTraining = { ...trainingData };
      //validations in default view
      navigateToAddTrainingPopup();
      validateTypeTermDrpDwn();
      validateDueDateAndCompleteDate();
      validateStateOfAddTrainingBtn({ inputDataObj: dataObjForAddTraining });
      validateFacilityFields({ inputDataObj: dataObjForAddTraining });
      validateTrainerAndDescnFields();
      clickCloseXIcon();
      //validations in expand view
      //open table in expand view
      openTrainingTblExpandView();
      navigateToAddTrainingPopup();
      validateTypeTermDrpDwn();
      validateDueDateAndCompleteDate();
      validateStateOfAddTrainingBtn({ inputDataObj: dataObjForAddTraining });
      validateFacilityFields({ inputDataObj: dataObjForAddTraining });
      validateTrainerAndDescnFields();
    });
});