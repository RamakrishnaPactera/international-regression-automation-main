/*---------------------------------------------------------------------------------------------------------------
Can I Add axle type field on Operations|Assets-Trailer specs card
Test Cases List
Authored By                   : Babu Velagada
Date                          : 08-03-2023
Functions/Calling References  : commonData,trailerDetailsData,trailerPage,utilities
Test case Included            : ME-133402 - Can I Add axle type field > search trailer > Operations|Assets-Trailer specs card|regression
 ----------------------------------------------------------------------------------------------------------*/
import {
  clickAction,
  dropDownContainsTextClick,
  getMinionValues,
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
  drpDwnAxleType,
  labelAxleType,
  labelTrailerCodeName,
  tabTrailerGeneral,
  txtAxleType,
} = trailerPage;
const { shortWait } = commonData;
const {
  colorAttr,
  tdmTrailerData,
  tdmTrailerReq,
  tdmTrailerCommonScenario,
} = trailerDetailsData.staticData;
const {
  colorCodeVal,
} = trailerDetailsData.expectedData;
let trailerDataTDM, axleTypeValue;
describe('Can I Add axle type field >search trailer >Operations|Assets-Trailer specs card|regression [ME-133402]', () => {
  beforeEach(() => {
    getMinionValues('trailerAxleType', 1).then((axleType) => {
      axleTypeValue = axleType[0];
    });
    cy.log('***creating trailer using TDM***');
    getTDMData({ dataType: tdmTrailerData, dataCondition: tdmTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-133402 - Can I Add axle type field > search trailer > Operations|Assets-Trailer specs card|regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
        '@phase2',
      ],
    }, () => {
      searchTrailerWithCode({ trailerCode: trailerDataTDM.trailerCode });
      waitSometime(shortWait);
      verifyTextOrBackGroundColor({ locator: labelTrailerCodeName, color: colorAttr, colorCode: colorCodeVal });
      clickAction({ locator: tabTrailerGeneral });
      waitSometime(shortWait);
      verifyExists({ element: labelAxleType });
      dropDownContainsTextClick({ element: drpDwnAxleType, typeText: axleTypeValue, exactText: axleTypeValue });
      cy.get(txtAxleType).should('have.text', axleTypeValue);
    });
});