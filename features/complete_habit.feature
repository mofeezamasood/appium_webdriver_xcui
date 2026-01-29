Feature: Complete Habit

  As a user
  I want to mark a habit as completed
  So that I can track my progress

  Scenario: Mark habit as completed
    Given the Habo app is launched
    And a habit named "<Habit>" exists
    When I mark the habit "<Habit>" as completed for date "<Date>"
    Then the habit "<Habit>" should be marked as completed for date "<Date>"

  Examples:
    |      Habit      |           Date              |
    |   Drink Water   | Monday, January 26, 2026    |
    |   Eat Dinner    | Thursday, January 29, 2026   |
    |  Do Excercise   | Tuesday, January 27, 2026   |
    |  Go on a Walk   | Wednesday, January 28, 2026 |

