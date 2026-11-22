import  { useState } from 'react';

const PHONE_TABS_DATA = {
  local: [
    { title: 'Cyberpunk_Edgerunners_S01E10.mkv', meta: '3840x2160 • HEVC 10-bit', badge: 'FFMPEG EAC3 5.1', duration: '24:10' },
    { title: 'Dune_Part_Two_2024_REMUX.mkv', meta: '4K HDR10 • DTS-HD MA', badge: 'FFMPEG DTS', duration: '2:46:12' },
    { title: 'Interstellar_IMAX_70mm.mp4', meta: '1080p • AC3 5.1 Surround', badge: 'HW+ DECODER', duration: '2:49:04' }
  ],
  iptv: [
    { title: 'NHK World Japan HD', meta: 'Live News • HLS 1080p60', badge: 'LIVE • M3U8', duration: 'LIVE' },
    { title: 'Red Bull TV Global', meta: 'Extreme Sports • Adaptive HLS', badge: 'LIVE • 4K', duration: 'LIVE' },
    { title: 'NASA Earth Observation', meta: 'Nature & Space • Direct Feed', badge: 'LIVE • HD', duration: 'LIVE' }
  ],
  vod: [
    { title: "Frieren: Beyond Journey's End", meta: 'Episode 28 • Direct HLS Stream', badge: '1080P • ASS SUB', duration: '24:35' },
    { title: 'Spider-Man: Across the Spider-Verse', meta: 'Movie • Multi-Audio HTTP', badge: '4K • EAC3', duration: '2:20:05' },
    { title: 'Solo Leveling — Arise', meta: 'Season 2 • Direct Stream', badge: '1080P • HLS', duration: '23:50' }
  ]
};

const SPEC_CONTENT = {
  containers: {
    title: 'Supported Video & Streaming Containers',
    subtitle: 'Direct playback from local storage, external intents (Telegram/File Managers), and HTTP/HTTPS network endpoints.',
    items: [
      { name: 'Matroska (.MKV)', tag: 'Multi-Track', desc: 'Full support for multi-audio tracks, chapters, and embedded soft subtitles.' },
      { name: 'HLS (.M3U8)', tag: 'Adaptive Live/VOD', desc: 'Smooth bitrate switching for Live IPTV channels and HTTP VOD streams.' },
      { name: 'MP4 / WebM / AVI', tag: 'Hardware Accelerated', desc: 'Zero-latency MediaCodec rendering for HEVC (H.265), AVC (H.264), VP9, and AV1.' },
      { name: 'MPEG-DASH (.MPD)', tag: 'Segmented Stream', desc: 'Supports modern segmented adaptive streaming manifests.' }
    ]
  },
  audio: {
    title: 'Hybrid Hardware + Native C++ FFmpeg Audio Pipeline',
    subtitle: 'Automatic fallback to custom-compiled NDK libffmpeg.so whenever Android hardware decoders lack proprietary licenses.',
    items: [
      { name: 'EAC3 (Dolby Digital Plus)', tag: 'FFmpeg NDK', desc: 'Crystal-clear 5.1 & 7.1 surround downmixing via native C++ software decoding.' },
      { name: 'DTS / DTS-HD', tag: 'FFmpeg NDK', desc: 'Full support for Blu-ray and high-bitrate MKV DTS audio streams.' },
      { name: 'AC3 / TrueHD', tag: 'FFmpeg NDK', desc: 'Seamless playback without external codec packs or third-party plugins.' },
      { name: 'AAC / Opus / FLAC', tag: 'Lossless & Spatial', desc: 'High-efficiency stereo and lossless audio with up to 200% software volume boost.' }
    ]
  },
  subtitles: {
    title: 'Precision Subtitle & Styling Engine',
    subtitle: 'Engineered for anime typesetting and international cinema.',
    items: [
      { name: 'ASS / SSA', tag: 'Anime Typesetting', desc: 'Preserves custom positioning, colors, and styled dialogue tracks.' },
      { name: 'SubRip (.SRT)', tag: 'Universal', desc: 'Instant external subtitle loading and custom font scaling.' },
      { name: 'WebVTT (.VTT)', tag: 'HLS / Web Streams', desc: 'Native synchronization with live and on-demand HTTP streams.' },
      { name: 'Embedded MKV Tracks', tag: 'Instant Toggle', desc: 'Switch between multiple language subtitle tracks on the fly.' }
    ]
  }
};

const BRIGHTNESS_LEVELS = ['60%', '85%', '100%', '40%'];
const VOLUME_LEVELS = ['100%', '120%', '150%', '200%'];

export default function App() {
  // Navigation & Modal States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Interactive Phone Mockup States
  const [phoneTab, setPhoneTab] = useState('local');
  const [selectedStreamIdx, setSelectedStreamIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [brightnessIdx, setBrightnessIdx] = useState(1);
  const [volumeIdx, setVolumeIdx] = useState(1);

  // Interactive Codec Spec Matrix State
  const [specTab, setSpecTab] = useState('containers');

  const currentStream = PHONE_TABS_DATA[phoneTab][selectedStreamIdx];
  const progressWidth = phoneTab === 'iptv' ? '100%' : `${45 + selectedStreamIdx * 22}%`;
  const currentSpec = SPEC_CONTENT[specTab];

  const handleTabSwitch = (tabKey) => {
    setPhoneTab(tabKey);
    setSelectedStreamIdx(0);
  };

  const handleCopyPrivacyUrl = async () => {
    const url = `${window.location.origin}${window.location.pathname}#privacy`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2200);
    } catch {
      // Fallback for older browsers
      const tempInput = document.createElement('input');
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2200);
    }
  };

  return (
    <div className="bg-obsidian text-slate-100 antialiased selection:bg-neonPink selection:text-white min-h-screen">
      {/* Reusable SVG Definitions for Pulsar Vortex Logo */}
      <svg width="0" height="0" className="hidden" aria-hidden="true">
        <defs>
          <radialGradient id="pvBaseGlow" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#1A0D18" />
            <stop offset="60%" stopColor="#0E070D" />
            <stop offset="100%" stopColor="#060205" />
          </radialGradient>
          <linearGradient id="pvOrbitHotPink" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF007F" />
            <stop offset="50%" stopColor="#FF1493" />
            <stop offset="100%" stopColor="#FF69B4" />
          </linearGradient>
          <linearGradient id="pvOrbitRose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D946EF" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#FDA4AF" />
          </linearGradient>
          <linearGradient id="pvCorePink" x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FFB5D5" />
            <stop offset="100%" stopColor="#FF1493" />
          </linearGradient>
        </defs>
      </svg>

      {/* ==================== 1. STICKY GLASS NAVBAR ==================== */}
      <header className="fixed top-0 inset-x-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
              <img src="/Streamlogo.svg" alt="StreamPlayer" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-base sm:text-lg text-white leading-none">STREAMPLAYER</span>
              <span className="text-[10px] font-semibold tracking-[0.22em] text-pink-300/80 uppercase mt-1">Ultra HD Media Engine</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-pink-100/75">
            <a href="#features" className="hover:text-pink-400 transition-colors">Features</a>
            <a href="#engine" className="hover:text-pink-400 transition-colors">Codec Engine</a>
            <a href="#download" className="hover:text-pink-400 transition-colors">Download</a>
            <a href="#privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="btn-neon px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download APK</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              className="md:hidden p-2.5 rounded-xl bg-white/5 border border-pink-500/20 text-pink-200 hover:bg-pink-500/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-5 bg-velvet/95 border-b border-pink-500/20 space-y-2">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-pink-100 hover:bg-pink-500/15">Features</a>
            <a href="#engine" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-pink-100 hover:bg-pink-500/15">Codec &amp; Stream Engine</a>
            <a href="#download" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-pink-100 hover:bg-pink-500/15">Download Release APK</a>
            <a href="#privacy" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-pink-100 hover:bg-pink-500/15">Privacy Policy</a>
          </div>
        )}
      </header>

      {/* ==================== 2. HERO SECTION ==================== */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-grid overflow-hidden">
        <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-neonPink/15 blur-[130px] animate-pulse-glow"></div>
        <div className="pointer-events-none absolute top-48 right-10 w-[340px] h-[340px] rounded-full bg-deepMagenta/15 blur-[110px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-200 text-xs font-semibold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-neonPink animate-ping"></span>
                <span>v1.0.1 PreRelease &bull; v2.0.1 Latest &bull; Android 8.0+ &bull; Zero Ads</span>
              </div>

              <p className="text-xs sm:text-sm font-bold tracking-[0.32em] text-neonPink uppercase mb-3">
                BINGE ANYTHING
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
                <span className="text-white">Binge Anything.</span><br />
                <span className="pink-gradient-text">Zero Limits.</span>
              </h1>

              <p className="text-base sm:text-lg text-pink-100/75 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
                Engineered with <span className="text-white font-semibold">AndroidX Media3</span> and custom native <span className="text-pink-300 font-semibold">C++ FFmpeg decoders</span>. Play 4K HDR local MKVs with EAC3 5.1 &amp; DTS audio, watch global Live IPTV channels, and stream modern movies &amp; anime via direct HTTP/HLS pipelines.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <button
                  onClick={() => setDownloadModalOpen(true)}
                  className="w-full sm:w-auto btn-neon px-7 py-4 rounded-2xl text-sm sm:text-base font-bold text-white flex items-center justify-center gap-3 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download StreamPlayer APK</span>
                </button>

                <a
                  href="#engine"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm sm:text-base font-semibold text-pink-100 bg-white/5 hover:bg-pink-500/15 border border-pink-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>View Architecture</span>
                  <svg className="w-4 h-4 text-neonPink" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 pt-6 border-t border-pink-500/15">
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-white">libffmpeg<span className="text-neonPink">.so</span></div>
                  <div className="text-xs text-pink-200/60 mt-0.5">Native NDK Audio</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-white">4K <span className="text-pastelRose">HDR10</span></div>
                  <div className="text-xs text-pink-200/60 mt-0.5">HEVC / AV1 Hardware</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-extrabold text-white">0 <span className="text-deepMagenta">Trackers</span></div>
                  <div className="text-xs text-pink-200/60 mt-0.5">100% Local-First</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Android Device Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] animate-float">
                <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-neonPink/25 via-deepMagenta/15 to-transparent blur-2xl pointer-events-none"></div>

                <div className="relative rounded-[2.6rem] p-3 bg-gradient-to-b from-pink-400/30 via-pink-950/50 to-black border border-pink-400/30 shadow-2xl shadow-pink-950/80">
                  <div className="rounded-[2.1rem] bg-[#0B0409] overflow-hidden border border-white/5">
                    
                    {/* Android Status Bar */}
                    <div className="px-5 pt-3 pb-2 flex items-center justify-between text-[10px] font-mono text-pink-200/70">
                      <span>15:40</span>
                      <div className="w-16 h-4 rounded-full bg-black border border-white/10"></div>
                      <span className="text-neonPink font-bold">5G &bull; 100%</span>
                    </div>

                    {/* Simulated Video Viewport */}
                    <div className="relative h-48 mx-3 mt-1 rounded-2xl overflow-hidden bg-gradient-to-br from-[#28091E] via-[#13050F] to-[#080206] border border-pink-500/25 flex flex-col justify-between p-3">
                      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
                        <svg viewBox="0 0 512 512" className="w-32 h-32 animate-spin-slow">
                          <g transform="translate(256, 256)">
                            <path d="M -160,0 A 160,160 0 1,1 0,160 L -12,120 A 120,120 0 1,0 -120,0 Z" fill="url(#pvOrbitRose)" />
                            <path d="M 160,0 A 160,160 0 1,1 0,-160 L 12,-120 A 120,120 0 1,0 120,0 Z" fill="url(#pvOrbitHotPink)" />
                          </g>
                        </svg>
                      </div>

                      {/* Top Player HUD */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="truncate">
                          <div className="text-xs font-bold text-white truncate">{currentStream.title}</div>
                          <div className="text-[10px] font-mono text-pink-300/80">{currentStream.meta}</div>
                        </div>
                        <span className="shrink-0 px-2 py-0.5 rounded-md bg-neonPink/25 border border-neonPink/50 text-[9px] font-mono font-bold text-pink-200">
                          {currentStream.badge}
                        </span>
                      </div>

                      {/* Center Interactive Controls */}
                      <div className="relative z-10 flex items-center justify-between px-1">
                        <button
                          onClick={() => setBrightnessIdx((prev) => (prev + 1) % BRIGHTNESS_LEVELS.length)}
                          title="Simulate Brightness Swipe"
                          className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 text-[10px] font-mono text-pastelRose hover:border-neonPink transition cursor-pointer"
                        >
                          ☀ <span>{BRIGHTNESS_LEVELS[brightnessIdx]}</span>
                        </button>

                        <button
                          onClick={() => setIsPlaying((prev) => !prev)}
                          aria-label="Toggle Demo Playback"
                          className="w-11 h-11 rounded-full bg-neonPink/90 hover:bg-neonPink text-white flex items-center justify-center shadow-lg shadow-neonPink/50 transition transform active:scale-90 cursor-pointer"
                        >
                          {isPlaying ? (
                            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                          )}
                        </button>

                        <button
                          onClick={() => setVolumeIdx((prev) => (prev + 1) % VOLUME_LEVELS.length)}
                          title="Simulate Volume Swipe"
                          className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 text-[10px] font-mono text-pastelRose hover:border-neonPink transition cursor-pointer"
                        >
                          🔊 <span>{VOLUME_LEVELS[volumeIdx]}</span>
                        </button>
                      </div>

                      {/* Bottom Seekbar */}
                      <div className="relative z-10">
                        <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
                          <div
                            style={{ width: progressWidth }}
                            className="h-full bg-gradient-to-r from-pastelRose to-neonPink rounded-full transition-all duration-500"
                          ></div>
                        </div>
                        <div className="flex justify-between text-[9px] font-mono text-pink-200/70 mt-1">
                          <span>16:24</span>
                          <span className="text-neonPink font-semibold">HW+ &bull; ASS SUB</span>
                          <span>24:10</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Tab Switcher */}
                    <div className="px-3 pt-3">
                      <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-white/5 border border-pink-500/15 text-[11px] font-semibold">
                        {[
                          { key: 'local', label: 'Local' },
                          { key: 'iptv', label: 'Live TV' },
                          { key: 'vod', label: 'Movies/Anime' }
                        ].map(({ key, label }) => (
                          <button
                            key={key}
                            onClick={() => handleTabSwitch(key)}
                            className={
                              phoneTab === key
                                ? 'py-1.5 rounded-lg bg-neonPink text-white shadow transition cursor-pointer'
                                : 'py-1.5 rounded-lg text-pink-200/70 hover:text-white transition cursor-pointer'
                            }
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Media List */}
                    <div className="p-3 space-y-2 min-h-[168px]">
                      {PHONE_TABS_DATA[phoneTab].map((item, idx) => (
                        <button
                          key={item.title}
                          onClick={() => setSelectedStreamIdx(idx)}
                          className={`w-full text-left p-2.5 rounded-xl bg-white/[0.04] hover:bg-pink-500/15 border transition flex items-center justify-between gap-2 cursor-pointer ${
                            selectedStreamIdx === idx ? 'border-neonPink/50 bg-pink-500/10' : 'border-pink-500/10'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-[11px] font-semibold text-white truncate">{item.title}</div>
                            <div className="text-[9px] text-pink-200/60 truncate mt-0.5">{item.meta}</div>
                          </div>
                          <span className="shrink-0 px-1.5 py-0.5 rounded bg-pink-500/20 text-[8px] font-mono font-bold text-pastelRose">
                            {item.duration}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Bottom Home Indicator */}
                    <div className="pb-2.5 pt-1 flex justify-center">
                      <div className="w-24 h-1 rounded-full bg-pink-200/25"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. BENTO CORE FEATURES GRID ==================== */}
      <section id="features" className="py-20 lg:py-28 relative border-t border-pink-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.28em] text-neonPink uppercase">Built for Enthusiasts</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
              Everything You Need to <span className="pink-gradient-text">Stream Without Friction</span>
            </h2>
            <p className="text-pink-100/70 text-sm sm:text-base">
              Designed from the ground up in Kotlin and C++ to deliver desktop-class audio/video decoding inside a featherweight Android package.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-card rounded-3xl p-7">
              <div className="w-12 h-12 rounded-2xl bg-neonPink/15 border border-neonPink/30 flex items-center justify-center text-neonPink mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Native C++ FFmpeg Audio</h3>
              <p className="text-sm text-pink-100/70 leading-relaxed">
                Never get hit with "Audio format not supported" again. Custom-compiled NDK <code className="text-pink-300 font-mono text-xs">libffmpeg.so</code> decodes <strong className="text-white">EAC3 5.1, AC3, DTS-HD, and TrueHD</strong> seamlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card rounded-3xl p-7">
              <div className="w-12 h-12 rounded-2xl bg-deepMagenta/15 border border-deepMagenta/30 flex items-center justify-center text-deepMagenta mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">4K HDR Hardware Playback</h3>
              <p className="text-sm text-pink-100/70 leading-relaxed">
                Powered by <strong className="text-white">AndroidX Media3 (ExoPlayer)</strong> with hardware-accelerated HEVC (H.265) &amp; AV1 decoding, multi-audio track switching, and styled <strong className="text-white">ASS/SSA</strong> anime subtitles.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-3xl p-7">
              <div className="w-12 h-12 rounded-2xl bg-pink-400/15 border border-pink-400/30 flex items-center justify-center text-pastelRose mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Live TV &amp; IPTV Hub</h3>
              <p className="text-sm text-pink-100/70 leading-relaxed">
                Built-in M3U playlist parser with instant category chips for <strong className="text-white">News, Sports, Movies, and Nature</strong>, smooth HLS adaptive bitrate switching, and zero-lag channel zapping.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card rounded-3xl p-7">
              <div className="w-12 h-12 rounded-2xl bg-neonPink/15 border border-neonPink/30 flex items-center justify-center text-neonPink mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Modular VOD &amp; Anime Engine</h3>
              <p className="text-sm text-pink-100/70 leading-relaxed">
                Browse modern films and anime series via open metadata catalogs and resolve direct <strong className="text-white">HTTP/HTTPS &amp; HLS (.m3u8)</strong> streams straight into the native player.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card rounded-3xl p-7">
              <div className="w-12 h-12 rounded-2xl bg-deepMagenta/15 border border-deepMagenta/30 flex items-center justify-center text-deepMagenta mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">MX-Style Tactile Gestures</h3>
              <p className="text-sm text-pink-100/70 leading-relaxed">
                Effortless one-handed playback controls: vertical left/right swipes for <strong className="text-white">brightness &amp; volume boost (up to 200%)</strong>, double-tap seek, pinch-to-zoom, and Picture-in-Picture.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card rounded-3xl p-7">
              <div className="w-12 h-12 rounded-2xl bg-pink-400/15 border border-pink-400/30 flex items-center justify-center text-pastelRose mb-5">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Featherweight &amp; Zero Telemetry</h3>
              <p className="text-sm text-pink-100/70 leading-relaxed">
                Built with native <code className="text-pink-300 font-mono text-xs">JSONObject</code> parsing and zero third-party ad or analytics SDKs. No login walls, no tracking—your library stays strictly on your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. INTERACTIVE CODEC & ENGINE SPEC SHOWCASE ==================== */}
      <section id="engine" className="py-20 lg:py-24 relative bg-velvet/70 border-t border-pink-500/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.28em] text-neonPink uppercase">Under The Hood</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3">
              Hybrid Media3 + <span className="pink-gradient-text">FFmpeg NDK Matrix</span>
            </h2>
            <p className="text-pink-100/70 text-sm sm:text-base max-w-2xl mx-auto">
              Inspect supported containers, hardware/software audio decoders, and subtitle engines built into <code className="text-pink-300 font-mono text-xs">com.ladrillocraftlabs.streamplayer</code>.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            {[
              { key: 'containers', label: 'Video & Stream Containers' },
              { key: 'audio', label: 'FFmpeg & HW Audio Codecs' },
              { key: 'subtitles', label: 'Subtitles & Rendering' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSpecTab(key)}
                className={
                  specTab === key
                    ? 'px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-neonPink text-white shadow-lg shadow-neonPink/30 transition cursor-pointer'
                    : 'px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/5 text-pink-200/80 border border-pink-500/20 hover:border-neonPink/50 transition cursor-pointer'
                }
              >
                {label}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white">{currentSpec.title}</h3>
              <p className="text-xs sm:text-sm text-pink-200/70 mt-1">{currentSpec.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentSpec.items.map((item) => (
                <div key={item.name} className="p-4 rounded-2xl bg-black/40 border border-pink-500/15">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-white text-sm">{item.name}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-neonPink/15 border border-neonPink/30 text-[10px] font-mono font-semibold text-pastelRose">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-pink-100/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. DOWNLOAD SECTION ==================== */}
      <section id="download" className="py-20 lg:py-24 relative border-t border-pink-500/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-[2.25rem] p-8 sm:p-12 relative overflow-hidden border-pink-500/30">
            <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-neonPink/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pastelRose text-xs font-mono mb-4">
                  com.ladrillocraftlabs.streamplayer
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                  Ready to Upgrade Your Android Playback?
                </h2>
                <p className="text-pink-100/75 text-sm sm:text-base leading-relaxed">
                  Install the signed release build for Android 8.0 (Oreo) through Android 15+. Available via direct release APK and partner app stores including Aptoide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => setDownloadModalOpen(true)}
                  className="btn-neon px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-white flex items-center justify-center gap-3 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Get Release APK (v2.0.1)</span>
                </button>
                <a
                  href="#privacy"
                  className="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-pink-200 bg-white/5 hover:bg-pink-500/15 border border-pink-500/20 text-center transition"
                >
                  Read App Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 6. OFFICIAL PRIVACY POLICY SECTION ==================== */}
      <section id="privacy" className="py-20 lg:py-28 relative bg-velvet/90 border-t border-pink-500/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold tracking-[0.28em] text-neonPink uppercase">Legal &amp; Store Compliance</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3">
              Privacy Policy — StreamPlayer
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-pink-200/70">
              <span>Effective Date: <strong className="text-white">November 18, 2026</strong></span>
              <span>&bull;</span>
              <span>Package: <strong className="text-pastelRose">com.ladrillocraftlabs.streamplayer</strong></span>
              <span>&bull;</span>
              <span>Developer: <strong className="text-white">Ladrillo Craft Labs</strong></span>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-10 space-y-8 text-sm sm:text-base text-pink-100/80 leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-neonPink font-mono">01.</span> Overview
              </h3>
              <p>
                Ladrillo Craft Labs ("we," "our," or "us") built <strong className="text-white">StreamPlayer</strong> (<code className="text-pink-300 font-mono text-xs">com.ladrillocraftlabs.streamplayer</code>) as a free, lightweight media player application. Your privacy is important to us. This Privacy Policy explains how StreamPlayer handles device permissions, local media files, and network requests when you use our application.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-neonPink font-mono">02.</span> Information Collection and Use
              </h3>
              <p className="mb-3">
                <strong className="text-white">We do not collect, store, sell, or transmit any personally identifiable information (PII).</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-pink-100/75">
                <li><strong className="text-pink-200">No Account Required:</strong> StreamPlayer does not require user registration, login credentials, phone numbers, or email addresses to operate.</li>
                <li><strong className="text-pink-200">No Analytics or Tracking SDKs:</strong> We do not integrate third-party advertising networks, behavioral trackers, or invasive telemetry SDKs.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-neonPink font-mono">03.</span> Android Permissions We Request and Why
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-pink-100/75">
                <li>
                  <strong className="text-pink-200">Storage / Media Access (<code className="font-mono text-xs text-pastelRose">READ_MEDIA_VIDEO</code>, <code className="font-mono text-xs text-pastelRose">READ_EXTERNAL_STORAGE</code>):</strong> Used strictly on-device to scan, list, and play video and audio files stored locally on your Android device. Your local media library is never uploaded or shared externally.
                </li>
                <li>
                  <strong className="text-pink-200">Internet &amp; Network State (<code className="font-mono text-xs text-pastelRose">INTERNET</code>, <code className="font-mono text-xs text-pastelRose">ACCESS_NETWORK_STATE</code>):</strong> Used exclusively to stream user-provided network URLs, IPTV playlists (M3U), and retrieve public media metadata (such as titles, posters, and episode details) from open third-party metadata APIs.
                </li>
                <li>
                  <strong className="text-pink-200">Wake Lock &amp; Picture-in-Picture / Audio Focus:</strong> Used to keep the display active during video playback and support floating-window or background audio playback.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-neonPink font-mono">04.</span> Third-Party Services &amp; User-Provided Streams
              </h3>
              <p>
                StreamPlayer may query open, public metadata databases over HTTPS to display movie, series, or anime artwork and descriptions. When you open direct stream URLs, IPTV playlists, or third-party add-on endpoints, your device connects directly to those external servers. Ladrillo Craft Labs does not host, control, or log the streams you access.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-neonPink font-mono">05.</span> Local Data Storage &amp; Children's Privacy
              </h3>
              <p className="mb-2">
                All playback preferences, subtitle settings, and saved stream URLs are stored <strong className="text-white">locally in your device's internal app storage</strong>. Uninstalling StreamPlayer or clearing app storage permanently deletes this data.
              </p>
              <p>
                StreamPlayer does not knowingly collect any personal information from children under the age of 13.
              </p>
            </div>

            <div className="pt-4 border-t border-pink-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">06. Developer Contact</h3>
                <p className="text-xs sm:text-sm text-pink-200/75">
                  Sidharth M N &bull; Ladrillo Craft Labs &bull;{' '}
                  <a href="https://sidharthmn.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-neonPink hover:underline">sidharthmn.netlify.app</a> &bull;{' '}
                  <a href="https://linktr.ee/sidxoid" target="_blank" rel="noopener noreferrer" className="text-neonPink hover:underline">linktr.ee/sidxoid</a>
                </p>
              </div>
              <button
                onClick={handleCopyPrivacyUrl}
                className="shrink-0 px-4 py-2 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-500/30 text-xs font-semibold text-pastelRose transition cursor-pointer"
              >
                {copiedUrl ? 'Copied URL!' : 'Copy Policy URL'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 7. FOOTER ==================== */}
      <footer className="py-14 bg-obsidian border-t border-pink-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md shadow-pink-500/20">
                <svg viewBox="0 0 512 512" className="w-full h-full">
                  <rect width="512" height="512" rx="120" ry="120" fill="url(#pvBaseGlow)" />
                  <rect width="510" height="510" x="1" y="1" rx="119" ry="119" fill="none" stroke="#FF69B4" strokeOpacity="0.25" strokeWidth="2" />
                  <g transform="translate(256, 256)">
                    <path d="M -160,0 A 160,160 0 1,1 0,160 L -12,120 A 120,120 0 1,0 -120,0 Z" fill="url(#pvOrbitRose)" opacity="0.9" />
                    <path d="M 160,0 A 160,160 0 1,1 0,-160 L 12,-120 A 120,120 0 1,0 120,0 Z" fill="url(#pvOrbitHotPink)" opacity="0.95" />
                    <path d="M -42,-64 C -42,-72 -33,-77 -26,-72 L 78,-10 C 85,-6 85,5 78,9 L -26,71 C -33,76 -42,71 -42,63 Z" fill="#120710" stroke="url(#pvOrbitHotPink)" strokeWidth="4" />
                    <path d="M -34,-50 L 58,0 L -34,50 Z" fill="url(#pvCorePink)" />
                    <path d="M -34,-50 L 58,0 L -34,0 Z" fill="#FFFFFF" opacity="0.4" />
                  </g>
                </svg>
              </div>
              <div>
                <div className="font-extrabold text-white tracking-wider">STREAMPLAYER</div>
                <div className="text-xs font-semibold tracking-[0.2em] text-neonPink uppercase">Binge Anything</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-pink-200/75">
              <a href="https://sidharthmn.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-neonPink transition-colors">Developer Portfolio</a>
              <a href="https://linktr.ee/sidxoid" target="_blank" rel="noopener noreferrer" className="hover:text-neonPink transition-colors">Linktree (@sidxoid)</a>
              <a href="#privacy" className="hover:text-neonPink transition-colors">Privacy Policy</a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-pink-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-pink-200/50">
            <p className="font-semibold tracking-[0.18em] uppercase text-pink-300/70">
              A PRODUCT BY LADRILLO CRAFT LABS
            </p>
            <p className="font-mono">
              com.ladrillocraftlabs.streamplayer &bull; &copy; 2026 Sidharth M N
            </p>
          </div>
        </div>
      </footer>

      {/* ==================== DOWNLOAD MODAL ==================== */}
      {downloadModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setDownloadModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="glass-card max-w-md w-full rounded-3xl p-6 sm:p-8 border-pink-500/40 relative">
            <button
              onClick={() => setDownloadModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-pink-200 hover:bg-pink-500/20 hover:text-white transition cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0">
                <img src="/Streamlogo.svg" alt="StreamPlayer" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">StreamPlayer v2.0.1</h3>
                <p className="text-xs font-mono text-pink-300">com.ladrillocraftlabs.streamplayer</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-pink-100/80 bg-black/40 p-4 rounded-2xl border border-pink-500/15 mb-6 font-mono">
              <div className="flex justify-between"><span className="text-pink-200/60">Architecture:</span><span>arm64-v8a / armeabi-v7a</span></div>
              <div className="flex justify-between"><span className="text-pink-200/60">Min Android:</span><span>Android 8.0 (API 26)</span></div>
              <div className="flex justify-between"><span className="text-pink-200/60">Audio Engine:</span><span>Media3 + FFmpeg NDK</span></div>
              <div className="flex justify-between"><span className="text-pink-200/60">Signature:</span><span className="text-emerald-400">Release Keystore Verified</span></div>
            </div>

            <div className="mb-6 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-4 text-sm text-pink-100/85">
              <h4 className="mb-2 font-bold text-yellow-300 animate-pulse motion-reduce:animate-none">Before you download</h4>
              <ol className="list-decimal space-y-1.5 pl-5">
                <li>If you experience any glitches, please restart the app.</li>
                <li>If an older version is installed, uninstall it before installing this version.</li>
                <li>
                  Have a suggestion?{' '}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfgMucOYC7m8mbF8lNFxroByLjGCz0aFm-4-WP0JTEYS2pR_g/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-neonPink hover:underline"
                  >
                    Fill out the feedback form
                  </a>.
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <a
                href="https://shorturl.at/KRSsh"
                className="w-full btn-neon py-3.5 px-5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"
              >
                Download Signed Release APK (Universal)
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}