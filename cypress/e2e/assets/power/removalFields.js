/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Create and check Removal fields are there under General Tab in Power//
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 14-03-2023,
 Functions/Calling References  : homePagePower, dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils
 Test case Included            : [ME-133339] Verify the removal of in a.fleet b.Permanent Drivers, c.Permanent Trailers d.owner e.legal to Run in Power pages > Resources |  Assets - Power | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import powerDetails from '../../../pageObjects/assets/power/powerDetails/powerDetailsPage.json';
import {
  clickAction,
  viewFullPage,
} from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  tabsInOperationalDetailsCard,
} from '../../../utilities/assetUtils/resourceUtilis';
import {
  resourcesMenu,
} from '../../../pageObjects/homePage/homePage.json';
const {
  btnAddPower,
} = powerDetails;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

describe('Verify the removal of in a.fleet b.Permanent Drivers, c.Permanent Trailers d.owner e.legal to Run in Power pages [ME-133339]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('[ME-133339] Verify the removal of in a.fleet b.Permanent Drivers, c.Permanent Trailers d.owner e.legal to Run in Power pages > Resources |  Assets - Power | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@power',
        '@p2',
        '@phase2',
      ],
    }, () => {
      clickAction({ locator: resourcesMenu });
      clickAction({ locator: btnAddPower });
      tabsInOperationalDetailsCard();
    });
});