Feature: Get an engine
  As a maintenance technician
  I want to retrieve the details of a specific engine
  To check its health score and maintenance cycles

  Background:
    Given the following "engines" exist in the system:
      | id                                   | serialNumber | healthScore | flyingHoursAccumulated | cyclesSinceLastOverhaul | isInstalled | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01 | SN-777-ABC   |        95.5 |                 1200.5 |                      45 | false       | OPERATIONAL |

  Scenario: Successfully retrieve an engine by ID
    When I send a GET request to "/api/v1/engines/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01",
        "healthScore": 95.5,
        "serialNumber": "SN-777-ABC",
        "flyingHoursAccumulated": 1200.5,
        "cyclesSinceLastOverhaul": 45,
        "isInstalled": false,
        "status": "OPERATIONAL",
        "aircraftId": null
      }
      """

  Scenario: Fail to retrieve a non-existent engine
    When I send a GET request to "/api/v1/engines/018f0000-0000-0000-0000-000000000000"
    Then the response status code should be 400
