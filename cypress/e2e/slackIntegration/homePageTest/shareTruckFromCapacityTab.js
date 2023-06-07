import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import capacityPage from '../../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import capacityData from '../../../testData/slackIntegration/carrierData/details/capacity/capacityData.json';
import homePage from '../../../pageObjects/homePage/homePage.json';
import { searchCarrier, addTruck, verifySharePopupFields, navigateToShareModelPopup, verifyShareModelPopupTitleAndSubTitle, sharePopUpforSingleUser, verifyToastMsg } from '../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import {
  clickAction,
  getText,
  getTDMData,
  navigateHomePage,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';
let carrierNameVal;
const { longWait } = commonData;
const {
  truckKebabMenu,
} = homePage.capacityTab;
const {
  btnShare,
  btnSharePopupSend,
} = capacityPage;
const {
  sharePopupSubTitle,
  truckSharePopupTitle,
} = capacityData.expectedData;
const {
  atlantaGAOriginLocation,
  truckObject,
  tdmAddCarrierReq,
  tdmCarrierCommonScenario,
  tdmCarrierData,
} = capacityData.staticData;
const {
  titleSidebarLoggedInUserName,
} = homePage.quickSearch;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Validate Share modal pop-up - Home page > Capacity tab > Truck Object [ME-122119]', () => {
  before(() => {
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierCommonScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    waitSometime(longWait);
    addTruck({ originLocation: atlantaGAOriginLocation, destinationLocation: atlantaGAOriginLocation });
  });

  it('ME-122119 Can I validate Truck Share modal pop-up > Home page > Capacity tab > Truck Object | Slack Integration | Regression', {
    tags: [
      '@thirdPartyIntegrationSlack',
      '@homePage',
      '@truckObject',
      '@phase1',
      '@p1',
    ],
  }, () => {
    getText({ locator: titleSidebarLoggedInUserName });
    waitSometime(longWait);
    navigateHomePage();
    //Navigate to share model popup
    navigateToShareModelPopup({ locator: truckKebabMenu, element: btnShare });
    //Verify truck share popup title
    verifyShareModelPopupTitleAndSubTitle({ title: truckSharePopupTitle, subTitle: sharePopupSubTitle });
    //Verify To field,Note field,word counter,send button,x button should be visible
    verifySharePopupFields();
    //Validation on pop-up for single user
    sharePopUpforSingleUser();
    clickAction({ locator: btnSharePopupSend });
    //ribbon message
    verifyToastMsg({ objectType: truckObject });
  });
});