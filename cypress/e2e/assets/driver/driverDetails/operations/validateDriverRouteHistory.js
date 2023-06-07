/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Test Driver's Route History - UI Component : Functional and UI Testcases
Test Cases List
Authored By : Shashi Jaiswal
Date : 17-05-2023,
Functions/Calling References : genericUtils, loginUtils, resourceUtils
Test case Included:
ME-156193 : Verify the Driver Route History Details
ME-35794,ME-156571  : Test Driver's Route History - UI Component : Functional and UI Testcases
ME-35794  : Test Driver's Route History - UI Component : Functional and UI Testcases
ME-137502 : Driver's Route History - UI Component : Regression Functional and UI Testcases
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { verifyAttrValueContains, verifyVisible, viewFullPage, getTDMData, clickAction, scrollToRight, scrollIntoView, verifyText } from '../../../../../utilities/commonUtils/genericUtils';
import operationsPage from '../../../../../pageObjects/assets/driver/driverDetails/operations/operationsPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';

const { tdmDriverCommonScenario, tdmDriverData, tdmAddDriverReq, isEmptyAttr, titleAttr, boolTrue } = addDriverData.staticData;
const { routeList } = operationsPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;

describe('Test Drivers Route History - UI Component : Functional and UI Testcases [ME-137502]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });

  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('ME-156193, ME-137502- Verify the Driver Route History Details',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //navigate to route list tab
      clickAction({ locator: routeList.btnRoutLst });
      //Verify data grid columns
      verifyVisible({ element: routeList.routeHash });
      verifyVisible({ element: routeList.ras });
      verifyVisible({ element: routeList.rlc });
      verifyVisible({ element: routeList.routeSeq });
      verifyVisible({ element: routeList.customer });
      verifyVisible({ element: routeList.puDate });
      verifyVisible({ element: routeList.shipper });
      verifyVisible({ element: routeList.orgCity });
      verifyVisible({ element: routeList.ost });
      verifyVisible({ element: routeList.dist });
      verifyVisible({ element: routeList.stops });
      scrollIntoView({ locator: routeList.totalCost });
      scrollToRight();
      verifyVisible({ element: routeList.consignee });
      verifyVisible({ element: routeList.destCity });
      verifyVisible({ element: routeList.dst });
      verifyVisible({ element: routeList.delDate });
      verifyVisible({ element: routeList.fleet });
      verifyVisible({ element: routeList.power });
      verifyVisible({ element: routeList.trailer });
      verifyVisible({ element: routeList.totalCost });
    });

  it('ME-35794,ME-156571 Test Drivers Route History - UI Component : Functional and UI Testcases',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to route list tab
      clickAction({ locator: routeList.btnRoutLst });
      //Verify input fields are blank
      verifyText({ locator: routeList.txtRoute, verifyText: '' });
      verifyAttrValueContains({ locator: routeList.drpDwnRas, attribute: isEmptyAttr, verifyText: boolTrue });
      verifyAttrValueContains({ locator: routeList.drpDwnRlc, attribute: isEmptyAttr, verifyText: boolTrue });
      verifyAttrValueContains({ locator: routeList.drpDwnRouteSeq, attribute: isEmptyAttr, verifyText: boolTrue });
      verifyAttrValueContains({ locator: routeList.txtCustomer, attribute: titleAttr, verifyText: '' });
      verifyText({ locator: routeList.txtShipper, verifyText: '' });
      verifyText({ locator: routeList.txtPuDate, verifyText: '' });
      verifyText({ locator: routeList.txtOrgCity, verifyText: '' });
      verifyAttrValueContains({ locator: routeList.drpDwnOst, attribute: titleAttr, verifyText: '' });
      verifyText({ locator: routeList.txtDist, verifyText: '' });
      verifyText({ locator: routeList.txtStops, verifyText: '' });
      verifyText({ locator: routeList.txtConsignee, verifyText: '' });
      verifyText({ locator: routeList.txtDestCity, verifyText: '' });
      verifyAttrValueContains({ locator: routeList.drpDwnDst, attribute: titleAttr, verifyText: '' });
      verifyText({ locator: routeList.txtDelDate, verifyText: '' });
      verifyAttrValueContains({ locator: routeList.drpDwnFleet, attribute: titleAttr, verifyText: '' });
      verifyText({ locator: routeList.txtPower, verifyText: '' });
      verifyText({ locator: routeList.txtTrailer, verifyText: '' });
      verifyText({ locator: routeList.txtTotalCost, verifyText: '' });
    });
});