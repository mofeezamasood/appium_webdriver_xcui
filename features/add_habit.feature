Feature: Add Habit

  As a user
  I want to add a new habit
  So that I can track my daily activities

  Scenario: Add a new habit successfully
    Given the Habo app is launched
    When I tap on the Add Habit button
    And I enter "<Habit>" as the habit name
    And I tap on the Save Habit button
    Then the habit "<Habit>" should appear in the habit list

  Examples:
    |      Habit      |
    |   Drink Water   | 
    |  Do Excercise   | 
    |  Go on a Walk   |
    |   Eat Dinner    |