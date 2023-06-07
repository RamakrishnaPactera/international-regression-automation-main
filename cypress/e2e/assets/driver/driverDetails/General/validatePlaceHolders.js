/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating newly added and updated fields under general and operations tabs in Driver
 Test Cases List
 Authored By : Dasari Santhosh
 Date : 23-03-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : ME-141489 [FE]driver-verify Display "Search Carriers" within the "Company" field prior to entering data (light grey text) > Resources |  Assets - Driver General Tab | Regression
                      ME-141502 [FE]driver-verify Display 'Search Drivers' within the 'Trainer' field prior to entering data (light grey text) > Resources |  Assets - Driver General Tab | Regression
                      ME-141473 [FE]driver-verify Display "Search Trailers"  within the "Permanent Trailer"  field prior to entering data (light gray text) > Resources |  Assets - Driver General Tab | Regression
                      ME-141480 [FE]driver-verify Display "Seach Power" within the "Permanent Power" fields prior to entering data (light gray text) > Resources |  Assets - Driver General Tab | Regression
                      ME-141534 [FE]Driver Search-verify Display "Search Carriers" within the "Name" field within the Fleet Relationships Modal
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { navigateToDriverAddNewPage, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, getTDMData, verifyPlaceHolderText, viewFullPage, waitSometime } from '../../../../../utilities/commonUtils/genericUtils';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import generalPage from '../../../../../pageObjects/assets/driver/driverDetails/general/generalPage.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
const {
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  tdmDriverData,
} = historyData.staticData;
const { fleetAddBtn } = generalPage;
const { txtFieldName } = generalPage.fleetPopup;
const { driverCode } = generalData.userDefinedData;
const { txtSearchCarriers, txtSearchDrivers, txtSearchPower, txtSearchTrailers } = generalData.expectedData;
const { tabDriverGeneral } = driverCommonPage;
const { placeHolderCompanyField, txtFieldCompany, txtFieldTrainer, txtFieldPermanantTrailer, txtFieldPermanantPower, btnExpandDrpDwnPermanantTrailer } = driverAddNewPage;
const { shortWait } = commonData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;
describe('Validating driver fields place holders > Driver > Resources [ME-141489,ME-138955,ME-138964,ME-138958,ME-141534]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-141489 [FE]driver-verify Display "Search Carriers" within the "Company" field prior to entering data (light grey text) > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //validating in driver add new page
      navigateToDriverAddNewPage();
      verifyPlaceHolderText({ locator: placeHolderCompanyField, containsText: txtSearchCarriers });
      //validating in driver search page
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });
      verifyPlaceHolderText({ locator: txtFieldCompany, containsText: txtSearchCarriers });
    });
  it('ME-141502 [FE]driver-verify Display "Search Drivers" within the "Trainer" field prior to entering data (light grey text) > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //validating in driver add new page
      navigateToDriverAddNewPage();
      verifyPlaceHolderText({ locator: txtFieldTrainer, containsText: txtSearchDrivers });
      //validating in driver search page
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });
      verifyPlaceHolderText({ locator: txtFieldTrainer, containsText: txtSearchDrivers });
    });
  it('ME-141473 [FE]driver-verify Display "Search Trailers"  within the "Permanent Trailer"  field prior to entering data (light gray text) > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //validating in driver add new page
      navigateToDriverAddNewPage();
      clickAction({ locator: btnExpandDrpDwnPermanantTrailer });
      verifyPlaceHolderText({ locator: txtFieldPermanantTrailer, containsText: txtSearchTrailers });
      //validating in driver search page
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });
      clickAction({ locator: btnExpandDrpDwnPermanantTrailer });
      waitSometime(shortWait);
      verifyPlaceHolderText({ locator: txtFieldPermanantTrailer, containsText: txtSearchTrailers });
    });
  it('ME-141480 [FE]driver-verify Display "Seach Power" within the "Permanent Power" fields prior to entering data (light gray text) > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //validating in driver add new page
      navigateToDriverAddNewPage();
      verifyPlaceHolderText({ locator: txtFieldPermanantPower, containsText: txtSearchPower });
      //validating in driver search page
      searchDriverWithCode({ driverCode });
      clickAction({ locator: tabDriverGeneral });
      waitSometime(shortWait);
      verifyPlaceHolderText({ locator: txtFieldPermanantPower, containsText: txtSearchPower });
    });
  it('ME-141534 [FE]Driver Search-verify Display "Search Carriers" within the "Name" field within the Fleet Relationships Modal > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: ['@assets', '@resources', '@driver', '@p2'],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: tabDriverGeneral });
      clickAction({ locator: fleetAddBtn });
      verifyPlaceHolderText({ locator: txtFieldName, containsText: txtSearchCarriers });
    });
});