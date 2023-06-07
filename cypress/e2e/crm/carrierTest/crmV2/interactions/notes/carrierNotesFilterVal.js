//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Notes Column Filter Validations under interactions in Carrier//
//Test Cases List
//Authored By: K.Santhosh
//Date: 08-03-2023,
//Functions/Calling References: crmNotesData, crmNotesPage, carrierUtils, genericUtils, loginUtils
//Test case Included: ME-132204 Can I Validate Notes Column Filter Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression
//ME-132205 Can I Validate Notes Open Entry Field Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression
//ME-133940 Can I Validate Notes DropDown Fields Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression
//ME-133950 Can I Validate Notes Customized Fields Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import {
  addNotes,
  navigateToNotesTab,
  notesCarrCarrotButtonExpand,
  notesCustomizeInDefaultView,
  notesCustomizeInExpandView,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
import {
  notesColumnTypeUIValidations,
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
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
} = crmNotesData.staticData;

const {
  notesOperationsValue,
} = crmNotesData.userDefinedData;

const {
  btnAddNotesCarr,
  btnNoteTypeFilter,
  msgNoNotesFound,
} = crmNotesPage;

let carrierNameVal;
describe('Can I Validate Notes Column Filter UI Validations in Notes > Carrier > CRM > Interactions> Notes > Column Filter Validations [ME-132204, ME-132205, ME-133940, ME-133950]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
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

  it('ME-132204 Can I Validate Notes Column Filter Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierNotes',
        '@p1',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
      notesColumnTypeUIValidations({ locator: btnAddNotesCarr });
      cy.log('***verifying in expand view***');
      notesCarrCarrotButtonExpand();
      notesColumnTypeUIValidations({ locator: btnAddNotesCarr });
    },
  );

  it('ME-132205 Can I Validate Notes Open Entry Field Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierNotes',
        '@p1',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
      addNotes({ locator: btnAddNotesCarr });
      notesOpenEntryUIValidations();
      cy.log('***verifying in expand view***');
      notesCarrCarrotButtonExpand();
      notesOpenEntryUIValidations();
      verifyVisible({ element: msgNoNotesFound });
    },
  );

  it('ME-133950 Can I Validate Notes Customized Fields Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierNotes',
        '@p1',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
      notesCustomizeInDefaultView();
      cy.log('***verifying in expand view***');
      notesCarrCarrotButtonExpand();
      notesCustomizeInExpandView();
    },
  );

  it('ME-133940 Can I Validate Notes DropDown Fields Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierNotes',
        '@p1',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
      addNotes({ locator: btnAddNotesCarr });
      notesSelectDDUIValidations();
      cy.log('***verifying in expand view***');
      notesCarrCarrotButtonExpand();
      dropDownExactCheckBoxSelection({ element: btnNoteTypeFilter, ddValue: notesOperationsValue });
      notesSelectDDUIValidations();
      verifyVisible({ element: msgNoNotesFound });
    },
  );
});