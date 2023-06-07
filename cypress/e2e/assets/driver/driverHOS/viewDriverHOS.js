/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Driver HOS Availability: UI Testcase
Test Cases List
Authored By : Navya Sai Aluri
Date : 23-05-2023,
Functions/Calling References : genericUtils, loginUtils, resourceUtils
Test case Included:
ME-156628 : Verify if the user is able to view HOS empty grids with column names for Recap Data in HOS Summary Card

 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchDriverWithCode } from '../../../../utilities/assetUtils/resourceUtilis';
import { verifyVisible, viewFullPage, getTDMData, clickActionWait, updateUrlWithFF } from '../../../../utilities/commonUtils/genericUtils';
import operationsPage from '../../../../pageObjects/assets/driver/driverDetails/operations/operationsPage.json';
import generalData from '../../../../testData/assets/driver/driverDetails/general/generalData.json';
import addDriverData from '../../../../testData/assets/driver/addDriver/addDriverData.json';
import homePage from '../../../../pageObjects/homePage/homePage.json';
import driverCommonPage from '../../../../pageObjects/assets/driver/driverCommonPage.json';
import * as genericUtils from '../../../../utilities/commonUtils/genericUtils';

const { masteryLogo } = homePage;
const { tdmDriverCommonScenario, tdmDriverData, tdmAddDriverReq } = addDriverData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const { hosCycleRecap, hosSummary, hosHistory } = operationsPage;
const { viewDriverHOSSummaryCardEnableFF } = generalData.staticData;
const { cardDriverHOSSummmary } = driverCommonPage;

let driverDataTDM;

describe('Driver HOS Availability: Functional & UI Testcases', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });

  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('[ME-156628] Verify if the user is able to view HOS empty grids with column names for Recap Data in HOS Summary Card',
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
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //User should be able to see the Driver HOS Summary Card in Operations Tab
      verifyVisible({ element: cardDriverHOSSummmary });
      //verify fields exist
      verifyVisible({ element: hosSummary.btnSummary });
      verifyVisible({ element: hosHistory.btnHistory });
      verifyVisible({ element: hosCycleRecap.btnCycleRecap });
      genericUtils.scrollIntoView({ locator: hosCycleRecap.colHdrDriving });
      verifyVisible({ element: hosCycleRecap.colHdrDriving });
      verifyVisible({ element: hosCycleRecap.colHdrOffDuty });
      verifyVisible({ element: hosCycleRecap.colHdrBreak });
      verifyVisible({ element: hosCycleRecap.colHdrOnDuty });
      verifyVisible({ element: hosCycleRecap.lblRuleSet });
      verifyVisible({ element: hosCycleRecap.lblLastUpdated });
      verifyVisible({ element: hosCycleRecap.lblTotalOnDuty });
    });
});