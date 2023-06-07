/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and update Power unit code under General Tab in Power//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 14-03-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-133347 Verify  power unit code being greyed out after clicking on Save power > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  clickAction,
  generateRandomNumber,
  getTDMData,
  typeText,
  verifyBackGroundColour,
  verifyTextOrBackGroundColor,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { navigateToAddPowerNewPage, searchPowerWithCode, submitPowerAndVerifyToastMsg } from '../../../utilities/assetUtils/resourceUtilis';
const {
  tabGeneral,
  txtFieldPowerUnitCode,
  txtFieldPowerUnitCodeInAddPower,
} = powerDetails;
const {
  tdmAddPowerReq,
  tdmPowerCommonScenario,
  tdmPowerData,
  backgroundColor,
} = powerData.staticDataPower;
const {
  colorCodeGrey,
  colorWhite,
} = powerData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let powerDataTDM;

describe('Add a record in power with Power Unit code [ME-133347]', () => {
  beforeEach(() => {
    cy.log('***creating power using TDM***');
    getTDMData({ dataType: tdmPowerData, dataCondition: tdmAddPowerReq, dataScenario: tdmPowerCommonScenario });
    cy.then(() => {
      powerDataTDM = Cypress.env('inputVal');
    });
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-133347 Verify  power unit code being greyed out after clicking on Save power > Resources |  Assets - Power | Regression',
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

      verifyBackGroundColour({ locator: txtFieldPowerUnitCodeInAddPower, colourValue: colorWhite });
      typeText({ locator: txtFieldPowerUnitCodeInAddPower, dataText: generateRandomNumber() });

      submitPowerAndVerifyToastMsg();

      clickAction({ locator: tabGeneral });
      verifyTextOrBackGroundColor({ locator: txtFieldPowerUnitCode, color: backgroundColor, colorCode: colorCodeGrey });

      searchPowerWithCode({ powerCode: powerDataTDM.powerCode });
      clickAction({ locator: tabGeneral });
      verifyTextOrBackGroundColor({ locator: txtFieldPowerUnitCode, color: backgroundColor, colorCode: colorCodeGrey });
    });
});