<script context="module">
	import Loader from '$lib/Loader/-Loader.svelte';
	import Button from './-Button.svelte';
	import { fade } from 'svelte/transition';
</script>

<script lang="ts">
	export let getStory: () => Promise<void>;
	export let error: boolean = false;
	let innerHeight = 0;
	let loading: boolean = false;

	async function onButtonPress() {
		loading = true;
		await getStory();
		loading = false;
	}
</script>

<svelte:window bind:innerHeight />
<section
	id="screen_main"
	class="snap-center relative flex justify-center items-center"
	style="height: {innerHeight}px;"
>
	<!-- Keep preloaded in the background. -->
	<video class="-z-20 absolute top-0 left-0 -z-10 w-full h-full object-cover" loop autoplay muted>
		<source src="bg-video.mp4" type="video/mp4" />
	</video>

	{#if !loading}
		<img
			src="/bg-picture.png"
			alt="alt"
			class="absolute top-0 left-0 -z-10 w-full h-full object-cover"
			transition:fade
		/>
	{/if}

	{#if loading}
		<Loader />
	{:else}
		<div class="flex flex-col gap-4">
			{#if error}
				<p class="bg-red-400 px-4 red-shadow">
					An error happened unfortunately. Come back again later.
				</p>
			{:else}
				<Button onPress={onButtonPress} />
			{/if}
		</div>
	{/if}
</section>
