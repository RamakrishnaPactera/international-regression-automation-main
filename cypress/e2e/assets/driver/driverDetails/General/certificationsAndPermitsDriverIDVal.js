/*---------------------------------------------------------------------------------------------------------------
User can Validate Certifications & Permits ID in Driver
Test Cases List
Authored By                   : K.Santhosh
Date                          : 29-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis, dateTimeUtils
Test case Included            : [ME-157885, ME-157886, ME-157887]
----------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as homePage from '../../../../../pageObjects/homePage/homePage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as dateTimeUtils from '../../../../../utilities/commonUtils/dateTimeUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
let drpDwnDriverCertificationType;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
describe('Driver scenarios: Validate Certifications & Permits ID in Driver > Resources | Assets - Driver General Tab | Regression [ME-157885, ME-157886, ME-157887]', () => {
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
  it('[ME-157885, ME-157886, ME-157887] Verify User can Validate Certifications & Permits ID in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      const idData = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 25 });
      const futureDate = dateTimeUtils.todayDatePlusTwo();
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.clickActionWait({ locator: addDriverPage.btnCertificateAddNew });
      genericUtils.selectItemFromButtonTypeDropDown({ locator: addDriverPage.drpdwnCertficateTypeTerm, dropdownVal: drpDwnDriverCertificationType[0] });
      genericUtils.typeText({ locator: addDriverPage.txtFieldExpirationDate, dataText: futureDate });
      genericUtils.typeText({ locator: addDriverPage.txtFieldCertificationOrPermitId, dataText: idData });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      genericUtils.clickActionWait({ locator: addDriverPage.btnCertificateAddNew });
      genericUtils.selectItemFromButtonTypeDropDown({ locator: addDriverPage.drpdwnCertficateTypeTerm, dropdownVal: drpDwnDriverCertificationType[0] });
      genericUtils.typeText({ locator: addDriverPage.txtFieldExpirationDate, dataText: futureDate });
      genericUtils.typeText({ locator: addDriverPage.txtFieldCertificationOrPermitId, dataText: idData });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      genericUtils.verifyText({ locator: addDriverPage.certificationOrPermit.msgDuplicateID, verifyText: addDriverData.staticData.msgCandPIdError });
      genericUtils.verifyIfDisabled({ locator: homePage.btnDriverSave });
      const idDataNew = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 25 });
      const futureDateNew = dateTimeUtils.todayDatePlusTwo();
      genericUtils.clickActionWait({ locator: addDriverPage.btnCertificateAddNew });
      genericUtils.selectItemFromButtonTypeDropDown({ locator: addDriverPage.drpdwnCertficateTypeTerm, dropdownVal: drpDwnDriverCertificationType[0] });
      genericUtils.typeText({ locator: addDriverPage.txtFieldExpirationDate, dataText: futureDateNew });
      genericUtils.typeText({ locator: addDriverPage.txtFieldCertificationOrPermitId, dataText: idDataNew });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      resourceUtilis.enterDriverMandatoryFieldsNAddress();
      resourceUtilis.driverSaveAction();
    });
});