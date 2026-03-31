Feature: Register a new aircraft
  As a fleet operator
  I want to register a specific aircraft instance
  To manage its individual flight status

  Background:
    Given the following "aircraft_models" exist in the system:
      | id                                   | code | name             | manufacturer | numEngines | passengerCapacity | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | B38M | Boeing 737 MAX 8 | Boeing       |          2 |               200 | OPERATIONAL |

  Scenario: Successfully register an aircraft
    When I send a POST request to "/api/v1/aircrafts" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f99",
        "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
        "tailNumber": "EC-MY-PLANE"
      }
      """
    Then the response status code should be 201
    And the following "aircrafts" should exist in the system:
      | id                                   | tailNumber  | modelId                              | engineIds | totalFlightHours | fuelLevelPercentage | status | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f99 | EC-MY-PLANE | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |                0 |                   0 | DRAFT  | false    |

  Scenario: Fail to register when aircraft model does not exist
    When I send a POST request to "/api/v1/aircrafts" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f88",
        "modelId": "018f0000-0000-0000-0000-000000000000",
        "tailNumber": "EC-NON-EXISTENT-MODEL"
      }
      """
    Then the response status code should be 400

  Scenario: Fail to register when tail number is already in use
    Given the following "aircrafts" exist in the system:
      | id                                   | tailNumber   | modelId                              | engineIds | totalFlightHours | fuelLevelPercentage | status | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f77 | EC-DUPLICATE | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |                0 |                   0 | DRAFT  | false    |
    When I send a POST request to "/api/v1/aircrafts" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f66",
        "modelId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40",
        "tailNumber": "EC-DUPLICATE"
      }
      """
    Then the response status code should be 409
