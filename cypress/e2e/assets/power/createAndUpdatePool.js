/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and update Pool under General Tab in Power//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 14-03-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-134104 verify the update pool field to be single select record in operational tab > Resources |  Assets - Power | Regression
                                 ME-134103 Verify the update pool field to carrier search in operational tab > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  searchPowerWithCode,
} from '../../../utilities/assetUtils/resourceUtilis';
import {
  getTDMData,
  selectItemFromDropDownByTyping,
  verifyMaxExactLength,
  verifyTagName,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const {
  txtFieldPoolSearch,
} = powerDetails;
const {
  tdmAddPowerReq,
  tdmPowerCommonScenario,
  tdmPowerData,
  maxLengthForPool,
} = powerData.staticDataPower;
const {
  inputTag,
} = powerData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let powerDataTDM;
describe('Add a record in power with Pool [ME-134104,ME-134103]', () => {
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
  it('ME-134104 verify the update pool field to be single select record in operational tab > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase2',
      ],
    }, () => {
      searchPowerWithCode({ powerCode: powerDataTDM.powerCode });
      selectItemFromDropDownByTyping({ locator: txtFieldPoolSearch, drpDwnVal: tdmPowerData });
    });
  it('ME-134103 Verify the update pool field to carrier search in operational tab  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase2',
      ],
    }, () => {
      searchPowerWithCode({ powerCode: powerDataTDM.powerCode });
      verifyTagName({ locator: txtFieldPoolSearch, tagName: inputTag });
      verifyMaxExactLength({ locator: txtFieldPoolSearch, maxLength: maxLengthForPool });
    });
});