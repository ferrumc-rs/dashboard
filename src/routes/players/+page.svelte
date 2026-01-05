<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	interface Player {
		name: string;
		uuid: string;
		ping: number;
		avatar: string;
	}

	// Sample players - in production these would come from WebSocket
	let players = $state<Player[]>([
		{ 
			name: 'Sweattypalms', 
			uuid: 'ec0f0d6c-04c3-43bd-bf4a-7879f11ea261', 
			ping: 12,
			avatar: 'https://mc-heads.net/avatar/ec0f0d6c-04c3-43bd-bf4a-7879f11ea261'
		},
		{ 
			name: 'Jeb_', 
			uuid: '853c80ef-3c37-49fd-aa49-938b674adae6', 
			ping: 32,
			avatar: 'https://mc-heads.net/avatar/853c80ef-3c37-49fd-aa49-938b674adae6'
		}
	]);

	let searchQuery = $state('');

	const filteredPlayers = $derived(
		players.filter(p => 
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.uuid.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	function getPingColor(ping: number): string {
		if (ping < 50) return 'text-success';
		if (ping < 100) return 'text-warning';
		return 'text-destructive';
	}

	function kickPlayer(player: Player) {
		console.log('Kicking player:', player.name);
		// TODO: Call backend API
	}

	function banPlayer(player: Player) {
		console.log('Banning player:', player.name);
		// TODO: Call backend API
	}
</script>

<svelte:head>
	<title>Players | FerrumC Dashboard</title>
</svelte:head>

<div class="max-w-7xl mx-auto">
	<div class="glass rounded-2xl border border-border overflow-hidden">
		<!-- Header -->
		<div class="px-6 py-4 border-b border-border bg-secondary/50 flex justify-between items-center">
			<div class="flex gap-2 items-center">
				<span class="text-sm text-muted-foreground">Total Online:</span>
				<span class="text-foreground font-bold">{players.length}</span>
			</div>
			<Input
				type="text"
				placeholder="Search players..."
				bind:value={searchQuery}
				class="w-64 bg-black/20"
			/>
		</div>
		
		<!-- Table -->
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm text-muted-foreground">
				<thead class="bg-secondary/50 text-foreground font-medium">
					<tr>
						<th class="px-6 py-3">Player</th>
						<th class="px-6 py-3">UUID</th>
						<th class="px-6 py-3">Ping</th>
						<th class="px-6 py-3">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-border">
					{#each filteredPlayers as player (player.uuid)}
						<tr class="hover:bg-secondary/30 transition">
							<td class="px-6 py-4">
								<div class="flex items-center gap-3">
									<img
										src={player.avatar}
										alt={player.name}
										class="w-8 h-8 rounded bg-muted"
									/>
									<span class="text-foreground font-medium">{player.name}</span>
								</div>
							</td>
							<td class="px-6 py-4 font-mono text-xs">{player.uuid}</td>
							<td class="px-6 py-4">
								<span class={getPingColor(player.ping)}>{player.ping}ms</span>
							</td>
							<td class="px-6 py-4">
								<div class="flex items-center gap-2">
									<Button 
										variant="ghost" 
										size="sm" 
										class="text-destructive hover:text-destructive hover:bg-destructive/10"
										onclick={() => kickPlayer(player)}
									>
										Kick
									</Button>
									<span class="text-border">|</span>
									<Button 
										variant="ghost" 
										size="sm" 
										class="text-primary hover:text-primary hover:bg-primary/10"
										onclick={() => banPlayer(player)}
									>
										Ban
									</Button>
								</div>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="4" class="px-6 py-8 text-center text-muted-foreground">
								{#if searchQuery}
									No players found matching "{searchQuery}"
								{:else}
									No players online
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
