/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating driver fleet search for different places
 Test Cases List             : [ME-74165, ME-74171, ME-74166, ME-74168, ME-74170]
 Authored By                 : Lingaswamy Kottha
 Date                        : 11-05-2023,
 Functions/Calling References: genericUtils, loginUtils, resourceUtils, dateTimeUtils
 Test case Included          : [ME-74165, ME-74171, ME-74166, ME-74168, ME-74170]
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addDriver, navigateToDriverAddNewPage, searchDriverWithCode, createFleetToDriver, driverSaveAndVerifyUpdatedMsg } from '../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, getTDMData, viewFullPage, waitSometime, getMinionValues, typeDrpDwnWithMachtingText, typeDropDwnClick, verifyIfEnabled, clickActionWait, verifyIfDisabled } from '../../../../utilities/commonUtils/genericUtils';
import driverCommonPage from '../../../../pageObjects/assets/driver/driverCommonPage.json';
import generalData from '../../../../testData/assets/driver/driverDetails/general/generalData.json';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import { returnfutureDateMMDDYY, returntodayDateMMDDYY } from '../../../../utilities/commonUtils/dateTimeUtils';
import preferencesData from '../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import preferencesPage from '../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
const { tdmCarrierDataType, tdmCarrierDataCondition, tdmCarrierDataScenario } = generalData.staticData;
const { tabDriverGeneral } = driverCommonPage;
const { careerGoals } = preferencesPage;
const {
  shortWait,
} = commonData;
let carrierNameVal;
const futureDate = returnfutureDateMMDDYY({ dayCount: 2, monthCount: 2 });
const todayDate = returntodayDateMMDDYY();
const {
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddDriverReq,
  minionDrvrPreference,
  minionLoadDivision,
  minionGoalPreference,
  minionRoutesReason,
} = preferencesData.expectedData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let driverDataTDM, drpDwnPositionData, drpDwnDivisionData, drpDwnPreferenceData, drpDwnReasonData;
describe('Validating driver fleet Add, search  > Driver > Resources [[ME-74165, ME-74171, ME-74166, ME-74168, ME-74170]]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierDataType, dataCondition: tdmCarrierDataCondition, dataScenario: tdmCarrierDataScenario });
    cy.then(() => {
      const carrierDetails = Cypress.env('inputVal');
      carrierNameVal = carrierDetails.carrierName;
    });
  });
  beforeEach(() => {
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    getMinionValues(minionDrvrPreference, 2).then((resultOptions) => {
      drpDwnPositionData = resultOptions[0];
    });
    getMinionValues(minionLoadDivision, 1).then((resultOptions) => {
      drpDwnDivisionData = resultOptions[0];
    });
    getMinionValues(minionGoalPreference, 1).then((resultOptions) => {
      drpDwnPreferenceData = resultOptions[0];
    });
    getMinionValues(minionRoutesReason, 1).then((resultOptions) => {
      drpDwnReasonData = resultOptions[0];
    });
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-74165 Add Driver with fleet - verify Wire up the Fleet search parameter to be a Carrier search that pulls active Fleet Relationships  > Driver > Resources |  Assets - Fleet search | Regression',
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
      driverSaveAndVerifyUpdatedMsg();
    });
  it('ME-74166, ME-74171 Driver Search - User verify Wire up the Fleet search parameter to be a Carrier search that pulls active Fleet Relationships  > Driver > Resources |  Assets - Fleet search | Regression',
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
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Create fleet to driver
      clickAction({ locator: tabDriverGeneral });
      createFleetToDriver({ effectiveDate: todayDate, expirationDate: futureDate, carrierName: carrierNameVal });
      driverSaveAndVerifyUpdatedMsg();
    });
  it('ME-74168, ME-74170 : User fleet can be choose by providing Carrier Codes as input to the Driver Search --> Organizational Details Card |  Assets - Fleet search | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: careerGoals.btnAddNewGoal });
      //Add new career goal
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnPosition, drpDwnVal: drpDwnPositionData });
      verifyIfDisabled({ locator: careerGoals.btnSaveGoal });
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnDivision, drpDwnVal: drpDwnDivisionData });
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnPreference, drpDwnVal: drpDwnPreferenceData });
      verifyIfDisabled({ locator: careerGoals.btnSaveGoal });
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnReason, drpDwnVal: drpDwnReasonData });
      typeDropDwnClick({ locator: careerGoals.txtFleet, drpDwnVal: carrierNameVal });
      verifyIfEnabled({ locator: careerGoals.btnSaveGoal });
      clickActionWait({ locator: careerGoals.btnSaveGoal });
      driverSaveAndVerifyUpdatedMsg();
    });
});