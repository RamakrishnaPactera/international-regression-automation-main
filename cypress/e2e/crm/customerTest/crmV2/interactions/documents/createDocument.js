/*---------------------------------------------------------------------------------------------------------------
Verify to create new Document
Test Cases List
Authored By                   : pruthvirajgopalkrishnachari
Date                          : 10-03-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-136702 Can user validate create new documents > CRM > Interactions > Documents | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import crmDocumentsData from '../../../../../../testData/crm/crmData/crmDocumentsData.json';
import crmDocumentsPage from '../../../../../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import crmContactsData from '../../../../../../testData/crm/crmData/crmContactsData.json';
import commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import { sortValidation } from '../../../../../../utilities/commonUtils/sortUtils';
import { documentsCarrCarrotButtonExpand } from '../../../../../../utilities/carrierUtils/carrierUtils';
import {
  addNewOpportunity,
  addDocumentsAllFields,
  navigateToDocumentsTab,
  validateCreatedDocument,
} from '../../../../../../utilities/customerUtils/customerUtils';
import {
  clickVisibleElement,
  getTDMData,
  getMinionValues,
  generateRandomNumber,
  toastAlertMsgVaidation,
  viewFullPage,
  waitSometime,
} from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { longWait } = commonData;
const { prefixTxt } = crmContactsData.userDefinedData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  documenttoasterMsgCustomer,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerNewScenario,
} = crmNotesData.staticData;
const { minionDrpDwnDocumentDirection, minionDrpDwnDocumentType } =
  crmDocumentsData.staticData;
const {
  documentFileUploadTargetFile,
  documentFileUploadTargetFile2,
  tabledocumentName,
  txtFieldDocDetailsValue,
} = crmDocumentsData.userDefinedData;
const { btnNotesExpandViewClose } = crmNotesPage;
const {
  btnDocumentPlsDefault,
  btnDocumentPlsExpand,
  tableFirstRowDataDefault,
  tableFirstRowDataExpand,
  tableHeaderDocumentName,
  tableRow,
  tableHeaderDocumentNameExpand,
  tableRowExpand,
} = crmDocumentsPage;
let customerNameVal,
  contactName,
  drpDwnTypeOption1,
  drpDwnDirectionOption1,
  randomOpportunityName;

describe('Can user validate create new Documents in Documents tab > Customer > CRM > Interactions > Documents | Customer Regression | Regression [ME-136702] [ME-136704]', () => {
  before(() => {
    getMinionValues(minionDrpDwnDocumentType, 1).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnDocumentDirection, 1).then((resultOptions) => {
      drpDwnDirectionOption1 = resultOptions[0];
    });
    cy.log('***creating new Customer***');
    getTDMData({
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
    viewFullPage();
  });

  it(
    'ME-136702 Can user validate create new Documents in Documents tab > CRM > Interactions | Customer Regression | Regression',
    {
      tags: ['@customer', '@crm', '@customerDocuments', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToDocumentsTab({ customerName: customerNameVal.customerName });
      randomOpportunityName = prefixTxt + generateRandomNumber();
      addNewOpportunity({ randomName: randomOpportunityName });
      waitSometime(longWait);
      addDocumentsAllFields({
        locator: btnDocumentPlsDefault,
        documentFileUploadTargetFile,
        dropDownDocTypeValue: drpDwnTypeOption1,
        contactName,
        randomName: randomOpportunityName,
        dropDownDocDirectionValue: drpDwnDirectionOption1,
      });
      //verifying the new Document created successfully
      toastAlertMsgVaidation({ toastMsg: documenttoasterMsgCustomer });
      validateCreatedDocument({
        locator: tableFirstRowDataDefault,
        documentNameValue: tabledocumentName,
        documentTypeValue: drpDwnTypeOption1,
        documnetDirectionValue: drpDwnDirectionOption1,
        documentDetailsValue: txtFieldDocDetailsValue,
        updatedByUserName: usernameText,
      });
      cy.log('***verifying in expand view***');
      documentsCarrCarrotButtonExpand();
      addDocumentsAllFields({
        locator: btnDocumentPlsExpand,
        documentFileUploadTargetFile: documentFileUploadTargetFile2,
        dropDownDocTypeValue: drpDwnTypeOption1,
        contactName,
        randomName: randomOpportunityName,
        dropDownDocDirectionValue: drpDwnDirectionOption1,
      });
      //verifying the new Document created successfully
      toastAlertMsgVaidation({ toastMsg: documenttoasterMsgCustomer });
      validateCreatedDocument({
        locator: tableFirstRowDataExpand,
        documentNameValue: tabledocumentName,
        documentTypeValue: drpDwnTypeOption1,
        documnetDirectionValue: drpDwnDirectionOption1,
        documentDetailsValue: txtFieldDocDetailsValue,
        updatedByUserName: usernameText,
      });
      clickVisibleElement({ locator: btnNotesExpandViewClose });
      //verify sorting
      sortValidation({ colHeader: tableHeaderDocumentName, rowData: tableRow });
      documentsCarrCarrotButtonExpand();
      sortValidation({
        colHeader: tableHeaderDocumentNameExpand,
        rowData: tableRowExpand,
      });
    },
  );
});