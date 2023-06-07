/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating Add,Edit and search Power on Power General Page
 Test Cases List
 Authored By                   : Sourabh
 Date                          : 31-05-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils
 Test case Included            : ME-68946 : Create Power filling mandatory fields with genral information, tracking information, appearence, equipment, notes and Identifier details |  Assets - Add Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  addNewEquipmentCardInPower,
  addPowerAppearanceDetails,
  addPowerNotes,
  enterPowerOperationalDetailsValues,
  addPowerIdentifierValues,
  navigateToAddPowerNewPage,
  submitPowerAndVerifyToastMsg,
  trailerGeneralInformation,
  trailerTrackingInformation,
} from '../../../utilities/assetUtils/resourceUtilis';
import {
  generateRandomNumber,
  generateRandomAlphaNumByLength,
  getMinionValues,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import * as dateTimeUtils from '../../../utilities/commonUtils/dateTimeUtils';
const {
  displayVal,
  licensePlateType,
  newYorkState,
  powerExteriorColor,
  powerInteriorColor,
  yearVal,
} = powerData.staticDataPower;
const {
  compliantVal,
  measurementVal,
} = powerData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let drpMake, drpModel, drpType, drpTrackingDevice, drpTrackingModel, sleeperTypeTerm, axleConfigurationTerm, suspensionTerm, sleeperSizeDimensionsTerm;
const identifierID = generateRandomAlphaNumByLength({ lengthOfString: 8 });
const todayDate = dateTimeUtils.returntodayDateMMDDYY();
let divisionValue, classValue;
describe('Validating Add,Edit and search Power on Power General Page [ME-68946]', () => {
  before(() => {
    getMinionValues('powerGeneralInformationMake', 1).then((resultOptions) => {
      drpMake = resultOptions[0];
    });
    getMinionValues('powerGeneralInformationModel', 1).then((resultOptions) => {
      drpModel = resultOptions[0];
    });
    getMinionValues('powerGeneralInformationType', 1).then((resultOptions) => {
      drpType = resultOptions[0];
    });
    getMinionValues('powerGeneralTrackingDevice', 1).then((resultOptions) => {
      drpTrackingDevice = resultOptions[0];
    });
    getMinionValues('powerGeneralTrackingModel', 1).then((resultOptions) => {
      drpTrackingModel = resultOptions[0];
    });
    getMinionValues('powerGeneralAppearanceSleeperType', 1).then((resultOptions) => {
      sleeperTypeTerm = resultOptions[0];
    });
    getMinionValues('powerGeneralAppearanceAxleConfig', 1).then((resultOptions) => {
      axleConfigurationTerm = resultOptions[0];
    });
    getMinionValues('powerGeneralAppearanceSuspension', 1).then((resultOptions) => {
      suspensionTerm = resultOptions[0];
    });
    getMinionValues('powerGeneralAppearanceSleeperSize', 1).then((resultOptions) => {
      sleeperSizeDimensionsTerm = resultOptions[0];
    });
    getMinionValues('division', 1).then((contactsDivision) => {
      divisionValue = contactsDivision[0];
    });
    getMinionValues('powerGeneralOpsClass', 1).then((powerClass) => {
      classValue = powerClass[0];
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-68946 : Create Power filling mandatory fields with genral information, tracking information, appearence, equipment, notes and Identifier details |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      trailerGeneralInformation(drpMake, drpType, yearVal, drpModel, displayVal, compliantVal, measurementVal);
      trailerTrackingInformation(drpTrackingDevice, drpTrackingModel, generateRandomNumber());
      enterPowerOperationalDetailsValues(classValue, divisionValue);
      addPowerAppearanceDetails(powerExteriorColor, powerInteriorColor, sleeperTypeTerm, axleConfigurationTerm, suspensionTerm, sleeperSizeDimensionsTerm);
      addPowerNotes(50);
      addNewEquipmentCardInPower();
      addPowerIdentifierValues(licensePlateType, newYorkState, identifierID, todayDate);
      submitPowerAndVerifyToastMsg();
    });
});