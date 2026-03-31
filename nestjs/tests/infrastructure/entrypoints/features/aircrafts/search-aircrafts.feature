@only
Feature: Search aircrafts
  As a fleet manager
  I want to search and paginate aircrafts with filters and orders
  To manage and review the fleet efficiently

  Background:
    Given the following "aircraft_models" exist in the system:
      | id                                   | code | name     | manufacturer | passengerCapacity | numEngines | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | B38M |  737 MAX | Boeing       |               200 |          2 | OPERATIONAL |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f41 | A320 | A320 Neo | Airbus       |               180 |          2 | OPERATIONAL |

  Scenario: Paginate aircrafts on first page
    And the following "aircrafts" exist in the system:
      | id                                   | tailNumber | status      | modelId                              | engineIds | totalFlightHours | fuelLevelPercentage | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-ONE     | ACTIVE      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |              100 |                  80 | true     |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02 | EC-TWO     | MAINTENANCE | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f41 | []        |               50 |                  60 | true     |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f03 | EC-THREE   | ACTIVE      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |              200 |                  90 | true     |
    Given I set the following query parameters:
      | page     | 1 |
      | pageSize | 2 |
    When I send a GET request to "/api/v1/aircrafts"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "total": 3,
        "page": 1,
        "pageSize": 2,
        "totalPages": 2,
        "items": [
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01",
            "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
            "tailNumber": "EC-ONE",
            "totalFlightHours": 100,
            "fuelLevelPercentage": 80,
            "status": "ACTIVE"
          },
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02",
            "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f41",
            "tailNumber": "EC-TWO",
            "totalFlightHours": 50,
            "fuelLevelPercentage": 60,
            "status": "MAINTENANCE"
          }
        ]
      }
      """

  Scenario: Filter aircrafts by status ACTIVE
    And the following "aircrafts" exist in the system:
      | id                                   | tailNumber | status      | modelId                              | engineIds | totalFlightHours | fuelLevelPercentage | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-ONE     | ACTIVE      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |              100 |                  80 | true     |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02 | EC-TWO     | MAINTENANCE | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f41 | []        |               50 |                  60 | true     |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f03 | EC-THREE   | ACTIVE      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |              200 |                  90 | true     |
    Given I set the following query parameters:
      | page     |  1 |
      | pageSize | 10 |
    Given I add the following filters:
      | field  | operator | value  |
      | status | eq       | ACTIVE |
    When I send a GET request to "/api/v1/aircrafts"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "total": 2,
        "page": 1,
        "pageSize": 10,
        "totalPages": 1,
        "items": [
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01",
            "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
            "tailNumber": "EC-ONE",
            "totalFlightHours": 100,
            "fuelLevelPercentage": 80,
            "status": "ACTIVE"
          },
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f03",
            "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
            "tailNumber": "EC-THREE",
            "totalFlightHours": 200,
            "fuelLevelPercentage": 90,
            "status": "ACTIVE"
          }
        ]
      }
      """

  Scenario: Order aircrafts by totalFlightHours descending
    And the following "aircrafts" exist in the system:
      | id                                   | tailNumber | status      | modelId                              | engineIds | totalFlightHours | fuelLevelPercentage | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-ONE     | ACTIVE      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |              100 |                  80 | true     |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02 | EC-TWO     | MAINTENANCE | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f41 | []        |               50 |                  60 | true     |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f03 | EC-THREE   | ACTIVE      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |              200 |                  90 | true     |
    Given I set the following query parameters:
      | page     |  1 |
      | pageSize | 10 |
    Given I add the following orders:
      | orderBy          | orderType |
      | totalFlightHours | desc      |
    When I send a GET request to "/api/v1/aircrafts"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "total": 3,
        "page": 1,
        "pageSize": 10,
        "totalPages": 1,
        "items": [
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f03",
            "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
            "tailNumber": "EC-THREE",
            "totalFlightHours": 200,
            "fuelLevelPercentage": 90,
            "status": "ACTIVE"
          },
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01",
            "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
            "tailNumber": "EC-ONE",
            "totalFlightHours": 100,
            "fuelLevelPercentage": 80,
            "status": "ACTIVE"
          },
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02",
            "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f41",
            "tailNumber": "EC-TWO",
            "totalFlightHours": 50,
            "fuelLevelPercentage": 60,
            "status": "MAINTENANCE"
          }
        ]
      }
      """
