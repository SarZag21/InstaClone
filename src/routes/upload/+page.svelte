<script>
    let { form } = $props();
</script>

<div class="min-h-screen flex items-center justify-center bg-slate-100">

    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 class="text-3xl font-bold text-center mb-6">
            Upload Image
        </h1>

        {#if form?.error}
            <p class="bg-red-200 border border-red-500 text-red-800 p-3 rounded mb-4">
                {form.error}
            </p>
        {/if}

        <form action="?/upload" method="POST" enctype="multipart/form-data" class="space-y-4">

            <div>
                <label for="image" class="block mb-1 font-medium">
                    Choose Image
                </label>

                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    class="w-full border border-gray-300 rounded-lg p-2"
                >
            </div>

            <div>
                <label for="description" class="block mb-1 font-medium">
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    rows="4"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            <button
                type="submit"
                class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Upload
            </button>

        </form>

        <div class="text-center mt-4">
            <a href="/" class="text-blue-600 hover:underline">
                Back to homepage
            </a>
        </div>

    </div>

</div>