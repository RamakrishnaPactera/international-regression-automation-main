/*---------------------------------------------------------------------------------------------------------------
Verify to add attchment to Intraction records from portfolio interacgtions screen//
Test Cases List
Authored By                   : Madhu manyam
Date                          : 01-03-2023
Functions/Calling References  : crmInteractionsDocuments,utilities
Test case Included            : ME-126594 User can Verify documents functionality in CRM Interactions
 > CRM > Interactions> Documents
 ----------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import * as customerHelperMethods from '../../../../../../utilities/customerUtils/customerUtils';
import * as genericUtils from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmDocumentsData from '../../../../../../testData/crm/crmData/crmDocumentsData.json';
import crmDocumentsPage from '../../../../../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import crmContactsData from '../../../../../../testData/crm/crmData/crmContactsData.json';
import commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import { documentsCarrCarrotButtonExpand } from '../../../../../../utilities/carrierUtils/carrierUtils';
const { prefixTxt } = crmContactsData.userDefinedData;
const {
  minionDrpDwnDocumentDirection,
  minionDrpDwnDocumentType,
  documetcolumnTableArray,
  documentsCustomizedTableArray,
} = crmDocumentsData.staticData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerNewScenario,
} = crmNotesData.staticData;
const {
  btnNotesExpandViewClose,
  btnNotesCustomizeOption,
  btnResetToDefault,
  btnCustTableSave,
  documentTypecolumn,
  btnExpandViewExpand,
} = crmNotesPage;
const {
  typeFilter,
} = crmDocumentsData.filterSelectionData;
const {
  txtFieldDocDetailsValueLatestUpdated,
  documentFileUploadTargetFile,
} = crmDocumentsData.userDefinedData;
const {
  btnCustDocDefaultViewExpand,
  btnDocContextMenuExpand,
  btnDocumentPlsDefault,
  customizeDocumentDetailsDragItem,
  customizeDocumentDirectionDragItem,
  documentsTableAllColumnText,
  documentsTableAllColumnTextExpand,
  hideCustomTableDocumentNameValue,
} = crmDocumentsPage;

let customerNameVal,
  contactName,
  drpDwnTypeOption1,
  drpDwnDirectionOption1,
  randomOpportunityName;
describe('User Validates Documents Tab functionalty in > CRM > Interactions > Customer > Documents [Story: ME-126594]', () => {
  before(() => {
    genericUtils.getMinionValues(minionDrpDwnDocumentType, 1).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
    genericUtils.getMinionValues(minionDrpDwnDocumentDirection, 1).then((resultOptions) => {
      drpDwnDirectionOption1 = resultOptions[0];
    });
    cy.log('***creating new Customer***');
    genericUtils.getTDMData({
      dataType: tdmCustomerData,
      dataCondition: tdmAddCustomerReq,
      dataScenario: tdmCustomerNewScenario,
    });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
      contactName = customerNameVal.contactName;
    });
  });
  beforeEach(() => {
    loginToApplication({
      username: usernameText,
      password: passwordText,
    });
    genericUtils.viewFullPage();
    //Create a new document before applying Filter slection
    customerHelperMethods.navigateToDocumentsTab({ customerName: customerNameVal.customerName });
    randomOpportunityName = prefixTxt + genericUtils.generateRandomNumber();
    customerHelperMethods.addNewOpportunity({ randomName: randomOpportunityName });
    genericUtils.waitSometime(commonData.longWait);
    customerHelperMethods.addDocumentsAllFields({
      locator: btnDocumentPlsDefault,
      documentFileUploadTargetFile,
      dropDownDocTypeValue: drpDwnTypeOption1,
      contactName,
      randomName: randomOpportunityName,
      dropDownDocDirectionValue: drpDwnDirectionOption1,
    });
  });

  it('ME-137516 User Validates Documents filter options in > CRM > Interactions > Customer > Documents | Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      genericUtils.scrollIntoView({ locator: btnCustDocDefaultViewExpand });
      customerHelperMethods.customerDocumentsUIValidations({ locator: btnCustDocDefaultViewExpand });
      cy.log('***verifying the  filters columns***');
      customerHelperMethods.verifyCustomerInteractionsDocumentsFilters();
      customerHelperMethods.filterDocumentsByType(typeFilter);
      customerHelperMethods.openEditDocument();
    },
  );

  it('ME-137519 User Validates Documents filter selection remove in > CRM > Interactions > Customer > Documents | Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying the  filters columns***');
      customerHelperMethods.navigateToDocumentsTab({ customerName: customerNameVal.customerName });
      customerHelperMethods.verifyCustomerInteractionsDocumentsFilters();
      cy.log('***verifying filter selection***');
      customerHelperMethods.filterDocumentsByType(typeFilter);
      cy.log('***verifying filter selection remove***');
      customerHelperMethods.removeSelectedFilter({ locator: documentTypecolumn });
    },
  );

  it('ME-137520 User Validates Documents columns customization  > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      genericUtils.scrollIntoView({ locator: btnCustDocDefaultViewExpand });
      customerHelperMethods.customerDocumentsUIValidations({ locator: btnCustDocDefaultViewExpand });
      cy.log('***verifying in expand view***');
      customerHelperMethods.documentsCustCarrotButtonExpand();
      customerHelperMethods.customerDocumentsUIValidations({ locator: btnExpandViewExpand });
    },
  );

  it('ME-137521 User edits documents when user applies filter  > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      customerHelperMethods.filterDocumentsByType(typeFilter);
      customerHelperMethods.documentsCustCarrotButtonExpand();
      customerHelperMethods.filterDocumentsByType(typeFilter);
      customerHelperMethods.verifyCustomerInteractionsDocumentsFilters();
      customerHelperMethods.openEditDocument();
      customerHelperMethods.editDocuments({
        locator: btnDocContextMenuExpand,
        editDocDetailsValue: txtFieldDocDetailsValueLatestUpdated,
      });
    },
  );

  it('ME-137522 User can see only filtered records in downloaded document > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      customerHelperMethods.filterDocumentsByType(typeFilter);
      customerHelperMethods.downloadDocument();
    },
  );

  it('ME-137523 User can delete the  document records after remvoing applied filters > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in filter apply view***');
      customerHelperMethods.filterDocumentsByType(typeFilter);
      cy.log('***verifying filter selection remove***');
      customerHelperMethods.removeSelectedFilter({ locator: documentTypecolumn });
      cy.log('***verifying download documents after filter remove***');
      customerHelperMethods.deleteDocument();
    },
  );

  it('ME-137527 User can customized the documents view after applying the filters > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in filter apply view***');
      customerHelperMethods.filterDocumentsByType(typeFilter);
      cy.log('***verifying in default view***');
      genericUtils.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnText,
        columnNames: documetcolumnTableArray,
      });
      cy.log('***verifying in expand view***');
      documentsCarrCarrotButtonExpand();
      genericUtils.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnTextExpand,
        columnNames: documetcolumnTableArray,
      });
      genericUtils.clickVisibleElement({ locator: btnNotesExpandViewClose });
      genericUtils.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnText,
        columnNames: documetcolumnTableArray,
      });
      customerHelperMethods.verifyCustomizeOptions({
        locator: btnCustDocDefaultViewExpand,
        element: btnNotesCustomizeOption,
        restEle: btnResetToDefault,
        customTableSave: btnCustTableSave,
        columnTableArray: documetcolumnTableArray,
        tableColumnTextEle: documentsTableAllColumnText,
        hideOneColumnValue: hideCustomTableDocumentNameValue,
        customizeDragItem1: customizeDocumentDetailsDragItem,
        customizeDragItem2: customizeDocumentDirectionDragItem,
        customizedTableArray: documentsCustomizedTableArray,
      });
    },
  );

  it('ME-137530 User can customized the documents view after applying the filters and Export > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in filter apply view***');
      customerHelperMethods.filterDocumentsByType(typeFilter);
      cy.log('***verifying in default view***');
      genericUtils.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnText,
        columnNames: documetcolumnTableArray,
      });
      cy.log('***verifying in expand view***');
      documentsCarrCarrotButtonExpand();
      genericUtils.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnTextExpand,
        columnNames: documetcolumnTableArray,
      });
      genericUtils.clickVisibleElement({ locator: btnNotesExpandViewClose });
      customerHelperMethods.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnText,
        columnNames: documetcolumnTableArray,
      });
      customerHelperMethods.verifyCustomizeOptions({
        locator: btnCustDocDefaultViewExpand,
        element: btnNotesCustomizeOption,
        restEle: btnResetToDefault,
        customTableSave: btnCustTableSave,
        columnTableArray: documetcolumnTableArray,
        tableColumnTextEle: documentsTableAllColumnText,
        hideOneColumnValue: hideCustomTableDocumentNameValue,
        customizeDragItem1: customizeDocumentDetailsDragItem,
        customizeDragItem2: customizeDocumentDirectionDragItem,
        customizedTableArray: documentsCustomizedTableArray,
      });
      cy.log('***verifying download documents after filter remove***');
      customerHelperMethods.downloadDocument();
    },
  );

  it('ME-137532 User can download  document and edit document records after remvoing applied filters > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in filter apply view***');
      customerHelperMethods.filterDocumentsByType(typeFilter);
      cy.log('***verifying filter selection remove***');
      customerHelperMethods.removeSelectedFilter({ locator: documentTypecolumn });
      cy.log('***verifying download documents after filter remove***');
      customerHelperMethods.downloadDocument();
      customerHelperMethods.openEditDocument();
    },
  );

  it('ME-137534 User can customized the documents view after selecting and diselecting any columns  > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in filter apply view***');
      customerHelperMethods.filterDocumentsByType(typeFilter);
      cy.log('***verifying in default view***');
      customerHelperMethods.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnText,
        columnNames: documetcolumnTableArray,
      });
      cy.log('***verifying in expand view***');
      documentsCarrCarrotButtonExpand();
      genericUtils.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnTextExpand,
        columnNames: documetcolumnTableArray,
      });
      genericUtils.clickVisibleElement({ locator: btnNotesExpandViewClose });
      genericUtils.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnText,
        columnNames: documetcolumnTableArray,
      });
      customerHelperMethods.verifyCustomizeOptions({
        locator: btnCustDocDefaultViewExpand,
        element: btnNotesCustomizeOption,
        restEle: btnResetToDefault,
        customTableSave: btnCustTableSave,
        columnTableArray: documetcolumnTableArray,
        tableColumnTextEle: documentsTableAllColumnText,
        hideOneColumnValue: hideCustomTableDocumentNameValue,
        customizeDragItem1: customizeDocumentDetailsDragItem,
        customizeDragItem2: customizeDocumentDirectionDragItem,
        customizedTableArray: documentsCustomizedTableArray,
      });
    },
  );

  it('ME-137535 User can see applied Filters in both default and expan view > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in filter apply view***');
      customerHelperMethods.filterDocumentsByType(typeFilter);
      cy.log('***verifying in default view***');
      genericUtils.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnText,
        columnNames: documetcolumnTableArray,
      });
      cy.log('***verifying in expand view***');
      documentsCarrCarrotButtonExpand();
      genericUtils.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnTextExpand,
        columnNames: documetcolumnTableArray,
      });
      genericUtils.clickVisibleElement({ locator: btnNotesExpandViewClose });
      genericUtils.verifyTableColumnsHeadersToolTip({
        locator: documentsTableAllColumnText,
        columnNames: documetcolumnTableArray,
      });
    },
  );

  it('ME-137537 User can deletes the Document record after filter apply  > CRM > Interactions | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDocuments',
        '@p2',
        '@phase1',
      ],
    },
    () => {
      cy.log('***verifying in default view***');
      customerHelperMethods.customerDocumentsUIValidations({ locator: btnCustDocDefaultViewExpand });
      cy.log('***verifying filter selection***');
      customerHelperMethods.filterDocumentsByType(typeFilter);
      customerHelperMethods.deleteDocument();
    },
  );
});