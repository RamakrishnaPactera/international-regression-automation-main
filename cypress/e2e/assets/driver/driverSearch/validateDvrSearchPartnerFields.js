/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating newly added and updated fields under general and operations tabs in Driver
 Test Cases List
 Authored By : Dasari Santhosh
 Date : 23-03-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : ME-141521 [FE]Driver Search-verify Renamed column "Team Partner" to "Partner"
                      ME-141522 [FE]Driver Search-verify Wire up the column "Partner" to the Partner field in the Professional Information
                      ME-141531 [FE]Driver Search-Remove partner field in card and verify  the column "Partner" in Driver Search results  > Driver > Resources |  Assets - Driver General Tab | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { driverSaveAndVerifyUpdatedMsg, navigateToDriverSearchPage, searchDriverWithCode, verifyDriverSearchResultsRowData } from '../../../../utilities/assetUtils/resourceUtilis';
import { clearText, clickAction, clickActionWait, scrollIntoView, typeDropDwnClick, typeText, verifyToNotExist, verifyVisible, viewFullPage } from '../../../../utilities/commonUtils/genericUtils';
import historyData from '../../../../testData/assets/driver/driverDetails/history/historyData.json';
import driverAddNewPage from '../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import driverCommonPage from '../../../../pageObjects/assets/driver/driverCommonPage.json';
import driverSearchPage from '../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import generalData from '../../../../testData/assets/driver/driverDetails/general/generalData.json';

const { driverCode, partner1, partner2 } = generalData.userDefinedData;
const { emptyString } = historyData.userDefinedData;
const { tabDriverGeneral } = driverCommonPage;
const { txtFieldDriverCode, btnSearchSubmit, linkDriver } = driverSearchPage;
const { txtFieldPartner, rowDataPartner, colHeaderTeamPartner, colHeaderPartner } = driverAddNewPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
describe('Validating driver fields place holders > Driver > Resources [ME-141489,ME-138955,ME-138964,ME-138958]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-141521 [FE]Driver Search-verify Renamed column "Team Partner" to "Partner"  > Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p3',
        '@phase2',
      ],
    },
    () => {
      navigateToDriverSearchPage();
      //validating old column name Team Partner to be not exist and new column partner should be visible
      verifyToNotExist({ element: colHeaderTeamPartner });
      scrollIntoView({ locator: colHeaderPartner });
      verifyVisible({ element: colHeaderPartner });
      //searching existing driver
      typeText({ locator: txtFieldDriverCode, dataText: driverCode });
      clickActionWait({ locator: btnSearchSubmit });
      //validating old column name Team Partner to be not exist and new column partner should be visible
      verifyToNotExist({ element: colHeaderTeamPartner });
      scrollIntoView({ locator: colHeaderPartner });
      verifyVisible({ element: colHeaderPartner });
    });
  it('ME-141522 [FE]Driver Search-verify Wire up the column "Partner" to the Partner field in the Professional Information  > Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode });
      //navigating to general tab and adding partner data
      clickAction({ locator: tabDriverGeneral });
      clearText({ locator: txtFieldPartner });
      typeDropDwnClick({ locator: txtFieldPartner, drpDwnVal: partner1 });//replace these partner data creations once tdm implementation done
      driverSaveAndVerifyUpdatedMsg();
      //verifying partner column data in driver search results table
      verifyDriverSearchResultsRowData({ driverCode, rowDataLocator: rowDataPartner, containsText: partner1 });//replace these partner data creations once tdm implementation done
      //updated partner data
      clickActionWait({ locator: linkDriver });
      clickActionWait({ locator: tabDriverGeneral });
      clearText({ locator: txtFieldPartner });
      typeDropDwnClick({ locator: txtFieldPartner, drpDwnVal: partner2 });//replace these partner data creations once tdm implementation done
      driverSaveAndVerifyUpdatedMsg();
      verifyDriverSearchResultsRowData({ driverCode, rowDataLocator: rowDataPartner, containsText: partner2 });//replace these partner data creations once tdm implementation done
    });
  it('ME-141531 [FE]Driver Search-Remove partner field in card and verify  the column "Partner" in Driver Search results  > Driver > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      searchDriverWithCode({ driverCode });
      //navigating to general tab and adding partner data
      clickAction({ locator: tabDriverGeneral });
      clearText({ locator: txtFieldPartner });
      typeDropDwnClick({ locator: txtFieldPartner, drpDwnVal: partner1 });//replace these driver creations once tdm implementation done
      driverSaveAndVerifyUpdatedMsg();
      //verifying partner column data in driver search results table
      verifyDriverSearchResultsRowData({ driverCode, rowDataLocator: rowDataPartner, containsText: partner1 });//replace these driver creations once tdm implementation done
      //removing partner data from partner field in general tab
      clickActionWait({ locator: linkDriver });
      clickActionWait({ locator: tabDriverGeneral });
      clearText({ locator: txtFieldPartner });
      driverSaveAndVerifyUpdatedMsg();
      //verifying removed partner from driver search results table
      verifyDriverSearchResultsRowData({ driverCode, rowDataLocator: rowDataPartner, containsText: emptyString });
    });
});