/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating view added preferred route in driver - preferrences tab
 Test Cases List  :
 Authored By : Mamatha Polapalli
 Date : 08-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included :[ME-49262]: [FE]validate view preferred route fields in preferences tab > Driver > Resources > Driver Tab
                     [ME-137740]: Preferred Routes View - Regression- Functional Testcase > Driver > Resources > Driver Tab
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addDriver, navigateToDriverAddNewPage, addPreferredRoutes, viewPreferredRoutes } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, viewFullPage, getMinionValues, verifyExists } from '../../../../../utilities/commonUtils/genericUtils';
import preferencePage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencePage.json';

const {
  btnPreferredRoutesAddIcon,
  btnPreferredRoutesKabob,
  btnPreferredRoutesView,
  tabPreferences,
} = preferencePage;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverPreferrenceReason, driverPreferrenceLanes;
describe('Validating view preferred route field data > Driver > Resources [ME-49262, ME-137740]', () => {
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
  it('[ME-49262, ME-137740]: [FE]verify if user can view add preferred route field values from > Driver > Resources |  Assets - Driver | Regression',
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
      clickAction({ locator: btnPreferredRoutesAddIcon });
      addPreferredRoutes(driverPreferrenceLanes, driverPreferrenceReason);
      clickAction({ locator: btnPreferredRoutesKabob });
      clickAction({ locator: btnPreferredRoutesView });
      viewPreferredRoutes(driverPreferrenceLanes, driverPreferrenceReason);
    });
});