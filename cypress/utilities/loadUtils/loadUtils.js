import capacityPage from '../../pageObjects/carrierPage/detailsPage/capacityPage.json';
import {
  verifyElementTextContains,
} from '../commonUtils/genericUtils.js';

const {
  tblRouteDistanceVal,
  tblRouteEquipmentVal,
  tblRouteOrderWeightVal,
  tblRouteRequirementsVal,
  tblRouteOriginAddressVal,
  tblRoutePUDateVal,
  tblRouteDestinationAddressVal,
  tblRouteDelDateVal,
  labelRouteSharePopupSubTitleVals,
  labelRouteSharePopupPickAndDelVals,
} = capacityPage;
const getRouteTblSharingValue = ({ routeVal: routeCode }) => {
  //Getting Distance
  cy.get(tblRouteDistanceVal).invoke('text').then(distance => {
    Cypress.env('distVal', distance);
  });
  //Getting Equipment
  cy.get(tblRouteEquipmentVal).invoke('text').then(equi => {
    Cypress.env('equiVal', equi);
  });
  //Getting Order Weight
  cy.get(tblRouteOrderWeightVal).invoke('text').then(orderWeight => {
    if (orderWeight === '-') {
      Cypress.env('weightVal', '0 lbs');
    } else {
      Cypress.env('weightVal', orderWeight);
    }
  });
  //Getting Requirements
  cy.get(tblRouteRequirementsVal).invoke('text').then(req => {
    if (req === '-') {
      Cypress.env('reqVal', null);
    } else {
      Cypress.env('reqVal', req);
    }
  });
  //Getting Origin Address
  cy.get(tblRouteOriginAddressVal).invoke('text').then(originAddress => {
    Cypress.env('originAddressVal', originAddress);
  });
  //Getting Pickup Date and pickup time
  cy.get(tblRoutePUDateVal).invoke('text').then(pickUpDate => {
    Cypress.env('pickUpDateVal', pickUpDate.split(' ')[0]);
    Cypress.env('pickUpTimeVal', (pickUpDate.split(' ')[1]) + ' ' + (pickUpDate.split(' ')[2]) + ' ' + (pickUpDate.split(' ')[3]));
  });
  //Getting Destination Address
  cy.get(tblRouteDestinationAddressVal).invoke('text').then(destinationAddress => {
    Cypress.env('destinationAddressVal', destinationAddress);
  });
  //Getting Delivary Date and Time
  cy.get(tblRouteDelDateVal).invoke('text').then(delDate => {
    Cypress.env('delDateVal', delDate.split(' ')[0]);
    Cypress.env('delTimeVal', (delDate.split(' ')[1]) + ' ' + (delDate.split(' ')[2]) + ' ' + (delDate.split(' ')[3]));
  });
  cy.then(() => {
    if (Cypress.env('reqVal') == null) {
      const finalVal = routeCode + '  | ' + Cypress.env('distVal') + ' | ' + Cypress.env('equiVal') + ' | ' + Cypress.env('weightVal');
      Cypress.env('inputValue', finalVal);
    } else {
      const finalVal = routeCode + ' | ' + Cypress.env('distVal') + ' | ' + Cypress.env('equiVal') + ' | ' + Cypress.env('weightVal') + ' | ' + Cypress.env('reqVal');
      Cypress.env('inputValue', finalVal);
    }
  });
};

const verifyRouteSharePopupValues = () => {
  cy.then(() => {
    const routePickAndDelDetails = [
      Cypress.env('originAddressVal'),
      Cypress.env('pickUpDateVal'),
      Cypress.env('pickUpTimeVal'),
      Cypress.env('destinationAddressVal'),
      Cypress.env('delDateVal'),
      Cypress.env('delTimeVal'),
    ];
    verifyElementTextContains({ locator: labelRouteSharePopupSubTitleVals, verifyText: Cypress.env('inputValue') });
    routePickAndDelDetails.forEach((valueToVerify) => {
      verifyElementTextContains({ locator: labelRouteSharePopupPickAndDelVals, verifyText: valueToVerify });
    });
  });
};

export {
  getRouteTblSharingValue,
  verifyRouteSharePopupValues,
};