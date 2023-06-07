/*---------------------------------------------------------------------------------------------------------------
Verify the contact object screen for "Add New Contact" is saved with the required fields via Save and Continue To Record
Test Cases List
Authored By                   : Dasari Santhosh
Date                          : 26-04-2023
Functions/Calling References  : customerUtils,carrierUtils,opportunityUtils,genericUtils
Test case Included            : ME-146472 Verify the contact object screen for the duplicate contact saved via Save and Continue To Record
---------------------------------------------------------------------------------------------------------------*/

import {
  clickAction,
  clickActionWait,
  clickVisibleElement,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  navigateToChildWindow,
  previousTab,
  toastMsg,
  verifyVisible,
  viewFullPage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
import contactPage from '../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../testData/crm/crmData/crmContactsData.json';
import {
  enterContactMandatoryFields,
  navigateToTheCrmV2TabCustomer,
} from '../../../utilities/customerUtils/customerUtils';
import * as carrierUtils from '../../../utilities/carrierUtils/carrierUtils';
import * as crmFirmographicsPage from '../../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
const { longWait } = commonData;
const {
  prefixTxt,
} = crmContactsData.userDefinedData;
const {
  btnContactsIgnoreAndAddNewContact,
  btnSaveAndContinueContact,
  titleDuplicateContactWindow,
} = contactPage;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerWithoutGeneralContact,
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
} = crmIndustryData.staticData;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let customerNameVal, carrierNameVal, contactDepName;
describe('Can user create Duplicate Contact(s) Detected via Save and Continue [ME-146472]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerWithoutGeneralContact });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });

    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-146472 Verify the contact object screen for the duplicate contact saved via Save and Continue To Record > ignore contact > CRMV2 > Contacts > Customer | Carrier', {
    tags: [
      '@bvt',
      '@crm',
      '@customerContacts',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    //carrier
    const randomCarrierContactName = prefixTxt + generateRandomNumber();
    carrierUtils.navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });

    //adding new contact with random name
    enterContactMandatoryFields({ contactName: contactDepName, randomName: randomCarrierContactName });
    clickActionWait({ locator: crmFirmographicsPage.btnSaveContact });
    waitSometime(longWait);

    enterContactMandatoryFields({ contactName: contactDepName, randomName: randomCarrierContactName });
    clickActionWait({ locator: btnSaveAndContinueContact });
    waitSometime(longWait);

    //adding duplicate contact
    navigateToChildWindow();
    verifyVisible({ element: titleDuplicateContactWindow });
    clickVisibleElement({ locator: btnContactsIgnoreAndAddNewContact });
    toastMsg();
    waitSometime(longWait);
    previousTab();

    //customer
    const randomCustomerContactName = prefixTxt + generateRandomNumber();
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });

    //adding new contact with random name
    enterContactMandatoryFields({ contactName: contactDepName, randomName: randomCustomerContactName });
    clickAction({ locator: crmFirmographicsPage.btnSaveContact });
    waitSometime(longWait);

    enterContactMandatoryFields({ contactName: contactDepName, randomName: randomCarrierContactName });
    clickActionWait({ locator: btnSaveAndContinueContact });
    waitSometime(longWait);

    //adding duplicate contact
    navigateToChildWindow();
    verifyVisible({ element: titleDuplicateContactWindow });
    clickVisibleElement({ locator: btnContactsIgnoreAndAddNewContact });
    toastMsg();
    waitSometime(longWait);
    previousTab();
  });
});