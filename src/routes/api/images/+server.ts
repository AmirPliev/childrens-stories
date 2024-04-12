import { json } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';

export async function POST({ request }: { request: RequestEvent }) {
	const stories = await request.json();

	const openai = new OpenAI({
		apiKey: OPENAI_API_KEY
	});

	let images: string[] = [];

	for (const paragraph of stories) {
		await openai.images
			.generate({
				model: 'dall-e-3',
				prompt: `Create a fitting image in a fairy tale cartoonish style that evokes a child like wonder and has a calm, beautiful and fantastical athmosphere. It should show the scenery that is being described in the following
						 part of a cute bedtime story: ${paragraph}`,
				n: 1,
				size: '1024x1024'
			})
			.then((response) => {
				images.push(response.data[0].url as string);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return json(images);
}
