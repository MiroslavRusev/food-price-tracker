<script lang="ts">
	// Footer component props
	export let showSocialLinks = true;
	export let showQuickLinks = true;

	interface CustomLink {
		href: string;
		text: string;
	}

	export let customLinks: CustomLink[] = [];

	// Function to get current year
	function getCurrentYear(): number {
		return new Date().getFullYear();
	}
</script>

<footer id="footer" class="bg-slate-600 border-t border-gray-100 mt-16">
	<div class="max-w-6xl mx-auto px-6 py-12">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div>
				<h3 class="text-lg font-semibold text-white mb-3 underline underline-offset-4">
					Анализатор на потребителските цени
				</h3>
				<p class="text-white leading-relaxed">
					Анализирайте отношението на потребителските цени към доходите на база инфлацията в различни периоди.
				</p>
			</div>

			{#if showQuickLinks}
				<div>
					<h3 class="text-lg font-semibold text-white mb-3 underline underline-offset-4">Източници</h3>
					<ul class="space-y-2">
						{#if customLinks.length > 0}
							{#each customLinks as link}
								<li>
									<a href={link.href} class="text-gray-600 hover:text-gray-900 transition-colors">
										{link.text}
									</a>
								</li>
							{/each}
						{:else}
							<li>
								<a
									href="https://ec.europa.eu/eurostat/databrowser/view/prc_fsc_idx/default/table?lang=en&category=prc.prc_oth"
									class="text-white hover:text-black transition-colors">Eurostat</a
								>
							</li>
							<li>
								<a href="https://fuelo.net/" class="text-white hover:text-black transition-colors"
									>Fuelo</a
								>
							</li>
						{/if}
					</ul>
				</div>
			{/if}

			{#if showSocialLinks}
				<div>
					<h3 class="text-lg font-semibold text-white mb-3 underline underline-offset-4">Connect</h3>
					<div class="flex space-x-3">
						<a
							href="https://www.facebook.com/"
							target="_blank"
							aria-label="Facebook"
							class="inline-flex items-center justify-center text-white hover:text-black"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
								<path
									fill="currentColor"
									d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"
								/>
							</svg>
						</a>
					</div>
				</div>
			{/if}
		</div>
		<div class="border-t border-gray-200 mt-8 pt-8 text-center">
			<p class="text-white">
				&copy; {getCurrentYear()} Анализатор на потребителските цени. Всички права запазени.
			</p>
		</div>
	</div>
</footer>
