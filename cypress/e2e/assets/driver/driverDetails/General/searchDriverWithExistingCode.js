/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver - search driver with Existing code - UI testcase
 Test Cases List                : ME-64425,ME-65979,ME-65984,ME-65986,ME-63590,ME-64442,ME-65985
 Authored By                    : Mamatha Polapalli
 Date                           : 19-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             : ME-64425 : Weekly Target: user can validate search driver with existing code Assets > Driver > Search Page | Regression
                                : ME-65979 : search driver with division Assets > Driver > Search Page | Regression
                                : ME-65984 : Search driver with invalid code and division Assets > Driver > Search Page | Regression
                                : ME-65986,ME-63590,ME-64442 : search driver with code and verify code, suffix field name attribute Assets > Driver > Search Page | Regression
                                : ME-65985 : Add new driver and verify the added driver is searchable Assets > Driver > Search Page | Regression
                                : ME-152786 Validate if user is able to perform Driver Search functionality without having search criteria selected> Driver > Search Page| Regression
                                : ME-147445 Driver-UI-Verify the lables are removed and aligned in driver grey header- Driver > Search Page| Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import * as driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import * as historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let divisionValue, driverDataTDM;
const dateObjToday = genericUtils.getDateWithTargetDay({ targetDate: historyData.userDefinedData.todayCount });
const todayDateTime = `${dateObjToday.yyyy}${dateObjToday.mm}${dateObjToday.dd}${dateObjToday.hr}${dateObjToday.mins}${dateObjToday.sec}`;
const driverCode = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 5 }) + todayDateTime;
const { longWait } = commonData;
describe('Search driver with existing code - UI Testcase [ME-64425,ME-65979,ME-65984,ME-152786,ME-147445]', () => {
  beforeEach(() => {
    cy.then(() => {
      cy.log('***creating driver using TDM***');
      genericUtils.getTDMData({ dataType: historyData.staticData.tdmDriverData, dataCondition: historyData.staticData.tdmAddDriverReq, dataScenario: historyData.staticData.tdmDriverCommonScenario });
      cy.then(() => {
        driverDataTDM = Cypress.env('inputVal');
      });
      genericUtils.getMinionValues('division', 1).then((contactsDivision) => {
        divisionValue = contactsDivision[0];
      });
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-64425 : search driver with exixting code and is displayed correctly view Assets > Driver > Search Page| Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithExistingCode(generalData.userDefinedData.driverCode);
    });
  it('ME-65979 : search driver with division and is displayed correctly view Assets > Driver > Search Page| Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithDivision(divisionValue);
      genericUtils.verifyAttrText({ locator: driverSearchPage.rowDataDivision, attribute: historyData.staticData.attrTitle, verifyText: divisionValue });
    });
  it('ME-65984 : search driver with invalid code and division Assets > Driver > Search Page| Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithInvalidCode(generalData.userDefinedData.invalidDriverCode, divisionValue);
    });
  it('ME-65986,ME-63590,ME-64442 : search driver with code and verify code, suffix field name attribute Assets > Driver > Search Page| Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: driverCommonPage.tabDriverGeneral });
      resourceUtilis.verifySearchedDriverCode(driverDataTDM.driverCode);
    });
  it('ME-65985 : Add new driver and verify the added driver is searchable Assets > Driver > Search Page| Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.navigateToDriverAddNewPage();
      resourceUtilis.addDriverAndVerifyCode(driverCode);
      resourceUtilis.driverSaveAction();
      resourceUtilis.searchDriverWithExistingCode(driverCode);
    });
  it('ME-152786 Validate if user is able to perform Driver Search functionality without having search criteria selected> Driver > Search Page| Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      genericUtils.verifyToExist({ element: homePage.resourcesMenu });
      genericUtils.clickAction({ locator: homePage.resourcesMenu });
      genericUtils.verifyToExist({ element: homePage.resourcesDDO.driverSearch });
      genericUtils.clickAction({ locator: homePage.resourcesDDO.driverSearch });
      genericUtils.verifyToExist({ element: driverSearchPage.btnSearchSubmit });
      genericUtils.clickAction({ locator: driverSearchPage.btnSearchSubmit });
      genericUtils.waitSometime(longWait);
      genericUtils.gridRowCount({ locator: driverSearchPage.searchTblData });
      cy.then(() => {
        const rCount = Cypress.env('rowCount');
        expect(rCount).to.be.gt(1);
      });
    });
  it('ME-147445 Driver-UI-Verify the lables are removed and aligned in driver grey header- Driver > Search Page| Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.verifyElementTextDoesNotContain({ locator: driverSearchPage.employeeEditHeader, verifyTxt: generalData.userDefinedData.maxWeight });
      genericUtils.verifyElementTextDoesNotContain({ locator: driverSearchPage.employeeEditHeader, verifyTxt: generalData.userDefinedData.nextHomeRequest });
      genericUtils.verifyElementTextDoesNotContain({ locator: driverSearchPage.employeeEditHeader, verifyTxt: generalData.userDefinedData.nextVacation });
      genericUtils.verifyElementTextDoesNotContain({ locator: driverSearchPage.employeeEditHeader, verifyTxt: generalData.userDefinedData.status });
    });
});