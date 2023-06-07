export const getFacilitiesQuery = `query allFacilitiesV2ForFacilityPicker($filter: FacilitiesFilterV2, $first: Int, $last: Int, $before: String, $after: String, $customerIds: [ID!]) {
  allFacilitiesV2(
    filter: $filter
    first: $first
    last: $last
    before: $before
    after: $after
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      __typename
    }
    edges {
      cursor
      node {
        ...FacilityInfoV2ForFacilityPicker
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment FacilityInfoV2ForFacilityPicker on FacilityV2 {
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
  name
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
  customerFacilities(customerIds: $customerIds) {
    id
    customerId
    facilityId
    schedulingSystem
    drop
    isAutoScheduleEligible
    isAutoScheduleDefault
    __typename
  }
  facilityLoadDefaults {
    id
    facilityId
    schedSystem
    autoSchedEligible
    autoSchedDefault
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
  addressTypes {
    id
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

fragment ScheduleInfoV2 on ScheduleV2 {
  appointmentType
  appointmentTypes {
    ...KeyValueInfo
    __typename
  }
  dropType
  dropTypes {
    ...KeyValueInfo
    __typename
  }
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
  trailerTypes {
    ...KeyValueInfo
    __typename
  }
  trailerTypeIdNullable
  id
  modeType
  scheduleType
  scheduleTypeNullable
  scheduleTypes {
    ...KeyValueInfo
    __typename
  }
  serviceType
  workType
  workTypes {
    ...KeyValueInfo
    __typename
  }
  loadSize {
    ...KeyValueInfo
    __typename
  }
  loadSizes {
    ...KeyValueInfo
    __typename
  }
  loadSizeId
  temperatures {
    ...KeyValueInfo
    __typename
  }
  temperatureId
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
}`;
export const getFacilitiesVariable = { first: 500, filter: { code: '{{facilityCode}}' } };

export const getCarriersQuery = `query carriersForCarrierPickerV2($filter: CarriersFilterV2, $first: Int, $last: Int, $after: String, $before: String) {
  carriersNullableV2(
    filter: $filter
    first: $first
    last: $last
    after: $after
    before: $before
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      __typename
    }
    edges {
      cursor
      node {
        ...CarrierItemForPickerV2
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment CarrierItemForPickerV2 on CarrierV2 {
  ...CarrierItemV2
  entityType
  __typename
}

fragment CarrierItemV2 on CarrierV2 {
  id
  name
  code
  mainAddress {
    city
    state
    __typename
  }
  scacNumber
  currencyId
  __typename
}`;
export const getCarriersVariable = {
  first: 15,
  filter: {
    text: '{{carrierCode}}',
  },
};

export const getCustomersQuery = `query allCustomersForCustomerPickerV2($filter: CustomersFilterV2, $first: Int) {
  allCustomersV2(filter: $filter, first: $first) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      __typename
    }
    edges {
      cursor
      node {
        ...CustomerPickerItemV2
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment CustomerPickerItemV2 on CustomerV2 {
  code
  id
  name
  mainAddress {
    id
    city
    state
    __typename
  }
  customerStatusType {
    id
    name
    __typename
  }
  currencyId
  __typename
}`;
export const getCustomersVariable = { first: 20, filter: { text: '{{customerCode}}' } };

export const dataDictionaryQuery = `query dataDictionary {
  tenantConfiguration: dataDictionary {
    types {
      name
      options {
        id
        active
        metadataJson
        name
        shortDisplayName
        parentTermOptionId
      }
    }
  }
}`;

export const allEmployeesV2Query = `query AllEmployeesV2($filter: EmployeeFilterV2) {
  allEmployeesV2(filter: $filter) {
    edges {
      node {
        id
        userId
        firstName
      }
    }
  }
}`;

export const allEmployeesV2Var = {
  filter: {
    firstNameLastNameOrEmail: '{{userNameOrEmail}}',
  },
};