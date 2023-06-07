import * as genericUtils from '../commonUtils/genericUtils';
import * as crmFirmographicsPage from '../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import commonData from '../../testData/staticData/commonData/commonData.json';
import * as contactPage from '../../pageObjects/crm/contactPage/contactPage.json';
import contactData from '../../testData/crm/crmData/crmContactsData.json';
const { shortWait } = commonData;
//Add Contact
export const addContact = ({ contactName: contactDepName, randomName: randomContactName }) => {
  genericUtils.clickAction({ locator: crmFirmographicsPage.tabCrmV2 });
  genericUtils.clickAction({ locator: crmFirmographicsPage.btnContact });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.clickAction({ locator: crmFirmographicsPage.btnSaveContact });
};
export const addNewContact = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.waitSometime(shortWait);
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.waitSometime(shortWait);
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: newContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: contactData.userDefinedData.title });
  genericUtils.clickAction({ locator: crmFirmographicsPage.btnSaveContact });
};

export const editNewContact = () => {
  genericUtils.verifyToExist({ element: contactPage.btnEditContacts });
  genericUtils.navigateToChildWindow();
  genericUtils.clickFirstElementIn({ locator: contactPage.btnEditContacts });
  genericUtils.clickFirstElementIn({ locator: contactPage.btnEditContextMenu });
  genericUtils.waitSometime(shortWait);
};

export const editPersonalInformation = () => {
  genericUtils.verifyToExist({ element: contactPage.btnPersonalInformationTab });
  genericUtils.navigateToChildWindow();
  genericUtils.clickFirstElementIn({ locator: contactPage.btnEditPersonalinformation });
  genericUtils.waitSometime(shortWait);
};

export const editPersonalInformationWithInteretsAndHobbies = (interestAndHobbies) => {
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnPersonalInformationTab });
  genericUtils.clickAction({ locator: contactPage.editButton });
  genericUtils.typeText({ locator: contactPage.txtFieldIntrestAndHobbies, dataText: interestAndHobbies });
  genericUtils.clickAction({ locator: contactPage.btnSavePersonalInfo });
};

export const editNewContactWithName = (contacName) => {
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.tabName });
  genericUtils.clickAction({ locator: contactPage.btnEditContactsField });
  genericUtils.clearAndTypeWithWait({ element: contactPage.txtContactsName, typeText: contacName });
  genericUtils.clickAction({ locator: contactPage.btnSaveContacts });
  genericUtils.verifyToExist({ element: contactPage.lblContactName });
};
export const addDupContactSaveAndClose = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
};
export const addExistContact = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: existContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: existContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: contactData.userDefinedData.title });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAndContinueContact });
  genericUtils.waitSometime(shortWait);
};

export const addDupContactSaveAndContinue = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: newContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: contactData.userDefinedData.title });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAndContinueContact });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyToExist({ element: contactPage.lblDuplicateContactName });
};
export const associateContactExtSaveAndContinue = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: newContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: contactData.userDefinedData.title });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAndContinueContact });
  genericUtils.waitSometime(shortWait);
  genericUtils.navigateToChildWindow();
  genericUtils.clickVisibleElement({ locator: contactPage.btnAssociatedContact });
  genericUtils.waitSometime(shortWait);
};