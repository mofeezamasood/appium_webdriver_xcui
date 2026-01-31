
@app @launch @smoke
Feature: App Launch
  As a user
  I want the Habo app to launch successfully
  So that I can start tracking my habits

  @smoke @positive @critical
  Scenario: Launch application successfully for the first time
    Given the Habo app is installed
    When I launch the Habo app
    Then the home screen should be displayed
    And an empty habit list should be visible on first launch

  @smoke @positive @critical
  Scenario: Launch application when already installed
    Given the Habo app is installed
    And the Habo app is launched
    When I terminate the app
    And I launch the Habo app
    Then the home screen should be displayed

  @positive @persistence
  Scenario: Launch app and verify data persistence
    Given the Habo app is installed
    And the Habo app is launched
    And a habit named "Persistent Habit" exists
    When I terminate the app
    And I launch the Habo app
    Then the home screen should be displayed
    And the habit "Persistent Habit" should appear in the habit list

  @negative @installation
  Scenario: Verify app installation status
    Given the Habo app is installed
    Then the app bundle ID should be "com.pavlenko.Habo.mofi"

  @positive @fresh-install
  Scenario: First launch shows empty state
    Given the Habo app is installed
    And this is a fresh installation
    When I launch the Habo app
    Then the home screen should be displayed
    And an empty habit list should be visible on first launch
    And the Add Habit button should be displayed

  @positive @subsequent-launch
  Scenario: Subsequent launches maintain state
    Given the Habo app is launched
    And a habit named "Test Habit" exists
    When I terminate the app
    And I launch the Habo app
    Then the home screen should be displayed
    And the habit "Test Habit" should appear in the habit list

  @positive @background-return
  Scenario: Return from background
    Given the Habo app is launched
    When I send the app to background
    And I bring the app to foreground
    Then the home screen should be displayed

  @regression @multiple-launches
  Scenario: Multiple app launches
    Given the Habo app is installed
    When I launch the Habo app
    And I terminate the app
    And I launch the Habo app
    And I terminate the app
    And I launch the Habo app
    Then the home screen should be displayed

  @positive @launch-performance
  Scenario: App launches within acceptable time
    Given the Habo app is installed
    When I launch the Habo app
    Then the app should launch within 5 seconds
    And the home screen should be displayed

  @positive @orientation-launch
  Scenario: Launch app in different orientations
    Given the Habo app is installed
    And the device is in portrait orientation
    When I launch the Habo app
    Then the home screen should be displayed in portrait mode
    
    When I rotate the device to landscape
    Then the home screen should adapt to landscape mode

  @negative @permission-check
  Scenario: Verify app permissions on launch
    Given the Habo app is installed
    When I launch the Habo app
    Then the app should not request unnecessary permissions
    And the home screen should be displayed

  @positive @version-check
  Scenario: Display app version information
    Given the Habo app is installed
    When I launch the Habo app
    And I navigate to app settings
    Then the app version should be displayed

  @smoke @quick-test
  Scenario: Quick launch test
    Given the Habo app is installed
    When I launch the Habo app
    Then the home screen should be displayed
