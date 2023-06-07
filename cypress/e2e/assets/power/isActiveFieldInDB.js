/*eslint-disable no-unused-expressions */
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
describe('Power - Create Migrationscript to add theisActive field into the database for all subcollection tables')
 Test Cases List
 Authored By                   : Nikhil kumar
 Date                          : 25-05-2023
 Functions/Calling References  : sqlData,dbQueryRequest
 Test case Included            : ME-156142 Test [BE] Power - Create Migration script to add the isActive field into the database for all subcollection tables
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import sqlData from '../../../testData/sqlData/sqlData.json';
const {
  powerTestUser,
  testserver,
  powerTestPassword,
  powerTestEquipmentQuery,
  powerTestFleet,
  powerTestMaitenance,
  powerTestIdentifier,
} = sqlData.sqlData;

const dbQueryRequest = (query) => {
  cy.task('azureSQL', {
    user: powerTestUser,
    password: powerTestPassword,
    server: testserver,
    portVal: 1433,
    database: powerTestUser,
    query,
  }).then((results) => {
    expect(results).to.not.contain('Invalid column name');
  });
};

describe('Power - Create Migrationscript to add theisActive field into the database for all subcollection tables | Power | Database [ME-146193]', () => {
  it('ME-156142 Test [BE] Power - Create Migration script to add the isActive field into the database for all subcollection tables > AzureDataStudio > Tables | Regression',
    {
      tags: [
        '@power',
        '@p2',
      ],
    },
    () => {
      cy.log('***verifying isActive field in Power Equipment Mapping table Sub collection***');
      dbQueryRequest(powerTestEquipmentQuery);

      cy.log('***verifying isActive field in Power Fleet mapping table Sub collection***');
      dbQueryRequest(powerTestFleet);

      cy.log('***verifying isActive field in Power Maintenance mapping table Sub collection***');
      dbQueryRequest(powerTestMaitenance);

      cy.log('***verifying isActive field in Power Maintenance mapping table Sub collection***');
      dbQueryRequest(powerTestIdentifier);
    });
});