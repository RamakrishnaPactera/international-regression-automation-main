/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Display 'Search Drivers' within the 'Partner' field prior to entering data (light grey text) under General Tab in Driver//
 Test Cases List
 Authored By : Nikhil kumar
 Date : 13-04-2023,
 Functions/Calling References : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-141496] [FE]driver-verify Display Search Drivers within the Partner field prior to entering data (light grey text) in Add New driver and Search Driver
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { navigateToDriverAddNewPage, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, verifyAttrValueContains, viewFullPage } from '../../../../../utilities/commonUtils/genericUtils';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';

const { driverCode } = generalData.userDefinedData;
const { placeHolderAttr } = generalData.staticData;
const { searchDriverPlaceHolderVal } = generalData.expectedData;
const { tabDriverGeneral } = driverCommonPage;
const { txtPartnerField } = driverAddNewPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('[FE]driver-verify Display Search Drivers within the Partner field prior to entering data (light grey text) [ME-141496]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-141496 [FE]driver-verify Display Search Drivers within the Partner field prior to entering data (light grey text) in Add New driver and Search Driver > Resources | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();

      //verify "search Drivers" as a place holder in Partner field
      verifyAttrValueContains({ locator: txtPartnerField, attribute: placeHolderAttr, verifyText: searchDriverPlaceHolderVal });

      //search driver with code
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });

      //verify "search Drivers" as a place holder in Partner field
      verifyAttrValueContains({ locator: txtPartnerField, attribute: placeHolderAttr, verifyText: searchDriverPlaceHolderVal });
    });
});