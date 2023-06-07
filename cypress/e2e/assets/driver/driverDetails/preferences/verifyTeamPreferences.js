/*---------------------------------------------------------------------------------------------------------------
User can Team Preference - Verify whether the Team Preference card
Test Cases List               : [ME-52132, ME-152874, ME-152875, ME-152877, ME-152878, ME-152895, ME-152912, ME-152876, ME-152879, ME-153299, ME-156564]
Authored By                   : Lingaswamy Kottha
Date                          : 08-05-2023
Functions/Calling References  : homePage,commonData,trailerDetailsData,trailerPage,utilities
Test case Included            : Verify User able to add, edit and delete Team preference
----------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchDriverWithCode, navigateTeamPreference, addTeamPreference, editTeamPreference, deleteTeamPreference, verifyCreatedTeamPreference } from '../../../../../utilities/assetUtils/resourceUtilis';
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
describe('Career Goals - Functional Testcase [ME-52190, ME-137786, ME-151324, ME-151325, ME-151326, ME-151327, ME-151328, ME-151569, ME-151572, ME-153299, ME-156564]', () => {
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

  it('[ME-52132, ME-152874, ME-152875, ME-152877, ME-152878, ME-152895, ME-152912, ME-156564] Team Preference -Verify whether user can be able to add Team preferences',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      addTeamPreference(preferencesData.staticData.teamType, preferencesData.staticData.teamPreference, preferencesData.staticData.teamNotes);
    });
  it('[ME-152876] Team Preference - Verify Edit Team Preferences Functionality',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      addTeamPreference(preferencesData.staticData.teamType, preferencesData.staticData.teamPreference, preferencesData.staticData.teamNotes);
      editTeamPreference(preferencesData.staticData.teamType, preferencesData.staticData.teamPreference, preferencesData.staticData.teamNotes);
    });
  it('[ME-152879] Team Preference - Verify Delete Team Preferences',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      addTeamPreference(preferencesData.staticData.teamType, preferencesData.staticData.teamPreference, preferencesData.staticData.teamNotes);
      deleteTeamPreference();
    });
  it('[ME-153299] Team Preference - Verify updated date in Team Preferences record',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      addTeamPreference(preferencesData.staticData.teamType, preferencesData.staticData.teamPreference, preferencesData.staticData.teamNotes);
      verifyCreatedTeamPreference();
      deleteTeamPreference();
    });
});