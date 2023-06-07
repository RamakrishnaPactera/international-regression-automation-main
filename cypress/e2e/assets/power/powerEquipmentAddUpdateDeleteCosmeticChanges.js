/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and update Equipment under General Tab in Power//
 Authored By                   : Beemireddy chandra obula reddy
 Date                          : 29-03-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : [ME-159322],[ME-159432],[ME-159410],[ME-159433],[ME-159411],[ME-159434],[ME-159412],[ME-159435],[ME-159413],[ME-159436],[ME-138061],[ME-160271],[ME-160276],[ME-160277],[ME-160279],[ME-138132],[ME-160290][ME-160295][ME-160298]]
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import {
  addNewEquipmentCardInPower,
  navigateToAddPowerNewPage,
  submitPowerAndVerifyToastMsg,
} from '../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  typeText,
  viewFullPage,
  generateRandomNumber,
  typeDropDwnClick,
  clearTypeAndEnter,
  backspaceClear,
  verifyTextContains,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
const {
  menuEquipmentRecords,
  editOptionEquipmentRecordsMenu,
  txtFieldPowerUnitCodeInAddPower,
  drpdwnTypeTermInEquipment,
  txtFieldDescriptionInEquipment,
  txtFieldCountInEqpmnt,
  txtFieldAssetIdInEqpmnt,
  txtFieldConditionInEqpmnt,
  btnAddEqpmnt,
  btnEquipmentAddNew,
  deleteOptionEquipmentRecordsMenu,
  typeTxtEquipment,
  txtEquipmentHeader,
  txtEquipmentDescription,
  txtEquipmentCount,
  txtEquipmentAssetId,
  txtEquipmentIssued,
  txtEquipmentRecovered,
  txtEquipmentCondition,
} = powerDetails;
const {
  typeTermInEqpmntOne,
  descriptionInPowerEqpmntOne,
  dayCountValOne,
  assetIdInEqpmntOne,
  equipmentCoditionOne,
  typeValueTxt,
  txtValEquipment,
  txtValueDescription,
  txtValueCount,
  txtValueIssued,
  txtValueAssetId,
  txtValueRecovered,
  txtValueCondition,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Verifying Create, Update, Delete and Cosmetic Changes in Equipment in Power', () => {
  beforeEach(() => {
    cy.log('***creating power using TDM***');
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('[ME-159322],[ME-159432][ME-138061][ME-138132] -P2 - Power General - Equipment details card -UAT TestCase-User Able Access "Power - Add New" under Resources.',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
    });
  it('[ME-159410],[ME-159433][ME-160270][ME-160290]-P2 - Power General - Equipment details card -UAT TestCase-Create New Equipment',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      typeText({ locator: txtFieldPowerUnitCodeInAddPower, dataText: generateRandomNumber() });
      addNewEquipmentCardInPower();
      submitPowerAndVerifyToastMsg();
    });
  it('[ME-159411],[ME-159434][ME-160271][ME-160295]-P2 - Power General - Equipment details card -UAT TestCase-Edit the Existing Equipmment record',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      typeText({ locator: txtFieldPowerUnitCodeInAddPower, dataText: generateRandomNumber() });
      addNewEquipmentCardInPower();
      submitPowerAndVerifyToastMsg();
      clickAction({ locator: menuEquipmentRecords });
      clickAction({ locator: editOptionEquipmentRecordsMenu });
      typeDropDwnClick({ locator: drpdwnTypeTermInEquipment, drpDwnVal: typeTermInEqpmntOne });
      clickAction({ locator: txtFieldDescriptionInEquipment });
      clearTypeAndEnter({ element: txtFieldDescriptionInEquipment, typeText: descriptionInPowerEqpmntOne });
      backspaceClear({ element: txtFieldCountInEqpmnt });
      typeText({ locator: txtFieldCountInEqpmnt, dataText: dayCountValOne });
      clearTypeAndEnter({ element: txtFieldAssetIdInEqpmnt, typeText: assetIdInEqpmntOne });
      typeDropDwnClick({ locator: txtFieldConditionInEqpmnt, drpDwnVal: equipmentCoditionOne });
      clickAction({ locator: btnAddEqpmnt });
    });
  it('[ME-159412],[ME-159435][ME-160276][ME-160277]-P2 - Power General - Equipment details card -UAT TestCase-Delete the Equipment Record',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      typeText({ locator: txtFieldPowerUnitCodeInAddPower, dataText: generateRandomNumber() });
      addNewEquipmentCardInPower();
      submitPowerAndVerifyToastMsg();
      clickAction({ locator: menuEquipmentRecords });
      clickAction({ locator: deleteOptionEquipmentRecordsMenu });
    });
  it('[ME-159413],[ME-159436][ME-160279][ME-160298]-P2 - Power General - Equipment details card -UAT TestCase-Checking Cosmentic Errors in Equipment card UI',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      typeText({ locator: txtFieldPowerUnitCodeInAddPower, dataText: generateRandomNumber() });
      clickAction({ locator: btnEquipmentAddNew });
      verifyTextContains({ locator: typeTxtEquipment, containsText: typeValueTxt });
      verifyTextContains({ locator: txtEquipmentHeader, containsText: txtValEquipment });
      verifyTextContains({ locator: txtEquipmentDescription, containsText: txtValueDescription });
      verifyTextContains({ locator: txtEquipmentCount, containsText: txtValueCount });
      verifyTextContains({ locator: txtEquipmentAssetId, containsText: txtValueAssetId });
      verifyTextContains({ locator: txtEquipmentIssued, containsText: txtValueIssued });
      verifyTextContains({ locator: txtEquipmentRecovered, containsText: txtValueRecovered });
      verifyTextContains({ locator: txtEquipmentCondition, containsText: txtValueCondition });
    });
});