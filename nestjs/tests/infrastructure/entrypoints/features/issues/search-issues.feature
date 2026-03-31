Feature: Search issues with cursor pagination
  As a maintenance manager
  I want to search and paginate issues using cursor, filters and orders
  To review issues efficiently

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
    And the following "issues" exist in the system:
      | id                                   | code    | description         | severity | requiresGrounding | partCategory | aircraftId                           | engineId                             |
      | 019cfb6f-d13a-7d74-ac08-4206f19c2c78 | ISS-001 | Hydraulic leak      | CRITICAL | true              | AVIONICS     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | null                                 |
      | 019cfb6f-f5ca-7b4a-945c-bc1930f38525 | ISS-002 | Minor bird strike   | LOW      | false             | ENGINE       | null                                 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01 |
      | 019cfb70-0dae-75c3-9fd3-d47fe3e25cea | ISS-003 | Avionics failure    | HIGH     | true              | AVIONICS     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | null                                 |
      | 019cfb70-2854-74df-a3c9-b2b8f093ac3a | ISS-004 | Engine vibration    | MEDIUM   | false             | ENGINE       | null                                 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01 |
      | 019cfb70-448a-787d-9c47-df774e17f46a | ISS-005 | Fuselage crack      | LOW      | false             | FUSELAGE     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | null                                 |
      | 019cfb70-5e30-7e70-9459-9e8e55f89a09 | ISS-006 | Engine oil leak     | HIGH     | true              | ENGINE       | null                                 | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3e01 |
      | 019cfb70-77e7-7668-b4c8-98ac19c11c10 | ISS-007 | Avionics short      | MEDIUM   | false             | AVIONICS     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | null                                 |
      | 019cfbce-5888-75dd-9258-ef74e3d7937e | ISS-008 | Landing gear issue  | HIGH     | true              | AVIONICS     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | null                                 |
      | 019cfbce-7b4b-73a1-9826-51b6e98fd344 | ISS-009 | Cabin pressure loss | HIGH     | true              | FUSELAGE     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | null                                 |
      | 019cfbce-91f8-7156-b9a2-4c104c1e75b0 | ISS-010 | Navigation failure  | HIGH     | true              | AVIONICS     | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01 | null                                 |

  Scenario: Paginate issues with cursor (full flow)
    Given I set the "pageSize" query parameter to "2"
    And I add the following filters:
      | field    | operator | value |
      | severity | eq       | HIGH  |
    When I send a GET request to "/api/v1/issues"
    Then the response status code should be 200
    And the response "hasMore" should be "true"
    And the response "nextCursor" should not be null
    And the response should contain the following "items":
      | id                                   | code    |
      | 019cfb70-0dae-75c3-9fd3-d47fe3e25cea | ISS-003 |
      | 019cfb70-5e30-7e70-9459-9e8e55f89a09 | ISS-006 |
    And I save the "nextCursor" from the last response
    And I set the "cursor" query parameter to the saved cursor
    When I send a GET request to "/api/v1/issues"
    Then the response status code should be 200
    And the response should contain the following "items":
      | id                                   | code    |
      | 019cfbce-5888-75dd-9258-ef74e3d7937e | ISS-008 |
      | 019cfbce-7b4b-73a1-9826-51b6e98fd344 | ISS-009 |
    And the response "hasMore" should be "true"
    And the response "nextCursor" should not be null

  Scenario: Filter issues by severity
    Given I set the "pageSize" query parameter to "10"
    And I add the following filters:
      | field    | operator | value |
      | severity | eq       | LOW   |
    When I send a GET request to "/api/v1/issues"
    Then the response should contain the following "items":
      | id                                   | severity |
      | 019cfb6f-f5ca-7b4a-945c-bc1930f38525 | LOW      |
      | 019cfb70-448a-787d-9c47-df774e17f46a | LOW      |

  Scenario: Order issues by code descending
    Given I set the "pageSize" query parameter to "3"
    And I add the following orders:
      | orderBy | orderType |
      | code    | desc      |
    When I send a GET request to "/api/v1/issues"
    Then the response should contain the following "items":
      | id                                   | code    |
      | 019cfbce-91f8-7156-b9a2-4c104c1e75b0 | ISS-010 |
      | 019cfbce-7b4b-73a1-9826-51b6e98fd344 | ISS-009 |
      | 019cfbce-5888-75dd-9258-ef74e3d7937e | ISS-008 |

  Scenario: Filter and order issues
    Given I set the "pageSize" query parameter to "5"
    And I add the following filters:
      | field        | operator | value    |
      | partCategory | eq       | AVIONICS |
    And I add the following orders:
      | orderBy | orderType |
      | code    | asc       |
    When I send a GET request to "/api/v1/issues"
    Then the response should contain the following "items":
      | id                                   | partCategory | code    |
      | 019cfb6f-d13a-7d74-ac08-4206f19c2c78 | AVIONICS     | ISS-001 |
      | 019cfb70-0dae-75c3-9fd3-d47fe3e25cea | AVIONICS     | ISS-003 |
      | 019cfb70-77e7-7668-b4c8-98ac19c11c10 | AVIONICS     | ISS-007 |

  Scenario: Invalid cursor
    Given I set the "pageSize" query parameter to "2"
    And I set the "cursor" query parameter to "invalid-cursor"
    When I send a GET request to "/api/v1/issues"
    Then the response status code should be 400

  Scenario: Invalid filter operator
    Given I set the "pageSize" query parameter to "2"
    And I add the following filters:
      | field    | operator | value |
      | severity | invalid  | HIGH  |
    When I send a GET request to "/api/v1/issues"
    Then the response status code should be 400

  Scenario: Invalid order type
    Given I set the "pageSize" query parameter to "2"
    And I add the following orders:
      | orderBy | orderType |
      | code    | invalid   |
    When I send a GET request to "/api/v1/issues"
    Then the response status code should be 400

  Scenario: Order issues by severity descending
    Given I set the "pageSize" query parameter to "3"
    And I add the following orders:
      | orderBy  | orderType |
      | severity | desc      |
    When I send a GET request to "/api/v1/issues"
    Then the response should contain the following "items":
      | id                                   | severity |
      | 019cfb6f-d13a-7d74-ac08-4206f19c2c78 | CRITICAL |
      | 019cfb70-0dae-75c3-9fd3-d47fe3e25cea | HIGH     |
      | 019cfb70-5e30-7e70-9459-9e8e55f89a09 | HIGH     |

  Scenario: Filter and order issues
    Given I set the "pageSize" query parameter to "5"
    And I add the following filters:
      | field        | operator | value    |
      | partCategory | eq       | AVIONICS |
    And I add the following orders:
      | orderBy  | orderType |
      | severity | desc      |
    When I send a GET request to "/api/v1/issues"
    Then the response should contain the following "items":
      | id                                   | partCategory | severity |
      | 019cfb6f-d13a-7d74-ac08-4206f19c2c78 | AVIONICS     | CRITICAL |
      | 019cfb70-0dae-75c3-9fd3-d47fe3e25cea | AVIONICS     | HIGH     |
      | 019cfbce-5888-75dd-9258-ef74e3d7937e | AVIONICS     | HIGH     |
      | 019cfbce-91f8-7156-b9a2-4c104c1e75b0 | AVIONICS     | HIGH     |
      | 019cfb70-77e7-7668-b4c8-98ac19c11c10 | AVIONICS     | MEDIUM   |

  Scenario: Invalid cursor
    Given I set the "pageSize" query parameter to "2"
    And I set the "cursor" query parameter to "invalid-cursor"
    When I send a GET request to "/api/v1/issues"
    Then the response status code should be 400

  Scenario: Invalid filter operator
    Given I set the "pageSize" query parameter to "2"
    And I add the following filters:
      | field  | operator | value       |
      | status | invalid  | OPERATIONAL |
    When I send a GET request to "/api/v1/issues"
    Then the response status code should be 400

  Scenario: Invalid order type
    Given I set the "pageSize" query parameter to "2"
    And I add the following orders:
      | orderBy     | orderType |
      | healthScore | invalid   |
    When I send a GET request to "/api/v1/issues"
    Then the response status code should be 400
