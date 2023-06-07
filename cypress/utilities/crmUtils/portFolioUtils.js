import * as commonPage from '../../pageObjects/commonPage/commonPage.json';
import * as crmInteractionsPage from '../../pageObjects/crm/crmPage/crmInteractionsPage.json';
import crmNotesPage from '../../pageObjects/crm/crmPage/crmNotesPage.json';
import * as crmPortFolioPage from '../../pageObjects/crm/crmPage/crmPortFolioPage.json';
import * as crmOpportunitiesPage from '../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import opportunityPage from '../../pageObjects/crm/opportunityPage/opportunityPage.json';
import crmInteractionData from '../../testData/crm/crmData/crmInteractionsData.json';
import crmOpportunitiesData from '../../testData/crm/crmData/crmOpportunitesData.json';
import crmPortfolioData from '../../testData/crm/crmData/crmPortfolioData.json';
import commonData from '../../testData/staticData/commonData/commonData.json';
import { returntodayDateMMDDYY } from '../commonUtils/dateTimeUtils';
import * as genericUtils from '../commonUtils/genericUtils';
const { btnNotesExpandViewClose } = crmNotesPage;
const { moreWait, shortWait, longWait } = commonData;
const {
  opportunityTitleAttr,
  validateAge,
  validateAwardDate,
  validateBusinessUnitText,
  validateCloseReasonCol,
  validateContactCol,
  validateCreatedBy,
  validateCreatedDateTime,
  validateDivisionText,
  validateDueDate,
  validateEquipmentCol,
  validateGoLive,
  validateModeCol,
  validateNameText,
  validatePricingStratCol,
  validateProjMargin,
  validateProjRev,
  validateProjVal,
  validateRepcol,
  validateRevisit,
  validateSizeCol,
  validateSolutionCol,
  validateSolutionTypeCol,
  validateSourceCol,
  validateStageText,
  validateStatus,
  validateTotalRev,
  validateTotalVol,
  validateTypeText,
  validateUpdatedBy,
  validateUpdatedDateTime,
} = crmOpportunitiesData.staticData;
const {
  back,
  entityName1,
  entityName2,
  entityTypeCarrier,
  entityTypeCustomer,
  interactionCusLogObj,
  interactionCusLogType,
  interactionLogOutCome,
  interactionLogType,
  interactionLogVia,
  durationNegativeValue,
  durationAlphabets,
  locationVal,
  customerCrmInteractionDisableFF,
  customerCrmInteractionEditsDisableFF,
  carrierCrmInteractionDisableFF,
  carrierCrmInteractionEditsDisableFF,
  interactionsTblCustomizeColHeadersAllAfterRearrange,
  interactionsTitleAttr,
  interactionTableColumnHeaders,
  mulEntityNameVal,
  validateAssignedToColumn,
  validateCompletedByColumn,
  validateCompletedDateColumn,
  validateCompletedTimeColumn,
  validateContactsColumn,
  validateCreatedByColumn,
  validateCreatedDateColumn,
  validateCreatedTimeColumn,
  validateDetailsColumn,
  validateDocumentsColumn,
  validateEntityNameColumn,
  validateEntityTypeColumn,
  validateObjectiveColumn,
  validateOpportunityColumn,
  validateOriginalDateColumn,
  validateOriginalTimeColumn,
  validateOutcomeColumn,
  validateRescheduledColumn,
  validateScheduledDateColumn,
  validateScheduledTimeColumn,
  validateStatusColumn,
  validateTypeColumn,
  validateUpdatedByColumn,
  validateUpdatedDateColumn,
  validateUpdatedTimeColumn,
  validateViaColumn,
  attrRole,
  attrStyle,
  achFormDocType,
  durationVal481,
  durationFieldLabel,
} = crmInteractionData.staticData;

const {
  entityNameVal,
  entityTypeVal,
  labelName,
  oppAge,
  oppBusinessUnit,
  oppDivision,
  oppDueDate,
  oppName,
  opportunitiesType,
  opportunityClosedStg,
  opportunityConfirmMsg,
  opportunityHoldStg,
  opportunityName,
  opportunityOpenStg,
  oppProjRev,
  oppProjVol,
  oppStage,
  oppStatus,
  oppStatusVal,
  oppType,
  oppUpdatedBy,
  oppUpdatedDate,
  statusLabel,
} = crmPortfolioData.expectedData;
const {
  modeCust,
  projectedMarginVal,
  projectedRevenueVal,
  projectedVolumeVal,
  totalOpportunityRevenueVal,
  totalOpportunityVolumeVal,
  entityTypeCust,
  entityTypeCarr,
} = crmPortfolioData.userDefinedData;
const {
  textBoxType,
  overFlowType,
} = crmInteractionData.userDefinedData;
const {
  txtOpportunityName,
} = opportunityPage;
const {
  angleDown,
  angleUp,
  dataIconAttr,
  titleAttrVal,
} = crmPortfolioData.staticData;
let msgs;

export const columnHeaders = [
  crmOpportunitiesPage.customiseContacts,
  crmOpportunitiesPage.customiseDetails,
  crmOpportunitiesPage.customiseEquipment,
  crmOpportunitiesPage.customisePricingStrat,
  crmOpportunitiesPage.customiseSolution,
  crmOpportunitiesPage.customiseSource,
  crmOpportunitiesPage.customiseAwardDate,
  crmOpportunitiesPage.customiseCloseReason,
  crmOpportunitiesPage.customiseProjMargin,
  crmOpportunitiesPage.customiseGoLive,
  crmOpportunitiesPage.customiseMode,
  crmOpportunitiesPage.customiseCreatedDateTime,
  crmOpportunitiesPage.customiseReps,
  crmOpportunitiesPage.customiseCreatedBy,
  crmOpportunitiesPage.customiseRevisit,
  crmOpportunitiesPage.customiseSolutionType,
  crmOpportunitiesPage.customiseSize,
  crmOpportunitiesPage.customiseTotRev,
  crmOpportunitiesPage.customiseTotVol,
];

export const navigateToPorFolioOpportunitiesTab = () => {
  cy.intercept('POST', '/?q=PortfolioOpportunitiesByReps').as('getOpportunities');
  genericUtils.verifyExists({ element: crmInteractionsPage.logo });
  genericUtils.clickAction({ locator: crmInteractionsPage.logo });
  genericUtils.verifyExists({ element: crmInteractionsPage.tabPortFolio });
  genericUtils.clickAction({ locator: crmInteractionsPage.tabPortFolio });
  genericUtils.verifyExists({ element: crmPortFolioPage.tabOpportunities });
  genericUtils.clickAction({ locator: crmPortFolioPage.tabOpportunities });
};

export const createOpportunitiesWMadatoryFieldsCC = (opportunityName, opportunitiesType, opportunityStg, ccType) => {
  if (ccType === modeCust) {
    genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
  } else {
    genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
  }
  genericUtils.clickActionWait({ locator: crmPortFolioPage.btnAddOpportunities });
  genericUtils.clearTextType({ element: txtOpportunityName, typeText: opportunityName });
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunityStg, typeText: opportunityStg, exactText: opportunityStg }));
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunitiesType, typeText: opportunitiesType, exactText: opportunitiesType }));
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveOpportunity });
  genericUtils.verifyFirstElementTxt({ locator: crmPortFolioPage.lblConfirmMsg, verifyText: opportunityConfirmMsg });
};

export const createOpportunitiesWMadatoryFieldsCCExp = (opportunityName, opportunitiesType, opportunityStg, ccType) => {
  if (ccType === modeCust) {
    genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
  } else {
    genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
  }
  genericUtils.clickAction({ locator: crmPortFolioPage.btnOppCarrot });
  genericUtils.clickVisibleElement({ locator: crmPortFolioPage.btnOppExpandList });
  genericUtils.clickVisibleElement({ locator: crmPortFolioPage.btnOppPlus });
  genericUtils.clearTextType({ element: txtOpportunityName, typeText: opportunityName });
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunityStg, typeText: opportunityStg, exactText: opportunityStg }));
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunitiesType, typeText: opportunitiesType, exactText: opportunitiesType }));
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveOpportunity });
  genericUtils.verifyFirstElementTxt({ locator: crmPortFolioPage.lblConfirmMsg, verifyText: opportunityConfirmMsg });
};

export const createOppoWMadatoryFieldsCCExpSec = (opportunityName, opportunitiesType, opportunityStg) => {
  genericUtils.clickVisibleElement({ locator: crmPortFolioPage.btnOppPlus });
  genericUtils.clearTextType({ element: txtOpportunityName, typeText: opportunityName });
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunityStg, typeText: opportunityStg, exactText: opportunityStg }));
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunitiesType, typeText: opportunitiesType, exactText: opportunitiesType }));
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveOpportunity });
  genericUtils.verifyFirstElementTxt({ locator: crmPortFolioPage.lblConfirmMsg, verifyText: opportunityConfirmMsg });
};

export const createOpporWithDateTotProjFields = (opportunityName, opportunitiesType, opportunityStg) => {
  genericUtils.clickActionWait({ locator: crmPortFolioPage.btnAddOpportunities });
  genericUtils.clearTextType({ element: txtOpportunityName, typeText: opportunityName });
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunityStg, typeText: opportunityStg, exactText: opportunityStg }));
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunitiesType, typeText: opportunitiesType, exactText: opportunitiesType }));
  genericUtils.typeText({ locator: crmPortFolioPage.txtOpportunityVolume, dataText: totalOpportunityVolumeVal });
  genericUtils.typeText({ locator: crmPortFolioPage.txtOpportunityRevenue, dataText: totalOpportunityRevenueVal });
  genericUtils.typeText({ locator: crmPortFolioPage.txtProjectedVolume, dataText: projectedVolumeVal });
  genericUtils.typeText({ locator: crmPortFolioPage.txtProjectedRevenue, dataText: projectedRevenueVal });
  genericUtils.typeText({ locator: crmPortFolioPage.txtProjectedMargin, dataText: projectedMarginVal });
  genericUtils.typeDate({ locator: crmPortFolioPage.txtOpportunityDueDate, validDate: returntodayDateMMDDYY() });
  genericUtils.typeDate({ locator: crmPortFolioPage.txtOpportunityAwardDate, validDate: returntodayDateMMDDYY() });
  genericUtils.typeDate({ locator: crmPortFolioPage.txtOpportunityGoLiveDate, validDate: returntodayDateMMDDYY() });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveOpportunity });
  genericUtils.verifyFirstElementTxt({ locator: crmPortFolioPage.lblConfirmMsg, verifyText: opportunityConfirmMsg });
};

export const createOpporWithDateTotProjFieldsExp = (opportunityName, opportunitiesType, opportunityStg) => {
  genericUtils.clickAction({ locator: crmPortFolioPage.btnOppCarrot });
  genericUtils.clickVisibleElement({ locator: crmPortFolioPage.btnOppExpandList });
  genericUtils.clickVisibleElement({ locator: crmPortFolioPage.btnOppPlus });
  genericUtils.clearTextType({ element: txtOpportunityName, typeText: opportunityName });
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunityStg, typeText: opportunityStg, exactText: opportunityStg }));
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunitiesType, typeText: opportunitiesType, exactText: opportunitiesType }));
  genericUtils.typeText({ locator: crmPortFolioPage.txtOpportunityVolume, dataText: totalOpportunityVolumeVal });
  genericUtils.typeText({ locator: crmPortFolioPage.txtOpportunityRevenue, dataText: totalOpportunityRevenueVal });
  genericUtils.typeText({ locator: crmPortFolioPage.txtProjectedVolume, dataText: projectedVolumeVal });
  genericUtils.typeText({ locator: crmPortFolioPage.txtProjectedRevenue, dataText: projectedRevenueVal });
  genericUtils.typeText({ locator: crmPortFolioPage.txtProjectedMargin, dataText: projectedMarginVal });
  genericUtils.typeDate({ locator: crmPortFolioPage.txtOpportunityDueDate, validDate: returntodayDateMMDDYY() });
  genericUtils.typeDate({ locator: crmPortFolioPage.txtOpportunityAwardDate, validDate: returntodayDateMMDDYY() });
  genericUtils.typeDate({ locator: crmPortFolioPage.txtOpportunityGoLiveDate, validDate: returntodayDateMMDDYY() });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveOpportunity });
  genericUtils.verifyFirstElementTxt({ locator: crmPortFolioPage.lblConfirmMsg, verifyText: opportunityConfirmMsg });
};

export const verifyColumnsInOpportunitiesTab = () => {
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppNameColumn, attribute: titleAttrVal, verifyText: oppName });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppStageColumn, attribute: titleAttrVal, verifyText: oppStage });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppTypeColumn, attribute: titleAttrVal, verifyText: oppType });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppDivisionColumn, attribute: titleAttrVal, verifyText: oppDivision });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppBusinessUnitColumn, attribute: titleAttrVal, verifyText: oppBusinessUnit });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppProjectedVolumeColumn, attribute: titleAttrVal, verifyText: oppProjVol });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppProjectedRevColumn, attribute: titleAttrVal, verifyText: oppProjRev });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppAgeColumn, attribute: titleAttrVal, verifyText: oppAge });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppDueDateColumn, attribute: titleAttrVal, verifyText: oppDueDate });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppUpdatedByColumn, attribute: titleAttrVal, verifyText: oppUpdatedBy });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppUpdatedAtColumn, attribute: titleAttrVal, verifyText: oppUpdatedDate });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppStatusColumn, attribute: titleAttrVal, verifyText: oppStatus });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.drpDownOppStatus, attribute: titleAttrVal, verifyText: oppStatusVal });
};

export const verifyColumnsInOpportunitiesTabExp = () => {
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppNameColumnExpView, attribute: titleAttrVal, verifyText: oppName });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppStageColumnExpView, attribute: titleAttrVal, verifyText: oppStage });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppTypeColumnExpView, attribute: titleAttrVal, verifyText: oppType });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppDivisionColumnExpView, attribute: titleAttrVal, verifyText: oppDivision });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppBusinessUnitColumnExpView, attribute: titleAttrVal, verifyText: oppBusinessUnit });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppProjectedVolumeColumnExpView, attribute: titleAttrVal, verifyText: oppProjVol });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppProjectedRevColumnExpView, attribute: titleAttrVal, verifyText: oppProjRev });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppAgeColumnExpView, attribute: titleAttrVal, verifyText: oppAge });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppDueDateColumnExpView, attribute: titleAttrVal, verifyText: oppDueDate });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppUpdatedByColumnExpView, attribute: titleAttrVal, verifyText: oppUpdatedBy });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppUpdatedAtColumnExpView, attribute: titleAttrVal, verifyText: oppUpdatedDate });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.oppStatusColumnExpView, attribute: titleAttrVal, verifyText: oppStatus });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.drpDownOppStatus, attribute: titleAttrVal, verifyText: oppStatusVal });
};

export const verifyOppEntityNameandType = () => {
  navigateToPorFolioOpportunitiesTab();
  genericUtils.verifyExists({ element: crmPortFolioPage.portfilioEntityType });
  genericUtils.verifyExists({ element: crmPortFolioPage.portfilioEntityName });
  genericUtils.verifyText({ locator: crmPortFolioPage.portfilioEntityType, verifyText: entityTypeVal });
  genericUtils.verifyText({ locator: crmPortFolioPage.portfilioEntityName, verifyText: entityNameVal });
};

export const createOpportunity = ({ element: entityType }) => {
  const nameOpportunity = opportunityName;
  createOpportunitiesWMadatoryFieldsCC(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityOpenStg, entityType);
  createOpportunitiesWMadatoryFieldsCC(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityClosedStg, entityType);
  createOpportunitiesWMadatoryFieldsCC(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityHoldStg, entityType);
};

export const createOpportunityExp = ({ element: entityType }) => {
  const nameOpportunity = opportunityName;
  createOpportunitiesWMadatoryFieldsCCExp(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityOpenStg, entityType);
  createOppoWMadatoryFieldsCCExpSec(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityClosedStg);
  createOppoWMadatoryFieldsCCExpSec(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityHoldStg);
};

export const {
  opportunitiesTableColumnHeaders,
  opportunitiesTblCustomizeHeadersAfterRearrange,
} = crmOpportunitiesData.staticData;

let texts;
export const verifyDefaultTabSelecion = () => {
  genericUtils.verifyExists({ element: crmInteractionsPage.logo });
  genericUtils.clickAction({ locator: crmInteractionsPage.logo });
  genericUtils.verifyExists({ element: crmInteractionsPage.tabPortFolio });
  genericUtils.clickAction({ locator: crmInteractionsPage.tabPortFolio });
  cy.get(crmInteractionsPage.tabPortFolio).should('have.css', 'color', 'rgb(15, 112, 231)');
};
/**
 * This fucntion is to use navigate Interactions tab on Portfolio page
 */
export const navigateToPortfolioInteractionsTab = () => {
  cy.intercept('POST', '/?q=portfolioInteractionsByReps').as('getInteractions');
  genericUtils.verifyExists({ element: crmInteractionsPage.logo });
  genericUtils.clickAction({ locator: crmInteractionsPage.logo });
  genericUtils.verifyExists({ element: crmInteractionsPage.tabPortFolio });
  genericUtils.clickAction({ locator: crmInteractionsPage.tabPortFolio });
  genericUtils.verifyExists({ element: crmInteractionsPage.tabInteractions });
  genericUtils.clickAction({ locator: crmInteractionsPage.tabInteractions });
};

export const createOpportunitiesWithMandatoryFields = (opportunityName, opportunitiesType, opportunityStg) => {
  genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
  genericUtils.clickActionWait({ locator: crmPortFolioPage.btnAddOpportunities });
  genericUtils.clearTextType({ element: txtOpportunityName, typeText: opportunityName });
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunityStg, typeText: opportunityStg, exactText: opportunityStg }));
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunitiesType, typeText: opportunitiesType, exactText: opportunitiesType }));
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveOpportunity });
  genericUtils.verifyFirstElementTxt({ locator: crmPortFolioPage.lblConfirmMsg, verifyText: opportunityConfirmMsg });
};

export const editOpportunitiesFields = (opportunityEditName) => {
  genericUtils.selectKabobMenuOptionTable({ locator: commonPage.tblOpportunitiesTable, menuName: 'Edit' });
  genericUtils.clearTextType({ element: txtOpportunityName, typeText: opportunityEditName });
  genericUtils.clickActionWait({ locator: crmPortFolioPage.btnSaveOpportunity });
  genericUtils.verifyFirstElementTxt({ locator: commonPage.tblOpportunitiesTable + ' ' + crmPortFolioPage.lblOpportunityName, verifyText: opportunityEditName });
};

export const verifyOpportunitiesStatus = (statusVal) => {
  genericUtils.verifyElementText({ locator: crmPortFolioPage.lblOpportunityStatus, verifyText: statusLabel });
  selectOpportunitiesStatusType(statusVal);
  //genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpPortfolioStatus, typeText: statusVal, exactText: statusVal }));
  genericUtils.verifyFirstElementContinsTxt({ locator: crmPortFolioPage.lblStatus, verifyText: statusVal });
};

export const verifyInteractionsTab = () => {
  genericUtils.scrollToRight();
  genericUtils.verifyVisible({ element: crmPortFolioPage.interactionstab });
  genericUtils.clickAction({ locator: crmPortFolioPage.interactionstab });
};

export const verifyInteractionsTabStatusSheduled = () => {
  genericUtils.scrollToRight();
  genericUtils.verifyVisible({ element: crmPortFolioPage.btnStatusSheduled });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnStatusSheduled });
};

export const verifyCustomizeTable = () => {
  cy.scrollTo('1000px');
  genericUtils.scrollToRight();
  genericUtils.verifyVisible({ element: crmPortFolioPage.btnKabobOpportunitiesCustomize });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnKabobOpportunitiesCustomize });
  genericUtils.verifyVisible({ element: crmPortFolioPage.lblCustomize });
  genericUtils.clickAction({ locator: crmPortFolioPage.lblCustomize });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnEntityNameEye });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEntityNameEye });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnEntityTypeEye });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEntityTypeEye });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnAgeEye });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnAgeEye });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnOBRegionEye });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnOBRegionEye });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnIBRegionEye });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnIBRegionEye });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnStageEye });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnStageEye });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSizeEye });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnSizeEye });
  //VerifybtnModeEye
  genericUtils.clickAction({ locator: crmPortFolioPage.btnModeEye });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnModeEye });
  //VerifybtnRepsEye
  genericUtils.clickAction({ locator: crmPortFolioPage.btnRepsEye });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnRepsEye });
  //VerifybtnTotalVolumeEye'
  genericUtils.clickAction({ locator: crmPortFolioPage.btnTotalVolumeEye });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnTotalVolumeEye });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveCustomizeTable });
};

export const verifyNotExistsCellCustomizeTable = () => {
  genericUtils.verifyLastElementNotTxt({ locator: crmPortFolioPage.cellOpportunitiesName, verifyText: labelName });
};

export const verifyExistsCellCustomizeTable = () => {
  genericUtils.verifyLastElementTxt({ locator: crmPortFolioPage.cellOpportunitiesName, verifyText: labelName });
};

export const verifySearchByRep = (textval, text) => {
  genericUtils.verifyTxtInTextBox({ locator: crmPortFolioPage.drpSearchByRep, verifyText: textval });
  genericUtils.clearTextType(({ element: crmPortFolioPage.txtuserSearch, typeText: text }));
  genericUtils.verifyTxtInTextBox({ locator: crmPortFolioPage.drpSearchByRep, verifyText: text });
};

export const verifyResetToDefaultCustomizeTable = () => {
  cy.scrollTo('1000px');
  genericUtils.verifyVisible({ element: crmPortFolioPage.btnKabobOpportunitiesCustomize });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnKabobOpportunitiesCustomize });
  genericUtils.verifyVisible({ element: crmPortFolioPage.lblCustomize });
  genericUtils.clickAction({ locator: crmPortFolioPage.lblCustomize });
  genericUtils.verifyIfEnabled({ locator: crmPortFolioPage.btnResetToDefaultCustomize });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnResetToDefaultCustomize });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveCustomizeTable });
};

export const verifyCustomizeInteractionAndDrgAndDwp = () => {
  genericUtils.verifyTableColumnsHeaders({ locator: crmInteractionsPage.tblCustomizeHeader, columnNames: interactionTableColumnHeaders });
  cy.log('***Switch the show option \'Off\' of any column***');
  genericUtils.verifyVisible({ element: crmInteractionsPage.eyeIconVisible });
  genericUtils.clickAction({ locator: crmInteractionsPage.eyeIconVisible });
  genericUtils.verifyVisible({ element: crmInteractionsPage.eyeIconNotVisible });
  cy.log('***Switch the show option \'On\' of any column***');
  genericUtils.clickAction({ locator: crmInteractionsPage.eyeIconNotVisible });
  genericUtils.verifyVisible({ element: crmInteractionsPage.eyeIconVisible });
  cy.log('***Verify drag a column to a new location***');
  genericUtils.dragAndDrop({ draggedElement: crmInteractionsPage.customizeStatusDragItem, stationaryElement: crmInteractionsPage.customizeTypeDragItem, refElement: crmInteractionsPage.customizeTable });
  genericUtils.verifyTableColumnsHeaders({ locator: crmInteractionsPage.tblCustomizeHeader, columnNames: interactionsTblCustomizeColHeadersAllAfterRearrange });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnCustomizeResetToDefaults });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnCustomizeApply });
};

export const verifyCustomizeOpportunityDragAndDrop = () => {
  genericUtils.clickAction({ locator: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.clickVisibleElement({ locator: crmInteractionsPage.btnCustomize });
  cy.log('***Switch the show option \'Off\' of any column***');
  genericUtils.verifyVisible({ element: crmInteractionsPage.eyeIconVisible });
  genericUtils.clickAction({ locator: crmInteractionsPage.eyeIconVisible });
  genericUtils.verifyVisible({ element: crmInteractionsPage.eyeIconNotVisible });
  cy.log('***Switch the show option \'On\' of any column***');
  genericUtils.clickAction({ locator: crmInteractionsPage.eyeIconNotVisible });
  genericUtils.verifyVisible({ element: crmInteractionsPage.eyeIconVisible });
  cy.log('***Verify drag a column to a new location***');
  genericUtils.dragAndDrop({ draggedElement: crmOpportunitiesPage.customizeProjVolDragItem, stationaryElement: crmInteractionsPage.customizeTypeDragItem, refElement: crmInteractionsPage.customizeTable });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnCustomizeApply });
};

export const verifyCustomizeOpportunity = () => {
  genericUtils.clickAction({ locator: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.clickVisibleElement({ locator: crmInteractionsPage.btnCustomize });
  columnHeaders.forEach((value) => {
    genericUtils.clickAction({ locator: value });
  });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnCustomizeApply });
};

export const verifyNumberOfRows = () => {
  cy.get(crmPortFolioPage.rowList).then((row) => {
    cy.log(row.length);
  });
};

export const verifyAngleIcon = () => {
  cy.get(crmPortFolioPage.angleIcon).then(($input) => {
    cy.log($input.attr(dataIconAttr));
  });
};

export const verifySortColumn = () => {
  cy.log('***sort column in ascending order***');
  cy.get(crmPortFolioPage.colNameOrder).click({ force: true }).wait(shortWait)
    .next()
    .find(angleUp).should('exist');
  genericUtils.waitSometime(shortWait);
  cy.log('***To check the angle Up/Down do not change when clicked expand or collapse icon***');
  genericUtils.clickAction({ locator: crmPortFolioPage.expandIcon });
  cy.get(crmPortFolioPage.NameAngle).then(($input) => {
    cy.log($input.attr(dataIconAttr));
  });
  genericUtils.waitSometime(shortWait);
  cy.log('***sort column in descending order***');
  cy.get(crmPortFolioPage.colNameOrder).click({ force: true }).wait(shortWait)
    .next()
    .find(angleDown).should('exist');
  genericUtils.clickAction({ locator: crmPortFolioPage.expandIcon });
  cy.get(crmPortFolioPage.NameAngle).then(($input) => {
    cy.log($input.attr(dataIconAttr));
  });
};

export const verifyColumnResize = () => {
  genericUtils.resizeElement({ element: crmOpportunitiesPage.resizeStageColumn });
  genericUtils.resizeElement({ element: crmOpportunitiesPage.resizeNameColumn });
};
export const carrotButtonClickExpand = () => {
  genericUtils.verifyToExist({ element: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.clickAction({ locator: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.verifyToExist({ element: crmInteractionsPage.btnExpand });
  genericUtils.clickVisibleElement({ locator: crmInteractionsPage.btnExpand });
};

export const verifyLastUpdatedDateTime = () => {
  texts = cy.get(crmInteractionsPage.lastUpdatedDate).each(($els) => {
    cy.log($els.text(), texts);
  });
};

export const navigateToCrmTab = () => {
  genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
};

export const navigateToCustomerCrmV2Tab = () => {
  genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmV2Customer });
};

export const navigateToCarrierCrmV2Tab = () => {
  genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmV2Carrier });
};

export const navigateToPorFolioTab = () => {
  genericUtils.verifyExists({ element: crmInteractionsPage.logo });
  genericUtils.clickAction({ locator: crmInteractionsPage.logo });
  genericUtils.verifyExists({ element: crmInteractionsPage.tabPortFolio });
  genericUtils.clickAction({ locator: crmInteractionsPage.tabPortFolio });
};

export const verifyInteractionsTabFilters = () => {
  genericUtils.verifyExists({ element: crmInteractionsPage.crmInteractionsPage.btnSearch });
  genericUtils.verifyExists({ element: crmInteractionsPage.crmInteractionsPage.btnClearSearch });
  genericUtils.verifyExists({ element: crmInteractionsPage.crmInteractionsPage.boxDate });
  verifyDateFilter();
  genericUtils.verifyToExist({ element: crmInteractionsPage.btnArrowUp });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnArrowUp });
  genericUtils.verifyToExist({ element: crmInteractionsPage.btnArrowDown });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnArrowDown });
};

export const verifyInteractionsKeyTabFilters = () => {
  genericUtils.verifyExists({ element: crmInteractionsPage.btnSearch });
  genericUtils.verifyExists({ element: crmInteractionsPage.btnClearSearch });
  genericUtils.verifyExists({ element: crmInteractionsPage.boxDate });
};

export const verifyInteractionsKabobMenuOptions = () => {
  cy.get('@getInteractions');
  genericUtils.waitSometime(moreWait);
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnOpenIntreaction });
  genericUtils.verifyExists({ element: crmPortFolioPage.btnEditInteraction });
  genericUtils.verifyExists({ element: crmPortFolioPage.btnReassignInteraction });
  genericUtils.verifyExists({ element: crmPortFolioPage.btnViewInteraction });
};

export const verifyColumnsInInteractionsTab = () => {
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.statusCol, attribute: interactionsTitleAttr, verifyText: validateStatusColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.entityTypeCol, attribute: interactionsTitleAttr, verifyText: validateEntityTypeColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.entityNameCol, attribute: interactionsTitleAttr, verifyText: validateEntityNameColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.scheduledDateCol, attribute: interactionsTitleAttr, verifyText: validateScheduledDateColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.scheduledTimeCol, attribute: interactionsTitleAttr, verifyText: validateScheduledTimeColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.objectiveCol, attribute: interactionsTitleAttr, verifyText: validateObjectiveColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.typeCol, attribute: interactionsTitleAttr, verifyText: validateTypeColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.viaCol, attribute: interactionsTitleAttr, verifyText: validateViaColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.detailsCol, attribute: interactionsTitleAttr, verifyText: validateDetailsColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.outComeCol, attribute: interactionsTitleAttr, verifyText: validateOutcomeColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.documentsCol, attribute: interactionsTitleAttr, verifyText: validateDocumentsColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.opportunityCol, attribute: interactionsTitleAttr, verifyText: validateOpportunityColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.contactsCol, attribute: interactionsTitleAttr, verifyText: validateContactsColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.assignedToCol, attribute: interactionsTitleAttr, verifyText: validateAssignedToColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.createdDateCol, attribute: interactionsTitleAttr, verifyText: validateCreatedDateColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.createdTimeCol, attribute: interactionsTitleAttr, verifyText: validateCreatedTimeColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.createdByCol, attribute: interactionsTitleAttr, verifyText: validateCreatedByColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.originalDateCol, attribute: interactionsTitleAttr, verifyText: validateOriginalDateColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.originalTimeCol, attribute: interactionsTitleAttr, verifyText: validateOriginalTimeColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.rescheduledCol, attribute: interactionsTitleAttr, verifyText: validateRescheduledColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.updatedDateCol, attribute: interactionsTitleAttr, verifyText: validateUpdatedDateColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.updatedTimeCol, attribute: interactionsTitleAttr, verifyText: validateUpdatedTimeColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.updatedBy, attribute: interactionsTitleAttr, verifyText: validateUpdatedByColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.completedDateCol, attribute: interactionsTitleAttr, verifyText: validateCompletedDateColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.completedTime, attribute: interactionsTitleAttr, verifyText: validateCompletedTimeColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.completedBy, attribute: interactionsTitleAttr, verifyText: validateCompletedByColumn });
};

export const verifyColumnsInOpportunitytab = () => {
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.nameCol, attribute: opportunityTitleAttr, verifyText: validateNameText });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.entityTypeCol, attribute: opportunityTitleAttr, verifyText: validateEntityTypeColumn });
  genericUtils.verifyAttrText({ locator: crmInteractionsPage.entityNameCol, attribute: opportunityTitleAttr, verifyText: validateEntityNameColumn });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.stageCol, attribute: opportunityTitleAttr, verifyText: validateStageText });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.typecolumn, attribute: opportunityTitleAttr, verifyText: validateTypeText });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.divisionCol, attribute: opportunityTitleAttr, verifyText: validateDivisionText });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colBusinessUnit, attribute: opportunityTitleAttr, verifyText: validateBusinessUnitText });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.projRevCol, attribute: opportunityTitleAttr, verifyText: validateProjRev });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.projVolCol, attribute: opportunityTitleAttr, verifyText: validateProjVal });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.ageCol, attribute: opportunityTitleAttr, verifyText: validateAge });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.dueDateCol, attribute: opportunityTitleAttr, verifyText: validateDueDate });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.updatedByCol, attribute: opportunityTitleAttr, verifyText: validateUpdatedBy });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.updatedDateTime, attribute: opportunityTitleAttr, verifyText: validateUpdatedDateTime });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.statusColumn, attribute: opportunityTitleAttr, verifyText: validateStatus });
};

export const verifyDateFilter = () => {
  genericUtils.verifyExists({ element: crmInteractionsPage.startDate });
  genericUtils.verifyExists({ element: crmInteractionsPage.endDate });
  genericUtils.verifyExists({ element: crmInteractionsPage.startMonth });
  genericUtils.verifyExists({ element: crmInteractionsPage.endMonth });
};
/**
 * This function is used for create new Scheduled record wth mandatory fields only
 *  on Interaction tab for both carrier and customer
 */
export const createInteractionScheduleRecd = () => {
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSchedule });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionVia, typeText: interactionLogVia, exactText: interactionLogVia });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnObjective, typeText: interactionCusLogObj, exactText: interactionCusLogObj });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionCusLogType, exactText: interactionCusLogType });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnScheduleSave });
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

export const createInteractionScheduleRecdForNegativeValidation = () => {
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSchedule });
  genericUtils.clearTextType({ element: crmPortFolioPage.scheduleDurationTxtBx, typeText: durationVal481 });
  genericUtils.waitSometime(shortWait);
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionVia, typeText: interactionLogVia, exactText: interactionLogVia });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.scheduleDurationTxtBx, verifyText: 480 });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnObjective, typeText: interactionCusLogObj, exactText: interactionCusLogObj });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionCusLogType, exactText: interactionCusLogType });
  genericUtils.clearTextType({ element: crmPortFolioPage.scheduleDurationTxtBx, typeText: durationNegativeValue });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.scheduleDurationTxtBx, verifyText: 23 });
  genericUtils.clearTextType({ element: crmPortFolioPage.scheduleDurationTxtBx, typeText: durationAlphabets });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.scheduleDurationTxtBx, verifyText: 15 });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnScheduleSave });
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

export const createInteractionScheduleRecdWithFileAttach = (fileToUpload) => {
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSchedule });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionVia, typeText: interactionLogVia, exactText: interactionLogVia });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnObjective, typeText: interactionCusLogObj, exactText: interactionCusLogObj });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionCusLogType, exactText: interactionCusLogType });
  genericUtils.clickAction({ locator: crmPortFolioPage.lblEditAttachfileId });
  genericUtils.typeText({ locator: crmInteractionsPage.documentIDTxtBx, dataText: 'testDoc' });
  genericUtils.dropDownContainsTextClick({ element: crmInteractionsPage.docTypeDrpDwn, typeText: achFormDocType, exactText: achFormDocType });
  genericUtils.uploadFile({ locator: crmPortFolioPage.fileUpload, filePath: fileToUpload });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveInetarctionAttachment });
  genericUtils.waitSometime(moreWait);
  genericUtils.clickAction({ locator: crmPortFolioPage.btnScheduleSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

export const selectInteractionStatusType = (stsType) => {
  genericUtils.scrollIntoView({ locator: crmPortFolioPage.btnInteractionStatus });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnInteractionStatus });
  cy.get(crmPortFolioPage.btnInteractionStatusTypes).each(($status) => {
    cy.get($status).then(($element) => {
      const color = $element.css('background');
      if (color === 'rgb(15, 112, 231)') {
        cy.get($element).click({ force: true });
      }
    });
  });
  genericUtils.selectItemFromDropDownByTyping({ locator: crmPortFolioPage.btnInteractionStatusTypes, drpDwnVal: stsType });
};

/**
 * This function is use to view any closed interaction record and
 * verify reschedule option exist for that record
 */
export const openViewInteractionDetails = () => {
  selectInteractionsFilter('Status', 'Completed');
  genericUtils.waitSometime(moreWait);
  cy.get(commonPage.tblInteractionsTable).find(commonPage.tblRows)
    .find(commonPage.btnKabobMenu)
    .first().click({ force: true });
  genericUtils.navigateToChildWindow();
  cy.get(commonPage.lstContextMenuOptions).filter(':visible').contains('View').click({ force: true });
  cy.get(crmPortFolioPage.btnRescheduleAudit).should('be.visible');
  genericUtils.clickAction({ locator: crmPortFolioPage.btnRescheduleAudit });
  cy.get(crmPortFolioPage.dialogRescheduleAudit).should('be.visible');
};
/**
 * This function is use to select the Reassign option from Portfolio Interaction table Kabob menu
 * @param {*} kabobMenuOption
 */
export const openRescheduleInteractionDetails = (kabobMenuOption) => {
  genericUtils.selectKabobMenuOptionTable({ locator: commonPage.tblInteractionsTable, menuName: kabobMenuOption });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnReassignInteraction });
  cy.get(crmPortFolioPage.drpSelectReAssignUser).should('be.visible');
};

export const editScheduleInteractionDetails = () => {
  //This section is to search Scheduled record and select the edit option
  let inputValues = [];
  selectInteractionsFilter('Status', 'Scheduled');
  const date = genericUtils.getTomorrowsDate();
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnStartDate });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnStartDate, dataText: date });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEndDate });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnEndDate, dataText: date });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnPortFolioSearch });
  genericUtils.waitSometime(moreWait);
  genericUtils.selectKabobMenuOptionTable({ locator: commonPage.tblInteractionsTable, menuName: 'Edit' });
  genericUtils.selectItemFromDropDownByTyping({ locator: crmPortFolioPage.txtEditInteractionType, drpDwnVal: 'Inbound' });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtAddInteractionDetails, typeText: Math.random().toString(36) });
  inputValues = getEditInteractionDetails();
  genericUtils.clickVisibleElement({ locator: crmPortFolioPage.btnSave });
  genericUtils.waitSometime(moreWait);
  cy.go('back');
  return inputValues;
};

export const getEditInteractionDetails = () => {
  const inputValue = [];
  cy.get(crmPortFolioPage.txtEditInteractionEntityName)
    .find('a').first()
    .then(($val) => {
      const name = $val.text();
      inputValue.push(name);
    });
  cy.get(crmPortFolioPage.txtEditInteractionType).then(($val) => {
    const type = $val.text();
    inputValue.push(type);
  });
  cy.get(crmPortFolioPage.txtAddInteractionDetails).then(($val) => {
    const details = $val.text();
    inputValue.push(details);
  });
  return inputValue;
};

export const getUpdatedInteractionDetails = () => {
  const tomorrowDate = genericUtils.getTomorrowsDate();
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnStartDate });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnStartDate, dataText: tomorrowDate });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEndDate });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnEndDate, dataText: tomorrowDate });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnPortFolioSearch });
  genericUtils.waitSometime(moreWait);
  const updatedVals = [];
  cy.get(commonPage.tblInteractionsTable).find(commonPage.tblRows).first()
    .find('[role="cell"] b').each(($val) => {
      updatedVals.push($val.text());
    });
  return updatedVals;
};

export const addAttachmentToScheduleInteractionRecord = ({ filePath: arg1 }) => {
  selectInteractionStatusType('Schedule');
  const tomorrowDate = genericUtils.getTomorrowsDate();
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnStartDate });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnStartDate, dataText: tomorrowDate });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEndDate });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnEndDate, dataText: tomorrowDate });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnPortFolioSearch });
  genericUtils.waitSometime(moreWait);
  genericUtils.navigateToChildWindow();
  genericUtils.selectKabobMenuOptionTable({ locator: commonPage.tblInteractionsTable, menuName: 'Edit' });
  genericUtils.selectItemFromDropDownByTyping({ locator: crmPortFolioPage.txtEditInteractionType, drpDwnVal: 'Inbound' });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtAddInteractionDetails, typeText: Math.random().toString(36) });
  const dateobj = new Date();
  dateobj.setDate(dateobj.getDate());
  const date = dateobj.toISOString().split('T');
  genericUtils.clickAction({ locator: crmPortFolioPage.btnInteractionAttachFile });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtEditInteractionAttachmentDocName, typeText: 'AUTO-' + date[0] });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.txtEditInteractionAttachmentDocType });
  cy.get(crmPortFolioPage.drpEditInteractionAttachmentDocType).eq(2).click();
  genericUtils.waitSometime(3);
  genericUtils.uploadFile({ locator: crmPortFolioPage.fileUpload, filePath: arg1 });
  cy.get(crmPortFolioPage.txtEditInteractionAttachmentDocName)
    .should('be.visible')
    .invoke('val').then(($val) => {
      cy.log('AttachmentName:', $val);
    });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveInetarctionAttachment });
  genericUtils.waitSometime(3);
  cy.get(crmPortFolioPage.btnInetarctionAttachedDocName).should('be.visible');
  cy.go(back);
};

export const addAttachmentToViewInteractionRecord = ({ filePath: arg1 }) => {
  selectInteractionStatusType('Completed');
  openViewInteractionDetails();
  genericUtils.waitSometime(moreWait);
  const dateobj = new Date();
  dateobj.setDate(dateobj.getDate());
  const date = dateobj.toISOString().split('T');
  genericUtils.clickAction({ locator: crmPortFolioPage.btnInteractionAttachFile });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtEditInteractionAttachmentDocName, typeText: 'AUTO-' + date[0] });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.txtEditInteractionAttachmentDocType });
  cy.get(crmPortFolioPage.drpEditInteractionAttachmentDocType).eq(2).click();
  genericUtils.waitSometime(3);
  genericUtils.uploadFile({ locator: crmPortFolioPage.fileUpload, filePath: arg1 });
  cy.get(crmPortFolioPage.txtEditInteractionAttachmentDocName)
    .should('be.visible')
    .invoke('val').then(($val) => {
      cy.log('AttachmentName:', $val);
    });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveInetarctionAttachment });
  genericUtils.waitSometime(5);
  cy.get(crmPortFolioPage.btnInetarctionAttachedDocName).should('be.visible');
  cy.go(back);
};
/**
 *This function is use to get the Intearction records on specific date range
 * @param {*} param0
 */
export const setInteractionsDateBarToFilterRecords = ({ noOfDays: days }) => {
  //This section is to set the todate for on date range selection
  let date = new Date();
  date.setDate(date.getDate() - days);
  date = date.toISOString().split('T');
  const setDate = date[0].split('-');
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnStartDate });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnStartDate, dataText: setDate[2] });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnMonth });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnMonth, dataText: setDate[1] });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnPortFolioSearch });
};

export const selectReassignUserToInteractionrRecord = ({ reAssignUser: userName }) => {
  //This section is to select  reassign user
  genericUtils.clickAction({ locator: crmPortFolioPage.drpSelectReAssignUser });
  cy.get(crmPortFolioPage.drpSelectReAssignUser)
    .type(userName)
    .wait(shortWait)
    .find('li')
    .each((el) => {
      cy.wrap(el).click({ force: true });
    });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveReassign });
};

export const defaultInteractionRecordsShowsLoggedInUserName = () => {
  let loggedInUserName;
  cy.get(crmPortFolioPage.lblLoggedInUserName).first()
    .invoke('text')
    .then((name) => {
      loggedInUserName = name;
    });
  cy.get(commonPage.tblInteractionsTable).find(commonPage.tblRows)
    .find('[data-cellheader="Assigned To"]')
    .each((userNam) => {
      expect(userNam.text()).to.eql(loggedInUserName);
    });
};

export const interactionRecordsShowsForSelectedUserName = () => {
  let selectedUserName;
  cy.get(crmPortFolioPage.lblLoggedInUserName)
    .then(($users) => {
      if ($users.length > 0) {
        cy.get($users).eq(1).click({ force: true });
        cy.get($users).eq(1).invoke('text')
          .then((name) => {
            selectedUserName = name;
          });
      }
    });
  cy.get(commonPage.tblInteractionsTable).find(commonPage.tblRows)
    .find('[data-cellheader="Assigned To"]')
    .each((userNam) => {
      expect(userNam.text()).to.eql(selectedUserName);
    });
};
/**
 * This function is use to click on Toggle ON on Portfolio -Interaction tab
 */
export const turnOnOverDueToggleButton = () => {
  cy.get(crmPortFolioPage.btnOverdueToggle)
    .should('be.visible')
    .find('span').eq(1)
    .should('have.css', 'background-color', 'rgb(159, 159, 159)');
  cy.get(crmPortFolioPage.btnOverdueToggle)
    .find('span').eq(1).click()
    .should('have.css', 'background-color', 'rgb(15, 112, 231)');
  cy.get(crmPortFolioPage.btnDateRange).should('have.attr', 'aria-disabled', 'true');
};
/**
 * This function is used for create new Logs record wth mandatory fields only
 *  on Interaction tab for both carrier and customer
 */
export const createInteractionLogRecd = ({ objective: interactionObjectiveName }) => {
  genericUtils.clickAction({ locator: crmInteractionsPage.btnInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmInteractionsPage.btnLog });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionVia, typeText: interactionLogVia, exactText: interactionLogVia });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionOutCome, typeText: interactionLogOutCome, exactText: interactionLogOutCome });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnObjective, typeText: interactionObjectiveName, exactText: interactionObjectiveName });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionLogType, exactText: interactionLogType });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnLogSave });
  cy.get('body').then(($body) => {
    if ($body.find(crmPortFolioPage.btnReason).length > 0) {
      genericUtils.clickAction({ locator: crmPortFolioPage.btnReason });
    }
  });
  genericUtils.waitSometime(shortWait);
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};
/**
 *
 * @param {*} interactionObjectiveName
 * @param {*} interactionLogVia
 * @param {*} interactionLogOutCome
 * @param {*} interactionLogType
 * @param {*} durationVal
 * @param {*} locationVal
 * @param {*} detailsVal
 * @param {*} interactionLogOutComeDeadEnd
 */
export const createNewLogInteraction = (interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, locationVal, detailsVal, interactionLogOutComeDeadEnd) => {
  navigateToInteractionsTab();
  navigateInteractionsAddLog();
  enterInteractionsLogMandatoryVals(interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType);
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: durationVal });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtAddInteractionDetails, typeText: detailsVal });
  logSaveForOutcomeNoAnswer();
};

export const createNewLogInteractionWhenFFisOff = (interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, locationVal, detailsVal, interactionLogOutComeDeadEnd) => {
  navigateToInteractionsTab();
  navigateInteractionsAddLog();
  genericUtils.updateUrlForChildPopUpWithFF({ flag: customerCrmInteractionDisableFF });
  genericUtils.verifyDoesNotExist({ element: crmInteractionsPage.durationTxtBx });
  genericUtils.verifyDoesNotExist({ element: crmInteractionsPage.txtLocation });
  enterInteractionsLogMandatoryVals(interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType);
  logSaveForOutcomeNoAnswer();
  cy.go(back);
};
export const createNewLogInteractionWithDuration = (interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, locationVal, detailsVal, interactionLogOutComeDeadEnd) => {
  navigateToInteractionsTab();
  navigateInteractionsAddLog();
  enterInteractionsLogMandatoryVals(interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType);
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: ' ' });
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: durationVal481 });
  genericUtils.verifyText({ locator: crmPortFolioPage.lblLogInteractionDuration, verifyText: durationFieldLabel });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtAddInteractionDetails, typeText: detailsVal });
  logSaveForOutcomeNoAnswer();
};

export const createNewLogInteractionForNegativeValid = (interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, locationVal, detailsVal, interactionLogOutComeDeadEnd) => {
  navigateToInteractionsTab();
  navigateInteractionsAddLog();
  enterInteractionsLogMandatoryVals(interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType);
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: durationNegativeValue });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.durationTxtBx, verifyText: 23 });
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: durationVal481 });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.durationTxtBx, verifyText: 480 });
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: durationAlphabets });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtAddInteractionDetails, typeText: detailsVal });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.durationTxtBx, verifyText: 15 });
  logSaveForOutcomeNoAnswer();
};

export const editNewLogInteractionForNegativeValid = () => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: durationNegativeValue });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.durationTxtBx, verifyText: 23 });
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: durationVal481 });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.durationTxtBx, verifyText: 480 });
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: durationAlphabets });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.durationTxtBx, verifyText: 15 });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

export const navigateToInteractionsTab = () => {
  genericUtils.clickAction({ locator: crmInteractionsPage.btnInteractions });
};

export const navigateInteractionsAddLog = () => {
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmInteractionsPage.btnLog });
};

export const navigateInteractionsAddSchedule = () => {
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmInteractionsPage.btnScheduleInt });
};

export const enterInteractionsLogMandatoryVals = (interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType) => {
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnObjective, typeText: interactionObjectiveName, exactText: interactionObjectiveName });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionLogType, exactText: interactionLogType });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionVia, typeText: interactionLogVia, exactText: interactionLogVia });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionOutCome, typeText: interactionLogOutCome, exactText: interactionLogOutCome });
};

export const createInteractionsLogMandatoryFields = (interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal) => {
  genericUtils.clickAction({ locator: crmInteractionsPage.btnInteractions });
  navigateInteractionsAddLog();
  enterInteractionsLogMandatoryVals(interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType);
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: durationVal });
  logSaveAndValidate();
};

export const logSaveForOutcomeNoAnswer = () => {
  genericUtils.clickAction({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

export const logSaveAndValidate = () => {
  genericUtils.clickAction({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

export const validateInteractionLogMandatoryFields = () => {
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupEntityAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupDateAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupTimeAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupObjectiveAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupTypeAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupViaAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupOutcomeAsterisk });
};

export const validateInteractionScheduleMandatoryFields = () => {
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupEntityAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupDateAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupTimeAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupObjectiveAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupTypeAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.logPopupViaAsterisk });
  genericUtils.verifyExists({ element: crmPortFolioPage.scheduleAssignedToAsterisk });
};

export const createNewScheduleInteraction = (interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, locationVal, detailsVal, interactionLogOutComeDeadEnd) => {
  genericUtils.clickAction({ locator: crmInteractionsPage.btnInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmInteractionsPage.btnScheduleInt });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionVia, typeText: interactionLogVia, exactText: interactionLogVia });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnObjective, typeText: interactionObjectiveName, exactText: interactionObjectiveName });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionLogType, exactText: interactionLogType });
  //genericUtils.clearTextType({ element: crmPortFolioPage.txtScheduleDuration, typeText: durationVal });
  genericUtils.waitSometime(shortWait);
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtAddInteractionDetails, typeText: detailsVal });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

export const verifyDateAndTimeColValsExist = () => {
  genericUtils.verifyExists({ element: crmInteractionsPage.scheduledDateColVal });
  genericUtils.verifyExists({ element: crmInteractionsPage.scheduledTimeColVal });
  genericUtils.verifyExists({ element: crmInteractionsPage.createdDateColVal });
  genericUtils.verifyExists({ element: crmInteractionsPage.createdTimeColVal });
  genericUtils.verifyExists({ element: crmInteractionsPage.updatedDateColVal });
  genericUtils.verifyExists({ element: crmInteractionsPage.updatedTimeColVal });
};

export const createScheduleInteractionWithAllFields = (interactionObjectiveName, interactionLogVia, interactionLogType, locationVal, detailsVal, contactName, opportunityName) => {
  genericUtils.clickAction({ locator: crmInteractionsPage.btnInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmInteractionsPage.btnScheduleInt });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionVia, typeText: interactionLogVia, exactText: interactionLogVia });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnObjective, typeText: interactionObjectiveName, exactText: interactionObjectiveName });
  genericUtils.dropDownIncludesTextClick({ element: crmPortFolioPage.drpDwnOpportunity, typeText: opportunityName, containText: opportunityName });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionLogType, exactText: interactionLogType });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionContacts, typeText: contactName, exactText: contactName });
  genericUtils.waitSometime(shortWait);
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtAddInteractionDetails, typeText: detailsVal });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

/*Below methods are used when FF flag is disable for customer interactions
   createScheduleInteractionWithAllFieldsWhenFFisOff
   editScheduleInteractionWhenFFisOff
   reScheduleInteractionWhenFFisOff
   reScheduleAuditInteractionWhenFFisOff
   editLogInteractionWhenFFisOff
   createNewLogInteractionWhenFFisOff
*/
export const createScheduleInteractionWithAllFieldsWhenFFisOff = (interactionObjectiveName) => {
  genericUtils.clickAction({ locator: crmInteractionsPage.btnInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmInteractionsPage.btnScheduleInt });
  genericUtils.updateUrlForChildPopUpWithFF({ flag: customerCrmInteractionDisableFF });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionVia, typeText: interactionLogVia, exactText: interactionLogVia });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionLogType, exactText: interactionLogType });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnObjective, typeText: interactionObjectiveName, exactText: interactionObjectiveName });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtScheduleDuration });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtInteractionLocation });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
  cy.go(back);
};

export const editScheduleInteractionWhenFFisOff = (interactionLogOutComeDeadEnd, durationVal, locationVal) => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.updateUrlForChildPopUpWithFF({ flag: customerCrmInteractionEditsDisableFF });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtScheduleDuration });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtInteractionLocation });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditComplete });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditComplete });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpEditInteractionOutcome, typeText: interactionLogOutComeDeadEnd, exactText: interactionLogOutComeDeadEnd });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
  cy.go(back);
};

export const reScheduleInteractionWhenFFisOff = (interactionLogReason, noteData) => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.updateUrlForChildPopUpWithFF({ flag: customerCrmInteractionEditsDisableFF });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpInteractionsReason, typeText: interactionLogReason, exactText: interactionLogReason });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtDuration });
  genericUtils.typeAndWait({ locator: crmPortFolioPage.txtInteractionNotes, dataText: noteData });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
  cy.go(back);
};

export const reScheduleAuditInteractionWhenFFisOff = () => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.updateUrlForChildPopUpWithFF({ flag: customerCrmInteractionEditsDisableFF });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clickVisibleElement({ locator: crmPortFolioPage.btnRescheduleAudit });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtDuration });
  cy.go(back);
  genericUtils.waitSometime(moreWait);
  cy.go(back);
};
export const completeEditScheduleInteractionSave = (logAdvancementOutcome) => {
  genericUtils.verifyIfEnabled({ locator: crmInteractionsPage.editIcon });
  genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.editIcon });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditComplete });
  genericUtils.dropDownContainsTextClick({ element: crmInteractionsPage.completeInteractionOutcomeDrpDwn, typeText: logAdvancementOutcome, exactText: logAdvancementOutcome });
  genericUtils.clickAction({ locator: crmInteractionsPage.completeInteractionSaveBtn });
  cy.go(crmInteractionData.staticData.back);
};
/**
 *
 * @param {*} interactionLogOutComeDeadEnd
 */
export const editNewLogInteraction = (interactionLogOutComeDeadEnd, durationVal, locationVal) => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditComplete });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditComplete });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpEditInteractionOutcome, typeText: interactionLogOutComeDeadEnd, exactText: interactionLogOutComeDeadEnd });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
};
export const enterTabNewLogInteraction = () => {
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtScheduledDateTime });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtInteractionTime });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtDuration });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpContactId });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpOpportunity });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnObjective });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnInteractionType });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnInteractionVia });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtLocation });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtDetails });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.lblAttachfileId });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpInteractionOutcome });
};
export const enterTabNewScheduleInteraction = () => {
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtScheduledDateTime });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtInteractionTime });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtScheduleDuration });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpContactId });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtScheduleOpportunity });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnObjective });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnInteractionType });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnInteractionVia });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtLocation });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtDetails });
};
export const enterTabEditLogInteraction1 = (durationValue) => {
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtEditDuration });
  genericUtils.clearTextType({ element: crmPortFolioPage.durationTxtBx, typeText: durationValue });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpContactId });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpEditOpportunity });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnObjective });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnInteractionType });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnInteractionVia });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtLocation });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtDetails });
  logSaveForOutcomeNoAnswer();
};

export const editLogInteractionWhenFFisOff = () => {
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.updateUrlForChildPopUpWithFF({ flag: customerCrmInteractionEditsDisableFF });
  genericUtils.waitSometime(longWait);
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnObjective });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnInteractionType });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.durationTxtBx });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtLocation });
  cy.go(back);
  genericUtils.waitSometime(moreWait);
  cy.go(back);
};

export const enterTabEditLogInteraction = () => {
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtEditDuration });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpContactId });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpEditOpportunity });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnObjective });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnInteractionType });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnInteractionVia });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtLocation });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtDetails });
};
/*Below methods are used when FF flag is disable for customer interactions
   createScheduleInteractionForCarrierWithAllFieldsWhenFFisOff
   editScheduleInteractionForCarrierWhenFFisOff
   reScheduleInteractionForCarrierWhenFFisOff
   reScheduleAuditInteractionForCarrierWhenFFisOff
   createNewLogInteractionForCarrierWhenFFisOff
   editLogInteractionForCarrierWhenFFisOff
*/
export const createScheduleInteractionForCarrierWithAllFieldsWhenFFisOff = (interactionObjectiveName) => {
  genericUtils.clickAction({ locator: crmInteractionsPage.btnInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmInteractionsPage.btnScheduleInt });
  genericUtils.updateUrlForChildPopUpWithFF({ flag: carrierCrmInteractionDisableFF });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionVia, typeText: interactionLogVia, exactText: interactionLogVia });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionLogType, exactText: interactionLogType });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnObjective, typeText: interactionObjectiveName, exactText: interactionObjectiveName });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtScheduleDuration });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtInteractionLocation });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
  cy.go(back);
};

export const editScheduleInteractionForCarrierWhenFFisOff = (interactionLogOutComeDeadEnd, durationVal, locationVal) => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.updateUrlForChildPopUpWithFF({ flag: carrierCrmInteractionEditsDisableFF });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtScheduleDuration });
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtInteractionLocation });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditComplete });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditComplete });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpEditInteractionOutcome, typeText: interactionLogOutComeDeadEnd, exactText: interactionLogOutComeDeadEnd });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
  cy.go(back);
};

export const reScheduleInteractionForCarrierWhenFFisOff = (interactionLogReason, noteData) => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.updateUrlForChildPopUpWithFF({ flag: carrierCrmInteractionEditsDisableFF });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpInteractionsReason, typeText: interactionLogReason, exactText: interactionLogReason });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtDuration });
  genericUtils.typeAndWait({ locator: crmPortFolioPage.txtInteractionNotes, dataText: noteData });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
  cy.go(back);
};

export const reScheduleAuditInteractionForCarrierWhenFFisOff = () => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.updateUrlForChildPopUpWithFF({ flag: carrierCrmInteractionEditsDisableFF });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clickVisibleElement({ locator: crmPortFolioPage.btnRescheduleAudit });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtDuration });
  cy.go(back);
  genericUtils.waitSometime(moreWait);
  cy.go(back);
};
export const createNewLogInteractionForCarrierWhenFFisOff = (interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType, durationVal, locationVal, detailsVal, interactionLogOutComeDeadEnd) => {
  navigateToInteractionsTab();
  navigateInteractionsAddLog();
  genericUtils.updateUrlForChildPopUpWithFF({ flag: carrierCrmInteractionDisableFF });
  genericUtils.verifyDoesNotExist({ element: crmInteractionsPage.durationTxtBx });
  genericUtils.verifyDoesNotExist({ element: crmInteractionsPage.txtLocation });
  enterInteractionsLogMandatoryVals(interactionObjectiveName, interactionLogVia, interactionLogOutCome, interactionLogType);
  logSaveForOutcomeNoAnswer();
  cy.go(back);
};
export const editLogInteractionForCarrierWhenFFisOff = () => {
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.updateUrlForChildPopUpWithFF({ flag: carrierCrmInteractionEditsDisableFF });
  genericUtils.waitSometime(longWait);
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnObjective });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpDwnInteractionType });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.durationTxtBx });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.txtLocation });
  cy.go(back);
  genericUtils.waitSometime(moreWait);
  cy.go(back);
};
export const editNewScheduleInteraction = (interactionLogOutComeDeadEnd, durationVal, locationVal) => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.verifyText({ locator: crmPortFolioPage.txtInteractionLocation, verifyText: locationVal });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditComplete });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditComplete });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpEditInteractionOutcome, typeText: interactionLogOutComeDeadEnd, exactText: interactionLogOutComeDeadEnd });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
};

export const editNewScheduleInteractionForNegetiveValidation = (interactionLogOutComeDeadEnd, durationVal, locationVal) => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.clearTextType({ element: crmPortFolioPage.scheduleDurationTxtBx, typeText: durationVal481 });
  genericUtils.verifyText({ locator: crmPortFolioPage.txtInteractionLocation, verifyText: locationVal });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtInteractionLocation, typeText: locationVal });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.scheduleDurationTxtBx, verifyText: 480 });
  genericUtils.clearTextType({ element: crmPortFolioPage.scheduleDurationTxtBx, typeText: durationNegativeValue });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.scheduleDurationTxtBx, verifyText: 23 });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionCusLogType, exactText: interactionCusLogType });
  //genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditComplete });
  genericUtils.clearTextType({ element: crmPortFolioPage.scheduleDurationTxtBx, typeText: durationAlphabets });
  genericUtils.clickActionWait({ locator: crmPortFolioPage.btnEditComplete });
  //genericUtils.waitSometime(shortWait);
  //genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpEditInteractionOutcome, typeText: interactionLogOutComeDeadEnd, exactText: interactionLogOutComeDeadEnd });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.scheduleDurationTxtBx, verifyText: 15 });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

export const reScheduleNewLogInteraction = (interactionLogReason, noteData) => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpInteractionsReason, typeText: interactionLogReason, exactText: interactionLogReason });
  genericUtils.typeAndWait({ locator: crmPortFolioPage.txtInteractionNotes, dataText: noteData });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
};
export const reScheduleOrderWithTabKeyLogInteraction = () => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtRescheduleDate });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtInteractionTime });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtDuration });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.drpReasonTerm });
  genericUtils.tabAndVerifyField({ locator: crmPortFolioPage.txtDetailsId });
};
export const reScheduleNewSceduleInteraction = (interactionLogReason, noteData) => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpInteractionsReason, typeText: interactionLogReason, exactText: interactionLogReason });
  //genericUtils.clearTextType({ element: crmPortFolioPage.txtDuration, typeText: durationVal });
  genericUtils.typeAndWait({ locator: crmPortFolioPage.txtInteractionNotes, dataText: noteData });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
};

export const reScheduledInteractionForNegativeValida = (interactionLogReason, noteData) => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnEditInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEditInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnEditInteraction });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnRescheduleInteractions });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtDuration, typeText: durationVal481 });
  genericUtils.typeAndWait({ locator: crmPortFolioPage.txtInteractionNotes, dataText: noteData });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.txtDuration, verifyText: 480 });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtDuration, typeText: durationAlphabets });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpInteractionsReason, typeText: interactionLogReason, exactText: interactionLogReason });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.txtDuration, verifyText: 15 });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtDuration, typeText: durationNegativeValue });
  genericUtils.verifyElementValue({ locator: crmPortFolioPage.txtDuration, verifyText: 23 });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnLogSave });
  genericUtils.verifyToastOnSuccess();
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

export const scheduleLocationVal = (locationVal) => {
  genericUtils.waitSometime(shortWait);
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.txtLocation, attribute: attrRole, verifyText: textBoxType });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtLocation, typeText: locationVal });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.txtLocation, attribute: attrStyle, verifyText: overFlowType });
};

export const scheduleLocationFreeTextVal = (adrrs, phno, url) => {
  genericUtils.waitSometime(shortWait);
  genericUtils.clearTextType({ element: crmPortFolioPage.txtLocation, typeText: adrrs });
  genericUtils.waitSometime(shortWait);
  genericUtils.clearTextType({ element: crmPortFolioPage.txtLocation, typeText: phno });
  genericUtils.waitSometime(shortWait);
  genericUtils.clearTextType({ element: crmPortFolioPage.txtLocation, typeText: url });
  genericUtils.clickAction({ locator: crmPortFolioPage.txtAddInteractionDetails });
  genericUtils.waitSometime(shortWait);
};

export const carrotButtonDisableCol = () => {
  genericUtils.verifyToExist({ element: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.clickAction({ locator: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.verifyExists({ element: crmInteractionsPage.btnCustomize });
  genericUtils.clickVisibleElement({ locator: crmInteractionsPage.btnCustomize });
  genericUtils.clickAction({ locator: crmInteractionsPage.eyeIconStatus });
  genericUtils.clickAction({ locator: crmInteractionsPage.eyeIconVisible });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveCustomizeTable });
};

export const carrotButtonCusResetCol = () => {
  genericUtils.verifyToExist({ element: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.clickAction({ locator: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.verifyExists({ element: crmInteractionsPage.btnCustomize });
  genericUtils.clickVisibleElement({ locator: crmInteractionsPage.btnCustomize });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnCustomizeResetToDefaults });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnCustomizeApply });
};

export const verifyEntityType = ({ locator: locatorField, dataText: typeVale, verifyText: text, element: entityTypeColVal }) => {
  genericUtils.verifyExists({ element: crmInteractionsPage.txtEntityType });
  genericUtils.typeAndPressEnter({ locator: locatorField, typeText: typeVale });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnInteractionsSearch });
  genericUtils.verifyAttrText({ locator: entityTypeColVal, attribute: interactionsTitleAttr, verifyText: text });
  genericUtils.typeAndPressEnter({ locator: locatorField, typeText: typeVale });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnInteractionsSearch });
};

export const carrotButtonClick = () => {
  genericUtils.verifyToExist({ element: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.clickAction({ locator: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.verifyToExist({ element: crmInteractionsPage.btnExpand });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnHideFilter });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnHideFilter });
  genericUtils.verifyDoesNotExist({ element: crmPortFolioPage.filterRow });
  genericUtils.clickAction({ locator: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnShowFilter });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnShowFilter });
  genericUtils.verifyToExist({ element: crmPortFolioPage.filterRow });
};

export const verifyEntityTypeMultiSelect = () => {
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEntityType });
  genericUtils.scrollToBottomLeft();
  genericUtils.clickTxtContains({ locator: crmPortFolioPage.txtEntity, containsText: entityTypeCarrier });
  genericUtils.clickTxtContains({ locator: crmPortFolioPage.txtEntity, containsText: entityTypeCustomer });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: crmPortFolioPage.btnInteractionsSearch });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.btnEntityType, attribute: interactionsTitleAttr, verifyText: mulEntityNameVal });
};

export const verifyEntityNameMultiSelect = () => {
  genericUtils.clickAction({ locator: crmPortFolioPage.btnEntityName });
  genericUtils.scrollToBottomLeft();
  genericUtils.clickTxtContains({ locator: crmPortFolioPage.txtEntity, containsText: entityName1 });
  genericUtils.clickTxtContains({ locator: crmPortFolioPage.txtEntity, containsText: entityName2 });
  genericUtils.waitSometime(shortWait);
  genericUtils.clickAction({ locator: crmPortFolioPage.btnInteractionsSearch });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.btnEntityName, attribute: interactionsTitleAttr, verifyText: mulEntityNameVal });
};

export const verifyPortInteractionsFilters = () => {
  genericUtils.verifyToExist({ element: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.clickAction({ locator: crmInteractionsPage.drpdwnCarrotBtnInteractions });
  genericUtils.verifyToExist({ element: crmInteractionsPage.toggleFilterBtn });
  genericUtils.clickAction({ locator: crmInteractionsPage.toggleFilterBtn });
  genericUtils.verifyToNotExist({ element: crmInteractionsPage.filtersRowHdr });
  genericUtils.verifyToExist({ element: crmInteractionsPage.toggleFilterBtn });
  genericUtils.clickAction({ locator: crmInteractionsPage.toggleFilterBtn });
  genericUtils.verifyToExist({ element: crmInteractionsPage.filtersRowHdr });
  genericUtils.verifyToNotExist({ element: crmInteractionsPage.scheduleTimeFilter });
};

export const defaultSortedOrder = () => {
  const sorted = [];
  cy.get(commonPage.tblInteractionsTable).find(commonPage.tblRows)
    .find('[data-cellheader="Created Date"]')
    .each((sortedDate) => {
      sorted.push(new Date(sortedDate.text()));
    });
  cy.log('Default Sort: ', sorted);
  sorted.sort(function (a, b) {
    return a - b;
  });

  cy.log('Default Sort: ', sorted);
  sorted.sort(function (a, b) {
    return a - b;
  });
};

export const getDateAndMonth = () => {
  //this method is to select next date and month of portFolio date range
  const date = genericUtils.returnNextDate();
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnStartDate });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnStartDate, dataText: date[2] });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnStartMonth });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnStartMonth, dataText: date[1] });
  genericUtils.clickFirstElementIn({ locator: crmPortFolioPage.btnEndDate });
  genericUtils.typeTextFirstElementIn({ locator: crmPortFolioPage.btnEndDate, dataText: date[2] });
  genericUtils.clickLastElementIn({ locator: crmPortFolioPage.btnStartMonth });
  genericUtils.typeTextLastElementIn({ locator: crmPortFolioPage.btnEndMonth, dataText: date[1] });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnPortFolioSearch });
};

export const verifyCustomizeOpportunitiesAndDrgAndDwp = () => {
  genericUtils.verifyTableColumnsHeaders({ locator: crmInteractionsPage.tblCustomizeHeader, columnNames: opportunitiesTableColumnHeaders });
  cy.log('***Switch the show option \'Off\' of any column***');
  genericUtils.verifyVisible({ element: crmInteractionsPage.eyeIconVisible });
  genericUtils.clickAction({ locator: crmInteractionsPage.eyeIconVisible });
  genericUtils.verifyVisible({ element: crmInteractionsPage.eyeIconNotVisible });
  cy.log('***Switch the show option \'On\' of any column***');
  genericUtils.clickAction({ locator: crmInteractionsPage.eyeIconNotVisible });
  genericUtils.verifyVisible({ element: crmInteractionsPage.eyeIconVisible });
  cy.log('***Verify drag a column to a new location***');
  genericUtils.dragAndDrop({ draggedElement: crmInteractionsPage.customizeNameDragItem, stationaryElement: crmInteractionsPage.customizeTypeDragItem, refElement: crmInteractionsPage.customizeTable });
  genericUtils.verifyTableColumnsHeaders({ locator: crmInteractionsPage.tblCustomizeHeader, columnNames: opportunitiesTblCustomizeHeadersAfterRearrange });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnCustomizeResetToDefaults });
  genericUtils.clickAction({ locator: crmInteractionsPage.btnCustomizeApply });
};

/**
 *This function is to select Opportunities status type
 * @param {*} stsType
 */
export const selectOpportunitiesStatusType = (stsType) => {
  genericUtils.scrollIntoView({ locator: crmPortFolioPage.btnOpportunitiesStatus });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnOpportunitiesStatus + ' svg' });
  cy.get(crmPortFolioPage.btnOpportunitiesStatus).find(commonPage.tblColumnFilterCheckBoxes).each(($chkbox) => {
    cy.get($chkbox).invoke('css', 'background')
      .then(($color) => {
        if ($color.includes('rgb(15, 112, 231)')) {
          cy.get($chkbox).click({ force: true });
        }
      });
  });
  cy.get(commonPage.tblColumnFilterValues)
    .contains(stsType)
    .click({ force: true });
  cy.wait('@getOpportunities');
  cy.get(commonPage.tblDataLoderMsg).last().should('not.contain', 'Loading...');
  cy.get('body').then(($body) => {
    if ($body.find(commonPage.tblOpportunitiesTable).find(commonPage.tblRows).length > 0) {
      cy.get(commonPage.tblOpportunitiesTable).find(commonPage.tblRows)
        .find('[data-cellheader="Status"]').each(($val) => {
          expect($val.text()).to.eql(stsType);
        });
    } else {
      cy.get(commonPage.txtNoDataFound).should('have.text', 'No Opportunities Found');
    }
  });
};

export const getOpportunitiesCount = () => {
  let count;
  genericUtils.waitSometime(moreWait);
  cy.get('body').then(($body) => {
    if ($body.find(crmPortFolioPage.tblOpportunitiesRecords).length > 0) {
      cy.wait('@getOpportunities').then(($res) => {
        count = $res.response.body.data.portfolioOpportunitiesByReps.totalOpportunitiesCount;
      });
    } else {
      count = 0;
    }
  });
  cy.get('body').then(($body) => {
    if ($body.find(crmPortFolioPage.tblOpportunitiesRecords).length > 0) {
      count = crmPortFolioPage.tblOpportunitiesRecords.length();
    } else {
      count = 0;
    }
  });
  return count;
};
export const verifyOpportunitiesTabRecordsCount = () => {
  genericUtils.waitSometime(moreWait);
  cy.get('body').then(($body) => {
    genericUtils.waitSometime(moreWait);
    if ($body.find(crmPortFolioPage.tblOpportunitiesRecords).length > 0) {
      cy.wait('@getOpportunities').then((res) => {
        cy.get(crmPortFolioPage.tabOpportunities).contains(res.response.body.data.portfolioOpportunitiesByReps.totalOpportunitiesCount);
      });
    } else {
      cy.get(crmPortFolioPage.tabOpportunities).should('not.contain', crmPortFolioPage.tblOpportunitiesRecords.length);
    }
  });
};
/**
 *This function will use to select any type filter option in Opportunities
 * @param {*} filterType
 * @param {*} filterVal
 */
export const selectOpportunitiesFilter = (filterType, filterVal) => {
  genericUtils.selectAnyFilterFromTable(filterType, filterVal);
  cy.wait('@getOpportunities');
  cy.get(commonPage.tblDataLoderMsg).last().should('not.contain', 'Loading...');
  cy.get('body').then(($body) => {
    if ($body.find(crmPortFolioPage.tblOpportunitiesTable).find(commonPage.tblRows).length > 0) {
      const filterTypeLocator = '[data-cellheader="%s"]'.replace('%s', filterType);
      cy.get(crmPortFolioPage.tblOpportunitiesTable).find(commonPage.tblRows)
        .find(filterTypeLocator).each(($val) => {
          expect($val.text()).to.eql(filterVal);
        });
    } else {
      cy.get(commonPage.txtNoDataFound).should('have.text', 'No Opportunities Found');
    }
  });
};
/**
 *This function is to remove selected filter
 * @param {*} filterType
 */
export const removeSelectedFilter = (filterType) => {
  cy.get(commonPage.tblColumnFilters).then(($filters) => {
    const totalFilters = $filters.length;
    for (let i = 0; i < totalFilters - 1; i++) {
      cy.get($filters[i]).invoke('attr', 'data-column-filter').then(($filter) => {
        cy.log('***Passing Filter***', $filter.toLowerCase(), filterType.replace(' ', '').toLowerCase());
        if ($filter.toLowerCase().startsWith(filterType.replace(' ', '').toLowerCase())) {
          cy.get('body').then(($body) => {
            if ($body.find($filters[i]).find('svg').length > 0) {
              cy.log('This filter drop down selection');
              cy.get($filters[i]).find('svg').click({ force: true });
              cy.get(commonPage.tblColumnFilterCheckBoxes).each(($filter) => {
                cy.get($filter).filter(':visible').invoke('css', 'background')
                  .then(($color) => {
                    if ($color === 'rgb(15, 112, 231)') {
                      cy.get($filter).click({ force: true });
                    }
                  });
              });
            } else {
              cy.get($filters[i]).find('input').clear();
            }
          });
        }
      });
    }
  });
};
export const openOpportunitiescCarrotButtonClickExpand = () => {
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnOppCarrot });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnOppCarrot });
  genericUtils.verifyToExist({ element: crmPortFolioPage.btnOppExpandList });
  genericUtils.clickVisibleElement({ locator: crmPortFolioPage.btnOppExpandList });
};
/**
 * This function will use to select any filter option in Interactions
 * @param {*} filterType
 * @param {*} filterVal
 */
export const selectInteractionsFilter = (filterType, filterVal) => {
  genericUtils.selectAnyFilterFromTable(filterType, filterVal);
  //cy.get('@getInteractions');
  cy.get(commonPage.tblDataLoderMsg).last().should('not.contain', 'Loading...');
  cy.get('body').then(($body) => {
    if ($body.find(commonPage.tblInteractionsTable).find(commonPage.tblRows).length > 0) {
      const filterTypeLocator = '[data-cellheader="%s"]'.replace('%s', filterType);
      cy.get(commonPage.tblInteractionsTable)
        .find(commonPage.tblRows)
        .find(filterTypeLocator).each(($val) => {
          expect($val.text()).to.eql(filterVal);
        });
    } else {
      cy.get(commonPage.txtNoDataFound).should('have.text', 'No Interactions Found');
    }
  });
};

export const verifyLastUpdatedDateAndTime = () => {
  msgs = cy.get(crmPortFolioPage.msgVerbiageOpp).each(($els) => {
    cy.log($els.text(), msgs);
  });
};

export const refreshValInDefaultAndExpView = () => {
  verifyLastUpdatedDateAndTime();
  genericUtils.scrollIntoView({ locator: crmPortFolioPage.tabScrollRight });
  genericUtils.scrollToRight();
  genericUtils.verifyVisible({ element: crmPortFolioPage.btnOppRefresh });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnOppRefresh });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmPortFolioPage.txtPortOppEntType, ddValue: entityTypeCarr });
  genericUtils.waitSometime(shortWait);
  genericUtils.scrollIntoView({ locator: crmPortFolioPage.tabScrollRight });
  genericUtils.scrollToRight();
  genericUtils.clickAction({ locator: crmPortFolioPage.btnKabobOpportunitiesCustomize });
  genericUtils.clickVisibleElement({ locator: crmPortFolioPage.btnOppExpandList });
  genericUtils.verifyVisible({ element: crmPortFolioPage.btnOppRefresh });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnOppRefresh });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.btnEntityType, attribute: titleAttrVal, verifyText: entityTypeCarr });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmPortFolioPage.txtPortOppEntType, ddValue: entityTypeCarr });
  genericUtils.dropDownExactCheckBoxSelection({ element: crmPortFolioPage.txtPortOppEntType, ddValue: entityTypeCust });
  genericUtils.waitSometime(shortWait);
  verifyLastUpdatedDateAndTime();
  genericUtils.clickAction({ locator: btnNotesExpandViewClose });
  genericUtils.scrollIntoView({ locator: crmPortFolioPage.tabScrollRight });
  genericUtils.scrollToRight();
  genericUtils.clickAction({ locator: crmPortFolioPage.btnOppRefresh });
  genericUtils.verifyAttrText({ locator: crmPortFolioPage.btnEntityType, attribute: titleAttrVal, verifyText: entityTypeCust });
};

export const verifyColumnsInOpportunityTab1 = () => {
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colReps, attribute: opportunityTitleAttr, verifyText: validateRepcol });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colContacts, attribute: opportunityTitleAttr, verifyText: validateContactCol });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colMode, attribute: opportunityTitleAttr, verifyText: validateModeCol });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colSize, attribute: opportunityTitleAttr, verifyText: validateSizeCol });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colEquipment, attribute: opportunityTitleAttr, verifyText: validateEquipmentCol });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colSolutionType, attribute: opportunityTitleAttr, verifyText: validateSolutionTypeCol });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colSolution, attribute: opportunityTitleAttr, verifyText: validateSolutionCol });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colTotalVol, attribute: opportunityTitleAttr, verifyText: validateTotalVol });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colTotalRev, attribute: opportunityTitleAttr, verifyText: validateTotalRev });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colProjMargn, attribute: opportunityTitleAttr, verifyText: validateProjMargin });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colPricingStrat, attribute: opportunityTitleAttr, verifyText: validatePricingStratCol });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colDetails, attribute: opportunityTitleAttr, verifyText: validateDetailsColumn });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colAwardDate, attribute: opportunityTitleAttr, verifyText: validateAwardDate });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colGolive, attribute: opportunityTitleAttr, verifyText: validateGoLive });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colRevsit, attribute: opportunityTitleAttr, verifyText: validateRevisit });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colCreatedBy, attribute: opportunityTitleAttr, verifyText: validateCreatedBy });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colCreateDateTime, attribute: opportunityTitleAttr, verifyText: validateCreatedDateTime });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colSourceHeader, attribute: opportunityTitleAttr, verifyText: validateSourceCol });
  genericUtils.verifyAttrText({ locator: crmOpportunitiesPage.colCloseReasonHeader, attribute: opportunityTitleAttr, verifyText: validateCloseReasonCol });
};
/**
 * This function is to verify list of context menu options when user user opens kabob menu
 * on opportunities table
 */
export const verifyOpportunitiesKabobMenuOptions = () => {
  cy.wait('@getOpportunities');
  genericUtils.waitSometime(moreWait);
  cy.get(commonPage.tblOpportunitiesTable).find(commonPage.tblRows)
    .find(commonPage.btnKabobMenu)
    .first().click({ force: true });
  cy.get(commonPage.lstContextMenuOptions).filter(':visible').should('have.text', 'Edit');
};

/**
 *This function is to select Porfolio records by account type Customer/Carrier/Driver
 * @param {*} stsType
 */
export const selectPorfolioAccountType = (accountType) => {
  cy.get(crmPortFolioPage.tblPortfolioTable).find(commonPage.drpDropDownMenu).first().click();
  cy.get(crmPortFolioPage.tblPortfolioTable).find(commonPage.li)
    .contains(accountType)
    .click({ force: true });
  cy.get(commonPage.tblDataLoderMsg).last().should('not.contain', 'Loading...');
};

/**
 * This function is to verify list of context menu options when user opens kabob menu
 * on portfolio table for customer/carrier/driver
 */
export const verifyPorFolioKabobMenuOptions = () => {
  genericUtils.waitSometime(moreWait);
  cy.get('body').then(($body) => {
    const rows = commonPage.tblPortfolioTable + ' ' + commonPage.tblRows;
    cy.get(rows).find(commonPage.btnKabobMenu).first().click({ force: true });
    cy.get(commonPage.lstContextMenuOptions).filter(':visible').then(($contextMenu) => {
      cy.get(commonPage.tblPortfolioTable).find(commonPage.drpDropDownMenu)
        .first().invoke('text')
        .then(($selectedAccountType) => {
          if ($selectedAccountType.includes('Customer')) {
            cy.get($contextMenu[0]).should('have.text', 'Order List');
            cy.get($contextMenu[1]).should('have.text', 'CRM');
            cy.get($contextMenu[2]).should('have.text', 'Log Interaction');
            cy.get($contextMenu[3]).should('have.text', 'Schedule Interaction');
            cy.get($contextMenu[4]).should('have.text', 'New Opportunity');
            cy.get($contextMenu[5]).should('have.text', 'Spot Quote');
          } else if ($selectedAccountType.includes('Carrier')) {
            cy.get($contextMenu[0]).should('have.text', 'Route List');
            cy.get($contextMenu[1]).should('have.text', 'CRM');
          } else if ($selectedAccountType.includes('Driver')) {
            cy.get(commonPage.btnKabobMenu).should('not.be.visible');
          }
        });
    });
  });
};
export const openCrmInteractionEditKabobMenu = () => {
  genericUtils.waitSometime(moreWait);
  cy.get('body').then(($body) => {
    const rows = crmPortFolioPage.tblInteractionsTable + ' ' + commonPage.tblRows;
    cy.get(rows).find(commonPage.btnKabobMenu).first().click({ force: true });
  });
};

/**
 * This function is to select Kabob cntext menu option from Porfolio Account table
 *  when user opens kabob menu
 * @param {*} kabobMenuOption
 */
export const openKabobMenuOptionFromPorFolioTable = (kabobMenuOption) => {
  genericUtils.selectKabobMenuOptionTable({ locator: commonPage.tblPortfolioTable, menuName: kabobMenuOption });
};

/**
 * This function is to expand Porfolio Account table
 * By clicking on carrot icon  on Porfolio Account table header panel
 *
 */
export const expandPorFolioTable = () => {
  cy.get(commonPage.tblPortfolioTable).scrollIntoView();
  cy.get('body').then(($body) => {
    if ($body.find(commonPage.tblPortfolioTable).find(commonPage.angleUpIcon).length > 0) {
      genericUtils.clickFirstElementIn({ locator: commonPage.tblPortfolioTable + ' ' + commonPage.angleUpIcon });
    }
    genericUtils.clickFirstElementIn({ locator: commonPage.tblPortfolioTable + ' ' + commonPage.angleDownIcon });
  });
};

/**
 * This function is to collapse Porfolio Account table
 * By clicking on carrot icon on Porfolio Account table header panel
 *
 */
export const collapsePorFolioTable = () => {
  cy.scrollIntoView(commonPage.tblPortfolioTable);
  cy.get('body').then(($body) => {
    if ($body.find(commonPage.tblPortfolioTable).find(commonPage.angleDownIcon).length > 0) {
      genericUtils.clickAction({ locator: commonPage.tblPortfolioTable + ' ' + commonPage.angleDownIcon });
    }
    genericUtils.clickAction({ locator: commonPage.tblPortfolioTable + ' ' + commonPage.angleUpIcon });
  });
};
/**
 * This function is used for create new Logs record wth mandatory,
 *  Contact, Opportunity, details fields on Interaction tab for both carrier and customer
 */
export const createInteractionLogRecordWithAllFields = ({ objective: interactionObjectiveName, contactName: randomContactName, opportunityName: randomOpportunityName }) => {
  genericUtils.clickAction({ locator: crmInteractionsPage.btnInteractions });
  genericUtils.navigateToChildWindow();
  genericUtils.clickAction({ locator: crmInteractionsPage.btnLog });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.txtEditInteractionOpportunities, typeText: randomOpportunityName, exactText: randomOpportunityName });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionVia, typeText: interactionLogVia, exactText: interactionLogVia });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpContactId, typeText: randomContactName, exactText: randomContactName });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionOutCome, typeText: interactionLogOutCome, exactText: interactionLogOutCome });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnObjective, typeText: interactionObjectiveName, exactText: interactionObjectiveName });
  genericUtils.dropDownContainsTextClick({ element: crmPortFolioPage.drpDwnInteractionType, typeText: interactionLogType, exactText: interactionLogType });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnLogSave });
  cy.get('body').then(($body) => {
    if ($body.find(crmPortFolioPage.btnReason).length > 0) {
      genericUtils.clickAction({ locator: crmPortFolioPage.btnReason });
    }
  });
  genericUtils.waitSometime(shortWait);
  cy.go(back);
  genericUtils.waitSometime(moreWait);
};

/**
 * This fucntion is use to crate an opportunity with mandatory fields, contact name, opportunity name
 * @param {*} opportunityName
 * @param {*} opportunitiesType
 * @param {*} opportunityStg
 * @param {*} ccType
 */
export const createOpportunitiesWithContactsCC = (opportunityName, opportunitiesType, opportunityStg, contactName, ccType) => {
  if (ccType === modeCust) {
    genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCustomer });
  } else {
    genericUtils.clickFirstElementIn({ locator: crmInteractionsPage.tabCrmCarrier });
  }
  genericUtils.clickActionWait({ locator: crmPortFolioPage.btnAddOpportunities });
  genericUtils.clearTextType({ element: txtOpportunityName, typeText: opportunityName });
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunityStg, typeText: opportunityStg, exactText: opportunityStg }));
  genericUtils.dropDownContainsTextClick(({ element: crmPortFolioPage.drpOpportunitiesType, typeText: opportunitiesType, exactText: opportunitiesType }));
  //genericUtils.dropDownContainsTextClick(({ element: crmOpportunitiesPage.drpdwnContacts, typeText: contactName, exactText: contactName }));
  genericUtils.clickAction({ locator: crmOpportunitiesPage.drpdwnContacts });
  cy.get(commonPage.tblColumnFilterValues).first().click({ force: true });
  genericUtils.clickAction({ locator: crmPortFolioPage.btnSaveOpportunity });
  genericUtils.verifyFirstElementTxt({ locator: crmPortFolioPage.lblConfirmMsg, verifyText: opportunityConfirmMsg });
};
/**
 * This function is use to create an Opportunity with contacts in Customer & Carrier
 * @param {*} param0
 */
export const createOpportunityWithContact = ({ element: entityType, opportunityName: nameOpportunity, contactName: opportunityContactName }) => {
  createOpportunitiesWithContactsCC(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityOpenStg, opportunityContactName, entityType);
  //createOpportunitiesWithContactsCC(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityClosedStg, 'Test', entityType);
  //createOpportunitiesWithContactsCC(nameOpportunity + genericUtils.generateRandomNumber(), opportunitiesType, opportunityHoldStg, 'Test', entityType);
};

export const addOppAndVerifyInPortfolioByStatus = ({ txtOppStage: oppStage, drpDwnFilterStatus: drpDwnStatus, ccType: typeCC }) => {
  const oppNewName = opportunityName + genericUtils.generateRandomNumber();
  createOpportunitiesWMadatoryFieldsCC(oppNewName, opportunitiesType, oppStage, typeCC);
  navigateToPorFolioOpportunitiesTab();
  genericUtils.waitSometime(longWait);
  verifyOpportunitiesStatus(drpDwnStatus);
  genericUtils.verifyTableRowElementText({ locator: crmPortFolioPage.txtOpportunityNamePortfolio, index: 0, verifyText: oppNewName });
};

export const validateOpportunitiesEdit = () => {
  const txtOpportunityName = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 15 });
  genericUtils.clickElementIndex({ locator: `${commonPage.tblOpportunitiesTable} ${commonPage.tblRows} ${commonPage.btnKabobMenu}`, index: 1 });
  genericUtils.clickVisibleElement({ locator: commonPage.lstContextMenuOptions });
  genericUtils.verifyIfDisabled({ locator: crmPortFolioPage.btnSaveOpportunity });
  genericUtils.clearTextType({ element: crmPortFolioPage.txtOpportunityName, typeText: txtOpportunityName });
  genericUtils.clickActionWait({ locator: crmPortFolioPage.btnSaveOpportunity });
  genericUtils.toastWithMsg({ message: crmPortfolioData.staticData.msgUpdated });
  genericUtils.verifyFirstElementTxt({ locator: commonPage.tblOpportunitiesTable + ' ' + crmPortFolioPage.lblOpportunityName, verifyText: txtOpportunityName });
};