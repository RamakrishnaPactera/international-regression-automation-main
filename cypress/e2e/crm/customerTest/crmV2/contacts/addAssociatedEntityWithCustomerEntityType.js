//---------------------------------------------------------------------------------------------------------------
//List to all Data to Add Associated Entity with Customer/Carrier/Facility Entity Type for an existing customer contact with the below Minion terms//
//Test Cases List
//Authored By                   : Gayathri Alley
//Date                          : 08-05-2023
//Functions/Calling References  : contactPage,commonData,crmIndustryData,crmContactsData,utilities
//Test cases Included           :
//ME-151896 Can I create "Add Associated Entity" with an Entity Type "Customer" in the contact object child window for an existing Contact in the contacts Tab > CRMV2 > Contacts
//ME-152029 Can I create "Edit Associated Entity" with an Entity Type "Customer" in the contact object child window for an existing Contact in the contacts Tab > CRMV2 > Contacts
//ME-151896 Can I create "Add Associated Entity" with an Entity Type "Carrier" in the contact object child window for an existing Contact in the contacts Tab > CRMV2 > Contacts
//ME-151896 Can I create "Edit Associated Entity" with an Entity Type "Carrier" in the contact object child window for an existing Contact in the contacts Tab > CRMV2 > Contacts
//ME-151896 Can I create "Add Associated Entity" with an Entity Type "Facility" in the contact object child window for an existing Contact in the contacts Tab > CRMV2 > Contacts
//ME-151896 Can I create "Edit Associated Entity" with an Entity Type "Facility" in the contact object child window for an existing Contact in the contacts Tab > CRMV2 > Contacts
//---------------------------------------------------------------------------------------------------------------

import {
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  viewFullPage,
  waitSometime,
  toastWithMsg,
  verifyTextContains,
} from '../../../../../utilities/commonUtils/genericUtils';
import contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  addNewContact,
  addAssociatedEntityWithCustomerEntityType,
  navigateToTheCrmV2TabCustomer,
  addAssociatedEntityWithCarrierEntityType,
  addAssociatedEntityWithFacilityEntityType,
  navigateToContactsObjScreen,
  editAssociatedEntityWithCustomerEntityType,
  editAssociatedEntityWithCarrierEntityType,
  editAssociatedEntityWithFacilityEntityType,
} from '../../../../../utilities/customerUtils/customerUtils';
import { verifyMailId, verifyPhone } from '../../../../../utilities/crmUtils/crmUtils';
const { longWait } = commonData;
const { carrierEntityType, carrNameVal, custNameVal, customerEntityType, email, ExtSystemUser, facilityEntityType, facNameVal, functionDrpdwnVal1, functionDrpdwnVal2, msg, phoneNo, prefixTxt, txtDetails } = crmContactsData.userDefinedData;
const {
  customerAssociatedEntityDetailsVal,
  customerAssociatedEntityExtSystemUserVal,
  customerAssociatedEntityFunctionsVal,
  customerAssociatedEntityTypeVal,
  customerAssociatedEntityVal,
} = contactPage;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, contactDepName, randomContactName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;
describe('Verify the Add Associated Entity with an Entity Type "Customer/Carrier/Facility" for an existing Customer Contact in the contacts object child window > Customer > CRMV2 > Contacts Tab [ME-151896], [ME-152029], [ME-151902], [ME-152047], [ME-151908], [ME-152048] ', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 3).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });
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
  it('ME-151896 Can user create "Add Associated Entity" with an Entity Type "Customer" in the contact object child window for an existing Contacts in the contacts table > CRMV2 > Contacts', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    navigateToContactsObjScreen();
    waitSometime(longWait);
    //verify add associated entity
    addAssociatedEntityWithCustomerEntityType();
    //verify updated toast message
    toastWithMsg({ message: msg });
    waitSometime(longWait);
    //verify add associated entity record with Customer entity type
    verifyTextContains({ locator: customerAssociatedEntityTypeVal, containsText: custNameVal });
    verifyTextContains({ locator: customerAssociatedEntityVal, containsText: customerEntityType });
  });
  it('ME-152029 Can user update "Edit Associated Entity" with an Entity Type "Customer" in the contact object child window for an existing Contacts in the contacts table > CRMV2 > Contacts', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    navigateToContactsObjScreen();
    waitSometime(longWait);
    //pre requisite data to edit the existing entity
    addAssociatedEntityWithCustomerEntityType();
    //verify edit associated entity
    editAssociatedEntityWithCustomerEntityType();
    //verify updated toast message
    toastWithMsg({ message: msg });
    waitSometime(longWait);
    //verify edit associated entity record with Customer entity type
    verifyTextContains({ locator: customerAssociatedEntityFunctionsVal, containsText: functionDrpdwnVal1 });
    verifyTextContains({ locator: customerAssociatedEntityFunctionsVal, containsText: functionDrpdwnVal2 });
  });
  it('ME-151902 Can user create "Add Associated Entity" with an Entity Type "Carrier" in the contact object child window for an existing Contacts in the contacts table > CRMV2 > Contacts', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    navigateToContactsObjScreen();
    waitSometime(longWait);
    addAssociatedEntityWithCarrierEntityType();
    //verify updated toast message
    toastWithMsg({ message: msg });
    waitSometime(longWait);
    //verify add associated entity record with Carrier entity type
    verifyTextContains({ locator: customerAssociatedEntityTypeVal, containsText: carrNameVal });
    verifyTextContains({ locator: customerAssociatedEntityVal, containsText: carrierEntityType });
  });
  it('ME-152047 Can user update "Edit Associated Entity" with an Entity Type "Carrier" in the contact object child window for an existing Contacts in the contacts table > CRMV2 > Contacts', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    navigateToContactsObjScreen();
    waitSometime(longWait);
    //pre requisite data to edit the existing entity
    addAssociatedEntityWithCarrierEntityType();
    //verify edit associated entity
    editAssociatedEntityWithCarrierEntityType();
    //verify updated toast message
    toastWithMsg({ message: msg });
    waitSometime(longWait);
    //verify edit associated entity record with Carrier entity type
    verifyTextContains({ locator: customerAssociatedEntityDetailsVal, containsText: txtDetails });
  });
  it('ME-151908 Can user create "Add Associated Entity" with an Entity Type "Facility" in the contact object child window for an existing Contacts in the contacts table > CRMV2 > Contacts', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    navigateToContactsObjScreen();
    waitSometime(longWait);
    addAssociatedEntityWithFacilityEntityType();
    //verify updated toast message
    toastWithMsg({ message: msg });
    waitSometime(longWait);
    //verify add associated entity record with Facility entity type
    verifyTextContains({ locator: customerAssociatedEntityTypeVal, containsText: facNameVal });
    verifyTextContains({ locator: customerAssociatedEntityVal, containsText: facilityEntityType });
  });
  it('ME-152048 Can user update "Edit Associated Entity" with an Entity Type "Facility" in the contact object child window for an existing Contacts in the contacts table > CRMV2 > Contacts', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p1',
    ],
  },
  () => {
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    waitSometime(longWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    navigateToContactsObjScreen();
    waitSometime(longWait);
    //pre requisite data to edit the existing entity
    addAssociatedEntityWithFacilityEntityType();
    //verify edit associated entity
    editAssociatedEntityWithFacilityEntityType();
    //verify updated toast message
    toastWithMsg({ message: msg });
    waitSometime(longWait);
    //verify edit associated entity record with Facility entity type
    verifyTextContains({ locator: customerAssociatedEntityExtSystemUserVal, containsText: ExtSystemUser });
  });
});