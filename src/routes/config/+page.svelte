<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	let serverName = $state('FerrumC Server');
	let motd = $state('A FerrumC Powered Server');
	let maxPlayers = $state(100);
	let viewDistance = $state(10);

	function saveChanges() {
		console.log('Saving config:', { serverName, motd, maxPlayers, viewDistance });
		// TODO: Call backend API to save configuration
	}
</script>

<svelte:head>
	<title>Configuration | FerrumC Dashboard</title>
</svelte:head>

<div class="max-w-7xl mx-auto">
	<div class="glass rounded-2xl border border-border p-6">
		<div class="space-y-6">
			<!-- Form Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<!-- Server Name -->
				<div class="space-y-2">
					<label for="server-name" class="text-sm text-muted-foreground">Server Name</label>
					<Input
						id="server-name"
						type="text"
						bind:value={serverName}
						class="bg-black/20"
					/>
				</div>
				
				<!-- MOTD -->
				<div class="space-y-2">
					<label for="motd" class="text-sm text-muted-foreground">MOTD</label>
					<Input
						id="motd"
						type="text"
						bind:value={motd}
						class="bg-black/20"
					/>
				</div>
				
				<!-- Max Players -->
				<div class="space-y-2">
					<label for="max-players" class="text-sm text-muted-foreground">Max Players</label>
					<Input
						id="max-players"
						type="number"
						bind:value={maxPlayers}
						class="bg-black/20"
					/>
				</div>
				
				<!-- View Distance -->
				<div class="space-y-2">
					<label for="view-distance" class="text-sm text-muted-foreground">View Distance</label>
					<Input
						id="view-distance"
						type="number"
						bind:value={viewDistance}
						class="bg-black/20"
					/>
				</div>
			</div>
			
			<!-- Save Button -->
			<div class="pt-4 border-t border-border flex justify-end">
				<Button onclick={saveChanges} class="shadow-lg shadow-primary/20">
					Save Changes
				</Button>
			</div>
		</div>
	</div>
</div>
