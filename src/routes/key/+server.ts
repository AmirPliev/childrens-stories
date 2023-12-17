import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET() {
	return json({
		key: env.OPENAI_API_KEY ? env.OPENAI_API_KEY : ''
	});
}
