
@ui
Feature: Search Functionality

  @smoke
  Scenario: Navigate to playwright homepage
    Given I am on the search page
    Then the page should load successfully

  @smoke @api
  Scenario: Check page title
    Given I am on the search page
    Then the page title should contain "Playwright"