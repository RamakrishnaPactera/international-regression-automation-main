/*---------------------------------------------------------------------------------------------------------------
Verify to Create new notes in Notes
Test Cases List
Authored By                   : pruthvirajgopalkrishnachari
Date                          : 10-03-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-135754 Can user validate create new notes in Notes > CRM > Notes | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import crmContactsData from '../../../../../../testData/crm/crmData/crmContactsData.json';
import { navigateToNotesTab, notesCarrCarrotButtonExpand } from '../../../../../../utilities/carrierUtils/carrierUtils';
import {
  addNewOpportunity,
  addNotesAllFields,
  validateCreatedNotes,
} from '../../../../../../utilities/customerUtils/customerUtils';
import {
  clickable,
  getTDMData,
  generateRandomNumber,
  toastMsg,
  viewFullPage,
  waitSometime,
  getMinionValues,
} from '../../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';

const { prefixTxt } = crmContactsData.userDefinedData;
const { longWait } = commonData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  minionDrpDwnNotesType,
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
} = crmNotesData.staticData;
const {
  txtFieldNotesValue,
} = crmNotesData.userDefinedData;
const { btnNotesPlus, btnNotesPlusExpand, btnAddNotesCust, btnNotesDownload, tableNotesFirstRowDataDefault, tableNotesFirstRowDataDefaultExpand } = crmNotesPage;
let carrierNameVal, contactName, randomOpportunityName, drpDwnTypeOption1;

describe('Can user validate create new notes in Notes > Carrier > CRM > Notes | Carrier Regression | Regression [ME-135754]', () => {
  before(() => {
    getMinionValues(minionDrpDwnNotesType, 1).then((resultOptions) => {
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

  it('ME-135754 Can user validate create new notes in Notes > CRM > Notes | Regression',
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
      validateCreatedNotes({
        locator: tableNotesFirstRowDataDefault,
        notesTypeValue: drpDwnTypeOption1,
        notesOpportunityNameValue: randomOpportunityName,
        notesContactValue: contactName,
        notesNoteFieldValue: txtFieldNotesValue,
      });
      clickable({ locator: btnNotesDownload });
      cy.log('***verifying in expand view***');
      notesCarrCarrotButtonExpand();
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