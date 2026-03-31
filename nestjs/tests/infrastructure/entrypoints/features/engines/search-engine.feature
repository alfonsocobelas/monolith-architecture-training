Feature: Search engines with cursor pagination
  As a maintenance manager
  I want to search and paginate engines using cursor, filters and orders
  To review engines efficiently

  Background:
    Given the following "engines" exist in the system:
      | id                                   | serialNumber | healthScore | flyingHoursAccumulated | cyclesSinceLastOverhaul | status      | isInstalled |
      | 019cfb6f-d13a-7d74-ac08-4206f19c2c78 | SN-777-ABC   |        95.5 |                 1200.5 |                      45 | OPERATIONAL | false       |
      | 019cfb6f-f5ca-7b4a-945c-bc1930f38525 | SN-888-DEF   |        80.0 |                  800.0 |                      30 | MAINTENANCE | true        |
      | 019cfb70-0dae-75c3-9fd3-d47fe3e25cea | SN-999-GHI   |        70.0 |                  500.0 |                      20 | OPERATIONAL | true        |
      | 019cfb70-2854-74df-a3c9-b2b8f093ac3a | SN-555-JKL   |        60.0 |                  300.0 |                      10 | MAINTENANCE | false       |
      | 019cfb70-448a-787d-9c47-df774e17f46a | SN-444-MNO   |        73.0 |                  100.0 |                       5 | OPERATIONAL | true        |
      | 019cfb70-5e30-7e70-9459-9e8e55f89a09 | SN-333-PQR   |        79.0 |                   50.0 |                       2 | OPERATIONAL | false       |
      | 019cfb70-77e7-7668-b4c8-98ac19c11c10 | SN-222-STU   |        65.0 |                   20.0 |                       1 | OPERATIONAL | true        |

  Scenario: Paginate engines with cursor (full flow)
    # Navigation first page
    Given I set the "pageSize" query parameter to "2"
    And I add the following filters:
      | field  | operator | value       |
      | status | eq       | OPERATIONAL |
    When I send a GET request to "/api/v1/engines"
    Then the response status code should be 200
    And the response "hasMore" should be "true"
    And the response "nextCursor" should not be null
    And the response should contain the following "items":
      | id                                   | serialNumber |
      | 019cfb6f-d13a-7d74-ac08-4206f19c2c78 | SN-777-ABC   |
      | 019cfb70-0dae-75c3-9fd3-d47fe3e25cea | SN-999-GHI   |
    # Navigation second page
    And I save the "nextCursor" from the last response
    And I set the "cursor" query parameter to the saved cursor
    When I send a GET request to "/api/v1/engines"
    Then the response status code should be 200
    And the response should contain the following "items":
      | id                                   | serialNumber |
      | 019cfb70-448a-787d-9c47-df774e17f46a | SN-444-MNO   |
      | 019cfb70-5e30-7e70-9459-9e8e55f89a09 | SN-333-PQR   |
    And the response "hasMore" should be "true"
    And the response "nextCursor" should not be null

  Scenario: Filter engines by status
    Given I set the "pageSize" query parameter to "10"
    And I add the following filters:
      | field  | operator | value       |
      | status | eq       | MAINTENANCE |
    When I send a GET request to "/api/v1/engines"
    Then the response should contain the following "items":
      | id                                   | status      |
      | 019cfb6f-f5ca-7b4a-945c-bc1930f38525 | MAINTENANCE |
      | 019cfb70-2854-74df-a3c9-b2b8f093ac3a | MAINTENANCE |

  Scenario: Order engines by healthScore descending
    Given I set the "pageSize" query parameter to "3"
    And I add the following orders:
      | orderBy     | orderType |
      | healthScore | desc      |
    When I send a GET request to "/api/v1/engines"
    Then the response should contain the following "items":
      | id                                   | healthScore |
      | 019cfb6f-d13a-7d74-ac08-4206f19c2c78 |        95.5 |
      | 019cfb6f-f5ca-7b4a-945c-bc1930f38525 |        80.0 |
      | 019cfb70-5e30-7e70-9459-9e8e55f89a09 |        79.0 |

  Scenario: Filter and order engines
    Given I set the "pageSize" query parameter to "5"
    And I add the following filters:
      | field  | operator | value       |
      | status | eq       | OPERATIONAL |
    And I add the following orders:
      | orderBy     | orderType |
      | healthScore | asc       |
    When I send a GET request to "/api/v1/engines"
    Then the response should contain the following "items":
      | id                                   | status      | healthScore |
      | 019cfb70-77e7-7668-b4c8-98ac19c11c10 | OPERATIONAL |        65.0 |
      | 019cfb70-0dae-75c3-9fd3-d47fe3e25cea | OPERATIONAL |        70.0 |
      | 019cfb70-448a-787d-9c47-df774e17f46a | OPERATIONAL |        73.0 |
      | 019cfb70-5e30-7e70-9459-9e8e55f89a09 | OPERATIONAL |        79.0 |
      | 019cfb6f-d13a-7d74-ac08-4206f19c2c78 | OPERATIONAL |        95.5 |

  Scenario: Invalid cursor
    Given I set the "pageSize" query parameter to "2"
    And I set the "cursor" query parameter to "invalid-cursor"
    When I send a GET request to "/api/v1/engines"
    Then the response status code should be 400

  Scenario: Invalid filter operator
    Given I set the "pageSize" query parameter to "2"
    And I add the following filters:
      | field  | operator | value       |
      | status | invalid  | OPERATIONAL |
    When I send a GET request to "/api/v1/engines"
    Then the response status code should be 400

  Scenario: Invalid order type
    Given I set the "pageSize" query parameter to "2"
    And I add the following orders:
      | orderBy     | orderType |
      | healthScore | invalid   |
    When I send a GET request to "/api/v1/engines"
    Then the response status code should be 400
