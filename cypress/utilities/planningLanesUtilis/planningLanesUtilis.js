import planningLanesPage from '../../pageObjects/planningLanesPage/planningLanesPage.json';
import {
  clickAction,
  typeDropDwn,
  verifyIfEnabled,
  verifyToExist,
  waitSometime,
} from '../../utilities/commonUtils/genericUtils';
import { getUploadFileResponse } from '../commonUtils/apiUtils';

const {
  lanesDownloadIcon,
  planLanesMenu,
  planningTab,
  rateQuoteTab,
  routingGuideTab,
  routingGuideUploadIcon,
} = planningLanesPage;
const {
  destinationTxtBx,
  originCityTxtBx,
  searchBtn,
  txtBxLanesFilterCustomer,
} = planningLanesPage.lanesFilter;

const navigateToPlanningLanes = () => {
  clickAction({ locator: planningTab });
  clickAction({ locator: planLanesMenu });
  verifyIfEnabled({ locator: lanesDownloadIcon });
};

const clickRateQuoteTab = () => {
  clickAction({ locator: rateQuoteTab });
};

const clickExportAndVerifyResponseUrl = ({ locator: downloadBtn, resToGet: responseName, urlToVerify: url }) => {
  cy.intercept(responseName).as('networkResponse');
  verifyIfEnabled({ locator: downloadBtn });
  clickAction({ locator: downloadBtn });
  cy.wait('@networkResponse', { timeout: Cypress.env('defaultCommandTimeout') }).then((res) => {
    expect(res.response.url).to.equal(url);
  });
};

const filterLanesWithOriginAndDest = ({ originCity: orgCity, destnationCity: destCity }) => {
  typeDropDwn({ locator: originCityTxtBx, drpDwnVal: orgCity });
  typeDropDwn({ locator: destinationTxtBx, drpDwnVal: destCity });
  clickAction({ locator: searchBtn });
};

const navigateToRoutingGuideTab = () => {
  clickAction({ locator: routingGuideTab });
};

const clickRoutingGuideUploadIcon = () => {
  verifyToExist({ element: routingGuideUploadIcon });
  waitSometime(5000);
  clickAction({ locator: routingGuideUploadIcon });
};

const filterLaneWithCustomerID = ({ customerCode: customerCodeVal }) => {
  typeDropDwn({ locator: txtBxLanesFilterCustomer, drpDwnVal: customerCodeVal });
  clickAction({ locator: searchBtn });
};

const validateUploadedDocStatusInAPIAndDB = ({ url: mongoseUrl, dbName: testdbName, collectionName: testcollectionName, mongosequery: mongoseQryObj, apiURL: uploadApiURL, access_token: accessToken }) => {
  cy.task('mongoseDB', { url: mongoseUrl, dbName: testdbName, collectionName: testcollectionName, mongosequery: mongoseQryObj }).then((mongoseRes) => {
    getUploadFileResponse({ token: accessToken, apiURL: uploadApiURL + Cypress.env('docID') }).then(res => {
      const apiArr = ((res.body).split(/\r?\n/)[1]).split(',');
      const actError = apiArr[apiArr.length - 1];
      expect(mongoseRes.Errors).to.contain(actError);
    });
  });
};

export {
  clickExportAndVerifyResponseUrl,
  clickRateQuoteTab,
  clickRoutingGuideUploadIcon,
  filterLanesWithOriginAndDest,
  filterLaneWithCustomerID,
  navigateToPlanningLanes,
  navigateToRoutingGuideTab,
  validateUploadedDocStatusInAPIAndDB,
};