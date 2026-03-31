Feature: Get an issue
  As a maintenance manager
  I want to retrieve the details of a specific maintenance issue
  To evaluate the repair priority

  Background:
    Given the following "aircraft_models" exist in the system:
      | id                                   | code | name | manufacturer | passengerCapacity | numEngines | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | B38M |  737 | Boeing       |               180 |          2 | OPERATIONAL |
    And the following "aircrafts" exist in the system:
      | id                                   | tailNumber | modelId                              | engineIds | status | totalFlightHours | fuelLevelPercentage | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-AAA     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        | ACTIVE |             1000 |                  75 | true     |
    And the following "issues" exist in the system:
      | id                                   | code    | description    | severity | requiresGrounding | partCategory | aircraftId                           |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | ISS-001 | Hydraulic leak | CRITICAL | true              | AVIONICS     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 |

  Scenario: Successfully retrieve an issue by ID
    When I send a GET request to "/api/v1/issues/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
        "code": "ISS-001",
        "description": "Hydraulic leak",
        "severity": "CRITICAL",
        "requiresGrounding": true,
        "partCategory": "AVIONICS",
        "aircraftId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01",
        "engineId": null
      }
      """

  Scenario: Fail to retrieve a non-existent issue
    When I send a GET request to "/api/v1/issues/019d40a1-d443-782a-aa77-1e2c9c9fe4b4"
    Then the response status code should be 404
