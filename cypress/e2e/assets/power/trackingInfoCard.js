/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and update Pool under General Tab in Power//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 14-03-2023,
 Functions/Calling References  : homePagePower, dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-134123 Test [FE] Power - Update to Tracking Information card fields > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import homePagePower from '../../../pageObjects/assets/power/addPower/addPowerPage.json';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import {
  resourcesMenu,
} from '../../../pageObjects/homePage/homePage.json';
import {
  clickAction,
  dropDownContainsTextClick,
  toastWithMsg,
  typeDropDwn,
  typeText,
  verifyTextOrBackGroundColor,
  verifyToExist,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const {
  btnAddPower,
  labelTrackingInfo,
  drpdwnTrackingDevice,
  drpdwnModel,
  drpdwnSerialNo,
  whiteSerialNo,
  txtFieldPowerUnitCodeInAddPower,
} = powerDetails;
const {
  btnPowerSave,
} = homePagePower;
const {
  txtPlatForm,
  backgroundColor,
  trackingDeviceVal,
  nullInTrackingDevice,
  powerCode,
} = powerData.staticDataPower;
const {
  colorCodeGrey,
  colorWhite,
  msgWithOutSerialNo,
} = powerData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Add a record in power with Tracking Info Card [ME-134123]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-134123 Test [FE] Power - Update to Tracking Information card fields > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase2',
      ],
    }, () => {
      clickAction({ locator: resourcesMenu });
      clickAction({ locator: btnAddPower });

      typeText({ locator: txtFieldPowerUnitCodeInAddPower, dataText: powerCode });
      verifyToExist({ element: labelTrackingInfo });

      //Verifying the background colour for Model
      verifyTextOrBackGroundColor({ locator: drpdwnModel, color: backgroundColor, colorCode: colorCodeGrey });
      verifyTextOrBackGroundColor({ locator: drpdwnSerialNo, color: backgroundColor, colorCode: colorCodeGrey });
      typeDropDwn({ locator: drpdwnTrackingDevice, drpDwnVal: txtPlatForm });

      //Selecting the dropdown value in Tracking Device value
      dropDownContainsTextClick({ element: drpdwnModel, typeText: trackingDeviceVal, exactText: trackingDeviceVal });
      verifyTextOrBackGroundColor({ locator: drpdwnModel, color: backgroundColor, colorCode: colorWhite });
      verifyTextOrBackGroundColor({ locator: whiteSerialNo, color: backgroundColor, colorCode: colorWhite });

      clickAction({ locator: btnPowerSave });
      toastWithMsg({ message: msgWithOutSerialNo });
      typeDropDwn({ locator: drpdwnTrackingDevice, drpDwnVal: nullInTrackingDevice });

      //Verifying the background colour for Model
      verifyTextOrBackGroundColor({ locator: drpdwnModel, color: backgroundColor, colorCode: colorCodeGrey });
      verifyTextOrBackGroundColor({ locator: drpdwnSerialNo, color: backgroundColor, colorCode: colorCodeGrey });
    });
});