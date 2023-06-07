/*---------------------------------------------------------------------------------------------------------------
 describe(Validate isActive field for all subcollection tables and the response > Driver > Assets
 Authored By                   : Sneha Anusha Sathi
 Date                          : 26-05-2023
 Functions/Calling References  : NA
 Test case Included            : ME-158192 - Validate isActive field for all subcollection tables and the response > Driver | Assets | Regression
---------------------------------------------------------------------------------------------------------------*/
import sqlData from '../../../../../testData/sqlData/sqlData.json';
const {
  drivertestuser,
  testserver,
  driverTestPassword,
  driverAddressMappingQuery,
  driverAwardMappingQuery,
  driverCertificationOrPermitMappingQuery,
  driverContactMappingQuery,
  driverEquipmentMappingQuery,
  driverFleetMappingQuery,
  driverIdentifierMappingQuery,
  driverPermanentPowerMappingQuery,
  driverPermanentTrailerMappingQuery,
  driverRepsMappingQuery,
  driverScheduleMappingQuery,
  driverTimeOffMappingQuery,
} = sqlData.sqlData;

const dbQueryRequest = (query) => {
  cy.task('azureSQL', {
    user: drivertestuser,
    password: driverTestPassword,
    server: testserver,
    portVal: 1433,
    database: drivertestuser,
    query,
  }).then((results) => {
    expect(results).to.not.contain('Invalid column name');
  });
};

describe('Validate isActive field for all subcollection tables and the response > Driver > Assets', () => {
  it(
    'ME-158192 - Validate isActive field for all subcollection tables and the response > Driver | Assets | Regression',
    {
      tags: ['@driver', '@assets', '@isActive', '@p1', '@phase2'],
    },
    () => {
      cy.log('***verifying isActive field in driverAddressMapping table Sub collection***');
      dbQueryRequest(driverAddressMappingQuery);

      cy.log('***verifying isActive field in driver Address mapping table Sub collection***');
      dbQueryRequest(driverAwardMappingQuery);

      cy.log('***verifying isActive field in Certifications query Sub collection***');
      dbQueryRequest(driverCertificationOrPermitMappingQuery);

      cy.log('***verifying isActive field in Contacts query Sub collection***');
      dbQueryRequest(driverContactMappingQuery);

      cy.log('***verifying isActive field in Equipment query Sub collection***');
      dbQueryRequest(driverEquipmentMappingQuery);

      cy.log('***verifying isActive field in Identifier query Sub collection***');
      dbQueryRequest(driverIdentifierMappingQuery);

      cy.log('***verifying isActive field in Fleet query Sub collection***');
      dbQueryRequest(driverFleetMappingQuery);

      cy.log('***verifying isActive field in driverPermanentPowerMapping Query Sub collection***');
      dbQueryRequest(driverPermanentPowerMappingQuery);

      cy.log('***verifying isActive field in driverPermanentTrailerMappingQuery Sub collection***');
      dbQueryRequest(driverPermanentTrailerMappingQuery);

      cy.log('***verifying isActive field in driverRepsMapping Query Sub collection***');
      dbQueryRequest(driverRepsMappingQuery);

      cy.log('***verifying isActive field in driverScheduleMapping Query Sub collection***');
      dbQueryRequest(driverScheduleMappingQuery);

      cy.log('***verifying isActive field in driverTimeOffMapping Query Sub collection***');
      dbQueryRequest(driverTimeOffMappingQuery);
    },
  );
});