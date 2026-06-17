<script>
   // Profile page data loaded from the server
    let { data } = $props();
</script>

<div class="min-h-screen bg-[#111827] text-white px-6 py-10">
    <div class="max-w-6xl mx-auto">
      <!-- Back to homepage -->
        <a href="/" class="text-pink-300 hover:underline">
            Back to homepage
        </a>
 <!-- User profile information -->
        <section class="mt-6 mb-8 bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl">
            <div class="flex items-center gap-4">
   <!-- User avatar -->          
                <div class="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-2xl font-black">
                    {data.user.username[0].toUpperCase()}
                </div>

                <div class="flex justify-between items-center w-full">
                    <div>
                      <!-- Username -->
                        <h1 class="text-3xl font-black">
                            @{data.user.username}
                        </h1>

                        <p class="text-slate-400">
                            Your uploaded images
                        </p>
                    </div>
                    <!-- Upload button -->
                    <a
                        href="/upload"
                        class="bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-2 rounded-2xl font-bold hover:opacity-90 transition"
                    >
                        Upload Photo
                    </a>
                </div>
            </div>
        </section>
   <!-- Show message if no images exist -->
        {#if data.images.length === 0}
            <div class="bg-white/10 border border-white/10 rounded-3xl p-10 text-center">
                <p class="text-slate-400">
                    You have not uploaded any images yet.
                </p>

                <a
                    href="/upload"
                    class="inline-block mt-5 bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 rounded-2xl font-bold hover:opacity-90 transition"
                >
                    Upload your first image
                </a>
            </div>
        {:else}
             <!-- User image gallery -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {#each data.images as image}
                <!-- Image card -->
                    <div class="bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1 hover:bg-white/15 transition duration-300">
                      <!-- Open image details -->
                        <a href={`/images/${image.id}?from=profile`}>
                            <img
                                src={image.image}
                                alt={image.description}
                                class="w-full h-72 object-cover hover:scale-105 transition duration-300"
                            >
                        </a>

                        <div class="p-5">
                           <!-- Image description -->
                            <p class="text-slate-300 line-clamp-2">
                                {image.description}
                            </p>
                          <!-- Image statistics -->
                            <p class="text-slate-400 text-sm mt-3">
                                Likes {image.votes} · Dislikes {image.dislikes}
                            </p>
<!-- Delete image action -->
        <div class="flex justify-between items-center mt-4">
          <form method="POST" action="?/deleteImage">
        <input
            type="hidden"
            name="imageId"
            value={image.id}
        >

        <button
            type="submit"
            class="text-red-400 hover:text-red-300"
        >
            Delete
        </button>
    </form>

</div>
 </div>
 </div>
                       
    {/each}
            </div>
        {/if}

    </div>
</div>