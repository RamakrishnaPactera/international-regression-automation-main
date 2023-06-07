//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Notes Column Filter Validations under interactions in Customer//
//Test Cases List
//Authored By: K.Santhosh
//Date : 08-03-2023
//Functions/Calling References: crmNotesData, crmNotesPage, customerUtils, genericUtils, loginUtils
//Test case Included: ME-132202 Can I Validate Notes Column Filter Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression
//ME-132203  Can I Validate Notes Open Entry Field Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression
//ME-132207 Can I Validate Notes DropDown Fields Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression
//ME-132208 Can I Validate Notes Customized Fields Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import {
  addNotes,
  navigateToNotesTab,
  notesColumnTypeUIValidations,
  notesCustCarrotButtonExpand,
  notesCustomizeInDefaultView,
  notesCustomizeInExpandView,
  notesOpenEntryUIValidations,
  notesSelectDDUIValidations,
} from '../../../../../../utilities/customerUtils/customerUtils';
import {
  dropDownExactCheckBoxSelection,
  getTDMData,
  verifyVisible,
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
  notesOperationsValue,
} = crmNotesData.userDefinedData;
const {
  btnAddNotesCust,
  btnNoteTypeFilter,
  msgNoNotesFound,
} = crmNotesPage;

let customerNameVal;
describe('Can I Validate Notes Column Filter UI Validations in Notes > Customer > CRM > Interactions> Notes > Column Filter Validations [ME-132202, ME-132203, ME-132207, ME-132208]', () => {
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

  it('ME-132202 Can I Validate Notes Column Filter Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
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
      notesColumnTypeUIValidations({ locator: btnAddNotesCust });
      cy.log('***verifying in expand view***');
      notesCustCarrotButtonExpand();
      notesColumnTypeUIValidations({ locator: btnAddNotesCust });
    },
  );

  it('ME-132203  Can I Validate Notes Open Entry Field Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
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
      addNotes({ locator: btnAddNotesCust });
      notesOpenEntryUIValidations();
      cy.log('***verifying in expand view***');
      notesCustCarrotButtonExpand();
      notesOpenEntryUIValidations();
      verifyVisible({ element: msgNoNotesFound });
    },
  );
  it('ME-132208 Can I Validate Notes Customized Fields Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
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
      notesCustomizeInDefaultView();
      cy.log('***verifying in expand view***');
      notesCustCarrotButtonExpand();
      notesCustomizeInExpandView();
    },
  );
  it('ME-132207 Can I Validate Notes DropDown Fields Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
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
      addNotes({ locator: btnAddNotesCust });
      notesSelectDDUIValidations();
      cy.log('***verifying in expand view***');
      notesCustCarrotButtonExpand();
      dropDownExactCheckBoxSelection({ element: btnNoteTypeFilter, ddValue: notesOperationsValue });
      notesSelectDDUIValidations();
      verifyVisible({ element: msgNoNotesFound });
    },
  );
});