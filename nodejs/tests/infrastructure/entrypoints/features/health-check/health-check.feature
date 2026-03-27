Feature: Health Check
    In order to know the server is up and running
    As a health check
    I want to check the health endpoint

  Scenario: Check the health endpoint
    Given I send a GET request to "/api/health"
    Then the response status code should be 200
