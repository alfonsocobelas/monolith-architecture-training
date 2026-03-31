Feature: Get a fleet
  As a fleet manager
  I want to retrieve the details of a specific fleet
  To review its operational status and assigned aircraft

  Background:
    Given the following "companies" exist in the system:
      | id                                   | name           |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | Iberia Express |
    And the following "fleets" exist in the system:
      | id                                   | name                | companyId                            | operationRegion | type      | maintenanceBudget | aircraftIds                                                                      | status    |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01 | European Short Haul | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | EMEA            | PASSENGER |            500000 | ["018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01", "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02"] | OPERATIVE |

  Scenario: Successfully retrieve a fleet by ID
    When I send a GET request to "/api/v1/fleets/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3d01",
        "name": "European Short Haul",
        "companyId": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
        "operationRegion": "EMEA",
        "type": "PASSENGER",
        "maintenanceBudget": 500000,
        "aircraftIds": [
          "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f01",
          "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3f02"
        ],
        "status": "OPERATIVE"
      }
      """

  Scenario: Fail to retrieve a non-existent fleet
    When I send a GET request to "/api/v1/fleets/019d40b1-08b7-7be7-9283-a79e02bff4a7"
    Then the response status code should be 404
