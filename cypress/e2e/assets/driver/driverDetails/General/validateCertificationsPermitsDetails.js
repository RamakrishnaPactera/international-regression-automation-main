/*------------------------------------------------------------------------------------------------------------------------
Validating type, ID, expiration date, snapshot logo in driver pages
 Test Cases List
 Authored By                  : PruthviRajG
 Date                         : 04-05-2023,
 Functions/Calling References : loginUtils, dateTimeUtils, resourceUtils, genericUtils
 Test case Included           : ME-30129, ME-152178, ME-152177, ME-152398,  ME-154818, ME-154816, ME-154817 Test Driver Certifications & Permits - Functional Testcase
-------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { todayDatePlusTwo } from '../../../../../utilities/commonUtils/dateTimeUtils';
import { navigateToDriverAddNewPage, enterDriverMandatoryFields } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickActionWait, viewFullPage, typeDropDwn, scrollIntoView, typeText, toastWithMsg, getMinionValues, verifyElementTextContains, verifySingleSelectDropDownFunction, clearTextType, generateRandomAlphaNumByLength, verifyExists, clickAction, getPastDate, clickVisibleElement, clickOkOnWindowAlert, waitSometime, verifyAttrText } from '../../../../../utilities/commonUtils/genericUtils';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import commonPage from '../../../../../pageObjects/commonPage/commonPage.json';
const { button, roleCheckbox } = commonPage;
const { longWait } = commonData;
const { btnDriverSave } = homePage;
const { asteriskEle, btnCertificateAddNew, txtFieldCertificationOrPermitId, txtFieldExpirationDate, drpdwnCertficateTypeTerm } = driverAddNewPage;
const { btnSave, drpDwnState, drpDwnStateOptions, drpDwnStateButton, btnCountry, btnKibana, btnDeleteOption, btnEditOption, msgDuplicateID, labelCertificationType, labelCertificationID, labelCertificationST, labelCertificationCountry, labelCertificationExpirationDate } = driverAddNewPage.certificationOrPermit;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  countryDrpDwnOption,
  labelCertificationFields,
  msgDuplicateIDvalue,
  msgUpdated,
  pastExpDateTostMsg,
} = addDriverData.expectedData;
const {
  isEmptyAttr,
  minionDrpDwnDriverCertificationType,
  titleAttr,
} = addDriverData.staticData;
const {
  typeEmptyVal,
} = addDriverData.userDefinedData;
let drpDwnDriverCertificationType;

describe('Validating type, ID, state, country, expiration date, snapshot logo in driver pages | [ME-30129], [ME-152178], [ME-152177], [ME-152398], [ME-154818], [ME-154816], [ME-154817]', () => {
  before(() => {
    getMinionValues(minionDrpDwnDriverCertificationType, 6).then(resultOptions => {
      drpDwnDriverCertificationType = resultOptions;
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('ME-30129, ME-152178, ME-152177, ME-152398, ME-154818, ME-154816, ME-154817 - Test Driver Certifications & Permits - Functional Testcase',
    () => {
      const idData = generateRandomAlphaNumByLength({ lengthOfString: 25 });
      const futureDate = todayDatePlusTwo();
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      enterDriverMandatoryFields();
      //creating certifications and permit details with mandatory fields
      clickActionWait({ locator: btnCertificateAddNew });
      //verifying the labels
      verifyElementTextContains({ locator: labelCertificationType, verifyText: labelCertificationFields[0] });
      verifyElementTextContains({ locator: labelCertificationID, verifyText: labelCertificationFields[1] });
      verifyElementTextContains({ locator: labelCertificationST, verifyText: labelCertificationFields[2] });
      verifyElementTextContains({ locator: labelCertificationCountry, verifyText: labelCertificationFields[3] });
      verifyElementTextContains({ locator: labelCertificationExpirationDate, verifyText: labelCertificationFields[4] });
      //verifying the mandatory fields
      verifyExists({ element: `${labelCertificationType}${asteriskEle}` });
      verifyExists({ element: `${labelCertificationID}${asteriskEle}` });
      verifyExists({ element: `${labelCertificationExpirationDate}${asteriskEle}` });
      drpDwnDriverCertificationType.unshift(typeEmptyVal);
      verifySingleSelectDropDownFunction({ drpDwnEle: drpdwnCertficateTypeTerm, drpDwnOptions: drpDwnDriverCertificationType });
      typeText({ locator: txtFieldExpirationDate, dataText: futureDate });
      clearTextType({ element: txtFieldCertificationOrPermitId, typeText: idData });
      //verifying the State & Country dropdown.
      verifyAttrText({ locator: btnCountry, attribute: isEmptyAttr, verifyText: true });
      clickAction({ locator: `${drpDwnState} ${drpDwnStateButton}` });
      clickAction({ locator: `${drpDwnState} ${drpDwnStateOptions} ${button}` });
      clickAction({ locator: `${drpDwnState} ${drpDwnStateOptions} ${drpDwnStateOptions} ${roleCheckbox}` });
      verifyAttrText({ locator: btnCountry, attribute: titleAttr, verifyText: countryDrpDwnOption });
      //save the certifications and permit details
      clickActionWait({ locator: btnSave });
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      //verifying successfull toaster msg
      toastWithMsg({ message: msgUpdated });

      //creating certifications and permit details with duplicate ID
      clickAction({ locator: btnCertificateAddNew });
      typeDropDwn({ locator: drpdwnCertficateTypeTerm, drpDwnVal: drpDwnDriverCertificationType[1] });
      typeText({ locator: txtFieldExpirationDate, dataText: futureDate });
      clearTextType({ element: txtFieldCertificationOrPermitId, typeText: idData });
      clickActionWait({ locator: btnSave });
      clickActionWait({ locator: btnDriverSave });
      verifyExists({ element: msgDuplicateID });
      verifyElementTextContains({ locator: msgDuplicateID, verifyText: msgDuplicateIDvalue });

      //delete the duplicate ID's details from the table.
      clickActionWait({ locator: `${btnKibana}:eq(1)` });
      clickVisibleElement({ locator: btnDeleteOption });
      clickOkOnWindowAlert();
      waitSometime(longWait);

      //creating certifications and permit details with past exp. date
      clickAction({ locator: btnCertificateAddNew });
      typeDropDwn({ locator: drpdwnCertficateTypeTerm, drpDwnVal: drpDwnDriverCertificationType[2] });
      getPastDate({ locator: txtFieldExpirationDate, Day: 1, Month: 1 });
      clearTextType({ element: txtFieldCertificationOrPermitId, typeText: generateRandomAlphaNumByLength({ lengthOfString: 25 }) });
      clickActionWait({ locator: btnSave });
      clickActionWait({ locator: btnDriverSave });
      //verifying the error toaster msg
      toastWithMsg({ message: pastExpDateTostMsg });

      //editing the certifications and permit details
      clickActionWait({ locator: `${btnKibana}:eq(1)` });
      clickVisibleElement({ locator: btnEditOption });
      typeText({ locator: txtFieldExpirationDate, dataText: futureDate });
      clickActionWait({ locator: btnSave });
      clickActionWait({ locator: btnDriverSave });
      //verifying successfull toaster msg
      toastWithMsg({ message: msgUpdated });
    });
});