
import login from '../../../pageObjects/loginPage/loginPage.json';
import masteryHomePage from '../../../pageObjects/homePage/homePage.json';
import { verifyExists, verifyElementValue } from '../../commonUtils/genericUtils';
import commonData from '../../../testData/staticData/commonData/commonData.json';
const { dashBoardButton, masteryLogo } = masteryHomePage;
const {
  usernameField, passwordField, loginButton, showEmail, masteryLoginBtn, microsoftLoginUrl,
  ssoUsernameField, nextBtn, ssoPasswordField,
} = login;
const appUrl = Cypress.env('appUrl')[Cypress.env('environment')];
const { shortWait } = commonData;
const localLogin = ({ username: usernameText, password: passwordText }) => {
  cy.visit(appUrl);
  cy.get(showEmail).click();
  cy.get(usernameField).type(usernameText);
  verifyElementValue({ locator: usernameField, verifyText: usernameText });
  const password = retrievePassword({ username: usernameText });
  cy.get(passwordField).type(password, { log: false }).should(el$ => {
    if (el$.val() !== password) {
      throw new Error('Different value of typed password');
    }
  });
  cy.get(loginButton).click().wait(shortWait);
  verifyExists({ element: masteryLogo });
  verifyExists({ element: dashBoardButton }, { timeout: Cypress.env('defaultCommandTimeout') });
};

const ssoLogin = ({ username: usernameText, password: passwordTxt }) => {
  cy.visit(appUrl);
  cy.get(masteryLoginBtn).click();
  const passTxt = retrievePassword({ username: usernameText });
  cy.origin(microsoftLoginUrl, {
    args: {
      username: usernameText,
      password: passTxt,
      ssoUsernameBox: ssoUsernameField,
      nextButton: nextBtn,
      ssoPasswordBox: ssoPasswordField,
    },
  },
  ({ username, password, ssoUsernameBox, ssoPasswordBox, nextButton }) => {
    cy.log(username);
    const uName = username;
    cy.get(ssoUsernameBox).clear().type(uName);
    cy.get(nextButton).click();
    //eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.get(ssoPasswordBox).type(password, { log: false }).should(el$ => {
      if (el$.val() !== password) {
        throw new Error('Different value of typed password');
      }
    });
    cy.get(nextButton).click();
  });
  verifyExists({ element: masteryLogo });
  verifyExists({ element: dashBoardButton }, { timeout: Cypress.env('defaultCommandTimeout') });
  Cypress.on('uncaught:exception', () => {
    return false;
  });
};

const loginToApplication = (params) => {
  if (params.ssoLogin === undefined) {
    if (Cypress.env('ssoLogin')) {
      ssoLogin({ username: params.username, password: params.password });
    } else {
      localLogin({ username: params.username, password: params.password });
    }
  } else {
    if (params.ssoLogin) {
      ssoLogin({ username: params.username, password: params.password });
    } else {
      localLogin({ username: params.username, password: params.password });
    }
  }
};

const retrievePassword = ({ username: KeyCloakusername }) => {
  let newPassword = KeyCloakusername;
  switch (newPassword) {
    case 'KeycloakAccounting@mastery.net':
      newPassword = Cypress.env('keycloakAccountingPassword');
      break;
    case 'KeycloakCarrierManager@mastery.net':
      newPassword = Cypress.env('keycloakCarrierManagerPassword');
      break;
    case 'KeycloakSales@mastery.net':
      newPassword = Cypress.env('keycloakSalesPassword');
      break;
    case 'KeycloakTrackingDispatch@mastery.net':
      newPassword = Cypress.env('keycloakTrackingDispatchPassword');
      break;
    case 'KeycloakTrackingDispatchManager@mastery.net':
      newPassword = Cypress.env('keycloakTrackingDispatchManagerPassword');
      break;
    case 'KeycloakHR@mastery.net':
      newPassword = Cypress.env('keycloakHRPassword');
      break;
    case 'KeycloakAdmin@mastery.net':
      newPassword = Cypress.env('keycloakAdminPassword');
      break;
    case 'KeycloakOpsRep@mastery.net':
      newPassword = Cypress.env('keycloakOpsRepPassword');
      break;
    case 'KeycloakAccountsPayable@mastery.net':
      newPassword = Cypress.env('keycloakAccountsPayablePassword');
      break;
    case 'KeycloakAccountsReceivable@mastery.net':
      newPassword = Cypress.env('keycloakAccountsReceivablePassword');
      break;
    case 'KeycloakCarrierRep@mastery.net':
      newPassword = Cypress.env('keycloakCarrierRepPassword');
      break;
    case 'KeycloakOpsManager@mastery.net':
      newPassword = Cypress.env('keycloakOpsManagerPassword');
      break;
    case 'KeycloakSuperUser@mastery.net':
      newPassword = Cypress.env(`keycloakSuperUserPassword${Cypress.env('environment')}`);
      break;
    case 'testautomation1@mastery.net':
      newPassword = Cypress.env(`serviceAccountPassword${Cypress.env('environment')}`);
      break;
    case 'sa-ml100-test-qalogin@mastery.net':
      newPassword = Cypress.env(`accountPassword${Cypress.env('environment')}`);
      break;
    case 'testusercrm@mastery.net':
      newPassword = Cypress.env(`testUserCrmPassword${Cypress.env('environment')}`);
      break;
  }
  return newPassword;
};

export {
  localLogin,
  loginToApplication,
  retrievePassword,
  ssoLogin,
};