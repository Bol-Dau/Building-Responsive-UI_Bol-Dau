/* ----- SETTINGS MODULE: Theme, color schemes, and unit conversions ----- */
import { loadSettings, saveSettings } from './storage.js';

// Load saved settings or use defaults
let currentSettings = loadSettings();

/* ----- SETTINGS GETTERS/SETTERS: Access and modify preferences ----- */
// Returns copy of current settings
export function getSettings() {
  return { ...currentSettings };
}

// Merges updates into settings, persists, and applies theme
export function updateSettings(updates) {
  currentSettings = { ...currentSettings, ...updates };
  saveSettings(currentSettings);
  applyTheme();
  return currentSettings;
}

/* ----- THEME APPLICATION: Apply theme and color scheme to DOM ----- */
// Sets data-theme attribute and CSS custom properties for colors
export function applyTheme() {
  document.documentElement.setAttribute('data-theme', currentSettings.theme);
  
  // Apply color scheme overrides (warm, cool, or default)
  if (currentSettings.colorScheme === 'warm') {
    document.documentElement.style.setProperty('--color-primary-gold', '#D4A017');
    document.documentElement.style.setProperty('--color-primary-maroon', '#8B0000');
  } else if (currentSettings.colorScheme === 'cool') {
    document.documentElement.style.setProperty('--color-primary-gold', '#B8860B');
    document.documentElement.style.setProperty('--color-primary-maroon', '#6B1E1E');
  } else {
    // Default colors vary by theme (light vs dark)
    document.documentElement.style.setProperty('--color-primary-gold', 
      currentSettings.theme === 'dark' ? '#D4AF37' : '#C9A227');
    document.documentElement.style.setProperty('--color-primary-maroon', 
      currentSettings.theme === 'dark' ? '#8A1C1C' : '#7B1E1E');
  }
}

/* ----- UNIT CONVERSION: Convert between pages, hours, days, minutes ----- */
// Converts reading units using 50 pages/hour, 8 hours/day baseline
export function convertUnit(pages, fromUnit, toUnit) {
  const pagesPerHour = 50;
  const hoursPerDay = 8;
  const minutesPerHour = 60;
  
  // Convert input to pages first
  let inPages = pages;
  if (fromUnit === 'hours') inPages = pages * pagesPerHour;
  if (fromUnit === 'days') inPages = pages * pagesPerHour * hoursPerDay;
  if (fromUnit === 'minutes') inPages = pages * pagesPerHour / minutesPerHour;
  
  // Convert pages to target unit
  if (toUnit === 'pages') return Math.round(inPages);
  if (toUnit === 'hours') return Math.round(inPages / pagesPerHour * 10) / 10;
  if (toUnit === 'days') return Math.round(inPages / (pagesPerHour * hoursPerDay) * 10) / 10;
  if (toUnit === 'minutes') return Math.round(inPages / pagesPerHour * minutesPerHour);
  
  return inPages;
}

// Apply theme on module load
applyTheme();
