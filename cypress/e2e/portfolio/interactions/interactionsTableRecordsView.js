/*---------------------------------------------------------------------------------------------------------------
Verify to view  Intraction record and reschedule the record from Portfolio screen interactions
Test Cases List
Authored By                   : Madhu Manyam
Date                          : 01-03-2023
Functions/Calling References  : crmPortFolioPage,crmIndustryData,crmInteractionsPage,crmInteractionData,commonData,utilities
Test case Included            : ME-129539 - ME-129549 Verify view the interaction record details, Reschedule the  Interactions record  In Interactions Tab > PortFolia > Interactions> View> Reschedule
-------------------------------------------------------------------------------------------------------------------*/
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmInteractionsData from '../../../testData/crm/crmData/crmInteractionsData.json';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  days,
} = crmInteractionsData.userDefinedData;

describe('User Validates to view  completed interactions record details > Porfolio > Interaction Tab> View > [ME-129549]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('ME-129549 User Verifies to view the interaction record details, Reschedule the  Interactions record  In Interactions Tab > PortFolio > Interactions> View> Reschedule| PortFolia Regression | Sprint Regression', {
    tags: [
      '@crm',
      '@portfolio',
      '@interactions',
      '@p2',
      '@phase2',
    ],
  },
  () => {
    cy.log('**verifying the view completed interaction records and  reschedule audit Interactions**');
    portFolioUtils.navigateToPortfolioInteractionsTab();
    portFolioUtils.setInteractionsDateBarToFilterRecords({ noOfDays: days });
    portFolioUtils.openViewInteractionDetails();
  });
});