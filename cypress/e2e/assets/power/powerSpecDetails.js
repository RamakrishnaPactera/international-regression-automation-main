
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validate Power Spec card Details
 Authored By                   : Sanjeev Bandari
 Date                          : 29-05-2023
 Functions/Calling References  : powerDetails, genericUtils, loginUtils
 Test case Included:ME-138058 FE- Power Unit Specifications - Regression Test Case Preparation and Execution
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  clickAction,
  getMinionValues,
  selectItemFromButtonTypeDropDown,
  typeText,
  verifyAttrText,
  viewFullPage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import { navigateToAddPowerNewPage, createPowerWithMandatoryFields, submitPowerAndVerifyToastMsg, searchPowerWithCode } from '../../../utilities/assetUtils/resourceUtilis';
const { tabGeneral } = powerDetails;
const {
  txtPowerWeight,
  drpDwnPowerWeightUnit,
  drpDwnEngineMakeTerm,
  drpDwnEngineModelTerm,
  txtPowerEngineHP,
  drpDwnIsEngineBrakeAvailable,
  drpDwnTransmissionMakeTerm,
  drpDwnTransmissionModelTerm,
  txtPowerTransmissionSpeed,
  txtRearEndRatio,
  txtPowerWheelBase,
  drpDwnPowerWheelBase,
  txtPowerTankCapacity1,
  drpDwnPowerTankCapacity1,
  txtPowerTankCapacity2,
  drpDwnPowerTankCapacity2,
  drpDwnFifthWheelTerm,
} = powerDetails.specCard;
const {
  minionPowerEngineMake,
  minionPowerEngineModel,
  minionPowerEngineBrake,
  minionPowerTransMake,
  minionPowerTransModel,
  minionPowerFifthWheel,
  minionImperialWeightUOM,
  minionImperialUOMTankCapacity,
  minionImperialDimensionsUOM,
  attrTitle,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const { shortWait } = commonData;
let drpDwnPowerEngineMake, drpDwnPowerEngineMake1, drpDwnPowerEngineModel, drpDwnPowerEngineModel1, drpDwnPowerEngineBrake, drpDwnPowerTransMake, drpDwnPowerTransModel, drpDwnPowerFifthWheel, drpDwnImperialWeightUOM, drpDwnImperialUOMTankCapacity, drpDwnImperialDimensionsUOM;
describe('Validate Power Spec Information ME-138796, ME-138799, ME-138804, ME-138809, ME-138810, ME-138813, ME-138814, ME-138818, ME-138820, ME-138823, ME-138825, ME-138828', () => {
  before(() => {
    getMinionValues(minionPowerEngineMake, 2).then((resultOptions) => {
      drpDwnPowerEngineMake = resultOptions[0];
      drpDwnPowerEngineMake1 = resultOptions[1];
    });
    getMinionValues(minionPowerEngineModel, 2).then((resultOptions) => {
      drpDwnPowerEngineModel = resultOptions[0];
      drpDwnPowerEngineModel1 = resultOptions[1];
    });
    getMinionValues(minionPowerEngineBrake, 1).then((resultOptions) => {
      drpDwnPowerEngineBrake = resultOptions[0];
    });
    getMinionValues(minionPowerTransMake, 1).then((resultOptions) => {
      drpDwnPowerTransMake = resultOptions[0];
    });
    getMinionValues(minionPowerTransModel, 1).then((resultOptions) => {
      drpDwnPowerTransModel = resultOptions[0];
    });
    getMinionValues(minionPowerFifthWheel, 1).then((resultOptions) => {
      drpDwnPowerFifthWheel = resultOptions[0];
    });
    getMinionValues(minionImperialWeightUOM, 1).then((resultOptions) => {
      drpDwnImperialWeightUOM = resultOptions[0];
    });
    getMinionValues(minionImperialUOMTankCapacity, 1).then((resultOptions) => {
      drpDwnImperialUOMTankCapacity = resultOptions[0];
    });
    getMinionValues(minionImperialDimensionsUOM, 1).then((resultOptions) => {
      drpDwnImperialDimensionsUOM = resultOptions[0];
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-138058 FE- Power Unit Specifications - Regression Test Case Preparation and Execution',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      const powerCode = createPowerWithMandatoryFields();
      typeText({ locator: txtPowerWeight, dataText: commonData.weightVal });
      selectItemFromButtonTypeDropDown({ locator: drpDwnPowerWeightUnit, dropdownVal: drpDwnImperialWeightUOM });
      selectItemFromButtonTypeDropDown({ locator: drpDwnEngineMakeTerm, dropdownVal: drpDwnPowerEngineMake });
      selectItemFromButtonTypeDropDown({ locator: drpDwnEngineModelTerm, dropdownVal: drpDwnPowerEngineModel });
      typeText({ locator: txtPowerEngineHP, dataText: commonData.engineHPVal });
      selectItemFromButtonTypeDropDown({ locator: drpDwnIsEngineBrakeAvailable, dropdownVal: drpDwnPowerEngineBrake });
      selectItemFromButtonTypeDropDown({ locator: drpDwnTransmissionMakeTerm, dropdownVal: drpDwnPowerTransMake });
      selectItemFromButtonTypeDropDown({ locator: drpDwnTransmissionModelTerm, dropdownVal: drpDwnPowerTransModel });
      typeText({ locator: txtPowerTransmissionSpeed, dataText: commonData.transSpeed });
      typeText({ locator: txtRearEndRatio, dataText: commonData.readEndRatio });
      typeText({ locator: txtPowerWheelBase, dataText: commonData.wheelBaseVal });
      selectItemFromButtonTypeDropDown({ locator: drpDwnPowerWheelBase, dropdownVal: drpDwnImperialDimensionsUOM });
      typeText({ locator: txtPowerTankCapacity1, dataText: commonData.tank1CapacityVal });
      selectItemFromButtonTypeDropDown({ locator: drpDwnPowerTankCapacity1, dropdownVal: drpDwnImperialUOMTankCapacity });
      typeText({ locator: txtPowerTankCapacity2, dataText: commonData.tank2CapacityVal });
      selectItemFromButtonTypeDropDown({ locator: drpDwnPowerTankCapacity2, dropdownVal: drpDwnImperialUOMTankCapacity });
      selectItemFromButtonTypeDropDown({ locator: drpDwnFifthWheelTerm, dropdownVal: drpDwnPowerFifthWheel });
      submitPowerAndVerifyToastMsg();
      searchPowerWithCode({ powerCode });
      //Edit power with few fields
      clickAction({ locator: tabGeneral });
      selectItemFromButtonTypeDropDown({ locator: drpDwnEngineMakeTerm, dropdownVal: drpDwnPowerEngineMake1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnEngineModelTerm, dropdownVal: drpDwnPowerEngineModel1 });
      submitPowerAndVerifyToastMsg();
      waitSometime(shortWait);
      //Verify updated values
      verifyAttrText({ locator: drpDwnEngineMakeTerm, attribute: attrTitle, verifyText: drpDwnPowerEngineMake1 });
      verifyAttrText({ locator: drpDwnEngineModelTerm, attribute: attrTitle, verifyText: drpDwnPowerEngineModel1 });
    });
  it('[ME-138796, ME-138799, ME-138804, ME-138809, ME-138810, ME-138813, ME-138814, ME-138818, ME-138820, ME-138823, ME-138825, ME-138828] FE- Add Power with Spec Specifications ',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      createPowerWithMandatoryFields();
      typeText({ locator: txtPowerWeight, dataText: commonData.weightVal });
      selectItemFromButtonTypeDropDown({ locator: drpDwnPowerWeightUnit, dropdownVal: drpDwnImperialWeightUOM });
      selectItemFromButtonTypeDropDown({ locator: drpDwnEngineMakeTerm, dropdownVal: drpDwnPowerEngineMake });
      selectItemFromButtonTypeDropDown({ locator: drpDwnEngineModelTerm, dropdownVal: drpDwnPowerEngineModel });
      typeText({ locator: txtPowerEngineHP, dataText: commonData.engineHPVal });
      selectItemFromButtonTypeDropDown({ locator: drpDwnIsEngineBrakeAvailable, dropdownVal: drpDwnPowerEngineBrake });
      selectItemFromButtonTypeDropDown({ locator: drpDwnTransmissionMakeTerm, dropdownVal: drpDwnPowerTransMake });
      selectItemFromButtonTypeDropDown({ locator: drpDwnTransmissionModelTerm, dropdownVal: drpDwnPowerTransModel });
      typeText({ locator: txtPowerTransmissionSpeed, dataText: commonData.transSpeed });
      typeText({ locator: txtRearEndRatio, dataText: commonData.readEndRatio });
      typeText({ locator: txtPowerWheelBase, dataText: commonData.wheelBaseVal });
      selectItemFromButtonTypeDropDown({ locator: drpDwnPowerWheelBase, dropdownVal: drpDwnImperialDimensionsUOM });
      typeText({ locator: txtPowerTankCapacity1, dataText: commonData.tank1CapacityVal });
      selectItemFromButtonTypeDropDown({ locator: drpDwnPowerTankCapacity1, dropdownVal: drpDwnImperialUOMTankCapacity });
      typeText({ locator: txtPowerTankCapacity2, dataText: commonData.tank2CapacityVal });
      selectItemFromButtonTypeDropDown({ locator: drpDwnPowerTankCapacity2, dropdownVal: drpDwnImperialUOMTankCapacity });
      selectItemFromButtonTypeDropDown({ locator: drpDwnFifthWheelTerm, dropdownVal: drpDwnPowerFifthWheel });
      submitPowerAndVerifyToastMsg();
    });
});