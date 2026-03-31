Feature: Register a new maintenance issue
  As a maintenance technician
  I want to register technical issues found in aircraft or engines
  To ensure flight safety and track repairs

  Background:
    Given the following "aircraft_models" exist in the system:
      | id                                   | code | name | manufacturer | passengerCapacity | numEngines | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | B38M |  737 | Boeing       |               180 |          2 | OPERATIONAL |
    And the following "aircrafts" exist in the system:
      | id                                   | tailNumber | modelId                              | engineIds | status | totalFlightHours | fuelLevelPercentage | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-AAA     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        | ACTIVE |             1000 |                  75 | true     |
    And the following "engines" exist in the system:
      | id                                   | serialNumber | healthScore | flyingHoursAccumulated | cyclesSinceLastOverhaul | status      | isInstalled |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01 | SN-12345     |          85 |                    500 |                      50 | OPERATIONAL | true        |

  Scenario: Successfully register a critical aircraft issue
    When I send a POST request to "/api/v1/issues" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3c01",
        "code": "ISS-001",
        "description": "Hydraulic leak in main landing gear",
        "severity": "CRITICAL",
        "requiresGrounding": true,
        "partCategory": "AVIONICS",
        "aircraftId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01"
      }
      """
    Then the response status code should be 201
    And the following "issues" should exist in the system:
      | id                                   | code    | severity | requiresGrounding | partCategory | aircraftId                           | engineId |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3c01 | ISS-001 | CRITICAL | true              | AVIONICS     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | null     |

  Scenario: Successfully register a minor engine issue
    When I send a POST request to "/api/v1/issues" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3c02",
        "code": "ISS-002",
        "description": "Minor bird strike on engine fan blade",
        "severity": "LOW",
        "requiresGrounding": false,
        "partCategory": "ENGINE",
        "engineId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01"
      }
      """
    Then the response status code should be 201
    And the following "issues" should exist in the system:
      | id                                   | code    | engineId                             | aircraftId | severity | requiresGrounding | partCategory |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3c02 | ISS-002 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01 | null       | LOW      | false             | ENGINE       |

  Scenario: Fail to register an issue with a duplicated code
    Given the following "issues" exist in the system:
      | id                                   | code   | description | severity | requiresGrounding | partCategory | aircraftId                           | engineId |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3c03 | DUP-01 | Existing    | HIGH     | false             | AVIONICS     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | null     |
    When I send a POST request to "/api/v1/issues" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3c04",
        "code": "DUP-01",
        "description": "Attempting duplicate",
        "severity": "LOW",
        "requiresGrounding": false,
        "partCategory": "ENGINE",
        "engineId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01"
      }
      """
    Then the response status code should be 409
