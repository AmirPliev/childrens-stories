<script>
	import { Jumper } from 'svelte-loading-spinners';
	import TextSlider from './-TextSlider.svelte';
	const statements = [
		'Loading dreams...',
		'Dreaming of sheep...',
		'Counting sheep...',
		"Counting sheep's sheep...",
		'Flying on magic carpets...',
		'Turning on imagination machine...',
		'Dreaming of a better world...',
		'Setting up flux capacitor...'
	];

	let currentStatement = statements[Math.floor(Math.random() * statements.length)];

	setInterval(() => {
		const index = statements.indexOf(currentStatement);
		currentStatement = statements[(index + 1) % statements.length];
	}, 8000);
</script>

<div class="flex flex-col h-[40%] items-center w-full">
	<TextSlider text={currentStatement} />
	<div class="h-16" />
	<Jumper size="200" color="#7fc8fa" unit="px" duration="5s" />
</div>
