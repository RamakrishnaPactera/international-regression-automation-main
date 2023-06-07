/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver -Address Card -Removal of Address Required Message _UI Testcases
 Test Cases List
 Authored By : Shashi Jaiswal
 Date : 02-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included:
 ME-55120  : Test Driver -Address Card -Verify Removal of Address Required Message
 ME-151951 : To verify if the user be able to save the Driver General page by giving other fields when address is not given while creating a driver
 ME-151965 : To verify if the user be able to view the Save button enabled in Driver General page when other mandatory fields are given but not Address while creating a driver
 ME-152031 : To verify if the user be not able to view Mandatory Address required message in Address card of Driver General Page while updating an existing driver
 ME-152028 : To verify if the user be able to save the Driver General page by giving other fields when address is not given while updating a driver
 ME-152030 : To verify if the user be able to view the Save button enabled in Driver General page when other mandatory fields are given but not Address while updating a driver
 ME-152053 : To verify if the user be able to save the Driver General page by giving other fields when address is given while updating a driver
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { enterDriverMandatoryFields, navigateToDriverAddNewPage, searchDriverWithCode, driverSaveAndVerifyUpdatedMsg, addAddress } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickActionWait, getMinionValues, verifyVisible, viewFullPage, verifyElementHaveValue, typeText, generateRandomAlphaNumByLength, verifyIfEnabled } from '../../../../../utilities/commonUtils/genericUtils';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';

const { txtFieldDriverFirstName, txtFieldDriverLastName, txtFieldPhoneNumber, btnDriverSave } = homePage;
const {
  tabDriverGeneral,
  snapShot,
} = driverCommonPage;
const {
  minionDrpDwnDrvAddrType,
} = generalData.staticData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

const validateInputFields = () => {
  verifyElementHaveValue({ locator: txtFieldDriverFirstName });
  verifyElementHaveValue({ locator: txtFieldDriverLastName });
  verifyElementHaveValue({ locator: txtFieldPhoneNumber });
};

let drpDwnDrvrAddrData, driverCodeWithoutAddr;
const shouldAddAddress = false;

describe('Test Driver -Address Card -Removal of Address Required Message _UI Testcases [ME-55120, ME-151951, ME-151965, ME-152031, ME-152028, ME-152030, ME-152053]', () => {
  before(() => {
    getMinionValues(minionDrpDwnDrvAddrType, 1).then((resultOptions) => {
      drpDwnDrvrAddrData = resultOptions[0];
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('[ME-55120, ME-151951, ME-151965] Creating driver without address',
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      const { driverCode } = enterDriverMandatoryFields(shouldAddAddress);
      driverCodeWithoutAddr = driverCode;
      verifyIfEnabled({ locator: btnDriverSave });
      driverSaveAndVerifyUpdatedMsg();
      searchDriverWithCode({ driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      verifyVisible({ element: snapShot });
      //validate input fields
      validateInputFields();
    });

  it('[ME-152028, ME-152030, ME-152031] Updating driver without address',
    () => {
      searchDriverWithCode({ driverCode: driverCodeWithoutAddr });
      clickActionWait({ locator: tabDriverGeneral });
      verifyVisible({ element: snapShot });
      //validate input fields
      validateInputFields();
      //update driver
      const lastName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      typeText({ locator: txtFieldDriverLastName, dataText: lastName });
      verifyIfEnabled({ locator: btnDriverSave });
      driverSaveAndVerifyUpdatedMsg();
      //validate input fields
      validateInputFields();
    });

  it('[ME-152053] Creating and updating driver with address',
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      const { driverCode } = enterDriverMandatoryFields(shouldAddAddress);
      addAddress({ typeOfAddress: drpDwnDrvrAddrData });
      verifyIfEnabled({ locator: btnDriverSave });
      driverSaveAndVerifyUpdatedMsg();
      searchDriverWithCode({ driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      verifyVisible({ element: snapShot });
      validateInputFields();
      //update driver
      const lastName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      typeText({ locator: txtFieldDriverLastName, dataText: lastName });
      verifyIfEnabled({ locator: btnDriverSave });
      driverSaveAndVerifyUpdatedMsg();
      validateInputFields();
    });
});