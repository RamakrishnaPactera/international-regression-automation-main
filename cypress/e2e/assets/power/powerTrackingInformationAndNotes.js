/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validate Power Tracking Information
 Authored By                   : Sanjeev Bandari
 Date                          : 29-05-2023
 Functions/Calling References  : powerDetails, genericUtils, loginUtils
 Test case Included: ME-138603,ME-138050 FE - P2 - Power Unit Tracking Information
                   : ME-138054 FE - Power Unit Notes - Regression Test Case Preparation and Execution
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  clearTextType,
  clickAction,
  generateRandomAlphaNumByLength,
  generateRandomNumber,
  getMinionValues,
  selectItemFromButtonTypeDropDown,
  typeText,
  verifyAttrText,
  verifyTextContains,
  viewFullPage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import { navigateToAddPowerNewPage, createPowerWithMandatoryFields, submitPowerAndVerifyToastMsg, searchPowerWithCode } from '../../../utilities/assetUtils/resourceUtilis';
const { tabGeneral } = powerDetails;
const {
  drpDwnModelTerm,
  drpDwnTrackingDevice,
  txtNotes,
  txtSerialNumber,
} = powerDetails.trackingInformation;
const {
  attrValue,
  minionPowerGeneralTrackingDevice,
  minionPowerGeneralTrackingModel,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const { shortWait } = commonData;
let drpDwnPowerGeneralTrackingDevice, drpDwnPowerGeneralTrackingDevice1, drpDwnPowerGeneralTrackingModel, drpDwnPowerGeneralTrackingModel1;
describe('Validate Power Tracking Information', () => {
  before(() => {
    getMinionValues(minionPowerGeneralTrackingDevice, 2).then((resultOptions) => {
      drpDwnPowerGeneralTrackingDevice = resultOptions[0];
      drpDwnPowerGeneralTrackingDevice1 = resultOptions[1];
    });
    getMinionValues(minionPowerGeneralTrackingModel, 2).then((resultOptions) => {
      drpDwnPowerGeneralTrackingModel = resultOptions[0];
      drpDwnPowerGeneralTrackingModel1 = resultOptions[1];
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-138603,ME-138050 FE - P2 - Power Unit Tracking Information ',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      selectItemFromButtonTypeDropDown({ locator: drpDwnTrackingDevice, dropdownVal: drpDwnPowerGeneralTrackingDevice });
      waitSometime(shortWait);
      selectItemFromButtonTypeDropDown({ locator: drpDwnModelTerm, dropdownVal: drpDwnPowerGeneralTrackingModel });
      typeText({ locator: txtSerialNumber, dataText: generateRandomNumber });
      const powerCode = createPowerWithMandatoryFields();
      submitPowerAndVerifyToastMsg();
      searchPowerWithCode({ powerCode });
      //Edit power tracking fields
      clickAction({ locator: tabGeneral });
      selectItemFromButtonTypeDropDown({ locator: drpDwnTrackingDevice, dropdownVal: drpDwnPowerGeneralTrackingDevice1 });
      waitSometime(shortWait);
      selectItemFromButtonTypeDropDown({ locator: drpDwnModelTerm, dropdownVal: drpDwnPowerGeneralTrackingModel1 });
      const updatedSerialNo = generateRandomNumber;
      clearTextType({ element: txtSerialNumber, typeText: updatedSerialNo });
      submitPowerAndVerifyToastMsg();
      //Verify updated values
      verifyAttrText({ locator: drpDwnTrackingDevice, attribute: attrValue, verifyText: drpDwnPowerGeneralTrackingDevice1 });
      verifyAttrText({ locator: drpDwnModelTerm, attribute: attrValue, verifyText: drpDwnPowerGeneralTrackingModel1 });
      verifyAttrText({ locator: txtSerialNumber, attribute: attrValue, verifyText: updatedSerialNo });
    });
  it('ME-138054 FE - Power Unit Notes - Regression Test Case Preparation and Execution ',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      typeText({ locator: txtNotes, dataText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      const powerCode = createPowerWithMandatoryFields();
      submitPowerAndVerifyToastMsg();
      searchPowerWithCode({ powerCode });
      //Edit power tracking fields
      clickAction({ locator: tabGeneral });
      const updatedNotes = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      clearTextType({ element: txtNotes, typeText: updatedNotes });
      submitPowerAndVerifyToastMsg();
      //Verify updated values
      verifyTextContains({ locator: txtNotes, containsText: updatedNotes });
    });
});