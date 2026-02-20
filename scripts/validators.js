/* ----- REGEX PATTERNS: Validation rules for form fields ----- */
export const patterns = {
  title: /^\S(?:.*\S)?$/,                    // No leading/trailing spaces
  author: /^\S(?:.*\S)?$/,                   // No leading/trailing spaces
  pages: /^(0|[1-9]\d*)$/,                   // Non-negative integers (no leading zeros)
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,  // YYYY-MM-DD format
  tag: /^[A-Za-z]+(?:[-& ]*[A-Za-z]+)*$/,      // Letters, spaces, hyphens only
  duplicateWord: /\b(\w+)\s+\1\b/i,          // Detects repeated words (backreference)
  noNumbers: /^[^0-9]*$/,                    // No numeric characters
  onlyNumbers: /^\d+$/                       // Only digits
};

/* ----- FIELD VALIDATION: Check single field against rules ----- */
// Returns array of error messages for a field value
export function validateField(field, value) {
  const errors = [];
  
  switch(field) {
    case 'title':
    case 'author':
      // Check whitespace, numbers, and duplicate words
      if (!value || !patterns[field].test(value)) {
        errors.push('Cannot have leading or trailing spaces');
      }
      if (!patterns.noNumbers.test(value)) {
        errors.push('Cannot contain numbers');
      }
      if (patterns.duplicateWord.test(value)) {
        errors.push('Contains duplicate words');
      }
      break;
    case 'pages':
      if (!patterns.pages.test(value)) {
        errors.push('Must be a non-negative integer');
      }
      break;
    case 'dateAdded':
      if (!patterns.date.test(value)) {
        errors.push('Must be in YYYY-MM-DD format');
      }
      break;
    case 'tag':
      if (!patterns.tag.test(value)) {
        errors.push('Must contain only letters, spaces, ampersand, or hyphens');
      }
      break;
  }
  
  return errors;
}

/* ----- RECORD VALIDATION: Validate all fields in a record ----- */
// Returns object with field names as keys and error arrays as values
export function validateRecord(record) {
  const errors = {};
  
  ['title', 'author', 'pages', 'dateAdded', 'tag'].forEach(field => {
    const fieldErrors = validateField(field, record[field]);
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  });
  
  return errors;
}
