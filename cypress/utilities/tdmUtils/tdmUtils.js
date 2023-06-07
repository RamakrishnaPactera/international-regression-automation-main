import { createTestData } from '../../tdm/index';
import { staticAssets } from '../../tdm/globalData/staticAssets';
import { tdmRequirements, dataType } from '../../tdm/globalData/enum';
import { staticAssetTemplate } from '../../tdm/globalData/staticAssetCreationTemplate';

const preDefinedStaticData = staticAssets[Cypress.env('environment')];

const getCSVDataByScenario = ({ dataType: data, dataCondition: dataReq, dataScenario: scenario }) => {
  if (!dataType.includes(data)) {
    throw new Error(`Data type '${data}' is not valid. use from '${dataType}' only.`);
  };
  if (!tdmRequirements.includes(dataReq)) {
    throw new Error(`Data requirement '${dataReq}' is not valid. use from '${tdmRequirements}' only.`);
  };

  const dataReqPath = `./cypress/tdm/dataReqTemplate/${data}/${dataReq}.csv`;
  return cy
    .wrap(null)
    .then({ timeout: 180000 }, async () => {
      try {
        await cy.readFile(dataReqPath)
          .then(csvData => {
            const dataToParse = csvData.replace(/(?:\\[r]|[\r]+)+/g, '');
            const [header, ...rows] = dataToParse.split('\n');
            const separator = ',';
            const headers = header.split(separator);
            const datasetObj = rows
              .map((row, index) =>
                row
                  .split(separator)
                  .reduce(
                    (datasetObj, value, index) => ({
                      ...datasetObj,
                      [headers[index]]: value,
                    }),
                    {},
                  ),
              );
            const scenarioDataReq = datasetObj.find(item => { return item.scenario === scenario; });
            return scenarioDataReq;
          });
      } catch (err) {
      };
    });
};

const createStaticAsset = ({ assetKey: staticAssetKey }) => {
  const assetDataReq = staticAssetTemplate[staticAssetKey];
  cy.log(`Static asset requirement: ${JSON.stringify(assetDataReq)}`);
  getCSVDataByScenario(assetDataReq).then((dataReqObj) => {
    cy.log(`data input for scenario '${assetDataReq.dataScenario}': ${JSON.stringify(dataReqObj)}`);
    return cy
      .wrap(null)
      .then({ timeout: 180000 }, async () => {
        return await createTestData({ dataType: assetDataReq.dataType, dataCondition: assetDataReq.dataCondition, dataScenarioObj: dataReqObj });
      }).then((runtimeData) => {
        cy.log(`***Static asset created: ${JSON.stringify(runtimeData)}***`);
        if (runtimeData.isDataCreationSuccessful) {
          let asset;
          switch (assetDataReq.dataType.toLowerCase()) {
            case 'carrier':
              asset = runtimeData.carrierCode;
              break;
            case 'customer':
              asset = runtimeData.customerCode;
              break;
            case 'facility':
              asset = runtimeData.facilityCode;
          }
          cy.task('setRuntimeValue', { key: staticAssetKey, value: asset }).then(value => { return value; });
        };
      });
  });
};

const getTestData = ({ dataType: data, dataCondition: dataReq, dataScenario: scenario }) => {
  //if (!Cypress.env("isReadOnlyRun")) {
  return getCSVDataByScenario({ dataType: data, dataCondition: dataReq, dataScenario: scenario }).then((dataReqObj) => {
    if ((typeof dataReqObj) === 'string') {
      throw new Error(`Data scenario '${scenario}' is not valid.`);
    };
    cy.log(`data input for scenario '${scenario}':
        ${JSON.stringify(dataReqObj)}`);

    //check if data req has any parameterized static asset
    const staticParams = {};
    Object.keys(dataReqObj).forEach(key => {
      //const re = new RegExp(/^{{[A-Za-z0-9]+}}$/);
      if (/^{{[A-Za-z0-9]+}}$/.test(dataReqObj[key])) {
        const staticAssetKey = dataReqObj[key].slice(2, dataReqObj[key].length - 2);
        staticParams[key] = staticAssetKey;
      };
    });
    cy.log(`Static assets to parameterize ${JSON.stringify(staticParams)}`);

    //If runtime static asset creation allowed i.e. createRuntimeStaticAssets is true
    if (Cypress.env('createRuntimeStaticAssets')) {
      //check if static assets already created for this run, if not create the static asset
      cy.task('getRuntimeDataObj')
        .then((dataObj) => {
          Object.keys(staticParams).forEach(key => {
            if (!dataObj[staticParams[key]]) {
              try {
                createStaticAsset({ assetKey: staticParams[key] });
              } catch (err) {
              };
            };
          });
        });
    };

    //parameterize the static assets in the original data requirement and create data
    return cy.task('getRuntimeDataObj')
      .then((dataObj) => {
        Object.keys(staticParams).forEach(key => {
          if ((dataObj[staticParams[key]]) && (Cypress.env('createRuntimeStaticAssets'))) {
            //if runtime static asset created the use it
            dataReqObj[key] = dataObj[staticParams[key]];
          } else {
            //if runtime static asset not created, then use pre-defined static asset from staticAssets.js
            dataReqObj[key] = preDefinedStaticData[staticParams[key]];
          };
        });

        cy.log(`data input for scenario with static asset parameterized '${scenario}': 
          ${JSON.stringify(dataReqObj)}`);
        return cy
          .wrap(null)
          .then({ timeout: 180000 }, async () => {
            return await createTestData({ dataType: data, dataCondition: dataReq, dataScenarioObj: dataReqObj });
          });
      });
  });
  //} else {
  //return {
  //isDataCreationSuccessful: false,
  //error: `***Read-only execution flag is true in cypress.json file. Hence skipping the data creation step.***`,
  //};
  //}
};

const saveData = ({ dataObject: outputDataObj }) => {
  const dataBackupDir = './cypress/tdm/dataBackup';
  const dataBackupFile = `${dataBackupDir}/${outputDataObj.tdmRequirement}.json`;
  try {
    cy.task('readFileIfExists', dataBackupFile)
      .then((fileData) => {
        let dataToWrite = {};
        if (fileData !== null && fileData !== '') {
          dataToWrite = JSON.parse(fileData);
        };
        dataToWrite[Date.now().toString()] = outputDataObj;
        cy.writeFile(dataBackupFile, dataToWrite);
      });
  } catch (err) {
    cy.log(`Data could not be saved under data backup. Error: ${err}`);
  };
};

export {
  getTestData,
  saveData,
};