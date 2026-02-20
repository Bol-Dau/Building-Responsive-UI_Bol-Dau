/* ----- STATE INITIALIZATION: Load records and prepare ID counter ----- */
import { loadData, saveData } from './storage.js';

// Load records with migration (adds pagesRead and readHistory if missing)
let records = migrateData(loadData());
// Calculate next available ID from existing records
let nextId = records.length > 0 ? Math.max(...records.map(r => parseInt(r.id.split('_')[1]))) + 1 : 1;

/* ----- DATA MIGRATION: Backward compatibility for reading progress ----- */
// Adds pagesRead=0 and readHistory=[] to existing records without these fields
function migrateData(data) {
  return data.map(r => ({
    ...r,
    pagesRead: r.pagesRead ?? 0,
    readHistory: r.readHistory ?? []
  }));
}

/* ----- RECORD RETRIEVAL: Get all records or find by ID ----- */
// Returns copy of all records to prevent direct mutation
export function getRecords() {
  return [...records];
}

// Finds single record by ID or returns undefined
export function getRecordById(id) {
  return records.find(r => r.id === id);
}

/* ----- RECORD CREATION: Add new book with auto-generated ID ----- */
// Creates record with sequential ID (rec_0001), pagesRead=0, timestamps
export function addRecord(record) {
  const newRecord = {
    ...record,
    id: `rec_${String(nextId++).padStart(4, '0')}`,
    pagesRead: 0,
    readHistory: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  records.push(newRecord);
  saveData(records);
  return newRecord;
}

/* ----- RECORD MODIFICATION: Update existing record ----- */
// Merges updates into record and refreshes updatedAt timestamp
export function updateRecord(id, updates) {
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records[index] = {
      ...records[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveData(records);
    return records[index];
  }
  return null;
}

/* ----- RECORD DELETION: Remove record by ID ----- */
// Removes record from array and persists change
export function deleteRecord(id) {
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records.splice(index, 1);
    saveData(records);
    return true;
  }
  return false;
}

/* ----- DATA IMPORT/EXPORT: JSON file operations ----- */
// Replaces all records with imported data, ensures IDs and timestamps exist
export function importRecords(data) {
  records = migrateData(data.map((r, i) => ({
    ...r,
    id: r.id || `rec_${String(i + 1).padStart(4, '0')}`,
    createdAt: r.createdAt || new Date().toISOString(),
    updatedAt: r.updatedAt || new Date().toISOString()
  })));
  nextId = records.length > 0 ? Math.max(...records.map(r => parseInt(r.id.split('_')[1]))) + 1 : 1;
  saveData(records);
}

// Returns all records as formatted JSON string
export function exportRecords() {
  return JSON.stringify(records, null, 2);
}

/* ----- STATISTICS: Calculate dashboard metrics ----- */
// Computes total books, pages, pagesRead, favorite category, last 3 interacted
export function getStats() {
  const total = records.length;
  const totalPages = records.reduce((sum, r) => sum + (r.pages || 0), 0);
  const totalPagesRead = records.reduce((sum, r) => sum + (r.pagesRead || 0), 0);
  
  // Count books per category to find most common
  const tagCounts = {};
  records.forEach(r => {
    tagCounts[r.tag] = (tagCounts[r.tag] || 0) + 1;
  });
  const favoriteCategory = Object.keys(tagCounts).reduce((a, b) => 
    tagCounts[a] > tagCounts[b] ? a : b, 'None');
  
  // Sort by updatedAt to get recently modified books
  const sortedByDate = [...records].sort((a, b) => 
    new Date(b.updatedAt) - new Date(a.updatedAt));
  const lastInteracted = sortedByDate.slice(0, 3);
  
  return { total, totalPages, totalPagesRead, favoriteCategory, lastInteracted };
}

/* ----- READING PROGRESS: Log daily reading sessions ----- */
// Adds pages to pagesRead, creates history entry, validates against total pages
export function logReadingProgress(id, deltaPages, note = '') {
  const record = getRecordById(id);
  if (!record) return null;
  
  // Prevent reading more pages than book contains
  const newPagesRead = record.pagesRead + deltaPages;
  if (newPagesRead > record.pages) return null;
  
  // Create timestamped log entry
  const logEntry = {
    id: `log_${Date.now()}`,
    bookId: id,
    dateISO: new Date().toISOString(),
    deltaPages,
    note
  };
  
  // Prepend new entry to history (newest first)
  const readHistory = [logEntry, ...(record.readHistory || [])];
  
  return updateRecord(id, {
    pagesRead: newPagesRead,
    readHistory
  });
}
