/*---------------------------------------------------------------------------------------------------------------
Verify create and edit Opportunity in Carrier
Test Cases List
Authored By                   : SathyaDEV
Date                          : 24-03-2023
Functions/Calling References  : crmOpportunitiesPage, crmOpportunitiesData, utilities
Test case Included            : [ME-137339] [ME-137345] [ME-137346] [ME-130927] [ME-138651] [ME-138660] Can user create and edit opportunity in Carrier > CRM > Opportunity | Regression
------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmNotesData from '../../../../testData/crm/crmData/crmNotesData.json';
import crmOpportunitiesPage from '../../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import crmOpportunitiesData from '../../../../testData/crm/crmData/crmOpportunitiesData.json';
import { navigateToOpportunitiesTab } from '../../../../utilities/carrierUtils/carrierUtils';
import { genrateRandomName } from '../../../../tdm/lib/utilities/utilities';
import {
  editOpportunitiesFields,
  openOpportunityInExpandView,
  verifyCustomizeOptions,
  addOpportunityAllFields,
} from '../../../../utilities/customerUtils/customerUtils';
import {
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  toastWithMsg,
  verifyClosePopup,
  verifyTableColumnsHeaders,
  verifyTableColumnsHeadersToolTip,
  viewFullPage,
  verifyExists,
  verifyTextContains,
  clickAction,
} from '../../../../utilities/commonUtils/genericUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const { tdmAddCarrierReq, tdmCarrierData, tdmCarrierScenarioNew } =
  crmNotesData.staticData;
const {
  opportunitiesTableAllColumnText,
  tblOpportunitiesColHeadersInExpand,
  btnOppCustDefaultViewExpand,
  btnOppCustomizeOption,
  btnResetToDefault,
  btnCustTableSave,
  hideCustomTableDocumentNameValue,
  customizeOppStageDragItem,
  customizeOppTypeDragItem,
  tblOpportunities,
  lblStatus,
  tblOpportunitiesColHeaders,
  btnAddOpportunity,
  lblAddOppTitle,
} = crmOpportunitiesPage;
const {
  minionDrpDwnPricingStrat,
  minionDrpDwnSolType,
  minionDrpDwnSolution,
  minionDrpDwnSource,
  minionDrpDwnStage,
  minionDrpDwnType2,
  tblColHeadernames,
  oppStatusLabel,
  opportunityCustomizedTableArray,
  addOpportunityTitle,
} = crmOpportunitiesData.staticData;

const { msgAddOpportunity } = crmOpportunitiesData.expectedData;
const nameOpportunity = 'opportunityName';
let carrierNameVal,
  drpDwnPricStrat1,
  drpDwnSolType2,
  drpDwnSolution1,
  drpDwnSourceOption1,
  drpDwnStageOption1,
  drpDwnTypeOption1,
  opportunityName;

describe('Verify user can Validate Opportunities table create and edit a new opportunity | Carrier > CRM > Opportunities [ME-137339] [ME-137345] [ME-137346] [ME-130927] [ME-138651] [ME-138660]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({
      dataType: tdmCarrierData,
      dataCondition: tdmAddCarrierReq,
      dataScenario: tdmCarrierScenarioNew,
    });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    getMinionValues(minionDrpDwnSource, 1).then((resultOptions) => {
      drpDwnSourceOption1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnType2, 1).then((resultOptions) => {
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
    getMinionValues(minionDrpDwnPricingStrat, 1).then((resultOptions) => {
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

  it('[ME-137339] [ME-137345] [ME-137346]: Verify user able to navigate to Opportunities table and create a new opportunity  > CRM > Carrier details | Carrier Regression | Sprint Regression',
    '[ME-130927]: Verify that the user able to hover over column values and field values in tooltip > CRM > Carrier details | Carrier Regression | Sprint Regression',
    {
      tags: ['@carrier', '@crm', '@opportunities', '@carrierIndustry', '@p1', '@phase1'],
    },
    () => {
      //Navigating to Opportunities tab
      navigateToOpportunitiesTab({
        carrierName: carrierNameVal.carrierName,
      });
      verifyExists({ element: tblOpportunities });
      //Verifying Opportunities status label
      verifyTextContains({ locator: lblStatus, containsText: oppStatusLabel });
      //Verifying Opportunities table column headers
      verifyTableColumnsHeaders({ locator: tblOpportunitiesColHeaders, columnNames: tblColHeadernames });
      //Verifying Opportunities table tooltipcolumn headers
      verifyTableColumnsHeadersToolTip({
        locator: opportunitiesTableAllColumnText,
        columnNames: tblColHeadernames,
      });
      //Opening a new Opportunity modal
      verifyExists({ element: btnAddOpportunity });
      clickAction({ locator: btnAddOpportunity });
      verifyTextContains({ locator: lblAddOppTitle, containsText: addOpportunityTitle });
      //Generating a random name to use for adding an Opportunity
      opportunityName = genrateRandomName() + generateRandomNumber();
      cy.log(opportunityName);
      //Adding a new Opportunity
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
      toastWithMsg({ message: msgAddOpportunity });
    },
  );

  it('[ME-138651]: Verify that the user able to customize columns and update columns in both Expand and Customized view > CRM > Carrier details | Carrier Regression | Sprint Regression',
    {
      tags: ['@carrier', '@crm', '@opportunities', '@carrierIndustry', '@p1', '@phase1'],
    },
    () => {
      //Navigating to Opportunities tab
      navigateToOpportunitiesTab({
        carrierName: carrierNameVal.carrierName,
      });
      //Verifying coloumns in Expand View
      openOpportunityInExpandView();
      verifyTableColumnsHeaders({
        locator: tblOpportunitiesColHeadersInExpand,
        columnNames: tblColHeadernames,
      });
      verifyClosePopup();
      //Update coloumns in Customize View
      verifyCustomizeOptions({
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
  it('[ME-138660]: Verify that the user can be able to edit the created opportunity from the table > CRM > carrier details | carrier Regression | Sprint Regression',
    {
      tags: ['@carrier', '@crm', '@opportunities', '@carrierIndustry', '@p1', '@phase1'],
    },
    () => {
      //Navigating to Opportunities tab
      navigateToOpportunitiesTab({
        carrierName: carrierNameVal.carrierName,
      });
      editOpportunitiesFields(nameOpportunity + generateRandomNumber());
      //Verifying 'Updated' message after adding an Opportunity
      toastWithMsg({ message: msgAddOpportunity });
    },
  );
});