<script lang="ts">
	import { telemetry } from '$lib/stores/telemetry.svelte.js';

	interface LogEntry {
		time: string;
		level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
		message: string;
	}

	// Sample log entries - in production these would come from WebSocket
	let logs = $state<LogEntry[]>([
		{ time: '14:20:01', level: 'INFO', message: 'Loading libraries, please wait...' },
		{ time: '14:20:02', level: 'INFO', message: 'Loaded 127 recipes' },
		{ time: '14:20:04', level: 'WARN', message: "Feature 'LegacyCombat' is deprecated" },
		{ time: '14:20:05', level: 'INFO', message: 'Server started on *:25565' },
		{ time: '14:20:05', level: 'DEBUG', message: 'RCON running on 0.0.0.0:25575' },
		{ time: '14:23:01', level: 'INFO', message: "Player 'Sweattypalms' joined the game" },
		{ time: '14:23:05', level: 'INFO', message: "Saving chunks for level 'ServerLevel'..." },
		{ time: '14:24:12', level: 'WARN', message: "Can't keep up! Is the server overloaded? Running 2005ms or 40 ticks behind" }
	]);

	let command = $state('');

	function getLevelColor(level: LogEntry['level']): string {
		switch (level) {
			case 'INFO': return 'text-success';
			case 'WARN': return 'text-warning';
			case 'ERROR': return 'text-destructive';
			case 'DEBUG': return 'text-purple-500';
			default: return 'text-muted-foreground';
		}
	}

	function handleCommand(e: KeyboardEvent) {
		if (e.key === 'Enter' && command.trim()) {
			telemetry.sendCommand(command);
			logs = [...logs, { 
				time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
				level: 'INFO', 
				message: `> ${command}` 
			}];
			command = '';
		}
	}
</script>

<svelte:head>
	<title>Console | FerrumC Dashboard</title>
</svelte:head>

<div class="max-w-7xl mx-auto h-[calc(100vh-10rem)] flex flex-col">
	<div class="glass rounded-2xl border border-border flex-1 flex flex-col overflow-hidden">
		<!-- Log Display -->
		<div class="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-1 text-muted-foreground bg-black/40">
			{#each logs as log (log.time + log.message)}
				<p>
					<span class="text-blue-500">[{log.time}]</span>
					<span class={getLevelColor(log.level)}>[{log.level}]</span>
					{log.message}
				</p>
			{/each}
		</div>
		
		<!-- Command Input -->
		<div class="p-4 border-t border-border bg-secondary/20">
			<div class="flex gap-2 items-center">
				<span class="text-primary font-mono">&gt;</span>
				<input
					type="text"
					bind:value={command}
					onkeydown={handleCommand}
					placeholder="Type a command..."
					class="bg-transparent border-none outline-none text-foreground font-mono w-full placeholder-muted-foreground"
				/>
			</div>
		</div>
	</div>
</div>
