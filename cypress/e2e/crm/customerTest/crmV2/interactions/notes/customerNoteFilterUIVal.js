//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Notes Column Filter Validations under interactions in Customer//
//Test Cases List
//Authored By: Utkarsh Sudhakarrao Mandavkar
//Date: 03-03-2023
//Functions/Calling References: crmNotesData, crmNotesPage, customerUtils, genericUtils, loginUtils
//Test case Included: ME-131618 Can I Validate Notes Column Filter UI Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import {
  customerNoNotesInDefaultAndExpndView,
  cutomerNotesFiltersUIValidations,
  navigateToNotesTab,
  notesCustCarrotButtonExpand,
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
  btnCustDefaultViewExpand,
  btnExpandViewExpand,
} = crmNotesPage;

let customerNameVal;
describe('Can I Validate Notes Column Filters UI Validations in Notes > Customer > CRM > Interactions> Notes > Column Filters Validations [ME-131618]', () => {
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

  it('ME-131618 Can I Validate Notes Column Filter UI Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerNotes',
        '@p1',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToNotesTab({ customerName: customerNameVal.customerName });
      customerNoNotesInDefaultAndExpndView();
      cutomerNotesFiltersUIValidations({ locator: btnCustDefaultViewExpand });
      cy.log('***verifying in expand view***');
      notesCustCarrotButtonExpand();
      cutomerNotesFiltersUIValidations({ locator: btnExpandViewExpand });
    },
  );
});