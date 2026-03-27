Feature: Register a new aircraft model
  As a fleet manager
  I want to register new aircraft models in the system
  To keep the fleet catalog updated

  Scenario: Successfully register an aircraft model
    When I send a POST request to "/api/v1/aircraft-models" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
        "name": "Boeing 737 MAX 8",
        "code": "B38M",
        "manufacturer": "Boeing",
        "passengerCapacity": 200,
        "numEngines": 2
      }
      """
    Then the response status code should be 201
    And the following "aircraft_models" should exist in the system:
      | id                                   | code | name             | manufacturer | passengerCapacity | numEngines | status |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | B38M | Boeing 737 MAX 8 | Boeing       |               200 |          2 | DRAFT  |

  Scenario: Fail to register due to missing required fields
    When I send a POST request to "/api/v1/aircraft-models" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f41",
        "name": "Invalid Model"
      }
      """
    Then the response status code should be 400

  Scenario: Fail to register due to duplicated ID
    Given the following "aircraft_models" exist in the system:
      | id                                   | code | name             | manufacturer | passengerCapacity | numEngines | status |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f50 | B38M | Boeing 737 MAX 8 | Boeing       |               200 |          2 | DRAFT  |
    When I send a POST request to "/api/v1/aircraft-models" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f50",
        "name": "Duplicated ID Model",
        "code": "B38M",
        "manufacturer": "Airbus",
        "passengerCapacity": 150,
        "numEngines": 2
      }
      """
    Then the response status code should be 409
