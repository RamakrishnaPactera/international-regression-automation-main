/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Add and edit Power Identifiers details in general tab//
 Test Cases List
 Authored By                   : Sainath
 Date                          : 30-05-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils, resourceUtilis
 Test case Included            : [ME-159582 , ME-159619, ME-159593, ME-159594, ME-159595, ME-159621, ME-159627, ME-159847, ME-159854,ME-138057, ME-159622,ME-160078,ME-160164,ME-160167,ME-160171,ME-160201,ME-160204,ME-160213,ME-160216,ME-160615,ME-160617,ME-160621,ME-160623,ME-160632]
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as resourceUtilis from '../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addPowerPage from '../../../pageObjects/assets/power/addPower/addPowerPage.json';
import * as dateTimeUtils from '../../../utilities/commonUtils/dateTimeUtils';
import commonData from '../../../testData/staticData/commonData/commonData.json';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const { shortWait } = commonData;
const identifierID = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 8 });
const todayDate = dateTimeUtils.returntodayDateMMDDYY();
const futureDate = dateTimeUtils.returnfutureDateMMDDYY({ dayCount: 1, monthCount: 1 });
let drpDwnPowerIdentifierType, drpDwnPowerIdentifierType1;
describe('Add and edit Power Identifiers details in general tab [ME-159582 , ME-159619, ME-159593, ME-159594, ME-159595, ME-159621, ME-159627, ME-159847, ME-159854,ME-138057,ME-159622,ME-160078,ME-160164,ME-160167,ME-160171,ME-160201,ME-160204,ME-160213,ME-160216,ME-160615,ME-160617,ME-160621,ME-160623,ME-160632,ME-138776,ME-138778,ME-138780,ME-138783,ME-138784,ME-138786, ME-138788]', () => {
  before(() => {
    genericUtils.getMinionValues(powerData.staticDataPower.minionPowerIdentifierType, 2).then((resultOptions) => {
      drpDwnPowerIdentifierType = resultOptions[0];
      drpDwnPowerIdentifierType1 = resultOptions[1];
    });
  });
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('[ME-159582] [ME-159619] : Verify whether the Power Identifier fields are functionally enabled  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.verifyIndentifierFieldsEnabled();
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
    });
  it('ME-159593 : Verify Add New Identifier pop-up should open after click on Add icon  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      genericUtils.verifyText({ locator: addPowerPage.identifiers.addPopupTitle, verifyText: 'Add New Identifiers' });
    });
  it('ME-159594 : Verify that the Edit Identifier pop-up fields are to be appeared  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.clickAction({ locator: addPowerPage.identifiers.menuBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.editBtn });
      resourceUtilis.verifyAddEditPopupFields();
    });
  it('ME-159595 : Verify the Identifiers type dropdown field values  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.typeDrpDwnBtn });
      powerData.staticDataPower.identifiersTypeDrpDwnValues.forEach((value, index) => {
        cy.get(addPowerPage.identifiers.typeDrpDwnVals).eq(index).should('have.text', value);
      });
    });
  it('ME-159621,ME-138783 : Verify the values of country dropdown field from minion portal  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.stateBtnElem });
      powerData.staticDataPower.identifiersCountryDrpDwnValues.forEach((value, index) => {
        cy.get(addPowerPage.identifiers.stateDrpDwnValues).eq(index).should('have.text', value);
      });
    });
  it('ME-159627 : Verify that If I select "License Number" in the "Type" field  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      genericUtils.typeDrpDwnWithMachtingText({ locator: addPowerPage.identifiers.typeDrpDwn, drpDwnVal: powerData.staticDataPower.licensePlateType });
      resourceUtilis.verifyTypeLicenseMandatoryFields();
    });
  it('ME-159847, ME-138786 : Verify that If I select "Serial Number/ Asset ID" in the "Type" field ID should be mandatory  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      genericUtils.typeDrpDwnWithMachtingText({ locator: addPowerPage.identifiers.typeDrpDwn, drpDwnVal: powerData.staticDataPower.serialNumberType });
      genericUtils.verifyExists({ element: addPowerPage.identifiers.idAsterisk });
    });
  it('ME-159854 : Verify after enter mandatory fields Add Identifier button should be enabled  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      genericUtils.verifyIfEnabled({ locator: addPowerPage.identifiers.addIdentifiersBtn });
    });
  it('ME-138057 :FE - Power Unit Identifiers - Regression Test Case Preparation and Execution',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(drpDwnPowerIdentifierType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.waitSometime(shortWait);
      genericUtils.clickAction({ locator: addPowerPage.identifiers.menuBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.editBtn });
      genericUtils.typeDrpDwnWithMachtingText({ locator: addPowerPage.identifiers.typeDrpDwn, drpDwnVal: drpDwnPowerIdentifierType1 });
      const identifierEditId = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 8 });
      genericUtils.typeText({ locator: addPowerPage.identifiers.idTxtBx, dataText: identifierEditId });
      genericUtils.waitSometime(shortWait);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.verifyTextContains({ locator: addPowerPage.identifiers.identifierRowData, containsText: drpDwnPowerIdentifierType1 });
      genericUtils.verifyTextContains({ locator: addPowerPage.identifiers.identifierRowData, containsText: identifierEditId });
    });
  it('ME-159622, ME-138784 : Verify that when user clicks on the "Expiration" field can see calander  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.expirationDateTxtBx });
      genericUtils.verifyExists({ element: addPowerPage.identifiers.expirationDateCalender });
    });
  it('ME-160078, ME-138778 : Verify Identifier "ID" field value length and acceptance criteria > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      genericUtils.verifyAttrText({ locator: addPowerPage.identifiers.idTxtBx, attribute: powerData.staticDataPower.maxLengthAttr, verifyText: powerData.staticDataPower.maxLength60 });
      genericUtils.typeText({ locator: addPowerPage.identifiers.idTxtBx, dataText: identifierID });
      genericUtils.validateText({ locator: addPowerPage.identifiers.idTxtBx, verifyText: identifierID });
    });
  it('ME-160164 : Verify that when User should not allow to enter the previous entered ID > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.verifyText({ locator: addPowerPage.identifiers.identifiersMustUniqueMsg, verifyText: powerData.staticDataPower.uniqueIdentifierMsg });
    });
  it('[ME-160167,ME-161693,ME-138780] : Verify user can able to enter identifiers details successfully save and Power Unit Identifiers - UAT Test Case User able to add power identifier and Verify user can able to enter identifiers details successfully and save. > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      resourceUtilis.verifyIdentifierSavedValues(powerData.staticDataPower.licensePlateType, identifierID, powerData.staticDataPower.newYorkState, powerData.staticDataPower.unitedStates, todayDate);
    });
  it('ME-160171 : Verify user should not be able to click Add Identifiers button if fields are empty > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      genericUtils.verifyToDisabled({ element: addPowerPage.identifiers.addIdentifiersBtn });
    });
  it('ME-160201, ME-138788 : Verify user can see edit and delete button after clicking on three dots > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.clickAction({ locator: addPowerPage.identifiers.menuBtn });
      genericUtils.verifyExists({ element: addPowerPage.identifiers.editBtn });
      genericUtils.verifyExists({ element: addPowerPage.identifiers.deleteBtn });
    });
  it('ME-160204 : Verify that when user click on the "Edit" option user can see edit popup > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.clickAction({ locator: addPowerPage.identifiers.menuBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.editBtn });
      genericUtils.verifyText({ locator: addPowerPage.identifiers.addPopupTitle, verifyText: 'Edit Identifiers' });
    });
  it('[ME-160213,ME-161712] : Verify user can able to edit identifier and can see updated values and Power Unit Identifiers - UAT Test Case edit power identifiers > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      const identifierIDVal = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 8 });
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.clickAction({ locator: addPowerPage.identifiers.menuBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.editBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierIDVal, futureDate);
      resourceUtilis.clickAddIdentifiersBtn();
      resourceUtilis.verifyIdentifierSavedValues(powerData.staticDataPower.licensePlateType, identifierIDVal, powerData.staticDataPower.newYorkState, powerData.staticDataPower.unitedStates, futureDate);
    });
  it('ME-160216, ME-138776 : Verify that when User changed value in the "Type" field entered values should get cleared. > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      genericUtils.typeDrpDwnWithMachtingText({ locator: addPowerPage.identifiers.typeDrpDwn, drpDwnVal: powerData.staticDataPower.serialNumberType });
      resourceUtilis.verifyIdentifierPopupEmptyVals();
    });
  it('ME-160615 : Verify that when user click on the identifiers X button popup should close > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.closeBtn });
      genericUtils.verifyToNotExist({ element: addPowerPage.identifiers.addPopupTitle });
    });
  it('ME-160617 : Verify that when user click on the Identifier "Delete" option popup message > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.clickAction({ locator: addPowerPage.identifiers.menuBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.deleteBtn });
      genericUtils.verifyConfirmAlertMessage({ msgToVerify: powerData.staticDataPower.identifierDeleteConfirmMsg });
    });
  it('ME-160621 : Verify when user click on cancel in delete alert pop-up record should be remain same > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.clickAction({ locator: addPowerPage.identifiers.menuBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.deleteBtn });
      genericUtils.clickCancelOnWindowAlertConfirm();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.menuBtn });
    });
  it('[ME-160623,ME-161720] : Verify when user click on ok in identifier delete alert pop-up record should get deleted and Power Unit Identifiers - UAT Test Case Delete power identifier. > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      resourceUtilis.enterPowerIdentifierValues(powerData.staticDataPower.licensePlateType, powerData.staticDataPower.newYorkState, identifierID, todayDate);
      resourceUtilis.clickAddIdentifiersBtn();
      genericUtils.clickAction({ locator: addPowerPage.identifiers.menuBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.deleteBtn });
      genericUtils.clickOkOnWindowAlertConfirm();
      genericUtils.verifyToNotExist({ element: addPowerPage.identifiers.menuBtn });
    });
  it('ME-160632 : Verify that identifier Expiration should be blank by default > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addPowerPage.identifiers.addBtn });
      genericUtils.clickAction({ locator: addPowerPage.identifiers.addBtn });
      genericUtils.verifyAttrText({ locator: addPowerPage.identifiers.expirationDateTxtBx, attribute: 'value', verifyText: '' });
    });
});