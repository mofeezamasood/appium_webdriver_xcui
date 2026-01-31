@habit @complete @regression
Feature: Complete Habit
  As a user
  I want to mark habits as completed
  So that I can track my daily progress and maintain accountability

  Background:
    Given the Habo app is launched
    And the home screen should be displayed

  @smoke @positive @critical
  Scenario: Mark a single habit as completed for today
    Given a habit named "Drink Water" exists
    When I mark the habit "Drink Water" as completed for date "Mon"
    Then the habit "Drink Water" should be marked as completed for date "Mon"

  @positive @data-driven
  Scenario Outline: Mark multiple habits as completed for different dates
    Given a habit named "<Habit>" exists
    When I mark the habit "<Habit>" as completed for date "<Date>"
    Then the habit "<Habit>" should be marked as completed for date "<Date>"

    @priority-high
    Examples: Complete habits for current week
      | Habit           | Date |
      | Drink Water     | Mon  |
      | Do Exercise     | Tue  |
      | Read Book       | Wed  |
      | Meditate        | Thu  |
      | Go on a Walk    | Fri  |
      | Eat Healthy     | Sat  |
      | Practice Yoga   | Sun  |

    @full-dates
    Examples: Complete habits with full date format
      | Habit           | Date                        |
      | Drink Water     | Monday, January 26, 2026    |
      | Eat Dinner      | Thursday, January 29, 2026  |
      | Do Exercise     | Tuesday, January 27, 2026   |
      | Go on a Walk    | Wednesday, January 28, 2026 |

  @positive @multiple-completions
  Scenario: Complete same habit for multiple dates
    Given a habit named "Drink Water" exists
    When I mark the habit "Drink Water" as completed for date "Mon"
    And I mark the habit "Drink Water" as completed for date "Tue"
    And I mark the habit "Drink Water" as completed for date "Wed"
    Then the habit "Drink Water" should be marked as completed for date "Mon"
    And the habit "Drink Water" should be marked as completed for date "Tue"
    And the habit "Drink Water" should be marked as completed for date "Wed"

  @positive @multiple-habits
  Scenario: Complete multiple habits for same date
    Given a habit named "Drink Water" exists
    And a habit named "Exercise" exists
    And a habit named "Read Book" exists
    When I mark the habit "Drink Water" as completed for date "Mon"
    And I mark the habit "Exercise" as completed for date "Mon"
    And I mark the habit "Read Book" as completed for date "Mon"
    Then the habit "Drink Water" should be marked as completed for date "Mon"
    And the habit "Exercise" should be marked as completed for date "Mon"
    And the habit "Read Book" should be marked as completed for date "Mon"

  @positive @streak-building
  Scenario: Build a habit streak
    Given a habit named "Daily Exercise" exists
    When I mark the habit "Daily Exercise" as completed for date "Mon"
    And I mark the habit "Daily Exercise" as completed for date "Tue"
    And I mark the habit "Daily Exercise" as completed for date "Wed"
    And I mark the habit "Daily Exercise" as completed for date "Thu"
    And I mark the habit "Daily Exercise" as completed for date "Fri"
    Then the habit "Daily Exercise" should have a 5-day streak

  @negative @non-existent-habit
  Scenario: Cannot complete a habit that doesn't exist
    When I try to mark the habit "Non-Existent Habit" as completed for date "Mon"
    Then an error message should indicate the habit was not found

  @positive @ui-verification
  Scenario: Verify visual indication of completed habit
    Given a habit named "Morning Routine" exists
    When I mark the habit "Morning Routine" as completed for date "Mon"
    Then the habit "Morning Routine" should show a completion indicator for date "Mon"

  @positive @undo-completion
  Scenario: Unmark a completed habit
    Given a habit named "Drink Water" exists
    And the habit "Drink Water" is marked as completed for date "Mon"
    When I unmark the habit "Drink Water" for date "Mon"
    Then the habit "Drink Water" should not be marked as completed for date "Mon"

  @positive @past-dates
  Scenario: Complete habit for past dates
    Given a habit named "Exercise" exists
    When I mark the habit "Exercise" as completed for date "Mon"
    And I mark the habit "Exercise" as completed for date "Tue"
    Then the habit "Exercise" should be marked as completed for date "Mon"
    And the habit "Exercise" should be marked as completed for date "Tue"

  @positive @future-dates
  Scenario: Plan future habit completions
    Given a habit named "Read Book" exists
    When I mark the habit "Read Book" as completed for date "Sat"
    Then the habit "Read Book" should be marked as completed for date "Sat"

  @regression @completion-persistence
  Scenario: Verify completions persist after app restart
    Given a habit named "Persistent Habit" exists
    When I mark the habit "Persistent Habit" as completed for date "Mon"
    And I terminate the app
    And I launch the Habo app
    Then the habit "Persistent Habit" should be marked as completed for date "Mon"

  @positive @bulk-completion
  Scenario: Complete all habits for a specific date
    Given the following habits exist:
      | Drink Water  |
      | Exercise     |
      | Read Book    |
    When I mark all habits as completed for date "Mon"
    Then all habits should be marked as completed for date "Mon"

  @positive @weekly-view
  Scenario: View weekly completion status
    Given a habit named "Daily Habit" exists
    When I mark the habit "Daily Habit" as completed for date "Mon"
    And I mark the habit "Daily Habit" as completed for date "Wed"
    And I mark the habit "Daily Habit" as completed for date "Fri"
    Then the weekly view should show 3 completed days
    And the weekly view should show 4 incomplete days

  @smoke @positive @quick-test
  Scenario: Quick complete habit test
    Given a habit named "Quick Test" exists
    When I mark the habit "Quick Test" as completed for date "Mon"
    Then the habit "Quick Test" should be marked as completed for date "Mon"
