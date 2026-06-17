<script>
   // Form data and upload errors from the server
    let { form } = $props();
</script>

<div class="min-h-screen bg-[#111827] text-white px-6 py-10 flex items-center justify-center ">
   <!-- Upload card -->
    <div class="bg-white/10 border border-white/10 rounded-3xl p-8 shadow-xl w-full max-w-2xl mx-auto">
 <!-- Page title -->
        <h1 class="text-3xl font-bold text-center mb-6">
            Upload Image
        </h1>
     <!-- Display upload errors -->
        {#if form?.error}
            <p class="bg-red-200 border border-red-500 text-red-800 p-3 rounded mb-4">
                {form.error}
            </p>
        {/if}

  <!-- Upload form -->
        <form action="?/upload" method="POST" enctype="multipart/form-data" class="space-y-4">
  <!-- Image file input -->
            <div>
                <label for="image" class="block mb-1 font-medium">
                    Choose Image
                </label>

                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    class="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-3"
                >
            </div>
 <!-- Image description -->
            <div>
                <label for="description" class="block mb-1 font-medium">
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    rows="4"
                   class="w-full bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-pink-400"
                ></textarea>
            </div>

  <!-- Submit upload form -->
            <button
                type="submit"
                class="w-full bg-gradient-to-r from-pink-500 to-violet-500 py-3 rounded-2xl font-bold hover:opacity-90 transition"
            >
                Upload
            </button>

        </form>
  <!-- Return to homepage -->
        <div class="text-center mt-4">
            <a href="/" class="text-blue-600 hover:underline">
                Back to homepage
            </a>
        </div>

    </div>

</div>