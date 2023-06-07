/*---------------------------------------------------------------------------------------------------------------
User can Create Driver with madatory fields, search Driver and Edit Driver
Test Cases List
Authored By                   : Jyothi Prasad
Date                          : 30-03-2023
Functions/Calling References  : addDriverPage,driverSearchPage,generalData,trailerPage,utilities
Test case Included            : [ME-140023, ME-140028, ME-140040]: Driver e2e scenarios: Create Driver, Search Driver and edit Driver > Resources | Assets - Driver General Tab | e2e
----------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import addDriverData from '../../../testData/assets/driver/addDriver/addDriverData.json';
import addDriverPage from '../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import homePage from '../../../pageObjects/homePage/homePage.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import driverCommonPage from '../../../pageObjects/assets/driver/driverCommonPage.json';
import driverSearchPage from '../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import { genrateRandomName } from '../../../tdm/lib/utilities/utilities';
import driverGeneralData from '../../../testData/assets/driver/driverDetails/general/generalData.json';
import {
  clearTypeText,
  clickActionWait,
  generateRandomNumberByLength,
  selectDropDownTypeButtonList,
  toastWithMsg,
  typeDrpDwnWithMachtingText,
  verifyAttrText,
  verifyAttrValueContains,
  verifyFirstElementTxt,
  verifyTextContains,
  viewFullPage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
import {
  driverSaveAction,
  enterDriverMandatoryFields,
  navigateToDriverAddNewPage,
  searchDriverWithCode,
  searchDriverWithDriverCodeAndDrpDwnvalue,
  searchDriverWithName,
  searchDriverWithPhoneNumber,
} from '../../../utilities/assetUtils/resourceUtilis';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const { tabDriverGeneral } = driverCommonPage;
const { msgUpdated } = addDriverData.expectedData;
const { lblDriverCode, txtDriverName, drpDwnProfType, drpDwnDriverDivision, drpDwnBusinessUnitGeneral } = driverSearchPage;
const { countryIndia } = driverGeneralData.staticData;
const { shortWait } = commonData;
const {
  firstNamePrefix,
  initialPhNum,
  lastNamePrefix,
  phNumberLength,
} = addDriverData.userDefinedData;
const {
  driverBusinessUnitA,
  driverDivisionBrokerage,
  driverStatusActive,
  personalInfoType,
  typeAttr,
  valueAttr,
} = addDriverData.staticData;
const {
  drpDwnBusinessUnits,
  drpdwnDivisionTerm,
  drpDwnPersonalInfoType,
  drpdwnPhoneNumCountry,
  drpDwnStatus,
  txtFieldPhoneNumber,
} = addDriverPage;
const {
  txtFieldDriverFirstName,
  txtFieldDriverLastName,
} = homePage;
let randomDriverFirstName, randomPhoneNumber;
describe('Driver e2e scenarios: Create Driver, Search Driver and edit Driver > Resources | Assets - Driver General Tab | e2e [ME-140003]', () => {
  before(() => {
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('[ME-140023] Verify user can able to create a Driver with mandatory fields > Driver > Resources | Assets - Driver General Tab | e2e',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p1', '@phase2'],
    },
    () => {
      //Navigating to Driver add new page
      navigateToDriverAddNewPage();
      //Creating a Driver with mandatory fields
      enterDriverMandatoryFields();
      //save driver
      driverSaveAction();
      //Verifying 'Updated' toast message
      toastWithMsg({ message: msgUpdated });
    });

  it('[ME-140028] Verify user can search Driver based on Code, Name, Phone Number, Type, Division and Business Units > Driver > Resources |  Assets - Driver General Tab | e2e',
    {
      tags: ['@assets', '@resources', '@driver', '@driverGeneral', '@p2', '@phase2'],
    },
    () => {
      //Navigating to Driver add new page
      navigateToDriverAddNewPage();
      //search Driver with code
      const { driverCode } = enterDriverMandatoryFields();
      //Updating Driver First Name
      randomDriverFirstName = firstNamePrefix + genrateRandomName();
      clearTypeText({ element: txtFieldDriverFirstName, typeText: randomDriverFirstName });
      //Updating random Phone Number
      randomPhoneNumber = initialPhNum + generateRandomNumberByLength({ lengthOfNum: phNumberLength });
      clearTypeText({ element: txtFieldPhoneNumber, typeText: randomPhoneNumber });
      typeDrpDwnWithMachtingText({ locator: drpdwnPhoneNumCountry, drpDwnVal: countryIndia });
      //Updating Driver Professional type
      selectDropDownTypeButtonList({ locator: drpDwnPersonalInfoType, dropdownVal: personalInfoType });
      //Updating Driver Division type
      selectDropDownTypeButtonList({ locator: drpdwnDivisionTerm, dropdownVal: driverDivisionBrokerage });
      //Updating Driver Business Units
      selectDropDownTypeButtonList({ locator: drpDwnBusinessUnits, dropdownVal: driverBusinessUnitA });
      //Save Driver
      driverSaveAction();
      //Verifying 'Updated' toast message
      toastWithMsg({ message: msgUpdated });
      //Search Driver with code and verify
      searchDriverWithCode({ driverCode });
      verifyFirstElementTxt({ locator: lblDriverCode, verifyText: driverCode });
      //Search Driver with Name and verify
      searchDriverWithName({ driverName: randomDriverFirstName });
      verifyTextContains({ locator: txtDriverName, containsText: randomDriverFirstName });
      //Search Driver with Driver Phone Number
      searchDriverWithPhoneNumber({ dataTextCountry: countryIndia, dataTextPhNumber: randomPhoneNumber });
      //Search Driver with Professional type
      searchDriverWithDriverCodeAndDrpDwnvalue({ locator: drpDwnPersonalInfoType, dataTextDriverCode: driverCode, drpDwnvalue: personalInfoType });
      clickActionWait({ locator: tabDriverGeneral });
      verifyAttrValueContains({ locator: drpDwnProfType, attribute: typeAttr, verifyText: personalInfoType });
      //Search Driver with Division type
      searchDriverWithDriverCodeAndDrpDwnvalue({ locator: drpDwnDriverDivision, dataTextDriverCode: driverCode, drpDwnvalue: driverDivisionBrokerage });
      clickActionWait({ locator: tabDriverGeneral });
      verifyAttrValueContains({ locator: drpdwnDivisionTerm, attribute: typeAttr, verifyText: driverDivisionBrokerage });
      //Search Driver with Business Units
      searchDriverWithDriverCodeAndDrpDwnvalue({ locator: drpDwnBusinessUnitGeneral, dataTextDriverCode: driverCode, drpDwnvalue: driverBusinessUnitA });
      clickActionWait({ locator: tabDriverGeneral });
      verifyAttrValueContains({ locator: drpDwnBusinessUnits, attribute: typeAttr, verifyText: driverBusinessUnitA });
    });

  it('[ME-140040] Verify user can able to edit a Driver > Resources | Assets - Driver General Tab | e2e',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p2', '@phase2'],
    },
    () => {
      //Navigating to Driver add new page
      navigateToDriverAddNewPage();
      //Creating a Driver with mandatory fields
      enterDriverMandatoryFields();
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Edit Driver
      clearTypeText({ element: txtFieldDriverFirstName, typeText: firstNamePrefix });
      clearTypeText({ element: txtFieldDriverLastName, typeText: lastNamePrefix });
      selectDropDownTypeButtonList({ locator: drpDwnPersonalInfoType, dropdownVal: personalInfoType });
      selectDropDownTypeButtonList({ locator: drpdwnDivisionTerm, dropdownVal: driverDivisionBrokerage });
      selectDropDownTypeButtonList({ locator: drpDwnStatus, dropdownVal: driverStatusActive });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      //Verify updated values
      verifyAttrText({ locator: txtFieldDriverFirstName, attribute: valueAttr, verifyText: firstNamePrefix });
      verifyAttrText({ locator: txtFieldDriverLastName, attribute: valueAttr, verifyText: lastNamePrefix });
      verifyAttrText({ locator: drpDwnPersonalInfoType, attribute: typeAttr, verifyText: personalInfoType });
      verifyAttrText({ locator: drpdwnDivisionTerm, attribute: typeAttr, verifyText: driverDivisionBrokerage });
      verifyAttrText({ locator: drpDwnStatus, attribute: typeAttr, verifyText: driverStatusActive });
    });
});