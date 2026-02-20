# Book & Notes Vault

### Overview
A fully accessible, responsive web application for cataloging books and notes with powerful regex search, reading progress tracking, library catalog, and local data persistence.

## Theme & Brand

**Primary Colors:**
- Antique Gold: `#C9A227`
- Maroon: `#7B1E1E`
- Parchment Background: `#F9F6EF`

**Dark Theme:**
- Gold: `#D4AF37`
- Maroon: `#8A1C1C`
- Navy blue Background: `#0F0D0A`

## Features

### Core Functionality
- **Book Cataloging**: Add, edit, and delete book records with validation
- **Library Catalog**: Browse 40+ curated books across 4 categories
- **Reading Progress**: Track pages read with detailed history logs
- **Advanced Search**: Regex-powered search with case-sensitive and advanced modes
- **Statistics Dashboard**: Track total books, pages read, favorite categories, and reading goals
- **Data Management**: Import/export JSON with validation
- **Theme Customization**: Light/dark themes with color scheme presets

### Accessibility
- Full keyboard navigation support
- ARIA live regions for dynamic updates
- Skip-to-content link
- Visible focus indicators (2px, high contrast)
- WCAG AA compliant color contrast
- Screen reader friendly

### Responsive Design
- Mobile-first approach
- Breakpoints: 360px (mobile), 768px (tablet), 1024px (desktop)
- Adaptive layouts (cards on mobile, tables on desktop)
- Touch-friendly controls

## Data Model

### My Records Fields
- `id`: Unique identifier (e.g., rec_0001)
- `title`: Book title
- `author`: Book author
- `pages`: Total pages in book
- `pagesRead`: Pages read so far (default: 0)
- `readHistory`: Array of reading log entries
- `tag`: Category (Agriculture, Arts & Culture, Entrepreneurship, Social Sciences)
- `dateAdded`: Date added to collection
- `createdAt`: Record creation timestamp
- `updatedAt`: Last modification timestamp

### Reading History Entry
- `id`: Log entry ID
- `bookId`: Reference to book record
- `dateISO`: Date of reading session
- `deltaPages`: Pages read in session
- `note`: Optional note about reading session

### Library Catalog
- Separate from My Records until user adds a book
- 40+ curated books (10+ per category)
- Stored in localStorage after first load from seed.json

## Instruction on how to use Key Features

### Reading Progress Tracking
1. Navigate to My Records
2. Click "Read" button for any book
3. Enter pages read today (validated against remaining pages)
4. Optional: Add a note about your reading session
5. Progress updates immediately in table and dashboard

### Library Catalog
1. Go to Add Book page
2. Browse categories using tabs (Agriculture, Arts & Culture, Entrepreneurship, Social Sciences)
3. Click "+ Add" to add a book to My Records
4. Click "− Remove" to remove from My Records
5. Books from About page categories link directly to filtered catalog

### Goal Progress
- Dashboard shows progress based on total pages READ (not total pages in books)
- Set your goal in Settings (default: 1000 pages)
- Progress bar updates as you log reading sessions
- ARIA announcements when goal is reached or exceeded

## Regex Patterns Catalog

### 1. Title/Author Validation
**Pattern:** `^\S(?:.*\S)?$`
**Purpose:** Prevents leading/trailing whitespace
**Examples:**
- valid "Valid Title"
- invalid " Leading space"
- invalid "Trailing space "

### 2. Pages Validation
**Pattern:** `^(0|[1-9]\d*)$`
**Purpose:** Non-negative integers only
**Examples:**
- valid "0", "1", "250"
- invalid "-5", "01", "12.5"

### 3. Date Validation
**Pattern:** `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$`
**Purpose:** YYYY-MM-DD format
**Examples:**
- valid "2025-01-15"
- invalid "2025-13-01", "25-01-15"

### 4. Tag Validation
**Pattern:** `^[A-Za-z]+(?:[& -]*[A-Za-z]+)*$`
**Purpose:** Letters, spaces, ampersand, hyphens only
**Examples:**
- valid "Agriculture", "Multi Word Tag"
- invalid "Tag123", "Tag!"

### 5. Duplicate Word Detection (Advanced)
**Pattern:** `\b(\w+)\s+\1\b`
**Purpose:** Detects repeated words using backreference
**Examples:**
- valid Matches: "the the book", "is is"
- invalid No match: "different words"

### 6. No Numbers
**Pattern:** `^[^0-9]*$`
**Purpose:** Prevents numeric characters in text fields
**Examples:**
- valid "Only Letters"
- invalid "Has 123 numbers"

## Keyboard Navigation Map

### Global
- `Tab` / `Shift+Tab`: Navigate between interactive elements
- `Enter` / `Space`: Activate buttons and links
- `Escape`: Close modals

### About Page
- Category cards are clickable links to filtered library catalog
- Full keyboard navigation support

### Records Page
- `Tab` to search input, type to filter
- `Tab` to table headers, `Enter` to sort
- `Tab` to action buttons (Edit, Delete, Read)
- Read button opens modal for logging progress

### Forms
- `Tab` through fields
- Validation errors announced on blur
- First invalid field receives focus on submit

### Library Catalog (Add Book Page)
- `Tab` through category tabs
- `Enter` to switch categories
- `Tab` to Add/Remove buttons for each book

## Getting Started

### Local Development
1. Clone the repository
2. Open `index.html` in a modern browser
3. No build process required - vanilla HTML/CSS/JS

### First Time Setup
- Library catalog loads automatically from seed.json
- Data migrates automatically (adds pagesRead and readHistory to existing records)
- All data persists in localStorage

## GitHub Pages Deployment
1. Access at: https://bol-dau.github.io/Building-Responsive-UI_Bol-Dau/

## Live Demo
Click this link to see the demo video: https://youtu.be/QdObbX8MtKI

## Running Tests

Open `tests.html` in your browser to see:
- Automated regex validation tests
- Pass/fail indicators for each pattern
- Test coverage summary

All tests should pass (green checkmarks).

## Project Structure

```
Building-Responsive-UI_Bol-Dau/
├── index.html             # Landing/About page with category links
├── dashboard.html         # Statistics dashboard (uses pagesRead)
├── records.html           # Book records list with Read button
├── form.html              # Add/Edit form + Library catalog
├── settings.html          # Settings & preferences
├── tests.html             # Regex tests
├── seed.json              # 40 library books (10 per category)
├── styles/
│   ├── tokens.css         # CSS variables
│   ├── base.css           # Reset & typography
│   ├── components.css     # UI components (includes library styles)
│   └── utilities.css      # Helper classes
├── scripts/
│   ├── storage.js         # localStorage operations (includes library)
│   ├── state.js           # State management (includes migration & logging)
│   ├── validators.js      # Regex validation
│   ├── search.js          # Search & sort
│   ├── settings.js        # Theme & preferences
│   └── ui.js              # UI utilities
└── assets/
    └── hero.mp4  # Hero video
```

## Acceptance Criteria Met

1. Semantic HTML with proper landmarks
2. Flexbox layouts with media queries  
3. Regex validation (6 patterns including advanced backreference)  
4. DOM manipulation with vanilla JS  
5. ES Modules architecture  
6. localStorage persistence with backward-compatible migration  
7. Import/export JSON with validation  
8. Full keyboard accessibility  
9. ARIA live regions for reading progress updates  
10. Visible focus indicators  
11. WCAG AA contrast compliance  
12. Responsive breakpoints (360px, 768px, 1024px)  
13. Reduced motion support  
14. Reading progress tracking with history logs  
15. Library catalog with 40+ books (10+ per category)  
16. Category-driven navigation from About page  
17. Dashboard goal progress uses pagesRead only  

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Notes

### Data Migration
- Existing records automatically receive `pagesRead: 0` and `readHistory: []`
- No data loss during migration
- Export includes all new fields

### Library vs My Records
- Library catalog: 40 curated books, browsable but not counted in stats
- My Records: Your personal collection, tracked in dashboard
- Adding from library creates a new record with pagesRead: 0

### Goal Calculation
- Dashboard goal progress uses sum of `pagesRead` across all records
- NOT the sum of total `pages` in books
- Log reading sessions to increase progress toward goal

### Placeholder Assets
- `assets/hero.mp4` - Hero video

## NOTE
All the images used in this project — including the category cards and their visual style — were sourced directly from **Pinterest**.  
Some images may appear AI‑generated because Pinterest’s platform frequently distributes AI‑styled visual content.  
These assets were **not generated by me**, and full credit goes to **Pinterest** as the source of inspiration and imagery. 

### About Me Section
- Name: Bol Dau
- Email: b.dau@alustudent.com
- GitHub username:  Bol-Dau

## Contributing

This is a course project demonstrating vanilla web development skills. Feel free to fork and adapt for your own use.

## License

Educational project - free to use and modify.

---

**Built with:** Vanilla HTML, CSS, and JavaScript  
**No frameworks, no dependencies, just web standards**
