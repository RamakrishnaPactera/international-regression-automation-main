/*---------------------------------------------------------------------------------------------------------------
Verify to customize option in Notes
Test Cases List
Authored By                   : pruthvirajgopalkrishnachari
Date                          : 10-03-2023
Functions/Calling References  : crmNotesPage, crmNotesData, utilities
Test case Included            : ME-135758 Can user validate customize option in Notes > CRM > Notes | Regression
------------------------------------------------------------------------------------------------------------------*/
import crmNotesData from '../../../../../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../../../../../pageObjects/crm/crmPage/crmNotesPage.json';
import commonData from '../../../../../../testData/staticData/commonData/commonData.json';
import {
  navigateToNotesTab, notesCarrCarrotButtonExpand,
} from '../../../../../../utilities/carrierUtils/carrierUtils';
import {
  addNotes,
  addNotesExpand,
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
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
  columnTableArray,
  notesToasterMsg,
  notesCustomizedTableArray,
} = crmNotesData.staticData;
const {
  btnCustDefaultViewExpand, btnCustTableSave, btnNotesCustomizeOption, btnNotesDownload, btnAddNotesCust, btnNotesExpandViewClose,
  btnResetToDefault, customizeNotesrepDragItem, customizeNotescontactsDragItem, hideCustomTableTypeValue, notesTableAllColumnText, tableHeaderNotesCreatedDateTime, tabRowNotes,
} = crmNotesPage;
let carrierNameVal;

describe('Can user validate customize option in Notes > Carrier > CRM > Notes | Carrier Regression | Regression [ME-135758]', () => {
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

  it('ME-135758 Can user validate customize option in Notes > CRM > Notes | Regression',
    {
      tags: ['@carrier', '@crm', '@carrierNotes', '@p1', '@phase1'],
    },
    () => {
      navigateToNotesTab({ carrierName: carrierNameVal.carrierName });
      waitSometime(longWait);
      addNotes({
        locator: btnAddNotesCust,
      });
      //verifying the new Notes created successfully
      toastMsg();
      notesCarrCarrotButtonExpand();
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