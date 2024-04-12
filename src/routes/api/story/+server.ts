import { json } from '@sveltejs/kit';
// import { env } from '$env/dynamic/private';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

export async function GET() {
	const openai = new OpenAI({
		apiKey: OPENAI_API_KEY
	});

	console.log(OPENAI_API_KEY);

	const story = await openai.chat.completions
		.create({
			messages: [
				{
					role: 'user',
					content: `Write me a short bed time story between 3 and 5 paragraphs long.
							Each paragraph should be between 100 and 150 words long.`
				}
			],
			model: 'gpt-3.5-turbo',
			max_tokens: 3000
		})
		.then((response) => {
			let storyString = response.choices[0].message.content?.split('\n');
			const story = storyString?.filter((line) => line !== '') as string[];
			return story;
		})
		.catch((error) => {
			console.error(error);
			return [];
		});

	return json(story);
}
