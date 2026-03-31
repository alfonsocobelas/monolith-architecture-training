Feature: Remove a company
  As a system administrator
  I want to remove companies that are no longer active
  To keep the system up-to-date

  Background:
    Given the following "companies" exist in the system:
      | id                                   | name           |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 | Iberia Express |

  Scenario: Successfully remove a company
    When I send a DELETE request to "/api/v1/companies/018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01"
    Then the response status code should be 200
    And the following "companies" should not exist in the system:
      | id                                   |
      | 018e6e5a-7b32-7a5c-8d1f-3b3c3d3e3a01 |

  Scenario: Fail to remove a non-existent company
    When I send a DELETE request to "/api/v1/companies/019d40b0-a617-79b7-a7f6-080956c54bad"
    Then the response status code should be 404
