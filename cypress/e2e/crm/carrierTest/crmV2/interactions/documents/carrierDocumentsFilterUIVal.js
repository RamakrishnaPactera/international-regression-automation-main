//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Documents Tab UI Validations under interactions in Carrier//
//Test Cases List
//Authored By : K.Santhosh
//Date : 03-03-2023
//Functions/Calling References : crmNotesData, crmNotesPage, carrierUtils, genericUtils, loginUtils
//Test case Included : ME-131689 Can I Validate Documents Tab UI Validations in Documents > CRM > Interactions | Carrier Regression | Sprint Regression
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import {
  carrierDocumentsUIValidations,
  carrierNoDocInDefaultAndExpndView,
  documentsCarrCarrotButtonExpand,
  navigateToDocumentsTab,
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
  btnCarrDocDefaultViewExpand,
  btnExpandViewExpand,
} = crmNotesPage;

let carrierNameVal;
describe('Can I Validate Documents Tab UI Validations in Documents > Carrier > CRM > Interactions> Documents > Documents Validations [ME-131689]', () => {
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

  it('ME-131689 Can I Validate Documents Tab UI Validations in Documents > CRM > Interactions | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierDocuments',
        '@p1',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      carrierNoDocInDefaultAndExpndView();
      carrierDocumentsUIValidations({ locator: btnCarrDocDefaultViewExpand });
      cy.log('***verifying in expand view***');
      documentsCarrCarrotButtonExpand();
      carrierDocumentsUIValidations({ locator: btnExpandViewExpand });
    },
  );
});