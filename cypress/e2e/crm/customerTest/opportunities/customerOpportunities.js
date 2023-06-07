/*---------------------------------------------------------------------------------------------------------------
Verify customize option in Opportunity
Test Cases List
Authored By                   : JyothiPrasad,SathyaDEV
Date                          : 20-03-2023
Functions/Calling References  : crmOpportunitiesPage, crmOpportunitiesData, utilities
Test case Included            : ME-136736 ME-136745 ME-136843 ME-136783 ME-136786 ME-136798 Can user validate customize option in opportunity > CRM > Opportunity | Regression
------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmOpportunitiesPage from '../../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import crmOpportunitiesData from '../../../../testData/crm/crmData/crmOpportunitiesData.json';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import {
  editOpportunitieName,
  navigateToOpportunitiesTab,
  openOpportunityInExpandView,
  validateCreatedOpportunity,
  verifyOppCustomizeOptions,
  addOpportunityAllFields,
} from '../../../../utilities/customerUtils/customerUtils';
import {
  clickAction,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  toastWithMsg,
  verifyClosePopup,
  verifyExists,
  verifyTableColumnsHeaders,
  verifyTableColumnsHeadersToolTip,
  verifyTextContains,
  viewFullPage,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
const { shortWait } = commonData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  btnAddOppClose,
  btnAddOpportunity,
  btnCustTableSave,
  btnOppCustDefaultViewExpand,
  btnOppCustomizeOption,
  btnResetToDefault,
  customizeOppStageDragItem,
  customizeOppTypeDragItem,
  hideCustomTableDocumentNameValue,
  lblAddOppTitle,
  lblStatus,
  opportunitiesTableAllColumnText,
  tblFirstRowData,
  tblOpportunities,
  tblOpportunitiesColHeaders,
  tblOpportunitiesColHeadersInExpand,
} = crmOpportunitiesPage;
const {
  addOpportunityTitle,
  minionDrpDwnSource,
  minionDrpDwnType,
  minionDrpDwnStage,
  minionDrpDwnSolType,
  minionDrpDwnSolution,
  minionDrpDwnPricingStrat,
  opportunityCustomizedTableArray,
  oppStatusLabel,
  tblColHeadernames,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmOpportunitiesData.staticData;
const { msgAddOpportunity } = crmOpportunitiesData.expectedData;
const { oppName, oppStage, oppType, oppReps, oppStatus } = crmOpportunitiesData.userDefined;
const nameOpportunity = 'opportunityName';
let customerNameVal,
  drpDwnSourceOption1,
  drpDwnTypeOption1,
  drpDwnStageOption1,
  drpDwnSolutionTypeOption1,
  drpDwnSolutionOption1,
  drpDwnPricingStraOption1;
describe('Verify user can Validate Opportunities table and create a new opportunity | Customer > CRM > Opportunities | [ME-136736] [ME-136745] [ME-136843] [ME-136783] [ME-136786] [ME-136798]', () => {
  before(() => {
    cy.log('***Creating Customer***');
    getTDMData({
      dataType: tdmCustomerData,
      dataCondition: tdmAddCustomerReq,
      dataScenario: tdmCustomerScenario,
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
      drpDwnSolutionTypeOption1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnSolution, 1).then((resultOptions) => {
      drpDwnSolutionOption1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnPricingStrat, 1).then((resultOptions) => {
      drpDwnPricingStraOption1 = resultOptions[0];
    });
  });

  beforeEach(() => {
    //Generating a random name to use for adding an Opportunity
    cy.log('logging into Mastery appliaction');
    loginToApplication({ username: usernameText, password: passwordText });
    //Viewing the application in full page mode
    viewFullPage();
  });

  it('ME-136736 Verify the user able to navigate to Customer > CRM > Opportunity and open a Add Opportunity modal | Opportunities | Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@opportunities',
        '@p1',
      ],
    },
    () => {
      //Navigating to Opportunities tab
      navigateToOpportunitiesTab({ customerName: customerNameVal.customerName });
      //Verifying Opportunities table grid
      verifyExists({ element: tblOpportunities });
      //Verifying Opportunities status label
      verifyTextContains({ locator: lblStatus, containsText: oppStatusLabel });
      //Verifying Opportunities table column headers
      verifyTableColumnsHeaders({ locator: tblOpportunitiesColHeaders, columnNames: tblColHeadernames });
      //Opening a new Opportunity modal
      verifyExists({ element: btnAddOpportunity });
      clickAction({ locator: btnAddOpportunity });
      verifyTextContains({ locator: lblAddOppTitle, containsText: addOpportunityTitle });
      clickAction({ locator: btnAddOppClose });
    });

  it('ME-136745 Verify user able to fill required fields and optional fields then save the opportunity modal | Opportunities | Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@opportunities',
        '@p1',
      ],
    },
    () => {
      //Navigating to Opportunities tab
      navigateToOpportunitiesTab({ customerName: customerNameVal.customerName });
      verifyExists({ element: tblOpportunities });
      addOpportunityAllFields({ dataText: nameOpportunity, drpDwnSource: drpDwnSourceOption1, drpDwnType: drpDwnTypeOption1, drpDwnStage: drpDwnStageOption1, drpDwnSolutionType: drpDwnSolutionTypeOption1, drpDwnSolution: drpDwnSolutionOption1, drpDwnPricStrat: drpDwnPricingStraOption1 });
      toastWithMsg({ message: msgAddOpportunity });
    });

  it('ME-136843 Verify new Opportunity is added in first row in Opportunity table and displaying correct information as per created | Opportunities | Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@opportunities',
        '@p1',
      ],
    },
    () => {
      //Navigating to Opportunities tab
      navigateToOpportunitiesTab({ customerName: customerNameVal.customerName });
      //Verifying Opportunities table grid
      verifyExists({ element: tblOpportunities });
      waitSometime(shortWait);
      validateCreatedOpportunity({
        locator: tblFirstRowData,
        oppNameValue: oppName,
        oppStageValue: oppStage,
        oppTypeValue: oppType,
        oppReps,
        oppStatus,
      });
    });

  it('ME-136786: Verify that the user able to hover over column values and field values in tooltip > CRM > Customer details | Customer Regression | Sprint Regression',
    {
      tags: ['@customer', '@crm', '@opportunities', '@customerIndustry', '@p1', '@phase1'],
    },
    () => {
      //Navigating to Opportunities tab
      navigateToOpportunitiesTab({
        customerName: customerNameVal.customerName,
      });
      verifyTableColumnsHeadersToolTip({
        locator: opportunitiesTableAllColumnText,
        columnNames: tblColHeadernames,
      });
    },
  );

  it('ME-136783: Verify that the user able to customize columns and update columns in both Expand and Customized view > CRM > Customer details | Customer Regression | Sprint Regression',
    {
      tags: ['@customer', '@crm', '@opportunities', '@customerIndustry', '@p1', '@phase1'],
    },
    () => {
      //Navigating to Opportunities tab
      navigateToOpportunitiesTab({
        customerName: customerNameVal.customerName,
      });
      //Verifying coloumns in Expand View
      openOpportunityInExpandView();
      verifyTableColumnsHeaders({
        locator: tblOpportunitiesColHeadersInExpand,
        columnNames: tblColHeadernames,
      });
      verifyClosePopup();
      //Update coloumns in Customize View
      verifyOppCustomizeOptions({
        locator: btnOppCustDefaultViewExpand,
        element: btnOppCustomizeOption,
        restEle: btnResetToDefault,
        customTableSave: btnCustTableSave,
        columnTableArray: tblColHeadernames,
        tableColumnTextEle: opportunitiesTableAllColumnText,
        hideOneColumnValue: hideCustomTableDocumentNameValue,
        customizeDragItem1: customizeOppStageDragItem,
        customizeDragItem2: customizeOppTypeDragItem,
        customizedTableArray: opportunityCustomizedTableArray,
      });
    },
  );

  it('ME-136798: Verify that the user can be able to edit the created opportunity from the table > CRM > Customer details | Customer Regression | Sprint Regression',
    {
      tags: ['@customer', '@crm', '@opportunities', '@customerIndustry', '@p1', '@phase1'],
    },
    () => {
      //Navigating to Opportunities tab
      navigateToOpportunitiesTab({
        customerName: customerNameVal.customerName,
      });
      editOpportunitieName(nameOpportunity + generateRandomNumber());
      //Verifying 'Updated' message after adding an Opportunity
      toastWithMsg({ message: msgAddOpportunity });
    },
  );
});