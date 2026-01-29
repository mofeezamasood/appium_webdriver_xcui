Feature: Delete Habit

  As a user
  I want to delete a habit
  So that I can remove habits I no longer need

  Scenario: Delete an existing habit
    Given the Habo app is launched
    And a habit named "<Habit>" exists
    When I click on modify button for "<Habit>"
    And I delete the habit
    Then the habit "<Habit>" gets deleted
    And the habit "<Habit>" should not appear in the habit list

  Examples:
    |      Habit      |
    |   Drink Water   | 
    # |  Do Excercise   | 
    # |  Go on a Walk   |
    # |   Eat Dinner    |