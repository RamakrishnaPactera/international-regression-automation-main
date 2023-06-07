/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating professional information such as type, partner, company, hireDate, class in driver pages
 Test Cases List
 Authored By : Shashi Jaiswal
 Date : 14-04-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : ME-29942 Test Driver Professional Information Driver > Resources |  Assets - Driver General Tab | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { basicDrvrProfInfo, addnlDrvrProfInfo, enterDriverMandatoryFields, navigateToDriverAddNewPage, searchDriverWithCode, validateDrpDwnField } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickActionWait, getMinionValues, scrollIntoView, verifyVisible, viewFullPage, verifyReadOnly, verifyLblTextLength, verifyElementHaveValue, clickAction, previousTab, selectItemFrmSrchPicker, navigateToChildWindow, typeDrpDwnWithMachtingText } from '../../../../../utilities/commonUtils/genericUtils';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';

const { btnDriverSave } = homePage;
const { boolValueTrue } = historyData.userDefinedData;
const {
  divYearsOfService,
  btnExpandDrpDwnClassTerm,
  drpDwnProfessionalClass,
  btnExpandDrpDwnTypeTerm,
  txtFieldHireDate,
  txtFieldTerminationDate,
  txtFieldPartner,
  txtFieldDriverTrainer,
  drpDwnPersonalInfoType,
  trainerTxtFieldProfInfo,
} = driverAddNewPage;
const {
  tabDriverGeneral,
  companyHyperLink,
  partnerHyperLink,
  trainerHyperLink,
  snapShot,
} = driverCommonPage;
const {
  minionDrpDwnProfessionalType,
  minionDrpDwnDriverClass,
  partnerDriverName,
} = generalData.staticData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

const validateInputFields = () => {
  verifyReadOnly({ locator: divYearsOfService, condition: boolValueTrue });
  verifyLblTextLength({ locator: divYearsOfService, expectedVal: 1 });
  validateDrpDwnField({ locatorBtn: btnExpandDrpDwnClassTerm, locatorDrpDwn: drpDwnProfessionalClass });
  validateDrpDwnField({ locatorBtn: btnExpandDrpDwnTypeTerm, locatorDrpDwn: drpDwnPersonalInfoType });
  verifyElementHaveValue({ locator: txtFieldHireDate });
  verifyElementHaveValue({ locator: txtFieldTerminationDate });
};

const validateSearchPickerFields = () => {
  verifyElementHaveValue({ locator: txtFieldPartner });
  //verifyElementHaveValue({ locator: txtFieldCompany }); //Once ME-146366 is fixed, need to uncomment this
  verifyElementHaveValue({ locator: txtFieldDriverTrainer });
};

let drpDwnTypeTermData, drpDwnClassTermData;

describe('Validating professional information such as type, partner, company, hireDate, class in driver pages [ME-29942]', () => {
  before(() => {
    getMinionValues(minionDrpDwnProfessionalType, 1).then((resultOptions) => {
      drpDwnTypeTermData = resultOptions[0];
    });
    getMinionValues(minionDrpDwnDriverClass, 1).then((resultOptions) => {
      drpDwnClassTermData = resultOptions[0];
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('ME-29942 Validating information such as type, hireDate, class, yrsOfService in driver pages Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      const { driverCode } = enterDriverMandatoryFields();
      //creating driver professional info
      basicDrvrProfInfo({ drpDwnClassValue: drpDwnClassTermData, drpDwnTypeValue: drpDwnTypeTermData });
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      verifyVisible({ element: snapShot });
      //validate input fields
      validateInputFields();
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });
      verifyVisible({ element: snapShot });
      //validate input fields
      validateInputFields();
    });

  it('ME-29942 Validating Partner, company, trainer information in driver pages Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      const { driverCode } = enterDriverMandatoryFields();
      //creating driver professional info
      addnlDrvrProfInfo({ drpDwnClassValue: drpDwnClassTermData, drpDwnTypeValue: drpDwnTypeTermData, partnerDriver: partnerDriverName });
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      verifyVisible({ element: snapShot });
      //validate input fields
      validateSearchPickerFields();
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });
      verifyVisible({ element: snapShot });
      //validate input fields
      validateSearchPickerFields();
    });

  it('ME-29942 Validating YrsOfService should not be calculated when hire date is empty in driver pages Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
        '@phase3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      const { driverCode } = enterDriverMandatoryFields();
      typeDrpDwnWithMachtingText({ locator: drpDwnPersonalInfoType, drpDwnVal: drpDwnTypeTermData });
      typeDrpDwnWithMachtingText({ locator: drpDwnProfessionalClass, drpDwnVal: drpDwnClassTermData });
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      verifyVisible({ element: snapShot });
      //validate input fields
      verifyReadOnly({ locator: divYearsOfService, condition: boolValueTrue });
      verifyLblTextLength({ locator: divYearsOfService, expectedVal: 0 });
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });
      verifyVisible({ element: snapShot });
      //validate input fields
      verifyReadOnly({ locator: divYearsOfService, condition: boolValueTrue });
      verifyLblTextLength({ locator: divYearsOfService, expectedVal: 0 });
    });
  it('ME-133912 Validating Partner field hyperlink > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      const { driverCode } = enterDriverMandatoryFields(false);
      //creating driver professional info
      addnlDrvrProfInfo({ drpDwnClassValue: drpDwnClassTermData, drpDwnTypeValue: drpDwnTypeTermData, partnerDriver: partnerDriverName });
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      verifyVisible({ element: snapShot });
      //validate input fields
      validateSearchPickerFields();
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });
      navigateToChildWindow();
      clickAction({ locator: partnerHyperLink });
      previousTab();
    });
  it('ME-133920 Validating company field hyperlink > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      const { driverCode } = enterDriverMandatoryFields(false);
      //creating driver professional info
      addnlDrvrProfInfo({ drpDwnClassValue: drpDwnClassTermData, drpDwnTypeValue: drpDwnTypeTermData, partnerDriver: partnerDriverName });
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      verifyVisible({ element: snapShot });
      //validate input fields
      validateSearchPickerFields();
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });
      navigateToChildWindow();
      clickAction({ locator: companyHyperLink });
      previousTab();
    });
  it('ME-133945 Validating trainer field  hyperlink > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p2',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      //creating driver with mandatory fields
      const { driverCode } = enterDriverMandatoryFields(false);
      //creating driver professional info
      selectItemFrmSrchPicker({ locator: trainerTxtFieldProfInfo, typeText: partnerDriverName });
      scrollIntoView({ locator: btnDriverSave });
      clickActionWait({ locator: btnDriverSave });
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode });
      //Navigating to general tab
      clickActionWait({ locator: tabDriverGeneral });
      navigateToChildWindow();
      clickAction({ locator: trainerHyperLink });
      previousTab();
    });
});