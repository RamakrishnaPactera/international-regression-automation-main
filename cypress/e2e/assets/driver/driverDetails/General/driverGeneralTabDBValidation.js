/*---------------------------------------------------------------------------------------------------------------
Verify Updated Database fields names for Driver General tab
 Test Cases List
 Authored By                   : Sanjeev Bandari
 Date                          : 22-05-2023
 Functions/Calling References  : generalData,sqlData
 Test case Included            : ME-62284 Verify Updated Database fields names for Driver General tab - General Information Fields
                               : ME-62299 Verify updated Database field names for Driver TimeOff card fields
                               : ME-62203 Verify updated Database field names for Driver Equipment card fields
                               : ME-157485 Verify updated Database field names for Driver Identifier card fields
                               : ME-62305 Verify updated Database field names for Driver Award card fields
                               : ME-62446 Verify updated Database field names for Driver CertificationOrPermit card fields
                               : ME-62445 Verify updated Database field names for Driver ScheduleMapping card fields
---------------------------------------------------------------------------------------------------------------*/
import sqlData from '../../../../../testData/sqlData/sqlData.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
const { azureSQLUrl } = Cypress.env('endPointUrl')[Cypress.env('environment')];
const {
  driverKey,
  drivertestdatabase,
  drivertestuser,
  testportVal,
  testDriverQuery,
  testDriverTimeOffMapping,
  testDriverEquipmentMapping,
  testDriverIdentifierMapping,
  testDriverAwardMapping,
  testDriverCertificationOrPermitMapping,
  testDriverScheduleMapping,
} = sqlData.sqlData;
const {
  generalInfoTblVal,
  driverTimeOffTblVal,
  driverEqpMapTblVal,
  driverIdentifierTblVal,
  driverAwardTblVal,
  driverCertificationsorPermitsTblVal,
  driverSchedulingTblVal,
} = generalData.expectedData;
const arr = [];
describe('Verify Updated Database fields names for Driver General tab [ME-62284 ,ME-62299,ME-62203,ME-157485,ME-62305,ME-62446,ME-62445]', () => {
  it('ME-62284 Verify Updated Database fields names for Driver General tab - General Information Fields',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p1',
      ],
    },
    () => {
      cy.log('***verifying fields in Driver General Information ***');
      cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: testDriverQuery })
        .then((results) => {
          //console.log(results.name);
          results.forEach((element) => {
            arr.push(element.name);
          });
          console.log('Array Values', arr);
          generalInfoTblVal.forEach((data) => {
            expect(arr).includes(data);
          });
        });
    });
  it('ME-62299 Verify updated Database field names for Driver TimeOff card fields',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p1',
      ],
    },
    () => {
      cy.log('***verifying fields in DriverTimeOffMapping ***');
      cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: testDriverTimeOffMapping })
        .then((results) => {
          results.forEach((element) => {
            arr.push(element.name);
          });
          driverTimeOffTblVal.forEach((data) => {
            expect(arr).includes(data);
          });
        });
    });
  it('ME-62203 Verify updated Database field names for Driver Equipment card fields',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p1',
      ],
    },
    () => {
      cy.log('***verifying fields in testDriverEquipmentMapping ***');
      cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: testDriverEquipmentMapping })
        .then((results) => {
          results.forEach((element) => {
            arr.push(element.name);
          });
          driverEqpMapTblVal.forEach((data) => {
            expect(arr).includes(data);
          });
        });
    });
  it('ME-157485 Verify updated Database field names for Driver Identifier card fields',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p1',
      ],
    },
    () => {
      cy.log('***verifying fields in DriverIdentifierMapping ***');
      cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: testDriverIdentifierMapping })
        .then((results) => {
          results.forEach((element) => {
            arr.push(element.name);
          });
          driverIdentifierTblVal.forEach((data) => {
            expect(arr).includes(data);
          });
        });
    });
  it('ME-62305 Verify updated Database field names for Driver Award card fields',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p1',
      ],
    },
    () => {
      cy.log('***verifying fields in DriverAwardMapping ***');
      cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: testDriverAwardMapping })
        .then((results) => {
          results.forEach((element) => {
            arr.push(element.name);
          });
          driverAwardTblVal.forEach((data) => {
            expect(arr).includes(data);
          });
        });
    });
  it('ME-62446 Verify updated Database field names for Driver CertificationOrPermit card fields',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p1',
      ],
    },
    () => {
      cy.log('***verifying fields in DriverCertificationOrPermitMapping ***');
      cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: testDriverCertificationOrPermitMapping })
        .then((results) => {
          results.forEach((element) => {
            arr.push(element.name);
          });
          driverCertificationsorPermitsTblVal.forEach((data) => {
            expect(arr).includes(data);
          });
        });
    });
  it('ME-62445 Verify updated Database field names for Driver ScheduleMapping card fields',
    {
      tags: [
        '@assets',
        '@resources',
        '@driver',
        '@driverGeneral',
        '@p1',
      ],
    },
    () => {
      cy.log('***verifying fields in DriverScheduleMapping ***');
      cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: testDriverScheduleMapping })
        .then((results) => {
          results.forEach((element) => {
            arr.push(element.name);
          });
          driverSchedulingTblVal.forEach((data) => {
            expect(arr).includes(data);
          });
        });
    });
});