<script context="module">
	import { onMount } from 'svelte';

	import NavButton from './-NavButton.svelte';
	import { Jumper } from 'svelte-loading-spinners';
</script>

<script lang="ts">
	export let id: number;
	export let text: string;

	export let image: string = '';
	$: imageHasLoaded = !!image;

	export let imageSide: 'left' | 'right' = 'left';
	export let goUpButton: boolean = false;

	onMount(() => {
		if (image) {
			imageHasLoaded = true;
			return;
		}

		fetch('/api/image', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},

			body: JSON.stringify(text)
		})
			.then((response: any) => response.json())
			.then((responseImage: string) => {
				image = responseImage;
				imageHasLoaded = true;
			});
	});

	let innerHeight: number = 0;
	let orderStyle = imageSide === 'left' ? 'md:flex-row' : 'md:flex-row-reverse';
</script>

<svelte:window bind:innerHeight />

<section
	id={`screen_${id}`}
	class="snap-start relative bg-black p-3 py-3 flex justify-center items-center"
	style="height: {innerHeight}px;"
>
	<div
		class={`rounded-xl bg-background-300 w-full h-full p-2 max-w-[1300px]
           flex flex-col ${orderStyle} justify-evenly items-center py-3 md:py-16 overflow-y-hidden`}
	>
		<div class="p-5 w-full md:w-1/2 grow md:h-full flex items-center">
			<div class="p-3 bg-white shadow-xl min-w-[300px] h-full md:max-h-[500px] rounded-xl">
				{#if !imageHasLoaded}
					<div class="h-full w-full flex flex-col gap-4 justify-center items-center">
						<Jumper size="100" color="#7fc8fa" unit="px" duration="5s" />
						<p class="text-slate-600">Imagining new image...</p>
					</div>
				{:else}
					<img alt="Depiction of scene" src={image} class="h-full object-cover" />
				{/if}
			</div>
		</div>

		<div
			class="p-5 pt-3 text-sm sm:text-lg md:text-2xl w-full md:w-1/2 md:h-full flex md:items-center"
		>
			<p>{text}</p>
		</div>
	</div>

	{#if goUpButton}
		<NavButton targetID={'screen_main'} orientation="up" />
	{:else}
		<NavButton targetID={`screen_${id + 1}`} />
	{/if}
</section>
