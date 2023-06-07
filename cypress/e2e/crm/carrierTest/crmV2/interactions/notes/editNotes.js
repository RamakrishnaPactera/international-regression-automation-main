/*---------------------------------------------------------------------------------------------------------------
Verify to edit Notes in Notes
Test Cases List
Authored By                   : pruthvirajgopalkrishnachari
Date                          : 10-03-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-135696 Can user validate edit notes in Notes > CRM > notes | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import crmContactsData from '../../../../../../testData/crm/crmData/crmContactsData.json';
import contactPage from '../../../../../../pageObjects/crm/contactPage/contactPage.json';
import crmOpportunityData from '../../../../../../testData/crm/crmData/crmOpportunityData.json';
import opportunityPage from '../../../../../../pageObjects/crm/opportunityPage/opportunityPage.json';
import commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import {
  navigateToNotesTab,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
import {
  addNewOpportunity,
  addNotesAllFields,
  editNotes,
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
const { minionDrpDwnNotesType2, notesTableFirstRowAttr, notesTableFirstRowSelectedAttrValue, tdmAddCarrierReq, tdmCarrierData, tdmCarrierScenario } =
  crmNotesData.staticData;
const { btnNotesPlus, btnAddNotesCust, btnNotesDownload, notesTableFirstRow, updatedNoteFirstRow } = crmNotesPage;
const { opportunitiesTableFirstRowAttr } =
  crmOpportunityData.staticData;
const { opportunitiesFirstRowSelectedAttrValue } =
  crmOpportunityData.userDefinedData;
const { opportunityTableFirstRow } = opportunityPage;
let carrierNameVal, drpDwnTypeOption1, randomOpportunityName;

describe('Can user validate edit notes in Notes > Carrier > CRM > Notes | Carrier Regression | Regression [ME-135696]', () => {
  before(() => {
    getMinionValues(minionDrpDwnNotesType2, 1).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
    });
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

  it('ME-135696 Can user validate edit new notes in Notes > CRM > Notes | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierNotes', '@p1', '@phase1'],
    },
    () => {
      navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
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