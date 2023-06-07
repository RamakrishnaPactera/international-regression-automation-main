/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating newly added and updated fields under general and operations tabs in Driver
 Test Cases List
 Authored By : Dasari Santhosh
 Date : 23-03-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : ME-137835 Verify 'Mobile Number' as Mandatory and unique Driver > Resources |  Assets - Driver General Tab | Regression
                                 ME-133257 Verify driver Code field in Add Driver > Resources |  Assets - Driver General Tab | Regression
                                 ME-133319 verify Certification and Permits & Awards card Driver > Resources |  Assets - Driver General Tab | Regression
                                 ME-133247 Verify Mobile Number as Mandatory and unique Driver > Resources |  Assets - Driver General Tab | Regression
                                 ME-133323 Verify default mandatory address as Domicile Address > Driver > Resources |  Assets - Driver General Tab | Regression
                                 ME-133321 Verify rename fields Driver > Resources |  Assets - Driver General Tab | Regression
                                 ME-133328 verify driver snapshot on the driver page Driver > Resources |  Assets - Driver General Tab | Regression
                                 ME-133245 Verify ‘Personal Parking Space’ field Driver > Resources |  Assets - Driver General Tab | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addAddress, addDriver, clickDeleteInLastRow, driverSaveAction, enterDriverMandatoryFields, navigateToDriverAddNewPage, searchDriverWithCode, verifyInputFieldTagAndMaxLength, createDriverForPermanentDriverVerification } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clearText, clearTextType, clickActionWait, clickCloseXIcon, generateRandomAlphaNumByLength, generateRandomNumberByLength, getMinionValues, toastWithMsg, typeDropDwn, typeDropDwnClick, typeDrpDwnWithMachtingText, typeText, verifyChildContainsTxt, verifyDoesNotExist, verifyElementText, verifyFirstElementTxt, verifyIfDisabled, verifyIfEnabled, verifyReadOnly, verifyTextContains, verifyVisible, viewFullPage, waitSometime } from '../../../../../utilities/commonUtils/genericUtils';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import driverOperationsPage from '../../../../../pageObjects/assets/driver/driverDetails/operations/operationsPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';

const { boolValueTrue } = historyData.userDefinedData;
const { driverCode, powerCode } = generalData.userDefinedData;
const { mobileNumAlreadyExistMsg, domicileAddsRequiredMsg, domicileAddsAlreadyExistMsg, labelTxtAssignedPower, labelTxtPermanantPower, txtCertificationsAndPermits, txtAwards } = generalData.expectedData;
const { btnDriverSave, txtFieldDriverFirstName, txtFieldDriverLastName } = homePage;
const { minionDrpDwnDivision, minionDrpDwnBusinessUnit, defaultAddressType, countryIndia } = generalData.staticData;
const { msgUpdated } = addDriverData.expectedData;
const { btnAddressAddNew, checkBoxMainAddress, txtFieldPhoneNumber, drpdwnPhoneNumCountry, cardCertificationAndAwards, tabCertificationsAndPermits, tabAwards, txtFieldPersonalParkingSpace, txtFieldPermanantPower, labelPermanantPower, drpdwnDivisionTerm, drpdwnBusinessUnitTerm, msgAddressError } = driverAddNewPage;
const { txtDriverCodeEditPage } = driverSearchPage;
const { txtFieldReadOnlyAssignedPower, labelAssignedPower } = driverOperationsPage;
const { tabDriverGeneral, tabDriverOperations, driverSnapshotLogo, imgDriverProfile } = driverCommonPage;
const { maxLength256Val } = historyData.expectedData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const dateObjToday = genericUtils.getDateWithTargetDay({ targetDate: historyData.userDefinedData.todayCount });
const todayDateTime = `${dateObjToday.yyyy}${dateObjToday.mm}${dateObjToday.dd}${dateObjToday.hr}${dateObjToday.mins}${dateObjToday.sec}`;
const driverCodeVal = genericUtils.generateRandomAlphaNumByLength({ lengthOfString: 5 }) + todayDateTime;

let drpDwnDivisionData, drpDwnBusinessUnitData;
const mobileNumber = generateRandomNumberByLength({ lengthOfNum: 10 });

describe('Validating newly added and updated fields in Driver > Resources [ME-137835,ME-133257,ME-133319,ME-133247,ME-133323,ME-133321,ME-133328,ME-133245,ME-160773,ME-161597,ME-161598,ME-160774,ME-161596,ME-161599]', () => {
  before(() => {
    getMinionValues(minionDrpDwnDivision, 1).then((resultOptions) => {
      drpDwnDivisionData = resultOptions[0];
    });
    getMinionValues(minionDrpDwnBusinessUnit, 1).then((resultOptions) => {
      drpDwnBusinessUnitData = resultOptions[0];
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-137835 Verify create Driver with all fields(mandatory,  modified) Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields();
      //providing all newly added/updated fields data
      typeDropDwnClick({ locator: txtFieldPermanantPower, drpDwnVal: powerCode }); //value will get from minion once power tdm implemented
      typeDropDwn({ locator: drpdwnDivisionTerm, drpDwnVal: drpDwnDivisionData });
      typeDropDwn({ locator: drpdwnBusinessUnitTerm, drpDwnVal: drpDwnBusinessUnitData });
      //save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //navigate to operations tab
      clickActionWait({ locator: tabDriverOperations });
      //validating assigned permanant power field operations tab
      verifyElementText({ locator: txtFieldReadOnlyAssignedPower, verifyText: powerCode }); //will replace with power TDM data
    });
  it('ME-133257 Verify driver Code field in Add Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();

      const driverCode = addDriver();
      //validating driver code field is read only in general tab after creating driver
      verifyReadOnly({ locator: txtDriverCodeEditPage, condition: boolValueTrue });
      //search Driver with code
      searchDriverWithCode({ driverCode });
      //navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });
      //validating driver code field is read only in general tab in edit page
      verifyReadOnly({ locator: txtDriverCodeEditPage, condition: boolValueTrue });
    });

  it('ME-133319 verify Certification and Permits & Awards card Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //validating certifications and awards are under one card in Add driver page
      verifyChildContainsTxt({ locator: cardCertificationAndAwards, findElementType: tabCertificationsAndPermits, containsTxt: txtCertificationsAndPermits, assertTxt: txtCertificationsAndPermits });
      verifyChildContainsTxt({ locator: cardCertificationAndAwards, findElementType: tabAwards, containsTxt: txtAwards, assertTxt: txtAwards });
      //search Driver with code
      searchDriverWithCode({ driverCode });
      //navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });
      //validating certifications and awards are under one card in Add driver page
      verifyChildContainsTxt({ locator: cardCertificationAndAwards, findElementType: tabCertificationsAndPermits, containsTxt: txtCertificationsAndPermits, assertTxt: txtCertificationsAndPermits });
      verifyChildContainsTxt({ locator: cardCertificationAndAwards, findElementType: tabAwards, containsTxt: txtAwards, assertTxt: txtAwards });
    });

  it('ME-133247 Verify Mobile Number as Mandatory and unique Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();

      //validating mobile number field as mandatory
      enterDriverMandatoryFields();
      clearText({ locator: txtFieldPhoneNumber });

      //validating state of save button on mobile number field
      verifyIfDisabled({ locator: btnDriverSave });
      typeDrpDwnWithMachtingText({ locator: drpdwnPhoneNumCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: mobileNumber });
      verifyIfEnabled({ locator: btnDriverSave });

      //save driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields();
      //validating mobile number is unique
      clearText({ locator: txtFieldPhoneNumber });
      typeDrpDwnWithMachtingText({ locator: drpdwnPhoneNumCountry, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: mobileNumber });

      clickActionWait({ locator: btnDriverSave });
      //validating error message when enter existing mobile number
      toastWithMsg({ message: mobileNumAlreadyExistMsg });
    });
  //The below 'it' block is skipped due to the functionality removed address Type as Domicile Address
  it.skip('ME-133323 Verify default mandatory address as Domicile Address > Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields();

      //validating Driver save button and adding address
      clickDeleteInLastRow();
      verifyIfDisabled({ locator: btnDriverSave });

      //validating main checkbox and error message in address model popup when domicile address already exists
      clickActionWait({ locator: btnAddressAddNew });
      verifyDoesNotExist({ element: checkBoxMainAddress });
      verifyTextContains({ locator: msgAddressError, containsText: domicileAddsAlreadyExistMsg });
      clickCloseXIcon();

      //adding 1 more domicile address and validating error message after adding extra domicile address
      addAddress({ typeOfAddress: defaultAddressType });
      verifyVisible({ element: msgAddressError });
      verifyTextContains({ locator: msgAddressError, containsText: domicileAddsAlreadyExistMsg });

      //deleting 2nd domicile address
      clickDeleteInLastRow();

      //creating driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });

      //Edit Page validations
      //validating Driver save button and Error message if address not provides
      clickDeleteInLastRow();
      verifyIfDisabled({ locator: btnDriverSave });
      verifyTextContains({ locator: msgAddressError, containsText: domicileAddsRequiredMsg });

      //adding address
      addAddress({ typeOfAddress: defaultAddressType });

      //validating save button enabled aftering adding address
      verifyIfEnabled({ locator: btnDriverSave });

      //validating main checkbox and error message in address model popup when domicile address already exists
      clickActionWait({ locator: btnAddressAddNew });
      verifyDoesNotExist({ element: checkBoxMainAddress });
      verifyVisible({ element: msgAddressError });
      verifyTextContains({ locator: msgAddressError, containsText: domicileAddsAlreadyExistMsg });
      clickCloseXIcon();

      //adding 1 more domicile address and validating error message after adding extra domicile address
      addAddress({ typeOfAddress: defaultAddressType });
      verifyVisible({ element: msgAddressError });
      verifyTextContains({ locator: msgAddressError, containsText: domicileAddsAlreadyExistMsg });
    });

  it('ME-133321 Verify rename fields Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      //permanant power and assigned power validations in Add Driver page
      navigateToDriverAddNewPage();

      //validating permanant power field
      verifyVisible({ element: labelPermanantPower });
      verifyTextContains({ locator: labelPermanantPower, containsText: labelTxtPermanantPower });

      enterDriverMandatoryFields();

      typeDropDwnClick({ locator: txtFieldPermanantPower, drpDwnVal: powerCode });

      //driver save and verifying updated message
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });

      //permanant power and assigned power validations in Edit driver page
      //validating permanant power field in general tab
      verifyVisible({ element: labelPermanantPower });
      verifyTextContains({ locator: labelPermanantPower, containsText: labelTxtPermanantPower });

      //navigate to operations tab
      clickActionWait({ locator: tabDriverOperations });

      //validating assigned power field in operations tab
      verifyElementText({ locator: txtFieldReadOnlyAssignedPower, verifyText: powerCode });
      verifyTextContains({ locator: labelAssignedPower, containsText: labelTxtAssignedPower });
    });
  it('ME-133328 verify driver snapshot on the driver page Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      const firstName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      const lastName = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode });
      //validating profile image is removed
      verifyDoesNotExist({ element: imgDriverProfile });
      //navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });
      //clear text and entering first and last name
      clearTextType({ element: txtFieldDriverFirstName, typeText: firstName });
      clearTextType({ element: txtFieldDriverLastName, typeText: lastName });
      //save driver
      driverSaveAction();
      //validating header logo contains first character of first and last names
      verifyFirstElementTxt({ locator: driverSnapshotLogo, verifyText: firstName.charAt(0) + lastName.charAt(0) });
    });
  //The below 'it' block is skipped due to the functionality removed Personal Parking Space in Personal Information Card
  it.skip('ME-133245 Verify ‘Personal Parking Space’ field Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      verifyInputFieldTagAndMaxLength({ locator: txtFieldPersonalParkingSpace, maxLength: maxLength256Val });
      searchDriverWithCode({ driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      verifyInputFieldTagAndMaxLength({ locator: txtFieldPersonalParkingSpace, maxLength: maxLength256Val });
    });
  it.only('[ME-160773,ME-161597,ME-161598] : Test Driver -Verify for Add New Driver Rename Permanent Tractor to Permanent Power _test td100,_dev mm100,_test mm100 > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      //permanant power and assigned power validations in Add Driver page
      navigateToDriverAddNewPage();
      //validating Rename Permanent Tractor to Permanent Power
      verifyVisible({ element: labelPermanantPower });
      verifyTextContains({ locator: labelPermanantPower, containsText: labelTxtPermanantPower });
    });
  it.only('[ME-160774,ME-161596,ME-161599] : Test Driver -Verify for Search Driver Rename Permanent Tractor to Permanent Power Unit _test td100,_dev mm100,_test mm100 > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      //permanant power and assigned power validations in Add Driver page
      navigateToDriverAddNewPage();
      createDriverForPermanentDriverVerification(driverCodeVal);
      waitSometime(5000);
      searchDriverWithCode({ driverCode: driverCodeVal });
      clickActionWait({ locator: tabDriverGeneral });
      //validating Rename Permanent Tractor to Permanent Power
      verifyVisible({ element: labelPermanantPower });
      verifyTextContains({ locator: labelPermanantPower, containsText: labelTxtPermanantPower });
    });
});