/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validate Power General Information
 Authored By                   : Sanjeev Bandari
 Date                          : 29-05-2023
 Functions/Calling References  : powerDetails, genericUtils, loginUtils
 Test case Included: ME-138051 FE - Power General Information - Regression Test Case Preparation and Execution

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  clickAction,
  generateRandomAlphaNumByLength,
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
  drpDwnMakeTerm,
  drpDwnModelTerm,
  drpDwnTypeTerm,
  drpDwnMeasurementTerm,
  drpDwnIsCARBCompliant,
  txtDisplayName,
  txtYear,
} = powerDetails.generalInformation;
const {
  attrTitle,
  minionGeneralinformationMeasurementType,
  minionPowerCARBCompliant,
  minionPowerGeneralInformationMake,
  minionpowerGeneralInformationModel,
  minionpowerGeneralInformationType,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const { shortWait } = commonData;
let drpDwnPowerGeneralInformationMake, drpDwnPowerGeneralInformationMake1, drpDwnPowerGeneralInformationModel, drpDwnPowerGeneralInformationModel1, drpDwnPowerGeneralInformationType, drpDwnPowerGeneralInformationType1, drpDwnPowerCARBCompliant, drpDwnPowerCARBCompliant1, drpDwnGeneralinformationMeasurementType, drpDwnGeneralinformationMeasurementType1;
describe('Validate Power General Information', () => {
  before(() => {
    getMinionValues(minionPowerGeneralInformationMake, 2).then((resultOptions) => {
      drpDwnPowerGeneralInformationMake = resultOptions[0];
      drpDwnPowerGeneralInformationMake1 = resultOptions[1];
    });
    getMinionValues(minionpowerGeneralInformationModel, 2).then((resultOptions) => {
      drpDwnPowerGeneralInformationModel = resultOptions[0];
      drpDwnPowerGeneralInformationModel1 = resultOptions[1];
    });
    getMinionValues(minionpowerGeneralInformationType, 2).then((resultOptions) => {
      drpDwnPowerGeneralInformationType = resultOptions[0];
      drpDwnPowerGeneralInformationType1 = resultOptions[1];
    });
    getMinionValues(minionPowerCARBCompliant, 2).then((resultOptions) => {
      drpDwnPowerCARBCompliant = resultOptions[0];
      drpDwnPowerCARBCompliant1 = resultOptions[1];
    });
    getMinionValues(minionGeneralinformationMeasurementType, 2).then((resultOptions) => {
      drpDwnGeneralinformationMeasurementType = resultOptions[0];
      drpDwnGeneralinformationMeasurementType1 = resultOptions[1];
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-138051 FE - Power General Information - Regression Test Case Preparation and Execution',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      selectItemFromButtonTypeDropDown({ locator: drpDwnMakeTerm, dropdownVal: drpDwnPowerGeneralInformationMake });
      selectItemFromButtonTypeDropDown({ locator: drpDwnModelTerm, dropdownVal: drpDwnPowerGeneralInformationModel });
      selectItemFromButtonTypeDropDown({ locator: drpDwnTypeTerm, dropdownVal: drpDwnPowerGeneralInformationType });
      const today = new Date();
      typeText({ locator: txtYear, dataText: today.getFullYear() });
      typeText({ locator: txtDisplayName, dataText: generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
      selectItemFromButtonTypeDropDown({ locator: drpDwnIsCARBCompliant, dropdownVal: drpDwnPowerCARBCompliant });
      selectItemFromButtonTypeDropDown({ locator: drpDwnMeasurementTerm, dropdownVal: drpDwnGeneralinformationMeasurementType });
      const powerCode = createPowerWithMandatoryFields();
      submitPowerAndVerifyToastMsg();
      searchPowerWithCode({ powerCode });
      //Edit power with few fields
      clickAction({ locator: tabGeneral });
      selectItemFromButtonTypeDropDown({ locator: drpDwnMakeTerm, dropdownVal: drpDwnPowerGeneralInformationMake1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnModelTerm, dropdownVal: drpDwnPowerGeneralInformationModel1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnTypeTerm, dropdownVal: drpDwnPowerGeneralInformationType1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnIsCARBCompliant, dropdownVal: drpDwnPowerCARBCompliant1 });
      selectItemFromButtonTypeDropDown({ locator: drpDwnMeasurementTerm, dropdownVal: drpDwnGeneralinformationMeasurementType1 });
      submitPowerAndVerifyToastMsg();
      waitSometime(shortWait);
      //Verify updated values
      verifyAttrText({ locator: drpDwnMakeTerm, attribute: attrTitle, verifyText: drpDwnPowerGeneralInformationMake1 });
      verifyAttrText({ locator: drpDwnModelTerm, attribute: attrTitle, verifyText: drpDwnPowerGeneralInformationModel1 });
      verifyAttrText({ locator: drpDwnTypeTerm, attribute: attrTitle, verifyText: drpDwnPowerGeneralInformationType1 });
      verifyAttrText({ locator: drpDwnIsCARBCompliant, attribute: attrTitle, verifyText: drpDwnPowerCARBCompliant1 });
      verifyAttrText({ locator: drpDwnMeasurementTerm, attribute: attrTitle, verifyText: drpDwnGeneralinformationMeasurementType1 });
    });
});