/*---------------------------------------------------------------------------------------------------------------
User can Create Trailer with Mandatory fields
Test Cases List
Authored By                   : Lingaswamy Kottha
Date                          : 03-05-2023
Functions/Calling References  : resourceUtilis,commonData,trailerDetailsData,trailerPage,genericUtils
Test case Included            : [ME-148552]: User can Update Trailer with All fields > Edit trailer > Search trailer|Assets-Trailer-Add New Trailer| regression
----------------------------------------------------------------------------------------------------------*/
import {
  generateRandomNumber,
  viewFullPage,
  getMinionValues,
} from '../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addTrailerMaintenanceRecd, trailerUpdate, trailerTrackingInformation, trailerOperationalDetails, trailerGeneralInformation, createTrailerWithMandatoryFields, saveTrailer, addTrailerFleet } from '../../../../utilities/assetUtils/resourceUtilis';
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
let trailerCode, maintenanceTypeValue, maintenanceSeverityValue, workPerformedValue;
describe('User can Update Trailer with Update fields > Update trailer |Assets-Trailer-Update Trailer| regression [ME-148552]', () => {
  beforeEach(() => {
    getMinionValues('trailerMaintenanceType', 1).then((maintenanceType) => {
      maintenanceTypeValue = maintenanceType[0];
    });
    getMinionValues('trailerMaintenanceSeverity', 1).then((maintenanceSeverity) => {
      maintenanceSeverityValue = maintenanceSeverity[0];
    });
    getMinionValues('trailerWorkPerformed', 1).then((workPerformed) => {
      workPerformedValue = workPerformed[0];
    });
    cy.log('***creating trailer using TDM***');
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('[ME-148552]- User can Update Trailer with Mandatory fields > Update trailer |Assets-Trailer-Update Trailer| regression',
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
      trailerUpdate();
      addTrailerMaintenanceRecd({ maintenanceTypeValue, maintenanceSeverityValue, workPerformedValue });
    });
});