import crmFirmographicsData from '../../../../../testData/crm/crmData/crmFirmographicsData.json';
import crmFirmographicsPage from '../../../../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import crmIndustryData from '../../../../../testData/crm/crmData/crmIndustryData.json';
import { searchCarrier } from '../../../../../utilities/carrierUtils/carrierUtils';
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
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierScenario,
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
  tabCarrierDetails,
  tabCrmCarrier,
  tabIndustries,
  toolTipClassificationSystem,
  toolTipColClassificationSystem,
  toolTipColIndustryCode,
  toolTipIndustryCode,
} = crmFirmographicsPage;
let carrierNameVal;
describe('Can I Validate Modal & Field Properties & Action Button > Carrier > CRM > CarrierDetails > Industries Tab > Add Industry [ME-113200]', () => {
  before(() => {
    cy.log('***creating new carrier***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    viewFullPage();
    clickFirstElementIn({ locator: tabCrmCarrier });
    clickAction({ locator: tabCarrierDetails });
  });

  it('ME-113200 : Can I Validate Modal & Field Properties & Action Button Carrier > CRM > Carrier details | Carrier Regression | Sprint Regression ',
    {
      tags: [
        '@carrier',
        '@crm',
        '@carrierDetails',
        '@carrierIndustries',
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
      verifyToExist({ element: checkBox });
      //verifying the classification toolTip in default view
      verifyToExist({ element: toolTipClassificationSystem });
      verifyTextOrBackGroundColor({ locator: toolTipColClassificationSystem, color: colorAttr, colorCode: colorCodeVal });
      verifyToExist({ element: toolTipIndustryCode });
      //verifying the industry code & Description toolTip in Expand view
      verifyTextOrBackGroundColor({ locator: toolTipColIndustryCode, color: colorAttr, colorCode: colorCodeVal });
      //Verifying classification drpDwn values in Expand view
      clickAction({ locator: drpdwnClassificationSystem });
      dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemNAICS, exactText: industryClassificationSystemNAICS });
      verifyAttrText({ locator: labelIndustryPrimary, attribute: industryPrimaryAttr, verifyText: industryPrimaryValue });
      clickAction({ locator: drpdwnClassificationSystem });
      dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemISIC, exactText: industryClassificationSystemISIC });
      verifyAttrText({ locator: labelIndustryPrimary, attribute: industryPrimaryAttr, verifyText: industryPrimaryValue });
      clickAction({ locator: drpdwnClassificationSystem });
      dropDownContainsTextClick({ element: drpdwnClassificationSystem, typeText: industryClassificationSystemSIC, exactText: industryClassificationSystemSIC });
      //close Add Industry popup
      verifyVisible({ element: dialogPopup });
      clickVisibleElement({ locator: dialogPopup });
      verifyText({
        locator: tabIndustries,
        verifyText: txtIndustriesTabVerification,
      });
      //Close Expand view windowPop
      clickVisibleElement({ locator: expandViewDialogPopUpClose });
      verifyText({ locator: tabIndustries, verifyText: txtIndustriesTabVerification });
    });
});