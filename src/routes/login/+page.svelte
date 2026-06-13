<script>
    let { form } = $props();
</script>

<div class="min-h-screen bg-[#111827] text-white flex items-center justify-center px-6">

    <div class="w-full max-w-md bg-white/10 border border-white/10 rounded-3xl p-8 shadow-xl">

        <h1 class="text-3xl font-bold text-center mb-6">
            Login
        </h1>

        {#if form?.error}
            <p class="bg-red-200 border border-red-500 text-red-800 p-3 rounded mb-4">
                {form.error}
            </p>
        {/if}

        <form action="?/login" method="POST" class="space-y-4">

            <div>
                <label for="email" class="block mb-1 font-medium">
                    Email
                </label>

         <input
          type="email"
          id="email"
          name="email"
          autocomplete="off"
          class="w-full bg-slate-700 border border-slate-600 rounded-2xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30"
        />
            </div>

            <div>
                <label for="password" class="block mb-1 font-medium">
                    Password
                </label>

                <input
                 type="password"
                 name="password"
                 autocomplete="current-password"
                 class="w-full bg-slate-700 border border-slate-600 rounded-2xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30"
                >
            </div>

            <button
            type="submit"
            class="w-full bg-gradient-to-r from-pink-500 to-violet-500 py-3 rounded-2xl font-bold hover:opacity-90 transition"
            >
                Login
            </button>

        </form>

        <div class="text-center mt-4">
            <a href="/register" class="text-blue-600 hover:underline">
                No account yet? Register
            </a>
        </div>

    </div>

</div>