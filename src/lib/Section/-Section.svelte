<script context="module">
	import NavButton from './-NavButton.svelte';
	import getNextTarget from './nextTarget.ts';
</script>

<script lang="ts">
	export let id: string;
	export let text: string;
	export let image: string;
	export let imageSide: 'left' | 'right' = 'left';
	export let goUpButton: boolean = false;

	let innerHeight: number = 0;
	let orderStyle = imageSide === 'left' ? 'md:flex-row' : 'md:flex-row-reverse';
</script>

<svelte:window bind:innerHeight />

<section
	{id}
	class="snap-center relative bg-black p-3 py-3 flex justify-center items-center"
	style="height: {innerHeight}px;"
>
	<div
		class={`rounded-xl bg-background-300 w-full h-full p-2 max-w-[1300px]
           flex flex-col ${orderStyle} justify-evenly items-center py-3 md:py-16 overflow-y-hidden`}
	>
		<div class="p-5 w-full md:w-1/2 grow md:h-full flex items-center">
			<div class="p-3 bg-white shadow-xl h-full md:max-h-[500px] rounded-xl">
				<img alt="Depiction of scene" src={image} class="h-full object-cover" />
			</div>
		</div>

		<div class="p-5 pt-3 text-sm md:text-xl w-full md:w-1/2 md:h-full flex md:items-center">
			<p>{text}</p>
		</div>
	</div>

	{#if goUpButton}
		<NavButton targetID={'screen_main'} orientation="up" />
	{:else}
		<NavButton targetID={getNextTarget(id)} />
	{/if}
</section>
