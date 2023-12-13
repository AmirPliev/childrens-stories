
<script>
    import background_img from "$lib/images/background_ext.png";
    import Paragraph from "$lib/-paragraph.svelte";
    const story = [
        `Once upon a time, in a quaint village nestled between rolling hills, there lived a young girl named Lily. With a heart full of curiosity, she often wandered into the nearby woods, where ancient trees whispered tales of old. One evening, as the sun dipped below the horizon, painting the sky in hues of orange and pink, Lily discovered a hidden path covered in golden leaves. Intrigued, she followed it until she stumbled upon a mystical pond, its surface reflecting the colors of the setting sun.`,
        `As Lily gazed into the pond, a shimmering figure emerged from the water – a water sprite named Seraphina. Seraphina spoke in a melodic voice, sharing stories of forgotten realms beneath the pond's surface. She told Lily about the secret world of underwater cities, glowing coral castles, and playful merfolk. Seraphina gifted Lily a small seashell, explaining that it held the magic to transport her to the underwater realm whenever she wished. With a grateful heart, Lily returned home, eager for the next adventure that awaited her beneath the surface of the mystical pond.`,
        `That night, as the village slept under the moon's gentle glow, Lily held the seashell in her hands and whispered a wish. Suddenly, she found herself surrounded by the breathtaking beauty of the underwater realm. Gliding alongside friendly merfolk and colorful fish, Lily marveled at the wonders beneath the surface. As the first light of dawn approached, she returned home, cherishing the magical secret she shared with the water sprite. And so, every now and then, Lily would visit the enchanted pond, where the worlds above and below intertwined in a dance of dreams and wonders.`,
    ]

    function getStory() {
        return story.map(post => post).flat()
    }
</script>


<div class="">
    <div class="h-screen flex justify-center w-full ">
        <div class="absolute text-gray-100 px-6 top-[25vh] rounded-full 
                    animate-glowing
                    p-3 bg-[#60BEFE] hover:bg-[#7fc8fa] hover:cursor-pointer">
            Create your bedtime story
        </div>
        <img src={background_img} alt="background"  class="object-cover w-full h-full"/>
    </div>

    {#each getStory() as paragraph, index}
        <Paragraph {paragraph} direction={index % 2 == 0 ? "right" : "left"} title={index == 0}/>
    {/each}

   
</div>
