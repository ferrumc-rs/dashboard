// Navigation Logic
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('[id^="page-"]').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show target page
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.remove('hidden');
    }

    // Update Header Title
    const titles = {
        'overview': 'Overview',
        'console': 'Server Console',
        'players': 'Player Management',
        'config': 'Configuration'
    };
    const titleEl = document.getElementById('header-title');
    if (titleEl) {
        titleEl.innerText = titles[pageId] || 'Dashboard';
    }

    // Update Sidebar State
    document.querySelectorAll('nav button').forEach(btn => {
        // Reset all buttons
        btn.classList.remove('bg-primary/10', 'text-primary', 'border-primary/20');
        btn.classList.add('text-gray-400', 'hover:text-white', 'hover:bg-white/5', 'border-transparent');
    });

    // Activate current button
    const activeBtn = document.getElementById('nav-' + pageId);
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-400', 'hover:text-white', 'hover:bg-white/5', 'border-transparent');
        activeBtn.classList.add('bg-primary/10', 'text-primary', 'border-primary/20');
    }
}

// Modal Logic
const modal = document.getElementById('power-modal');
const backdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');

function openPowerModal() {
    if (!modal) return;
    modal.classList.remove('hidden');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closePowerModal() {
    if (!modal) return;
    backdrop.classList.add('opacity-0');
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

// Confirmation Modal Logic
const confirmModal = document.getElementById('confirmation-modal');
const confirmBackdrop = document.getElementById('confirm-backdrop');
const confirmContent = document.getElementById('confirm-content');
const confirmTitle = document.getElementById('confirm-title');
const confirmMessage = document.getElementById('confirm-message');
const confirmYesBtn = document.getElementById('confirm-yes-btn');

let pendingAction = null;

function openConfirmModal(action) {
    pendingAction = action;
    
    // Customize text based on action
    if (action === 'stop') {
        confirmTitle.innerText = 'Stop Server?';
        confirmMessage.innerText = 'This will disconnect all players and shut down the server.';
        confirmYesBtn.className = "flex-1 px-4 py-2 rounded-xl bg-danger text-white hover:bg-red-600 transition shadow-lg shadow-danger/20";
    } else if (action === 'restart') {
        confirmTitle.innerText = 'Restart Server?';
        confirmMessage.innerText = 'The server will reload configuration and plugins.';
        confirmYesBtn.className = "flex-1 px-4 py-2 rounded-xl bg-warning text-white hover:bg-yellow-600 transition shadow-lg shadow-warning/20";
    }

    confirmModal.classList.remove('hidden');
    setTimeout(() => {
        confirmBackdrop.classList.remove('opacity-0');
        confirmContent.classList.remove('scale-95', 'opacity-0');
        confirmContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeConfirmModal() {
    confirmBackdrop.classList.add('opacity-0');
    confirmContent.classList.remove('scale-100', 'opacity-100');
    confirmContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        confirmModal.classList.add('hidden');
        pendingAction = null;
    }, 200);
}

if (confirmYesBtn) {
    confirmYesBtn.onclick = () => {
        if (pendingAction) {
            console.log('Executing: ' + pendingAction);
            // TODO: Call the backend API.
        }
        closeConfirmModal();
        closePowerModal();
    };
}

function confirmAction(action) {
    openConfirmModal(action);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Close modal on backdrop click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === backdrop) {
                closePowerModal();
            }
        });
    }
});
