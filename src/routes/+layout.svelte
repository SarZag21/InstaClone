<script>
// Global stylesheet
	import './layout.css';
// Application favicon
	import favicon from '$lib/assets/favicon.svg';
	// Render child pages inside the layout
	let { children } = $props();
</script>

<svelte:head>
	<!-- Browser tab icon -->
	<link rel="icon" href={favicon} />
</svelte:head>
<!-- Render current page -->
{@render children()}