<script>
    // Form data and error messages from the server
    let { form } = $props();
</script>

<div class="min-h-screen bg-[#111827] text-white flex items-center justify-center px-6">

    <div class="w-full max-w-md bg-white/10 border border-white/10 rounded-3xl p-8 shadow-xl">
   <!-- Registration card -->
        <h1 class="text-3xl font-bold text-center mb-6">
            Register
        </h1>
   <!-- Display registration errors -->
       {#if form?.error}
    <div class="w-full bg-red-500/10 border border-red-400 text-red-200 p-4 rounded-2xl mb-6">
        {form.error}
    </div>
{/if}

        <!-- Registration form -->
        <form action="?/register" method="POST" class="space-y-4">
  <!-- Username input -->
            <div>
                <label for="username" class="block mb-1 font-medium">
                    Username
                </label>

                <input
                type="text"
                id="username"
                name="username"
               class="w-full bg-slate-700 border border-slate-600 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30"
               style="background-color:#334155;color:white;"
                >

            </div>
     <!-- Email input -->
            <div>
                <label for="email" class="block mb-1 font-medium">
                    Email
                </label>

            <input
               type="email"
               id="email"
               name="email"
               class="w-full bg-slate-700 border border-slate-600 rounded-2xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30"
            >
            </div>
 <!-- Password input -->
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
     <!-- Submit registration form -->
           <button
            type="submit"
            class="w-full bg-gradient-to-r from-pink-500 to-violet-500 py-3 rounded-2xl font-bold hover:opacity-90 transition"
            >
             Register
            </button>

        </form>
   <!-- Link to login page -->
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