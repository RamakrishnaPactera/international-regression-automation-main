import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import {
  addNotes,
  customerDisableInDefaultAndExpndView,
  navigateToNotesTab,
} from '../../../../../../utilities/customerUtils/customerUtils';
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
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmNotesData.staticData;

const {
  btnAddNotesCust,
  btnNotesDownload,
} = crmNotesPage;

let customerNameVal;
describe('Can I Validate Notes Download Icon Feature Flag Scope in Notes > Customer > CRM > Interactions> Notes > Download Icon Validations [ME-123453, ME-123454]', () => {
  beforeEach(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });

  it('ME-123453 Can I Validate Notes Download Icon with Feature Flag Scope as Yes in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerNotes',
        '@p3',
        '@phase1',
      ],
    },
    () => {
      loginToApplication({ username: usernameText, password: passwordText });
      viewFullPage();
      navigateToNotesTab({ customerName: customerNameVal.customerName });
      addNotes({ locator: btnAddNotesCust });
      clickable({ locator: btnNotesDownload });
    },
  );

  it('ME-123454 Can I Validate Notes Download Icon with Feature Flag Scope as No in Notes > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerNotes',
        '@p3',
        '@phase1',
      ],
    },
    () => {
      localLogin({ username: usernameText1, password: passwordText1 });
      viewFullPage();
      navigateToNotesTab({ customerName: customerNameVal.customerName });
      customerDisableInDefaultAndExpndView();
    },
  )
  ;
});