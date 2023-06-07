/*---------------------------------------------------------------------------------------------------------------
Verify to create new Document
Test Cases List
Authored By                   : pruthvirajgopalkrishnachari
Date                          : 10-03-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-136706 Can user validate create new documents > CRM > Interactions > Documents | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import crmDocumentsData from '../../../../../../testData/crm/crmData/crmDocumentsData.json';
import crmDocumentsPage from '../../../../../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import crmContactsData from '../../../../../../testData/crm/crmData/crmContactsData.json';
import commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import { sortValidation } from '../../../../../../utilities/commonUtils/sortUtils';
import {
  documentsCarrCarrotButtonExpand,
  navigateToDocumentsTab,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
import {
  addDocumentsAllFields,
  addNewOpportunity,
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
  documenttoasterMsgCarrier,
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
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
let carrierNameVal,
  drpDwnTypeOption1,
  drpDwnDirectionOption1,
  randomOpportunityName,
  contactName;

describe('Can user validate create new Documents in Documents tab > Carrier > CRM > Interactions > Documents | Carrier Regression | Regression [ME-136706] [ME-136744]', () => {
  before(() => {
    getMinionValues(minionDrpDwnDocumentType, 1).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnDocumentDirection, 1).then((resultOptions) => {
      drpDwnDirectionOption1 = resultOptions[0];
    });
    cy.log('***creating new carrier***');
    getTDMData({
      dataType: tdmCarrierData,
      dataCondition: tdmAddCarrierReq,
      dataScenario: tdmCarrierScenario,
    });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
      contactName = carrierNameVal.contactName;
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
    'ME-136706 Can user validate create new Documents in Documents tab > CRM > Interactions | Carrier Regression | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierDocuments', '@p1', '@phase1'],
    },
    () => {
      cy.log('***verifying in default view***');
      navigateToDocumentsTab({ carrierName: carrierNameVal.carrierName });
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
      toastAlertMsgVaidation({ toastMsg: documenttoasterMsgCarrier });
      validateCreatedDocument({
        locator: tableFirstRowDataDefault,
        documentNameValue: tabledocumentName,
        documentTypeValue: drpDwnTypeOption1,
        documnetDirectionValue: drpDwnDirectionOption1,
        documentDetailsValue: txtFieldDocDetailsValue,
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
      toastAlertMsgVaidation({ toastMsg: documenttoasterMsgCarrier });
      validateCreatedDocument({
        locator: tableFirstRowDataExpand,
        documentNameValue: tabledocumentName,
        documentTypeValue: drpDwnTypeOption1,
        documnetDirectionValue: drpDwnDirectionOption1,
        documentDetailsValue: txtFieldDocDetailsValue,
      });
      clickVisibleElement({ locator: btnNotesExpandViewClose });
      sortValidation({ colHeader: tableHeaderDocumentName, rowData: tableRow });
      documentsCarrCarrotButtonExpand();
      sortValidation({
        colHeader: tableHeaderDocumentNameExpand,
        rowData: tableRowExpand,
      });
    },
  );
});