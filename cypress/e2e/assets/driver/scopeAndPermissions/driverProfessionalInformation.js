import * as genericUtils from '../../../../utilities/commonUtils/genericUtils';
import * as resourceUtilis from '../../../../utilities/assetUtils/resourceUtilis';
import * as addDriverData from '../../../../testData/assets/driver/addDriver/addDriverData.json';
import historyData from '../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as addDriverPage from '../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import generalData from '../../../../testData/assets/driver/driverDetails/general/generalData.json';
import driverCommonPage from '../../../../pageObjects/assets/driver/driverCommonPage.json';

const assetsNoScopeUserPassword = Cypress.env(`assetsNoScopeUserPassword${Cypress.env('environment')}`);
const assetsEditOnlyUserPassword = Cypress.env(`assetsEditOnlyUserPassword${Cypress.env('environment')}`);
const assetsReadOnlyUserPassword = Cypress.env(`assetsReadOnlyUserPassword${Cypress.env('environment')}`);
const { cards } = driverCommonPage;
const { colorCodeGrey } = generalData.expectedData;
const { tdmAddDriverReq, tdmDriverCommonScenario, tdmDriverData } = historyData.staticData;
let driverDataTDM;

describe('Verify Driver General tab Details with user scope/permission ME-138155, ME-138162, ME-138146', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    genericUtils.getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    cy.then(() => {
      genericUtils.viewFullPage();
    });
  });

  it('ME-138169 Verify user is able to view and edit professional information card when user have scope/permission to Edit only but not view | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverProfessionalInformation', '@p1'],
    },
    () => {
      //Creating a Driver
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsEditOnlyUser, passwordText: assetsEditOnlyUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: cards.profInfo });
      //Search Driver
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: cards.profInfo });
    });

  it('ME-141385 Verify user is able to view professional information card when user have scope/permission to view only while creating a driver | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverProfessionalInformation', '@p1'],
    },
    () => {
      //Creating a Driver
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsReadOnlyUser, passwordText: assetsReadOnlyUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyElementTextContains({ locator: addDriverPage.professionalInformationTab.titleProfessionalInformation, verifyText: addDriverData.userDefinedData.titleProfessionalInformationValue });
      genericUtils.verifyAttrValueContains({ locator: addDriverPage.professionalInformationTab.drpDwnType, attribute: addDriverData.staticData.attributeDataReadonly, verifyText: true });
      genericUtils.verifyBackGroundColour({ locator: addDriverPage.professionalInformationTab.drpDwnType, colourValue: colorCodeGrey });
      //Search Driver
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyElementTextContains({ locator: addDriverPage.professionalInformationTab.titleProfessionalInformation, verifyText: addDriverData.userDefinedData.titleProfessionalInformationValue });
      genericUtils.verifyAttrValueContains({ locator: addDriverPage.professionalInformationTab.drpDwnType, attribute: addDriverData.staticData.attributeDataReadonly, verifyText: true });
      genericUtils.verifyBackGroundColour({ locator: addDriverPage.professionalInformationTab.drpDwnType, colourValue: colorCodeGrey });
    });

  it('ME-138194 Verify user is able to Edit data in professional information card when user dont have scope/permission to Edit or view | Assets - Driver',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverProfessionalInformation', '@p1'],
    },
    () => {
      //Creating a Driver
      genericUtils.loginWithEmailAndPassword({ emailText: addDriverData.userDefinedData.assetsNoScopeUser, passwordText: assetsNoScopeUserPassword });
      resourceUtilis.navigateToDriverAddNewPage();
      genericUtils.verifyDoesNotExist({ element: cards.profInfo });
      //Search Driver
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      genericUtils.clickAction({ locator: addDriverPage.tabDriverGeneral });
      genericUtils.verifyDoesNotExist({ element: cards.profInfo });
    });
});