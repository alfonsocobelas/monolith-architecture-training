Feature: Get a company
  As a system administrator
  I want to retrieve the details of a specific company
  To check its registered information

  Background:
    Given the following "companies" exist in the system:
      | id                                   | name           |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | Iberia Express |

  Scenario: Successfully retrieve a company by ID
    When I send a GET request to "/api/v1/companies/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01"
    Then the response status code should be 200
    And the response body should be:
      """
      {
        "id": "018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01",
        "name": "Iberia Express"
      }
      """

  Scenario: Fail to retrieve a non-existent company
    When I send a GET request to "/api/v1/companies/019d40b0-3585-7ed6-a150-4f7271c6f6bd"
    Then the response status code should be 404
