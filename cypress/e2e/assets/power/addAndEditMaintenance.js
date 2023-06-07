/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Add, Edit Delete maintenance details//
 Test Cases List
 Authored By                   : Mamatha Polapalli
 Date                          : 30-05-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : ME-41351,ME-41352,ME-138159,ME-138160,ME-41350,ME-138163 Add edit delete maintenance details in operations tab > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as resourceUtilis from '../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../utilities/commonUtils/genericUtils';
import * as powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as powerDetailsPage from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';

const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let maintenanceType, maintenanceSeverity;
describe('Add edit delete maintenance details in operations tab[ME-138674,ME-138686,ME-138678]', () => {
  beforeEach(() => {
    genericUtils.getMinionValues('powerMaintenanceType', 1).then((type) => {
      maintenanceType = type[0];
    });
    genericUtils.getMinionValues('powerMaintenanceSeverity', 1).then((severity) => {
      maintenanceSeverity = severity[0];
    });
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-41350,ME-138163,ME-138850,ME-138852,ME-138853,ME-138856,ME-138857,ME-138858,ME-138861,ME-138862,ME-138863,ME-138867,ME-138868 User is able to Add maintenance details  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      resourceUtilis.addPower();
      genericUtils.clickAction({ locator: powerDetailsPage.tabOperations });
      genericUtils.verifyTableColumnsHeaders({ locator: powerDetailsPage.maintenance.colHeadersMaintenance, columnNames: powerData.expectedData.maintenanceColHeaders });
      genericUtils.clickAction({ locator: powerDetailsPage.btnMaintenancePlus });
      resourceUtilis.addPowerMaintenance(maintenanceType, maintenanceSeverity);
    });
  it('ME-41351,ME-41352,ME-138159,ME-138160,ME-138841,138844,ME-138848,ME-138849,ME-138854,ME-138855 Verify user is able to edit and delete maintenance details  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      resourceUtilis.navigateToAddPowerNewPage();
      resourceUtilis.addPower();
      genericUtils.clickAction({ locator: powerDetailsPage.tabOperations });
      genericUtils.verifyTableColumnsHeaders({ locator: powerDetailsPage.maintenance.colHeadersMaintenance, columnNames: powerData.expectedData.maintenanceColHeaders });
      genericUtils.clickAction({ locator: powerDetailsPage.btnMaintenancePlus });
      resourceUtilis.addPowerMaintenance(maintenanceType, maintenanceSeverity);
      resourceUtilis.editPowerMaintenance(maintenanceType, maintenanceSeverity);
      resourceUtilis.deletePowerMaintenance();
    });
});