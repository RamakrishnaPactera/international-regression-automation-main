/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create Division and Bussiness Unit under General Tab in Power//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 15-03-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-133786 001_Test [FE] Power Search - Wire Up Division and Business Unit Dropdowns to respective DDT's > Resources |  Assets - Power | Regression
                                 ME-133788 002_Test [FE] Power Search - Wire Up Division and Business Unit Dropdowns to respective DDT's > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import {
  searchPowerWithCode,
} from '../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  getTDMData,
  typeDropDwnClick,
  verifyToExist,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
const {
  tabGeneral,
  drpdwnBussinessUnit,
  labelBussinessUnit,
  drpdwnDivisionTerm,
  labelDivision,
} = powerDetails;
const {
  tdmAddPowerReq,
  tdmPowerCommonScenario,
  tdmPowerData,
  divisionTerm,
  bussinessUnit,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let powerDataTDM;
describe('Add a record in power with Diviion and Bussiness Unit [ME-133786,ME-133788]', () => {
  beforeEach(() => {
    cy.log('***creating power using TDM***');
    getTDMData({ dataType: tdmPowerData, dataCondition: tdmAddPowerReq, dataScenario: tdmPowerCommonScenario });
    cy.then(() => {
      powerDataTDM = Cypress.env('inputVal');
    });
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-133786 001_Test [FE] Power Search - Wire Up Division and Business Unit Dropdowns to respective DDTs > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase2',
      ],
    }, () => {
      searchPowerWithCode({ powerCode: powerDataTDM.powerCode });
      clickAction({ locator: tabGeneral });
      verifyToExist({ element: labelDivision });
      typeDropDwnClick({ locator: drpdwnDivisionTerm, drpDwnVal: divisionTerm });
    });
  it('ME-133788 002_Test [FE] Power Search - Wire Up Division and Business Unit Dropdowns to respective DDTs > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase 2',
      ],
    }, () => {
      searchPowerWithCode({ powerCode: powerDataTDM.powerCode });
      clickAction({ locator: tabGeneral });
      verifyToExist({ element: labelBussinessUnit });
      typeDropDwnClick({ locator: drpdwnBussinessUnit, drpDwnVal: bussinessUnit });
    });
});