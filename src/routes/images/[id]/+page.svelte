<script>
    let { data } = $props();
</script>

<div class="min-h-screen bg-gray-100 px-4 py-8">
    <div class="max-w-4xl mx-auto">
        <a href="/" class="text-blue-600 hover:underline">
            Back to homepage
        </a>

        <div class="bg-white rounded-2xl shadow-md overflow-hidden mt-6">
            <img
                src={data.image.image}
                alt={data.image.description}
                class="w-full max-h-[600px] object-cover"
            >

            <div class="p-6">
                <p class="font-bold text-gray-900">
                    @{data.image.username}
                </p>

                <p class="text-gray-700 mt-4">
                    {data.image.description}
                </p>

                <p class="text-gray-500 mt-4">
                    Likes: {data.image.votes}
                </p>
            </div>
        </div>
    </div>
</div>