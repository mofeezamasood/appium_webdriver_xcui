Feature: App Launch

  As a user
  I want the Habo app to launch successfully
  So that I can start tracking my habits

  Scenario: Launch application successfully
    Given the Habo app is installed
    When I launch the Habo app
    Then the home screen should be displayed
    And an empty habit list should be visible on first launch
    