/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver Contact Details - UI Testcase
 Test Cases List                : ME-57440,ME-151552,ME-151224,ME-151229,ME-151238,ME-151237
 Authored By                    : Sainath
 Date                           : 04-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             :
                                   ME-57440 : To verify if  the user is able to add  multiple equipments with same type but with different Asset Id without any error message while creating a driver Assets > Add Driver > Equipment | Regression
                                   ME-151552 : To verify if  the user is able to add multiple equipments with same Asset Id and validate error message. Assets > Add Driver > Equipment | Regression
                                   ME-151224 : To verify if  the user is able to add  multiple equipments with same type but with different Asset Id without any error message in the  Driver General Page for existing driver. > Assets > Add Driver > Equipment | Regression
                                   ME-151229 : To verify if the user is able to add  multiple equipments with same type but with different Asset Id without any error message   by editing the existing records in the  Driver General Page for existing driver. Assets > Add Driver > Equipment | Regression
                                   ME-151238 : Edit Driver_verify if the Save button is enabled and the driver is saved when clicked on it  by adding  multiple equipments with same type but with different Asset Id without any error message > Assets > Add Driver > Equipment | Regression
                                   ME-151237 : To verify  if the  Save button is enabled and the driver is saved when clicked on it  by adding  multiple equipments with same type but with different Asset Id without any error message in the Driver General Page for existing driver. > Assets > Add Driver > Equipment | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
const dateObjToday = genericUtils.getDateWithTargetDay({ targetDate: 0 });

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let equipmentTypeDrpDwn, equipmentConditionDrpDwn, driverDataTDM;
const currentDate = dateObjToday.mm + '/' + dateObjToday.dd + '/' + dateObjToday.yy;

describe('Driver multiple equipment with same type and different Asset Id [ME-57440,ME-151552,ME-151224,ME-151229,ME-151238,ME-151237]', () => {
  before(() => {
    genericUtils.getMinionValues('driverGeneralEquipmentType', 1).then(typeValue => {
      equipmentTypeDrpDwn = typeValue[0];
    });
    genericUtils.getMinionValues('driverGeneralEquipmentCondition', 1).then(conditionVal => {
      equipmentConditionDrpDwn = conditionVal[0];
    });
  });
  beforeEach(() => {
    cy.then(() => {
      cy.log('***creating driver using TDM***');
      genericUtils.getTDMData({ dataType: historyData.staticData.tdmDriverData, dataCondition: historyData.staticData.tdmAddDriverReq, dataScenario: historyData.staticData.tdmDriverCommonScenario });
      cy.then(() => {
        driverDataTDM = Cypress.env('inputVal');
      });
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-57440 : To verify if  the user is able to add  multiple equipments with same type but with different Asset Id without any error message while creating a driver Assets > Add Driver > Equipment | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescriptionTblValue, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValTwo, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyTableRowElementText({ locator: addDriverPage.equipmentDescriptionTblValue, index: 1, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.verifyToNotExist({ element: addDriverPage.equipmentErrorMessage });
    });
  it('ME-151552 : To verify if  the user is able to add multiple equipments with same Asset Id and validate error message. Assets > Add Driver > Equipment | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescriptionTblValue, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyTableRowElementText({ locator: addDriverPage.equipmentDescriptionTblValue, index: 1, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.verifyExists({ element: addDriverPage.equipmentErrorMessage });
    });
  it('ME-151224 : To verify if  the user is able to add  multiple equipments with same type but with different Asset Id without any error message in the  Driver General Page for existing driver. > Assets > Add Driver > Equipment | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverGeneral });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescriptionTblValue, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValTwo, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyTableRowElementText({ locator: addDriverPage.equipmentDescriptionTblValue, index: 1, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.verifyToNotExist({ element: addDriverPage.equipmentErrorMessage });
    });
  it('ME-151229 : To verify if the user is able to add  multiple equipments with same type but with different Asset Id without any error message   by editing the existing records in the  Driver General Page for existing driver. Assets > Add Driver > Equipment | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverGeneral });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescriptionTblValue, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyTableRowElementText({ locator: addDriverPage.equipmentDescriptionTblValue, index: 1, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.verifyExists({ element: addDriverPage.equipmentErrorMessage });
      genericUtils.clickFirstElementIn({ locator: addDriverPage.equipmentMenuBtn });
      genericUtils.clickVisibleElement({ locator: addDriverPage.equipmentEditIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValTwo, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyToNotExist({ element: addDriverPage.equipmentErrorMessage });
    });
  it('ME-151238 : Edit Driver_verify if the Save button is enabled and the driver is saved when clicked on it  by adding  multiple equipments with same type but with different Asset Id without any error message > Assets > Add Driver > Equipment | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverGeneral });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.clickFirstElementIn({ locator: addDriverPage.equipmentMenuBtn });
      genericUtils.clickVisibleElement({ locator: addDriverPage.equipmentEditIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValTwo, currentDate, currentDate, equipmentConditionDrpDwn);
    });
  it('ME-151237 : To verify  if the  Save button is enabled and the driver is saved when clicked on it  by adding  multiple equipments with same type but with different Asset Id without any error message in the Driver General Page for existing driver. > Assets > Add Driver > Equipment | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValOne, currentDate, currentDate, equipmentConditionDrpDwn);
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescriptionTblValue, verifyText: addDriverData.expectedData.descriptionValue });
      genericUtils.clickAction({ locator: addDriverPage.equipmentAddIcon });
      resourceUtilis.addDriverEquipment(equipmentTypeDrpDwn, addDriverData.expectedData.descriptionValue, addDriverData.expectedData.countVal, addDriverData.expectedData.assetIdValTwo, currentDate, currentDate, equipmentConditionDrpDwn);
    });
});