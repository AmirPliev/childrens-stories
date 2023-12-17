<script lang="ts">
	import background_img from '$lib/images/bg-large-hd.png';
	import Paragraph from '$lib/-paragraph.svelte';
	import { fade } from 'svelte/transition';
	import Loader from '$lib/-loader.svelte';

	let data: string[] = [];
	let images: string[] = [];

	const getStory = async () => {
		loading = true;

		data = [];
		images = [];
		const json = await fetch('/story').then(async (res) => await res.json());

		data = json.story as string[];
		images = json.images as string[];

		console.log(json);

		loading = false;
		success = data.length ? true : false;

		setTimeout(() => {
			if (success) {
				document.getElementById('screen_0')?.scrollIntoView({ behavior: 'smooth' });
			}
		}, 3 * 1000);

		setTimeout(() => {
			success = false;
		}, 30 * 1000);
	};

	let storyTitle = 'Your bedtime story';
	let loading = false;
	let success = false;
</script>

<div
	class="snap-y snap-mandatory h-screen w-screen overflow-scroll
			no-scrollbar"
>
	<div class="h-[90vh] md:h-screen snap-center w-full relative">
		<div class="h-full flex justify-center w-full">
			<div
				class="absolute top-[25vh] h-32 flex justify-center
						items-center"
			>
				{#if loading && !success}
					<Loader />
				{:else if success && !loading}
					<div transition:fade={{ delay: 250, duration: 600 }} class="text-2xl">
						Your bedtime story is ready!
					</div>
				{:else}
					<button
						on:click={getStory}
						class="text-gray-100 px-6 rounded-full animate-glowing
                               p-3 bg-[#60BEFE] hover:bg-[#7fc8fa]
							   hover:cursor-pointer focus:bg-[#4ab1f7]"
					>
						Create your bedtime story
					</button>
				{/if}
			</div>
			<img src={background_img} alt="background" class="object-cover w-full h-full" />
		</div>
	</div>

	{#if data.length > 0}
		{#each data as paragraph, index}
			<Paragraph
				id="screen_{index}"
				{paragraph}
				direction={index % 2 == 0 ? 'left' : 'right'}
				title={index === 0 ? storyTitle : ''}
				image={images[index]}
			/>
		{/each}
	{/if}
</div>
