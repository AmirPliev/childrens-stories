<script lang="ts">
	import { fly } from 'svelte/transition';
	export let text: string = '';

	let currentText = text;
	let visible = false;
	$: nextText = text;

	setTimeout(() => {
		visible = true;
	}, 100);

	$: {
		if (nextText !== currentText) {
			visible = false;

			setTimeout(() => {
				currentText = nextText;
			}, 2000);

			setTimeout(() => {
				visible = true;
			}, 2000);
		}
	}
</script>

{#if visible}
	<p
		transition:fly={{ y: 0, duration: 2000 }}
		class="absolute whitespace-nowrap md:text-4xl text-white"
	>
		{currentText}
	</p>
{/if}
