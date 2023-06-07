import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import capacityPage from '../../../../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import { returntodayDateDDMM } from '../../../../../utilities/commonUtils/dateTimeUtils';
import capacityData from '../../../../../testData/slackIntegration/carrierData/details/capacity/capacityData.json';
import { searchCarrier, addTruck, verifySharePopupFields, navigateToShareModelPopup, verifyShareModelPopupTitleAndSubTitle } from '../../../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  clickAction,
  getTDMData,
  typeText,
  verifyFirstElementTxt,
  verifyTextContains,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';

let routeCodeVal, carrierNameVal;
const { longWait } = commonData;
const {
  btnMatchAll,
  btnMatchesCarretIcon,
  btnShare,
  labelSharePopupDetails,
  routeNumber,
  linkrouteNumber,
} = capacityPage;
const {
  matchesSharePopupTitle,
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
  truckLength,
} = capacityData.staticData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Validate Share Route modal pop-up - UI > Capacity tab > Match Object [ME-110564]', () => {
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

  it('ME-110564 Can I validate Share Match modal pop-up - UI > Capacity tab > Route Object | Slack Integration  | Regression', {
    tags: [
      '@thirdPartyIntegrationSlack',
      '@carrier',
      '@carrierCapacity',
      '@matchObject',
      '@p2',
      '@phase1',
    ],
  }, () => {
    //Verify share popup exist
    waitSometime(longWait);
    clickAction({ locator: btnMatchAll });
    waitSometime(longWait);
    typeText({ locator: routeNumber, dataText: routeCodeVal.routeCode });
    waitSometime(longWait);
    verifyFirstElementTxt({ locator: linkrouteNumber, verifyText: routeCodeVal.routeCode });
    //Navigate to share model popup
    navigateToShareModelPopup({ locator: btnMatchesCarretIcon, element: btnShare });
    //Verify truck share popup title
    verifyShareModelPopupTitleAndSubTitle({ title: matchesSharePopupTitle, subTitle: sharePopupSubTitle });
    //Verify To field,Note field,word counter,send button,x button should be visible
    verifySharePopupFields();
    //Verify Share popup details
    verifyTextContains({ locator: labelSharePopupDetails, containsText: returntodayDateDDMM() });
    verifyTextContains({ locator: labelSharePopupDetails, containsText: truckLength });
    verifyTextContains({ locator: labelSharePopupDetails, containsText: routeCodeVal.routeCode });
    verifyTextContains({ locator: labelSharePopupDetails, containsText: atlantaGAOriginLocation });
  });
});