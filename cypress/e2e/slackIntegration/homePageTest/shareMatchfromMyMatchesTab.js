import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import capacityPage from '../../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import capacityData from '../../../testData/slackIntegration/carrierData/details/capacity/capacityData.json';
import homePage from '../../../pageObjects/homePage/homePage.json';
import { searchCarrier, addTruck, navigateToShareModelPopup, verifyShareModelPopupTitleAndSubTitle, sharePopUpforSingleUser, verifyToastMsg } from '../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import {
  clickAction,
  getText,
  getTDMData,
  navigateHomePage,
  typeText,
  waitSometime,
} from '../../../utilities/commonUtils/genericUtils';

let routeCodeVal, carrierNameVal;
const { longWait } = commonData;
const {
  myMatchesTab,
  matchKebabMenu,
} = homePage;
const {
  btnShare,
  btnSharePopupSend,
  routeNumber,
} = capacityPage;
const {
  sharePopupSubTitle,
  matchesSharePopupTitle,
} = capacityData.expectedData;
const {
  atlantaGAOriginLocation,
  matchObject,
  tdmAddCarrierReq,
  tdmAttachStopsOnlyReq,
  tdmCarrierCommonScenario,
  tdmCarrierData,
  tdmCommonStopsCreationScenario,
  tdmLoadData,
} = capacityData.staticData;
const {
  titleSidebarLoggedInUserName,
} = homePage.quickSearch;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Validate Share modal pop-up - Home page > My Matches tab > Truck Object [ME-122121]', () => {
  before(() => {
    getTDMData({ dataType: tdmLoadData, dataCondition: tdmAttachStopsOnlyReq, dataScenario: tdmCommonStopsCreationScenario });
    cy.then(() => {
      routeCodeVal = Cypress.env('inputVal');
    });
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

  it('ME-122121 Can I validate Match Share modal pop-up > Home page > My Matches tab > Match Object | Slack Integration | Regression', {
    tags: [
      '@thirdPartyIntegrationSlack',
      '@homePage',
      '@matchObject',
      '@phase1',
      '@p1',
    ],
  }, () => {
    getText({ locator: titleSidebarLoggedInUserName });
    waitSometime(longWait);
    navigateHomePage();
    clickAction({ locator: myMatchesTab });
    typeText({ locator: routeNumber, dataText: routeCodeVal.routeCode });
    waitSometime(longWait);
    //Navigate to share model popup
    navigateToShareModelPopup({ locator: matchKebabMenu, element: btnShare });
    //Verify truck share popup title
    verifyShareModelPopupTitleAndSubTitle({ title: matchesSharePopupTitle, subTitle: sharePopupSubTitle });
    //Validation on pop-up for single user
    sharePopUpforSingleUser();
    clickAction({ locator: btnSharePopupSend });
    //ribbon message
    verifyToastMsg({ objectType: matchObject });
  });
});