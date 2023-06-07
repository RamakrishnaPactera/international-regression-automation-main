/*---------------------------------------------------------------------------------------------------------------
Verify carrier and customer Interaction in Duration & location field - UI Changes
Test Cases List
Authored By                   : satyanarayana karadhi
Date                          : 01-06-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-151174 Can user validate Duration & location Fields when FF is off > Interaction > CRM > Interactions | InSprint
------------------------------------------------------------------------------------------------------------------*/
import crmIndustryData from '../../../../../../testData/crm/crmData/crmIndustryData.json';
import crmInteractionData from '../../../../../../testData/crm/crmData/crmInteractionsData.json';
import * as crmInteractionsPage from '../../../../../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as customerUtils from '../../../../../../utilities/customerUtils/customerUtils';
import * as commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import * as genericUtils from '../../../../../../utilities/commonUtils/genericUtils';
import homePage from '../../../../../../pageObjects/homePage/homePage.json';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as portFolioUtils from '../../../../../../utilities/crmUtils/portFolioUtils';
const { shortWait } = commonData;
const { masteryLogo } = homePage;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  interactionLogType,
  interactionLogVia,
  logAdvancementOutcome,
  durationVal,
  interactionLogReason,
  customerCrmInteractionDisableFF,
  interactionLogOutComeDeadEnd,

} = crmInteractionData.staticData;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
let interactionsObjectiveVal, customerNameVal, detailsVal;
describe('Interactions Table - Duration column > Carrier > CRM > Interactions | Insprint [ME-151809, ME-151810]', () => {
  before(() => {
    genericUtils.getMinionValues('customerCrmInteractionsObjective', 1).then((interactionsObjective) => {
      interactionsObjectiveVal = interactionsObjective[0];
    });
    detailsVal = Math.random().toString(36);
    cy.log('***creating new carrier***');
    genericUtils.getTDMData({
      dataType: tdmCustomerData,
      dataCondition: tdmAddCustomerReq,
      dataScenario: tdmCustomerScenario,
    });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    genericUtils.viewFullPage();
  });
  it('ME-151669 Customer- verify Duration & location fields in Interaction table when FF is Off> Log Interaction  > CRM > Interactions |',
    {
      tags: ['@carrier', '@crm', '@carrierInteractins', '@p1', '@phase1'],
    },
    () => {
      genericUtils.clickActionWait({ locator: masteryLogo });
      genericUtils.updateUrlWithFF({ flag: customerCrmInteractionDisableFF });
      cy.log('***verifying Customer Create Log Interaction create***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
      genericUtils.verifyToExist({ element: crmInteractionsPage.tabInteractions });
      genericUtils.clickAction({ locator: crmInteractionsPage.tabInteractions });
      genericUtils.verifyVisible({ element: crmInteractionsPage.interactionTable });

      //verifying the duration is present or not in table header of default view
      genericUtils.verifyDoesNotExist({ element: crmInteractionsPage.interactionTableHeaderDuration });

      //Verifying the customize option by clicking the carrot button
      genericUtils.clickAction({ locator: crmInteractionsPage.customizeBtn });
      genericUtils.waitSometime(shortWait);

      genericUtils.clickVisibleElement({ locator: crmInteractionsPage.interactionTabbleCustomsizeOption });
      genericUtils.waitSometime(shortWait);
      genericUtils.verifyToExist({ element: crmInteractionsPage.interationCustomizeTable });
      genericUtils.verifyDoesNotExist({ element: crmInteractionsPage.interactionCustomizeDurationFieldEnable });

      portFolioUtils.createScheduleInteractionWithAllFieldsWhenFFisOff(interactionsObjectiveVal);
      portFolioUtils.editScheduleInteractionWhenFFisOff(interactionLogOutComeDeadEnd);
      portFolioUtils.reScheduleInteractionWhenFFisOff(interactionLogReason, detailsVal);
      portFolioUtils.reScheduleAuditInteractionWhenFFisOff();
      portFolioUtils.createNewLogInteractionWhenFFisOff(interactionsObjectiveVal, interactionLogVia, logAdvancementOutcome, interactionLogType, durationVal, durationVal, detailsVal);
      portFolioUtils.editLogInteractionWhenFFisOff();
    },
  );
});