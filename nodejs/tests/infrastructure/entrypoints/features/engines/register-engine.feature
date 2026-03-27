Feature: Register a new engine
  As a maintenance manager
  I want to register new engines in the system
  To track their individual lifecycle and serial numbers

  Scenario: Successfully register an engine
    When I send a POST request to "/api/v1/engines" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01",
        "serialNumber": "SN-999-XYZ"
      }
      """
    Then the response status code should be 201
    And the following "engines" should exist in the system:
      | id                                   | serialNumber |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01 | SN-999-XYZ   |

  Scenario: Fail to register an engine with a duplicated serial number
    Given the following "engines" exist in the system:
      | id                                   | serialNumber | healthScore | flyingHoursAccumulated | cyclesSinceLastOverhaul | isInstalled | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e02 | DUPLICATE-SN |         100 |                      0 |                       0 | true        | OPERATIONAL |
    When I send a POST request to "/api/v1/engines" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e03",
        "serialNumber": "DUPLICATE-SN"
      }
      """
    Then the response status code should be 409
