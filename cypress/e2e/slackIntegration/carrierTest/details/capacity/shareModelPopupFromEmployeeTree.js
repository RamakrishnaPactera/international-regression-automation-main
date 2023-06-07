import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import capacityData from '../../../../../testData/slackIntegration/carrierData/details/capacity/capacityData.json';
import capacityPage from '../../../../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import { verifySharePopupFields, verifyToastMsg } from '../../../../../utilities/carrierUtils/carrierUtils';
import {
  clearTypeEnter,
  clickAction,
  clickFirstElementIn,
  selectItemFromDropDownByTyping,
  selectDropDownTypeButtonList,
  verifyDoesNotExist,
  verifyExists,
  verifyText,
  verifyTextContains,
  typeText,
} from '../../../../../utilities/commonUtils/genericUtils';

const {
  btnSharePopupSend,
  btnSharePopupCloseIcon,
  titleSharePopup,
} = capacityPage;
const {
  iconSidebarChat,
  dialogPopupSidebarShareModel,
  drpdwnSidebarSearchType,
  txtFieldShareMsgNote,
  txtFieldSidebarRepSearch,
  titleSidebarLoggedInUserName,
  btnSidebarShareModelPopupTo,
} = homePage.quickSearch;

const {
  messageText,
  slackUser,
} = capacityData.userDefinedData;
const {
  shareMessageTitle,
} = capacityData.expectedData;
const {
  sidebarRepSearchType,
  txtMessage,
} = capacityData.staticData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('share slack message in HomePage > Employee Tree [ME-115593]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
  });

  it('ME-115593 Can I share slack message from modal pop-up in HomePage > Employee Tree | Slack Integration | Regression', {
    tags: [
      '@thirdPartyIntegrationSlack',
      '@employeeTree',
      '@p2',
      '@phase1',
    ],
  }, () => {
    //Verify chat icon should be available next to the logged in users name.
    verifyExists({ element: iconSidebarChat });
    //Verify Share model popup is open
    clickFirstElementIn({ locator: iconSidebarChat });
    verifyExists({ element: dialogPopupSidebarShareModel });
    verifyText({ locator: titleSharePopup, verifyText: shareMessageTitle });
    //Verify To field,Note field,word counter,send button,x button should be visible
    verifySharePopupFields();
    //Verify after click on X icon share popup should close
    clickAction({ locator: btnSharePopupCloseIcon });
    verifyDoesNotExist({ element: dialogPopupSidebarShareModel });
    //Verify after selecting another user instead of Logged in user selected user should be available
    selectDropDownTypeButtonList({ locator: drpdwnSidebarSearchType, dropdownVal: sidebarRepSearchType });
    clearTypeEnter({ element: txtFieldSidebarRepSearch, typeText: slackUser });
    verifyTextContains({ locator: titleSidebarLoggedInUserName, containsText: slackUser });
    //Verify selected user should be available in To field popup
    clickFirstElementIn({ locator: iconSidebarChat });
    verifyTextContains({ locator: btnSidebarShareModelPopupTo, containsText: slackUser });
    selectItemFromDropDownByTyping({ locator: btnSidebarShareModelPopupTo, drpDwnVal: slackUser });
    typeText({ locator: txtFieldShareMsgNote, dataText: messageText });
    clickAction({ locator: btnSharePopupSend });
    verifyToastMsg({ objectType: txtMessage });
  });
});