/*---------------------------------------------------------------------------------------------------------------
User can Operational Preferences - Verify whether the Operational Preferences card
Test Cases List               : [ME-153493, ME-154607, ME-154608, ME-154610, ME-154611, ME-154614, ME-154615, ME-153395, ME-154616, ME-154612,ME-137790]
Authored By                   : Lingaswamy Kottha
Date                          : 09-05-2023
Functions/Calling References  : genericUtils,loginUtils,preferencesData,preferencesPage,resourceUtilis
Test case Included            : Verify User able to add, edit Operational Preferences
---------------------------------------------------------------------------------------------------------
Authored By                   : Shashi Jaiswal
Date                          : 15-05-2023
Test case Included            : ME-53572, Test Remove Alcohol from Operational Preference - Functional test case
----------------------------------------------------------------------------------------------------------
Authored By                   : Mamatha Polapalli
Date                          : 23-05-2023
Test case Included            : ME-137792, Operational Preferences - Regression - UI Testcase
----------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  searchDriverWithCode, navigateTeamPreference, verifyCreatedTeamPreference,
  editOperationalPreference, deleteTeamPreference,
  verifyGrayBarPreferenceIcons, addOperationalPreference,
} from '../../../../../utilities/assetUtils/resourceUtilis';
import { viewFullPage, clickAction, getTDMData, verifyDrpdwnExcludesValue, verifyToolTips, dropDownContainsTextClick, getText } from '../../../../../utilities/commonUtils/genericUtils';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import preferencesPage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import dayjs from 'dayjs';

const {
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddDriverReq,
  drpDwnTxtAlcohol,
} = preferencesData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

let driverDataTDM, documentDate;
describe('Operational Preferences - Functional Testcase [ME-153493, ME-153395, ME-53572, ME-137792]', () => {
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

  it('[ME-153493, ME-154607, ME-154608, ME-154610, ME-154611, ME-154614, ME-154615,ME-137790] Operational Preferences -Verify whether user can be able to add Operational Preferences and Gray Bar Preference icons ',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      //navigateTeamPreference();
      verifyGrayBarPreferenceIcons();
      addOperationalPreference(preferencesData.staticData.operationalType, preferencesData.staticData.teamPreference, preferencesData.staticData.teamNotes);
      verifyGrayBarPreferenceIcons();
    });
  it('[ME-153395] Operational Preferences - Verify Edit Operational Preferences Functionality',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      addOperationalPreference(preferencesData.staticData.operationalType, preferencesData.staticData.teamPreference, preferencesData.staticData.teamNotes);
      verifyGrayBarPreferenceIcons();
      editOperationalPreference(preferencesData.staticData.operationalType, preferencesData.staticData.teamPreference, preferencesData.staticData.teamNotes);
      verifyGrayBarPreferenceIcons();
    });
  it('[ME-154616, ME-154612] Operational Preferences - Verify Edit Operational Preferences Functionality',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      addOperationalPreference(preferencesData.staticData.operationalType, preferencesData.staticData.teamPreference, preferencesData.staticData.teamNotes);
      verifyCreatedTeamPreference();
      verifyGrayBarPreferenceIcons();
      verifyGrayBarPreferenceIcons();
      deleteTeamPreference();
    });
  it('ME-53572, Test Remove Alcohol from Operational Preference - Functional test case',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      clickAction({ locator: preferencesPage.btnOperationalPreferences });
      verifyDrpdwnExcludesValue({ element: preferencesPage.drpDwnType, exactText: drpDwnTxtAlcohol });
      clickAction({ locator: preferencesPage.btnCloseIcon });
    });
  it('ME-137792, Operational Preferences - Regression - UI Testcase',
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      clickAction({ locator: preferencesPage.btnOperationalPreferences });
      verifyToolTips({ locator: preferencesPage.operationalPref.typeToolTip, verifyText: preferencesData.staticData.typeToolTip });
      verifyToolTips({ locator: preferencesPage.operationalPref.preferenceToolTip, verifyText: preferencesData.staticData.preferenceToolTip });
      dropDownContainsTextClick({
        element: preferencesPage.drpTeamPreferenceType,
        typeText: preferencesData.staticData.operationalType,
        exactText: preferencesData.staticData.operationalType,
      });
      dropDownContainsTextClick({
        element: preferencesPage.drpTeamPreferencePreference,
        typeText: preferencesData.staticData.teamPreference,
        exactText: preferencesData.staticData.teamPreference,
      });
      clickAction({ locator: preferencesPage.btnTeamPreferenceSave });
      getText({ locator: preferencesPage.operationalPref.colDate });
      cy.then(() => {
        documentDate = Cypress.env('inputValue'); //date format from is UI-example-05/10/23
        const parsed = dayjs(documentDate, 'MM/DD/YY');
        expect(parsed.format('MM/DD/YY')).to.eq(documentDate);
      });
    });
});