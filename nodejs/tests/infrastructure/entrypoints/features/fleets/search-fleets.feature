@only
Feature: Search fleets
  As a fleet manager
  I want to buscar y paginar fleets con filtros y órdenes
  Para gestionar y revisar las flotas eficientemente

  Background:
    Given the following "companies" exist in the system:
      | id                                   | name           |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | Global Airways |
    And the following "fleets" exist in the system:
      | id                                   | name                | companyId                            | operationRegion | type      | maintenanceBudget | aircraftIds                                                                      | status    |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01 | European Short Haul | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | EMEA            | PASSENGER |            500000 | ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01", "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02"] | OPERATIVE |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d02 | American Cargo      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | AMER            | CARGO     |            200000 | ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f03"]                                         | OPERATIVE |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d03 | Asia Private        | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | APAC            | PRIVATE   |            300000 | ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f04"]                                         | DRAFT     |

  Scenario: Paginate fleets on first page
    Given I set the following query parameters:
      | page     | 1 |
      | pageSize | 2 |
    When I send a GET request to "/api/v1/fleets"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "total": 3,
        "page": 1,
        "pageSize": 2,
        "totalPages": 2,
        "items": [
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01",
            "name": "European Short Haul",
            "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
            "type": "PASSENGER",
            "operationRegion": "EMEA",
            "maintenanceBudget": 500000,
            "status": "OPERATIVE"
          },
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d02",
            "name": "American Cargo",
            "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
            "type": "CARGO",
            "operationRegion": "AMER",
            "maintenanceBudget": 200000,
            "status": "OPERATIVE"
          }
        ]
      }
      """

  Scenario: Filter fleets by status OPERATIVE
    Given I set the following query parameters:
      | page     |  1 |
      | pageSize | 10 |
    Given I add the following filters:
      | field  | operator | value     |
      | status | eq       | OPERATIVE |
    When I send a GET request to "/api/v1/fleets"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "total": 2,
        "page": 1,
        "pageSize": 10,
        "totalPages": 1,
        "items": [
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01",
            "name": "European Short Haul",
            "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
            "operationRegion": "EMEA",
            "type": "PASSENGER",
            "maintenanceBudget": 500000,
            "status": "OPERATIVE"
          },
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d02",
            "name": "American Cargo",
            "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
            "operationRegion": "AMER",
            "type": "CARGO",
            "maintenanceBudget": 200000,
            "status": "OPERATIVE"
          }
        ]
      }
      """

  Scenario: Order fleets by maintenanceBudget descending
    Given I set the following query parameters:
      | page     |  1 |
      | pageSize | 10 |
    Given I add the following orders:
      | orderBy           | orderType |
      | maintenanceBudget | desc      |
    When I send a GET request to "/api/v1/fleets"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "total": 3,
        "page": 1,
        "pageSize": 10,
        "totalPages": 1,
        "items": [
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01",
            "name": "European Short Haul",
            "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
            "operationRegion": "EMEA",
            "type": "PASSENGER",
            "maintenanceBudget": 500000,
            "status": "OPERATIVE"
          },
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d03",
            "name": "Asia Private",
            "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
            "operationRegion": "APAC",
            "type": "PRIVATE",
            "maintenanceBudget": 300000,
            "status": "DRAFT"
          },
          {
            "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d02",
            "name": "American Cargo",
            "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
            "operationRegion": "AMER",
            "type": "CARGO",
            "maintenanceBudget": 200000,
            "status": "OPERATIVE"
          }
        ]
      }
      """
