/*---------------------------------------------------------------------------------------------------------------
 Disabled panels should show grayed out rather than blank > Driver > Add-New
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 18-05-2023
 Functions/Calling References  : crmNotesPage,carrierUtils,genericUtils
 Test case Included            : ME-155680 Test Disabled panels should show grayed out rather than blank > Driver > Add-New'
---------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { verifyVisible, viewFullPage, verifyAttrText } from '../../../../../utilities/commonUtils/genericUtils';
import { navigateToDriverAddNewPage } from '../../../../../utilities/assetUtils/resourceUtilis';
import addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
const {
  removalCardAttr,
  fleetAttr,
  repsAttrText,
} = addDriverData.staticData;
const {
  fleetRelationShipCard,
  fleetAttrText,
} = addDriverPage.fleet;
const {
  repsCard,
} = addDriverPage.reps;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
describe('Disabled panels should show grayed out rather than blank > Driver > Add-New [ME-155680]', () => {
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-155680 Test Disabled panels should show grayed out rather than blank > Driver > Add-New',
    () => {
      navigateToDriverAddNewPage();
      verifyVisible({ element: fleetRelationShipCard });
      verifyAttrText({ locator: fleetAttrText, attribute: removalCardAttr, verifyText: fleetAttr });
      verifyVisible({ element: repsCard });
      verifyAttrText({ locator: repsCard, attribute: removalCardAttr, verifyText: repsAttrText });
    });
});