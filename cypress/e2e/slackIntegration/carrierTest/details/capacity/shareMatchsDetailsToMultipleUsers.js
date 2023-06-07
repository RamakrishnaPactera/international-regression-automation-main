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
  typeText,
  verifyDoesNotExist,
  verifyFirstElementTxt,
  verifyVisible,
  waitSometime,
} from '../../../../../utilities/commonUtils/genericUtils';
const { longWait } = commonData;
const {
  btnMatchAll,
  btnShare,
  txtFieldSharePopupTo,
  btnSharePopupTo,
  btnSharePopupSend,
  errorToFieldCircleExclamation,
  routeNumber,
  btnMatchesCarretIcon,
  linkrouteNumber,
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
  slackUser,
  multipleUsersToSelect,
} = capacityData.userDefinedData;
let routeCodeVal, carrierNameVal;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Send Match deatils for a multiple slack Users Carrier > Capacity tab > Route Object.[ME-110578]', () => {
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

  it('ME-110578 Can I send Match deatils for a Multiple slack Users Carrier > Capacity tab > Match Object | Slack Integration | Regression', {
    tags: [
      '@thirdPartyIntegrationSlack',
      '@carrier',
      '@carrierCapacity',
      '@matchObject',
      '@p1',
      '@phase1',
    ],
  }, () => {
    waitSometime(longWait);
    //Verify sharepop up exist
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
    clickAction({ locator: btnSharePopupTo });
    //Select more than 7 users and verify Circle Exclamation error
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
    verifyToastMsg({ objectType: matchObject });
  });
});