import { createLoad } from './lib/dataCreationFlows/loadDataFlow.js';
import { createCustomer } from './lib/dataCreationFlows/customerDataFlow.js';
import { createCarrier } from './lib/dataCreationFlows/carrierDataFlow.js';
import { createFacility } from './lib/dataCreationFlows/facilityDataFlow.js';
import { createDriver } from './lib/dataCreationFlows/driverDataFlow.js';
import { createTrailer } from './lib/dataCreationFlows/trailerDataFlow.js';
import { createOrUpdatePower } from './lib/dataCreationFlows/powerDataFlow.js';

const createTestData = async ({ dataType: data, dataCondition: dataReq, dataScenarioObj: scenarioDataReq }) => {
  let runtimeData = {};
  if (data.toLowerCase() === 'load') {
    runtimeData = await createLoad({ dataCondition: dataReq, dataObj: scenarioDataReq });
  } else if (data.toLowerCase() === 'customer') {
    runtimeData = await createCustomer({ dataCondition: dataReq, dataObj: scenarioDataReq });
  } else if (data.toLowerCase() === 'carrier') {
    runtimeData = await createCarrier({ dataCondition: dataReq, dataObj: scenarioDataReq });
  } else if (data.toLowerCase() === 'facility') {
    runtimeData = await createFacility({ dataCondition: dataReq, dataObj: scenarioDataReq });
  } else if (data.toLowerCase() === 'driver') {
    runtimeData = await createDriver({ dataCondition: dataReq, dataObj: scenarioDataReq });
  } else if (data.toLowerCase() === 'trailer') {
    runtimeData = await createTrailer({ dataCondition: dataReq, dataObj: scenarioDataReq });
  } else if (data.toLowerCase() === 'power') {
    runtimeData = await createOrUpdatePower({ dataCondition: dataReq, dataObj: scenarioDataReq });
  };
  return runtimeData;
};

export {
  createTestData,
};