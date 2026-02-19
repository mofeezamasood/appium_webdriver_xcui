Feature: Add Habit
  As a user
  I want to add new habits
  So that I can track my daily activities and build better routines

  Background:
    Given the Habo app is launched
    And the home screen should be displayed

  @smoke
  Scenario: Successfully add a single habit
    When I tap on the Add Habit button
    Then the create habit page should be displayed
    When I enter "First Test Habit" as the habit name
    And I tap on the Save Habit button
    Then the home screen should be displayed
    And the habit "First Test Habit" should appear in the habit list

  @positive @data-driven
  Scenario: Add multiple valid habits
    When I tap on the Add Habit button
    And I enter "<Habit>" as the habit name
    And I tap on the Save Habit button
    Then the habit "<Habit>" should appear in the habit list

    @priority-high
    Examples: Common daily habits
      | Habit           |
      | Drink Water     |
      | Do Exercise     |
      | Read Book       |
      | Meditate        |

    @priority-medium
    Examples: Health and wellness habits
      | Habit              |
      | Go on a Walk       |
      | Eat Healthy        |
      | Practice Yoga      |
      | Take Vitamins      |

    @priority-low
    Examples: Personal development habits
      | Habit              |
      | Write Journal      |
      | Learn New Skill    |
      | Practice Guitar    |

  @smoke @negative @validation @edge-case
  Scenario: Cannot save habit with empty name
    When I tap on the Add Habit button
    And I clear the habit name field
    Then the Save button should be disabled

  @smoke @negative @validation
  Scenario: Cannot save habit with only spaces
    When I tap on the Add Habit button
    And I enter "   " as the habit name
    Then the Save button should be disabled

  @positive @special-characters
  Scenario: Add habit with special characters
    When I create a new habit named "Read Books & Articles"
    Then the habit "Read Books & Articles" should appear in the habit list

  @positive @special-characters
  Scenario: Add habit with numbers
    When I create a new habit named "Drink 8 Glasses Water"
    Then the habit "Drink 8 Glasses Water" should appear in the habit list

  @positive @special-characters
  Scenario: Add habit with hyphens and underscores
    When I create a new habit named "Morning_Routine-2024"
    Then the habit "Morning_Routine-2024" should appear in the habit list

  @positive @case-sensitivity
  Scenario: Add habits with different cases
    When I create a new habit named "EXERCISE DAILY"
    And I create a new habit named "exercise daily"
    Then the following habits should appear in the habit list:
      | EXERCISE DAILY |
      | exercise daily |

  @regression @multiple-habits
  Scenario: Add multiple habits in sequence
    When I create a new habit named "Morning Habit"
    And I create a new habit named "Afternoon Habit"
    And I create a new habit named "Evening Habit"
    Then the following habits should appear in the habit list:
      | Morning Habit   |
      | Afternoon Habit |
      | Evening Habit   |
    And there should be 3 habit(s) in the list

  @positive @persistence
  Scenario: Verify habit persists after app restart
    When I create a new habit named "Persistent Habit"
    Then the habit "Persistent Habit" should appear in the habit list
    When I terminate the app
    And I launch the Habo app
    Then the habit "Persistent Habit" should appear in the habit list

  @positive @ui-verification
  Scenario: Verify UI returns to home page after adding habit
    When I tap on the Add Habit button
    And I enter "Test Habit" as the habit name
    And I tap on the Save Habit button
    Then the home screen should be displayed
    And the create habit page should not be displayed

  @negative @cancel-operation
  Scenario: Cancel adding a new habit
    When I tap on the Add Habit button
    And I enter "Cancelled Habit" as the habit name
    And I tap on the Cancel button
    Then the home screen should be displayed
    And the habit "Cancelled Habit" should not appear in the habit list

  @positive @duplicate-names
  Scenario: Allow adding habits with duplicate names
    When I create a new habit named "Daily Task"
    And I create a new habit named "Daily Task"
    Then there should be 2 habit(s) in the list

  @smoke @positive @quick-test
  Scenario: Quick add habit workflow
    When I create a new habit named "Quick Test"
    Then the habit "Quick Test" should appear in the habit list
