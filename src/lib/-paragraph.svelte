<script lang="ts">
    import owl_img from "$lib/images/owl.png";
    export let paragraph: string;
    export let direction: string = "left";
    export let title: boolean = false;

    const images: {
        [key: string]: string;
    } = {
        left: "flex-row-reverse",
        right: "flex-row",
    }

    const gradient: {
        [key: string]: string;
    } = {
        left: "bg-gradient-to-br",
        right: "bg-gradient-to-tr",
    }
</script>

<div class="{gradient[direction]} h-screen from-background-100 to-background-300
            px-3 lg:px-16 py-16 flex justify-center overflow-hidden">
    <div class="flex flex-col justify-between w-[90%] max-w-[1000px]">

        {#if title}
            <h1 class="text-3xl text-center">Your bedtime story</h1>
        {/if}
        <div class="h-[85%] flex gap-[5%] {images[direction]}">
            <p class="w-[45%] flex flex-col justify-center">
            {paragraph}
            </p>
            <div class="w-[45%] bg-gray-400 p-4 rounded-md
                        shadow-[0px_0px_10px_5px_#d6bcfa] border-gray-500
                        border-2">
                <img src={owl_img} alt="background"  class="object-contain h-full"/>
            </div>
        </div>
    </div>
</div>


