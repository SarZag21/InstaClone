<script>
    let { form } = $props();
</script>

<div class="min-h-screen flex items-center justify-center bg-slate-100">

    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 class="text-3xl font-bold text-center mb-6">
            Register
        </h1>

        {#if form?.error}
            <p class="bg-red-200 border border-red-500 text-red-800 p-3 rounded mb-4">
                {form.error}
            </p>
        {/if}

        <form action="?/register" method="POST" class="space-y-4">

            <div>
                <label for="username" class="block mb-1 font-medium">
                    Username
                </label>

                <input
                    type="text"
                    id="username"
                    name="username"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
            </div>

            <div>
                <label for="email" class="block mb-1 font-medium">
                    Email
                </label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
            </div>

            <div>
                <label for="password" class="block mb-1 font-medium">
                    Password
                </label>

                <input
                    type="password"
                    id="password"
                    name="password"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
            </div>

            <button
                type="submit"
                class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Register
            </button>

        </form>

        <div class="text-center mt-4">
            <a
                href="/login"
                class="text-blue-600 hover:underline"
            >
                Already have an account? Login
            </a>
        </div>

    </div>

</div>