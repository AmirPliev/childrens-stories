<script lang="ts">
	import owl_img from '$lib/images/owl.png';
	export let image = owl_img;
	export let paragraph: string;
	export let direction: string = 'left';
	export let title: string = '';
	export let id = '';

	const images: {
		[key: string]: string;
	} = {
		left: 'md:flex-row-reverse flex-col-reverse',
		right: 'md:flex-row flex-col-reverse'
	};

	const gradient: {
		[key: string]: string;
	} = {
		left: 'bg-gradient-to-br',
		right: 'bg-gradient-to-tr'
	};
</script>

<div
	{id}
	class="{gradient[direction]} snap-center h-[100vh] from-background-100
		   to-background-300 px-3 lg:px-16 py-8 md:py-16 flex justify-center
		   overflow-hidden"
>
	<div class="flex flex-col justify-between w-[90%] max-w-[1000px]">
		{#if title !== ''}
			<h1 class="text-3xl text-center">Your bedtime story</h1>
		{/if}
		<div class="h-full md:h-[85%] py-8 flex gap-[5%] {images[direction]}">
			<p
				class="w-full h-[55%] md:h-auto md:w-[45%] flex md:flex-col
					  flex-row justify-center text-sm md:text-lg"
			>
				{paragraph}
			</p>
			<div class="h-2/5 flex justify-center md:h-auto md:w-[45%]">
				<div
					class=" 
				bg-gray-400 p-4 rounded-md shadow-[0px_0px_10px_5px_#d6bcfa]
				border-gray-500 border-2"
				>
					<img src={image ? image : owl_img} alt="background" class="object-contain h-full" />
				</div>
			</div>
		</div>
	</div>
</div>
