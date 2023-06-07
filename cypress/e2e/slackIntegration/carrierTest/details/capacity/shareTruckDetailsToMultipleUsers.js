import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import capacityPage from '../../../../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import capacityData from '../../../../../testData/slackIntegration/carrierData/details/capacity/capacityData.json';
import { searchCarrier, addTruck, navigateToShareModelPopup, verifyShareModelPopupTitleAndSubTitle, verifyToastMsg } from '../../../../../utilities/carrierUtils/carrierUtils';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import {
  clearText,
  clickAction,
  getTDMData,
  selectItemFromDropDownByTyping,
  verifyDoesNotExist,
  verifyVisible,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
let carrierNameVal;
const { longWait } = commonData;
const {
  btnShare,
  btnSharePopupTo,
  btnSharePopupSend,
  errorToFieldCircleExclamation,
  truckOptionsContextBtn,
  txtFieldSharePopupTo,
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
  multipleUsersToSelect,
  slackUser,
} = capacityData.userDefinedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Send Truck deatils for a multiple slack Users Carrier > Capacity tab > Truck Object.[ME-110588]', () => {
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

  it('ME-110588 Can I send Truck deatils for a Multiple slack Users Carrier > Capacity tab > Truck Object | Slack Integration | Regression', {
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
    //Navigate to share model popup
    navigateToShareModelPopup({ locator: truckOptionsContextBtn, element: btnShare });
    //Verify truck share popup title
    verifyShareModelPopupTitleAndSubTitle({ title: truckSharePopupTitle, subTitle: sharePopupSubTitle });
    //Select more than 7 users and verify Circle Exclamation error
    clickAction({ locator: btnSharePopupTo });
    multipleUsersToSelect.forEach((slackUser) => {
      selectItemFromDropDownByTyping({ locator: txtFieldSharePopupTo, drpDwnVal: slackUser });
      clearText({ locator: txtFieldSharePopupTo });
    });
    verifyVisible({ element: errorToFieldCircleExclamation });
    //Unselect one and verify Circle Exclamation error should not available
    selectItemFromDropDownByTyping({ locator: txtFieldSharePopupTo, drpDwnVal: slackUser });
    verifyDoesNotExist({ element: errorToFieldCircleExclamation });
    clickAction({ locator: btnSharePopupSend });
    //ribbon message
    verifyToastMsg({ objectType: truckObject });
  });
});