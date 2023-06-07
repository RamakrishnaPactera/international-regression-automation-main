/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 verifying removed fields under General Tab in Driver//
 Test Cases List
 Authored By : Dasari Santhosh
 Date : 23-03-2023,
 Functions/Calling References : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included : ME-133237 Verify remove fields for search Driver > Resources | Assets - Driver General Tab | Regression
                      ME-133232 Verify remove fields for Add New Driver > Resources |  Assets - Driver General Tab | Regression
                      ME-141519 [FE]Driver Search-verify 3 Columns - "Manager", "Geography", "Domicile" removed or not > Resources |  Assets - Driver Search Page | Regression
                      ME-147420 [FE]Add Driver - Remove Mobile Phone requirement
                      ME-147426 [FE]Search Driver - Remove Mobile Phone Validation
                      Me-147422 [FE]Add Driver - Remove Mobile Phone validation
                      ME-147425 [FE]Search Driver - Remove Mobile Phone requirement
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { driverSaveAction, enterDriverMandatoryFields, navigateToDriverAddNewPage, navigateToDriverSearchPage, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clearText, clickAction, clickActionWait, toastWithMsg, typeText, verifyDoesNotExist, verifyNotContainValue, viewFullPage, waitSometime } from '../../../../../utilities/commonUtils/genericUtils';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
const { driverCode, personalInformation } = generalData.userDefinedData;
const { labelManager, txtFieldManager, txtFieldDriverRegion, txtFieldDomicile, txtFieldMilesRun, txtFieldPartnerID, txtFieldPowerTractorType, txtFieldTrailerType, colHeaderManager, colHeaderGeography, colHeaderDomicile, phoneNumberMandatory, txtFieldPhoneNumber, smsOk, driverForm } = driverAddNewPage;
const { tabDriverGeneral } = driverCommonPage;
const { shortWait } = commonData;
const {
  btnSearchSubmit,
  txtFieldDriverCode,
} = driverSearchPage;
const {
  msgUpdated,
} = addDriverData.expectedData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
describe('verifying removed fields in add driver and edit pages [ME-133237,ME-133232][ME-147420,ME-147422,ME-147425,ME-147426][ME-147032,ME-147038][ME-147009,ME-147010] ', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-133237 Verify remove fields for search Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      const removedFields = [txtFieldManager, txtFieldDriverRegion, txtFieldDomicile, txtFieldMilesRun, txtFieldPartnerID, txtFieldPowerTractorType, txtFieldTrailerType];
      navigateToDriverAddNewPage();
      for (let i = 0; i < removedFields.length; i++) {
        verifyDoesNotExist({ element: removedFields[i] });
      }
    });
  it('ME-133232 Verify remove fields for Add New Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      const removedFields = [txtFieldManager, txtFieldDriverRegion, txtFieldDomicile, txtFieldMilesRun, txtFieldPartnerID, txtFieldPowerTractorType, txtFieldTrailerType];
      searchDriverWithCode({ driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      verifyDoesNotExist({ element: labelManager });
      for (let i = 0; i < removedFields.length; i++) {
        verifyDoesNotExist({ element: removedFields[i] });
      }
    });
  it('ME-141519 [FE]Driver Search-verify 3 Columns - "Manager", "Geography", "Domicile" removed or not > Resources |  Assets - Driver Search Page | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverSearch',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      const removedColumns = [colHeaderManager, colHeaderGeography, colHeaderDomicile];
      //validating removed columns before driver search
      navigateToDriverSearchPage();
      for (let i = 0; i < removedColumns.length; i++) {
        verifyDoesNotExist({ element: removedColumns[i] });
      }
      //validating removed columns after driver search
      typeText({ locator: txtFieldDriverCode, dataText: driverCode });
      clickAction({ locator: btnSearchSubmit });
      for (let i = 0; i < removedColumns.length; i++) {
        verifyDoesNotExist({ element: removedColumns[i] });
      }
    });
  it('[ME-147420,ME-147422,ME-147425,ME-147426] [FE] Add Driver - Remove Mobile Phone requirement and Validation > Resources | Assets - Driver General Tab ',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      verifyDoesNotExist({ element: phoneNumberMandatory });
      const { driverCode } = enterDriverMandatoryFields();
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Search Driver with code and verify
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });
      waitSometime(shortWait);
      //clearing the Phone number, it should able to save
      clearText({ locator: txtFieldPhoneNumber });
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      verifyDoesNotExist({ element: phoneNumberMandatory });
    });

  it('[ME-147032,ME-147038] Add Driver and Search - Remove ‘SMS ok’ as a field in General Info Card> Resources | Assets - Driver General Tab',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      verifyDoesNotExist({ element: smsOk });
      const { driverCode } = enterDriverMandatoryFields();
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Search Driver with code and verify
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });
      waitSometime(shortWait);
      verifyDoesNotExist({ element: smsOk });
    });

  it('[ME-147009,ME-147010][FE] Add Driver and Search - Remove ‘Personal Information card’ in General Info Card> Resources | Assets - Driver General Tab ',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //verify the Personal information card should not contain in the Driver Page
      verifyNotContainValue({ element: driverForm, Value: personalInformation });
      const { driverCode } = enterDriverMandatoryFields();
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });
      waitSometime(shortWait);
      clearText({ locator: txtFieldPhoneNumber });
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //verify the Personal information card should not contain in the Driver Page
      verifyNotContainValue({ element: driverForm, Value: personalInformation });
    });
});