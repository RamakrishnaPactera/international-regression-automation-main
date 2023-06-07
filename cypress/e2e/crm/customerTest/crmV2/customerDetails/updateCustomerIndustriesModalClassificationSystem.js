import crmFirmographicsData from '../../../../../testData/crm/crmData/crmFirmographicsData.json';
import crmFirmographicsPage from '../../../../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { searchCustomer } from '../../../../../utilities/customerUtils/customerUtils';
import {
  clickAction,
  clickFirstElementIn,
  clickVisibleElement,
  dropDownContainsTextClick,
  getTDMData,
  notClickable,
  verifyAttrText,
  verifyDoesNotExist,
  verifyText,
  verifyTextContains,
  verifyTextOrBackGroundColor,
  verifyToExist,
  verifyVisible,
  viewFullPage,
} from '../../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
const { userName: usernameText, password: passwordText } =
  Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  colorAttr,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmFirmographicsData.staticData;
const {
  industryClassificationSystemISIC,
  industryClassificationSystemNAICS,
  industryClassificationSystemSIC,
  industryPrimaryAttr,
  titleAddNewIndustryDialog,
  txtIndustriesTabVerification,
} = crmIndustryData.staticData;
const { colorCodeVal, industryPrimaryValue } = crmFirmographicsData.expectedData;
const {
  btnAddIndustrySaveNotVisible,
  btnExpand,
  btnExpandIndustriesPlus,
  btnIndustriesPlus,
  btnIndustriesTab,
  checkBox,
  dialogPopHeaderText,
  dialogPopup,
  dialogWindow,
  drpdwnCarrotBtnIndustries,
  drpdwnClassificationSystem,
  expandViewDialogPopUpClose,
  expandViewDialogWindow,
  labelAddIndustryClassificationSystem,
  labelAddIndustryIndustryCodeDescription,
  labelAddIndustryPrimary,
  labelIndustryPrimary,
  tabCrmCustomer,
  tabCustomerDetails,
  tabIndustries,
  toolTipClassificationSystem,
  toolTipColClassificationSystem,
  toolTipColIndustryCode,
  toolTipIndustryCode,
} = crmFirmographicsPage;

let customerNameVal;
describe('Can I Validate Modal & Field Properties & Action Button > Customer > CRM > CustomerDetails > Industries Tab > Add Industry [ME-113192]', () => {
  before(() => {
    cy.log('***Creating Customer***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    searchCustomer({ customerName: customerNameVal.customerName });
    viewFullPage();
    clickFirstElementIn({ locator: tabCrmCustomer });
    clickAction({ locator: tabCustomerDetails });
  });

  it('ME-113192 : Can I Validate Modal & Field Properties & Action Button > > CRM > Customer details | Customer Regression | Sprint Regression',
    {
      tags: [
        '@customer',
        '@crm',
        '@customerDetails',
        '@customerIndustries',
        '@p2',
      ],
    },
    () => {
      clickAction({ locator: btnIndustriesTab });
      //validations on defaultView
      clickAction({ locator: btnIndustriesPlus });
      verifyVisible({ element: dialogWindow });
      //Verifying all labels in Add industry
      verifyVisible({ element: dialogPopup });
      verifyText({ locator: dialogPopHeaderText, verifyText: titleAddNewIndustryDialog });
      verifyToExist({ element: labelAddIndustryClassificationSystem });
      verifyToExist({ element: labelAddIndustryIndustryCodeDescription });
      verifyToExist({ element: labelAddIndustryPrimary });
      verifyToExist({ element: checkBox });
      notClickable({ locator: btnAddIndustrySaveNotVisible });
      verifyToExist({ element: checkBox });
      //verifying the classification toolTip in default view
      verifyToExist({ element: toolTipClassificationSystem });
      verifyTextOrBackGroundColor({ locator: toolTipColClassificationSystem, color: colorAttr, colorCode: colorCodeVal });
      //verifying the industry code & Description toolTip in default view
      verifyToExist({ element: toolTipIndustryCode });
      verifyTextOrBackGroundColor({ locator: toolTipColIndustryCode, color: colorAttr, colorCode: colorCodeVal });
      clickAction({ locator: drpdwnClassificationSystem });
      //Verifying classification drpDwn values in default view
      dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemNAICS, exactText: industryClassificationSystemNAICS });
      verifyAttrText({ locator: labelIndustryPrimary, attribute: industryPrimaryAttr, verifyText: industryPrimaryValue });
      clickAction({ locator: drpdwnClassificationSystem });
      dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemISIC, exactText: industryClassificationSystemISIC });
      verifyAttrText({ locator: labelIndustryPrimary, attribute: industryPrimaryAttr, verifyText: industryPrimaryValue });
      clickAction({ locator: drpdwnClassificationSystem });
      dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemSIC, exactText: industryClassificationSystemSIC });
      verifyVisible({ element: dialogPopup });
      clickAction({ locator: dialogPopup });
      verifyDoesNotExist({ element: dialogPopup });
      //validation on Expand view
      clickAction({ locator: btnIndustriesTab });
      clickAction({ locator: drpdwnCarrotBtnIndustries });
      clickVisibleElement({ locator: btnExpand });
      verifyVisible({ element: expandViewDialogWindow });
      //Verifying all labels in Add industry
      clickVisibleElement({ locator: btnExpandIndustriesPlus });
      verifyVisible({ element: dialogWindow });
      verifyTextContains({ locator: dialogWindow, containsText: titleAddNewIndustryDialog });
      verifyToExist({ element: labelAddIndustryClassificationSystem });
      verifyToExist({ element: labelAddIndustryIndustryCodeDescription });
      verifyToExist({ element: labelAddIndustryPrimary });
      verifyToExist({ element: checkBox });
      notClickable({ locator: btnAddIndustrySaveNotVisible });
      //verifying the classification toolTip in Expand view
      verifyToExist({ element: toolTipClassificationSystem });
      verifyTextOrBackGroundColor({ locator: toolTipColClassificationSystem, color: colorAttr, colorCode: colorCodeVal });
      //verifying the industry code & Description toolTip in Expand view
      verifyToExist({ element: toolTipIndustryCode });
      verifyTextOrBackGroundColor({ locator: toolTipColIndustryCode, color: colorAttr, colorCode: colorCodeVal });
      clickAction({ locator: drpdwnClassificationSystem });
      //Verifying classification drpDwn values in Expand view
      dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemNAICS, exactText: industryClassificationSystemNAICS });
      verifyAttrText({ locator: labelIndustryPrimary, attribute: industryPrimaryAttr, verifyText: industryPrimaryValue });
      clickAction({ locator: drpdwnClassificationSystem });
      dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemISIC, exactText: industryClassificationSystemISIC });
      verifyAttrText({ locator: labelIndustryPrimary, attribute: industryPrimaryAttr, verifyText: industryPrimaryValue });
      clickAction({ locator: drpdwnClassificationSystem });
      dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemSIC, exactText: industryClassificationSystemSIC });
      //Close Add industry popup
      verifyVisible({ element: dialogPopup });
      clickVisibleElement({ locator: dialogPopup });
      verifyText({
        locator: tabIndustries,
        verifyText: txtIndustriesTabVerification,
      });
      //Close Expand view  windowPop
      clickVisibleElement({ locator: expandViewDialogPopUpClose });
      verifyText({ locator: tabIndustries, verifyText: txtIndustriesTabVerification });
    });
});