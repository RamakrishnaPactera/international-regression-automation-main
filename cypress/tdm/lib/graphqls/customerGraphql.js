export const createOrUpdateCustomerQuery = `mutation createOrUpdateCustomerV2($input: CustomerInputV2!) {
  createOrUpdateCustomerV2(input: $input) {
    customer {
      ...CustomerInfoV2
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

fragment CustomerInfoV2 on CustomerV2 {
  roeStatus
  billToCustomer {
    code
    id
    name
    __typename
  }
  billingAddress {
    id
    __typename
  }
  billingEmail
  code
  id
  name
  notes
  phoneNumber
  website
  insuranceCargo
  insuranceGeneral
  insuranceLiability
  contacts {
    ...CustomerContactInfoV2
    __typename
  }
  customerOpportunityType {
    ...KeyValueInfo
    __typename
  }
  customerLevelType {
    ...KeyValueInfo
    __typename
  }
  customerStatusType {
    ...KeyValueInfo
    __typename
  }
  customerSalesProgressType {
    ...KeyValueInfo
    __typename
  }
  electronicTracking
  reps {
    ...CustomerRepInfoV2
    __typename
  }
  mainRep {
    ...CustomerRepInfoV2
    __typename
  }
  addresses {
    ...CustomerAddressBriefV2
    __typename
  }
  customerPaymentTermId
  customerPaymentTerm {
    ...KeyValueInfo
    __typename
  }
  facilityRelationships {
    ...CustomerFacilityRelationshipInfoV2
    __typename
  }
  carrierRelationships {
    ...CarrierCustomerRelationshipInfoV2
    __typename
  }
  paymentMethodId
  paymentMethod {
    ...KeyValueInfo
    __typename
  }
  currencyId
  currency {
    ...KeyValueInfo
    __typename
  }
  invoiceDistributionMethodId
  invoiceDistributionMethod {
    ...KeyValueInfo
    __typename
  }
  invoiceGrouping
  identifiers {
    ...IdentifierInfoV2
    __typename
  }
  mainAddress {
    ...CustomerAddressBriefV2
    __typename
  }
  accountingNotes {
    ...CustomerNoteInfo
    __typename
  }
  parent {
    id
    code
    name
    creditStatus
    __typename
  }
  ancestorIds
  descendantIds
  useParentCredit
  electronicTrackingType {
    ...KeyValueInfo
    __typename
  }
  electronicTrackingNumber
  electronicTracking
  loadReferenceType {
    id
    name
    __typename
  }
  loadReferenceTypeId
  creditLimit
  creditStatus
  creditHistories {
    ...CreditHistoryInfoV2
    __typename
  }
  accountsReceivableOverdue
  availableCredit
  creditProviders {
    ...CustomerCreditProviderInfoV2
    __typename
  }
  settings {
    ...CustomerSettingInfoV2
    __typename
  }
  groups {
    ...CustomerGroupInfoV2
    __typename
  }
  isTaxExempt
  ratingSourceId
  autoInvoiceEnabled
  accountingStatus
  __typename
}

fragment CustomerContactInfoV2 on CustomerContact {
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

fragment CustomerRepInfoV2 on CustomerRepV2 {
  employee {
    ...EmployeeDetailsInfoV2
    ...EmployeeGroupsInfoV2
    __typename
  }
  id
  main
  isLoadRep
  repType {
    ...KeyValueInfo
    __typename
  }
  active
  divisionId
  modeId
  sizeId
  businessUnitId
  directionId
  __typename
}

fragment EmployeeDetailsInfoV2 on EmployeeV2 {
  id
  businessUnit {
    id
    name
    active
    __typename
  }
  businessUnitId
  companyEmail
  division {
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
  divisionId
  email
  emergencyContact
  emergencyPhone
  employeeCompanyLevelId
  employeeDepartmentId
  employeeDepartmentLevelId
  employeeDisplayName
  employeeGenderId
  employeeGroupId
  employeeGroup {
    ...KeyValueInfo
    __typename
  }
  employeeId
  employeeOfficeId
  employeeOffice {
    ...KeyValueInfo
    __typename
  }
  employeeRoleId
  employeeShirtSizeId
  employeeStatus {
    id
    active
    __typename
  }
  employeeSuffixId
  employeeTimeId
  employeeTypeId
  ext
  firstName
  firstNameDotLastName
  fullName
  hireDate
  lastName
  managerId
  manager {
    ...EmployeeSimpleV2
    __typename
  }
  middleName
  mobilePhone
  nickname
  personalEmail
  phoneNumber
  project {
    id
    name
    active
    __typename
  }
  projectId
  relationship
  slackName
  subRegion
  termDate
  title
  userId
  __typename
}

fragment EmployeeSimpleV2 on EmployeeV2 {
  companyEmail
  email
  emergencyContact
  emergencyPhone
  employeeDepartmentId
  employeeDisplayName
  employeeGenderId
  employeeGroupId
  employeeId
  employeeOfficeId
  employeeSuffixId
  ext
  firstName
  fullName
  id
  lastName
  middleName
  nickname
  personalEmail
  phoneNumber
  relationship
  title
  userId
  managerId
  __typename
}

fragment EmployeeGroupsInfoV2 on EmployeeV2 {
  employeeGroups {
    ...KeyValueInfo
    __typename
  }
  __typename
}

fragment CustomerAddressBriefV2 on CustomerAddress {
  id
  addressableId
  addressableType
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

fragment CustomerFacilityRelationshipInfoV2 on CustomerFacilityRelationshipV2 {
  facility {
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
  schedulingSystemTypeId
  schedulingSystemType {
    id
    name
    description
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

fragment IdentifierInfoV2 on IdentifierV2 {
  id
  code
  identifierTypeId
  __typename
}

fragment CustomerNoteInfo on CustomerNote {
  createdAt
  id
  noteType
  noteableType
  noteableId
  text
  updatedAt
  __typename
}

fragment CreditHistoryInfoV2 on CreditHistoryV2 {
  id
  customerId
  status
  creditLimit
  currency {
    ...KeyValueInfo
    __typename
  }
  expiration
  note
  createdBy {
    ...UserInfoV2
    __typename
  }
  createdAt
  __typename
}

fragment UserInfoV2 on UserV2 {
  id
  email
  employee {
    ...EmployeeInfoV2
    ...EmployeeGroupsInfoV2
    __typename
  }
  __typename
}

fragment EmployeeInfoV2 on EmployeeV2 {
  id
  businessUnit {
    id
    name
    active
    __typename
  }
  businessUnitId
  companyEmail
  division {
    ...KeyValueInfo
    __typename
  }
  divisionId
  email
  emergencyContact
  emergencyPhone
  employeeCompanyLevelId
  employeeDepartmentId
  employeeDepartmentLevelId
  employeeDisplayName
  employeeGenderId
  employeeGroupId
  employeeGroup {
    ...KeyValueInfo
    __typename
  }
  employeeId
  employeeOfficeId
  employeeOffice {
    ...KeyValueInfo
    __typename
  }
  employeeRoleId
  employeeShirtSizeId
  employeeStatus {
    id
    active
    __typename
  }
  employeeSuffixId
  employeeTimeId
  employeeTypeId
  ext
  firstName
  firstNameDotLastName
  fullName
  hireDate
  lastName
  managerId
  manager {
    ...EmployeeSimpleV2
    __typename
  }
  middleName
  mobilePhone
  nickname
  personalEmail
  phoneNumber
  project {
    id
    name
    active
    __typename
  }
  projectId
  relationship
  slackName
  subRegion
  termDate
  title
  userId
  __typename
}

fragment CustomerCreditProviderInfoV2 on CustomerCreditProviderV2 {
  id
  creditProvider {
    ...KeyValueInfo
    __typename
  }
  creditScore
  coverageAmount
  currency {
    ...KeyValueInfo
    __typename
  }
  notes
  effectiveDate
  expirationDate
  createdByUser {
    ...UserInfoV2
    __typename
  }
  createdAt
  createdAtDateTime
  __typename
}

fragment CustomerSettingInfoV2 on CustomerSettingV2 {
  id
  defaultTrailerLength {
    asRoundedFeet
    __typename
  }
  trailerTypes {
    ...KeyValueInfo
    __typename
  }
  doNotPostLoads
  __typename
}

fragment CustomerGroupInfoV2 on CustomerGroupV2 {
  id
  customer {
    id
    __typename
  }
  groupType {
    ...KeyValueInfo
    __typename
  }
  employeeGroup {
    ...KeyValueInfo
    __typename
  }
  employeeDivision {
    ...KeyValueInfo
    __typename
  }
  __typename
}`;
export const createOrUpdateCustomerVar = {
  input: {
    code: '{{customerCode}}',
    id: '',
    name: '{{customerName}}',
    notes: 'Hey, here are my customer notes',
    phoneNumber: '{{customerPh}}',
    website: '{{customerUrl}}',
    customerLevelTypeId: '{{customerLevelType}}',
    customerOpportunityTypeId: '{{customerOpportunityType}}',
    customerStatusTypeId: '{{customerStatus}}',
    electronicTrackingTypeId: 'Fourkites',
    insuranceCargo: '{{customerCargoInsurance}}',
    insuranceGeneral: '{{customerGeneralInsurance}}',
    insuranceLiability: '{{customerLiabilityInsurance}}',
    electronicTrackingNumber: 'FK288383',
    electronicTracking: true,
    reps: [
      {
        main: true,
        isLoadRep: true,
        employeeId: '{{mastermindUserId}}',
        repTypeId: 'Customer Sales Manager',
        divisionId: 'Brokerage',
        modeId: 'Intermodal',
        sizeId: 'FTL',
        businessUnitId: null,
        directionId: 'Inbound',
        _destroy: 'false',
      },
    ],
    addresses: [
      {
        id: '',
        city: '{{city}}',
        state: '{{state}}',
        street1: '{{street1}}',
        street2: '',
        postalCode: '{{postalCode}}',
        country: '{{country}}',
        addressTypeId: 'Billing',
        main: true,
        isVerified: false,
        _destroy: 'false',
      },
    ],
    contacts: [
      {
        chatTypeId: 'Facebook',
        chatUsername: 'valentino',
        contactTypeId: 'Accounts Payable',
        faxNumber: '',
        id: '',
        name: 'Valentino Rossi',
        phoneNumber: '+17703456787',
        main: true,
        _destroy: 'false',
      },
    ],
    //Commented the below code to fix the Customer TDM, can be used if required in future
    //identifiers: [
    //{
    //id: '',
    //code: '{{identiferCode}}',
    //identifierTypeId: '{{identifierTypeId}}',
    //_destroy: 'false',
    //},
    //],
    customerPaymentTermId: 'Net 30',
    paymentMethodId: 'Check',
    currencyId: 'USD',
    invoiceDistributionMethodId: '{{invoiceDistributionMethodId}}',
  },
};

export const createUpdateCustomerSettingQuery = `mutation createOrUpdateCustomerSettingV2($input: CustomerSettingInputV2!) {
  createOrUpdateCustomerSettingV2(input: $input) {
    customerSetting {
      ...CustomerSettingInfoV2
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

fragment CustomerSettingInfoV2 on CustomerSettingV2 {
  id
  defaultTrailerLength {
    asRoundedFeet
    __typename
  }
  trailerTypes {
    ...KeyValueInfo
    __typename
  }
  doNotPostLoads
  __typename
}

fragment KeyValueInfo on KeyValue {
  active
  id
  metadataJson
  name
  __typename
}`;
export const createUpdateCustomerSettingVar = {
  input: {
    id: '',
    customerId: '{{customerId}}',
    defaultTrailerLength: {
      unit: 'feet',
      value: 53,
    },
  },
};

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
    entityId: '{{customerId}}',
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
    entityId: '{{customerId}}',
    information: [],
    associatedEntities: [
      {
        entityId: '{{customerId}}',
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

export const crmOpportunityEntityLookupV2Query = `query CrmOpportunityEntityLookupV2 {
  crmOpportunityEntityLookupV2 {
    entityLookupId
  }
}`;

export const crmContactEntityLookupQuery = `query CrmContactEntityLookup {
  crmContactEntityLookup {
    entityLookupId
  }
}`;

export const createCreditHistoryQuery = `mutation createCreditHistoryV2($input: CreditHistoryInputV2!) {
  createCreditHistoryV2(input: $input) {
    creditHistory {
      ...CreditHistoryInfoV2
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

fragment CreditHistoryInfoV2 on CreditHistoryV2 {
  id
  customerId
  status
  creditLimit
  currency {
    ...KeyValueInfo
    __typename
  }
  expiration
  note
  createdBy {
    ...UserInfoV2
    __typename
  }
  createdAt
  __typename
}

fragment KeyValueInfo on KeyValue {
  active
  id
  metadataJson
  name
  __typename
}

fragment UserInfoV2 on UserV2 {
  id
  email
  employee {
    ...EmployeeInfoV2
    __typename
  }
  __typename
}

fragment EmployeeInfoV2 on EmployeeV2 {
  id
  businessUnit {
    id
    name
    active
    __typename
  }
  businessUnitId
  companyEmail
  division {
    ...KeyValueInfo
    __typename
  }
  divisionId
  email
  emergencyContact
  emergencyPhone
  employeeCompanyLevelId
  employeeDepartmentId
  employeeDepartmentLevelId
  employeeDisplayName
  employeeGenderId
  employeeGroupId
  employeeGroup {
    ...KeyValueInfo
    __typename
  }
  employeeGroups {
    ...KeyValueInfo
    __typename
  }
  employeeId
  employeeOfficeId
  employeeOffice {
    ...KeyValueInfo
    __typename
  }
  employeeRoleId
  employeeShirtSizeId
  employeeStatus {
    id
    active
    __typename
  }
  employeeSuffixId
  employeeTimeId
  employeeTypeId
  ext
  firstName
  firstNameDotLastName
  fullName
  hireDate
  lastName
  managerId
  manager {
    ...EmployeeSimpleV2
    __typename
  }
  middleName
  mobilePhone
  nickname
  personalEmail
  phoneNumber
  project {
    id
    name
    active
    __typename
  }
  projectId
  relationship
  slackName
  subRegion
  termDate
  title
  userId
  __typename
}

fragment EmployeeSimpleV2 on EmployeeV2 {
  companyEmail
  email
  emergencyContact
  emergencyPhone
  employeeDepartmentId
  employeeDisplayName
  employeeGenderId
  employeeGroupId
  employeeId
  employeeOfficeId
  employeeSuffixId
  ext
  firstName
  fullName
  id
  lastName
  middleName
  nickname
  personalEmail
  phoneNumber
  relationship
  title
  userId
  managerId
  __typename
}`;
export const createCreditHistoryVar = {
  input: {
    id: '',
    customerId: '{{customerId}}',
    status: '{{creditStatus}}',
    limit: '{{creditLimit}}',
    expiration: '{{customerCreditExpiryDate}}',
    note: 'Credit is approved by Mark',
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
      addressableType: 'Customer',
      cleanseSource: 'Melissa',
      cleanseStatus: 'User Custom',
    },
  ],
};

export const createUpdateCarCustRelQuery = `mutation createOrUpdateCarrierCustomerRelationshipV2($input: CarrierCustomerRelationshipInputV2!) {
  createOrUpdateCarrierCustomerRelationshipV2(input: $input) {
    carrierCustomerRelationship {
      ...CarrierCustomerRelationshipInfoV2
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
}`;
export const createUpdateCarCustRelVar = {
  input: {
    active: true,
    bypassCompliance: false,
    canLoad: true,
    carrierId: '{{relatedCarrierIdToCustomer}}',
    customerId: '{{customerId}}',
    id: '',
    relationshipType: 'preferred',
    notes: [],
  },
};

export const createUpdateCustFacilityRelQuery = `mutation createOrUpdateCustomerFacilityRelationshipV2($input: CustomerFacilityRelationshipInputV2!) {
  createOrUpdateCustomerFacilityRelationshipV2(input: $input) {
    customerFacilityRelationship {
      ...CustomerFacilityRelationshipInfoV2
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

fragment CustomerFacilityRelationshipInfoV2 on CustomerFacilityRelationshipV2 {
  facility {
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
    id
    name
    description
    __typename
  }
  __typename
}`;

export const createUpdateCustFacilityRelVar = {
  input: {
    id: '',
    pickup: true,
    pickupCode: 'NBA',
    delivery: true,
    deliveryCode: 'MLB',
    customerId: '{{customerId}}',
    facilityId: '{{relatedFacilityIdToCustomer}}',
    schedulingSystemTypeId: 'Manhattan',
  },
};

export const createCustomerLoadDefaultsQuery = `mutation createCustomerLoadDefaults($input: CreateLoadDefaultsInput!) {
  createLoadDefaults(input: $input) {
    ...CustomerLoadDefaults
    __typename
  }
}

fragment CustomerLoadDefaults on LoadDefaults {
  id
  customerId
  mode
  sizeV2
  equipment
  specialRequirements
  minLength
  width
  height
  doNotPostLoads
  disableAutoPost
  cargoValue
  cargoUnit
  loadDefaultsDivisions {
    ...CustomerLoadDefaultsDivision
    __typename
  }
  loadDefaultsBusinessUnits {
    ...CustomerLoadDefaultsBusinessUnit
    __typename
  }
  __typename
}

fragment CustomerLoadDefaultsDivision on LoadDefaultsDivision {
  division
  __typename
}

fragment CustomerLoadDefaultsBusinessUnit on LoadDefaultsBusinessUnit {
  businessUnit
  __typename
}`;

export const createCustomerLoadDefaultsVar = {

  input: {
    mode: 'Truck',
    equipment: '{{trailerTypeIds}}',
    minLength: 0,
    width: 0,
    height: null,
    cargoValue: null,
    cargoUnit: 'USD',
    customerId: '{{customerId}}',
  },
};