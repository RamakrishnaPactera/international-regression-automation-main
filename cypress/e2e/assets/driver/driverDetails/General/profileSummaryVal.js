/*---------------------------------------------------------------------------------------------------------------
User can Create and Update Profile Summary in Driver
Test Cases List
Authored By                   : K.Santhosh
Date                          : 18-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis
Test case Included            : [ME-156556, ME-156557, ME-156558, ME-156559, ME-156560]
----------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as commonData from '../../../../../testData/staticData/commonData/commonData.json';
import * as generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as crmNotesPage from '../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as crmDocumentsPage from '../../../../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import * as crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
let equipmentTypeDrpDwn, equipmentConditionDrpDwn;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const awardLabelData = new Map([[addDriverPage.drpDwnDriverAwardType, addDriverData.staticData.lblType], [addDriverPage.lblAwardDescription, addDriverData.staticData.lblDescription], [addDriverPage.lblDriverAwardDate, addDriverData.staticData.lblAwardDate]]);
const dateObjToday = genericUtils.getDateWithTargetDay({ targetDate: 0 });
const currentDate = dateObjToday.mm + '/' + dateObjToday.dd + '/' + dateObjToday.yy;
const { asterisk } = generalData.userDefinedData;
const { colorCodeVal } = crmIndustryData.expectedData;
let drpDwnDriverAwardOption;
describe('Driver scenarios: create and Update Profile Summary in Driver > Resources | Assets - Driver General Tab | Regression [ME-156556, ME-156557, ME-156558, ME-156559, ME-156560]', () => {
  before(() => {
    genericUtils.getMinionValues(addDriverData.staticData.minionDrpDwnAwardType, 3).then(resultOptions => {
      drpDwnDriverAwardOption = resultOptions;
    });
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
  it('[ME-156556, ME-156557, ME-156558, ME-156559, ME-156560] Verify user can able to create and Update Profile Summary in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
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
      resourceUtilis.addDriverWithContact();
      resourceUtilis.driverSaveAction();
      genericUtils.toastWithMsg({ message: addDriverData.expectedData.msgUpdated });
      resourceUtilis.editDriverWithContactAndVal();
      genericUtils.clickAction({ locator: addDriverPage.btnKabobMenu });
      genericUtils.waitSometime(commonData.shortWait);
      genericUtils.clickAction({ locator: addDriverPage.deleteButtonNew });
      genericUtils.clickOkOnWindowAlert();
      resourceUtilis.driverSaveAction();
      genericUtils.toastWithMsg({ message: addDriverData.expectedData.msgUpdated });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      resourceUtilis.driverSaveAction();
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescVal, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesEdit });
      genericUtils.clearText({ locator: addDriverPage.addEquipmentPopup.descriptionTxtBx });
      genericUtils.typeText({ locator: addDriverPage.addEquipmentPopup.descriptionTxtBx, dataText: addDriverData.userDefinedData.txtDescriptionUpdated });
      genericUtils.clickable({ locator: addDriverPage.addEquipmentPopup.addEquipmentBtn });
      genericUtils.clickAction({ locator: addDriverPage.addEquipmentPopup.addEquipmentBtn });
      resourceUtilis.driverSaveAction();
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescVal, verifyText: addDriverData.userDefinedData.txtDescriptionUpdated });
    });
});