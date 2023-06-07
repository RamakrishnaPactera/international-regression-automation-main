/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and update Rare End Ratio under General Tab in Power//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 14-03-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-133341 Verify  the Read End Ratio fieldname is renamed to Rare End Ratio > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import {
  clickAction,
  generateRandomNumber,
  getTDMData,
  typeText,
  verifyToExist,
  viewFullPage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { navigateToAddPowerNewPage, searchPowerWithCode, submitPowerAndVerifyToastMsg } from '../../../utilities/assetUtils/resourceUtilis';
const {
  tabGeneral,
  labelRearEndRatio,
  txtFieldPowerUnitCodeInAddPower,
} = powerDetails;
const {
  shortWait,
} = commonData;
const {
  tdmAddPowerReq,
  tdmPowerCommonScenario,
  tdmPowerData,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let powerDataTDM;

describe('Add a record in power and Verify Rare End Ratio [ME-133341]', () => {
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
  it('ME-133341 Verify  the Read End Ratio fieldname is renamed to Rare End Ratio > Resources |  Assets - Power | Regression',
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
      verifyToExist({ element: labelRearEndRatio });
      submitPowerAndVerifyToastMsg();
      waitSometime(shortWait);
      clickAction({ locator: tabGeneral });

      verifyToExist({ element: labelRearEndRatio });
      searchPowerWithCode({ powerCode: powerDataTDM.powerCode });

      clickAction({ locator: tabGeneral });
      verifyToExist({ element: labelRearEndRatio });
    });
});