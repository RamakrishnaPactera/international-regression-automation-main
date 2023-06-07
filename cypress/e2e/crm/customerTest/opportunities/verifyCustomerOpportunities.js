/*---------------------------------------------------------------------------------------------------------------
Verify customize option in Opportunity
Test Cases List
Authored By                   : Sanjeev Kumar Bandari
Date                          : 16-03-2023
Functions/Calling References  : crmOpportunitiesPage, crmOpportunitiesData, utilities
Test case Included            : [ME-136827][ME-136831][ME-136833] Can user validate customize option in Opportunity > CRM > Opportunities | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmIndustryData from '../../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmOpportunitiesPage from '../../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import crmOpportunitiesData from '../../../../testData/crm/crmData/crmOpportunitiesData.json';
import { genrateRandomName } from '../../../../tdm/lib/utilities/utilities';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import {
  addOpportunityAllFields,
  navigateToOpportunitiesTab,
  verifyTableColumnValues,
} from '../../../../utilities/customerUtils/customerUtils';
import {
  clickAction,
  clickExpand,
  clickVisibleElement,
  dragAndDrop,
  dropDownExactCheckBoxSelection,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  toastWithMsg,
  verifyClosePopup,
  verifyExists,
  verifyTableColumnsHeaders,
  verifyTextContains,
  verifyToExist,
  verifyVisible,
  viewFullPage,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
import {
  sortAndValidate,
} from '../../../../utilities/commonUtils/sortUtils';
const { shortWait } = commonData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenarioNew,
} = crmIndustryData.staticData;
const {
  btnCustomize,
  btnCustomizeApply,
  btnCustomizeResetToDefaults,
  customizeCodeDragItem,
  customizeSystemDragItem,
  customizeTable,
  eyeIconVisible,
  opportunityCarrotButton,
  statusDropdown,
  tblCellheaderStatus,
  tblColAgeHeaderBtn,
  tblColBusinessUnitHeaderBtn,
  tblColDivisionHeaderBtn,
  tblColDueDateHeaderBtn,
  tblColProjRevHeaderBtn,
  tblColProjVolHeaderBtn,
  tblColStageHeaderBtn,
  tblColStatusHeaderbtn,
  tblColTypeHeaderBtn,
  tblColumnNameHeaderBtn,
  tblColUpdateAtHeaderBtn,
  tblColUpdatedByHeaderBtn,
  tblCustomizeHeader,
  tblOpportunities,
  tblOpportunitiesColHeaders,
  tblOpportunitiesColHeadersInExpand,
  tblRowHeader,
} = crmOpportunitiesPage;
const {
  minionDrpDwnPricingStrategy,
  minionDrpDwnSolType,
  minionDrpDwnSolution,
  minionDrpDwnSource,
  minionDrpDwnStage,
  minionDrpDwnType,
  opportunityTabelTitle,
  stageDrpdwnClosedLost,
  stageDrpdwnRevisit,
  statusClosed,
  statusOnHold,
  statusOpen,
  tblColHeaderNames,
  tblColHeadernamesAfterReArrange,
} = crmOpportunitiesData.staticData;
const {
  msgAddOpportunity,
} = crmOpportunitiesData.expectedData;
let customerNameVal,
  drpDwnPricStrat1,
  drpDwnSolType2,
  drpDwnSolution1,
  drpDwnSourceOption1,
  drpDwnStageOption1,
  drpDwnTypeOption1,
  opportunityName;
describe('Verify user can Validate Opportunities table and create a new opportunity | Customer > CRM > Opportunities |Regression [ME-136827][ME-136831][ME-136833]', () => {
  before(() => {
    cy.log('***creating new customer***');
    getTDMData({
      dataType: tdmCustomerData,
      dataCondition: tdmAddCustomerReq,
      dataScenario: tdmCustomerScenarioNew,
    });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    getMinionValues(minionDrpDwnSource, 1).then((resultOptions) => {
      drpDwnSourceOption1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnType, 1).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnStage, 1).then((resultOptions) => {
      drpDwnStageOption1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnSolType, 1).then((resultOptions) => {
      drpDwnSolType2 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnSolution, 1).then((resultOptions) => {
      drpDwnSolution1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnPricingStrategy, 1).then((resultOptions) => {
      drpDwnPricStrat1 = resultOptions[0];
    });
  });
  beforeEach(() => {
    cy.log('logging into Mastery appliaction');
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    viewFullPage();
  });

  it('[ME-136827] Verify the user can able to sort data in Opportunity table > CRM > Customer details|Opportunities | Customer Regression ', {
    tags: [
      '@customer',
      '@crm',
      '@opportunities',
      '@p1',
    ],
  },
  () => {
    cy.log('*****Navigating to Opportunity Tab***********');
    navigateToOpportunitiesTab({ customerName: customerNameVal.customerName });
    verifyExists({ element: tblOpportunities });
    verifyTableColumnsHeaders({ locator: tblOpportunitiesColHeaders, columnNames: tblColHeaderNames });
    opportunityName = genrateRandomName() + generateRandomNumber();
    cy.log('Opportunity Name is', opportunityName);
    addOpportunityAllFields({
      dataText: opportunityName,
      drpDwnSource: drpDwnSourceOption1,
      drpDwnType: drpDwnTypeOption1,
      drpDwnStage: drpDwnStageOption1,
      drpDwnSolutionType: drpDwnSolType2,
      drpDwnSolution: drpDwnSolution1,
      drpDwnPricStrat: drpDwnPricStrat1,
    });
    //Verifying 'Updated' message after adding an Opportunity
    waitSometime(shortWait);
    toastWithMsg({ message: msgAddOpportunity });
    opportunityName = genrateRandomName() + generateRandomNumber();
    cy.log('Opportunity Name is', opportunityName);
    addOpportunityAllFields({ dataText: opportunityName, drpDwnSource: drpDwnSourceOption1, drpDwnType: drpDwnTypeOption1, drpDwnStage: stageDrpdwnClosedLost, drpDwnSolutionType: drpDwnSolType2, drpDwnSolution: drpDwnSolution1, drpDwnPricStrat: drpDwnPricStrat1 });
    //Verifying 'Updated' message after adding an Opportunity
    waitSometime(shortWait);
    toastWithMsg({ message: msgAddOpportunity });
    opportunityName = genrateRandomName() + generateRandomNumber();
    addOpportunityAllFields({ dataText: opportunityName, drpDwnSource: drpDwnSourceOption1, drpDwnType: drpDwnTypeOption1, drpDwnStage: stageDrpdwnRevisit, drpDwnSolutionType: drpDwnSolType2, drpDwnSolution: drpDwnSolution1, drpDwnPricStrat: drpDwnPricStrat1 });
    //Verifying 'Updated' message after adding an Opportunity
    waitSometime(shortWait);
    toastWithMsg({ message: msgAddOpportunity });
    waitSometime(shortWait);
    clickAction({ locator: opportunityCarrotButton });
    clickExpand();
    verifyTableColumnsHeaders({ locator: tblOpportunitiesColHeadersInExpand, columnNames: tblColHeaderNames });
    verifyClosePopup();
    //Sorting all the deafult columns in Opportunity Table
    sortAndValidate({ colHeader: tblColumnNameHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColStageHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColTypeHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColDivisionHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColBusinessUnitHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColProjVolHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColProjRevHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColAgeHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColDueDateHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColUpdatedByHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColUpdateAtHeaderBtn, rowData: tblRowHeader });
    sortAndValidate({ colHeader: tblColStatusHeaderbtn, rowData: tblRowHeader });
  });
  it('[ME-136831] Verify the user can able to view the Opportunity table in Default & Expand view ,Customize view  > CRM > Opportunities| Customer Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@opportunities',
        '@p1',
      ],
    },
    () => {
      cy.log('*****Navigating to Opportunity Tab***********');
      navigateToOpportunitiesTab({ customerName: customerNameVal.customerName });
      verifyTableColumnsHeaders({ locator: tblOpportunitiesColHeaders, columnNames: tblColHeaderNames });
      waitSometime(shortWait);
      clickAction({ locator: opportunityCarrotButton });
      clickExpand();
      verifyTableColumnsHeaders({ locator: tblOpportunitiesColHeadersInExpand, columnNames: tblColHeaderNames });
      verifyClosePopup();
      waitSometime(shortWait);
      clickAction({ locator: opportunityCarrotButton });
      clickVisibleElement({ locator: btnCustomize });
      verifyToExist({ element: customizeTable });
      verifyTableColumnsHeaders({ locator: tblCustomizeHeader, columnNames: tblColHeaderNames });
      cy.log('***Switch the show option \'On\' of any column***');
      clickAction({ locator: eyeIconVisible });
      verifyVisible({ element: eyeIconVisible });
      cy.log('***Switch the show option \'Off\' of any column***');
      clickAction({ locator: eyeIconVisible });
      cy.log('***Verify drag a column to a new location***');
      dragAndDrop({ draggedElement: customizeCodeDragItem, stationaryElement: customizeSystemDragItem, refElement: customizeTable });
      verifyTableColumnsHeaders({ locator: tblCustomizeHeader, columnNames: tblColHeadernamesAfterReArrange });
      clickAction({ locator: btnCustomizeResetToDefaults });
      clickAction({ locator: btnCustomizeApply });
      verifyTextContains({ locator: tblOpportunities, containsText: opportunityTabelTitle });
    });
  it('[ME-136833] Verify the user able to filter the opportunities based on Open, On-Hold and Closed status> CRM > Customer details|Opportunities | Customer Regression ', {
    tags: [
      '@customer',
      '@crm',
      '@opportunities',
      '@p1',
    ],
  },
  () => {
    cy.log('*****Navigating to Opportunity Tab***********');
    navigateToOpportunitiesTab({ customerName: customerNameVal.customerName });
    verifyExists({ element: tblOpportunities });
    //uncheck all the dropdwon fields
    dropDownExactCheckBoxSelection({ element: statusDropdown, ddValue: statusOpen });
    dropDownExactCheckBoxSelection({ element: statusDropdown, ddValue: statusOnHold });
    //check on dropdown field-Open
    dropDownExactCheckBoxSelection({ element: statusDropdown, ddValue: statusOpen });
    clickAction({ locator: tblOpportunities });
    clickAction({ locator: opportunityCarrotButton });
    clickExpand();
    verifyTableColumnValues({ locator: tblCellheaderStatus, columnValue: statusOpen });
    verifyClosePopup();
    waitSometime(shortWait);
    //check on dropdown field-On Hold
    dropDownExactCheckBoxSelection({ element: statusDropdown, ddValue: statusOpen });
    dropDownExactCheckBoxSelection({ element: statusDropdown, ddValue: statusOnHold });
    clickAction({ locator: tblOpportunities });
    clickAction({ locator: opportunityCarrotButton });
    clickExpand();
    verifyTableColumnValues({ locator: tblCellheaderStatus, columnValue: statusOnHold });
    verifyClosePopup();
    //check on dropdown field-Closed
    dropDownExactCheckBoxSelection({ element: statusDropdown, ddValue: statusOnHold });
    dropDownExactCheckBoxSelection({ element: statusDropdown, ddValue: statusClosed });
    clickAction({ locator: tblOpportunities });
    clickAction({ locator: opportunityCarrotButton });
    clickExpand();
    verifyTableColumnValues({ locator: tblCellheaderStatus, columnValue: statusClosed });
    verifyClosePopup();
  });
});