/*---------------------------------------------------------------------------------------------------------------
User can validate equiment card count field value to zero by default in Driver
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 18-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis
Test case Included            : [ME-67813,ME-156702,ME-156701]
----------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM, driverScenario;
let equipmentTypeDrpDwn, equipmentConditionDrpDwn;
const dateObjToday = genericUtils.getDateWithTargetDay({ targetDate: 0 });
const currentDate = dateObjToday.mm + '/' + dateObjToday.dd + '/' + dateObjToday.yy;
const {
  tdmAddDriverReq,
  tdmDriverData,
} = historyData.staticData;
describe('Driver scenarios: Validate Equipment Card Count Field Default Value in Driver > Resources | Assets - Driver General Tab | Regression [ME-67813,ME-156702,ME-156701]', () => {
  before(() => {
    genericUtils.getMinionValues('driverGeneralEquipmentType', 1).then(typeValue => {
      equipmentTypeDrpDwn = typeValue[0];
    });
    genericUtils.getMinionValues('driverGeneralEquipmentCondition', 1).then(conditionVal => {
      equipmentConditionDrpDwn = conditionVal[0];
    });
  });
  beforeEach(() => {
    cy.log('***creating driver using TDM***');
    genericUtils.getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: driverScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-156702] Verify user can able to Validate Equipment Card Count Field Default Value in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.lblEquipmentTitle, verifyText: addDriverData.userDefinedData.equipmentTitle });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.userDefinedData.equipmentDialogTitle });
      resourceUtilis.verifyEquipmentCountDefaultToZero();
    });
  it('[ME-67813, ME-156701] Verify user can able to Validate Equipment Card Count Field Default Value and count field accepting input other than zero in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverGeneral });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.lblEquipmentTitle, verifyText: addDriverData.userDefinedData.equipmentTitle });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.userDefinedData.equipmentDialogTitle });
      resourceUtilis.verifyEquipmentCountDefaultToZero();
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyAttrText({ locator: addDriverPage.colEquipmentCount, attribute: historyData.staticData.attrTitle, verifyText: addDriverData.expectedData.countVal });
    });
});