/**
 * Custom Error Classes
 *
 * Provides specific error types for better error handling
 * Best Practice: Custom errors for domain-specific exceptions
 */

/**
 * Base custom error class
 */
class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Element not found error
 */
class ElementNotFoundError extends BaseError {
  constructor(selector, originalError = null) {
    super(`Element not found: ${selector}`);
    this.selector = selector;
    this.originalError = originalError;
  }
}

/**
 * Timeout error
 */
class TimeoutError extends BaseError {
  constructor(message, timeout = null) {
    super(message);
    this.timeout = timeout;
  }
}

/**
 * Page load error
 */
class PageLoadError extends BaseError {
  constructor(pageName, reason = null) {
    super(`Failed to load page: ${pageName}${reason ? ` - ${reason}` : ""}`);
    this.pageName = pageName;
    this.reason = reason;
  }
}

/**
 * Validation error
 */
class ValidationError extends BaseError {
  constructor(field, message) {
    super(`Validation failed for ${field}: ${message}`);
    this.field = field;
  }
}

/**
 * Test data error
 */
class TestDataError extends BaseError {
  constructor(message) {
    super(`Test data error: ${message}`);
  }
}

/**
 * Configuration error
 */
class ConfigurationError extends BaseError {
  constructor(message) {
    super(`Configuration error: ${message}`);
  }
}

/**
 * Action failed error
 */
class ActionFailedError extends BaseError {
  constructor(action, reason = null) {
    super(`Action failed: ${action}${reason ? ` - ${reason}` : ""}`);
    this.action = action;
    this.reason = reason;
  }
}

module.exports = {
  BaseError,
  ElementNotFoundError,
  TimeoutError,
  PageLoadError,
  ValidationError,
  TestDataError,
  ConfigurationError,
  ActionFailedError,
};
