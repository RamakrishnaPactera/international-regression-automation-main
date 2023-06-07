/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Test Power unit Appearance - UI and Functional Testcases
 Test Cases List
 Authored By                   : Pruthvirajg
 Date                          : 31-05-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils, resourceUtilis
 Test case Included            : [ME-160149, ME-160150, ME-160151, ME-160152, ME-160156, ME-160162, ME-160165, ME-160166, ME-160170, ME-160173, ME-160178, ME-160174, ME-31041]
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { createPowerWithMandatoryFields, navigateToAddPowerNewPage } from '../../../utilities/assetUtils/resourceUtilis';
import { getMinionValues, verifyElementTextContains, verifyIfEnabled, verifyMaxExactLength, verifySingleSelectDropDownFunction, viewFullPage } from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import addPowerPage from '../../../pageObjects/assets/power/addPower/addPowerPage.json';

const { appearanceLablesEleFirst, appearanceLablesEleSecond, txtExteriorColor, txtInteriorColor, drpDwnSleeperTypeTerm, drpDwnaxleConfigurationTerm, drpDwnSuspensionTerm, drpDwnSleeperSizeDimensionsTerm, labelAppearanceTab } = addPowerPage.appearance;
const { btnPowerSave } = addPowerPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const { appearanceLablesEle, appearanceLablesTxt, maxLength25, minionPowerSleeperTypeTerm, minionPowerGeneralAppearanceAxleConfig, minionSleeperSizeDimensionsTerm, minionPowerGeneralAppearanceSuspension, typeEmptyVal, titlAppearanceTab } = powerData.staticDataPower;
let drpDwnPowerSleeperTypeTerm, drpDwnPowerGeneralAppearanceAxleConfig, drpDwnPowerGeneralAppearanceSuspension, drpDwnPowerSleeperSizeDimensionsTerm;

describe('Test Power unit Appearance - UI and Functional Testcases [ME-160149, ME-160150, ME-160151, ME-160152, ME-160156, ME-160162, ME-160165, ME-160166, ME-160170, ME-160173, ME-160178, ME-160174]', () => {
  beforeEach(() => {
    getMinionValues(minionPowerSleeperTypeTerm, 2).then((resultOptions) => {
      drpDwnPowerSleeperTypeTerm = resultOptions;
    });
    getMinionValues(minionPowerGeneralAppearanceAxleConfig, 2).then((resultOptions) => {
      drpDwnPowerGeneralAppearanceAxleConfig = resultOptions;
    });
    getMinionValues(minionPowerGeneralAppearanceSuspension, 2).then((resultOptions) => {
      drpDwnPowerGeneralAppearanceSuspension = resultOptions;
    });
    getMinionValues(minionSleeperSizeDimensionsTerm, 3).then((resultOptions) => {
      drpDwnPowerSleeperSizeDimensionsTerm = resultOptions;
    });
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-160149, ME-160150, ME-160151, ME-160152, ME-160156, ME-160162, ME-160165, ME-160166, ME-160170, ME-160173, ME-160178, ME-160174, ME-31041 - Test Power unit Appearance - UI and Functional Testcases > Resources |  Assets - Power | Regression',
    {
      tags: ['@assets', '@resources', '@power', '@p2'],
    }, () => {
      navigateToAddPowerNewPage();
      createPowerWithMandatoryFields();
      verifyIfEnabled({ locator: btnPowerSave });
      verifyElementTextContains({ locator: labelAppearanceTab, verifyText: titlAppearanceTab });
      appearanceLablesEle.forEach((element, index) => {
        verifyElementTextContains({ locator: `${appearanceLablesEleFirst}${element}${appearanceLablesEleSecond}`, verifyText: appearanceLablesTxt[index] });
      });
      verifyMaxExactLength({ locator: txtExteriorColor, maxLength: maxLength25 });
      verifyMaxExactLength({ locator: txtInteriorColor, maxLength: maxLength25 });
      drpDwnPowerSleeperTypeTerm.unshift(typeEmptyVal);
      verifySingleSelectDropDownFunction({ drpDwnEle: drpDwnSleeperTypeTerm, drpDwnOptions: drpDwnPowerSleeperTypeTerm });
      drpDwnPowerGeneralAppearanceAxleConfig.unshift(typeEmptyVal);
      verifySingleSelectDropDownFunction({ drpDwnEle: drpDwnaxleConfigurationTerm, drpDwnOptions: drpDwnPowerGeneralAppearanceAxleConfig });
      drpDwnPowerGeneralAppearanceSuspension.unshift(typeEmptyVal);
      verifySingleSelectDropDownFunction({ drpDwnEle: drpDwnSuspensionTerm, drpDwnOptions: drpDwnPowerGeneralAppearanceSuspension });
      drpDwnPowerSleeperSizeDimensionsTerm.unshift(typeEmptyVal);
      verifySingleSelectDropDownFunction({ drpDwnEle: drpDwnSleeperSizeDimensionsTerm, drpDwnOptions: drpDwnPowerSleeperSizeDimensionsTerm });
    });
});