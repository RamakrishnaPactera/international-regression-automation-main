/*---------------------------------------------------------------------------------------------------------------
Can I Update Operational status in gray bar
Test Cases List
Authored By                   : Babu Velagada
Date                          : 21-03-2023
Functions/Calling References  : commonData,trailerDetailsData,trailerPage,utilities
Test case Included            : ME-133365 - Can I Update Operational status in gray bar > trailer > trailer search |Assets-Trailer| regression
 ----------------------------------------------------------------------------------------------------------*/

import {
  clickAction,
  dropDownContainsTextClick,
  getMinionValues,
  getTDMData,
  scrollToBottomRight,
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
  drpDwnOperationalStatus,
  labelTrailerCodeName,
  btnTrailerSave,
  txtOperatingStatus,
} = trailerPage;
const { shortWait, longWait } = commonData;
const {
  colorAttr,
  tdmTrailerData,
  tdmTrailerReq,
  tdmTrailerCommonScenario,
} = trailerDetailsData.staticData;
const {
  colorCodeVal,
} = trailerDetailsData.expectedData;
let trailerDataTDM, operatingStatusValue;
describe('Can I Update Operational status in gray bar > trailer > trailer search |Assets-Trailer| regression [ME-133365]', () => {
  beforeEach(() => {
    getMinionValues('trailerOperatingStatus', 1).then((operatingStatus) => {
      operatingStatusValue = operatingStatus[0];
    });
    cy.log('***creating trailer using TDM***');
    getTDMData({ dataType: tdmTrailerData, dataCondition: tdmTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-133365 - Can I Update Operational status in gray bar > trailer > trailer search |Assets-Trailer| regression',
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
      dropDownContainsTextClick({ element: drpDwnOperationalStatus, typeText: operatingStatusValue, exactText: operatingStatusValue });
      scrollToBottomRight();
      clickAction({ locator: btnTrailerSave });
      waitSometime(longWait);
      cy.get(txtOperatingStatus).should('have.text', 'Operating Status:' + operatingStatusValue);
    });
});