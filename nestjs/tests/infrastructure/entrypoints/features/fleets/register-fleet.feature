Feature: Register a new fleet
  As a fleet manager
  I want to register a new fleet with assigned aircraft
  To organize operations by region and type

  Background:
    Given the following "companies" exist in the system:
      | id                                   | name           |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | Global Airways |
    And the following "aircraft_models" exist in the system:
      | id                                   | code | name | manufacturer | passengerCapacity | numEngines | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | B38M |  737 | Boeing       |               180 |          2 | OPERATIONAL |
    And the following "aircrafts" exist in the system:
      | id                                   | tailNumber | modelId                              | engineIds | status | totalFlightHours | fuelLevelPercentage | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-AAA     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        | ACTIVE |             1000 |                  75 | true     |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02 | EC-BBB     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        | ACTIVE |             1200 |                  80 | true     |

  Scenario: Successfully register a fleet and assign existing aircrafts
    When I send a POST request to "/api/v1/fleets" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01",
        "name": "European Short Haul",
        "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
        "aircraftIds": ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01", "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02"],
        "operationRegion": "EMEA",
        "type": "PASSENGER",
        "maintenanceBudget": 500000
      }
      """
    Then the response status code should be 201
    And the following "fleets" should exist in the system:
      | id                                   | name                | operationRegion | type      | maintenanceBudget | companyId                            | aircraftIds                                                                      | status |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01 | European Short Haul | EMEA            | PASSENGER |            500000 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01", "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02"] | DRAFT  |
    And the following "aircrafts" should exist in the system:
      | id                                   | fleetId                              |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01 |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01 |

  Scenario: Fail to register a fleet with non-existent aircraft
    When I send a POST request to "/api/v1/fleets" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d02",
        "name": "Ghost Fleet",
        "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
        "aircraftIds": ["018f0000-0000-0000-0000-000000000000"],
        "operationRegion": "AMER",
        "type": "CARGO",
        "maintenanceBudget": 100000
      }
      """
    Then the response status code should be 400

  Scenario: Fail to register a fleet with a duplicated name
    Given the following "fleets" exist in the system:
      | id                                   | name           | companyId                            | operationRegion | type  | maintenanceBudget | aircraftIds                              | status    |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d03 | Existing Fleet | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | APAC            | CARGO |            200000 | ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01"] | OPERATIVE |
    When I send a POST request to "/v1/fleets" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d04",
        "name": "Existing Fleet",
        "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
        "aircraftIds": ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01"],
        "operationRegion": "EUROPE",
        "type": "PRIVATE",
        "maintenanceBudget": 300000
      }
      """
    Then the response status code should be 404
