Feature: App Launch
  As a user
  I want the Habo app to launch successfully
  So that I can start tracking my habits

  @smoke 
  Scenario: Launch application successfully for the first time
    Given the Habo app is installed
    When I launch the Habo app
    Then the home screen should be displayed
    And an empty habit list should be visible on first launch

  @smoke
  Scenario: Launch application when already installed
    Given the Habo app is installed
    And the Habo app is launched
    When I terminate the app
    And I launch the Habo app
    Then the home screen should be displayed

  @smoke 
  Scenario: Verify app installation status
    Given the Habo app is installed
    Then the app bundle ID should be "com.pavlenko.Habo.mofi"

  @smoke 
  Scenario: First launch shows empty state
    Given the Habo app is installed
    And this is a fresh installation
    When I launch the Habo app
    Then the home screen should be displayed
    And an empty habit list should be visible on first launch
    And the Add Habit button should be displayed

  Scenario: Return from background
    Given the Habo app is launched
    When I send the app to background
    And I bring the app to foreground
    Then the home screen should be displayed

  @app
  Scenario: Multiple app launches
    Given the Habo app is installed
    When I launch the Habo app
    And I terminate the app
    And I launch the Habo app
    And I terminate the app
    And I launch the Habo app
    Then the home screen should be displayed

  # Scenario: Verify app permissions on launch
  #   Given the Habo app is installed
  #   When I launch the Habo app
  #   Then the app should not request unnecessary permissions
  #   And the home screen should be displayed

