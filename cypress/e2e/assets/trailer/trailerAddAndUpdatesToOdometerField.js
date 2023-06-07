/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating E2E Trailer Add,Edit and search Trailer
 Test Cases List
 Authored By                   : Murali
 Date                          : 31-04-2023,
 Functions/Calling References  : homePagePower, dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-99509 RenameToOdometerMilesInTrailer_Test Asset Trailer/Power - Updates to Odometer field.
                                 ME-99511 OdometerMilesAcceptingDataInTrailer_Test Asset Trailer/Power - Updates to Odometer field.
                                 ME-99514 UOMFieldRemovalInTrailer_Test Asset Trailer/Power - Updates to Odometer field.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  addTrailerByValidatingOdometerField,
} from '../../../utilities/assetUtils/resourceUtilis';
import {
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
//Create driver using TDM is not working so hardcoded driver code and name
describe('Validating Add,Edit and search Trailer Odometer field [ME-99509,ME-99511,ME-99514]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('[ME-99509,ME-99511,ME-99514] RenameToOdometerMilesInTrailer_Test Asset Trailer/Power - Updates to Odometer field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      //Verification and Validation of Odometer/Odometer Miles fields in Trailer General Page
      addTrailerByValidatingOdometerField();
    });
});