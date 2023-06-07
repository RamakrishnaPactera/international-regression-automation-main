//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Documents Tab UI Validations under interactions in Customer//
//Test Cases List
//Authored By : K.Santhosh
//Date : 03-03-2023
//Functions/Calling References: crmNotesData, crmNotesPage, customerUtils, genericUtils, loginUtils
//Test case Included : ME-131683 Can I Validate Documents Tab UI Validations in Documents > CRM > Interactions | Customer Regression | Sprint Regression
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import {
  customerNoDocInDefaultAndExpndView,
  customerDocumentsUIValidations,
  documentsCustCarrotButtonExpand,
  navigateToDocumentsTab,
} from '../../../../../../utilities/customerUtils/customerUtils';
import {
  getTDMData,
  viewFullPage,
} from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerNewScenario,
} = crmNotesData.staticData;

const {
  btnCustDocDefaultViewExpand,
  btnExpandViewExpand,
} = crmNotesPage;

let customerNameVal;
describe('Can I Validate Documents Tab UI Validations in Documents > Customer > CRM > Interactions> Documents > Documents Validations [ME-131683]', () => {
  before(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerNewScenario });
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

  it('ME-131683 Can I Validate Documents Tab UI Validations in Documents > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p1',
        '@phase2',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToDocumentsTab({ customerName: customerNameVal.customerName });
      customerNoDocInDefaultAndExpndView();
      customerDocumentsUIValidations({ locator: btnCustDocDefaultViewExpand });
      cy.log('***verifying in expand view***');
      documentsCustCarrotButtonExpand();
      customerDocumentsUIValidations({ locator: btnExpandViewExpand });
    },
  );
});