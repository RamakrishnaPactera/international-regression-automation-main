import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import capacityPage from '../../../../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import capacityData from '../../../../../testData/slackIntegration/carrierData/details/capacity/capacityData.json';
import { searchCarrier, addTruck, verifySharePopupFields, navigateToShareModelPopup, verifyShareModelPopupTitleAndSubTitle } from '../../../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import { getRouteTblSharingValue, verifyRouteSharePopupValues } from '../../../../../utilities/loadUtils/loadUtils';
import {
  clickAction,
  clickLinkToOpenPageOnSameTab,
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
  linkrouteNumber,
  routeNumber,
} = capacityPage;
const {
  routesSharePopupTitle,
  sharePopupSubTitle,
} = capacityData.expectedData;
const {
  atlantaGAOriginLocation,
  tdmAddCarrierReq,
  tdmAttachStopsOnlyReq,
  tdmCarrierCommonScenario,
  tdmCarrierData,
  tdmCommonStopsCreationScenario,
  tdmLoadData,
} = capacityData.staticData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Validate Share Route modal pop-up - UI > Capacity tab > Route Object.[ME-110565]', () => {
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

  it('ME-110565 Can I validate Share Route modal pop-up - UI > Capacity tab > Route Object | Slack Integration | Regression', {
    tags: [
      '@thirdPartyIntegrationSlack',
      '@load',
      '@routeObject',
      '@p2',
      '@phase1',
    ],
  }, () => {
    waitSometime(longWait);
    clickAction({ locator: btnMatchAll });
    waitSometime(longWait);
    typeText({ locator: routeNumber, dataText: routeCodeVal.routeCode });
    waitSometime(longWait);
    verifyFirstElementTxt({ locator: linkrouteNumber, verifyText: routeCodeVal.routeCode });
    clickLinkToOpenPageOnSameTab({ locator: linkrouteNumber });
    //Get Route details to share
    getRouteTblSharingValue({ routeVal: routeCodeVal.routeCode });
    //Navigate to share model popup
    navigateToShareModelPopup({ locator: btnRoutesCarretIcon, element: btnShare });
    //Verify truck share popup title
    verifyShareModelPopupTitleAndSubTitle({ title: routesSharePopupTitle, subTitle: sharePopupSubTitle });
    //Verify To field,Note field,word counter,send button,x button should be visible
    verifySharePopupFields();
    //Verify Share popup details
    verifyRouteSharePopupValues();
  });
});