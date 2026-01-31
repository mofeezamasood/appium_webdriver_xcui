@habit @validation @edge-case
Feature: Habit Validation
  As a user
  The app should validate my inputs
  So that I can only create valid habits

  Background:
    Given the Habo app is launched
    And the home screen should be displayed

  @negative @empty-input
  Scenario: Cannot create habit with empty name
    When I tap on the Add Habit button
    And I clear the habit name field
    Then the Save button should be disabled

  @negative @whitespace-only
  Scenario: Cannot create habit with whitespace only
    When I tap on the Add Habit button
    And I enter "   " as the habit name
    Then the Save button should be disabled

  @negative @boundary-min-length
  Scenario: Reject habit name below minimum length
    When I tap on the Add Habit button
    And I enter "A" as the habit name
    Then an error message "Habit name too short" should be displayed

  @negative @boundary-max-length
  Scenario Outline: Reject habit names exceeding maximum length
    When I tap on the Add Habit button
    And I enter "<LongName>" as the habit name
    Then an error message "Habit name too long" should be displayed

    Examples:
      | LongName                                                                                              |
      | ThisIsAnExtremelyLongHabitNameThatExceedsTheMaximumAllowedLengthAndShouldBeRejectedByTheApplication |
      | AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA |

  @positive @boundary-exact-min
  Scenario: Accept habit name at exact minimum length
    When I create a new habit named "Ab"
    Then the habit "Ab" should appear in the habit list

  @positive @boundary-exact-max
  Scenario: Accept habit name at exact maximum length
    When I create a new habit named "This is exactly one hundred characters long to test the maximum allowed length for habit names perfectly"
    Then the habit should appear in the habit list

  @positive @special-characters
  Scenario Outline: Accept habits with special characters
    When I create a new habit named "<HabitName>"
    Then the habit "<HabitName>" should appear in the habit list

    Examples: Valid special characters
      | HabitName              |
      | Read & Write           |
      | Morning-Routine        |
      | Coffee_Break           |
      | Tasks (Work)           |
      | Email: Daily Check     |
      | 50% Exercise           |
      | Study #1               |

  @negative @invalid-characters
  Scenario Outline: Reject habits with invalid special characters
    When I tap on the Add Habit button
    And I enter "<InvalidName>" as the habit name
    Then an error message "Invalid characters" should be displayed

    Examples: Invalid characters
      | InvalidName     |
      | Habit<Script>   |
      | Habit\nNewline  |
      | Habit\tTab      |
      | Habit"Quote"    |
      | Habit'Quote'    |

  @positive @unicode-support
  Scenario: Support Unicode characters in habit names
    When I create a new habit named "习惯 Habit 習慣"
    Then the habit "习惯 Habit 習慣" should appear in the habit list

  @positive @emoji-support
  Scenario: Support emojis in habit names
    When I create a new habit named "💧 Drink Water"
    Then the habit "💧 Drink Water" should appear in the habit list

  @positive @numbers-only
  Scenario: Accept habit names with numbers
    When I create a new habit named "365 Days Challenge"
    Then the habit "365 Days Challenge" should appear in the habit list

  @negative @duplicate-validation
  Scenario: Handle duplicate habit names
    Given a habit named "Duplicate Test" exists
    When I create a new habit named "Duplicate Test"
    Then both habits should exist in the list
    Or an error message about duplicates should be displayed

  @positive @case-sensitivity
  Scenario: Habit names are case-sensitive
    When I create a new habit named "Exercise"
    And I create a new habit named "EXERCISE"
    And I create a new habit named "exercise"
    Then all three habits should appear in the habit list

  @positive @whitespace-trimming
  Scenario: Leading and trailing whitespace should be trimmed
    When I tap on the Add Habit button
    And I enter "  Habit Name  " as the habit name
    And I tap on the Save Habit button
    Then the habit "Habit Name" should appear in the habit list
    And the habit name should not have leading spaces
    And the habit name should not have trailing spaces

  @positive @internal-whitespace
  Scenario: Internal whitespace should be preserved
    When I create a new habit named "Morning    Routine"
    Then the habit "Morning    Routine" should appear in the habit list

  @negative @null-input
  Scenario: Handle null input gracefully
    When I tap on the Add Habit button
    And I attempt to submit without entering a name
    Then the Save button should be disabled
    Or an error message should be displayed

  @positive @mixed-format
  Scenario Outline: Accept mixed format habit names
    When I create a new habit named "<HabitName>"
    Then the habit "<HabitName>" should appear in the habit list

    Examples: Mixed formats
      | HabitName                |
      | 8am Morning Walk         |
      | Read 30min Daily         |
      | 5km Run                  |
      | Drink 2L Water           |
      | Study 1hr                |
      | Practice 15-30 Minutes   |

  @regression @validation-persistence
  Scenario: Validation rules apply after app restart
    When I terminate the app
    And I launch the Habo app
    And I tap on the Add Habit button
    And I clear the habit name field
    Then the Save button should be disabled
