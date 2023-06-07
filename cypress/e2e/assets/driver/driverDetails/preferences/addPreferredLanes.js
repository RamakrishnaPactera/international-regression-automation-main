/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating add preferred lanes
 Test Cases List
 Authored By : Mamatha Polapalli
 Date : 04-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-151921][ME-48166][ME-151981][ME-152000][ME-152003] : [FE]validate add preferred lanes fields in preferences tab > Driver > Resources > Driver
                    : [ME-151926][ME-152013][ME-151989][ME-151990][ME-151993][ME-151999] [ME-137768]: [FE]validate adding preferred lanes in preferences tab > Driver > Resources > Driver
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addDriver, navigateToDriverAddNewPage, addPreferredLanes, verifyAddedPreferredLanes, verifyPreferenceAndReason } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, viewFullPage, getMinionValues, verifyExists } from '../../../../../utilities/commonUtils/genericUtils';
import preferencePage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencePage.json';

const {
  btnPreferedLanesPlusIcon,
  tabPreferences,
} = preferencePage;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverPreferrenceReason, driverPreferrenceLanes;
describe('Validating add preferred lanes  > Driver > Resources [ME-142201] [ME-137768]', () => {
  beforeEach(() => {
    getMinionValues('driverPreferenceCareerGoalReason', 1).then((resultOptions) => {
      driverPreferrenceReason = resultOptions[0];
    });
    getMinionValues('driverPreferencePreference', 1).then((preferenceLanes) => {
      driverPreferrenceLanes = preferenceLanes[0];
    });
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-48166,ME-151981] : [FE]verify if user can view add preferred lanes modal from > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //Add new Driver
      navigateToDriverAddNewPage();
      addDriver();
      clickAction({ locator: tabPreferences });
      verifyExists({ element: btnPreferedLanesPlusIcon });
    });
  it('[ME-152003,ME-152000,ME-151985] : [FE]verify if user can view add preferred lanes modal from > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //Add new Driver
      navigateToDriverAddNewPage();
      addDriver();
      clickAction({ locator: tabPreferences });
      clickAction({ locator: btnPreferedLanesPlusIcon });
      verifyPreferenceAndReason();
    });
  it('[ME-151989,ME-151990,ME-151993,ME-151921,ME-151926,ME-137768] : [FE]verify if user can add preferred route in > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //Add new Driver
      navigateToDriverAddNewPage();
      addDriver();
      clickAction({ locator: tabPreferences });
      clickAction({ locator: btnPreferedLanesPlusIcon });
      addPreferredLanes(driverPreferrenceLanes, driverPreferrenceReason);
      verifyAddedPreferredLanes();
    });
});