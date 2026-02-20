/* ----- SCREEN READER ANNOUNCEMENTS: ARIA live region updates ----- */
// Announces message to screen readers (polite or assertive priority)
export function announce(message, priority = 'polite') {
  const announcer = document.getElementById('announcer') || createAnnouncer();
  announcer.setAttribute('aria-live', priority);
  announcer.textContent = message;
  // Clear after 1 second to allow re-announcement of same message
  setTimeout(() => announcer.textContent = '', 1000);
}

// Creates hidden ARIA live region for screen reader announcements
function createAnnouncer() {
  const announcer = document.createElement('div');
  announcer.id = 'announcer';
  announcer.className = 'sr-only';
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  document.body.appendChild(announcer);
  return announcer;
}

/* ----- MODAL DIALOGS: Confirmation prompts ----- */
// Shows modal with title, message, and confirm/cancel buttons
export function showModal(title, message, onConfirm, onCancel) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'modal-title');
  modal.setAttribute('aria-modal', 'true');
  
  modal.innerHTML = `
    <div class="modal-content">
      <h2 id="modal-title">${title}</h2>
      <p>${message}</p>
      <div class="modal-actions">
        <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
        <button class="btn btn-danger" id="modal-confirm">Confirm</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const confirmBtn = modal.querySelector('#modal-confirm');
  const cancelBtn = modal.querySelector('#modal-cancel');
  
  // Focus confirm button for keyboard accessibility
  confirmBtn.focus();
  
  const cleanup = () => {
    document.body.removeChild(modal);
  };
  
  confirmBtn.addEventListener('click', () => {
    cleanup();
    if (onConfirm) onConfirm();
  });
  
  cancelBtn.addEventListener('click', () => {
    cleanup();
    if (onCancel) onCancel();
  });
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cleanup();
      if (onCancel) onCancel();
    }
  });
}

/* ----- NAVIGATION: Set current page indicator ----- */
// Adds aria-current="page" to active navigation link
export function setCurrentPage(pageName) {
  document.querySelectorAll('.nav a').forEach(link => {
    if (link.getAttribute('href') === pageName) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

/* ----- DATE FORMATTING: Convert ISO to readable format ----- */
// Formats ISO date string to "Jan 15, 2025" format
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
