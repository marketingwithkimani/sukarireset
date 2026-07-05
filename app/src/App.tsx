import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  Home, Users, MessageCircle, Leaf, Activity,
  ArrowLeft, Send, Utensils, Timer, Heart,
  ChevronRight, Flame, Droplets, MessageSquare
} from 'lucide-react';
import { gsap } from 'gsap';

// ─── Assets ───────────────────────────────────────────────────────────────────
const IMAGES = {
  inflamed:  '/kenyan_man_inflamed.png',
  vital:     '/kenyan_man_vital.png',
  woman:     '/kenyan_woman_smiling_healthy_food_1783202423114.png',
  breakfast: '/kenyan_breakfast_mandazi_porridge_1783202439815.png',
  lunch:     '/kenyan_lunch_tilapia_1783201751479.png',
  supper:    '/kenyan_supper_stew_mchicha_1783201771237.png',
  smoothie:  '/vibrant_green_smoothie_mango_1783201783956.png',
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const communityPosts = [
  {
    id: 'p1', name: 'Grace M.', handle: '@grace_nairobi', avatar: '👩🏾',
    time: '2h ago', likes: 34, comments: 8,
    text: 'Day 7 of intermittent fasting done! 🎉 Bloating is completely gone. Ukweli, this Sukari Reset programme is different. Asante sana!',
    tag: 'Fasting Win',
  },
  {
    id: 'p2', name: 'Brian O.', handle: '@brianomondi', avatar: '👨🏿',
    time: '5h ago', likes: 21, comments: 5,
    text: 'Switched from white ugali to brown ugali two weeks ago. Energy levels all day, no afternoon crash. My wife thought I was lying 😂 This is real.',
    tag: 'Food Swap',
  },
  {
    id: 'p3', name: 'Wanjiku K.', handle: '@wanjiku_wellness', avatar: '👩🏾‍🦱',
    time: '1d ago', likes: 67, comments: 19,
    text: "Made the Mchicha & sweet potato stew from Kitchen. My husband had three helpings! He doesn't even know it was the sugar reset recipe 😅 Magically delicious.",
    tag: 'Recipe Love',
  },
  {
    id: 'p4', name: 'Samuel T.', handle: '@sam_fit50', avatar: '👨🏾',
    time: '1d ago', likes: 44, comments: 11,
    text: 'Blood sugar was 9.2 three months ago. Just got results: 5.8. Doctor asked what I changed. I said: my kitchen and my community. 🙌🏿',
    tag: 'Health Win',
  },
];

const challenges = [
  { title: 'No Sugar for 7 Days 🚫🍬', members: 847, days: '4 days left', joined: true },
  { title: '10,000 Steps Daily 🚶🏿', members: 512, days: '6 days left', joined: false },
  { title: 'Cook from Home All Week 🍲', members: 304, days: '2 days left', joined: false },
  { title: '2L Water Daily 💧', members: 1203, days: '1 day left', joined: true },
];

const wins = [
  { name: 'Samuel T.', avatar: '👨🏾', win: 'Blood sugar dropped from 9.2 to 5.8 in 3 months!', emoji: '📉' },
  { name: 'Grace M.', avatar: '👩🏾', win: 'Lost 8kg in 6 weeks. Bloating completely gone. Sleeping better than I have in years.', emoji: '🎉' },
  { name: 'Wanjiku K.', avatar: '👩🏾‍🦱', win: 'Stopped taking antacids. No more heartburn after meals since starting the fasting protocol.', emoji: '💊🚫' },
  { name: 'Brian O.', avatar: '👨🏿', win: 'Doctor reduced my blood pressure medication. Changed nothing except my diet.', emoji: '❤️' },
];

const recipes = {
  breakfast: [
    { id: 'b1', name: 'Wimbi Uji & Fresh Paw Paw', image: IMAGES.breakfast, score: 'A+', time: '10 min', desc: 'Finger millet porridge with fresh pawpaw. Anti-inflammatory, slow-release energy.' },
    { id: 'b2', name: 'Boiled Egg & Avocado Toast', image: IMAGES.lunch, score: 'A+', time: '8 min', desc: 'Whole grain bread, ripe avocado, soft boiled eggs. Protein + healthy fats.' },
    { id: 'b3', name: 'Chia & Mango Pudding', image: IMAGES.smoothie, score: 'A+', time: '5 min', desc: 'Overnight chia seeds with fresh mango and coconut milk. No sugar added.' },
  ],
  lunch: [
    { id: 'l1', name: 'Grilled Tilapia & Sukuma Wiki', image: IMAGES.lunch, score: 'A+', time: '25 min', desc: 'Grilled lake tilapia with sautéed sukuma wiki in garlic and olive oil.' },
    { id: 'l2', name: 'Lentil & Spinach Soup', image: IMAGES.supper, score: 'A+', time: '20 min', desc: 'Red lentils with fresh spinach, turmeric and ginger. Gut-healing.' },
    { id: 'l3', name: 'Nduma & Beans Bowl', image: IMAGES.breakfast, score: 'A+', time: '15 min', desc: 'Arrow root with slow-cooked black-eyed peas. Traditional and powerful.' },
  ],
  supper: [
    { id: 's1', name: 'Mchicha Stew & Brown Rice', image: IMAGES.supper, score: 'A+', time: '30 min', desc: 'Amaranth leaf stew in coconut milk. Served with brown basmati rice.' },
    { id: 's2', name: 'Roasted Chicken & Managu', image: IMAGES.lunch, score: 'A+', time: '40 min', desc: 'Free-range chicken with African nightshade greens in tomato base.' },
  ],
  smoothies: [
    { id: 'sm1', name: 'Mango & Spinach Power', image: IMAGES.smoothie, score: 'A+', time: '5 min', desc: 'Fresh mango, baby spinach, ginger, lemon. Full of antioxidants.' },
    { id: 'sm2', name: 'Avocado & Banana Reset', image: IMAGES.breakfast, score: 'A+', time: '5 min', desc: 'Creamy avocado, banana, flaxseed and almond milk. No refined sugar.' },
    { id: 'sm3', name: 'Beetroot & Carrot Cleanse', image: IMAGES.supper, score: 'A+', time: '5 min', desc: 'Raw beetroot, carrot, apple and ginger. Deep liver detox.' },
  ],
};

const wellnessSections = [
  {
    id: 'fasting', title: 'Intermittent Fasting', img: IMAGES.supper, emoji: '⏱️',
    tagline: 'Reset your metabolism',
    desc: 'Give your gut the rest it deserves. A 16:8 fasting window reduces inflammation, stabilises blood sugar, and rebuilds your digestive rhythm naturally.',
    tips: ['Start with 12 hours, build to 16', 'Black tea or water during fast window', 'Break fast gently with fruit or uji'],
  },
  {
    id: 'movement', title: 'Gentle Movement', img: IMAGES.lunch, emoji: '🚶🏿',
    tagline: 'Activate without stress',
    desc: 'A 20-minute walk after meals is one of the most powerful tools for blood sugar control. No gym required — just consistency.',
    tips: ['Walk 15–20 min after every meal', 'Morning stretch routine (10 min)', 'Avoid sitting for more than 45 min at a stretch'],
  },
  {
    id: 'kula', title: 'Kula Vizuri Principles', img: IMAGES.breakfast, emoji: '🌿',
    tagline: 'African ancestral wisdom',
    desc: 'Our ancestors ate seasonally, locally and simply. No processed sugar. No refined oils. Rich grains, legumes, greens, tubers — the original reset diet.',
    tips: ['Eat 5 colours of vegetables weekly', 'Replace refined carbs with tubers & legumes', 'Cook with groundnut oil or coconut oil'],
  },
  {
    id: 'hydration', title: 'Hydration & Herbs', img: IMAGES.smoothie, emoji: '💧',
    tagline: 'Heal from the inside out',
    desc: 'Water, herbal teas and natural infusions support kidney function, flush toxins and reduce inflammation. Add lemon, ginger or turmeric.',
    tips: ['2 litres of water daily minimum', 'Ginger & lemon tea every morning', 'Avoid sugary drinks and sodas completely'],
  },
];

const navItems = [
  { key: 'home',      icon: Home,          label: 'Home'      },
  { key: 'community', icon: Users,         label: 'Community' },
  { key: 'kitchen',   icon: Utensils,      label: 'Kitchen'   },
  { key: 'wellness',  icon: Leaf,          label: 'Wellness'  },
  { key: 'companion', icon: MessageCircle, label: 'Companion' },
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading]           = useState(true);
  const [loadPhase, setLoadPhase]       = useState<'before' | 'after'>('before');
  const [screen, setScreen]            = useState('home');
  const [communityTab, setCommunityTab] = useState<'feed' | 'challenges' | 'wins'>('feed');
  const [kitchenView, setKitchenView]  = useState<'hub' | 'category'>('hub');
  const [activeCat, setActiveCat]      = useState('breakfast');
  const [wellnessDetail, setWellnessDetail] = useState<string | null>(null);

  const shellRef       = useRef<HTMLDivElement>(null);
  const loadRef        = useRef<HTMLDivElement>(null);
  const imgInflamedRef = useRef<HTMLImageElement>(null);
  const imgVitalRef    = useRef<HTMLImageElement>(null);
  const textRef        = useRef<HTMLDivElement>(null);

  // ── Loading animation ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!loading) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loadRef.current, {
            opacity: 0, duration: 1.2, ease: 'power2.inOut',
            onComplete: () => setLoading(false),
          });
        },
      });
      tl.set(imgInflamedRef.current, { opacity: 1, scale: 1 })
        .set(imgVitalRef.current,    { opacity: 0, scale: 1.04 })
        .set(textRef.current,        { opacity: 0, y: 30 })
        .to(textRef.current,         { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
        .to(imgInflamedRef.current,  { opacity: 0, scale: 1.06, duration: 2, ease: 'power2.inOut' }, '+=1.2')
        .to(imgVitalRef.current,     { opacity: 1, scale: 1, duration: 2.5, ease: 'expo.out' }, '-=2')
        .to(textRef.current,         { opacity: 0, y: -10, duration: 0.5 }, '-=1.8')
        .set(textRef.current,        { y: 24, onComplete: () => setLoadPhase('after') })
        .to(textRef.current,         { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.1')
        .to({},                      { duration: 1.6 });
    }, loadRef);
    return () => ctx.revert();
  }, [loading]);

  // ── Screen reveal ──────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-reveal',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.07, delay: 0.05 }
      );
    }, shellRef);
    return () => ctx.revert();
  }, [loading, screen, kitchenView, wellnessDetail, communityTab]);

  // ── Shared nav click ──────────────────────────────────────────────────────
  function goTo(key: string) {
    setScreen(key);
    if (key === 'kitchen')   setKitchenView('hub');
    if (key === 'wellness')  setWellnessDetail(null);
    if (key === 'community') setCommunityTab('feed');
  }

  return (
    <div ref={shellRef} className="app-shell">

      {/* ── LOADING (absolute inside shell = phone-sized) ─────────────────── */}
      {loading && (
        <div ref={loadRef} className="loading-screen">
          <div className="loading-images-full">
            <img ref={imgInflamedRef} src={IMAGES.inflamed} className="loading-img-full" alt="Before" />
            <img ref={imgVitalRef}    src={IMAGES.vital}    className="loading-img-full" style={{ opacity: 0 }} alt="After" />
            <div className="loading-gradient-top" />
            <div className="loading-gradient-overlay" />
          </div>
          <div className="loading-brand"><span className="loading-brand-text">SUKARI RESET</span></div>
          <div ref={textRef} className="loading-text-block">
            {loadPhase === 'before' ? (
              <>
                <p className="loading-eyebrow">Feel this?</p>
                <p className="loading-message">The bloating. The fatigue. The frustration. You are not alone — and this is where it ends.</p>
              </>
            ) : (
              <>
                <p className="loading-eyebrow">This is you.</p>
                <p className="loading-message">Energised. Light. Alive. Your reset starts now.</p>
              </>
            )}
            <p className="loading-submessage">Sukari Reset • Kula Vizuri</p>
          </div>
        </div>
      )}

      {/* ── STATUS BAR ───────────────────────────────────────────────────── */}
      {!loading && (
        <div className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-battery" />
        </div>
      )}

      {/* ── SCREENS ──────────────────────────────────────────────────────── */}
      {!loading && (
        <div className="screen-container">

          {/* HOME */}
          {screen === 'home' && (
            <div className="screen-scroll px-5 pt-4">
              <header className="flex justify-between items-center mb-6 gsap-reveal">
                <div>
                  <p className="text-xs font-semibold text-[#8C9C94] uppercase tracking-widest mb-0.5">Welcome back</p>
                  <h1 className="text-2xl font-black text-[#1B4332]">Habari, Amina 👋</h1>
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-xl">
                  <img src={IMAGES.woman} className="w-full h-full object-cover" alt="Profile" />
                </div>
              </header>

              {/* Stats row */}
              <div className="flex gap-3 mb-5 gsap-reveal">
                {[
                  { icon: <Activity size={14} className="text-[#2D6A4F] mb-1" />, val: '6,240', label: 'Steps today' },
                  { icon: <Flame size={14} className="text-[#cfa85c] mb-1" />, val: 'A+', label: 'Nutrition score' },
                  { icon: <Droplets size={14} className="text-blue-400 mb-1" />, val: '1.6L', label: 'Water intake' },
                ].map((s, i) => (
                  <div key={i} className="stat-chip flex-1">
                    {s.icon}
                    <p className="text-xl font-black text-[#1B4332]">{s.val}</p>
                    <p className="text-[10px] text-[#8C9C94] font-semibold">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Sugar reset progress */}
              <div className="premium-card gsap-reveal mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="step-pulse" />
                      <span className="text-[10px] font-bold uppercase text-[#2D6A4F] tracking-widest">Day 14 — Sugar Reset</span>
                    </div>
                    <p className="text-3xl font-black text-[#1B4332]">14 <span className="text-sm font-medium text-[#8C9C94]">days sugar-free</span></p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F0FAF4] flex items-center justify-center"><span className="text-xl">🏆</span></div>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: '47%' }} /></div>
                <p className="text-[10px] text-[#8C9C94] font-medium mt-2">47% of 30-day goal · Keep going!</p>
              </div>

              {/* Intake quality */}
              <div className="premium-card gsap-reveal mb-4" style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-white/70 uppercase tracking-widest mb-2">Today's Intake Quality</h3>
                    <p className="text-5xl font-black text-white">A+</p>
                    <p className="text-xs text-white/80 font-medium mt-1 max-w-[220px]">No sugar spike detected. Excellent anti-inflammatory choices.</p>
                  </div>
                  <span className="text-4xl">✨</span>
                </div>
              </div>

              {/* Fasting window */}
              <div className="premium-card gsap-reveal mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-[#1B4332]">Fasting Window</h3>
                  <Timer size={18} className="text-[#2D6A4F]" />
                </div>
                <div className="flex gap-3 items-center">
                  <div className="fasting-badge">
                    <span className="text-lg font-black text-[#2D6A4F]">14:10</span>
                    <span className="text-[10px] text-[#8C9C94] font-semibold">Elapsed</span>
                  </div>
                  <div className="flex-1">
                    <div className="progress-track"><div className="progress-fill" style={{ width: '88%', background: '#cfa85c' }} /></div>
                    <p className="text-[10px] text-[#8C9C94] font-medium mt-1.5">16-hour goal · 1h 50m remaining</p>
                  </div>
                </div>
              </div>

              {/* Craving CTA */}
              <div className="premium-card gsap-reveal mb-4" style={{ background: '#FEF9F0', border: '1px solid rgba(207, 168, 92, 0.15)' }}>
                <h3 className="font-bold text-[#cfa85c] mb-1">Feeling a craving?</h3>
                <p className="text-xs text-[#8C9C94] mb-3">Tell your Companion — get an instant reset tip.</p>
                <button onClick={() => goTo('companion')} className="w-full py-3 rounded-2xl bg-[#cfa85c] text-white text-sm font-bold">
                  Open Companion →
                </button>
              </div>
            </div>
          )}

          {/* COMMUNITY */}
          {screen === 'community' && (
            <div className="screen-scroll" style={{ padding: 0 }}>
              {/* Sticky header */}
              <div className="px-5 pt-6 pb-3 sticky top-0 bg-white z-10 border-b border-gray-50 gsap-reveal">
                <h1 className="text-2xl font-black text-[#1B4332] mb-1">Community 🤝</h1>
                <p className="text-xs text-[#8C9C94] font-medium">Real people, real resets — your tribe</p>
                <div className="flex gap-6 mt-4">
                  {(['feed', 'challenges', 'wins'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setCommunityTab(tab)}
                      className={`pb-2 text-sm font-bold capitalize border-b-2 transition-colors ${
                        communityTab === tab
                          ? 'text-[#2D6A4F] border-[#2D6A4F]'
                          : 'text-[#8C9C94] border-transparent'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* FEED */}
              {communityTab === 'feed' && (
                <div className="px-5 pt-4 pb-4">
                  <div className="rounded-3xl overflow-hidden mb-4 gsap-reveal" style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)' }}>
                    <div className="p-5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">This Week's Challenge</p>
                      <p className="text-lg font-black text-white mb-1">No Sugar for 7 Days 🚫🍬</p>
                      <p className="text-xs text-white/70 mb-3">847 members joined · 4 days left</p>
                      <button className="px-4 py-2 bg-white rounded-full text-[#1B4332] text-xs font-black">Join Challenge</button>
                    </div>
                  </div>
                  <div className="space-y-4 gsap-reveal">
                    {communityPosts.map(post => (
                      <div key={post.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-50">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-[#F0FAF4] flex items-center justify-center text-xl flex-shrink-0">{post.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-sm text-[#1B4332]">{post.name}</p>
                              <span className="text-[10px] text-[#8C9C94]">{post.time}</span>
                            </div>
                            <p className="text-[10px] text-[#8C9C94]">{post.handle}</p>
                          </div>
                        </div>
                        <p className="text-sm text-[#374151] leading-relaxed mb-3">{post.text}</p>
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 bg-[#F0FAF4] text-[#2D6A4F] text-[10px] font-bold rounded-full">{post.tag}</span>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-[#8C9C94]"><Heart size={14} /><span className="text-xs font-semibold">{post.likes}</span></button>
                            <button className="flex items-center gap-1 text-[#8C9C94]"><MessageSquare size={14} /><span className="text-xs font-semibold">{post.comments}</span></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 bg-[#F9F8F5] rounded-3xl p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#2D6A4F] flex items-center justify-center text-sm">👤</div>
                    <input className="flex-1 text-sm text-[#8C9C94] bg-transparent outline-none" placeholder="Share your win today..." readOnly />
                    <Send size={16} className="text-[#2D6A4F]" />
                  </div>
                </div>
              )}

              {/* CHALLENGES */}
              {communityTab === 'challenges' && (
                <div className="px-5 pt-4 pb-4 space-y-4 gsap-reveal">
                  {challenges.map((c, i) => (
                    <div key={i} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-black text-[#1B4332] text-base flex-1 pr-3">{c.title}</p>
                        <button className={`px-3 py-1.5 rounded-full text-xs font-black flex-shrink-0 ${c.joined ? 'bg-[#F0FAF4] text-[#2D6A4F]' : 'bg-[#1B4332] text-white'}`}>
                          {c.joined ? '✓ Joined' : 'Join'}
                        </button>
                      </div>
                      <p className="text-xs text-[#8C9C94] font-semibold">{c.members.toLocaleString()} members · {c.days}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* WINS */}
              {communityTab === 'wins' && (
                <div className="px-5 pt-4 pb-4 space-y-4 gsap-reveal">
                  {wins.map((w, i) => (
                    <div key={i} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#F0FAF4] flex items-center justify-center text-xl">{w.avatar}</div>
                        <p className="font-bold text-sm text-[#1B4332]">{w.name}</p>
                        <span className="ml-auto text-2xl">{w.emoji}</span>
                      </div>
                      <p className="text-sm text-[#374151] leading-relaxed">{w.win}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* KITCHEN */}
          {screen === 'kitchen' && (
            <div className="screen-scroll" style={{ padding: 0 }}>
              {kitchenView === 'hub' ? (
                <>
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <img src={IMAGES.breakfast} alt="Kitchen" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(27,67,50,0.9) 0%,rgba(27,67,50,0.1) 100%)' }} />
                    <div className="absolute bottom-5 left-5">
                      <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1 gsap-reveal">Your Kitchen</p>
                      <h1 className="text-3xl font-black text-white gsap-reveal">Kitchen 🍽️</h1>
                    </div>
                  </div>
                  <div className="px-5 pt-5">
                    <p className="text-xs text-[#8C9C94] font-semibold uppercase tracking-widest mb-4 gsap-reveal">Choose a meal category</p>
                    <div className="grid grid-cols-2 gap-3 gsap-reveal">
                      {[
                        { key: 'breakfast', label: 'Breakfast', emoji: '🌅', count: 3, img: IMAGES.breakfast },
                        { key: 'lunch',     label: 'Lunch',     emoji: '☀️', count: 3, img: IMAGES.lunch    },
                        { key: 'supper',    label: 'Supper',    emoji: '🌙', count: 2, img: IMAGES.supper   },
                        { key: 'smoothies', label: 'Smoothies', emoji: '🥤', count: 3, img: IMAGES.smoothie },
                      ].map(cat => (
                        <div key={cat.key} className="kitchen-cat-card" onClick={() => { setActiveCat(cat.key); setKitchenView('category'); }}>
                          <img src={cat.img} alt={cat.label} className="kitchen-cat-img" />
                          <div className="kitchen-cat-overlay" />
                          <div className="kitchen-cat-content">
                            <span className="text-2xl">{cat.emoji}</span>
                            <p className="text-white font-black text-base mt-1">{cat.label}</p>
                            <p className="text-white/60 text-[10px] font-semibold">{cat.count} recipes</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-[#8C9C94] font-semibold uppercase tracking-widest mt-6 mb-3 gsap-reveal">Tonight's Recommendation</p>
                    <div className="flex gap-3 items-center bg-white rounded-2xl p-3 shadow-sm mb-4 gsap-reveal" onClick={() => { setActiveCat('supper'); setKitchenView('category'); }}>
                      <img src={IMAGES.supper} alt="Recipe" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#cfa85c] uppercase tracking-widest">Supper Pick</span>
                        <p className="font-bold text-[#1B4332] text-sm mt-0.5">Mchicha Stew & Brown Rice</p>
                        <p className="text-[10px] text-[#8C9C94] mt-0.5">30 min · Anti-inflammatory · A+</p>
                      </div>
                      <ChevronRight size={16} className="text-[#8C9C94] flex-shrink-0" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-5 pt-5 pb-4">
                  <button onClick={() => setKitchenView('hub')} className="flex items-center gap-2 mb-5 text-sm font-bold text-[#2D6A4F] gsap-reveal">
                    <ArrowLeft size={16} /> Kitchen
                  </button>
                  <h2 className="text-2xl font-black text-[#1B4332] capitalize mb-1 gsap-reveal">{activeCat}</h2>
                  <p className="text-xs text-[#8C9C94] font-medium mb-5 gsap-reveal">Anti-inflammatory, sugar-reset approved</p>
                  <div className="space-y-4 gsap-reveal">
                    {(recipes[activeCat as keyof typeof recipes] || []).map((r: any) => (
                      <div key={r.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50 flex">
                        <img src={r.image} className="w-28 h-full object-cover flex-shrink-0" style={{ minHeight: '100px' }} alt={r.name} />
                        <div className="p-4 flex flex-col justify-between flex-1">
                          <div>
                            <span className="text-[10px] font-black text-[#cfa85c] uppercase tracking-widest">{r.score}</span>
                            <p className="font-bold text-[#1B4332] text-sm mt-0.5 leading-tight">{r.name}</p>
                            <p className="text-[10px] text-[#8C9C94] mt-1 leading-relaxed">{r.desc}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Timer size={11} className="text-[#8C9C94]" />
                            <span className="text-[10px] text-[#8C9C94] font-semibold">{r.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* WELLNESS */}
          {screen === 'wellness' && (
            <div className="screen-scroll" style={{ padding: 0 }}>
              {wellnessDetail === null ? (
                <div className="px-5 pt-6 pb-4">
                  <h1 className="text-2xl font-black text-[#1B4332] mb-1 gsap-reveal">Wellness 🌿</h1>
                  <p className="text-xs text-[#8C9C94] font-medium mb-5 gsap-reveal">Four pillars of your Sukari Reset</p>
                  <div className="space-y-3 gsap-reveal">
                    {wellnessSections.map(sec => (
                      <div key={sec.id} className="relative h-36 rounded-3xl overflow-hidden cursor-pointer" onClick={() => setWellnessDetail(sec.id)}>
                        <img src={sec.img} alt={sec.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(27,67,50,0.88) 0%,rgba(27,67,50,0.2) 100%)' }} />
                        <div className="absolute inset-0 p-5 flex flex-col justify-center">
                          <span className="text-2xl mb-1">{sec.emoji}</span>
                          <p className="text-white font-black text-lg leading-tight">{sec.title}</p>
                          <p className="text-white/60 text-xs font-medium mt-0.5">{sec.tagline}</p>
                        </div>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2">
                          <ChevronRight size={20} className="text-white/60" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-3xl p-5 gsap-reveal" style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)' }}>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Today's Tip</p>
                    <p className="text-white font-bold text-base mb-1">Drink ginger & lemon water first thing</p>
                    <p className="text-white/70 text-xs leading-relaxed">Before any food or chai — warm water with lemon juice and grated ginger kick-starts digestion and reduces inflammation.</p>
                  </div>
                </div>
              ) : (() => {
                const sec = wellnessSections.find(s => s.id === wellnessDetail)!;
                return (
                  <div className="px-5 pt-5 pb-4">
                    <button onClick={() => setWellnessDetail(null)} className="flex items-center gap-2 mb-5 text-sm font-bold text-[#2D6A4F] gsap-reveal">
                      <ArrowLeft size={16} /> Wellness
                    </button>
                    <div className="relative h-52 rounded-3xl overflow-hidden mb-5 gsap-reveal">
                      <img src={sec.img} alt={sec.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(27,67,50,0.8) 0%,transparent 60%)' }} />
                      <div className="absolute bottom-5 left-5">
                        <span className="text-3xl">{sec.emoji}</span>
                        <p className="text-white text-2xl font-black">{sec.title}</p>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#cfa85c] mb-2 gsap-reveal">{sec.tagline}</p>
                    <p className="text-[#374151] text-sm leading-relaxed mb-6 gsap-reveal">{sec.desc}</p>
                    <p className="text-xs font-black uppercase tracking-widest text-[#1B4332] mb-3 gsap-reveal">Key Practices</p>
                    <div className="space-y-3 gsap-reveal">
                      {sec.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-sm">
                          <div className="w-6 h-6 rounded-full bg-[#F0FAF4] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-black text-[#2D6A4F]">{i + 1}</span>
                          </div>
                          <p className="text-sm text-[#374151] leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* COMPANION */}
          {screen === 'companion' && (
            <div className="screen-scroll" style={{ padding: 0 }}>
              <div className="px-5 pt-6 pb-4 border-b border-gray-50 gsap-reveal">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] flex items-center justify-center text-2xl">👩🏾‍⚕️</div>
                  <div>
                    <h2 className="text-lg font-black text-[#1B4332]">Companion</h2>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <p className="text-xs font-bold text-[#2D6A4F]">Online — here for you</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-5 py-5 space-y-4 gsap-reveal">
                <div className="chat-bubble chat-bubble-companion">Habari! 🌿 I'm your Sukari Reset companion. How are you feeling today? Any cravings or discomfort?</div>
                <div className="chat-bubble chat-bubble-companion">Remember — every craving is just your body asking for something. Tell me what you're feeling and we'll reset together.</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['I have a sugar craving 🍬','I feel bloated 😣','What should I eat now?','Help me break a fast 🕐'].map(r => (
                    <button key={r} className="px-3 py-2 bg-[#F0FAF4] text-[#2D6A4F] text-xs font-bold rounded-full border border-[#2D6A4F]/10">{r}</button>
                  ))}
                </div>
                <div className="bg-[#FEF9F0] rounded-3xl p-4 border border-[#E67E22]/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#cfa85c] mb-1">Yesterday's Note</p>
                  <p className="text-sm text-[#374151]">You mentioned feeling sluggish at 3pm. Try adding a small handful of groundnuts to your lunch — healthy fat keeps energy stable. 💪🏿</p>
                </div>
              </div>
              <div className="px-5 pb-4 flex gap-3 bg-white border-t border-gray-50 mt-2">
                <input className="app-input flex-1" placeholder="Talk to your companion..." />
                <button className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center flex-shrink-0"><Send size={18} /></button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────── */}
      {!loading && (
        <div className="bottom-nav-container">
          <div className="bottom-nav">
            {navItems.map(({ key, icon: Icon, label }) => {
              const active = screen === key;
              return (
                <button key={key} className={`nav-item ${active ? 'active' : ''}`} onClick={() => goTo(key)}>
                  {active && <div className="nav-item-active-bg" />}
                  <Icon size={22} className={active ? 'text-[#2D6A4F]' : 'text-[#8C9C94]'} strokeWidth={active ? 2.5 : 1.8} />
                  <span className="nav-label">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
