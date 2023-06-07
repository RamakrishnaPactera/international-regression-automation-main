/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating E2E Power Add,Edit and search Power
 Test Cases List
 Authored By                   : Murali
 Date                          : 29-04-2023,
 Functions/Calling References  : homePagePower, dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-99160 Verify the 'Odometer Miles' in Power is not allowing 'e' in the textbox
                                 ME-99510 RenameToOdometerMilesInPower_Test Asset Trailer/Power - Updates to Odometer field
                                 ME-99513 OdometerMilesAcceptingDataInPower_Test Asset Trailer/Power - Updates to Odometer field
                                 ME-99515 UOMFieldRemovalInPower_Test Asset Trailer/Power - Updates to Odometer field
                                 ME-134134 Test [FE] Power - Updates to Odometer field
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  addPowerByValidatingOdometerField,
} from '../../../utilities/assetUtils/resourceUtilis';
import {
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
//Create driver using TDM is not working so hardcoded driver code and name
describe('Validating Add,Edit and search Power Odometer field [ME-99160,ME-99510,ME-99513,ME-99515,ME-134134]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-99510][ME-99513][ME-99160][ME-99515][ME-134134] RenameToOdometerMilesInPower_Test Asset Trailer/Power - Updates to Odometer field',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p1',
      ],
    }, () => {
      //Verification and Validation of Odometer/Odometer Miles fields in Power General Page
      addPowerByValidatingOdometerField();
    });
});