/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Driver General Information - Create Driver with mandatory fields and Updated Addresses Fields through Pop-up
 Test Cases List
 Authored By : Hima Bindu Pulukurthi
 Date : 12-04-2023,
 Functions/Calling References : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included : ME-30122 Verify user can be able to add addresses card details | Assets - Driver General Tab | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  navigateToDriverAddNewPage,
  searchDriverWithCode,
  validateDrpDwnField,
  enterDriverMandatoryFields,
  driverSaveAction,
  clickEditInLastRow,
} from '../../../../../utilities/assetUtils/resourceUtilis';
import {
  clickActionWait,
  viewFullPage,
  verifyVisible,
  scrollIntoView,
  generateRandomAlphaNumByLength,
  toastWithMsg,
  typeText,
} from '../../../../../utilities/commonUtils/genericUtils';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';

const { tabDriverGeneral, snapShot } = driverCommonPage;
const { btnDriverSave } = homePage;
const { btnDialogSubmit } = historyPage;
const {
  btnExpandDrpDwnAddressType,
  btnExpandDrpDwnAddressCountry,
  txtFieldAddresStree1,
  txtFieldAddresPostalCode,
  txtFieldAddresCityState,
  drpdwnAddressCountry,
  drpdwnAddressType,
} = driverAddNewPage;
const { msgUpdated } = addDriverData.expectedData;

const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Validating addresses fields > Driver > Resources [ME-30122]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it(
    'ME-30122 Verify user can be able to add addresses through pop-up | Assets - Driver General Tab | Regression',
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
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();

      //creating driver with mandatory fields
      const driverCode = enterDriverMandatoryFields();
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      verifyVisible({ element: snapShot });

      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode }); //need to replace tdm driver code to driverCode;

      //Navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });

      //Editing Exisiting Data
      clickEditInLastRow();

      typeText({
        locator: txtFieldAddresStree1,
        dataText: generateRandomAlphaNumByLength({ lengthOfString: 10 }),
      });
      typeText({
        locator: txtFieldAddresCityState,
        dataText: generateRandomAlphaNumByLength({ lengthOfString: 10 }),
      });
      typeText({
        locator: txtFieldAddresPostalCode,
        dataText: generateRandomAlphaNumByLength({ lengthOfString: 6 }),
      });
      validateDrpDwnField({
        locatorBtn: btnExpandDrpDwnAddressType,
        locatorDrpDwn: drpdwnAddressType,
      });
      validateDrpDwnField({
        locatorBtn: btnExpandDrpDwnAddressCountry,
        locatorDrpDwn: drpdwnAddressCountry,
      });

      clickActionWait({ locator: btnDialogSubmit });

      //save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
    },
  );
});