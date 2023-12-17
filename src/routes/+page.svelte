<script lang="ts">
	import background_img from '$lib/images/bg-large-hd.png';
	import Paragraph from '$lib/-paragraph.svelte';
	import { fade } from 'svelte/transition';
	import Loader from '$lib/-loader.svelte';
	import OpenAI from 'openai';

	let data: string[] = [];
	let images: string[] = [];

	const getStory = async () => {
		loading = true;

		data = [];
		images = [];

		const result = await fetch('/key').then(async (res) => await res.json());

		const openai = new OpenAI({
			apiKey: result.key ? result.key : '',
			dangerouslyAllowBrowser: true
		});

		await openai.chat.completions
			.create({
				messages: [
					{
						role: 'system',
						content: `You are an amazing childrens bedtime story teller.
							You dream up the most amazing stories for children to fall asleep to.
							However, the stories must be short and sweet.
							Each story should contain between 3 and 5 paragraphs and each
							paragraph should be between 50 and 100 words.`
					},
					{
						role: 'user',
						content: `Write me a short bed time story between 3 and 5 paragraphs long.
							Each paragraph should be between 50 and 100 words long.`
					}
				],
				model: 'gpt-3.5-turbo',
				max_tokens: 3000
			})
			.then((response) => {
				let storyString = response.choices[0].message.content?.split('\n');
				data = storyString?.filter((line) => line !== '') as string[];
			})
			.catch((error) => {
				console.log(error);
			});

		let previousPrompts: string[] = [];
		let tempImages: string[] = [];

		for (const paragraph of data) {
			const style =
				previousPrompts.length > 0
					? `Style the image to match the previous image's style which had prompt: ${
							previousPrompts[previousPrompts.length - 1]
						}`
					: "Style the image to match the story's style";

			await openai.images
				.generate({
					model: 'dall-e-3',
					prompt: `Create a fitting image for the following
						 part of a bedtime story: ${paragraph} ${style} Make sure to not create any texts in the images.`,
					n: 1,
					size: '1024x1024'
				})
				.then((response) => {
					tempImages.push(response.data[0].url as string);
					previousPrompts.push(response.data[0].revised_prompt as string);
				})
				.catch((error) => {
					console.log(error);
				});
		}

		images = tempImages;
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
			no-scrollbar bg-background-300"
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
