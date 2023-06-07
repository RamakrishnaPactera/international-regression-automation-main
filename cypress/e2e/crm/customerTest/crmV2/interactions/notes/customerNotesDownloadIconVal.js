/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Notes Column Filter Validations under interactions in Customer//
Test Cases List
Authored By: M.Ravi , K.Santhosh
Date: 08-03-2023
Functions/Calling References: crmNotesData, crmNotesPage, customerUtils, genericUtils, loginUtils
Test case Included: ME-123409 Can I Validate Notes Tab UI Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression
ME-127509 Can I Validate Notes Tab Edit Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression
ME-133946 Can I Validate Notes Tab filter Validations in Notes > CRM > Interactions | customer Regression | Sprint Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import {
  addNotes,
  addTypeNotes,
  customerDisableInDefaultAndExpndView,
  customerEditInDefaultAndExpndView,
  customerNotesUIValidations,
  navigateToNotesTab,
  notesCustCarrotButtonExpand,
} from '../../../../../../utilities/customerUtils/customerUtils';
import {
  clickAction,
  dropDownExactCheckBoxSelection,
  getTDMData,
  verifyValue,
  viewFullPage,
} from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerNewScenario,
  typeCompanyFieldValue,
  typeGeneralFieldValue,
} = crmNotesData.staticData;

const {
  btnAddNotesCust,
  btnCustDefaultViewExpand,
  btnExpandViewExpand,
  btnNotesExpandViewClose,
  notesTypeFilter,
} = crmNotesPage;

let customerNameVal;
describe('Can I Validate Notes Tab UI Validations in Notes > Customer > CRM > Interactions> Notes > Download Icon Validations [ME-123409, ME-127509]', () => {
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

  it('ME-123409 Can I Validate Notes Tab UI Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
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
      customerDisableInDefaultAndExpndView();
      addNotes({ locator: btnAddNotesCust });
      customerNotesUIValidations({ locator: btnCustDefaultViewExpand });
      cy.log('***verifying in expand view***');
      notesCustCarrotButtonExpand();
      customerNotesUIValidations({ locator: btnExpandViewExpand });
    },
  );

  it('ME-133946 Can I Validate Notes Tab Edit Validations in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
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
      customerEditInDefaultAndExpndView({ locator: btnCustDefaultViewExpand });
      cy.log('***verifying in default view***');
      notesCustCarrotButtonExpand();
      customerEditInDefaultAndExpndView({ locator: btnExpandViewExpand });
    },
  );

  it('ME-127510 Can I Validate Notes Tab filter Validations in Notes > CRM > Interactions | customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerNotes',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToNotesTab({ customerName: customerNameVal.customerName });
      addTypeNotes({ locator: btnAddNotesCust, notesTypeDrp: typeGeneralFieldValue });
      dropDownExactCheckBoxSelection({ element: notesTypeFilter, ddValue: typeGeneralFieldValue });
      cy.log('***verifying in expand view***');
      notesCustCarrotButtonExpand();
      verifyValue({ locator: notesTypeFilter, value: typeGeneralFieldValue });
      addTypeNotes({ locator: btnAddNotesCust, notesTypeDrp: typeCompanyFieldValue });
      dropDownExactCheckBoxSelection({ element: notesTypeFilter, ddValue: typeGeneralFieldValue });
      dropDownExactCheckBoxSelection({ element: notesTypeFilter, ddValue: typeCompanyFieldValue });
      clickAction({ locator: btnNotesExpandViewClose });
      verifyValue({ locator: notesTypeFilter, value: typeCompanyFieldValue });
    });
});