/*---------------------------------------------------------------------------------------------------------------
 List to all Fields view the records based on Status dropdown filter in Opportunities
 Test Cases List
 Authored By                   : Lingaswamy Kottha
 Date                          : 17-03-2023
 Functions/Calling References  : loginToApplication,searchCarrier,crmPortFolioPage,crmFirmographicsData
Test case Included            : [ME-134518],[ME-135333],[ME-135379],[ME-134550]- Can User Verify Opportunity Tab
---------------------------------------------------------------------------------------------------------------*/
import {
  createOpportunitiesWithMandatoryFields,
  navigateToPorFolioOpportunitiesTab,
} from '../../../utilities/crmUtils/portFolioUtils';
import crmPortfolioData from '../../../testData/crm/crmData/crmPortfolioData.json';
import {
  getTDMData,
  viewFullPage,
  generateRandomNumber,
  verifyIfDisabled,
} from '../../../utilities/commonUtils/genericUtils';
import { localLogin } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmFirmographicsData from '../../../testData/crm/crmData/crmFirmographicsData.json';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
import { btnKabob } from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmFirmographicsData.staticData;

const {
  opportunityName,
  opportunityOpenStg,
  opportunitiesType,
} = crmPortfolioData.expectedData;
let carrierNameVal;
const nameOpportunity = opportunityName;
const { userName: usernameText1, password: passwordText1 } = Cypress.env('users').testUserCrm;
describe('Can User Verify Opportunity Tab and Disable edit button [ME-135635]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });
  it('ME-135635 - Can User Verify Opportunities Table > access and Visibility > Kabob options based on User Scope assigned > Opportunities > Customer and Carrier Record > Kabob > Edit | Sprint Regression',
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
      localLogin({ username: usernameText1, password: passwordText1 });
      searchCarrier({ carrierName: carrierNameVal.carrierName });
      viewFullPage();
      createOpportunitiesWithMandatoryFields(nameOpportunity + generateRandomNumber(), opportunitiesType, opportunityOpenStg);
      navigateToPorFolioOpportunitiesTab();
      verifyIfDisabled({ locator: btnKabob });
    });
});