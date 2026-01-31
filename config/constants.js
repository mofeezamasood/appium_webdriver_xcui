/**
 * Constants - Centralized configuration values
 *
 * Best Practice: Single source of truth for all magic numbers and strings
 */

module.exports = {
  // Timeout values in milliseconds
  TIMEOUTS: {
    SHORT: 2000,
    MEDIUM: 5000,
    LONG: 10000,
    EXTRA_LONG: 15000,
    UI_UPDATE: 500,
    PAGE_LOAD: 2000,
    ANIMATION: 300,
  },

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    INITIAL_DELAY: 1000,
    BACKOFF_MULTIPLIER: 2,
  },

  // App information
  APP: {
    BUNDLE_ID: "com.pavlenko.Habo.mofi",
    NAME: "Habo",
    PLATFORM: "iOS",
  },

  // Validation rules
  VALIDATION: {
    HABIT_NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 100,
      ALLOWED_CHARS: /^[a-zA-Z0-9\s\-_]+$/,
    },
  },

  // Test data defaults
  DEFAULTS: {
    HABIT_NAME: "Test Habit",
    WAIT_INTERVAL: 500,
  },

  // Error messages
  ERROR_MESSAGES: {
    ELEMENT_NOT_FOUND: "Element not found",
    TIMEOUT: "Operation timed out",
    INVALID_INPUT: "Invalid input provided",
    PAGE_NOT_LOADED: "Page did not load correctly",
  },

  // Success messages
  SUCCESS_MESSAGES: {
    HABIT_CREATED: "Habit created successfully",
    HABIT_DELETED: "Habit deleted.",
    HABIT_UPDATED: "Habit updated successfully",
    HABIT_COMPLETED: "Habit marked as complete",
  },

  // Days of week
  DAYS: {
    SHORT: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    FULL: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },

  // Device orientations
  ORIENTATIONS: {
    PORTRAIT: "PORTRAIT",
    LANDSCAPE: "LANDSCAPE",
  },

  // Swipe directions
  SWIPE_DIRECTIONS: {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
  },

  // Screenshot directory
  SCREENSHOTS: {
    DIR: "./screenshots",
    ON_FAILURE: true,
  },

  // Logging levels
  LOG_LEVELS: {
    ERROR: "error",
    WARN: "warn",
    INFO: "info",
    DEBUG: "debug",
  },
};
