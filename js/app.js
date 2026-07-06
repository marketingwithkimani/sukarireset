// Sukari Reset - App Logic
let appData = {};
let supabaseClient = null;

// Use relative paths to avoid issues with subdirectories
const BASE_PATH = '';

// Supabase Configuration
const SUPABASE_URL = 'https://scuomepbvnsrpffhlfwd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_gjfoxu3ZHP8v-Vf3FElHmA_F1yFGQcc';

// Initialize Supabase
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('Initializing Sukari Reset...');
        // Load Content
        const response = await fetch(`${BASE_PATH}data/content.json?v=${Date.now()}`);
        if (!response.ok) throw new Error('Failed to load content data');
        appData = await response.json();
        
        // Initial Render logic without fade-out if we start at home
        const hash = window.location.hash || '#home';
        const page = hash.split('?')[0].replace('#', '');
        
        // If we are at root/home, PHP already rendered it. Just init.
        if (page === 'home') {
            initHome();
            updateNavState('home');
        } else {
            // If we are on shared link like #download, load it
            await handleRouting();
        }
        
        lucide.createIcons();
        setupEventListeners();
    } catch (err) {
        console.error('Initialization error:', err);
    }
});

// Routing Logic
window.addEventListener('hashchange', handleRouting);

async function handleRouting() {
    const hash = window.location.hash || '#home';
    const page = hash.split('?')[0].replace('#', '');
    const params = new URLSearchParams(hash.split('?')[1] || '');
    
    const container = document.getElementById('page-container');
    if (!container) return;
    
    console.log(`Navigating to: ${page}`);
    
    // Page Transition Out
    gsap.to(container, { opacity: 0, y: -10, duration: 0.2, onComplete: async () => {
        try {
            // Fetch and Load Page Content
            const url = `index.php?p=${page}&ajax=1&v=${Date.now()}`;
            const pageResp = await fetch(url);
            if (!pageResp.ok) throw new Error(`Page ${page} not found at ${url}`);
            const html = await pageResp.text();
            
            container.innerHTML = html;
            
            // Post-Load Logic
            lucide.createIcons();
            window.scrollTo(0, 0);
            updateNavState(page);
            
            // Page Specific Init
            if (page === 'home') initHome();
            else if (page === 'membership') initMembership();
            else if (page === 'payment') initPayment(params.get('tier'));
            else if (page === 'download') initDownload();
            
            // Transition In
            gsap.to(container, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
        } catch (err) {
            console.error('Routing error:', err);
            if (page !== 'home') {
                window.location.hash = '#home';
            } else {
                // Critical failure on home
                container.innerHTML = '<div class="p-20 text-center"><h1>Error loading page.</h1><p>Please check your server connection.</p></div>';
                gsap.to(container, { opacity: 1, duration: 0.3 });
            }
        }
    }});
}

function updateNavState(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
        const isCurrent = link.getAttribute('href') === `#${page}` || (page === 'home' && link.getAttribute('href') === '#home');
        link.classList.toggle('text-gold', isCurrent);
        link.classList.toggle('text-gray-300', !isCurrent);
        const indicator = link.querySelector('.nav-indicator');
        if (indicator) {
            gsap.to(indicator, { scaleX: isCurrent ? 1 : 0, duration: 0.3 });
        }
    });
}

// Page Specific Initializers
function initMembership() { console.log('Membership view initialized'); }
function initDownload() { console.log('Download view initialized'); }

// Home Logic
let currentStoryTab = 'hook';
function initHome() {
    console.log('Home view initialized');
    if (appData.story_sections) {
        switchStoryTab('hook');
    }
    switchComparison('sukari');
}

window.switchStoryTab = function(key) {
    if (!appData.story_sections) return;
    currentStoryTab = key;
    const section = appData.story_sections[key];
    const panel = document.getElementById('story-panel');
    if (!panel) return;
    
    // Update Buttons
    document.querySelectorAll('.story-tab-btn').forEach(btn => {
        const isActive = btn.id === `tab-btn-${key}`;
        btn.classList.toggle('bg-gold', isActive);
        btn.classList.toggle('text-dark', isActive);
        btn.classList.toggle('text-gray-400', !isActive);
    });

    // Content HTML
    const contentHtml = `
        <div class="md:col-span-7 space-y-6">
            <span class="text-xs uppercase tracking-widest text-gold font-mono font-semibold block">${section.badge}</span>
            <h3 class="font-serif text-2xl sm:text-4xl font-semibold tracking-tight text-white">${section.title}</h3>
            <div class="space-y-4 text-gray-300 font-sans leading-relaxed text-sm sm:text-base">
                ${section.paragraphs.map(p => `<p>${p}</p>`).join('')}
            </div>
            ${key === 'philosophy' ? `
                <div class="pt-4">
                    <a href="#download" class="inline-flex items-center space-x-2 text-gold hover:text-white font-medium text-sm border-b border-gold hover:border-white pb-0.5 transition-colors duration-300">
                        <span>See what daily life inside looks like</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </a>
                </div>
            ` : ''}
        </div>
        <div class="md:col-span-5 relative h-64 sm:h-80 md:h-[400px] w-full rounded-2xl overflow-hidden border border-gray-800/60 bg-emerald-950/20">
            <img src="assets/images/sukari_hero_1783232829580.jpg" class="w-full h-full object-cover grayscale opacity-20">
            <div class="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-emerald-950/90 to-transparent">
                <span class="text-[10px] font-mono tracking-widest text-gold">${section.badge}</span>
                <p class="text-white text-lg font-serif italic">${section.paragraphs[0].substring(0, 60)}...</p>
            </div>
        </div>
    `;
    
    gsap.to(panel, { opacity: 0, duration: 0.15, onComplete: () => {
        panel.innerHTML = contentHtml;
        lucide.createIcons();
        gsap.to(panel, { opacity: 1, duration: 0.25 });
    }});
};

window.switchComparison = function(method) {
    const card = document.getElementById('comparison-card');
    if (!card) return;
    
    const btnStrict = document.getElementById('comp-btn-strict');
    const btnSukari = document.getElementById('comp-btn-sukari');
    
    if (btnStrict && btnSukari) {
        if (method === 'strict') {
            btnStrict.className = 'px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer bg-red-950/80 text-red-400 border border-red-500/30';
            btnSukari.className = 'px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer bg-dark text-gray-400 hover:text-white';
        } else {
            btnSukari.className = 'px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer bg-emerald-950/80 text-gold border border-emerald-500/30';
            btnStrict.className = 'px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer bg-dark text-gray-400 hover:text-white';
        }
    }

    const html = method === 'strict' ? `
        <div class="bg-red-950/10 border border-red-900/30 rounded-2xl p-8 space-y-6">
            <div class="flex items-center space-x-3 text-red-400">
                <i data-lucide="flame" class="w-5 h-5"></i>
                <span class="font-mono text-xs uppercase tracking-widest font-bold">Road A: Starvation & Guilt</span>
            </div>
            <ul class="space-y-4 text-sm text-gray-300">
                <li><strong class="text-white">Strict Elimination:</strong> No ugali, no chapati.</li>
                <li><strong class="text-white">Solitary Isolation:</strong> Avoiding family lunches.</li>
                <li><strong class="text-white">The Guilt Spiral:</strong> Falling off the wagon.</li>
            </ul>
        </div>
    ` : `
        <div class="bg-dark border border-emerald-500/20 rounded-2xl p-8 space-y-6 shadow-2xl">
            <div class="flex items-center space-x-3 text-gold">
                <i data-lucide="shield-check" class="w-5 h-5"></i>
                <span class="font-mono text-xs uppercase tracking-widest font-bold">Road B: Sukari Smart Reset</span>
            </div>
            <ul class="space-y-4 text-sm text-gray-300">
                <li><strong class="text-white">Smart Local Pairing:</strong> Enjoy ugali with smart greens.</li>
                <li><strong class="text-white">Protected Joys:</strong> Confidence at the Sunday table.</li>
                <li><strong class="text-white">Compassionate Resets:</strong> No judgment, just progress.</li>
            </ul>
        </div>
    `;

    gsap.to(card, { opacity: 0, duration: 0.15, onComplete: () => {
        card.innerHTML = html;
        lucide.createIcons();
        gsap.to(card, { opacity: 1, duration: 0.25 });
    }});
};

// Membership Currency Switching
window.switchCurrency = function(curr) {
    const btnKES = document.getElementById('currency-kes');
    const btnUSD = document.getElementById('currency-usd');
    if (!btnKES || !btnUSD) return;
    
    const isKES = curr === 'KES';
    btnKES.className = isKES ? 'px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer bg-gold text-emerald-950 shadow' : 'px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer text-gray-400 hover:text-white';
    btnUSD.className = !isKES ? 'px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer bg-gold text-emerald-950 shadow' : 'px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer text-gray-400 hover:text-white';

    document.querySelectorAll('.pricing-value').forEach(el => {
        const val = isKES ? `KES ${parseInt(el.dataset.kes).toLocaleString()}` : `$${el.dataset.usd}`;
        el.innerText = val;
    });
};

window.toggleFAQ = function(idx) {
    const ans = document.getElementById(`faq-ans-${idx}`);
    const icon = document.getElementById(`faq-icon-${idx}`);
    if (!ans) return;
    const isHidden = ans.classList.contains('hidden');
    
    if (isHidden) {
        ans.classList.remove('hidden');
        gsap.from(ans, { height: 0, opacity: 0, duration: 0.3 });
        if (icon) gsap.to(icon, { rotate: 180, duration: 0.3 });
    } else {
        gsap.to(ans, { height: 0, opacity: 0, duration: 0.3, onComplete: () => ans.classList.add('hidden') });
        if (icon) gsap.to(icon, { rotate: 0, duration: 0.3 });
    }
};

// Download Page Logic
window.handleDownload = function(e) {
    const status = document.getElementById('download-status');
    if (!status) return;
    
    // Show download progress indicator
    status.classList.remove('hidden');
    gsap.from(status, { y: 10, opacity: 0, duration: 0.3 });
    
    // Hide after 10 seconds
    setTimeout(() => {
        gsap.to(status, { opacity: 0, duration: 1, onComplete: () => status.classList.add('hidden') });
    }, 10000);
    
    // The actual download is handled by the <a href> to GitHub Releases
    // No need to programmatically trigger anything — just let the link work
};


window.toggleGuide = function() {
    const guide = document.getElementById('apk-install-guide');
    if (!guide) return;
    const isHidden = guide.classList.contains('hidden');
    if (isHidden) {
        guide.classList.remove('hidden');
        gsap.from(guide, { height: 0, opacity: 0, duration: 0.4 });
    } else {
        gsap.to(guide, { height: 0, opacity: 0, duration: 0.4, onComplete: () => guide.classList.add('hidden') });
    }
};

// Payment Logic
let selectedTier = null;
let paymentMethod = 'mpesa';

function initPayment(tierId) {
    if (!appData.pricing_tiers) return;
    selectedTier = appData.pricing_tiers.find(t => t.id === tierId) || appData.pricing_tiers[1];
    
    const methods = document.getElementById('payment-methods');
    if (methods) {
        // Use style.display because the element uses inline style (avoids Tailwind hidden+grid conflict)
        methods.style.display = (selectedTier.id !== 'free') ? 'grid' : 'none';
    }
    
    renderPaymentForm();
    renderSummary();
}

window.switchPaymentMethod = function(m) {
    paymentMethod = m;
    const btnMpesa = document.getElementById('pay-mpesa');
    const btnCard = document.getElementById('pay-card');
    if (!btnMpesa || !btnCard) return;
    
    const isMpesa = m === 'mpesa';
    btnMpesa.className = isMpesa ? 'flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all cursor-pointer bg-emerald-950 text-gold border border-emerald-500/20 shadow' : 'flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all cursor-pointer text-gray-400 hover:text-white';
    btnCard.className = !isMpesa ? 'flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all cursor-pointer bg-emerald-950 text-gold border border-emerald-500/20 shadow' : 'flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all cursor-pointer text-gray-400 hover:text-white';
    
    renderPaymentForm();
};

function renderPaymentForm() {
    const form = document.getElementById('checkout-form');
    if (!form || !selectedTier) return;
    
    if (selectedTier.id === 'free') {
        form.innerHTML = `
            <div class="space-y-4">
                <input type="text" placeholder="Full Name" required class="w-full bg-dark border border-gray-800 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold">
                <input type="email" placeholder="Email Address" required class="w-full bg-dark border border-gray-800 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold">
            </div>
            <button type="submit" class="w-full py-4 bg-gold text-dark font-bold rounded-full uppercase text-xs tracking-wider hover:bg-white transition-all">Get Free Access</button>
        `;
    } else if (paymentMethod === 'mpesa') {
        form.innerHTML = `
            <div class="space-y-4">
                <input type="text" placeholder="Full Name" required class="w-full bg-dark border border-gray-800 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold">
                <input type="email" placeholder="Email" required class="w-full bg-dark border border-gray-800 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold">
                <input type="tel" id="checkout-phone" placeholder="Safaricom Number (e.g. 0712...)" required class="w-full bg-dark border border-gray-800 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold">
            </div>
            <button type="submit" class="w-full py-4 bg-gold text-dark font-bold rounded-full uppercase text-xs tracking-wider hover:bg-white transition-all">Trigger M-Pesa STK Push</button>
        `;
    } else {
        form.innerHTML = `
            <div class="space-y-4">
                <input type="text" placeholder="Cardholder Name" required class="w-full bg-dark border border-gray-800 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold">
                <input type="text" placeholder="Card Number" required class="w-full bg-dark border border-gray-800 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold">
                <div class="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" required class="w-full bg-dark border border-gray-800 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold">
                    <input type="text" placeholder="CVV" required class="w-full bg-dark border border-gray-800 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold">
                </div>
            </div>
            <button type="submit" class="w-full py-4 bg-gold text-dark font-bold rounded-full uppercase text-xs tracking-wider hover:bg-white transition-all">Authorize Payment</button>
        `;
    }
    lucide.createIcons();
}

function renderSummary() {
    const el = document.getElementById('order-summary');
    if (!el || !selectedTier) return;
    el.innerHTML = `
        <div class="flex justify-between items-start">
            <div><h4 class="text-white text-sm">${selectedTier.name}</h4></div>
            <div class="text-right text-gold font-bold">KES ${selectedTier.priceKES.toLocaleString()}</div>
        </div>
        <div class="pt-4 border-t border-gray-800 text-xs">
            <div class="flex justify-between text-white font-bold"><span>Total Due Today</span><span class="text-gold">KES ${selectedTier.priceKES.toLocaleString()}</span></div>
        </div>
    `;
}

window.handlePayment = function(e) {
    e.preventDefault();
    if (selectedTier.id !== 'free' && paymentMethod === 'mpesa') {
        const phone = document.getElementById('checkout-phone')?.value;
        const modal = document.getElementById('mpesa-modal');
        const amountEl = document.getElementById('mpesa-amount');
        if (amountEl) amountEl.innerText = `KES ${selectedTier.priceKES.toLocaleString()}`;
        if (modal) {
            modal.classList.remove('hidden');
            gsap.from(modal.querySelector('div'), { scale: 0.9, opacity: 0, duration: 0.3 });
        }
    } else {
        showSuccess();
    }
};

window.closeMpesa = function() {
    const modal = document.getElementById('mpesa-modal');
    if (modal) modal.classList.add('hidden');
};

window.confirmMpesa = function() {
    closeMpesa();
    showSuccess();
};

function showSuccess() {
    const main = document.getElementById('payment-main');
    const success = document.getElementById('payment-success');
    if (main) main.classList.add('hidden');
    if (success) {
        success.classList.remove('hidden');
        gsap.from(success, { scale: 0.9, opacity: 0, duration: 0.5 });
    }
    lucide.createIcons();
}

// Global UI Events
function setupEventListeners() {
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    
    if (mobileBtn && mobileDrawer) {
        mobileBtn.onclick = () => {
            const isHidden = mobileDrawer.classList.contains('hidden');
            if (isHidden) {
                mobileDrawer.classList.remove('hidden');
                gsap.from(mobileDrawer, { y: -20, opacity: 0, duration: 0.3 });
            } else {
                gsap.to(mobileDrawer, { y: -20, opacity: 0, duration: 0.3, onComplete: () => mobileDrawer.classList.add('hidden') });
            }
        };
        
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.onclick = () => mobileDrawer.classList.add('hidden');
        });
    }
}
