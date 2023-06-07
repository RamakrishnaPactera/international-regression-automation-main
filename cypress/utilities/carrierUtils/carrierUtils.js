import { returntodayDateMMDDYY, datePicker } from '../../utilities/commonUtils/dateTimeUtils';
import crmIndustryPage from '../../pageObjects/crm/crmPage/crmIndustryPage.json';
import crmIndustryData from '../../testData/crm/crmData/crmIndustryData.json';
import crmFirmographicsPage from '../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import crmInteractionsPage from '../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import capacityPage from '../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import commonData from '../../testData/staticData/commonData/commonData.json';
import contactPage from '../../pageObjects/crm/contactPage/contactPage.json';
import contactData from '../../testData/crm/crmData/crmContactsData.json';
import capacityData from '../../testData/slackIntegration/carrierData/details/capacity/capacityData.json';
import crmNotesData from '../../testData/crm/crmData/crmNotesData.json';
import crmNotesPage from '../../pageObjects/crm/crmPage/crmNotesPage.json';
import crmOpportunitiesPage from '../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import crmOpportunitiesData from '../../testData/crm/crmData/crmOpportunitiesData.json';
import crmInteractionsData from '../../testData/crm/crmData/crmInteractionsData.json';
import * as genericUtils from '../commonUtils/genericUtils';
import * as commonPage from '../../pageObjects/commonPage/commonPage.json';
import {
  notesColumnFilterUIValidations,
} from '../../utilities/customerUtils/customerUtils';
import {
  clearAndTypeWithWait,
  clearTypeEnter,
  clearTypeText,
  clickable,
  clickAction,
  clickToOpenNewTabInSameWindowWithDynamicText,
  verifyExistElementWithDynamicTitle,
  clickTypeLastElement,
  clickCancelOnWindowAlertConfirm,
  clickFirstElementIn,
  clickOkOnWindowAlert,
  clickVisibleElement,
  dragAndDrop,
  dropDownContainsTextClick,
  navigateToChildWindow,
  notClickable,
  scrollIntoView,
  scrollToBottomRight,
  scrollToRight,
  selectItemFromDropDownByTyping,
  toastMsg,
  typeDropDwnContainsClick,
  typeText,
  verifyAttrText,
  verifyAttrValueContains,
  verifyConfirmAlertMessage,
  verifyDoesNotExist,
  verifyElementTextContains,
  verifyExists,
  verifyIfDisabled,
  verifyIfEnabled,
  verifyLabelText,
  verifyLastRowContainsColumnTxt,
  verifyTableColumnsHeaders,
  verifyText,
  verifyTextContains,
  verifyTextOrBackGroundColor,
  verifyToExist,
  clearText,
  verifyVisible,
  waitSometime,
  previousTab,
  newWindowHandles,
  verifyLabel,
  selectItemFrmSrchPicker,
} from '../commonUtils/genericUtils.js';
const {
  logDate,
  logTime,
  logDuration,
  loghrefLink,
  schedulehrefLink,
  logContact,
  validateViaColumn1,
  logOpportunity,
  logOutcome,
  logStrategy,
  logType,
  logObjective,
  logSave,
} = crmInteractionsData.staticData;
const {
  btnContactsPlus,
  txtContactsPhone,
  txtContactsEmail,
  btnContactsIgnoreAndAddNewContact,
  btnSaveAndContinueContact,
  txtContactTitle,
  txtBusinessInfoTitle,
  btnSaveEditBusinessInformationEntity,
  btnCloseBusinessInfoEntity,
  radioBtnAssociateContact,
  btnAssociatedContact,
  btnSaveEditAssociatedEntity,
  txtlevel,
  btnDeptartmentWithWarehouse,
  btnPrimaryWorkLocation,
  txtManager,
  btnWorkEnvironment,
  btnContactSource,
  btnCommunicationPreference,
  btnPricingBehaviour,
  searchLatestCreatedContactTxt,
  searchLatestCreatedTitleTxt,
  tabBusinessInformation,
  businessEditbtn,
  managerHyperlinkbtn,
  h2ManagerTitleNameLabel,
} = contactPage;
const {
  title,
  level,
  DeptartmentWithWarehouse,
  PrimaryWorkLocation,
  WorkEnvironment,
  Manager,
  CommunicationPreference,
  PricingBehaviour,
  ContactSource,
} = contactData.userDefinedData;
const { industryCodeSICB } = crmIndustryData.userDefinedData;
const {
  btnAddIndustrySave,
  btnCarrier,
  btnCustomizeApply,
  btnCustomizeResetToDefaults,
  btnExpand,
  btnExpandIndustriesPlus,
  btnIndustriesPlus,
  btnIndustriesTab,
  btnIndustriesTabCarrierDelete,
  btnIndustriesTabCarrierEdit,
  btnIndustriesTabCarrierMenuButton,
  btnSaveIndustry,
  btnSearch,
  checkBoxEditIndustryPrimary,
  checkBxIndustryPrimary,
  customizeCodeDragItem,
  customizeSystemDragItem,
  customizeTable,
  dialogPopup,
  divisionColumn,
  drpdwnCarrotBtnIndustries,
  drpdwnClassificationSystem,
  drpdwnIndustryCode,
  drpdwnIndustryCodeVal,
  editIndustryBackgoundColor,
  extendedColumn,
  eyeIconVisible,
  industryColumn,
  industryGroupColumn,
  labelClassificationSystem,
  labelIndustriesHeaderId,
  labelIndustryCode,
  labelIndustryPrimary,
  labelPrimary,
  linkSearchCarrier,
  majorGroupColumn,
  msgVerbiage,
  systemColumn,
  tabCarrierDetails,
  tabCrmCarrier,
  tabIndustries,
  tblCustomizeHeader,
  tblIndustriesTitle,
  txtFieldCarrierName,
} = crmIndustryPage;

const {
  colorAttr,
  defaultMode,
  industriesTblCustomizeColHeadersAll,
  industriesTblCustomizeColHeadersAllAfterRearrange,
  industriesTitleAttr,
  industriesTitleDataWalkmeAttr,
  industryClassificationSystemISIC,
  industryClassificationSystemNAICS,
  industryClassificationSystemSIC,
  industryCodeSIC,
  industryPrimaryAttr,
  primaryCheckBoxMessage,
  txtIndustriesTabVerification,
} = crmIndustryData.staticData;

const {
  editIndustryColorCodeVal,
  industryPrimaryValue,
  industryPrimaryValueCancel,
  validateDivisionColumn,
  validateExtendedColumn,
  validateIndustriesTableTitle,
  validateIndustryColumn,
  validateIndustryGroupColumn,
  validateLabelClassificationSystem,
  validateLabelIndustriesHeaderId,
  validateLabelIndustryCode,
  validateLabelPrimary,
  validateMajorGroupColumn,
  validateSystemColumn,
} = crmIndustryData.expectedData;
const {
  slackUser,
  slackUserWithLowercase,
  slackUserWithUppercase,
  specialCharsVal,
  withNoSlackUser,
} = capacityData.userDefinedData;
const {
  placeholderText,
  sendButtonText,
} = capacityData.expectedData;
const {
  placeholderAttr,
  txtFailure,
  txtSuccess,
} = capacityData.staticData;
const {
  btnContact,
  btnFirmographics,
  btnFirmographicsEdit,
  btnFirmographicsSave,
  btnSaveContact,
  drpdwnContactDepartment,
  tabCrmV2,
  txtFieldContactName,
} = crmFirmographicsPage;
const {
  btnLog,
  btnScheduleInt,
  lblLogDate,
  lblLogTime,
  lblLogDuration,
  lblLogContact,
  lblLogOpportunity,
  lblLogStrategy,
  lblLogObjective,
  lblLogType,
  lblLogVia,
  lblLogOutcome,
  btnSaveInteraction,
} = crmInteractionsPage;
const { shortWait, mode, longWait, moreWait } = commonData;
const {
  addTruckEntry,
  btnSharePopupCloseIcon,
  btnSharePopupSend,
  btnSharePopupTo,
  destinationLocation,
  labelSharePopupWordCount,
  listSharePopupToPopulatedItems,
  loadDateField,
  originLocation,
  readyDateField,
  subTitleSharePopup,
  titleSharePopup,
  toastErrorMessage,
  toastMessage,
  toastSuccessMessage,
  txtFieldSharePopupNote,
  txtFieldSharePopupTo,
} = capacityPage;

const {
  tblOppTitle,
} = crmOpportunitiesPage;

const {
  tblTitle,
} = crmOpportunitiesData.staticData;

const {
  btnAddNotesCarr,
  btnAddNotesTypeField,
  btnCarrDefaultViewExpand,
  btnCarrDocDefaultViewExpand,
  btnContextMenu,
  btnDocumentsHideandShowFilter,
  btnExpandViewExpand,
  btnNotesCustomize,
  btnNotesCustomizeOppEye,
  btnNotesCustomizeSave,
  btnNoteContactFilter,
  btnNoteCreatedByFilter,
  btnNoteDateAndTimeFilter,
  btnNoteFilter,
  btnNoteOpportunityFilter,
  btnNoteRepFilter,
  btnNotesDownload,
  btnNotesDownloadList,
  btnNotesEdit,
  btnNotesExpandList,
  btnNotesExpandViewClose,
  btnNotesHideFilter,
  btnNotesPlus,
  btnNotesRepsdraggable,
  btnNotesTypedraggable,
  documentDetailscolumn,
  documentDirectioncolumn,
  documentNamecolumn,
  documentTypecolumnCarr,
  documentUpdatedBycolumnCarr,
  documentUpdatedDateTimecolumn,
  documentUploadedBycolumnCarr,
  documentUploadedDateTimecolumnCarr,
  btnNoteTypeFilter,
  btnNoteUpdatedByFilter,
  btnNoteUpdatedDateandTimeFilter,
  msgDownloadProcessingToast,
  noDocInDefaultViewCarr,
  noDocInExpandView,
  notesCustomizeWindow,
  tabDocuments,
  tabNotes,
  txtFieldAddNotes,
  msgNoNotes,
  visibleElementExpandview,
} = crmNotesPage;

const {
  msgNoDocumentsFound,
  notesDownloadValue,
} = crmNotesData.expectedData;

const {
  modeVal,
  notesDownloadAttr,
  msgNoNotesFound,
} = crmNotesData.staticData;

const {
  downloadIconViewMode,
  downloadOptionViewMode,
  modeValNo,
  modeValYes,
  txtFieldNotesUpdatedValue,
  txtFieldNotesValue,
} = crmNotesData.userDefinedData;

//carrier Search
const searchCarrier = ({ carrierName: carrier }) => {
  verifyToExist({ element: btnCarrier });
  cy.get(btnCarrier).click({ force: true });
  cy.wait(shortWait);
  verifyToExist({ element: linkSearchCarrier });
  cy.get(linkSearchCarrier).click({ force: true });
  cy.wait(shortWait);
  typeText({ locator: txtFieldCarrierName, dataText: carrier });
  verifyLabelText({ locator: txtFieldCarrierName, verifyText: carrier });
  verifyToExist({ element: btnSearch });
  cy.get(btnSearch).click();
  cy.wait(shortWait);
  genericUtils.getDynamicAttr({ button: carrier });
};

export const searchCarrierCustomer = ({ typeTextVal: tdmCustomerData }) => {
  genericUtils.verifyToExist({ element: crmIndustryPage.btnCarrier });
  cy.get(crmIndustryPage.btnCarrier).click({ force: true });
  cy.wait(shortWait);
  genericUtils.verifyToExist({ element: crmIndustryPage.linkSearchCarrier });
  cy.get(crmIndustryPage.linkSearchCarrier).click({ force: true });
  cy.wait(shortWait);
  cy.get(crmIndustryPage.txtFieldCarrierName).type(tdmCustomerData);
  genericUtils.verifyLabelText({ locator: crmIndustryPage.txtFieldCarrierName, verifyText: tdmCustomerData });
  genericUtils.verifyToExist({ element: crmIndustryPage.btnSearch });
  cy.get(crmIndustryPage.btnSearch).click({ force: true });
  cy.wait(shortWait);
  genericUtils.clickAction({ locator: crmIndustryPage.txtFieldCarrierCode });
};

const addIndustryWithDuplicateCode = ({ typeTextVal: industryClassificationSystem, drpDwnValue: industryCode }) => {
  verifyToExist({ element: btnIndustriesPlus });
  clickAction({ locator: btnIndustriesPlus });
  verifyToExist({ element: drpdwnClassificationSystem });
  dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystem, exactText: industryClassificationSystem });
  verifyToExist({ element: drpdwnIndustryCode });
  typeDropDwnContainsClick({ locator: drpdwnIndustryCode, drpDwnVal: industryCode });
  verifyToExist({ element: btnAddIndustrySave });
  clickAction({ locator: btnAddIndustrySave });
  toastMsg();
};

const verifyAddIndustryLabels = ({ typeTextVal: industryClassificationSystem }) => {
  clickAction({ locator: drpdwnClassificationSystem });
  dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystem, exactText: industryClassificationSystem });
  verifyAttrText({ locator: labelIndustryPrimary, attribute: industryPrimaryAttr, verifyText: industryPrimaryValue });
};

const verifyPrimaryChkBoxEnabled = ({ viewMode }) => {
  if (viewMode === mode) {
    clickVisibleElement({ locator: btnIndustriesPlus });
  } else {
    clickVisibleElement({ locator: btnExpandIndustriesPlus });
  }
  cy.log('***Verify The Primary Checkbox in Add Industry modal***');
  verifyIfDisabled({ locator: labelIndustryPrimary });
  cy.log('***Verify The user should see that it is disabled by default, as there has been no change made yet.***');
  verifyIfDisabled({ locator: btnAddIndustrySave });
  cy.log('***Verify The Primary Checkbox and labels Industry Code table*****');
  verifyAddIndustryLabels({ typeTextVal: industryClassificationSystemSIC });
  verifyAddIndustryLabels({ typeTextVal: industryClassificationSystemNAICS });
  verifyAddIndustryLabels({ typeTextVal: industryClassificationSystemISIC });
  clickVisibleElement({ locator: dialogPopup });
};

//Add Contact
const addContact = ({ contactName: contactDepName, randomName: randomContactName }) => {
  clickAction({ locator: tabCrmV2 });
  clickAction({ locator: btnContact });
  dropDownContainsTextClick({
    element: txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  dropDownContainsTextClick({
    element: drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  clickAction({ locator: btnSaveContact });
};
const navigateToTheCrmV2Tab = ({ typeTextVal: tdmCarrierData }) => {
  searchCarrier({ carrierName: tdmCarrierData });
  clickFirstElementIn({ locator: tabCrmV2 });
};
const navigateToTheEditFirmographicsTab = () => {
  clickFirstElementIn({ locator: tabCrmCarrier });
  verifyVisible({ element: tabCarrierDetails });
  clickAction({ locator: tabCarrierDetails });
  scrollToBottomRight();
  verifyVisible({ element: btnFirmographics });
  clickAction({ locator: btnFirmographics });
  verifyVisible({ element: btnFirmographicsEdit });
  clickAction({ locator: btnFirmographicsEdit });
  notClickable({ locator: btnFirmographicsSave });
  waitSometime(shortWait);
};
//Add Truck
const addTruck = ({ originLocation: fromLocation, destinationLocation: toLocation }) => {
  clearTypeEnter({ element: originLocation, typeText: fromLocation });
  clearTypeEnter({ element: destinationLocation, typeText: toLocation });
  datePicker({ dateLocator: readyDateField, dataText: returntodayDateMMDDYY() });
  datePicker({ dateLocator: loadDateField, dataText: returntodayDateMMDDYY() });
  clickAction({ locator: addTruckEntry });
  cy.wait(shortWait);
};
const navigateToEditIndustry = () => {
  verifyToExist({ element: btnIndustriesTabCarrierMenuButton });
  clickVisibleElement({ locator: btnIndustriesTabCarrierMenuButton });
  verifyToExist({ element: btnIndustriesTabCarrierEdit });
  clickVisibleElement({ locator: btnIndustriesTabCarrierEdit });
  scrollToRight();
};
const deleteIndustry = () => {
  verifyToExist({ element: btnIndustriesTabCarrierMenuButton });
  clickVisibleElement({ locator: btnIndustriesTabCarrierMenuButton });
  verifyToExist({ element: btnIndustriesTabCarrierDelete });
  clickVisibleElement({ locator: btnIndustriesTabCarrierDelete });
  clickOkOnWindowAlert();
  waitSometime(longWait);
};
const carrotButtonClickExpand = () => {
  verifyToExist({ element: drpdwnCarrotBtnIndustries });
  clickAction({ locator: drpdwnCarrotBtnIndustries });
  verifyToExist({ element: btnExpand });
  clickVisibleElement({ locator: btnExpand });
};
const verifyEditFunctionality = () => {
  verifyToExist({ element: drpdwnClassificationSystem });
  dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemSIC, exactText: industryClassificationSystemSIC });
  verifyToExist({ element: drpdwnIndustryCode });
  typeDropDwnContainsClick({ locator: drpdwnIndustryCode, drpDwnVal: industryCodeSICB });
  verifyToExist({ element: btnSaveIndustry });
  clickAction({ locator: btnSaveIndustry });
  toastMsg();
  waitSometime(longWait);
};
const navigateToTheIndustriesTab = ({ carrierName: carrierNameVal }) => {
  searchCarrier({ carrierName: carrierNameVal });
  clickFirstElementIn({ locator: tabCrmCarrier });
  clickAction({ locator: tabCarrierDetails });
  clickAction({ locator: btnIndustriesTab });
  scrollToRight();
};
const verifyPrimaryChkBxStatus = ({ typeText: industryClassificationSystemSIC, drpDwnVal: industryCodeSIC, viewMode }) => {
  if (viewMode === mode) {
    clickVisibleElement({ locator: btnIndustriesPlus });
  } else {
    clickVisibleElement({ locator: btnExpandIndustriesPlus });
  }
  dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemSIC, exactText: industryClassificationSystemSIC });
  typeDropDwnContainsClick({ locator: drpdwnIndustryCode, drpDwnVal: industryCodeSIC });
  clickAction({ locator: checkBxIndustryPrimary });
  verifyConfirmAlertMessage({ msgToVerify: primaryCheckBoxMessage });
  clickCancelOnWindowAlertConfirm();
  verifyAttrText({ locator: labelIndustryPrimary, attribute: industryPrimaryAttr, verifyText: industryPrimaryValueCancel });
  clickVisibleElement({ locator: btnAddIndustrySave });
};

const addIndustry = ({ typeTextVal: industryClassificationSystem, drpDwnValue: industryCode, viewMode }) => {
  if (viewMode === defaultMode) {
    clickVisibleElement({ locator: btnIndustriesPlus });
  } else {
    clickVisibleElement({ locator: btnExpandIndustriesPlus });
  }
  dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystem, exactText: industryClassificationSystem });
  typeDropDwnContainsClick({ locator: drpdwnIndustryCode, drpDwnVal: industryCode });
  clickAction({ locator: btnSaveIndustry });
  toastMsg();
};

const addNewIndustry = ({ typeTextVal: industryClassificationSystem, drpDwnValue: industryCode }) => {
  clickAction({ locator: btnIndustriesPlus });
  dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystem, exactText: industryClassificationSystem });
  typeDropDwnContainsClick({ locator: drpdwnIndustryCode, drpDwnVal: industryCode });
  clickAction({ locator: btnAddIndustrySave });
};

const navigateToOpportunitiesTab = ({ carrierName: carrierNameVal }) => {
  cy.log('Navigating to Opportunities tab');
  searchCarrier({ carrierName: carrierNameVal });
  waitSometime(shortWait);
  clickFirstElementIn({ locator: tabCrmCarrier });
  verifyTextContains({ locator: tblOppTitle, containsText: tblTitle });
};
const verifyCustomizeIndustriesDrgAndDwp = () => {
  verifyTableColumnsHeaders({ locator: tblCustomizeHeader, columnNames: industriesTblCustomizeColHeadersAll });
  cy.log('***Switch the show option \'On\' of any column***');
  clickAction({ locator: eyeIconVisible });
  verifyVisible({ element: eyeIconVisible });
  cy.log('***Switch the show option \'Off\' of any column***');
  clickAction({ locator: eyeIconVisible });
  cy.log('***Verify drag a column to a new location***');
  dragAndDrop({ draggedElement: customizeSystemDragItem, stationaryElement: customizeCodeDragItem, refElement: customizeTable });
  verifyTableColumnsHeaders({ locator: tblCustomizeHeader, columnNames: industriesTblCustomizeColHeadersAllAfterRearrange });
  clickAction({ locator: btnCustomizeResetToDefaults });
  clickAction({ locator: btnCustomizeApply });
  verifyText({ locator: tabIndustries, verifyText: txtIndustriesTabVerification });
};
//Verify share popup fields
const verifySharePopupFields = () => {
  verifyVisible({ element: btnSharePopupTo });
  clickAction({ locator: btnSharePopupTo });
  verifyAttrValueContains({ locator: txtFieldSharePopupTo, attribute: placeholderAttr, verifyText: placeholderText });
  verifyVisible({ element: txtFieldSharePopupNote });
  verifyExists({ element: labelSharePopupWordCount });
  verifyVisible({ element: btnSharePopupSend });
  verifyText({ locator: btnSharePopupSend, verifyText: sendButtonText });
  verifyVisible({ element: btnSharePopupCloseIcon });
};
const navigateToShareModelPopup = ({ locator: carretIcon, element: shareBtn }) => {
  clickFirstElementIn({ locator: carretIcon });
  clickVisibleElement({ locator: shareBtn });
};

const verifyShareModelPopupTitleAndSubTitle = ({ title: sharePopupTitle, subTitle: sharePopupSubTitle }) => {
  verifyText({ locator: titleSharePopup, verifyText: sharePopupTitle });
  verifyVisible({ element: subTitleSharePopup });
  verifyText({ locator: subTitleSharePopup, verifyText: sharePopupSubTitle });
};

const verifyIndustriesTblValues = ({ mapName: reqMapName, locator: element }) => {
  reqMapName.forEach((value, key) => {
    verifyLastRowContainsColumnTxt({ locator: element, locatorColumn: key, containsText: value });
  });
};

//verification for Columns Headers DivisionColumn, MajorGroupColumn, IndustryGroupColumn, IndustryColumn, ExtendedColumn, SystemColumn
const verifyColumnsInIndustryTab = () => {
  verifyAttrText({ locator: tblIndustriesTitle, attribute: industriesTitleDataWalkmeAttr, verifyText: validateIndustriesTableTitle });
  verifyAttrText({ locator: divisionColumn, attribute: industriesTitleAttr, verifyText: validateDivisionColumn });
  verifyAttrText({ locator: majorGroupColumn, attribute: industriesTitleAttr, verifyText: validateMajorGroupColumn });
  verifyAttrText({ locator: industryGroupColumn, attribute: industriesTitleAttr, verifyText: validateIndustryGroupColumn });
  verifyAttrText({ locator: industryColumn, attribute: industriesTitleAttr, verifyText: validateIndustryColumn });
  verifyAttrText({ locator: extendedColumn, attribute: industriesTitleAttr, verifyText: validateExtendedColumn });
  verifyAttrText({ locator: systemColumn, attribute: industriesTitleAttr, verifyText: validateSystemColumn });
};

//verification for fields Edit Industry,Classification System,Industry Code & Description,Primary Verbiage message
const verifyAllFieldsInEditIndustryModal = () => {
  verifyText({ locator: labelIndustriesHeaderId, verifyText: validateLabelIndustriesHeaderId });
  verifyTextOrBackGroundColor({ locator: editIndustryBackgoundColor, color: colorAttr, colorCode: editIndustryColorCodeVal });
  clickable({ locator: drpdwnClassificationSystem });
  clickable({ locator: drpdwnIndustryCode });
  clickable({ locator: checkBoxEditIndustryPrimary });
  verifyAttrText({ locator: drpdwnClassificationSystem, attribute: industriesTitleAttr, verifyText: industryClassificationSystemSIC });
  verifyAttrText({ locator: drpdwnIndustryCodeVal, attribute: industriesTitleAttr, verifyText: industryCodeSIC });
  verifyTextContains({ locator: labelClassificationSystem, containsText: validateLabelClassificationSystem });
  verifyTextContains({ locator: labelIndustryCode, containsText: validateLabelIndustryCode });
  verifyText({ locator: labelPrimary, verifyText: validateLabelPrimary });
  verifyVisible({ element: msgVerbiage });
  clickVisibleElement({ locator: dialogPopup });
};

const addNewContact = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  clickTypeLastElement({ locator: txtFieldContactName, element: randomContactName });
  waitSometime(shortWait);
  dropDownContainsTextClick({
    element: drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  waitSometime(shortWait);
  typeText({ locator: txtContactsPhone, dataText: randomPhNo });
  typeText({ locator: txtContactsEmail, dataText: newContactTabEmailVal });
  typeText({ locator: txtContactTitle, dataText: title });
  verifyIfEnabled({ locator: btnSaveContact });
  clickAction({ locator: btnSaveContact });
  waitSometime(shortWait);
  cy.reload(true);
  waitSometime(longWait);
  dropDownContainsTextClick({
    element: searchLatestCreatedContactTxt,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  waitSometime(longWait);
  //dynamicWindowHandles({ button: randomContactName });
  clickToOpenNewTabInSameWindowWithDynamicText({ button: randomContactName });
  cy.window().its('open').should('be.called');
  waitSometime(longWait);
};

const editContactBusinessInfoTab = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  waitSometime(longWait);
  clickAction({ locator: tabBusinessInformation });
  waitSometime(shortWait);
  clickAction({ locator: businessEditbtn });
  waitSometime(shortWait);
  verifyToExist({ element: btnCloseBusinessInfoEntity });
  clickAction({ locator: btnCloseBusinessInfoEntity });
};

const editContactBusinessInfoTitleAndSave = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  clickAction({ locator: tabBusinessInformation });
  waitSometime(shortWait);
  clickAction({ locator: businessEditbtn });
  waitSometime(shortWait);
  clearText({ locator: txtBusinessInfoTitle });
  typeText({ locator: txtBusinessInfoTitle, dataText: title });
  verifyToExist({ element: btnSaveEditBusinessInformationEntity });
  clickAction({ locator: btnSaveEditBusinessInformationEntity });
};

const editContactBusinessInfoAllFieldsAndSave = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  clickAction({ locator: tabBusinessInformation });
  waitSometime(shortWait);
  clickAction({ locator: businessEditbtn });
  waitSometime(shortWait);
  clearText({ locator: txtBusinessInfoTitle });
  typeText({ locator: txtBusinessInfoTitle, dataText: title });
  dropDownContainsTextClick({
    element: txtlevel,
    typeText: level,
    exactText: level,
  });
  dropDownContainsTextClick({
    element: btnDeptartmentWithWarehouse,
    typeText: DeptartmentWithWarehouse,
    exactText: DeptartmentWithWarehouse,
  });
  typeText({ locator: btnPrimaryWorkLocation, dataText: PrimaryWorkLocation });
  dropDownContainsTextClick({
    element: btnWorkEnvironment,
    typeText: WorkEnvironment,
    exactText: WorkEnvironment,
  });
  typeText({ locator: txtManager, dataText: Manager });
  dropDownContainsTextClick({
    element: btnContactSource,
    typeText: ContactSource,
    exactText: ContactSource,
  });
  dropDownContainsTextClick({
    element: btnCommunicationPreference,
    typeText: CommunicationPreference,
    exactText: CommunicationPreference,
  });
  dropDownContainsTextClick({
    element: btnPricingBehaviour,
    typeText: PricingBehaviour,
    exactText: PricingBehaviour,
  });
  verifyToExist({ element: btnSaveEditBusinessInformationEntity });
  clickAction({ locator: btnSaveEditBusinessInformationEntity });
};

const verifyTitleAtContactWindowGridColumn = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  cy.go('back');
  dropDownContainsTextClick({
    element: searchLatestCreatedTitleTxt,
    typeText: title,
    exactText: title,
  });
  verifyExistElementWithDynamicTitle({ text: title });
};

const verifyBusinessInformationAllFieldsSaved = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  clickAction({ locator: businessEditbtn });
  waitSometime(shortWait);
  verifyText({ locator: btnDeptartmentWithWarehouse, verifyText: DeptartmentWithWarehouse });
  verifyText({ locator: txtBusinessInfoTitle, verifyText: title });
  verifyText({ locator: txtlevel, verifyText: level });
  verifyText({ locator: btnPrimaryWorkLocation, verifyText: PrimaryWorkLocation });
  verifyText({ locator: txtManager, verifyText: Manager });
  verifyText({ locator: btnContactSource, verifyText: ContactSource });
  verifyText({ locator: btnCommunicationPreference, verifyText: CommunicationPreference });
  verifyText({ locator: btnPricingBehaviour, verifyText: PricingBehaviour });
  clickAction({ locator: btnCloseBusinessInfoEntity });
};

const verifyManagerHyperlinkClickAtBusinessInformation = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  verifyToExist({ element: managerHyperlinkbtn });
  clickAction({ locator: managerHyperlinkbtn });
  waitSometime(longWait);
  verifyText({ locator: h2ManagerTitleNameLabel, verifyText: Manager });
};
export const addNewContactSaveAndContinue = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  dropDownContainsTextClick({
    element: txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  waitSometime(shortWait);
  dropDownContainsTextClick({
    element: drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  waitSometime(shortWait);
  typeText({ locator: txtContactsPhone, dataText: randomPhNo });
  typeText({ locator: txtContactsEmail, dataText: newContactTabEmailVal });
  typeText({ locator: txtContactTitle, dataText: title });
  navigateToChildWindow();
  clickAction({ locator: btnSaveAndContinueContact });
};

const addDupContactSaveAndClose = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  dropDownContainsTextClick({
    element: txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  dropDownContainsTextClick({
    element: drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  typeText({ locator: txtContactsPhone, dataText: randomPhNo });
  typeText({ locator: txtContactsEmail, dataText: newContactTabEmailVal });
  typeText({ locator: txtContactTitle, dataText: title });
  waitSometime(shortWait);
  clickAction({ locator: btnSaveContact });
  waitSometime(shortWait);
  clickVisibleElement({ locator: btnContactsIgnoreAndAddNewContact });
  toastMsg();
  waitSometime(shortWait);
};

const addDupContactSaveAndContinue = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  dropDownContainsTextClick({
    element: txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  dropDownContainsTextClick({
    element: drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  typeText({ locator: txtContactsPhone, dataText: randomPhNo });
  typeText({ locator: txtContactsEmail, dataText: newContactTabEmailVal });
  typeText({ locator: txtContactTitle, dataText: title });
  waitSometime(shortWait);
  clickAction({ locator: btnSaveAndContinueContact });
  waitSometime(shortWait);
};

const addExistContact = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: existContactTabEmailVal }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  dropDownContainsTextClick({
    element: txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  dropDownContainsTextClick({
    element: drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  typeText({ locator: txtContactsPhone, dataText: randomPhNo });
  typeText({ locator: txtContactsEmail, dataText: existContactTabEmailVal });
  typeText({ locator: txtContactTitle, dataText: title });
  waitSometime(shortWait);
  clickAction({ locator: btnSaveAndContinueContact });
  waitSometime(shortWait);
};

const createNewContact = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  selectItemFrmSrchPicker({ locator: txtFieldContactName, typeText: randomContactName });
  waitSometime(shortWait);
  dropDownContainsTextClick({
    element: drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  waitSometime(shortWait);
  typeText({ locator: txtContactsPhone, dataText: randomPhNo });
  typeText({ locator: txtContactsEmail, dataText: newContactTabEmailVal });
  typeText({ locator: txtContactTitle, dataText: title });
  clickAction({ locator: btnSaveContact });
};

const navigateToNotesTab = ({ carrierName: carrierNameVal }) => {
  searchCarrier({ carrierName: carrierNameVal });
  clickFirstElementIn({ locator: tabCrmCarrier });
  clickAction({ locator: tabNotes });
};

const carrierDisableInDefaultAndExpndView = () => {
  notClickable({ locator: btnNotesDownload });
  clickAction({ locator: btnCarrDefaultViewExpand });
  verifyAttrText({ locator: btnNotesDownloadList, attribute: notesDownloadAttr, verifyText: notesDownloadValue });
  clickVisibleElement({ locator: btnNotesExpandList });
  notClickable({ locator: btnNotesDownload });
  clickVisibleElement({ locator: btnExpandViewExpand });
  verifyAttrText({ locator: btnNotesDownloadList, attribute: notesDownloadAttr, verifyText: notesDownloadValue });
  clickVisibleElement({ locator: btnNotesExpandViewClose });
};

const addNotes = ({ locator: btnSave }) => {
  clickAction({ locator: btnNotesPlus });
  clearTypeText({ element: txtFieldAddNotes, typeText: txtFieldNotesValue });
  waitSometime(shortWait);
  clickVisibleElement({ locator: btnSave });
  waitSometime(shortWait);
};

const addTypeNotes = ({ locator: btnSave, notesTypeDrp: valueenotes }) => {
  clickAction({ locator: btnNotesPlus });
  dropDownContainsTextClick({ element: btnAddNotesTypeField, typeText: valueenotes, exactText: valueenotes });
  clearTypeText({ element: txtFieldAddNotes, typeText: txtFieldNotesValue });
  waitSometime(shortWait);
  clickVisibleElement({ locator: btnSave });
  waitSometime(shortWait);
};

const carrierNotesUIValidations = ({ locator: btnDefaultandExpandView }) => {
  clickVisibleElement({ locator: btnNotesDownload });
  verifyVisible({ element: msgDownloadProcessingToast });
  clickable({ locator: btnNotesDownload });
  clickVisibleElement({ locator: btnDefaultandExpandView });
  clickable({ locator: btnNotesDownloadList });
  clickVisibleElement({ locator: btnNotesDownloadList });
  verifyVisible({ element: msgDownloadProcessingToast });
};

const notesCarrCarrotButtonExpand = () => {
  clickAction({ locator: btnCarrDefaultViewExpand });
  clickVisibleElement({ locator: btnNotesExpandList });
};
const verifyToastMsg = ({ objectType: object }) => {
  cy.get(toastMessage).then(body => {
    cy.log(body.find(toastSuccessMessage).length);
    if (body.find(toastSuccessMessage).length === 1) {
      verifyVisible({ element: toastSuccessMessage });
      verifyText({ locator: toastSuccessMessage, verifyText: object + txtSuccess });
    } else {
      verifyVisible({ element: toastErrorMessage });
      verifyText({ locator: toastSuccessMessage, verifyText: object + txtFailure });
    }
  });
};
const sharePopUpforSingleUser = () => {
  clickAction({ locator: btnSharePopupTo });
  cy.then(() => {
    clearAndTypeWithWait({ element: txtFieldSharePopupTo, typeText: Cypress.env('inputValue') });
  });
  verifyDoesNotExist({ element: listSharePopupToPopulatedItems });
  //Username in Lowercase
  clickAction({ locator: btnSharePopupTo });
  clearAndTypeWithWait({ element: txtFieldSharePopupTo, typeText: slackUserWithLowercase });
  verifyTextContains({ locator: listSharePopupToPopulatedItems, containsText: slackUser });
  //Username in Uppercase
  clearAndTypeWithWait({ element: txtFieldSharePopupTo, typeText: slackUserWithUppercase });
  verifyTextContains({ locator: listSharePopupToPopulatedItems, containsText: slackUser });
  //Username in Special Chars
  clearAndTypeWithWait({ element: txtFieldSharePopupTo, typeText: specialCharsVal });
  verifyDoesNotExist({ element: listSharePopupToPopulatedItems });
  //Username with no slack user access
  clearAndTypeWithWait({ element: txtFieldSharePopupTo, typeText: withNoSlackUser });
  verifyDoesNotExist({ element: listSharePopupToPopulatedItems });
  clickAction({ locator: btnSharePopupTo });
  selectItemFromDropDownByTyping({ locator: txtFieldSharePopupTo, drpDwnVal: slackUser });
};

const navigateToDocumentsTab1 = ({ carrierName: carrierNameVal }) => {
  searchCarrierCustomer({ typeTextVal: carrierNameVal });
  clickFirstElementIn({ locator: crmIndustryPage.tabCrmFiled });
  clickAction({ locator: tabDocuments });
};
const navigateToDocumentsTab = ({ carrierName: carrierNameVal }) => {
  searchCarrier({ carrierName: carrierNameVal });
  clickFirstElementIn({ locator: tabCrmCarrier });
  clickAction({ locator: tabDocuments });
};

const documentsCarrCarrotButtonExpand = () => {
  clickAction({ locator: btnCarrDocDefaultViewExpand });
  clickVisibleElement({ locator: btnNotesExpandList });
};

const carrierDocumentsUIValidations = ({ locator: btnDefaultandExpandView }) => {
  clickVisibleElement({ locator: btnDefaultandExpandView });
  verifyVisible({ element: btnDocumentsHideandShowFilter });
  clickVisibleElement({ locator: btnDocumentsHideandShowFilter });
  scrollToBottomRight();
  verifyDoesNotExist({ element: documentNamecolumn });
  clickVisibleElement({ locator: btnDefaultandExpandView });
  verifyVisible({ element: btnDocumentsHideandShowFilter });
  clickVisibleElement({ locator: btnDocumentsHideandShowFilter });
  verifyVisible({ element: documentNamecolumn });
  verifyVisible({ element: documentTypecolumnCarr });
  verifyVisible({ element: documentDirectioncolumn });
  verifyVisible({ element: documentDetailscolumn });
  verifyVisible({ element: documentUploadedBycolumnCarr });
  verifyVisible({ element: documentUploadedDateTimecolumnCarr });
  verifyVisible({ element: documentUpdatedBycolumnCarr });
  scrollIntoView({ locator: documentUpdatedDateTimecolumn });
  verifyVisible({ element: documentUpdatedDateTimecolumn });
};

const carrierNoDocInDefaultAndExpndView = () => {
  verifyText({ locator: noDocInDefaultViewCarr, verifyText: msgNoDocumentsFound });
  scrollToBottomRight();
  documentsCarrCarrotButtonExpand();
  verifyVisible({ element: noDocInExpandView });
  verifyText({ locator: noDocInExpandView, verifyText: msgNoDocumentsFound });
  clickVisibleElement({ locator: btnNotesExpandViewClose });
};

const carrierNoNotesInDefaultAndExpndView = () => {
  verifyElementTextContains({ locator: msgNoNotes, verifyText: msgNoNotesFound });
  notesCarrCarrotButtonExpand();
  verifyVisible({ element: visibleElementExpandview });
  clickVisibleElement({ locator: btnNotesExpandViewClose });
};

const carrierNotesFiltersUIValidations = ({ locator: btnDefaultandExpandView }) => {
  scrollToBottomRight();
  clickVisibleElement({ locator: btnDefaultandExpandView });
  verifyVisible({ element: btnNotesHideFilter });
  clickVisibleElement({ locator: btnNotesHideFilter });
  verifyDoesNotExist({ element: btnNoteTypeFilter });
  clickVisibleElement({ locator: btnDefaultandExpandView });
  verifyVisible({ element: btnNotesHideFilter });
  clickVisibleElement({ locator: btnNotesHideFilter });
  verifyVisible({ element: btnNoteTypeFilter });
  verifyVisible({ element: btnNoteOpportunityFilter });
  verifyVisible({ element: btnNoteContactFilter });
  verifyVisible({ element: btnNoteRepFilter });
  verifyVisible({ element: btnNoteCreatedByFilter });
  verifyVisible({ element: btnNoteDateAndTimeFilter });
  verifyVisible({ element: btnNoteUpdatedByFilter });
  scrollIntoView({ locator: btnNoteUpdatedDateandTimeFilter });
  verifyVisible({ element: btnNoteUpdatedDateandTimeFilter });
  scrollIntoView({ locator: btnNoteFilter });
  verifyVisible({ element: btnNoteFilter });
};

const carrierNotesEditValidations = ({ locator: btnDefaultandExpandView, viewMode: mode }) => {
  if (mode === modeVal) {
    clickVisibleElement({ locator: btnNotesDownload });
    verifyVisible({ element: msgDownloadProcessingToast });
  } else {
    clickVisibleElement({ locator: btnDefaultandExpandView });
    clickable({ locator: btnNotesDownloadList });
    clickVisibleElement({ locator: btnNotesDownloadList });
    verifyVisible({ element: msgDownloadProcessingToast });
  }
};

const editNotes = ({ locator: btnSave }) => {
  clickAction({ locator: btnContextMenu });
  clickAction({ locator: btnNotesEdit });
  clearTypeText({ element: txtFieldAddNotes, typeText: txtFieldNotesUpdatedValue });
  clickVisibleElement({ locator: btnSave });
  waitSometime(shortWait);
};

const carrierEditInDefaultAndExpndView = ({ locator: btnCustomerViewExpand }) => {
  addNotes({ locator: btnAddNotesCarr });
  carrierNotesEditValidations({ locator: btnCustomerViewExpand, viewMode: downloadIconViewMode });
  editNotes({ locator: btnAddNotesCarr });
  carrierNotesEditValidations({ locator: btnCustomerViewExpand, viewMode: downloadIconViewMode });
  addNotes({ locator: btnAddNotesCarr });
  carrierNotesEditValidations({ locator: btnCustomerViewExpand, viewMode: downloadOptionViewMode });
  editNotes({ locator: btnAddNotesCarr });
  carrierNotesEditValidations({ locator: btnCustomerViewExpand, viewMode: downloadOptionViewMode });
  waitSometime(shortWait);
};

const notesCustomizeDisableandEnable = ({ locator: btnDefaultandExpandView }) => {
  scrollToBottomRight();
  clickVisibleElement({ locator: btnDefaultandExpandView });
  clickVisibleElement({ locator: btnNotesCustomize });
  clickAction({ locator: btnNotesCustomizeOppEye });
  clickAction({ locator: btnNotesCustomizeSave });
};

const notesCustomizeInDefaultView = () => {
  clickAction({ locator: btnCarrDefaultViewExpand });
  clickVisibleElement({ locator: btnNotesCustomize });
  dragAndDrop({ draggedElement: btnNotesTypedraggable, stationaryElement: btnNotesRepsdraggable, refElement: notesCustomizeWindow });
  clickAction({ locator: btnNotesCustomizeSave });
  notesColumnFilterUIValidations({ viewMode: modeValYes });
  notesCustomizeDisableandEnable({ locator: btnCarrDefaultViewExpand });
  notesColumnFilterUIValidations({ viewMode: modeValNo });
  notesCustomizeDisableandEnable({ locator: btnCarrDefaultViewExpand });
  notesColumnFilterUIValidations({ viewMode: modeValYes });
};

const notesCustomizeInExpandView = () => {
  clickAction({ locator: btnExpandViewExpand });
  clickVisibleElement({ locator: btnNotesCustomize });
  dragAndDrop({ draggedElement: btnNotesRepsdraggable, stationaryElement: btnNotesTypedraggable, refElement: notesCustomizeWindow });
  clickAction({ locator: btnNotesCustomizeSave });
  notesCarrCarrotButtonExpand();
  notesColumnFilterUIValidations({ viewMode: modeValYes });
  notesCustomizeDisableandEnable({ locator: btnExpandViewExpand });
  notesCarrCarrotButtonExpand();
  notesColumnFilterUIValidations({ viewMode: modeValNo });
  notesCustomizeDisableandEnable({ locator: btnExpandViewExpand });
  notesCarrCarrotButtonExpand();
  notesColumnFilterUIValidations({ viewMode: modeValYes });
};

const associateContactExtSaveAndClose = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  dropDownContainsTextClick({
    element: txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  dropDownContainsTextClick({
    element: drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  typeText({ locator: txtContactsPhone, dataText: randomPhNo });
  typeText({ locator: txtContactsEmail, dataText: newContactTabEmailVal });
  typeText({ locator: txtContactTitle, dataText: title });
  waitSometime(shortWait);
  clickAction({ locator: btnSaveContact });
  waitSometime(shortWait);
  clickAction({ locator: radioBtnAssociateContact });
  navigateToChildWindow();
  clickVisibleElement({ locator: btnAssociatedContact });
  waitSometime(shortWait);
};

const associateContactExtSaveAndContinue = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  dropDownContainsTextClick({
    element: txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  dropDownContainsTextClick({
    element: drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  typeText({ locator: txtContactsPhone, dataText: randomPhNo });
  typeText({ locator: txtContactsEmail, dataText: newContactTabEmailVal });
  typeText({ locator: txtContactTitle, dataText: title });
  waitSometime(shortWait);
  clickAction({ locator: btnSaveAndContinueContact });
  waitSometime(shortWait);
  clickAction({ locator: radioBtnAssociateContact });
  navigateToChildWindow();
  clickVisibleElement({ locator: btnAssociatedContact });
  waitSometime(shortWait);
};
const verifyAssociateEntiryUpdateMsg = () => {
  waitSometime(shortWait);
  verifyToExist({ element: btnSaveEditAssociatedEntity });
  clickVisibleElement({ locator: btnSaveEditAssociatedEntity });
  cy.log('***Verify Associate Entity Update Msg***');
  toastMsg();
  waitSometime(longWait);
  previousTab();
};

const navigateInteractionsLog = () => {
  newWindowHandles({ href: loghrefLink, button: btnLog });
  verifyLabel({ locator: lblLogDate, verifyText: logDate });
  verifyLabel({ locator: lblLogTime, verifyText: logTime });
  verifyLabel({ locator: lblLogDuration, verifyText: logDuration });
  verifyLabel({ locator: lblLogContact, verifyText: logContact });
  verifyLabel({ locator: lblLogOpportunity, verifyText: logOpportunity });
  verifyLabel({ locator: lblLogStrategy, verifyText: logStrategy });
  verifyLabel({ locator: lblLogObjective, verifyText: logObjective });
  verifyLabel({ locator: lblLogType, verifyText: logType });
  verifyLabel({ locator: lblLogVia, verifyText: validateViaColumn1 });
  verifyLabel({ locator: lblLogOutcome, verifyText: logOutcome });
  verifyLabel({ locator: btnSaveInteraction, verifyText: logSave });
};

const navigateInteractionsSchedule = () => {
  newWindowHandles({ href: schedulehrefLink, button: btnScheduleInt });
  verifyLabel({ locator: lblLogDate, verifyText: logDate });
  verifyLabel({ locator: lblLogTime, verifyText: logTime });
  verifyLabel({ locator: lblLogDuration, verifyText: logDuration });
  verifyLabel({ locator: lblLogContact, verifyText: logContact });
  verifyLabel({ locator: lblLogOpportunity, verifyText: logOpportunity });
  verifyLabel({ locator: lblLogStrategy, verifyText: logStrategy });
  verifyLabel({ locator: lblLogObjective, verifyText: logObjective });
  verifyLabel({ locator: lblLogType, verifyText: logType });
  verifyLabel({ locator: lblLogVia, verifyText: validateViaColumn1 });
  verifyLabel({ locator: btnSaveInteraction, verifyText: logSave });
};

const navigatescheduleLocationField = () => {
  newWindowHandles({ href: schedulehrefLink, button: btnScheduleInt });
};

export const navigateToContactsObjScreen = () => {
  genericUtils.waitSometime(moreWait);
  cy.get(contactPage.contactsTable).find(commonPage.tblRows)
    .find(commonPage.btnKabobMenu)
    .first().click({ force: true });
  genericUtils.navigateToChildWindow();
  cy.get(commonPage.lstContextMenuOptions).filter(':visible').contains('Edit').click({ force: true });
  genericUtils.waitSometime(shortWait);
};

export const addAssociatedEntityWithCustomerEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnAssociateEntityPlusIcon });
  genericUtils.dropDownExactClick({ element: contactPage.drpdwnEntityType, ddValue: contactData.staticData.existCntCusTabEntityTypeVal });
  genericUtils.waitSometime(shortWait);
  genericUtils.selectItemFromDropDownByTyping({ locator: contactPage.drpdwnEntity, drpDwnVal: contactData.userDefinedData.customerEntityType });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAddAssociatedEntity });
};

export const addAssociatedEntityWithCarrierEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnAssociateEntityPlusIcon });
  genericUtils.dropDownExactClick({ element: contactPage.drpdwnEntityType, ddValue: contactData.staticData.existCntCarTabEntityTypeVal });
  genericUtils.waitSometime(shortWait);
  genericUtils.selectItemFromDropDownByTyping({ locator: contactPage.drpdwnCarrierEntity, drpDwnVal: contactData.userDefinedData.carrierEntityType });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAddAssociatedEntity });
};

export const addAssociatedEntityWithFacilityEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnAssociateEntityPlusIcon });
  genericUtils.dropDownExactClick({ element: contactPage.drpdwnEntityType, ddValue: contactData.staticData.existCntFacTabEntityTypeVal });
  genericUtils.waitSometime(shortWait);
  genericUtils.selectItemFromDropDownByTyping({ locator: contactPage.drpdwnFacilityEntity, drpDwnVal: contactData.userDefinedData.facilityEntityType });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAddAssociatedEntity });
};

export const editAssociatedEntityWithCustomerEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerKabob });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerEdit });
  genericUtils.dropDownExactCheckBoxSelection({ element: contactPage.drpdwnFunction, ddValue: contactData.userDefinedData.functionDrpdwnVal1 });
  genericUtils.waitSometime(shortWait);
  genericUtils.dropDownContainsValueCheckBoxSelection({ element: contactPage.drpdwnFunction, ddValue: contactData.userDefinedData.functionDrpdwnVal2 });
  genericUtils.clickAction({ locator: contactPage.btnSaveEditAssociatedEntity });
};

export const editAssociatedEntityWithCarrierEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerKabob });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerEdit });
  genericUtils.typeText({ locator: contactPage.txtDetails, dataText: contactData.userDefinedData.txtDetails });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveEditAssociatedEntity });
};

export const editAssociatedEntityWithFacilityEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerKabob });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerEdit });
  genericUtils.selectItemFromDropDownByTyping({ locator: contactPage.drpdwnExtSystemUser, drpDwnVal: contactData.userDefinedData.ExtSystemUser });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveEditAssociatedEntity });
};

export {
  addContact,
  addDupContactSaveAndClose,
  addDupContactSaveAndContinue,
  addExistContact,
  addIndustry,
  addIndustryWithDuplicateCode,
  addNewContact,
  addNewIndustry,
  addNotes,
  editContactBusinessInfoTab,
  editContactBusinessInfoTitleAndSave,
  editContactBusinessInfoAllFieldsAndSave,
  verifyTitleAtContactWindowGridColumn,
  verifyBusinessInformationAllFieldsSaved,
  verifyManagerHyperlinkClickAtBusinessInformation,
  createNewContact,
  addTruck,
  addTypeNotes,
  associateContactExtSaveAndClose,
  associateContactExtSaveAndContinue,
  carrierDisableInDefaultAndExpndView,
  carrierDocumentsUIValidations,
  carrierEditInDefaultAndExpndView,
  carrierNoDocInDefaultAndExpndView,
  carrierNoNotesInDefaultAndExpndView,
  carrierNotesFiltersUIValidations,
  carrierNotesUIValidations,
  carrotButtonClickExpand,
  deleteIndustry,
  documentsCarrCarrotButtonExpand,
  navigateInteractionsLog,
  navigateInteractionsSchedule,
  navigatescheduleLocationField,
  navigateToDocumentsTab,
  navigateToDocumentsTab1,
  navigateToEditIndustry,
  navigateToNotesTab,
  navigateToOpportunitiesTab,
  navigateToShareModelPopup,
  navigateToTheCrmV2Tab,
  navigateToTheEditFirmographicsTab,
  navigateToTheIndustriesTab,
  notesCarrCarrotButtonExpand,
  notesCustomizeInDefaultView,
  notesCustomizeInExpandView,
  searchCarrier,
  sharePopUpforSingleUser,
  verifyAllFieldsInEditIndustryModal,
  verifyAssociateEntiryUpdateMsg,
  verifyColumnsInIndustryTab,
  verifyCustomizeIndustriesDrgAndDwp,
  verifyEditFunctionality,
  verifyIndustriesTblValues,
  verifyPrimaryChkBoxEnabled,
  verifyPrimaryChkBxStatus,
  verifyShareModelPopupTitleAndSubTitle,
  verifySharePopupFields,
  verifyToastMsg,
};