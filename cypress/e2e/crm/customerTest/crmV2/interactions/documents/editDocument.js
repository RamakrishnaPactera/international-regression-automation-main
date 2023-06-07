/*---------------------------------------------------------------------------------------------------------------
Verify to edit Document
Test Cases List
Authored By                   : pruthvirajgopalkrishnachari
Date                          : 10-03-2023
Functions/Calling References  : crmDocumentsPage, crmDocumentsData, utilities
Test case Included            : ME-136703 Can user validate edit documents > CRM > Interactions > Documents | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import crmDocumentsData from '../../../../../../testData/crm/crmData/crmDocumentsData.json';
import crmDocumentsPage from '../../../../../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import crmContactsData from '../../../../../../testData/crm/crmData/crmContactsData.json';
import commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import {
  carrierNoDocInDefaultAndExpndView,
  documentsCarrCarrotButtonExpand,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
import {
  addNewOpportunity,
  addDocumentsAllFields,
  deleteFirstRowDocument,
  editDocuments,
  navigateToDocumentsTab,
  validateCreatedDocument,
} from '../../../../../../utilities/customerUtils/customerUtils';
import {
  clickVisibleElement,
  getTDMData,
  getMinionValues,
  generateRandomNumber,
  toastAlert,
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
  tabledocumentName,
  txtFieldDocDetailsValueLatestUpdated,
  txtFieldDocDetailsValueUpdated,
} = crmDocumentsData.userDefinedData;
const { btnNotesExpandViewClose } = crmNotesPage;
const {
  btnDocContextMenu,
  btnDocumentPlsDefault,
  btnDocContextMenuExpand,
  tableFirstRowDataDefault,
  tableFirstRowEditDataExpand,
} = crmDocumentsPage;
let customerNameVal,
  contactName,
  drpDwnTypeOption1,
  drpDwnDirectionOption1,
  randomOpportunityName;

describe('Can user validate edit Document in Documents tab > Carrier > CRM > Interactions > Documents | Customer Regression | Regression [ME-136703]', () => {
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
    'ME-136703 Can user validate edit Document in Documents tab > CRM > Interactions | Customer Regression | Regression',
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
      editDocuments({
        locator: btnDocContextMenu,
        editDocDetailsValue: txtFieldDocDetailsValueUpdated,
      });
      //verifying the edit Document updated successfully
      toastAlert();
      validateCreatedDocument({
        locator: tableFirstRowDataDefault,
        documentNameValue: tabledocumentName,
        documentTypeValue: drpDwnTypeOption1,
        documnetDirectionValue: drpDwnDirectionOption1,
        documentDetailsValue: txtFieldDocDetailsValueUpdated,
        updatedByUserName: usernameText,
      });
      cy.log('***verifying in expand view***');
      documentsCarrCarrotButtonExpand();
      editDocuments({
        locator: btnDocContextMenuExpand,
        editDocDetailsValue: txtFieldDocDetailsValueLatestUpdated,
      });
      //verifying the edit Document updated successfully
      toastAlert();
      validateCreatedDocument({
        locator: tableFirstRowEditDataExpand,
        documentNameValue: tabledocumentName,
        documentTypeValue: drpDwnTypeOption1,
        documnetDirectionValue: drpDwnDirectionOption1,
        documentDetailsValue: txtFieldDocDetailsValueLatestUpdated,
        updatedByUserName: usernameText,
      });
      clickVisibleElement({ locator: btnNotesExpandViewClose });
      deleteFirstRowDocument({ locator: btnDocContextMenu });
      //verifying the delete Document updated successfully
      toastAlert();
      carrierNoDocInDefaultAndExpndView();
    },
  );
});