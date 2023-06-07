/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and update Maintenance under Operations Tab in Power//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 14-03-2023,
 Functions/Calling References  : resourceUtilis, powerDetails, utilities, genericUtils, loginUtils
 Test case Included            : ME-133343 Verify  the Est. Maint Time fieldname is renamed to Est. Maintenance Time(Minutes)  > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  clickAction,
  getTDMData,
  verifyToExist,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addPower, searchPowerWithCode } from '../../../utilities/assetUtils/resourceUtilis';
const {
  btnMaintenanceClose,
  txtFieldEstMaintenance,
  btnMaintenancePlus,
  titleCardMaintenance,
  tabOperations,
} = powerDetails;
const {
  tdmAddPowerReq,
  tdmPowerCommonScenario,
  tdmPowerData,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let powerDataTDM;

describe('Add a record in power with Maintenance [ME-133343]', () => {
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
  it('ME-133343 Verify  the Est. Maint Time fieldname is renamed to Est. Maintenance Time(Minutes)  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase2',
      ],
    }, () => {
      addPower();
      //clicking on Operational details card
      clickAction({ locator: tabOperations });
      verifyToExist({ element: titleCardMaintenance });

      //clicking on Add Maintenenace
      clickAction({ locator: btnMaintenancePlus });
      verifyToExist({ element: txtFieldEstMaintenance });

      //Closing the Maintenance Card
      clickAction({ locator: btnMaintenanceClose });

      searchPowerWithCode({ powerCode: powerDataTDM.powerCode });
      clickAction({ locator: tabOperations });
      verifyToExist({ element: titleCardMaintenance });

      //clicking on Add Maintenenace
      clickAction({ locator: btnMaintenancePlus });
      verifyToExist({ element: txtFieldEstMaintenance });
    });
});