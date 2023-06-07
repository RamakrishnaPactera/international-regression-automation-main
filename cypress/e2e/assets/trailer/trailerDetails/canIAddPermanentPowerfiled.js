/*---------------------------------------------------------------------------------------------------------------
Can I Add Permanent power filed display as quick search
Test Cases List
Authored By                   : Babu Velagada
Date                          : 21-03-2023
Functions/Calling References  : commonData,trailerDetailsData,trailerPage,utilities
Test case Included            : ME-133361 - Can I Add Permanent power filed display as quick search ->Operations-> Search trailer |Assets-Trailer| regression
 ----------------------------------------------------------------------------------------------------------*/
import {
  clickAction,
  dropDownContainsTextClick,
  getTDMData,
  verifyExists,
  verifyTextOrBackGroundColor,
  viewFullPage,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
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
  drpDwnPowerUnits,
  labelPowerUnits,
  labelTrailerCodeName,
  tabTrailerGeneral,
} = trailerPage;
const { shortWait } = commonData;
const {
  colorAttr,
  tdmAddPowerReq,
  tdmPowerCommonScenario,
  tdmPowerData,
  tdmTrailerCommonScenario,
  tdmTrailerData,
  tdmTrailerReq,
} = trailerDetailsData.staticData;
const {
  colorCodeVal,
} = trailerDetailsData.expectedData;
let trailerDataTDM, powerDataTDM, permanentPowerUnits;
describe('Can I Add Permanent power filed display as quick search ->Operations-> Search trailer |Assets-Trailer| regression [ME-133361]', () => {
  beforeEach(() => {
    cy.log('***creating trailer using TDM***');
    getTDMData({ dataType: tdmTrailerData, dataCondition: tdmTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmPowerData, dataCondition: tdmAddPowerReq, dataScenario: tdmPowerCommonScenario });
    cy.then(() => {
      powerDataTDM = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-133361 - Can I Add Permanent power filed display as quick search ->Operations-> Search trailer |Assets-Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
        '@phase2',
      ],
    }, () => {
      permanentPowerUnits = powerDataTDM.powerCode;
      searchTrailerWithCode({ trailerCode: trailerDataTDM.trailerCode });
      waitSometime(shortWait);
      verifyTextOrBackGroundColor({ locator: labelTrailerCodeName, color: colorAttr, colorCode: colorCodeVal });
      clickAction({ locator: tabTrailerGeneral });
      waitSometime(shortWait);
      verifyExists({ element: labelPowerUnits });
      dropDownContainsTextClick({ element: drpDwnPowerUnits, typeText: permanentPowerUnits, exactText: permanentPowerUnits });
    });
});