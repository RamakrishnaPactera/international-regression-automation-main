/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating program, project,divisionTerm, businessUnit, snapshot logo in driver pages
 Test Cases List
 Authored By : Dasari Santhosh,Shashi Jaiswal,Sanjeev Bandari
 Date : 15-05-2023
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : ME-133239 Verify Updated datatype for Project and Program Fields Driver > Resources |  Assets - Driver General Tab | Regression
                    : ME-133242 Validate updated DDTs for Division and Business Unit Driver > Resources |  Assets - Driver General Tab | Regression
                    : ME-71892 Add New Driver page verify order of the fields Division > Business Unit > Project
                    : ME-71893 In Existing Driver Record verify order of the fields Division > Business Unit > Project
                    : ME-71894 Verify whether the user can able to Save and Update data to the fields Division , Business Unit and Project , after new changes
                    : ME-71897 Verify whether the user can able to Save and Update data to the fields Division , Business Unit after new changes
                    : ME-142182 : [FE]Driver-Verify Gray out Project and Program fields within Organizational Details in create driver mode
                    : ME-155061 : [FE]Driver-Verify Gray out Project and Program fields within Organizational Details in driver edit mode
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { enterDriverMandatoryFields, navigateToDriverAddNewPage, searchDriverWithCode, validateDrpDwnField, verifyInputFieldTagAndMaxLength } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickActionWait, getMinionValues, scrollIntoView, typeDropDwn, verifyLengthOfVal, verifyReadOnly, verifyVisible, viewFullPage, getTDMData, waitSometime, verifyTextContains, toastWithMsg } from '../../../../../utilities/commonUtils/genericUtils';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
const { btnDriverSave } = homePage;
const { shortWait } = commonData;
const { drpdwnDivisionTerm, drpdwnBusinessUnitTerm, btnExpandDrpDwnDivisionTerm, btnExpandDrpDwnBusinessUnitTerm, txtFieldProjectTerm, txtFieldProgramTerm, orgDetails } = driverAddNewPage;
const {
  tabDriverGeneral,
  snapShot,
} = driverCommonPage;
const {
  minionDrpDwnDivision,
  minionDrpDwnBusinessUnit,
} = generalData.staticData;
const { tdmDriverCommonScenario, tdmDriverData, tdmAddDriverReq } = addDriverData.staticData;
const {
  msgUpdated,
} = addDriverData.expectedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let drpDwnDivisionData, drpDwnBusinessUnitData, drpDwnDivisionData1, driverDataTDM;
describe('Validating program, project,divisionTerm, businessUnit, snapshot logo in driver pages [ME-133239,ME-133242,ME-133328][ME-71892,ME-71893,ME-71894,ME-71897]', () => {
  before(() => {
    getMinionValues(minionDrpDwnDivision, 2).then((resultOptions) => {
      drpDwnDivisionData = resultOptions[0];
      drpDwnDivisionData1 = resultOptions[1];
    });
    getMinionValues(minionDrpDwnBusinessUnit, 1).then((resultOptions) => {
      drpDwnBusinessUnitData = resultOptions[0];
    });
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  //The below 'it' block is skipped due to the functionality change in Asserts-Organizational Details for the fields 'Project' and 'Program'
  it.skip('ME-133239  verify Updated datatype for Project and Program Fields Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();

      //validating project and program fields tag name and max length
      verifyInputFieldTagAndMaxLength({ locator: txtFieldProjectTerm, maxLength: 60 });
      verifyInputFieldTagAndMaxLength({ locator: txtFieldProgramTerm, maxLength: 60 });

      //creating driver with mandatory fields
      const { driverCode } = enterDriverMandatoryFields();
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      verifyVisible({ element: snapShot });

      //verifying length of existing text
      verifyLengthOfVal({ locator: txtFieldProjectTerm, expectedVal: 60 });

      //validating project term field tag name and max length
      verifyInputFieldTagAndMaxLength({ locator: txtFieldProjectTerm, maxLength: 60 });
      //validating program term field tag name and max length
      verifyInputFieldTagAndMaxLength({ locator: txtFieldProgramTerm, maxLength: 60 });

      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode }); //need to replace tdm driver code to driverCode;

      //Navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });

      //validating project term field tag name and max length
      verifyInputFieldTagAndMaxLength({ locator: txtFieldProjectTerm, maxLength: 60 });
      //validating program term field tag name and max length
      verifyInputFieldTagAndMaxLength({ locator: txtFieldProgramTerm, maxLength: 60 });

      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      verifyVisible({ element: snapShot });

      //verifying length of existing text
      verifyLengthOfVal({ locator: txtFieldProjectTerm, expectedVal: 60 });
    });
  //The below 'it' block is skipped due to the functionality change in Asserts-Organizational Details for the fields 'Project' and 'Program'
  it.skip('ME-133242 Validate updated DDTs for Division and Business Unit Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();

      //validating division Term term drop down field
      validateDrpDwnField({ locatorBtn: btnExpandDrpDwnDivisionTerm, locatorDrpDwn: drpdwnDivisionTerm });

      //validating division Term term drop down field
      validateDrpDwnField({ locatorBtn: btnExpandDrpDwnBusinessUnitTerm, locatorDrpDwn: drpdwnBusinessUnitTerm });

      //creating driver with mandatory fields
      const { driverCode } = enterDriverMandatoryFields();
      typeDropDwn({ locator: drpdwnDivisionTerm, drpDwnVal: drpDwnDivisionData });
      typeDropDwn({ locator: drpdwnBusinessUnitTerm, drpDwnVal: drpDwnBusinessUnitData });

      //submitting driver with division and busineerTerm along with mandatory fields
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      verifyVisible({ element: snapShot });

      //validating division and businessTerm fields in driver page after creating
      validateDrpDwnField({ locatorBtn: btnExpandDrpDwnDivisionTerm, locatorDrpDwn: drpdwnDivisionTerm });
      validateDrpDwnField({ locatorBtn: btnExpandDrpDwnBusinessUnitTerm, locatorDrpDwn: drpdwnBusinessUnitTerm });

      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode }); //need to replace tdm driver code to driverCode;

      //Navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });

      //validating division and businessTerm fields in driver Edit page
      validateDrpDwnField({ locatorBtn: btnExpandDrpDwnDivisionTerm, locatorDrpDwn: drpdwnDivisionTerm });
      validateDrpDwnField({ locatorBtn: btnExpandDrpDwnBusinessUnitTerm, locatorDrpDwn: drpdwnBusinessUnitTerm });
    });

  it('[ME-142182, ME-155061] [FE]Driver-Verify Gray out Project and Program fields within Organizational Details in driver create & edit mode',
    () => {
      navigateToDriverAddNewPage();
      //Validating readonly fields
      verifyReadOnly({ locator: orgDetails.divProject, condition: true });
      verifyReadOnly({ locator: orgDetails.divProgram, condition: true });
      //Edit driver
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      verifyReadOnly({ locator: orgDetails.divProject, condition: true });
      verifyReadOnly({ locator: orgDetails.divProgram, condition: true });
    });
  it('ME-71892,ME-71893,ME-71894,ME-71897 Verify whether the user can able to Save and Update data to the fields Division after new changes',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      const { driverCode } = enterDriverMandatoryFields();
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      typeDropDwn({ locator: drpdwnDivisionTerm, drpDwnVal: drpDwnDivisionData });
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      toastWithMsg({ message: msgUpdated });
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      waitSometime(shortWait);
      scrollIntoView({ locator: drpdwnDivisionTerm });
      typeDropDwn({ locator: drpdwnDivisionTerm, drpDwnVal: drpDwnDivisionData1 });
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      toastWithMsg({ message: msgUpdated });
      verifyTextContains({ locator: drpdwnDivisionTerm + ' button', containsText: drpDwnDivisionData1 });
    });
});