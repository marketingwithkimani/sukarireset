<?php
// Self-loader: when fetched directly via AJAX as a Vercel function, load content
if (!isset($content)) {
    $root = dirname(__DIR__);
    $content_path = $root . '/data/content.json';
    if (file_exists($content_path)) {
        $content = json_decode(file_get_contents($content_path), true);
    }
}
?>
<div class="bg-dark text-white min-h-screen pt-28 pb-20 px-6 font-sans">
    <div class="max-w-6xl mx-auto space-y-16">
        <!-- Back navigation -->
        <div>
            <a href="#home" class="flex items-center space-x-2 text-gold hover:text-white text-sm font-medium transition-colors cursor-pointer focus:outline-none">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                <span>Back to The Story</span>
            </a>
        </div>

        <!-- Hero Section -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-7 space-y-8">
                <div class="space-y-4">
                    <span class="inline-flex items-center space-x-1.5 text-xs text-gold uppercase tracking-widest font-mono bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                        <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                        <span>Companion App</span>
                    </span>
                    <h1 class="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                        Daily health, <br>
                        right in your <span class="italic text-gold">pocket.</span>
                    </h1>
                    <p class="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                        Our mobile application isn't a medical logger designed to bore you with clinical tables. It's a supportive friend designed for Kenyan lifestyles, helping you log local foods, celebrate progress, and chat with your dedicated circle.
                    </p>
                </div>

                <!-- Main Action Block -->
                <div class="bg-card border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div class="flex flex-col sm:flex-row items-center gap-4">
                        <a id="btn-trigger-apk-download" 
                           href="https://github.com/marketingwithkimani/sukarireset/releases/latest/download/Sukari_Reset_Companion.apk"
                           download="Sukari_Reset_Companion.apk"
                           onclick="handleDownload(event)"
                           class="w-full sm:w-auto px-8 py-4 bg-gold text-emerald-950 font-bold rounded-full hover:bg-white hover:text-emerald-950 transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer">
                            <i data-lucide="download" class="w-5 h-5"></i>
                            <span>Download for Android (.APK)</span>
                        </a>
                        <button onclick="toggleGuide()" class="w-full sm:w-auto px-6 py-4 bg-emerald-950/40 border border-gold/20 rounded-full hover:border-gold/60 text-white font-medium text-sm transition-all duration-300 text-center cursor-pointer">
                            How to Install Guide
                        </button>
                    </div>

                    <div id="download-status" class="hidden bg-emerald-950/65 border border-gold/30 text-gray-300 p-4 rounded-xl text-xs space-y-2">
                        <p class="font-semibold text-white flex items-center space-x-2">
                            <span class="w-2 h-2 rounded-full bg-gold animate-ping"></span>
                            <span>Downloading Sukari_Reset_Companion.apk...</span>
                        </p>
                        <p>If your browser prompts you with a safety warning, tap <strong class="text-white">"Download Anyway"</strong>. Our app is completely safe, verified, and free of trackers.</p>
                    </div>

                    <div class="flex items-center space-x-3 text-xs text-gray-400 font-mono">
                        <i data-lucide="shield" class="w-4 h-4 text-gold"></i>
                        <span>v1.0.4 • Optimized for Android 10+ • Free Direct Install</span>
                    </div>
                </div>

            </div>

            <!-- Screenshot/Mockup -->
            <div class="lg:col-span-5 flex justify-center">
                <div class="relative max-w-sm w-full bg-dark rounded-3xl p-3 border border-gray-800 shadow-2xl">
                    <div class="absolute -top-3 -right-3 bg-gold text-emerald-950 font-bold px-3 py-1 rounded-full text-xs font-mono shadow-lg">
                        HABARI RESETS!
                    </div>
                    <div class="rounded-[22px] overflow-hidden border border-gray-800 aspect-[3/4] bg-emerald-950/20">
                        <img src="assets/images/sukari_app_mockup_1783232843686.jpg" alt="App Mockup" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
        </div>

        <!-- Installation Guide -->
        <div id="apk-install-guide" class="hidden bg-card rounded-2xl border border-gray-800 p-8 space-y-6">
            <div class="flex items-center space-x-3">
                <i data-lucide="help-circle" class="w-6 h-6 text-gold"></i>
                <h3 class="font-serif text-xl font-bold">Android Private APK Installation Guide</h3>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">
                Because Sukari Reset is built as a private, high-support community companion with local chat groups, we distribute our application directly to members via secure APK. It only takes 60 seconds to configure.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
                <div class="bg-dark p-5 rounded-xl border border-gray-800/80 space-y-3">
                    <div class="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-mono text-gold font-bold text-sm">1</div>
                    <h4 class="font-semibold text-sm">Download APK</h4>
                    <p class="text-xs text-gray-400">Click the gold "Download" button above to pull down the secure setup package.</p>
                </div>
                <div class="bg-dark p-5 rounded-xl border border-gray-800/80 space-y-3">
                    <div class="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-mono text-gold font-bold text-sm">2</div>
                    <h4 class="font-semibold text-sm">Enable Source</h4>
                    <p class="text-xs text-gray-400">Tap open. If asked to 'Allow installation from this source', tap Settings and allow.</p>
                </div>
                <div class="bg-dark p-5 rounded-xl border border-gray-800/80 space-y-3">
                    <div class="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-mono text-gold font-bold text-sm">3</div>
                    <h4 class="font-semibold text-sm">Tap Install</h4>
                    <p class="text-xs text-gray-400">Tap 'Install' when the system popup appears, and wait 5 seconds for authorization.</p>
                </div>
                <div class="bg-dark p-5 rounded-xl border border-gray-800/80 space-y-3">
                    <div class="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-mono text-gold font-bold text-sm">4</div>
                    <h4 class="font-semibold text-sm">Log in Simply</h4>
                    <p class="text-xs text-gray-400">Open the app, enter your Kenyan phone number, and type your circle password.</p>
                </div>
            </div>

            <div class="flex items-start space-x-3 bg-red-950/20 border border-red-500/20 p-4 rounded-xl text-xs text-gray-300">
                <i data-lucide="alert-triangle" class="w-5 h-5 text-red-400 shrink-0 mt-0.5"></i>
                <div>
                    <strong class="text-white block mb-0.5">Is an APK safe?</strong>
                    Yes, absolutely. To keep Sukari Reset entirely private and ad-free, we package our APKs using strict security protocols.
                </div>
            </div>
        </div>

        <!-- App Features -->
        <div class="space-y-8 pt-8">
            <div class="text-center space-y-4 max-w-2xl mx-auto">
                <span class="text-xs font-mono text-gold uppercase tracking-widest">WHAT HAPPENS INSIDE</span>
                <h2 class="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                    A daily partner <br>for your health journey.
                </h2>
                <p class="text-gray-400 text-sm">
                    We focus on sustainable habit tracking, positive reinforcement, and peer connection.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-card border border-gray-800 rounded-2xl p-8 hover:border-gold/20 transition-all duration-300 space-y-4">
                    <div class="w-8 h-8 rounded-lg bg-emerald-950 border border-gold/20 flex items-center justify-center text-gold"><i data-lucide="check" class="w-4 h-4"></i></div>
                    <h3 class="font-display font-semibold text-white text-base">Daily Morning Stories</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">Warm reminders and storytelling sent straight to your screen at 6:30 AM.</p>
                </div>
                <div class="bg-card border border-gray-800 rounded-2xl p-8 hover:border-gold/20 transition-all duration-300 space-y-4">
                    <div class="w-8 h-8 rounded-lg bg-emerald-950 border border-gold/20 flex items-center justify-center text-gold"><i data-lucide="check" class="w-4 h-4"></i></div>
                    <h3 class="font-display font-semibold text-white text-base">Smart Food Logger</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">Log actual local meals (Ugali, Githeri, Managu) using simple photos.</p>
                </div>
                <div class="bg-card border border-gray-800 rounded-2xl p-8 hover:border-gold/20 transition-all duration-300 space-y-4">
                    <div class="w-8 h-8 rounded-lg bg-emerald-950 border border-gold/20 flex items-center justify-center text-gold"><i data-lucide="check" class="w-4 h-4"></i></div>
                    <h3 class="font-display font-semibold text-white text-base">Your Private Circle</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">Connect with 12 other Kenyans sharing identical paths. Chat and encourage.</p>
                </div>
            </div>
        </div>

        <!-- Closing card -->
        <div class="bg-emerald-950/20 border border-gold/10 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div class="space-y-2 max-w-xl">
                <h4 class="font-serif text-lg font-bold">Ready to see what this community is about?</h4>
                <p class="text-gray-400 text-sm font-light">Don't struggle in solitude. Access the app and join hundreds of Kenyans walking the exact same path.</p>
            </div>
            <a href="#membership" class="w-full sm:w-auto shrink-0 px-6 py-3 rounded-full bg-gold text-emerald-950 font-bold hover:bg-white transition-all duration-300 cursor-pointer text-center text-sm">
                Explore Membership Circles
            </a>
        </div>
    </div>
</div>
