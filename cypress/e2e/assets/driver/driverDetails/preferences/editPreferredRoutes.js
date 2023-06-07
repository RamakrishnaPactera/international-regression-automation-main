/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating add preferred routes in driver - preferrences tab
 Test Cases List  :
 Authored By : Mamatha Polapalli
 Date : 08-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included :[ME-50425][ME-50426][ME-48492][ME-137738][ME-137742] : [FE]validate edit preferred route fields and also verify date field in preferences tab > Driver > Resources > Driver Tab
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addDriver, navigateToDriverAddNewPage, addPreferredRoutes, editPreferredRoutes } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, viewFullPage, getMinionValues, verifyExists, verifyAttrText } from '../../../../../utilities/commonUtils/genericUtils';
import preferencePage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencePage.json';
import { returntodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';

const {
  btnPreferredRoutesAddIcon,
  btnPreferredRoutesKabob,
  btnKabobEdit,
  btnCloseIcon,
  colRoutesDate,
  tabPreferences,
} = preferencePage;
const {
  attrTitle,
} = historyData.staticData;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const todayDate = returntodayDateMMDDYY();
let driverPreferrenceReason, driverPreferrenceLanes;
describe('Validating edit preferred route and verify date field > Driver > Resources [ME-50425][ME-50426][ME-48492][ME-137738][ME-137742]', () => {
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
  it('[ME-50425, ME-50426, ME-48492, ME-137738, ME-137742]: [FE]verify if user can edit preferred route and also verify date field from > Driver > Resources |  Assets - Driver | Regression',
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
      //Adding new preferred route record
      addPreferredRoutes(driverPreferrenceLanes, driverPreferrenceReason);
      //edit existing preferred route record
      clickAction({ locator: btnPreferredRoutesKabob });
      clickAction({ locator: btnKabobEdit });
      editPreferredRoutes();
      clickAction({ locator: btnCloseIcon });
      verifyAttrText({ locator: colRoutesDate, attribute: attrTitle, verifyText: todayDate });
    });
});