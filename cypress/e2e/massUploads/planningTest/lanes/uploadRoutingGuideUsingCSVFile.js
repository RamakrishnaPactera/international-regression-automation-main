/*eslint-disable cypress/no-unnecessary-waiting */
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import flatFileModelPopupPage from '../../../../pageObjects/flatFileModelPopupPage/flatFileModelPopupPage.json';
import { getAccessToken } from '../../../../utilities/commonUtils/apiUtils';
import { getTestData } from '../../../../utilities/tdmUtils/tdmUtils';
import planningLanesPage from '../../../../pageObjects/planningLanesPage/planningLanesPage.json';
import commonData from '../../../../testData/staticData/commonData/commonData.json';
import planningLanesData from '../../../../testData/planningLanesData/planningLanesData.json';
import {
  navigateToRoutingGuideTab,
  clickRoutingGuideUploadIcon,
  navigateToPlanningLanes,
  filterLaneWithCustomerID,
  validateUploadedDocStatusInAPIAndDB,
} from '../../../../utilities/planningLanesUtilis/planningLanesUtilis';
import {
  uploadCSVFileIntoFlatFileModelPopup,
} from '../../../../utilities/flatFileModelPopupUtils/flatFileModelPopupUtils';
import {
  clickAction,
  readFileAndreplaceFileValue,
  verifyDoesNotExist,
  verifyText,
  viewFullPage,
  writeTextIntoFile,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';

const {
  colValueLanesID,
  colValueRoutingGuideCustomer,
} = planningLanesPage;

const {
  longWait,
  moreWait,
} = commonData;

const {
  routingGuideIFrame,
} = flatFileModelPopupPage;

const {
  validFilepath,
  invalidFilepath,
  validAndInvalidDataFilePath,
  targetFile,
  apiURL,
} = planningLanesData;

const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  mongoseUrl,
} = Cypress.env('endPointUrl')[Cypress.env('environment')];

let accessToken, customerNameVal1, customerCodeVal1, customerCodeVal2, customerNameVal3, customerCodeVal3;
const testdbName = 'csvfilestorage';
const testcollectionName = 'RGValidated';

describe('Upload file valid and invalid data for Routing Guide [ME-131636,ME-131638,ME-131641]', () => {
  before(() => {
    cy.log('***Creating Customer***');
    const data = 'customer';
    const dataReq = 'addCustomer';
    const scenario = 'customerCommon';
    getTestData({ dataType: data, dataCondition: dataReq, dataScenario: scenario }).then((runtimeData) => {
      cy.log(JSON.stringify(runtimeData));
      customerNameVal1 = runtimeData.customerName;
      customerCodeVal1 = runtimeData.customerCode;
    });
    getTestData({ dataType: data, dataCondition: dataReq, dataScenario: scenario }).then((runtimeData) => {
      cy.log(JSON.stringify(runtimeData));
      customerCodeVal2 = runtimeData.customerCode;
    });
    getTestData({ dataType: data, dataCondition: dataReq, dataScenario: scenario }).then((runtimeData) => {
      cy.log(JSON.stringify(runtimeData));
      customerNameVal3 = runtimeData.customerName;
      customerCodeVal3 = runtimeData.customerCode;
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
  });

  it('ME-131636 : Can user is able to Upload Valid Lane & RG records from CSV file  and get the Uploaded Lanes & RG records on UI > Planning tab > Lanes > RoutingGuides | Hercules | Regression', {
    tags: [
      '@massUploads',
      '@planning',
      '@lanes',
      '@routingGuide',
      '@p1',
      '@phase2',
    ],
  }, () => {
    //Upload valid file in planning lanes tab
    readFileAndreplaceFileValue({ readFilePath: validFilepath, searchValue: '{{Customer_Code}}', newValue: customerCodeVal1 });
    cy.then(() => {
      writeTextIntoFile({ writeFilePath: targetFile, textToWrite: Cypress.env('updatedValue') });
    });
    navigateToPlanningLanes();
    navigateToRoutingGuideTab();
    clickRoutingGuideUploadIcon();
    uploadCSVFileIntoFlatFileModelPopup({ locator: routingGuideIFrame, fileName: targetFile });
    //Providing hardcode wait due to lane creation is taking time.
    cy.wait(60000).then(() => {
      viewFullPage();
      filterLaneWithCustomerID({ customerCode: customerCodeVal1 });
      clickAction({ locator: colValueLanesID });
      waitSometime(moreWait);
      navigateToRoutingGuideTab();
      waitSometime(longWait);
      //Verify lane got created with uploaded file
      verifyText({ locator: colValueRoutingGuideCustomer, verifyText: customerNameVal1 });
    });
  });
  it('ME-131638 : Can user is able to Upload Invalid Lane & RG records from CSV file  and get the Error response in MongoDB & API > Planning tab > Lanes > RoutingGuides | Hercules | Regression', {
    tags: [
      '@massUploads',
      '@planning',
      '@lanes',
      '@routingGuide',
      '@p1',
      '@phase2',
    ],
  }, () => {
    //Upload inValid file in planning lanes tab
    readFileAndreplaceFileValue({ readFilePath: invalidFilepath, searchValue: '{{Customer_Code}}', newValue: customerCodeVal1 });
    cy.then(() => {
      writeTextIntoFile({ writeFilePath: targetFile, textToWrite: Cypress.env('updatedValue') });
    });
    navigateToPlanningLanes();
    navigateToRoutingGuideTab();
    clickRoutingGuideUploadIcon();
    uploadCSVFileIntoFlatFileModelPopup({ locator: routingGuideIFrame, fileName: targetFile });
    getAccessToken().then((token) => {
      accessToken = token;
    });
    //Providing hardcode wait due to lane creation is taking time.
    cy.wait(60000).then(() => {
      viewFullPage();
      filterLaneWithCustomerID({ customerCode: customerCodeVal2 });
      //Verify lane not created
      verifyDoesNotExist({ element: colValueLanesID });
      //Validate file status in DB and API
      cy.then(() => {
        const genDocID = Cypress.env('docID') + '_1';
        const mongoseQryObj = {
          _id: genDocID,
        };
        //Validate invalid data record file status in DB and API
        validateUploadedDocStatusInAPIAndDB({ url: mongoseUrl, dbName: testdbName, collectionName: testcollectionName, mongosequery: mongoseQryObj, apiURL, access_token: accessToken });
      });
    });
  });
  it('ME-131641 : Can user  is able to Upload the  Valid and Invalid Lane & RG records from CSV file  and get the  valid records on UI and get the Error response for Invalid Data> Planning tab > Lanes > RoutingGuides | Hercules | Regression', {
    tags: [
      '@massUploads',
      '@planning',
      '@lanes',
      '@routingGuide',
      '@p1',
      '@phase2',
    ],
  }, () => {
    //Upload valid and inValid file in planning lanes tab
    readFileAndreplaceFileValue({ readFilePath: validAndInvalidDataFilePath, searchValue: '{{Customer_Code}}', newValue: customerCodeVal3 });
    cy.then(() => {
      writeTextIntoFile({ writeFilePath: targetFile, textToWrite: Cypress.env('updatedValue') });
    });
    navigateToRoutingGuideTab();
    clickRoutingGuideUploadIcon();
    uploadCSVFileIntoFlatFileModelPopup({ locator: routingGuideIFrame, fileName: targetFile });
    getAccessToken().then((token) => {
      accessToken = token;
    });
    //Providing hardcode wait due to lane creation is taking time.
    cy.wait(60000).then(() => {
      viewFullPage();
      filterLaneWithCustomerID({ customerCode: customerCodeVal3 });
      clickAction({ locator: colValueLanesID });
      waitSometime(moreWait);
      navigateToRoutingGuideTab();
      waitSometime(longWait);
      //Verify lane got created for valid data with uploaded file
      verifyText({ locator: colValueRoutingGuideCustomer, verifyText: customerNameVal3 });
      const genDocID = Cypress.env('docID') + '_2';
      const mongoseQryObj = {
        _id: genDocID,
      };
      //Validate invalid data record file status in DB and API
      validateUploadedDocStatusInAPIAndDB({ url: mongoseUrl, dbName: testdbName, collectionName: testcollectionName, mongosequery: mongoseQryObj, apiURL, access_token: accessToken });
    });
  });
});