/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver Contact Details - UI Testcase
 Test Driver Certifications & Permits - UI Testcase
 Test Cases List
 Authored By                    : PruthviRaj
 Date                           : 18-04-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             : ME-30254 Verify Driver Contact Details - UI Testcase | Assets - Driver Contact Tab | Regression
                                : ME-30128 Verify Driver Certifications & Permits - UI Testcase | Assets - Driver Certifications & Permits Tab | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import * as addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import * as addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import { returntodayDateMMDDYY, verifyTodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Driver Contact Details - UI Testcase | Driver Certifications & Permits - UI Testcase | Assets - Driver | Regression [ME-30254] [ME-30128]', () => {
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('ME-30254- Driver Contact Details - UI Testcase | Assets - Driver Contact Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverContact',
        '@p3',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyElementTextContains({ locator: addDriverPage.contacts.titleContactsTable, verifyText: addDriverData.staticData.titleContactsTable });
      genericUtils.clickAction({ locator: addDriverPage.contacts.btnContactsAdd });
      genericUtils.verifyElementTextContains({ locator: addDriverPage.contacts.txtHeaderAddContacts, verifyText: addDriverData.staticData.txtHeaderAddContacts });
      genericUtils.verifyToolTips({ locator: addDriverPage.contacts.toolTipPhoneNumber, verifyText: addDriverData.staticData.toolTipErrorMsg });
      genericUtils.verifyToolTips({ locator: addDriverPage.contacts.toolTipFaxNumber, verifyText: addDriverData.staticData.toolTipErrorMsg });
      genericUtils.verifyToolTips({ locator: addDriverPage.contacts.toolTipEmailAddres, verifyText: addDriverData.staticData.toolTipErrorMsg });
      genericUtils.verifyToolTips({ locator: addDriverPage.contacts.toolTipIMUsername, verifyText: addDriverData.staticData.toolTipErrorMsg });
    });

  it('ME-30128- Driver Certifications & Permits - UI Testcase | Assets - Driver Certifications & Permits Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverCertifications&Permits',
        '@p3',
      ],
    },
    () => {
      //Navigating to Driver - Add New page
      resourceUtilis.navigateToDriverAddNewPage();
      const todayDate = returntodayDateMMDDYY();
      genericUtils.verifyElementTextContains({ locator: addDriverPage.certificationOrPermit.titleCertificationOrPermit, verifyText: addDriverData.staticData.titleCertificationOrPermit });
      genericUtils.clickAction({ locator: addDriverPage.certificationOrPermit.btnAdd });
      genericUtils.verifyElementTextContains({ locator: addDriverPage.contacts.txtHeaderAddContacts, verifyText: addDriverData.staticData.txtHeaderAddNewCertificationOrPermit });
      genericUtils.verifyToolTips({ locator: addDriverPage.certificationOrPermit.tooltipType, verifyText: addDriverData.staticData.toolTipType });
      genericUtils.verifyToolTips({ locator: addDriverPage.certificationOrPermit.tooltipID, verifyText: addDriverData.staticData.toolTipID });
      genericUtils.verifyToolTips({ locator: addDriverPage.certificationOrPermit.tooltipExpDate, verifyText: addDriverData.staticData.tooltipExpDate });
      genericUtils.clearTextType({ element: addDriverPage.certificationOrPermit.txtFieldExpDate, typeText: todayDate });
      verifyTodayDateMMDDYY({ dateLocator: addDriverPage.certificationOrPermit.txtFieldExpDate, attribute: addDriverData.staticData.valueAttr });
    });
});