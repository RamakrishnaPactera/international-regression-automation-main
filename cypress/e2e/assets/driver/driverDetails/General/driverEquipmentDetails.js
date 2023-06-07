/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver Equipment Details - Functional Testcases
 Test Cases List
 Authored By :Sanjeev Bandari
 Date : 03-05-2023
 Functions/Calling References : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included : ME-31104 Test Driver Equipment Details - Functional Testcases  | Assets - Driver General Tab | Regression
                    : ME-151566 Test Driver Equipment Details - Verify for mandatory fields and Whether record getting saved successfully.
                    : ME-151571 Test Driver Equipment Details - Verify Edit Record feature.
                    : ME-151573 Test Driver Equipment Details - Verify Delete Record Functionality
                    : ME-151574 Test Driver Equipment Details - Verify whether no duplicates for Asset ID
                    : ME-154713 Test Driver Equipment Details - Verify whether user can be able to add Equipment record by clicking on  Symbol in Equipment card
                    : ME-154715 Test Driver Equipment Details - Verify "Code" Dropdown field
                    : ME-154725 Test Driver Equipment Details - Verify "Condition" Dropdown field
                    : ME-154717 Test Driver Equipment Details - Verify "Description" and "Count" Field
                    : ME-154722 Test Driver Equipment Details - Verify "Issued" and "Recovered" fields should be Date Selector
----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { viewFullPage, toastWithMsg, verifyMaxExactLength, clickAction, getMinionValues, waitSometime, verifyTextContains, selectItemFromDropDown, typeText, verifyIfEnabled, clickOkOnWindowAlertConfirm, verifyExists, clearTypeAndEnter, clickCancelOnWindowAlertConfirm, validateDrpDwnAllOptions, verifyClosePopup, getTDMData, clickActionWait } from '../../../../../utilities/commonUtils/genericUtils';
import addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import { generateRandomNumberByLength, generateRandomAlphaNumByLength } from '../../../../../tdm/lib/utilities/utilities';
import { navigateToDriverAddNewPage, enterDriverMandatoryFields, driverSaveAction, addDriverEquipment, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import { datePicker, returntodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
const {
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  tdmDriverData,
} = historyData.staticData;
const {
  deleteButton,
  editButton,
  equipmentErrorMessage,
  tabDriverGeneral,
} = addDriverPage;
const {
  drpDwnTypeTerm,
  drpDwnTypeTermBtn,
  typeCount,
  assetId,
  description,
  issueDate,
  recoveredDate,
  drpDwnConditionTerm,
  drpDwnConditionTermBtn,
  addEquipmentBtn,
  eqipmentDailog,
  issueDateInputModal,
  recoveredDateInputModal,
  saveEquipmentBtn,
  addedRowData,
  kabobMenuEquipment,
  tblMessageBanner,
} = addDriverPage.equipmentDetails;
const {
  eqpErrorMessage,
  equipmentDialogTitle,
  maxLength250,
  maxLength35,
  txtDescription,
  txtDescriptionDuplicate,
  txtDescriptionUpdated,
  typeNullVal,
} = addDriverData.userDefinedData;
const {
  minionDrpDwnEquipmentType,
  minionDrpDwnEquipmentCondition,
} = generalData.staticData;
const {
  msgUpdated,
} = addDriverData.expectedData;
const { shortWait } = commonData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let drpDwnDriverGeneralEquipmentType, drpDwnDriverGeneralEquipmentType1, drpDwnEquipmentCondition, drpDwnEquipmentCondition1, driverDataTDM;
describe('Test Driver Equipment Details - Functional Testcases [ME-31104][ME-151566][ME-151571][ME-151573][ME-151574][ME-154713][ME-154715][ME-154717][ME-15472][ME-154725][ME-137388] ', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    getMinionValues(minionDrpDwnEquipmentType, 4).then(resultOptions => {
      drpDwnDriverGeneralEquipmentType = resultOptions;
      drpDwnDriverGeneralEquipmentType1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnEquipmentCondition, 4).then(resultOptions => {
      drpDwnEquipmentCondition = resultOptions;
      drpDwnEquipmentCondition1 = resultOptions[0];
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('[ME-31104][ME-154713][ME-154715][ME-154717][ME-15472][ME-154725] Verify the Test Driver Equipment Details  - Functional Testcase | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p1',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      clickAction({ locator: addEquipmentBtn });
      verifyTextContains({ locator: eqipmentDailog, containsText: equipmentDialogTitle });
      //Verify whether the all driver Equipment details field are functionally enabled
      verifyIfEnabled({ locator: drpDwnTypeTerm });
      verifyIfEnabled({ locator: description });
      verifyIfEnabled({ locator: typeCount });
      verifyIfEnabled({ locator: assetId });
      verifyIfEnabled({ locator: issueDate });
      verifyIfEnabled({ locator: recoveredDate });
      verifyIfEnabled({ locator: drpDwnConditionTerm });
      //Verify "Code" and "Condition" Dropdown fields
      drpDwnDriverGeneralEquipmentType.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: drpDwnTypeTerm, locator2: drpDwnTypeTermBtn, optionsArray: drpDwnDriverGeneralEquipmentType });
      waitSometime(shortWait);
      drpDwnEquipmentCondition.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: drpDwnConditionTerm, locator2: drpDwnConditionTermBtn, optionsArray: drpDwnEquipmentCondition });
      //Verify Description fields should be free text box and should allow max 250 characters.
      verifyMaxExactLength({ locator: description, maxLength: maxLength250 });
      //Verify "Count field" should be Numeric text box and should allow only number
      typeText({ locator: typeCount, dataText: generateRandomNumberByLength({ lengthOfNum: 5 }) });
      //Verify "Asset ID" Field should be Free text box and should allow Alpha-Numeric values
      verifyMaxExactLength({ locator: assetId, maxLength: maxLength35 });
      //Verify "Issued" and "Recovered" fields should be Date Selector
      verifyExists({ element: issueDateInputModal });
      verifyExists({ element: recoveredDateInputModal });
      verifyClosePopup();
    });

  it('ME-151566,ME-151571,ME-151573,ME-151574,ME-137388 Test Driver Equipment Details - Verify for mandatory fields,Save,Edit and Delete| Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p1',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields();
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Add Equipment pop up  should be displayed to add New Equipment Record.
      clickAction({ locator: addEquipmentBtn });
      //Verify for mandatory fields and Whether record getting saved successfully.
      selectItemFromDropDown({ element: drpDwnTypeTerm, ddValue: drpDwnDriverGeneralEquipmentType1 });
      clearTypeAndEnter({ element: description, typeText: txtDescription });
      const countValue = generateRandomNumberByLength({ lengthOfNum: 1 });
      clearTypeAndEnter({ element: typeCount, typeText: countValue });
      const assetIdValue = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      clearTypeAndEnter({ element: assetId, typeText: assetIdValue });
      const issueddate = returntodayDateMMDDYY();
      datePicker({ dateLocator: issueDate, dataText: returntodayDateMMDDYY() });
      datePicker({ dateLocator: recoveredDate, dataText: returntodayDateMMDDYY() });
      selectItemFromDropDown({ element: drpDwnConditionTerm, ddValue: drpDwnEquipmentCondition1 });
      verifyIfEnabled({ locator: saveEquipmentBtn });
      clickAction({ locator: saveEquipmentBtn });
      //Verify Equipment record visible on adding new Equipment record successfully.
      verifyTextContains({ locator: addedRowData, containsText: drpDwnDriverGeneralEquipmentType1 });
      verifyTextContains({ locator: addedRowData, containsText: txtDescription });
      verifyTextContains({ locator: addedRowData, containsText: countValue });
      verifyTextContains({ locator: addedRowData, containsText: assetIdValue });
      verifyTextContains({ locator: addedRowData, containsText: issueddate });
      verifyTextContains({ locator: addedRowData, containsText: drpDwnEquipmentCondition1 });
      //Verify Edit Record feature.
      clickAction({ locator: kabobMenuEquipment });
      clickAction({ locator: editButton });
      clearTypeAndEnter({ element: description, typeText: txtDescriptionUpdated });
      clickAction({ locator: saveEquipmentBtn });
      verifyTextContains({ locator: addedRowData, containsText: txtDescriptionUpdated });
      //Verify Delete Record Functionality
      clickAction({ locator: kabobMenuEquipment });
      clickAction({ locator: deleteButton });
      clickCancelOnWindowAlertConfirm();
      waitSometime(shortWait);
      clickAction({ locator: kabobMenuEquipment });
      clickAction({ locator: deleteButton });
      waitSometime(shortWait);
      clickOkOnWindowAlertConfirm();
      waitSometime(shortWait);
      //Adding new Equipment
      clickAction({ locator: addEquipmentBtn });
      selectItemFromDropDown({ element: drpDwnTypeTerm, ddValue: drpDwnDriverGeneralEquipmentType1 });
      clearTypeAndEnter({ element: description, typeText: txtDescription });
      clearTypeAndEnter({ element: typeCount, typeText: countValue });
      clearTypeAndEnter({ element: assetId, typeText: assetIdValue });
      datePicker({ dateLocator: issueDate, dataText: returntodayDateMMDDYY() });
      selectItemFromDropDown({ element: drpDwnConditionTerm, ddValue: drpDwnEquipmentCondition1 });
      verifyIfEnabled({ locator: saveEquipmentBtn });
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Verify whether no duplicates for Asset ID
      clickAction({ locator: addEquipmentBtn });
      selectItemFromDropDown({ element: drpDwnTypeTerm, ddValue: drpDwnDriverGeneralEquipmentType1 });
      clearTypeAndEnter({ element: description, typeText: txtDescriptionDuplicate });
      clearTypeAndEnter({ element: typeCount, typeText: countValue });
      clearTypeAndEnter({ element: assetId, typeText: assetIdValue });
      datePicker({ dateLocator: issueDate, dataText: returntodayDateMMDDYY() });
      selectItemFromDropDown({ element: drpDwnConditionTerm, ddValue: drpDwnEquipmentCondition1 });
      verifyIfEnabled({ locator: saveEquipmentBtn });
      clickAction({ locator: saveEquipmentBtn });
      verifyTextContains({ locator: tblMessageBanner, containsText: eqpErrorMessage });
    });

  it('ME-57880 Verify error message on Equipment Details AssetID for new Driver | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p1',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields();
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Add Equipment pop up  should be displayed to add New Equipment Record.
      clickAction({ locator: addEquipmentBtn });
      const assetIdValue = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      const countValue = generateRandomNumberByLength({ lengthOfNum: 1 });
      addDriverEquipment(drpDwnDriverGeneralEquipmentType1, txtDescription, countValue, assetIdValue, returntodayDateMMDDYY(), returntodayDateMMDDYY(), drpDwnEquipmentCondition1);
      //Adding one more Equipment
      clickAction({ locator: addEquipmentBtn });
      addDriverEquipment(drpDwnDriverGeneralEquipmentType1, txtDescription, countValue, assetIdValue, returntodayDateMMDDYY(), returntodayDateMMDDYY(), drpDwnEquipmentCondition1);
      verifyTextContains({ locator: equipmentErrorMessage, containsText: eqpErrorMessage });
    });

  it('ME-157009 Verify error message on Equipment Details AssetID for Existing Driver | Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets', '@resources', '@driver', '@driverGeneral', '@p1',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      //Add Equipment pop up  should be displayed to add New Equipment Record.
      clickAction({ locator: addEquipmentBtn });
      const assetIdValue = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      const countValue = generateRandomNumberByLength({ lengthOfNum: 1 });
      addDriverEquipment(drpDwnDriverGeneralEquipmentType1, txtDescription, countValue, assetIdValue, returntodayDateMMDDYY(), returntodayDateMMDDYY(), drpDwnEquipmentCondition1);
      //Adding one more Equipment
      clickAction({ locator: addEquipmentBtn });
      addDriverEquipment(drpDwnDriverGeneralEquipmentType1, txtDescription, countValue, assetIdValue, returntodayDateMMDDYY(), returntodayDateMMDDYY(), drpDwnEquipmentCondition1);
      verifyTextContains({ locator: equipmentErrorMessage, containsText: eqpErrorMessage });
    });
});