/*---------------------------------------------------------------------------------------------------------------
Verify to create new notes in Notes
Test Cases List
Authored By                   : pruthvirajgopalkrishnachari
Date                          : 10-03-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-134141 Can user validate create new notes in Notes > CRM > notes | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import crmContactsData from '../../../../../../testData/crm/crmData/crmContactsData.json';
import {
  addNewOpportunity,
  addNotesAllFields,
  navigateToNotesTab,
  notesCustCarrotButtonExpand,
  validateCreatedNotes,
} from '../../../../../../utilities/customerUtils/customerUtils';
import {
  clickable,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  toastMsg,
  viewFullPage,
  waitSometime,
} from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';

const { prefixTxt } = crmContactsData.userDefinedData;
const { longWait } = commonData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  minionDrpDwnNotesType,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerNewScenario,
} = crmNotesData.staticData;
const {
  txtFieldNotesValue,
} = crmNotesData.userDefinedData;
const { btnNotesPlus, btnNotesPlusExpand, btnAddNotesCust, btnNotesDownload, tableNotesFirstRowDataDefault, tableNotesFirstRowDataDefaultExpand } = crmNotesPage;
let contactName, customerNameVal, drpDwnTypeOption1, randomOpportunityName;

describe('Can user validate create new notes in Notes > Customer > CRM > Notes | Customer Regression | Regression [ME-134141]', () => {
  beforeEach(() => {
    getMinionValues(minionDrpDwnNotesType, 1).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
    cy.log('***Creating Customer***');
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
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-134141 Can user validate create new notes in Notes > CRM > notes | Regression',
    {
      tags: ['@customer', '@crm', '@customerNotes', '@p1', '@phase1'],
    },
    () => {
      navigateToNotesTab({ customerName: customerNameVal.customerName });
      randomOpportunityName = prefixTxt + generateRandomNumber();
      addNewOpportunity({ randomName: randomOpportunityName });
      waitSometime(longWait);
      addNotesAllFields({
        element: btnNotesPlus,
        locator: btnAddNotesCust,
        notesTypeValue: drpDwnTypeOption1,
        randomName: randomOpportunityName,
      });
      //verifying the new Notes created successfully
      toastMsg();
      validateCreatedNotes({
        locator: tableNotesFirstRowDataDefault,
        notesTypeValue: drpDwnTypeOption1,
        notesOpportunityNameValue: randomOpportunityName,
        notesContactValue: contactName,
        notesNoteFieldValue: txtFieldNotesValue,
      });
      clickable({ locator: btnNotesDownload });
      cy.log('***verifying in expand view***');
      notesCustCarrotButtonExpand();
      addNotesAllFields({
        element: btnNotesPlusExpand,
        locator: btnAddNotesCust,
        notesTypeValue: drpDwnTypeOption1,
        randomName: randomOpportunityName,
      });
      //verifying the new Notes created successfully
      toastMsg();
      validateCreatedNotes({
        locator: tableNotesFirstRowDataDefaultExpand,
        notesTypeValue: drpDwnTypeOption1,
        notesOpportunityNameValue: randomOpportunityName,
        notesContactValue: contactName,
        notesNoteFieldValue: txtFieldNotesValue,
      });
      clickable({ locator: btnNotesDownload });
    },
  );
});