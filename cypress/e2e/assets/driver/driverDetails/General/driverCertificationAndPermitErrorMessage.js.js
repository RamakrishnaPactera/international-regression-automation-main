/*---------------------------------------------------------------------------------------------------------------
User can validate Certifications and Permits error message
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 24-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis
Test case Included            : [ME-157767,ME-159002,ME-159001,ME-159000,ME-158999,ME-158998]
----------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let drpDwnDriverCertificationType, driverDataTDM;

describe('Driver scenarios: Validate Driver General Tab Certifications and Permits error message > Resources | Assets - Driver General Tab | Regression [ME-157767,ME-159002,ME-159001,ME-159000,ME-158999,ME-158998]', () => {
  beforeEach(() => {
    cy.log('***creating driver using TDM***');
    genericUtils.getTDMData({ dataType: addDriverData.staticData.tdmDriverData, dataCondition: addDriverData.staticData.tdmAddDriverReq, dataScenario: addDriverData.staticData.tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    genericUtils.getMinionValues(addDriverData.staticData.minionDrpDwnDriverCertificationType, 6).then(resultOptions => {
      drpDwnDriverCertificationType = resultOptions;
    });
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-157767][ME-158998][ME-1579001] Verify user can able to Validate certifications and permits with same ID > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickActionWait({ locator: driverCommonPage.tabDriverGeneral });
      //add certification and permits
      genericUtils.clickAction({ locator: addDriverPage.btnCertificateAddNew });
      genericUtils.dropDownExactClick({ element: addDriverPage.drpdwnCertficateTypeTerm, ddValue: drpDwnDriverCertificationType[2] });
      genericUtils.getPastDate({ locator: addDriverPage.txtFieldExpirationDate, Day: 1, Month: 1 });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldCertificationOrPermitId, typeText: addDriverData.expectedData.certificateAndPermitId });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      //create another record with same ID and verify error message
      genericUtils.clickAction({ locator: addDriverPage.btnCertificateAddNew });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldCertificationOrPermitId, typeText: addDriverData.expectedData.certificateAndPermitId });
      genericUtils.dropDownExactClick({ element: addDriverPage.drpdwnCertficateTypeTerm, ddValue: drpDwnDriverCertificationType[2] });
      genericUtils.getPastDate({ locator: addDriverPage.txtFieldExpirationDate, Day: 1, Month: 1 });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      resourceUtilis.verifyCertificationsAndPermitsErrorMessage();
    });
  it('[ME-159002][ME-159000][ME-158999] Verify user can able to Validate edit certifications and permits with same ID > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickActionWait({ locator: driverCommonPage.tabDriverGeneral });
      //add certification and permits
      genericUtils.clickAction({ locator: addDriverPage.btnCertificateAddNew });
      genericUtils.dropDownExactClick({ element: addDriverPage.drpdwnCertficateTypeTerm, ddValue: drpDwnDriverCertificationType[2] });
      genericUtils.getPastDate({ locator: addDriverPage.txtFieldExpirationDate, Day: 1, Month: 1 });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldCertificationOrPermitId, typeText: addDriverData.expectedData.certificateAndPermitId });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      //add certification and permits
      genericUtils.clickAction({ locator: addDriverPage.btnCertificateAddNew });
      genericUtils.dropDownExactClick({ element: addDriverPage.drpdwnCertficateTypeTerm, ddValue: drpDwnDriverCertificationType[2] });
      genericUtils.getPastDate({ locator: addDriverPage.txtFieldExpirationDate, Day: 1, Month: 1 });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldCertificationOrPermitId, typeText: addDriverData.expectedData.certificateAndPermitId });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      //edit record with same ID
      genericUtils.clickAction({ locator: driverCommonPage.btnKabobMenu });
      genericUtils.clickAction({ locator: addDriverPage.menuOptionEditInKebab });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldCertificationOrPermitId, typeText: addDriverData.expectedData.certificateAndPermitId });
      genericUtils.dropDownExactClick({ element: addDriverPage.drpdwnCertficateTypeTerm, ddValue: addDriverData.expectedData.certificationsType });
      genericUtils.getPastDate({ locator: addDriverPage.txtFieldExpirationDate, Day: 1, Month: 1 });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      //edit record with same ID and verify error message
      genericUtils.clickAction({ locator: driverCommonPage.btnKabobMenuNextRow });
      genericUtils.clickAction({ locator: addDriverPage.menuOptionEditInKebab });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldCertificationOrPermitId, typeText: addDriverData.expectedData.certificateAndPermitId });
      genericUtils.dropDownExactClick({ element: addDriverPage.drpdwnCertficateTypeTerm, ddValue: drpDwnDriverCertificationType[2] });
      genericUtils.getPastDate({ locator: addDriverPage.txtFieldExpirationDate, Day: 1, Month: 1 });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      resourceUtilis.verifyCertificationsAndPermitsErrorMessage();
    });
});