<script>
    let { data, form } = $props();
</script>

<div class="min-h-screen bg-gray-100">
    <header class="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200">
        <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div>
                <h1 class="text-xl font-bold text-gray-900">
                    InstaClone
                </h1>
            </div>

            <nav class="flex gap-3 items-center text-sm font-medium">
             <a href="/register" class="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
        Register
    </a>

    <a href="/login" class="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
        Login
    </a>
                <a href="/upload" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                    Upload
                </a>

                <a href="/profile" class="px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                    Profile
                </a>

                <a href="/logout" class="px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition">
                    Logout
                </a>
            </nav>
        </div>
    </header>

    <main class="max-w-6xl mx-auto px-6 py-8">
    <section class="mb-8">
    <h2 class="text-3xl font-bold text-gray-900">
        Latest Images
    </h2>

    <p class="text-gray-500 mt-1">
        See the newest images uploaded by all users.
    </p>
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

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

        {#each data.images as image}

            <div class="bg-white rounded-2xl overflow-hidden shadow-md">

                <a href={`/images/${image.id}`}>

                    <img
                        src={image.image}
                        alt={image.description}
                        class="w-full h-72 object-cover"
                    >

                </a>

                <div class="p-5">

                    <div class="flex justify-between items-center mb-3">

                        <p class="font-bold text-gray-900">
                            @{image.username}
                        </p>

                        <a
                            href={`/images/${image.id}`}
                            class="text-blue-600 text-sm hover:underline"
                        >
                            Details
                        </a>

                    </div>

                    <p class="text-gray-700 text-sm">
                        {image.description}
                    </p>

                </div>

            </div>

        {/each}

    </div>

{/if}
    </main>
</div>