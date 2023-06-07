/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and update Display Name under Operations Tab in Power//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 14-03-2023,
 Functions/Calling References  : resourceUtilis, powerDetails, utilities, genericUtils, loginUtils
 Test case Included            : ME-134107 Verify the display name in general tab  > Resources |  Assets - Power | Regression
                                 ME-134108 Verify the Display name max Length to be <= 256 in general information card > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  clickAction,
  verifyMaxLength,
  verifyTagName,
  verifyTextOrBackGroundColor,
  verifyToExist,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  resourcesMenu,
} from '../../../pageObjects/homePage/homePage.json';
const {
  txtDisplayName,
  labelDisplayName,
  btnAddPower,
} = powerDetails;
const {
  inputTag,
} = powerData.expectedData;
const {
  borderColor,
  maxLength256,
} = powerData.staticDataPower;
const {
  colorCodeWhite,
} = powerData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Add a record in power [ME-134107][ME-134108]', () => {
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-134107 Verify the display name in general tab  > Resources |  Assets - Power | Regression',
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
      verifyToExist({ element: labelDisplayName });
      verifyTextOrBackGroundColor({ locator: txtDisplayName, color: borderColor, colorCode: colorCodeWhite });
    });
  it('ME-134108 Verify the Display name max Length to be <= 256 in general information card > Resources |  Assets - Power | Regression',
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
      verifyToExist({ element: labelDisplayName });
      verifyTextOrBackGroundColor({ locator: txtDisplayName, color: borderColor, colorCode: colorCodeWhite });
      verifyTagName({ locator: txtDisplayName, tagName: inputTag });
      verifyMaxLength({ locator: txtDisplayName, maxLength: maxLength256 });
    });
});