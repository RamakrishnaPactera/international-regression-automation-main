export const createOrUpdatePowerV2Mutation = `mutation CreateOrUpdatePowerV2($input: CreateAssetPowerInputV2!) {
    createOrUpdatePowerV2(input: $input) {
      errors {
        message
        path
        extensions
        code
      }
      power {
        ...PowerInfo
      }
      __typename
    }
  }
  
  fragment PowerInfo on AssetPowerOutputV2 {
        id
        code
        displayName
        makeTerm
        typeTerm
        year
        modelTerm
        isCARBCompliant
        trackingDevice { 
          ...PowerTrackingDeviceInfo
          __typename
        } 
        classTerm 
      businessUnitTerm 
      divisionTerm 
      odometerMiles 
      exteriorColor 
      interiorColor 
      sleeperTypeTerm 
      axleConfigurationTerm 
      suspensionTerm 
      sleeperSizeDimensionsTerm 
      powerWeight { 
        ...PowerWeightInfo
        __typename
      } 
      engineMakeTerm 
      engineModelTerm 
      engineHP 
      isEngineBrakeAvailable 
      transmissionMakeTerm 
      transmissionModelTerm 
      transmissionSpeed 
      rearEndRatio 
      wheelBase { 
        ...PowerWheelBaseInfo
        __typename
      } 
      tankCapacity1 { 
        ...PowerTankCapacity1Info 
        __typename
      } 
      tankCapacity2 { 
        ...PowerTankCapacity2Info 
        __typename
      } 
      fifthWheelTerm 
      notes 
      operatingStatusTerm 
      serviceStatusTerm 
      lastPingLocation 
      lastPingDateTime 
      lastFacility 
      facilityLocation 
      program 
      project 
      measurementTerm 
      equipment { 
        ...PowerEquipmentInfo 
        __typename
      } 
      identifiers { 
        ...PowerIdentifiersInfo
        __typename
      } 
      maintenance { 
        ...PowerMaintenanceInfo
        __typename
      }  
      createdBy 
      updatedBy 
      createdAt 
      updatedAt
      displayName
      poolCarrierCode
      permanentDriverCodes
      permanentTrailerCodes
     
   __typename
  }
  
  fragment PowerTrackingDeviceInfo on TrackingDeviceOutput {
    deviceTerm 
    modelTerm
    serialNumber
    __typename
 }

 fragment PowerWeightInfo on UnitOfWeightOutputV2  {
  value 
  unit 
  __typename
}

fragment PowerWheelBaseInfo on UnitOfLengthOutputV3 {
  value 
  unit  
  __typename
}

fragment PowerTankCapacity1Info on UnitOfCapacityOutput {
  value 
  unit  
  __typename
}

fragment PowerTankCapacity2Info on UnitOfCapacityOutput {
value 
unit   
__typename
}
fragment PowerEquipmentInfo on AssetPowerEquipmentOutputV2{
  id 
  typeTerm 
  description 
  count 
  assetId 
  conditionTerm 
  issueDate 
  returnDate 
  powerId 
  createdBy 
  updatedBy 
  createdAt 
  updatedAt   
  __typename
 }

 fragment PowerIdentifiersInfo on AssetPowerIdentifierOutputV3 {
    id 
    typeTerm 
    state 
    country 
    expirationDate 
    powerId 
    createdBy 
    updatedBy 
    createdAt 
    updatedAt
    value  
    __typename
}
fragment PowerMaintenanceInfo on AssetPowerMaintenanceOutputV2{
id
typeTerm 
severityTerm 
isPlanned 
estimatedMaintenanceTime 
actual { 
  startDateTime 
  endDateTime 
} 
expected { 
  startDateTime 
  endDateTime 
} 
workPerformedDetail 
powerId 
createdBy 
updatedBy 
createdAt 
updatedAt
location {
  facilityCode
  cityState {
    city
    state
  }
}
__typename
 
}`;

export const createOrUpdatePowerV2Var =
{
  input: {
    code: '{{powerCode}}',
    makeTerm: '',
    typeTerm: '',
    modelTerm: '',
    isCARBCompliant: true,
    classTerm: '',
    businessUnitTerm: '',
    divisionTerm: '',
    exteriorColor: '',
    interiorColor: '',
    sleeperTypeTerm: '',
    axleConfigurationTerm: '',
    suspensionTerm: '',
    sleeperSizeDimensionsTerm: '',
    engineMakeTerm: '',
    engineModelTerm: '',
    engineHP: null,
    isEngineBrakeAvailable: true,
    transmissionMakeTerm: '',
    transmissionModelTerm: '',
    fifthWheelTerm: '',
    notes: '',
    operatingStatusTerm: '',
    serviceStatusTerm: '',
    lastPingLocation: '',
    lastFacility: '',
    facilityLocation: '',
    program: '',
    project: '',
    measurementTerm: '',
    equipment: [],
    identifiers: [],
    maintenance: [],
    displayName: '',
    poolCarrierCode: '',
    trackingDevice: {
      deviceTerm: '',
      modelTerm: '',
      serialNumber: '',
    },
    permanentTrailerCodes: [],
    permanentDriverCodes: [],
  },
};