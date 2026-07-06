<!-- Sukari Companion Chat Widget -->
<div id="ai-chat-widget" class="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
    <!-- Chat Window -->
    <div id="chat-window" class="hidden w-[350px] sm:w-[400px] h-[500px] bg-[#121f18] border border-gold/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 scale-90 opacity-0 origin-bottom-right transition-all duration-300">
        <!-- Header -->
        <div class="bg-emerald-950 p-4 border-b border-gold/10 flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                    <i data-lucide="sparkles" class="w-4 h-4 text-gold"></i>
                </div>
                <div>
                    <h4 class="text-sm font-bold text-white leading-tight">Sukari Companion</h4>
                    <p class="text-[10px] text-gold font-mono uppercase tracking-widest">Always Listening</p>
                </div>
            </div>
            <button onclick="toggleChat()" class="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <!-- Messages Area -->
        <div id="chat-messages" class="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth">
            <!-- Welcome Message -->
            <div class="flex justify-start">
                <div class="bg-emerald-900/30 border border-emerald-500/10 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
                    <p class="text-xs sm:text-sm text-gray-200">Habari! I'm your Sukari Companion. How are you feeling today? Any questions about food pairing or staying Sukari Smart?</p>
                </div>
            </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-dark/50 border-t border-gray-800">
            <form id="chat-form" class="relative flex items-center">
                <input type="text" id="chat-input" placeholder="Ask anything..." class="w-full bg-[#0A1710] border border-gray-800 rounded-full py-3 px-5 pr-12 text-sm text-white outline-none focus:border-gold/50 transition-all">
                <button type="submit" class="absolute right-2 p-2 bg-gold text-emerald-950 rounded-full hover:bg-white transition-all cursor-pointer">
                    <i data-lucide="send" class="w-4 h-4"></i>
                </button>
            </form>
        </div>
    </div>

    <!-- Toggle Button -->
    <button onclick="toggleChat()" id="chat-toggle-btn" class="w-14 h-14 rounded-full bg-gold text-emerald-950 shadow-lg shadow-gold/10 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border-4 border-emerald-950/50">
        <i data-lucide="message-circle" id="chat-icon-open" class="w-6 h-6"></i>
        <i data-lucide="x" id="chat-icon-close" class="w-6 h-6 hidden"></i>
    </button>
</div>

<style>
    #chat-messages::-webkit-scrollbar {
        width: 4px;
    }
    #chat-messages::-webkit-scrollbar-track {
        background: transparent;
    }
    #chat-messages::-webkit-scrollbar-thumb {
        background: #1B4332;
        border-radius: 2px;
    }
</style>

<script>
    let isChatOpen = false;
    let chatMessages = [];

    function toggleChat() {
        const window = document.getElementById('chat-window');
        const openIcon = document.getElementById('chat-icon-open');
        const closeIcon = document.getElementById('chat-icon-close');
        
        isChatOpen = !isChatOpen;
        
        if (isChatOpen) {
            window.classList.remove('hidden');
            setTimeout(() => {
                window.classList.remove('scale-90', 'opacity-0');
                window.classList.add('scale-100', 'opacity-100');
            }, 10);
            openIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            lucide.createIcons();
        } else {
            window.classList.remove('scale-100', 'opacity-100');
            window.classList.add('scale-90', 'opacity-0');
            setTimeout(() => {
                window.classList.add('hidden');
            }, 300);
            openIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    document.getElementById('chat-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        // Add user message
        appendMessage('user', text);
        input.value = '';
        chatMessages.push({ role: 'user', content: text });

        // Add loading state
        const loadingId = 'loading-' + Date.now();
        appendMessage('ai', 'Thinking...', loadingId);

        try {
            const response = await fetch('api/ai.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: chatMessages })
            });

            const data = await response.json();
            
            // Remove loading
            document.getElementById(loadingId)?.parentElement?.parentElement?.remove();

            if (data.choices && data.choices[0].message) {
                const aiText = data.choices[0].message.content;
                appendMessage('ai', aiText);
                chatMessages.push({ role: 'assistant', content: aiText });
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (err) {
            console.error('Chat error:', err);
            document.getElementById(loadingId)?.parentElement?.parentElement?.remove();
            appendMessage('ai', "I'm sorry, I'm having trouble connecting right now. Please try again later.");
        }
    });

    function appendMessage(role, text, id = null) {
        const container = document.getElementById('chat-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'}`;
        
        msgDiv.innerHTML = `
            <div class="${role === 'user' ? 'bg-gold text-emerald-950 font-medium' : 'bg-emerald-900/30 border border-emerald-500/10 text-gray-200'} p-3 rounded-2xl ${role === 'user' ? 'rounded-br-none' : 'rounded-tl-none'} max-w-[85%]">
                <p class="text-xs sm:text-sm" ${id ? `id="${id}"` : ''}>${text}</p>
            </div>
        `;
        
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    }
</script>
