/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and update Equipment AssetID as AlphaNumberic under General Tab in Power//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 14-03-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-134109 verify the datatype change for power Equipment Asset ID from number to String in general Tab > Resources |  Assets - Power | Regression
                                 ME-134110 Verify the Equipment Asset Id max length to be <=60 characters in general tab > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import {
  backspaceClear,
  clickAction,
  generateRandomNumber,
  typeDropDwnClick,
  typeText,
  verifyAttrText,
  viewFullPage,
  verifyMaxLength,
  verifyTagName,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { staticData } from '../../../tdm/globalData/staticAssets.js';
import { getDateWithTargetDay } from '../../../tdm/lib/utilities/utilities';
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import { datePicker } from '../../../utilities/commonUtils/dateTimeUtils';
import { addNewEquipmentCardInPower, navigateToAddPowerNewPage, submitPowerAndVerifyToastMsg } from '../../../utilities/assetUtils/resourceUtilis';
const {
  txtFieldPowerUnitCodeInAddPower,
  btnEquipmentAddNew,
  drpdwnTypeTermInEquipment,
  txtFieldDescriptionInEquipment,
  txtFieldCountInEqpmnt,
  txtFieldAssetIdInEqpmnt,
  txtFieldRecoverdDateInEqpmnt,
  txtFieldConditionInEqpmnt,
  txtFieldIssueDateInEqpmnt,
  btnAddEqpmnt,
} = powerDetails;
const {
  equipmentCodition,
  typeTermInEqpmnt,
  descriptionInPowerEqpmnt,
  attrValue,
  assetIdInEqpmnt,
  dayCountVal,
  maxLength60,
} = powerData.staticDataPower;
const {
  inputTag,
} = powerData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const dateObj = getDateWithTargetDay({ targetDate: staticData.todayCount });
const issueDateInEqpmnt = `${dateObj.mm}/${dateObj.dd}/${dateObj.yy}`;
const recoverdDateInEqpmnt = `${dateObj.mm}/${dateObj.dd}/${dateObj.yy}`;
describe('Add a record in power [ME-134109,ME-134110]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-134109 verify the datatype change for power Equipment Asset ID from number to String in general Tab > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      typeText({ locator: txtFieldPowerUnitCodeInAddPower, dataText: generateRandomNumber() });
      addNewEquipmentCardInPower();
      submitPowerAndVerifyToastMsg();
    });
  it('ME-134110 Verify the Equipment Asset Id max length to be <=60 characters in general tab > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      typeText({ locator: txtFieldPowerUnitCodeInAddPower, dataText: generateRandomNumber() });
      clickAction({ locator: btnEquipmentAddNew });
      clickAction({ locator: drpdwnTypeTermInEquipment });

      //Entering the Values on equipment Card
      typeDropDwnClick({ locator: drpdwnTypeTermInEquipment, drpDwnVal: typeTermInEqpmnt });
      clickAction({ locator: txtFieldDescriptionInEquipment });

      typeText({ locator: txtFieldDescriptionInEquipment, dataText: descriptionInPowerEqpmnt });
      backspaceClear({ element: txtFieldCountInEqpmnt });

      typeText({ locator: txtFieldCountInEqpmnt, dataText: dayCountVal });
      typeText({ locator: txtFieldAssetIdInEqpmnt, dataText: assetIdInEqpmnt });
      verifyTagName({ locator: txtFieldAssetIdInEqpmnt, tagName: inputTag });

      //Verifying the Maximum length of AssetID
      verifyMaxLength({ locator: txtFieldAssetIdInEqpmnt, maxLength: maxLength60 });
      datePicker({ dateLocator: txtFieldIssueDateInEqpmnt, dataText: issueDateInEqpmnt });
      datePicker({ dateLocator: txtFieldRecoverdDateInEqpmnt, dataText: recoverdDateInEqpmnt });
      typeDropDwnClick({ locator: txtFieldConditionInEqpmnt, drpDwnVal: equipmentCodition });

      verifyAttrText({ locator: txtFieldRecoverdDateInEqpmnt, attribute: attrValue, verifyText: issueDateInEqpmnt });
      clickAction({ locator: btnAddEqpmnt });
      submitPowerAndVerifyToastMsg();
    });
});