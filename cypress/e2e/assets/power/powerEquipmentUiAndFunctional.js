/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and update Equipment under General Tab in Power//
 Authored By                   : Beemireddy chandra obula reddy
 Date                          : 31-03-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : [ME-159424],[ME-159425],[ME-159426],[ME-159427],[ME-159428],[ME-159429],[ME-159431],[ME-159437],[ME-159438],[ME-159439],
                                [ME-159440],[ME-159441],[ME-159443],[ME-159444],[ME-159445],[ME-159446],[ME-160625],[ME-160629],[ME-160620],[ME-159430],[ME-141632]
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
  verifyTxtExist,
  verifyIfDisabled,
  verifyNotContainValue,
  verifyConfirmAlertMessage,
  verifyVisible,
  clickCancelOnWindowAlertConfirm,
  clickOkOnWindowAlertConfirm,
  verifyToNotExist,
  verifyLengthOfVal,
  getMinionValues,
  verifySingleSelectDropDownFunction,
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
  txtEquipmentHeader,
  txtEditEquipment,
  typeFieldSavedEquipment,
  descriptionSavedEquipment,
  disabledAddEquipment,
} = powerDetails;
const {

  typeTermInEqpmntOne,
  descriptionInPowerEqpmnt,
  descriptionInPowerEqpmnttwo,
  descriptionInPowerEqpmntOne,
  dayCountValOne,
  assetIdInEqpmntOne,
  equipmentCoditionOne,
  dayCountValSix,
  txtValEquipment,
  txtValEditEquipment,
  dayCountValFive,
  dayCountValTwo,
  dayCountValThree,
  typeTermInEqpmnt,
  assetIdInEqpmnt,
  assetIdInEqpmntTwo,
  assetIdInEqpmntThree,
  dayCountValFour,
  equipmentCodition,
  equipmentWindowAlertConfirmMessage,
  dayCountValEight,
  dayAssetIDVal,
  minionDriverGeneralEquipmentCondition,
  minionPowerGeneralEquipmentCode,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let drpDwnDriverGeneralEquipmentCondition, drpDwnPowerGeneralEquipmentCode;
describe('Verifying Test Power Equipment Details - Functional and UI Testcases', () => {
  before(() => {
    getMinionValues(minionDriverGeneralEquipmentCondition, 4).then((resultOptions) => {
      drpDwnDriverGeneralEquipmentCondition = resultOptions;
    });
    getMinionValues(minionPowerGeneralEquipmentCode, 3).then((resultOptions) => {
      drpDwnPowerGeneralEquipmentCode = resultOptions;
    });
  });
  beforeEach(() => {
    cy.log('***creating power using TDM***');
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('[ME-159424] -Test Power Equipment Details - Verify whether the all Power Equipment Details field are functionally enabled',
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
    });
  it('[ME-159425]-Test Power Equipment Details - Verify the Add Equipment Pop Up Screen',
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
      verifyTextContains({ locator: txtEquipmentHeader, containsText: txtValEquipment });
    });
  it('[ME-159426]-Test Power Equipment Details -Verify the Add Equipment Pop Up Fields',
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
    });
  it('[ME-159427]-Test Power Equipment Details - Verify the Description field',
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
      clickAction({ locator: txtFieldDescriptionInEquipment });
      typeText({ locator: txtFieldDescriptionInEquipment, dataText: descriptionInPowerEqpmnt });
    });
  it('[ME-159428]-Test Power Equipment Details -Verify Numeric Values into the count Field',
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
      backspaceClear({ element: txtFieldCountInEqpmnt });
      typeText({ locator: txtFieldCountInEqpmnt, dataText: dayCountValOne });
      clearTypeAndEnter({ element: txtFieldCountInEqpmnt, typeText: dayCountValTwo });
      clearTypeAndEnter({ element: txtFieldCountInEqpmnt, typeText: dayCountValThree });
    });
  it('[ME-159429]-Test Power Equipment Details -Verify the Asset ID field',
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
      typeText({ locator: txtFieldAssetIdInEqpmnt, dataText: assetIdInEqpmnt });
    });

  it('[ME-159431]-Test Power Equipment Details -Verify Equipment record is visible with Details after saving ',
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
      verifyTxtExist({ locator: typeFieldSavedEquipment, containsTxt: typeTermInEqpmnt });
      verifyTxtExist({ locator: descriptionSavedEquipment, containsTxt: descriptionInPowerEqpmnt });
    });
  it('[ME-159437]- Test Power Equipment Details -Verify Add Equipment button is Disabled and Should not clickable ',
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
      clickAction({ locator: disabledAddEquipment });
      verifyIfDisabled({ locator: disabledAddEquipment });
    });
  it('[ME-159438]- Test Power Equipment Details -Add Equipment Button ',
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

      typeDropDwnClick({ locator: drpdwnTypeTermInEquipment, drpDwnVal: typeTermInEqpmnt });
      clickAction({ locator: txtFieldDescriptionInEquipment });
      typeText({ locator: txtFieldDescriptionInEquipment, dataText: descriptionInPowerEqpmnttwo });
      backspaceClear({ element: txtFieldCountInEqpmnt });
      typeText({ locator: txtFieldCountInEqpmnt, dataText: dayCountValFour });
      typeText({ locator: txtFieldAssetIdInEqpmnt, dataText: assetIdInEqpmntTwo });
      typeDropDwnClick({ locator: txtFieldConditionInEqpmnt, drpDwnVal: equipmentCodition });
      clickAction({ locator: disabledAddEquipment });
      verifyIfDisabled({ locator: disabledAddEquipment });
    });
  it('[ME-159439]-Test Power Equipment Details -Verify the count field',
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
      backspaceClear({ element: txtFieldCountInEqpmnt });
      typeText({ locator: txtFieldCountInEqpmnt, dataText: dayCountValFive });
      verifyNotContainValue({ element: txtFieldCountInEqpmnt, Value: dayCountValFive });
      typeText({ locator: txtFieldCountInEqpmnt, dataText: dayCountValThree });
      verifyNotContainValue({ element: txtFieldCountInEqpmnt, Value: dayCountValThree });
    });
  it('[ME-159440]-Test Power Equipment Details - Verify user  can see Edit and Delete options ',
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
      verifyVisible({ element: editOptionEquipmentRecordsMenu });
      verifyVisible({ element: deleteOptionEquipmentRecordsMenu });
    });

  it('[ME-159441]-Test Power Equipment Details - Verify the Edit Option',
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
      verifyTextContains({ locator: txtEditEquipment, containsText: txtValEditEquipment });
    });
  it('[ME-159443],[ME-160620]- Test Power Equipment Details -Modify the data Save the Add Equipment ',
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
      verifyTxtExist({ locator: typeFieldSavedEquipment, containsTxt: typeTermInEqpmntOne });
      verifyTxtExist({ locator: descriptionSavedEquipment, containsTxt: descriptionInPowerEqpmntOne });
    });

  it('[ME-159444]-Test Power Equipment Details - Verify Delete option popup ',
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
      verifyConfirmAlertMessage({ msgToVerify: equipmentWindowAlertConfirmMessage });
    });
  it('[ME-159445]-Test Power Equipment Details - Click on Cancel button in the Delete PopUp ',
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
      clickCancelOnWindowAlertConfirm();
      verifyTxtExist({ locator: typeFieldSavedEquipment, containsTxt: typeTermInEqpmnt });
      verifyTxtExist({ locator: descriptionSavedEquipment, containsTxt: descriptionInPowerEqpmnt });
    });
  it('[ME-159446]-Test Power Equipment Details - Click on the Ok button in the delete options',
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
      clickOkOnWindowAlertConfirm();
      verifyToNotExist({ element: typeFieldSavedEquipment });
      verifyToNotExist({ element: descriptionSavedEquipment });
    });
  it('[ME-160625]- Test Power Equipment Details - Verify Count field value length',
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
      backspaceClear({ element: txtFieldCountInEqpmnt });
      typeText({ locator: txtFieldCountInEqpmnt, dataText: dayCountValSix });
      verifyLengthOfVal({ locator: txtFieldCountInEqpmnt, expectedVal: dayCountValEight });
    });
  it('[ME-160629]-Test Power Equipment Details - Verify "Asset ID" field value length',
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
      typeText({ locator: txtFieldAssetIdInEqpmnt, dataText: assetIdInEqpmntThree });
      verifyLengthOfVal({ locator: txtFieldAssetIdInEqpmnt, expectedVal: dayAssetIDVal });
    });
  it('[ME-159430]-Test Power Equipment Details -Verify the Condition Drop Down Fields',
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
      drpDwnDriverGeneralEquipmentCondition.unshift('---');
      verifySingleSelectDropDownFunction({ drpDwnEle: txtFieldConditionInEqpmnt, drpDwnOptions: drpDwnDriverGeneralEquipmentCondition });
    });
  it('[ME-141632]-Validate options to be displayed in Equipment Type',
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
      drpDwnPowerGeneralEquipmentCode.unshift('---');
      verifySingleSelectDropDownFunction({ drpDwnEle: drpdwnTypeTermInEquipment, drpDwnOptions: drpDwnPowerGeneralEquipmentCode });
    });
});