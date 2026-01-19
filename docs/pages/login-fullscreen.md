---
layout: false
---

<div class="login-page-fullscreen">
  <div class="cloud-layer">
    <img src="https://museum.unesco.org/assets/images/homepage/cloud-3.avif" class="cloud cloud-1" alt="">
    <img src="https://museum.unesco.org/assets/images/homepage/cloud-2.avif" class="cloud cloud-2" alt="">
    <img src="https://museum.unesco.org/assets/images/homepage/cloud-3.avif" class="cloud cloud-3" alt="">
    <img src="https://museum.unesco.org/assets/images/homepage/cloud-2.avif" class="cloud cloud-4" alt="">
    <img src="https://museum.unesco.org/assets/images/homepage/cloud-2.avif" class="cloud cloud-5" alt="">
    <img src="https://museum.unesco.org/assets/images/homepage/cloud-3.avif" class="cloud cloud-6" alt="">
  </div>
  <div class="constellation-bg" id="constellationBg">
    <canvas id="constellationCanvas"></canvas>
  </div>
  
  <!-- 行星环登录区域 -->
  <div class="planet-ring-container" id="planetRing">
    <canvas id="ringCanvas"></canvas>
    <div class="ring-buttons" id="ringButtons">
      <div class="ring-btn qq-btn" data-name="QQ登录" data-angle="0">
        <div class="btn-icon">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm5.56 12.86c-.28.8-1.62 1.55-3.26 1.55h-4.6c-1.64 0-2.98-.75-3.26-1.55-.06-.17-.08-.33-.08-.48 0-.82.67-1.49 1.49-1.49.38 0 .72.14.98.38.54.48 1.22.77 1.97.77h1.4c.75 0 1.43-.29 1.97-.77.26-.24.6-.38.98-.38.82 0 1.49.67 1.49 1.49 0 .15-.02.31-.08.48z"/>
          </svg>
        </div>
        <div class="btn-expand">
          <span class="btn-name">QQ登录</span>
        </div>
      </div>
      <div class="ring-btn wechat-btn" data-name="微信登录" data-angle="90">
        <div class="btn-icon">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M8.5 11.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.34-1.34c1.47.85 3.18 1.34 5 1.34 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
          </svg>
        </div>
        <div class="btn-expand">
          <span class="btn-name">微信登录</span>
        </div>
      </div>
      <div class="ring-btn github-btn" data-name="GitHub" data-angle="180">
        <div class="btn-icon">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
        </div>
        <div class="btn-expand">
          <span class="btn-name">GitHub</span>
        </div>
      </div>
      <div class="ring-btn google-btn" data-name="Google" data-angle="270">
        <div class="btn-icon">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path fill="currentColor" d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
          </svg>
        </div>
        <div class="btn-expand">
          <span class="btn-name">Google</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 右侧服务条款卡片 -->
  <div class="terms-card" id="termsCard">
    <div class="terms-header" id="termsHeader">
      <div class="terms-header-left">
        <div class="terms-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 13H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 9H9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3 class="terms-title">服务条款</h3>
      </div>
      <div class="terms-toggle" id="termsToggle">
        <svg class="toggle-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div class="terms-drawer" id="termsDrawer">
      <div class="terms-content-wrapper">
        <div class="terms-content-scroll">
          <div class="terms-content">
          <h4>1. 服务说明</h4>
          <p>本平台提供第三方账号授权登录服务，包括QQ、微信、GitHub、Google等方式。登录即表示您同意本服务条款。</p>
          <h4>2. 账号安全</h4>
          <p>您应妥善保管账号信息，因个人原因导致的账号安全问题由您自行承担。如发现异常登录，请及时修改密码或联系客服。</p>
          <h4>3. 隐私保护</h4>
          <p>我们仅收集必要的用户信息用于提供服务，不会未经授权向第三方披露您的个人数据。详情请阅读《隐私政策》。</p>
          <h4>4. 用户行为</h4>
          <p>禁止利用本平台从事任何违法违规活动。我们保留对违规账号采取限制措施的权利。</p>
          <h4>5. 免责声明</h4>
          <p>因不可抗力或第三方服务中断导致的损失，平台不承担责任。服务内容可能随时调整，恕不另行通知。</p>
          </div>
        </div>
      </div>
      <div class="terms-agreement-section">
        <button class="terms-agree-btn" id="termsAgreeBtn">同意并继续</button>
      </div>
    </div>
  </div>
</div>

<script>
if (typeof window !== 'undefined') {
  // ========== 点击音效 ==========
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  function playClickSound() {
    // 钢片琴音色 - 高频 + 泛音
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioContext.destination);
    
    osc1.type = 'sine';
    osc1.frequency.value = 4200;
    
    osc2.type = 'sine';
    osc2.frequency.value = 6300; // 1.5倍泛音
    
    gain.gain.setValueAtTime(0.12, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);
    
    osc1.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);
    osc1.stop(audioContext.currentTime + 0.12);
    osc2.stop(audioContext.currentTime + 0.12);
  }
  
  // 为登录按钮添加点击音效和显示服务条款卡片
  function initTermsCard() {
    const termsHeader = document.getElementById('termsHeader');
    const termsToggle = document.getElementById('termsToggle');
    const termsDrawer = document.getElementById('termsDrawer');
    const termsAgreeBtn = document.getElementById('termsAgreeBtn');
    
    if (!termsHeader || !termsDrawer) return;
    
    // 点击header展开抽屉
    termsHeader.onclick = () => {
      playClickSound();
      termsDrawer.classList.add('open');
      termsToggle.classList.add('open');
    };
    
    // 点击同意按钮收起抽屉
    if (termsAgreeBtn) {
      termsAgreeBtn.onclick = (e) => {
        e.stopPropagation();
        playClickSound();
        termsDrawer.classList.remove('open');
        termsToggle.classList.remove('open');
      };
    }
    
    document.querySelectorAll('.ring-btn').forEach(btn => {
      btn.onclick = (e) => {
        if (e.target.closest('.btn-terms')) return;
        playClickSound();
      };
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initTermsCard, 100));
  } else {
    setTimeout(initTermsCard, 100);
  }

  // ========== 星空背景 ==========
  const constellations = [
    { name: '白羊座', stars: [[0,0],[2,1],[4,0],[3,2],[5,3],[4,4]] },
    { name: '金牛座', stars: [[0,2],[1,1],[2,0],[3,1],[4,2],[3,3],[2,4],[1,3]] },
    { name: '双子座', stars: [[0,0],[0,2],[0,4],[2,1],[2,3],[4,0],[4,2],[4,4]] },
    { name: '巨蟹座', stars: [[1,0],[0,1],[2,1],[1,2],[0,3],[2,3],[1,4]] },
    { name: '狮子座', stars: [[0,1],[1,0],[2,1],[3,0],[4,1],[3,2],[2,3],[1,4],[0,3]] },
    { name: '处女座', stars: [[0,0],[1,1],[2,0],[2,2],[3,3],[4,2],[5,3],[4,4]] },
    { name: '天秤座', stars: [[2,0],[1,1],[3,1],[0,2],[4,2],[1,3],[3,3],[2,4]] },
    { name: '天蝎座', stars: [[0,2],[1,1],[2,2],[3,1],[4,2],[5,3],[6,4],[7,3]] },
    { name: '射手座', stars: [[0,2],[1,1],[2,2],[3,1],[4,0],[3,3],[2,4],[4,4]] },
    { name: '摩羯座', stars: [[0,1],[1,0],[2,1],[3,2],[4,1],[5,2],[4,3],[3,4]] },
    { name: '水瓶座', stars: [[0,0],[1,1],[2,0],[3,1],[4,0],[2,2],[1,3],[2,4],[3,3]] },
    { name: '双鱼座', stars: [[0,2],[1,1],[2,2],[3,2],[4,1],[5,2],[3,3],[3,4]] }
  ];

  let canvas, ctx;
  let constellationObjects = [];
  let backgroundStars = [];
  let animationId;

  // ========== 行星环 ==========
  let ringCanvas, ringCtx;
  let ringCenterX, ringCenterY;
  let ringRadiusX = 580;
  let ringRadiusY = 220;
  const ringTilt = 0;
  let ringTime = 0;

  function initCanvas() {
    const container = document.getElementById('constellationBg');
    if (!container) return;
    
    canvas = document.getElementById('constellationCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    resizeCanvas();
    initBackgroundStars();
    initConstellations();
    
    // 初始化行星环
    initRingCanvas();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      initBackgroundStars();
      initConstellations();
      resizeRingCanvas();
    });
    
    animate();
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initBackgroundStars() {
    backgroundStars = [];
    const w = canvas.width;
    const h = canvas.height;
    
    for (let i = 0; i < 300; i++) {
      backgroundStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 0.5 + 0.2,
        brightness: Math.random() * 0.2 + 0.05,
        twinkleSpeed: Math.random() * 0.002 + 0.001,
        twinkleOffset: Math.random() * Math.PI * 2,
        layer: 'far'
      });
    }
    
    for (let i = 0; i < 150; i++) {
      backgroundStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 0.8 + 0.4,
        brightness: Math.random() * 0.25 + 0.1,
        twinkleSpeed: Math.random() * 0.003 + 0.001,
        twinkleOffset: Math.random() * Math.PI * 2,
        layer: 'mid'
      });
    }
    
    for (let i = 0; i < 50; i++) {
      backgroundStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.2 + 0.8,
        brightness: Math.random() * 0.35 + 0.2,
        twinkleSpeed: Math.random() * 0.004 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
        layer: 'near',
        color: ['#ffffff', '#ffe4c4', '#add8e6', '#fffacd'][Math.floor(Math.random() * 4)]
      });
    }
  }

  function initConstellations() {
    const w = canvas.width;
    const h = canvas.height;
    const cols = 4;
    const rows = 3;
    const cellW = w / cols;
    const cellH = h / rows;
    
    constellationObjects = constellations.map((c, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const offsetX = cellW * col + cellW * 0.2 + Math.random() * cellW * 0.3;
      const offsetY = cellH * row + cellH * 0.2 + Math.random() * cellH * 0.3;
      
      return {
        ...c,
        baseOffset: { x: offsetX, y: offsetY },
        offset: { x: offsetX, y: offsetY },
        targetOffset: { x: offsetX, y: offsetY },
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.003,
        scale: Math.min(cellW, cellH) * 0.08,
        brightness: 0.25,
        targetBrightness: 0.25,
        depth: 0.5 + Math.random() * 0.5
      };
    });
  }

  function drawStar(x, y, brightness, size = 2, color = '#ffffff') {
    const alpha = brightness;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    if (color === '#ffffff') {
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    } else if (color === '#ffe4c4') {
      ctx.fillStyle = `rgba(255, 228, 196, ${alpha})`;
    } else if (color === '#add8e6') {
      ctx.fillStyle = `rgba(173, 216, 230, ${alpha})`;
    } else if (color === '#fffacd') {
      ctx.fillStyle = `rgba(255, 250, 205, ${alpha})`;
    }
    ctx.fill();
    
    if (brightness > 0.3 && size > 1) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 5);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.4})`);
      gradient.addColorStop(0.5, `rgba(200, 220, 255, ${alpha * 0.15})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(x, y, size * 5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  function drawConstellation(constellation) {
    const { stars, rotation, scale, depth } = constellation;
    constellation.offset.x += (constellation.targetOffset.x - constellation.offset.x) * 0.1;
    constellation.offset.y += (constellation.targetOffset.y - constellation.offset.y) * 0.1;
    
    const centerX = constellation.offset.x + 3 * scale;
    const centerY = constellation.offset.y + 2 * scale;
    constellation.brightness += (constellation.targetBrightness - constellation.brightness) * 0.08;
    
    const rotatedStars = stars.map(([sx, sy]) => {
      const dx = sx * scale - 3 * scale;
      const dy = sy * scale - 2 * scale;
      const rx = dx * Math.cos(rotation) - dy * Math.sin(rotation);
      const ry = dx * Math.sin(rotation) + dy * Math.cos(rotation);
      return [centerX + rx, centerY + ry];
    });
    
    ctx.beginPath();
    const lineAlpha = constellation.brightness * 0.35 * depth;
    ctx.strokeStyle = `rgba(150, 180, 255, ${lineAlpha})`;
    ctx.lineWidth = constellation.brightness > 0.6 ? 1.5 : 0.8;
    rotatedStars.forEach(([x, y], i) => {
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    const starSize = (constellation.brightness > 0.6 ? 3 : 1.8) * depth;
    rotatedStars.forEach(([x, y]) => {
      drawStar(x, y, constellation.brightness * depth, starSize);
    });
  }

  function drawNebula() {
    const time = Date.now() * 0.00008;
    
    const nebula1 = ctx.createRadialGradient(
      canvas.width * 0.25 + Math.sin(time) * 80,
      canvas.height * 0.3 + Math.cos(time * 0.8) * 60,
      0, canvas.width * 0.25, canvas.height * 0.3, canvas.width * 0.5
    );
    nebula1.addColorStop(0, 'rgba(180, 80, 160, 0.12)');
    nebula1.addColorStop(0.3, 'rgba(120, 50, 140, 0.08)');
    nebula1.addColorStop(0.6, 'rgba(60, 30, 100, 0.04)');
    nebula1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = nebula1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const nebula2 = ctx.createRadialGradient(
      canvas.width * 0.75 + Math.cos(time * 1.2) * 70,
      canvas.height * 0.65 + Math.sin(time * 0.9) * 50,
      0, canvas.width * 0.75, canvas.height * 0.65, canvas.width * 0.45
    );
    nebula2.addColorStop(0, 'rgba(60, 140, 200, 0.1)');
    nebula2.addColorStop(0.3, 'rgba(40, 100, 160, 0.06)');
    nebula2.addColorStop(0.6, 'rgba(20, 60, 120, 0.03)');
    nebula2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = nebula2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const nebula3 = ctx.createRadialGradient(
      canvas.width * 0.6 + Math.sin(time * 1.5) * 40,
      canvas.height * 0.4 + Math.cos(time * 1.1) * 35,
      0, canvas.width * 0.6, canvas.height * 0.4, canvas.width * 0.25
    );
    nebula3.addColorStop(0, 'rgba(200, 100, 80, 0.08)');
    nebula3.addColorStop(0.4, 'rgba(150, 60, 60, 0.04)');
    nebula3.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = nebula3;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // ========== 行星环绘制 ==========
  function initRingCanvas() {
    ringCanvas = document.getElementById('ringCanvas');
    if (!ringCanvas) return;
    ringCtx = ringCanvas.getContext('2d');
    resizeRingCanvas();
  }

  function resizeRingCanvas() {
    if (!ringCanvas) return;
    const container = document.getElementById('planetRing');
    ringCanvas.width = container.offsetWidth;
    ringCanvas.height = container.offsetHeight;
    
    // 中等及小屏布局检测（1050px 以下切换为上下布局）
    const isMobile = window.innerWidth <= 1050;
    if (isMobile) {
      // 移动端/中等屏幕：环从左侧伸出，左半部分隐藏
      ringCenterX = 0;
      ringCenterY = ringCanvas.height / 2;
      // 根据屏幕宽度动态调整环大小，确保右侧弧段在屏幕内
      ringRadiusX = Math.min(window.innerWidth * 0.85, 500);
      ringRadiusY = ringRadiusX * 0.38;
    } else {
      // 桌面端：环从左侧伸出
      ringCenterX = 0;
      ringCenterY = ringCanvas.height / 2;
      ringRadiusX = 580;
      ringRadiusY = 220;
    }
  }

  function drawPlanetRing() {
    if (!ringCtx) return;
    ringCtx.clearRect(0, 0, ringCanvas.width, ringCanvas.height);
    
    ringTime += 0.005;
    
    ringCtx.save();
    ringCtx.translate(ringCenterX, ringCenterY);
    
    // 三条完整椭圆环线，不同倾斜角度产生交错效果
    const ringLines = [
      { rx: ringRadiusX - 25, ry: ringRadiusY - 12, alpha: 0.85, width: 3, tilt: 0.06, speed: 0.3 },
      { rx: ringRadiusX, ry: ringRadiusY, alpha: 1, width: 4, tilt: -0.04, speed: -0.25 },
      { rx: ringRadiusX + 25, ry: ringRadiusY + 12, alpha: 0.85, width: 3, tilt: 0.08, speed: 0.35 },
    ];
    
    const colors = ['rgba(180, 200, 255,', 'rgba(220, 230, 255,', 'rgba(200, 215, 255,'];
    
    // 绘制实线椭圆环
    ringLines.forEach((ring, index) => {
      ringCtx.beginPath();
      ringCtx.ellipse(0, 0, ring.rx, ring.ry, ring.tilt, 0, Math.PI * 2);
      ringCtx.strokeStyle = `${colors[index]} ${ring.alpha})`;
      ringCtx.lineWidth = ring.width;
      ringCtx.stroke();
    });
    
    // 在每条环上绘制流动的亮点
    ringLines.forEach((ring, index) => {
      const numParticles = 8;
      for (let i = 0; i < numParticles; i++) {
        const baseAngle = (i / numParticles) * Math.PI * 2;
        const angle = baseAngle + ring.speed * ringTime;
        
        // 椭圆上的点（考虑倾斜）
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = cos * ring.rx * Math.cos(ring.tilt) - sin * ring.ry * Math.sin(ring.tilt);
        const y = cos * ring.rx * Math.sin(ring.tilt) + sin * ring.ry * Math.cos(ring.tilt);
        
        // 绘制亮点
        const gradient = ringCtx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, `${colors[index]} 0.8)`);
        gradient.addColorStop(1, `${colors[index]} 0)`);
        ringCtx.beginPath();
        ringCtx.arc(x, y, 8, 0, Math.PI * 2);
        ringCtx.fillStyle = gradient;
        ringCtx.fill();
      }
    });
    
    ringCtx.restore();
    
    updateButtonPositions();
  }

  function updateButtonPositions() {
    const buttons = document.querySelectorAll('.ring-btn');
    
    // 计算可见弧段的角度范围
    // 圆心在左边缘，可见部分大约是 -70° 到 70°（右侧弧段）
    // 4个按钮均匀分布在可见弧段的边缘位置
    const numButtons = buttons.length; // 4
    // 均匀分布：将弧段分成 numButtons-1 份，按钮放在分割点上
    const angles = [-52, -18, 18, 52]; // 手动调整，确保视觉均匀
    
    buttons.forEach((btn, i) => {
      const angleDeg = angles[i];
      const angle = angleDeg * Math.PI / 180;
      const x = Math.cos(angle) * ringRadiusX;
      const y = Math.sin(angle) * ringRadiusY;
      
      btn.style.transform = `translate(${x}px, ${y}px)`;
      btn.style.zIndex = 20;
      btn.style.opacity = 1;
    });
  }

  function animate() {
    if (!ctx || !canvas) return;
    
    const bgGradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
    );
    bgGradient.addColorStop(0, '#0a0a18');
    bgGradient.addColorStop(0.5, '#050510');
    bgGradient.addColorStop(1, '#000005');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawNebula();
    
    const time = Date.now();
    backgroundStars.forEach(star => {
      const twinkle = star.brightness + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.15;
      drawStar(star.x, star.y, Math.max(0.05, twinkle), star.size, star.color || '#ffffff');
    });
    
    constellationObjects.forEach(c => {
      c.rotation += c.rotationSpeed;
      drawConstellation(c);
    });
    
    // 绘制行星环
    drawPlanetRing();
    
    animationId = requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(initCanvas, 100));
  } else {
    setTimeout(initCanvas, 100);
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.login-page-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000008;
}

.cloud-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
}

.cloud {
  position: absolute;
  opacity: 0.15;
  filter: blur(2px);
  animation: float-cloud 60s ease-in-out infinite;
}

.cloud-1 {
  bottom: -10%;
  left: -10%;
  width: 60%;
  animation-delay: 0s;
  animation-duration: 80s;
}

.cloud-2 {
  bottom: 5%;
  right: -20%;
  width: 50%;
  animation-delay: -15s;
  animation-duration: 70s;
  opacity: 0.12;
}

.cloud-3 {
  top: -20%;
  left: 30%;
  width: 50%;
  animation-delay: -40s;
  animation-duration: 90s;
  opacity: 0.08;
  transform: rotate(180deg);
}

.cloud-4 {
  bottom: -15%;
  left: 25%;
  width: 45%;
  animation-delay: -10s;
  animation-duration: 85s;
  opacity: 0.1;
}

.cloud-5 {
  top: -10%;
  right: -10%;
  width: 40%;
  animation-delay: -30s;
  animation-duration: 75s;
  opacity: 0.1;
  transform: rotate(180deg) scaleX(-1);
}

.cloud-6 {
  bottom: 0%;
  right: 10%;
  width: 55%;
  animation-delay: -50s;
  animation-duration: 95s;
  opacity: 0.08;
  transform: scaleX(-1);
}

@keyframes float-cloud {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(30px) translateY(-20px);
  }
  50% {
    transform: translateX(0) translateY(-10px);
  }
  75% {
    transform: translateX(-30px) translateY(-25px);
  }
}

.constellation-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

#constellationCanvas {
  width: 100%;
  height: 100%;
}

/* 行星环容器 */
.planet-ring-container {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 700px;
  height: 800px;
  z-index: 10;
  pointer-events: none;
}

.planet-ring-container:active {
  cursor: default;
}

#ringCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.ring-buttons {
  position: absolute;
  top: 50%;
  left: 0;
  width: 0;
  height: 0;
}

.ring-btn {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 0 16px;
  cursor: pointer;
  pointer-events: auto;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
              background 0.3s, 
              border-color 0.3s, 
              box-shadow 0.3s,
              gap 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center center;
  margin-left: -30px;
  margin-top: -30px;
  overflow: hidden;
}

.ring-btn:hover {
  width: 180px;
  gap: 10px;
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}

.btn-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.btn-expand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  opacity: 0;
  max-width: 0;
  overflow: hidden;
  transition: opacity 0.3s 0.1s, max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.ring-btn:hover .btn-expand {
  opacity: 1;
  max-width: 120px;
}

.btn-name {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
}

.btn-terms {
  color: rgba(255, 255, 255, 0.6);
  font-size: 11px;
  text-decoration: none;
  transition: color 0.2s;
}

.btn-terms:hover {
  color: #fff;
  text-decoration: underline;
}

/* 按钮悬停统一白色边框 */
.qq-btn:hover,
.wechat-btn:hover,
.github-btn:hover,
.google-btn:hover {
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.25);
}

/* 服务条款卡片 */
.terms-card {
  position: fixed;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 380px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  z-index: 1000;
  overflow: hidden;
}

/* 响应式 */
@media (max-width: 1400px) {
  .planet-ring-container {
    width: 600px;
  }
  
  .terms-card {
    right: 3%;
    width: 340px;
  }
}

@media (max-width: 1200px) {
  .planet-ring-container {
    left: -150px;
    width: 550px;
    height: 600px;
  }
  
  .terms-card {
    right: 2%;
    width: 320px;
  }
}

@media (max-width: 1050px) {
  /* 中等屏幕：切换为上下布局，避免压盖 */
  .login-page-fullscreen {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    padding-top: 3vh;
  }
  
  .planet-ring-container {
    position: relative;
    left: 0;
    top: auto;
    transform: none;
    width: 100%;
    height: 50vh;
    min-height: 320px;
    max-height: 450px;
    flex-shrink: 0;
  }
  
  .ring-buttons {
    left: 0;
  }
  
  .terms-card {
    position: relative !important;
    right: auto !important;
    left: auto !important;
    top: auto !important;
    transform: none !important;
    width: 90%;
    max-width: 420px;
    margin-top: 40px;
    flex-shrink: 0;
  }
}

@media (max-width: 900px) {
  .login-page-fullscreen {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    padding-top: 5vh;
  }
  
  .planet-ring-container {
    position: relative;
    left: 0;
    top: auto;
    transform: none;
    width: 100%;
    height: 50vh;
    min-height: 280px;
    flex-shrink: 0;
  }
  
  .ring-buttons {
    left: 0;
  }
  
  .terms-card {
    position: relative !important;
    right: auto !important;
    left: auto !important;
    top: auto !important;
    transform: none !important;
    width: 90%;
    max-width: 380px;
    margin-top: 60px;
    flex-shrink: 0;
  }
}

@media (max-width: 600px) {
  .login-page-fullscreen {
    padding-top: 3vh;
  }
  
  .planet-ring-container {
    height: 40vh;
    min-height: 250px;
    max-height: 350px;
  }
  
  .terms-card {
    width: 92%;
    max-width: 340px;
    margin-top: 35px;
  }
  
  .ring-btn {
    width: 50px;
    height: 50px;
    margin-left: -25px;
    margin-top: -25px;
  }
  
  .ring-btn:hover {
    width: 150px;
  }
  
  .btn-icon svg {
    width: 24px;
    height: 24px;
  }
}

.terms-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.terms-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.terms-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.terms-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
}

.terms-title {
  margin: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}

.terms-toggle {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.3s;
}

.terms-toggle.open {
  transform: rotate(180deg);
}

.toggle-icon {
  transition: transform 0.3s;
}

.terms-drawer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.terms-drawer.open {
  max-height: 400px;
}

.terms-content-wrapper {
  position: relative;
  margin: 0 20px;
  border-radius: 10px;
}

.terms-content-wrapper::before,
.terms-content-wrapper::after {
  content: '';
  position: absolute;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.terms-content-wrapper::before {
  top: 0;
}

.terms-content-wrapper::after {
  bottom: 0;
}

.terms-content-scroll {
  max-height: 240px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.terms-content-scroll::-webkit-scrollbar {
  width: 6px;
}

.terms-content-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.terms-content-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 3px;
  transition: background 0.3s ease;
}

.terms-content-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.35);
}

.terms-content {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  line-height: 1.6;
}

.terms-content h3 {
  color: #fff;
  font-size: 15px;
  margin: 0 0 16px 0;
}

.terms-content h4 {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  margin: 16px 0 8px 0;
}

.terms-content p {
  margin: 0 0 8px 0;
}

.terms-agreement-section {
  padding: 16px 20px;
}

.terms-agree-btn {
  width: 100%;
  height: 44px;
  background: linear-gradient(135deg, rgba(100, 150, 255, 0.8), rgba(150, 100, 255, 0.8));
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.terms-agree-btn:hover {
  background: linear-gradient(135deg, rgba(120, 170, 255, 0.9), rgba(170, 120, 255, 0.9));
  box-shadow: 0 4px 20px rgba(100, 150, 255, 0.4);
}
</style>
