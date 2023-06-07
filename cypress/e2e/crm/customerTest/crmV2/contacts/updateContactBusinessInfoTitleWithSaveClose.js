//---------------------------------------------------------------------------------------------------------------
//List to all Data to create Bussiness Info title for Contact With SaveAndClose below Minion terms//
//Test Cases List
//Authored By                   : Murali
//Date                          : 27-04-2023
//Functions/Calling References  : contactPage,commonData,crmIndustryData,crmContactsData,utilities
//Test cases Included           : ME-146622 Can I create Add new contact, Save and Close with  an Contact in the contacts Tab and verify Business Information tab title in the Contacts Object Screen  for Add | Edit Contacts > CRMV2 > Contacts | Carrier Regression | Sprint Regression
//---------------------------------------------------------------------------------------------------------------

import {
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  addNewContact,
  navigateToTheCrmV2Tab,
  editContactBusinessInfoTab,
  editContactBusinessInfoTitleAndSave,
  verifyTitleAtContactWindowGridColumn,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const { shortWait, longWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
} = crmContactsData.userDefinedData;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmIndustryData.staticData;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let carrierNameVal, contactDepName, randomContactName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;
let customerNameVal;

describe('Can I create Contact in the contacts Tab > Customer > CRMV2 > Contacts Tab > Comtact', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });

    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    cy.log('carrierNameVal:' + carrierNameVal);
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    randomContactName = prefixTxt + generateRandomNumber();
    randomPhNo = phoneNo + generateRandomNumber();
    cy.log(randomPhNo);
    newContactTabPhoneVal = verifyPhone({ textType: randomPhNo });
    cy.log(newContactTabPhoneVal);
    newContactTabEmailVal = verifyMailId({ textType: email });
    cy.log(newContactTabEmailVal);
  });

  it('ME-146622 Can I create Add new contact, Save and Close with  an Contact in the contacts Tab and verify Business Information tab title in the Contacts Object Screen  for Add | Edit Contacts > CRMV2 > Contacts | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p1',
      '@phase1',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ customerName: customerNameVal.customerName });
    cy.log('***Create Add New Contact in Customer***');
    waitSometime(shortWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('*** Editing Contact Created and Moving towards Business Information Tab ***');
    editContactBusinessInfoTab({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    //toastMsg();
    waitSometime(longWait);
    cy.log('*** Add or Edit the title at Business Information Tab  and Save ***');
    editContactBusinessInfoTitleAndSave({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('*** Verified the title at Business Information Tab and also at Contact grid Title column value ***');
    verifyTitleAtContactWindowGridColumn({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
  });
});