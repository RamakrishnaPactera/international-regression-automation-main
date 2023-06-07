/*---------------------------------------------------------------------------------------------------------------
User can Create Trailer with Mandatory fields
Test Cases List
Authored By                   : Lingaswamy Kottha
Date                          : 29-03-2023
Functions/Calling References  : homePage,commonData,trailerDetailsData,trailerPage,utilities
Test case Included            : [ME-139936,ME-139937,ME-139938]: User can Create Trailer with Mandatory fields > Edit trailer > Search trailer|Assets-Trailer-Add New Trailer| regression
----------------------------------------------------------------------------------------------------------*/
import {
  generateRandomNumber,
  viewFullPage,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchTrailerWithCode, createTrailerWithMandatoryFields, saveTrailer, createTrailerWithOptionalFields, searchTrailerWithType, addTrailerFleet, validateRow, editTrailer } from '../../../../utilities/assetUtils/resourceUtilis';
import trailerDetailsData from '../../../../testData/assets/trailer/trailerDetailsData.json';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

const { shortWait } = commonData;
const {
  ValType, ValDivision, BusinessUnit, fleetType, fleetName, editValType, editValDivision,
} = trailerDetailsData.expectedData;
const {
  prefix,
} = trailerDetailsData.userDefinedData;
let trailerCode;
describe('User can Create Trailer with Mandatory fields > Edit trailer |Assets-Trailer-Search Trailer| regression [ME-139936,ME-139937,ME-139938]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    trailerCode = prefix + generateRandomNumber();
  });
  it('[ME-139936]- User can Create Trailer with Mandatory fields > Create trailer |Assets-Trailer-Add New Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
        '@phase2',
      ],
    }, () => {
      createTrailerWithMandatoryFields(trailerCode);
      saveTrailer();
      addTrailerFleet(fleetType, fleetName);
      waitSometime(shortWait);
    });
  it('[ME-139937]- User can Search Trailer with Mandatory fields > Search trailer |Assets-Trailer-Search Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
        '@phase2',
      ],
    }, () => {
      createTrailerWithOptionalFields(trailerCode, ValType, ValDivision, BusinessUnit);
      saveTrailer();
      searchTrailerWithType(ValType, trailerCode);
      waitSometime(shortWait);
      validateRow(fleetName);
      searchTrailerWithCode({ trailerCode });
    });
  it('[ME-139938]- User can Edit Trailer with Mandatory fields > Edit trailer |Assets-Trailer-Edit Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
        '@phase2',
      ],
    }, () => {
      createTrailerWithOptionalFields(trailerCode, ValType, ValDivision, BusinessUnit);
      saveTrailer();
      searchTrailerWithCode({ trailerCode });
      waitSometime(shortWait);
      editTrailer(editValType, editValDivision);
    });
});