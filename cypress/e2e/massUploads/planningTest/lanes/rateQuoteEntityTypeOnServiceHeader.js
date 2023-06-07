import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import planningLanesPage from '../../../../pageObjects/planningLanesPage/planningLanesPage.json';
import planningLanesData from '../../../../testData/planningLanesData/planningLanesData.json';
import { waitSometime } from '../../../../utilities/commonUtils/genericUtils';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import {
  navigateToPlanningLanes,
  clickRateQuoteTab,
  clickExportAndVerifyResponseUrl,
  filterLanesWithOriginAndDest,
} from '../../../../utilities/planningLanesUtilis/planningLanesUtilis';
const {
  rateQuoteDownloadIcon,
} = planningLanesPage;
const {
  atlantaGACity,
  rateQuoteUrlPart1,
  rateQuoteUrlPart2,
  rateQuote,
} = planningLanesData;
const {
  shortWait,
} = commonData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const rateQuoteUrl = rateQuoteUrlPart1 + Cypress.env('environment') + rateQuoteUrlPart2;
describe('verify Rate Quotes export entity type request > Planning tab > Lanes > RateQuotes [ME-122133]', () => {
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
  });

  it('ME-122133 : Can user verify Rate Quote export entity type request as Rate Quote > Planning tab > Lanes > RateQuotes | Hercules | Regression', {
    tags: [
      '@massUploads',
      '@planning',
      '@lanes',
      '@rateQuote',
      '@p1',
      '@phase1',
    ],
  }, () => {
    cy.log('***Verify Rate Quote export entity type request as Rate Quote***');
    navigateToPlanningLanes();
    filterLanesWithOriginAndDest({ originCity: atlantaGACity, destnationCity: atlantaGACity });
    waitSometime(shortWait);
    clickRateQuoteTab();
    clickExportAndVerifyResponseUrl({ locator: rateQuoteDownloadIcon, resToGet: rateQuote, urlToVerify: rateQuoteUrl });
  });
});