<script>
	let { children } = $props();
	import '../styles/input.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
</script>

<Header />

{@render children()}

<Footer />
