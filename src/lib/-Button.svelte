<script lang="ts">
	export let onPress: () => Promise<void>;
</script>

<button
	on:click={onPress}
	class="text-2xl rounded-full text-white px-4 py-2 bg-dreamy-blue-100 hover:bg-dreamy-blue-200"
>
	Write story
</button>
