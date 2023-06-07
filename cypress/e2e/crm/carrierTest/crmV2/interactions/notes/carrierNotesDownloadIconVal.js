/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Notes Column Filter Validations under interactions in carrier//
Test Cases List
Authored By: M.Ravi , K.Santhosh
Date:08-03-2023
Functions/Calling References: crmNotesData, crmNotesPage, carrierUtils, genericUtils, loginUtils
Test case Included: ME-123447 Can I Validate Notes Tab UI Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression
ME-127510 Can I Validate Notes Tab Edit Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression
ME-133953 Can I Validate Notes Tab filter Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import {
  addNotes,
  addTypeNotes,
  carrierDisableInDefaultAndExpndView,
  carrierEditInDefaultAndExpndView,
  carrierNotesUIValidations,
  navigateToNotesTab,
  notesCarrCarrotButtonExpand,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
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
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
  typeCompanyFieldValue,
  typeGeneralFieldValue,
} = crmNotesData.staticData;

const {
  btnAddNotesCarr,
  btnCarrDefaultViewExpand,
  btnExpandViewExpand,
  btnNotesExpandViewClose,
  notesTypeFilter,
} = crmNotesPage;

let carrierNameVal;
describe('Can I Validate Notes Tab UI Validations in Notes > Carrier > CRM > Interactions> Notes > Download Icon Validations [ME-123447, ME-127510]', () => {
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

  it('ME-123447 Can I Validate Notes Tab UI Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression',
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
      carrierDisableInDefaultAndExpndView();
      addNotes({ locator: btnAddNotesCarr });
      carrierNotesUIValidations({ locator: btnCarrDefaultViewExpand });
      cy.log('***verifying in expand view***');
      notesCarrCarrotButtonExpand();
      carrierNotesUIValidations({ locator: btnExpandViewExpand });
    },
  );
  it('ME-127510 Can I Validate Notes Tab Edit Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression',
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
      carrierEditInDefaultAndExpndView({ locator: btnCarrDefaultViewExpand });
      cy.log('***verifying in default view***');
      notesCarrCarrotButtonExpand();
      carrierEditInDefaultAndExpndView({ locator: btnExpandViewExpand });
    },
  );
  it('ME-133953 Can I Validate Notes Tab filter Validations in Notes > CRM > Interactions | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierNotes',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
      addTypeNotes({ locator: btnAddNotesCarr, notesTypeDrp: typeGeneralFieldValue });
      dropDownExactCheckBoxSelection({ element: notesTypeFilter, ddValue: typeGeneralFieldValue });
      cy.log('***verifying in expand view***');
      notesCarrCarrotButtonExpand();
      verifyValue({ locator: notesTypeFilter, value: typeGeneralFieldValue });
      addTypeNotes({ locator: btnAddNotesCarr, notesTypeDrp: typeCompanyFieldValue });
      dropDownExactCheckBoxSelection({ element: notesTypeFilter, ddValue: typeGeneralFieldValue });
      dropDownExactCheckBoxSelection({ element: notesTypeFilter, ddValue: typeCompanyFieldValue });
      clickAction({ locator: btnNotesExpandViewClose });
      verifyValue({ locator: notesTypeFilter, value: typeCompanyFieldValue });
    });
});