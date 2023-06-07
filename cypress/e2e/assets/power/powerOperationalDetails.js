/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validate operational details in power add new page//
 Test Cases List
 Authored By                   : Mamatha Polapalli
 Date                          : 29-05-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-138686 Verify Division in power add new page > Resources |  Assets - Power | Regression
                                 ME-138674 Verify Power code field > Resources |  Assets - Power | Regression
                                 ME-138678 Verify class field in operational details > Resources |  Assets - Power | Regression
                                 ME-138684 Verify permanent driver in power add new > Resources |  Assets - Power | Regression
                                 ME-138685 Verify permanent trailer in power add new > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as resourceUtilis from '../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as powerDetailsPage from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import * as addDriverPage from '../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as historyData from '../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as trailerDetailsData from '../../../testData/assets/trailer/trailerDetailsData.json';
import * as trailerPage from '../../../pageObjects/assets/trailer/trailerPage.json';

const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const dateObjToday = genericUtils.getDateWithTargetDay({ targetDate: historyData.userDefinedData.todayCount });
const todayDateTime = `${dateObjToday.yyyy}${dateObjToday.mm}${dateObjToday.dd}${dateObjToday.hr}${dateObjToday.mins}${dateObjToday.sec}`;
const driverCode = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 5 }) + todayDateTime;
const trailerCode = trailerDetailsData.userDefinedData.prefix + genericUtils.generateRandomNumber();
let divisionValue, classValue;
describe('Validate Power operational details[ME-138674,ME-138686,ME-138678]', () => {
  beforeEach(() => {
    genericUtils.getMinionValues('division', 1).then((contactsDivision) => {
      divisionValue = contactsDivision[0];
    });
    genericUtils.getMinionValues('powerGeneralOpsClass', 1).then((powerClass) => {
      classValue = powerClass[0];
    });
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-138686 Verify Division field in operational details  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: addDriverPage.btnExpandDrpDwnDivisionTerm });
      genericUtils.dropDownContainsTextClick({ element: addDriverPage.btnExpandDrpDwnDivisionTerm, typeText: divisionValue, exactText: divisionValue });
      genericUtils.verifyNotContainValue({ element: powerDetailsPage.labelDivisionAsterick, Value: powerData.staticDataPower.asterick });
      resourceUtilis.addPower();
      genericUtils.verifyContains({ locator: addDriverPage.btnExpandDrpDwnDivisionTerm, containsText: divisionValue });
    });
  it('ME-138674 Verify power unit code in operational details  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: powerDetailsPage.txtFieldPower });
      genericUtils.verifyContains({ locator: powerDetailsPage.labelPowerUnitCodeAsterick, containsText: powerData.staticDataPower.asterick });
      genericUtils.verifyMaxLength({ locator: powerDetailsPage.txtFieldPowerUnitCodeInAddPower, maxLength: 25 });
    });
  it('ME-138678 Verify class field in operational details  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      genericUtils.verifyExists({ element: powerDetailsPage.drpDwnClass });
      genericUtils.verifyTxtNotToExist({ locator: powerDetailsPage.drpDwnClass, verifyTxt: classValue });
      resourceUtilis.addPower();
      genericUtils.verifyTxtNotToExist({ locator: powerDetailsPage.drpDwnClass, verifyTxt: classValue });
      genericUtils.dropDownContainsTextClick({ element: powerDetailsPage.drpDwnClass, typeText: classValue, exactText: classValue });
    });
  it('ME-138684 Verify permanent driver in power add new  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.createDriverForPermanentDriverVerification(driverCode);
      resourceUtilis.navigateToAddPowerNewPage();
      resourceUtilis.verifyPowerPermanentDriver(driverCode);
    });
  it('ME-138685 Verify permanent trailer in power add new  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.createTrailerWithMandatoryFields(trailerCode);
      genericUtils.clickAction({ locator: trailerPage.btnTrailerSave });
      resourceUtilis.navigateToAddPowerNewPage();
      resourceUtilis.verifyPowerPermanentTrailer(trailerCode);
    });
});