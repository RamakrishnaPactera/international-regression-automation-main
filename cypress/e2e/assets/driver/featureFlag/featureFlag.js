/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Validating driver options and tabs based on feature flag status
Test Cases List
Authored By : Dasari Santhosh,Sanjeev Bandari
Date : 18-04-2023,
Functions/Calling References : genericUtils, loginUtils, resourceUtils
Test case Included :  ME-138958 [FE] Driver - Verify whether user is able to see Driver Add new options under resource menu when the Feature Flag is Disable > Resources |  Assets - Driver General Tab | Regression
											ME-138955 [FE] Driver - Verify whether user is able to see Driver Add new and Search options under resource menu when the Feature Flag is Enabled > Resources |  Assets - Driver General Tab | Regression
											ME-138964 [FE] Driver - Verify whether user is able to see general and operations tabs when Feature Flag is Enabled > Resources |  Assets - Driver General Tab | Regression
											ME-139491 [FE] Driver - Verify whether user is able to see Driver Add new options under resource menu when the Feature Flag is Disable > Resources |  Assets - Driver General Tab | Regression
                      ME-139494 Verify feature flags for General, operations, History, and Preferences are DISABLED > Resources |  Assets - Driver General Tab | Regression
                      ME-139160 Test [FE] - Driver- Verify the Preferences Tabs in Driver Search when the Feature Flag is Enabled> Resources |  Assets - Driver General Tab | Regression
                      ME-139163 Test [FE] - Driver- Verify the Preferences Tabs in Driver Search when the Feature Flag is Disabled> Resources |  Assets - Driver General Tab | Regression
                      ME-139181 Test [FE] - Driver - Verify the Targets and Performance Tabs in Driver Search when the Feature Flag is Enabled> Resources |  Assets - Driver General Tab | Regression
                      ME-139182 Test [FE] - Driver - Verify the Targets and Performance Tabs in Driver Search when the Feature Flag is Disabled> Resources |  Assets - Driver General Tab | Regression
                      ME-139196 [FE] Driver - Verify whether user is able to see history tab when Feature Flags(General, operations, Targets & Performances and Preferences) being DISABLED
                      ME-139135 [FE] Driver - Verify whether user is able to see history tab when the Feature Flag is Enabled> Resources |  Assets - Driver General Tab | Regression
                      ME-139139 [FE] Driver - Verify whether user is not able to see history tab when the Feature Flag is Disabled> Resources |  Assets - Driver General Tab | Regression
                      ME-139185 Test [FE] - Driver - Verify the Targets and Performance Tabs in Driver Search on INTERNAL Environment> Resources |  Assets - Driver General Tab | Regression
                      ME-139171 Test [FE] - Driver - Verify the Preferences Tabs in Driver Search on INTERNAL Environment> Resources |  Assets - Driver General Tab | Regression
                      ME-156601 Test [FE] - DriverHOS - Verify the Hos Summary Card when FF is enabled > Resources |  Assets - Driver Operations Tab | Regression
                      ME-156602 Test [FE] - DriverHOS - Verify the Hos Summary Card when FF is disabled > Resources |  Assets - Driver Operations Tab | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchDriverWithCode } from '../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, clickActionWait, updateUrlWithFF, verifyAttrText, verifyToNotExist, verifyVisible, viewFullPage } from '../../../../utilities/commonUtils/genericUtils';
import driverCommonPage from '../../../../pageObjects/assets/driver/driverCommonPage.json';
import generalData from '../../../../testData/assets/driver/driverDetails/general/generalData.json';
import homePage from '../../../../pageObjects/homePage/homePage.json';

const { driverCode } = generalData.userDefinedData;
const { resourcesMenu, masteryLogo } = homePage;
const { driverNew, driverSearch } = homePage.resourcesDDO;
const { viewDriverRecordEnableFF, viewDriverRecordDisableFF, viewDriverPreferencesEnableFF, viewDriverPreferencesDisableFF, viewDriverRecordTargetsAndPerformanceEnableFF, viewDriverRecordTargetsAndPerformanceDisableFF, viewDriverRecordPreferencesHistoryDisableFF, viewDriverPreferenceRecordHistoryDriverRecordDisableFF, viewDriverRecordHistoryEnableFF, viewDriverRecordHistoryDisableFF, viewDriverPreferenceRecordHistoryDriverRecordTargetsDisableFF, viewDriverHOSSummaryCardEnableFF, viewDriverHOSSummaryCardDisableFF } = generalData.staticData;
const { tabDriverGeneral, tabDriverOperations, tabDriverDriverPay, tabDriverPreferences, tabDriverTargetsPerformance, tabDriverHistory, cardDriverHOSSummmary } = driverCommonPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Validating driver options and tabs based on feature flag status > Driver > Resources [ME-138958,ME-138955,ME-138964,ME-139491,ME-139494,ME-139160,ME-139163,ME-139181,ME-139182,ME-139196,ME-139135,ME-139139,ME-139185,ME-139171]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-138958 [FE] Driver - Verify whether user is able to see Driver Add new options under resource menu when the Feature Flag is Disable > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverRecordDisableFF });
      verifyVisible({ element: resourcesMenu });
      clickAction({ locator: resourcesMenu });
      verifyVisible({ element: driverSearch });
      verifyToNotExist({ element: driverNew });
    });
  it('ME-138955 [FE] Driver - Verify whether user is able to see Driver Add new and Search options under resource menu when the Feature Flag is Enabled > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverRecordEnableFF });
      verifyVisible({ element: resourcesMenu });
      clickAction({ locator: resourcesMenu });
      verifyVisible({ element: driverSearch });
      verifyVisible({ element: driverNew });
    });
  it('ME-138964 [FE] Driver - Verify whether user is able to see general and operations tabs when Feature Flag is Enabled > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverRecordEnableFF });
      searchDriverWithCode({ driverCode });
      verifyVisible({ element: tabDriverGeneral });
      verifyVisible({ element: tabDriverOperations });
    });
  it('ME-139491 [FE] Driver - Verify whether user is able to see Driver Add new options under resource menu when the Feature Flag is Disable > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverRecordDisableFF });
      clickAction({ locator: resourcesMenu });
      verifyToNotExist({ element: driverNew });
      clickAction({ locator: resourcesMenu });
      searchDriverWithCode({ driverCode });
      verifyAttrText({ locator: tabDriverDriverPay, attribute: 'aria-current', verifyText: 'page' });
    });
  it('ME-139494 Verify feature flags for General, operations, History, and Preferences are DISABLED > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverPreferenceRecordHistoryDriverRecordDisableFF });
      clickAction({ locator: resourcesMenu });
      verifyToNotExist({ element: driverNew });
      clickAction({ locator: resourcesMenu });
      searchDriverWithCode({ driverCode });
      verifyVisible({ element: tabDriverDriverPay });
    });
  it('ME-139160 Test [FE] - Driver- Verify the Preferences Tabs in Driver Search when the Feature Flag is Enabled> Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverPreferencesEnableFF });
      searchDriverWithCode({ driverCode });
      //User should be able to see the Preferences Tabs When the feature flag is enabled
      verifyVisible({ element: tabDriverPreferences });
    });
  it('ME-139163 Test [FE] - Driver- Verify the Preferences Tabs in Driver Search when the Feature Flag is Disabled> Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverPreferencesDisableFF });
      searchDriverWithCode({ driverCode });
      //User should NOT be able to see the Preferences Tab When the feature flag is disabled
      verifyToNotExist({ element: tabDriverPreferences });
    });

  it('ME-139181 Test [FE] - Driver - Verify the Targets and Performance Tabs in Driver Search when the Feature Flag is Enabled> Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverRecordTargetsAndPerformanceEnableFF });
      searchDriverWithCode({ driverCode });
      //User should be able to see the Targets and Performance Tabs When the feature flag is enabled
      verifyVisible({ element: tabDriverTargetsPerformance });
    });

  it('ME-139182 Test [FE] - Driver - Verify the Targets and Performance Tabs in Driver Search when the Feature Flag is Disabled> Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverRecordTargetsAndPerformanceDisableFF });
      searchDriverWithCode({ driverCode });
      //should NOT be able to see the Targets and Performance Tab
      verifyToNotExist({ element: tabDriverTargetsPerformance });
    });

  it('ME-139196 [FE] Driver - Verify whether user is able to see history tab when Feature Flags(General, operations, Targets & Performances and Preferences) being DISABLED> Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverRecordPreferencesHistoryDisableFF });
      searchDriverWithCode({ driverCode });
      //driver pay tab should be display and user should land in same tab
      verifyVisible({ element: tabDriverDriverPay });
    });
  it('ME-139135 [FE] Driver - Verify whether user is able to see history tab when the Feature Flag is Enabled> Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverRecordHistoryEnableFF });
      searchDriverWithCode({ driverCode });
      //History tab should be display in driver page
      verifyVisible({ element: tabDriverHistory });
    });

  it('ME-139139 [FE] Driver - Verify whether user is not able to see history tab when the Feature Flag is Disabled> Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverRecordHistoryDisableFF });
      searchDriverWithCode({ driverCode });
      //History tab should not be display in driver page and remaining tabs should display in default same order
      verifyToNotExist({ element: tabDriverHistory });
    });

  it('ME-139196 [FE] Driver - Verify whether user is able to see history tab when Feature Flags(General, operations, Targets & Performances and Preferences) being DISABLED Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverPreferenceRecordHistoryDriverRecordTargetsDisableFF });
      searchDriverWithCode({ driverCode });
      //driver pay tab should be display and user should land in same tab
      verifyVisible({ element: tabDriverDriverPay });
    });

  it('ME-139185 Test [FE] - Driver - Verify the Targets and Performance Tabs in Driver Search on INTERNAL Environment> Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverRecordTargetsAndPerformanceEnableFF });
      searchDriverWithCode({ driverCode });
      //should be able to see the Targets and Performance Tab
      verifyVisible({ element: tabDriverTargetsPerformance });
    });

  it('ME-139171 Test [FE] - Driver - Verify the Preferences Tabs in Driver Search on INTERNAL Environment> Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverPreferencesEnableFF });
      searchDriverWithCode({ driverCode });
      //User should be able to see the Preferences Tabs by default
      verifyVisible({ element: tabDriverPreferences });
    });

  it('ME-156601 Test [FE] - DriverHOS - Verify the Hos Summary Card when FF is enabled > Resources |  Assets - Driver Operations Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driverHOS',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverHOSSummaryCardEnableFF });
      searchDriverWithCode({ driverCode });
      //User should be able to see the Driver HOS Summary Card in Operations Tab
      verifyVisible({ element: cardDriverHOSSummmary });
    });

  it('ME-156602 Test [FE] - DriverHOS - Verify the Hos Summary Card when FF is disabled > Resources |  Assets - Driver Operations Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driverHOS',
        '@p2',
      ],
    },
    () => {
      clickActionWait({ locator: masteryLogo });
      updateUrlWithFF({ flag: viewDriverHOSSummaryCardDisableFF });
      searchDriverWithCode({ driverCode });
      //User should not be able to see the Driver HOS Summmary Card in Operations Tab
      verifyToNotExist({ element: cardDriverHOSSummmary });
    });
});