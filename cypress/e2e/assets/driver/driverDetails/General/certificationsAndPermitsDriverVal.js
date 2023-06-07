/*---------------------------------------------------------------------------------------------------------------
User can Create Certifications & Permits  in Driver
Test Cases List
Authored By                   : K.Santhosh
Date                          : 15-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis, dateTimeUtils
Test case Included            : [ME-155126, ME-155128, ME-155129, ME-155130, ME-155131, ME-137394, ME-152758]
----------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as crmDocumentsPage from '../../../../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import * as crmNotesPage from '../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as dateTimeUtils from '../../../../../utilities/commonUtils/dateTimeUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
let drpDwnDriverCertificationType;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
describe('Driver scenarios: Create Certifications & Permits  in Driver > Resources | Assets - Driver General Tab | Regression [ME-155126, ME-155128, ME-155129, ME-155130, ME-155131, ME-137394,ME-152758]', () => {
  before(() => {
    genericUtils.getMinionValues(addDriverData.staticData.minionDrpDwnDriverCertificationType, 6).then(resultOptions => {
      drpDwnDriverCertificationType = resultOptions;
    });
  });
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-155126, ME-155128, ME-155129, ME-155130, ME-155131, ME-137394] Verify user can able to create, Edit, Delete Certifications & Permits  in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      const idData = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 25 });
      const futureDate = dateTimeUtils.todayDatePlusTwo();
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.enterDriverMandatoryFieldsNAddress();
      genericUtils.clickActionWait({ locator: addDriverPage.btnCertificateAddNew });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.staticData.txtHeaderAddNewCertificationOrPermit });
      genericUtils.verifyElementTextContains({ locator: addDriverPage.certificationOrPermit.labelCertificationType, verifyText: addDriverData.expectedData.labelCertificationFields[0] });
      genericUtils.verifyElementTextContains({ locator: addDriverPage.certificationOrPermit.labelCertificationID, verifyText: addDriverData.expectedData.labelCertificationFields[1] });
      genericUtils.verifyElementTextContains({ locator: addDriverPage.certificationOrPermit.labelCertificationST, verifyText: addDriverData.expectedData.labelCertificationFields[2] });
      genericUtils.verifyElementTextContains({ locator: addDriverPage.certificationOrPermit.labelCertificationCountry, verifyText: addDriverData.expectedData.labelCertificationFields[3] });
      genericUtils.verifyElementTextContains({ locator: addDriverPage.certificationOrPermit.labelCertificationExpirationDate, verifyText: addDriverData.expectedData.labelCertificationFields[4] });
      genericUtils.verifyExists({ element: `${addDriverPage.certificationOrPermit.labelCertificationType}${addDriverPage.asteriskEle}` });
      genericUtils.verifyExists({ element: `${addDriverPage.certificationOrPermit.labelCertificationID}${addDriverPage.asteriskEle}` });
      genericUtils.verifyExists({ element: `${addDriverPage.certificationOrPermit.labelCertificationExpirationDate}${addDriverPage.asteriskEle}` });
      genericUtils.selectItemFromButtonTypeDropDown({ locator: addDriverPage.drpdwnCertficateTypeTerm, dropdownVal: drpDwnDriverCertificationType[0] });
      genericUtils.typeText({ locator: addDriverPage.txtFieldExpirationDate, dataText: futureDate });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldCertificationOrPermitId, typeText: idData });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      resourceUtilis.driverSaveAction();
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescVal, verifyText: idData });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesEdit });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.staticData.txtHeaderEditCertificationOrPermit });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldCertificationOrPermitId, typeText: addDriverData.expectedData.msgUpdated });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      resourceUtilis.driverSaveAction();
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescVal, verifyText: addDriverData.expectedData.msgUpdated });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
      genericUtils.clickAction({ locator: crmDocumentsPage.btnDocumentsDelete });
      genericUtils.clickOkOnWindowAlertConfirm();
      genericUtils.verifyDoesNotExist({ element: crmNotesPage.btnNotesKabob });
    });
  it('ME-152758 : Test [FE] Driver Asset Record - Remove validation for Expiration Date in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p2'],
    },
    () => {
      const idData = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 25 });
      const futureDate = dateTimeUtils.todayDatePlusTwo();
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.clickActionWait({ locator: addDriverPage.btnCertificateAddNew });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.staticData.txtHeaderAddNewCertificationOrPermit });
      genericUtils.selectItemFromButtonTypeDropDown({ locator: addDriverPage.drpdwnCertficateTypeTerm, dropdownVal: drpDwnDriverCertificationType[0] });
      genericUtils.typeText({ locator: addDriverPage.txtFieldExpirationDate, dataText: futureDate });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldCertificationOrPermitId, typeText: idData });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      genericUtils.verifyToNotExist({ element: addDriverPage.certificationOrPermit.expirationMsg });
      genericUtils.verifyToExist({ element: addDriverPage.certificationOrPermit.saveChangesMsg });
    });
});