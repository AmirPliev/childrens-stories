<script lang="ts">
	import { AngleUpOutline } from 'flowbite-svelte-icons';
	export let targetID: string;
	export let orientation: 'up' | 'down' = 'down';
</script>

<button
	class="absolute right-8 top-8 h-12 w-12 p-2 bg-dreamy-blue-100/90 transition duration-200
             hover:bg-dreamy-blue-200 rounded-full shadow-sm shadow-[#858585]"
	on:click={() => document.getElementById(targetID).scrollIntoView({ behavior: 'smooth' })}
>
	<AngleUpOutline size="sm" class={orientation === 'down' ? 'rotate-180' : ''} />
</button>
