/*---------------------------------------------------------------------------------------------------------------
User can Create Awards in Driver
Test Cases List
Authored By                   : K.Santhosh
Date                          : 12-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis
Test case Included            : [ME-154716, ME-154718, ME-154720, ME-154721, ME-154724]
----------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as crmDocumentsPage from '../../../../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import * as crmNotesPage from '../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import * as crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
let drpDwnDriverAwardOption;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const awardLabelData = new Map([[addDriverPage.drpDwnDriverAwardType, addDriverData.staticData.lblType], [addDriverPage.lblAwardDescription, addDriverData.staticData.lblDescription], [addDriverPage.lblDriverAwardDate, addDriverData.staticData.lblAwardDate]]);
const { asterisk } = generalData.userDefinedData;
const { colorCodeVal } = crmIndustryData.expectedData;
describe('Driver scenarios: Create Awards in Driver > Resources | Assets - Driver General Tab | Regression [ME-154716, ME-154718, ME-154720, ME-154721, ME-154724, ME-137389]', () => {
  before(() => {
    genericUtils.getMinionValues(addDriverData.staticData.minionDrpDwnAwardType, 3).then(resultOptions => {
      drpDwnDriverAwardOption = resultOptions;
    });
  });
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-154716, ME-154718, ME-154720, ME-154721, ME-154724, ME-137389] Verify user can able to create, Edit, Delete Awards in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.clickAction({ locator: addDriverPage.tabAwards });
      genericUtils.clickAction({ locator: addDriverPage.btnAwardsPlusIcon });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.userDefinedData.awardDialogTitle });
      genericUtils.verifyContains({ locator: addDriverPage.drpDwnDriverAwardType, containsText: asterisk });
      genericUtils.verifyBorderColour({ locator: addDriverPage.txtFieldAwardDesc, colourValue: colorCodeVal });
      genericUtils.verifyBorderColour({ locator: addDriverPage.txtFieldAwardDate, colourValue: colorCodeVal });
      genericUtils.verifyLabelUsingMapArray({ map: awardLabelData });
      genericUtils.clickAction({ locator: addDriverPage.btnCloseIcon });
      resourceUtilis.addDriverAward({ drpDwnAwardType: drpDwnDriverAwardOption[0] });
      resourceUtilis.enterDriverMandatoryFieldsNAddress();
      resourceUtilis.driverSaveAction();
      genericUtils.clickAction({ locator: addDriverPage.tabAwards });
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescVal, verifyText: addDriverData.userDefinedData.awardDescription });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesEdit });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.userDefinedData.awardEditTitle });
      genericUtils.clearText({ locator: addDriverPage.txtFieldAwardDesc });
      genericUtils.typeText({ locator: addDriverPage.txtFieldAwardDesc, dataText: addDriverData.userDefinedData.txtDescriptionUpdated });
      genericUtils.clickable({ locator: addDriverPage.addEquipmentPopup.addEquipmentBtn });
      genericUtils.clickAction({ locator: addDriverPage.addEquipmentPopup.addEquipmentBtn });
      resourceUtilis.driverSaveAction();
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescVal, verifyText: addDriverData.userDefinedData.txtDescriptionUpdated });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
      genericUtils.clickAction({ locator: crmDocumentsPage.btnDocumentsDelete });
      genericUtils.clickOkOnWindowAlertConfirm();
      genericUtils.verifyDoesNotExist({ element: crmNotesPage.btnNotesKabob });
    });
});