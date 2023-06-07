
/*eslint-disable cypress/no-unnecessary-waiting */
import {
  clickAction,
  clickVisibleElement,
  clickActionWait,
} from '../commonUtils/genericUtils.js';
import commonpage from '../../pageObjects/commonPage/commonPage.json';
const {
  customizeBtn,
  customizeResetBtn,
  customizeSaveBtn,
} = commonpage;
const checkOneColDrag = ({ locator: locatorField, stationaryElement: fixedElement, draggedElement: desiredElement }) => {
  cy.get(`${locatorField}[data-thid='${fixedElement}']`).next().invoke('attr', 'data-thid', desiredElement).should('exist');
};

const checkDragRearrangeOneCol = ({
  locator: locatorField,
  stationaryElement: fixedElement,
  draggedElement: desiredElement,
}) => {
  cy.get(locatorField).contains(fixedElement).parent().next().contains(desiredElement).should('exist');
};

const dragAndDrop = ({ draggedElement: desiredElement, stationaryElement: fixedElement, refElement: referenceEl }) => {
  cy.dragAndDrop(desiredElement, fixedElement, referenceEl);
  cy.wait(3000);
  cy.get(fixedElement).next(desiredElement).should('exist');
};

const dragAndDropScrollIntoView = ({
  draggedElement: desiredElement,
  stationaryElement: fixedElement,
  refElement: referenceEl,
}) => {
  cy.dragAndDropWithScroll(desiredElement, fixedElement, referenceEl);
  cy.wait(3000);
  cy.get(fixedElement).next(desiredElement).should('exist');
};

const resetAndValidateDefaultPosition = ({
  //get source and target array
  parentLocator: parentField,
  childLocator: childField,
  attributeName: attrName,
  contextMenuLocator: contextMenuField,
}) => {
  const modifiedArray = [];
  const defaultArray = [];
  //****get modfiedarray*********written by Kavipriya
  cy.get(parentField)
    .find(childField)
    .each(($ele, index) => {
      const target = $ele.attr(attrName);
      modifiedArray.push(target);
    })
    .then(function () {
      cy.log('modifiedArray length:' + modifiedArray.length);
      //cy.wrap(modifiedArray);
    });
  clickAction({ locator: contextMenuField });
  clickVisibleElement({ locator: customizeBtn });
  clickActionWait({ locator: customizeResetBtn });
  clickActionWait({ locator: customizeSaveBtn });
  //****get defaultArray************
  cy.get(parentField)
    .find(childField)
    .each(($ele, index) => {
      const target = $ele.attr(attrName);
      defaultArray.push(target);
    })
    .then(function () {
      //cy.log("defaultArray.length:" + defaultArray.length);
      isEqual({ modifiedArray, defaultArray });
    });
};

const isEqual = ({
  modifiedArray: arrayModified,
  defaultArray: arrayDefault,
}) => {
  const result = arrayModified.join() === arrayDefault.join();
  //cy.log("result"+result);
  if (result !== true) {
    //cy.log("default position is back "+comparisionResult);
    cy.log('default position is back');
    expect(result).to.equal(false);
  } else {
    expect(result).to.equal(false);
    cy.log('default position is not back ');
  }
  return result;
};

export {
  checkDragRearrangeOneCol,
  checkOneColDrag,
  dragAndDrop,
  dragAndDropScrollIntoView,
  resetAndValidateDefaultPosition,
  isEqual,
};