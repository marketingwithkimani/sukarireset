<div class="bg-dark text-white min-h-screen pt-28 pb-20 px-6 font-sans">
    <div class="max-w-6xl mx-auto space-y-16">
        <!-- Back navigation -->
        <div>
            <a href="#home" class="flex items-center space-x-2 text-gold hover:text-white text-sm font-medium transition-colors cursor-pointer focus:outline-none">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                <span>Back to The Story</span>
            </a>
        </div>

        <!-- Header -->
        <div class="text-center space-y-4 max-w-2xl mx-auto">
            <span class="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-xs font-mono text-gold uppercase tracking-wider">
                <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                <span>The Sukari Circles</span>
            </span>
            <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Clear membership. <br>No <span class="italic text-gold">surprises.</span>
            </h1>
            <p class="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                We believe wellness should be transparent and accessible. Choose a path that fits your pacing.
            </p>

            <!-- Currency Toggle -->
            <div class="inline-flex items-center space-x-1 bg-card border border-gray-800 p-1 rounded-xl mt-6">
                <button onclick="switchCurrency('KES')" id="currency-kes" class="px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer bg-gold text-emerald-950 shadow">
                    Kenyan Shilling (KES)
                </button>
                <button onclick="switchCurrency('USD')" id="currency-usd" class="px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer text-gray-400 hover:text-white">
                    US Dollar (USD)
                </button>
            </div>
        </div>

        <!-- Pricing Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
            <?php foreach ($content['pricing_tiers'] as $tier): ?>
                <div class="relative flex flex-col justify-between bg-[#121f18]/70 border rounded-2xl p-8 transition-all duration-300 hover:shadow-xl <?php echo (isset($tier['isPopular']) && $tier['isPopular']) ? 'border-gold shadow-2xl shadow-gold/5 bg-gradient-to-b from-[#182a20] to-dark' : 'border-gray-800/80 hover:border-gray-700'; ?>">
                    <?php if (isset($tier['isPopular']) && $tier['isPopular']): ?>
                        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-emerald-950 font-mono font-bold text-[10px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                            MOST ENCOURAGED CHOICE
                        </div>
                    <?php endif; ?>

                    <div class="space-y-6">
                        <div>
                            <h3 class="font-display font-bold text-xl text-white"><?php echo $tier['name']; ?></h3>
                            <p class="text-xs text-gray-400 font-light mt-2 min-h-[32px]"><?php echo $tier['description']; ?></p>
                        </div>

                        <div class="py-4 border-y border-gray-800/80 flex items-baseline space-x-2">
                            <span class="font-serif text-4xl font-bold text-white pricing-value" data-kes="<?php echo $tier['priceKES']; ?>" data-usd="<?php echo $tier['priceUSD']; ?>">
                                KES <?php echo number_format($tier['priceKES']); ?>
                            </span>
                            <span class="text-xs text-gray-500 font-mono">
                                / <?php echo ($tier['period'] == 'forever') ? 'one-time' : $tier['period']; ?>
                            </span>
                        </div>

                        <ul class="space-y-3 pt-2">
                            <?php foreach ($tier['features'] as $feature): ?>
                                <li class="flex items-start space-x-3 text-xs leading-relaxed">
                                    <div class="w-4 h-4 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-gold mt-0.5 shrink-0">
                                        <i data-lucide="check" class="w-2.5 h-2.5"></i>
                                    </div>
                                    <span class="text-gray-300"><?php echo $feature; ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>

                    <div class="pt-8">
                        <a href="#payment?tier=<?php echo $tier['id']; ?>" class="w-full inline-block py-3.5 rounded-full font-medium text-xs tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer text-center <?php echo (isset($tier['isPopular']) && $tier['isPopular']) ? 'bg-gold text-dark hover:bg-white' : 'bg-emerald-950/40 border border-emerald-500/20 text-white hover:bg-emerald-950'; ?>">
                            <?php echo ($tier['id'] == 'free') ? 'Get Free Access' : 'Select This Path'; ?>
                        </a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- FAQs -->
        <div class="space-y-8 pt-8 max-w-3xl mx-auto">
            <div class="text-center space-y-2">
                <h2 class="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Questions on <span class="italic text-gold">your mind?</span>
                </h2>
                <p class="text-gray-400 text-xs">Honest, transparent answers about our philosophy.</p>
            </div>

            <div class="space-y-4">
                <?php foreach ($content['faqs'] as $idx => $faq): ?>
                    <div class="bg-[#121f18]/60 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300">
                        <button onclick="toggleFAQ(<?php echo $idx; ?>)" class="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-gray-800/10 transition-colors cursor-pointer">
                            <span class="font-display font-medium text-sm sm:text-base text-white"><?php echo $faq['question']; ?></span>
                            <i data-lucide="chevron-down" id="faq-icon-<?php echo $idx; ?>" class="w-5 h-5 text-gold transition-transform duration-300"></i>
                        </button>
                        <div id="faq-ans-<?php echo $idx; ?>" class="hidden px-6 pb-6 pt-1 border-t border-gray-800/40 text-xs sm:text-sm text-gray-400 leading-relaxed">
                            <p><?php echo $faq['answer']; ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</div>
