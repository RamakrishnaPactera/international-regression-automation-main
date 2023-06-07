/*---------------------------------------------------------------------------------------------------------------
 Verifying Status Chip Filter > Portfolio > Interactions
 Test Cases List               : [ME-153726], [ME-153727]
 Authored By                   : Beemireddy Chandra obula reddy
 Date                          : 15-05-2023
 Functions/Calling References  :
 User Story Included            : [ME-135218]-Portfolio - Portfolio - Interactions - Implement Status Chip Filter
---------------------------------------------------------------------------------------------------------------*/
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmPortFolioPage from '../../../pageObjects/crm/crmPage/crmPortFolioPage.json';

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Portfolio - Opportunities Tab - Feature Flag On - Access and Visibility,[ME-146331]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });

  it('[ME-153727]-Verify Default Status Filter',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@p2',

      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Status chip filter and click on it***');
      portFolioUtils.verifyInteractionsTabStatusSheduled();
    });

  it('ME-153726 - Verify ChipMultiSelect Filter Component ',
    {
      tags: [
        '@crm',
        '@portFolio',
        '@p2',

      ],
    },
    () => {
      cy.log('***Navigate to Interaction tab in port folio***');
      portFolioUtils.navigateToPorFolioTab();
      cy.log('***Verify Status chip filter is there or not***');
      genericUtils.verifyVisible({ element: crmPortFolioPage.txtStatus });
    });
});