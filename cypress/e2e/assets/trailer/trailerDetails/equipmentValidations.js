/*---------------------------------------------------------------------------------------------------------------
Test Equipment PopUp in Trailer
Authored By                   : Beemireddy chandra obula reddy
Date                          : 01-06-2023
Functions/Calling References  : genericUtils,resourceUtilis,trailerDetailsData,trailerPage
Test case Included            : [ME-160686],[ME-160689],[ME-160695],[ME-160696],[ME-160699],[ME-160798],[ME-160802],[ME-160808],[ME-160809],[ME-160810],[ME-142707]

----------------------------------------------------------------------------------------------------------*/
import {
  clickAction,
  viewFullPage,
  getMinionValues,
  typeText,
  verifySingleSelectDropDownFunction,
  generateRandomNumber,
  verifyToExist,
  waitSometime,
  scrolltoTop,
  scrollToRight,
  verifyIfEnabled,
  backspaceClear,
  verifyNotContainValue,
  verifyElementValue,
} from '../../../../utilities/commonUtils/genericUtils';

import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { maxWait } from '../../../../testData/staticData/commonData/commonData.json';
import trailerDetailsData from '../../../../testData/assets/trailer/trailerDetailsData.json';
import trailerPage from '../../../../pageObjects/assets/trailer/trailerPage.json';

const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  resourcesMenu,
  trailerNew,
  btnTrailerSave,
  txtFieldTrailerUnitCodeInAddTrailer,
} = trailerPage;

const {

  addEquipmentBtn,
  drpDwnTypeTerm,
  txtDesc,
  txtCount,
  txtAssetId,
  drpDwnCond,
} = trailerPage.equipment;

const {
  minionTrailerEquipCode,
  minionDriverGeneralEquipmentCondition,
  typeInDescription,
  typeInCountOne,
  typeInCount,
  typeInAssetId,
} = trailerDetailsData.staticData;
let drpDwnTrailerGeneralEquipmentCode, drpDwnDriverGeneralEquipmentCondition;
describe('Validating Test Equipment Pop up in Trailer', () => {
  before(() => {
    getMinionValues(minionTrailerEquipCode, 3).then((resultOptions) => {
      drpDwnTrailerGeneralEquipmentCode = resultOptions;
    });
    getMinionValues(minionDriverGeneralEquipmentCondition, 4).then((resultOptions) => {
      drpDwnDriverGeneralEquipmentCondition = resultOptions;
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('[ME-160686],[ME-160798]  Test Equipment Info-Verify the fields under Trailer Equipment Info section are functionally enabled',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      cy.get(resourcesMenu).focus();
      verifyToExist({ element: resourcesMenu });
      clickAction({ locator: resourcesMenu });
      cy.get(trailerNew).focus();
      verifyToExist({ element: trailerNew });
      clickAction({ locator: trailerNew });
      waitSometime(maxWait);
      typeText({ locator: txtFieldTrailerUnitCodeInAddTrailer, dataText: generateRandomNumber() });
      clickAction({ locator: btnTrailerSave });
      waitSometime(maxWait);
      scrolltoTop();
      scrollToRight();
      clickAction({ locator: addEquipmentBtn });
      verifyIfEnabled({ locator: drpDwnTypeTerm });
      drpDwnTrailerGeneralEquipmentCode.unshift('---');
      verifySingleSelectDropDownFunction({ drpDwnEle: drpDwnTypeTerm, drpDwnOptions: drpDwnTrailerGeneralEquipmentCode });
      verifyIfEnabled({ locator: txtDesc });
      clickAction({ locator: txtDesc });
      typeText({ locator: txtDesc, dataText: typeInDescription });
      verifyIfEnabled({ locator: txtCount });
      typeText({ locator: txtCount, dataText: typeInCount });
      verifyIfEnabled({ locator: txtAssetId });
      typeText({ locator: txtAssetId, dataText: typeInAssetId });
      verifyIfEnabled({ locator: drpDwnCond });
      drpDwnDriverGeneralEquipmentCondition.unshift('---');
      verifySingleSelectDropDownFunction({ drpDwnEle: drpDwnCond, drpDwnOptions: drpDwnDriverGeneralEquipmentCondition });
    });

  it('[ME-160689],[ME-160802], [ME-142707]-Test Equipment Info-Verify the Type field is ',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      cy.get(resourcesMenu).focus();
      verifyToExist({ element: resourcesMenu });
      clickAction({ locator: resourcesMenu });
      cy.get(trailerNew).focus();
      verifyToExist({ element: trailerNew });
      clickAction({ locator: trailerNew });
      waitSometime(maxWait);
      typeText({ locator: txtFieldTrailerUnitCodeInAddTrailer, dataText: generateRandomNumber() });
      clickAction({ locator: btnTrailerSave });
      waitSometime(maxWait);
      scrolltoTop();
      scrollToRight();
      clickAction({ locator: addEquipmentBtn });
      verifySingleSelectDropDownFunction({ drpDwnEle: drpDwnTypeTerm, drpDwnOptions: drpDwnTrailerGeneralEquipmentCode });
    });

  it('[ME-160695],[ME-160808]-Test Equipment Info-Verify Count field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      cy.get(resourcesMenu).focus();
      verifyToExist({ element: resourcesMenu });
      clickAction({ locator: resourcesMenu });
      cy.get(trailerNew).focus();
      verifyToExist({ element: trailerNew });
      clickAction({ locator: trailerNew });
      waitSometime(maxWait);
      typeText({ locator: txtFieldTrailerUnitCodeInAddTrailer, dataText: generateRandomNumber() });
      clickAction({ locator: btnTrailerSave });
      waitSometime(maxWait);
      scrolltoTop();
      scrollToRight();
      clickAction({ locator: addEquipmentBtn });
      backspaceClear({ element: txtCount });
      typeText({ locator: txtCount, dataText: typeInCountOne });
      verifyNotContainValue({ element: txtCount, Value: typeInCountOne });
      typeText({ locator: txtCount, dataText: typeInCount });
      verifyElementValue({ locator: txtCount, verifyText: typeInCount });
    });
  it('[ME-160696],[ME-160809]-Test Equipment Info-Verify Asset Id Field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      cy.get(resourcesMenu).focus();
      verifyToExist({ element: resourcesMenu });
      clickAction({ locator: resourcesMenu });
      cy.get(trailerNew).focus();
      verifyToExist({ element: trailerNew });
      clickAction({ locator: trailerNew });
      waitSometime(maxWait);
      typeText({ locator: txtFieldTrailerUnitCodeInAddTrailer, dataText: generateRandomNumber() });
      clickAction({ locator: btnTrailerSave });
      waitSometime(maxWait);
      scrolltoTop();
      scrollToRight();
      clickAction({ locator: addEquipmentBtn });
      typeText({ locator: txtAssetId, dataText: typeInAssetId });
    });
  it('[ME-160699],[ME-160810]-Test Equipment Info-Verify Condition field',
    {
      tags: [
        '@assets',
        '@resources',
        '@trailer',
        '@p2',
      ],
    }, () => {
      cy.get(resourcesMenu).focus();
      verifyToExist({ element: resourcesMenu });
      clickAction({ locator: resourcesMenu });
      cy.get(trailerNew).focus();
      verifyToExist({ element: trailerNew });
      clickAction({ locator: trailerNew });
      waitSometime(maxWait);
      typeText({ locator: txtFieldTrailerUnitCodeInAddTrailer, dataText: generateRandomNumber() });
      clickAction({ locator: btnTrailerSave });
      waitSometime(maxWait);
      scrolltoTop();
      scrollToRight();
      clickAction({ locator: addEquipmentBtn });
      verifySingleSelectDropDownFunction({ drpDwnEle: drpDwnCond, drpDwnOptions: drpDwnDriverGeneralEquipmentCondition });
    });
});