/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Validating observations card
 Test Cases List
 Authored By : Mamatha Polapalli, Jyothi Prasad
 Date : 09-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included : [ME-97544][ME-97545] : [FE]validate observations table UI validations > Driver > Resources > History
                    : ME-90720, ME-92911 Verify Close icon (X) in Add Training popup > Driver > Resources |  Assets - Driver | Regression
                    : ME-92908, ME-92909, ME-92910 Verify disply columns in UI of default and Expand View > Driver > Resources |  Assets - Driver | Regression
                    : ME-92912 Verify Display CARROT icon in the UI  Driver Asset in default and Expand View > Driver > Resources |  Assets - Driver | Regression
                    : ME-92914, ME-155687 Verify Save functionality of the Training card in the Default and Expand View > Driver > Resources |  Assets - Driver | Regression
                    : ME-92915 Verify Update/Edit functionality of the Training card in the Default and Expand View > Driver > Resources |  Assets - Driver | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import * as resourceUtilis from '../../../../../utilities/assetUtils/resourceUtilis';
import * as genericUtils from '../../../../../utilities/commonUtils/genericUtils';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import * as driverSearchPage from '../../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import * as historyPage from '../../../../../pageObjects/assets/driver/driverDetails/history/historyPage.json';
const {
  tdmAddDriverReq,
  tdmDriverData,
  tdmDriverCommonScenario,
} = historyData.staticData;

const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM, drpDwnTypeOptions1, drpDwnTypeOptions2, drpDwnTypeOptions3, drpDwnTypeOptions4;
describe('UI validations of observations table > Driver > Resources [ME-97544][ME-97545][ME-90720][ME-92911][ME-92908][ME-92909][ME-92910][ME-92912][ME-92914][ME-155687][ME-92915]', () => {
  beforeEach(() => {
    genericUtils.getMinionValues(historyData.staticData.minionDrpDwnType, 7).then((resultOptions) => {
      drpDwnTypeOptions1 = resultOptions[0];
      drpDwnTypeOptions2 = resultOptions[1];
      drpDwnTypeOptions3 = resultOptions[2];
      drpDwnTypeOptions4 = resultOptions[3];
    });
    cy.log('***creating driver using TDM***');
    genericUtils.getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.then(() => {
      genericUtils.viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
      resourceUtilis.searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
    });
    genericUtils.verifyToExist({ element: driverSearchPage.txtDriverName });
    genericUtils.clickAction({ locator: historyPage.tabDriverHistory });
    genericUtils.verifyToExist({ element: historyPage.tblTraining });
  });
  it('[ME-97544,ME-97545,ME-137688] : [FE]can user verify observations table UI validations > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      genericUtils.verifyExists({ element: historyPage.tabObservations });
      resourceUtilis.verifyObservationTableToBeBlank();
    });

  it('ME-90720, ME-92911 Verify Close icon (X) in Add Training popup > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //Verifying close button in default view
      genericUtils.clickAction({ locator: historyPage.btnTrainingAddNew });
      genericUtils.verifyTextContains({ locator: historyPage.lblAddNewTraining, containsText: historyData.staticData.titleAddNewTrainingDialog });
      genericUtils.clickAction({ locator: historyPage.btnDialogClose });
      genericUtils.verifyDoesNotExist({ element: historyPage.lblAddNewTraining });
      //Verifying close button in Expand view
      resourceUtilis.openTrainingTblExpandView();
      genericUtils.clickAction({ locator: historyPage.btnTrainingAddNew });
      genericUtils.verifyTextContains({ locator: historyPage.lblAddNewTraining, containsText: historyData.staticData.titleAddNewTrainingDialog });
      genericUtils.clickLastElementIn({ locator: historyPage.btnDialogClose });
      genericUtils.verifyDoesNotExist({ element: historyPage.lblAddNewTraining });
    });

  it('ME-92908, ME-92909, ME-92910 Verify disply columns in UI of default and Expand View > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //Verifying table column headers
      genericUtils.verifyTextContains({ locator: historyPage.tblTraining, containsText: historyData.staticData.tblTitle });
      genericUtils.verifyTableColumnsHeaders({ locator: historyPage.tblHeaderColumns, columnNames: historyData.staticData.columnHeaderTraining });
      //Verifying kebab menu on default view
      const maxRowCount = 2;
      resourceUtilis.addTrainingWithMaxRowCount({ typeDrpDwnVal: drpDwnTypeOptions1, viewOfTable: historyData.userDefinedData.defaultView, maxRowCount });
      //Verifying kebab menu on expanded view
      resourceUtilis.openTrainingTblExpandView();
      resourceUtilis.addTrainingWithMaxRowCount({ typeDrpDwnVal: drpDwnTypeOptions2, viewOfTable: historyData.userDefinedData.expandView, maxRowCount });
    });

  it('ME-92912 Verify Display CARROT icon in the UI  Driver Asset in default and Expand View > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //Verifying carrot button in default view
      genericUtils.verifyTextContains({ locator: historyPage.tblTraining, containsText: historyData.staticData.tblTitle });
      genericUtils.verifyVisible({ element: historyPage.drpdwnCarrotBtnTraining });
      //Veriyfing carrot button in expanded view
      resourceUtilis.openTrainingTblExpandView();
      genericUtils.verifyTextContains({ locator: historyPage.tblTrainingInExpandView, containsText: historyData.staticData.tblTitle });
      genericUtils.verifyVisible({ element: historyPage.drpdwnCarrotBtnTrainingInExpand });
    });

  it('ME-92914, ME-155687, ME-92915 Verify Save and Edit functionality of the Training card in the Default and Expand View > Driver > Resources |  Assets - Driver | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@p2',
      ],
    },
    () => {
      //Verifying save functionality in default view
      const maxRowCount = 1;
      resourceUtilis.addTrainingWithMaxRowCount({ typeDrpDwnVal: drpDwnTypeOptions1, viewOfTable: historyData.userDefinedData.defaultView, maxRowCount });
      resourceUtilis.editTrainingWithMandatoryFields({ drpDwnType: drpDwnTypeOptions2 });
      genericUtils.toastMsg();
      genericUtils.verifyAttrText({ locator: historyPage.rowTrainingTblTypeColumnVal, attribute: historyData.staticData.attrTitle, verifyText: drpDwnTypeOptions2 });
      //Verifying save functionality in expanded view
      resourceUtilis.openTrainingTblExpandView();
      resourceUtilis.addTrainingWithMaxRowCount({ typeDrpDwnVal: drpDwnTypeOptions3, viewOfTable: historyData.userDefinedData.expandView, maxRowCount });
      resourceUtilis.editTrainingWithMandatoryFields({ drpDwnType: drpDwnTypeOptions4 });
      genericUtils.toastMsg();
    });
});