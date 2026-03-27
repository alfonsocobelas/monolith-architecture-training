Feature: Find aircrafts in maintenance
  As a maintenance manager
  I want to list all aircrafts that are currently in maintenance status
  To plan the technical workload

  Background:
    Given the following "aircraft_models" exist in the system:
      | id                                   | code | name | manufacturer | passengerCapacity | numEngines | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | B38M |  737 | Boeing       |               200 |          2 | OPERATIONAL |

  Scenario: Successfully list only aircrafts in maintenance
    And the following "aircrafts" exist in the system:
      | id                                   | tailNumber | status      | modelId                              | engineIds | totalFlightHours | fuelLevelPercentage | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-MAI     | MAINTENANCE | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |                0 |                   0 | true     |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02 | EC-OPS     | ACTIVE      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |                0 |                   0 | true     |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f03 | EC-REP     | MAINTENANCE | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |                0 |                   0 | true     |
    When I send a GET request to "/api/v1/aircrafts/maintenance"
    Then the response status code should be 200
    And the response body should contain 2 items
    And the response body should be:
      """
      [
        {
          "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01",
          "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
          "tailNumber": "EC-MAI",
          "totalFlightHours": 0,
          "fuelLevelPercentage": 0,
          "status": "MAINTENANCE"
        },
        {
          "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f03",
          "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
          "tailNumber": "EC-REP",
          "totalFlightHours": 0,
          "fuelLevelPercentage": 0,
          "status": "MAINTENANCE"
        }
      ]
      """

  Scenario: Return an empty list when no aircrafts are in maintenance
    And the following "aircrafts" exist in the system:
      | id                                   | tailNumber | status | modelId                              | engineIds | totalFlightHours | fuelLevelPercentage | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f04 | EC-FLY     | ACTIVE | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |                0 |                   0 | true     |
    When I send a GET request to "/api/v1/aircrafts/maintenance"
    Then the response status code should be 200
    And the response body should be:
      """
      []
      """
