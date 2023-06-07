/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating E2E Power Add,Edit and search Power
 Test Cases List
 Authored By                   : Sainath
 Date                          : 19-04-2023,
 Functions/Calling References  : homePagePower, dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-146865 : E2E : Create Power with Mandatory Fields Power > Power - Add New |  Assets - Add Power | Regression
                                 ME-146866 : E2E: Search Power based on Power unit Code,Driver Code,Driver Name,Type,Division,Business Unit,Fleet Power > Power - Search |  Assets - Add Power | Regression
                                 ME-145868 : E2E : Edit Power on Permanent Drivers, Division, Business Unit, Type Power > Power - Add New |  Assets - Add Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import powerSearchPage from '../../../pageObjects/assets/power/powerSearch/powerSearchPage.json';
import {
  addPower,
  createPowerWithSomeFields,
  enterDataToFewPowerFields,
  navigateToPowerSearch,
  searchPowerWithCode,
  searchPowerWithDivision,
  searchPowerWithFilters,
  submitPowerAndVerifyToastMsg,
} from '../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
const {
  tabGeneral,
} = powerDetails;
const {
  tractorDayCabTypeDrpDwn,
  assetDivisionDrpDwn,
} = powerData.staticDataPower;
const {
  clearSearchBtn,
  drpDwnDivision,
  drpDwnDriverCode,
  drpDwnDriverName,
  drpDwnType,
} = powerSearchPage;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
//Create driver using TDM is not working so hardcoded driver code and name
const driverCode = '03C2TUN6';
const driverName = 'Olive Merralee L';
let powerUnitCode;
describe('Validating Add,Edit and search Power [ME-146865,ME-146866,ME-145868]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-146865 : E2E : Create Power with Mandatory Fields Power > Power - Add New |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      //Add power with mandatory fields
      addPower();
    });
  it('ME-146866 : E2E: Search Power based on Power unit Code,Driver Code,Driver Name,Type,Division,Business Unit,Fleet Power > Power - Search |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      powerUnitCode = createPowerWithSomeFields({ driverCode });
      navigateToPowerSearch();
      clickAction({ locator: clearSearchBtn });
      searchPowerWithFilters({ powerCode: powerUnitCode, searchLocator: drpDwnDriverCode, searchTypeVal: driverCode });
      clickAction({ locator: clearSearchBtn });
      searchPowerWithFilters({ powerCode: powerUnitCode, searchLocator: drpDwnDriverName, searchTypeVal: driverName });
      clickAction({ locator: clearSearchBtn });
      searchPowerWithFilters({ powerCode: powerUnitCode, searchLocator: drpDwnType, searchTypeVal: tractorDayCabTypeDrpDwn });
      clickAction({ locator: clearSearchBtn });
      searchPowerWithDivision({ powerCode: powerUnitCode, searchLocator: drpDwnDivision, searchTypeVal: assetDivisionDrpDwn });
      clickAction({ locator: clearSearchBtn });
      searchPowerWithCode({ powerCode: powerUnitCode });
    });
  it('ME-145868 : E2E : Edit Power on Permanent Drivers, Division, Business Unit, Type Power > Power - Add New |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      //Add power with mandatory fields and search with same
      const powerCode = addPower();
      searchPowerWithCode({ powerCode });
      //Edit power with few fields
      clickAction({ locator: tabGeneral });
      enterDataToFewPowerFields({ driverCode });
      //Verify successfully edited
      submitPowerAndVerifyToastMsg();
    });
});