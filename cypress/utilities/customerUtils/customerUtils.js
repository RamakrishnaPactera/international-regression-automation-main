import * as genericUtils from '../commonUtils/genericUtils';
import * as crmFirmographicsPage from '../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import commonData from '../../testData/staticData/commonData/commonData.json';
import * as crmIndustryPage from '../../pageObjects/crm/crmPage/crmIndustryPage.json';
import * as opportunityPage from '../../pageObjects/crm/opportunityPage/opportunityPage.json';
import * as crmOpportunitiesPage from '../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import contactPage from '../../pageObjects/crm/contactPage/contactPage.json';
import * as crmNotesPage from '../../pageObjects/crm/crmPage/crmNotesPage.json';
import * as crmDocumentsPage from '../../pageObjects/crm/crmPage/crmDocumentsPage.json';
import crmDocumentsData from '../../testData/crm/crmData/crmDocumentsData.json';
import crmContactsData from '../../testData/crm/crmData/crmContactsData.json';
import crmNotesData from '../../testData/crm/crmData/crmNotesData.json';
import { datePicker, returnfutureDateMMDDYY, returntodayDateMMDDYY } from '../commonUtils/dateTimeUtils';
import crmIndustryData from '../../testData/crm/crmData/crmIndustryData.json';
import crmOpportunityData from '../../testData/crm/crmData/crmOpportunityData.json';
import * as crmInteractionsPage from '../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import * as crmOpportunitiesData from '../../testData/crm/crmData/crmOpportunitiesData.json';
import * as crmPortfolioData from '../../testData/crm/crmData/crmPortfolioData.json';
import * as commonPage from '../../pageObjects/commonPage/commonPage.json';
import {
  clickAction,
  dropDownContainsTextClick,
  selectItemFromDropDown,
  typeText,
  verifyToExist,
} from '../../utilities/commonUtils/genericUtils';
const {
  btnContactsPlus,
  txtContactsPhone,
  txtContactsEmail,
  txtContactTitle,
  txtBusinessInfoTitle,
  btnSaveEditBusinessInformationEntity,
  btnCloseBusinessInfoEntity,
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
} = crmContactsData.userDefinedData;
const {
  btnOpportunityPlus,
  btnSaveNewOpportunity,
  dropDwnOpportunityType,
  txtOpportunityName,
} = opportunityPage;
const { industryCodeSICB } = crmIndustryData.userDefinedData;
const { opportunitiesTypeDropDownValue } = crmOpportunityData.staticData;
const { shortWait, longWait, mode, moreWait } = commonData;
const {
  colorAttr,
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
  buttonValue,
  createdByDateValue,
  createdByValue,
  msgNoDocumentsFound,
  notesDownloadValue,
  repFilterValue,
  searchValue,
  updatedByDateValue,
  updatedByValue,
} = crmNotesData.expectedData;
const {
  dataColumnFilterAttrVal,
  notesDownloadAttr,
  typeAttrVal,
  valueAttr,
} = crmNotesData.staticData;
const {
  msgNoNotesFound,
  notesEditModelLastUpdatedByText,
  modeVal,
  dataTestIdAttrVal,
} = crmNotesData.staticData;
const {
  downloadIconViewMode,
  downloadOptionViewMode,
  modeValNo,
  modeValYes,
  notesOperationsValue,
  notesUserNameValue,
  txtFieldNotesInvalidValue,
  txtFieldNotesUpdatedValue,
  txtFieldNotesValue,
  typeDropDownValue,
} = crmNotesData.userDefinedData;
const {
  noDocumentMsg,
} = crmDocumentsData.filterSelectionData;
const {
  addOpportunityTitle,
  editOpportunityTitle,
  businessUnits,
  closeReasonClosedLost,
  closeReasonDisqualified,
  closeReasonRevist,
  contact,
  division,
  equipment,
  oppMode,
  oppSize,
  stageClosedLost,
  stageDisqualified,
  stageRevisitOpp,
} = crmOpportunitiesData.staticData;
const {
  totalOppRev,
  txtFieldDocDetailsValue,
  oppDetails,
  projectedMargin,
  projectedRevenue,
  projectedVolume,
  totalOppVolume,
} = crmDocumentsData.userDefinedData;
//customer Search
export const searchCustomer = ({ customerName: tdmCustomerData }) => {
  genericUtils.verifyToExist({ element: crmFirmographicsPage.tabCustomerMenu });
  cy.get(crmFirmographicsPage.tabCustomerMenu).click({ force: true });
  cy.wait(shortWait);
  genericUtils.verifyToExist({ element: crmFirmographicsPage.linkSearchCustomer });
  cy.get(crmFirmographicsPage.linkSearchCustomer).click({ force: true });
  cy.wait(shortWait);
  cy.get(crmFirmographicsPage.txtFieldCustomerName).type(tdmCustomerData);
  genericUtils.verifyLabelText({ locator: crmFirmographicsPage.txtFieldCustomerName, verifyText: tdmCustomerData });
  genericUtils.verifyToExist({ element: crmFirmographicsPage.btnCustomerSearch });
  cy.get(crmFirmographicsPage.btnCustomerSearch).click({ force: true });
  cy.wait(shortWait);
  genericUtils.clickAction({ locator: crmFirmographicsPage.txtFieldCustomerCode });
};

export const addIndustry = ({ typeTextVal: industryClassificationSystem, drpDwnValue: industryCode, viewMode }) => {
  if (viewMode === mode) {
    genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnIndustriesPlus });
  } else {
    genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnExpandIndustriesPlus });
  }
  genericUtils.dropDownContainsTextClick({ element: crmIndustryPage.drpdwnClassificationSystem, typeText: industryClassificationSystem, exactText: industryClassificationSystem });
  genericUtils.typeDropDwnContainsClick({ locator: crmIndustryPage.drpdwnIndustryCode, drpDwnVal: industryCode });
  genericUtils.clickAction({ locator: crmIndustryPage.btnSaveIndustry });
  genericUtils.toastMsg();
};
export const navigateToEditIndustry = () => {
  genericUtils.verifyToExist({ element: crmIndustryPage.btnIndustriesTabCustomerMenuButton });
  genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnIndustriesTabCustomerMenuButton });
  genericUtils.verifyToExist({ element: crmIndustryPage.btnIndustriesTabCustomerEdit });
  genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnIndustriesTabCustomerEdit });
  genericUtils.scrollToRight();
};
export const deleteIndustry = () => {
  genericUtils.verifyToExist({ element: crmIndustryPage.btnIndustriesTabCustomerMenuButton });
  genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnIndustriesTabCustomerMenuButton });
  genericUtils.verifyToExist({ element: crmIndustryPage.btnIndustriesTabCustomerDelete });
  genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnIndustriesTabCustomerDelete });
  genericUtils.clickOkOnWindowAlert();
  genericUtils.waitSometime(shortWait);
};

export const navigateToTheIndustriesTab = ({ customerName: customerNameVal }) => {
  searchCustomer({ customerName: customerNameVal });
  genericUtils.clickFirstElementIn({ locator: crmIndustryPage.tabCrmCustomer });
  genericUtils.clickAction({ locator: crmIndustryPage.tabCustomerDetails });
  genericUtils.clickAction({ locator: crmIndustryPage.tabIndustry });
  genericUtils.scrollToRight();
};

//Add Contact
export const addContact = ({ contactName: contactDepName, randomName: randomContactName }) => {
  genericUtils.clickAction({ locator: crmFirmographicsPage.tabCrmV2 });
  genericUtils.clickAction({ locator: crmFirmographicsPage.btnContact });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.clickAction({ locator: crmFirmographicsPage });
};

export const addNewCustomerContact = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.waitSometime(shortWait);
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.waitSometime(shortWait);
  genericUtils.typeText({ locator: txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: txtContactsEmail, dataText: newContactTabEmailVal });
  genericUtils.typeText({ locator: txtContactTitle, dataText: title });
  genericUtils.verifyIfEnabled({ locator: crmFirmographicsPage.btnSaveContact });
  genericUtils.clickAction({ locator: crmFirmographicsPage.btnSaveContact });
  genericUtils.waitSometime(shortWait);
  cy.reload(true);
  genericUtils.waitSometime(longWait);
  genericUtils.dropDownContainsTextClick({
    element: searchLatestCreatedContactTxt,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.waitSometime(longWait);
  //dynamicWindowHandles({ button: randomContactName });
  genericUtils.clickToOpenNewTabInSameWindowWithDynamicText({ button: randomContactName });
  cy.window().its('open').should('be.called');
  genericUtils.waitSometime(longWait);
};

export const editContactBusinessInfoTab = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.waitSometime(longWait);
  genericUtils.clickAction({ locator: tabBusinessInformation });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.businessEditbtn });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyToExist({ element: btnCloseBusinessInfoEntity });
  genericUtils.clickAction({ locator: btnCloseBusinessInfoEntity });
};

export const editContactBusinessInfoTitleAndSave = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.clickAction({ locator: tabBusinessInformation });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.businessEditbtn });
  genericUtils.waitSometime(shortWait);
  genericUtils.clearText({ locator: contactPage.txtBusinessInfoTitle });
  genericUtils.typeText({ locator: contactPage.txtBusinessInfoTitle, dataText: title });
  genericUtils.verifyToExist({ element: btnSaveEditBusinessInformationEntity });
  genericUtils.clickAction({ locator: contactPage.btnSaveEditBusinessInformationEntity });
};

export const editContactBusinessInfoAllFieldsAndSave = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.clickAction({ locator: tabBusinessInformation });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.businessEditbtn });
  genericUtils.waitSometime(shortWait);
  genericUtils.clearText({ locator: contactPage.txtBusinessInfoTitle });
  genericUtils.typeText({ locator: contactPage.txtBusinessInfoTitle, dataText: title });
  genericUtils.dropDownContainsTextClick({
    element: contactPage.txtlevel,
    typeText: level,
    exactText: level,
  });
  genericUtils.dropDownContainsTextClick({
    element: contactPage.btnDeptartmentWithWarehouse,
    typeText: DeptartmentWithWarehouse,
    exactText: DeptartmentWithWarehouse,
  });
  genericUtils.typeText({ locator: contactPage.btnPrimaryWorkLocation, dataText: PrimaryWorkLocation });
  genericUtils.dropDownContainsTextClick({
    element: btnWorkEnvironment,
    typeText: WorkEnvironment,
    exactText: WorkEnvironment,
  });
  genericUtils.typeText({ locator: contactPage.txtManager, dataText: Manager });
  genericUtils.dropDownContainsTextClick({
    element: contactPage.btnContactSource,
    typeText: ContactSource,
    exactText: ContactSource,
  });
  genericUtils.dropDownContainsTextClick({
    element: contactPage.btnCommunicationPreference,
    typeText: CommunicationPreference,
    exactText: CommunicationPreference,
  });
  genericUtils.dropDownContainsTextClick({
    element: contactPage.btnPricingBehaviour,
    typeText: PricingBehaviour,
    exactText: PricingBehaviour,
  });
  genericUtils.verifyToExist({ element: contactPage.btnSaveEditBusinessInformationEntity });
  genericUtils.clickAction({ locator: contactPage.btnSaveEditBusinessInformationEntity });
};

export const verifyTitleAtContactWindowGridColumn = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  cy.go('back');
  genericUtils.dropDownContainsTextClick({
    element: searchLatestCreatedTitleTxt,
    typeText: title,
    exactText: title,
  });
  genericUtils.verifyExistElementWithDynamicTitle({ text: title });
};

export const verifyBusinessInformationAllFieldsSaved = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  clickAction({ locator: businessEditbtn });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyText({ locator: btnDeptartmentWithWarehouse, verifyText: DeptartmentWithWarehouse });
  genericUtils.verifyText({ locator: txtBusinessInfoTitle, verifyText: title });
  genericUtils.verifyText({ locator: txtlevel, verifyText: level });
  genericUtils.verifyText({ locator: btnPrimaryWorkLocation, verifyText: PrimaryWorkLocation });
  genericUtils.verifyText({ locator: txtManager, verifyText: Manager });
  genericUtils.verifyText({ locator: btnContactSource, verifyText: ContactSource });
  genericUtils.verifyText({ locator: btnCommunicationPreference, verifyText: CommunicationPreference });
  genericUtils.verifyText({ locator: btnPricingBehaviour, verifyText: PricingBehaviour });
  genericUtils.clickAction({ locator: btnCloseBusinessInfoEntity });
};

export const verifyManagerHyperlinkClickAtBusinessInformation = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: managerHyperlinkbtn });
  genericUtils.clickAction({ locator: managerHyperlinkbtn });
  genericUtils.waitSometime(longWait);
  genericUtils.verifyText({ locator: h2ManagerTitleNameLabel, verifyText: Manager });
};

export const navigateToTheCrmV2TabCustomer = ({ typeTextVal: tdmCustomerData }) => {
  searchCustomer({ customerName: tdmCustomerData });
  genericUtils.clickFirstElementIn({ locator: crmFirmographicsPage.tabCrmV2 });
};
export const navigateToTheCrmTab = ({ customerName: customerNameVal }) => {
  searchCustomer({ customerName: customerNameVal });
  genericUtils.clickFirstElementIn({ locator: crmFirmographicsPage.tabCrm });
};
export const navigateToRegionsTab = ({ customerName: customerNameVal }) => {
  searchCustomer({ customerName: customerNameVal });
  genericUtils.clickFirstElementIn({ locator: crmFirmographicsPage.tabRegions });
  genericUtils.clickFirstElementIn({ locator: crmFirmographicsPage.tabCreateRegionSet });
};
export const navigateToTheEditFirmographicsTab = () => {
  genericUtils.clickFirstElementIn({ locator: crmIndustryPage.tabCrmCustomer });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyVisible({ element: crmIndustryPage.tabCustomerDetails });
  genericUtils.clickAction({ locator: crmIndustryPage.tabCustomerDetails });
  genericUtils.scrollToBottomRight();
  genericUtils.verifyVisible({ element: crmFirmographicsPage.btnFirmographicsEdit });
  genericUtils.clickAction({ locator: crmFirmographicsPage.btnFirmographicsEdit });
  genericUtils.notgenericUtils.clickable({ locator: crmFirmographicsPage.btnFirmographicsSave });
  genericUtils.waitSometime(shortWait);
};
export const verifyPrimaryChkBxStatus = ({ typeText: industryClassificationSystemSIC, drpDwnVal: industryCodeSIC, viewMode }) => {
  if (viewMode === mode) {
    genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnIndustriesPlus });
  } else {
    genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnExpandIndustriesPlus });
  }
  genericUtils.dropDownContainsTextClick({ element: crmIndustryPage.drpdwnClassificationSystem, typeText: industryClassificationSystemSIC, exactText: industryClassificationSystemSIC });
  genericUtils.typeDropDwnContainsClick({ locator: crmIndustryPage.drpdwnIndustryCode, drpDwnVal: industryCodeSIC });
  genericUtils.clickAction({ locator: crmIndustryPage.checkBxIndustryPrimary });
  genericUtils.verifyConfirmAlertMessage({ msgToVerify: primaryCheckBoxMessage });
  genericUtils.clickCancelOnWindowAlertConfirm();
  genericUtils.verifyAttrText({ locator: crmIndustryPage.labelIndustryPrimary, attribute: industryPrimaryAttr, verifyText: industryPrimaryValueCancel });
  genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnSaveIndustry });
};

export const verifyAddIndustryLabels = ({ typeTextVal: industryClassificationSystem }) => {
  genericUtils.clickAction({ locator: crmIndustryPage.drpdwnClassificationSystem });
  genericUtils.dropDownContainsTextClick({ element: crmIndustryPage.drpdwnClassificationSystem, typeText: industryClassificationSystem, exactText: industryClassificationSystem });
  genericUtils.verifyAttrText({ locator: crmIndustryPage.labelIndustryPrimary, attribute: industryPrimaryAttr, verifyText: industryPrimaryValue });
};

export const verifyPrimaryChkBoxEnabled = ({ viewMode }) => {
  if (viewMode === mode) {
    genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnIndustriesPlus });
  } else {
    genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnExpandIndustriesPlus });
  }
  cy.log('***Verify The Primary Checkbox in Add Industry modal***');
  genericUtils.verifyIfDisabled({ locator: crmIndustryPage.labelIndustryPrimary });
  cy.log('***Verify The user should see that it is disabled by default, as there has been no change made yet.***');
  genericUtils.verifyIfDisabled({ locator: crmIndustryPage.btnSaveIndustry });
  cy.log('***Verify The Primary Checkbox and labels Industry Code table***');
  verifyAddIndustryLabels({ typeTextVal: industryClassificationSystemSIC });
  verifyAddIndustryLabels({ typeTextVal: industryClassificationSystemNAICS });
  verifyAddIndustryLabels({ typeTextVal: industryClassificationSystemISIC });
  genericUtils.clickVisibleElement({ locator: crmIndustryPage.dialogPopup });
};

export const verifyCustomizeIndustriesDrgAndDwp = () => {
  genericUtils.verifyTableColumnsHeaders({ locator: crmIndustryPage.tblCustomizeHeader, columnNames: industriesTblCustomizeColHeadersAll });
  cy.log('***Switch the show option \'On\' of any column***');
  genericUtils.clickAction({ locator: crmIndustryPage.eyeIconVisible });
  genericUtils.verifyVisible({ element: crmIndustryPage.eyeIconVisible });
  cy.log('***Switch the show option \'Off\' of any column***');
  genericUtils.clickAction({ locator: crmIndustryPage.eyeIconVisible });
  cy.log('***Verify drag a column to a new location***');
  genericUtils.dragAndDrop({ draggedElement: crmIndustryPage.customizeSystemDragItem, stationaryElement: crmIndustryPage.customizeCodeDragItem, refElement: crmIndustryPage.customizeTable });
  genericUtils.verifyTableColumnsHeaders({ locator: crmIndustryPage.tblCustomizeHeader, columnNames: industriesTblCustomizeColHeadersAllAfterRearrange });
  genericUtils.clickAction({ locator: crmIndustryPage.btnCustomizeResetToDefaults });
  genericUtils.clickAction({ locator: crmIndustryPage.btnCustomizeApply });
  genericUtils.verifyText({ locator: crmIndustryPage.tabIndustries, verifyText: txtIndustriesTabVerification });
};

export const carrotButtonClickExpand = () => {
  genericUtils.verifyToExist({ element: crmIndustryPage.drpdwnCarrotBtnIndustries });
  genericUtils.clickAction({ locator: crmIndustryPage.drpdwnCarrotBtnIndustries });
  genericUtils.verifyToExist({ element: crmIndustryPage.btnExpand });
  genericUtils.clickVisibleElement({ locator: crmIndustryPage.btnExpand });
};

export const verifyEditFunctionality = () => {
  genericUtils.verifyToExist({ element: crmIndustryPage.drpdwnClassificationSystem });
  genericUtils.dropDownContainsTextClick({ element: crmIndustryPage.drpdwnClassificationSystem, typeText: industryClassificationSystemSIC, exactText: industryClassificationSystemSIC });
  genericUtils.verifyToExist({ element: crmIndustryPage.drpdwnIndustryCode });
  genericUtils.typeDropDwnContainsClick({ locator: crmIndustryPage.drpdwnIndustryCode, drpDwnVal: industryCodeSICB });
  genericUtils.verifyToExist({ element: crmIndustryPage.btnSaveIndustry });
  genericUtils.clickAction({ locator: crmIndustryPage.btnSaveIndustry });
  genericUtils.toastMsg();
};

export const verifyIndustriesTblValues = ({ mapName: reqMapName, locator: element }) => {
  reqMapName.forEach((value, key) => {
    genericUtils.verifyLastRowContainsColumnTxt({ locator: element, locatorColumn: key, containsText: value });
  });
};

export const addNewIndustry = ({ typeTextVal: industryClassificationSystem, drpDwnValue: industryCode }) => {
  genericUtils.clickAction({ locator: crmIndustryPage.btnIndustriesPlus });
  genericUtils.dropDownContainsTextClick({ element: crmIndustryPage.drpdwnClassificationSystem, typeText: industryClassificationSystem, exactText: industryClassificationSystem });
  genericUtils.typeDropDwnContainsClick({ locator: crmIndustryPage.drpdwnIndustryCode, drpDwnVal: industryCode });
  genericUtils.clickAction({ locator: crmIndustryPage.btnAddIndustrySave });
};

//verification for fields Edit Industry,Classification System,Industry Code & Description,Primary Verbiage message
export const verifyAllFieldsInEditIndustryModal = () => {
  genericUtils.verifyText({ locator: crmIndustryPage.labelIndustriesHeaderId, verifyText: validateLabelIndustriesHeaderId });
  genericUtils.verifyTextOrBackGroundColor({ locator: crmIndustryPage.editIndustryBackgoundColor, color: colorAttr, colorCode: editIndustryColorCodeVal });
  genericUtils.clickable({ locator: crmIndustryPage.drpdwnClassificationSystem });
  genericUtils.clickable({ locator: crmIndustryPage.drpdwnIndustryCode });
  genericUtils.clickable({ locator: crmIndustryPage.checkBoxEditIndustryPrimary });
  genericUtils.verifyAttrText({ locator: crmIndustryPage.drpdwnClassificationSystem, attribute: industriesTitleAttr, verifyText: industryClassificationSystemSIC });
  genericUtils.verifyAttrText({ locator: crmIndustryPage.drpdwnIndustryCodeVal, attribute: industriesTitleAttr, verifyText: industryCodeSIC });
  genericUtils.verifyTextContains({ locator: crmIndustryPage.labelClassificationSystem, containsText: validateLabelClassificationSystem });
  genericUtils.verifyTextContains({ locator: crmIndustryPage.labelIndustryCode, containsText: validateLabelIndustryCode });
  genericUtils.verifyText({ locator: crmIndustryPage.labelPrimary, verifyText: validateLabelPrimary });
  genericUtils.verifyVisible({ element: crmIndustryPage.msgVerbiage });
  genericUtils.clickVisibleElement({ locator: crmIndustryPage.dialogPopup });
};

//verification for Columns Headers DivisionColumn, MajorGroupColumn, IndustryGroupColumn, IndustryColumn, ExtendedColumn, SystemColumn
export const verifyColumnsInIndustryTab = () => {
  genericUtils.verifyAttrText({ locator: crmIndustryPage.tblIndustriesTitle, attribute: industriesTitleDataWalkmeAttr, verifyText: validateIndustriesTableTitle });
  genericUtils.verifyAttrText({ locator: crmIndustryPage.divisionColumn, attribute: industriesTitleAttr, verifyText: validateDivisionColumn });
  genericUtils.verifyAttrText({ locator: crmIndustryPage.majorGroupColumn, attribute: industriesTitleAttr, verifyText: validateMajorGroupColumn });
  genericUtils.verifyAttrText({ locator: crmIndustryPage.industryGroupColumn, attribute: industriesTitleAttr, verifyText: validateIndustryGroupColumn });
  genericUtils.verifyAttrText({ locator: crmIndustryPage.industryColumn, attribute: industriesTitleAttr, verifyText: validateIndustryColumn });
  genericUtils.verifyAttrText({ locator: crmIndustryPage.extendedColumn, attribute: industriesTitleAttr, verifyText: validateExtendedColumn });
  genericUtils.verifyAttrText({ locator: crmIndustryPage.systemColumn, attribute: industriesTitleAttr, verifyText: validateSystemColumn });
};

export const enterContactMandatoryFields = ({ contactName: contactDepName, randomName: randomContactName }) => {
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.typeAndSelectValue({ element: crmFirmographicsPage.txtFieldContactName, typeText: randomContactName, exactText: randomContactName });
  genericUtils.dropDownContainsTextClick({ element: crmFirmographicsPage.drpdwnContactDepartment, typeText: contactDepName, exactText: contactDepName });
};

export const addNewContact = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.waitSometime(shortWait);
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.waitSometime(shortWait);
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: newContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: crmContactsData.userDefinedData.title });
  genericUtils.clickAction({ locator: contactPage.btnSaveContact });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: crmContactsData.userDefinedData.title });
  genericUtils.clickAction({ locator: crmFirmographicsPage.btnSaveContact });
};
export const addNewOpportunity = ({ randomName: randomOpportunityName }) => {
  verifyToExist({ element: btnOpportunityPlus });
  clickAction({ locator: btnOpportunityPlus });
  typeText({ locator: txtOpportunityName, dataText: randomOpportunityName });
  selectItemFromDropDown({ element: dropDwnOpportunityType, ddValue: opportunitiesTypeDropDownValue });
  clickAction({ locator: btnSaveNewOpportunity });
};

export const addDupContactSaveAndClose = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: newContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: crmContactsData.userDefinedData.title });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: crmFirmographicsPage.btnSaveContact });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickVisibleElement({ locator: contactPage.btnContactsIgnoreAndAddNewContact });
  genericUtils.verifyToExist({ element: contactPage.lblDuplicateContactName });
};

export const addExistContact = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: existContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: existContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: crmContactsData.userDefinedData.title });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAndContinueContact });
  genericUtils.waitSometime(shortWait);
};

export const addDupContactSaveAndContinue = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: newContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: crmContactsData.userDefinedData.title });
  genericUtils.waitSometime(shortWait);
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: contactPage.btnSaveAndContinueContact });
  genericUtils.waitSometime(shortWait);
};

export const contactSaveAndContinue = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: newContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: crmContactsData.userDefinedData.title });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAndContinueContact });
  genericUtils.navigateToChildWindow();
  genericUtils.waitSometime(shortWait);
};

export const navigateToNotesTab = ({ customerName: customerNameVal }) => {
  searchCustomer({ customerName: customerNameVal });
  genericUtils.clickFirstElementIn({ locator: crmIndustryPage.tabCrmCustomer });
};

export const customerDisableInDefaultAndExpndView = () => {
  genericUtils.notgenericUtils.clickable({ locator: crmNotesPage.btnNotesDownload });
  genericUtils.clickAction({ locator: crmNotesPage.btnCustDefaultViewExpand });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNotesDownloadList, attribute: notesDownloadAttr, verifyText: notesDownloadValue });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesExpandList });
  genericUtils.notgenericUtils.clickable({ locator: crmNotesPage.btnNotesDownload });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnExpandViewExpand });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNotesDownloadList, attribute: notesDownloadAttr, verifyText: notesDownloadValue });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesExpandViewClose });
};

export const addNotes = ({ locator: btnSave }) => {
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesPlus });
  genericUtils.clearTypeText({ element: crmNotesPage.txtFieldAddNotes, typeText: txtFieldNotesValue });
  genericUtils.clickVisibleElement({ locator: btnSave });
  genericUtils.waitSometime(shortWait);
};

export const addTypeNotes = ({ locator: btnSave, notesTypeDrp: valueenotes }) => {
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesPlus });
  genericUtils.dropDownContainsTextClick({ element: crmNotesPage.btnAddNotesTypeField, typeText: valueenotes, exactText: valueenotes });
  genericUtils.clearTypeText({ element: crmNotesPage.txtFieldAddNotes, typeText: txtFieldNotesValue });
  genericUtils.waitSometime(shortWait);
};

export const addNotesAllFields = ({ element: btnPlus, locator: btnSave, notesTypeValue: drpDwnTypeOption1, randomName: randomOpportunityName }) => {
  genericUtils.clickAction({ locator: btnPlus });
  genericUtils.selectItemFromDropDown({ element: crmNotesPage.typeDropDown, ddValue: drpDwnTypeOption1 });
  genericUtils.dropDownContainsValueCheckBoxSelection({ element: crmNotesPage.opportunitiesDropDown, ddValue: randomOpportunityName });
  genericUtils.clearTypeText({ element: crmNotesPage.txtFieldAddNotes, typeText: txtFieldNotesValue });
  genericUtils.clickVisibleElement({ locator: btnSave });
  genericUtils.waitSometime(shortWait);
};

export const addNotesExpand = ({ locator: btnSave }) => {
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesPlusExpand });
  genericUtils.clearTypeText({ element: crmNotesPage.txtFieldAddNotes, typeText: txtFieldNotesValue });
  genericUtils.clickVisibleElement({ locator: btnSave });
  genericUtils.waitSometime(shortWait);
};

export const addDocumentsAllFields = ({ locator: btnDocumentsPlus, documentFileUploadTargetFile, dropDownDocTypeValue: drpDwnTypeOption1, contactName, randomName: randomOpportunityName, dropDownDocDirectionValue: drpDwnDirectionOption1 }) => {
  genericUtils.clickAction({ locator: btnDocumentsPlus });
  genericUtils.uploadFile({ locator: crmDocumentsPage.btnFileUpload, filePath: documentFileUploadTargetFile });
  genericUtils.selectItemFromDropDownByTyping({ locator: crmDocumentsPage.btnDocumentDropDwnType, drpDwnVal: drpDwnTypeOption1 });
  genericUtils.dropDownContainsValueCheckBoxSelection({ element: crmDocumentsPage.btnContactDropDwn, ddValue: contactName });
  genericUtils.dropDownContainsValueCheckBoxSelection({ element: crmNotesPage.opportunitiesDropDown, ddValue: randomOpportunityName });
  genericUtils.selectItemFromDropDown({ element: crmDocumentsPage.btnDocDirectionDropDwn, ddValue: drpDwnDirectionOption1 });
  genericUtils.clearTypeText({ element: crmDocumentsPage.txtFieldAddDocDetails, typeText: txtFieldDocDetailsValue });
  genericUtils.clickVisibleElement({ locator: crmDocumentsPage.btnAddDocument });
  genericUtils.waitSometime(shortWait);
};

export const editDocuments = ({ locator: btnDocContextMenu, editDocDetailsValue: txtFieldDocDetailsValueUpdated }) => {
  genericUtils.waitSometime(moreWait);
  genericUtils.clickAction({ locator: btnDocContextMenu });
  genericUtils.clickVisibleElement({ locator: crmDocumentsPage.btnDocumentsEdit });
  genericUtils.verifyIfDisabled({ locator: crmDocumentsPage.btnFileUploadType });
  genericUtils.clearTypeText({ element: crmDocumentsPage.txtFieldAddDocDetails, typeText: txtFieldDocDetailsValueUpdated });
  genericUtils.verifyValue({ locator: crmNotesPage.notesEditModelLastUpdatedBy, value: notesEditModelLastUpdatedByText });
  genericUtils.clickVisibleElement({ locator: crmDocumentsPage.btnAddDocument });
  genericUtils.waitSometime(shortWait);
};

export const deleteFirstRowDocument = ({ locator: btnDocContextMenu }) => {
  genericUtils.clickAction({ locator: btnDocContextMenu });
  genericUtils.clickVisibleElement({ locator: crmDocumentsPage.btnDocumentsDelete });
  genericUtils.clickOkOnWindowAlertConfirm();
  genericUtils.waitSometime(shortWait);
};

export const validateCreatedDocument = ({
  locator: tableFirstRowData,
  documentNameValue: tabledocumentName,
  documentTypeValue: drpDwnTypeOption1,
  documnetDirectionValue: drpDwnDirectionOption1,
  documentDetailsValue: txtFieldDocDetailsValue,
}) => {
  genericUtils.verifyTableRowElementText({ locator: tableFirstRowData, index: 0, verifyText: tabledocumentName });
  genericUtils.verifyTableRowElementText({ locator: tableFirstRowData, index: 1, verifyText: drpDwnTypeOption1 });
  genericUtils.verifyTableRowElementText({ locator: tableFirstRowData, index: 2, verifyText: drpDwnDirectionOption1 });
  genericUtils.verifyTableRowElementText({ locator: tableFirstRowData, index: 3, verifyText: txtFieldDocDetailsValue });
};

export const customerNotesUIValidations = ({ locator: btnDefaultandExpandView }) => {
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesDownload });
  genericUtils.verifyVisible({ element: crmNotesPage.msgDownloadProcessingToast });
  genericUtils.clickable({ locator: crmNotesPage.btnNotesDownload });
  genericUtils.clickVisibleElement({ locator: btnDefaultandExpandView });
  genericUtils.clickable({ locator: crmNotesPage.btnNotesDownloadList });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesDownloadList });
  genericUtils.verifyVisible({ element: crmNotesPage.msgDownloadProcessingToast });
};

export const validateCreatedNotes = ({
  locator: tableNotesFirstRowDataDefault,
  notesTypeValue: drpDwnTypeOption1,
  notesOpportunityNameValue: randomOpportunityName,
  notesContactValue: contactName,
  notesNoteFieldValue: txtFieldNotesValue,
}) => {
  genericUtils.verifyTableRowElementText({ locator: tableNotesFirstRowDataDefault, index: 0, verifyText: drpDwnTypeOption1 });
  genericUtils.verifyTableRowElementText({ locator: tableNotesFirstRowDataDefault, index: 1, verifyText: randomOpportunityName });
  genericUtils.verifyTableRowElementText({ locator: tableNotesFirstRowDataDefault, index: 2, verifyText: contactName });
  genericUtils.verifyTableRowElementText({ locator: tableNotesFirstRowDataDefault, index: 8, verifyText: txtFieldNotesValue });
};

export const notesCustCarrotButtonExpand = () => {
  genericUtils.clickAction({ locator: crmNotesPage.btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesExpandList });
};

export const navigateToDocumentsTab = ({ customerName: customerNameVal }) => {
  searchCustomer({ customerName: customerNameVal });
  genericUtils.clickFirstElementIn({ locator: crmIndustryPage.tabCrmCustomer });
  genericUtils.clickAction({ locator: crmNotesPage.tabDocuments });
};

export const documentsCustCarrotButtonExpand = () => {
  genericUtils.clickAction({ locator: crmNotesPage.btnCustDocDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnDocExpandList });
};

export const customerDocumentsUIValidations = ({ locator: btnDefaultandExpandView }) => {
  genericUtils.clickVisibleElement({ locator: btnDefaultandExpandView });
  genericUtils.verifyVisible({ element: crmNotesPage.btnDocumentsHideandShowFilter });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnDocumentsHideandShowFilter });
  genericUtils.scrollToBottomRight();
  genericUtils.verifyDoesNotExist({ element: crmNotesPage.documentNamecolumn });
  genericUtils.clickVisibleElement({ locator: btnDefaultandExpandView });
  genericUtils.verifyVisible({ element: crmNotesPage.btnDocumentsHideandShowFilter });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnDocumentsHideandShowFilter });
  genericUtils.verifyVisible({ element: crmNotesPage.documentNamecolumn });
  genericUtils.verifyVisible({ element: crmNotesPage.documentTypecolumn });
  genericUtils.verifyVisible({ element: crmNotesPage.documentDirectioncolumn });
  genericUtils.verifyVisible({ element: crmNotesPage.documentDetailscolumn });
  genericUtils.verifyVisible({ element: crmNotesPage.documentUploadedBycolumn });
  genericUtils.verifyVisible({ element: crmNotesPage.documentUploadedDateTimecolumn });
  genericUtils.verifyVisible({ element: crmNotesPage.documentUpdatedBycolumn });
  genericUtils.verifyVisible({ element: crmNotesPage.documentUpdatedDateTimecolumn });
};

export const customerNoDocInDefaultAndExpndView = () => {
  genericUtils.verifyText({ locator: crmNotesPage.noDocInDefaultView, verifyText: msgNoDocumentsFound });
  genericUtils.scrollToBottomRight();
  documentsCustCarrotButtonExpand();
  genericUtils.verifyVisible({ element: crmNotesPage.noDocInExpandView });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesExpandViewClose });
};

export const editOpportunityFields = ({
  dataText: oppName,
  drpDwnType: oppType,
  drpDwnStage: stageType,
  drpDwnDivision: drpDwnDivisionOption,
}) => {
  cy.log('Edit Opportunity');
  genericUtils.clickElementIndex({ locator: `${commonPage.tblOpportunitiesTable} ${commonPage.tblRows} ${commonPage.btnKabobMenu}`, index: 0 });
  genericUtils.clickVisibleElement({ locator: commonPage.lstContextMenuOptions });
  genericUtils.verifyTextContains({ locator: crmOpportunitiesPage.lblEditOppTitle, containsText: editOpportunityTitle });
  genericUtils.clearTextType({ element: crmOpportunitiesPage.txtFieldOppName, typeText: oppName });
  genericUtils.typeDropDwnClick({ locator: crmOpportunitiesPage.drpDwnOppType, drpDwnVal: oppType });
  genericUtils.typeDropDwnClick({ locator: crmOpportunitiesPage.drpDwnOppStage, drpDwnVal: stageType });
  genericUtils.typeDropDwnClick({ locator: crmOpportunitiesPage.drpDwnDivision, drpDwnVal: drpDwnDivisionOption });
  genericUtils.clickAction({ locator: crmOpportunitiesPage.btnSaveOpp });
  genericUtils.waitSometime(shortWait);
};

export const addOpportunityAllFields = ({
  dataText: oppName,
  drpDwnSource: sourceType,
  drpDwnType: oppType,
  drpDwnStage: stageType,
  drpDwnSolutionType: solType,
  drpDwnSolution: solution,
  drpDwnPricStrat: pricingStrat,
}) => {
  cy.log('Adding a new Opportunity');
  genericUtils.clickAction({ locator: crmOpportunitiesPage.btnAddOpportunity });
  genericUtils.verifyTextContains({ locator: crmOpportunitiesPage.lblAddOppTitle, containsText: addOpportunityTitle });
  genericUtils.typeText({ locator: crmOpportunitiesPage.txtFieldOppName, dataText: oppName });
  genericUtils.typeDropDwnClick({ locator: crmOpportunitiesPage.drpDwnOppSource, drpDwnVal: sourceType });
  genericUtils.typeDropDwnClick({ locator: crmOpportunitiesPage.drpDwnOppType, drpDwnVal: oppType });
  genericUtils.typeDropDwnClick({ locator: crmOpportunitiesPage.drpDwnOppStage, drpDwnVal: stageType });
  if (stageType === stageClosedLost) {
    genericUtils.typeDropDwnClick({ locator: crmOpportunitiesPage.drpDwnCloseReason, drpDwnVal: closeReasonClosedLost });
  } else if (stageType === stageDisqualified) {
    genericUtils.typeDropDwnClick({ locator: crmOpportunitiesPage.drpDwnCloseReason, drpDwnVal: closeReasonDisqualified });
  } else if (stageType === stageRevisitOpp) {
    genericUtils.typeDropDwnClick({ locator: crmOpportunitiesPage.drpDwnCloseReason, drpDwnVal: closeReasonRevist });
    datePicker({ dateLocator: crmOpportunitiesPage.drpDwnRevisitDate, dataText: returnfutureDateMMDDYY({ dayCount: 7, monthCount: 1 }) });
  } else {
    cy.log(' Close reason can not be selected for Open Stage');
  };
  genericUtils.typeDropDwnClick({ locator: crmOpportunitiesPage.drpDwnDivision, drpDwnVal: division });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmOpportunitiesPage.drpDwnBusinessUnits, ddValue: businessUnits });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmOpportunitiesPage.drpDwnContact, ddValue: contact });
  oppMode.forEach((modeType) => {
    genericUtils.dropDownExactCheckBoxSelection({ element: crmOpportunitiesPage.drpDwnMode, ddValue: modeType });
  });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmOpportunitiesPage.drpDwnSize, ddValue: oppSize });
  equipment.forEach((equipType) => {
    genericUtils.dropDownExactCheckBoxSelection({ element: crmOpportunitiesPage.drpDwnEquipment, ddValue: equipType });
  });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmOpportunitiesPage.drpDwnSolType, ddValue: solType });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmOpportunitiesPage.drpDwnSolution, ddValue: solution });
  genericUtils.typeText({ locator: crmOpportunitiesPage.txtFieldTotalOppVol, dataText: totalOppVolume });
  genericUtils.typeText({ locator: crmOpportunitiesPage.txtFieldTotalOppRev, dataText: totalOppRev });
  genericUtils.typeText({ locator: crmOpportunitiesPage.txtFieldProjectedVol, dataText: projectedVolume });
  genericUtils.typeText({ locator: crmOpportunitiesPage.txtFieldProjectedRev, dataText: projectedRevenue });
  genericUtils.typeText({ locator: crmOpportunitiesPage.tctFieldProjectedMargin, dataText: projectedMargin });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmOpportunitiesPage.drpDwnPricStrategy, ddValue: pricingStrat });
  genericUtils.typeText({ locator: crmOpportunitiesPage.txtFieldDetails, dataText: oppDetails });
  datePicker({ dateLocator: crmOpportunitiesPage.drpDwnDueDate, dataText: returntodayDateMMDDYY() });
  datePicker({ dateLocator: crmOpportunitiesPage.drpDwnAwardDate, dataText: returntodayDateMMDDYY() });
  datePicker({ dateLocator: crmOpportunitiesPage.drpDwnGoLiveDate, dataText: returnfutureDateMMDDYY({ dayCount: 3, monthCount: 1 }) });
  genericUtils.clickAction({ locator: crmOpportunitiesPage.btnSaveOpp });
  genericUtils.waitSometime(shortWait);
};

export const notesColumnTypeUIValidations = ({ locator: btnDefaultandExpandView }) => {
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteOpportunityFilter, attribute: typeAttrVal, verifyText: searchValue });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteContactFilter, attribute: typeAttrVal, verifyText: searchValue });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteFilter, attribute: typeAttrVal, verifyText: searchValue });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteTypeFilter, attribute: dataTestIdAttrVal, verifyText: buttonValue });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteRepFilter, attribute: dataColumnFilterAttrVal, verifyText: repFilterValue });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteCreatedByFilter, attribute: dataColumnFilterAttrVal, verifyText: createdByValue });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteUpdatedByFilter, attribute: dataColumnFilterAttrVal, verifyText: updatedByValue });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteCreatedByDateFilter, attribute: dataColumnFilterAttrVal, verifyText: createdByDateValue });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteUpdatedDateandTimeFilter, attribute: dataColumnFilterAttrVal, verifyText: updatedByDateValue });
  genericUtils.clearTypeText({ element: crmNotesPage.btnNoteFilter, typeText: txtFieldNotesValue });
  addNotes({ locator: btnDefaultandExpandView });
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesEdit });
  genericUtils.typeText({ locator: crmNotesPage.txtFieldAddNotes, dataText: txtFieldNotesUpdatedValue });
  genericUtils.clickAction({ locator: btnDefaultandExpandView });
};

export const notesOpenEntryUIValidations = () => {
  genericUtils.typeText({ locator: crmNotesPage.btnNoteFilter, dataText: txtFieldNotesValue });
  genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteFilter, attribute: valueAttr, verifyText: txtFieldNotesValue });
  genericUtils.clearText({ locator: crmNotesPage.btnNoteFilter });
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesEdit });
  genericUtils.verifyVisible({ element: crmNotesPage.editNotesWindow });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesExpandViewClose });
  genericUtils.typeText({ locator: crmNotesPage.btnNoteFilter, dataText: txtFieldNotesInvalidValue });
};

export const cutomerNotesFiltersUIValidations = ({ locator: btnDefaultandExpandView }) => {
  genericUtils.scrollToBottomRight();
  genericUtils.clickVisibleElement({ locator: btnDefaultandExpandView });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNotesHideFilter });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesHideFilter });
  genericUtils.verifyDoesNotExist({ element: crmNotesPage.btnNoteTypeFilter });
  genericUtils.clickVisibleElement({ locator: btnDefaultandExpandView });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNotesHideFilter });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesHideFilter });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNoteTypeFilter });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNoteOpportunityFilter });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNoteContactFilter });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNoteRepFilter });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNoteCreatedByFilter });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNoteDateAndTimeFilter });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNoteUpdatedByFilter });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNoteUpdatedDateandTimeFilter });
  genericUtils.scrollIntoView({ locator: crmNotesPage.btnNoteFilter });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNoteFilter });
};

export const customerNoNotesInDefaultAndExpndView = () => {
  genericUtils.verifyElementTextContains({ locator: crmNotesPage.msgNoNotes, verifyText: msgNoNotesFound });
  notesCustCarrotButtonExpand();
  genericUtils.verifyVisible({ element: crmNotesPage.visibleElementExpandview });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesExpandViewClose });
};

export const cutomerNotesEditValidations = ({ locator: btnDefaultandExpandView, viewMode: mode }) => {
  if (mode === modeVal) {
    genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesDownload });
    genericUtils.verifyVisible({ element: crmNotesPage.msgDownloadProcessingToast });
  } else {
    genericUtils.clickVisibleElement({ locator: btnDefaultandExpandView });
    genericUtils.clickable({ locator: crmNotesPage.btnNotesDownloadList });
    genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesDownloadList });
    genericUtils.verifyVisible({ element: crmNotesPage.msgDownloadProcessingToast });
  }
};

export const editNotes = ({ locator: btnSave }) => {
  genericUtils.clickAction({ locator: crmNotesPage.btnContextMenu });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesEdit });
  genericUtils.typeText({ locator: crmNotesPage.txtFieldAddNotes, dataText: txtFieldNotesUpdatedValue });
  genericUtils.verifyValue({ locator: crmNotesPage.notesEditModelLastUpdatedBy, value: notesEditModelLastUpdatedByText });
  genericUtils.clickVisibleElement({ locator: btnSave });
  genericUtils.waitSometime(shortWait);
};

export const customerEditInDefaultAndExpndView = ({ locator: btnCustomerViewExpand }) => {
  addNotes({ locator: crmNotesPage.btnAddNotesCust });
  cutomerNotesEditValidations({ locator: btnCustomerViewExpand, viewMode: downloadIconViewMode });
  editNotes({ locator: crmNotesPage.btnAddNotesCust });
  cutomerNotesEditValidations({ locator: btnCustomerViewExpand, viewMode: downloadIconViewMode });
  addNotes({ locator: crmNotesPage.btnAddNotesCust });
  cutomerNotesEditValidations({ locator: btnCustomerViewExpand, viewMode: downloadOptionViewMode });
  editNotes({ locator: crmNotesPage.btnAddNotesCust });
  cutomerNotesEditValidations({ locator: btnCustomerViewExpand, viewMode: downloadOptionViewMode });
  genericUtils.waitSometime(shortWait);
};

export const notesColumnFilterUIValidations = ({ viewMode: mode }) => {
  if (mode === modeValNo) {
    genericUtils.verifyDoesNotExist({ element: crmNotesPage.btnNoteOpportunityFilter });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteContactFilter, attribute: typeAttrVal, verifyText: searchValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteFilter, attribute: typeAttrVal, verifyText: searchValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteTypeFilter, attribute: dataTestIdAttrVal, verifyText: buttonValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteRepFilter, attribute: dataColumnFilterAttrVal, verifyText: repFilterValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteCreatedByFilter, attribute: dataColumnFilterAttrVal, verifyText: createdByValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteUpdatedByFilter, attribute: dataColumnFilterAttrVal, verifyText: updatedByValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteCreatedByDateFilter, attribute: dataColumnFilterAttrVal, verifyText: createdByDateValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteUpdatedDateandTimeFilter, attribute: dataColumnFilterAttrVal, verifyText: updatedByDateValue });
  } else {
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteOpportunityFilter, attribute: typeAttrVal, verifyText: searchValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteContactFilter, attribute: typeAttrVal, verifyText: searchValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteFilter, attribute: typeAttrVal, verifyText: searchValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteTypeFilter, attribute: dataTestIdAttrVal, verifyText: buttonValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteRepFilter, attribute: dataColumnFilterAttrVal, verifyText: repFilterValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteCreatedByFilter, attribute: dataColumnFilterAttrVal, verifyText: createdByValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteUpdatedByFilter, attribute: dataColumnFilterAttrVal, verifyText: updatedByValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteCreatedByDateFilter, attribute: dataColumnFilterAttrVal, verifyText: createdByDateValue });
    genericUtils.verifyAttrText({ locator: crmNotesPage.btnNoteUpdatedDateandTimeFilter, attribute: dataColumnFilterAttrVal, verifyText: updatedByDateValue });
  }
};

export const notesCustomizeDisableandEnable = ({ locator: btnDefaultandExpandView }) => {
  genericUtils.scrollToBottomRight();
  genericUtils.clickVisibleElement({ locator: btnDefaultandExpandView });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesCustomize });
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesCustomizeOppEye });
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesCustomizeSave });
};

export const notesCustomizeInDefaultView = () => {
  genericUtils.clickAction({ locator: crmNotesPage.btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesCustomize });
  genericUtils.dragAndDrop({ draggedElement: crmNotesPage.btnNotesTypedraggable, stationaryElement: crmNotesPage.btnNotesRepsdraggable, refElement: contactPage.notesCustomizeWindow });
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesCustomizeSave });
  notesColumnFilterUIValidations({ viewMode: modeValYes });
  notesCustomizeDisableandEnable({ locator: crmNotesPage.btnCustDefaultViewExpand });
  notesColumnFilterUIValidations({ viewMode: modeValNo });
  notesCustomizeDisableandEnable({ locator: crmNotesPage.btnCustDefaultViewExpand });
  notesColumnFilterUIValidations({ viewMode: modeValYes });
};

export const notesCustomizeInExpandView = () => {
  genericUtils.clickAction({ locator: crmNotesPage.btnExpandViewExpand });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesCustomize });
  genericUtils.dragAndDrop({ draggedElement: crmNotesPage.btnNotesRepsdraggable, stationaryElement: crmNotesPage.btnNotesTypedraggable, refElement: contactPage.notesCustomizeWindow });
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesCustomizeSave });
  notesCustCarrotButtonExpand();
  notesColumnFilterUIValidations({ viewMode: modeValYes });
  notesCustomizeDisableandEnable({ locator: crmNotesPage.btnExpandViewExpand });
  notesCustCarrotButtonExpand();
  notesColumnFilterUIValidations({ viewMode: modeValNo });
  notesCustomizeDisableandEnable({ locator: crmNotesPage.btnExpandViewExpand });
  notesCustCarrotButtonExpand();
  notesColumnFilterUIValidations({ viewMode: modeValYes });
};

export const notesSelectDDUIValidations = () => {
  genericUtils.dropDownExactCheckBoxSelection({ element: crmNotesPage.btnNoteCreatedByFilter, ddValue: notesUserNameValue });
  genericUtils.verifyVisible({ element: crmNotesPage.btnNotesCreatedByValue });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmNotesPage.btnNoteCreatedByFilter, ddValue: notesUserNameValue });
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesKabob });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesEdit });
  genericUtils.verifyVisible({ element: crmNotesPage.editNotesWindow });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnNotesExpandViewClose });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmNotesPage.btnNoteTypeFilter, ddValue: notesOperationsValue });
};

export const associateContactExtSaveAndClose = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: newContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: crmContactsData.userDefinedData.title });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: crmFirmographicsPage.btnSaveContact });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.radioBtnAssociateContact });
  genericUtils.navigateToChildWindow();
  genericUtils.clickVisibleElement({ locator: contactPage.btnAssociatedContact });
  genericUtils.waitSometime(shortWait);
};

export const associateContactExtSaveAndContinue = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal }) => {
  genericUtils.verifyToExist({ element: contactPage.btnContactsPlus });
  genericUtils.clickAction({ locator: contactPage.btnContactsPlus });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.txtFieldContactName,
    typeText: randomContactName,
    exactText: randomContactName,
  });
  genericUtils.dropDownContainsTextClick({
    element: crmFirmographicsPage.drpdwnContactDepartment,
    typeText: contactDepName,
    exactText: contactDepName,
  });
  genericUtils.typeText({ locator: contactPage.txtContactsPhone, dataText: randomPhNo });
  genericUtils.typeText({ locator: contactPage.txtContactsEmail, dataText: newContactTabEmailVal });
  genericUtils.typeText({ locator: contactPage.txtContactTitle, dataText: crmContactsData.userDefinedData.title });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAndContinueContact });
  genericUtils.waitSometime(shortWait);
  genericUtils.navigateToChildWindow();
  genericUtils.clickVisibleElement({ locator: contactPage.btnAssociatedContact });
  genericUtils.waitSometime(shortWait);
};
export const verifyCustomerInteractionsDocumentsFilters = () => {
  genericUtils.verifyToExist({ element: crmNotesPage.documentNamecolumn + 'input' });
  genericUtils.verifyVisible({ element: crmNotesPage.documentTypecolumn + ' svg' });
  genericUtils.verifyVisible({ element: crmNotesPage.documentDirectioncolumn + ' svg' });
  genericUtils.verifyToExist({ element: crmNotesPage.documentDetailscolumn + 'input' });
  genericUtils.verifyToExist({ element: crmNotesPage.documentUploadedBycolumn + ' svg' });
  genericUtils.verifyToExist({ element: crmNotesPage.documentUploadedDateTimecolumn + ' input' });
  genericUtils.verifyToExist({ element: crmNotesPage.documentUpdatedBycolumn + ' svg' });
  genericUtils.verifyToExist({ element: crmNotesPage.documentUpdatedDateTimecolumn + ' input' });
};
export const filterDocumentsByType = (stsType) => {
  genericUtils.scrollIntoView({ locator: crmNotesPage.documentTypecolumn });
  genericUtils.clickAction({ locator: crmNotesPage.documentTypecolumn + ' svg' });
  cy.get(crmDocumentsPage.drpFilterList).each(($filter) => {
    cy.get($filter).then(($element) => {
      const color = $element.css('background-color');
      if (color === 'rgb(15, 112, 231)') {
        cy.get($element).click({ force: true });
      }
    });
  });
  genericUtils.selectItemFromDropDownByTyping({ locator: crmDocumentsPage.drpFilterList, drpDwnVal: stsType });
  cy.get('body').then(($body) => {
    if ($body.find(crmDocumentsPage.tblCustomerInteractionDocuments).length > 0) {
      cy.get(crmDocumentsPage.tblCustomerInteractionDocuments)
        .find('[data-cellheader="Type"]').each(($val) => {
          expect($val.text()).to.eql(stsType);
        });
    } else {
      cy.get(crmDocumentsPage.msgNoDocument).should('have.text', noDocumentMsg);
    }
  });
};
export const openEditDocument = () => {
  genericUtils.waitSometime(moreWait);
  genericUtils.clickFirstElementIn({ locator: crmDocumentsPage.tblCustomerInteractionDocuments });
  genericUtils.clickFirstElementIn({ locator: crmDocumentsPage.btnOpenDocRecordMenu });
  genericUtils.clickFirstElementIn({ locator: crmDocumentsPage.btnEdiotDocRecord });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyToExist({ locator: crmDocumentsPage.dialogPopOver });
};
export const removeSelectedFilter = ({ locator: locatorName }) => {
  genericUtils.scrollIntoView({ locator: locatorName });
  genericUtils.clickFirstElementIn({ locator: locatorName + ' svg' });
  cy.get(crmDocumentsPage.drpFilterList).each(($filter) => {
    cy.get($filter).then(($element) => {
      const color = $element.css('background-color');
      if (color === 'rgb(15, 112, 231)') {
        cy.get($element).click({ force: true });
      }
    });
  });
};
export const deleteDocument = () => {
  genericUtils.waitSometime(moreWait);
  cy.get('body').then(($body) => {
    if ($body.find(crmDocumentsPage.tblCustomerInteractionDocuments).length > 0) {
      let countBefore;
      cy.get(crmDocumentsPage.tblCustomerInteractionDocuments).then(($beforeCount) => {
        countBefore = $beforeCount;
      });
      genericUtils.clickFirstElementIn({ locator: crmDocumentsPage.tblCustomerInteractionDocuments });
      genericUtils.clickFirstElementIn({ locator: crmDocumentsPage.btnOpenDocRecordMenu });
      genericUtils.clickFirstElementIn({ locator: crmDocumentsPage.btnDeleteDocRecord });
      cy.get(crmDocumentsPage.tblCustomerInteractionDocuments).then(($afterCount) => {
        expect(countBefore - 1).to.eql($afterCount);
      });
    } else {
      cy.get(crmDocumentsPage.msgNoDocument).should('have.text', noDocumentMsg);
    }
  });
};

export const defaultCustomOption = ({ locator: btnCustDefaultViewExpand, element: btnCustomizeOption, restEle: btnResetToDefault, locator: btnCustTableSave }) => {
  genericUtils.clickAction({ locator: btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: btnCustomizeOption });
  genericUtils.clickAction({ locator: btnResetToDefault });
  genericUtils.clickAction({ locator: btnCustTableSave });
  genericUtils.waitSometime(shortWait);
};

export const verifyOppCustomizeOptions = ({
  locator: btnCustDefaultViewExpand,
  element: btnCustomizeOption,
  restEle: btnResetToDefault,
  customTableSave: btnCustTableSave,
  columnTableArray,
  tableColumnTextEle: tableAllColumnText,
  hideOneColumnValue: hideCustomTableTypeValue,
  customizeDragItem1,
  customizeDragItem2,
  customizedTableArray,
}) => {
  genericUtils.clickAction({ locator: btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: btnCustomizeOption });
  genericUtils.clickAction({ locator: btnResetToDefault });
  genericUtils.clickAction({ locator: btnCustTableSave });
  genericUtils.verifyTableColumnsHeaders({ locator: tableAllColumnText, columnNames: columnTableArray });
  genericUtils.clickAction({ locator: btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: btnCustomizeOption });
  genericUtils.clickAction({ locator: hideCustomTableTypeValue });
  genericUtils.clickAction({ locator: btnCustTableSave });
  const newColumnTableArray = columnTableArray;
  newColumnTableArray.shift();
  genericUtils.verifyTableColumnsHeaders({ locator: tableAllColumnText, columnNames: crmOpportunitiesData.staticData.newCustomizedArray });
  genericUtils.clickAction({ locator: btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: btnCustomizeOption });
  genericUtils.clickAction({ locator: btnResetToDefault });
  genericUtils.dragAndDrop({ draggedElement: customizeDragItem1, stationaryElement: customizeDragItem2, refElement: crmIndustryPage.customizeTable });
  genericUtils.clickAction({ locator: btnCustTableSave });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyTableColumnsHeaders({ locator: tableAllColumnText, columnNames: customizedTableArray });
  genericUtils.clickAction({ locator: btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: btnCustomizeOption });
  genericUtils.clickAction({ locator: btnResetToDefault });
  genericUtils.clickAction({ locator: btnCustTableSave });
};
export const verifyCustomizeOptions = ({
  locator: btnCustDefaultViewExpand,
  element: btnCustomizeOption,
  restEle: btnResetToDefault,
  customTableSave: btnCustTableSave,
  columnTableArray,
  tableColumnTextEle: tableAllColumnText,
  hideOneColumnValue: hideCustomTableTypeValue,
  customizeDragItem1,
  customizeDragItem2,
  customizedTableArray,
}) => {
  genericUtils.clickAction({ locator: btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: btnCustomizeOption });
  genericUtils.clickAction({ locator: btnResetToDefault });
  genericUtils.clickAction({ locator: btnCustTableSave });
  genericUtils.verifyTableColumnsHeaders({ locator: tableAllColumnText, columnNames: columnTableArray });
  genericUtils.clickAction({ locator: btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: btnCustomizeOption });
  genericUtils.clickAction({ locator: hideCustomTableTypeValue });
  genericUtils.clickAction({ locator: btnCustTableSave });
  const newColumnTableArray = columnTableArray;
  newColumnTableArray.shift();
  genericUtils.verifyTableColumnsHeaders({ locator: tableAllColumnText, columnNames: newColumnTableArray });
  genericUtils.clickAction({ locator: btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: btnCustomizeOption });
  genericUtils.clickAction({ locator: btnResetToDefault });
  genericUtils.dragAndDrop({ draggedElement: customizeDragItem1, stationaryElement: customizeDragItem2, refElement: crmIndustryPage.customizeTable });
  genericUtils.clickAction({ locator: btnCustTableSave });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyTableColumnsHeaders({ locator: tableAllColumnText, columnNames: customizedTableArray });
  genericUtils.clickAction({ locator: btnCustDefaultViewExpand });
  genericUtils.clickVisibleElement({ locator: btnCustomizeOption });
  genericUtils.clickAction({ locator: btnResetToDefault });
  genericUtils.clickAction({ locator: btnCustTableSave });
};

export const openOpportunityInExpandView = () => {
  genericUtils.clickAction({ locator: crmOpportunitiesPage.contextMenu });
  genericUtils.clickVisibleElement({ locator: crmOpportunitiesPage.expandView });
};

export const editOpportunitiesFields = (opportunityEditName) => {
  genericUtils.clickFirstElementIn({ locator: crmOpportunitiesPage.btnKabob });
  genericUtils.clickFirstElementIn({ locator: crmOpportunitiesPage.btnEditOpportunities });
  genericUtils.clearTextType({ element: opportunityPage.txtOpportunityName, typeText: opportunityEditName });
  genericUtils.clickActionWait({ locator: crmOpportunitiesPage.btnSaveOpportunity });
  genericUtils.verifyFirstElementTxt({ locator: crmOpportunitiesPage.lblOpportunityName, verifyText: opportunityEditName });
};

export const downloadDocument = () => {
  genericUtils.waitSometime(moreWait);
  let path, downloadedFileName;
  cy.get('body').then(($body) => {
    if ($body.find(crmDocumentsPage.tblCustomerInteractionDocuments).length > 0) {
      genericUtils.clickFirstElementIn({ locator: crmDocumentsPage.tblCustomerInteractionDocuments });
      genericUtils.clickFirstElementIn({ locator: crmDocumentsPage.btnOpenDocRecordMenu });
      genericUtils.clickFirstElementIn({ locator: crmDocumentsPage.btnDownlodDocRecord });
      cy.task('readdir', { directoryPath: '*.csv' }).then((fs) => {
        downloadedFileName = fs;
        path = 'cypress/downloads/' + downloadedFileName;
        expect(path).to.include(downloadedFileName);
      });
    } else {
      cy.get(crmDocumentsPage.msgNoDocument).should('have.text', noDocumentMsg);
    }
  });
};

export const customizeContactCodeColumn = () => {
  genericUtils.verifyToExist({ element: contactPage.btnCustomizeContacts });
  genericUtils.clickAction({ locator: contactPage.btnCustomizeContacts });
  genericUtils.clickVisibleElement({ locator: crmInteractionsPage.btnCustomize });
  genericUtils.clickAction({ locator: contactPage.eyeIconCode });
  genericUtils.verifyExists({ element: contactPage.eyeIconCode });
  genericUtils.waitSometime(commonData.shortWait);
  genericUtils.dragAndDropObjects({ draggedElement: contactPage.customizeCode, stationaryElement: contactPage.customizeEmail, refElement: crmInteractionsPage.customizeTable });
  genericUtils.clickAction({ locator: crmOpportunitiesPage.btnCustomizeApply });
};

export const hoverOverCodeColumn = () => {
  genericUtils.verifyAttrText({ locator: contactPage.colHeaderCode, attribute: crmPortfolioData.staticData.titleAttrVal, verifyText: crmContactsData.staticData.validateCodeColumn });
  genericUtils.verifyToExist({ element: contactPage.btnCustomizeContacts });
  genericUtils.clickAction({ locator: contactPage.btnCustomizeContacts });
  genericUtils.clickVisibleElement({ locator: crmInteractionsPage.btnCustomize });
  if (cy.get(contactPage.eyeIconCode).find('[data-icon="eye"]').should('exist')) {
    genericUtils.clickAction({ locator: contactPage.eyeIconCode });
    genericUtils.clickAction({ locator: crmOpportunitiesPage.btnCustomizeApply });
  } else {
    genericUtils.clickAction({ locator: contactPage.eyeIconCode });
    genericUtils.verifyExists({ element: contactPage.eyeIconCode });
    genericUtils.clickAction({ locator: crmOpportunitiesPage.btnCustomizeApply });
  };
};

export const contactsClickExpand = () => {
  genericUtils.verifyToExist({ element: contactPage.btnCustomizeContacts });
  genericUtils.clickAction({ locator: contactPage.btnCustomizeContacts });
  genericUtils.clickVisibleElement({ locator: crmInteractionsPage.btnExpand });
};

/**
 * This function is used to filter any column from contacts table
 * @param {*} filterType,
 * @param {*} filterVal ,
 */
export const selectContactsFilter = (filterType, filterVal) => {
  genericUtils.selectAnyFilterFromTable(filterType, filterVal);
  genericUtils.waitSometime(commonData.shortWait);
  cy.get(commonPage.tblDataLoderMsg).last().should('not.contain', 'Loading...');
  cy.get('body').then(($body) => {
    if ($body.find(contactPage.tblContactsTable).find(commonPage.tblRows).length > 0) {
      const filterTypeLocator = '[data-cellheader="%s"]'.replace('%s', filterType);
      cy.get(contactPage.tblContactsTable).find(commonPage.tblRows)
        .find(filterTypeLocator).each(($val) => {
          expect($val.text()).to.contain(filterVal);
        });
    } else {
      cy.get(contactPage.tblContactsTable).find(commonPage.txtNoDataFound).should('have.text', 'No Contacts Found');
    }
  });
};

export const navigateToOpportunitiesTab = ({ customerName: customerNameVal }) => {
  cy.log('Navigating to Opportunities tab');
  searchCustomer({ customerName: customerNameVal });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickFirstElementIn({ locator: crmOpportunitiesPage.tabCrmCustomer });
  genericUtils.verifyTextContains({ locator: crmOpportunitiesPage.tblOppTitle, containsText: crmOpportunitiesData.staticData.tblTitle });
};

export const navigateToContactsTab = ({ customerName: customerNameVal }) => {
  cy.log('Navigating to Contacts tab');
  searchCustomer({ customerName: customerNameVal });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmV2Customer });
  genericUtils.verifyTextContains({ locator: '[data-table-title="Contacts-table"] ', containsText: crmContactsData.staticData.contactTitle });
};

export const validateCreatedOpportunity = ({
  locator: tableFirstRowData,
  oppNameValue: tabledocumentName,
  oppStageValue: stageOption,
  oppTypeValue: typeOption,
  oppReps: repOpp,
  oppStatus: opportunityStatus,
}) => {
  genericUtils.verifyTableRowElementText({ locator: tableFirstRowData, index: 1, verifyText: tabledocumentName });
  genericUtils.verifyTableRowElementText({ locator: tableFirstRowData, index: 2, verifyText: stageOption });
  genericUtils.verifyTableRowElementText({ locator: tableFirstRowData, index: 3, verifyText: typeOption });
  genericUtils.verifyTableRowElementText({ locator: tableFirstRowData, index: 12, verifyText: opportunityStatus });
};

export const editOpportunitieName = (opportunityEditName) => {
  genericUtils.clickFirstElementIn({ locator: crmOpportunitiesPage.btnKabob });
  genericUtils.clickFirstElementIn({ locator: crmOpportunitiesPage.btnEditOpportunities });
  genericUtils.clearTextType({ element: crmOpportunitiesPage.txtOpportunityName, typeText: opportunityEditName });
  genericUtils.clickActionWait({ locator: crmOpportunitiesPage.btnSaveOpportunity });
  genericUtils.verifyFirstElementTxt({ locator: crmOpportunitiesPage.lblOpportunityName, verifyText: opportunityEditName });
};

export const addResponsibility = (divisionVal, businessUnit, modeVal, sizeVal, equipmentVal) => {
  cy.get(contactPage.btnResTitle).then(($val) => {
    expect($val).to.contain(crmContactsData.staticData.responsibilityTitle);
  });
  cy.get(contactPage.btnResPlusIcon).eq(2).click();
  genericUtils.dropDownExactClick({ element: contactPage.drpdwnDivision, ddValue: divisionVal });
  genericUtils.dropDownContainsTextClick({ element: contactPage.drpdwnBusinessUnit, typeText: businessUnit, exactText: businessUnit });
  genericUtils.dropDownContainsTextClick({ element: contactPage.drpdwnMode, typeText: modeVal, exactText: modeVal });
  genericUtils.dropDownContainsTextClick({ element: contactPage.drpdwnSize, typeText: sizeVal, exactText: sizeVal });
  genericUtils.dropDownContainsTextClick({ element: contactPage.drpdwnEquipment, typeText: equipmentVal, exactText: equipmentVal });
  genericUtils.waitSometime(commonData.shortWait);
  genericUtils.clickAction({ locator: contactPage.btnAddPhNoSave });
};

export const editResponsibility = (divisionVal, businessUnit, modeVal, sizeVal, equipmentVal) => {
  genericUtils.dropDownExactClick({ element: contactPage.drpdwnDivision, ddValue: divisionVal });
  genericUtils.dropDownContainsTextClick({ element: contactPage.drpdwnBusinessUnit, typeText: businessUnit, exactText: businessUnit });
  genericUtils.dropDownContainsTextClick({ element: contactPage.drpdwnMode, typeText: modeVal, exactText: modeVal });
  genericUtils.dropDownContainsTextClick({ element: contactPage.drpdwnSize, typeText: sizeVal, exactText: sizeVal });
  genericUtils.dropDownContainsTextClick({ element: contactPage.drpdwnEquipment, typeText: equipmentVal, exactText: equipmentVal });
  genericUtils.waitSometime(commonData.shortWait);
  genericUtils.clickAction({ locator: contactPage.btnAddPhNoSave });
};

export const customizeResponsibility = () => {
  genericUtils.clickVisibleElement({ locator: contactPage.btnContCarrot });
  genericUtils.clickVisibleElement({ locator: contactPage.btnContCustomize });
  genericUtils.clickAction({ locator: contactPage.eyeIconCreateBy });
  genericUtils.clickAction({ locator: contactPage.eyeIconCreateDate });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnCustomizeApply });
};

export const verifyResponsibility = () => {
  cy.get(contactPage.colResponsibilityCreatedBy).each((value) => {
    expect(value.text()).to.eq(crmPortfolioData.expectedData.userNameVal);
  });
};

export const responsibilityKabobMenu = () => {
  genericUtils.clickAction({ locator: contactPage.responsibilityKabob });
  genericUtils.clickVisibleElement({ locator: contactPage.btnContEdit });
};

export const deleteResponsibility = () => {
  genericUtils.clickAction({ locator: contactPage.responsibilityKabob });
  genericUtils.clickVisibleElement({ locator: contactPage.btnResponsibilityDelete });
  genericUtils.verifyConfirmAlertMessage({ msgToVerify: crmContactsData.staticData.alertMsgForDelete });
  genericUtils.clickOkOnWindowAlertConfirm();
};
/**
 * This function is use to add notes for customer & carrier
 *  with Oportunity name , Contact
 * @param {*} param0
 */
export const addNotesWithAllFields = ({ contactName: notesContactName, randomName: randomOpportunityName }) => {
  genericUtils.clickAction({ locator: crmNotesPage.btnNotesPlus });
  genericUtils.selectItemFromDropDown({ element: crmNotesPage.typeDropDown, ddValue: typeDropDownValue });
  genericUtils.waitSometime(shortWait);
  genericUtils.dropDownContainsValueCheckBoxSelection({ element: crmNotesPage.opportunitiesDropDown, ddValue: randomOpportunityName });
  genericUtils.waitSometime(shortWait);
  genericUtils.dropDownContainsValueCheckBoxSelection({ element: crmDocumentsPage.btnContactDropDwn, ddValue: notesContactName });
  genericUtils.typeText({ locator: crmNotesPage.txtFieldAddNotes + ' p', dataText: txtFieldNotesValue });
  genericUtils.clickVisibleElement({ locator: crmNotesPage.btnAddNotesCust });
  genericUtils.waitSometime(shortWait);
};
/**
 * This function is use to select a row from Opportunity table
 * @param {*} opportunityName
 */
export const userClicksOnOpportunityRow = (opportunityName) => {
  cy.get(commonPage.tblOpportunitiesTable)
    .find(commonPage.tblRows)
    .find('[data-cellheader="Name"]')
    .then(($rows) => {
      for (let i = 0; i <= $rows.length - 1; i++) {
        cy.get($rows[i])
          .invoke('text')
          .then(($opporTunityName) => {
            if ($opporTunityName.includes(opportunityName)) {
              cy.get($rows[i]).parent().click({ force: true });
              cy.get($rows[i]).parent().should('have.css', 'box-shadow', 'rgb(15, 112, 231) 0px 0px 0px 1px inset');
            }
          });
      }
    });
};
/**
 * This function is use to verify highliting the intreaction, contacts, notes and documents record
 * when user  a row from Opportunity table
 * @param {*} opportunityName
 */
export const verifyAutoHighlitingOfRecords = (opportunityName) => {
  //Row highlight in Contacts section
  cy.get(commonPage.tblContactsTable)
    .find(commonPage.tblRows).first()
    .should('have.css', 'box-shadow', 'rgb(15, 112, 231) 0px 0px 0px 1px inset');
  cy.get(commonPage.tblInteractionsTable)
    .find(commonPage.tblRows)
    .find('[data-cellheader="Opportunity"]')
    .then(($rows) => {
      for (let i = 0; i < $rows.length; i++) {
        cy.get($rows[i])
          .invoke('text')
          .then(($opporTunityName) => {
            if ($opporTunityName.includes(opportunityName)) {
              cy.get($rows[i]).parent().should('have.css', 'box-shadow', 'rgb(15, 112, 231) 0px 0px 0px 1px inset');
            }
          });
      }
    });
  //Row highlight in Notes section
  genericUtils.clickAction({ locator: crmNotesPage.tabNotes });
  cy.get(commonPage.tblNotesTable)
    .find(commonPage.tblRows)
    .find('[data-cellheader="Opportunity"]')
    .then(($rows) => {
      for (let i = 0; i < $rows.length; i++) {
        cy.get($rows[i])
          .invoke('text')
          .then(($opporTunityName) => {
            if ($opporTunityName.includes(opportunityName)) {
              cy.get($rows[i]).parent().should('have.css', 'box-shadow', 'rgb(15, 112, 231) 0px 0px 0px 1px inset');
            }
          });
      }
    });
  //Row highlight in Documents section
  genericUtils.clickAction({ locator: crmNotesPage.tabDocuments });
  cy.get(commonPage.tblDocumentsTable)
    .find(commonPage.tblRows).first()
    .should('have.css', 'box-shadow', 'rgb(15, 112, 231) 0px 0px 0px 1px inset');
};

export const addPhoneEmailViaAssociateEntity = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnAssociateEntityPlusIcon });
  genericUtils.dropDownExactClick({ element: contactPage.drpdwnEntityType, ddValue: crmContactsData.staticData.existCntCusTabEntityTypeVal });
  genericUtils.typeDropDwnClick({ locator: contactPage.drpdwnEntity, drpDwnVal: crmContactsData.userDefinedData.associateEntity });
  genericUtils.dropDownContainsTextClick({ element: contactPage.drpdwnAddPhone, typeText: crmContactsData.staticData.contactAddPhone, exactText: crmContactsData.staticData.contactAddPhone });
  genericUtils.typeText({ locator: contactPage.txtPhoneEmailInput, dataText: crmContactsData.staticData.newContactTabPhoneVal });
  genericUtils.clickAction({ locator: contactPage.btnSavePhone });
  genericUtils.verifyAttrText({ locator: contactPage.drpdwnAddPhone, attribute: crmContactsData.staticData.interactionsTitleAttr, verifyText: crmContactsData.staticData.validatePhoneNo });
  genericUtils.dropDownContainsTextClick({ element: contactPage.drpdwnAddEmail, typeText: crmContactsData.staticData.contactAddEmail, exactText: crmContactsData.staticData.contactAddEmail });
  genericUtils.typeText({ locator: contactPage.txtPhoneEmailInput, dataText: crmContactsData.staticData.emailId });
  genericUtils.clickAction({ locator: contactPage.btnSaveEmail });
  genericUtils.verifyAttrText({ locator: contactPage.txtPhoneEmail, attribute: crmContactsData.staticData.interactionsTitleAttr, verifyText: crmContactsData.staticData.validateEmail });
  genericUtils.clickAction({ locator: contactPage.btnSaveEditAssociatedEntity });
};

export const contactsKabobMenu = () => {
  genericUtils.clickAction({ locator: contactPage.contKabobMenu });
  genericUtils.navigateToChildWindow();
  genericUtils.clickVisibleElement({ locator: contactPage.btnContEdit });
};

export const verifyPhoneAndEmail = () => {
  genericUtils.verifyAttrText({ locator: contactPage.colPhone, attribute: crmContactsData.staticData.interactionsTitleAttr, verifyText: crmContactsData.staticData.colPhoneNo });
  genericUtils.clickAction({ locator: contactPage.tabEmail });
  genericUtils.verifyAttrText({ locator: contactPage.colEmail, attribute: crmContactsData.staticData.interactionsTitleAttr, verifyText: crmContactsData.staticData.emailId });
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

export const openChatAction = ({ action: actionName }) => {
  cy.get(contactPage.chatTable).find(commonPage.tblRows)
    .find(commonPage.btnKabobMenu)
    .first().click({ force: true });
  cy.get(commonPage.lstContextMenuOptions).filter(':visible').contains(actionName).click({ force: true });
};

export const addAssociatedEntityWithCustomerEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnAssociateEntityPlusIcon });
  genericUtils.dropDownExactClick({ element: contactPage.drpdwnEntityType, ddValue: crmContactsData.staticData.existCntCusTabEntityTypeVal });
  genericUtils.waitSometime(shortWait);
  genericUtils.selectItemFromDropDownByTyping({ locator: contactPage.drpdwnEntity, drpDwnVal: crmContactsData.userDefinedData.customerEntityType });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAddAssociatedEntity });
};

export const addAssociatedEntityWithCarrierEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnAssociateEntityPlusIcon });
  genericUtils.dropDownExactClick({ element: contactPage.drpdwnEntityType, ddValue: crmContactsData.staticData.existCntCarTabEntityTypeVal });
  genericUtils.waitSometime(shortWait);
  genericUtils.selectItemFromDropDownByTyping({ locator: contactPage.drpdwnCarrierEntity, drpDwnVal: crmContactsData.userDefinedData.carrierEntityType });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAddAssociatedEntity });
};

export const addAssociatedEntityWithFacilityEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnAssociateEntityPlusIcon });
  genericUtils.dropDownExactClick({ element: contactPage.drpdwnEntityType, ddValue: crmContactsData.staticData.existCntFacTabEntityTypeVal });
  genericUtils.waitSometime(shortWait);
  genericUtils.selectItemFromDropDownByTyping({ locator: contactPage.drpdwnFacilityEntity, drpDwnVal: crmContactsData.userDefinedData.facilityEntityType });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveAddAssociatedEntity });
};

export const editAssociatedEntityWithCustomerEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerKabob });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerEdit });
  genericUtils.dropDownExactCheckBoxSelection({ element: contactPage.drpdwnFunction, ddValue: crmContactsData.userDefinedData.functionDrpdwnVal1 });
  genericUtils.waitSometime(shortWait);
  genericUtils.dropDownContainsValueCheckBoxSelection({ element: contactPage.drpdwnFunction, ddValue: crmContactsData.userDefinedData.functionDrpdwnVal2 });
  genericUtils.clickAction({ locator: contactPage.btnSaveEditAssociatedEntity });
};

export const editAssociatedEntityWithCarrierEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerKabob });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerEdit });
  genericUtils.typeText({ locator: contactPage.txtDetails, dataText: crmContactsData.userDefinedData.txtDetails });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveEditAssociatedEntity });
};

export const editAssociatedEntityWithFacilityEntityType = () => {
  genericUtils.clickAction({ locator: contactPage.tabAssociateEntity });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerKabob });
  genericUtils.clickAction({ locator: contactPage.btnContactEntityTypeCustomerEdit });
  genericUtils.selectItemFromDropDownByTyping({ locator: contactPage.drpdwnExtSystemUser, drpDwnVal: crmContactsData.userDefinedData.ExtSystemUser });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: contactPage.btnSaveEditAssociatedEntity });
};