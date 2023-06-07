import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as genericUtils from '../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../utilities/assetUtils/resourceUtilis';
import * as addDriverData from '../../../../testData/assets/driver/addDriver/addDriverData.json';
import historyData from '../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as addDriverPage from '../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as generalPage from '../../../../pageObjects/assets/driver/driverDetails/general/generalPage.json';
import * as generalData from '../../../../testData/assets/driver/driverDetails/general/generalData.json';
import * as historyPage from '../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import * as crmIndustryData from '../../../../testData/crm/crmData/crmIndustryData.json';
import { returnfutureDateMMDDYY, returntodayDateMMDDYY } from '../../../../utilities/commonUtils/dateTimeUtils';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const assetsNoScopeUserPassword = Cypress.env(`assetsNoScopeUserPassword${Cypress.env('environment')}`);
const assetsEditOnlyUserPassword = Cypress.env(`assetsEditOnlyUserPassword${Cypress.env('environment')}`);
const assetsReadOnlyUserPassword = Cypress.env(`assetsReadOnlyUserPassword${Cypress.env('environment')}`);
const {
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddTrailerData,
  tdmAddTrailerReq,
  tdmTrailerCommonScenario,
} = historyData.staticData;
const futureDate = returnfutureDateMMDDYY({ dayCount: 2, monthCount: 2 });
const todayDate = returntodayDateMMDDYY();
let driverDataTDM, drpDwnDriverStatus, drpDwnDriverGeneralOpDetailsHOS, trailerDataTDM, drpDwnDriverTimeOffType, carrierNameVal, searchDriverCode, driverOperationalCode, drpDwnDriverFleetType;
describe('Verify Driver General tab Details with user scope/permission ME-138155, ME-138162, ME-138146, ME-138152, ME-138281, ME-138276, ME-138285, ME-138288, ME-141349, ME-138267, ME-138287, ME-141330, ME-141339, ME-141352, ME-145107, ME-144298, ME-141505, ME-141443', () => {
  before(() => {
    cy.log('***creating new carrier***');
    genericUtils.getTDMData({ dataType: crmIndustryData.staticData.tdmCarrierData, dataCondition: crmIndustryData.staticData.tdmAddCarrierReq, dataScenario: crmIndustryData.staticData.tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    cy.log('***creating driver using TDM***');
    genericUtils.getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    genericUtils.getMinionValues(addDriverData.staticData.minionDrpDwnDriverStatus, 1).then(resultOptions => {
      drpDwnDriverStatus = resultOptions;
    });
    genericUtils.getMinionValues(addDriverData.staticData.minionDrpDwnDriverGeneralOpDetailsHOS, 3).then(resultOptions => {
      drpDwnDriverGeneralOpDetailsHOS = resultOptions;
    });
    genericUtils.getTDMData({ dataType: tdmAddTrailerData, dataCondition: tdmAddTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM = Cypress.env('inputVal');
    });
    genericUtils.getMinionValues(addDriverData.staticData.minionDriverGeneralTimeOff, 5).then(resultOptions => {
      drpDwnDriverTimeOffType = resultOptions[0];
    });
    genericUtils.getMinionValues(addDriverData.staticData.minionDriverFleetType, 2).then(resultOptions => {
      drpDwnDriverFleetType = resultOptions;
    });
  });
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
    });
  });
  it('ME-138155, ME-138162 Verify user is able to Add data in operational details card when user have scope/permission to Edit and View | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      loginToApplication({ username: usernameText, password: passwordText });
      //Creating a Driver
      resourceUtilis.navigateToDriverAddNewPage();
      const { driverCode } = resourceUtilis.enterDriverMandatoryFields(false);
      driverOperationalCode = driverCode;
      genericUtils.verifyElementTextContains({ locator: addDriverPage.operationalDetails.titleOperationalDetails, verifyText: addDriverData.userDefinedData.titleOperationalDetailsValue });
      genericUtils.selectItemFromDropDown({ element: addDriverPage.drpDwnStatus, ddValue: drpDwnDriverStatus[0] });
      genericUtils.selectItemFromDropDown({ element: addDriverPage.drpDwnHosRule, ddValue: drpDwnDriverGeneralOpDetailsHOS[0] });
      genericUtils.dropDownContainsValueCheckBoxSelection({ element: addDriverPage.operationalDetails.drpDwnpermanentTrailer, ddValue: trailerDataTDM.trailerCode });
      resourceUtilis.driverSaveAction();
      resourceUtilis.searchDriverWithCode({ driverCode: driverOperationalCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyAttrValueContains({ locator: addDriverPage.operationalDetails.drpDwnOpDetailsStatusBtn, attribute: addDriverData.staticData.titleAttr, verifyText: drpDwnDriverStatus[0] });
      genericUtils.selectItemFromDropDown({ element: addDriverPage.drpDwnHosRule, ddValue: drpDwnDriverGeneralOpDetailsHOS[1] });
      genericUtils.dropDownContainsValueCheckBoxSelection({ element: addDriverPage.operationalDetails.drpDwnpermanentTrailer, ddValue: trailerDataTDM.trailerCode });
      resourceUtilis.driverSaveAction();
      genericUtils.verifyTextContains({ locator: addDriverPage.operationalDetails.drpDwnpermanentTrailer, containsText: addDriverData.expectedData.emptyData });
      genericUtils.verifyAttrValueContains({ locator: addDriverPage.drpDwnHosRule, attribute: addDriverData.staticData.titleAttr, verifyText: drpDwnDriverGeneralOpDetailsHOS[1] });
    });

  it('ME-138146 Verify user is able to view operation details card when user do not have scope/permission to view or edit | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      //Creating a Driver
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsNoScopeUser, passwordText: assetsNoScopeUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: addDriverPage.operationalDetails.titleOperationalDetails });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: addDriverPage.operationalDetails.titleOperationalDetails });
    });

  it('ME-138152 Verify user is able to view or edit operation details card when user have scope/permission to Edit only but not view | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      //Creating a Driver
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsEditOnlyUser, passwordText: assetsEditOnlyUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: addDriverPage.operationalDetails.titleOperationalDetails });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: addDriverPage.operationalDetails.titleOperationalDetails });
    });

  it('ME-138281 Verify user is able to view identifiers card when user do not have scope/permission to view | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      //Creating a Driver
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsNoScopeUser, passwordText: assetsNoScopeUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: generalPage.titleIdentifier });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: generalPage.titleIdentifier });
    });

  it('ME-138276 Verify user is able to Add data in Identifiers card when user have scope/permission to Edit only but not view | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      //Creating a Driver
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsEditOnlyUser, passwordText: assetsEditOnlyUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: generalPage.titleIdentifier });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: generalPage.titleIdentifier });
    });

  it('ME-138285 Verify user is able to Delete data in Planned Time Off Card when user have scope/permission to Edit and view | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      loginToApplication({ username: usernameText, password: passwordText });
      resourceUtilis.navigateToDriverAddNewPage();
      //Creating Driver Planned Time Off
      resourceUtilis.enterDriverMandatoryFields(false);
      resourceUtilis.driverAddPlannedTimeOff({ driverTimeOffType: drpDwnDriverTimeOffType });
      //Delete Planned Time Off
      genericUtils.clickAction({ locator: addDriverPage.timeOff.btnKebabTimeOff });
      genericUtils.clickVisibleElement({ locator: addDriverPage.timeOff.deleteBtn });
      genericUtils.verifyToNotExist({ element: addDriverPage.timeOff.btnKebabTimeOff });
    });

  it('ME-138288 Verify user is able to Add data in  Planned Time Off card when user do not have scope/permission to Edit and view | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsNoScopeUser, passwordText: assetsNoScopeUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: generalPage.titlePlannedTimeOff });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: generalPage.titlePlannedTimeOff });
    });

  it('ME-141349 Verify user is able to Add data in fleet relationship card when user  do not have scope/permission to Edit and view | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsNoScopeUser, passwordText: assetsNoScopeUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: generalPage.titleFleetRelationships });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: generalPage.titleFleetRelationships });
    });

  it('ME-138267 Verify user is able to Delete data in identifiers card when user have scope/permission to Edit and View | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      loginToApplication({ username: usernameText, password: passwordText });
      resourceUtilis.navigateToDriverAddNewPage();
      const driver = resourceUtilis.enterDriverMandatoryFields(false);
      resourceUtilis.addIdentifier({ typeOfIdentifier: generalData.staticData.defaultIdentifierType });
      resourceUtilis.driverSaveAction();
      //Delete Identifier
      genericUtils.clickAction({ locator: historyPage.btnKebabWeeklyTargets });
      genericUtils.clickVisibleElement({ locator: addDriverPage.timeOff.deleteBtn });
      resourceUtilis.driverSaveAction();
      //Search Driver with code
      resourceUtilis.searchDriverWithCode({ driverCode: driver.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      resourceUtilis.addIdentifier({ typeOfIdentifier: generalData.staticData.defaultIdentifierType });
      resourceUtilis.driverSaveAction();
      //Delete Identifier
      genericUtils.clickAction({ locator: historyPage.btnKebabWeeklyTargets });
      genericUtils.clickVisibleElement({ locator: addDriverPage.timeOff.deleteBtn });
    });

  it('ME-138287 Verify user is able to edit Planned Time Off card when user have scope/permission to Edit but not view | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsEditOnlyUser, passwordText: assetsEditOnlyUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: generalPage.titlePlannedTimeOff });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: generalPage.titlePlannedTimeOff });
    });

  it('ME-141330 Verify user is able to edit Planned Time Off card when user have scope/permission to Edit but not view | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsEditOnlyUser, passwordText: assetsEditOnlyUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: generalPage.titlePlannedTimeOff });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: generalPage.titlePlannedTimeOff });
    });

  it('ME-141339 Verify user is able to edit fleet relationship card when user have scope/permission to Edit only but not View | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsEditOnlyUser, passwordText: assetsEditOnlyUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: generalPage.titleFleetRelationships });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: generalPage.titleFleetRelationships });
    });

  it('ME-141352 Verify user is able to edit fleet relationship card when user  have scope/permission to view and edit | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      loginToApplication({ username: usernameText, password: passwordText });
      resourceUtilis.navigateToDriverAddNewPage();
      const { driverCode } = resourceUtilis.enterDriverMandatoryFields(false);
      searchDriverCode = driverCode;
      resourceUtilis.driverSaveAction();
      resourceUtilis.createFleetToDriver({ effectiveDate: todayDate, expirationDate: futureDate, carrierName: carrierNameVal.carrierName });
      resourceUtilis.clickEditInLastRow();
      genericUtils.selectItemFromDropDown({ element: generalPage.fleetType, ddValue: drpDwnDriverFleetType[0] });
      genericUtils.clickAction({ locator: generalPage.fleetPopup.addFleetRelationshipBtn });
      genericUtils.verifyAttrValueContains({ locator: generalPage.fleetTypeInTable, attribute: addDriverData.staticData.titleAttr, verifyText: drpDwnDriverFleetType[0] });
      //Search Driver with code
      resourceUtilis.searchDriverWithCode({ driverCode: searchDriverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      resourceUtilis.clickEditInLastRow();
      genericUtils.selectItemFromDropDown({ element: generalPage.fleetType, ddValue: drpDwnDriverFleetType[1] });
      genericUtils.clickAction({ locator: generalPage.fleetPopup.addFleetRelationshipBtn });
      genericUtils.verifyAttrValueContains({ locator: generalPage.fleetTypeInTable, attribute: addDriverData.staticData.titleAttr, verifyText: drpDwnDriverFleetType[1] });
    });

  it('ME-145107 Verify user is able to view Operational Details card when user have scope/permission to view only while updating an existing driver with data already added in operational details card | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsReadOnlyUser, passwordText: assetsReadOnlyUserPassword });
      resourceUtilis.searchDriverWithCode({ driverCode: driverOperationalCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyElementTextContains({ locator: addDriverPage.operationalDetails.titleOperationalDetails, verifyText: addDriverData.userDefinedData.titleOperationalDetailsValue });
      genericUtils.verifyAttrValueContains({ locator: generalPage.disabledDriverStatus, attribute: addDriverData.staticData.titleAttr, verifyText: drpDwnDriverStatus[0] });
      genericUtils.verifyAttrValueContains({ locator: generalPage.disabledDriverStatus, attribute: addDriverData.staticData.attributeDataReadonly, verifyText: addDriverData.staticData.boolTrue });
    });

  it('ME-144298 Verify user is able to view fleet relationship card when user have scope/permission to view only while updating an  existing driver with fleet record already added in fleet card | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsReadOnlyUser, passwordText: assetsReadOnlyUserPassword });
      resourceUtilis.searchDriverWithCode({ driverCode: searchDriverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyElementTextContains({ locator: generalPage.titleFleetRelationships, verifyText: generalData.staticData.lblFleetRelationships });
      genericUtils.verifyTextOrBackGroundColor({ locator: generalPage.btnAddFleetDisabled, color: generalData.staticData.colorAttr, colorCode: generalData.expectedData.colorDisabled });
      genericUtils.verifyTextOrBackGroundColor({ locator: generalPage.kebabFleetmenu, color: generalData.staticData.colorAttr, colorCode: generalData.expectedData.colorDisabled });
    });

  it('ME-141505 Verify user is able to view Operational Details Card when user have scope/permission to view only while creating or updating a driver | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsReadOnlyUser, passwordText: assetsReadOnlyUserPassword });
      Cypress.on('uncaught:exception', () => {
        return false;
      });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyAttrValueContains({ locator: generalPage.disabledDriverStatus, attribute: addDriverData.staticData.attributeDataReadonly, verifyText: addDriverData.staticData.boolTrue });
      genericUtils.verifyAttrValueContains({ locator: generalPage.disabledDriverHOSRule, attribute: addDriverData.staticData.attributeDataReadonly, verifyText: addDriverData.staticData.boolTrue });
      genericUtils.verifyAttrValueContains({ locator: generalPage.disabledDriverPower, attribute: addDriverData.staticData.attributeDataReadonly, verifyText: addDriverData.staticData.boolTrue });
      genericUtils.verifyAttrValueContains({ locator: generalPage.disabledDriverTrailer, attribute: addDriverData.staticData.attributeDataReadonly, verifyText: addDriverData.staticData.boolTrue });
      genericUtils.verifyAttrValueContains({ locator: generalPage.disabledDriverTerminal, attribute: addDriverData.staticData.attributeDataReadonly, verifyText: addDriverData.staticData.boolTrue });
    });

  it('ME-141443 Verify user is able to view fleet relationship card when user have scope/permission to view only while creating a driver  | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsReadOnlyUser, passwordText: assetsReadOnlyUserPassword });
      resourceUtilis.searchDriverWithCode({ driverCode: searchDriverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyElementTextContains({ locator: generalPage.titleFleetRelationships, verifyText: generalData.staticData.lblFleetRelationships });
      genericUtils.verifyTextOrBackGroundColor({ locator: generalPage.btnAddFleetDisabled, color: generalData.staticData.colorAttr, colorCode: generalData.expectedData.colorDisabled });
      genericUtils.verifyTextOrBackGroundColor({ locator: generalPage.kebabFleetmenu, color: generalData.staticData.colorAttr, colorCode: generalData.expectedData.colorDisabled });
    });
});