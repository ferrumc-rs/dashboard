/**
 * FerrumC Dashboard Logic
 * Handles navigation, modals, WebSocket connection, and metric updates.
 */

// ==========================================
// UI Controller: Navigation & Layout
// ==========================================

const UI = {
    showPage(pageId) {
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
};

// Expose globally for HTML onclick handlers
window.showPage = UI.showPage;


// ==========================================
// UI Controller: Modals
// ==========================================

const Modals = {
    power: {
        el: document.getElementById('power-modal'),
        backdrop: document.getElementById('modal-backdrop'),
        content: document.getElementById('modal-content'),
        open() {
            if (!this.el) return;
            this.el.classList.remove('hidden');
            setTimeout(() => {
                this.backdrop.classList.remove('opacity-0');
                this.content.classList.remove('scale-95', 'opacity-0');
                this.content.classList.add('scale-100', 'opacity-100');
            }, 10);
        },
        close() {
            if (!this.el) return;
            this.backdrop.classList.add('opacity-0');
            this.content.classList.remove('scale-100', 'opacity-100');
            this.content.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                this.el.classList.add('hidden');
            }, 200);
        }
    },
    confirm: {
        el: document.getElementById('confirmation-modal'),
        backdrop: document.getElementById('confirm-backdrop'),
        content: document.getElementById('confirm-content'),
        title: document.getElementById('confirm-title'),
        message: document.getElementById('confirm-message'),
        yesBtn: document.getElementById('confirm-yes-btn'),
        pendingAction: null,

        open(action) {
            this.pendingAction = action;
            if (action === 'stop') {
                this.title.innerText = 'Stop Server?';
                this.message.innerText = 'This will disconnect all players and shut down the server.';
                this.yesBtn.className = "flex-1 px-4 py-2 rounded-xl bg-danger text-white hover:bg-red-600 transition shadow-lg shadow-danger/20";
            } else if (action === 'restart') {
                this.title.innerText = 'Restart Server?';
                this.message.innerText = 'The server will reload configuration and plugins.';
                this.yesBtn.className = "flex-1 px-4 py-2 rounded-xl bg-warning text-white hover:bg-yellow-600 transition shadow-lg shadow-warning/20";
            }

            this.el.classList.remove('hidden');
            setTimeout(() => {
                this.backdrop.classList.remove('opacity-0');
                this.content.classList.remove('scale-95', 'opacity-0');
                this.content.classList.add('scale-100', 'opacity-100');
            }, 10);
        },
        close() {
            this.backdrop.classList.add('opacity-0');
            this.content.classList.remove('scale-100', 'opacity-100');
            this.content.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                this.el.classList.add('hidden');
                this.pendingAction = null;
            }, 200);
        },
        confirm() {
            if (this.pendingAction) {
                console.log('Executing: ' + this.pendingAction);
                // TODO: Call the backend API.
            }
            this.close();
            Modals.power.close();
        }
    }
};

// Expose globally
window.openPowerModal = () => Modals.power.open();
window.closePowerModal = () => Modals.power.close();
window.confirmAction = (action) => Modals.confirm.open(action);
window.closeConfirmModal = () => Modals.confirm.close();

// Bind Confirm Button
if (Modals.confirm.yesBtn) {
    Modals.confirm.yesBtn.onclick = () => Modals.confirm.confirm();
}

// Close modals on backdrop click
document.addEventListener('DOMContentLoaded', () => {
    if (Modals.power.el) {
        Modals.power.el.addEventListener('click', (e) => {
            if (e.target === Modals.power.el || e.target === Modals.power.backdrop) {
                Modals.power.close();
            }
        });
    }
});


// ==========================================
// Telemetry: WebSocket & Metrics
// ==========================================

const Telemetry = {
    socket: null,

    connect() {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const address_ip = window.location.hostname;
        // get the port from url query prams
        const address_port = new URLSearchParams(window.location.search).get('ws_port') || window.location.port;
        const address = address_port ? `${address_ip}:${address_port}` : address_ip;
        
        this.socket = new WebSocket(`${protocol}//${address}/ws`);

        this.socket.onopen = () => {
            console.log("Connected to FerrumC Telemetry");
            this.updateStatus("Running");
        };

        this.socket.onmessage = (event) => {
            try {
                const payload = JSON.parse(event.data);
                if (payload.type === "Metric") {
                    this.updateMetrics(payload.data);
                }
            } catch (e) {
                console.error("Error parsing WebSocket message:", e);
            }
        };

        this.socket.onclose = () => {
            console.log("Disconnected. Retrying in 2s...");
            this.updateStatus("Offline");
            setTimeout(() => this.connect(), 2000);
        };

        this.socket.onerror = (err) => {
            console.error("WebSocket error:", err);
            this.socket.close();
        };
    },

    updateStatus(status) {
        const statusEl = document.getElementById('metric-status-text');
        if (statusEl) statusEl.innerText = status;
    },

    updateMetrics(data) {
        // 1. Memory
        const ramFormatted = formatBytes(data.ram_usage);
        const totalFormatted = formatBytes(data.total_ram);
        const ramPercent = ((data.ram_usage / data.total_ram) * 100).toFixed(1);

        this.setSafeText('metric-ram-val', ramFormatted);
        this.setSafeStyle('metric-ram-bar', 'width', `${ramPercent}%`);
        
        this.setSafeText('resource-ram-percent', `${ramPercent}%`);
        this.setSafeStyle('resource-ram-bar', 'width', `${ramPercent}%`);
        this.setSafeText('resource-ram-detail', `${ramFormatted} / ${totalFormatted} Allocated`);

        // 2. CPU
        const cpuPercent = data.cpu_usage.toFixed(0);
        this.setSafeText('metric-cpu-val', `${cpuPercent}%`);
        this.setSafeStyle('metric-cpu-bar', 'width', `${cpuPercent}%`);
        
        this.setSafeText('resource-cpu-text', `${cpuPercent}%`);
        this.setSafeStyle('resource-cpu-bar', 'width', `${cpuPercent}%`);

        // 3. Uptime (Navbar)
        if (data.uptime !== undefined) {
            this.setSafeText('header-uptime', formatUptime(data.uptime));
        }

        // 4. Players
        if (data.online_players !== undefined) {
            this.setSafeText('metric-players-val', data.online_players);
        }
    },

    // Helper to safely set text content if element exists
    setSafeText(id, text) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    },

    // Helper to safely set style property if element exists
    setSafeStyle(id, prop, value) {
        const el = document.getElementById(id);
        if (el) el.style[prop] = value;
    }
};

// Start Telemetry on Load
document.addEventListener('DOMContentLoaded', () => {
    Telemetry.connect();
});
