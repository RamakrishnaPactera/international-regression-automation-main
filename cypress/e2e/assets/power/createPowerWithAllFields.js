/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating Add Power With all different fields
 Test Cases List               : ME-138737, ME-138742, ME-138748, ME-138753, ME-138756, ME-138759,ME-138766
 Authored By                   : Lingaswamy Kottha
 Date                          : 29-05-2023,
 Functions/Calling References  : homePagePower, dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-138623, ME-138624, ME-138626, ME-138627, ME-138628, ME-138631, ME-138632,ME-138664, ME-138666, ME-138671, ME-138673,ME-138696, ME-138699, ME-138712, ME-138721, ME-138725, ME-138729
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverPage from '../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as preferencesPage from '../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import {
  navigateToAddPowerNewPage,
  createPowerWithMandatoryFields,
  addPowerNotes,
  addPowerAppearance,
  addNewEquipmentCardInPower,
  submitPowerAndVerifyToastMsg,
  trailerGeneralInformation,
  trailerTrackingInformation,
  deleteTeamPreference,
} from '../../../utilities/assetUtils/resourceUtilis';
import trailerPage from '../../../pageObjects/assets/trailer/trailerPage.json';
import {
  viewFullPage,
  generateRandomNumber,
  getMinionValues,
  getMinionValuesList,
  verifyNotEqLengthOfText,
  verifyLengthOfText,
  clickAction,
} from '../../../utilities/commonUtils/genericUtils';
import trailerDetailsData from '../../../testData/assets/trailer/trailerDetailsData.json';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  drpMake,
  drpType,
  drpModel,
  lstTypeTerm,
  drpDeviceTerm,
} = trailerPage;
let valMake, valModel, valType, valTrackingDevice, sleeperTypeTerm, axleConfigurationTerm, suspensionTerm, sleeperSizeDimensionsTerm, drpInformationModel, drpInformationMake, drpInformationType, drpPowerTrackingDevice;
let drpTrackingModel = [];
const { yearVal, displayVal, compliantVal, measurementVal } = trailerDetailsData.expectedData;
describe('Validating Add Power With all different fields ME-138623, ME-138624, ME-138626, ME-138627, ME-138628, ME-138631, ME-138632,ME-138737, ME-138742, ME-138748, ME-138753, ME-138756, ME-138759,ME-138766', () => {
  before(async () => {
    getMinionValues('powerGeneralInformationMake', 1).then((resultOptions) => {
      valMake = resultOptions[0];
    });
    getMinionValues('powerGeneralInformationModel', 1).then((resultOptions1) => {
      valModel = resultOptions1[0];
    });
    getMinionValues('powerGeneralInformationType', 1).then((resultOptions2) => {
      valType = resultOptions2[0];
    });
    getMinionValues('powerGeneralTrackingDevice', 1).then((resultOptions4) => {
      valTrackingDevice = resultOptions4[0];
    });
    getMinionValues('powerGeneralTrackingModel', 1).then((resultOptions5) => {
      drpTrackingModel = resultOptions5[0];
    });
    await getMinionValuesList('powerGeneralInformationModel').then((powerGeneralInformationModel) => {
      drpInformationModel = powerGeneralInformationModel;
    });
    await getMinionValuesList('powerGeneralInformationType').then((powerGeneralInformationType) => {
      drpInformationType = powerGeneralInformationType;
    });
    await getMinionValuesList('powerGeneralInformationMake').then((powerGeneralInformationMake) => {
      drpInformationMake = powerGeneralInformationMake;
    });
    await getMinionValuesList('powerGeneralTrackingDevice').then((powerGeneralTrackingDevice) => {
      drpPowerTrackingDevice = powerGeneralTrackingDevice;
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
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-138627, ME-138628, ME-138631, ME-138632, ME-138664, ME-138666, ME-138671, ME-138673: GeneralInformation Make, Type, Year, Display, CARB Compliant, Measurement  Power > Power - Add New |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      createPowerWithMandatoryFields();
      trailerGeneralInformation(valMake, valType, yearVal, valModel, displayVal, compliantVal, measurementVal);
      submitPowerAndVerifyToastMsg();
    });
  it('ME-138623, ME-138624, ME-138626: GeneralInformation  Minion values for Make, Type, Year, Display, CARB Compliant, Measurement  Power > Power - Add New |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      cy.get(drpModel).click({ force: true });
      cy.get(lstTypeTerm).each(($els, index) => {
        expect($els.text()).to.equal(drpInformationModel[index + 1]);
      });
      cy.get(drpMake).click({ force: true });
      cy.get(lstTypeTerm).each(($els, index) => {
        expect($els.text()).to.equal(drpInformationMake[index]);
      });
      cy.get(drpType).click({ force: true });
      cy.get(lstTypeTerm).each(($els, index) => {
        expect($els.text()).to.equal(drpInformationType[index]);
      });
      createPowerWithMandatoryFields();
      trailerTrackingInformation(valTrackingDevice, drpTrackingModel, generateRandomNumber());
      submitPowerAndVerifyToastMsg();
    });
  it('ME-138666, ME-138671, ME-138673: TrackingInformation Model, Tracking Device, Serial number Power > Power - Add New |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      createPowerWithMandatoryFields();
      trailerTrackingInformation(valTrackingDevice, drpTrackingModel, generateRandomNumber());
      submitPowerAndVerifyToastMsg();
    });
  it('ME-138664: TrackingInformation Tracking Device Minion valuse Power > Power - Add New |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      cy.get(drpDeviceTerm).click({ force: true });
      cy.get(lstTypeTerm).each(($els, index) => {
        expect($els.text()).to.equal(drpPowerTrackingDevice[index]);
      });
      createPowerWithMandatoryFields();
      trailerTrackingInformation(valTrackingDevice, drpTrackingModel, generateRandomNumber());
      submitPowerAndVerifyToastMsg();
    });
  it('ME-138696, ME-138699, ME-138712, ME-138721, ME-138725, ME-138729: PowerAppearance Power > Power - Add New |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      createPowerWithMandatoryFields();
      addPowerAppearance(displayVal, displayVal, sleeperTypeTerm, axleConfigurationTerm, suspensionTerm, sleeperSizeDimensionsTerm);
      submitPowerAndVerifyToastMsg();
    });
  it('ME-138737, ME-138742, ME-138748, ME-138753, ME-138756, ME-138759,ME-138766 Equipment Power > Power - Add New |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      createPowerWithMandatoryFields();
      addNewEquipmentCardInPower();
      submitPowerAndVerifyToastMsg();
    });
  it('ME-138771 Equipment Edit Delete Power > Power - Add New |  Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      createPowerWithMandatoryFields();
      addNewEquipmentCardInPower();
      submitPowerAndVerifyToastMsg();
      clickAction({ locator: preferencesPage.btnKabobEditTeamPreference });
      clickAction({ locator: preferencesPage.btnEditTeamPreference });
      deleteTeamPreference();
    });
  it('ME-138673: Notes Power > Power - Add New | Assets - Add Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      createPowerWithMandatoryFields();
      //Note with 3000 char
      addPowerNotes(3000);
      verifyLengthOfText({ locator: addDriverPage.timeOff.txtFieldNote, maxLength: 3000 });
      //Note with 3000+ char
      addPowerNotes(3010);
      verifyNotEqLengthOfText({ locator: addDriverPage.timeOff.txtFieldNote, maxLength: 3010 });
      submitPowerAndVerifyToastMsg();
    });
});