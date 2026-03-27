Feature: List aircraft model catalogue
  As a fleet manager
  I want to see the complete catalogue of aircraft models
  To know which models are available in the system

  Scenario: Successfully retrieve the full catalogue
    Given the following "aircraft_models" exist in the system:
      | id                                   | name             | manufacturer | passengerCapacity | numEngines | status      | code |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | Boeing 737 MAX 8 | Boeing       |               200 |          2 | OPERATIONAL | B38M |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02 | Airbus A320neo   | Airbus       |               180 |          2 | OPERATIONAL | A20N |
    When I send a GET request to "/api/v1/aircraft-models/catalogue"
    Then the response status code should be 200
    And the response body should be:
      """
      [
        {
          "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01",
          "name": "Boeing 737 MAX 8",
          "manufacturer": "Boeing",
          "passengerCapacity": 200,
          "numEngines": 2,
          "status": "OPERATIONAL"
        },
        {
          "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02",
          "name": "Airbus A320neo",
          "manufacturer": "Airbus",
          "passengerCapacity": 180,
          "numEngines": 2,
          "status": "OPERATIONAL"
        }
      ]
      """

  Scenario: Retrieve an empty catalogue when no models exist
    When I send a GET request to "/api/v1/aircraft-models/catalogue"
    Then the response status code should be 200
    And the response body should be:
      """
      []
      """
