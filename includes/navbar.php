<nav class="fixed top-0 left-0 right-0 z-50 bg-[#0A1710]/85 backdrop-blur-md border-b border-[#cfa85c]/10 text-white transition-all duration-300">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <!-- Logo -->
        <a id="logo-btn" href="#home" class="flex items-center space-x-2 group cursor-pointer focus:outline-none">
            <div class="w-10 h-10 rounded-full bg-emerald-950 border border-[#cfa85c]/30 flex items-center justify-center text-[#cfa85c] group-hover:bg-[#cfa85c] group-hover:text-emerald-950 transition-all duration-300">
                <i data-lucide="heart" class="w-5 h-5 fill-current"></i>
            </div>
            <span class="font-display font-bold text-xl tracking-tight text-white group-hover:text-[#cfa85c] transition-colors duration-300">
                Sukari <span class="text-[#cfa85c]">Reset</span>
            </span>
            <span class="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-mono bg-[#cfa85c]/10 text-[#cfa85c] rounded-full border border-[#cfa85c]/20">
                Kenya
            </span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
            <a href="#home" class="nav-link relative py-2 font-sans text-sm tracking-wide transition-colors duration-300 hover:text-[#cfa85c] cursor-pointer focus:outline-none text-gray-300" data-page="home">
                The Story
                <div class="nav-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-[#cfa85c] scale-x-0 transition-transform duration-300 origin-center"></div>
            </a>
            <a href="#download" class="nav-link relative py-2 font-sans text-sm tracking-wide transition-colors duration-300 hover:text-[#cfa85c] cursor-pointer focus:outline-none text-gray-300" data-page="download">
                The Companion App
                <div class="nav-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-[#cfa85c] scale-x-0 transition-transform duration-300 origin-center"></div>
            </a>
            <a href="#membership" class="nav-link relative py-2 font-sans text-sm tracking-wide transition-colors duration-300 hover:text-[#cfa85c] cursor-pointer focus:outline-none text-gray-300" data-page="membership">
                Membership Circle
                <div class="nav-indicator absolute bottom-0 left-0 right-0 h-0.5 bg-[#cfa85c] scale-x-0 transition-transform duration-300 origin-center"></div>
            </a>
        </div>

        <!-- Action Button -->
        <div class="hidden md:flex items-center">
            <a href="#membership" class="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#cfa85c] text-[#0A1710] hover:bg-white hover:text-emerald-950 hover:shadow-lg hover:shadow-[#cfa85c]/10 transition-all duration-300 font-sans font-medium text-sm tracking-wide cursor-pointer">
                <span>Join the Reset</span>
                <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
            </a>
        </div>

        <!-- Mobile Menu Trigger -->
        <div class="flex md:hidden items-center">
            <button id="mobile-menu-toggle" class="p-2 text-gray-300 hover:text-[#cfa85c] focus:outline-none focus:ring-0">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
        </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div id="mobile-nav-drawer" class="hidden md:hidden absolute top-20 left-0 right-0 bg-[#0A1710] border-b border-[#cfa85c]/10 px-6 py-6 space-y-4 flex flex-col shadow-2xl">
        <a href="#home" class="mobile-nav-link text-left py-2.5 font-sans text-base font-medium tracking-wide border-b border-gray-800/50 text-gray-300" data-page="home">The Story</a>
        <a href="#download" class="mobile-nav-link text-left py-2.5 font-sans text-base font-medium tracking-wide border-b border-gray-800/50 text-gray-300" data-page="download">The Companion App</a>
        <a href="#membership" class="mobile-nav-link text-left py-2.5 font-sans text-base font-medium tracking-wide border-b border-gray-800/50 text-gray-300" data-page="membership">Membership Circle</a>
        <a href="#membership" class="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-[#cfa85c] text-[#0A1710] font-medium text-center tracking-wide">
            <span>Join the Reset</span>
            <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
        </a>
    </div>
</nav>
