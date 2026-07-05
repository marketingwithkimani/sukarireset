<div class="bg-dark text-white min-h-screen">
    <!-- Cinematic Hero Section -->
    <section class="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/70 to-dark z-10"></div>
        <div class="absolute inset-0 bg-radial-[circle_at_top] from-emerald-950/40 via-transparent to-transparent z-0"></div>
        
        <div class="absolute inset-0 z-0 opacity-40">
            <img src="assets/images/sukari_hero_1783232829580.jpg" alt="Hero Background" class="w-full h-full object-cover">
        </div>

        <div class="relative max-w-5xl mx-auto z-20 text-center space-y-8 mt-6">
            <div class="space-y-4">
                <div class="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-xs tracking-widest uppercase font-mono text-gold">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                    <span>A different path for Kenyan blood sugars</span>
                </div>
                <h1 class="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
                    You are not <span class="italic text-gold">broken.</span> <br>
                    Your food doesn't have to be a <span class="underline decoration-gold/50">battle.</span>
                </h1>
            </div>

            <p class="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-sans leading-relaxed font-light">
                Waking up determined, only to crash by 4:00 PM? Feeling like a stranger at Sunday family meals? We put the struggle into words—and built a gentle, communal way back to health.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a href="#emotional-journey" onclick="document.getElementById('emotional-journey').scrollIntoView({behavior:'smooth'}); return false;" class="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-900/40 border border-emerald-500/20 hover:bg-emerald-950 hover:border-emerald-500/40 text-white font-medium text-sm tracking-wide transition-all duration-300 text-center cursor-pointer">
                    Read the Full Story
                </a>
                <a href="#membership" class="w-full sm:w-auto px-8 py-4 rounded-full bg-gold text-emerald-950 hover:bg-white hover:text-emerald-950 font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer">
                    <span>Join our Circle</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="relative z-20 -mt-16 max-w-6xl mx-auto px-6">
        <div class="bg-[#1c1f1d]/90 backdrop-blur-md rounded-2xl border border-gold/20 p-8 sm:p-10 shadow-2xl">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
                <div class="space-y-1 py-4 md:py-0">
                    <div class="font-display text-3xl sm:text-4xl font-bold text-gold">1,200+</div>
                    <p class="text-xs text-gray-400 uppercase tracking-widest font-mono">Reset Members</p>
                </div>
                <div class="space-y-1 py-4 md:py-0">
                    <div class="font-display text-3xl sm:text-4xl font-bold text-gold">92%</div>
                    <p class="text-xs text-gray-400 uppercase tracking-widest font-mono">Habit Consistency</p>
                </div>
                <div class="space-y-1 py-4 md:py-0">
                    <div class="font-display text-3xl sm:text-4xl font-bold text-gold">6.2%</div>
                    <p class="text-xs text-gray-400 uppercase tracking-widest font-mono">Avg. Target HbA1c</p>
                </div>
                <div class="space-y-1 py-4 md:py-0">
                    <div class="font-display text-3xl sm:text-4xl font-bold text-gold">100%</div>
                    <p class="text-xs text-gray-400 uppercase tracking-widest font-mono">Kenyan Grounded</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Emotional Journey -->
    <section id="emotional-journey" class="py-24 px-6 max-w-6xl mx-auto space-y-16">
        <div class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="font-serif text-3xl sm:text-5xl font-medium tracking-tight">
                Does this sound like <span class="italic text-gold">your life?</span>
            </h2>
            <p class="text-gray-400 text-sm sm:text-base font-sans">
                We don't start by selling you an app. We start with where you live. Click through the moments below to see if someone finally understands your road.
            </p>
        </div>

        <!-- Tab Controls -->
        <div class="flex flex-wrap justify-center gap-2 p-1.5 bg-[#121f18] rounded-xl border border-gray-800 max-w-3xl mx-auto">
            <?php foreach ($content['story_sections'] as $key => $section): ?>
                <button onclick="switchStoryTab('<?php echo $key; ?>')" id="tab-btn-<?php echo $key; ?>" class="story-tab-btn px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800/30">
                    <?php echo $section['badge']; ?>
                </button>
            <?php endforeach; ?>
        </div>

        <!-- Interactive Story Panel -->
        <div id="story-panel" class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#121f18]/60 rounded-3xl border border-gray-800/80 p-8 sm:p-12">
            <!-- Content will be injected by JS -->
        </div>
    </section>

    <!-- Smart Contrast Section -->
    <section class="bg-card py-24 px-6 border-y border-gray-800">
        <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-5 space-y-6">
                <div class="w-12 h-12 rounded-xl bg-emerald-950 border border-gold/30 flex items-center justify-center text-gold">
                    <i data-lucide="heart" class="w-6 h-6"></i>
                </div>
                <h2 class="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                    Compare the <span class="italic text-gold">two roads.</span>
                </h2>
                <p class="text-gray-400 text-sm sm:text-base leading-relaxed">
                    We often believe that the only way to heal is extreme suffering, starvation, and solitude. But human psychology and clinical history show that restriction triggers rebellion. There is another path.
                </p>
                <div class="flex space-x-2 pt-2">
                    <button onclick="switchComparison('strict')" id="comp-btn-strict" class="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer bg-dark text-gray-400 hover:text-white">
                        Solitary Restriction
                    </button>
                    <button onclick="switchComparison('sukari')" id="comp-btn-sukari" class="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer bg-emerald-950/80 text-gold border border-emerald-500/30">
                        Sukari Gentle Reset
                    </button>
                </div>
            </div>

            <div class="lg:col-span-7" id="comparison-card">
                <!-- Injected by JS -->
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-24 px-6 max-w-6xl mx-auto space-y-16">
        <div class="text-center space-y-4 max-w-2xl mx-auto">
            <span class="text-xs uppercase tracking-widest text-gold font-mono">KENYAN OUTCOMES</span>
            <h2 class="font-serif text-3xl sm:text-5xl font-medium tracking-tight">
                Stories from <span class="italic text-gold">our dining tables</span>
            </h2>
            <p class="text-gray-400 text-sm">
                Actual members, real lives, sustainable blood sugar results in everyday Kenyan settings.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <?php foreach ($content['testimonials'] as $t): ?>
                <div class="bg-card border border-gray-800 rounded-2xl p-8 flex flex-col justify-between hover:border-gold/30 transition-all duration-300 space-y-6">
                    <div class="space-y-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 rounded-full bg-emerald-950/80 border border-gold/20 flex items-center justify-center text-gold">
                                <i data-lucide="user" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-display font-semibold text-white text-sm"><?php echo $t['name']; ?>, <?php echo $t['age']; ?></h4>
                                <p class="text-xs text-gold font-mono"><?php echo $t['location']; ?></p>
                            </div>
                        </div>
                        <p class="text-gray-300 text-sm leading-relaxed italic font-sans">
                            "<?php echo $t['story']; ?>"
                        </p>
                    </div>
                    <div class="text-[11px] font-mono text-gray-500 border-t border-gray-800/80 pt-4">
                        <?php echo $t['timeframe']; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- Big CTA -->
    <section class="pb-24 px-6 max-w-5xl mx-auto">
        <div class="bg-gradient-to-br from-emerald-950/60 to-dark border border-gold/30 rounded-3xl p-8 sm:p-16 text-center space-y-8 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl"></div>
            
            <div class="max-w-2xl mx-auto space-y-4 relative z-10">
                <h2 class="font-serif text-3xl sm:text-5xl font-semibold tracking-tight leading-tight">
                    Let's take the <span class="italic text-gold">first step</span> together.
                </h2>
                <p class="text-gray-300 text-sm sm:text-base font-sans font-light">
                    You've tried the strict starvation. You've felt the guilt. Now, let us try a path built on warm support, local food pairing, and deep human empathy. It is time for a soft reset.
                </p>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <a href="#membership" class="w-full sm:w-auto px-8 py-4 rounded-full bg-gold text-dark hover:bg-white hover:text-emerald-950 transition-all duration-300 font-semibold text-sm tracking-wide cursor-pointer text-center">
                    Explore Membership Tiers
                </a>
                <a href="#download" class="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-900/30 border border-gold/20 hover:border-gold/50 text-white transition-all duration-300 font-semibold text-sm tracking-wide cursor-pointer text-center">
                    See the Companion App
                </a>
            </div>
            
            <p class="text-xs text-gray-500 font-mono">
                No long-term commitments. Cancel or switch anytime. Fully optimized for Kenyans.
            </p>
        </div>
    </section>
</div>
