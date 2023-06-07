/*---------------------------------------------------------------------------------------------------------------
 List to all Fields data in UI and DB Validations in Notes > Carrier > CRM
 Test Cases List
 Authored By                   : Lingaswamy Kottha
 Date                          : 09-03-2023
 Functions/Calling References  : crmNotesPage,carrierUtils,genericUtils
 Test case Included            : ME-132586 - Can I Validate Notes Tab UI and DB Validations in Notes > Carrier > CRM >  Notes > Add Icon
---------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import sqlData from '../../../../../../testData/sqlData/sqlData.json';
import {
  addNotes,
  navigateToNotesTab,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
import {
  getTDMData,
  viewFullPage,
  clickVisibleElement,
} from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const testpassword = Cypress.env('azureSqlPassword');
const { azureSQLUrl } = Cypress.env('endPointUrl')[Cypress.env('environment')];
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmNotesData.staticData;
const {
  btnAddNotesCarr,
  btnNotesDownload,
} = crmNotesPage;
const {
  testuser,
  testportVal,
  testdatabase,
  testcarrierquery,
} = sqlData.sqlData;
let carrierNameVal;
describe('Can I Validate Notes Tab UI and DB Validations in Notes > Carrier > CRM > Notes > Add Icon Validations [ME-132586]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    viewFullPage();
  });
  it('ME-132586 Can I Validate Notes Tab UI and DB Validations in Notes > CRM > note create | Carrier | Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@notesCard',
        '@p1',
        '@phase2',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
      addNotes({ locator: btnAddNotesCarr });
      clickVisibleElement({ locator: btnNotesDownload });
      //Validating DB*
      cy.url().then((text) => {
        const expectedValue = (text.split('carriers/')[1]).split('/crm')[0].toUpperCase();
        cy.task('azureSQL', { user: testuser, password: testpassword, server: azureSQLUrl, portVal: testportVal, database: testdatabase, query: testcarrierquery }).then((results) => {
          cy.log('Selected record ' + JSON.stringify(results));
          const actualValue = results[0].entity_id + ' ';
          expect(actualValue).to.contain(expectedValue);
          expect(results.length).to.eq(1);
        });
      });
    },
  );
});