export const createOrUpdateCarrierQuery = `mutation createOrUpdateCarrierV2($input: CarrierInputV2!) {
  createOrUpdateCarrierV2(input: $input) {
    carrier {
      ...CarrierByIdInfoV2
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

fragment CarrierByIdInfoV2 on CarrierV2 {
  id
  ...CarrierInfoV2
  carrierAuditsExternalStatus {
    ...CarrierAuditsExternalStatusInfoV2
    __typename
  }
  setting {
    ...CarrierSettingInfoV2
    __typename
  }
  releaseMethods {
    ...ReleaseMethodInfoV2
    __typename
  }
  level {
    id
    name
    __typename
  }
  opportunity {
    id
    name
    __typename
  }
  carrierSalesProgressType {
    id
    name
    __typename
  }
  w9CertifiedNullable
  parentRelationship {
    ...carrierParentsInfo
    __typename
  }
  binQualified
  __typename
}

fragment CarrierInfoV2 on CarrierV2 {
  code
  roeStatus
  complianceEmail
  contacts {
    ...CarrierContactInfo
    __typename
  }
  addresses {
    ...CarrierAddressBrief
    __typename
  }
  mainAddress {
    ...CarrierAddressBrief
    __typename
  }
  reps {
    ...RepInfoV2
    __typename
  }
  dbaName
  dotNumber
  dunsNumber
  id
  mcNumber
  name
  website
  notes
  phoneNumber
  scacNumber
  status
  externalStatus
  carrierPaymentTermId
  paymentMethodId
  currencyId
  invoiceDistributionMethodId
  operatingStatus
  safetyRating
  accountingStatus
  remitToCarrier {
    id
    name
    code
    __typename
  }
  remittanceAddress {
    id
    __typename
  }
  remittanceEmail
  remittanceGrouping
  customerRelationships {
    ...CarrierCustomerRelationshipInfoV2
    __typename
  }
  accountingNotes {
    ...CarrierNoteInfo
    __typename
  }
  parent {
    id
    code
    name
    __typename
  }
  descendantIds
  electronicTrackings {
    ...CarrierElectronictrackingInfo
    __typename
  }
  electronicTrackingMethod {
    ...KeyValueInfo
    __typename
  }
  electronicTrackingType {
    ...KeyValueInfo
    __typename
  }
  manualTrackingMethod
  manualTrackingInformation
  entityType
  confirmationNotes {
    ...CarrierNoteInfo
    __typename
  }
  insurances {
    ...CarrierInsuranceInfoV2
    __typename
  }
  standing {
    ...CarrierStandingInfoV2
    __typename
  }
  groups {
    ...CarrierGroupInfo
    __typename
  }
  carrierIdentifiers {
    ...CarrierIdentifierInfoV2
    __typename
  }
  tempRemittanceGrouping
  __typename
}

fragment CarrierContactInfo on CarrierContact {
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

fragment KeyValueInfo on KeyValue {
  active
  id
  metadataJson
  name
  __typename
}

fragment CarrierAddressBrief on CarrierAddress {
  id
  carrierId
  createdAt
  updatedAt
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
  isVerified
  riskInfoSource
  thirdPartyId
  __typename
}

fragment RepInfoV2 on RepV2 {
  id
  main
  repType
  isLoadRep
  repTypeKeyId
  divisionId
  active
  modeId
  sizeId
  businessUnitId
  directionId
  employee {
    ...EmployeeV2Picker
    ...EmployeeGroupsInfoV2
    __typename
  }
  __typename
}

fragment EmployeeV2Picker on EmployeeV2 {
  companyEmail
  email
  employeeDisplayName
  employeeId
  ext
  firstName
  fullName
  id
  lastName
  middleName
  phoneNumber
  title
  userId
  managerId
  employeeGroupId
  employeeGroup {
    ...KeyValueInfo
    __typename
  }
  employeeBusinessUnits {
    ...KeyValueInfo
    __typename
  }
  employeeDivisions {
    ...KeyValueInfo
    __typename
  }
  __typename
}

fragment EmployeeGroupsInfoV2 on EmployeeV2 {
  employeeGroups {
    ...KeyValueInfo
    __typename
  }
  __typename
}

fragment CarrierCustomerRelationshipInfoV2 on CarrierCustomerRelationshipV2 {
  id
  active
  bypassCompliance
  canLoad
  carrier {
    id
    name
    code
    __typename
  }
  customer {
    id
    name
    __typename
  }
  notes {
    id
    text
    noteType
    __typename
  }
  relationshipType
  createdAt
  createdBy {
    employee {
      id
      firstName
      lastName
      __typename
    }
    __typename
  }
  updatedAt
  updatedBy {
    employee {
      id
      firstName
      lastName
      __typename
    }
    __typename
  }
  __typename
}

fragment CarrierNoteInfo on CarrierNote {
  createdAt
  id
  noteType
  carrierId
  text
  updatedAt
  __typename
}

fragment CarrierElectronictrackingInfo on CarrierElectronicTracking {
  id
  electronicTrackingMethod {
    id
    name
    __typename
  }
  electronicTrackingType {
    id
    name
    __typename
  }
  electronicTrackingMethodId
  electronicTrackingTypeId
  priority
  __typename
}

fragment CarrierInsuranceInfoV2 on CarrierInsuranceV2 {
  id
  carrierInsuranceTypeId
  producer
  insurer
  identification
  limit
  effectiveDate
  expirationDate
  cancelDate
  exemptions
  underwriterRating
  rmisCovgId
  status
  producerPhone
  producerFax
  producerEmail
  confidence
  confidenceMessage
  limitDescription
  naicCompanyNumber
  amBestCompanyNumber
  producerAddress
  producerCity
  producerZip
  producerState
  __typename
}

fragment CarrierStandingInfoV2 on CarrierStandingV2 {
  typeId
  statusTypeId
  reasonCodeId
  notes
  updatedAt
  updatedByUser {
    id
    employee {
      id
      fullName
      __typename
    }
    __typename
  }
  __typename
}

fragment CarrierGroupInfo on CarrierGroup {
  id
  carrierId
  employeeGroupId
  employeeDivisionId
  groupTypeId
  employeeGroup {
    ...KeyValueInfo
    __typename
  }
  groupType {
    ...KeyValueInfo
    __typename
  }
  employeeDivision {
    ...KeyValueInfo
    __typename
  }
  __typename
}

fragment CarrierIdentifierInfoV2 on CarrierIdentifierV2 {
  carrierId
  id
  code
  carrierIdentifierTypeId
  link
  __typename
}

fragment CarrierAuditsExternalStatusInfoV2 on CarrierAuditsExternalStatusV2 {
  id
  createdAt
  currentValue {
    externalStatus
    status
    riskInfoSource
    nonCertifiedReasons
    __typename
  }
  previousValue {
    externalStatus
    status
    riskInfoSource
    nonCertifiedReasons
    __typename
  }
  createdByEmployee {
    id
    employeeDisplayName
    __typename
  }
  __typename
}

fragment CarrierSettingInfoV2 on CarrierSettingV2 {
  carrierId
  defaultDestinationDeadhead {
    asMiles
    asRoundedMiles
    __typename
  }
  defaultDestinationText
  defaultOriginDeadhead {
    asMiles
    asRoundedMiles
    __typename
  }
  defaultTrailerLength
  defaultTrailerLengthUnit
  defaultTrailerTypeId
  id
  intrastate
  __typename
}

fragment ReleaseMethodInfoV2 on CarrierReleaseMethod {
  id
  releaseMethodKey
  isReleaseNeeded
  __typename
}

fragment carrierParentsInfo on ParentRelationship {
  id
  carrierId
  carrierParentId
  carrierParent {
    id
    name
    __typename
  }
  createdAt
  updatedAt
  createdByUser {
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
export const createOrUpdateCarrierVar = {
  input: {
    addresses: [
      {
        id: '',
        city: 'Atlanta',
        state: 'GA',
        street1: '2455 Paces Ferry Rd SE',
        street2: '',
        postalCode: '30339-6444',
        country: 'USA',
        addressTypeId: 'Billing',
        main: true,
        isVerified: false,
        riskInfoSource: 'userInput',
        thirdPartyId: null,
        _destroy: 'false',
      },
    ],
    entityType: 'carrier',
    contacts: [
      {
        chatTypeId: 'Google',
        chatUsername: 'google98383',
        contactTypeId: 'Billing',
        faxNumber: '',
        id: '',
        name: 'Roby Williams',
        phoneNumber: '{{carrierPh}}',
        main: true,
        riskInfoSource: 'userInput',
        thirdPartyId: null,
        _destroy: 'false',
      },
    ],
    code: '{{carrierCode}}',
    name: '{{carrierName}}',
    id: '',
    insurances: '{{insurances}}',
    paymentMethodId: 'Check',
    reps: [
      {
        employeeId: '{{mastermindUserId}}',
        main: true,
        repType: 'carrierManager',
        isLoadRep: true,
      },
    ],
    carrierPaymentTermId: 'Net 30',
    currencyId: 'USD',
    invoiceDistributionMethodId: 'Print',
    w9CertifiedNullable: null,
    electronicTrackingMethodId: 'Dr cell',
    electronicTrackingTypeId: 'Fourkites',
    riskInfoSource: 'userInput',
    carrierIdentifiers: [
      {
        id: '',
        code: 'DUNES38383',
        carrierIdentifierTypeId: 'DUNS',
        link: '{{carrierUrl}}',
        _destroy: 'false',
      },
    ],
    mcNumber: '5555555',
    dotNumber: '4444',
    phoneNumber: '{{carrierPh}}',
    dbaName: '{{carrierDBAName}}',
    binQualified: true,
    scacNumber: '{{scacNumber}}',
    manualTrackingMethod: 'email',
    manualTrackingInformation: '{{carrierEmail}}',
    notes: 'General Notes here....',
    allNotes: [
      {
        noteType: 'carrierConfirmation',
        text: 'Rate Con notes are here....',
      },
    ],
  },
};

export const createUpdateCarrierSettingQuery = `mutation createOrUpdateCarrierSettingV2($input: CarrierSettingInputV2!) {
  createOrUpdateCarrierSettingV2(input: $input) {
    carrierSetting {
      ...CarrierSettingInfoV2
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

fragment CarrierSettingInfoV2 on CarrierSettingV2 {
  carrierId
  defaultDestinationDeadhead {
    asMiles
    asRoundedMiles
    __typename
  }
  defaultDestinationText
  defaultOriginDeadhead {
    asMiles
    asRoundedMiles
    __typename
  }
  defaultTrailerLength
  defaultTrailerLengthUnit
  defaultTrailerTypeId
  id
  intrastate
  __typename
}`;
export const createUpdateCarrierSettingVar = {
  input: {
    carrierId: '{{carrierId}}',
    defaultDestinationDeadhead: {
      unit: 'miles',
      value: 200,
    },
    defaultDestinationText: 'Omaha, NE',
    defaultOriginDeadhead: {
      unit: 'miles',
      value: 200,
    },
    defaultTrailerLength: 53,
    defaultTrailerLengthUnit: 'ft',
    defaultTrailerTypeId: '{{trailerId}}',
    id: '',
    intrastate: false,
  },
};

export const copyGlobalVendorReqDocCarrierQuery = `mutation copyGlobalVendorRequiredDocumentForCarrier($input: ID!) {
  copyGlobalVendorRequiredDocumentForCarrier(vendorId: $input) {
    id
    __typename
  }
}`;
export const copyGlobalVendorReqDocCarrierVar = {
  input: '{{carrierId}}',
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
      addressableType: 'Carrier',
      cleanseSource: 'Melissa',
      cleanseStatus: 'User Custom',
    },
  ],
};

export const updateCarrierStandingV2Query = `mutation updateCarrierStandingV2($input: CarrierStandingInputV2!) {
  updateCarrierStandingV2(input: $input) {
    carrier {
      standing {
        ...CarrierStandingInfoV2
        __typename
      }
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

fragment CarrierStandingInfoV2 on CarrierStandingV2 {
  typeId
  statusTypeId
  reasonCodeId
  notes
  updatedAt
  updatedByUser {
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
export const updateCarrierStandingV2Var = {
  input: {
    typeId: '8370f6b3-1fd5-4001-a5ce-019af9ef427b',
    statusTypeId: '{{carrierStandingStatus}}',
    reasonCodeId: '{{carrierStandingReasonCodeObject}}',
    notes: 'Carrier Standing notes',
    carrier: {
      id: '{{carrierId}}',
    },
  },
};

export const createCarrierCertificationV2Query = `mutation createCarrierCertificationV2($input: CarrierCertificationInputV2!) {
  createOrUpdateCarrierCertificationV2(input: $input) {
    carrierCertification {
      ...CarrierCertificationInfoV2
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

fragment CarrierCertificationInfoV2 on CarrierCertificationV2 {
  id
  note
  expirationDate
  carrierCertificationTypeId
  __typename
}`;
export const createCarrierCertificationV2Var = {
  input: {
    id: '',
    carrierCertificationTypeId: '{{carrierCertTypeId}}',
    note: 'We have required certs',
    expirationDate: '{{carrierCertExpDate}}',
    carrier: {
      id: '{{carrierId}}',
    },
  },
};

export const createUpdateCarrierCustRelQuery = `mutation createOrUpdateCarrierCustomerRelationship($input: CarrierCustomerRelationshipInput!) {
  createOrUpdateCarrierCustomerRelationship(input: $input) {
    carrierCustomerRelationship {
      ...CarrierCustomerRelationshipInfo
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

fragment CarrierCustomerRelationshipInfo on CarrierCustomerRelationship {
  id
  active
  bypassCompliance
  canLoad
  carrier {
    id
    name
    code
    __typename
  }
  customer {
    id
    name
    __typename
  }
  notes {
    id
    text
    noteType
    __typename
  }
  relationshipType
  createdAt
  createdBy {
    employee {
      id
      firstName
      lastName
      __typename
    }
    __typename
  }
  updatedAt
  updatedBy {
    employee {
      id
      firstName
      lastName
      __typename
    }
    __typename
  }
  __typename
}`;
export const createUpdateCarrierCustRelVar = {
  input: {
    active: true,
    bypassCompliance: false,
    canLoad: true,
    carrierId: '{{carrierId}}',
    customerId: '{{relatedCustomerIdToCarrier}}',
    id: '',
    relationshipType: 'preferred',
    notes: [
      {
        id: '',
        text: 'Hello there',
        noteType: 'carrierCustomer',
      },
    ],
  },
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
    carrierId: '{{carrierId}}',
    facilityId: '{{relatedFacilityIdToCarrier}}',
    relationshipType: 'Preferred',
    canLoad: true,
    isActive: true,
  },
};
export const createTruckEntryQuery = `mutation CreateTruckEntry($input: CreateTruckEntryInput!, $useCarrierV2: Boolean!, $useEmployeeV2: Boolean!) {
    createTruckEntry(input: $input) {
      truckEntry {
        ...TruckEntryInfo
        __typename
      }
      errors {
        message
        path
        extensions
        __typename
      }
      __typename
    }
  }
  
  fragment TruckEntryInfo on TruckEntry {
    id
    bracingType
    bracingCount
    carrierId
    createdByUser @skip(if: $useEmployeeV2) {
      id
      employee {
        id
        employeeDisplayName
        __typename
      }
      __typename
    }
    createdByUserV2 @include(if: $useEmployeeV2) {
      id
      employee {
        id
        employeeDisplayName
        __typename
      }
      __typename
    }
    destinationDeadhead {
      asRoundedMiles
      __typename
    }
    destinationStateIds
    destinationStates {
      ...GeographyInfo
      __typename
    }
    destinationLocation {
      city
      countryAlpha2Code
      postalCode
      point {
        lat
        lon
        __typename
      }
      stateAlpha2Code
      __typename
    }
    driverName
    finalByDatetimeUtc
    finalByTimezone
    isHazmat
    isTeam
    loadByDatetimeUtc
    loadByTimezone
    notes
    originLocation {
      city
      countryAlpha2Code
      postalCode
      point {
        lat
        lon
        __typename
      }
      stateAlpha2Code
      __typename
    }
    originDeadhead {
      asRoundedMiles
      __typename
    }
    owner @skip(if: $useCarrierV2) {
      id
      code
      name
      __typename
    }
    ownerV2 @include(if: $useCarrierV2) {
      id
      code
      name
      __typename
    }
    ownerId
    palletsType
    palletsCount
    previousRouteV2 {
      id
      code
      load {
        id
        __typename
      }
      __typename
    }
    previousRouteIdV2
    readyDatetimeUtc
    readyTimezone
    sourceTypeId
    sourceTypeDDT {
      id
      name
      active
      metadataJson
      __typename
    }
    trailerSizeLength {
      asRoundedFeet
      __typename
    }
    tarpsType
    tarpsCount
    trailerNumber
    trailerTypeId
    trailerType {
      id
      name
      active
      metadataJson
      __typename
    }
    truckEntryTemplateId
    __typename
  }
  
  fragment GeographyInfo on Geography {
    id
    country
    county
    name
    source
    sourceId
    state
    abbreviatedState
    timezone
    township
    __typename
  }`;
export const createTruckEntryVar = {
  input: {
    bracingCount: null,
    bracingType: null,
    carrierId: '{{carrierId}}',
    createdByUserId: '0a031883-2905-4564-a4ee-47d6611c72b2',
    destinationDeadhead: {
      unit: 'mi',
      value: 200,
    },
    destinationLocation: {
      city: '{{destCity}}',
      countryAlpha2Code: '{{destCountryCode}}',
      stateAlpha2Code: '{{destStateCode}}',
    },
    destinationStateIds: null,
    finalByDatetimeUtc: null,
    finalByTimezone: null,
    isHazmat: false,
    isTeam: false,
    loadByDatetimeUtc: '{{YYY-MM-DD}}' + 'T15:00:00.000Z',
    loadByTimezone: 'America/Anchorage',
    originDeadhead: {
      unit: 'mi',
      value: 200,
    },
    originLocation: {
      city: '{{originCity}}',
      countryAlpha2Code: '{{originCountryCode}}',
      stateAlpha2Code: '{{originStateCode}}',
    },
    ownerId: null,
    palletsCount: null,
    palletsType: null,
    previousRouteIdV2: null,
    readyDatetimeUtc: '{{YYY-MM-DD}}' + 'T15:00:00.000Z',
    readyTimezone: 'America/Anchorage',
    sourceTypeId: 'manual',
    tarpsCount: null,
    tarpsType: null,
    trailerSizeLength: {
      unit: 'ft',
      value: 53,
    },
    trailerTypeId: '{{trailerId}}',
    updatedByUserId: '0a031883-2905-4564-a4ee-47d6611c72b2',
  },
  useCarrierV2: false,
  useEmployeeV2: true,
};

export const deleteTruckEntryQuery = `mutation deleteTruckEntry($id: String) {
  deleteTruckEntry(id: $id) {
    errors {
      message
      path
      extensions
      __typename
    }
    __typename
  }
}`;
export const deleteTruckEntryVar = {
  id: '{{truckEntryID}}',
};
export const carrierSearchQuery = `query searchCarriers($filter: CarriersFilter, $first: Int, $last: Int, $after: String, $before: String) {
   
  carriersNullable( filter: $filter first: $first last: $last after: $after before: $before   ) {
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
          ...CarrierInfoSearchPage
          __typename
        } 
        __typename
      }
      __typename
    }
}  
fragment CarrierInfoSearchPage on Carrier {
 id
 name
 code
 mainAddress {
  id
  city
  state
  __typename
}
reps {
  id
  main
  employee {
    id
    firstName
    lastName
    __typename
  }
 __typename
 }
 scacNumber
 mcNumber
  dotNumber
  levelId
  status
  opportunity {
    id
    name
    __typename
  }
  carrierServices {
    id
    carrierServiceType {
      id
      name
      __typename
    }
    __typename
  }
  certifications {
    id
    carrierCertificationType {
      id
      name
      __typename
    }
    __typename
  }
  __typename
}`;
export const carrierSearchVar = {
  filter:
  {
    name: '{{carrierName}}',
  },
  first: 100,
};
export const crmOpportunityEntityLookupV2Query = `query CrmOpportunityEntityLookupV2 {
  crmOpportunityEntityLookupV2 {
    entityLookupId
  }
}`;
export const crmOpportunitySaveV2Query = `mutation CrmOpportunitySaveV2($objCrmOpportunity: CrmOpportunityInputV2!) {
  crmOpportunitySaveV2(objCrmOpportunity: $objCrmOpportunity) {
    opportunityId
    name
    stageTerm
    typeTerm
    statusTerm
  }
}`;

export const crmOpportunitySaveV2Var = {
  objCrmOpportunity: {
    entityId: '{{carrierId}}',
    name: 'AutoOpportunities',
    stageTerm: '{{opprStage}}',
    typeTerm: 'New Business',
    entityLookupId: '{{entityLookupID}}',
    statusTerm: '{{opprStatus}}',
    crmOpportunityBusinessUnit: [],
    crmOpportunityContact: [],
    crmOpportunityEquipment: [],
    crmOpportunityIbRegion: [
      {
        opportunityId: '',
        ibRegionsData: '[]',
        updatedBy: '{{employeeUserID}}',
        createdBy: '{{employeeUserID}}',
      },
    ],
    crmOpportunityMode: [],
    crmOpportunityObRegion: [
      {
        obRegionsData: '[]',
        updatedBy: '{{employeeUserID}}',
        createdBy: '{{employeeUserID}}',
      },
    ],
    crmOpportunityReps: [
      {
        rep: '{{employeeID}}',
        updatedBy: '{{employeeUserID}}',
        createdBy: '{{employeeUserID}}',
      },
    ],
    crmOpportunitySize: [],
    crmOpportunitySolution: [],
    createdBy: '{{employeeUserID}}',
    updatedBy: '{{employeeUserID}}',
  },
};

export const crmSaveContactQuery = `mutation CrmSaveContact($contact: CrmContactInput!) {
  crmSaveContact(contact: $contact) {
  name
  departmentTerm
  contactId
  }
  }`;

export const crmSaveContactVar = {
  contact: {
    name: '{{contactName}}',
    departmentTerm: '{{departmentName}}',
    levelTerm: null,
    title: null,
    linkedInURL: null,
    entityId: '{{carrierId}}',
    information: [],
    associatedEntities: [
      {
        entityId: '{{carrierId}}',
        entityLookup: '{{entityLookupID}}',
        statusTerm: 'Active',
        functions: [],
        createdBy: '{{employeeUserID}}',
        updatedBy: '{{employeeUserID}}',
      },
    ],
    createdBy: '{{employeeUserID}}',
    updatedBy: '{{employeeUserID}}',
  },
};

export const crmContactEntityLookupQuery = `query CrmContactEntityLookup {
  crmContactEntityLookup {
    entityLookupId
  }
}`;