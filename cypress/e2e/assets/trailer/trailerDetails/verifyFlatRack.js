/*----------------------------------------------------------------------------------------------------------------------------------------------
Test Trailer General - Trailer spec files - Flat Rack
 Test Cases List
 Authored By                   : Hima Bindu P.
 Date                          : 04-06-23
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils, resourceUtilis
 Test case Included            : ME-160703, ME-160868, ME-28597, ME-33700 ME-160702, ME-160704, ME-161451, ME-161452, ME-160705, ME-160706, ME-161453, ME-161454, ME-160707, ME-160708 ME-161455, ME-161456,
 ME-160709, ME-161450, ME-161457, ME-161458, ME-161461, ME-161462, ME-161475, ME-161476, ME-161471,ME-161485,ME-161472, ME-161486
---------------------------------------------------------------------------------------------------------------------------------------------*/
import {
  clickAction,
  validateSpecNumField,
  verifyIfEnabled,
  verifyLengthOfText,
  verifyToExist,
  viewFullPage,
} from '../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import trailerPage from '../../../../pageObjects/assets/trailer/trailerPage.json';
import { navigateToAddTrailer } from '../../../../utilities/assetUtils/resourceUtilis';
import trailerDetailsData from '../../../../testData/assets/trailer/trailerDetailsData.json';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  flatRackType,
  generalTypeTerm,
  trailerLength,
  trailerExteriorHeight,
  trailerExteriorWidth,
  trailerGVWR,
  trailerWeight,
  trailerLandingGear,
  trailerSuspension,
  specs,
  spec,
  trailerSpecs,
} = trailerPage;
const {
  maxLength,
  maxLength13,
} = trailerDetailsData.userDefinedData;
let dimensionData;
describe('Verify Trailer Specs > Flat Rack in General Tab > AddNew trailer |Assets-Trailer-Add New Trailer| regression ME-133373, ME-160868', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-160703, ME-160868, ME-28597, ME-33700 - Verify whether all the fields under Trailer Specs section are functionally enabled > AddNew trailer |Assets-Trailer-Add New Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      navigateToAddTrailer();
      clickAction({ locator: generalTypeTerm });
      clickAction({ locator: flatRackType });
      verifyIfEnabled({ locator: trailerLength });
      verifyIfEnabled({ locator: trailerExteriorHeight });
      verifyIfEnabled({ locator: trailerExteriorWidth });
      verifyIfEnabled({ locator: trailerGVWR });
      verifyIfEnabled({ locator: trailerWeight });
      verifyIfEnabled({ locator: trailerLandingGear });
      verifyIfEnabled({ locator: trailerSuspension });
    });
  it('ME-160702, ME-160704, ME-161451, ME-161452  - Verify unit values and numeric field of length fields under Trailer Specs section > AddNew trailer |Assets-Trailer-Add New Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      navigateToAddTrailer();
      clickAction({ locator: generalTypeTerm });
      clickAction({ locator: flatRackType });
      validateSpecNumField({ locator: specs.txtLength, drpDwn: specs.drpDwnLength, drpBtn: specs.btnDrpDwnLength, optArray: dimensionData });
      verifyToExist({ element: trailerPage.trailerSpecs.inUnitDrpDwn });
      verifyToExist({ element: trailerPage.trailerSpecs.ftUnitDrpDwn });
    });
  it('ME-160705, ME-160706, ME-161453, ME-161454 - Verify unit values and numeric field of Exterior Height fields under Trailer Specs section > AddNew trailer |Assets-Trailer-Add New Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      navigateToAddTrailer();
      clickAction({ locator: generalTypeTerm });
      clickAction({ locator: flatRackType });
      validateSpecNumField({ locator: spec.trailerExteriorHeight, drpDwn: spec.drpDwnTrailerExteriorHeightUnit, drpBtn: trailerSpecs.drpDwnExteriorHeight, optArray: dimensionData });
      verifyToExist({ element: trailerPage.trailerSpecs.inUnitDrpDwn });
      verifyToExist({ element: trailerPage.trailerSpecs.ftUnitDrpDwn });
    });
  it('ME-160707, ME-160708 ME-161455, ME-161456  - Verify unit values and numeric field of Exterior Weight fields under Trailer Specs section > AddNew trailer |Assets-Trailer-Add New Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      navigateToAddTrailer();
      clickAction({ locator: generalTypeTerm });
      clickAction({ locator: flatRackType });
      validateSpecNumField({ locator: specs.txtExtWidth, drpDwn: specs.drpDwnExtWidth, drpBtn: specs.btnDrpDwnExtWidth, optArray: dimensionData });
      verifyToExist({ element: trailerPage.trailerSpecs.inUnitDrpDwn });
      verifyToExist({ element: trailerPage.trailerSpecs.ftUnitDrpDwn });
    });
  it('ME-160709, ME-161450, ME-161457, ME-161458- Verify unit values and numeric field of GVWR fields under Trailer Specs section > AddNew trailer |Assets-Trailer-Add New Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      navigateToAddTrailer();
      clickAction({ locator: generalTypeTerm });
      clickAction({ locator: flatRackType });
      validateSpecNumField({ locator: specs.txtGvwr, drpDwn: specs.drpDwnGvwr, drpBtn: specs.btnDrpDwnGvwr, optArray: dimensionData });
      verifyToExist({ element: trailerPage.trailerSpecs.ozUnitDrpDwn });
      verifyToExist({ element: trailerPage.trailerSpecs.lbUnitDrpDwn });
      verifyToExist({ element: trailerPage.trailerSpecs.cwtUnitDrpDwn });
      verifyToExist({ element: trailerPage.trailerSpecs.tUnitDrpDwn });
    });
  it('ME-161461, ME-161462, ME-161475, ME-161476 - Verify unit values and numeric field of weight fields under Trailer Specs section > AddNew trailer |Assets-Trailer-Add New Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      navigateToAddTrailer();
      clickAction({ locator: generalTypeTerm });
      clickAction({ locator: flatRackType });
      validateSpecNumField({ locator: specs.txtWeight, drpDwn: specs.drpDwnWeight, drpBtn: specs.btnDrpDwnWeight, optArray: dimensionData });
      verifyToExist({ element: trailerPage.trailerSpecs.ozUnitDrpDwn });
      verifyToExist({ element: trailerPage.trailerSpecs.lbUnitDrpDwn });
      verifyToExist({ element: trailerPage.trailerSpecs.cwtUnitDrpDwn });
      verifyToExist({ element: trailerPage.trailerSpecs.tUnitDrpDwn });
    });
  it('ME-161471,ME-161485 - Verify Landing Gear field under Trailer Specs section > AddNew trailer |Assets-Trailer-Add New Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      navigateToAddTrailer();
      clickAction({ locator: generalTypeTerm });
      clickAction({ locator: flatRackType });
      verifyLengthOfText({ locator: spec.drpDwnLandingGearTerm, maxLength: maxLength13 });
    });
  it('ME-161472, ME-161486 - Verify suspension field under Trailer Specs section > AddNew trailer |Assets-Trailer-Add New Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      navigateToAddTrailer();
      clickAction({ locator: generalTypeTerm });
      clickAction({ locator: flatRackType });
      verifyLengthOfText({ locator: spec.drpDwnSuspensionTerm, maxLength: maxLength });
    });
});