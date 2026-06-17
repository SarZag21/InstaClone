<script>
    let { data, form } = $props();
    let selectedFilter = $state('');

    const filters = {
        original: '',
        blackWhite: 'grayscale',
        vintage: 'sepia brightness-110 contrast-125',
        dramatic: 'contrast-150 brightness-90',
        soft: 'saturate-150 brightness-110'
    };
</script>

<div class="min-h-screen bg-[#111827] text-white px-6 py-10">
 <div class="max-w-4xl mx-auto">
<a
    href={data.from === 'profile' ? '/profile' : '/'}
    class="text-pink-300 hover:underline"
>
    {data.from === 'profile' ? 'Back to profile' : 'Back to homepage'}
</a>

        <div class="bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl mt-6">
        <div class="p-4 border-b border-white/10">

    <h3 class="font-bold text-white mb-3">
        Filters
    </h3>

    <div class="flex flex-wrap gap-2">

        <button
            type="button"
            onclick={() => selectedFilter = filters.original}
            class="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
            Original
        </button>

        <button
            type="button"
            onclick={() => selectedFilter = filters.blackWhite}
            class="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
            Black & White
        </button>

        <button
            type="button"
            onclick={() => selectedFilter = filters.vintage}
            class="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
            Vintage
        </button>

        <button
            type="button"
            onclick={() => selectedFilter = filters.dramatic}
            class="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
            Dramatic
        </button>

        <button
            type="button"
            onclick={() => selectedFilter = filters.soft}
            class="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
            Soft
        </button>

    </div>

</div>
            <img
                src={data.image.image}
                alt={data.image.description}
                class={`w-full max-h-[600px] object-cover transition duration-300 ${selectedFilter}`}
            >

            <div class="p-6">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center font-bold">
                  {data.image.username[0].toUpperCase()}
                 </div>

                 <p class="font-bold text-lg text-white">
                    @{data.image.username}
                 </p>
            </div>

                <p class="text-slate-300 mt-4">
                    {data.image.description}
                </p>

                <p class="text-slate-400 text-sm mt-3">
                   {data.image.votes} Likes  
                   {data.image.dislikes} Dislikes
                </p>

<hr class="border-white/10 my-6">

       
        <div class="flex justify-between items-center mb-5">
            <div>
                <h2 class="text-2xl font-black text-white">
                    Comments
                </h2>

                <p class="text-slate-400 text-sm">
                    Join the conversation
                </p>
            </div>

            <span class="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm">
                {data.comments.length}
            </span>
        </div>

        <form method="POST" action="?/comment" class="mb-6">
            <textarea
                name="text"
                rows="3"
                placeholder="Drop your thoughts..."
                class="w-full bg-slate-800 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-pink-400"
            ></textarea>

            <button
                type="submit"
                class="mt-3 bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-2 rounded-2xl font-bold hover:opacity-90 transition"
            >
                Post Comment
            </button>
        </form>

        {#if data.comments.length === 0}
            <p class="text-slate-400 text-center">
                No comments yet. Be the first one.
            </p>
        {:else}
            <div class="space-y-4">
                {#each data.comments as comment}
                   <div class="bg-slate-800/50 border border-white/5 rounded-2xl p-4 hover:bg-slate-800 transition">
                       <p class="font-bold text-white">
                           @{comment.username}
                        </p>

                        <p class="text-slate-300 mt-2">
                            {comment.text}
                        </p>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
</div>
</div>
