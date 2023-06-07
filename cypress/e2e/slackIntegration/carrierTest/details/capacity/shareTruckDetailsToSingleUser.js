import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import capacityPage from '../../../../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import capacityData from '../../../../../testData/slackIntegration/carrierData/details/capacity/capacityData.json';
import { searchCarrier, addTruck, navigateToShareModelPopup, verifyShareModelPopupTitleAndSubTitle, sharePopUpforSingleUser, verifyToastMsg } from '../../../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import {
  clickAction,
  getText,
  getTDMData,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
let carrierNameVal;
const { longWait } = commonData;
const {
  btnShare,
  btnSharePopupSend,
  truckOptionsContextBtn,
} = capacityPage;
const {
  sharePopupSubTitle,
  truckSharePopupTitle,
} = capacityData.expectedData;
const {
  atlantaGAOriginLocation,
  tdmAddCarrierReq,
  tdmCarrierCommonScenario,
  tdmCarrierData,
  truckObject,
} = capacityData.staticData;
const {
  titleSidebarLoggedInUserName,
} = homePage.quickSearch;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Send Truck deatils for a single slack User Carrier > Capacity tab > Truck Object [ME-110587]', () => {
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

  it('ME-110587 Can I send Truck deatils for a single slack User Carrier > Capacity tab > Truck Object | Slack Integration | Regression', {
    tags: [
      '@thirdPartyIntegrationSlack',
      '@carrier',
      '@carrierCapacity',
      '@truckObject',
      '@p1',
      '@phase1',
    ],
  }, () => {
    waitSometime(longWait);
    getText({ locator: titleSidebarLoggedInUserName });
    //Navigate to share model popup
    navigateToShareModelPopup({ locator: truckOptionsContextBtn, element: btnShare });
    //Verify truck share popup title
    verifyShareModelPopupTitleAndSubTitle({ title: truckSharePopupTitle, subTitle: sharePopupSubTitle });
    //Validation on share modal pop-up for single user
    sharePopUpforSingleUser();
    clickAction({ locator: btnSharePopupSend });
    //ribbon message
    verifyToastMsg({ objectType: truckObject });
  });
});