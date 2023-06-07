/*eslint-disable cypress/no-unnecessary-waiting */

import homePage from '../../pageObjects/homePage/homePage.json';
import * as powerData from '../../testData/assets/power/powerDetails/powerData.json';
import homePagePower from '../../pageObjects/assets/power/addPower/addPowerPage.json';
import driverSearchPage from '../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import driverAddNewPage from '../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as addDriverPage from '../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as addPowerPage from '../../pageObjects/assets/power/addPower/addPowerPage.json';
import historyData from '../../testData/assets/driver/driverDetails/history/historyData.json';
import commonData from '../../testData/staticData/commonData/commonData.json';
import powerDetails from '../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import { txtFieldPowerCode, btnSearchSubmitPower, linkPower } from '../../pageObjects/assets/power/powerSearch/powerSearchPage.json';
import { datePicker, getDayName, returnfutureDateMMDDYY, verifyTodayDateMMDDYY, verifyfutureDateMMDDYY, returntodayDateMMDDYY, returnPastDateWithFormat, returntodayDateMMDD } from '../../utilities/commonUtils/dateTimeUtils';
import trailerPage from '../../pageObjects/assets/trailer/trailerPage.json';
import trailerDetailsData from '../../testData/assets/trailer/trailerDetailsData.json';
import addDriverData from '../../testData/assets/driver/addDriver/addDriverData.json';
import driverCommonPage from '../../pageObjects/assets/driver/driverCommonPage.json';
import preferencePage from '../../pageObjects/assets/driver/driverDetails/preferences/preferencePage.json';
import preferrenceData from '../../testData/assets/driver/driverDetails/preferrence/preferrenceData.json';
import generalPage from '../../pageObjects/assets/driver/driverDetails/general/generalPage.json';
import * as preferencesPage from '../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import * as genericUtils from '../../utilities/commonUtils/genericUtils';
import preferencesData from '../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import * as targetsAndPerformancePage from '../../pageObjects/assets/driver/driverDetails/targetsAndPerformance/targetsAndPerformancePage.json';
import * as dateTimeutils from '../../utilities/commonUtils/dateTimeUtils';
import {
  clearTypeText,
  clearTextTypeWithLessTime,
  clickAction,
  clickVisibleElement,
  clickActionWait,
  clickAndVerifyAlignment,
  clickCloseXIcon,
  clickFirstElementIn,
  clickLastElementIn,
  containsText,
  dragAndDrop,
  dropDownContainsTextClick,
  generateRandomAlphaNumByLength,
  verifyLengthOfText,
  generateRandomNumberByLength,
  getDateWithTargetDay,
  getDynamicAttr,
  isAttributePresent,
  multipleObjectsClick,
  scrollIntoView,
  toastMsg,
  toastWithMsg,
  typeDropDwn,
  typeDropDwnClick,
  typeDrpDwnWithMachtingText,
  typeText,
  verifyAlignment,
  verifyAttrText,
  verifyDateListInAscendingOrder,
  verifyDateListInDescendingOrder,
  verifyDoesNotExist,
  verifyElementDoesNotHaveValue,
  verifyElementValue,
  verifyExists,
  verifyIfEnabled,
  verifyMaxLength,
  verifyTagName,
  verifyTextContains,
  verifyToDisabled,
  verifyToExist,
  verifyToNotDisabled,
  verifyToolTips,
  verifyVisible,
  waitSometime,
  clearTextType,
  selectItemFromButtonTypeDropDown,
  verifyTextOrBackGroundColor,
  verifyToNotExist,
  generateRandomNumber,
  backspaceClear,
  verifyBackGroundColour,
  clickElementIndex,
  verifyText,
  selectItemFrmSrchPicker,
  dropDownExactClick,
  clickWithWaits,
  clearText,
  tabAndVerifyField,
} from '../../utilities/commonUtils/genericUtils';
import { staticData } from '../../tdm/globalData/staticAssets';
import historyPage from '../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
import driverGeneralData from '../../testData/assets/driver/driverDetails/general/generalData.json';
const { attrDataSelected } = preferencesData.staticData;
const {
  awardDescription,
  driverSpouse,
  parkingSpace,
  phoneNo,
  prefixPhNum,
} = addDriverData.userDefinedData;
const { tabDriverGeneral } = driverCommonPage;
const { defaultAddressType, countryIndia, postalCode, cityState, street1, id, notes, id2, typeOracle, countryUsa, street2, dateWithYear, timeOffVacation } = driverGeneralData.staticData;
//userdefined data for driver professional info.
const { hireDayCount, company, monthCountVal } = driverGeneralData.userDefinedData;
const {
  btnDriverSave,
  resourcesMenu,
  txtFieldAddDriverCode,
  txtFieldDriverFirstName,
  txtFieldDriverLastName,
} = homePage;
const {
  btnPowerSave,
  txtFieldAddPowerCode,
  titlePowerUnitCode,
  drpDwnGeneralInfoType,
  permanentDriverCodesDrpDwnChkBx,
  drpDwnOperDetailDivisionType,
  drpDwnBusinessUnitTerm,
  odometerLbl,
  odometerNumericTxt,
  odometerDrpdownSelValue,
  txtExteriorColor,
  txtInteriorColor,
  drpSleeperTypeTerm,
  drpAxleConfigurationTerm,
  drpSuspensionTerm,
  drpSleeperSizeDimensionsTerm,
} = homePagePower;
const {
  driverNew,
  driverSearch,
  trailerSearch,
  trailerNew,
} = homePage.resourcesDDO;
const {
  powerNew,
  powerSearch,
} = homePagePower.resourcesDDO;
const {
  btnSearchSubmit,
  btnSearchTrailerSubmit,
  drpDwnCountryGenPage,
  expandViewDialogWindow,
  linkDriver,
  tblTrailerSearchResults,
  txtFieldDriverCode,
  txtFieldDriverNameSearch,
  txtFieldPhoneNumGenPage,
  txtFieldTrailerCode,
  clearSearchBtn,
  fleetTxtBx,
  fleetTblColumnValue,
} = driverSearchPage;
const {
  btnAddressAddNew,
  btnTimeOffAddNew,
  btnIdentifierAddNew,
  drpdwnTimeOffType,
  drpdwnAddressCountry,
  drpdwnAddressType,
  drpDwnChildren,
  drpDwnGenderPronoun,
  drpdwnIdentifierType,
  drpDwnMaritalStatus,
  drpDwnMilitaryReserveOblig,
  drpdwnPhoneNumCountry,
  lblAddNewDriver,
  txtFieldAddNotes,
  txtFieldAddresCityState,
  txtFieldAddresPostalCode,
  txtFieldAddresStree1,
  txtFieldIdentifierId,
  txtFieldPersonalParkSpace,
  txtFieldPhoneNumber,
  txtFieldspouseName,
  txtFieldTimeOffAllotedSickDays,
  txtFieldTimeOffAllotedSickDaysRemain,
  txtFieldTimeOffAllotedVacationDays,
  txtFieldTimeOffSickDaysResetDate,
  txtFieldTimeOffVacationDaysRemain,
  txtFieldTimeOffVacationResetDate,
  txtFieldAddresStree2,
  drpDwnPersonalInfoType,
  txtFieldPartner,
  txtFieldCompany,
  txtFieldHireDate,
  drpDwnProfessionalClass,
  txtFieldDriverTrainer,
  txtFieldTerminationDate,
  tabAwards,
  btnAwardsPlusIcon,
  drpDwnDriverAwardType,
  txtFieldAwardDesc,
  txtFieldAwardDate,
} = driverAddNewPage;
const {
  btnCustomizeResetToDefaults,
  btnCustomizeSave,
  btnDialogSubmit,
  btnExpandDropDwnTypeTerm,
  btnDialogClose,
  btnTrainingAddNew,
  colHeaderDueDateParent,
  colHeaderDueDateParentInExpandView,
  customizeDueDateDragItem,
  customizeTable,
  customizeTypeDragItem,
  dialogPopup,
  drpdwnCarrotBtnTraining,
  drpdwnCarrotBtnTrainingInExpand,
  drpdwnCompletedDate,
  drpdwnDueDate,
  drpdwnOptionTrainingCustomize,
  drpdwnOptionTrainingExpand,
  drpdwnOutcome,
  drpdwnTypeTerm,
  dueDateColumnValues,
  iconKebabMenuTraining,
  iconKebabMenuTrainingInExpandView,
  iconKebabMenuTrainingToGetCount,
  kebabMenu,
  listBoxFacility,
  menuOptionDeleteInKebab,
  menuOptionEditInKebab,
  menuOptionEditAddressInKebab,
  previousDatesFromCompletedDate,
  previousDatesFromDueDate,
  rowInExpandView,
  rowTrainingTblTypeColumnVal,
  tblTraining,
  tblTrainingDueDateColumnHeader,
  titleCardTrainingTable,
  txtFieldCityState,
  txtFieldCompletedDate,
  txtFieldDescription,
  txtFieldTrainer,
  btnExpandDropDwnOutCome,
} = historyPage;
const {
  attrAriaAutocomplete,
  attrAriaHaspopup,
  attrClass,
  attrTitle,
  attrDataTestID,
  titleAddNewTrainingDialog,
  trainingCompletedDate,
  trainingDescription,
  trainingDueDate,
  trainingOutcome,
  trainingFacility,
  trainingTrainer,
  trainingType,
} = historyData.staticData;
const {
  grayBackgroundColor,
  marriedStatus,
  driverChildren,
  militaryReserveObligation,
} = addDriverData.staticData;
const {
  dayCountNumber,
  monthCountNumber,
} = trailerDetailsData.userDefinedData;

const {
  lastTwoDigitsInYear,
} = trailerDetailsData.staticData;
const {
  attrListboxVal,
  attrListVal,
  attrRequired,
  attrValForVertBarDfltView,
  attrValForVertBarExpndView,
  datePickerAttributeVal,
  inputTag,
  maxLength255Val,
  maxLength256Val,
  msgAddTraining,
  typeIsRequiredTooltip,
} = historyData.expectedData;
const {
  colorCodeRed,
} = powerData.expectedData;
const {
  borderColor,
  equipmentCodition,
  typeTermInEqpmnt,
  descriptionInPowerEqpmnt,
  attrValue,
  dayCountVal,
  assetIdInEqpmnt,
  lastTwoDigitsInYearInPowerEqpmnt,
  tractorDayCabTypeDrpDwn,
  assetDivisionDrpDwn,
  unitABusinessUnitTerm,
  odometerData,
} = powerData.staticDataPower;
const {
  boolValueTrue,
  defaultView,
  emptyString,
  expandView,
  firstIndexPosition,
  todayCount,
  typeEmptyVal,
} = historyData.userDefinedData;
const {
  longWait,
  moreWait,
  shortWait,
} = commonData;
const {
  labelPrmntDrivers,
  labelPrmntTrailers,
  labelLegalToRun,
  labelOwner,
  labelFleet,
  btnEquipmentAddNew,
  drpdwnTypeTermInEquipment,
  txtFieldDescriptionInEquipment,
  txtFieldCountInEqpmnt,
  txtFieldAssetIdInEqpmnt,
  txtFieldIssueDateInEqpmnt,
  txtFieldRecoverdDateInEqpmnt,
  txtFieldConditionInEqpmnt,
  btnAddEqpmnt,
  txtFieldPowerUnitCodeInAddPower,
  permanentDriverCodesDrpDwn,
} = powerDetails;

const {
  btnAddFleet,
  tabTrailerGeneral,
  btnAddMaintenance,
  btnSaveAddMaintenance,
  btnSaveFleet,
  btnSelectDate,
  btnTrailerSave,
  datePickerActEndDate,
  datePickerActEndTime,
  datePickerActStartDate,
  datePickerActStartTime,
  datePickerEstMaintenanceTime,
  datePickerExpEndDate,
  datePickerExpEndTime,
  datePickerExpStartDate,
  datePickerExpStartTime,
  drpdwnBusinessUnit,
  drpdwnDivision,
  drpdwnFleetType,
  drpdwnSearchTypeTerm,
  drpDwnSeverityTerm,
  drpDwnTypeTerm,
  lblFleetName,
  popUpTitle,
  popUpWindowMaintenance,
  tableTrailer,
  txtFleetEffectiveDate,
  txtFleetName,
  txtTrailerCode,
  drpMake,
  drpType,
  txtYear,
  drpModel,
  txtDisplayName,
  drpCARBCompliant,
  drpMeasurement,
  drpContainerProgram,
  drpPermanentPowerUnitCode,
  drpDevice,
  drpTrackingDevice,
  txtSerialNumber,
  plusMaintenanceEdit,
  tabTrailerOperations,
  drpDwnPowerFleetTypeTerm,
  btnAddPowerFleet,
} = trailerPage;

const {
  fleetAddBtn,
} = generalPage;
const {
  effectiveDateTxtBx,
  expirationDateTxtBx,
  nameDrpDwn,
  addFleetRelationshipBtn,
} = generalPage.fleetPopup;

const {
  btnAddNewContact,
  btnAddPreferredRoute,
  btnAddNewStops,
  btnKabobEdit,
  btnPreferrenceKabobMenu,
  btnSavePreferredRoute,
  chkBoxAdditionalStops,
  colPreferrenceValues,
  colReasonValues,
  colRoutesDate,
  colRoutesRecordedBy,
  colLanesCurrentDate,
  colLanesRecordedBy,
  colStopType,
  colStopsSt,
  colPreference,
  colReason,
  colStopsCity,
  drpDwnDestination,
  drpDwnOriginType,
  drpDwnOriginCity,
  drpDwnRouteStopForEdit,
  drpDwnStopCityForEdit,
  drpDwnDestinationCity,
  drpDwnStopsType,
  drpDwnStopsType2,
  drpDwnStopsCity,
  drpDwnFacility,
  drpDwnReason,
  drpDwnpreferrences,
  txtDestinationCity,
  txtOriginCity,
  toolTipIcon,
} = preferencePage;

const {
  cityValue,
  destinationCity,
  destinationCityDropDown,
  destination1,
  destination2,
  editStopCityValue,
  originType1,
  originType2,
  originCity,
  originCityDropDown,
  preferenceValues,
  reasonValues,
  stopCityValue,
  stateValue,
  stopTypeValue,
  stopTypeValue1,
  stopsFacilityValue,
  toolTip,
} = preferrenceData.expectedData;

const {
  txtRepsField,
} = preferrenceData.userDefined;

const colHeaderStopType = [
  stopTypeValue,
  stopTypeValue1,
];
const {
  schedule,
} = addDriverPage;
const dataObjForEquipment = getDateWithTargetDay({ targetDate: staticData.todayCount });
const issueDateInEqpmnt = `${dataObjForEquipment.mm}/${dataObjForEquipment.dd}/${dataObjForEquipment.yy}`;
const recoverdDateInEqpmnt = `${dataObjForEquipment.mm}/${dataObjForEquipment.dd}/${dataObjForEquipment.yy}`;
const yyYear = issueDateInEqpmnt.slice(-2);

const futureDate = returnfutureDateMMDDYY({ dayCount: dayCountNumber, monthCount: monthCountNumber });
const todayDate = returntodayDateMMDDYY();
const searchDriverWithCode = ({ driverCode: driverCodeVal }) => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  verifyToExist({ element: driverSearch });
  cy.get(driverSearch).click({ force: true });
  cy.wait(shortWait);
  cy.get(txtFieldDriverCode).type(driverCodeVal);
  verifyToExist({ element: btnSearchSubmit });
  cy.get(btnSearchSubmit).click();
  cy.get(linkDriver).eq(0).click();
  cy.wait(longWait);
};
const addDriver = () => {
  const { driverCode } = enterDriverMandatoryFields();
  scrollIntoView({ locator: btnDriverSave });
  clickActionWait({ locator: btnDriverSave });
  return driverCode;
};

const enterDriverMandatoryFields = (shouldAddAddress = true) => {
  const firstName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
  const lastName = 'Last';

  const dateObjToday = getDateWithTargetDay({ targetDate: todayCount });
  const todayDateTime = `${dateObjToday.yyyy}${dateObjToday.mm}${dateObjToday.dd}${dateObjToday.hr}${dateObjToday.mins}${dateObjToday.sec}`;

  const driverCode = generateRandomAlphaNumByLength({ lengthOfString: 5 }) + todayDateTime;
  //Enter text to driver fist name , last name and driver code
  typeText({ locator: txtFieldDriverFirstName, dataText: firstName });
  typeText({ locator: txtFieldDriverLastName, dataText: lastName });
  typeText({ locator: txtFieldAddDriverCode, dataText: driverCode });
  //entering phone number
  typeDrpDwnWithMachtingText({ locator: drpdwnPhoneNumCountry, drpDwnVal: countryIndia });
  typeText({ locator: txtFieldPhoneNumber, dataText: phoneNo + generateRandomNumberByLength({ lengthOfNum: 6 }) });

  if (shouldAddAddress) {
    addAddress({ typeOfAddress: defaultAddressType });
  }

  return { driverCode, firstName };
};

export const enterDriverMandatoryFieldsNAddress = () => {
  const firstName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
  const lastName = 'Last';

  const dateObjToday = getDateWithTargetDay({ targetDate: todayCount });
  const todayDateTime = `${dateObjToday.yyyy}${dateObjToday.mm}${dateObjToday.dd}${dateObjToday.hr}${dateObjToday.mins}${dateObjToday.sec}`;

  const driverCode = generateRandomAlphaNumByLength({ lengthOfString: 5 }) + todayDateTime;
  //Enter text to driver fist name , last name and driver code
  typeText({ locator: txtFieldDriverFirstName, dataText: firstName });
  typeText({ locator: txtFieldDriverLastName, dataText: lastName });
  typeText({ locator: txtFieldAddDriverCode, dataText: driverCode });
  //entering phone number
  typeDrpDwnWithMachtingText({ locator: drpdwnPhoneNumCountry, drpDwnVal: countryIndia });
  typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
  return { driverCode, firstName };
};

const driverSaveAction = () => {
  scrollIntoView({ locator: btnDriverSave });
  clickActionWait({ locator: btnDriverSave });
};

const driverSaveAndVerifyUpdatedMsg = () => {
  driverSaveAction();
  toastWithMsg({ message: msgAddTraining });
};

const addAddress = ({ typeOfAddress: addressType }) => {
  clickActionWait({ locator: btnAddressAddNew });
  dropDownContainsTextClick({ element: drpdwnAddressType, typeText: addressType, exactText: addressType });
  dropDownContainsTextClick({ element: drpdwnAddressCountry, typeText: countryIndia, exactText: countryIndia });
  typeText({ locator: txtFieldAddresStree1, dataText: street1 });
  typeText({ locator: txtFieldAddresCityState, dataText: cityState });
  typeText({ locator: txtFieldAddresPostalCode, dataText: postalCode });
  clickActionWait({ locator: btnDialogSubmit });
};

export const addAddressWoPlus = ({ typeOfAddress: addressType }) => {
  dropDownContainsTextClick({ element: drpdwnAddressType, typeText: addressType, exactText: addressType });
  dropDownContainsTextClick({ element: drpdwnAddressCountry, typeText: countryIndia, exactText: countryIndia });
  typeText({ locator: txtFieldAddresStree1, dataText: street1 });
  typeText({ locator: txtFieldAddresCityState, dataText: cityState });
  typeText({ locator: txtFieldAddresPostalCode, dataText: postalCode });
  clickActionWait({ locator: btnDialogSubmit });
};

const addIdentifier = ({ typeOfIdentifier: identifierType }) => {
  clickActionWait({ locator: btnIdentifierAddNew });
  typeDrpDwnWithMachtingText({ locator: drpdwnIdentifierType, drpDwnVal: identifierType });
  typeText({ locator: txtFieldIdentifierId, dataText: id });
  clearTypeText({ element: txtFieldAddNotes, typeText: notes });
  genericUtils.clickVisibleElement({ locator: btnDialogSubmit });
};

const clickEditInIdentifier = () => {
  clickFirstElementIn({ locator: kebabMenu });
  verifyVisible({ element: menuOptionEditInKebab });
  clickFirstElementIn({ locator: menuOptionEditInKebab });
  typeDrpDwnWithMachtingText({ locator: drpdwnIdentifierType, drpDwnVal: typeOracle });
  clearTypeText({ element: txtFieldIdentifierId, typeText: id2 });
  clickActionWait({ locator: btnDialogSubmit });
};

const clickEditInFirstRow = () => {
  clickFirstElementIn({ locator: kebabMenu });
  verifyVisible({ element: menuOptionEditInKebab });
  clickFirstElementIn({ locator: menuOptionEditInKebab });
  typeDropDwn({ locator: drpdwnAddressCountry, drpDwnVal: countryUsa });
  typeText({ locator: txtFieldAddresStree2, dataText: street2 });
  clickActionWait({ locator: btnDialogSubmit });
};

const addTimeOff = ({ typeOfTimeOff: timeOffType }) => {
  clickActionWait({ locator: btnTimeOffAddNew });
  typeDrpDwnWithMachtingText({ locator: drpdwnTimeOffType, drpDwnVal: timeOffType });
};

export const clickEditTimeOff = ({ kababIndex: indexNumber }) => {
  clickElementIndex({ locator: kebabMenu, index: indexNumber });
  verifyVisible({ element: menuOptionEditInKebab });
  clickFirstElementIn({ locator: menuOptionEditInKebab });
  typeDrpDwnWithMachtingText({ locator: drpdwnTimeOffType, drpDwnVal: timeOffVacation });
  clickActionWait({ locator: btnDialogSubmit });
};

export const clickDeleteTimeOff = ({ rowIndex: indexNumber }) => {
  clickElementIndex({ locator: kebabMenu, index: indexNumber });
  verifyVisible({ element: menuOptionDeleteInKebab });
  clickFirstElementIn({ locator: menuOptionDeleteInKebab });
};

const verifyKebabMenuInEachRow = ({ locator: locatorTable }) => {
  cy.get(locatorTable).find(kebabMenu).each((el) => {
    cy.wrap(el).focus().should('be.visible');
  });
};
const verifyCarrotMenuAtCornerOfTable = ({ locator: locatorTable }) => {
  cy.get(locatorTable).find(titleCardTrainingTable).then((el) => {
    cy.get(locatorTable).find(titleCardTrainingTable).eq(el.length - 1).find(drpdwnCarrotBtnTraining).should('be.visible');
  });
};
const verifyAddNewIconAtBesidesKebabMenu = ({ locator: locatorTable }) => {
  cy.get(locatorTable).find(titleCardTrainingTable).then((el) => {
    cy.get(locatorTable).find(titleCardTrainingTable).eq(el.length - 2).find(btnTrainingAddNew).should('be.visible');
  });
};

const verifyVerticalScrollBar = ({ locator: tableBody, viewOfTable: tableView, maxRowCount: rowCount }) => {
  if (tableView === defaultView) {
    //addTrainingWithMaxRowCount({ viewOfTable: tableView, maxRowCount: rowCount });
    verifyAttrText({ locator: tableBody, attribute: attrClass, verifyText: attrValForVertBarDfltView });
  } else if (tableView === expandView) {
    //addTrainingWithMaxRowCount({ viewOfTable: tableView, maxRowCount: rowCount });
    verifyAttrText({ locator: tableBody, attribute: attrClass, verifyText: attrValForVertBarExpndView });
  }
};

const verifyLastRowContainsColumnTxt = ({ locator: tableRows, locatorColumn: colHeader, containsText: value }) => {
  cy.get(tableRows + " [data-cellheader='" + colHeader + "']").last().should('contain.text', value);
};

export const verifyFirstRowContainsColumnTxt = ({ locator: tableRows, locatorColumn: colHeader, containsText: value }) => {
  cy.get(tableRows + " [data-cellheader='" + colHeader + "']").first().should('contain.text', value);
};

const addTrainingIfNotExist = ({ typrDrpDwnVal: drpDwnValType }) => {
  cy.get(tblTraining).then(body => {
    cy.log(body.find(iconKebabMenuTrainingToGetCount).length);
    if (body.find(iconKebabMenuTrainingToGetCount).length === 0) {
      clickAction({ locator: btnTrainingAddNew });
      verifyVisible({ element: expandViewDialogWindow });
      typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: drpDwnValType });
      clickAction({ locator: btnDialogSubmit });
      cy.get(rowTrainingTblTypeColumnVal).eq(0).should('have.text', drpDwnValType);
    }
  });
};
const addMultipleTrainingAndVerifyAddedAtLast = ({ typrDrpDwnVal: drpDwnValType, totalTrainings: total }) => {
  cy.get(tblTraining).then(body => {
    cy.log(body.find(iconKebabMenuTrainingToGetCount).length);
    if (body.find(iconKebabMenuTrainingToGetCount).length < total) {
      for (let i = body.find(iconKebabMenuTrainingToGetCount).length; i < total; i++) {
        clickAction({ locator: btnTrainingAddNew });
        verifyVisible({ element: expandViewDialogWindow });
        typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: drpDwnValType });
        datePicker({ dateLocator: drpdwnDueDate, dataText: returntodayDateMMDDYY() });
        clickAction({ locator: btnDialogSubmit });
        cy.wait(longWait);
        cy.get(rowTrainingTblTypeColumnVal).eq(body.find(iconKebabMenuTrainingToGetCount).length).should('have.text', drpDwnValType);
      }
    }
  });
};
const addTraining = ({ typrDrpDwnVal: drpDwnValType, date: dateVal }) => {
  cy.wait(longWait);
  clickAction({ locator: btnTrainingAddNew });
  verifyVisible({ element: expandViewDialogWindow });
  typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: drpDwnValType });
  datePicker({ dateLocator: drpdwnDueDate, dataText: dateVal });
  clickAction({ locator: btnDialogSubmit });
  cy.wait(longWait);
  cy.get(iconKebabMenuTrainingToGetCount).then(elem => {
    cy.get(rowTrainingTblTypeColumnVal).eq(elem.length - 1).should('have.text', drpDwnValType);
  });
};

const addTrainingWithMaxRowCount = ({ typeDrpDwnVal: drpDwnValType, viewOfTable: tableView, maxRowCount }) => {
  if (tableView === defaultView) {
    cy.get(tblTraining).then(body => {
      cy.log('row count ' + body.find(iconKebabMenuTrainingToGetCount).length);
      if (body.find(iconKebabMenuTrainingToGetCount).length < maxRowCount) {
        for (let i = body.find(iconKebabMenuTrainingToGetCount).length; i < maxRowCount; i++) {
          clickAction({ locator: btnTrainingAddNew });
          verifyVisible({ element: expandViewDialogWindow });
          dropDownContainsTextClick({ element: drpdwnTypeTerm, typeText: drpDwnValType, exactText: drpDwnValType });
          clickAction({ locator: btnDialogSubmit });
          cy.wait(longWait);
          cy.get(rowTrainingTblTypeColumnVal).eq(body.find(iconKebabMenuTrainingToGetCount).length).should('have.text', drpDwnValType);
        }
      }
    });
  } else if (tableView === expandView) {
    cy.get(rowInExpandView).then(body => {
      cy.log(body.find(iconKebabMenuTrainingToGetCount).length);
      if (body.find(iconKebabMenuTrainingToGetCount).length < maxRowCount) {
        for (let i = body.find(iconKebabMenuTrainingToGetCount).length; i < maxRowCount; i++) {
          clickAction({ locator: btnTrainingAddNew });
          verifyTextContains({ locator: expandViewDialogWindow, containsText: titleAddNewTrainingDialog });
          dropDownContainsTextClick({ element: drpdwnTypeTerm, typeText: drpDwnValType, exactText: drpDwnValType });
          clickAction({ locator: btnDialogSubmit });
          cy.wait(longWait);
          verifyLastRowContainsColumnTxt({ locator: rowInExpandView, locatorColumn: trainingType, containsText: drpDwnValType });
        }
      }
    });
  }
};

const openTrainingTblExpandView = () => {
  clickAction({ locator: drpdwnCarrotBtnTraining });
  clickAction({ locator: drpdwnOptionTrainingExpand });
  verifyVisible({ element: expandViewDialogWindow });
  waitSometime(shortWait);
};

const addTrainingWithAllFields = ({ map: trainingData }) => {
  clickAction({ locator: btnTrainingAddNew });
  addDataIntoRow({ map: trainingData });
  clickAction({ locator: btnDialogSubmit });
};

const addTrainingWithFewFields = ({ map: trainingData }) => {
  clickAction({ locator: btnTrainingAddNew });
  addTrainingDataIntoRow({ map: trainingData });
  clickAction({ locator: btnDialogSubmit });
};

const addDataIntoRow = ({ map: trainingData }) => {
  typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: trainingData.get(trainingType) });
  datePicker({ dateLocator: drpdwnDueDate, dataText: trainingData.get(trainingDueDate) });
  datePicker({ dateLocator: drpdwnCompletedDate, dataText: trainingData.get(trainingCompletedDate) });
  typeDropDwnClick({ locator: drpdwnOutcome, drpDwnVal: trainingData.get(trainingOutcome) });
  typeDropDwnClick({ locator: listBoxFacility, drpDwnVal: trainingData.get(trainingFacility) });
  typeText({ locator: txtFieldTrainer, dataText: trainingData.get(trainingTrainer) });
  typeText({ locator: txtFieldDescription, dataText: trainingData.get(trainingDescription) });
};

const addTrainingDataIntoRow = ({ map: trainingData }) => {
  typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: trainingData.get(trainingType) });
  datePicker({ dateLocator: drpdwnDueDate, dataText: trainingData.get(trainingDueDate) });
  datePicker({ dateLocator: drpdwnCompletedDate, dataText: trainingData.get(trainingCompletedDate) });
  typeDropDwnClick({ locator: drpdwnOutcome, drpDwnVal: trainingData.get(trainingOutcome) });
  typeDropDwnClick({ locator: listBoxFacility, drpDwnVal: trainingData.get(trainingFacility) });
  typeText({ locator: txtFieldTrainer, dataText: trainingData.get(trainingTrainer) });
  typeText({ locator: txtFieldDescription, dataText: trainingData.get(trainingDescription) });
};

const editTrainingWithAllFields = ({ map: trainingData }) => {
  clickEditInLastRow();
  addDataIntoRow({ map: trainingData });
  clickAction({ locator: btnDialogSubmit });
};

const clickEditInLastRow = () => {
  clickLastElementIn({ locator: kebabMenu });
  verifyVisible({ element: menuOptionEditInKebab });
  clickLastElementIn({ locator: menuOptionEditInKebab });
};

const clickEditAddressInLastRow = () => {
  clickLastElementIn({ locator: kebabMenu });
  verifyVisible({ element: menuOptionEditAddressInKebab });
  clickLastElementIn({ locator: menuOptionEditAddressInKebab });
};

export const clickDeleteAddress = ({ rowIndex: indexNumber }) => {
  clickElementIndex({ locator: kebabMenu, index: indexNumber });
  verifyVisible({ element: menuOptionDeleteInKebab });
  clickFirstElementIn({ locator: menuOptionDeleteInKebab });
};

export const clickEditAddress = ({ kababIndex: indexNumber }) => {
  clickElementIndex({ locator: kebabMenu, index: indexNumber });
  verifyVisible({ element: menuOptionEditInKebab });
  clickFirstElementIn({ locator: menuOptionEditInKebab });
};
const clickDeleteInFirstRow = () => {
  clickFirstElementIn({ locator: kebabMenu });
  verifyVisible({ element: menuOptionDeleteInKebab });
  clickFirstElementIn({ locator: menuOptionDeleteInKebab });
};

const editTrainingPopupFieldValidations = ({ viewOfTable: tableView, inputDataObj: dataObj }) => {
  if (tableView === defaultView) {
    multipleObjectsClick({ locator: iconKebabMenuTraining, position: firstIndexPosition });
  } else if (tableView === expandView) {
    openTrainingTblExpandView();
    multipleObjectsClick({ locator: iconKebabMenuTrainingInExpandView, position: firstIndexPosition });
  }
  multipleObjectsClick({ locator: menuOptionEditInKebab, position: firstIndexPosition });
  verifyVisible({ element: expandViewDialogWindow });
  typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: typeEmptyVal });
  verifyToolTips({ locator: btnDialogSubmit, verifyText: typeIsRequiredTooltip });
  //Verify Save Training button Disabled
  verifyToDisabled({ element: btnDialogSubmit });
  //Verify able to select Due Date
  datePicker({ dateLocator: drpdwnDueDate, dataText: returntodayDateMMDDYY() });
  verifyElementValue({ locator: drpdwnDueDate, verifyText: returntodayDateMMDDYY() });
  //Verify able to select Completed Date
  datePicker({ dateLocator: txtFieldCompletedDate, dataText: returntodayDateMMDDYY() });
  verifyElementValue({ locator: txtFieldCompletedDate, verifyText: returntodayDateMMDDYY() });
  //Verify after entering all mandatory fields Save Training button is enabled
  typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: dataObj?.trainingType });
  verifyToNotDisabled({ element: btnDialogSubmit });
  if (tableView === defaultView) {
    clickCloseXIcon();
  }
};

const verifySortOrder = () => {
  clickAction({ locator: tblTrainingDueDateColumnHeader });
  waitSometime(shortWait);
  verifyDateListInAscendingOrder({ locator: dueDateColumnValues });
  clickAction({ locator: tblTrainingDueDateColumnHeader });
  waitSometime(shortWait);
  verifyDateListInDescendingOrder({ locator: dueDateColumnValues });
  clickAction({ locator: tblTrainingDueDateColumnHeader });
};

const customizeTablColumns = ({ viewOfTable: tableView }) => {
  if (tableView === defaultView) {
    clickAction({ locator: drpdwnCarrotBtnTraining });
  } else if (tableView === expandView) {
    clickAction({ locator: drpdwnCarrotBtnTrainingInExpand });
  }
  clickAction({ locator: drpdwnOptionTrainingCustomize });
  verifyToExist({ element: customizeTable });
  if (tableView === expandView) {
    clickAction({ locator: btnCustomizeResetToDefaults });
  }
  dragAndDrop({ draggedElement: customizeTypeDragItem, stationaryElement: customizeDueDateDragItem, refElement: customizeTable });
  clickAction({ locator: btnCustomizeSave });
  waitSometime(shortWait);
};

const navigateToAddTrainingPopup = () => {
  clickAction({ locator: btnTrainingAddNew });
  verifyTextContains({ locator: expandViewDialogWindow, containsText: titleAddNewTrainingDialog });
};

const validateTypeTermDrpDwn = () => {
  verifyAttrText({ locator: btnExpandDropDwnTypeTerm, attribute: attrAriaHaspopup, verifyText: attrListboxVal });
  isAttributePresent({ locator: drpdwnTypeTerm, bool: boolValueTrue, attributeName: attrRequired });
};

const validateFacilityFields = ({ inputDataObj: dataObj }) => {
  verifyAttrText({ locator: listBoxFacility, attribute: attrAriaAutocomplete, verifyText: attrListVal });
  verifyElementDoesNotHaveValue({ locator: txtFieldCityState });
  typeDropDwnClick({ locator: listBoxFacility, drpDwnVal: dataObj?.trainingFacility });
  verifyElementValue({ locator: txtFieldCityState, verifyText: dataObj?.trainingCity });
};

const validateDueDateAndCompleteDate = () => {
  //validating previous dates are disabled and not able select
  clickAction({ locator: drpdwnDueDate });
  clickFirstElementIn({ locator: previousDatesFromDueDate });
  verifyElementValue({ locator: drpdwnDueDate, verifyText: emptyString });
  clickAction({ locator: drpdwnCompletedDate });
  clickFirstElementIn({ locator: previousDatesFromCompletedDate });
  verifyElementValue({ locator: drpdwnCompletedDate, verifyText: emptyString });
  verifyAttrText({ locator: drpdwnDueDate, attribute: attrDataTestID, verifyText: datePickerAttributeVal });
  verifyAttrText({ locator: drpdwnCompletedDate, attribute: attrDataTestID, verifyText: datePickerAttributeVal });
  //validating datepickers to select given dates or not
  datePicker({ dateLocator: drpdwnDueDate, dataText: returntodayDateMMDDYY() });
  verifyElementValue({ locator: drpdwnDueDate, verifyText: returntodayDateMMDDYY() });
  datePicker({ dateLocator: drpdwnCompletedDate, dataText: returntodayDateMMDDYY() });
  verifyElementValue({ locator: drpdwnCompletedDate, verifyText: returntodayDateMMDDYY() });
};

const validateStateOfAddTrainingBtn = ({ inputDataObj: dataObj }) => {
  verifyToDisabled({ element: btnDialogSubmit });
  typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: dataObj?.trainingType });
  verifyToNotDisabled({ element: btnDialogSubmit });
};

const validateTrainerAndDescnFields = () => {
  verifyTagName({ locator: txtFieldTrainer, tagName: inputTag });
  verifyMaxLength({ locator: txtFieldTrainer, maxLength: maxLength255Val });
  verifyTagName({ locator: txtFieldDescription, tagName: inputTag });
  verifyMaxLength({ locator: txtFieldDescription, maxLength: maxLength256Val });
};

const validateSortingbtwTwoViews = ({ viewOfTable: tableView }) => {
  if (tableView === defaultView) {
    clickAndVerifyAlignment({ locator: colHeaderDueDateParent, element: tblTrainingDueDateColumnHeader });
    openTrainingTblExpandView();
    verifyAlignment({ locator: colHeaderDueDateParentInExpandView, element: tblTrainingDueDateColumnHeader });
  } else if (tableView === expandView) {
    clickAndVerifyAlignment({ locator: colHeaderDueDateParentInExpandView, element: tblTrainingDueDateColumnHeader });
  }
  waitSometime(longWait);
  clickAction({ locator: tblTrainingDueDateColumnHeader });
  clickAction({ locator: tblTrainingDueDateColumnHeader });
};

const verifyRowData = ({ locator: rowData, inputDataObj: dataObj }) => {
  dataObj.forEach((value, key) => {
    verifyLastRowContainsColumnTxt({ locator: rowData, locatorColumn: key, containsText: value });
  });
};

export const verifyFirstRowDate = ({ locator: rowData, inputDataObj: dataObj }) => {
  dataObj.forEach((value, key) => {
    verifyFirstRowContainsColumnTxt({ locator: rowData, locatorColumn: key, containsText: value });
  });
};

const verifySaveFunctionality = ({ locator: rowData, dataText: expectedVal }) => {
  clickAction({ locator: btnDialogSubmit });
  toastWithMsg({ message: msgAddTraining });
  verifyDoesNotExist({ element: dialogPopup });
  waitSometime(longWait);
  verifyLastRowContainsColumnTxt({ locator: rowData, locatorColumn: trainingType, containsText: expectedVal });
};

const searchPowerWithCode = ({ powerCode: powerCodeVal }) => {
  navigateToPowerSearch();
  typeText({ locator: txtFieldPowerCode, dataText: powerCodeVal });
  verifyToExist({ element: btnSearchSubmitPower });
  clickAction({ locator: btnSearchSubmitPower });
  verifyToExist({ element: linkPower });
  cy.get(linkPower).click().wait(longWait);
};

const navigateToAddPowerNewPage = () => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  clickAction({ locator: resourcesMenu });
  verifyToExist({ element: powerNew });
  clickAction({ locator: powerNew });
};

const navigateToPowerSearch = () => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  verifyToExist({ element: powerSearch });
  cy.get(powerSearch).click({ force: true });
  cy.wait(shortWait);
};

const createPowerWithMandatoryFields = () => {
  const defaultPowerCode = 'PC';
  const randomNumber = generateRandomNumber();
  const finalPowerCode = defaultPowerCode + randomNumber;
  verifyTextOrBackGroundColor({ locator: txtFieldPowerUnitCodeInAddPower, color: borderColor, colorCode: colorCodeRed });
  waitSometime(shortWait);
  typeText({ locator: txtFieldAddPowerCode, dataText: finalPowerCode });
  cy.get(btnPowerSave).focus();
  return finalPowerCode;
};
const createPowerWithMandatoryFieldsAndOdometerField = () => {
  const defaultPowerCode = 'PC';
  const randomNumber = generateRandomNumber();
  const finalPowerCode = defaultPowerCode + randomNumber;
  verifyTextOrBackGroundColor({ locator: txtFieldPowerUnitCodeInAddPower, color: borderColor, colorCode: colorCodeRed });
  waitSometime(shortWait);
  typeText({ locator: txtFieldAddPowerCode, dataText: finalPowerCode });
  //Verify if Odometer or OdometerMiles field availibility
  verifyToExist({ element: odometerLbl });
  waitSometime(shortWait);
  verifyToExist({ element: odometerNumericTxt });
  //Verify if Odometer or OdometerMiles field should not allow or take letter "e"
  typeText({ locator: odometerNumericTxt, dataText: 'e' });
  //Verify if Odometer or OdometerMiles field should allow or take only numeric data
  typeText({ locator: odometerNumericTxt, dataText: odometerData });
  //Verify Odometer UOM field availibillity with "mi"selected by default and Odometer Miles UOM field shouldnt be available
  verifyToExist({ element: odometerDrpdownSelValue });
  cy.get(btnPowerSave).focus();
};

const createTrailerWithMandatoryFieldsAndOdometerField = () => {
  const defaultTrailerCode = 'TR';
  const randomNumber = generateRandomNumber();
  const finalTrailerCode = defaultTrailerCode + randomNumber;
  waitSometime(shortWait);
  typeText({ locator: txtTrailerCode, dataText: finalTrailerCode });
};

const addPower = () => {
  navigateToAddPowerNewPage();
  const finalPowerCode = createPowerWithMandatoryFields();
  submitPowerAndVerifyToastMsg();
  return finalPowerCode;
};
const addPowerNotes = (number) => {
  const notes = generateRandomAlphaNumByLength({ lengthOfString: number });
  clearTextTypeWithLessTime({ element: addDriverPage.timeOff.txtFieldNote, typeText: notes });
  verifyLengthOfText({ locator: addDriverPage.timeOff.txtFieldNote, maxLength: number });
};

const addPowerByValidatingOdometerField = () => {
  navigateToAddPowerNewPage();
  const finalPowerCode = createPowerWithMandatoryFieldsAndOdometerField();
  submitPowerAndVerifyToastMsg();
  return finalPowerCode;
};

const addTrailerByValidatingOdometerField = () => {
  navigateToAddTrailer();
  const finalTrailerCode = createTrailerWithMandatoryFieldsAndOdometerField();
  saveTrailer();
  return finalTrailerCode;
};

const addPowerAppearance = (exteriorColor, interiorColor, sleeperTypeTerm, axleConfigurationTerm, suspensionTerm, sleeperSizeDimensionsTerm) => {
  clearTextType({ element: txtExteriorColor, typeText: exteriorColor });
  clearTextType({ element: txtInteriorColor, typeText: interiorColor });
  typeDropDwn({ locator: drpSleeperTypeTerm, drpDwnVal: sleeperTypeTerm });
  typeDropDwn({ locator: drpAxleConfigurationTerm, drpDwnVal: axleConfigurationTerm });
  typeDropDwn({ locator: drpSuspensionTerm, drpDwnVal: suspensionTerm });
  typeDropDwn({ locator: drpSleeperSizeDimensionsTerm, drpDwnVal: sleeperSizeDimensionsTerm });
};
const submitPowerAndVerifyToastMsg = () => {
  clickAction({ locator: btnPowerSave });
  toastMsg();
};

const enterDataToFewPowerFields = ({ driverCode: permanentDrivers }) => {
  cy.get(permanentDriverCodesDrpDwn).click().wait(longWait);
  cy.get(permanentDriverCodesDrpDwn).type(permanentDrivers);
  waitSometime(longWait);
  clickAction({ locator: permanentDriverCodesDrpDwnChkBx });
  typeDropDwn({ locator: drpDwnGeneralInfoType, drpDwnVal: tractorDayCabTypeDrpDwn });
  typeDropDwn({ locator: drpDwnOperDetailDivisionType, drpDwnVal: assetDivisionDrpDwn });
  typeDropDwn({ locator: drpDwnBusinessUnitTerm, drpDwnVal: unitABusinessUnitTerm });
};

const addPowerAppearanceDetails = (exteriorColor, interiorColor, sleeperTypeTerm, axleConfigurationTerm, suspensionTerm, sleeperSizeDimensionsTerm) => {
  clearTextType({ element: powerDetails.appearence.txtExteriorColor, typeText: exteriorColor });
  clearTextType({ element: powerDetails.appearence.txtInteriorColor, typeText: interiorColor });
  typeDropDwnClick({ locator: powerDetails.appearence.drpSleeperTypeTerm, drpDwnVal: sleeperTypeTerm });
  typeDropDwnClick({ locator: powerDetails.appearence.drpAxleConfigurationTerm, drpDwnVal: axleConfigurationTerm });
  typeDropDwnClick({ locator: powerDetails.appearence.drpSuspensionTerm, drpDwnVal: suspensionTerm });
  typeDropDwnClick({ locator: powerDetails.appearence.drpSleeperSizeDimensionsTerm, drpDwnVal: sleeperSizeDimensionsTerm });
};

const searchPowerWithFilters = ({ powerCode: powerCodeVal, searchLocator, searchTypeVal: searchVal }) => {
  typeDrpDwnWithMachtingText({ locator: searchLocator, drpDwnVal: searchVal });
  waitSometime(shortWait);
  typeText({ locator: txtFieldPowerCode, dataText: powerCodeVal });
  verifyToExist({ element: btnSearchSubmitPower });
  clickAction({ locator: btnSearchSubmitPower });
  verifyExists({ element: linkPower });
  //cy.get(linkPower).should('be.visible'), { timeout: 60000 }
};

const searchPowerWithDivision = ({ powerCode: powerCodeVal, searchLocator, searchTypeVal: searchVal }) => {
  typeDropDwn({ locator: searchLocator, drpDwnVal: searchVal });
  waitSometime(shortWait);
  typeText({ locator: txtFieldPowerCode, dataText: powerCodeVal });
  verifyToExist({ element: btnSearchSubmitPower });
  clickAction({ locator: btnSearchSubmitPower });
  verifyExists({ element: linkPower });
  //cy.get(linkPower).should('be.visible'), { timeout: 60000 }
};

const createPowerWithSomeFields = ({ driverCode: permanentDrivers }) => {
  navigateToAddPowerNewPage();
  const finalPowerCode = createPowerWithMandatoryFields();
  enterDataToFewPowerFields({ driverCode: permanentDrivers });
  submitPowerAndVerifyToastMsg();
  verifyText({ locator: titlePowerUnitCode, verifyText: 'Power -' + finalPowerCode });
  return finalPowerCode;
};

const addNewEquipmentCardInPower = () => {
  clickAction({ locator: btnEquipmentAddNew });
  typeDropDwnClick({ locator: drpdwnTypeTermInEquipment, drpDwnVal: typeTermInEqpmnt });
  clickAction({ locator: txtFieldDescriptionInEquipment });
  typeText({ locator: txtFieldDescriptionInEquipment, dataText: descriptionInPowerEqpmnt });
  backspaceClear({ element: txtFieldCountInEqpmnt });
  typeText({ locator: txtFieldCountInEqpmnt, dataText: dayCountVal });
  typeText({ locator: txtFieldAssetIdInEqpmnt, dataText: assetIdInEqpmnt });
  datePicker({ dateLocator: txtFieldIssueDateInEqpmnt, dataText: issueDateInEqpmnt });
  cy.then(() => expect(yyYear.length).to.equal(lastTwoDigitsInYearInPowerEqpmnt.length));
  datePicker({ dateLocator: txtFieldRecoverdDateInEqpmnt, dataText: recoverdDateInEqpmnt });
  typeDropDwnClick({ locator: txtFieldConditionInEqpmnt, drpDwnVal: equipmentCodition });
  verifyAttrText({ locator: txtFieldRecoverdDateInEqpmnt, attribute: attrValue, verifyText: issueDateInEqpmnt });
  clickAction({ locator: btnAddEqpmnt });
};
const tabsInOperationalDetailsCard = () => {
  verifyToNotExist({ element: labelPrmntDrivers });
  verifyToNotExist({ element: labelPrmntTrailers });
  verifyToNotExist({ element: labelOwner });
  verifyToNotExist({ element: labelLegalToRun });
  verifyToNotExist({ element: labelFleet });
};
const navigateToDriverAddNewPage = () => {
  waitSometime(longWait);
  cy.get(resourcesMenu);
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  verifyToExist({ element: driverNew });
  cy.get(driverNew).click({ force: true });
  cy.wait(longWait);
  verifyVisible({ element: lblAddNewDriver });
};

const verifyInputFieldTagAndMaxLength = ({ locator: inputLocatorField, maxLength: maxLengthVal }) => {
  verifyTagName({ locator: inputLocatorField, tagName: inputTag });
  verifyMaxLength({ locator: inputLocatorField, maxLength: maxLengthVal });
};

const validateDrpDwnField = ({ locatorBtn: drpDwnExpandBtn, locatorDrpDwn: drpDwnLocator }) => {
  verifyAttrText({ locator: drpDwnExpandBtn, attribute: attrAriaHaspopup, verifyText: attrListboxVal });
  isAttributePresent({ locator: drpDwnLocator, bool: boolValueTrue, attributeName: attrRequired });
};
const searchTrailerWithCode = ({ trailerCode: trailerCodeVal }) => {
  verifyToExist({ element: resourcesMenu });
  clickAction({ locator: resourcesMenu });
  verifyToExist({ element: trailerSearch });
  clickAction({ locator: trailerSearch });
  cy.wait(shortWait);
  typeText({ locator: txtFieldTrailerCode, dataText: trailerCodeVal });
  verifyToExist({ element: btnSearchTrailerSubmit });
  clickAction({ locator: btnSearchTrailerSubmit });
  containsText({ locator: tblTrailerSearchResults, verifyText: trailerCodeVal });
  getDynamicAttr({ button: trailerCodeVal });
};

const addTrailerMaintenanceRecd = ({ maintenanceType: maintenanceTypeValue, maintenanceSeverity: maintenanceSeverityValue, workPerformed: workPerformedValue }) => {
  verifyExists({ element: popUpWindowMaintenance });
  verifyExists({ element: popUpTitle });
  verifyToDisabled({ element: btnAddMaintenance });
  dropDownContainsTextClick({ element: drpDwnTypeTerm, typeText: maintenanceTypeValue, exactText: maintenanceTypeValue });
  dropDownContainsTextClick({ element: drpDwnSeverityTerm, typeText: maintenanceSeverityValue, exactText: maintenanceSeverityValue });
  typeText({ locator: datePickerExpStartDate, dataText: futureDate });
  cy.then(() => { expect(yyYear.length).to.equal(lastTwoDigitsInYear.length); });
  typeText({ locator: datePickerExpEndDate, dataText: futureDate });
  cy.then(() => { expect(yyYear.length).to.equal(lastTwoDigitsInYear.length); });
  typeText({ locator: datePickerActStartDate, dataText: todayDate });
  cy.then(() => { expect(yyYear.length).to.equal(lastTwoDigitsInYear.length); });
  typeText({ locator: datePickerActEndDate, dataText: todayDate });
  cy.then(() => { expect(yyYear.length).to.equal(lastTwoDigitsInYear.length); });
  verifyIfEnabled({ locator: btnAddMaintenance });
  clickAction({ locator: btnAddMaintenance });
};

const verifyMaintenanceWindowAvaFields = () => {
  verifyToExist({ element: datePickerExpStartDate });
  verifyToExist({ element: datePickerExpStartTime });
  verifyToExist({ element: datePickerActStartDate });
  verifyToExist({ element: datePickerActStartTime });
  verifyToExist({ element: datePickerEstMaintenanceTime });
  verifyToExist({ element: datePickerExpEndDate });
  verifyToExist({ element: datePickerExpEndTime });
  verifyToExist({ element: datePickerActEndDate });
  verifyToExist({ element: datePickerActEndTime });
  verifyToExist({ element: dialogPopup });
  verifyToExist({ element: btnSaveAddMaintenance });
};
const createTrailerWithOptionalFields = (trailerCode, drpDwnValType, drpDwnValDivision, drpDwnValBusinessUnit) => {
  verifyToExist({ element: resourcesMenu });
  clickAction({ locator: resourcesMenu });
  verifyToExist({ element: trailerNew });
  clickAction({ locator: trailerNew });
  waitSometime(shortWait);
  typeText({ locator: txtTrailerCode, dataText: trailerCode });
  typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: drpDwnValType });
  typeDropDwnClick({ locator: drpdwnDivision, drpDwnVal: drpDwnValDivision });
  typeDropDwnClick({ locator: drpdwnBusinessUnit, drpDwnVal: drpDwnValBusinessUnit });
};
const createTrailerWithMandatoryFields = (trailerCode) => {
  verifyToExist({ element: resourcesMenu });
  clickAction({ locator: resourcesMenu });
  verifyToExist({ element: trailerNew });
  clickAction({ locator: trailerNew });
  waitSometime(moreWait);
  typeText({ locator: txtTrailerCode, dataText: trailerCode });
};
const saveTrailer = () => {
  clickAction({ locator: btnTrailerSave });
  toastMsg();
};
const trailerGeneralInformation = (makeVal, typeVal, yearVal, modelVal, displayVal, compliantVal, measurementVal) => {
  typeDropDwnClick({ locator: drpMake, drpDwnVal: makeVal });
  typeDropDwnClick({ locator: drpType, drpDwnVal: typeVal });
  typeText({ locator: txtYear, dataText: yearVal });
  typeDropDwnClick({ locator: drpModel, drpDwnVal: modelVal });
  typeText({ locator: txtDisplayName, dataText: displayVal });
  typeDropDwnClick({ locator: drpCARBCompliant, drpDwnVal: compliantVal });
  typeDropDwnClick({ locator: drpMeasurement, drpDwnVal: measurementVal });
};
const trailerOperationalDetails = (containerProgramVal, permanentPowerUnitCodeVal, DivisionVal, businessUnitVal) => {
  typeDropDwnClick({ locator: drpContainerProgram, drpDwnVal: containerProgramVal });
  //typeDropDwnClick({ locator: drpPermanentDriverCodes, drpDwnVal: permanentDriverCodesVal });
  typeDropDwnClick({ locator: drpPermanentPowerUnitCode, drpDwnVal: permanentPowerUnitCodeVal });
  typeDropDwnClick({ locator: drpdwnDivision, drpDwnVal: DivisionVal });
  typeDropDwnClick({ locator: drpdwnBusinessUnit, drpDwnVal: businessUnitVal });
};
const trailerTrackingInformation = (deviceVal, trackingDeviceVal, serialNumberVal) => {
  typeDropDwnClick({ locator: drpDevice, drpDwnVal: deviceVal });
  typeDropDwnClick({ locator: drpTrackingDevice, drpDwnVal: trackingDeviceVal });
  typeText({ locator: txtSerialNumber, dataText: serialNumberVal });
};
const trailerUpdate = () => {
  clickAction({ locator: tabTrailerOperations });
  waitSometime(shortWait);
  verifyExists({ element: plusMaintenanceEdit });
  clickAction({ locator: plusMaintenanceEdit });
  verifyMaintenanceWindowAvaFields();
};
const searchTrailerWithType = (drpDwnValType, trailerCode) => {
  verifyToExist({ element: resourcesMenu });
  clickAction({ locator: resourcesMenu });
  verifyToExist({ element: trailerSearch });
  clickAction({ locator: trailerSearch });
  waitSometime(shortWait);
  typeText({ locator: txtFieldTrailerCode, dataText: trailerCode });
  typeDropDwnClick({ locator: drpdwnSearchTypeTerm, drpDwnVal: drpDwnValType });
  verifyToExist({ element: btnSearchTrailerSubmit });
  clickAction({ locator: btnSearchTrailerSubmit });
  containsText({ locator: tblTrailerSearchResults, verifyText: drpDwnValType });
};
const addTrailerFleet = (drpDwnValType, fleetName) => {
  verifyToExist({ element: btnAddFleet });
  clickFirstElementIn({ locator: btnAddFleet });
  typeDropDwnClick({ locator: drpdwnFleetType, drpDwnVal: drpDwnValType });
  verifyToExist({ element: txtFleetEffectiveDate });
  clickAction({ locator: txtFleetEffectiveDate });
  clickFirstElementIn({ locator: btnSelectDate });
  typeText({ locator: txtFleetName, dataText: fleetName });
  clickFirstElementIn({ locator: btnSelectDate });
  clickAction({ locator: btnSaveFleet });
  toastMsg();
  verifyToExist({ element: lblFleetName });
};
const editTrailer = (drpDwnValType, drpDwnValDivision) => {
  clickAction({ locator: tabTrailerGeneral });
  typeDropDwnClick({ locator: drpdwnTypeTerm, drpDwnVal: drpDwnValType });
  typeDropDwnClick({ locator: drpdwnDivision, drpDwnVal: drpDwnValDivision });
  clickAction({ locator: btnTrailerSave });
  toastMsg();
};
const validateRow = (fleetName) => {
  cy.get(tableTrailer).each((ele, index) => {
    const text = ele.text();
    if (text.includes(fleetName)) {
      cy.get(tableTrailer).eq(index).next().should('have.text', fleetName);
    }
  });
};
const searchDriverWithName = ({ driverName: driverNameVal }) => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  verifyToExist({ element: driverSearch });
  cy.get(driverSearch).click({ force: true });
  cy.wait(shortWait);
  cy.get(txtFieldDriverNameSearch).type(driverNameVal);
  verifyToExist({ element: btnSearchSubmit });
  cy.get(btnSearchSubmit).click();
  cy.get(linkDriver).click().wait(longWait);
};

const navigateToDriverSearchPage = () => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  verifyToExist({ element: driverSearch });
  cy.get(driverSearch).click({ force: true });
  cy.wait(shortWait);
  verifyVisible({ element: txtFieldDriverCode });
};

const searchDriverWithPhoneNumber = ({ dataTextCountry: country, dataTextPhNumber: randPhoneNumber }) => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  verifyToExist({ element: driverSearch });
  cy.get(driverSearch).click({ force: true });
  cy.wait(shortWait);
  typeDrpDwnWithMachtingText({ locator: drpDwnCountryGenPage, drpDwnVal: country });
  cy.get(txtFieldPhoneNumGenPage).type(randPhoneNumber);
  verifyToExist({ element: btnSearchSubmit });
  cy.get(btnSearchSubmit).click();
  cy.get(linkDriver).click().wait(longWait);
  clickActionWait({ locator: tabDriverGeneral });
  const num1 = randPhoneNumber.slice(0, 5);
  const num2 = randPhoneNumber.slice(5, 10);
  const phoneNumber = prefixPhNum + num1 + ' ' + num2;
  verifyElementValue({ locator: txtFieldPhoneNumber, verifyText: phoneNumber });
};

const searchDriverWithDriverCodeAndDrpDwnvalue = ({ locator: drpDwnElement, dataTextDriverCode: driverCodeVal, drpDwnvalue: value }) => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  waitSometime(shortWait);
  verifyToExist({ element: driverSearch });
  cy.get(driverSearch).click({ force: true });
  cy.wait(shortWait);
  cy.get(txtFieldDriverCode).type(driverCodeVal);
  typeDrpDwnWithMachtingText({ locator: drpDwnElement, drpDwnVal: value });
  verifyToExist({ element: btnSearchSubmit });
  cy.get(btnSearchSubmit).click();
  cy.get(linkDriver).click().wait(longWait);
};

const verifyDriverSearchResultsRowData = ({ driverCode: code, rowDataLocator: dataLocator, containsText: expectedText }) => {
  navigateToDriverSearchPage();
  typeText({ locator: txtFieldDriverCode, dataText: code });
  clickActionWait({ locator: btnSearchSubmit });
  waitSometime(longWait);
  if (expectedText === '') {
    verifyDoesNotExist({ element: dataLocator });
  } else {
    verifyTextContains({ locator: dataLocator, containsText: expectedText });
  }
};

const verifyTimeOffTblFieldsGrayOut = () => {
  verifyToExist({ element: txtFieldTimeOffAllotedVacationDays });
  verifyBackGroundColour({ locator: txtFieldTimeOffAllotedVacationDays, colourValue: grayBackgroundColor });
  verifyBackGroundColour({ locator: txtFieldTimeOffVacationDaysRemain, colourValue: grayBackgroundColor });
  verifyBackGroundColour({ locator: txtFieldTimeOffVacationResetDate, colourValue: grayBackgroundColor });
  verifyBackGroundColour({ locator: txtFieldTimeOffAllotedSickDays, colourValue: grayBackgroundColor });
  verifyBackGroundColour({ locator: txtFieldTimeOffAllotedSickDaysRemain, colourValue: grayBackgroundColor });
  verifyBackGroundColour({ locator: txtFieldTimeOffSickDaysResetDate, colourValue: grayBackgroundColor });
};

const searchDriverWithFleetAndVerify = ({ fleetName: fleetNameVal }) => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  verifyToExist({ element: driverSearch });
  cy.get(driverSearch).click({ force: true });
  cy.wait(shortWait);
  clickAction({ locator: clearSearchBtn });
  typeDropDwn({ locator: fleetTxtBx, drpDwnVal: fleetNameVal });
  verifyToExist({ element: btnSearchSubmit });
  cy.get(btnSearchSubmit).click();
  verifyTextContains({ locator: fleetTblColumnValue, containsText: fleetNameVal });
};

const createFleetToDriver = ({ effectiveDate: effectiveDateVal, expirationDate: expirationDateVal, carrierName: carrierNameVal }) => {
  verifyExists({ element: fleetAddBtn });
  clickAction({ locator: fleetAddBtn });
  typeText({ locator: effectiveDateTxtBx, dataText: effectiveDateVal });
  typeText({ locator: expirationDateTxtBx, dataText: expirationDateVal });
  typeDropDwnClick({ locator: nameDrpDwn, drpDwnVal: carrierNameVal });
  clickAction({ locator: addFleetRelationshipBtn });
};

const addDriverPersonalInfo = ({ genderValue: gender, maritalStatusValue: maritalStatus }) => {
  selectItemFromButtonTypeDropDown({ locator: drpDwnGenderPronoun, dropdownVal: gender });
  selectItemFromButtonTypeDropDown({ locator: drpDwnMaritalStatus, dropdownVal: maritalStatus });
  if (maritalStatus === marriedStatus) {
    clearTextType({ element: txtFieldspouseName, typeText: driverSpouse });
  };
  selectItemFromButtonTypeDropDown({ locator: drpDwnChildren, dropdownVal: driverChildren });
  selectItemFromButtonTypeDropDown({ locator: drpDwnMilitaryReserveOblig, dropdownVal: militaryReserveObligation });
  clearTextType({ element: txtFieldPersonalParkSpace, typeText: parkingSpace });
};

const basicDrvrProfInfo = ({ drpDwnClassValue: drpDwnClassVal, drpDwnTypeValue: drpDwnTypeVal }) => {
  const hireDate = returnPastDateWithFormat({ dayCount: hireDayCount, monthCount: monthCountVal, targetDateType: dateWithYear });
  //Enter driver professional info
  typeDrpDwnWithMachtingText({ locator: drpDwnPersonalInfoType, drpDwnVal: drpDwnTypeVal });
  typeText({ locator: txtFieldHireDate, dataText: hireDate });
  typeDrpDwnWithMachtingText({ locator: drpDwnProfessionalClass, drpDwnVal: drpDwnClassVal });
  typeText({ locator: txtFieldTerminationDate, dataText: todayDate });
};

const addnlDrvrProfInfo = ({ drpDwnClassValue: drpDwnClassVal, drpDwnTypeValue: drpDwnTypeVal, partnerDriver: partnerDriverName }) => {
  const hireDate = returnPastDateWithFormat({ dayCount: hireDayCount, monthCount: monthCountVal, targetDateType: dateWithYear });

  //Enter driver professional info
  typeDrpDwnWithMachtingText({ locator: drpDwnPersonalInfoType, drpDwnVal: drpDwnTypeVal });
  selectItemFrmSrchPicker({ locator: txtFieldPartner, typeText: partnerDriverName });
  selectItemFrmSrchPicker({ locator: txtFieldCompany, typeText: company });
  selectItemFrmSrchPicker({ locator: txtFieldDriverTrainer, typeText: partnerDriverName });
  typeText({ locator: txtFieldHireDate, dataText: hireDate });
  typeDrpDwnWithMachtingText({ locator: drpDwnProfessionalClass, drpDwnVal: drpDwnClassVal });
  typeText({ locator: txtFieldTerminationDate, dataText: todayDate });
};

const verifyDeleteInLastRow = () => {
  clickLastElementIn({ locator: kebabMenu });
  verifyVisible({ element: menuOptionDeleteInKebab });
};

const clickDeleteInLastRow = () => {
  clickLastElementIn({ locator: kebabMenu });
  verifyVisible({ element: menuOptionDeleteInKebab });
  clickLastElementIn({ locator: menuOptionDeleteInKebab });
};

const addPreferredLanes = (preferrenceValue, reasonValue) => {
  dropDownContainsTextClick({ element: drpDwnOriginType, typeText: originType2, exactText: originType2 });
  verifyAttrText({ locator: drpDwnDestination, attribute: attrTitle, verifyText: destination2 });
  dropDownExactClick({ element: drpDwnOriginCity, ddValue: originCityDropDown });
  dropDownExactClick({ element: drpDwnDestinationCity, ddValue: destinationCityDropDown });
  dropDownContainsTextClick({ element: drpDwnOriginType, typeText: originType1, exactText: originType1 });
  verifyAttrText({ locator: drpDwnDestination, attribute: attrTitle, verifyText: destination1 });
  typeDropDwnClick({ locator: txtOriginCity, drpDwnVal: originCity });
  typeDropDwnClick({ locator: txtDestinationCity, drpDwnVal: destinationCity });
  dropDownContainsTextClick({ element: drpDwnpreferrences, typeText: preferrenceValue, exactText: preferrenceValue });
  dropDownContainsTextClick({ element: drpDwnReason, typeText: reasonValue, exactText: reasonValue });
  clickAction({ locator: btnAddNewContact });
};

const verifyAddedPreferredLanes = () => {
  verifyAttrText({ locator: colLanesRecordedBy, attribute: attrTitle, verifyText: txtRepsField });
  verifyAttrText({ locator: colLanesCurrentDate, attribute: attrTitle, verifyText: todayDate });
};

const addPreferredRoutes = (preferrenceValue, reasonValue) => {
  clickAction({ locator: btnAddNewStops });
  dropDownContainsTextClick({ element: drpDwnStopsType, typeText: stopTypeValue, exactText: stopTypeValue });
  dropDownContainsTextClick({ element: drpDwnStopsCity, typeText: stopCityValue, exactText: stopCityValue });
  clickAction({ locator: btnAddNewStops });
  dropDownContainsTextClick({ element: drpDwnStopsType2, typeText: stopTypeValue1, exactText: stopTypeValue1 });
  typeDropDwnClick({ locator: drpDwnFacility, drpDwnVal: stopsFacilityValue });
  clickAction({ locator: chkBoxAdditionalStops });
  dropDownContainsTextClick({ element: drpDwnpreferrences, typeText: preferrenceValue, exactText: preferrenceValue });
  dropDownContainsTextClick({ element: drpDwnReason, typeText: reasonValue, exactText: reasonValue });
  clickAction({ locator: btnAddPreferredRoute });
};

const verifyPreferenceAndReason = () => {
  cy.get(drpDwnpreferrences).click().get(colPreferrenceValues).each((val, index) => {
    expect(val.text()).to.eq(preferenceValues[index]);
  });
  cy.get(drpDwnReason).click().get(colReasonValues).each((val, index) => {
    expect(val.text()).to.eq(reasonValues[index]);
  });
};

const verifyAdditionalStopsToolTip = () => {
  verifyToolTips({ locator: toolTipIcon, verifyText: toolTip });
};

const verifyAddedPreferredRoutes = () => {
  cy.get(colRoutesRecordedBy).each((val) => {
    expect(val.text()).to.eq(txtRepsField);
  });
  verifyAttrText({ locator: colRoutesDate, attribute: attrTitle, verifyText: todayDate });
};

export const addOrEditOperationalPreferenceInDriver = ({ drpDwnTypeValue: type, drpDwnPreferenceValue: preference, typeText: text }) => {
  selectItemFromButtonTypeDropDown({ locator: preferencesPage.drpDwnType, dropdownVal: type });
  selectItemFromButtonTypeDropDown({ locator: preferencesPage.drpDwnPreference, dropdownVal: preference });
  clearTextType({ element: preferencesPage.txtFieldQualifier, typeText: text });
  verifyIfEnabled({ locator: preferencesPage.btnSaveOperPref });
  clickWithWaits({ locator: preferencesPage.btnSaveOperPref, waitTime: shortWait });
};

export const addDriverAward = ({ drpDwnAwardType: awardType }) => {
  clickAction({ locator: tabAwards });
  clickAction({ locator: btnAwardsPlusIcon });
  waitSometime(shortWait);
  selectItemFromButtonTypeDropDown({ locator: drpDwnDriverAwardType, dropdownVal: awardType });
  clearTypeText({ element: txtFieldAwardDesc, typeText: awardDescription });
  datePicker({ dateLocator: txtFieldAwardDate, dataText: returntodayDateMMDDYY() });
  clickActionWait({ locator: btnAddNewContact });
};

export const clickOptionsInKebabMenuInTable = ({ kebabMenuLocator: element, optionLocator: elmLocator, indexNumber: number }) => {
  clickAction({ locator: element });
  verifyVisible({ element: elmLocator });
  clickElementIndex({ locator: elmLocator, index: number });
};

export const addDriverEquipment = (equipmentType, description, count, assetID, issueDate, recoveredDate, conditionTerm) => {
  genericUtils.typeDropDwnClick({ locator: addDriverPage.addEquipmentPopup.typeTermDrpDwn, drpDwnVal: equipmentType });
  genericUtils.typeText({ locator: addDriverPage.addEquipmentPopup.descriptionTxtBx, dataText: description });
  genericUtils.typeText({ locator: addDriverPage.addEquipmentPopup.countTxtBx, dataText: count });
  genericUtils.typeText({ locator: addDriverPage.addEquipmentPopup.assetIdTxtBx, dataText: assetID });
  datePicker({ dateLocator: addDriverPage.addEquipmentPopup.issueDateTxtBx, dataText: issueDate });
  datePicker({ dateLocator: addDriverPage.addEquipmentPopup.recoveredDateTxtBx, dataText: recoveredDate });
  genericUtils.typeDropDwnClick({ locator: addDriverPage.addEquipmentPopup.conditionTerm, drpDwnVal: conditionTerm });
  genericUtils.clickable({ locator: addDriverPage.addEquipmentPopup.addEquipmentBtn });
  genericUtils.clickAction({ locator: addDriverPage.addEquipmentPopup.addEquipmentBtn });
};

export const editPreferrenceKabobMenu = () => {
  genericUtils.clickVisibleElement({ locator: btnPreferrenceKabobMenu });
  clickAction({ locator: btnKabobEdit });
};

export const editPreferredLanes = (preferrenceValue, reasonValue) => {
  dropDownContainsTextClick({ element: drpDwnOriginType, typeText: originType2, exactText: originType2 });
  verifyAttrText({ locator: drpDwnDestination, attribute: attrTitle, verifyText: destination2 });
  dropDownExactClick({ element: drpDwnOriginCity, ddValue: originCityDropDown });
  dropDownExactClick({ element: drpDwnDestinationCity, ddValue: destinationCityDropDown });
  dropDownContainsTextClick({ element: drpDwnpreferrences, typeText: preferrenceValue, exactText: preferrenceValue });
  dropDownContainsTextClick({ element: drpDwnReason, typeText: reasonValue, exactText: reasonValue });
  clickAction({ locator: btnAddNewContact });
};

export const editPreferredRoutes = () => {
  dropDownContainsTextClick({ element: drpDwnRouteStopForEdit, typeText: stopTypeValue, exactText: stopTypeValue });
  typeDropDwnClick({ locator: drpDwnStopCityForEdit, drpDwnVal: editStopCityValue });
  clickAction({ locator: btnSavePreferredRoute });
};

export const deletePreferredLanes = () => {
  genericUtils.clickAction({ locator: preferencePage.btnPreferrenceKabobMenu });
  genericUtils.clickVisibleElement({ locator: preferencePage.btnKabobDelete });
  genericUtils.verifyConfirmAlertMessage({ msgToVerify: preferrenceData.staticData.alertMsgForDeletePreferredLane });
  genericUtils.clickOkOnWindowAlertConfirm();
};

export const deletePreferredRoutes = () => {
  genericUtils.clickAction({ locator: preferencePage.btnPreferredRoutesKabob });
  genericUtils.clickVisibleElement({ locator: preferencePage.btnKabobDelete });
  genericUtils.verifyConfirmAlertMessage({ msgToVerify: preferrenceData.staticData.alertMsgForDeletePreferredRoute });
  genericUtils.clickOkOnWindowAlertConfirm();
};

export const viewPreferredRoutes = (preferenceValue, reasonValue) => {
  cy.get(colStopType).each((val, index) => {
    expect(val.text()).to.eq(colHeaderStopType[index]);
  });
  verifyAttrText({ locator: colStopsCity, attribute: attrTitle, verifyText: cityValue });
  verifyAttrText({ locator: colStopsSt, attribute: attrTitle, verifyText: stateValue });
  verifyAttrText({ locator: colPreference, attribute: attrTitle, verifyText: preferenceValue });
  verifyAttrText({ locator: colReason, attribute: attrTitle, verifyText: reasonValue });
};

export const addOrEditGeographyPreferenceInDriver = ({ txtCityVal: city, dropDownStateVal: state, drpDwnDirectionVal: direction, drpDwnPrefVal: preference, drpDwnReasonVal: reason }) => {
  clearText({ locator: preferencesPage.txtFieldCity });
  typeDrpDwnWithMachtingText({ locator: preferencesPage.txtFieldCity, drpDwnVal: city });
  verifyAttrText({ locator: preferencesPage.drpDwnState, attribute: attrDataSelected, verifyText: state });
  selectItemFromButtonTypeDropDown({ locator: preferencesPage.drpDwnDirection, dropdownVal: direction });
  selectItemFromButtonTypeDropDown({ locator: preferencesPage.drpDwnPreference, dropdownVal: preference });
  selectItemFromButtonTypeDropDown({ locator: preferencesPage.drpDwnReason, dropdownVal: reason });
  verifyIfEnabled({ locator: preferencesPage.btnSaveOperPref });
  clickWithWaits({ locator: preferencesPage.btnSaveOperPref, waitTime: shortWait });
};
export const navigateTeamPreference = () => {
  clickAction({ locator: preferencesPage.tabDrvrPreferences });
  verifyExists({ element: preferencesPage.lblTeamPreference });
};
export const addTeamPreference = (teamType, teamPreference, notes) => {
  clickAction({ locator: preferencesPage.btnTeamPreference });
  verifyExists({ element: preferencesPage.lblAddTeamsPreference });
  verifyToDisabled({ element: preferencesPage.btnTeamPreferenceSave });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferenceType,
    typeText: teamType,
    exactText: teamType,
  });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferencePreference,
    typeText: teamPreference,
    exactText: teamPreference,
  });
  clearTypeText({ element: preferencesPage.txtTeamNotes, typeText: notes });
  verifyIfEnabled({ locator: preferencesPage.btnTeamPreferenceSave });
  clickAction({ locator: preferencesPage.btnTeamPreferenceSave });
};
export const editTeamPreference = (teamType, teamPreference, notes) => {
  clickAction({ locator: preferencesPage.btnKabobEditTeamPreference });
  clickAction({ locator: preferencesPage.btnEditTeamPreference });
  verifyExists({ element: preferencesPage.lblAddTeamsPreference });
  verifyToDisabled({ element: preferencesPage.btnTeamPreferenceSave });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferenceType,
    typeText: teamType,
    exactText: teamType,
  });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferencePreference,
    typeText: teamPreference,
    exactText: teamPreference,
  });
  clearTypeText({ element: preferencesPage.txtTeamNotes, typeText: notes });
  verifyIfEnabled({ locator: preferencesPage.btnTeamPreferenceSave });
  clickAction({ locator: preferencesPage.btnTeamPreferenceSave });
};
export const deleteTeamPreference = () => {
  clickAction({ locator: preferencesPage.btnKabobEditTeamPreference });
  clickAction({ locator: preferencesPage.btnDeleteTeamPrteference });
};
export const verifyCreatedTeamPreference = () => {
  cy.get(preferencesPage.lblTeamPrteferenceDate).first().then((input) => {
    const expectedDate = returntodayDateMMDDYY();
    expect(input.text()).to.be.eq(expectedDate);
  });
};
export const verifyDataFormattingWeek = () => {
  cy.get(preferencesPage.lblTeamPrteferenceWeek).first().then((input) => {
    const expectedDate = returntodayDateMMDD();
    expect(input.text()).to.be.eq(expectedDate);
  });
};
export const verifyDateFormatMMDDYY = () => {
  cy.get(preferencesPage.txtDueDate).first().then((input) => {
    const expectedDate = returntodayDateMMDDYY();
    expect(input.text()).to.be.eq(expectedDate);
  });
};
export const verifyDateFormatOfCompletedDate = () => {
  cy.get(preferencesPage.txtCompletedDate).first().then((input) => {
    const expectedDate = returntodayDateMMDDYY();
    expect(input.text()).to.be.eq(expectedDate);
  });
};
export const verifyGrayBarPreferenceIcons = () => {
  verifyExists({ element: preferencesPage.lblGraybarMoon });
  verifyExists({ element: preferencesPage.lblGraybarUserGroup });
  verifyExists({ element: preferencesPage.lblGraybarSlash });
  verifyExists({ element: preferencesPage.lblGraybarWineBottle });
  verifyExists({ element: preferencesPage.lblGraybarPaw });
  verifyExists({ element: preferencesPage.lblGraybarScale });
};
export const addCommodityPreference = (commodity, teamPreference, reason) => {
  clickAction({ locator: preferencesPage.btnCommodityPreference });
  verifyExists({ element: preferencesPage.lblAddTeamsPreference });
  verifyToDisabled({ element: preferencesPage.btnTeamPreferenceSave });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpCommodity,
    typeText: commodity,
    exactText: commodity,
  });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferencePreference,
    typeText: teamPreference,
    exactText: teamPreference,
  });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpDwnReason,
    typeText: reason,
    exactText: reason,
  });
  verifyIfEnabled({ locator: preferencesPage.btnTeamPreferenceSave });
  clickAction({ locator: preferencesPage.btnTeamPreferenceSave });
};
export const editCommodityPreference = (commodity, teamPreference, reason) => {
  clickAction({ locator: preferencesPage.btnKabobEditTeamPreference });
  clickAction({ locator: preferencesPage.btnEditTeamPreference });
  verifyExists({ element: preferencesPage.lblAddTeamsPreference });
  verifyToDisabled({ element: preferencesPage.btnTeamPreferenceSave });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpCommodity,
    typeText: commodity,
    exactText: commodity,
  });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferencePreference,
    typeText: teamPreference,
    exactText: teamPreference,
  });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpDwnReason,
    typeText: reason,
    exactText: reason,
  });
  verifyIfEnabled({ locator: preferencesPage.btnTeamPreferenceSave });
  clickAction({ locator: preferencesPage.btnTeamPreferenceSave });
};
export const addOperationalPreference = (type, teamPreference, qualifier) => {
  clickAction({ locator: preferencesPage.btnOperationalPreferences });
  verifyExists({ element: preferencesPage.lblAddTeamsPreference });
  verifyToDisabled({ element: preferencesPage.btnTeamPreferenceSave });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferenceType,
    typeText: type,
    exactText: type,
  });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferencePreference,
    typeText: teamPreference,
    exactText: teamPreference,
  });
  clearTypeText({ element: preferencesPage.txtFieldQualifier, typeText: qualifier });
  verifyIfEnabled({ locator: preferencesPage.btnTeamPreferenceSave });
  clickAction({ locator: preferencesPage.btnTeamPreferenceSave });
};
export const editOperationalPreference = (type, teamPreference, qualifier) => {
  clickAction({ locator: preferencesPage.btnKabobEditTeamPreference });
  clickAction({ locator: preferencesPage.btnEditTeamPreference });
  verifyExists({ element: preferencesPage.lblAddTeamsPreference });
  verifyToDisabled({ element: preferencesPage.btnTeamPreferenceSave });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferenceType,
    typeText: type,
    exactText: type,
  });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferencePreference,
    typeText: teamPreference,
    exactText: teamPreference,
  });
  clearTypeText({ element: preferencesPage.txtFieldQualifier, typeText: qualifier });
  verifyIfEnabled({ locator: preferencesPage.btnTeamPreferenceSave });
  clickAction({ locator: preferencesPage.btnTeamPreferenceSave });
};
export const addWeeklytargets = (weekStartDay, recurringWeeksVal, targetDaysVal, targetLoadedMiVal, targetMtMiVal, targetRevenueVal) => {
  genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.weekStartingTxtBx, typeText: weekStartDay });
  genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.recurringWeeksTxtBx, typeText: recurringWeeksVal });
  genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetDaysTxtBx, typeText: targetDaysVal });
  genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetLoadedMiTxtBx, typeText: targetLoadedMiVal });
  genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetMtMiTxtBx, typeText: targetMtMiVal });
  genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetRevenueTxtBx, typeText: targetRevenueVal });
  verifyIfEnabled({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addWeeklyTargetBtn });
  genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addWeeklyTargetBtn });
};
export const navigateExpandViewWeeklyTargetAddPopup = () => {
  genericUtils.clickAction({ locator: driverCommonPage.tabDriverTargetsPerformance });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.weeklyTargetCarrotBtn });
  genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetCarrotBtn });
  genericUtils.clickExpand();
  genericUtils.verifyExists({ element: targetsAndPerformancePage.weeklyTargetAddBtn });
  genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
  verifyWeeklyTargetFields();
  genericUtils.verifyExists({ element: targetsAndPerformancePage.weeklyTargetAddPopup.addDialogPopupTitle });
};

export const verifyWeeklyTargetFields = () => {
  genericUtils.verifyExists({ element: targetsAndPerformancePage.lblWeekStarting });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.lblReccuringWeek });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.lblExpDate });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.lblTargetDays });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.lblTargetLoadedMi });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.lblTargetMTMi });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.lblTargetRevenue });
};
export const verifyTargetPerformanceTblAndHeader = (tblOrHeader) => {
  genericUtils.clickAction({ locator: driverCommonPage.tabDriverTargetsPerformance });
  genericUtils.verifyExists({ element: tblOrHeader });
};
export const verifyTargetPerformanceTblsHeaderSeq = (headersData, tblHeaderElem) => {
  headersData.forEach((val, index) => {
    genericUtils.verifyTextWithElemIndex({ locator: tblHeaderElem, indexNum: index, verifyText: val });
  });
};
export const clickDeleteBtn = () => {
  genericUtils.verifyVisible({ element: targetsAndPerformancePage.weeklyTargetMenuBtn });
  genericUtils.clickFirstElementIn({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
  genericUtils.verifyVisible({ element: targetsAndPerformancePage.deleteBtn });
  genericUtils.clickVisibleElement({ locator: targetsAndPerformancePage.deleteBtn });
};
export const clickWeeklyTargetAddIcon = (tblOrHeader) => {
  genericUtils.clickAction({ locator: driverCommonPage.tabDriverTargetsPerformance });
  genericUtils.verifyExists({ element: driverCommonPage.tabDriverTargetsPerformance });
  genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetAddBtn });
};

export const addOrEditCustomerPreferencesInDriver = ({ custNameVal: customerName, preferenceVal: preference, reasonVal: reason }) => {
  clearText({ locator: preferencesPage.customerNameSearch });
  typeDropDwnClick(({ locator: preferencesPage.customerNameSearch, drpDwnVal: customerName }));
  waitSometime(shortWait);
  selectItemFromButtonTypeDropDown({ locator: preferencesPage.drpDwnPreferenceTerm, dropdownVal: preference });
  dropDownContainsTextClick({ element: preferencesPage.drpDwnReason, typeText: reason, exactText: reason });
  verifyIfEnabled({ locator: preferencesPage.btnSaveOperPref });
  clickWithWaits({ locator: preferencesPage.btnSaveOperPref, waitTime: shortWait });
};

export const verifyObservationTableToBeBlank = () => {
  genericUtils.clickAction({ locator: historyPage.tabObservations });
  cy.get(historyPage.tblObservationsRecords).each((val) => {
    expect(val.text()).to.eq('');
  });
};

export const verifyShowClosedCheckBoxChecked = () => {
  genericUtils.verifyIfEnabled({ locator: historyPage.chkBoxShowClosed });
  genericUtils.clickAction({ locator: historyPage.chkBoxShowClosed });
  cy.get(historyPage.chkBoxShowClosedIncidents).invoke('attr', 'value').should('contain', 'true');
  genericUtils.clickAction({ locator: historyPage.chkBoxShowClosed });
  cy.get(historyPage.chkBoxShowClosedIncidents).invoke('attr', 'value').should('contain', 'false');
};

export const verifyCustomizeAndExpandIfClickable = (carrotLocator) => {
  genericUtils.clickAction({ locator: carrotLocator });
  genericUtils.clickable({ locator: historyPage.drpdwnOptionTrainingCustomize });
  genericUtils.clickable({ locator: historyPage.drpdwnOptionTrainingExpand });
};

export const verifyIfExpandNotClickable = (carrotLocator) => {
  genericUtils.clickAction({ locator: carrotLocator });
  genericUtils.clickable({ locator: historyPage.drpdwnOptionTrainingCustomize });
  genericUtils.clickable({ locator: historyPage.drpdwnOptionTrainingExpand });
};

export const verifyCloseIconInExpandView = () => {
  genericUtils.verifyExists({ element: historyPage.closeIconExpandPage });
  genericUtils.clickAction({ locator: historyPage.closeIconExpandPage });
};

export const addFacilityPreference = (facility, preference, reason) => {
  clickAction({ locator: preferencesPage.btnAddNewfacility });
  verifyExists({ element: preferencesPage.lblAddTeamsPreference });
  verifyToDisabled({ element: preferencesPage.btnTeamPreferenceSave });
  clearTypeText({ element: preferencesPage.drpSearchFacility, typeText: facility });
  waitSometime(moreWait);
  cy.get(preferencesPage.lblSelectFacility).click();
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferencePreference,
    typeText: preference,
    exactText: preference,
  });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpDwnReason,
    typeText: reason,
    exactText: reason,
  });
  verifyIfEnabled({ locator: preferencesPage.btnTeamPreferenceSave });
  clickAction({ locator: preferencesPage.btnTeamPreferenceSave });
};
export const editFacilityPreference = (facility, preference, reason) => {
  clickAction({ locator: preferencesPage.btnKabobEditTeamPreference });
  clickAction({ locator: preferencesPage.btnEditTeamPreference });
  verifyExists({ element: preferencesPage.lblAddTeamsPreference });
  verifyToDisabled({ element: preferencesPage.btnTeamPreferenceSave });
  clearTypeText({ element: preferencesPage.drpSearchFacility, typeText: facility });
  waitSometime(moreWait);
  cy.get(preferencesPage.lblSelectFacility).click();
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpTeamPreferencePreference,
    typeText: preference,
    exactText: preference,
  });
  genericUtils.dropDownContainsTextClick({
    element: preferencesPage.drpDwnReason,
    typeText: reason,
    exactText: reason,
  });
  verifyIfEnabled({ locator: preferencesPage.btnTeamPreferenceSave });
  clickAction({ locator: preferencesPage.btnTeamPreferenceSave });
};
export const verifyCustomizeOptionsTraining = (tableView) => {
  if (tableView === defaultView) {
    clickAction({ locator: drpdwnCarrotBtnTraining });
  } else if (tableView === expandView) {
    clickAction({ locator: drpdwnCarrotBtnTrainingInExpand });
  }
  genericUtils.clickAction({ locator: historyPage.drpdwnOptionTrainingCustomize });
  cy.get(historyPage.customizeOptionsTraining).each((val) => {
    cy.wrap(val).should('be.visible');
  });
  genericUtils.clickAction({ locator: historyPage.btnCustomizeSave });
};

export const hideOptionInTrainingCustomize = (tableView) => {
  if (tableView === defaultView) {
    clickAction({ locator: drpdwnCarrotBtnTraining });
  } else if (tableView === expandView) {
    clickAction({ locator: drpdwnCarrotBtnTrainingInExpand });
  }
  genericUtils.clickAction({ locator: historyPage.drpdwnOptionTrainingCustomize });
  genericUtils.clickAction({ locator: historyPage.hideOutcomeOption });
  genericUtils.verifyToNotExist({ locator: historyPage.hideOutcomeOption });
  genericUtils.clickAction({ locator: historyPage.btnCustomizeSave });
  cy.get(historyPage.colHeaderOutcome).should('not.exist');
};

export const enableHideOptionInTrainingTable = (tableView) => {
  if (tableView === defaultView) {
    clickAction({ locator: drpdwnCarrotBtnTraining });
  } else if (tableView === expandView) {
    clickAction({ locator: drpdwnCarrotBtnTrainingInExpand });
  }
  genericUtils.clickAction({ locator: historyPage.drpdwnOptionTrainingCustomize });
  genericUtils.clickAction({ locator: historyPage.hideOutcomeOption });
  genericUtils.verifyIfEnabled({ locator: historyPage.hideOutcomeOption });
  genericUtils.clickAction({ locator: historyPage.btnCustomizeSave });
  genericUtils.verifyToExist({ element: historyPage.colHeaderOutcome });
};

export const verifyTrainingCustomizeDragAndDrop = (tableView) => {
  if (tableView === defaultView) {
    clickAction({ locator: drpdwnCarrotBtnTraining });
  } else if (tableView === expandView) {
    clickAction({ locator: drpdwnCarrotBtnTrainingInExpand });
  }
  genericUtils.clickAction({ locator: historyPage.drpdwnOptionTrainingCustomize });
  genericUtils.clickAction({ locator: historyPage.hideOutcomeOption });
  dragAndDrop({ draggedElement: historyPage.customizeTypeDragItem, stationaryElement: historyPage.customizeDueDateDragItem, refElement: historyPage.customizeTable });
  genericUtils.verifyTableColumnsHeaders({ locator: historyPage.tblCustomizeHeader, columnNames: historyData.staticData.customizeTrainingColHeaders });
  genericUtils.clickAction({ locator: historyPage.btnCustomizeResetToDefaults });
  cy.get(historyPage.customizeOptionsTraining).each((val) => {
    cy.wrap(val).should('be.visible');
  });
  genericUtils.clickAction({ locator: historyPage.btnCustomizeSave });
};

export const openTrainingInExpandView = () => {
  genericUtils.clickVisibleElement({ locator: historyPage.drpdwnCarrotBtnTraining });
  genericUtils.clickAction({ locator: historyPage.drpdwnOptionTrainingExpand });
};

export const addNewDriverSchedule = (effDate, exprDate, nameLocale, startTime, endTime) => {
  genericUtils.typeText({ locator: schedule.txtFieldEffDate, dataText: effDate });
  genericUtils.typeText({ locator: schedule.txtExpirationDate, dataText: exprDate });
  const dayName = getDayName({ strDate: effDate, localeName: nameLocale });
  const exp = dayName.toLowerCase();
  switch (exp) {
    case 'monday':
      genericUtils.typeText({ locator: schedule.mondayStartTime + ' input', dataText: startTime });
      genericUtils.typeText({ locator: schedule.mondayEndTime + ' input', dataText: endTime });
      break;
    case 'tuesday':
      genericUtils.typeText({ locator: schedule.tuesdayStartTime + ' input', dataText: startTime });
      genericUtils.typeText({ locator: schedule.tuesdayEndTime + ' input', dataText: endTime });
      break;
    case 'wednesday':
      genericUtils.typeText({ locator: schedule.wednesdayStartTime + ' input', dataText: startTime });
      genericUtils.typeText({ locator: schedule.wednesdayEndTime + ' input', dataText: endTime });
      break;
    case 'thursday':
      genericUtils.typeText({ locator: schedule.thursdayStartTime + ' input', dataText: startTime });
      genericUtils.typeText({ locator: schedule.thursdayEndTime + ' input', dataText: endTime });
      break;
    case 'friday':
      genericUtils.typeText({ locator: schedule.fridayStartTime + ' input', dataText: startTime });
      genericUtils.typeText({ locator: schedule.fridayEndTime + ' input', dataText: endTime });
      break;
    case 'saturday':
      genericUtils.typeText({ locator: schedule.saturdayStartTime + ' input', dataText: startTime });
      genericUtils.typeText({ locator: schedule.saturdayEndTime + ' input', dataText: endTime });
      break;
    case 'sunday':
      genericUtils.typeText({ locator: schedule.sundayStartTime + ' input', dataText: startTime });
      genericUtils.typeText({ locator: schedule.sundayEndTime + ' input', dataText: endTime });
      break;
  }
};
export const driverAddPlannedTimeOff = ({ driverTimeOffType: drpDwnDriverTimeOffType }) => {
  clickAction({ locator: addDriverPage.timeOff.btnPlannedTimeOffPlus });
  genericUtils.verifyElementTextContains({ locator: addDriverPage.contacts.txtHeaderAddContacts, verifyText: addDriverData.staticData.txtHeaderAddPlannedTimeOff });
  genericUtils.selectItemFromDropDown({ element: addDriverPage.timeOff.dropdwnType, ddValue: drpDwnDriverTimeOffType });
  const startDate = returntodayDateMMDDYY();
  clearTextType({ element: addDriverPage.timeOff.txtFieldStartDate, typeText: startDate });
  verifyTodayDateMMDDYY({ dateLocator: addDriverPage.timeOff.txtFieldStartDate, attribute: addDriverData.staticData.valueAttr });
  const endDate = returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal });
  clearTextType({ element: addDriverPage.timeOff.txtFieldEndDate, typeText: endDate });
  verifyfutureDateMMDDYY({ dateLocator: addDriverPage.timeOff.txtFieldEndDate, dayCount: dayCountVal, monthCount: monthCountVal, attribute: addDriverData.staticData.valueAttr });
  const notes = generateRandomAlphaNumByLength({ lengthOfString: 10 });
  clearTextType({ element: addDriverPage.timeOff.txtFieldNote, typeText: notes });
  verifyIfEnabled({ locator: addDriverPage.timeOff.btnTimeOffSave });
  clickAction({ locator: addDriverPage.timeOff.btnTimeOffSave });
  return ({ startDate, endDate, notes });
};

export const navigateToPlannedTimeOffAddPopup = () => {
  clickAction({ locator: addDriverPage.timeOff.btnPlannedTimeOffPlus });
  genericUtils.verifyElementTextContains({ locator: addDriverPage.contacts.txtHeaderAddContacts, verifyText: addDriverData.staticData.txtHeaderAddPlannedTimeOff });
};
export const verifyPlannedTimeOffPopupFieldsExist = () => {
  genericUtils.verifyExists({ element: addDriverPage.timeOff.dropdwnType });
  genericUtils.verifyExists({ element: addDriverPage.timeOff.txtFieldStartDate });
  genericUtils.verifyExists({ element: addDriverPage.timeOff.txtFieldEndDate });
  genericUtils.verifyExists({ element: addDriverPage.timeOff.startLocation });
  genericUtils.verifyExists({ element: addDriverPage.timeOff.endLocation });
  genericUtils.verifyExists({ element: addDriverPage.timeOff.txtFieldNote });
};
export const enterAndValidateStartAndEndLoc = (startLoc, endLoc) => {
  genericUtils.typeDropDwn({ locator: addDriverPage.timeOff.startLocation, drpDwnVal: startLoc });
  genericUtils.typeDropDwn({ locator: addDriverPage.timeOff.endLocation, drpDwnVal: endLoc });
  genericUtils.verifyElementValue({ locator: addDriverPage.timeOff.startLocation, verifyText: startLoc });
  genericUtils.verifyElementValue({ locator: addDriverPage.timeOff.endLocation, verifyText: endLoc });
};

export const driverAddPlannedTimeOffWithAllFields = ({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: startCity, endLoc: endCity }) => {
  clickAction({ locator: addDriverPage.timeOff.btnPlannedTimeOffPlus });
  genericUtils.verifyElementTextContains({ locator: addDriverPage.contacts.txtHeaderAddContacts, verifyText: addDriverData.staticData.txtHeaderAddPlannedTimeOff });
  genericUtils.selectItemFromDropDown({ element: addDriverPage.timeOff.dropdwnType, ddValue: drpDwnDriverTimeOffType });
  const startDate = returntodayDateMMDDYY();
  clearTextType({ element: addDriverPage.timeOff.txtFieldStartDate, typeText: startDate });
  verifyTodayDateMMDDYY({ dateLocator: addDriverPage.timeOff.txtFieldStartDate, attribute: addDriverData.staticData.valueAttr });
  const endDate = returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal });
  clearTextType({ element: addDriverPage.timeOff.txtFieldEndDate, typeText: endDate });
  verifyfutureDateMMDDYY({ dateLocator: addDriverPage.timeOff.txtFieldEndDate, dayCount: dayCountVal, monthCount: monthCountVal, attribute: addDriverData.staticData.valueAttr });
  const notes = generateRandomAlphaNumByLength({ lengthOfString: 10 });
  clearTextType({ element: addDriverPage.timeOff.txtFieldNote, typeText: notes });
  genericUtils.typeDropDwn({ locator: addDriverPage.timeOff.startLocation, drpDwnVal: startCity });
  genericUtils.typeDropDwn({ locator: addDriverPage.timeOff.endLocation, drpDwnVal: endCity });
  verifyIfEnabled({ locator: addDriverPage.timeOff.btnTimeOffSave });
  clickAction({ locator: addDriverPage.timeOff.btnTimeOffSave });
  return ({ startDate, endDate, notes });
};

export const driverEditPlannedTimeOffWithAllFields = ({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: startCity, endLoc: endCity }) => {
  genericUtils.verifyElementTextContains({ locator: addDriverPage.contacts.txtHeaderAddContacts, verifyText: addDriverData.expectedData.editPlanedTimeOffHeader });
  genericUtils.selectItemFromDropDown({ element: addDriverPage.timeOff.dropdwnType, ddValue: drpDwnDriverTimeOffType });
  const startDate = returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal });
  clearTextType({ element: addDriverPage.timeOff.txtFieldStartDate, typeText: startDate });
  const endDate = returnfutureDateMMDDYY({ dayCount: dayCountVal, monthCount: monthCountVal });
  clearTextType({ element: addDriverPage.timeOff.txtFieldEndDate, typeText: endDate });
  const notes = generateRandomAlphaNumByLength({ lengthOfString: 10 });
  clearTextType({ element: addDriverPage.timeOff.txtFieldNote, typeText: notes });
  genericUtils.typeDropDwn({ locator: addDriverPage.timeOff.startLocation, drpDwnVal: startCity });
  genericUtils.typeDropDwn({ locator: addDriverPage.timeOff.endLocation, drpDwnVal: endCity });
  verifyIfEnabled({ locator: addDriverPage.timeOff.btnTimeOffSave });
  clickAction({ locator: addDriverPage.timeOff.btnTimeOffSave });
};

export const editTrainingWithMandatoryFields = ({ drpDwnType: trainingType }) => {
  clickEditInLastRow();
  dropDownContainsTextClick({ element: drpdwnTypeTerm, typeText: trainingType, exactText: trainingType });
  clickAction({ locator: btnDialogSubmit });
};

export const verifyAddTrainingWithNoMandatoryField = ({ map: trainingDataWithNoMandatoryField }, shouldAddTraining = true) => {
  shouldAddTraining && clickAction({ locator: btnTrainingAddNew });
  datePicker({ dateLocator: drpdwnDueDate, dataText: trainingDataWithNoMandatoryField.get(trainingDueDate) });
  datePicker({ dateLocator: drpdwnCompletedDate, dataText: trainingDataWithNoMandatoryField.get(trainingCompletedDate) });
  typeDropDwnClick({ locator: drpdwnOutcome, drpDwnVal: trainingDataWithNoMandatoryField.get(trainingOutcome) });
  typeText({ locator: txtFieldTrainer, dataText: trainingDataWithNoMandatoryField.get(trainingTrainer) });
  typeText({ locator: txtFieldDescription, dataText: trainingDataWithNoMandatoryField.get(trainingDescription) });
  genericUtils.verifyIfDisabled({ locator: btnDialogSubmit });
  clickAction({ locator: btnDialogClose });
};

export const editDriverHistryTraining = ({ map: trainingDataWithNoMandatoryField }) => {
  datePicker({ dateLocator: drpdwnDueDate, dataText: trainingDataWithNoMandatoryField.get(trainingDueDate) });
  datePicker({ dateLocator: drpdwnCompletedDate, dataText: trainingDataWithNoMandatoryField.get(trainingCompletedDate) });
  typeDropDwnClick({ locator: drpdwnOutcome, drpDwnVal: trainingDataWithNoMandatoryField.get(trainingOutcome) });
  typeText({ locator: txtFieldTrainer, dataText: trainingDataWithNoMandatoryField.get(trainingTrainer) });
  typeText({ locator: txtFieldDescription, dataText: trainingDataWithNoMandatoryField.get(trainingDescription) });
  clickAction({ locator: btnDialogSubmit });
};

export const verifyIncidentsTableToBeBlank = () => {
  cy.get(historyPage.tblIncidentsRecords).each((val) => {
    expect(val.text()).to.eq('');
  });
};

export const addDriverWithContact = () => {
  genericUtils.scrollIntoView({ locator: addDriverPage.btnContactsAddNew });
  genericUtils.clickAction({ locator: addDriverPage.btnContactsAddNew });
  genericUtils.waitSometime(commonData.shortWait);
  genericUtils.verifyText({ locator: addDriverPage.addEquipmentPopup.equipmentDialogTitle, verifyText: addDriverData.staticData.txtHeaderAddContacts });
  genericUtils.clearTextType({ element: addDriverPage.txtNewContactName, typeText: genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 5 }) });
  genericUtils.selectItemFromButtonTypeDropDown({ locator: addDriverPage.drpdwnContactType, dropdownVal: addDriverData.userDefinedData.contactType });
  genericUtils.typeDrpDwnWithMachtingText({ locator: addDriverPage.drpdwnContactsCountry, drpDwnVal: addDriverData.userDefinedData.drpdwnCountryName });
  const mobileNumber = genericUtils.generateRandomNumberByLength({ lengthOfNum: 10 });
  genericUtils.typeText({ locator: addDriverPage.txtContactsPhoneNumber, dataText: mobileNumber });
  const phoneExtn = genericUtils.generateRandomNumberByLength({ lengthOfNum: 3 });
  genericUtils.typeText({ locator: addDriverPage.txtContactsPhoneExtn, dataText: phoneExtn });
  genericUtils.typeDrpDwnWithMachtingText({ locator: addDriverPage.drpdwnFaxNumberCountry, drpDwnVal: addDriverData.userDefinedData.drpdwnCountryName });
  genericUtils.typeText({ locator: addDriverPage.txtContactsfaxNumberExtn, dataText: addDriverData.userDefinedData.faxExtn });
  genericUtils.typeText({ locator: addDriverPage.txtContactsEmailAddress, dataText: addDriverData.userDefinedData.emailValue });
  genericUtils.typeDropDwn({ locator: addDriverPage.drpdwnImService, drpDwnVal: addDriverData.userDefinedData.imServiceType });
  genericUtils.typeText({ locator: addDriverPage.txtImUsername, dataText: addDriverData.userDefinedData.firstName });
  genericUtils.clickAction({ locator: addDriverPage.mainCheckbox });
  genericUtils.clickAction({ locator: addDriverPage.IsPayContactAllowedParty });
  genericUtils.clickAction({ locator: addDriverPage.btnAddNewContact });
};

export const editDriverWithContactAndVal = () => {
  genericUtils.waitSometime(commonData.shortWait);
  genericUtils.clickAction({ locator: addDriverPage.btnKabobMenu });
  genericUtils.clickVisibleElement({ locator: addDriverPage.editButtonNew });
  const newContactName = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 5 });
  genericUtils.clearTextType({ element: addDriverPage.txtNewContactName, typeText: newContactName });
  const phoneExtnUpdated = genericUtils.generateRandomNumberByLength({ lengthOfNum: 3 });
  genericUtils.clearTextType({ element: addDriverPage.txtContactsPhoneExtn, typeText: phoneExtnUpdated });
  genericUtils.clearTextType({ element: addDriverPage.txtContactsEmailAddress, typeText: addDriverData.userDefinedData.emailUpdated });
  genericUtils.clickAction({ locator: addDriverPage.btnAddNewContact });
  genericUtils.waitSometime(commonData.shortWait);
  driverSaveAction();
  genericUtils.toastWithMsg({ message: addDriverData.expectedData.msgUpdated });
  genericUtils.clickAction({ locator: addDriverPage.btnKabobMenu });
  genericUtils.clickAction({ locator: addDriverPage.editButtonNew });
  genericUtils.verifyAttrText({ locator: addDriverPage.txtNewContactName, attribute: addDriverData.staticData.valueAttr, verifyText: newContactName });
  genericUtils.verifyAttrText({ locator: addDriverPage.txtContactsPhoneExtn, attribute: addDriverData.staticData.valueAttr, verifyText: phoneExtnUpdated });
  genericUtils.verifyAttrText({ locator: addDriverPage.txtContactsEmailAddress, attribute: addDriverData.staticData.valueAttr, verifyText: addDriverData.userDefinedData.emailUpdated });
  genericUtils.verifyClosePopup();
};

export const verifyTabAddNewTraining = () => {
  tabAndVerifyField({ locator: btnExpandDropDwnTypeTerm });
  tabAndVerifyField({ locator: drpdwnDueDate });
  tabAndVerifyField({ locator: drpdwnCompletedDate });
  tabAndVerifyField({ locator: btnExpandDropDwnOutCome });
  tabAndVerifyField({ locator: listBoxFacility });
  tabAndVerifyField({ locator: txtFieldCityState });
  tabAndVerifyField({ locator: txtFieldTrainer });
  tabAndVerifyField({ locator: txtFieldDescription });
  tabAndVerifyField({ locator: btnDialogClose });
};

export const verifyTrainingTableOrderWithTabKey = () => {
  genericUtils.clickAction({ locator: historyPage.btnTrainingAddNew });
  cy.focused().tab();
  cy.get(historyPage.drpdwnDueDate).tab();
  cy.get(historyPage.drpdwnCompletedDate).tab();
  cy.get(historyPage.listBoxFacility).tab();
  cy.get(historyPage.txtFieldTrainer).tab();
  cy.get(historyPage.txtFieldDescription).tab();
  cy.get(historyPage.btnDialogClose).tab();
  genericUtils.clickAction({ locator: historyPage.btnDialogClose });
};

export const verifyTargetsAndPerformanceCards = () => {
  genericUtils.verifyExists({ element: targetsAndPerformancePage.tabsOfTargetsAndPerformance.tabWeeklytarget });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.tabsOfTargetsAndPerformance.tabWeeklyActivity });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.tabsOfTargetsAndPerformance.tabEvents });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.tabsOfTargetsAndPerformance.tabPay });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.tabsOfTargetsAndPerformance.tabDailyActivity });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.tabsOfTargetsAndPerformance.tabRouteList });
};

export const verifyKebabMenuOptions = () => {
  genericUtils.clickAction({ locator: targetsAndPerformancePage.weeklyTargetMenuBtn });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.editBtn });
  genericUtils.verifyExists({ element: targetsAndPerformancePage.deleteBtn });
};

export const verifyAddWeeklyTargetWithNoMandatoryField = (targetDaysVal) => {
  genericUtils.clearAndTypeWithWait({ element: targetsAndPerformancePage.weeklyTargetAddPopup.targetDaysTxtBx, typeText: targetDaysVal });
  genericUtils.verifyIfDisabled({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addWeeklyTargetBtn });
  genericUtils.clickAction({ locator: historyPage.btnDialogClose });
};

export const editWeeklyTargetWithNoMandatoryField = () => {
  genericUtils.clearText({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.targetDaysTxtBx });
  genericUtils.clearText({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.targetLoadedMiTxtBx });
  genericUtils.clearText({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.targetMtMiTxtBx });
  genericUtils.clearText({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.targetRevenueTxtBx });
  genericUtils.verifyIfDisabled({ locator: targetsAndPerformancePage.weeklyTargetAddPopup.addWeeklyTargetBtn });
  genericUtils.clickAction({ locator: historyPage.btnDialogClose });
};

const addPowerFleet = (drpDwnValType, fleetName) => {
  verifyToExist({ element: btnAddPowerFleet });
  clickFirstElementIn({ locator: btnAddPowerFleet });
  typeDropDwnClick({ locator: drpDwnPowerFleetTypeTerm, drpDwnVal: drpDwnValType });
  verifyToExist({ element: txtFleetEffectiveDate });
  clickAction({ locator: txtFleetEffectiveDate });
  clickFirstElementIn({ locator: btnSelectDate });
  typeText({ locator: txtFleetName, dataText: fleetName });
  clickFirstElementIn({ locator: btnSelectDate });
  clickAction({ locator: btnSaveFleet });
  toastMsg();
  verifyToExist({ element: lblFleetName });
};

const editPowerFleet = (drpDwnValType, fleetName) => {
  verifyToExist({ element: "[data-testid='fleet-table'] [data-testid='table-card-body'] [data-testid*='menu-button-table']" });
  clickAction({ locator: "[data-testid='fleet-table'] [data-testid='table-card-body'] [data-testid*='menu-button-table']" });
  clickVisibleElement({ locator: "[data-contextmenukey='Edit']" });
  typeDropDwnClick({ locator: drpDwnPowerFleetTypeTerm, drpDwnVal: drpDwnValType });
  verifyToExist({ element: txtFleetEffectiveDate });
  clickAction({ locator: txtFleetEffectiveDate });
  clickFirstElementIn({ locator: btnSelectDate });
  clearText({ locator: txtFleetName });
  typeText({ locator: txtFleetName, dataText: fleetName });
  clickFirstElementIn({ locator: btnSelectDate });
  clickAction({ locator: btnSaveFleet });
  toastMsg();
  verifyToExist({ element: lblFleetName });
};

const deletePowerFleet = () => {
  verifyToExist({ element: "[data-testid='fleet-table'] [data-testid='table-card-body'] [data-testid*='menu-button-table']" });
  clickAction({ locator: "[data-testid='fleet-table'] [data-testid='table-card-body'] [data-testid*='menu-button-table']" });
  clickVisibleElement({ locator: "[data-contextmenukey='Delete']" });
};

export const verifyEquipmentCountDefaultToZero = () => {
  cy.get(addDriverPage.addEquipmentPopup.countTxtBx).should('have.value', '0');
};

export const clickPlannedTimeOffSaveBtn = () => {
  verifyIfEnabled({ locator: addDriverPage.timeOff.btnTimeOffSave });
  clickAction({ locator: addDriverPage.timeOff.btnTimeOffSave });
};

export const driverAddPlannedTimeOffWithAllFieldsParms = ({ driverTimeOffType: drpDwnDriverTimeOffType, startLoc: startCity, endLoc: endCity, startDate: fromDate, endDate: toDate }) => {
  clickAction({ locator: addDriverPage.timeOff.btnPlannedTimeOffPlus });
  genericUtils.verifyElementTextContains({ locator: addDriverPage.contacts.txtHeaderAddContacts, verifyText: addDriverData.staticData.txtHeaderAddPlannedTimeOff });
  genericUtils.selectItemFromDropDown({ element: addDriverPage.timeOff.dropdwnType, ddValue: drpDwnDriverTimeOffType });
  clearTextType({ element: addDriverPage.timeOff.txtFieldStartDate, typeText: fromDate });
  clearTextType({ element: addDriverPage.timeOff.txtFieldEndDate, typeText: toDate });
  const notes = generateRandomAlphaNumByLength({ lengthOfString: 10 });
  clearTextType({ element: addDriverPage.timeOff.txtFieldNote, typeText: notes });
  genericUtils.typeDropDwn({ locator: addDriverPage.timeOff.startLocation, drpDwnVal: startCity });
  genericUtils.typeDropDwn({ locator: addDriverPage.timeOff.endLocation, drpDwnVal: endCity });
};

export const searchDriverWithExistingCode = (driverCodeVal) => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  verifyToExist({ element: driverSearch });
  cy.get(driverSearch).click({ force: true });
  cy.wait(shortWait);
  cy.get(txtFieldDriverCode).type(driverCodeVal);
  verifyToExist({ element: btnSearchSubmit });
  cy.get(btnSearchSubmit).click();
  if (cy.get('[data-table-id="driver-search"] [data-testid="table-tbody"] [role="row"]').length !== 0) {
    cy.get(linkDriver).should('have.text', driverCodeVal);
  } else {
    cy.get(linkDriver).should('have.text', driverGeneralData.expectedData.invalidDriverMsg);
  }
};

export const searchDriverWithDivision = (divisionVal) => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  verifyToExist({ element: driverSearch });
  cy.get(driverSearch).click({ force: true });
  cy.wait(shortWait);
  genericUtils.dropDownContainsTextClick({ element: driverSearchPage.drpDwnDivision, typeText: divisionVal, exactText: divisionVal });
  verifyToExist({ element: btnSearchSubmit });
  cy.get(btnSearchSubmit).click();
};

export const searchDriverWithInvalidCode = (driverCodeVal, divisionVal) => {
  cy.get(resourcesMenu).focus();
  verifyToExist({ element: resourcesMenu });
  cy.get(resourcesMenu).click({ force: true });
  verifyToExist({ element: driverSearch });
  cy.get(driverSearch).click({ force: true });
  cy.wait(shortWait);
  cy.get(txtFieldDriverCode).type(driverCodeVal);
  genericUtils.dropDownContainsTextClick({ element: driverSearchPage.drpDwnDivision, typeText: divisionVal, exactText: divisionVal });
  verifyToExist({ element: btnSearchSubmit });
  cy.get(btnSearchSubmit).click();
  cy.get(driverCommonPage.tblCapacityFieldsEmpty).should('have.text', driverGeneralData.expectedData.invalidDriverMsg);
};

export const verifySearchedDriverCode = (driverCodeVal) => {
  cy.get(driverSearchPage.lblDriverCode).should('have.text', driverCodeVal);
  cy.get(addDriverPage.drpDwnSuffix).should('have.attr', 'name', 'nameSuffixTerm');
};

export const addDriverAndVerifyCode = (driverCode) => {
  const firstName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
  const lastName = 'Last';
  //Enter text to driver fist name , last name and driver code
  typeText({ locator: txtFieldDriverFirstName, dataText: firstName });
  typeText({ locator: txtFieldDriverLastName, dataText: lastName });
  typeText({ locator: txtFieldAddDriverCode, dataText: driverCode });
  //entering phone number
  typeDrpDwnWithMachtingText({ locator: drpdwnPhoneNumCountry, drpDwnVal: countryIndia });
  typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
  //return { driverCode, firstName };
};

export const addNewCareerGoal = (drpDwnPositionData, drpDwnPreferenceData, drpDwnReasonData) => {
  clickAction({ locator: preferencesPage.careerGoals.btnAddNewGoal });
  clickAction({ locator: preferencesPage.careerGoals.btnAddNewGoal });
  //Add new career goal
  typeDrpDwnWithMachtingText({ locator: preferencesPage.careerGoals.drpDwnPosition, drpDwnVal: drpDwnPositionData });
  typeDrpDwnWithMachtingText({ locator: preferencesPage.careerGoals.drpDwnPreference, drpDwnVal: drpDwnPreferenceData });
  typeDrpDwnWithMachtingText({ locator: preferencesPage.careerGoals.drpDwnReason, drpDwnVal: drpDwnReasonData });
  verifyIfEnabled({ locator: preferencesPage.careerGoals.btnSaveGoal });
  clickActionWait({ locator: preferencesPage.careerGoals.btnSaveGoal });
};

export const navigateToAddTrailer = () => {
  verifyToExist({ element: resourcesMenu });
  clickAction({ locator: resourcesMenu });
  verifyToExist({ element: trailerNew });
  clickAction({ locator: trailerNew });
  waitSometime(moreWait);
};

export const verifyEquipmentFields = ({ locator: element }) => {
  const equipmentFields = commonData.commonFields.equipmentFields;
  genericUtils.verifyRowContainsText({ locator: element, index: 0, verifyText: equipmentFields.type });
  genericUtils.verifyRowContainsText({ locator: element, index: 1, verifyText: equipmentFields.description });
  genericUtils.verifyRowContainsText({ locator: element, index: 2, verifyText: equipmentFields.count });
  genericUtils.verifyRowContainsText({ locator: element, index: 3, verifyText: equipmentFields.assetId });
  genericUtils.verifyRowContainsText({ locator: element, index: 4, verifyText: equipmentFields.issued });
  genericUtils.verifyRowContainsText({ locator: element, index: 5, verifyText: equipmentFields.recovered });
  genericUtils.verifyRowContainsText({ locator: element, index: 6, verifyText: equipmentFields.condition });
};

export const verifyCertificationsAndPermitsErrorMessage = () => {
  cy.get(addDriverPage.certificationOrPermit.errorMessageBanner).should('have.text', addDriverData.expectedData.errorMessage);
};

export const addPowerMaintenance = (maintenanceType, severityValue) => {
  genericUtils.verifyIfEnabled({ locator: powerDetails.maintenance.drpDwnType });
  genericUtils.dropDownContainsTextClick({ element: powerDetails.maintenance.drpDwnType, typeText: maintenanceType, exactText: maintenanceType });
  genericUtils.clickAction({ locator: powerDetails.maintenance.chkBoxPlanned });
  genericUtils.dropDownContainsTextClick({ element: powerDetails.maintenance.drpDwnSeverity, typeText: severityValue, exactText: severityValue });
  genericUtils.typeDropDwnClick({ locator: powerDetails.maintenance.maintenanceFacility, drpDwnVal: powerData.expectedData.maintenaceFacility });
  genericUtils.typeDropDwnClick({ locator: powerDetails.maintenance.txtLocation, drpDwnVal: powerData.expectedData.maintenanceLocation });
  dateTimeutils.datePicker({ dateLocator: powerDetails.maintenance.txtExpStartDate, dataText: returntodayDateMMDDYY() });
  genericUtils.typeText({ locator: powerDetails.maintenance.txtExpStartTime, dataText: powerData.expectedData.expStartTime });
  dateTimeutils.datePicker({ dateLocator: powerDetails.maintenance.actStartDate, dataText: returntodayDateMMDDYY() });
  genericUtils.typeText({ locator: powerDetails.maintenance.actStartTime, dataText: powerData.expectedData.expStartTime });
  genericUtils.typeText({ locator: powerDetails.maintenance.estMaintenanceTime, dataText: powerData.expectedData.expStartTime });
  dateTimeutils.datePicker({ dateLocator: powerDetails.maintenance.expEndDate, dataText: returnfutureDateMMDDYY({ dayCount: historyData.userDefinedData.dayCountVal, monthCount: historyData.userDefinedData.monthCountVal }) });
  genericUtils.typeText({ locator: powerDetails.maintenance.expEndTime, dataText: powerData.expectedData.expStartTime });
  dateTimeutils.datePicker({ dateLocator: powerDetails.maintenance.actEndDate, dataText: returnfutureDateMMDDYY({ dayCount: historyData.userDefinedData.dayCountVal, monthCount: historyData.userDefinedData.monthCountVal }) });
  genericUtils.typeText({ locator: powerDetails.maintenance.actEndTime, dataText: powerData.expectedData.expStartTime });
  genericUtils.typeText({ locator: powerDetails.maintenance.workPerformedDetail, dataText: powerData.expectedData.workPerformedDetail });
  genericUtils.clickAction({ locator: powerDetails.maintenance.btnSaveMaintenance });
};

export const editPowerMaintenance = (maintenanceType, severityValue) => {
  genericUtils.clickAction({ locator: powerDetails.maintenance.kabobMenu });
  genericUtils.clickAction({ locator: powerDetails.menuOptionEditInKebab });
  genericUtils.dropDownContainsTextClick({ element: powerDetails.maintenance.drpDwnType, typeText: maintenanceType, exactText: maintenanceType });
  genericUtils.dropDownContainsTextClick({ element: powerDetails.maintenance.drpDwnSeverity, typeText: severityValue, exactText: severityValue });
  genericUtils.clickAction({ locator: powerDetails.maintenance.btnSaveMaintenance });
  genericUtils.clickAction({ locator: powerDetails.btnMaintenanceClose });
};

export const deletePowerMaintenance = () => {
  genericUtils.clickAction({ locator: powerDetails.maintenance.kabobMenu });
  genericUtils.clickAction({ locator: powerDetails.menuOptionDeleteInKebab });
};

export const enterPowerUnitCode = ({ powerCode: powerCodeVal }) => {
  genericUtils.typeText({ locator: addPowerPage.txtFieldAddPowerCode, dataText: powerCodeVal });
};
export const addPowerLocations = () => {
  genericUtils.typeText({ locator: powerDetails.txtLastPing, dataText: powerData.expectedData.lastPingLocation });
  genericUtils.typeText({ locator: powerDetails.txtLastPingDtTm, dataText: powerData.expectedData.lastPingDateTm });
  genericUtils.typeText({ locator: powerDetails.txtLastFac, dataText: powerData.expectedData.lastFacility });
  genericUtils.typeText({ locator: powerDetails.txtFacLoc, dataText: powerData.expectedData.facilityLocation });
  genericUtils.clickAction({ locator: homePagePower.btnPowerSave });
};

export const addPowerIdentifierValues = (typeVal, stateVal, idVal, expirationDate) => {
  clickAction({ locator: powerDetails.identifiers.addBtn });
  genericUtils.typeDrpDwnWithMachtingText({ locator: powerDetails.identifiers.typeDrpDwn, drpDwnVal: typeVal });
  genericUtils.typeDropDwnContainsClickWithInputIndex({ locator: powerDetails.identifiers.stateBtn, drpDwnVal: stateVal, inputIndex: 1 });
  typeText({ locator: powerDetails.identifiers.expirationDateTxtBx, dataText: expirationDate });
  typeText({ locator: powerDetails.identifiers.idTxtBx, dataText: idVal });
  clickAction({ locator: powerDetails.identifiers.addIdentifiersBtn });
};

export const enterPowerOperationalDetailsValues = (classValue, divisionValue) => {
  const defaultPowerCode = 'PC';
  const randomNumber = generateRandomNumber();
  const finalPowerCode = defaultPowerCode + randomNumber;
  typeText({ locator: txtFieldAddPowerCode, dataText: finalPowerCode });
  waitSometime(shortWait);
  dropDownContainsTextClick({ element: powerDetails.operationalDetails.drpdwnClass, typeText: classValue, exactText: classValue });
  dropDownContainsTextClick({ element: powerDetails.operationalDetails.drpdwnDivision, typeText: divisionValue, exactText: divisionValue });
  return finalPowerCode;
};

export const verifyPowerGeneraInfolLabels = () => {
  const powerGeneralInfoLabelValues = new Map([[powerDetails.labelMake, powerData.staticDataPower.lblMake],
    [powerDetails.labelModel, powerData.staticDataPower.lblModel],
    [powerDetails.labelType, powerData.staticDataPower.lblMaintenanceType],
    [powerDetails.labelTrackingDevice, powerData.staticDataPower.lblTrackingDevice],
    [powerDetails.labelTrackingModel, powerData.staticDataPower.lblModel]]);
  genericUtils.verifyLabelUsingMapArray({ map: powerGeneralInfoLabelValues });
};

export const verifyPowerOpsSpecAndAppearenceLabels = () => {
  const powerOpsSpecAndAppearenceLabelValues = new Map([[powerDetails.labelPowerUnitCode, powerData.staticDataPower.lblPowerUnitCode],
    [powerDetails.labelClass, powerData.staticDataPower.lblClass],
    [powerDetails.labelDivision, powerData.staticDataPower.lblDivision],
    [powerDetails.labelSleeperType, powerData.staticDataPower.lblSleeperType],
    [powerDetails.labelAxelConfig, powerData.staticDataPower.lblAxelConfig],
    [powerDetails.labelSuspension, powerData.staticDataPower.lblSuspension],
    [powerDetails.labelSleeperSize, powerData.staticDataPower.lblSleeperSize],
    [powerDetails.labelEngineBrake, powerData.staticDataPower.lblEngineBrake],
    [powerDetails.labelFifthBrake, powerData.staticDataPower.lblFifthWheel]]);
  genericUtils.verifyLabelUsingMapArray({ map: powerOpsSpecAndAppearenceLabelValues });
};

export const verifyPowerIdentifierLabels = () => {
  const powerIdentifierLabelValues = new Map([[powerDetails.identifiers.typeDrpDwnLabel, powerData.staticDataPower.lblMaintenanceType],
    [powerDetails.identifiers.idLabel, powerData.staticDataPower.lblId],
    [powerDetails.identifiers.stateLabel, powerData.staticDataPower.lblState],
    [powerDetails.identifiers.countryLabel, powerData.staticDataPower.lblCountry],
    [powerDetails.identifiers.expirationDateLabel, powerData.staticDataPower.lblExpirationDt]]);
  clickAction({ locator: powerDetails.identifiers.addBtn });
  genericUtils.verifyLabelUsingMapArray({ map: powerIdentifierLabelValues });
  clickAction({ locator: powerDetails.identifiers.closeBtn });
};

export const verifyPowerEquipmentLabels = () => {
  const powerEquipmentLabelValues = new Map([[powerDetails.equipment.labelType, powerData.staticDataPower.lblMaintenanceType],
    [powerDetails.equipment.labelDescription, powerData.staticDataPower.lblDescription],
    [powerDetails.equipment.labelCount, powerData.staticDataPower.lblCount],
    [powerDetails.equipment.labelAssetID, powerData.staticDataPower.lblAssetId],
    [powerDetails.equipment.labelCondition, powerData.staticDataPower.lblCondition]]);
  clickAction({ locator: powerDetails.equipment.addEquipmentBtn });
  genericUtils.verifyLabelUsingMapArray({ map: powerEquipmentLabelValues });
  clickAction({ locator: powerDetails.identifiers.closeBtn });
};

export const verifyPowerGeneralLabels = () => {
  verifyPowerGeneraInfolLabels();
  verifyPowerOpsSpecAndAppearenceLabels();
  verifyPowerEquipmentLabels();
  verifyPowerIdentifierLabels();
};

export const verifyPowerPermanentDriver = (driverCode) => {
  const defaultPowerCode = 'PC';
  const randomNumber = generateRandomNumber();
  const finalPowerCode = defaultPowerCode + randomNumber;
  genericUtils.typeText({ locator: txtFieldAddPowerCode, dataText: finalPowerCode });
  genericUtils.dropDownContainsValueCheckBoxSelection({ element: powerDetails.permanentDriverCodesDrpDwn, ddValue: driverCode });
};

export const createDriverForPermanentDriverVerification = (driverCode) => {
  const firstName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
  const lastName = 'Last';
  typeText({ locator: txtFieldDriverFirstName, dataText: firstName });
  typeText({ locator: txtFieldDriverLastName, dataText: lastName });
  typeText({ locator: txtFieldAddDriverCode, dataText: driverCode });
  genericUtils.clickAction({ locator: homePage.btnDriverSave });
};

export const verifyPowerPermanentTrailer = (trailerCode) => {
  const defaultPowerCode = 'PC';
  const randomNumber = generateRandomNumber();
  const finalPowerCode = defaultPowerCode + randomNumber;
  genericUtils.typeText({ locator: txtFieldAddPowerCode, dataText: finalPowerCode });
  genericUtils.dropDownContainsValueCheckBoxSelection({ element: powerDetails.permanentTrailerDropDown, ddValue: trailerCode });
};

export const addPowerStatusDetails = (operatingStatusVal, serviceStatus) => {
  genericUtils.dropDownContainsTextClick({ element: powerDetails.drpDwnOperatingStatus, typeText: operatingStatusVal, exactText: operatingStatusVal });
  genericUtils.dropDownContainsTextClick({ element: powerDetails.drpDwnServiceStatus, typeText: serviceStatus, exactText: serviceStatus });
  genericUtils.typeDropDwnClick({ locator: powerDetails.txtFieldPoolSearch, drpDwnVal: powerData.staticDataPower.poolSearchValue });
  genericUtils.verifyIfEnabled({ locator: homePagePower.btnPowerSave });
  genericUtils.verifyReadOnly({ locator: powerDetails.txtAssignedDrivers, condition: powerData.staticDataPower.booleanValue });
  genericUtils.verifyReadOnly({ locator: powerDetails.txtAssignedTrailers, condition: powerData.staticDataPower.booleanValue });
  genericUtils.clickAction({ locator: homePagePower.btnPowerSave });
};

export const verifyIndentifierFieldsEnabled = () => {
  genericUtils.typeDrpDwnWithMachtingText({ locator: addPowerPage.identifiers.typeDrpDwn, drpDwnVal: powerData.staticDataPower.licensePlateType });
  genericUtils.verifyIfEnabled({ locator: addPowerPage.identifiers.typeDrpDwn });
  genericUtils.verifyIfEnabled({ locator: addPowerPage.identifiers.idTxtBx });
  genericUtils.verifyIfEnabled({ locator: addPowerPage.identifiers.stateBtn });
  genericUtils.verifyIfEnabled({ locator: addPowerPage.identifiers.countryDrpDwn });
  genericUtils.verifyIfEnabled({ locator: addPowerPage.identifiers.expirationDateTxtBx });
};

export const enterPowerIdentifierValues = (typeVal, stateVal, idVal, expirationDate) => {
  genericUtils.typeDrpDwnWithMachtingText({ locator: addPowerPage.identifiers.typeDrpDwn, drpDwnVal: typeVal });
  genericUtils.typeDropDwnContainsClickWithInputIndex({ locator: addPowerPage.identifiers.stateBtn, drpDwnVal: stateVal, inputIndex: 1 });
  genericUtils.typeText({ locator: addPowerPage.identifiers.expirationDateTxtBx, dataText: expirationDate });
  genericUtils.typeText({ locator: addPowerPage.identifiers.idTxtBx, dataText: idVal });
};

export const clickAddIdentifiersBtn = () => {
  genericUtils.clickAction({ locator: addPowerPage.identifiers.addIdentifiersBtn });
};

export const verifyAddEditPopupFields = () => {
  genericUtils.verifyToExist({ element: addPowerPage.identifiers.typeDrpDwn });
  genericUtils.verifyToExist({ element: addPowerPage.identifiers.idTxtBx });
  genericUtils.verifyToExist({ element: addPowerPage.identifiers.stateBtn });
  genericUtils.verifyToExist({ element: addPowerPage.identifiers.countryDrpDwn });
  genericUtils.verifyToExist({ element: addPowerPage.identifiers.expirationDateTxtBx });
  genericUtils.verifyToExist({ element: addPowerPage.identifiers.closeBtn });
  genericUtils.verifyToExist({ element: addPowerPage.identifiers.addIdentifiersBtn });
};

export const verifyTypeLicenseMandatoryFields = () => {
  genericUtils.verifyExists({ element: addPowerPage.identifiers.idAsterisk });
  genericUtils.verifyExists({ element: addPowerPage.identifiers.stateAsterisk });
  genericUtils.verifyExists({ element: addPowerPage.identifiers.countryAsterisk });
  genericUtils.verifyExists({ element: addPowerPage.identifiers.expirationDateAsterisk });
};

export const verifyIdentifierSavedValues = (typeVal, idVal, stateVal, countryVal, expirationVal) => {
  genericUtils.verifyText({ locator: addPowerPage.identifiers.typeHeaderVal, verifyText: typeVal });
  genericUtils.verifyText({ locator: addPowerPage.identifiers.idHeaderVal, verifyText: idVal });
  genericUtils.verifyText({ locator: addPowerPage.identifiers.stateHeaderVal, verifyText: stateVal });
  genericUtils.verifyText({ locator: addPowerPage.identifiers.countryHeaderVal, verifyText: countryVal });
  genericUtils.verifyText({ locator: addPowerPage.identifiers.expirationHeaderVal, verifyText: expirationVal });
};

export const verifyTrailerSpecsFields = () => {
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.length });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.length });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtDoorWidth });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtDoorWidth });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtExteriorHeight });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtExteriorHeight });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtExteriorWidth });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtExteriorWidth });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtFrontInteriorHeight });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtFrontInteriorHeight });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtGVMR });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtGVMR });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtInteriorWidth });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtInteriorWidth });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtRearInteriorHeight });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtRearInteriorHeight });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtWeight });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtWeight });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtSuspension });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtSuspension });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtLandingGear });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtLandingGear });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtGWAR });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtGWAR });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.drpDwnLiftGateType });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.drpDwnLiftGateType });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtLiftGateCapacity });
  genericUtils.verifyIfDisabled({ locator: trailerPage.trailerSpecs.txtLiftGateCapacity });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtLiftGateSize });
  genericUtils.verifyIfDisabled({ locator: trailerPage.trailerSpecs.txtLiftGateSize });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.drpDwnAxleType });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.drpDwnAxleType });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.txtAxleCount });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.txtAxleCount });
  genericUtils.verifyExists({ element: trailerPage.trailerSpecs.drpDwnETracks });
  genericUtils.verifyIfEnabled({ locator: trailerPage.trailerSpecs.drpDwnETracks });
};

export const verifyTrailerSpecsMeasurementUnitDropDownValues = (unitLocator) => {
  cy.get(unitLocator).click().get(trailerPage.trailerSpecs.measurementUnitDrpDwnValues).each((val, index) => {
    expect(val.text()).to.eq(trailerDetailsData.staticData.measurementUnits[index]);
  });
};

export const verifyTrailerSpecsGVMRDropDownValues = (unitLocator) => {
  cy.get(unitLocator).click().get(trailerPage.trailerSpecs.measurementUnitDrpDwnValues).each((val, index) => {
    expect(val.text()).to.eq(trailerDetailsData.staticData.grossUnitValues[index]);
  });
};

export const verifyIdentifierPopupEmptyVals = () => {
  genericUtils.verifyAttrText({ locator: addPowerPage.identifiers.idTxtBx, attribute: 'value', verifyText: '' });
  genericUtils.verifyAttrText({ locator: addPowerPage.identifiers.stateBtnElem, attribute: 'title', verifyText: '' });
  genericUtils.verifyAttrText({ locator: addPowerPage.identifiers.countryDrpDwn, attribute: 'value', verifyText: '' });
  genericUtils.verifyAttrText({ locator: addPowerPage.identifiers.expirationDateTxtBx, attribute: 'value', verifyText: '' });
};

export {
  addAddress,
  addDataIntoRow,
  addTrainingWithFewFields,
  addDriver,
  addDriverPersonalInfo,
  addIdentifier,
  addMultipleTrainingAndVerifyAddedAtLast,
  addPower,
  addPowerByValidatingOdometerField,
  addTrailerByValidatingOdometerField,
  addPowerAppearanceDetails,
  addTimeOff,
  addNewEquipmentCardInPower,
  addTrailerFleet,
  addTrailerMaintenanceRecd,
  addTraining,
  addTrainingIfNotExist,
  addTrainingWithAllFields,
  addTrainingDataIntoRow,
  addTrainingWithMaxRowCount,
  addPreferredLanes,
  addPreferredRoutes,
  verifyDeleteInLastRow,
  clickDeleteInLastRow,
  addnlDrvrProfInfo,
  basicDrvrProfInfo,
  clickDeleteInFirstRow,
  clickEditInIdentifier,
  clickEditInFirstRow,
  clickEditInLastRow,
  clickEditAddressInLastRow,
  createPowerWithMandatoryFields,
  createPowerWithMandatoryFieldsAndOdometerField,
  createPowerWithSomeFields,
  createTrailerWithMandatoryFields,
  createTrailerWithOptionalFields,
  customizeTablColumns,
  driverSaveAction,
  driverSaveAndVerifyUpdatedMsg,
  editTrailer,
  editTrainingPopupFieldValidations,
  editTrainingWithAllFields,
  enterDataToFewPowerFields,
  enterDriverMandatoryFields,
  navigateToAddPowerNewPage,
  navigateToAddTrainingPopup,
  navigateToDriverAddNewPage,
  navigateToDriverSearchPage,
  navigateToPowerSearch,
  openTrainingTblExpandView,
  searchDriverWithCode,
  searchDriverWithDriverCodeAndDrpDwnvalue,
  searchDriverWithName,
  searchDriverWithPhoneNumber,
  searchPowerWithCode,
  searchPowerWithDivision,
  searchPowerWithFilters,
  searchTrailerWithCode,
  searchTrailerWithType,
  submitPowerAndVerifyToastMsg,
  tabsInOperationalDetailsCard,
  validateDrpDwnField,
  validateDueDateAndCompleteDate,
  validateFacilityFields,
  validateRow,
  validateSortingbtwTwoViews,
  validateStateOfAddTrainingBtn,
  validateTrainerAndDescnFields,
  validateTypeTermDrpDwn,
  verifyAddNewIconAtBesidesKebabMenu,
  verifyCarrotMenuAtCornerOfTable,
  verifyDriverSearchResultsRowData,
  verifyInputFieldTagAndMaxLength,
  verifyKebabMenuInEachRow,
  verifyLastRowContainsColumnTxt,
  verifyMaintenanceWindowAvaFields,
  verifyRowData,
  verifyAdditionalStopsToolTip,
  verifySaveFunctionality,
  verifySortOrder,
  verifyTimeOffTblFieldsGrayOut,
  verifyVerticalScrollBar,
  verifyAddedPreferredLanes,
  verifyPreferenceAndReason,
  verifyAddedPreferredRoutes,
  searchDriverWithFleetAndVerify,
  createFleetToDriver,
  saveTrailer,
  trailerGeneralInformation,
  trailerOperationalDetails,
  trailerTrackingInformation,
  trailerUpdate,
  addPowerNotes,
  addPowerAppearance,
  addPowerFleet,
  editPowerFleet,
  deletePowerFleet,
};