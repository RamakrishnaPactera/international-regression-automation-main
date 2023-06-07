/*---------------------------------------------------------------------------------------------------------------
User can Facility Preference - Verify whether the Facility Preference card
Test Cases List               : [ME-153774, ME-153779, ME-153787, ME-153792, ME-153798, ME-153804, ME-153765, ME-153806, ME-153780, ME-153812, ME-156564, ME-137806, ME-137808]
Authored By                   : Lingaswamy Kottha
Date                          : 10-05-2023
Functions/Calling References  : loginUtils,resourceUtilis,genericUtils,preferencesPage
Test case Included            : Verify User able to add, edit and delete Facility Preference
----------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchDriverWithCode, navigateTeamPreference, addFacilityPreference, editFacilityPreference, deleteTeamPreference, verifyCreatedTeamPreference } from '../../../../../utilities/assetUtils/resourceUtilis';
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
describe('Career Goals - Functional Testcase [ME-153774, ME-153779, ME-153787, ME-153792, ME-153798, ME-153804, ME-153765, ME-153806, ME-153780, ME-153812,ME-156564, ME-137806, ME-137808]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });

  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });

  it('[ME-153774, ME-153779, ME-153787, ME-153792, ME-153798, ME-153804, ME-156564, ME-137806] Facility Preference -Verify whether user can be able to add Facility Preferences',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      addFacilityPreference(preferencesData.staticData.facility, preferencesData.staticData.teamPreference, preferencesData.staticData.reason);
    });
  it('[ME-153765, ME-153806, ME-137806] Facility Preference - Verify Edit Facility Preferences Functionality',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      addFacilityPreference(preferencesData.staticData.facility, preferencesData.staticData.teamPreference, preferencesData.staticData.reason);
      editFacilityPreference(preferencesData.staticData.facility, preferencesData.staticData.teamPreference, preferencesData.staticData.reason);
    });
  it('[ME-153780, ME-137806] Facility Preference - Verify Delete Facility Preferences',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      addFacilityPreference(preferencesData.staticData.facility, preferencesData.staticData.teamPreference, preferencesData.staticData.reason);
      deleteTeamPreference();
    });
  it('[ME-153812, ME-137808] Facility Preference - Verify updated date format in Facility Preferences record',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      addFacilityPreference(preferencesData.staticData.facility, preferencesData.staticData.teamPreference, preferencesData.staticData.reason);
      verifyCreatedTeamPreference();
      deleteTeamPreference();
    });
});