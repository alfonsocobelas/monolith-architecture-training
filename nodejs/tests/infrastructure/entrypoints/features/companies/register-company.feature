Feature: Register a new company
  As a system administrator
  I want to register new aviation companies
  To manage their fleet and operations

  Scenario: Successfully register a company
    When I send a POST request to "/api/v1/companies" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
        "name": "Iberia"
      }
      """
    Then the response status code should be 201
    And the following "companies" should exist in the system:
      | id                                   | name   |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | Iberia |

  Scenario: Fail to register a company with a duplicated name
    Given the following "companies" exist in the system:
      | id                                   | name      |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a02 | Lufthansa |
    When I send a POST request to "/api/v1/companies" with body:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a03",
        "name": "Lufthansa"
      }
      """
    Then the response status code should be 409
