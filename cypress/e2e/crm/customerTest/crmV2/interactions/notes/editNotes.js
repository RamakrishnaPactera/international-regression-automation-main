/*---------------------------------------------------------------------------------------------------------------
Verify to edit notes in Notes
Test Cases List
Authored By                   : pruthvirajgopalkrishnachari
Date                          : 10-03-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-135696 Can user validate edit notes in Notes > CRM > Notes | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import crmContactsData from '../../../../../../testData/crm/crmData/crmContactsData.json';
import contactPage from '../../../../../../pageObjects/crm/contactPage/contactPage.json';
import crmOpportunityData from '../../../../../../testData/crm/crmData/crmOpportunityData.json';
import opportunityPage from '../../../../../../pageObjects/crm/opportunityPage/opportunityPage.json';
import commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import {
  addNewOpportunity,
  addNotesAllFields,
  editNotes,
  navigateToNotesTab,
} from '../../../../../../utilities/customerUtils/customerUtils';
import {
  clickable,
  clickAction,
  generateRandomNumber,
  getMinionValues,
  getTDMData,
  toastMsg,
  verifyAttrText,
  verifyTextContains,
  viewFullPage,
  waitSometime,
} from '../../../../../../utilities/commonUtils/genericUtils';
import {
  loginToApplication,
} from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';

const { prefixTxt, contactsFirstRowSelectedAttrValue } =
  crmContactsData.userDefinedData;
const { txtFieldNotesUpdatedValue } = crmNotesData.userDefinedData;
const { contactsTableFirstRowAttr } = crmContactsData.staticData;
const { contactsTableFirstRow } = contactPage;
const { longWait } = commonData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const { minionDrpDwnNotesType, notesTableFirstRowAttr, notesTableFirstRowSelectedAttrValue, tdmAddCustomerReq, tdmCustomerData, tdmCustomerNewScenario } =
  crmNotesData.staticData;
const { btnNotesPlus, btnAddNotesCust, btnNotesDownload, notesTableFirstRow, updatedNoteFirstRow } = crmNotesPage;
const { opportunitiesTableFirstRowAttr } =
  crmOpportunityData.staticData;
const { opportunitiesFirstRowSelectedAttrValue } =
  crmOpportunityData.userDefinedData;
const { opportunityTableFirstRow } = opportunityPage;
let customerNameVal, drpDwnTypeOption1, randomOpportunityName;

describe('Can user validate edit notes in Notes > Customer > CRM > Notes | Customer Regression | Regression [ME-135696]', () => {
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
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-135696 Can user validate edit new notes in Notes > CRM > Notes | Regression',
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
      clickable({ locator: btnNotesDownload });
      clickAction({ locator: notesTableFirstRow });
      verifyAttrText({
        locator: notesTableFirstRow,
        attribute: notesTableFirstRowAttr,
        verifyText: notesTableFirstRowSelectedAttrValue,
      });
      verifyAttrText({
        locator: opportunityTableFirstRow,
        attribute: opportunitiesTableFirstRowAttr,
        verifyText: opportunitiesFirstRowSelectedAttrValue,
      });
      verifyAttrText({
        locator: contactsTableFirstRow,
        attribute: contactsTableFirstRowAttr,
        verifyText: contactsFirstRowSelectedAttrValue,
      });
      clickAction({ locator: notesTableFirstRow });
      editNotes({ locator: btnAddNotesCust });
      //verifying the edited Notes updated successfully
      toastMsg();
      verifyTextContains({ locator: updatedNoteFirstRow, containsText: txtFieldNotesUpdatedValue });
    },
  );
});