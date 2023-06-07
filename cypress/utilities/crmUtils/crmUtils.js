import crmFirmographicsData from '../../testData/crm/crmData/crmFirmographicsData.json';
import {
  clearText,
  clearTypeText,
  clickable,
  clickAction,
  clickActionWait,
  clickPreviousElement,
  clickTabBtn,
  clickVisibleElement,
  dropDownContainsTextClick,
  generateRandomNumber,
  navigateToChildWindow,
  typeAndWait,
  typeKeyboardKey,
  typeText,
  validateText,
  verifyAttrText,
  verifyClosePopup,
  verifyElementDoesNotHaveValue,
  verifyExists,
  verifyNotContainValue,
  verifyPartialValue,
  verifyText,
  verifyTextOrBackGroundColor,
  verifyToExist,
  verifyVisible,
} from '../commonUtils/genericUtils';
import crmFirmographicsPage from '../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import contactPage from '../../pageObjects/crm/contactPage/contactPage.json';
import crmContactData from '../../testData/crm/crmData/crmContactsData.json';
const {
  addEntityStatus,
  attrIsEmpty,
  attrTitle,
  attrTrue,
  attrValue,
  contHoverAssociateVal,
  contHoverCompanyVal,
  contHoverDepartmentVal,
  contHoverEmailVal,
  contHoverEntityTypeVal,
  contHoverLinkedInVal,
  contHoverNameVal,
  contHoverPhoneVal,
  contHoverTitleVal,
  interactionsTitleAttr,
  titleVal,
} = crmContactData.staticData;
const {
  domainId,
} = crmContactData.userDefinedData;
const {
  btnAddEmailSave,
  btnAddPhNoSave,
  btnCntEmailEdit,
  btnCntPhNoEdit,
  btnContactEdit,
  btnContactKabob,
  btnContactsPlus,
  btnSaveEditAssociatedEntity,
  colExtContTabAssociate,
  colExtContTabCompany,
  colExtContTabDepartment,
  colExtContTabEmail,
  colExtContTabEntityType,
  colExtContTabLinkedIn,
  colExtContTabPhone,
  colExtContTabTabName,
  colExtContTabTitle,
  colNewContTabCompany,
  colNewContTabDepartment,
  colNewContTabEmail,
  colNewContTabEntityType,
  colNewContTabLinkedIn,
  colNewContTabName,
  colNewContTabPhone,
  colNewContTabTitle,
  dialogPopup,
  drpdwnAddCntEmailLabel,
  drpdwnAddCntPhLabel,
  drpdwnCntEmailLabel,
  drpdwnCntPhLabel,
  drpdwnContactFunctions,
  tabContactEmail,
  tabContactPhone,
  txtAddEmail,
  txtAddEmailDetails,
  txtAddEntityFunction,
  txtAddEntityMail,
  txtAddEntityPhNo,
  txtAddEntityStatus,
  txtAddPhDetails,
  txtAddPhExt,
  txtAddPhNo,
  txtContactName,
  txtContactsEmail,
  txtContactsPhone,
  txtContactTitle,
  txtEmailNotes,
  txtPhNotes,
  txtPhoneExt,
} = contactPage;
const {
  attrVal,
  colorCodeVal,
  editFirmographicsNullValue,
  editFirmographicsValidateValue,
  firmographicsMaxlengthValue,
  keyPrincipalMaxlengthValue,
  validateFirmographicsNegValue,
} = crmFirmographicsData.expectedData;

const {
  colorAttr,
  downArrowKey,
  editFirmographicsValueAttr,
  enterKey,
  firmographicsMaxLengthAttr,
} = crmFirmographicsData.staticData;

const {
  decimalVal,
  editFirmographicsInvalidData,
  enterGrossProfitValue,
  firmographicsAssetsValue,
  firmographicsIncorporatedNegativeValue,
  firmographicsIncorporatedValue,
  firmographicsIncorporatedZeroValue,
  firmographicsKeyPrincipleValue,
  firmographicsNegValue,
  firmographicsYearFoundedNegativeValue,
  firmographicsYearFoundedZeroValue,
} = crmFirmographicsData.userDefinedData;

const {
  btnFirmographicsEdit,
  btnFirmographicsSave,
  drpdwnContactDepartment,
  msgUpdateHighlightToast,
  txtFieldAssets,
  txtFieldContactName,
  txtFieldFirmographicsIncorporated,
  txtFieldFirmographicsKeyPrincipal,
  txtFieldFirmographicsYearFounded,
  txtFieldGrossProfitField,
  txtFieldKeyPrincipleField,
} = crmFirmographicsPage;

const verifyGrossProfitField = () => {
  verifyToExist({ element: txtFieldGrossProfitField });
  verifyAttrText({ locator: txtFieldGrossProfitField, attribute: firmographicsMaxLengthAttr, verifyText: firmographicsMaxlengthValue });
  clearTypeText({ element: txtFieldGrossProfitField, typeText: enterGrossProfitValue });
  clickTabBtn({ locator: txtFieldGrossProfitField });
  clickable({ locator: btnFirmographicsSave });
  verifyPartialValue({ locator: txtFieldGrossProfitField, value: attrVal });
  clickable({ locator: btnFirmographicsSave });
  clearText({ locator: txtFieldGrossProfitField });
  clearTypeText({ element: txtFieldGrossProfitField, typeText: firmographicsNegValue });
  clickTabBtn({ locator: txtFieldGrossProfitField });
  validateText({ locator: txtFieldGrossProfitField, verifyText: validateFirmographicsNegValue });
  verifyTextOrBackGroundColor({ locator: txtFieldGrossProfitField, color: colorAttr, colorCode: colorCodeVal });
  clearTypeText({ element: txtFieldGrossProfitField, typeText: decimalVal });
  clickTabBtn({ locator: txtFieldGrossProfitField });
  verifyNotContainValue({ element: txtFieldGrossProfitField, Value: decimalVal });
  clearTypeText({ element: txtFieldGrossProfitField, typeText: enterGrossProfitValue });
};
const verifyAssetField = () => {
  verifyToExist({ element: txtFieldAssets });
  clearTypeText({ element: txtFieldAssets, typeText: firmographicsAssetsValue });
  clickPreviousElement({ locator: txtFieldGrossProfitField });
  verifyPartialValue({ locator: txtFieldAssets, value: attrVal });
  clearText({ locator: txtFieldAssets });
  verifyAttrText({ locator: txtFieldAssets, attribute: firmographicsMaxLengthAttr, verifyText: firmographicsMaxlengthValue });
  typeAndWait({ locator: txtFieldAssets, dataText: firmographicsNegValue });
  clickPreviousElement({ locator: txtFieldGrossProfitField });
  verifyNotContainValue({ element: txtFieldAssets, Value: firmographicsNegValue });
};

const verifyKeyPrincipalField = () => {
  verifyElementDoesNotHaveValue({ locator: txtFieldKeyPrincipleField });
  verifyToExist({ element: txtFieldKeyPrincipleField });
  verifyAttrText({ locator: txtFieldKeyPrincipleField, attribute: firmographicsMaxLengthAttr, verifyText: keyPrincipalMaxlengthValue });
  clearTypeText({ element: txtFieldKeyPrincipleField, typeText: firmographicsKeyPrincipleValue });
  clickActionWait({ locator: btnFirmographicsSave });
  verifyVisible({ element: msgUpdateHighlightToast });
};

const verifyIncorporatedField = () => {
  verifyAttrText({ locator: txtFieldFirmographicsIncorporated, attribute: editFirmographicsValueAttr, verifyText: firmographicsIncorporatedValue });
  clearText({ locator: txtFieldFirmographicsIncorporated });
  typeText({ locator: txtFieldFirmographicsIncorporated, dataText: firmographicsIncorporatedZeroValue });
  verifyAttrText({ locator: txtFieldFirmographicsIncorporated, attribute: editFirmographicsValueAttr, verifyText: editFirmographicsNullValue });
  typeText({ locator: txtFieldFirmographicsIncorporated, dataText: firmographicsIncorporatedNegativeValue });
  verifyAttrText({ locator: txtFieldFirmographicsIncorporated, attribute: editFirmographicsValueAttr, verifyText: editFirmographicsNullValue });
  typeText({ locator: txtFieldFirmographicsIncorporated, dataText: editFirmographicsInvalidData });
  verifyAttrText({ locator: txtFieldFirmographicsIncorporated, attribute: editFirmographicsValueAttr, verifyText: editFirmographicsValidateValue });
};

const verifyYearFoundedField = () => {
  clearText({ locator: txtFieldFirmographicsYearFounded });
  typeText({ locator: txtFieldFirmographicsYearFounded, dataText: firmographicsYearFoundedZeroValue });
  verifyAttrText({ locator: txtFieldFirmographicsYearFounded, attribute: editFirmographicsValueAttr, verifyText: editFirmographicsNullValue });
  typeText({ locator: txtFieldFirmographicsYearFounded, dataText: firmographicsYearFoundedNegativeValue });
  verifyAttrText({ locator: txtFieldFirmographicsYearFounded, attribute: editFirmographicsValueAttr, verifyText: editFirmographicsNullValue });
  typeText({ locator: txtFieldFirmographicsYearFounded, dataText: editFirmographicsInvalidData });
  verifyAttrText({ locator: txtFieldFirmographicsYearFounded, attribute: editFirmographicsValueAttr, verifyText: editFirmographicsValidateValue });
};

const verifyColHoverOvrInExistContTab = () => {
  verifyAttrText({ locator: colExtContTabAssociate, attribute: interactionsTitleAttr, verifyText: contHoverAssociateVal });
  verifyAttrText({ locator: colExtContTabTabName, attribute: interactionsTitleAttr, verifyText: contHoverNameVal });
  verifyAttrText({ locator: colExtContTabCompany, attribute: interactionsTitleAttr, verifyText: contHoverCompanyVal });
  verifyAttrText({ locator: colExtContTabEntityType, attribute: interactionsTitleAttr, verifyText: contHoverEntityTypeVal });
  verifyAttrText({ locator: colExtContTabDepartment, attribute: interactionsTitleAttr, verifyText: contHoverDepartmentVal });
  verifyAttrText({ locator: colExtContTabTitle, attribute: interactionsTitleAttr, verifyText: contHoverTitleVal });
  verifyAttrText({ locator: colExtContTabPhone, attribute: interactionsTitleAttr, verifyText: contHoverPhoneVal });
  verifyAttrText({ locator: colExtContTabEmail, attribute: interactionsTitleAttr, verifyText: contHoverEmailVal });
  verifyAttrText({ locator: colExtContTabLinkedIn, attribute: interactionsTitleAttr, verifyText: contHoverLinkedInVal });
};

const verifyColHoverOvrInNewContTab = () => {
  verifyAttrText({ locator: colNewContTabName, attribute: interactionsTitleAttr, verifyText: contHoverNameVal });
  verifyAttrText({ locator: colNewContTabCompany, attribute: interactionsTitleAttr, verifyText: contHoverCompanyVal });
  verifyAttrText({ locator: colNewContTabEntityType, attribute: interactionsTitleAttr, verifyText: contHoverEntityTypeVal });
  verifyAttrText({ locator: colNewContTabDepartment, attribute: interactionsTitleAttr, verifyText: contHoverDepartmentVal });
  verifyAttrText({ locator: colNewContTabTitle, attribute: interactionsTitleAttr, verifyText: contHoverTitleVal });
  verifyAttrText({ locator: colNewContTabPhone, attribute: interactionsTitleAttr, verifyText: contHoverPhoneVal });
  verifyAttrText({ locator: colNewContTabEmail, attribute: interactionsTitleAttr, verifyText: contHoverEmailVal });
  verifyAttrText({ locator: colNewContTabLinkedIn, attribute: interactionsTitleAttr, verifyText: contHoverLinkedInVal });
};

const verifyPhone = ({ textType: value }) => {
  const result = '+1 (' + value.substring(0, 3) + ')' + ' ' + value.substring(3, 6) + '-' + value.substring(6, 10);
  return result;
};

const verifyMailId = ({ textType: mailId }) => {
  const contactMailId = mailId + generateRandomNumber() + domainId;
  return contactMailId;
};

const verifyKeyPrincipalURLField = ({ textField: randomContactName }) => {
  verifyElementDoesNotHaveValue({ locator: txtFieldKeyPrincipleField });
  verifyToExist({ element: txtFieldKeyPrincipleField });
  verifyAttrText({ locator: txtFieldKeyPrincipleField, attribute: firmographicsMaxLengthAttr, verifyText: keyPrincipalMaxlengthValue });
  dropDownContainsTextClick({ element: txtFieldKeyPrincipleField, typeText: firmographicsKeyPrincipleValue, exactText: firmographicsKeyPrincipleValue });
  clickActionWait({ locator: btnFirmographicsSave });
  verifyText({ locator: txtFieldFirmographicsKeyPrincipal, verifyText: firmographicsKeyPrincipleValue });
  clickAction({ locator: btnFirmographicsEdit });
  clearText({ locator: txtFieldKeyPrincipleField });
  typeAndWait({ locator: txtFieldKeyPrincipleField, dataText: randomContactName });
  typeKeyboardKey({ element: txtFieldKeyPrincipleField, keyToType: downArrowKey });
  typeKeyboardKey({ element: txtFieldKeyPrincipleField, keyToType: enterKey });
  validateText({ locator: txtFieldKeyPrincipleField, verifyText: randomContactName });
  clickActionWait({ locator: btnFirmographicsSave });
  verifyVisible({ element: msgUpdateHighlightToast });
};

const addContactEmail = ({ cntEmail: newContactTabEmailVal, contactEmailLabelVal: contactEmailLabelName }) => {
  verifyExists({ element: tabContactEmail });
  clickAction({ locator: tabContactEmail });
  clickAction({ locator: btnCntEmailEdit });
  typeText({ locator: txtAddEmail, dataText: newContactTabEmailVal });
  dropDownContainsTextClick({ element: drpdwnAddCntEmailLabel, typeText: contactEmailLabelName, exactText: contactEmailLabelName });
  typeText({ locator: txtAddEmailDetails, dataText: titleVal });
  clickAction({ locator: btnAddEmailSave });
};

const addContactPhNo = ({ phoneNo: randomPhNo, extVal: extPhn, contactPhLabelVal: contactPhLabel }) => {
  verifyExists({ element: btnContactKabob });
  clickAction({ locator: btnContactKabob });
  navigateToChildWindow();
  verifyExists({ element: btnContactEdit });
  clickVisibleElement({ locator: btnContactEdit });
  verifyExists({ element: tabContactPhone });
  clickAction({ locator: tabContactPhone });
  clickAction({ locator: btnCntPhNoEdit });
  typeText({ locator: txtAddPhNo, dataText: randomPhNo });
  typeText({ locator: txtAddPhExt, dataText: extPhn });
  dropDownContainsTextClick({ element: drpdwnAddCntPhLabel, typeText: contactPhLabel, exactText: contactPhLabel });
  typeText({ locator: txtAddPhDetails, dataText: titleVal });
  clickAction({ locator: btnAddPhNoSave });
};

const verifyAssCntWindowAllFields = ({ locator: element, randomName: randomContactName, entityName: entityNameVal, cntFunction: contactFunctionName, cntPhNo: addEntityPhNo, cntEmail: addEntityEmail }) => {
  verifyAttrText({ locator: txtContactName, attribute: attrTitle, verifyText: randomContactName });
  verifyAttrText({ locator: element, attribute: attrValue, verifyText: entityNameVal });
  verifyAttrText({ locator: txtAddEntityFunction, attribute: attrTitle, verifyText: contactFunctionName });
  verifyAttrText({ locator: txtAddEntityPhNo, attribute: attrTitle, verifyText: addEntityPhNo });
  verifyAttrText({ locator: txtAddEntityMail, attribute: attrTitle, verifyText: addEntityEmail });
  verifyAttrText({ locator: txtAddEntityStatus, attribute: attrTitle, verifyText: addEntityStatus });
  verifyVisible({ element: btnSaveEditAssociatedEntity });
  verifyClosePopup();
};

const verifyAssCntWindowEmptyFields = ({ entityName: entityNameVal, randomName: randomContactName, locator: element }) => {
  verifyAttrText({ locator: txtContactName, attribute: attrTitle, verifyText: randomContactName });
  verifyAttrText({ locator: element, attribute: attrValue, verifyText: entityNameVal });
  verifyAttrText({ locator: txtAddEntityPhNo, attribute: attrIsEmpty, verifyText: attrTrue });
  verifyAttrText({ locator: txtAddEntityMail, attribute: attrIsEmpty, verifyText: attrTrue });
  verifyAttrText({ locator: txtAddEntityStatus, attribute: attrTitle, verifyText: addEntityStatus });
  verifyVisible({ element: btnSaveEditAssociatedEntity });
  verifyToExist({ element: dialogPopup });
};

const associateContactWithAllFields = ({ contactName: contactDepName, randomName: randomContactName, phoneNo: randomPhNo, emailId: newContactTabEmailVal, cntFunction: typeVal, contactPhLabelVal: contactPhLabel, contactEmailLabelVal: contactEmailLabelName, extVal: extPhn }) => {
  verifyToExist({ element: btnContactsPlus });
  clickAction({ locator: btnContactsPlus });
  dropDownContainsTextClick({ element: txtFieldContactName, typeText: randomContactName, exactText: randomContactName });
  dropDownContainsTextClick({ element: drpdwnContactDepartment, typeText: contactDepName, exactText: contactDepName });
  dropDownContainsTextClick({ element: drpdwnContactFunctions, typeText: typeVal, exactText: typeVal });
  typeText({ locator: txtContactsPhone, dataText: randomPhNo });
  typeText({ locator: txtPhoneExt, dataText: extPhn });
  dropDownContainsTextClick({ element: drpdwnCntPhLabel, typeText: contactPhLabel, exactText: contactPhLabel });
  typeText({ locator: txtContactsEmail, dataText: newContactTabEmailVal });
  dropDownContainsTextClick({ element: drpdwnCntEmailLabel, typeText: contactEmailLabelName, exactText: contactEmailLabelName });
  typeText({ locator: txtContactTitle, dataText: titleVal });
  typeText({ locator: txtPhNotes, dataText: titleVal });
  typeText({ locator: txtEmailNotes, dataText: titleVal });
};

const verifyAddAssPhNo = ({ contactPhLabelVal: contactPhLabel, contPhNoVal: newContactTabPhoneVal, extVal: extPhn }) => {
  const result = contactPhLabel + ' | ' + newContactTabPhoneVal + ' | ' + extPhn + ' | ' + titleVal;
  return result;
};

const verifyAddAssEmailVal = ({ contactEmailLabelVal: contactEmailLabelName, emailId: newContactTabEmailVal }) => {
  const result = contactEmailLabelName + ' | ' + newContactTabEmailVal + ' | ' + titleVal;
  return result;
};

export {
  addContactEmail,
  addContactPhNo,
  associateContactWithAllFields,
  verifyAddAssEmailVal,
  verifyAddAssPhNo,
  verifyAssCntWindowAllFields,
  verifyAssCntWindowEmptyFields,
  verifyAssetField,
  verifyColHoverOvrInExistContTab,
  verifyColHoverOvrInNewContTab,
  verifyGrossProfitField,
  verifyIncorporatedField,
  verifyKeyPrincipalField,
  verifyKeyPrincipalURLField,
  verifyMailId,
  verifyPhone,
  verifyYearFoundedField,
};