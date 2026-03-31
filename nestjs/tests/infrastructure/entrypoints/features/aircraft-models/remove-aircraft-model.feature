Feature: Remove an aircraft model
  As a fleet manager
  I want to remove aircraft models that are no longer needed
  To keep the catalog clean

  Background:
    Given the following "aircraft_models" exist in the system:
      | id                                   | code | name    | manufacturer | passengerCapacity | numEngines | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | B38M | 737 MAX | Boeing       |               200 |          2 | OPERATIONAL |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02 | A20N | A320neo | Airbus       |               180 |          2 | OPERATIONAL |

  Scenario: Successfully remove an aircraft model
    When I send a DELETE request to "/api/v1/aircraft-models/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01"
    Then the response status code should be 200
    And the following "aircraft_models" should not exist in the system:
      | id                                   |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 |

  Scenario: Fail to remove a non-existent aircraft model
    When I send a DELETE request to "/api/v1/aircraft-models/019d408b-e1e9-7599-ab76-cda014b93fd1"
    Then the response status code should be 404

  Scenario: Fail to remove an aircraft model with associated aircrafts
    Given the following "aircrafts" exist in the system:
      | id                                   | tailNumber | modelId                              | totalFlightHours | fuelLevelPercentage | isActive | status | engineIds                                                                        |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e99 | EC-BUS     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02 |               58 |                 100 | true     | ACTIVE | ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e98", "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e99"] |
    When I send a DELETE request to "/api/v1/aircraft-models/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02"
    Then the response status code should be 422
