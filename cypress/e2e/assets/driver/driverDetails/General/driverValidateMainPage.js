/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating driver general page mandatory fields
 Test Cases List
 Authored By : Shashi Jaiswal
 Date : 05-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included
 ME-57459  : Verify Mandatory fields in Add New Driver main page are highlighted along with the information tags
 ME-152374 : Verify Mandatory fields in driver general page - address popup
 ME-152440 : Verify Mandatory fields validation in Add New Fleet Relationship
 ME-151319 : Verify information messages when hover over on mandatory fields in the Add New Identifier pop up UI page in driver general tab
 ME-151322 : Verify information messages when hover over on mandatory fields in the Add New Planned Time Off pop up UI page in driver general tab
 ME-151317 : Verify Mandatory fields suggestion Error messages when hover over on edit button in Add New Equipment pop up UI page in driver general tab
 ME-151315 : Verify whether the Mandatory fields in the driver general tab Add New Contact, Add pop up UI are highlighted along with the information tags
 ME-151320 : Verify information messages when hover over on mandatory fields in Add New Awards pop up in driver general tab
 ME-151321 : Verify Mandatory fields suggestion Error messages when hover over on Add button in the Certification/Permit pop up UI page in driver general tab
 ME-152789 : Verify Mandatory fields in Add New Reps in driver main page are highlighted along with the information tags
 ME-152798 : Verify Mandatory fields in Add New Driver Schedule main page are highlighted along with the information tags
 ME-152804 : Verify Mandatory fields in Add New Driver Attributes in driver main page are highlighted along with the information tags
 ME-41609  : Verify the newly added fields in Driver Profile Summary
 ME-155770 : Verify the 7 floating icons in Driver Profile Summary
 ME-157264 : Verify on Hover over the save button in Address card popup , Mandatory fields suggestion error messages should be displayed
 ME-157267 : Verify on Hover over the save button in Driver Schedule card popup , Mandatory fields suggestion error messages should be displayed
 ME-157269 : Verify on Hover over the save button in Fleet Relationships card popup , Mandatory fields suggestion error messages should be displayed
 ME-157272 : Verify on Hover over the save button in Identifier card popup , Mandatory fields suggestion error messages should be displayed
 ME-157274 : Verify on Hover over the save button in Equipment card popup , Mandatory fields suggestion error messages should be displayed
 ME-157275 : Verify on Hover over the save button in Certifications & Permit card popup , Mandatory fields suggestion error messages should be displayed
 ME-157277 : Verify on Hover over the save button in Awards card popup , Mandatory fields suggestion error messages should be displayed
 ME-157279 : Verify on Hover over the save button in Contacts card popup , Mandatory fields suggestion error messages should be displayed
 ME-157284 : Verify on Hover over the save button in Planned Time Off card popup , Mandatory fields suggestion error messages should be displayed
 ME-157852 : Verify on Hover over the save button in Driver Attributes card popup , Mandatory fields suggestion error messages should be displayed
 ME-157291 : Verify on Hover over the save button in Reps card popup , Mandatory fields suggestion error messages should be displayed
 ME-159009 : Verify fields of Driver Add New Equipment Card while adding a driver
 ME-159064 : Verify fields of Driver Add New Equipment Card while editing a driver
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addIdentifier, navigateToDriverAddNewPage, clickEditInIdentifier, driverSaveAction, enterDriverMandatoryFields, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickActionWait, verifyVisible, viewFullPage, verifyAttrValueContains, typeText, verifyElementText, verifyIfDisabled, clickAction, getTDMData, verifyDoesNotExist, triggerMouseHover, verifyTableRowElementText, verifyRowContainsText, scrollIntoView, verifyTextContains } from '../../../../../utilities/commonUtils/genericUtils';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import generalPage from '../../../../../pageObjects/assets/driver/driverDetails/general/generalPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import { todayDatePlusTwo } from '../../../../../utilities/commonUtils/dateTimeUtils';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';

const {
  txtFieldDriverFirstName,
  txtFieldDriverLastName,
  txtFieldAddDriverCode,
  infoTagCode,
  infoTagLastName,
  infoTagFirstName,
} = homePage;
const {
  fleetAddBtn,
  fleetPopup,
} = generalPage;
const {
  txtFieldAddresCityState,
  btnAddressAddNew,
  btnDialogSubmit,
  txtFieldAddresStree1,
  btnCloseIcon,
  identifier,
  timeOff,
  drpdwnIdentifierType,
  equipmentDetails,
  contacts,
  btnAwardsPlusIcon,
  awards,
  btnCertificateAddNew,
  txtFieldCertificationOrPermitId,
  txtFieldExpirationDate,
  certification,
  tabAwards,
  reps,
  schedule,
  attributes,
  errorIconMsg,
  divSubmit,
  divSubmitInfoMsg,
  divTooltTip,
  identifierID,
  carrotMenuExpand,
  btnExpandIdentifier,
} = driverAddNewPage;
const {
  spanAddrType,
  spanCountry,
  spanPostalCode,
  infoTagStreet1,
} = driverAddNewPage.address;
const {
  validationError,
  validationRequired,
  cssClass,
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddDriverReq,
  dataPopUpType,
  errorText,
} = addDriverData.staticData;
const {
  defaultIdentifierType,
} = generalData.staticData;
const {
  floatingIconClass,
} = addDriverData.expectedData;
const {
  infoMessages,
} = addDriverData;
const {
  tabDriverGeneral,
  snapShot,
  profile,
} = driverCommonPage;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const { equipmentFields } = commonData.commonFields;
const openDriverGenPage = () => {
  //open driver via search driver and navigating to driver edit page
  searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
  //Navigating to general tab
  clickActionWait({ locator: tabDriverGeneral });
  verifyVisible({ element: snapShot });
};
const verifyEquipmentFields = () => {
  const fieldsMap = new Map([
    [0, equipmentFields.type],
    [1, equipmentFields.description],
    [2, equipmentFields.count],
    [3, equipmentFields.assetId],
    [4, equipmentFields.issued],
    [6, equipmentFields.recovered],
    [8, equipmentFields.condition],
  ]);
  fieldsMap.forEach((value, key) => {
    verifyRowContainsText({ locator: equipmentDetails.modalEquipment, index: key, verifyText: value });
  });
};
let driverDataTDM;

describe('Validating driver general page mandatory fields', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });

  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });

  it('ME-57459 Verify Mandatory fields in Add New Driver main page are highlighted along with the information tags',
    () => {
      navigateToDriverAddNewPage();
      verifyAttrValueContains({ locator: txtFieldDriverFirstName, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: infoTagFirstName });
      verifyAttrValueContains({ locator: txtFieldDriverLastName, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: infoTagLastName });
      verifyAttrValueContains({ locator: txtFieldAddDriverCode, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: infoTagCode });
    });

  it('ME-152374 Verify Mandatory fields in driver general page - address popup',
    () => {
      navigateToDriverAddNewPage();
      clickActionWait({ locator: btnAddressAddNew });
      verifyElementText({ locator: spanAddrType, verifyText: '*' });
      verifyElementText({ locator: spanCountry, verifyText: '*' });
      verifyElementText({ locator: spanPostalCode, verifyText: '*' });
      verifyAttrValueContains({ locator: txtFieldAddresStree1, attribute: validationRequired, verifyText: validationRequired });
      verifyAttrValueContains({ locator: txtFieldAddresCityState, attribute: validationRequired, verifyText: validationRequired });
      typeText({ locator: txtFieldAddresStree1, dataText: '1' });
      verifyVisible({ element: infoTagStreet1 });
      typeText({ locator: txtFieldAddresCityState, dataText: '1' });
      verifyAttrValueContains({ locator: txtFieldAddresCityState, attribute: cssClass, verifyText: validationError });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-152440 Verify Mandatory fields validation in Add New Fleet Relationship',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });
      verifyVisible({ element: snapShot });
      clickAction({ locator: fleetAddBtn });
      clickAction({ locator: fleetPopup.effectiveDateTxtBx });
      verifyElementText({ locator: fleetPopup.spanTypeTerm, verifyText: '*' });
      verifyElementText({ locator: fleetPopup.spanCarrier, verifyText: '*' });
      verifyAttrValueContains({ locator: fleetPopup.effectiveDateTxtBx, attribute: validationRequired, verifyText: validationRequired });
      verifyVisible({ element: fleetPopup.infoTagEffDate });
      verifyVisible({ element: fleetPopup.infoTagCarrier });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-151319 Verify information messages when hover over on mandatory fields in the Add New Identifier pop up UI page in driver general tab',
    () => {
      navigateToDriverAddNewPage();
      clickActionWait({ locator: identifier.btnAddNewIdentifier });
      verifyAttrValueContains({ locator: identifier.drpDwnType, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: identifier.infoTagTypeTerm });
      verifyAttrValueContains({ locator: identifier.txtFieldId, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: identifier.infoTagId });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-151322 Verify information messages when hover over on mandatory fields in the Add New Planned Time Off pop up UI page in driver general tab',
    () => {
      navigateToDriverAddNewPage();
      clickActionWait({ locator: timeOff.btnPlannedTimeOffPlus });
      verifyAttrValueContains({ locator: drpdwnIdentifierType, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: timeOff.infoTagTypeTerm });
      verifyAttrValueContains({ locator: timeOff.divStartDate, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: timeOff.infoTagStDate });
      verifyAttrValueContains({ locator: timeOff.divEndDate, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: timeOff.infoTagEndDate });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-151317 Verify Mandatory fields suggestion Error messages when hover over on edit button in Add New Equipment pop up UI page in driver general tab',
    () => {
      navigateToDriverAddNewPage();
      clickActionWait({ locator: equipmentDetails.addEquipmentBtn });
      verifyAttrValueContains({ locator: equipmentDetails.drpDwnTypeTerm, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: equipmentDetails.infoTagTypeTerm });
      verifyAttrValueContains({ locator: equipmentDetails.description, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: equipmentDetails.infoTagDesc });
      verifyAttrValueContains({ locator: equipmentDetails.typeCount, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: equipmentDetails.infoTagCount });
      verifyAttrValueContains({ locator: equipmentDetails.assetId, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: equipmentDetails.infoTagAsset });
      verifyAttrValueContains({ locator: equipmentDetails.issueDate, attribute: validationRequired, verifyText: validationRequired });
      verifyVisible({ element: equipmentDetails.infoTagIssueDt });
      verifyAttrValueContains({ locator: equipmentDetails.drpDwnConditionTerm, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: equipmentDetails.infoTagCondn });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-151315 Verify whether the Mandatory fields in the driver general tab Add New Contact, Add pop up UI are highlighted along with the information tags',
    () => {
      openDriverGenPage();
      clickActionWait({ locator: contacts.btnContactsAdd });
      verifyAttrValueContains({ locator: contacts.txtFieldName, attribute: validationRequired, verifyText: validationRequired });
      verifyVisible({ element: contacts.toolTipPhoneNumber });
      verifyVisible({ element: contacts.toolTipFaxNumber });
      verifyAttrValueContains({ locator: contacts.txtFieldEmail, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: contacts.toolTipEmailAddres });
      verifyAttrValueContains({ locator: contacts.txtFieldChatUserName, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: contacts.toolTipIMUsername });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-151320 Verify information messages when hover over on mandatory fields in Add New Awards pop up in driver general tab',
    () => {
      openDriverGenPage();
      clickAction({ locator: tabAwards });
      clickActionWait({ locator: btnAwardsPlusIcon });
      verifyAttrValueContains({ locator: awards.drpDwnAwardType, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: awards.infoTagTypeTerm });
      verifyAttrValueContains({ locator: awards.txtFieldAwardDesc, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: awards.infoTagDesc });
      verifyAttrValueContains({ locator: awards.txtFieldAwardDate, attribute: validationRequired, verifyText: validationRequired });
      verifyVisible({ element: awards.infoTagAwardDt });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-151321 Verify Mandatory fields suggestion Error messages when hover over on Add button in the Certification/Permit pop up UI page in driver general tab',
    () => {
      openDriverGenPage();
      clickActionWait({ locator: btnCertificateAddNew });
      verifyAttrValueContains({ locator: drpdwnIdentifierType, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: awards.infoTagTypeTerm });
      verifyAttrValueContains({ locator: txtFieldCertificationOrPermitId, attribute: cssClass, verifyText: validationError });
      verifyVisible({ element: certification.infoTagId });
      verifyAttrValueContains({ locator: txtFieldExpirationDate, attribute: validationRequired, verifyText: validationRequired });
      verifyVisible({ element: certification.infoTagExpDt });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-152789 Verify Mandatory fields in Add New Reps in driver main page are highlighted along with the information tags',
    () => {
      openDriverGenPage();
      clickActionWait({ locator: reps.btnAddNewRep });
      verifyElementText({ locator: reps.spanEmployee, verifyText: '*' });
      verifyElementText({ locator: reps.spanTypeTerm, verifyText: '*' });
      verifyAttrValueContains({ locator: reps.txtFieldEffDate, attribute: validationRequired, verifyText: validationRequired });
      verifyVisible({ element: reps.infoTagEffDate });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-152798 Verify Mandatory fields in Add New Driver Schedule main page are highlighted along with the information tags',
    () => {
      navigateToDriverAddNewPage();
      clickActionWait({ locator: schedule.btnAddNewSch });
      verifyAttrValueContains({ locator: schedule.divEffDate, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: schedule.infoTagEffDate });
      typeText({ locator: schedule.txtFieldEffDate, dataText: todayDatePlusTwo() });
      //verify checkbox validation's
      clickAction({ locator: schedule.checkBoxMon });
      verifyVisible({ element: schedule.infoTagMon });
      verifyDoesNotExist({ locator: schedule.infoTagTue });
      clickAction({ locator: schedule.checkBoxWed });
      verifyVisible({ element: schedule.infoTagWed });
      clickAction({ locator: schedule.checkBoxThu });
      verifyVisible({ element: schedule.infoTagThu });
      scrollIntoView({ locator: btnDialogSubmit });
      clickAction({ locator: schedule.checkBoxFri });
      verifyVisible({ element: schedule.infoTagFri });
      clickAction({ locator: schedule.checkBoxSat });
      verifyVisible({ element: schedule.infoTagSat });
      clickAction({ locator: schedule.checkBoxSun });
      verifyVisible({ element: schedule.infoTagSun });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-152804 Verify Mandatory fields in Add New Driver Attributes in driver main page are highlighted along with the information tags',
    () => {
      navigateToDriverAddNewPage();
      clickActionWait({ locator: attributes.attrTab });
      clickActionWait({ locator: attributes.btnAddNewAttr });
      verifyAttrValueContains({ locator: attributes.drpDwnType, attribute: validationRequired, verifyText: validationRequired });
      verifyAttrValueContains({ locator: attributes.txtFieldValue, attribute: validationRequired, verifyText: validationRequired });
      verifyAttrValueContains({ locator: attributes.txtFieldEffDt, attribute: validationRequired, verifyText: validationRequired });
      verifyIfDisabled({ locator: btnDialogSubmit });
      clickAction({ locator: btnCloseIcon });
    });

  it('[ME-41609, ME-155770] Verify the newly added fields in Driver Profile Summary',
    () => {
    //open driver via search driver and navigating to driver edit page
      openDriverGenPage();
      //Verify newly added fields
      verifyVisible({ element: profile.lblClass });
      //Verify icons
      verifyVisible({ element: profile.iconMoon });
      verifyVisible({ element: profile.iconUsrGrp });
      verifyVisible({ element: profile.iconPig });
      verifyVisible({ element: profile.iconBotl });
      verifyVisible({ element: profile.iconPaw });
      verifyVisible({ element: profile.iconFlip });
      verifyVisible({ element: profile.lblLive });
      //Verify css icon placement
      verifyAttrValueContains({ locator: profile.iconMoon, attribute: cssClass, verifyText: floatingIconClass });
      verifyAttrValueContains({ locator: profile.iconUsrGrp, attribute: cssClass, verifyText: floatingIconClass });
      verifyAttrValueContains({ locator: profile.iconPig, attribute: cssClass, verifyText: floatingIconClass });
      verifyAttrValueContains({ locator: profile.iconBotl, attribute: cssClass, verifyText: floatingIconClass });
      verifyAttrValueContains({ locator: profile.iconPaw, attribute: cssClass, verifyText: floatingIconClass });
      verifyAttrValueContains({ locator: profile.iconFlip, attribute: cssClass, verifyText: floatingIconClass });
    });

  it('[ME-157264, ME-157267, ME-157269], Verify on Hover over the save button in Address card popup, Driver Schedule, Fleet Relationships popup , Mandatory fields suggestion error messages should be displayed',
    () => {
      //open driver via search driver and navigating to driver edit page
      openDriverGenPage();
      clickAction({ locator: btnAddressAddNew });
      clickAction({ locator: txtFieldAddresStree1 });
      //Hover on save button
      triggerMouseHover({ element: divSubmit });
      verifyVisible({ element: divSubmitInfoMsg });
      clickAction({ locator: btnCloseIcon });
      //Driver schedule
      clickAction({ locator: schedule.btnAddNewSch });
      triggerMouseHover({ element: divSubmit });
      verifyVisible({ element: divSubmitInfoMsg });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: infoMessages.requiredEffDate });
      clickAction({ locator: btnCloseIcon });
      //Fleet Relationships
      clickAction({ locator: fleetAddBtn });
      triggerMouseHover({ element: divSubmit });
      verifyVisible({ element: divSubmitInfoMsg });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: infoMessages.requiredEffDate });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: infoMessages.requiredFleetName });
      clickAction({ locator: btnCloseIcon });
    });

  it('[ME-157272, ME-157274, ME-157275], Verify on Hover over the save button in Identifier card popup, Equipment, Certifications & Permit popup , Mandatory fields suggestion error messages should be displayed',
    () => {
      //open driver via search driver and navigating to driver edit page
      openDriverGenPage();
      clickAction({ locator: identifier.btnAddNewIdentifier });
      //Hover on save button
      triggerMouseHover({ element: divSubmit });
      verifyVisible({ element: divSubmitInfoMsg });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: infoMessages.requiredType });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: infoMessages.requiredId });
      clickAction({ locator: btnCloseIcon });
      //Equipment popup
      clickAction({ locator: equipmentDetails.addEquipmentBtn });
      triggerMouseHover({ element: divSubmit });
      verifyVisible({ element: divSubmitInfoMsg });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: infoMessages.requiredType });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: infoMessages.requiredDesc });
      verifyTableRowElementText({ locator: errorIconMsg, index: 2, verifyText: infoMessages.requiredCount });
      verifyTableRowElementText({ locator: errorIconMsg, index: 3, verifyText: infoMessages.requiredAssetId });
      verifyTableRowElementText({ locator: errorIconMsg, index: 4, verifyText: infoMessages.requiredIssuDt });
      verifyTableRowElementText({ locator: errorIconMsg, index: 5, verifyText: infoMessages.requiredIssuDt });
      verifyTableRowElementText({ locator: errorIconMsg, index: 6, verifyText: infoMessages.requiredCond });
      clickAction({ locator: btnCloseIcon });
      //Certifications & Permits popup
      clickAction({ locator: btnCertificateAddNew });
      triggerMouseHover({ element: divSubmit });
      verifyVisible({ element: divSubmitInfoMsg });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: infoMessages.requiredType });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: infoMessages.requiredId });
      verifyTableRowElementText({ locator: errorIconMsg, index: 2, verifyText: infoMessages.requiredExpDate });
      clickAction({ locator: btnCloseIcon });
    });

  it('[ME-157277, ME-157279, ME-157284], Verify on Hover over the save button in Award card popup, Contacts, Planned Time Off popup , Mandatory fields suggestion error messages should be displayed',
    () => {
      //open driver via search driver and navigating to driver edit page
      openDriverGenPage();
      clickAction({ locator: tabAwards });
      clickActionWait({ locator: btnAwardsPlusIcon });
      //Hover on save button
      triggerMouseHover({ element: divSubmit });
      verifyVisible({ element: divSubmitInfoMsg });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: infoMessages.requiredType });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: infoMessages.requiredDesc });
      verifyTableRowElementText({ locator: errorIconMsg, index: 2, verifyText: infoMessages.requiredAwardDt });
      clickAction({ locator: btnCloseIcon });
      //Contacts popup
      clickAction({ locator: contacts.btnContactsAdd });
      triggerMouseHover({ element: divSubmit });
      verifyVisible({ element: divSubmitInfoMsg });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: infoMessages.requiredContactMet });
      clickAction({ locator: btnCloseIcon });
      //Planned Time Off popup
      clickActionWait({ locator: timeOff.btnPlannedTimeOffPlus });
      triggerMouseHover({ element: divSubmit });
      verifyVisible({ element: divSubmitInfoMsg });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: infoMessages.requiredType });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: infoMessages.requiredStartDt });
      verifyTableRowElementText({ locator: errorIconMsg, index: 2, verifyText: infoMessages.requiredStartDt });
      verifyTableRowElementText({ locator: errorIconMsg, index: 3, verifyText: infoMessages.requiredEndDt });
      clickAction({ locator: btnCloseIcon });
    });

  it('[ME-157852, ME-157291], Verify on Hover over the save button in Driver Attributes card popup, Reps card popup, Mandatory fields suggestion error messages should be displayed',
    {
      tags: ['@assets', '@resources', '@driverGeneral', '@p2'],
    },
    () => {
      //open driver via search driver and navigating to driver edit page
      openDriverGenPage();
      clickActionWait({ locator: attributes.attrTab });
      clickActionWait({ locator: attributes.btnAddNewAttr });
      //Hover on save button
      triggerMouseHover({ element: divSubmit });
      verifyVisible({ element: divSubmitInfoMsg });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: infoMessages.requiredType });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: infoMessages.requiredValue });
      verifyTableRowElementText({ locator: errorIconMsg, index: 2, verifyText: infoMessages.requiredEffDate });
      clickAction({ locator: btnCloseIcon });
      //Reps popup
      clickActionWait({ locator: reps.btnAddNewRep });
      verifyVisible({ element: divSubmitInfoMsg });
      triggerMouseHover({ element: divSubmit });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: infoMessages.requiredEffDate });
      verifyVisible({ element: divTooltTip });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-138272 Verify Edit and View of Identifier Card in Default View',
    () => {
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields(false);
      clickActionWait({ locator: identifier.btnAddNewIdentifier });
      addIdentifier({ typeOfIdentifier: defaultIdentifierType });
      clickEditInIdentifier();
      verifyTextContains({ locator: identifierID, containsText: generalData.staticData.id2 });
      driverSaveAction();
    });
  it('ME-159364 Verify Edit and View of Identifier Card in Exapnd View',
    () => {
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields(false);
      clickAction({ locator: carrotMenuExpand });
      clickAction({ locator: btnExpandIdentifier });
      clickActionWait({ locator: identifier.btnAddNewIdentifier });
      addIdentifier({ typeOfIdentifier: defaultIdentifierType });
      clickEditInIdentifier();
      verifyTextContains({ locator: identifierID, containsText: generalData.staticData.id2 });
      driverSaveAction();
      it('[ME-159009, ME-159064]  : Verify fields of Driver Add New Equipment Card while adding and editing a driver',
        {
          tags: [
            '@assets',
            '@resources',
            '@driver',
            '@p2',
          ],
        }, () => {
          //Create driver scenario
          navigateToDriverAddNewPage();
          clickActionWait({ locator: equipmentDetails.addEquipmentBtn });
          verifyEquipmentFields();
          clickAction({ locator: btnCloseIcon });
          //Search driver scenario
          openDriverGenPage();
          clickActionWait({ locator: equipmentDetails.addEquipmentBtn });
          verifyEquipmentFields();
        });
    });
});