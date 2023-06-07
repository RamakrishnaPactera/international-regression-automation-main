/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validate Spec in Power//
 Test Cases List
 Authored By                   : K. Santhosh
 Date                          : 30-05-2023,
 Functions/Calling References  : resourceUtilis, genericUtils, loginUtils
 Test case Included            : [ME-80175, ME-80189, ME-80192, ME-80195, ME-80197, ME-80200, ME-80202, ME-80204]
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as resourceUtilis from '../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import * as trailerPage from '../../../pageObjects/assets/trailer/trailerPage.json';
import * as trailerDetailsData from '../../../testData/assets/trailer/trailerDetailsData.json';
import * as powerDetailsPage from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import * as addPowerPage from '../../../pageObjects/assets/power/addPower/addPowerPage.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let powerDataTDM;
describe('Validate Spec in Power [ME-80175, ME-80189, ME-80192, ME-80195, ME-80197, ME-80200, ME-80202, ME-80204]', () => {
  beforeEach(() => {
    cy.log('***creating power using TDM***');
    genericUtils.getTDMData({ dataType: powerData.staticDataPower.tdmPowerData, dataCondition: powerData.staticDataPower.tdmAddPowerReq, dataScenario: powerData.staticDataPower.tdmPowerCommonScenario });
    cy.then(() => {
      powerDataTDM = Cypress.env('inputVal');
    });
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-80175, ME-80189, ME-80192, ME-80195] Verify the Measurement type as Imperial  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.dropDownContainsTextClick({ element: trailerPage.drpMeasurement, typeText: powerData.imperial.powerMeasurementVal, exactText: powerData.imperial.powerMeasurementVal });
      genericUtils.typeText({ locator: powerDetailsPage.txtSpecWheelBase, dataText: powerData.staticDataPower.dayCountVal });
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpdwnSpecWheelBase, typeText: powerData.imperial.specWheelBaseft, exactText: powerData.imperial.specWheelBaseft });
      genericUtils.clickAction({ locator: powerDetailsPage.drpdwnSpecWheelBase });
      genericUtils.verifyText({ locator: powerDetailsPage.drpdwnSpecVal, verifyText: powerData.imperial.specWheelBasein });
      genericUtils.typeText({ locator: powerDetailsPage.txtSpecWeight, dataText: powerData.staticDataPower.dayCountVal });
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpdwnSpecWeight, typeText: powerData.imperial.specWeightcwt, exactText: powerData.imperial.specWeightcwt });
      genericUtils.clickAction({ locator: powerDetailsPage.drpdwnSpecWeight });
      genericUtils.verifyText({ locator: powerDetailsPage.drpdwnSpecVal, verifyText: powerData.imperial.specWeightoz });
      genericUtils.typeText({ locator: powerDetailsPage.txtSpecTankCapacity1, dataText: powerData.staticDataPower.dayCountVal });
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpdwnSpecTankCapacity1, typeText: powerData.imperial.specTankCapacityVal, exactText: powerData.imperial.specTankCapacityVal });
      genericUtils.typeText({ locator: powerDetailsPage.txtSpecTankCapacity2, dataText: powerData.staticDataPower.dayCountVal });
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpdwnSpecTankCapacity2, typeText: powerData.imperial.specTankCapacityVal, exactText: powerData.imperial.specTankCapacityVal });
      genericUtils.typeText({ locator: powerDetailsPage.txtPowerOdometer, dataText: powerData.staticDataPower.dayCountVal });
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpdwnPowerOdometer, typeText: powerData.imperial.powerOdometer, exactText: powerData.imperial.powerOdometer });
      resourceUtilis.enterPowerUnitCode({ powerCode: powerDataTDM.powerCode });
      genericUtils.clickAction({ locator: addPowerPage.btnPowerSave });
    });
  it('[ME-80197, ME-80200, ME-80202, ME-80204] Verify the Measurement type as Metric  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.dropDownContainsTextClick({ element: trailerPage.drpMeasurement, typeText: trailerDetailsData.expectedData.measurementVal, exactText: trailerDetailsData.expectedData.measurementVal });
      genericUtils.typeText({ locator: powerDetailsPage.txtSpecWheelBase, dataText: powerData.staticDataPower.dayCountVal });
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpdwnSpecWheelBase, typeText: powerData.metric.specWheelBaseVal, exactText: powerData.metric.specWheelBaseVal });
      genericUtils.clickAction({ locator: powerDetailsPage.drpdwnSpecWheelBase });
      genericUtils.verifyText({ locator: powerDetailsPage.drpdwnSpecVal, verifyText: powerData.metric.specWheelBaseVal });
      genericUtils.typeText({ locator: powerDetailsPage.txtSpecWeight, dataText: powerData.staticDataPower.dayCountVal });
      genericUtils.waitSometime(4000);
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpdwnSpecWeight, typeText: powerData.metric.specWeightkg, exactText: powerData.metric.specWeightkg });
      genericUtils.clickAction({ locator: powerDetailsPage.drpdwnSpecWeight });
      genericUtils.verifyText({ locator: powerDetailsPage.drpdwnSpecVal, verifyText: powerData.metric.specWeightg });
      genericUtils.typeText({ locator: powerDetailsPage.txtSpecTankCapacity1, dataText: powerData.staticDataPower.dayCountVal });
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpdwnSpecTankCapacity1, typeText: powerData.metric.specTankCapacityVal, exactText: powerData.metric.specTankCapacityVal });
      genericUtils.typeText({ locator: powerDetailsPage.txtSpecTankCapacity2, dataText: powerData.staticDataPower.dayCountVal });
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpdwnSpecTankCapacity2, typeText: powerData.metric.specTankCapacityVal, exactText: powerData.metric.specTankCapacityVal });
      genericUtils.typeText({ locator: powerDetailsPage.txtPowerOdometer, dataText: powerData.staticDataPower.dayCountVal });
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpdwnPowerOdometer, typeText: powerData.metric.powerOdometer, exactText: powerData.metric.powerOdometer });
      resourceUtilis.enterPowerUnitCode({ powerCode: powerDataTDM.powerCode });
      genericUtils.clickAction({ locator: addPowerPage.btnPowerSave });
    });
});