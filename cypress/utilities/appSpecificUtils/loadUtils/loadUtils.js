import {
  typeText,
  verifyElementTextContains,
  clickActionWait,
  verifyExists,
  dynamicWindowHandles,
} from '../../commonUtils/genericUtils';
import addLoadPage from '../../../pageObjects/loadPage/addNewPage.json';
import searchLoadPage from '../../../pageObjects/loadPage/searchLoadPage.json';

import { createOrUpdateCustomerOrderV2, searchSeerLoadsRoutesOrdersV2 } from '../../../tdm/lib/networkCalls/loadCalls';
import { getAccessToken } from '../../../tdm/lib/networkCalls/commonCalls';

const { searchTab } = addLoadPage;

const { loadMenuTab, searchBtn, nameFieldLinkInResTableLoad, loadIdTxtBox } = searchLoadPage;

//search Load By Load Number
const searchLoadNumber = ({ loadID: loadNumber }) => {
  verifyExists({ element: loadMenuTab });
  clickActionWait({ locator: loadMenuTab });
  verifyExists({ element: searchTab });
  clickActionWait({ locator: searchTab });
  typeText({ locator: loadIdTxtBox, dataText: loadNumber });
  clickActionWait({ locator: searchBtn });
  verifyElementTextContains({
    locator: nameFieldLinkInResTableLoad,
    verifyText: loadNumber,
  });
  dynamicWindowHandles({ button: loadNumber });
};

const loadStatusUpdateGraphQL = ({
  loadNo: loadID,
  status: StatusName,
  statusReason: StatusReason,
}) => {
  cy.then(() => {
    getAccessToken().then((accessToken) => {
      searchSeerLoadsRoutesOrdersV2({
        bearerToken: accessToken,
        loadId: loadID,
      }).then((response) => {
        const customerId = response?.data?.seerSearchLoadSearchV2?.edges[0].node?.customerId;
        const orderId = response?.data?.seerSearchLoadSearchV2?.edges[0].node?.orderId;
        console.log(JSON.stringify(response));
        createOrUpdateCustomerOrderV2({
          bearerToken: accessToken,
          customerID: customerId,
          orderID: orderId,
          status: StatusName,
          statusReason: StatusReason,
        }).then((response) => {
          console.log(JSON.stringify(response));
        });
      });
    });
  });
};

export {
  loadStatusUpdateGraphQL,
  searchLoadNumber,
};