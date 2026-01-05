<script lang="ts">
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import XCircle from '@lucide/svelte/icons/x-circle';
	import X from '@lucide/svelte/icons/x';
	import AlertTriangle from '@lucide/svelte/icons/alert-triangle';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte.js';

	let { open = $bindable(false) }: { open?: boolean } = $props();
	
	const isMobile = new IsMobile();
	
	type ActionType = 'restart' | 'stop' | null;
	let confirmAction = $state<ActionType>(null);
	let showConfirm = $state(false);

	function handleAction(action: ActionType) {
		confirmAction = action;
		showConfirm = true;
	}

	function executeAction() {
		if (confirmAction) {
			console.log('Executing:', confirmAction);
			// TODO: Call backend API
		}
		showConfirm = false;
		confirmAction = null;
		open = false;
	}

	function cancelConfirm() {
		showConfirm = false;
		confirmAction = null;
	}

	const confirmTitle = $derived(confirmAction === 'stop' ? 'Stop Server?' : 'Restart Server?');
	const confirmMessage = $derived(
		confirmAction === 'stop' 
			? 'This will disconnect all players and shut down the server.'
			: 'The server will reload configuration and plugins.'
	);
</script>

{#if isMobile.current}
	<!-- Mobile: Drawer -->
	<Drawer.Root bind:open>
		<Drawer.Content>
			<div class="mx-auto w-full max-w-sm">
				<Drawer.Header>
					<Drawer.Title>Power Options</Drawer.Title>
					<Drawer.Description>Manage server power state</Drawer.Description>
				</Drawer.Header>
				
				{#if !showConfirm}
					<div class="p-4 space-y-3">
						<button
							onclick={() => handleAction('restart')}
							class="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-secondary hover:bg-secondary/80 transition group text-left"
						>
							<div class="w-10 h-10 rounded-lg bg-warning/10 text-warning flex items-center justify-center group-hover:scale-110 transition-transform">
								<RefreshCw class="w-6 h-6" />
							</div>
							<div>
								<h4 class="text-foreground font-medium">Restart Server</h4>
								<p class="text-xs text-muted-foreground">Reloads configuration and plugins</p>
							</div>
						</button>

						<button
							onclick={() => handleAction('stop')}
							class="w-full flex items-center gap-4 p-4 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition group text-left"
						>
							<div class="w-10 h-10 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center group-hover:scale-110 transition-transform">
								<XCircle class="w-6 h-6" />
							</div>
							<div>
								<h4 class="text-destructive font-medium">Stop Server</h4>
								<p class="text-xs text-destructive/60">Disconnects players and shuts down</p>
							</div>
						</button>
					</div>
				{:else}
					<div class="p-6 text-center">
						<div class="w-12 h-12 rounded-full bg-warning/10 text-warning flex items-center justify-center mx-auto mb-4">
							<AlertTriangle class="w-6 h-6" />
						</div>
						<h3 class="text-lg font-bold text-foreground mb-2">{confirmTitle}</h3>
						<p class="text-sm text-muted-foreground mb-6">{confirmMessage}</p>
					</div>
				{/if}

				<Drawer.Footer>
					{#if showConfirm}
						<Button variant="outline" onclick={cancelConfirm}>Cancel</Button>
						<Button 
							variant={confirmAction === 'stop' ? 'destructive' : 'default'}
							onclick={executeAction}
						>
							Confirm
						</Button>
					{:else}
						<Drawer.Close asChild>
							<Button variant="outline">Cancel</Button>
						</Drawer.Close>
					{/if}
				</Drawer.Footer>
			</div>
		</Drawer.Content>
	</Drawer.Root>
{:else}
	<!-- Desktop: Dialog -->
	<Dialog.Root bind:open>
		<Dialog.Content class="sm:max-w-md">
			{#if !showConfirm}
				<Dialog.Header>
					<Dialog.Title>Power Options</Dialog.Title>
					<Dialog.Description>Manage server power state</Dialog.Description>
				</Dialog.Header>
				
				<div class="space-y-3 py-4">
					<button
						onclick={() => handleAction('restart')}
						class="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-secondary hover:bg-secondary/80 transition group text-left"
					>
						<div class="w-10 h-10 rounded-lg bg-warning/10 text-warning flex items-center justify-center group-hover:scale-110 transition-transform">
							<RefreshCw class="w-6 h-6" />
						</div>
						<div>
							<h4 class="text-foreground font-medium">Restart Server</h4>
							<p class="text-xs text-muted-foreground">Reloads configuration and plugins</p>
						</div>
					</button>

					<button
						onclick={() => handleAction('stop')}
						class="w-full flex items-center gap-4 p-4 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition group text-left"
					>
						<div class="w-10 h-10 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center group-hover:scale-110 transition-transform">
							<XCircle class="w-6 h-6" />
						</div>
						<div>
							<h4 class="text-destructive font-medium">Stop Server</h4>
							<p class="text-xs text-destructive/60">Disconnects players and shuts down</p>
						</div>
					</button>
				</div>
			{:else}
				<div class="py-6 text-center">
					<div class="w-12 h-12 rounded-full bg-warning/10 text-warning flex items-center justify-center mx-auto mb-4">
						<AlertTriangle class="w-6 h-6" />
					</div>
					<h3 class="text-lg font-bold text-foreground mb-2">{confirmTitle}</h3>
					<p class="text-sm text-muted-foreground mb-6">{confirmMessage}</p>
					
					<div class="flex gap-3">
						<Button variant="outline" class="flex-1" onclick={cancelConfirm}>Cancel</Button>
						<Button 
							variant={confirmAction === 'stop' ? 'destructive' : 'default'}
							class="flex-1"
							onclick={executeAction}
						>
							Confirm
						</Button>
					</div>
				</div>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
{/if}
