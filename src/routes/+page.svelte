<script context="module">
	import HeroSection from '$lib/-HeroSection.svelte';
	import Section from '$lib/Section/-Section.svelte';
</script>

<script lang="ts">
	let innerHeight = 0;
	$: storyParagraphs = [] as string[];
	$: storyImages = [] as string[];
	let allLoaded: boolean = false;

	async function getStory() {
		allLoaded = false;
		await fetch('/api/story')
			.then((response: any) => response.json())
			.then((stories: string[]) => {
				storyParagraphs = stories;
			});

		await fetch('/api/images/', {
			method: 'POST',
			body: JSON.stringify(storyParagraphs)
		})
			.then((response: any) => response.json())
			.then((images: string[]) => {
				storyImages = images;
				allLoaded = true;
			});

		setTimeout(() => {
			document.getElementById('screen_0')?.scrollIntoView({ behavior: 'smooth' });
		}, 1_000);
	}
</script>

<svelte:window bind:innerHeight />

<main
	class="font-written tracking-widest text-[#f7ebfe] snap-y snap-mandatory
         w-screen overflow-scroll no-scrollbar"
	style="height: {innerHeight}px;"
>
	<HeroSection {getStory} />
	{#if allLoaded}
		{#each storyParagraphs as paragraph, index}
			<Section
				id={`screen_${index}`}
				text={paragraph}
				image={storyImages[index]}
				imageSide={index % 2 === 0 ? 'left' : 'right'}
				goUpButton={index === storyParagraphs.length - 1}
			/>
		{/each}
	{/if}
</main>
