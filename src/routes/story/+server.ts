import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { env } from '$env/dynamic/private';

const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY ? env.OPENAI_API_KEY : ''
});

const debugging = false;

export async function GET() {
	let story: string[] = [];
	let images: string[] = [];

	if (!debugging) {
		await openai.chat.completions
			.create({
				messages: [
					{
						role: 'user',
						content: `Write me a short bed time story. Make it a story between 1 and 2 paragraphs.
				Make each paragraph a strict maximum between 100 and 200 words.`
					}
				],
				model: 'gpt-3.5-turbo'
			})
			.then((response) => {
				let storyString = response.choices[0].message.content?.split('\n');
				story = storyString?.filter((line) => line !== '') as string[];
			})
			.catch((error) => {
				console.log(error);
			});

		let previousPrompts: string[] = [];

		for (const paragraph of story) {
			const style =
				previousPrompts.length > 0
					? `Style the image to match the previous image's style which had prompt: ${
							previousPrompts[previousPrompts.length - 1]
						}`
					: "Style the image to match the story's style";

			await openai.images
				.generate({
					model: 'dall-e-3',
					prompt: `Do not include any texts. Create a fitting image for the following
						 part of a bedtime story: ${paragraph} ${style}`,
					n: 1,
					size: '1024x1024'
				})
				.then((response) => {
					images.push(response.data[0].url as string);
					previousPrompts.push(response.data[0].revised_prompt as string);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	return json({
		story: story,
		images: images
	});
}
