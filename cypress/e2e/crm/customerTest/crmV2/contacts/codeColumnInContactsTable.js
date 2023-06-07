/*---------------------------------------------------------------------------------------------------------------
Verify Code Column of Contacts Table from Customer > CRMV2 > Contacts Tab and from Carrier > CRMV2 > Contacts Tab
Test Cases List               : ME-141899,ME-141901,ME-142093,ME-142106,ME-142157,ME-142114,ME-142114,ME-142164,ME-142176,ME-142183,ME-142188
Authored By                   : Mamatha Polapalli
Date                          : 13-04-2023
Functions/Calling References  : contactPage,customerUtils
User Story Included            : ME-139903 - Contact Table - 'Code' column
---------------------------------------------------------------------------------------------------------------------------*/

import * as loginUtils from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as customerUtils from '../../../../../utilities/customerUtils/customerUtils';
import * as portFolioUtils from '../../../../../utilities/crmUtils/portFolioUtils';
import * as carrierUtils from '../../../../../utilities/carrierUtils/carrierUtils';
import * as contactPage from '../../../../../pageObjects/crm/contactPage/contactPage.json';
import * as commonData from '../../../../../testData/staticData/commonData/commonData.json';
import * as crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import * as crmContactsData from '../../../../../testData/crm/crmData/crmContactsData.json';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, contactDepName, randomContactName, carrierNameVal, str;

describe('User Verifies Code Column in Default, Expand View of Contacts Table from Customer & Carrier > CRMV2 > Contacts Tab [ME-139903]', () => {
  beforeEach(() => {
    genericUtils.getTDMData({ dataType: crmIndustryData.staticData.tdmCustomerData, dataCondition: crmIndustryData.staticData.tdmAddCustomerReq, dataScenario: crmIndustryData.staticData.tdmCustomerScenario });
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
  });
  it('[ME-141899,ME-142093,ME-142157,ME-142164,ME-142183] - Verify Code Column in Default, Expand View of Contacts Table from Customer && Carrier > CRMV2 > Contacts Tab | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerContacts',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      cy.log('***Validations in Customer CRMV2 Tab***');
      customerUtils.searchCustomer({ customerName: customerNameVal.customerName });
      portFolioUtils.navigateToCustomerCrmV2Tab();
      randomContactName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
      customerUtils.addContact({ contactName: contactDepName, randomName: randomContactName });
      genericUtils.verifyDoesNotExist({ element: contactPage.colHeaderCode });
      genericUtils.waitSometime(commonData.shortWait);
      customerUtils.customizeContactCodeColumn();
      genericUtils.verifyExists({ element: contactPage.colHeaderCode });
      genericUtils.resizeElement({ element: contactPage.colHeaderCode });
      str = randomContactName.toUpperCase();
      str = str.slice(0, -3);
      customerUtils.selectContactsFilter(crmContactsData.staticData.codeColumnFilter, str);
      customerUtils.selectContactsFilter(crmContactsData.staticData.codeColumnFilter, randomContactName);
      customerUtils.hoverOverCodeColumn();
      customerUtils.contactsClickExpand();
      customerUtils.customizeContactCodeColumn();
      genericUtils.resizeElement({ element: contactPage.colHeaderCode });
      customerUtils.selectContactsFilter(crmContactsData.staticData.codeColumnFilter, str);
      customerUtils.hoverOverCodeColumn();
    });
  it('ME-141901,ME-142106,ME-142114,ME-142176,ME-142188] - Verify Code Column in Default, Expand View of Contacts Table from Customer && Carrier > CRMV2 > Contacts Tab | Customer Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierContacts',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      cy.log('***Validations in Carrier CRMV2 Tab***');
      carrierUtils.searchCarrier({ carrierName: carrierNameVal.carrierName });
      portFolioUtils.navigateToCarrierCrmV2Tab();
      randomContactName = crmContactsData.userDefinedData.prefixTxt + genericUtils.generateRandomNumber();
      customerUtils.addContact({ contactName: contactDepName, randomName: randomContactName });
      genericUtils.verifyDoesNotExist({ element: contactPage.colHeaderCode });
      genericUtils.waitSometime(commonData.shortWait);
      customerUtils.customizeContactCodeColumn();
      genericUtils.verifyExists({ element: contactPage.colHeaderCode });
      genericUtils.resizeElement({ element: contactPage.colHeaderCode });
      str = randomContactName.toUpperCase();
      str = str.slice(0, -3);
      customerUtils.selectContactsFilter(crmContactsData.staticData.codeColumnFilter, str);
      customerUtils.selectContactsFilter(crmContactsData.staticData.codeColumnFilter, randomContactName);
      customerUtils.hoverOverCodeColumn();
      customerUtils.contactsClickExpand();
      customerUtils.customizeContactCodeColumn();
      genericUtils.resizeElement({ element: contactPage.colHeaderCode });
      customerUtils.selectContactsFilter(crmContactsData.staticData.codeColumnFilter, str);
      customerUtils.selectContactsFilter(crmContactsData.staticData.codeColumnFilter, randomContactName);
      customerUtils.hoverOverCodeColumn();
    });
});