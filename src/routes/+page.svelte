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
		}, 500);
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
				image={'https://images.unsplash.com/photo-1712759133177-0b60a8abd756?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
				imageSide={index % 2 === 0 ? 'left' : 'right'}
				goUpButton={index === storyParagraphs.length - 1}
			/>
		{/each}
	{/if}
</main>
