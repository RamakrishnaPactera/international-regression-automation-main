import {
  addNewEquipmentCardInPower,
  navigateToAddPowerNewPage,
} from '../../../utilities/assetUtils/resourceUtilis';
import {
  clickAction,
  typeText,
  viewFullPage,
  verifyTxtInTextBox,
  generateRandomNumberByLength,
} from '../../../utilities/commonUtils/genericUtils';
import powerData from '../../../testData/assets/power/powerDetails/powerData.json';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
const {
  btnEquipmentAddNew,
  txtFieldCountInEqpmnt,
  maintenanceKebabMenu,
  menuOptionEditInKebab,
  btnAddEqpmnt,
} = powerDetails;
const {
  dayCountValDef,
} = powerData.staticDataPower;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Add a record in power with Equipment[ME-133333,ME-133335]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-79432 Verify that is user is able to view count field value defaulted to "0" in Equipment Card  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      clickAction({ locator: btnEquipmentAddNew });
      clickAction({ locator: txtFieldCountInEqpmnt });
      verifyTxtInTextBox({ locator: txtFieldCountInEqpmnt, verifyText: dayCountValDef });
    });
  it('ME-79438, ME-79445 : Verify that is user is able to Add new value to Count field for Equipment  Card view count field value defaulted to "0" for editing an Equipment Card  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      clickAction({ locator: btnEquipmentAddNew });
      clickAction({ locator: txtFieldCountInEqpmnt });
      verifyTxtInTextBox({ locator: txtFieldCountInEqpmnt, verifyText: dayCountValDef });
      addNewEquipmentCardInPower();
    });
  it('ME-79444, ME-79449: Verify that is user is able to edit exisiting Count field for Equipment  Card view count field value defaulted to "0" for editing an Equipment Card  > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
      ],
    }, () => {
      navigateToAddPowerNewPage();
      addNewEquipmentCardInPower();
      clickAction({ locator: maintenanceKebabMenu });
      clickAction({ locator: menuOptionEditInKebab });
      clickAction({ locator: txtFieldCountInEqpmnt });
      typeText({ locator: txtFieldCountInEqpmnt, dataText: generateRandomNumberByLength({ lengthOfNum: 1 }) });
      clickAction({ locator: btnAddEqpmnt });
    });
});