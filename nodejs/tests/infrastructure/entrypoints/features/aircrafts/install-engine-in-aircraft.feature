Feature: Install an engine in an aircraft
  As a maintenance engineer
  I want to install a specific engine into an aircraft
  To ensure the aircraft has its required operational engines

  Background:
    Given the following "aircraft_models" exist in the system:
      | id                                   | code | name | manufacturer | numEngines | passengerCapacity | status      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | B38M |  737 | Boeing       |          2 |               200 | OPERATIONAL |

  Scenario: Successfully install an engine in an aircraft
    Given the following "aircrafts" exist in the system:
      | id                                   | tailNumber | modelId                              | engineIds | totalFlightHours | fuelLevelPercentage | status | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-ABC     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |                0 |                   0 | ACTIVE | true     |
    And the following "engines" exist in the system:
      | id                                   | serialNumber | healthScore | flyingHoursAccumulated | cyclesSinceLastOverhaul | status      | isInstalled |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01 | SN-NEW-01    |         100 |                      0 |                       0 | OPERATIONAL | false       |
    When I send a POST request to "/api/v1/aircrafts/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01/engines/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01/install" with body:
      """
      {}
      """
    Then the response status code should be 201
    And the following "engines" should exist in the system:
      | id                                   | aircraftId                           |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 |

  Scenario: Fail to install when engine does not exist
    Given the following "aircrafts" exist in the system:
      | id                                   | tailNumber | modelId                              | engineIds | totalFlightHours | fuelLevelPercentage | status | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-ABC     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | []        |                0 |                   0 | ACTIVE | true     |
    When I send a POST request to "/api/v1/aircrafts/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01/engines/018f0000-0000-0000-0000-000000000000/install" with body:
      """
      {}
      """
    Then the response status code should be 404

  Scenario: Fail to install when aircraft exceeds its engine capacity
    Given the following "aircrafts" exist in the system:
      | id                                   | tailNumber | modelId                              | engineIds                                                                        | totalFlightHours | fuelLevelPercentage | status | isActive |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | EC-ABC     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f40 | ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e02", "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e03"] |                0 |                   0 | ACTIVE | true     |
    And the following "engines" exist in the system:
      | id                                   | serialNumber | healthScore | aircraftId                           | flyingHoursAccumulated | cyclesSinceLastOverhaul | status      | isInstalled |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e02 | SN-ENG-1     |         100 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 |                    500 |                      50 | OPERATIONAL | true        |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e03 | SN-ENG-2     |         100 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 |                    300 |                      30 | OPERATIONAL | true        |
    When I send a POST request to "/api/v1/aircrafts/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01/engines/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01/install" with body:
      """
      {}
      """
    Then the response status code should be 404
