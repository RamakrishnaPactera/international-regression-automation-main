/*---------------------------------------------------------------------------------------------------------------
Verify Verify Add Responsibility of contact object screen of contact table
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 27-04-2023
Functions/Calling References  : contactPage,commonData,crmContactsData,utilities
Test cases Included           : [ME-146703] Verify Add Responsibility of contact object screen of contact table> CRMV2 > Contacts > Customer | Carrier
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
let customerNameVal, contactDepName, randomContactName, carrierNameVal, randomPhNo, newContactTabEmailVal, businessUnitVal, divisionValue, modeValue, sizeValue, equipmentValue;

describe('User Verifies Add Responsibility in Contacts Object Screen from Customer & Carrier > CRMV2 > Contacts Tab [ME-146703]', () => {
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
    genericUtils.getMinionValues('businessUnit', 1).then((contactsBusinessUnit) => {
      businessUnitVal = contactsBusinessUnit[0];
    });
    genericUtils.getMinionValues('division', 1).then((contactsDivision) => {
      divisionValue = contactsDivision[0];
    });
    genericUtils.getMinionValues('transportMode', 1).then((contactsMode) => {
      modeValue = contactsMode[0];
    });
    genericUtils.getMinionValues('loadSize', 1).then((contactsLoadSize) => {
      sizeValue = contactsLoadSize[0];
    });
    genericUtils.getMinionValues('trailerType', 1).then((contactsEquipment) => {
      equipmentValue = contactsEquipment[0];
    });
    loginUtils.loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
    randomContactName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
    randomPhNo = crmContactsData.userDefinedData.phoneNo + genericUtils.generateRandomNumber();
    newContactTabEmailVal = crmUtils.verifyMailId({ textType: crmContactsData.userDefinedData.email });
  });
  it('[ME-146703] - Verify Add Responsibility in contact object screen of Contacts Table from Customer & Carrier > CRMV2 > Contacts Tab | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@carrier',
        '@crm',
        '@customerContacts',
        '@carrierContacts',
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
      //Adding responsibility in contact object screen
      customerUtils.addResponsibility(divisionValue, businessUnitVal, modeValue, sizeValue, equipmentValue);
      customerUtils.customizeResponsibility();
      //verify responsibility with created by
      customerUtils.verifyResponsibility();
      cy.go('back');
      randomContactName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
      customerUtils.addContact({ contactName: contactDepName, randomName: randomContactName });
      //Adding responsibility through existing contact record
      customerUtils.contactsKabobMenu();
      customerUtils.addResponsibility(divisionValue, businessUnitVal, modeValue, sizeValue, equipmentValue);
      customerUtils.verifyResponsibility();
      cy.go('back');
      cy.log('***Validations in Carrier CRMV2 Tab***');
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.navigateToCarrierCrmV2Tab();
      //Adding contact with save and continue to record option
      randomContactName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
      randomPhNo = crmContactsData.userDefinedData.phoneNo + genericUtils.generateRandomNumber();
      newContactTabEmailVal = crmUtils.verifyMailId({ textType: crmContactsData.userDefinedData.email });
      customerUtils.contactSaveAndContinue({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal });
      genericUtils.waitSometime(commonData.longWait);
      //Adding responsibility in contact object screen
      customerUtils.addResponsibility(divisionValue, businessUnitVal, modeValue, sizeValue, equipmentValue);
      customerUtils.verifyResponsibility();
      cy.go('back');
      randomContactName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
      customerUtils.addContact({ contactName: contactDepName, randomName: randomContactName });
      //Adding responsibility through existing contact record
      customerUtils.contactsKabobMenu();
      customerUtils.addResponsibility(divisionValue, businessUnitVal, modeValue, sizeValue, equipmentValue);
      //verify responsibility with created by
      customerUtils.verifyResponsibility();
    });
});