@habit @delete @regression
Feature: Delete Habit
  As a user
  I want to delete habits
  So that I can remove habits I no longer need or want to track

  Background:
    Given the Habo app is launched
    And the home screen should be displayed

  @smoke @positive @critical
  Scenario: Delete a single existing habit
    Given a habit named "Old Habit" exists
    When I click on modify button for "Old Habit"
    Then the create habit page should be displayed
    And the Delete button should be displayed
    
    When I delete the habit
    Then the habit "Old Habit" gets deleted
    And the habit "Old Habit" should not appear in the habit list
    And the home screen should be displayed

  @positive @data-driven
  Scenario Outline: Delete multiple habits individually
    Given a habit named "<Habit>" exists
    When I click on modify button for "<Habit>"
    And I delete the habit
    Then the habit "<Habit>" gets deleted
    And the habit "<Habit>" should not appear in the habit list

    @priority-high
    Examples: Common habits to delete
      | Habit           |
      | Drink Water     |
      | Do Exercise     |
      | Go on a Walk    |
      | Eat Dinner      |

    @priority-medium
    Examples: Additional habits
      | Habit              |
      | Morning Routine    |
      | Evening Meditation |
      | Read Before Bed    |

  @positive @multiple-deletes
  Scenario: Delete multiple habits in sequence
    Given the following habits exist:
      | Habit One   |
      | Habit Two   |
      | Habit Three |
    When I click on modify button for "Habit One"
    And I delete the habit
    And I click on modify button for "Habit Two"
    And I delete the habit
    And I click on modify button for "Habit Three"
    And I delete the habit
    Then the habit "Habit One" should not appear in the habit list
    And the habit "Habit Two" should not appear in the habit list
    And the habit "Habit Three" should not appear in the habit list
    And the habit list is empty should be visible on first launch

  @negative @non-existent-habit
  Scenario: Cannot delete a habit that doesn't exist
    When I try to delete the habit "Non-Existent Habit"
    Then an error message should indicate the habit was not found

  @negative @cancel-delete
  Scenario: Cancel habit deletion
    Given a habit named "Keep This Habit" exists
    When I click on modify button for "Keep This Habit"
    And I tap on the Cancel button
    Then the home screen should be displayed
    And the habit "Keep This Habit" should appear in the habit list

  @positive @confirmation
  Scenario: Delete habit with confirmation
    Given a habit named "Delete Me" exists
    When I click on modify button for "Delete Me"
    And I delete the habit
    Then a deletion confirmation message should be displayed
    And the habit "Delete Me" should not appear in the habit list

  @positive @delete-with-data
  Scenario: Delete habit with completion history
    Given a habit named "Habit With History" exists
    And the habit "Habit With History" is marked as completed for date "Mon"
    And the habit "Habit With History" is marked as completed for date "Tue"
    When I click on modify button for "Habit With History"
    And I delete the habit
    Then the habit "Habit With History" gets deleted
    And the habit "Habit With History" should not appear in the habit list

  @regression @delete-persistence
  Scenario: Verify deletion persists after app restart
    Given a habit named "Temporary Habit" exists
    When I click on modify button for "Temporary Habit"
    And I delete the habit
    And I terminate the app
    And I launch the Habo app
    Then the habit "Temporary Habit" should not appear in the habit list

  @positive @ui-verification
  Scenario: Verify UI updates after deletion
    Given a habit named "Habit One" exists
    And a habit named "Habit Two" exists
    And there should be 2 habit(s) in the list
    When I click on modify button for "Habit One"
    And I delete the habit
    Then there should be 1 habit(s) in the list
    And the habit "Habit Two" should appear in the habit list

  @positive @delete-last-habit
  Scenario: Delete the last remaining habit
    Given a habit named "Last Habit" exists
    And there should be 1 habit(s) in the list
    When I click on modify button for "Last Habit"
    And I delete the habit
    Then the habit list is empty should be visible on first launch
    And there should be 0 habit(s) in the list

  @positive @delete-and-recreate
  Scenario: Delete and recreate the same habit
    Given a habit named "Recurring Habit" exists
    When I click on modify button for "Recurring Habit"
    And I delete the habit
    Then the habit "Recurring Habit" should not appear in the habit list
    
    When I create a new habit named "Recurring Habit"
    Then the habit "Recurring Habit" should appear in the habit list

  @negative @delete-button-visibility
  Scenario: Delete button not visible on create habit page
    When I tap on the Add Habit button
    Then the Delete button should not be displayed

  @positive @delete-with-special-chars
  Scenario: Delete habit with special characters in name
    Given a habit named "Read & Write" exists
    When I click on modify button for "Read & Write"
    And I delete the habit
    Then the habit "Read & Write" gets deleted
    And the habit "Read & Write" should not appear in the habit list

  @positive @bulk-delete-preparation
  Scenario: Delete multiple habits to clear list
    Given the following habits exist:
      | Old Habit 1 |
      | Old Habit 2 |
      | Old Habit 3 |
      | Old Habit 4 |
      | Old Habit 5 |
    When I delete all habits
    Then the habit list is empty should be visible on first launch

  @smoke @positive @quick-test
  Scenario: Quick delete habit test
    Given a habit named "Quick Delete Test" exists
    When I click on modify button for "Quick Delete Test"
    And I delete the habit
    Then the habit "Quick Delete Test" should not appear in the habit list

  @positive @error-recovery
  Scenario: Recover from failed deletion
    Given a habit named "Test Habit" exists
    When I click on modify button for "Test Habit"
    And the deletion fails due to network error
    Then the habit "Test Habit" should still appear in the habit list
    And an error message should be displayed

  @regression @delete-ordering
  Scenario: Verify habit list order after deletion
    Given the following habits exist:
      | First Habit  |
      | Second Habit |
      | Third Habit  |
    When I click on modify button for "Second Habit"
    And I delete the habit
    Then the following habits should appear in the habit list:
      | First Habit |
      | Third Habit |
