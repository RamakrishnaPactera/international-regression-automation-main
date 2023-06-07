/*---------------------------------------------------------------------------------------------------------------
User can Create Address in Driver
Test Cases List
Authored By                   : K.Santhosh
Date                          : 16-05-2023
Functions/Calling References  : loginUtils, genericUtils, resourceUtilis
Test case Included            : [ME-155733, ME-155734, ME-155736, ME-155738, ME-155740, ME-148136, ME-148139, ME-148134, ME-148137, ME-148135, ME-148138]
-----------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as crmDocumentsPage from '../../../../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import * as crmNotesPage from '../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const locatorsAddress = [addDriverPage.lblAddressType, addDriverPage.lblAddressCountry, addDriverPage.lblAddressStreet1, addDriverPage.lblAddressCity, addDriverPage.lblAddressPostCode];
const addressDetailsData = new Map([[addDriverPage.lblAddressType, addDriverData.staticData.lblType], [addDriverPage.lblAddressCountry, addDriverData.staticData.lblCountry], [addDriverPage.lblAddressStreet1, addDriverData.staticData.lblStreetAddress], [addDriverPage.lblAddressCity, addDriverData.staticData.lblCity], [addDriverPage.lblAddressPostCode, addDriverData.staticData.lblPostCode]]);
const { asterisk } = generalData.userDefinedData;
let driverDataTDM;
describe('Driver scenarios: Create Address in Driver > Resources | Assets - Driver General Tab | Regression [ME-155733, ME-155734, ME-155736, ME-155738, ME-155740, ME-148136, ME-148139, ME-148134, ME-148137, ME-148135, ME-148138]', () => {
  before(() => {
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
  it('[ME-155733, ME-155734, ME-155736, ME-155738, ME-155740] Verify user can able to create, Edit, Delete Address in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.clickActionWait({ locator: addDriverPage.btnAddressAddNew });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.userDefinedData.addressDialogTitle });
      genericUtils.verifyLabelUsingMapArray({ map: addressDetailsData });
      locatorsAddress.forEach((element) => {
        genericUtils.verifyContains({ locator: element, containsText: asterisk });
      });
      resourceUtilis.addAddressWoPlus({ typeOfAddress: generalData.staticData.defaultAddressType });
      resourceUtilis.enterDriverMandatoryFieldsNAddress();
      resourceUtilis.driverSaveAction();
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescVal, verifyText: generalData.staticData.street1 });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesEdit });
      genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.userDefinedData.addressEditTitle });
      genericUtils.clearTextType({ element: addDriverPage.txtFieldAddresStree1, typeText: addDriverData.expectedData.msgUpdated });
      genericUtils.typeText({ locator: addDriverPage.txtFieldAddresCityState, dataText: generalData.staticData.cityState });
      genericUtils.typeText({ locator: addDriverPage.txtFieldAddresPostalCode, dataText: generalData.staticData.postalCode });
      genericUtils.clickActionWait({ locator: addDriverPage.certificationOrPermit.btnSave });
      resourceUtilis.driverSaveAction();
      genericUtils.verifyText({ locator: addDriverPage.equipmentDescVal, verifyText: addDriverData.expectedData.msgUpdated });
      genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
      genericUtils.clickAction({ locator: crmDocumentsPage.btnDocumentsDelete });
      genericUtils.clickOkOnWindowAlertConfirm();
      genericUtils.verifyDoesNotExist({ element: crmNotesPage.btnNotesKabob });
    });
  it('ME-148136 : Add driver - Parking” is default in the Address Type dropdown in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p3'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.clickActionWait({ locator: addDriverPage.btnAddressAddNew });
      genericUtils.verifyText({ locator: addDriverPage.parkingBtn, verifyText: addDriverData.expectedData.parkingDrpDwnVal });
    });
  it('ME-148139 : Search Driver - Parking is default in the Address Type dropdown in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p3'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverGeneral });
      genericUtils.clickActionWait({ locator: addDriverPage.btnAddressAddNew });
      genericUtils.verifyText({ locator: addDriverPage.parkingBtn, verifyText: addDriverData.expectedData.parkingDrpDwnVal });
    });
  it('ME-148134 : Add Driver - Remove Domicile Validation in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p3'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.clickActionWait({ locator: addDriverPage.btnAddressAddNew });
      genericUtils.clickAction({ locator: addDriverPage.parkingBtn });
      cy.get(addDriverPage.parkingList).each(($li) => {
        expect($li.text()).to.equal(addDriverData.expectedData.parkingDrpDwnVal);
      });
    });
  it('ME-148137 : Search Driver - Remove Domicile Validation in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p3'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverGeneral });
      genericUtils.clickActionWait({ locator: addDriverPage.btnAddressAddNew });
      genericUtils.clickAction({ locator: addDriverPage.parkingBtn });
      cy.get(addDriverPage.parkingList).each(($li) => {
        expect($li.text()).to.equal(addDriverData.expectedData.parkingDrpDwnVal);
      });
    });
  it('ME-148135 Add Driver - Domicile Not Required in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p3'],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.clickActionWait({ locator: addDriverPage.btnAddressAddNew });
      resourceUtilis.addAddressWoPlus({ typeOfAddress: generalData.staticData.defaultAddressType });
      resourceUtilis.enterDriverMandatoryFieldsNAddress();
      resourceUtilis.driverSaveAction();
      genericUtils.toastMsg();
    });
  it('ME-148138 Search Driver - Domicle Not Required in Driver > Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p3'],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverGeneral });
      genericUtils.clickActionWait({ locator: addDriverPage.btnAddressAddNew });
      resourceUtilis.addAddressWoPlus({ typeOfAddress: generalData.staticData.defaultAddressType });
      resourceUtilis.driverSaveAction();
      genericUtils.toastMsg();
    });
});