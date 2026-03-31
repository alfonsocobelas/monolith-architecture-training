Feature: Get an aircraft model
  As a fleet manager
  I want to retrieve the details of a specific aircraft model
  To check its technical specifications

  Background:
    Given the following "aircraft_models" exist in the system:
      | id                                   | code | name      | manufacturer | passengerCapacity | numEngines | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | B38M | 737 MAX 8 | Boeing       |               200 |          2 | OPERATIONAL |

  Scenario: Successfully retrieve an aircraft model by ID
    When I send a GET request to "/api/v1/aircraft-models/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01",
        "code": "B38M",
        "name": "737 MAX 8",
        "manufacturer": "Boeing",
        "passengerCapacity": 200,
        "numEngines": 2,
        "status": "OPERATIONAL"
      }
      """

  Scenario: Fail to retrieve a non-existent aircraft model
    When I send a GET request to "/api/v1/aircraft-models/019d4033-22a0-7184-bbca-63d396c8ea05"
    Then the response status code should be 404
