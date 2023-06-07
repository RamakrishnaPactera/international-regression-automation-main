/*---------------------------------------------------------------------------------------------------------------
Can I Create or update Maintenance record popup field
Test Cases List
Authored By                   : Babu Velagada
Date                          : 21-03-2023
Functions/Calling References  : commonData,trailerDetailsData,trailerPage,utilities
Test case Included            : ME-133320 - Can I Create or update Maintenance record popup field > trailer > search trailer |Assets-Trailer| regression
 ----------------------------------------------------------------------------------------------------------*/

import {
  clickAction,
  dropDownContainsTextClick,
  getMinionValues,
  getTDMData,
  verifyExists,
  verifyTableColumnsHeaders,
  viewFullPage,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import trailerPage from '../../../../pageObjects/assets/trailer/trailerPage.json';
import { addTrailerMaintenanceRecd, searchTrailerWithCode, verifyMaintenanceWindowAvaFields } from '../../../../utilities/assetUtils/resourceUtilis';
import trailerDetailsData from '../../../../testData/assets/trailer/trailerDetailsData.json';
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  plusMaintenanceEdit,
  tabMaintenanceHeader,
  tabTrailerOperations,
  kebabEdit,
  kebabMenu,
  btnAddMaintenance,
  drpDwnTypeTerm,
} = trailerPage;
const { shortWait } = commonData;
const {
  maintenanceTableColumnHeaders,
  tdmTrailerCommonScenario,
  tdmTrailerData,
  tdmTrailerReq,
} = trailerDetailsData.staticData;
let trailerDataTDM, maintenanceTypeValue, maintenanceSeverityValue, workPerformedValue;
describe('Can I Create or update Maintenance record popup field-> trailer->search trailer |Assets-Trailer| regression [ME-133320]', () => {
  beforeEach(() => {
    getMinionValues('trailerMaintenanceType', 1).then((maintenanceType) => {
      maintenanceTypeValue = maintenanceType[0];
    });
    getMinionValues('trailerMaintenanceSeverity', 1).then((maintenanceSeverity) => {
      maintenanceSeverityValue = maintenanceSeverity[0];
    });
    getMinionValues('trailerWorkPerformed', 1).then((workPerformed) => {
      workPerformedValue = workPerformed[0];
    });
    cy.log('***creating trailer using TDM***');
    getTDMData({ dataType: tdmTrailerData, dataCondition: tdmTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-133320, ME-41366, ME-41371, ME-161976, ME-161979 - Can I Create or update Maintenance record popup field > trailer > search trailer |Assets-Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
        '@phase2',
      ],
    }, () => {
      searchTrailerWithCode({ trailerCode: trailerDataTDM.trailerCode });
      waitSometime(shortWait);
      clickAction({ locator: tabTrailerOperations });
      waitSometime(shortWait);
      verifyExists({ element: plusMaintenanceEdit });
      clickAction({ locator: plusMaintenanceEdit });
      cy.log('***validating columns names in Maintenance Tab***');
      verifyTableColumnsHeaders({ locator: tabMaintenanceHeader, columnNames: maintenanceTableColumnHeaders });
      cy.log('***Verify newly added fields in maintenance window***');
      verifyMaintenanceWindowAvaFields();
      addTrailerMaintenanceRecd({ maintenanceType: maintenanceTypeValue, maintenanceSeverity: maintenanceSeverityValue, workPerformed: workPerformedValue });
    });
  it('ME-161729- Can I edit Maintenance record popup field > trailer > search trailer |Assets-Trailer| regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p1',
      ],
    }, () => {
      searchTrailerWithCode({ trailerCode: trailerDataTDM.trailerCode });
      waitSometime(shortWait);
      clickAction({ locator: tabTrailerOperations });
      waitSometime(shortWait);
      verifyExists({ element: plusMaintenanceEdit });
      clickAction({ locator: plusMaintenanceEdit });
      cy.log('***Verify newly added fields in maintenance window***');
      verifyMaintenanceWindowAvaFields();
      addTrailerMaintenanceRecd({ maintenanceType: maintenanceTypeValue, maintenanceSeverity: maintenanceSeverityValue, workPerformed: workPerformedValue });
      clickAction({ locator: kebabMenu });
      clickAction({ locator: kebabEdit });
      dropDownContainsTextClick({ element: drpDwnTypeTerm, typeText: maintenanceTypeValue, exactText: maintenanceTypeValue });
      clickAction({ locator: btnAddMaintenance });
    });
});