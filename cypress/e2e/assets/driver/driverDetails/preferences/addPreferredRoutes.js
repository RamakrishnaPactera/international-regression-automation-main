/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating add preferred routes in driver - preferrences tab
 Test Cases List  :  [ME-48943,ME-151949,ME-152011,ME-152119,ME-151948,[ME-151958,ME-152013,ME-151957,ME-152016,ME-152015,ME-152014]
 Authored By : Mamatha Polapalli
 Date : 04-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included :[ME-48943][ME-151949][ME-152011][ME-152119][ME-151948][ME-156569] : [FE]validate add preferred route fields in preferences tab > Driver > Resources > Driver Tab
                    :[ME-151958][ME-152013][ME-151957][ME-152016][ME-152015][ME-152014][ME-137744]: [FE]validate adding preferred route in preferences tab > Driver > Resources > Driver Tab
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addDriver, navigateToDriverAddNewPage, verifyPreferenceAndReason, addPreferredRoutes, verifyAddedPreferredRoutes, verifyAdditionalStopsToolTip } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, viewFullPage, getMinionValues, verifyExists } from '../../../../../utilities/commonUtils/genericUtils';
import preferencePage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencePage.json';

const {
  btnPreferredRoutesAddIcon,
  tabPreferences,
} = preferencePage;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverPreferrenceReason, driverPreferrenceLanes;
describe('Validating add preferred route  > Driver > Resources [ME-142201,ME-156569]', () => {
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
  it('[ME-48943, ME-151949,ME-156569]: [FE]verify if user can view add preferred route modal from > Driver > Resources |  Assets - Driver | Regression',
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
      verifyExists({ element: btnPreferredRoutesAddIcon });
    });
  it('[ME-152011,ME-151958]: [FE]verify if user can view add preferred route modal from > Driver > Resources |  Assets - Driver | Regression',
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
      clickAction({ locator: btnPreferredRoutesAddIcon });
      verifyAdditionalStopsToolTip();
    });
  it('[ME-152014,ME-152009]: [FE]verify if user can view add preferred route modal from > Driver > Resources |  Assets - Driver | Regression',
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
      clickAction({ locator: btnPreferredRoutesAddIcon });
      verifyPreferenceAndReason();
    });
  it('[ME-152013,ME-152016,ME-151957,ME-151948,ME-137744]: [FE]verify if user can add preferred route in > Driver > Resources |  Assets - Driver | Regression',
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
      clickAction({ locator: btnPreferredRoutesAddIcon });
      addPreferredRoutes(driverPreferrenceLanes, driverPreferrenceReason);
      verifyAddedPreferredRoutes();
    });
});