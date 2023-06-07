/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating driver search fields-division and businessUnit
 Test Cases List
 Authored By : Dasari Santhosh
 Date : 18-04-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : ME-141538 [FE]Driver Search-verify Update DDTs for Division field in search page
                      ME-141543 [FE]Driver Search-verify Update DDTs for Business Unit field in search page
                      ME-145109 Test [FE] Driver- verify the Search Result in driver Search Page based on Business Unit and Division
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { navigateToDriverSearchPage } from '../../../../utilities/assetUtils/resourceUtilis';
import { checkboxDrpDwnWithSearch, clickActionWait, containsText, getMinionValues, validateDrpDwnAllOptions, verifyFirstElementContinsTxt, viewFullPage } from '../../../../utilities/commonUtils/genericUtils';
import driverSearchPage from '../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import generalData from '../../../../testData/assets/driver/driverDetails/general/generalData.json';

const { minionDrpDwnDivision, minionDrpDwnBusinessUnit } = generalData.staticData;
const { drpDwnDivisionTerm, drpDwnBusinessTerm, btnExpandDrpDwnBusinessUnitTerm, btnExpandDrpDwnDivisionTerm, btnSearchSubmit, rowDataDivision, rowDataBusinessUnit } = driverSearchPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

let drpDwnDivisionData, drpDwnBusinessUnitData;
describe('Validating driver search fields-division and businessUnit > Driver > Resources [ME-141538,ME-141543,ME-145109]', () => {
  before(() => {
    getMinionValues(minionDrpDwnDivision, 6).then((resultOptions) => {
      drpDwnDivisionData = resultOptions;
    });
    getMinionValues(minionDrpDwnBusinessUnit, 2).then((resultOptions) => {
      drpDwnBusinessUnitData = resultOptions;
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-141538 [FE]Driver Search-verify Update DDTs for Division field in search page  > Driver > Resources |  Assets - Driver Search| Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      navigateToDriverSearchPage();

      //verifying all options in drop down as per minion values
      validateDrpDwnAllOptions({ locator1: drpDwnDivisionTerm, locator2: btnExpandDrpDwnDivisionTerm, optionsArray: drpDwnDivisionData });

      //selecting multiple options and verifying displaying text
      checkboxDrpDwnWithSearch({ locator: drpDwnDivisionTerm, drpDwnVal: drpDwnDivisionData[0] });
      checkboxDrpDwnWithSearch({ locator: drpDwnDivisionTerm, drpDwnVal: drpDwnDivisionData[1] });
      containsText({ locator: btnExpandDrpDwnDivisionTerm, verifyText: drpDwnBusinessUnitData[0] + ', ' + drpDwnBusinessUnitData[1] });
    });
  it('ME-141543 [FE]Driver Search-verify Update DDTs for Business Unit field in search page  > Driver > Resources |  Assets - Driver Search | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      navigateToDriverSearchPage();

      //verifying all options in drop down as per minion values
      validateDrpDwnAllOptions({ locator1: drpDwnBusinessTerm, locator2: btnExpandDrpDwnBusinessUnitTerm, optionsArray: drpDwnBusinessUnitData });

      //selecting multiple options and verifying displaying text
      checkboxDrpDwnWithSearch({ locator: drpDwnBusinessTerm, drpDwnVal: drpDwnBusinessUnitData[0] });
      checkboxDrpDwnWithSearch({ locator: drpDwnBusinessTerm, drpDwnVal: drpDwnBusinessUnitData[1] });
      containsText({ locator: btnExpandDrpDwnBusinessUnitTerm, verifyText: drpDwnBusinessUnitData[0] + ', ' + drpDwnBusinessUnitData[1] });
    });
  it('ME-145109 Test [FE] Driver- verify the Search Result in driver Search Page based on Business Unit and Division  > Driver > Resources |  Assets - Driver Search | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      navigateToDriverSearchPage();

      //validating division related records
      checkboxDrpDwnWithSearch({ locator: drpDwnDivisionTerm, drpDwnVal: drpDwnDivisionData[0] });
      clickActionWait({ locator: btnSearchSubmit });
      verifyFirstElementContinsTxt({ locator: rowDataDivision, verifyText: drpDwnDivisionData[0] });

      //validating businessUnit related records
      checkboxDrpDwnWithSearch({ locator: drpDwnBusinessTerm, drpDwnVal: drpDwnBusinessUnitData[0] });
      clickActionWait({ locator: btnSearchSubmit });
      verifyFirstElementContinsTxt({ locator: rowDataBusinessUnit, verifyText: drpDwnBusinessUnitData[0] });
    });
});