/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create Keycloak User Scopes for the Power Fleet Relationships Card - View Disabled and Edit, Add, Delete//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 20-03-2023,
 Functions/Calling References  : resourceUtilis, powerDetails, utilities, genericUtils, loginUtils
 Test case Included            : ME-142335 Verify user is able to Add data in Fleet Relationships card when user have scope/permission to Edit  > Power |  Assets - Power | Regression
                                 ME-142343 Verify user is able to Add,Edit and Delete data in Fleet Relationships card when user dont have scope/permission to EDIT and View  > Power | General | Fleet Relationships card
                                 ME-142331  Verify user is able to Add,Edit and Delete data in Fleet Relationships card when user have scope/permission to only EDIT  > Power | General | Fleet Relationships card
                                 ME-142321  Verify user is able to Add,Edit and Delete data in Fleet Relationships card when user have scope/permission to only View  > Power | General | Fleet Relationships card
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  clickAction,
  verifyToExist,
  verifyToNotExist,
  verifyVisible,
  loginWithEmailAndPassword,
} from '../../../utilities/commonUtils/genericUtils';
import { addPowerFleet, editPowerFleet, deletePowerFleet, addPower, navigateToAddPowerNewPage } from '../../../utilities/assetUtils/resourceUtilis';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import addDriverPage from '../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const {
  tabGeneral,
} = powerDetails;
const {
  assetsNoScopeUser,
  assetsReadOnlyUser,
  assetsEditOnlyUser,
} = powerData.staticDataPower;
const {
  ownerFleetType,
  primaryFleetType,
  fleetNameCarrier,
  fleetNameJames,
} = powerData.expectedData;
const {
  fleetRelationShipCard,
  fleetAddNew,
} = addDriverPage.fleet;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const assetsNoScopeUserPassword = Cypress.env(`assetsNoScopeUserPassword${Cypress.env('environment')}`);
const assetsEditOnlyUserPassword = Cypress.env(`assetsEditOnlyUserPassword${Cypress.env('environment')}`);
const assetsReadOnlyUserPassword = Cypress.env(`assetsReadOnlyUserPassword${Cypress.env('environment')}`);
describe('Add a record in power with Maintenance [ME-133343]', () => {
  xit('ME-142335 Verify user is able to Add,Edit and Delete data in Fleet Relationships card when user have scope/permission to Edit and View  > Power | General | Fleet Relationships card',
    {
      tags: [
        '@assets',
        '@power',
        '@p1',
      ],
    }, () => {
      loginToApplication({ username: usernameText, password: passwordText });
      addPower();
      clickAction({ locator: tabGeneral });
      verifyToExist({ element: fleetRelationShipCard });
      addPowerFleet(ownerFleetType, fleetNameCarrier);
      editPowerFleet(primaryFleetType, fleetNameJames);
      deletePowerFleet();
    });
  it('ME-142343 Verify user is able to Add,Edit and Delete data in Fleet Relationships card when user dont have scope/permission to EDIT and View  > Power | General | Fleet Relationships card',
    {
      tags: [
        '@assets',
        '@power',
        '@p3',
      ],
    }, () => {
      loginWithEmailAndPassword({ emailText: assetsNoScopeUser, passwordText: assetsNoScopeUserPassword });
      navigateToAddPowerNewPage();
      verifyToNotExist({ element: fleetRelationShipCard });
    });
  it('ME-142331 Verify user is able to Add,Edit and Delete data in Fleet Relationships card when user have scope/permission to only EDIT  > Power | General | Fleet Relationships card',
    {
      tags: [
        '@assets',
        '@power',
        '@p3',
      ],
    }, () => {
      loginWithEmailAndPassword({ emailText: assetsEditOnlyUser, passwordText: assetsEditOnlyUserPassword });
      navigateToAddPowerNewPage();
      verifyToNotExist({ element: fleetRelationShipCard });
    });
  it('ME-142321  Verify user is able to Add,Edit and Delete data in Fleet Relationships card when user have scope/permission to only View  > Power | General | Fleet Relationships card',
    {
      tags: [
        '@assets',
        '@power',
        '@p3',
      ],
    }, () => {
      loginWithEmailAndPassword({ emailText: assetsReadOnlyUser, passwordText: assetsReadOnlyUserPassword });
      navigateToAddPowerNewPage();
      verifyVisible({ element: fleetRelationShipCard });
      verifyToNotExist({ element: fleetAddNew });
    });
});