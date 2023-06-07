/*---------------------------------------------------------------------------------------------------------------
 List to all Fields view the records based on Status dropdown filter in Opportunities
 Test Cases List
 Authored By                   : Lingaswamy Kottha
 Date                          : 17-03-2023
 Functions/Calling References  : loginToApplication,searchCarrier,crmPortFolioPage,crmFirmographicsData
Test case Included            : [ME-134518],[ME-135333],[ME-135379],[ME-134550]- Can User Verify Opportunity Tab
---------------------------------------------------------------------------------------------------------------*/
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import crmPortfolioData from '../../../testData/crm/crmData/crmPortfolioData.json';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmFirmographicsData from '../../../testData/crm/crmData/crmFirmographicsData.json';
import * as carrierUtils from '../../../utilities/carrierUtils/carrierUtils';

const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmFirmographicsData.staticData;
const {
  statusOpen,
  statusClose,
  statusHold,
  opportunityName,
  opportunityOpenStg,
  opportunityClosedStg,
  opportunityHoldStg,
  opportunitiesType,
  usertestautomation1,
  userNameVal,
} = crmPortfolioData.expectedData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let carrierNameVal;
const nameOpportunity = opportunityName;
describe('Can User Verify Opportunity Tab [ME-134518],[ME-135333],[ME-135379],[ME-134550]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    genericUtils.getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });
  it('ME-134518 - Can User Verify Portfolio > Opportunities > view the records based on Status dropdown filter in Opportunities Tab| PortFolio Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@opportunities',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.viewFullPage();
      portFolioUtils.createOpportunitiesWithMandatoryFields(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityOpenStg);
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      portFolioUtils.verifyOpportunitiesStatus(statusOpen);
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.viewFullPage();
      portFolioUtils.createOpportunitiesWithMandatoryFields(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityClosedStg);
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      portFolioUtils.verifyOpportunitiesStatus(statusClose);
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.viewFullPage();
      portFolioUtils.createOpportunitiesWithMandatoryFields(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityHoldStg);
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      portFolioUtils.verifyOpportunitiesStatus(statusHold);
    });
  it('ME-135333 - Can User Verify Portfolio > Opportunities > view and edit the Kabob options for each record in the Opportunities table | Portfolio Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@opportunities',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      genericUtils.viewFullPage();
      portFolioUtils.createOpportunitiesWithMandatoryFields(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityOpenStg);
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      portFolioUtils.editOpportunitiesFields(nameOpportunity + genericUtils.generateRandomNumber());
    });
  it('ME-135379 - Can User Verify Customize Table Validations In Opportunity Tab > portfolio > opportunities | Portfolio Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@opportunities',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      portFolioUtils.verifyCustomizeTable();
      portFolioUtils.verifyNotExistsCellCustomizeTable();
      portFolioUtils.verifyResetToDefaultCustomizeTable();
      portFolioUtils.verifyExistsCellCustomizeTable();
    });
  it('ME-134550 - Can User Verify Opportunities Tab Search by Rep > opportunities | Portfolio Regression | Sprint Regression',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@opportunities',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      portFolioUtils.verifySearchByRep(usertestautomation1, userNameVal);
      portFolioUtils.navigateToPorFolioOpportunitiesTab();
      portFolioUtils.editOpportunitiesFields(nameOpportunity + genericUtils.generateRandomNumber());
    });
});