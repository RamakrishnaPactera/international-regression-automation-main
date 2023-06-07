/*---------------------------------------------------------------------------------------------------------------
 List to all Fields data in UI and DB Validations in Notes > Customer > CRM
 Test Cases List
 Authored By                   : Lingaswamy Kottha
 Date                          : 09-03-2023
 Functions/Calling References  : crmNotesPage,customerUtils,genericUtils
 Test case Included            : ME-132587 - Can I Validate Notes Tab UI and DB Validations in Notes > Customer > CRM >  Notes > Add Icon
---------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import sqlData from '../../../../../../testData/sqlData/sqlData.json';
import {
  addNotes,
  navigateToNotesTab,
} from '../../../../../../utilities/customerUtils/customerUtils';
import {
  getTDMData,
  viewFullPage,
  clickVisibleElement,
} from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmNotesData.staticData;
const {
  btnAddNotesCust,
  btnNotesDownload,
} = crmNotesPage;
const {
  testuser,
  testportVal,
  testdatabase,
  testcustomerquery,
} = sqlData.sqlData;
const { azureSQLUrl } = Cypress.env('endPointUrl')[Cypress.env('environment')];
const testpassword = Cypress.env('azureSqlPassword');
let customerNameVal;
describe('Can I Validate Notes Tab UI and DB Validations in Notes > Customer > CRM >  Notes > Add Icon  [ME-132587]', () => {
  before(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    viewFullPage();
  });
  it('ME-132587 Can I Validate Notes Tab UI and DB Validations in Notes > CRM > notes > create | Customer | Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@notesCard',
        '@p1',
        '@phase2',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToNotesTab({ customerName: customerNameVal.customerName });
      addNotes({ locator: btnAddNotesCust });
      clickVisibleElement({ locator: btnNotesDownload });
      cy.url().then((text) => {
        const expectedentityId = (text.split('customers/')[1]).split('/crm')[0].toLowerCase();
        //Validating in DB
        cy.task('azureSQL', { user: testuser, password: testpassword, server: azureSQLUrl, portVal: testportVal, database: testdatabase, query: testcustomerquery }).then((results) => {
          cy.log('***Selected record*** ' + JSON.stringify(results));
          const actualValue = results[0].entity_id + ' ';
          expect(results.length).to.eq(1);
          expect(actualValue.toLowerCase()).contains(expectedentityId);//Expected values comming from UI or any
        });
      });
    },
  );
});