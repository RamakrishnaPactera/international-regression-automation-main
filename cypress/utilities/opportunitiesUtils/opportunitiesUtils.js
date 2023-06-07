import {
  clearTextType,
  clickAction,
  clickFirstElementIn,
  clickVisibleElement,
  dropDownContainsTextClick,
  dropDownExactClick,
  getLocatorFromPageClick,
  navigateTabKey,
  typeText,
  uploadFile,
  verifyAttrText,
  verifyFirstElementTxt,
  verifyVisible,
  waitSometime,
  selectItemFromButtonTypeDropDown,
  clickWithWaits,
} from '../commonUtils/genericUtils';
import commonData from '../../testData/staticData/commonData/commonData.json';
import crmopportunitiesPage from '../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import crmOpportunitiesData from '../../testData/crm/crmData/crmOpportunitiesData.json';
import { datePicker, returntodayDateMMDDYY } from '../commonUtils/dateTimeUtils';
const { shortWait, moreWait } = commonData;
const {
  awardDate,
  btnSubmit,
  btnStatus,
  btnCustomize,
  btnCustomizeApply,
  btnFileUpload,
  btnAddIcon,
  btnEditOpportunity,
  btnSaveOpportunity,
  contextMenu,
  closeLostList,
  customizeView,
  colSource,
  closeReasonHeader,
  closeReasonHideIcon,
  drpdwnRegionType,
  drpdwnRegionEffectiveDate,
  drpdwnEquipment,
  drpdwnSource,
  drpdwnType,
  drpdwnStage,
  drpdwnCloseReason,
  drpdwnDivision,
  drpdwnBusinessUnit,
  drpdwnProject,
  drpdwnContacts,
  drpdwnMode,
  drpdwnSize,
  drpdwnSolutionType,
  drpdwnSolution,
  drpdwnPricingStrategy,
  dueDate,
  drpdwnIbRegion,
  drpdwnObRegion,
  drpdwnObRegionCheckBox,
  expandView,
  goLiveDate,
  labelOpportunities,
  labelAddOpportunity,
  labelName,
  labelSource,
  labelType,
  labelStage,
  labelCloseReason,
  labelReps,
  labelDivision,
  labelBusinessunit,
  labelContact,
  labelMode,
  labelSize,
  labelObRegion,
  labelIbRegion,
  labelEquipment,
  labelSolutionType,
  labelTotalOpportunity,
  labelVolume,
  labelRevenue,
  labelMargin,
  labelPricingStrategy,
  labelDetails,
  listOfSource,
  menuOptionEdit,
  revisitDate,
  sourceHideIcon,
  txtName,
  tblStatusTypeFilter,
  tblOpportunityRowData,
  txtProjectedVolume,
  txtProjectedMarjin,
  txtTotalOpportunityRevenue,
  txtTotalOpportunityVolume,
  txtProjectedRevenue,
  txtDetails,
  txtRegionName,
  tabCrm,
  rowNameValue,
  drpDwnOppStage,
} = crmopportunitiesPage;
const {
  contactsValue,
  fieldDetails,
  fieldCloseReason,
  matchesAddOpportunity,
  matchesOpportunityTitle,
  validateSource,
  validateStage,
  validateType,
  validateName,
  validateDivision,
  validateBusinessUnit,
  validateContacts,
  validateMode,
  validateSize,
  validateEquipment,
  validateIbRegion,
  validateObRegion,
  validateSolutionType,
  validateMargin,
  validateRevenue,
  validateReps,
  validateTotalOpportunity,
  validateVolume,
  validatePricingStrategy,
  saveOpportunityButton,
  statusValue,
} = crmOpportunitiesData.expectedData;
const {
  opportunityDetails,
  projectedMargin,
  projectedVolume,
  projectedRevenue,
  totalRevenue,
  totalVolume,
} = crmOpportunitiesData.userDefined;
const {
  arg1,
  closedLostValue,
  closeReason1,
  closeReason2,
  closeReason3,
  disqualifiedValue,
  opportunityStageValue,
  opportunityTitleAttr,
  solutionFreightValue,
  solutionServiceValue,
  stageVal1,
  stageVal2,
  sourceValue1,
  sourceVal2,
  sourceVal3,
  revisitFutureOpportunityVal,
  validateSourceText,
  validateCloseReasonText,
} = crmOpportunitiesData.staticData;

const openOpportunityInExpandView = () => {
  clickAction({ locator: contextMenu });
  clickVisibleElement({ locator: expandView });
};

const createRegionSet = ({ regionName: regionSetName, createRegionType: regionTypeValue }) => {
  typeText({ locator: txtRegionName, dataText: regionSetName });
  datePicker({ dateLocator: drpdwnRegionEffectiveDate, dataText: returntodayDateMMDDYY() });
  dropDownContainsTextClick({ element: drpdwnRegionType, typeText: regionTypeValue, exactText: regionTypeValue });
  uploadFile({ locator: btnFileUpload, filePath: arg1 });
  clickAction({ locator: btnSubmit });
  waitSometime(moreWait);
};

const openAddOpportunityModal = () => {
  verifyFirstElementTxt({ locator: labelOpportunities, verifyText: matchesOpportunityTitle });
  clickVisibleElement({ locator: btnAddIcon });
  verifyFirstElementTxt({ locator: labelAddOpportunity, verifyText: matchesAddOpportunity });
};

const navigateToCrmTab = () => {
  clickFirstElementIn({ locator: tabCrm });
};

const addOpportunity = ({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue }) => {
  clearTextType({ element: txtName, typeText: opportunityNameValue });
  dropDownContainsTextClick({ element: drpdwnType, typeText: opportunityTypeValue, exactText: opportunityTypeValue });
  dropDownContainsTextClick({ element: drpdwnStage, typeText: opportunityStageValue, exactText: opportunityStageValue });
  dropDownContainsTextClick({ element: drpdwnCloseReason, typeText: closedLostValue, exactText: closedLostValue });
};

export const verifyEditedRecordData = ({ nameField: opportunityNameValue }) => {
  cy.get(rowNameValue).each((value) => {
    expect(value.text()).to.equal(opportunityNameValue);
  });
};

const addNameAndTypeOfOpportunity = ({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue }) => {
  clearTextType({ element: txtName, typeText: opportunityNameValue });
  dropDownContainsTextClick({ element: drpdwnType, typeText: opportunityTypeValue, exactText: opportunityTypeValue });
};

const addAndSaveOpportunityWithMandatoryFiedls = ({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue }) => {
  openAddOpportunityModal();
  clearTextType({ element: txtName, typeText: opportunityNameValue });
  dropDownContainsTextClick({ element: drpdwnType, typeText: opportunityTypeValue, exactText: opportunityTypeValue });
  clickAction({ locator: btnSaveOpportunity });
};

const verifyColHoverOverOpportunityTabs = () => {
  clickVisibleElement({ locator: btnCustomize });
  clickVisibleElement({ locator: customizeView });
  clickAction({ locator: sourceHideIcon });
  clickAction({ locator: closeReasonHideIcon });
  clickAction({ locator: btnCustomizeApply });
  clickAction({ locator: contextMenu });
  clickVisibleElement({ locator: expandView });
  verifyAttrText({ locator: colSource, attribute: opportunityTitleAttr, verifyText: validateSourceText });
  verifyAttrText({ locator: closeReasonHeader, attribute: opportunityTitleAttr, verifyText: validateCloseReasonText });
};

const verifyAddOpportunityDropDownValues = () => {
  cy.get(drpdwnSource).click({ force: true });
  cy.get(listOfSource).each(($els, index) => {
    expect($els.text()).to.equal(sourceValue1[index]);
  });
  cy.get(drpdwnStage).focus();
};

const verifyCloseReasonDropDownValues = () => {
  dropDownContainsTextClick({ element: drpdwnStage, typeText: opportunityStageValue, exactText: opportunityStageValue });
  cy.get(drpdwnCloseReason).click({ force: true });
  cy.get(closeLostList).each(($els, index) => {
    expect($els.text()).to.equal(closeReason1[index]);
  });
  cy.get(drpdwnStage).focus();
  dropDownContainsTextClick({ element: drpdwnStage, typeText: stageVal1, exactText: stageVal1 });
  cy.get(drpdwnCloseReason).click({ force: true });
  cy.get(closeLostList).each(($els, index) => {
    expect($els.text()).to.equal(closeReason2[index]);
  });
  cy.get(drpdwnStage).focus();
  dropDownContainsTextClick({ element: drpdwnStage, typeText: stageVal2, exactText: stageVal2 });
  cy.get(drpdwnCloseReason).click({ force: true });
  cy.get(closeLostList).each(($els, index) => {
    expect($els.text()).to.equal(closeReason3[index]);
  });
  cy.get(drpdwnStage).focus();
};

const chooseCloseReasonValue = ({ stageField: crmOpportunityStage }) => {
  if (crmOpportunityStage === 'Closed Lost') {
    dropDownContainsTextClick({ element: drpdwnCloseReason, typeText: closedLostValue, exactText: closedLostValue });
  } else if (crmOpportunityStage === 'Disqualified') {
    dropDownContainsTextClick({ element: drpdwnCloseReason, typeText: disqualifiedValue, exactText: disqualifiedValue });
  } else if (crmOpportunityStage === 'Revisit/Future Opportunity') {
    dropDownContainsTextClick({ element: drpdwnCloseReason, typeText: revisitFutureOpportunityVal, exactText: revisitFutureOpportunityVal });
  }
};

const addSourceCloseReason1 = () => {
  dropDownContainsTextClick({ element: drpdwnSource, typeText: sourceVal2, exactText: sourceVal2 });
  dropDownContainsTextClick({ element: drpdwnStage, typeText: stageVal1, exactText: stageVal1 });
  dropDownContainsTextClick({ element: drpdwnCloseReason, typeText: disqualifiedValue, exactText: disqualifiedValue });
  clickAction({ locator: btnSaveOpportunity });
};

const addSourceCloseReason2 = () => {
  dropDownContainsTextClick({ element: drpdwnSource, typeText: sourceVal3, exactText: sourceVal3 });
  dropDownContainsTextClick({ element: drpdwnStage, typeText: stageVal2, exactText: stageVal2 });
  dropDownContainsTextClick({ element: drpdwnCloseReason, typeText: revisitFutureOpportunityVal, exactText: revisitFutureOpportunityVal });
  clickAction({ locator: btnSaveOpportunity });
};

const openEditOpportunityModal = () => {
  clickVisibleElement({ locator: menuOptionEdit });
  clickVisibleElement({ locator: btnEditOpportunity });
};

const verifyAndFillOpportunityFields = ({ nameField: opportunityNameValue, opportunitySourceField: opportunitySourceValue, opportunityTypeField: opportunityTypeValue, fieldDivision: divisionValue, fieldBusinessUnit: businessUnitVal, fieldMode: modeValue, fieldSize: sizeValue, fieldSolutionType: opportunitySolutionTypeVal, fieldEquipment: equipmentValue, regionName: regionSetName }) => {
  waitSometime(shortWait);
  verifyFirstElementTxt({ locator: labelName, verifyText: validateName });
  clearTextType({ element: txtName, typeText: opportunityNameValue });
  verifyFirstElementTxt({ locator: labelSource, verifyText: validateSource });
  dropDownContainsTextClick({ element: drpdwnSource, typeText: opportunitySourceValue, exactText: opportunitySourceValue });
  waitSometime(shortWait);
  verifyFirstElementTxt({ locator: labelType, verifyText: validateType });
  dropDownContainsTextClick({ element: drpdwnType, typeText: opportunityTypeValue, exactText: opportunityTypeValue });
  waitSometime(shortWait);
  verifyFirstElementTxt({ locator: labelStage, verifyText: validateStage });
  dropDownContainsTextClick({ element: drpdwnStage, typeText: opportunityStageValue, exactText: opportunityStageValue });
  //Verify Close Reason, Reps, Division Field
  verifyFirstElementTxt({ locator: labelCloseReason, verifyText: fieldCloseReason });
  dropDownContainsTextClick({ element: drpdwnCloseReason, typeText: closedLostValue, exactText: closedLostValue });
  verifyFirstElementTxt({ locator: labelReps, verifyText: validateReps });
  waitSometime(shortWait);
  verifyFirstElementTxt({ locator: labelDivision, verifyText: validateDivision });
  dropDownContainsTextClick({ element: drpdwnDivision, typeText: divisionValue, exactText: divisionValue });
  waitSometime(shortWait);
  //Verify Business Unit Field
  verifyFirstElementTxt({ locator: labelBusinessunit, verifyText: validateBusinessUnit });
  clickAction({ locator: drpdwnBusinessUnit });
  dropDownContainsTextClick({ element: drpdwnBusinessUnit, typeText: businessUnitVal, exactText: businessUnitVal });
  waitSometime(shortWait);
  //Verify Project and Contacts Field
  cy.get(drpdwnProject).should('have.attr', 'data-readonly', 'true');
  verifyFirstElementTxt({ locator: labelContact, verifyText: validateContacts });
  clickAction({ locator: drpdwnContacts });
  dropDownContainsTextClick({ element: drpdwnContacts, typeText: contactsValue, exactText: contactsValue });
  waitSometime(shortWait);
  verifyFirstElementTxt({ locator: labelMode, verifyText: validateMode });
  dropDownContainsTextClick({ element: drpdwnMode, typeText: modeValue, exactText: modeValue });
  waitSometime(shortWait);
  verifyFirstElementTxt({ locator: labelSize, verifyText: validateSize });
  dropDownContainsTextClick({ element: drpdwnSize, typeText: sizeValue, exactText: sizeValue });
  //Verify Equipment, IBRegion,OB Region Field
  verifyFirstElementTxt({ locator: labelEquipment, verifyText: validateEquipment });
  dropDownContainsTextClick({ element: drpdwnEquipment, typeText: equipmentValue, exactText: equipmentValue });
  verifyFirstElementTxt({ locator: labelSolutionType, verifyText: validateSolutionType });
  dropDownContainsTextClick({ element: drpdwnSolutionType, typeText: opportunitySolutionTypeVal, exactText: opportunitySolutionTypeVal });
  if (opportunitySolutionTypeVal === 'Freight') {
    waitSometime(shortWait);
    dropDownExactClick({ element: drpdwnSolution, ddValue: solutionFreightValue });
  } else if (opportunitySolutionTypeVal === 'Service') {
    waitSometime(shortWait);
    dropDownExactClick({ element: drpdwnSolution, ddValue: solutionServiceValue });
  }
};

const verifyObIbRegion = () => {
  verifyFirstElementTxt({ locator: labelObRegion, verifyText: validateObRegion });
  waitSometime(shortWait);
  getLocatorFromPageClick({ locator: drpdwnObRegion });
  clickFirstElementIn({ locator: drpdwnObRegionCheckBox });
  verifyFirstElementTxt({ locator: labelIbRegion, verifyText: validateIbRegion });
  waitSometime(shortWait);
  getLocatorFromPageClick({ locator: drpdwnIbRegion });
  clickFirstElementIn({ locator: drpdwnObRegionCheckBox });
};

const switchToClosedStatus = () => {
  dropDownExactClick({ element: btnStatus, ddValue: statusValue });
};

export const selectOpportunityStatusType = (statusType) => {
  cy.get(btnStatus).click().get(tblStatusTypeFilter).each(($chkbox) => {
    cy.get($chkbox).invoke('css', 'background')
      .then(($color) => {
        if ($color.includes('rgb(15, 112, 231)')) {
          cy.get($chkbox).click({ force: true });
        }
      });
  });
  dropDownExactClick({ element: btnStatus, ddValue: statusType });
  cy.get(tblOpportunityRowData).get('[data-cellheader="Status"]').each((value) => {
    if (value.text() === statusType) {
      cy.get(tblOpportunityRowData).each(($val) => {
        cy.log($val.text());
      });
    }
  });
};

const verifyAddopportunityTextFieldsAndDatePicker = ({ pricingStrategy: opportunityPricingStratVal }) => {
  //verify Total Opportunity With Volume,Revenue,Margin and Projected/Anticipated Volume,Revenue,Margin Fields
  verifyFirstElementTxt({ locator: labelTotalOpportunity, verifyText: validateTotalOpportunity });
  verifyFirstElementTxt({ locator: labelVolume, verifyText: validateVolume });
  verifyFirstElementTxt({ locator: labelRevenue, verifyText: validateRevenue });
  verifyFirstElementTxt({ locator: labelMargin, verifyText: validateMargin });
  typeText({ locator: txtTotalOpportunityVolume, dataText: totalVolume });
  typeText({ locator: txtTotalOpportunityRevenue, dataText: totalRevenue });
  typeText({ locator: txtProjectedVolume, dataText: projectedVolume });
  typeText({ locator: txtProjectedRevenue, dataText: projectedRevenue });
  typeText({ locator: txtProjectedMarjin, dataText: projectedMargin });
  //Verify Pricing Strategy
  verifyFirstElementTxt({ locator: labelPricingStrategy, verifyText: validatePricingStrategy });
  dropDownContainsTextClick({ element: drpdwnPricingStrategy, typeText: opportunityPricingStratVal, exactText: opportunityPricingStratVal });
  //Verify Details Field
  verifyFirstElementTxt({ locator: labelDetails, verifyText: fieldDetails });
  typeText({ locator: txtDetails, dataText: opportunityDetails });
  //Verify DatePicker
  datePicker({ dateLocator: dueDate, dataText: returntodayDateMMDDYY() });
  datePicker({ dateLocator: awardDate, dataText: returntodayDateMMDDYY() });
  datePicker({ dateLocator: goLiveDate, dataText: returntodayDateMMDDYY() });
  cy.get(revisitDate).should('have.attr', 'data-readonly', 'true');
  verifyFirstElementTxt({ locator: btnSaveOpportunity, verifyText: saveOpportunityButton });
  verifyVisible({ element: btnSaveOpportunity });
  clickAction({ locator: btnSaveOpportunity });
  waitSometime(moreWait);
};

export const addOppWithNameTypeAndStage = ({ oppNameValue: opportunityNameValue, oppTypeValue: opportunityTypeValue, oppStageValue: opportunityStageValue }) => {
  clearTextType({ element: txtName, typeText: opportunityNameValue });
  dropDownContainsTextClick({ element: drpdwnType, typeText: opportunityTypeValue, exactText: opportunityTypeValue });
  selectItemFromButtonTypeDropDown({ locator: drpDwnOppStage, dropdownVal: opportunityStageValue });
  clickWithWaits({ locator: btnSaveOpportunity, waitTime: moreWait });
};

export const verifyLastUpdatedMsgEditOpp = ({ locator: locatorField, containMsg: expectedMsg }) => {
  cy.get(locatorField).parent().parent().prev().invoke('text').then((actualText) => {
    //cy.log(actualText);
    expect(actualText.toLowerCase()).to.includes(expectedMsg.toLowerCase());
  });
};

export {
  addAndSaveOpportunityWithMandatoryFiedls,
  addOpportunity,
  addNameAndTypeOfOpportunity,
  addSourceCloseReason1,
  addSourceCloseReason2,
  createRegionSet,
  chooseCloseReasonValue,
  navigateTabKey,
  navigateToCrmTab,
  openOpportunityInExpandView,
  openEditOpportunityModal,
  openAddOpportunityModal,
  switchToClosedStatus,
  verifyObIbRegion,
  verifyAndFillOpportunityFields,
  verifyCloseReasonDropDownValues,
  verifyColHoverOverOpportunityTabs,
  verifyAddOpportunityDropDownValues,
  verifyAddopportunityTextFieldsAndDatePicker,
};