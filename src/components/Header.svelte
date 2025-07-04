<script>
    import Logo from "$lib/assets/pie-chart-logo.svg";
</script>
<header class="bg-slate-600 border-b border-gray-100 shadow-sm">
	<div class="header-content mx-auto px-6 py-1">
		<div class="flex items-start justify-between">
			<img src={Logo} alt="Logo" class="w-10 h-10 mr-4" />
			<h1 class="flex-1 text-2xl font-bold text-white pt-1">Food Price Tracker</h1>
			<div class="flex-1 flex justify-end">
				<a 
					id="fb-social-button" 
					aria-label="Facebook" 
					target="_blank" 
					href="https://www.facebook.com/" 
					class="inline-flex items-center justify-center w-10 h-10 text-white hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
						<path fill="currentColor" d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</header>