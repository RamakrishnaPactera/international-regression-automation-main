/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Verify Gray out Project and Program fields within Organizational Details in Add New driver and Search Driver under General Tab in Driver//
 Test Cases List
 Authored By : Hima Bindu Pulukurthi
 Date : 29-04-2023,
 Functions/Calling References : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included : Verify user can add Interest and hobbies in Driver > Personal Information tab
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  addNewContact,
  editNewContact,
  editPersonalInformationWithInteretsAndHobbies,
  associateContactExtSaveAndContinue,
} from '../../../../../utilities/contactUtils/contactUtils';
import {
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  previousTab,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  navigateToTheCrmV2Tab,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import {
  navigateToTheCrmV2TabCustomer,
} from '../../../../../utilities/customerUtils/customerUtils';
import { verifyMailId } from '../../../../../utilities/crmUtils/crmUtils';
const { longWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
  hobbiesVal,
} = crmContactsData.userDefinedData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
  tdmCustomerData,
  tdmAddCustomerReq,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
let carrierNameVal, contactDepName, randomPhNo, newContactTabEmailVal, randomContactName, customerNameVal;
describe('Can I Validate Duplicate Contact(s) UI validations in the contacts Tab > Carrier > CRMV2 > Contacts Tab > Duplicate Contacts [ME-146634][ME-151474][ME-151472][ME-151473]', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => { contactDepName = contactDepartment[0]; });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
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
    newContactTabEmailVal = verifyMailId({ textType: email });
  });

  it('ME-151473 Can user edit new contact, Save and close with an Associate contact(carrier) in the contacts Tab> CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p3',
    ],
  },
  () => {
    //carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    editNewContact(randomContactName);
    editPersonalInformationWithInteretsAndHobbies(hobbiesVal);
    previousTab();
  });

  it('ME-ME-151474 Can User edit new contact, Save and close with an Associate contact(customer) in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
  //Customer
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    waitSometime(longWait);
    editNewContact(randomContactName);
    editPersonalInformationWithInteretsAndHobbies(hobbiesVal);
    previousTab();
  });
  it('ME-146634 Can User edit new contact, Save and Create with an Associate contact(customer) in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    //Customer
    navigateToTheCrmV2TabCustomer({ customerName: customerNameVal.customerName });
    associateContactExtSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    editPersonalInformationWithInteretsAndHobbies(hobbiesVal);
  });
  it('ME-151472 Can User edit new contact, Save and Create with an Associate contact(carrier) in the contacts Tab > CRMV2 > Contacts | Carrier Regression | Sprint Regression', {
    tags: [
      '@carrier',
      '@crm',
      '@carrierContacts',
      '@p1',
    ],
  },
  () => {
    //Carrier
    navigateToTheCrmV2Tab({ carrierName: carrierNameVal.carrierName });
    associateContactExtSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    editPersonalInformationWithInteretsAndHobbies(hobbiesVal);
  });
});