/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and update Equipment under General Tab in Power//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 14-03-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-133333 Verify  the date field  Year format as YY for add new Equipment Card > Resources |  Assets - Power | Regression
                                 ME-133335 Verify  the date field  Year format as YY for edit Equipment Card > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import {
  addNewEquipmentCardInPower,
  navigateToAddPowerNewPage,
  searchPowerWithCode,
  submitPowerAndVerifyToastMsg,
} from '../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  getTDMData,
  typeText,
  viewFullPage,
  generateRandomNumber,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
const {
  tabGeneral,
  txtFieldPowerUnitCodeInAddPower,
} = powerDetails;
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
describe('Add a record in power with Equipment[ME-133333,ME-133335]', () => {
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
  it('ME-133333 Verify  the date field  Year format as YY for add new Equipment Card  > Resources |  Assets - Power | Regression',
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
  it('ME-133335 Verify  the date field  Year format as YY for edit Equipment Card  > Resources |  Assets - Power | Regression',
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
      clickAction({ locator: tabGeneral });
      addNewEquipmentCardInPower();
      submitPowerAndVerifyToastMsg();
    });
});