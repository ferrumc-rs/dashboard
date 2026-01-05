<script lang="ts">
	import './layout.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import Header from '$lib/components/header.svelte';
	import PowerModal from '$lib/components/power-modal.svelte';
	import { telemetry } from '$lib/stores/telemetry.svelte.js';
	import { onMount } from 'svelte';
    import { page } from '$app/state';

	let { children } = $props();
	let powerModalOpen = $state(false);

	onMount(() => {
		telemetry.connect();
		return () => telemetry.disconnect();
	});

	let open = $state(true);
</script>

<Sidebar.Provider bind:open>
	<AppSidebar bind:open onPowerClick={() => powerModalOpen = true} />
	
	<Sidebar.Inset class="flex flex-col h-screen overflow-hidden">
		<!-- Ambient Background -->
		<div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
			<div class="absolute top-[-20%] left-[20%] w-150 h-150 bg-primary/5 rounded-full blur-[120px]"></div>
		</div>

		<Header />

		<!-- Scrollable Content -->
		<main class="flex-1 overflow-y-auto p-8 z-10 relative">
			{@render children()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>

<PowerModal bind:open={powerModalOpen} />
