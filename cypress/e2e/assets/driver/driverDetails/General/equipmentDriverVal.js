/*---------------------------------------------------------------------------------------------------------------
User can Create Equipment in Driver
Test Cases List
Authored By                   : K.Santhosh
Date                          : 11-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis
Test case Included            : [ME-154402, ME-154404, ME-154407, ME-154409, ME-154410]
----------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as crmDocumentsPage from '../../../../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import * as crmNotesPage from '../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
let equipmentTypeDrpDwn, equipmentConditionDrpDwn;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const dateObjToday = genericUtils.getDateWithTargetDay({ targetDate: 0 });
const currentDate = dateObjToday.mm + '/' + dateObjToday.dd + '/' + dateObjToday.yy;
describe('Driver scenarios: Create Equipment in Driver > Resources | Assets - Driver General Tab | Regression [ME-154402, ME-154404, ME-154407, ME-154409, ME-154410]', () => {
  before(() => {
    genericUtils.getMinionValues('driverGeneralEquipmentType', 1).then(typeValue => {
      equipmentTypeDrpDwn = typeValue[0];
    });
    genericUtils.getMinionValues('driverGeneralEquipmentCondition', 1).then(conditionVal => {
      equipmentConditionDrpDwn = conditionVal[0];
    });
  });
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-154402, ME-154404, ME-154407, ME-154409, ME-154410] Verify user can able to create, Edit, Delete Equipment in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.lblEquipmentTitle, verifyText: addDriverData.userDefinedData.equipmentTitle });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.userDefinedData.equipmentDialogTitle });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      resourceUtilis.enterDriverMandatoryFieldsNAddress();
      resourceUtilis.driverSaveAction();
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescVal, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesEdit });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.userDefinedData.equipmentEditTitle });
      genericUtils.clearText({ locator: addDriverPage.addEquipmentPopup.descriptionTxtBx });
      genericUtils.typeText({ locator: addDriverPage.addEquipmentPopup.descriptionTxtBx, dataText: addDriverData.userDefinedData.txtDescriptionUpdated });
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