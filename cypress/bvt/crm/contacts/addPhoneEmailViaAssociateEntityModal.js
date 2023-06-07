/*---------------------------------------------------------------------------------------------------------------
Verify Verify Add Phone and Email in Associated Entity Tab contact object screen of contact table
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 28-04-2023
Functions/Calling References  : contactPage,commonData,crmContactsData,utilities
Test cases Included           : [ME-146663] Verify Add Phone and Email in Associated Entity Tab contact object screen of contact table> CRMV2 > Contacts > Carrier
                              : [ME-150319] Verify Add Phone and Email in Associated Entity Tab contact object screen of contact table> CRMV2 > Contacts > Customer
---------------------------------------------------------------------------------------------------------------*/

import * as loginUtils from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as customerUtils from '../../../utilities/customerUtils/customerUtils';
import * as portFolioUtils from '../../../utilities/crmUtils/portFolioUtils';
import * as carrierUtils from '../../../utilities/carrierUtils/carrierUtils';
import * as crmUtils from '../../../utilities/crmUtils/crmUtils';
import * as commonData from '../../../testData/staticData/commonData/commonData.json';
import * as crmContactsData from '../../../testData/crm/crmData/crmContactsData.json';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, contactDepName, randomContactName, carrierNameVal, randomPhNo, newContactTabEmailVal;

describe('User Verifies Add Phone and Email in Associated Entity Tab Contacts Object Screen from Customer & Carrier > CRMV2 > Contacts Tab [ME-146663][ME-150319]', () => {
  beforeEach(() => {
    genericUtils.getTDMData({ dataType: crmContactsData.staticData.tdmCustomerData, dataCondition: crmContactsData.staticData.tdmAddCustomerReq, dataScenario: crmContactsData.staticData.tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    genericUtils.getTDMData({ dataType: crmContactsData.staticData.tdmCarrierData, dataCondition: crmContactsData.staticData.tdmAddCarrierReq, dataScenario: crmContactsData.staticData.tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    genericUtils.getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
    loginUtils.loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
    randomContactName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
    randomPhNo = crmContactsData.userDefinedData.phoneNo + genericUtils.generateRandomNumber();
    newContactTabEmailVal = crmUtils.verifyMailId({ textType: crmContactsData.userDefinedData.email });
  });
  it('[ME-150319] - Verify Add Phone and Email in Associated Entity in contact object screen of Contacts Table from Customer  > CRMV2 > Contacts Tab | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerContacts',
        '@p3',
      ],
    },
    () => {
      cy.log('***Validations in Customer CRMV2 Tab***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      portFolioUtils.navigateToCustomerCrmV2Tab();
      //Adding contact with save and continue to record option
      customerUtils.addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
      genericUtils.waitSometime(commonData.longWait);
      customerUtils.addPhoneEmailViaAssociateEntity();
      customerUtils.verifyPhoneAndEmail();
      cy.go('back');
      randomContactName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
      customerUtils.addContact({ contactName: contactDepName, randomName: randomContactName });
      customerUtils.contactsKabobMenu();
      customerUtils.addPhoneEmailViaAssociateEntity();
      customerUtils.verifyPhoneAndEmail();
      cy.go('back');
    });
  it('[ME-146663] - Verify Add Phone and Email in Associated Entity in contact object screen of Contacts Table from Carrier > CRMV2 > Contacts Tab | Carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierContacts',
        '@p3',
      ],
    },
    () => {
      cy.log('***Validations in Carrier CRMV2 Tab***');
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.navigateToCarrierCrmV2Tab();
      //Adding contact with save and continue to record option
      randomContactName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
      customerUtils.addDupContactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
      genericUtils.waitSometime(commonData.longWait);
      customerUtils.addPhoneEmailViaAssociateEntity();
      customerUtils.verifyPhoneAndEmail();
      cy.go('back');
      randomContactName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
      customerUtils.addContact({ contactName: contactDepName, randomName: randomContactName });
      customerUtils.contactsKabobMenu();
      customerUtils.addPhoneEmailViaAssociateEntity();
      customerUtils.verifyPhoneAndEmail();
    });
});