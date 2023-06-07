/*---------------------------------------------------------------------------------------------------------------
Verify customize option in Document
Test Cases List
Authored By                   : pruthvirajgopalkrishnachari
Date                          : 10-03-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-136744 Can user validate customize option in documents > CRM > Interactions > Documents | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import crmDocumentsData from '../../../../../../testData/crm/crmData/crmDocumentsData.json';
import crmDocumentsPage from '../../../../../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import {
  documentsCarrCarrotButtonExpand,
  navigateToDocumentsTab,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
import { verifyCustomizeOptions } from '../../../../../../utilities/customerUtils/customerUtils';
import {
  clickVisibleElement,
  getTDMData,
  viewFullPage,
  verifyTableColumnsHeadersToolTip,
} from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const { tdmAddCarrierReq, tdmCarrierData, tdmCarrierScenario } =
  crmNotesData.staticData;
const {
  documetcolumnTableArray,
  documentsCustomizedTableArray,
} = crmDocumentsData.staticData;
const {
  btnNotesExpandViewClose,
  btnNotesCustomizeOption,
  btnResetToDefault,
  btnCustTableSave,
} = crmNotesPage;
const {
  btnCustDocDefaultViewExpand,
  customizeDocumentDetailsDragItem,
  customizeDocumentDirectionDragItem,
  documentsTableAllColumnText,
  documentsTableAllColumnTextExpand,
  hideCustomTableDocumentNameValue,
} = crmDocumentsPage;
let carrierNameVal;

describe('Can user validate customize option in Documents tab > Carrier > CRM > Interactions > Documents | Carrier Regression | Regression [ME-136744]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({
      dataType: tdmCarrierData,
      dataCondition: tdmAddCarrierReq,
      dataScenario: tdmCarrierScenario,
    });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    viewFullPage();
  });

  it(
    'ME-136744 Can user validate customize option in Documents tab > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
      cy.log('***verifying in default view***');
      verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnText,
        columnNames: documetcolumnTableArray,
      });
      cy.log('***verifying in expand view***');
      documentsCarrCarrotButtonExpand();
      verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnTextExpand,
        columnNames: documetcolumnTableArray,
      });
      clickVisibleElement({ locator: btnNotesExpandViewClose });
      verifyCustomizeOptions({
        locator: btnCustDocDefaultViewExpand,
        element: btnNotesCustomizeOption,
        restEle: btnResetToDefault,
        customTableSave: btnCustTableSave,
        columnTableArray: documetcolumnTableArray,
        tableColumnTextEle: documentsTableAllColumnText,
        hideOneColumnValue: hideCustomTableDocumentNameValue,
        customizeDragItem1: customizeDocumentDirectionDragItem,
        customizeDragItem2: customizeDocumentDetailsDragItem,
        customizedTableArray: documentsCustomizedTableArray,
      });
    },
  );
});