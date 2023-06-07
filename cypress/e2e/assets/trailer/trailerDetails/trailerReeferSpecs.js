/*---------------------------------------------------------------------------------------------------------------
User can verify specs fields in trailer add new page
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 01-06-2023
Functions/Calling References  : genericUtils,resourceUtilis,trailerDetailsData,trailerPage
Test case Included            : [ME-33702,ME-160668,ME-160667,ME-160669,ME-160666,ME-160665,ME-160663,
                                ME-160664,ME-160655,ME-160656,ME-160653,ME-160654,ME-160651,ME-160652,
                                ME-160649,ME-160650,ME-160661,ME-160662,ME-160659,ME-160660,ME-160657,ME-160658]: User can verify fields in trailer specs and verify dropdown values > Assets-Trailer-Add New Trailer| regression
----------------------------------------------------------------------------------------------------------*/
import * as genericUtils from '../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../utilities/assetUtils/resourceUtilis';
import * as trailerPage from '../../../../pageObjects/assets/trailer/trailerPage.json';
import * as trailerDetailsData from '../../../../testData/assets/trailer/trailerDetailsData.json';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let drpLiftGateType, drpAxleType, drpLandinGear, drpSuspension;
describe('User can verify fields in trailer specs and verify dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression [ME-33702,ME-160668,ME-160667,ME-160669,ME-160666,ME-160665,ME-160663,ME-160664,ME-160655,ME-160656,ME-160653,ME-160654,ME-160651,ME-160652,ME-160649,ME-160650,ME-160661,ME-160662,ME-160659,ME-160660,ME-160657,ME-160658]', () => {
  before(async () => {
    await genericUtils.getMinionValuesList('trailerLiftgateType').then((liftGateType) => {
      drpLiftGateType = liftGateType;
    });
    await genericUtils.getMinionValuesList('trailerAxleType').then((axleType) => {
      drpAxleType = axleType;
    });
    await genericUtils.getMinionValuesList('trailerLandingGear').then((landingGear) => {
      drpLandinGear = landingGear;
    });
    await genericUtils.getMinionValuesList('trailerSuspension').then((suspension) => {
      drpSuspension = suspension;
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    genericUtils.viewFullPage();
  });
  it('[ME-33702,ME-160668,ME-160667,ME-160669,ME-160846,ME-160847,ME-30118]- User can verify fields and verify if length field accepts numeric and verify its dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      resourceUtilis.verifyTrailerSpecsFields();
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.length, dataText: genericUtils.generateRandomNumber() });
      resourceUtilis.verifyTrailerSpecsMeasurementUnitDropDownValues(trailerPage.trailerSpecs.drpDwnLengthUnit);
    });
  it('[ME-160666,ME-160665,ME-160844]- User can verify if Exterior Height field accepts numeric and verify its dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.txtExteriorHeight, dataText: genericUtils.generateRandomNumber() });
      resourceUtilis.verifyTrailerSpecsMeasurementUnitDropDownValues(trailerPage.trailerSpecs.drpDwnExteriorHeight);
    });
  it('[ME-160663,ME-160664,ME-160841,ME-160842]- User can verify if Exterior Width field accepts numeric and verify its dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.txtExteriorWidth, dataText: genericUtils.generateRandomNumber() });
      resourceUtilis.verifyTrailerSpecsMeasurementUnitDropDownValues(trailerPage.trailerSpecs.drpDwnExteriorWidth);
    });
  it('[ME-160655,ME-160656,ME-160828,ME-160829]- User can verify if Front Interior Height field accepts numeric and verify its dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.txtFrontInteriorHeight, dataText: genericUtils.generateRandomNumber() });
      resourceUtilis.verifyTrailerSpecsMeasurementUnitDropDownValues(trailerPage.trailerSpecs.drpDwnFrontInteriorHeight);
    });
  it('[ME-160653,ME-160654,ME-160826,ME-160827,]- User can verify if Rear Interior Height field accepts numeric and verify its dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.txtRearInteriorHeight, dataText: genericUtils.generateRandomNumber() });
      resourceUtilis.verifyTrailerSpecsMeasurementUnitDropDownValues(trailerPage.trailerSpecs.drpDwnRearInteriorHeight);
    });
  it('[ME-160651,ME-160652,ME-160824,ME-160825]- User can verify if Interior Width field accepts numeric and verify its dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.txtInteriorWidth, dataText: genericUtils.generateRandomNumber() });
      resourceUtilis.verifyTrailerSpecsMeasurementUnitDropDownValues(trailerPage.trailerSpecs.drpDwnInteriorWidth);
    });
  it('[ME-160649,ME-160650,ME-160821,ME-160823]- User can verify if Door Width field accepts numeric and verify its dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.txtDoorWidth, dataText: genericUtils.generateRandomNumber() });
      resourceUtilis.verifyTrailerSpecsMeasurementUnitDropDownValues(trailerPage.trailerSpecs.drpDwnDoorWidth);
    });
  it('[ME-160661,ME-160662,ME-160838,ME-160840]- User can verify if GVMR field accepts numeric and verify its dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.txtGVMR, dataText: genericUtils.generateRandomNumber() });
      resourceUtilis.verifyTrailerSpecsGVMRDropDownValues(trailerPage.trailerSpecs.drpDwnGVMR);
    });
  it('[ME-160659,ME-160660,ME-160834,ME-160836]- User can verify if GAWR field accepts numeric and verify its dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.txtGWAR, dataText: genericUtils.generateRandomNumber() });
      resourceUtilis.verifyTrailerSpecsGVMRDropDownValues(trailerPage.trailerSpecs.drpDwnGAWR);
    });
  it('[ME-160657,ME-160658,ME-160830,ME-160832]- User can verify if Weight and Axle Count field accepts numeric and verify its dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.txtWeight, dataText: genericUtils.generateRandomNumber() });
      resourceUtilis.verifyTrailerSpecsGVMRDropDownValues(trailerPage.trailerSpecs.drpDwnWeight);
      genericUtils.typeText({ locator: trailerPage.trailerSpecs.txtAxleCount, dataText: genericUtils.generateRandomNumber() });
    });
  it('[ME-160648,ME-160649,ME-160818,ME-160820]- User can verify if landing gear, suspension, liftgate type, axle type field  dropdown values > Add trailer |Assets-Trailer-Add Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      resourceUtilis.navigateToAddTrailer();
      genericUtils.dropDownExactClick({ element: trailerPage.trailerSpecs.trailerType, ddValue: trailerDetailsData.expectedData.editValType });
      cy.get(trailerPage.trailerSpecs.drpDwnLiftGateType).click({ force: true });
      cy.get(trailerPage.trailerSpecs.measurementUnitDrpDwnValues).each(($els, index) => {
        expect($els.text()).to.equal(drpLiftGateType[index]);
      });
      cy.get(trailerPage.trailerSpecs.drpDwnAxleType).click({ force: true });
      cy.get(trailerPage.trailerSpecs.measurementUnitDrpDwnValues).each(($els, index) => {
        expect($els.text()).to.equal(drpAxleType[index]);
      });
      cy.get(trailerPage.trailerSpecs.drpDwnETracks).click({ force: true });
      cy.get(trailerPage.trailerSpecs.measurementUnitDrpDwnValues).each(($els, index) => {
        expect($els.text()).to.equal(trailerDetailsData.staticData.eTracks[index]);
      });
      cy.get(trailerPage.trailerSpecs.drpDwnLandingGear).click({ force: true });
      cy.get(trailerPage.trailerSpecs.measurementUnitDrpDwnValues).each(($els, index) => {
        expect($els.text()).to.equal(drpLandinGear[index]);
      });
      cy.get(trailerPage.trailerSpecs.drpDwnSuspension).click({ force: true });
      cy.get(trailerPage.trailerSpecs.measurementUnitDrpDwnValues).each(($els, index) => {
        expect($els.text()).to.equal(drpSuspension[index]);
      });
    });
});