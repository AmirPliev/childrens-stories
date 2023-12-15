<script>
	import background_img from '$lib/images/background_ext.png';
	import Paragraph from '$lib/-paragraph.svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import { fade } from 'svelte/transition';
	import OpenAI from 'openai';

	let storyTitle = 'Your bedtime story';
	let story = [];

	async function createStory() {
		const openai = new OpenAI({
			apiKey: import.meta.env.VITE_OPENAI_API_KEY,
			dangerouslyAllowBrowser: true
		});

		const chatCompletion = await openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: 'Write me a short bed time story. Make it a story between 1 and 2 paragraphs.'
				}
			],
			model: 'gpt-3.5-turbo'
		});

		let storyString = chatCompletion.choices[0].message.content?.split('\n');
		story = storyString?.filter((line) => line !== '');
		story = story.map((post) => post).flat();
	}

	let loading = false;
	let success = false;
	async function onPress() {
		loading = true;

		await createStory();
		loading = false;
		success = true;

		setTimeout(() => {
			if (success) {
				document.getElementById('screen_0')?.scrollIntoView({ behavior: 'smooth' });
			}
		}, 2 * 1000);

		setTimeout(() => {
			success = false;
		}, 30 * 1000);
	}
</script>

<div class="snap-y snap-mandatory h-screen w-screen overflow-scroll no-scrollbar">
	<div class="h-screen snap-center w-full relative">
		<div class="h-full flex justify-center w-full">
			<div class="absolute top-[25vh] h-32 flex justify-center items-center">
				{#if loading && !success}
					<Jumper size="300" color="#7fc8fa" unit="px" duration="5s" />
				{:else if success && !loading}
					<div transition:fade={{ delay: 250, duration: 600 }} class="text-2xl">
						Your bedtime story is ready!
					</div>
				{:else}
					<button
						on:click={onPress}
						class="text-gray-100 px-6 rounded-full animate-glowing
                               p-3 bg-[#60BEFE] hover:bg-[#7fc8fa] hover:cursor-pointer
                               focus:bg-[#4ab1f7]"
					>
						Create your bedtime story
					</button>
				{/if}
			</div>
			<img src={background_img} alt="background" class="object-cover w-full h-full" />
		</div>
	</div>

	{#each story as paragraph, index}
		<Paragraph
			id="screen_{index}"
			{paragraph}
			direction={index % 2 == 0 ? 'left' : 'right'}
			title={index === 0 ? storyTitle : ''}
		/>
	{/each}
</div>
