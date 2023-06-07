/*---------------------------------------------------------------------------------------------------------------
User can Create Trailer with All fields
Test Cases List
Authored By                   : Lingaswamy Kottha
Date                          : 03-05-2023
Functions/Calling References  : genericUtils,resourceUtilis,trailerDetailsData,trailerPage
Test case Included            : [ME-148490]: User can Create Trailer with All fields > Create trailer > Assets-Trailer-Add New Trailer| regression
----------------------------------------------------------------------------------------------------------*/
import {
  generateRandomNumber,
  viewFullPage,
} from '../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { trailerTrackingInformation, trailerOperationalDetails, trailerGeneralInformation, createTrailerWithMandatoryFields, saveTrailer, addTrailerFleet } from '../../../../utilities/assetUtils/resourceUtilis';
import trailerDetailsData from '../../../../testData/assets/trailer/trailerDetailsData.json';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  ValType, ValDivision, BusinessUnit, fleetType, fleetName, makeVal, yearVal, modelVal,
  displayVal, compliantVal, measurementVal, containerProgramVal, permanentDriverCodesVal,
  permanentPowerUnitCodeVal, deviceVal, trackingDeviceVal,
} = trailerDetailsData.expectedData;
const {
  prefix,
} = trailerDetailsData.userDefinedData;
let trailerCode;
describe('User can Create Trailer with All fields > Add trailer |Assets-Trailer-Add Trailer| regression [ME-148490]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
    trailerCode = prefix + generateRandomNumber();
  });
  it('[ME-148490]- User can Create Trailer with All fields > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      createTrailerWithMandatoryFields(trailerCode);
      trailerGeneralInformation(makeVal, ValType, yearVal, modelVal, displayVal, compliantVal, measurementVal);
      trailerOperationalDetails(containerProgramVal, permanentDriverCodesVal, permanentPowerUnitCodeVal, ValDivision, BusinessUnit);
      trailerTrackingInformation(deviceVal, trackingDeviceVal, generateRandomNumber());
      saveTrailer();
      addTrailerFleet(fleetType, fleetName);
    });
});