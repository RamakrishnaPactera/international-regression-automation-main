/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating Timeoff table fields are gray out in Driver
 Test Cases List
 Authored By : Sainath
 Date : 13-04-2023,
 Functions/Calling References : navigateToDriverAddNewPage, searchDriverWithCode, verifyTimeOffTblFieldsGrayOut,clickAction, viewFullPage
 Test case Included : ME-142168 : [FE]Driver-verify Gray out remaining fields within the 'Timeoff' table on the Add New Driver Record in Driver > Resources |  Assets - Driver General Tab | Regression
											ME-142175 : [FE]Driver-verify Gray out remaining fields within the 'Timeoff' table on the edit Driver Record in Driver > Resources |  Assets - Driver General Tab | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { navigateToDriverAddNewPage, searchDriverWithCode, verifyTimeOffTblFieldsGrayOut } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, viewFullPage } from '../../../../../utilities/commonUtils/genericUtils';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tabDriverGeneral,
} = driverCommonPage;
const driverCode = 'DME142175';
describe('Validating Timeoff table fields are gray out in Driver > Resources [ME-142168,ME-142175]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it("ME-142168 : [FE]Driver-verify Gray out remaining fields within the 'Timeoff' table on the Add New Driver Record in Driver > Resources |  Assets - Driver General Tab | Regression",
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      verifyTimeOffTblFieldsGrayOut();
    });
  it("ME-142175 : [FE]Driver-verify Gray out remaining fields within the 'Timeoff' table on the edit Driver Record in Driver > Resources |  Assets - Driver General Tab | Regression",
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });
      verifyTimeOffTblFieldsGrayOut();
    });
});