@ui @behavior @regression
Feature: UI Behavior
  As a user
  I want the app UI to behave consistently
  So that I have a smooth user experience

  Background:
    Given the Habo app is launched
    And the home screen should be displayed

  @positive @scrolling
  Scenario: Scroll through long habit list
    Given I have 20 habits in the list
    When I scroll down to the bottom of the list
    Then all 20 habits should be accessible
    And the list should scroll smoothly

  @positive @scrolling
  Scenario: Scroll to find specific habit
    Given I have the following habits:
      | Habit 1  |
      | Habit 2  |
      | Habit 3  |
      | Habit 4  |
      | Habit 5  |
      | Habit 10 |
    When I scroll to find the habit "Habit 10"
    Then the habit "Habit 10" should be visible

  @positive @orientation
  Scenario: Switch device orientation
    Given a habit named "Test Habit" exists
    And the device is in portrait orientation
    When I rotate the device to landscape
    Then the habit "Test Habit" should still be displayed
    And the UI should adapt to landscape mode
    
    When I rotate the device to portrait
    Then the habit "Test Habit" should still be displayed
    And the UI should adapt to portrait mode

  @positive @navigation
  Scenario: Navigate between screens
    When I tap on the Add Habit button
    Then the create habit page should be displayed
    
    When I tap on the Cancel button
    Then the home screen should be displayed
    
    When I tap on the Add Habit button
    And I enter "Test" as the habit name
    And I tap on the Save Habit button
    Then the home screen should be displayed

  @positive @button-states
  Scenario: Verify button enabled/disabled states
    When I tap on the Add Habit button
    Then the Save button should be disabled
    
    When I enter "Valid Habit" as the habit name
    Then the Save button should be enabled
    
    When I clear the habit name field
    Then the Save button should be disabled

  @positive @visual-feedback
  Scenario: Tap visual feedback
    Given a habit named "Test Habit" exists
    When I tap on the habit "Test Habit"
    Then visual feedback should be shown
    And the habit should be highlighted

  @positive @pull-to-refresh
  Scenario: Pull to refresh habit list
    Given a habit named "Test Habit" exists
    When I pull down to refresh the list
    Then the habit list should reload
    And the habit "Test Habit" should appear in the habit list

  @positive @empty-state
  Scenario: Display empty state when no habits
    Given the habit list is empty
    Then an empty state message should be displayed
    And the Add Habit button should be displayed
    And a prompt to create first habit should be visible

  @positive @loading-state
  Scenario: Show loading indicator during operations
    When I create a new habit named "Loading Test"
    Then a loading indicator should appear briefly
    And the habit "Loading Test" should appear in the habit list

  @positive @error-state
  Scenario: Display error messages appropriately
    When an error occurs during habit creation
    Then an error message should be displayed
    And the error message should be dismissible
    And the user should be able to retry the operation

  @positive @keyboard-behavior
  Scenario: Keyboard appears and dismisses correctly
    When I tap on the Add Habit button
    And I tap on the habit name field
    Then the keyboard should appear
    
    When I tap outside the text field
    Then the keyboard should dismiss

  @positive @keyboard-return
  Scenario: Keyboard return key behavior
    When I tap on the Add Habit button
    And I enter "Test Habit" as the habit name
    And I tap the keyboard return key
    Then the habit should be saved
    Or the keyboard should dismiss

  @positive @accessibility
  Scenario: Accessibility labels are present
    When I navigate through the app
    Then all interactive elements should have accessibility labels
    And screen reader should be able to read all content

  @positive @gestures
  Scenario: Swipe gestures work correctly
    Given a habit named "Swipe Test" exists
    When I swipe left on the habit "Swipe Test"
    Then swipe options should be displayed
    
    When I swipe right on the habit "Swipe Test"
    Then the swipe options should dismiss

  @positive @tap-targets
  Scenario: Tap targets are appropriately sized
    Given a habit named "Tap Test" exists
    When I tap on the habit "Tap Test"
    Then the tap should be registered
    And no accidental taps should occur

  @positive @animations
  Scenario: Smooth animations during transitions
    When I tap on the Add Habit button
    Then the screen should transition smoothly
    
    When I tap on the Cancel button
    Then the screen should transition smoothly back

  @positive @multi-touch
  Scenario: Prevent accidental multi-touch
    When I tap on the Add Habit button twice quickly
    Then only one create habit page should open
    And no duplicate pages should appear

  @positive @back-button
  Scenario: Back button navigation
    When I tap on the Add Habit button
    And I tap the device back button
    Then I should return to the home screen
    And no data should be saved

  @regression @ui-persistence
  Scenario: UI state persists correctly
    When I tap on the Add Habit button
    And I enter "Partial Habit" as the habit name
    And I send the app to background
    And I bring the app to foreground
    Then the create habit page should still be displayed
    And the habit name field should contain "Partial Habit"

  @positive @focus-management
  Scenario: Focus management in forms
    When I tap on the Add Habit button
    Then the habit name field should automatically receive focus
    And the keyboard should appear

  @positive @scrollbar
  Scenario: Scrollbar visibility
    Given I have 15 habits in the list
    When I scroll through the list
    Then the scrollbar should be visible during scrolling
    And the scrollbar should fade out when not scrolling

  @positive @list-refresh
  Scenario: List updates immediately after changes
    When I create a new habit named "Immediate Update"
    Then the habit "Immediate Update" should appear immediately
    And no manual refresh should be required

  @positive @touch-feedback
  Scenario: Touch feedback on all interactive elements
    When I tap on the Add Habit button
    Then visual feedback should be shown
    
    When I tap on the Save Habit button
    Then visual feedback should be shown
    
    When I tap on the Cancel button
    Then visual feedback should be shown
