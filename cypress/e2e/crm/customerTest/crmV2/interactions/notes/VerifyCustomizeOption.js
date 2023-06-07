/*---------------------------------------------------------------------------------------------------------------
Verify to customize option notes in Notes
Test Cases List
Authored By                   : pruthvirajgopalkrishnachari
Date                          : 10-03-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-135757 Can user validate customize option notes in Notes > CRM > Notes | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import {
  addNotes,
  addNotesExpand,
  navigateToNotesTab,
  notesCustCarrotButtonExpand,
  verifyCustomizeOptions,
} from '../../../../../../utilities/customerUtils/customerUtils';
import {
  clickable,
  clickAction,
  toastAlertMsgVaidation,
  getTDMData,
  toastMsg,
  verifyTableColumnsHeadersToolTip,
  viewFullPage,
  waitSometime,
  clickVisibleElement,
} from '../../../../../../utilities/commonUtils/genericUtils';
import {
  loginToApplication,
} from '../../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { sortValidation } from '../../../../../../utilities/commonUtils/sortUtils';
const { longWait } = commonData;
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const { columnTableArray, notesToasterMsg, notesCustomizedTableArray, tdmAddCustomerReq, tdmCustomerData, tdmCustomerNewScenario } =
  crmNotesData.staticData;
const { btnAddNotesCust, btnCustDefaultViewExpand, btnCustTableSave, btnNotesDownload, btnNotesCustomizeOption, btnResetToDefault, customizeNotesrepDragItem, customizeNotescontactsDragItem, hideCustomTableTypeValue, notesTableAllColumnText, tableHeaderNotesCreatedDateTime, tabRowNotes, btnNotesExpandViewClose } = crmNotesPage;
let customerNameVal;

describe('Can user validate customize option notes in Notes > Customer > CRM > Notes | Customer Regression | Regression [ME-135757]', () => {
  beforeEach(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerNewScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });

  it('ME-135757 Can user validate customize option notes in Notes > CRM > Notes | Regression',
    {
      tags: ['@customer', '@crm', '@customerNotes', '@p1', '@phase1'],
    },
    () => {
      navigateToNotesTab({ customerName: customerNameVal.customerName });
      waitSometime(longWait);
      addNotes({
        locator: btnAddNotesCust,
      });
      //verifying the new Notes created successfully
      toastMsg();
      notesCustCarrotButtonExpand();
      addNotesExpand({
        locator: btnAddNotesCust,
      });
      //verifying the new Notes created successfully
      toastMsg();
      clickVisibleElement({ locator: btnNotesExpandViewClose });
      //Verifying the tooltips for colomn header
      verifyTableColumnsHeadersToolTip({
        locator: notesTableAllColumnText,
        columnNames: columnTableArray,
      });
      clickable({ locator: btnNotesDownload });
      verifyCustomizeOptions({
        locator: btnCustDefaultViewExpand,
        element: btnNotesCustomizeOption,
        restEle: btnResetToDefault,
        customTableSave: btnCustTableSave,
        columnTableArray,
        tableColumnTextEle: notesTableAllColumnText,
        hideOneColumnValue: hideCustomTableTypeValue,
        customizeDragItem1: customizeNotescontactsDragItem,
        customizeDragItem2: customizeNotesrepDragItem,
        customizedTableArray: notesCustomizedTableArray,
      });
      clickable({ locator: btnNotesDownload });
      clickAction({ locator: btnNotesDownload });
      //verifying the download toaster alert
      toastAlertMsgVaidation({ toastMsg: notesToasterMsg });
      sortValidation({
        colHeader: tableHeaderNotesCreatedDateTime,
        rowData: tabRowNotes,
      });
    },
  );
});