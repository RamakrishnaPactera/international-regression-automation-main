/*---------------------------------------------------------------------------------------------------------------
User can Commodity Preferences - Verify whether the Commodity Preferences card
Test Cases List               : [ME-52134, ME-153403]
Authored By                   : Lingaswamy Kottha
Date                          : 09-05-2023
Functions/Calling References  : genericUtils,loginUtils,preferencesData,preferencesPage,resourceUtilis
Test case Included            : Verify User able to add, edit Commodity Preferences
----------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  searchDriverWithCode, navigateTeamPreference,
  editCommodityPreference,
  verifyGrayBarPreferenceIcons, addCommodityPreference,
} from '../../../../../utilities/assetUtils/resourceUtilis';
import { viewFullPage, clickAction, getTDMData } from '../../../../../utilities/commonUtils/genericUtils';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import preferencesPage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
const {
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddDriverReq,
} = preferencesData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

let driverDataTDM;
describe('Commodity Preferences - Functional Testcase [[ME-52134, ME-153403, ME-137795]]', () => {
  beforeEach(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });

  it('[ME-52134][ME-137795] Commodity Preferences -Verify whether user can be able to add Commodity Preferences and Gray Bar Preference icons ',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      //navigateTeamPreference();
      verifyGrayBarPreferenceIcons();
      addCommodityPreference(preferencesData.staticData.commodity, preferencesData.staticData.teamPreference, preferencesData.staticData.reason);
      verifyGrayBarPreferenceIcons();
    });
  it('[ME-153403, ME-137794] Commodity Preferences - Verify Edit Commodity Preferences Functionality',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      addCommodityPreference(preferencesData.staticData.commodity, preferencesData.staticData.teamPreference, preferencesData.staticData.reason);
      verifyGrayBarPreferenceIcons();
      editCommodityPreference(preferencesData.staticData.commodity, preferencesData.staticData.teamPreference, preferencesData.staticData.reason);
      verifyGrayBarPreferenceIcons();
    });
});