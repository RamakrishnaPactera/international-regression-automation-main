import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import preferencesPage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import {
  clickActionWait,
  selectDropDownTypeButtonList,
  verifyAttrValueContains,
  verifyFirstElementTxt,
  verifyTextContains,
  viewFullPage,
  getTDMData,
  clickAction,
  verifyExists,
  verifyContains,
  verifyLabel,
} from '../../../../../utilities/commonUtils/genericUtils';
import {
  driverSaveAction,
  searchDriverWithCode,
  searchDriverWithDriverCodeAndDrpDwnvalue,
  searchDriverWithName,
  navigateTeamPreference,
} from '../../../../../utilities/assetUtils/resourceUtilis';
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const { tabDriverGeneral } = driverCommonPage;
const { lblDriverCode, txtDriverName, drpDwnProfType } = driverSearchPage;
const {
  asterisk,
} = addDriverData.userDefinedData;
const {
  driverDivisionBrokerage,
  personalInfoType,
  typeAttr,
  tdmDriverData,
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  lblType,
  lblPreference,
  lblPosition,
  lblFleet,
  lblDivision,
  lblCustomer,
  lblReason,
} = addDriverData.staticData;
const {
  drpdwnDivisionTerm,
  drpDwnPersonalInfoType,
} = addDriverPage;
let driverDataTDM;
describe('Driver search related test cases > Resources | Assets | ME-41777, ME-43309, ME-46036', () => {
  before(() => {
  });
  beforeEach(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-41777 Verify user can search Driver based on Code, Name, Type and Division > Driver > Resources |  Assets - Driver General Tab',
    {
      tags: ['@assets', '@resources', '@driver', '@driverGeneral', '@p2', '@phase2'],
    },
    () => {
      //Search Driver with code and verify
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      verifyFirstElementTxt({ locator: lblDriverCode, verifyText: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      //Updating Driver Professional type
      selectDropDownTypeButtonList({ locator: drpDwnPersonalInfoType, dropdownVal: personalInfoType });
      //Updating Driver Division type
      selectDropDownTypeButtonList({ locator: drpdwnDivisionTerm, dropdownVal: driverDivisionBrokerage });
      //Save Driver
      driverSaveAction();
      //Search Driver with Name and verify
      searchDriverWithName({ driverName: driverDataTDM.firstName });
      verifyTextContains({ locator: txtDriverName, containsText: driverDataTDM.firstName });
      //Search Driver with Professional type
      searchDriverWithDriverCodeAndDrpDwnvalue({ locator: drpDwnPersonalInfoType, dataTextDriverCode: driverDataTDM.driverCode, drpDwnvalue: personalInfoType });
      clickActionWait({ locator: tabDriverGeneral });
      verifyAttrValueContains({ locator: drpDwnProfType, attribute: typeAttr, verifyText: personalInfoType });
    });

  it('ME-43309 Verify user can validate Team Preferences UI fields > Driver > Resources |  Assets - Driver Preferences Tab',
    {
      tags: ['@assets', '@resources', '@driver', '@driverGeneral', '@p2', '@phase2'],
    },
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      clickAction({ locator: preferencesPage.btnTeamPreference });
      verifyExists({ element: preferencesPage.lblAddTeamsPreference });
      verifyContains({ locator: preferencesPage.lblType, containsText: asterisk });
      verifyContains({ locator: preferencesPage.lblPreference, containsText: asterisk });
      verifyLabel({ locator: preferencesPage.lblType, verifyText: lblType });
      verifyLabel({ locator: preferencesPage.lblPreference, verifyText: lblPreference });
    });

  it('ME-46036 Verify user can validate Career Goals UI fields > Driver > Resources |  Assets - Driver Preferences Tab',
    {
      tags: ['@assets', '@resources', '@driver', '@driverGeneral', '@p2', '@phase2'],
    },
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      navigateTeamPreference();
      clickAction({ locator: preferencesPage.btnAddNewCareerGoal });
      verifyContains({ locator: preferencesPage.lblPosition, containsText: asterisk });
      verifyContains({ locator: preferencesPage.lblPreference, containsText: asterisk });
      verifyContains({ locator: preferencesPage.lblReason, containsText: asterisk });
      verifyLabel({ locator: preferencesPage.lblPosition, verifyText: lblPosition });
      verifyLabel({ locator: preferencesPage.lblFleet, verifyText: lblFleet });
      verifyLabel({ locator: preferencesPage.lblDivision, verifyText: lblDivision });
      verifyLabel({ locator: preferencesPage.lblCustomer, verifyText: lblCustomer });
      verifyLabel({ locator: preferencesPage.lblPreference, verifyText: lblPreference });
      verifyLabel({ locator: preferencesPage.lblReason, verifyText: lblReason });
    });
});