import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { getMinionValues, viewFullPage, clickAction, waitSometime, getTDMData, selectItemFromDropDown, verifyTextContains, clickWithWaits } from '../../../../../utilities/commonUtils/genericUtils';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import preferencesPage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
const { shortWait } = commonData;
const {
  errorMessageCommodityBanner,
  minionDriverPreferenceCommodity,
  minionDriverPreferenceCommodityReason,
  minionPreferencePreference,
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  tdmDriverData,
} = preferencesData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM, drpDwnPreferenceReason1, drpDwnPreferencePreference1, drpDwnPreferenceCommodity1;
describe('Driver general preference test cases| Assets-Driver | Regression | ME-46368', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    getMinionValues(minionDriverPreferenceCommodity, 4).then((resultOptions) => {
      drpDwnPreferenceCommodity1 = resultOptions[0];
    });
    getMinionValues(minionPreferencePreference, 3).then((resultOptions) => {
      drpDwnPreferencePreference1 = resultOptions[0];
    });
    getMinionValues(minionDriverPreferenceCommodityReason, 1).then((resultOptions) => {
      drpDwnPreferenceReason1 = resultOptions[0];
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-46368 Commodity Preference - Verify for No duplicate Commodity values',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      clickAction({ locator: preferencesPage.addcommodityPreferenceBtn });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodity, ddValue: drpDwnPreferenceCommodity1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityPreference, ddValue: drpDwnPreferencePreference1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityReason, ddValue: drpDwnPreferenceReason1 });
      clickAction({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.addcommodityPreferenceBtn });
      //Verify for No duplicate Commodity values
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodity, ddValue: drpDwnPreferenceCommodity1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityPreference, ddValue: drpDwnPreferencePreference1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityReason, ddValue: drpDwnPreferenceReason1 });
      clickAction({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      waitSometime(shortWait);
      verifyTextContains({ locator: preferencesPage.errorMessageCommodityTableBanner, containsText: errorMessageCommodityBanner });
    });
});