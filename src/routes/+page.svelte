<script>
    let { data, form } = $props();
</script>

<div class="min-h-screen bg-[#111827] text-white">
    <header class="sticky top-0 z-20 bg-[#111827]/90 backdrop-blur border-b border-white/10">
        <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div>
              <a href="/" class="text-2xl font-black tracking-tight">
    Insta<span class="text-pink-400">Clone</span>
</a>
            </div>

            <nav class="flex gap-3 items-center text-sm font-medium">
             <a href="/register" class="px-4 py-2 rounded-full hover:bg-white/10 transition">
        Register
    </a>

    <a href="/login" class="px-4 py-2 rounded-full hover:bg-white/10 transition">
        Login
    </a>
                <a href="/upload" class="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold hover:opacity-90 transition">
                    Upload
                </a>

                <a href="/profile" class="px-4 py-2 rounded-full hover:bg-white/10 transition">
                    Profile
                </a>

                <form method="POST" action="/logout?/logout">
                  <button type="submit" class="px-4 py-2 rounded-full text-red-300 hover:bg-red-500/10 transition">
                   Logout
                  </button>
                </form>
            </nav>
        </div>
    </header>

    <main class="max-w-6xl mx-auto px-6 py-8">
    <section class="mb-8">
   <h2 class="text-4xl font-black tracking-tight">
        Latest Images
    </h2>

   

</section>

{#if form?.error}
    <p class="bg-red-100 border border-red-400 text-red-700 p-4 rounded-xl mb-6">
        {form.error}
    </p>
{/if}
{#if data.images.length === 0}

    <div class="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">

        <p class="text-gray-600">
            No images uploaded yet.
        </p>

        <a
            href="/upload"
            class="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
            Upload first image
        </a>

    </div>

{:else}

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">

{#each data.images as image}

  <div class="bg-white/10 border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-1 hover:bg-white/15 transition duration-300 flex flex-col">

        <a href={`/images/${image.id}`} class="block overflow-hidden bg-gray-200">
            <img
                src={image.image}
                alt={image.description}
                class="w-full h-72 object-cover hover:scale-105 transition duration-300"
            >
        </a>

        <div class="p-5 flex flex-col gap-4">

            <div class="flex justify-between items-center">
                <p class="font-bold text-white">
                    @{image.username}
                </p>

                <a
                    href={`/images/${image.id}`}
                    class="text-blue-600 text-sm hover:underline"
                >
                    Details
                </a>
            </div>

            <p class="text-slate-300 text-sm line-clamp-2">
                {image.description}
            </p>

            <div class="flex gap-3 pt-2">

                <form method="POST" action="?/vote">
                    <input type="hidden" name="imageId" value={image.id}>
                    <input type="hidden" name="voteType" value="like">

                    <button
                        type="submit"
                       class="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm hover:bg-pink-500 transition"
                    >
                        Like {image.votes}
                    </button>
                </form>

                <form method="POST" action="?/vote">
                    <input type="hidden" name="imageId" value={image.id}>
                    <input type="hidden" name="voteType" value="dislike">

                    <button
                        type="submit"
                      class="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm hover:bg-slate-700 transition">
                        Dislike {image.dislikes}
                    </button>
                </form>

            </div>

        </div>
</div>
{/each}

    </div>

{/if}
    </main>
    </div>
