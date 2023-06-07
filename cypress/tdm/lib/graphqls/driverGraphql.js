export const createDriverMutation = `mutation CreateOrUpdateDriver($input: AssetDriverInput!) {
  createOrUpdateDriver(input: $input) {
    driver {
      id
      code
      firstName
      middleName
      lastName
      displayName
      nameSuffixTerm
      nickname
      phoneNumber
      emailAddress
      isSmsEnabled
      preferredGenderPronounTerm
      maritalStatusTerm
      spouseName
      childrenTerm
      militaryReserveObligationsTerm
      personalParkingSpace
      dateOfBirth
      professionalTypeTerm
      trainer {
        code
        id
        firstName
        lastName
        displayName
      }
      partner {
        id
        code
        firstName
        lastName
        displayName
      }
      driverHireDate
      yearsOfService
      companyCode
      terminationDate
      commercialDriverClassTerm
      divisionTerm
      project
      program
      businessUnitTerm
      statusTerm
      hosRuleTerm
      vacationDays {
        allotted
        remaining
        resetDate
      }
      sickDays {
        allotted
        remaining
        resetDate
      }
      createdBy
      updatedBy
      createdAt
      updatedAt
      terminal {
        code
        id
        name
      }
      dutyStatus
      remainingWorkingHours
      nextResetDate
      preferredNextAvailable {
        dateTime
        location {
          city
          state
        }
      }
      calculatedNextAvailable {
        dateTime
        location {
          city
          state
        }
      }
      driverFacility {
        id
        name
        preference
        reason
      }
      driverCommodity {
        id
        commodity
        preference
        reason
        recordedBy
        systemDate
        isActive
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      driverCustomer {
        id
        name
        reason
        recordedBy
        systemDate
        isActive
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
        city
        state
        status
        preferenceTerm
      }
      driverTeam {
        id
        type
        preference
        reason
        notes
        recordedBy
        systemDate
        isActive
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      driverOperational {
        id
        type
        preference
        qualifier
        recordedBy
        systemDate
        isActive
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      driverGeography {
        id
        city
        state
        preference
        direction
        reason
        recordedBy
        systemDate
        isActive
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      driverCareerGoals {
        id
        position
        fleet
        division
        businessUnit
        customer
        preference
        reason
        recordedBy
        systemDate
        isActive
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      driverPreferredLanes {
        id
        originType
        originCityState
        originRegion
        destinationType
        destinationCityState
        destinationRegion
        preference
        reason
        recordedBy
        systemDate
        isActive
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
        isDeleted
      }
      driverPreferredRoutes {
        id
        shipper
        originCityState
        originState
        consignee
        destinationCityState
        destinationState
        stops
        additionalStops
        customer
        preference
        reason
        recordedBy
        systemDate
        isActive
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
        isDeleted
        preferredRouteStops {
          id
          type
          cityState
          state
          facility
          isActive
          routeId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
      }
      driverWeeklyTargets {
        id
        weekStartDate
        target {
          days
          loadedMiles
          emptyMiles
          revenue
        }
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
        driverDailyActivities {
          id
          weekDay
          hours
          emptyMiles
          loadedMiles
          totalMiles
          revenue
          weeklyTargetId
          createdBy
          updatedBy
          createdAt
          updatedAt
        }
      }
      driverTrainings {
        id
        typeTerm
        dueDate
        completedDate
        outcomeTerm
        facility {
          code
          id
        }
        trainerName
        description
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      driverFleets {
        id
        type
        typeTerm
        effectiveDate
        expirationDate
        carrier {
          code
          name
          id
        }
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      driverRepresentatives {
        id
        typeTerm
        effectiveDate
        expirationDate
        employeeId {
          id
          employeeId
          firstName
          lastName
        }
        driverId
        isActive
        isMain
        isLoad
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      fleets {
        id
        type
        typeTerm
        effectiveDate
        expirationDate
        carrier {
          code
          name
          id
        }
        driverId
        createdBy
        updatedBy
        createdAt
        updatedAt
      }
      permanentTrailerCodes
      permanentPowerUnitCode
      permanentPower {
        id
        code
      }
      assetDriverAddresses {
        id
        typeTerm
        street1
        street2
        city
        state
        postalCode
        country
        driverId
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
      assetDriverContacts {
        id
        typeTerm
        name
        emailAddress
        phoneNumber
        extension
        faxNumber
        instantMessenger {
          typeTerm
          userName
        }
        isMain
        isPayContactAllowedParty
        driverId
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
      assetDriverAwards {
        id
        typeTerm
        description
        awardDate
        driverId
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
      assetDriverEquipment {
        id
        typeTerm
        description
        count
        assetId
        conditionTerm
        issueDate
        recoveredDate
        driverId
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
      assetDriverCertificationsOrPermits {
        id
        typeTerm
        certificationOrPermitId
        expirationDate
        state
        country
        driverId
        createdAt
        createdBy
        updatedBy
        updatedAt
      }
      assetDriverSchedules {
        id
        effectiveDate
        expirationDate
        hours {
          startTime
          endTime
          dayOfWeek
        }
        driverId
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
      assetDriverTimeOff {
        id
        typeTerm
        startDate
        endDate
        location {
          start {
            city
            state
          }
          end {
            city
            state
          }
        }
        notes
        driverId
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
      assetDriverIdentifiers {
        id
        typeTerm
        value
        notes
        driverId
        createdBy
        createdAt
        updatedBy
        updatedAt
      }
    }
    errors {
      message
      path
      extensions
      code
    }
  }
}`;

export const createDriverVar =
{
  input: {
    code: '{{driverCode}}',
    firstName: '{{firstName}}',
    lastName: '{{lastName}}',
    displayName: '{{displayName}}',
  },
};

export const CreateOrUpdateDriverTraining = `mutation CreateOrUpdateDriverTraining($training: DriverTrainingInput!) {
  createOrUpdateDriverTraining(training: $training) {
    training {
      id
      typeTerm
      dueDate
      completedDate
      outcomeTerm
      driverId
      createdBy
      updatedBy
      createdAt
      updatedAt
    }
  }
}`;

export const CreateOrUpdateDriverTrainingVar =
{
  training: {
    typeTerm: '{{typeTerm}}',
    dueDate: null,
    completedDate: null,
    outcomeTerm: null,
    facilityId: null,
    trainerName: null,
    description: null,
    driverId: '{{driverID}}',
  },
};