/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validate Power Appearance
 Authored By                   : Sanjeev Bandari
 Date                          : 29-05-2023
 Functions/Calling References  : powerDetails, genericUtils, loginUtils
 Test case Included: ME-138055 FE - Power Unit Appearance - Regression Test Case Preparation and Execution'
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  clickAction,
  getMinionValues,
  selectItemFromButtonTypeDropDown,
  typeText,
  verifyAttrText,
  viewFullPage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import { navigateToAddPowerNewPage, createPowerWithMandatoryFields, submitPowerAndVerifyToastMsg, searchPowerWithCode } from '../../../utilities/assetUtils/resourceUtilis';
const { tabGeneral } = powerDetails;
const {
  drpDwnAxleConfigurationTerm,
  drpDwnSleeperSizeDimensionsTerm,
  drpDwnSleeperTypeTerm,
  drpDwnSuspensionTerm,
  txtExteriorColor,
  txtInteriorColor,
} = powerDetails.appearance;
const {
  attrValue,
  minionPowerGeneralAppearanceAxleConfig,
  minionPowerGeneralAppearanceSleeperSize,
  minionpowerGeneralAppearanceSleeperType,
  minionPowerGeneralAppearanceSuspension,
  txtBlackColor,
  txtRedColor,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const { shortWait } = commonData;
let drpDwnPowerGeneralAppearanceSleeperType, drpDwnPowerGeneralAppearanceSleeperType1, drpDwnPowerGeneralAppearanceAxleConfig, drpDwnPowerGeneralAppearanceAxleConfig1, drpDwnPowerGeneralAppearanceSuspension, drpDwnPowerGeneralAppearanceSuspension1, drpDwnPowerGeneralAppearanceSleeperSize, drpDwnPowerGeneralAppearanceSleeperSize1;
describe('Validate Power Appearance', () => {
  before(() => {
    getMinionValues(minionpowerGeneralAppearanceSleeperType, 2).then((resultOptions) => {
      drpDwnPowerGeneralAppearanceSleeperType = resultOptions[0];
      drpDwnPowerGeneralAppearanceSleeperType1 = resultOptions[1];
    });
    getMinionValues(minionPowerGeneralAppearanceAxleConfig, 2).then((resultOptions) => {
      drpDwnPowerGeneralAppearanceAxleConfig = resultOptions[0];
      drpDwnPowerGeneralAppearanceAxleConfig1 = resultOptions[1];
    });
    getMinionValues(minionPowerGeneralAppearanceSuspension, 2).then((resultOptions) => {
      drpDwnPowerGeneralAppearanceSuspension = resultOptions[0];
      drpDwnPowerGeneralAppearanceSuspension1 = resultOptions[1];
    });
    getMinionValues(minionPowerGeneralAppearanceSleeperSize, 2).then((resultOptions) => {
      drpDwnPowerGeneralAppearanceSleeperSize = resultOptions[0];
      drpDwnPowerGeneralAppearanceSleeperSize1 = resultOptions[1];
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-138055 FE - Power Unit Appearance - Regression Test Case Preparation and Execution',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      const powerCode = createPowerWithMandatoryFields();
      typeText({ locator: txtExteriorColor, dataText: txtRedColor });
      typeText({ locator: txtInteriorColor, dataText: txtBlackColor });
      selectItemFromButtonTypeDropDown({ locator: drpDwnSleeperTypeTerm, dropdownVal: drpDwnPowerGeneralAppearanceSleeperType });
      selectItemFromButtonTypeDropDown({ locator: drpDwnAxleConfigurationTerm, dropdownVal: drpDwnPowerGeneralAppearanceAxleConfig });
      selectItemFromButtonTypeDropDown({ locator: drpDwnSuspensionTerm, dropdownVal: drpDwnPowerGeneralAppearanceSuspension });
      selectItemFromButtonTypeDropDown({ locator: drpDwnSleeperSizeDimensionsTerm, dropdownVal: drpDwnPowerGeneralAppearanceSleeperSize });
      submitPowerAndVerifyToastMsg();
      searchPowerWithCode({ powerCode });
      //Edit power with few fields
      clickAction({ locator: tabGeneral });
      selectItemFromButtonTypeDropDown({ locator: drpDwnSleeperTypeTerm, dropdownVal: drpDwnPowerGeneralAppearanceSleeperType1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnAxleConfigurationTerm, dropdownVal: drpDwnPowerGeneralAppearanceAxleConfig1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnSuspensionTerm, dropdownVal: drpDwnPowerGeneralAppearanceSuspension1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnSleeperSizeDimensionsTerm, dropdownVal: drpDwnPowerGeneralAppearanceSleeperSize1 });
      submitPowerAndVerifyToastMsg();
      waitSometime(shortWait);
      //Verify updated values
      verifyAttrText({ locator: drpDwnSleeperTypeTerm, attribute: attrValue, verifyText: drpDwnPowerGeneralAppearanceSleeperType1 });
      verifyAttrText({ locator: drpDwnAxleConfigurationTerm, attribute: attrValue, verifyText: drpDwnPowerGeneralAppearanceAxleConfig1 });
      verifyAttrText({ locator: drpDwnSuspensionTerm, attribute: attrValue, verifyText: drpDwnPowerGeneralAppearanceSuspension1 });
      verifyAttrText({ locator: drpDwnSleeperSizeDimensionsTerm, attribute: attrValue, verifyText: drpDwnPowerGeneralAppearanceSleeperSize1 });
    });
});