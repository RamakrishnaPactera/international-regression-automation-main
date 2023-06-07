/*---------------------------------------------------------------------------------------------------------------
Resources> Driver Search > History Tab > Training> sort (Ascending & Descending) data in both default and expand the view by Due Date
Test Cases List               : ME-99449, ME-99450, ME-97519, ME-97518, ME-97517, ME-97516, ME-97515, ME-97514, ME-97513, ME-97512, ME-97030, ME-97029, ME-137692
Authored By                   : Madhu Manyam
Date                          : 18-04-2023
Functions/Calling References  : commonPage, driverSearchPage,historyPage,utilities, resourceUtilities
User Strories Included        : ME-85335 - Resources:Driver: Training Table - Sorting
---------------------------------------------------------------------------------------------------------------*/
import * as historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import * as driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as dateTimeUtils from '../../../../../utilities/commonUtils/dateTimeUtils';
const {
  attrTitle,
  minionDrpDwnType,
  sortByDueDateTooltip,
  tdmAddDriverReq,
  tdmDriverData,
} = historyData.staticData;
const {
  dayCountVal,
  defaultView,
  expandView,
  monthCountVal,
} = historyData.userDefinedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverScenario;
let driverDataTDM, drpDwnTypeOption1, drpDwnTypeOption2;

describe('User validates the driver training table columns sorting by Due date [ME-85335, ME-137692]', () => {
  before(() => {
    genericUtils.getMinionValues(minionDrpDwnType, 2).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
      drpDwnTypeOption2 = resultOptions[1];
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
  });

  it("ME-99449,ME-99450,ME-137692 User verifies to 'Sort' by due date column in training table > Resources | Driver Search| History Tab| Training | Regression",
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
      resourceUtilis.addTraining({ typrDrpDwnVal: drpDwnTypeOption1, date: dateTimeUtils.returntodayDateMMDDYY() });
      resourceUtilis.addTraining({ typrDrpDwnVal: drpDwnTypeOption2, date: dateTimeUtils.returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal }) });
      resourceUtilis.addMultipleTrainingAndVerifyAddedAtLast({ typrDrpDwnVal: drpDwnTypeOption1, totalTrainings: 4 });
      //Verify "Sort by Due Date" in tool tip text
      genericUtils.verifyAttrText({ locator: historyPage.tblTrainingDueDateColumnHeader, attribute: attrTitle, verifyText: sortByDueDateTooltip });
      //Verify rows are sorted based on the selected column in ascending/Descending order
      resourceUtilis.verifySortOrder();
      //Verify see up (ascending)/down (descending) arrow displayed in the column header
      genericUtils.clickAndVerifyGridAlignment({ locator: historyPage.colHeaderDueDateParent, element: historyPage.tblTrainingDueDateColumnHeader });
      //Customize due date and verify should see rows are sorted based on the selected column in ascending/Descending order
      resourceUtilis.customizeTablColumns({ viewOfTable: defaultView });
      resourceUtilis.verifySortOrder();
      //Customize due date and select column then naviagte to expand view. Verify sort order of the rows remains the same as I switch from one view to another
      resourceUtilis.validateSortingbtwTwoViews({ viewOfTable: defaultView });
      //Expand View
      //Verify "Sort by Due Date" in tool tip text
      genericUtils.verifyAttrText({ locator: historyPage.tblTrainingDueDateColumnHeader, attribute: attrTitle, verifyText: sortByDueDateTooltip });
      //Verify rows are sorted based on the selected column in ascending/Descending order
      resourceUtilis.verifySortOrder();
      //Verify see up (ascending)/down (descending) arrow displayed in the column header
      genericUtils.clickAndVerifyGridAlignment({ locator: historyPage.colHeaderDueDateParentInExpandView, element: historyPage.tblTrainingDueDateColumnHeader });
      //Customize due date and verify should see rows are sorted based on the selected column in ascending/Descending order
      resourceUtilis.customizeTablColumns({ viewOfTable: expandView });
      resourceUtilis.openTrainingTblExpandView();
      resourceUtilis.verifySortOrder();
      //Customize due date and select column then naviagte to expand view. Verify sort order of the rows remains the same as I switch from one view to another
      resourceUtilis.validateSortingbtwTwoViews({ viewOfTable: expandView });
    });
});