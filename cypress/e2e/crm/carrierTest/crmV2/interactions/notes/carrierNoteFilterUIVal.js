//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Notes Column Filter Validations under interactions in Carrier//
//Test Cases List
//Authored By : Utkarsh Sudhakarrao Mandavkar
//Date: 03-03-2023
//Functions/Calling References: crmNotesData, crmNotesPage, carrierUtils, genericUtils, loginUtils
//Test case Included : ME-131659 Can I Validate Notes Column Filter UI Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import {
  carrierNotesFiltersUIValidations,
  navigateToNotesTab,
  notesCarrCarrotButtonExpand,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
import {
  getTDMData,
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
  btnCarrDefaultViewExpand,
  btnExpandViewExpand,
} = crmNotesPage;

let carrierNameVal;
describe('Can I Validate Notes Column Filters UI Validations in Notes > Carrier > CRM > Interactions> Notes > Column Filters Validations [ME-131659]', () => {
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

  it('ME-131659 Can I Validate Notes Column Filter UI Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression',
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
      carrierNotesFiltersUIValidations({ locator: btnCarrDefaultViewExpand });
      cy.log('***verifying in expand view***');
      notesCarrCarrotButtonExpand();
      carrierNotesFiltersUIValidations({ locator: btnExpandViewExpand });
    },
  );
});