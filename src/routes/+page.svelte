<script context="module">
	import HeroSection from '$lib/-HeroSection.svelte';
	import Section from '$lib/Section/-Section.svelte';
	import { Jumper } from 'svelte-loading-spinners';
</script>

<script lang="ts">
	let innerHeight = 0;
	let allLoaded: boolean = false;
	let errorHappened: boolean = false;
	let initialLoad: boolean = true;
	$: storyParagraphs = [] as string[];
	$: firstImage = '';

	setTimeout(() => {
		initialLoad = false;
	}, 2_000);

	async function getStory() {
		errorHappened = false;
		allLoaded = false;

		await fetch('/api/story')
			.then((response: any) => response.json())
			.then((stories: string[]) => {
				storyParagraphs = stories;
			})
			.catch(() => (errorHappened = true));

		await fetch('/api/image/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(storyParagraphs[0])
		})
			.then((response: any) => response.json())
			.then((responseImage: string) => {
				firstImage = responseImage;
				allLoaded = true;
			})
			.catch(() => (errorHappened = true));

		setTimeout(() => {
			document.getElementById('screen_0')?.scrollIntoView({ behavior: 'smooth' });
		}, 1_000);
	}
</script>

<svelte:window bind:innerHeight />

{#if initialLoad}
	<div class="w-screen h-screen flex justify-center items-center">
		<Jumper size="100" color="#7fc8fa" unit="px" duration="1s" />
	</div>
{:else}
	<main
		class="font-written tracking-widest text-[#f7ebfe] snap-y snap-mandatory
         w-screen overflow-scroll no-scrollbar"
		style="height: {innerHeight}px;"
	>
		<HeroSection {getStory} error={errorHappened} />

		{#if allLoaded}
			{#each storyParagraphs as paragraph, index}
				<Section
					id={index}
					text={paragraph}
					image={index === 0 ? firstImage : ''}
					imageSide={index % 2 === 0 ? 'left' : 'right'}
					goUpButton={index === storyParagraphs.length - 1}
				/>
			{/each}
		{/if}
	</main>
{/if}
