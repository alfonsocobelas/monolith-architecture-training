Feature: Get aircraft technical sheet
  As a maintenance supervisor
  I want to see the full technical details of an aircraft
  Including its model specifications and engine health

  Background:
    Given the following "aircraft_models" exist in the system:
      | id                                   | code | name             | manufacturer | numEngines | passengerCapacity | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | B38M | Boeing 737 MAX 8 | Boeing       |          2 |               200 | OPERATIONAL |
    And the following "aircrafts" exist in the system:
      | id                                   | tailNumber | modelId                              | totalFlightHours | fuelLevelPercentage | status | engineIds                                                                        | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-ABC     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 |           1250.5 |                  85 | ACTIVE | ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01", "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e02"] | true     |
    And the following "engines" exist in the system:
      | id                                   | serialNumber | healthScore | aircraftId                           | flyingHoursAccumulated | cyclesSinceLastOverhaul | status      | isInstalled |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01 | SN-ENG-1     |        98.5 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 |                    500 |                      50 | OPERATIONAL | true        |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e02 | SN-ENG-2     |        97.2 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 |                    300 |                      30 | OPERATIONAL | true        |

  Scenario: Successfully retrieve the technical sheet of an aircraft
    When I send a GET request to "/api/v1/aircrafts/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01",
        "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
        "tailNumber": "EC-ABC",
        "totalFlightHours": 1250.5,
        "fuelLevelPercentage": 85,
        "status": "ACTIVE",
        "model": {
          "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
          "name": "Boeing 737 MAX 8",
          "numEngines": 2
        },
        "engines": [
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01",
            "healthScore": 98.5
          },
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e02",
            "healthScore": 97.2
          }
        ]
      }
      """

  Scenario: Fail to retrieve technical sheet for non-existent aircraft
    When I send a GET request to "/v1/aircrafts/018f0000-0000-0000-0000-000000000000"
    Then the response status code should be 404
