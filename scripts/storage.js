/* ----- STORAGE KEYS: localStorage identifiers for data persistence ----- */
const STORAGE_KEY = 'vault:data:v1';      // User's book records
const SETTINGS_KEY = 'vault:settings:v1';  // Theme and preferences
const LIBRARY_KEY = 'vault:library:v1';    // Curated library catalog

/* ----- DATA OPERATIONS: Load and save user's book records ----- */
// Retrieves all book records from localStorage
export function loadData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load data:', e);
    return [];
  }
}

// Persists book records array to localStorage
export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save data:', e);
    return false;
  }
}

/* ----- SETTINGS OPERATIONS: Load and save user preferences ----- */
// Retrieves settings or returns defaults (light theme, 1000 page goal)
export function loadSettings() {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : {
      theme: 'light',
      colorScheme: 'default',
      unit: 'pages',
      goal: 1000
    };
  } catch (e) {
    console.error('Failed to load settings:', e);
    return { theme: 'light', colorScheme: 'default', unit: 'pages', goal: 1000 };
  }
}

// Persists user settings to localStorage
export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (e) {
    console.error('Failed to save settings:', e);
    return false;
  }
}

/* ----- LIBRARY OPERATIONS: Load and save curated book catalog ----- */
// Retrieves library catalog (40 books from seed.json)
export function loadLibrary() {
  try {
    const library = localStorage.getItem(LIBRARY_KEY);
    return library ? JSON.parse(library) : null;
  } catch (e) {
    console.error('Failed to load library:', e);
    return null;
  }
}

// Persists library catalog to localStorage after first load
export function saveLibrary(library) {
  try {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
    return true;
  } catch (e) {
    console.error('Failed to save library:', e);
    return false;
  }
}
