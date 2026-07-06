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
    <div id="payment-main" class="max-w-5xl mx-auto space-y-12">
        <!-- Back navigation -->
        <div>
            <a href="#membership" class="flex items-center space-x-2 text-gold hover:text-white text-sm font-medium transition-colors cursor-pointer focus:outline-none">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                <span>Change Membership Plan</span>
            </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <!-- Checkout Form -->
            <div class="lg:col-span-7 bg-card rounded-2xl border border-gray-800/80 p-8 space-y-8 relative">
                <div class="space-y-2">
                    <h1 class="font-serif text-2xl sm:text-3xl font-bold tracking-tight">Secure Checkout</h1>
                    <p class="text-xs text-gray-400">All transactions are encrypted securely.</p>
                </div>

                <!-- Form Type Toggle -->
                <div id="payment-methods" class="grid grid-cols-2 gap-4 p-1 bg-dark rounded-xl border border-gray-800" style="display:none">
                    <button onclick="switchPaymentMethod('mpesa')" id="pay-mpesa" class="flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all cursor-pointer bg-emerald-950 text-gold border border-emerald-500/20 shadow">
                        <i data-lucide="smartphone" class="w-4 h-4"></i>
                        <span>M-PESA / SAFARICOM</span>
                    </button>
                    <button onclick="switchPaymentMethod('card')" id="pay-card" class="flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all cursor-pointer text-gray-400 hover:text-white">
                        <i data-lucide="credit-card" class="w-4 h-4"></i>
                        <span>CREDIT / DEBIT CARD</span>
                    </button>
                </div>

                <form id="checkout-form" onsubmit="handlePayment(event)" class="space-y-6">
                    <!-- Fields injected by JS -->
                </form>

                <div class="pt-6 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-500 font-mono">
                    <div class="flex items-center space-x-2">
                        <i data-lucide="lock" class="w-4 h-4 text-gold"></i>
                        <span>SSL Secured</span>
                    </div>
                </div>
            </div>

            <!-- Summary -->
            <div class="lg:col-span-5 bg-card rounded-2xl border border-gray-800/80 p-8 space-y-6">
                <h3 class="font-display font-semibold text-white text-base border-b border-gray-800/80 pb-4">Membership Summary</h3>
                <div id="order-summary" class="space-y-4">
                    <!-- Injected by JS -->
                </div>
            </div>
        </div>
    </div>

    <!-- Success Screen (Hidden initially) -->
    <div id="payment-success" class="hidden max-w-2xl mx-auto text-center space-y-8">
        <div class="w-20 h-20 bg-gold/10 border border-gold rounded-full flex items-center justify-center text-gold mx-auto">
            <i data-lucide="check-circle-2" class="w-10 h-10"></i>
        </div>
        <div class="space-y-3">
            <span class="text-xs font-mono text-gold uppercase tracking-widest block">KARIBU SANNA!</span>
            <h1 class="font-serif text-3xl sm:text-5xl font-bold tracking-tight">Welcome to the <br><span class="italic text-gold">Sukari Reset Circle</span></h1>
            <p class="text-gray-300 text-sm sm:text-base leading-relaxed font-light max-w-lg mx-auto">Your payment has been captured. Let's start this journey together.</p>
        </div>
        <div class="bg-card border border-gray-800 rounded-2xl p-6 sm:p-8 text-left space-y-6">
            <h3 class="font-display font-semibold text-white text-base">Next Steps</h3>
            <div class="space-y-4">
                <div class="flex items-start space-x-3">
                    <div class="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-mono text-xs text-gold shrink-0 mt-0.5">1</div>
                    <div><h4 class="font-medium text-white text-sm">Download the App</h4></div>
                </div>
            </div>
            <a href="#download" class="inline-block px-6 py-3 rounded-full bg-gold text-emerald-950 font-bold hover:bg-white transition-all text-xs tracking-wider uppercase font-mono cursor-pointer">Download Now</a>
        </div>
    </div>

    <!-- M-Pesa Modal -->
    <div id="mpesa-modal" class="hidden fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div class="bg-white text-gray-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <div class="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                <div class="flex items-center space-x-2">
                    <i data-lucide="smartphone" class="w-5 h-5 text-emerald-600"></i>
                    <span class="text-xs font-bold font-mono text-emerald-600">SAFARICOM M-PESA</span>
                </div>
            </div>
            <div class="space-y-4 text-center">
                <p class="text-xs">Enter PIN on your phone to pay <span id="mpesa-amount" class="font-bold"></span></p>
                <input type="password" maxlength="4" placeholder="● ● ● ●" class="w-24 text-center bg-gray-50 border border-gray-300 rounded-lg py-2">
                <div class="flex space-x-3">
                    <button onclick="closeMpesa()" class="w-1/2 py-2 bg-gray-100 rounded-full text-xs">Cancel</button>
                    <button onclick="confirmMpesa()" class="w-1/2 py-2 bg-emerald-600 text-white rounded-full text-xs">Authorize</button>
                </div>
            </div>
        </div>
    </div>
</div>
