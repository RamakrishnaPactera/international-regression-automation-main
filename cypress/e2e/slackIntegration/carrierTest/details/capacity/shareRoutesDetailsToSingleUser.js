import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import capacityPage from '../../../../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import capacityData from '../../../../../testData/slackIntegration/carrierData/details/capacity/capacityData.json';
import { searchCarrier, addTruck, navigateToShareModelPopup, verifyShareModelPopupTitleAndSubTitle, sharePopUpforSingleUser, verifyToastMsg } from '../../../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import {
  clickAction,
  clickLinkToOpenPageOnSameTab,
  getText,
  getTDMData,
  typeText,
  verifyFirstElementTxt,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';

let routeCodeVal, carrierNameVal;
const { longWait } = commonData;
const {
  btnMatchAll,
  btnRoutesCarretIcon,
  btnShare,
  btnSharePopupSend,
  linkrouteNumber,
  routeNumber,
} = capacityPage;

const {
  routesSharePopupTitle,
  sharePopupSubTitle,
} = capacityData.expectedData;
const {
  atlantaGAOriginLocation,
  routeObject,
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

describe('send Route deatils for a single slack User Carrier > Capacity tab > Load > Route Object.[ME-110584]', () => {
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

  it('ME-110584 Can I send Route deatils for a single slack User Carrier > Capacity tab > Load > Route Object | Slack Integration | Regression', {
    tags: [
      '@thirdPartyIntegrationSlack',
      '@load',
      '@routeObject',
      '@p1',
      '@phase1',
    ],
  }, () => {
    //Verify share popup exist
    waitSometime(longWait);
    clickAction({ locator: btnMatchAll });
    waitSometime(longWait);
    getText({ locator: titleSidebarLoggedInUserName });
    typeText({ locator: routeNumber, dataText: routeCodeVal.routeCode });
    waitSometime(longWait);
    verifyFirstElementTxt({ locator: linkrouteNumber, verifyText: routeCodeVal.routeCode });
    clickLinkToOpenPageOnSameTab({ locator: linkrouteNumber });
    //Navigate to share model popup
    navigateToShareModelPopup({ locator: btnRoutesCarretIcon, element: btnShare });
    //Verify truck share popup title
    verifyShareModelPopupTitleAndSubTitle({ title: routesSharePopupTitle, subTitle: sharePopupSubTitle });
    //Validation on pop-up for single user
    sharePopUpforSingleUser();
    clickAction({ locator: btnSharePopupSend });
    //ribbon message
    verifyToastMsg({ objectType: routeObject });
  });
});