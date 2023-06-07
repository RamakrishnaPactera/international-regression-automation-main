/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Driver Preferences tab  - Create Driver with mandatory fields and add, edit and delete Preferences
 Test Cases List
 Authored By : Jyothi Prasad
 Date : 02-05-2023,
 Functions/Calling References : dateTimeUtils, genericUtils, loginUtils, resourceUtils
 Test case Included : ME-46318, ME-151640, ME-151633, ME-52137 Verify user can open and validate fields in Operational Preferences > Driver > Resources |  Assets - Driver | Regression
                    : ME-151621,ME-156569 Verify user can add Operational Preference, save and verify row data in Operational Preferences > Driver > Resources |  Assets - Driver | Regression
                    : ME-151615 Verify user can edit Operational Preference and save in Driver > Resources |  Assets - Driver | Regression
                    : ME-151567 Verify user can delete Operational Preference and save in Driver > Resources |  Assets - Driver | Regression
                    : ME-151719 Verify duplicate error message in Operational Preferences > Driver > Resources |  Assets - Driver | Regression
                    : ME-46370, ME-152072, ME-152077, ME-52192 Verify user can open and validate fields in Geography Preferences > Driver > Resources |  Assets - Driver | Regression
                    : ME-152092 Verify user can add Geography Preference, save and verify row data in Geography Preferences > Driver > Resources |  Assets - Driver | Regression
                    : ME-152105 Verify user can edit Geography Preference and save in Driver > Resources |  Assets - Driver | Regression
                    : ME-152112 Verify user can delete Geography Preference and save in Driver > Resources |  Assets - Driver | Regression
                    : ME-152117 Verify duplicate error message in Geography Preferences > Driver > Resources |  Assets - Driver | Regression
                    : ME-152845, ME-152849 Verify UI design and no cosmetic issues are present in Customer Preferences > Driver > Resources |  Assets - Driver | Regression
                    : ME-152847, ME-152854, ME-152855, ME-56676 Verify Auto populated fields in Customer Preferences > Driver > Resources |  Assets - Driver | Regression
                    : ME-57010,ME-156564 Add "Preference" field in Customer Preferences > Driver > Resources |  Assets - Driver | Regression
 ----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import { searchDriverWithCode, clickEditInLastRow, clickDeleteInLastRow, addOrEditOperationalPreferenceInDriver, verifyRowData, addOrEditGeographyPreferenceInDriver, addOrEditCustomerPreferencesInDriver } from '../../../../../utilities/assetUtils/resourceUtilis';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as preferencesPage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import { shortWait, longWait } from '../../../../../testData/staticData/commonData/commonData.json';
import { returntodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';
import {
  getMinionValues, getTDMData, viewFullPage, clickWithWaits, verifyElementTextContains, verifyExists, verifyMaxExactLength, verifyContains, verifyIfDisabled, clickOkOnWindowAlert,
  verifyDrpDwnAllValuesText, sortArrayAsc, verifyDoesNotExist, verifyLabel, clickAction, verifyLastRowContainsColumnTxt, dropDownContainsTextClick, typeDropDwnClick, selectItemFromButtonTypeDropDown, verifyToolTips, getText,
} from '../../../../../utilities/commonUtils/genericUtils';
import dayjs from 'dayjs';

const {
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  tdmDriverData,
} = historyData.staticData;
const {
  minionOperPrefType,
  minionOperPrefence,
  titleOperPref,
  titleAddNewOperPref,
  asterisk,
  operPrefType,
  operPreference,
  operPrefQualifier,
  operPrefRecordedBy,
  operPrefDate,
  titleGeographyPreferences,
  titleAddNewGeoPreference,
  minionGeoDirection,
  minionGeoPreference,
  minionGeoReason,
  geoPrefCity,
  geoPrefState,
  geoPrefReason,
  geoPrefDirection,
  titleCustomerPreferences,
  titleAddNewCustPref,
  lblCustomerName,
  tdmCustomerScenario,
  tdmAddCustomerReq,
  tdmCustomerData,
  minionDriverCustPrefReason,
  custPrefName,
  custPrefStatus,
} = preferencesData.staticData;
const { textQualifier, typeEmptyVal, cityChicago, stateIL, cityFlorida, stateFL } = preferencesData.userDefinedData;
const { qualifierTextLength, userTestAutomation1, duplicateErrorMsg, duplicateErrorMsgGeoPref } = preferencesData.expectedData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let drpDwnTypeOption1, drpDwnTypeOption2, drpDwnOperPrefOption1, drpDwnOperPrefOption2, driverDataTDM, operPreferenceData, drpDwnTypeOptions, drpDwnOperPrefOptions, operPreferenceDataNew,
  drpDwnDirectionOption1, drpDwnDirectionOption2, drpDwnDirectionOptions, drpDwnGeoPrefOption1, drpDwnGeoPrefOption2, drpDwnGeoPrefOptions, drpDwnGeoReasonOption1, drpDwnGeoReasonOption2,
  drpDwnGeoReasonOptions, geoPreferenceData, geoPreferenceDataNew, customerNameVal, drpDwnCustPrefReasonOption1, driverCustPrefData, documentDate;
describe('Verify user can Add Preferences in driver table [ME-46318, ME-151640, ME-151633, ME-52137, ME-151621, ME-151615, ME-151567, ME-151719, ME-46370, ME-152072, ME-152077, ME-52192, ME-152092, ME-152105, ME-152112, ME-152117, ME-152845, ME-152849, ME-152847, ME-152854, ME-56676, ME-152855, ME-57010,ME-156564,ME-156569, ME-137783]', () => {
  before(() => {
    getMinionValues(minionOperPrefType, 5).then((resultOptions) => {
      drpDwnTypeOption1 = resultOptions[0];
      drpDwnTypeOption2 = resultOptions[1];
      drpDwnTypeOptions = resultOptions;
    });
    getMinionValues(minionOperPrefence, 3).then((resultOptions) => {
      drpDwnOperPrefOption1 = resultOptions[0];
      drpDwnOperPrefOption2 = resultOptions[1];
      drpDwnOperPrefOptions = resultOptions;
    });
    getMinionValues(minionGeoDirection, 2).then((resultOptions) => {
      drpDwnDirectionOption1 = resultOptions[0];
      drpDwnDirectionOption2 = resultOptions[1];
      drpDwnDirectionOptions = resultOptions;
    });
    getMinionValues(minionGeoPreference, 3).then((resultOptions) => {
      drpDwnGeoPrefOption1 = resultOptions[0];
      drpDwnGeoPrefOption2 = resultOptions[1];
      drpDwnGeoPrefOptions = resultOptions;
    });
    getMinionValues(minionGeoReason, 2).then((resultOptions) => {
      drpDwnGeoReasonOption1 = resultOptions[0];
      drpDwnGeoReasonOption2 = resultOptions[1];
      drpDwnGeoReasonOptions = resultOptions;
    });
    getMinionValues(minionDriverCustPrefReason, 4).then((resultOptions) => {
      drpDwnCustPrefReasonOption1 = resultOptions[0];
    });
  });
  beforeEach(() => {
    cy.log('***creating customer using TDM***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
    });
  });
  it('ME-46318, ME-151640, ME-151633, ME-52137 Verify user can open and validate fields in Operational Preferences > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Verifying Operational Preferences tab exist
      verifyElementTextContains({ locator: preferencesPage.lblOperationalPreferences, verifyText: titleOperPref });
      verifyExists({ element: preferencesPage.btnAddNew });
      clickWithWaits({ locator: preferencesPage.btnAddNew, waitTime: shortWait });
      verifyElementTextContains({ locator: preferencesPage.lblAddNewOperPref, verifyText: titleAddNewOperPref });
      //Verifying filed validations
      drpDwnTypeOptions = sortArrayAsc({ unSortedArray: drpDwnTypeOptions });
      drpDwnTypeOptions.unshift(typeEmptyVal);
      drpDwnOperPrefOptions = sortArrayAsc({ unSortedArray: drpDwnOperPrefOptions });
      drpDwnOperPrefOptions.unshift(typeEmptyVal);
      verifyDrpDwnAllValuesText({ drpDwnLocator: preferencesPage.drpDwnType, drpDwnTextArray: drpDwnTypeOptions });
      verifyDrpDwnAllValuesText({ drpDwnLocator: preferencesPage.drpDwnPreference, drpDwnTextArray: drpDwnOperPrefOptions });
      verifyContains({ locator: preferencesPage.lblType, containsText: asterisk });
      verifyContains({ locator: preferencesPage.lblPreference, containsText: asterisk });
      verifyMaxExactLength({ locator: preferencesPage.txtFieldQualifier, maxLength: qualifierTextLength });
      verifyIfDisabled({ locator: preferencesPage.btnSaveOperPref });
    });

  it('ME-151621,ME-156569 Verify user can add Operational Preference, save and verify row data in Operational Preferences > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      operPreferenceData = new Map([
        [operPrefType, drpDwnTypeOption1],
        [operPreference, drpDwnOperPrefOption1],
        [operPrefQualifier, textQualifier],
        [operPrefRecordedBy, userTestAutomation1],
        [operPrefDate, returntodayDateMMDDYY()],
      ]);
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Adding values in fields
      clickWithWaits({ locator: preferencesPage.btnAddNew, waitTime: shortWait });
      addOrEditOperationalPreferenceInDriver({ drpDwnTypeValue: drpDwnTypeOption1, drpDwnPreferenceValue: drpDwnOperPrefOption1, typeText: textQualifier });
      //Verifying created Operational Preference
      verifyRowData({ locator: preferencesPage.rowOperPrefTable, inputDataObj: operPreferenceData });
      //Save Driver
      clickWithWaits({ locator: preferencesPage.btnDriverSave, waitTime: longWait });
    });

  it('ME-151615 Verify user can edit Operational Preference and save in Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      operPreferenceDataNew = new Map([
        [operPrefType, drpDwnTypeOption2],
        [operPreference, drpDwnOperPrefOption2],
        [operPrefQualifier, textQualifier],
        [operPrefRecordedBy, userTestAutomation1],
        [operPrefDate, returntodayDateMMDDYY()],
      ]);
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Adding values in fields
      clickWithWaits({ locator: preferencesPage.btnAddNew, waitTime: shortWait });
      addOrEditOperationalPreferenceInDriver({ drpDwnTypeValue: drpDwnTypeOption1, drpDwnPreferenceValue: drpDwnOperPrefOption1, typeText: textQualifier });
      //Edit Operational Preference
      clickEditInLastRow();
      addOrEditOperationalPreferenceInDriver({ drpDwnTypeValue: drpDwnTypeOption2, drpDwnPreferenceValue: drpDwnOperPrefOption2, typeText: textQualifier });
      //Verify updated fields
      verifyRowData({ locator: preferencesPage.rowOperPrefTable, inputDataObj: operPreferenceDataNew });
      //Save Driver
      clickWithWaits({ locator: preferencesPage.btnDriverSave, waitTime: longWait });
    });

  it('ME-151567 Verify user can delete Operational Preference and save in Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Adding values in fields
      clickWithWaits({ locator: preferencesPage.btnAddNew, waitTime: shortWait });
      addOrEditOperationalPreferenceInDriver({ drpDwnTypeValue: drpDwnTypeOption1, drpDwnPreferenceValue: drpDwnOperPrefOption1, typeText: textQualifier });
      //Delete Operational Preference
      clickDeleteInLastRow();
      clickOkOnWindowAlert();
      //Verifying record deletion
      verifyDoesNotExist({ element: preferencesPage.firstRowKebabGeoPref });
      //Save Driver
      clickWithWaits({ locator: preferencesPage.btnDriverSave, waitTime: longWait });
    });

  it('ME-151719 Verify duplicate error message in Operational Preferences > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Adding values in fields
      clickWithWaits({ locator: preferencesPage.btnAddNew, waitTime: shortWait });
      addOrEditOperationalPreferenceInDriver({ drpDwnTypeValue: drpDwnTypeOption1, drpDwnPreferenceValue: drpDwnOperPrefOption1, typeText: textQualifier });
      //Adding one more Preference to verify duplicate record
      clickWithWaits({ locator: preferencesPage.btnAddNew, waitTime: shortWait });
      addOrEditOperationalPreferenceInDriver({ drpDwnTypeValue: drpDwnTypeOption1, drpDwnPreferenceValue: drpDwnOperPrefOption2, typeText: textQualifier });
      //Verify error message when duplicate record added
      verifyContains({ locator: preferencesPage.tblErrorMsgBanner, containsText: duplicateErrorMsg });
    });

  it('ME-46370, ME-152072, ME-152077, ME-52192 Verify user can open and validate fields in Geography Preferences > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Verifying Geography Preferences tab exist
      verifyElementTextContains({ locator: preferencesPage.lblGeographyPreferences, verifyText: titleGeographyPreferences });
      verifyExists({ element: preferencesPage.btnAddNewGeoPref });
      clickWithWaits({ locator: preferencesPage.btnAddNewGeoPref, waitTime: shortWait });
      verifyElementTextContains({ locator: preferencesPage.lblAddNewOperPref, verifyText: titleAddNewGeoPreference });
      //Verifying filed validations
      drpDwnDirectionOptions = sortArrayAsc({ unSortedArray: drpDwnDirectionOptions });
      drpDwnDirectionOptions.unshift(typeEmptyVal);
      drpDwnGeoPrefOptions = sortArrayAsc({ unSortedArray: drpDwnGeoPrefOptions });
      drpDwnGeoPrefOptions.unshift(typeEmptyVal);
      drpDwnGeoReasonOptions = sortArrayAsc({ unSortedArray: drpDwnGeoReasonOptions });
      drpDwnGeoReasonOptions.unshift(typeEmptyVal);
      verifyDrpDwnAllValuesText({ drpDwnLocator: preferencesPage.drpDwnDirection, drpDwnTextArray: drpDwnDirectionOptions });
      verifyDrpDwnAllValuesText({ drpDwnLocator: preferencesPage.drpDwnPreference, drpDwnTextArray: drpDwnGeoPrefOptions });
      verifyDrpDwnAllValuesText({ drpDwnLocator: preferencesPage.drpDwnReason, drpDwnTextArray: drpDwnGeoReasonOptions });
      verifyContains({ locator: preferencesPage.lblState, containsText: asterisk });
      verifyContains({ locator: preferencesPage.lblPreference, containsText: asterisk });
      verifyContains({ locator: preferencesPage.lblReason, containsText: asterisk });
      verifyIfDisabled({ locator: preferencesPage.btnSaveOperPref });
    });

  it('ME-152092,ME-156569,ME-137783 Verify user can add Geography Preference, save and verify row data in Geography Preferences > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      geoPreferenceData = new Map([
        [geoPrefCity, cityChicago],
        [geoPrefState, stateIL],
        [operPreference, drpDwnGeoPrefOption1],
        [geoPrefReason, drpDwnGeoReasonOption1],
        [geoPrefDirection, drpDwnDirectionOption1],
        [operPrefRecordedBy, userTestAutomation1],
        [operPrefDate, returntodayDateMMDDYY()],
      ]);
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Adding values in fields
      clickWithWaits({ locator: preferencesPage.btnAddNewGeoPref, waitTime: shortWait });
      const cityValue = cityChicago + ', ' + stateIL;
      addOrEditGeographyPreferenceInDriver({ txtCityVal: cityValue, dropDownStateVal: stateIL, drpDwnDirectionVal: drpDwnDirectionOption1, drpDwnPrefVal: drpDwnGeoPrefOption1, drpDwnReasonVal: drpDwnGeoReasonOption1 });
      //Verifying created Operational Preference
      verifyRowData({ locator: preferencesPage.rowGeoPreferenceTable, inputDataObj: geoPreferenceData });
      //Save Driver
      clickWithWaits({ locator: preferencesPage.btnDriverSave, waitTime: longWait });
    });

  it('ME-152105,ME-137783 Verify user can edit Geography Preference and save in Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      geoPreferenceDataNew = new Map([
        [geoPrefCity, cityFlorida],
        [geoPrefState, stateFL],
        [operPreference, drpDwnGeoPrefOption2],
        [geoPrefReason, drpDwnGeoReasonOption2],
        [geoPrefDirection, drpDwnDirectionOption2],
        [operPrefRecordedBy, userTestAutomation1],
        [operPrefDate, returntodayDateMMDDYY()],
      ]);
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Adding values in fields
      clickWithWaits({ locator: preferencesPage.btnAddNewGeoPref, waitTime: shortWait });
      const cityChicagoValue = cityChicago + ', ' + stateIL;
      addOrEditGeographyPreferenceInDriver({ txtCityVal: cityChicagoValue, dropDownStateVal: stateIL, drpDwnDirectionVal: drpDwnDirectionOption1, drpDwnPrefVal: drpDwnGeoPrefOption1, drpDwnReasonVal: drpDwnGeoReasonOption1 });
      //Edit Operational Preference
      clickEditInLastRow();
      const cityFloridaValue = cityFlorida + ', ' + stateFL;
      addOrEditGeographyPreferenceInDriver({ txtCityVal: cityFloridaValue, dropDownStateVal: stateFL, drpDwnDirectionVal: drpDwnDirectionOption2, drpDwnPrefVal: drpDwnGeoPrefOption2, drpDwnReasonVal: drpDwnGeoReasonOption2 });
      //Verify updated fields
      verifyRowData({ locator: preferencesPage.rowGeoPreferenceTable, inputDataObj: geoPreferenceDataNew });
      //Save Driver
      clickWithWaits({ locator: preferencesPage.btnDriverSave, waitTime: longWait });
    });

  it('ME-152112,ME-137783 Verify user can delete Geography Preference and save in Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Adding values in fields
      clickWithWaits({ locator: preferencesPage.btnAddNewGeoPref, waitTime: shortWait });
      const cityChicagoValue = cityChicago + ', ' + stateIL;
      addOrEditGeographyPreferenceInDriver({ txtCityVal: cityChicagoValue, dropDownStateVal: stateIL, drpDwnDirectionVal: drpDwnDirectionOption1, drpDwnPrefVal: drpDwnGeoPrefOption1, drpDwnReasonVal: drpDwnGeoReasonOption1 });
      //Delete Operational Preference
      clickDeleteInLastRow();
      clickOkOnWindowAlert();
      //Verifying record deletion
      verifyDoesNotExist({ element: preferencesPage.firstRowKebabGeoPref });
      //Save Driver
      clickWithWaits({ locator: preferencesPage.btnDriverSave, waitTime: longWait });
    });

  it('ME-152117 Verify duplicate error message in Geography Preferences > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Adding values in fields
      clickWithWaits({ locator: preferencesPage.btnAddNewGeoPref, waitTime: shortWait });
      const cityChicagoValue = cityChicago + ', ' + stateIL;
      addOrEditGeographyPreferenceInDriver({ txtCityVal: cityChicagoValue, dropDownStateVal: stateIL, drpDwnDirectionVal: drpDwnDirectionOption1, drpDwnPrefVal: drpDwnGeoPrefOption1, drpDwnReasonVal: drpDwnGeoReasonOption1 });
      //Adding one more Preference to verify duplicate record
      clickWithWaits({ locator: preferencesPage.btnAddNewGeoPref, waitTime: shortWait });
      addOrEditGeographyPreferenceInDriver({ txtCityVal: cityChicagoValue, dropDownStateVal: stateIL, drpDwnDirectionVal: drpDwnDirectionOption1, drpDwnPrefVal: drpDwnGeoPrefOption1, drpDwnReasonVal: drpDwnGeoReasonOption1 });
      //Verify error message when duplicate record added
      verifyContains({ locator: preferencesPage.tblErrorGeoPref, containsText: duplicateErrorMsgGeoPref });
    });

  it('ME-152845, ME-152849 Verify UI design and no cosmetic issues are present in Customer Preferences > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Verifying Customer Preferences tab exist
      verifyElementTextContains({ locator: preferencesPage.tabCustomerPreferences, verifyText: titleCustomerPreferences });
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      verifyExists({ element: preferencesPage.btnAddNewCustPref });
      clickWithWaits({ locator: preferencesPage.btnAddNewCustPref, waitTime: shortWait });
      verifyElementTextContains({ locator: preferencesPage.lblAddNewOperPref, verifyText: titleAddNewCustPref });
      verifyLabel({ locator: preferencesPage.lblName, verifyText: lblCustomerName });
      verifyLabel({ locator: preferencesPage.lblCustPreference, verifyText: operPreference });
      verifyLabel({ locator: preferencesPage.lblReason, verifyText: geoPrefReason });
    });

  it('ME-152847, ME-152854, ME-152855, ME-56676 Verify Auto populated fields in Customer Preferences > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      driverCustPrefData = new Map([
        [custPrefName, customerNameVal.customerName],
        [geoPrefCity, customerNameVal.city],
        [geoPrefState, customerNameVal.state],
        [custPrefStatus, customerNameVal.customerStatus],
        [operPreference, drpDwnOperPrefOption1],
        [geoPrefReason, drpDwnCustPrefReasonOption1],
        [operPrefRecordedBy, userTestAutomation1],
        [operPrefDate, returntodayDateMMDDYY()],
      ]);
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Adding Customer Preferences card
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      clickWithWaits({ locator: preferencesPage.btnAddNewCustPref, waitTime: shortWait });
      addOrEditCustomerPreferencesInDriver({ custNameVal: customerNameVal.customerName, preferenceVal: drpDwnOperPrefOption1, reasonVal: drpDwnCustPrefReasonOption1 });
      //Verifying created Customer Preference
      verifyRowData({ locator: preferencesPage.rowCustPrefTable, inputDataObj: driverCustPrefData });
    });

  it('ME-57010, ME-156564 Add "Preference" field in Customer Preferences > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      clickWithWaits({ locator: preferencesPage.btnAddNewCustPref, waitTime: shortWait });
      //Verifying Preference field values
      drpDwnOperPrefOptions = sortArrayAsc({ unSortedArray: drpDwnOperPrefOptions });
      drpDwnOperPrefOptions.unshift(typeEmptyVal);
      verifyDrpDwnAllValuesText({ drpDwnLocator: preferencesPage.drpDwnPreferenceTerm, drpDwnTextArray: drpDwnOperPrefOptions });
      //Verifying the fields existance
      verifyExists({ element: preferencesPage.customerNameSearch });
      verifyExists({ element: preferencesPage.drpDwnPreferenceTerm });
      verifyExists({ element: preferencesPage.drpDwnReason });
      typeDropDwnClick(({ locator: preferencesPage.customerNameSearch, drpDwnVal: customerNameVal.customerName }));
      dropDownContainsTextClick({ element: preferencesPage.drpDwnReason, typeText: drpDwnCustPrefReasonOption1, exactText: drpDwnCustPrefReasonOption1 });
      //Verifying Add Customer Preference button disabled
      verifyIfDisabled({ locator: preferencesPage.btnSaveOperPref });
      addOrEditCustomerPreferencesInDriver({ custNameVal: customerNameVal.customerName, preferenceVal: drpDwnOperPrefOption1, reasonVal: drpDwnCustPrefReasonOption1 });
      //Edit Customer Preference
      clickEditInLastRow();
      addOrEditCustomerPreferencesInDriver({ custNameVal: customerNameVal.customerName, preferenceVal: drpDwnOperPrefOption1, reasonVal: drpDwnCustPrefReasonOption1 });
      verifyLastRowContainsColumnTxt({ locator: preferencesPage.rowCustPrefTable, locatorColumn: operPreference, containsText: drpDwnOperPrefOption1 });
    });
  it('ME-137785 Geography Preferences - Regression - UI Testcase Geography Preferences > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@P2',
      ],
    }, () => {
      clickWithWaits({ locator: preferencesPage.tabDriverPreferences, waitTime: shortWait });
      //Adding values in fields
      clickWithWaits({ locator: preferencesPage.btnAddNewGeoPref, waitTime: shortWait });
      verifyToolTips({ locator: preferencesPage.geoPref.stateToolTipIcon, verifyText: preferencesData.staticData.stateToolTip });
      verifyToolTips({ locator: preferencesPage.operationalPref.preferenceToolTip, verifyText: preferencesData.staticData.preferenceToolTip });
      verifyToolTips({ locator: preferencesPage.careerGoals.reasonToolTipIcon, verifyText: preferencesData.staticData.reasonToolTip });
      selectItemFromButtonTypeDropDown({ locator: preferencesPage.drpDwnState, dropdownVal: stateIL });
      selectItemFromButtonTypeDropDown({ locator: preferencesPage.drpDwnPreference, dropdownVal: drpDwnGeoPrefOption1 });
      selectItemFromButtonTypeDropDown({ locator: preferencesPage.drpDwnReason, dropdownVal: drpDwnGeoReasonOption1 });
      clickWithWaits({ locator: preferencesPage.btnSaveOperPref, waitTime: shortWait });
      getText({ locator: preferencesPage.geoPref.dateColumn });
      cy.then(() => {
        documentDate = Cypress.env('inputValue'); //date format from is UI-example-05/10/23
        const parsed = dayjs(documentDate, 'MM/DD/YY');
        expect(parsed.format('MM/DD/YY')).to.eq(documentDate);
      });
    });
});