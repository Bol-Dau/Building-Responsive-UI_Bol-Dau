/* ----- SEARCH FUNCTIONALITY: Filter records using regex ----- */
// Filters records by query matching title, author, or tag
export function searchRecords(records, query, options = {}) {
  const { caseSensitive = false, advanced = false } = options;
  
  if (!query) return records;
  
  try {
    const flags = caseSensitive ? 'g' : 'gi';
    // Advanced mode uses raw regex, basic mode escapes special characters
    const regex = advanced ? new RegExp(query, flags) : new RegExp(escapeRegex(query), flags);
    
    return records.filter(record => {
      return regex.test(record.title) || 
             regex.test(record.author) || 
             regex.test(record.tag);
    });
  } catch (e) {
    console.error('Invalid regex:', e);
    return [];
  }
}

/* ----- HIGHLIGHT MATCHES: Wrap search matches in <mark> tags ----- */
// Returns text with matching portions wrapped for visual highlighting
export function highlightMatches(text, query, options = {}) {
  const { caseSensitive = false, advanced = false } = options;
  
  if (!query || !text) return text;
  
  try {
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = advanced ? new RegExp(query, flags) : new RegExp(escapeRegex(query), flags);
    
    return text.replace(regex, match => `<mark>${match}</mark>`);
  } catch (e) {
    return text;
  }
}

// Escapes regex special characters for literal string matching
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ----- SORTING: Sort records by field and direction ----- */
// Returns sorted copy of records (asc or desc)
export function sortRecords(records, field, direction = 'asc') {
  return [...records].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];
    
    // Convert to appropriate type for comparison
    if (field === 'pages') {
      aVal = parseInt(aVal) || 0;
      bVal = parseInt(bVal) || 0;
    } else if (field === 'dateAdded') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    } else {
      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();
    }
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}
