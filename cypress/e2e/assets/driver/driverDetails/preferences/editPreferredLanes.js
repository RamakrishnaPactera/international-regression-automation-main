/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating edit preferred lanes
 Test Cases List
 Authored By : Mamatha Polapalli
 Date : 08-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-48400][ME-48399][ME-48165] [ME-137777] [ME-137780] : [FE]validate edit preferred lanes fields in preferences tab and verify date in date field > Driver > Resources > Driver
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addDriver, navigateToDriverAddNewPage, addPreferredLanes, editPreferrenceKabobMenu, editPreferredLanes } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, viewFullPage, getMinionValues, verifyExists, verifyAttrText } from '../../../../../utilities/commonUtils/genericUtils';
import preferencePage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencePage.json';
import { returntodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';

const {
  btnPreferedLanesPlusIcon,
  colLanesCurrentDate,
  tabPreferences,
} = preferencePage;
const {
  attrTitle,
} = historyData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const todayDate = returntodayDateMMDDYY();
let driverPreferrenceReason, driverPreferrenceLanes;
describe('Validating Edit preferred lanes  > Driver > Resources [ME-48400][ME-48399][ME-48165] [ME-137777] [ME-137780]', () => {
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
  it('[ME-48400,ME-48399,ME-48165,ME-137777,ME-137780] : [FE]verify if user can edit preferred lanes from > Driver > Resources |  Assets - Driver | Regression',
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
      clickAction({ locator: btnPreferedLanesPlusIcon });
      addPreferredLanes(driverPreferrenceLanes, driverPreferrenceReason);
      editPreferrenceKabobMenu();
      editPreferredLanes(driverPreferrenceLanes, driverPreferrenceReason);
      verifyAttrText({ locator: colLanesCurrentDate, attribute: attrTitle, verifyText: todayDate });
    });
});