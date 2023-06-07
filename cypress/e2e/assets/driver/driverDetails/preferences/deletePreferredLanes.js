/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating delete preferred lanes
 Test Cases List
 Authored By : Mamatha Polapalli
 Date : 08-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-48929][ME-48930] [ME-137779]: [FE]validate delete preferred lanes fields in preferences tab > Driver > Resources > Driver
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addDriver, navigateToDriverAddNewPage, addPreferredLanes, deletePreferredLanes } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, viewFullPage, getMinionValues, verifyExists, verifyAttrText } from '../../../../../utilities/commonUtils/genericUtils';
import preferencePage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencePage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import { returntodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';

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
describe('Validating delete preferred lanes  > Driver > Resources [ME-48929][ME-48930] [ME-137779]', () => {
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
  it('[ME-48929,ME-48930,ME-137779] : [FE]verify if user can delete preferred lanes from > Driver > Resources |  Assets - Driver | Regression',
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
      verifyAttrText({ locator: colLanesCurrentDate, attribute: attrTitle, verifyText: todayDate });
      deletePreferredLanes();
    });
});