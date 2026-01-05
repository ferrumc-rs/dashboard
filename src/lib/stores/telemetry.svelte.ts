/**
 * FerrumC Dashboard Telemetry Store
 * Handles WebSocket connection and real-time metric updates.
 */

import { browser } from "$app/environment";
import { page } from "$app/state";

export interface TpsDataPoint {
	time: Date;
	tps: number;
}

export interface TelemetryData {
	status: string;
	ramUsage: number;
	totalRam: number;
	cpuUsage: number;
	uptime: number;
	onlinePlayers: number;
	maxPlayers: number;
	tps: number;
	tpsHistory: TpsDataPoint[];
}

let preferredWsPort: string | null = null;

if (browser && page.url.searchParams.get('ws_port')) {
    preferredWsPort = page.url.searchParams.get('ws_port');
}

interface TelemetryState {
	connected: boolean;
	data: TelemetryData;
}

function createTelemetryStore() {
	let socket: WebSocket | null = null;
	
	let state = $state<TelemetryState>({
		connected: false,
		data: {
			status: 'Offline',
			ramUsage: 0,
			totalRam: 0,
			cpuUsage: 0,
			uptime: 0,
			onlinePlayers: 0,
			maxPlayers: 100,
			tps: 20,
			tpsHistory: []
		}
	});

	// Initialize TPS history with demo data when not connected
	function initializeDemoTpsHistory() {
		const now = Date.now();
		const demoData: TpsDataPoint[] = [];
		const tpsValues = [20, 20, 19.8, 20, 20, 19.5, 18.2, 19.0, 20, 20, 20, 19.9, 20, 20, 20];
		
		for (let i = 0; i < tpsValues.length; i++) {
			demoData.push({
				time: new Date(now - (tpsValues.length - 1 - i) * 60000), // 1 minute intervals going back
				tps: tpsValues[i]
			});
		}
		
		state.data.tpsHistory = demoData;
	}

	// Initialize demo data on creation
	initializeDemoTpsHistory();

	function connect() {
		if (typeof window === 'undefined') return;
		
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		const addressIp = window.location.hostname;
		const addressPort = preferredWsPort || new URLSearchParams(window.location.search).get('ws_port') || window.location.port;
		const address = addressPort ? `${addressIp}:${addressPort}` : addressIp;
		
		socket = new WebSocket(`${protocol}//${address}/ws`);

		socket.onopen = () => {
			console.log('Connected to FerrumC Telemetry');
			state.connected = true;
			state.data.status = 'Running';
		};

		socket.onmessage = (event) => {
			try {
				const payload = JSON.parse(event.data);
				if (payload.type === 'Metric') {
					updateMetrics(payload.data);
				}
			} catch (e) {
				console.error('Error parsing WebSocket message:', e);
			}
		};

		socket.onclose = () => {
			console.log('Disconnected. Retrying in 2s...');
			state.connected = false;
			state.data.status = 'Offline';
			setTimeout(() => connect(), 2000);
		};

		socket.onerror = (err) => {
			console.error('WebSocket error:', err);
			socket?.close();
		};
	}

	function updateMetrics(data: {
		ram_usage?: number;
		total_ram?: number;
		cpu_usage?: number;
		uptime?: number;
		online_players?: number;
		max_players?: number;
		tps?: number;
	}) {
		if (data.ram_usage !== undefined) {
			state.data.ramUsage = data.ram_usage;
		}
		if (data.total_ram !== undefined) {
			state.data.totalRam = data.total_ram;
		}
		if (data.cpu_usage !== undefined) {
			state.data.cpuUsage = data.cpu_usage;
		}
		if (data.uptime !== undefined) {
			state.data.uptime = data.uptime;
		}
		if (data.online_players !== undefined) {
			state.data.onlinePlayers = data.online_players;
		}
		if (data.max_players !== undefined) {
			state.data.maxPlayers = data.max_players;
		}
		if (data.tps !== undefined) {
			state.data.tps = data.tps;
			// Add to history, keep last 60 data points (1 hour at 1 per minute)
			state.data.tpsHistory = [
				...state.data.tpsHistory.slice(-59),
				{ time: new Date(), tps: data.tps }
			];
		}
	}

	function disconnect() {
		socket?.close();
		socket = null;
	}

	function sendCommand(command: string) {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify({ type: 'Command', data: command }));
		}
	}

	return {
		get connected() { return state.connected; },
		get data() { return state.data; },
		connect,
		disconnect,
		sendCommand
	};
}

export const telemetry = createTelemetryStore();
