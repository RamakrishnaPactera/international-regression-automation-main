/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating driver fleet search
 Test Cases List
 Authored By : Sainath
 Date : 18-04-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils, dateTimeUtils
 Test case Included : ME-142201 : [FE]Driver Search - verify Wire up the Fleet search parameter to be a Carrier search that pulls active Fleet Relationships
                    : ME-74172 Verify Search Functionality by passing Fleet as search parameter
                    : ME-154343 Verify the search criteria fields Division Business Unit Fleet in Operational Details Card
                    : ME-154334 Verify the search functionality when driver is searched as according to fleet by giving the fleet in fleet search
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addDriver, navigateToDriverAddNewPage, searchDriverWithFleetAndVerify, createFleetToDriver } from '../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, getTDMData, verifyExists, verifyTextContains, viewFullPage, waitSometime } from '../../../../utilities/commonUtils/genericUtils';
import driverCommonPage from '../../../../pageObjects/assets/driver/driverCommonPage.json';
import generalData from '../../../../testData/assets/driver/driverDetails/general/generalData.json';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import generalPage from '../../../../pageObjects/assets/driver/driverDetails/general/generalPage.json';
import driverSearchPage from '../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import { returnfutureDateMMDDYY, returnPastDateWithFormat, returntodayDateMMDDYY } from '../../../../utilities/commonUtils/dateTimeUtils';

const { tdmCarrierDataType, tdmCarrierDataCondition, tdmCarrierDataScenario } = generalData.staticData;
const { tabDriverGeneral } = driverCommonPage;
const {
  shortWait,
} = commonData;
const {
  fleetShowInactiveChkBx,
  fleetTblFleetVal,
  fleetTblExpDateVal,
} = generalPage;
const {
  linkDriver,
} = driverSearchPage;
let carrierNameVal;
const futureDate = returnfutureDateMMDDYY({ dayCount: 2, monthCount: 2 });
const todayDate = returntodayDateMMDDYY();
const pastDateOne = returnPastDateWithFormat({ dayCount: 2, monthCount: 1, targetDateType: 'targetDateWithYear' });
const pastDateTwo = returnPastDateWithFormat({ dayCount: 1, monthCount: 1, targetDateType: 'targetDateWithYear' });
const pastDateTwoDDMMYY = returnPastDateWithFormat({ dayCount: 1, monthCount: 1, targetDateType: 'targetDateWithDDMMYY' });

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
describe('Validating driver fleet search  > Driver > Resources [ME-142201]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierDataType, dataCondition: tdmCarrierDataCondition, dataScenario: tdmCarrierDataScenario });
    cy.then(() => {
      const carrierDetails = Cypress.env('inputVal');
      carrierNameVal = carrierDetails.carrierName;
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-142201, ME-74172, ME-154343, ME-154334 : [FE]Driver Search - verify Wire up the Fleet search parameter to be a Carrier search that pulls active Fleet Relationships  > Driver > Resources |  Assets - Fleet search | Regression',
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
      //Create fleet to driver
      createFleetToDriver({ effectiveDate: todayDate, expirationDate: futureDate, carrierName: carrierNameVal });
      createFleetToDriver({ effectiveDate: pastDateOne, expirationDate: pastDateTwo, carrierName: carrierNameVal });
      //Verify fleet is displayed in search page
      searchDriverWithFleetAndVerify({ fleetName: carrierNameVal });
      clickAction({ locator: linkDriver });
      verifyExists({ element: tabDriverGeneral });
      clickAction({ locator: tabDriverGeneral });
      //Verify inactive fleets is displayed
      clickAction({ locator: fleetShowInactiveChkBx });
      waitSometime(shortWait);
      verifyTextContains({ locator: fleetTblFleetVal, containsText: carrierNameVal });
      verifyTextContains({ locator: fleetTblExpDateVal, containsText: pastDateTwoDDMMYY });
    });
});