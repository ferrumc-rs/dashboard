<script lang="ts">
	import LayoutGrid from "@lucide/svelte/icons/layout-grid";
	import Terminal from "@lucide/svelte/icons/terminal";
	import Users from "@lucide/svelte/icons/users";
	import Settings from "@lucide/svelte/icons/settings";
	import Zap from "@lucide/svelte/icons/zap";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { page } from "$app/state";

	interface NavItem {
		href: string;
		label: string;
		icon: typeof LayoutGrid;
		comingSoon?: boolean;
	}

	const navItems: NavItem[] = [
		{ href: "/", label: "Overview", icon: LayoutGrid },
		{
			href: "/console",
			label: "Console",
			icon: Terminal,
			comingSoon: true,
		},
		{ href: "/players", label: "Players", icon: Users, comingSoon: true },
		{ href: "/config", label: "Config", icon: Settings, comingSoon: true },
	];

	let {
		onPowerClick,
		open = $bindable(),
	}: { onPowerClick?: () => void; open?: boolean } = $props();
</script>

<Sidebar.Root collapsible="icon" class="border-r border-border">
	<!-- Header -->
	<Sidebar.Header class="h-20 border-b border-border">
		<div
			class="flex items-center gap-3 {open
				? 'px-2'
				: ''} transition-all duration-200"
		>
			<img
				src="https://raw.githubusercontent.com/ferrumc-rs/ferrumc/refs/heads/master/assets/data/icon.png"
				alt="FerrumC"
				class="size-8 rounded-lg shadow-lg shadow-primary/20 mt-4"
			/>
			<div class="group-data-[collapsible=icon]:hidden">
				<h1 class="font-bold text-white tracking-tight text-lg">
					FerrumC
				</h1>
				<div class="flex items-center gap-1.5">
					<span class="w-2 h-2 rounded-full bg-success animate-pulse"
					></span>
					<span
						class="text-[10px] uppercase tracking-wider text-muted-foreground font-mono"
						>Online</span
					>
				</div>
			</div>
		</div>
	</Sidebar.Header>

	<!-- Navigation -->
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each navItems as item (item.href)}
						<Sidebar.MenuItem>
							{#if item.comingSoon}
								<Tooltip.Provider>
									<Tooltip.Root>
										<Tooltip.Trigger>
											{#snippet child({ props })}
												<div {...props}>
													<Sidebar.MenuButton
														isActive={false}
														class="h-12 opacity-50 cursor-not-allowed pointer-events-none"
													>
														<item.icon
															class="w-5 h-5"
														/>
														<span
															class="font-medium"
															>{item.label}</span
														>
													</Sidebar.MenuButton>
												</div>
											{/snippet}
										</Tooltip.Trigger>
										<Tooltip.Content sideOffset={-20}>
											<p>Coming Soon</p>
										</Tooltip.Content>
									</Tooltip.Root>
								</Tooltip.Provider>
							{:else}
								<Sidebar.MenuButton
									isActive={page.url.pathname === item.href}
									class="h-12"
								>
									{#snippet child({ props })}
										<a href={item.href} {...props}>
											<item.icon class="w-5 h-5" />
											<span class="font-medium"
												>{item.label}</span
											>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							{/if}
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<!-- Footer -->
	<Sidebar.Footer class="border-t border-border">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					onclick={onPowerClick}
					class="h-12 text-destructive hover:bg-destructive hover:text-white transition-all duration-200"
				>
					<Zap class="w-5 h-5" />
					<span class="font-medium">Power Options</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
