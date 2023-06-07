/*---------------------------------------------------------------------------------------------------------------
Test Business Scenario - Trailer Specs - Dry
Test Cases List
Authored By                   : Sanjeev Bandari
Date                          : 01-06-2023
Functions/Calling References  : genericUtils,resourceUtilis,trailerDetailsData,trailerPage
Test case Included:[ME-28596,ME-160784,ME-160882,160902,ME-160905,ME-160906,ME-160907,ME-161005,ME-161009,ME-161011,ME-161013,ME-161017,ME-161055,ME-161056,ME-161057,ME-161059,ME-161060,ME-161062,ME-161063,ME-161066,ME-161068,ME-161069,ME-161070,ME-161071,ME-161072,ME-161073,ME-161074]
                  :[ME-33699,ME-161400,ME-161401,ME-161402,ME-161403,ME-161404,ME-161405,ME-161406,ME-161407,ME-161408,ME-161409,ME-161410,ME-161411,ME-161412,ME-161413,ME-161414,ME-161415,ME-161416,ME-161423,ME-161425,ME-161427,ME-161428,ME-161430,ME-161431,ME-161432,ME-161433,ME-161434]
----------------------------------------------------------------------------------------------------------*/
import {
  dropDownTxtExactClick,
  generateRandomNumberByLength,
  getMinionValues,
  typeText,
  verifyElementTextContains,
  verifyIfDisabled,
  verifyIfEnabled,
  verifySingleSelectDropDownFunction,
  viewFullPage,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { navigateToAddTrailer } from '../../../../utilities/assetUtils/resourceUtilis';
import trailerDetailsData from '../../../../testData/assets/trailer/trailerDetailsData.json';
import trailerPage from '../../../../pageObjects/assets/trailer/trailerPage.json';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  spec,
  drpDwnGenInfoTypeTerm,
} = trailerPage;
const { shortWait } = commonData;
const {
  minionImperialDimensionsUOM,
  minionImperialWeightUOM,
  minionTrailerAxleType,
  minionTrailerETracks,
  minionTrailerLandingGear,
  minionTrailerLiftgateType,
  minionTrailerSuspension,
  specDetails,
  specDetailsButtonEle,
  specDetailsDisbaled,
  specDetailsEle,
  specDetailsInputEle,
  typeEmptyVal,
  typeTermVal,
} = trailerDetailsData.staticData;
let drpDwnImperialDimensionsUOM, drpDwnImperialWeightUOM, drpDwnTrailerLandingGear, drpDwnTrailerLiftgateType, drpDwnTrailerSuspension, drpDwnTrailerAxleType, drpDwnTrailerETracks;
describe('Test Business Scenario - Trailer Specs - Dry [ME-28596,ME-160784,ME-160882,160902,ME-160905,ME-160906,ME-160907,ME-161005,ME-161009,ME-161011,ME-161013,ME-161017,ME-161055,ME-161056,ME-161057,ME-161059,ME-161060,ME-161062,ME-161063,ME-161066,ME-161068,ME-161069,ME-161070,ME-161071,ME-161072,ME-161073,ME-161074,ME-33699,ME-161400,ME-161401,ME-161402,ME-161403,ME-161404,ME-161405,ME-161406,ME-161407,ME-161408,ME-161409,ME-161410,ME-161411,ME-161412,ME-161413,ME-161414,ME-161415,ME-161416,ME-161423,ME-161425,ME-161427,ME-161428,ME-161430,ME-161431,ME-161432,ME-161433,ME-161434],', () => {
  before(() => {
    getMinionValues(minionImperialDimensionsUOM, 2).then((resultOptions) => {
      drpDwnImperialDimensionsUOM = resultOptions;
    });
    getMinionValues(minionImperialWeightUOM, 4).then((resultOptions) => {
      drpDwnImperialWeightUOM = resultOptions;
    });
    getMinionValues(minionTrailerLandingGear, 3).then((resultOptions) => {
      drpDwnTrailerLandingGear = resultOptions;
    });
    getMinionValues(minionTrailerLiftgateType, 4).then((resultOptions) => {
      drpDwnTrailerLiftgateType = resultOptions;
    });
    getMinionValues(minionTrailerSuspension, 5).then((resultOptions) => {
      drpDwnTrailerSuspension = resultOptions;
    });
    getMinionValues(minionTrailerAxleType, 7).then((resultOptions) => {
      drpDwnTrailerAxleType = resultOptions;
    });
    getMinionValues(minionTrailerETracks, 2).then((resultOptions) => {
      drpDwnTrailerETracks = resultOptions;
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('[ME-28596,ME-33699] Test Trailer Specs - Dry: Verify the fields displayed under Trailer Specs Section',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      specDetailsEle.forEach((element, index) => {
        verifyElementTextContains({ locator: `${spec.trailerSpecFieldLabelFirst}${element}${spec.trailerSpecFieldLabelSecond}`, verifyText: specDetails[index] });
      });
    });
  it('[ME-160784,ME-161400] Test Trailer Specs - Verify whether all the fields under Trailer Specs section are functionally enabled',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      specDetailsInputEle.forEach((element) => {
        verifyIfEnabled({ locator: `${spec.trailerSpecFieldLabelFirst}${element}${spec.trailerSpecFieldInputSecond}` });
      });
      specDetailsButtonEle.forEach((element) => {
        verifyIfEnabled({ locator: `${spec.trailerSpecFieldLabelFirst}${element}${spec.trailerSpecFieldButtonSecond}` });
      });
      specDetailsDisbaled.forEach((element) => {
        verifyIfDisabled({ locator: `${spec.trailerSpecFieldLabelFirst}${element}${spec.trailerSpecFieldInputSecond}` });
      });
    });
  it('[ME-160882,ME-160902,ME-161401,ME-161402] Test Trailer Specs - Dry: Verify Length Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.trailerLength, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnTrailerLengthUnit, drpDwnOptions: drpDwnImperialDimensionsUOM });
    });
  it('[ME-160905,ME-160906,ME-161403,ME-161404] Test Trailer Specs - Dry: Verify Exterior Height Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.trailerExteriorHeight, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnTrailerExteriorHeightUnit, drpDwnOptions: drpDwnImperialDimensionsUOM });
    });
  it('[ME-160907,ME-161005,ME-161405,ME-161406] Test Trailer Specs - Verify Exterior Width Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.trailerExteriorWidth, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnTrailerExteriorWidthUnit, drpDwnOptions: drpDwnImperialDimensionsUOM });
    });
  it('[ME-161009,ME-161011,ME-161407,ME-161408] Test Trailer Specs - Verify GVWR Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.grossVehicleWeightRating, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnGrossVehicleWeightRatingUnit, drpDwnOptions: drpDwnImperialWeightUOM });
    });
  it('[ME-161013,ME-161017,ME-161409,ME-161410] Test Trailer Specs - Verify GAWR Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.grossAxleWeightRating, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnGrossAxleWeightRatingUnit, drpDwnOptions: drpDwnImperialWeightUOM });
    });
  it('[ME-161055,ME-161056,ME-161411,ME-161412] Test Trailer Specs - Verify Weight Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.trailerWeight, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwntrailerWeightUnit, drpDwnOptions: drpDwnImperialWeightUOM });
    });
  it('[ME-161057,ME-161059,ME-161413,ME-161414] Test Trailer Specs - Verify Front Interior Height Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.trailerFrontInteriorHeight, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnTrailerFrontInteriorHeight, drpDwnOptions: drpDwnImperialDimensionsUOM });
    });
  it('[ME-161060,ME-161062,ME-161414,ME-161415] Test Business Scenario -Verify Rear Interior Height Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.trailerRearInteriorHeight, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnTrailerRearInteriorHeightUnit, drpDwnOptions: drpDwnImperialDimensionsUOM });
    });
  it('ME-161063,ME-161066,ME-161423,ME-161425] Test Trailer Specs - Verify Interior Width Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.trailerInteriorWidth, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnTrailerInteriorWidthUnit, drpDwnOptions: drpDwnImperialDimensionsUOM });
    });
  it('[ME-161068,ME-161069,ME-161427,ME-161428] Test Trailer Specs -Verify Door Width Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.trailerDoorWidth, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnTrailerDoorWidthUnit, drpDwnOptions: drpDwnImperialDimensionsUOM });
    });
  it('[ME-161070,ME-161430] Test Trailer Specs -Verify Landing Gear Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnLandingGearTerm, drpDwnOptions: drpDwnTrailerLandingGear });
    });
  it('[[ME-161072,ME-161432] Test Trailer Specs -Verify the "Liftgate type:" field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnliftgateTypeTerm, drpDwnOptions: drpDwnTrailerLiftgateType });
    });
  it('[ME-161071,ME-161431] Test Trailer Specs -Verify Suspension Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnSuspensionTerm, drpDwnOptions: drpDwnTrailerSuspension });
    });
  it('[ME-161073,ME-161433] Test Trailer Specs -Verify the "Axle type:" field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      typeText({ locator: spec.axleCount, dataText: generateRandomNumberByLength({ lengthOfNum: 2 }) });
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnAxleTypeTerm, drpDwnOptions: drpDwnTrailerAxleType });
    });
  it('[ME-161074,ME-161434] Test Trailer Specs -Verify the "E -Tracks:" field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      navigateToAddTrailer();
      waitSometime(shortWait);
      dropDownTxtExactClick({ element: drpDwnGenInfoTypeTerm, ddTxt: typeTermVal });
      drpDwnTrailerETracks.unshift(typeEmptyVal);
      verifySingleSelectDropDownFunction({ drpDwnEle: spec.drpDwnIsETracks, drpDwnOptions: drpDwnTrailerETracks });
    });
});