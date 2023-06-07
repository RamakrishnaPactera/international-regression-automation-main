/*---------------------------------------------------------------------------------------------------------------
Can User Verify Portfolio Opportunity Tab
Test Cases List
Authored By                      : Pruthvirajg
Date                             : 17-03-2023
Functions/Calling References     : loginToApplication,searchCarrier,crmPortFolioPage,crmFirmographicsData
Test case Included               : ME-157258 - Can User Verify Save Opportunity Button should disabled at the first time when Edit Opportunity Modal Opened in the Portfolio Opportunities tab
                                 : ME-157259, ME-157260 -  Verify Open and On Hold opportunities records should display in normal font, Closed opportunities records should display in italic size font- in Opportunities Table in the Portfolio Opportunities tab
                                 : ME-157262 - Verify the recently Edited Opportunity record should display at the top of the opportunities table based on Status(Open , On Hold and Closed) in the Portfolio Opportunities tab
                                 : ME-150286 - Verify user able to save a Opportunity via Kabob menu in the Portfolio Opportunities tab | Portfolio Regression | Sprint Regression
                                 : ME-150287 - Verify Last updated Verbiage message  should display above the Save Opportunity Button in Edit Opportunity Modal in the Portfolio Opportunities tab
                                 ; ME-150288 - Verify Save Opportunity Button should disabled when all required fields  value/s removed  in Edit Opportunity Modal in the Portfolio Opportunities tab
---------------------------------------------------------------------------------------------------------------*/
import * as portFolioUtils from '../../utilities/crmUtils/portFolioUtils';
import crmPortfolioData from '../../testData/crm/crmData/crmPortfolioData.json';
import crmOpportunitiesData from '../../testData/crm/crmData/crmOpportunitiesData.json';
import * as genericUtils from '../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as commonPage from '../../pageObjects/commonPage/commonPage.json';
import * as crmPortFolioPage from '../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import * as crmOpportunitiesPage from '../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import { editOpportunityFields } from '../../utilities/customerUtils/customerUtils';
import { genrateRandomName } from '../../tdm/lib/utilities/utilities';
import { verifyFirstRowDate } from '../../utilities/assetUtils/resourceUtilis';
import { verifyLastUpdatedMsgEditOpp } from '../../utilities/opportunitiesUtils/opportunitiesUtils';
const dateObjToday = genericUtils.getDateWithTargetDay({ targetDate: 0 });
const { txtLastUpdatedBy } = crmOpportunitiesData.expectedData;

const {
  minionDrpDwnStage,
  minionDrpDwnDivision,
  minionDrpDwnType,
} = crmOpportunitiesData.staticData;
const { attrbackgroundFontStyleOpenOnhold, attrValueFontStyleOpenOnhold, attrValueFontStyleClosed, msgUpdated } = crmPortfolioData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let opportunityData, drpDwnStageOption1, drpDwnTypeOption1, opportunityName, drpDwnDivisionOption;

describe('Can User Verify Portfolio Opportunity Tab ME-157258,ME-157259, ME-157260,ME-157262 ME-150286,ME-150287,ME-150288', () => {
  before(() => {
    cy.log('***creating new carrier***');
    genericUtils.getMinionValues(minionDrpDwnType, 1).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
    genericUtils.getMinionValues(minionDrpDwnStage, 1).then((resultOptions) => {
      drpDwnStageOption1 = resultOptions[0];
    });
    genericUtils.getMinionValues(minionDrpDwnDivision, 1).then((resultOptions) => {
      drpDwnDivisionOption = resultOptions[0];
    });
  });
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
      opportunityName = genrateRandomName() + genericUtils.generateRandomNumber();
      opportunityData = new Map([
        ['Name', opportunityName],
        ['Type', drpDwnTypeOption1],
        ['Stage', drpDwnStageOption1],
        ['Division', drpDwnDivisionOption],
      ]);
    });
  });

  it('ME-157258 - Can User Verify Save Opportunity Button should disabled at the first time when Edit Opportunity Modal Opened in the Portfolio Opportunities tab | Portfolio Regression | Sprint Regression',
    { tags: ['@crm', '@portFolio', '@opportunities'] },
    () => {
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      genericUtils.clickAction({ locator: crmPortFolioPage.drpDwnOpportunitiesStatus });
      genericUtils.clickElementIndex({ locator: crmPortFolioPage.drpDwnOpportunitiesStatusOptions, index: 0 });
      genericUtils.selectKabobMenuOptionTable({ locator: commonPage.tblOpportunitiesTable, menuName: 'Edit' });
      genericUtils.verifyIfDisabled({ locator: crmPortFolioPage.btnSaveOpportunity });
    });

  it('ME-157259, ME-157260-  Verify Open and On Hold opportunities records should display in normal font, Closed opportunities records should display in italic size font- in Opportunities Table in the Portfolio Opportunities tab | Portfolio Regression | Sprint Regression',
    { tags: ['@crm', '@portFolio', '@opportunities'] },
    () => {
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      //Open and On Hold opportunities records should display in normal font
      genericUtils.clickAction({ locator: crmPortFolioPage.drpDwnOpportunitiesStatus });
      genericUtils.clickElementIndex({ locator: crmPortFolioPage.drpDwnOpportunitiesStatusOptions, index: 2 });
      genericUtils.verifyCSSAttributeValue({ locator: crmPortFolioPage.tblOpportunitiesNameColumn, attrValue: attrbackgroundFontStyleOpenOnhold, containsValue: attrValueFontStyleOpenOnhold });
      //Closed opportunities records should display in italic size font-
      genericUtils.clickAction({ locator: crmPortFolioPage.drpDwnOpportunitiesStatus });
      genericUtils.clickElementIndex({ locator: crmPortFolioPage.drpDwnOpportunitiesStatusOptions, index: 0 });
      genericUtils.clickElementIndex({ locator: crmPortFolioPage.drpDwnOpportunitiesStatusOptions, index: 1 });
      genericUtils.clickElementIndex({ locator: crmPortFolioPage.drpDwnOpportunitiesStatusOptions, index: 2 });
      genericUtils.verifyCSSAttributeValue({ locator: crmPortFolioPage.tblOpportunitiesNameColumn, attrValue: attrbackgroundFontStyleOpenOnhold, containsValue: attrValueFontStyleClosed });
    });

  it('ME-157262- Verify the recently Edited Opportunity record should display at the top of the opportunities table based on Status(Open , On Hold and Closed) in the Portfolio Opportunities tab | Portfolio Regression | Sprint Regression',
    { tags: ['@crm', '@portFolio', '@opportunities'] },
    () => {
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      genericUtils.clickAction({ locator: commonPage.tblOpportunitiesTable });
      portFolioUtils.validateOpportunitiesEdit();

      genericUtils.clickAction({ locator: crmPortFolioPage.drpDwnOpportunitiesStatus });
      genericUtils.clickElementIndex({ locator: crmPortFolioPage.drpDwnOpportunitiesStatusOptions, index: 0 });
      genericUtils.clickElementIndex({ locator: crmPortFolioPage.drpDwnOpportunitiesStatusOptions, index: 1 });
      portFolioUtils.validateOpportunitiesEdit();

      genericUtils.clickAction({ locator: crmPortFolioPage.drpDwnOpportunitiesStatus });
      genericUtils.clickElementIndex({ locator: crmPortFolioPage.drpDwnOpportunitiesStatusOptions, index: 0 });
      genericUtils.clickElementIndex({ locator: crmPortFolioPage.drpDwnOpportunitiesStatusOptions, index: 2 });
      portFolioUtils.validateOpportunitiesEdit();
    });

  it('ME-150286,ME-150287,ME-150288 - Verify user able to save a Opportunity via Kabob menu in the Portfolio Opportunities tab | Portfolio Regression | Sprint Regression',
    { tags: ['@crm', '@portFolio', '@opportunities'] },
    () => {
      //pre-requisite test data
      const currentDate = dateObjToday.mm + '/' + dateObjToday.dd + '/' + dateObjToday.yy;
      const user = usernameText.split('@')[0];
      const expectedMsg = txtLastUpdatedBy + user + '.' + user + ' ' + currentDate;

      //navigate to PorFolio Opportunities Tab
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      genericUtils.clickAction({ locator: crmPortFolioPage.drpDwnOpportunitiesStatus });
      genericUtils.clickElementIndex({ locator: crmPortFolioPage.drpDwnOpportunitiesStatusOptions, index: 0 });

      //edit portfolio Opportunity
      editOpportunityFields({
        dataText: opportunityName,
        drpDwnType: drpDwnTypeOption1,
        drpDwnStage: drpDwnStageOption1,
        drpDwnDivision: drpDwnDivisionOption,
      });
      //Verifying 'Updated' message after adding an Opportunity
      genericUtils.toastWithMsg({ message: msgUpdated });
      verifyFirstRowDate({ locator: crmOpportunitiesPage.rowOpportunitiesTable, inputDataObj: opportunityData });

      //Verify Last updated Verbiage message
      genericUtils.clickElementIndex({ locator: `${commonPage.tblOpportunitiesTable} ${commonPage.tblRows} ${commonPage.btnKabobMenu}`, index: 0 });
      genericUtils.clickVisibleElement({ locator: commonPage.lstContextMenuOptions });
      genericUtils.scrollIntoViewVerifyElement({ locator: crmOpportunitiesPage.msgLastUpdatedBy });
      verifyLastUpdatedMsgEditOpp({ locator: crmPortFolioPage.btnSaveOpportunity, containMsg: expectedMsg });

      //Verify Save Opportunity Button should disabled
      genericUtils.clearText({ locator: crmOpportunitiesPage.txtFieldOppName });
      genericUtils.verifyIfDisabled({ locator: crmOpportunitiesPage.btnSaveOpp });
      genericUtils.clickAction({ locator: crmPortFolioPage.dialogBox });
    });
});