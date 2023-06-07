//---------------------------------------------------------------------------------------------------------------
//List to all Data to create Bussiness Info title for Contact With SaveAndClose below Minion terms//
//Test Cases List
//Authored By                   : Murali
//Date                          : 05-05-2023
//Functions/Calling References  : contactPage,commonData,crmIndustryData,crmContactsData,utilities
//Test cases Included           : ME-146617 Verify the save "Edit Business Information" modal with all the fields in the contact object screen for Add | Edit Contacts > CRMV2 > Customer | Carrier
//---------------------------------------------------------------------------------------------------------------

import {
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  viewFullPage,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
import {
  addNewContact,
  navigateToTheCrmV2Tab,
  editContactBusinessInfoTab,
  editContactBusinessInfoAllFieldsAndSave,
  verifyBusinessInformationAllFieldsSaved,
} from '../../../../../utilities/carrierUtils/carrierUtils';
import { verifyMailId } from '../../../../../utilities/crmUtils/crmUtils';
const { shortWait, longWait } = commonData;
const {
  email,
  phoneNo,
  prefixTxt,
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmContactsData.staticData;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let contactDepName, randomContactName, randomPhNo, newContactTabEmailVal, newContactTabPhoneVal;

describe('Can I create New Contact in the contacts Tab > Customer > CRMV2 > Contacts Tab > Contact', () => {
  beforeEach(() => {
    getMinionValues('contactDepartment', 1).then((contactDepartment) => {
      contactDepName = contactDepartment[0];
    });

    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    randomContactName = prefixTxt + generateRandomNumber();
    randomPhNo = phoneNo + generateRandomNumber();
    cy.log(randomPhNo);
    newContactTabPhoneVal = ({ textType: randomPhNo });
    cy.log(newContactTabPhoneVal);
    newContactTabEmailVal = verifyMailId({ textType: email });
    cy.log(newContactTabEmailVal);
  });

  it('ME-146617 Verify the save "Edit Business Information" modal with all the fields in the contact object screen for Add | Edit Contacts > CRMV2 > Customer | Carrier', {
    tags: [
      '@Carrier',
      '@crmv2',
      '@carrierContacts',
      '@p1',
      '@phase1',
    ],
  },
  () => {
    navigateToTheCrmV2Tab({ typeTextVal: tdmCarrierData });
    cy.log('***Create Add New Contact in Customer***');
    waitSometime(shortWait);
    addNewContact({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('*** Editing Contact Created and Moving towards Business Information Tab ***');
    editContactBusinessInfoTab({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    //toastMsg();
    waitSometime(longWait);
    cy.log('*** Add values to all the fields  at Business Information Tab  and Save ***');
    editContactBusinessInfoAllFieldsAndSave({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
    cy.log('*** Verified all the fields at Business Information Tab and also at Contact grid columns value ***');
    verifyBusinessInformationAllFieldsSaved({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
  });
});