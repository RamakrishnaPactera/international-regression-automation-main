/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Power Operations - Status Details
 Test Cases List
 Authored By                   : Sanjeev Bandari
 Date                          : 08-05-2023,
 Functions/Calling References  : utilities, genericUtils, loginUtils
 Test case Included            : ME-152949 Power Operations - Verify the "Service Status" dropdown field
                               : ME-152930 Power Operations - Verify whether the Power Operations - Status Details fields are functionally enabled
                               : ME-152946 Power Operations - Verify "Operating Status" Dropdown field
                               : ME-152952 Power Operations - Verify the Pool field
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  searchPowerWithCode,
} from '../../../utilities/assetUtils/resourceUtilis';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import {
  getMinionValues,
  getTDMData,
  selectItemFromDropDownBySearchingList,
  validateDrpDwnAllOptions,
  verifyIfEnabled,
  viewFullPage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { shortWait } = commonData;
const {
  txtFieldPoolSearch,
  drpDwnOperatingStatus,
  drpDwnServiceStatusBtn,
  drpDwnOperatingStatusBtn,
  drpDwnServiceStatus,
} = powerDetails;
const {
  tdmAddPowerReq,
  tdmPowerCommonScenario,
  tdmPowerData,
  typeNullVal,
  minionPowerOperatingStatus,
  minionPowerServiceStatus,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let powerDataTDM, drpDwnPowerOperatingStatus, drpDwnPowerServiceStatus;
describe('Power Operations - Status Details - Functional Test Cases [ME-152930][ME-152946][ME-152949][ME-152952]', () => {
  before(() => {
    cy.log('***creating power using TDM***');
    getTDMData({ dataType: tdmPowerData, dataCondition: tdmAddPowerReq, dataScenario: tdmPowerCommonScenario });
    cy.then(() => {
      powerDataTDM = Cypress.env('inputVal');
    });
    getMinionValues(minionPowerOperatingStatus, 3).then((resultOptions) => {
      drpDwnPowerOperatingStatus = resultOptions;
    });
    getMinionValues(minionPowerServiceStatus, 2).then((resultOptions) => {
      drpDwnPowerServiceStatus = resultOptions;
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('[ME-152930][ME-152946][ME-152949][ME-152952] Power Operations - Status Details - Functional Test Cases > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      searchPowerWithCode({ powerCode: powerDataTDM.powerCode });
      waitSometime(shortWait);
      //Verify whether the Power Operations - Status Details fields are functionally enabled
      verifyIfEnabled({ locator: drpDwnOperatingStatus });
      verifyIfEnabled({ locator: drpDwnServiceStatus });
      verifyIfEnabled({ locator: txtFieldPoolSearch });
      //Verify "Operating Status" Dropdown field
      drpDwnPowerOperatingStatus.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: drpDwnOperatingStatus, locator2: drpDwnOperatingStatusBtn, optionsArray: drpDwnPowerOperatingStatus });
      //Verify the "Service Status" dropdown field
      drpDwnPowerServiceStatus.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: drpDwnServiceStatus, locator2: drpDwnServiceStatusBtn, optionsArray: drpDwnPowerServiceStatus });
      //Verify Pool Field should be Search and Select field and should populate the correct value which is fetched from the defined Pools.
      selectItemFromDropDownBySearchingList({ element: txtFieldPoolSearch, ddValue: tdmPowerData });
    });
});