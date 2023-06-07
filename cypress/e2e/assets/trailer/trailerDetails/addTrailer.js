/*---------------------------------------------------------------------------------------------------------------
Can I Create OR update Trailer Code
Test Cases List
Authored By                   : Babu Velagada
Date                          : 08-03-2023
Functions/Calling References  : homePage,commonData,trailerDetailsData,trailerPage,utilities
Test case Included            : ME-133373 - Can I Create OR update Trailer Code->Operational Details > AddNew trailer
|Assets-Trailer-Add New Trailer| regression
----------------------------------------------------------------------------------------------------------*/
import {
  clickAction,
  generateRandomNumber,
  toastMsg,
  typeText,
  verifyTextOrBackGroundColor,
  verifyToExist,
  viewFullPage,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
import homePage from '../../../../pageObjects/homePage/homePage.json';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import trailerPage from '../../../../pageObjects/assets/trailer/trailerPage.json';
import { searchTrailerWithCode } from '../../../../utilities/assetUtils/resourceUtilis';
import trailerDetailsData from '../../../../testData/assets/trailer/trailerDetailsData.json';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  resourcesMenu,
} = homePage;
const {
  btnTrailerSave,
  labelTrailerCodeName,
  txtTrailerCode,
} = trailerPage;
const {
  trailerNew,
} = homePage.resourcesDDO;
const { shortWait } = commonData;
const {
  colorAttr,
} = trailerDetailsData.staticData;
const {
  colorCodeVal,
} = trailerDetailsData.expectedData;
const {
  prefix,
} = trailerDetailsData.userDefinedData;
let trailerCode;
describe('Can I Create OR update Trailer Code->Operational Details > AddNew trailer |Assets-Trailer-Add New Trailer| regression [ME-133373]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    trailerCode = prefix + generateRandomNumber();
  });
  it('ME-133373 - Can I Create OR update Trailer Code->Operational Details > AddNew trailer |Assets-Trailer-Add New Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
        '@phase2',
      ],
    }, () => {
      verifyToExist({ element: resourcesMenu });
      clickAction({ locator: resourcesMenu });
      verifyToExist({ element: trailerNew });
      clickAction({ locator: trailerNew });
      waitSometime(shortWait);
      typeText({ locator: txtTrailerCode, dataText: trailerCode });
      clickAction({ locator: btnTrailerSave });
      toastMsg();
      waitSometime(shortWait);
      searchTrailerWithCode({ trailerCode });
      waitSometime(shortWait);
      verifyTextOrBackGroundColor({ locator: labelTrailerCodeName, color: colorAttr, colorCode: colorCodeVal });
    });
});