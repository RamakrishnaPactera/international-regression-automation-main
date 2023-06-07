import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { returntodayDateDDMM } from '../../../../../utilities/commonUtils/dateTimeUtils';
import capacityPage from '../../../../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import capacityData from '../../../../../testData/slackIntegration/carrierData/details/capacity/capacityData.json';
import { searchCarrier, addTruck, verifySharePopupFields, navigateToShareModelPopup, verifyShareModelPopupTitleAndSubTitle } from '../../../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  getTDMData,
  verifyTextContains,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';

let carrierNameVal;
const { longWait } = commonData;
const {
  btnShare,
  labelSharePopupDetails,
  truckOptionsContextBtn,
} = capacityPage;
const {
  sharePopupSubTitle,
  truckSharePopupTitle,
} = capacityData.expectedData;
const {
  atlantaGAOriginLocation,
  maxODHValue,
  tdmAddCarrierReq,
  tdmCarrierCommonScenario,
  tdmCarrierData,
  truckCapacity,
} = capacityData.staticData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Validate Share modal pop-up - UI > Capacity tab > Truck Object [ME-110566]', () => {
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

  it('ME-110566 Can I validate Truck Share modal pop-up - UI > Capacity tab > Truck Object | Slack Integration | Regression', {
    tags: [
      '@thirdPartyIntegrationSlack',
      '@carrier',
      '@carrierCapacity',
      '@truckObject',
      '@p2',
      '@phase1',
    ],
  }, () => {
    waitSometime(longWait);
    //Navigate to share model popup
    navigateToShareModelPopup({ locator: truckOptionsContextBtn, element: btnShare });
    //Verify truck share popup title
    verifyShareModelPopupTitleAndSubTitle({ title: truckSharePopupTitle, subTitle: sharePopupSubTitle });
    //Verify To field,Note field,word counter,send button,x button should be visible
    verifySharePopupFields();
    //Verify Share popup details
    verifyTextContains({ locator: labelSharePopupDetails, containsText: returntodayDateDDMM() });
    verifyTextContains({ locator: labelSharePopupDetails, containsText: truckCapacity });
    verifyTextContains({ locator: labelSharePopupDetails, containsText: maxODHValue });
    verifyTextContains({ locator: labelSharePopupDetails, containsText: atlantaGAOriginLocation });
  });
});