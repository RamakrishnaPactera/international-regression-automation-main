import homePage from '../../pageObjects/homePage/homePage.json';
import {
  verifyElementTextContains,
} from '../commonUtils/genericUtils.js';

const {
  labelSharePopupDetails,
  tblTruckDistanceVal,
  tblTruckReadyCityVal,
  tblTruckODHVal,
  tblTruckDateVal,
  tblTruckEquipmentVal,
  tblTruckTimeVal,
} = homePage.capacityTab;

//const {
//iconsRouteOrigin,
//iconsRouteDestination,
//iconsTruckOrigin,
//} = homePage.myMatches;

const getTruckCapacityTableValues = () => {
  //Getting Distance
  cy.get(tblTruckDistanceVal).invoke('text').then(distance => {
    Cypress.env('distVal', distance);
  });
  //Getting Origin Address
  cy.get(tblTruckReadyCityVal).invoke('text').then(originCity => {
    Cypress.env('originCityVal', originCity);
  });
  //Getting Order Weight
  cy.get(tblTruckODHVal).invoke('text').then(truckODH => {
    Cypress.env('ODHVal', truckODH);
  });
  cy.get(tblTruckDateVal).invoke('text').then(readyDate => {
    Cypress.env('readyDateVal', readyDate);
  });
  cy.get(tblTruckTimeVal).invoke('text').then(readyTime => {
    Cypress.env('readyTimeVal', readyTime);
  });
  //Getting Equipment
  cy.get(tblTruckEquipmentVal).invoke('text').then(equi => {
    Cypress.env('equiVal', equi);
  });
  //Getting Pickup Date and pickup time
  cy.then(() => {
    if (Cypress.env('reqVal') == null) {
      const finalVal = Cypress.env('equiVal') + ' | ' + Cypress.env('weightVal');
      Cypress.env('inputValue', finalVal);
    } else {
      const finalVal = Cypress.env('equiVal') + ' | ' + Cypress.env('weightVal') + ' | ' + Cypress.env('reqVal');
      Cypress.env('inputValue', finalVal);
    }
  });
};

const verifyTruckSharePopupValues = () => {
  cy.then(() => {
    const truckDetails = [
      Cypress.env('equiVal'),
      Cypress.env('originCityVal'),
      Cypress.env('distVal'),
      Cypress.env('readyDateVal'),
      Cypress.env('ODHVal'),
      Cypress.env('readyTimeVal'),
    ];
    truckDetails.forEach((valueToVerify) => {
      verifyElementTextContains({ locator: labelSharePopupDetails, verifyText: valueToVerify });
    });
  });
};

//const routeOriginIcons = () => {
//cy.get(iconsRouteOrigin).then((ele) => {
//if (ele.length > 1) {
//cy.get(ele).eq(0).should((locator) => {
//expect(locator).to.exist;
//});
////cy.get(ele).eq(0).should('have.attr', 'data-icon', 'calendar-days');
//cy.get(ele).eq(1).should((locator) => {
//expect(locator).to.exist;
//});
////cy.get(ele).eq(1).should('have.attr', 'data-icon', 'clock');
//} else {
//cy.get(ele).eq(0).should((locator) => {
//expect(locator).to.exist;
//expect(cy.get(ele).eq(1)).to.not.exist;
//});
//}
//});
//};
//const routeDestinationIcons = () => {
//cy.get(iconsRouteDestination).then((ele) => {
//if (ele.length > 1) {
//cy.get(ele).eq(0).should((locator) => {
//expect(locator).to.exist;
//});
////cy.get(ele).eq(0).should('have.attr', 'data-icon', 'calendar-days');
//cy.get(ele).eq(1).should((locator) => {
//expect(locator).to.exist;
//});
////cy.get(ele).eq(1).should('have.attr', 'data-icon', 'clock');
//} else {
//cy.get(ele).eq(0).should((locator) => {
//expect(locator).to.exist;
//expect(cy.get(ele).eq(1)).to.not.exist;
//});
//};
//});
//};

//const truckOriginIcons = () => {
//cy.get(iconsTruckOrigin).then((ele) => {
//if (ele.length > 1) {
//cy.get(ele).eq(0).should((locator) => {
//expect(locator).to.exist;
//});
////cy.get(ele).eq(0).should('have.attr', 'data-icon', 'calendar-days');
//cy.get(ele).eq(1).should((locator) => {
//expect(locator).to.exist;
//});
////cy.get(ele).eq(1).should('have.attr', 'data-icon', 'clock');
//} else {
//cy.get(ele).eq(0).should((locator) => {
//expect(locator).to.exist;
//expect(cy.get(ele).eq(1)).to.not.exist;
//});
//};
//});
//};

export {
  getTruckCapacityTableValues,
  //routeOriginIcons,
  //routeDestinationIcons,
  //truckOriginIcons,
  verifyTruckSharePopupValues,
};