import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { enterDriverMandatoryFields, navigateToDriverAddNewPage, searchDriverWithCode, driverSaveAction } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickActionWait, viewFullPage, verifyReadOnly, selectItemFrmSrchPicker, toastWithMsg, verifyIfDisabled, validateNullVal } from '../../../../../utilities/commonUtils/genericUtils';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import driverAddNewPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';

const { permanentPower, permanentTrailer } = addDriverData.staticData;
const { boolValueTrue } = historyData.userDefinedData;
const {
  msgUpdated,
} = addDriverData.expectedData;
const {
  assignedPower,
  txtfieldPermanentPower,
  tabPermanantTrailer,
  assignedTrailer,
} = driverAddNewPage;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
describe('Validating Permanent Power and trailer fields [ME-133952][ME-157839][ME-157839]', () => {
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-133952 Validating read Only Fields of Permanent Power > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      const { driverCode } = enterDriverMandatoryFields();
      clickActionWait({ locator: txtfieldPermanentPower });
      selectItemFrmSrchPicker({ locator: txtfieldPermanentPower, typeText: permanentPower });
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      searchDriverWithCode({ driverCode });
      verifyReadOnly({ locator: assignedPower, condition: boolValueTrue });
    });
  it('ME-157839 Validating Permanent Trailer > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      const { driverCode } = enterDriverMandatoryFields();
      clickActionWait({ locator: tabPermanantTrailer });
      selectItemFrmSrchPicker({ locator: tabPermanantTrailer, typeText: permanentTrailer });
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      searchDriverWithCode({ driverCode });
      verifyIfDisabled({ locator: assignedTrailer });
    });
  it('ME-157839 Validating Permanent power and trailer with null value > Resources |  Assets - Driver General Tab | Regression',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p3',
      ],
    },
    () => {
      navigateToDriverAddNewPage();
      const { driverCode } = enterDriverMandatoryFields();
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      searchDriverWithCode({ driverCode });
      validateNullVal({ locator: assignedPower });
      validateNullVal({ locator: assignedTrailer });
    });
});