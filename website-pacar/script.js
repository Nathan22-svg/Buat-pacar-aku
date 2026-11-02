// ========================================================
// WEBSITE LOGIC & INTERACTION
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Ikon Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Pasang data dari CONFIG ke elemen HTML
  setupConfigData();

  // 3. Jalankan Counter Hari Jadian
  startAnniversaryCounter();

  // 4. Inisialisasi Floating Hearts Canvas
  initHeartCanvas();

  // 5. Inisialisasi Audio Player
  initMusicPlayer();

  // 6. Inisialisasi Interaksi Surat Cinta (Amplop)
  initLetterEnvelope();

  // 7. Inisialisasi Tombol Lucu "Mau Terus Sama Aku?"
  initPlayfulQuestion();
});

// ========================================================
// FUNGSI INJEKSI DATA CONFIG
// ========================================================
function setupConfigData() {
  // Nama & Hero
  const badgeName = document.getElementById("badgeName");
  if (badgeName && CONFIG.partnerName) badgeName.textContent = CONFIG.partnerName;

  const heroSubtitle = document.getElementById("heroSubtitle");
  if (heroSubtitle && CONFIG.heroSubtitle) heroSubtitle.textContent = CONFIG.heroSubtitle;

  const footerNames = document.getElementById("footerNames");
  if (footerNames) footerNames.textContent = `${CONFIG.partnerName} & ${CONFIG.yourName}`;

  // Format Tanggal Jadian untuk Tampilan
  const dateObj = new Date(CONFIG.anniversaryDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('id-ID', options);
  const anniversaryFormatted = document.getElementById("anniversaryFormatted");
  if (anniversaryFormatted) anniversaryFormatted.textContent = formattedDate;

  // Render Timeline Kenangan
  const timelineContainer = document.getElementById("timelineContainer");
  if (timelineContainer && CONFIG.timeline) {
    timelineContainer.innerHTML = CONFIG.timeline.map((item, index) => `
      <div class="relative pl-6 sm:pl-10">
        <!-- Dot indicator -->
        <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-pink-500 border-4 border-white shadow"></div>
        
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-pink-100 hover:shadow-lg transition">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="text-xs font-bold px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
              ${item.date}
            </span>
            <span class="text-xs text-gray-400 font-medium">Kenangan #${index + 1}</span>
          </div>

          <h3 class="text-lg sm:text-xl font-bold text-pink-900 mb-2">
            ${item.title}
          </h3>
          
          <p class="text-gray-600 text-sm leading-relaxed mb-4">
            ${item.description}
          </p>

          ${item.image ? `
            <div class="polaroid-card max-w-sm mt-3">
              <img src="${item.image}" alt="${item.title}" class="w-full h-48 sm:h-56 object-cover rounded-lg" loading="lazy">
              <p class="font-['Caveat',cursive] text-center text-gray-500 text-base mt-2">${item.title}</p>
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  // Render Reasons Cards
  const reasonsGrid = document.getElementById("reasonsGrid");
  if (reasonsGrid && CONFIG.reasons) {
    reasonsGrid.innerHTML = CONFIG.reasons.map((reason, index) => `
      <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-pink-100 hover:-translate-y-1 hover:shadow-md transition duration-200">
        <div class="text-3xl mb-3">${reason.icon || '❤️'}</div>
        <h4 class="font-bold text-pink-900 text-base mb-1.5">${reason.title}</h4>
        <p class="text-gray-600 text-sm leading-relaxed">${reason.text}</p>
      </div>
    `).join('');
  }

  // Render Surat Cinta
  const letterGreeting = document.getElementById("letterGreeting");
  if (letterGreeting) letterGreeting.textContent = CONFIG.loveLetter.greeting || `Untuk ${CONFIG.partnerName},`;

  const letterBody = document.getElementById("letterBody");
  if (letterBody && CONFIG.loveLetter.paragraphs) {
    letterBody.innerHTML = CONFIG.loveLetter.paragraphs.map(p => `<p>${p}</p>`).join('');
  }

  const letterClosing = document.getElementById("letterClosing");
  if (letterClosing) letterClosing.textContent = CONFIG.loveLetter.closing || "Dengan segenap cinta,";

  const letterSignature = document.getElementById("letterSignature");
  if (letterSignature) letterSignature.textContent = CONFIG.loveLetter.signature || CONFIG.yourName;
}

// ========================================================
// COUNTER HARI JADIAN (REALTIME)
// ========================================================
function startAnniversaryCounter() {
  const startDate = new Date(CONFIG.anniversaryDate).getTime();

  function update() {
    const now = new Date().getTime();
    const difference = now - startDate;

    if (difference < 0) {
      // Jika tanggal jadian diset di masa depan
      document.getElementById("counterDays").textContent = "0";
      document.getElementById("counterHours").textContent = "0";
      document.getElementById("counterMinutes").textContent = "0";
      document.getElementById("counterSeconds").textContent = "0";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const elDays = document.getElementById("counterDays");
    const elHours = document.getElementById("counterHours");
    const elMinutes = document.getElementById("counterMinutes");
    const elSeconds = document.getElementById("counterSeconds");

    if (elDays) elDays.textContent = days;
    if (elHours) elHours.textContent = hours.toString().padStart(2, '0');
    if (elMinutes) elMinutes.textContent = minutes.toString().padStart(2, '0');
    if (elSeconds) elSeconds.textContent = seconds.toString().padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ========================================================
// BACKGROUND FLOATING HEARTS (CANVAS)
// ========================================================
function initHeartCanvas() {
  const canvas = document.getElementById("heartCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const hearts = [];
  const totalHearts = 22;

  class Heart {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.15;
      this.color = ["#F472B6", "#FB7185", "#FDA4AF", "#FBCFE8"][Math.floor(Math.random() * 4)];
      this.angle = Math.random() * 360;
      this.angleSpeed = (Math.random() - 0.5) * 0.8;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.angle += this.angleSpeed;

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.angle * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      // Draw Heart Path
      ctx.beginPath();
      const s = this.size / 15;
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-10 * s, -10 * s, -20 * s, 5 * s, 0, 20 * s);
      ctx.bezierCurveTo(20 * s, 5 * s, 10 * s, -10 * s, 0, 0);
      ctx.fill();

      ctx.restore();
    }
  }

  for (let i = 0; i < totalHearts; i++) {
    hearts.push(new Heart());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach((heart) => {
      heart.update();
      heart.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// ========================================================
// PEMUTAR MUSIK LATAR
// ========================================================
function initMusicPlayer() {
  const bgMusic = document.getElementById("bgMusic");
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const musicDisc = document.getElementById("musicDisc");
  const musicIcon = document.getElementById("musicIcon");
  const musicLabel = document.getElementById("musicLabel");

  if (!bgMusic || !musicToggleBtn) return;

  bgMusic.src = CONFIG.musicUrl;
  if (musicLabel && CONFIG.musicTitle) {
    musicLabel.textContent = CONFIG.musicTitle;
  }

  let isPlaying = false;

  function toggleMusic() {
    if (isPlaying) {
      bgMusic.pause();
      musicDisc.classList.remove("spinning");
      if (musicIcon) {
        musicIcon.setAttribute("data-lucide", "play");
        lucide.createIcons();
      }
      isPlaying = false;
    } else {
      bgMusic.play().then(() => {
        musicDisc.classList.add("spinning");
        if (musicIcon) {
          musicIcon.setAttribute("data-lucide", "pause");
          lucide.createIcons();
        }
        isPlaying = true;
      }).catch(err => {
        console.log("Audio play blocked by browser policy:", err);
      });
    }
  }

  musicToggleBtn.addEventListener("click", toggleMusic);

  // Auto trigger saat interaksi pertama pengunjung
  const handleFirstInteraction = () => {
    if (!isPlaying) {
      bgMusic.play().then(() => {
        musicDisc.classList.add("spinning");
        if (musicIcon) {
          musicIcon.setAttribute("data-lucide", "pause");
          lucide.createIcons();
        }
        isPlaying = true;
      }).catch(() => {});
    }
    document.removeEventListener("click", handleFirstInteraction);
  };

  document.addEventListener("click", handleFirstInteraction, { once: true });
}

// ========================================================
// INTERAKSI AMPLOP & SURAT CINTA
// ========================================================
function initLetterEnvelope() {
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const letterModal = document.getElementById("letterModal");
  const confettiRepeatBtn = document.getElementById("confettiRepeatBtn");

  if (!envelopeWrapper || !letterModal) return;

  let isOpened = false;

  envelopeWrapper.addEventListener("click", () => {
    if (!isOpened) {
      envelopeWrapper.classList.add("opened");
      isOpened = true;

      // Ledakan confetti hati
      fireConfetti();

      // Munculkan surat secara elegan
      setTimeout(() => {
        letterModal.classList.remove("hidden");
        letterModal.classList.add("animate-fade-in");
        letterModal.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }
  });

  if (confettiRepeatBtn) {
    confettiRepeatBtn.addEventListener("click", () => {
      fireConfetti();
    });
  }
}

// Efek Confetti Hati & Bintang
function fireConfetti() {
  if (typeof confetti !== "function") return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#F43F5E', '#EC4899', '#FDA4AF']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#FB7185', '#F472B6', '#FFFFFF']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#E11D48', '#BE185D', '#FCE7F3']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#FFD700', '#F472B6']
  });
}

// ========================================================
// TOMBOL LUCU: "MAU TERUS SAMA AKU?" (TOMBOL KABUR)
// ========================================================
function initPlayfulQuestion() {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const responseMessage = document.getElementById("responseMessage");

  if (!yesBtn || !noBtn) return;

  // Tombol Nggak yang kabur saat didekati kursor / disentuh
  function moveNoButton() {
    const parent = noBtn.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxDeltaX = (parentRect.width / 2) - btnRect.width;
    const maxDeltaY = 50;

    const randomX = (Math.random() - 0.5) * 2 * maxDeltaX;
    const randomY = (Math.random() - 0.5) * 2 * maxDeltaY;

    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }

  noBtn.addEventListener("mouseover", moveNoButton);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
  });

  // Tombol Yes diklik
  yesBtn.addEventListener("click", () => {
    fireConfetti();
    if (responseMessage) {
      responseMessage.classList.remove("hidden");
    }
    // Sembunyikan tombol no
    noBtn.style.display = "none";
    yesBtn.classList.remove("hover:scale-105");
    yesBtn.innerHTML = `<span>Yay! Selamanya ya! 🥰💍</span>`;
  });
}
