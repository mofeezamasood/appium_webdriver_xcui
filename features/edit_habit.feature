@habit @edit @regression
Feature: Edit Habit
  As a user
  I want to edit existing habits
  So that I can update habit names and keep my tracking accurate

  Background:
    Given the Habo app is launched
    And the home screen should be displayed

  @smoke @positive @critical
  Scenario: Successfully edit a habit name
    Given a habit named "Old Name" exists
    When I click on modify button for "Old Name"
    Then the create habit page should be displayed
    And the habit name field should contain "Old Name"
    And the Delete button should be displayed
    
    When I change the habit name to "New Name"
    And I tap on the Save Habit button
    Then the home screen should be displayed
    And the habit "New Name" should appear in the habit list
    And the habit "Old Name" should not appear in the habit list

  @positive @data-driven
  Scenario Outline: Edit multiple habits with different names
    Given a habit named "<OriginalHabit>" exists
    When I click on modify button for "<OriginalHabit>"
    And I enter "<EditedHabit>" as the habit name
    And I tap on the Save Habit button
    Then the habit "<EditedHabit>" should appear in the habit list
    And the habit "<OriginalHabit>" should not appear in the habit list

    @priority-high
    Examples: Shorten habit names
      | OriginalHabit | EditedHabit |
      | Drink Water   | Water       |
      | Eat Dinner    | Dinner      |
      | Do Exercise   | Exercise    |
      | Go on a Walk  | Walk        |

    @priority-medium
    Examples: Expand habit names
      | OriginalHabit | EditedHabit              |
      | Water         | Drink 8 Glasses of Water |
      | Exercise      | Morning Exercise Routine |
      | Read          | Read for 30 Minutes      |

    @priority-low
    Examples: Completely rename
      | OriginalHabit   | EditedHabit       |
      | Morning Routine | Evening Routine   |
      | Study           | Learn New Skills  |
      | Meditate        | Mindful Breathing |

  @negative @validation
  Scenario: Cannot save edited habit with empty name
    Given a habit named "Valid Habit" exists
    When I click on modify button for "Valid Habit"
    And I clear the habit name field
    Then the Save button should be disabled

  @negative @validation
  Scenario: Cannot save edited habit with only spaces
    Given a habit named "Valid Habit" exists
    When I click on modify button for "Valid Habit"
    And I enter "   " as the habit name
    Then the Save button should be disabled

  @negative @cancel-edit
  Scenario: Cancel habit editing
    Given a habit named "Original Name" exists
    When I click on modify button for "Original Name"
    And I change the habit name to "Changed Name"
    And I tap on the Cancel button
    Then the home screen should be displayed
    And the habit "Original Name" should appear in the habit list
    And the habit "Changed Name" should not appear in the habit list

  @positive @no-change-edit
  Scenario: Save habit without making any changes
    Given a habit named "Unchanged Habit" exists
    When I click on modify button for "Unchanged Habit"
    And I tap on the Save Habit button
    Then the home screen should be displayed
    And the habit "Unchanged Habit" should appear in the habit list

  @positive @special-characters
  Scenario: Edit habit to include special characters
    Given a habit named "Read Books" exists
    When I click on modify button for "Read Books"
    And I change the habit name to "Read Books & Articles"
    And I tap on the Save Habit button
    Then the habit "Read Books & Articles" should appear in the habit list

  @positive @with-completion-history
  Scenario: Edit habit that has completion history
    Given a habit named "Daily Task" exists
    And the habit "Daily Task" is marked as completed for date "Mon"
    And the habit "Daily Task" is marked as completed for date "Tue"
    When I click on modify button for "Daily Task"
    And I change the habit name to "Updated Task"
    And I tap on the Save Habit button
    Then the habit "Updated Task" should appear in the habit list
    And the habit "Updated Task" should be marked as completed for date "Mon"
    And the habit "Updated Task" should be marked as completed for date "Tue"

  @positive @case-change
  Scenario: Edit habit to change case
    Given a habit named "morning routine" exists
    When I click on modify button for "morning routine"
    And I change the habit name to "MORNING ROUTINE"
    And I tap on the Save Habit button
    Then the habit "MORNING ROUTINE" should appear in the habit list
    And the habit "morning routine" should not appear in the habit list

  @positive @add-numbers
  Scenario: Edit habit to include numbers
    Given a habit named "Drink Water" exists
    When I click on modify button for "Drink Water"
    And I change the habit name to "Drink 8 Glasses Water"
    And I tap on the Save Habit button
    Then the habit "Drink 8 Glasses Water" should appear in the habit list

  @regression @edit-persistence
  Scenario: Verify edited habit persists after app restart
    Given a habit named "Before Edit" exists
    When I click on modify button for "Before Edit"
    And I change the habit name to "After Edit"
    And I tap on the Save Habit button
    And I terminate the app
    And I launch the Habo app
    Then the habit "After Edit" should appear in the habit list
    And the habit "Before Edit" should not appear in the habit list

  @positive @multiple-edits
  Scenario: Edit the same habit multiple times
    Given a habit named "Version 1" exists
    When I click on modify button for "Version 1"
    And I change the habit name to "Version 2"
    And I tap on the Save Habit button
    Then the habit "Version 2" should appear in the habit list
    
    When I click on modify button for "Version 2"
    And I change the habit name to "Version 3"
    And I tap on the Save Habit button
    Then the habit "Version 3" should appear in the habit list
    And the habit "Version 2" should not appear in the habit list

  @positive @duplicate-name-edit
  Scenario: Edit habit to have same name as another habit
    Given a habit named "Habit A" exists
    And a habit named "Habit B" exists
    When I click on modify button for "Habit B"
    And I change the habit name to "Habit A"
    And I tap on the Save Habit button
    Then there should be 2 habit(s) in the list
    And both habits named "Habit A" should be displayed

  @negative @boundary-testing
  Scenario: Edit habit with maximum length name
    Given a habit named "Short" exists
    When I click on modify button for "Short"
    And I enter "ThisIsAnExtremelyLongHabitNameThatExceedsTheMaximumAllowedLengthAndShouldBeRejectedByValidation" as the habit name
    Then an error message "Habit name too long" should be displayed

  @negative @boundary-testing
  Scenario: Edit habit with minimum length name
    Given a habit named "Valid Habit Name" exists
    When I click on modify button for "Valid Habit Name"
    And I enter "A" as the habit name
    Then an error message "Habit name too short" should be displayed

  @positive @ui-verification
  Scenario: Verify edit page shows current habit name
    Given a habit named "Current Name" exists
    When I click on modify button for "Current Name"
    Then the habit name field should contain "Current Name"

  @positive @quick-rename
  Scenario: Quick rename multiple habits
    Given the following habits exist:
      | Habit 1 |
      | Habit 2 |
      | Habit 3 |
    When I rename "Habit 1" to "Updated 1"
    And I rename "Habit 2" to "Updated 2"
    And I rename "Habit 3" to "Updated 3"
    Then the following habits should appear in the habit list:
      | Updated 1 |
      | Updated 2 |
      | Updated 3 |

  @smoke @positive @quick-test
  Scenario: Quick edit habit test
    Given a habit named "Quick Test" exists
    When I click on modify button for "Quick Test"
    And I change the habit name to "Quick Edit"
    And I tap on the Save Habit button
    Then the habit "Quick Edit" should appear in the habit list

  @positive @whitespace-handling
  Scenario: Edit habit with leading/trailing spaces
    Given a habit named "Habit Name" exists
    When I click on modify button for "Habit Name"
    And I enter "  New Name  " as the habit name
    And I tap on the Save Habit button
    Then the habit "New Name" should appear in the habit list
    And the habit name should not have leading or trailing spaces

  @regression @edit-and-complete
  Scenario: Edit habit and then mark as complete
    Given a habit named "Original" exists
    When I click on modify button for "Original"
    And I change the habit name to "Edited"
    And I tap on the Save Habit button
    And I mark the habit "Edited" as completed for date "Mon"
    Then the habit "Edited" should be marked as completed for date "Mon"

  @regression @edit-and-delete
  Scenario: Edit habit and then delete it
    Given a habit named "To Be Deleted" exists
    When I click on modify button for "To Be Deleted"
    And I change the habit name to "Edited Before Delete"
    And I tap on the Save Habit button
    And I click on modify button for "Edited Before Delete"
    And I delete the habit
    Then the habit "Edited Before Delete" should not appear in the habit list
