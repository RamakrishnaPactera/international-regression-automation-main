export const createOrUpdateFacilityV2Query = `mutation createOrUpdateFacilityV2($input: FacilityInputV2!) {
  createOrUpdateFacilityV2(input: $input) {
    facility {
      ...FacilityInfoV2
      __typename
    }
    errors {
      message
      path
      __typename
    }
    __typename
  }
}

fragment FacilityInfoV2 on FacilityV2 {
  addresses {
    ...FacilityAddressBrief
    __typename
  }
  mainAddress {
    ...FacilityAddressBrief
    __typename
  }
  contacts {
    ...FacilityContactInfo
    __typename
  }
  code
  customerRelationships {
    ...FacilityCustomerRelationshipInfoV2
    __typename
  }
  directions {
    ...FacilityDirectionInfo
    __typename
  }
  externalNotes {
    ...FacilityNoteInfo
    __typename
  }
  facilityNote
  facilityType {
    ...KeyValueInfo
    __typename
  }
  id
  loadFromType {
    ...KeyValueInfo
    __typename
  }
  facilityIdentifiers {
    ...FacilityIdentifierInfoV2
    __typename
  }
  name
  notes {
    ...FacilityNoteInfo
    __typename
  }
  phoneNumber
  scaleNote
  schedulingSystemType {
    ...KeyValueInfo
    __typename
  }
  schedules {
    ...ScheduleInfoV2
    __typename
  }
  schedulingContact
  sourceType
  status
  timezone
  taxExempt
  unloadFromType {
    ...KeyValueInfo
    __typename
  }
  customerFacilities {
    ...CustomerFacilityDefaultInfoV2
    __typename
  }
  facilityLoadDefaults {
    ...FacilityLoadDefaults
    __typename
  }
  __typename
}

fragment FacilityAddressBrief on FacilityAddress {
  id
  addressType {
    ...KeyValueInfo
    __typename
  }
  addressTypeId
  city
  country
  main
  postalCode
  state
  street1
  street2
  geopoint {
    lon
    lat
    __typename
  }
  riskInfoSource
  thirdPartyId
  isVerified
  __typename
}

fragment KeyValueInfo on KeyValue {
  active
  id
  metadataJson
  name
  __typename
}

fragment FacilityContactInfo on FacilityContact {
  id
  name
  contactTypeId
  main
  phoneNumber
  extension
  faxNumber
  emailAddress
  chatType {
    ...KeyValueInfo
    __typename
  }
  chatUsername
  chatTypeId
  main
  riskInfoSource
  thirdPartyId
  __typename
}

fragment FacilityCustomerRelationshipInfoV2 on CustomerFacilityRelationshipV2 {
  customer {
    id
    name
    code
    __typename
  }
  delivery
  deliveryAvgDwellMinutes
  deliveryCode
  id
  pickup
  pickupAvgDwellMinutes
  pickupCode
  schedulingSystemType {
    ...KeyValueInfo
    __typename
  }
  __typename
}

fragment FacilityDirectionInfo on FacilityDirection {
  id
  facilityId
  createdAt
  updatedAt
  source {
    ...KeyValueInfo
    __typename
  }
  sourceId
  city
  state
  description
  averageTime
  directions
  __typename
}

fragment FacilityNoteInfo on FacilityNote {
  createdAt
  id
  noteType
  noteableId
  noteableType
  text
  updatedAt
  __typename
}

fragment FacilityIdentifierInfoV2 on FacilityIdentifierV2 {
  id
  code
  facilityIdentifierTypeId
  __typename
}

fragment ScheduleInfoV2 on ScheduleV2 {
  appointmentType
  dropType
  serviceType
  trailerType {
    ...KeyValueInfo
    __typename
  }
  trailerTypeId
  id
  modeType
  scheduleType
  serviceType
  workType
  loadSize {
    ...KeyValueInfo
    __typename
  }
  loadSizeId
  routeTransportMode {
    ...KeyValueInfo
    __typename
  }
  routeTransportModeId
  sunday {
    ...ScheduleEntryInfoV2
    __typename
  }
  monday {
    ...ScheduleEntryInfoV2
    __typename
  }
  tuesday {
    ...ScheduleEntryInfoV2
    __typename
  }
  wednesday {
    ...ScheduleEntryInfoV2
    __typename
  }
  thursday {
    ...ScheduleEntryInfoV2
    __typename
  }
  friday {
    ...ScheduleEntryInfoV2
    __typename
  }
  saturday {
    ...ScheduleEntryInfoV2
    __typename
  }
  __typename
}

fragment ScheduleEntryInfoV2 on ScheduleEntryV2 {
  closed
  hours {
    ...ScheduleRangeInfoV2
    __typename
  }
  id
  __typename
}

fragment ScheduleRangeInfoV2 on ScheduleRangeV2 {
  endOffsetMs
  id
  startOffsetMs
  __typename
}

fragment CustomerFacilityDefaultInfoV2 on CustomerFacility {
  id
  customerId
  facilityId
  facility: facilityV2 {
    id
    name
    code
    mainAddress {
      id
      city
      state
      __typename
    }
    __typename
  }
  customerCustomer: customerCustomerV2 {
    id
    name
    __typename
  }
  schedulingSystem
  schedulingURL
  username
  password
  isAutoScheduleEligible
  isAutoScheduleDefault
  isPickup
  isDelivery
  pickupCodes
  deliveryCodes
  trailPool
  minTrailers
  maxTrailers
  nowTrailers
  specialRequirementsAndEquipment
  pickupAllowableFreeTimeValue
  pickupAllowableFreeTimeUnit
  deliveryAllowableFreeTimeValue
  deliveryAllowableFreeTimeUnit
  drop
  customer: customerV2 {
    id
    name
    code
    mainAddress {
      id
      city
      state
      __typename
    }
    __typename
  }
  __typename
}

fragment FacilityLoadDefaults on FacilityLoadDefaults {
  id
  facilityId
  defaultEquipments
  specialRequirements
  length
  width
  height
  schedSystem
  schedURL
  autoSchedEligible
  autoSchedDefault
  __typename
}`;
export const createOrUpdateFacilityV2Var = {
  input: {
    code: '{{facilityCode}}',
    facilityNote: 'Internal Notes are here',
    id: '',
    name: '{{facilityName}}',
    phoneNumber: '{{facilityPh}}',
    scaleNote: 'Scale notes are here',
    sourceType: '',
    status: '{{facilityStatus}}',
    taxExempt: false,
    facilityTypeId: 'Distribution Center',
    loadFromTypeId: 'Tail or Side',
    schedulingContact: 'James BrownSch',
    schedulingSystemTypeId: 'Manhattan',
    unloadFromTypeId: 'Tail or Side',
    addresses: [
      {
        id: '',
        city: '{{city}}',
        state: '{{state}}',
        street1: '{{street1}}',
        street2: '',
        postalCode: '{{postalCode}}',
        country: '{{country}}',
        addressTypeId: 'Shipping',
        addressTypeIds: [
          'Shipping',
          'Receiving',
        ],
        main: true,
        isVerified: false,
        _destroy: 'false',
      },
    ],
    contacts: [
      {
        chatTypeId: 'Skype',
        chatUsername: 'hey@msoft.com',
        contactTypeId: 'Shipping',
        faxNumber: '',
        id: '',
        name: 'Jenson Button',
        phoneNumber: '{{facilityPh}}',
        main: true,
        _destroy: 'false',
        emailAddress: 'test@test.com',
      },
    ],
    schedules: [
    ],
    notes: [
      {
        id: '',
        _destroy: 'false',
        noteType: 'externalFacility',
        text: 'External Notes are here',
      },
    ],
  },
};

export const createUpdateFacilityScheduleQuery = `mutation createOrUpdateFacilitySchedule($input: CreateScheduleInput!) {
  createOrUpdateFacilitySchedule(input: $input) {
    schedule {
      ...ScheduleInfoV2
      __typename
    }
    errors {
      message
      path
      __typename
    }
    __typename
  }
}

fragment ScheduleInfoV2 on ScheduleV2 {
  appointmentType
  dropType
  serviceType
  trailerType {
    ...KeyValueInfo
    __typename
  }
  trailerTypeId
  trailerTypeNullable {
    ...KeyValueInfo
    __typename
  }
  trailerTypeIdNullable
  id
  modeType
  scheduleType
  scheduleTypeNullable
  serviceType
  workType
  loadSize {
    ...KeyValueInfo
    __typename
  }
  loadSizeId
  routeTransportMode {
    ...KeyValueInfo
    __typename
  }
  routeTransportModeId
  sunday {
    ...ScheduleEntryInfoV2
    __typename
  }
  monday {
    ...ScheduleEntryInfoV2
    __typename
  }
  tuesday {
    ...ScheduleEntryInfoV2
    __typename
  }
  wednesday {
    ...ScheduleEntryInfoV2
    __typename
  }
  thursday {
    ...ScheduleEntryInfoV2
    __typename
  }
  friday {
    ...ScheduleEntryInfoV2
    __typename
  }
  saturday {
    ...ScheduleEntryInfoV2
    __typename
  }
  __typename
}

fragment KeyValueInfo on KeyValue {
  active
  id
  metadataJson
  name
  __typename
}

fragment ScheduleEntryInfoV2 on ScheduleEntryV2 {
  closed
  hours {
    ...ScheduleRangeInfoV2
    __typename
  }
  id
  __typename
}

fragment ScheduleRangeInfoV2 on ScheduleRangeV2 {
  endOffsetMs
  id
  startOffsetMs
  __typename
}`;
export const createUpdateFacilityScheduleVar = {
  input: {
    id: '',
    facilityId: '{{facilityId}}',
    appointmentType: 'appt',
    dropType: 'dropAvail',
    serviceType: null,
    equipmentTypeId: '{{trailerTypeId}}',
    modeType: 'ltl',
    trailerTypeIdNullable: '{{trailerTypeId}}',
    scheduleType: 'both',
    scheduleTypeNullable: 'in',
    workType: 'noTouch',
    loadSizeId: 'FTL',
    routeTransportModeId: 'Truck',
    monday: {
      closed: false,
      hours: [
        {
          startOffsetMs: 28800000,
          endOffsetMs: 64800000,
        },
      ],
    },
    tuesday: {
      closed: false,
      hours: [
        {
          startOffsetMs: 28800000,
          endOffsetMs: 64800000,
        },
      ],
    },
    wednesday: {
      closed: false,
      hours: [
        {
          startOffsetMs: 28800000,
          endOffsetMs: 64800000,
        },
      ],
    },
    thursday: {
      closed: false,
      hours: [
        {
          startOffsetMs: 28800000,
          endOffsetMs: 64800000,
        },
      ],
    },
    friday: {
      closed: false,
      hours: [
        {
          startOffsetMs: 28800000,
          endOffsetMs: 64800000,
        },
      ],
    },
    saturday: {
      id: '',
      closed: true,
      hours: [],
    },
    sunday: {
      id: '',
      closed: true,
      hours: [],
    },
  },
};

export const addressStatusUpdateQuery = `mutation addressStatusUpdate($request: [AddressStatusChangeRequest!]!) {
  addressStatusUpdate(request: $request) {
    addressId
    addressStatusId
    addressableType
    cleanseStatus
    cleanseSource
    __typename
  }
}`;
export const addressStatusUpdateVar = {
  request: [
    {
      addressId: '{{addressId}}',
      addressableType: 'Facility',
      cleanseSource: 'Melissa',
      cleanseStatus: 'User Custom',
    },
  ],
};

export const createCarrierFacilityRelQuery = `mutation createCarrierFacilityRelationship($createCarrierFacilityInput: CreateCarrierFacilityInput!) {
  createCarrierFacility(CreateCarrierFacilityInput: $createCarrierFacilityInput) {
    ...carrierFacilityRelationshipInfo
    __typename
  }
}

fragment carrierFacilityRelationshipInfo on CarrierFacility {
  id
  carrierId
  facilityId
  relationshipType
  canLoad
  isActive
  updatedAt
  carrierV2 {
    id
    code
    name
    mainAddress {
      id
      city
      state
      __typename
    }
    __typename
  }
  facility {
    id
    code
    name
    mainAddress {
      id
      city
      state
      __typename
    }
    __typename
  }
  updatedByUserV2 {
    id
    employee {
      id
      fullName
      __typename
    }
    __typename
  }
  __typename
}`;
export const createCarrierFacilityRelVar = {
  createCarrierFacilityInput: {
    carrierId: '{{relatedCarrierIdToFacility}}',
    facilityId: '{{facilityId}}',
    relationshipType: 'Preferred',
    canLoad: false,
    isActive: true,
  },
};

export const createOrUpdateFacilityIdV2Query = `mutation createOrUpdateFacilityIdentifierV2($input: FacilityIdentifierStandaloneInputV2!) {
  createOrUpdateFacilityIdentifierV2(input: $input) {
    facilityIdentifier {
      ...FacilityIdentifierInfoV2
      __typename
    }
    errors {
      message
      path
      __typename
    }
    __typename
  }
}

fragment FacilityIdentifierInfoV2 on FacilityIdentifierV2 {
  id
  code
  facilityIdentifierTypeId
  __typename
}`;
export const createOrUpdateFacilityIdV2Var = {
  input: {
    id: '',
    facilityIdentifierTypeId: 'rmis',
    code: 'RMIS3938',
    facility: {
      code: '{{facilityCode}}',
    },
  },
};

export const createUpdateFacilityDirectionQuery = `mutation createOrUpdateFacilityDirection($input: CreateFacilityDirectionInput!) {
  createOrUpdateFacilityDirection(input: $input) {
    direction {
      ...FacilityDirectionInfo
      __typename
    }
    errors {
      message
      path
      __typename
    }
    __typename
  }
}

fragment FacilityDirectionInfo on FacilityDirection {
  id
  facilityId
  createdAt
  updatedAt
  source {
    ...KeyValueInfo
    __typename
  }
  sourceId
  city
  state
  description
  averageTime
  directions
  __typename
}

fragment KeyValueInfo on KeyValue {
  active
  id
  metadataJson
  name
  __typename
}`;
export const createUpdateFacilityDirectionVar = {
  input: {
    id: '',
    facilityId: '{{facilityId}}',
    city: null,
    state: null,
    source: 'North',
    description: 'Going North',
    averageTime: 150,
    directions: 'Keep Walking',
  },
};