import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import {
  addNotes,
  carrierDisableInDefaultAndExpndView,
  navigateToNotesTab,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
import {
  clickable,
  getTDMData,
  viewFullPage,
} from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication, localLogin } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

const { userName: usernameText1, password: passwordText1 } =
  Cypress.env('users').testUserCrm;

const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmNotesData.staticData;

const {
  btnAddNotesCarr,
  btnNotesDownload,
} = crmNotesPage;

let carrierNameVal;
describe('Can I Validate Notes Download Icon Feature Flag Scope in Notes > Customer > CRM > Interactions> Notes > Download Icon Validations [ME-123455, ME-123456]', () => {
  beforeEach(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });

  it('ME-123455 Can I Validate Notes Download Icon with Feature Flag Scope as Yes in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierNotes',
        '@p3',
        '@phase1',
      ],
    },
    () => {
      loginToApplication({ username: usernameText, password: passwordText });
      viewFullPage();
      navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
      addNotes({ locator: btnAddNotesCarr });
      clickable({ locator: btnNotesDownload });
    },
  );
  it('ME-123456 Can I Validate Notes Download Icon with Feature Flag Scope as No in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierNotes',
        '@p3',
        '@phase1',
      ],
    },
    () => {
      localLogin({ username: usernameText1, password: passwordText1 });
      viewFullPage();
      navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
      carrierDisableInDefaultAndExpndView();
    },
  );
});