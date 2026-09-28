/**
 * Main JavaScript: Phạm Nguyên - Cinematic Videographer Portfolio
 * Featuring: Lenis Smooth Scroll, GSAP 3 + ScrollTrigger, Custom Cursor,
 * Video Lightbox Modal, 9:16 Vertical Reel Player, HUD Timecode, Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. LENIS SMOOTH SCROLL & GSAP SCROLLTRIGGER SYNC
  // =========================================================================
  let lenis = null;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;

  try {
    if (typeof Lenis !== 'undefined' && !isTouchDevice) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 0,
        syncTouch: false,
        infinite: false,
      });

      // Synchronize Lenis with ScrollTrigger
      if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } else {
      // Native high-speed inertial scroll on mobile / touch devices.
      // ScrollTrigger internally handles passive scroll listeners with rAF debouncing.
    }

    // Smooth scroll anchor link handler for both desktop and mobile
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            if (lenis) {
              lenis.scrollTo(targetElement, { offset: -60, duration: 1.2 });
            } else {
              const navHeight = 70;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - navHeight;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
            
            // Close mobile menu if open
            if (typeof closeMobileMenu === 'function') {
              closeMobileMenu();
            } else {
              const mobileMenu = document.getElementById('mobileMenu');
              if (mobileMenu) {
                mobileMenu.classList.add('hidden');
              }
            }
          }
        }
      });
    });
  } catch (err) {
    console.warn('Scroll init note:', err);
  }

  // =========================================================================
  // 2. HUD TIMECODE TICKER (24 FPS Simulation - Desktop Only for CPU battery saving)
  // =========================================================================
  const timecodeEl = document.getElementById('hudTimecode');
  if (timecodeEl && window.innerWidth >= 1024) {
    let frame = 0;
    let sec = 0;
    let min = 0;
    let hr = 0;

    setInterval(() => {
      if (document.hidden) return; // Pause when tab is inactive
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
          if (min >= 60) {
            min = 0;
            hr++;
          }
        }
      }
      const pad = (n) => String(n).padStart(2, '0');
      timecodeEl.textContent = `${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(frame)}`;
    }, 1000 / 24);
  }

  // =========================================================================
  // 3. CUSTOM MAGNETIC CURSOR (Desktop Only)
  // =========================================================================
  const cursor = document.getElementById('customCursor');
  const follower = document.getElementById('customCursorFollower');
  
  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      // Smooth lerp for outer ring
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .interactive-btn');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering-interactive'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-interactive'));
    });

    // Hover project cards & carousel slides
    const projectCards = document.querySelectorAll('.project-card, .gma-carousel-slide');
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', () => document.body.classList.add('hovering-video'));
      card.addEventListener('mouseleave', () => document.body.classList.remove('hovering-video'));
    });
  }

  // =========================================================================
  // 4. VIDEO PREVIEW ON HOVER FOR PROJECT CARDS
  // =========================================================================
  if (!isTouchDevice) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
      const previewVideo = card.querySelector('.card-preview-video');
      if (previewVideo) {
        card.addEventListener('mouseenter', () => {
          const playPromise = previewVideo.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay prevented, fail gracefully
            });
          }
        });
        card.addEventListener('mouseleave', () => {
          previewVideo.pause();
          previewVideo.currentTime = 0;
        });
      }
    });
  }

  // =========================================================================
  // 5. CINEMATIC VIDEO LIGHTBOX / MODAL
  // =========================================================================
  // =========================================================================
  // 5. CINEMATIC VIDEO LIGHTBOX / MODAL (SUPPORTING NATIVE & YOUTUBE)
  // =========================================================================
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideoPlayer');
  const modalYoutube = document.getElementById('modalYoutubePlayer');
  const modalYoutubeLink = document.getElementById('modalYoutubeExternalLink');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalClient = document.getElementById('modalClient');
  const modalRole = document.getElementById('modalRole');
  const modalContainer = modal ? modal.querySelector('.video-modal-container') : null;
  const modalVideoWrap = modal ? modal.querySelector('.aspect-video') : null;

  function openVideoModal({ videoSrc, embedUrl, youtubeUrl, title, category, client, role, isVertical }) {
    if (!modal) return;

    // Add modal-open to body to hide background grain texture completely
    document.body.classList.add('modal-open');

    if (modalTitle) modalTitle.textContent = title || 'SHOWREEL';
    if (modalCategory) modalCategory.textContent = category || 'PORTFOLIO';
    if (modalClient) modalClient.textContent = client || 'Phạm Nguyên Production';
    if (modalRole) modalRole.textContent = role || 'Videographer & Editor';

    // Handle YouTube embed vs native video
    if (embedUrl && modalYoutube) {
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.classList.add('hidden');
      }
      modalYoutube.classList.remove('hidden');
      modalYoutube.src = embedUrl;

      if (modalYoutubeLink) {
        modalYoutubeLink.href = youtubeUrl || embedUrl;
        modalYoutubeLink.classList.remove('hidden');
        modalYoutubeLink.classList.add('inline-flex');

        // Dynamically style for Facebook vs YouTube
        if (youtubeUrl && youtubeUrl.includes('facebook.com')) {
          modalYoutubeLink.innerHTML = `
            <i class="fa-brands fa-facebook text-blue-500"></i>
            <span>XEM TRÊN FACEBOOK</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-zinc-400"></i>
          `;
        } else {
          modalYoutubeLink.innerHTML = `
            <i class="fa-brands fa-youtube text-red-500"></i>
            <span>MỞ TRÊN YOUTUBE</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-zinc-400"></i>
          `;
        }
      }
    } else if (modalVideo) {
      if (modalYoutube) {
        modalYoutube.src = '';
        modalYoutube.classList.add('hidden');
      }
      modalVideo.classList.remove('hidden');
      modalVideo.src = videoSrc || 'assets/videos/showreel.mp4';
      modalVideo.currentTime = 0;
      modalVideo.play().catch(() => {});

      if (modalYoutubeLink) {
        modalYoutubeLink.classList.add('hidden');
        modalYoutubeLink.classList.remove('inline-flex');
      }
    }

    // Adapt layout for 9:16 vertical reels
    if (isVertical) {
      if (modalContainer) {
        modalContainer.classList.remove('max-w-[1200px]');
        modalContainer.classList.add('max-w-[420px]');
      }
      if (modalVideoWrap) {
        modalVideoWrap.classList.remove('aspect-video');
        modalVideoWrap.classList.add('aspect-[9/16]');
      }
    } else {
      if (modalContainer) {
        modalContainer.classList.add('max-w-[1200px]');
        modalContainer.classList.remove('max-w-[420px]');
      }
      if (modalVideoWrap) {
        modalVideoWrap.classList.add('aspect-video');
        modalVideoWrap.classList.remove('aspect-[9/16]');
      }
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeVideoModal() {
    if (!modal) return;
    document.body.classList.remove('modal-open');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');

    if (modalVideo) {
      modalVideo.pause();
      modalVideo.src = '';
    }
    if (modalYoutube) {
      modalYoutube.src = '';
      modalYoutube.classList.add('hidden');
    }
    if (modalVideo) {
      modalVideo.classList.remove('hidden');
    }
    if (modalYoutubeLink) {
      modalYoutubeLink.classList.add('hidden');
    }
  }

  // Track dragging state to prevent click trigger when user drags slide
  let hasMovedEnough = false;

  // Trigger from project cards & carousel slides
  function attachCardClickEvents() {
    document.querySelectorAll('.project-card, .gma-carousel-slide').forEach((card) => {
      card.addEventListener('click', (e) => {
        // If user was dragging/swiping the carousel on touch/mouse, block modal trigger
        if (hasMovedEnough) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        // Avoid intercepting direct link clicks unless clicking play trigger
        if (e.target.closest('a') && !e.target.closest('.play-gma-btn')) return;

        const videoSrc = card.getAttribute('data-video');
        const embedUrl = card.getAttribute('data-embed');
        const youtubeUrl = card.getAttribute('data-youtube');
        const title = card.getAttribute('data-title');
        const category = card.getAttribute('data-category');
        const client = card.getAttribute('data-client');
        const role = card.getAttribute('data-role');
        const isVertical = category && category.includes('9:16');

        openVideoModal({ videoSrc, embedUrl, youtubeUrl, title, category, client, role, isVertical });
      });
    });
  }
  attachCardClickEvents();

  // Trigger from "XEM FULL SHOWREEL" button on Hero
  const watchShowreelBtn = document.getElementById('watchShowreelBtn');
  if (watchShowreelBtn) {
    watchShowreelBtn.addEventListener('click', () => {
      openVideoModal({
        videoSrc: 'assets/videos/showreel.mp4',
        title: 'PHAM NGUYEN — OFFICIAL CINEMATIC SHOWREEL',
        category: 'HERO SHOWREEL',
        client: 'Phạm Nguyên',
        role: 'Director of Photography, Editor & Colorist',
        isVertical: false
      });
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeVideoModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeVideoModal();
      }
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeVideoModal();
    }
  });

  // =========================================================================
  // 5.1 3D CURVED AUTO-SCROLLING RIBBON ENGINE (SPORTS & ACTION)
  // =========================================================================
  function setupCurvedMarquee({
    containerId,
    trackId,
    pauseBtnId,
    pauseIconId,
    prevBtnId,
    nextBtnId,
    statusTextId,
    basePixelsPerSec = 95,
    direction = 'right-to-left'
  }) {
    const marqueeContainer = document.getElementById(containerId);
    const marqueeTrack = document.getElementById(trackId);
    const pauseBtn = pauseBtnId ? document.getElementById(pauseBtnId) : null;
    const pauseIcon = pauseIconId ? document.getElementById(pauseIconId) : null;
    const prevBtn = prevBtnId ? document.getElementById(prevBtnId) : null;
    const nextBtn = nextBtnId ? document.getElementById(nextBtnId) : null;
    const statusText = statusTextId ? document.getElementById(statusTextId) : null;

    if (!marqueeContainer || !marqueeTrack) return;

    const isLTR = direction === 'left-to-right' || direction === 'ltr';
    const scrollStep = isLTR ? -1 : 1;
    const autoScrollLabel = isLTR ? 'T\u1EF0 \u0110\u1ED8NG (T\u1EEA TR\u00C1I SANG PH\u1EA2I)' : 'T\u1EF0 \u0110\u1ED8NG (T\u1EEA PH\u1EA2I SANG TR\u00C1I)';

    if (statusText) {
      statusText.textContent = autoScrollLabel;
    }

    const cards = Array.from(marqueeTrack.querySelectorAll('.curved-card'));
    let scrollPos = 0; // Current scroll offset in pixels
    let isUserPaused = false;
    let isHovered = false;
    let isDragging = false;
    let isTouching = false;
    let isDirectionLocked = false;
    let isHorizontalSwipe = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastDragX = 0;
    let dragVelocity = 0;
    let lastDragTime = 0;
    let isInView = true;
    let rafId = null;
    let lastTimestamp = performance.now();
    let resumeTimeout = null;

    // Pre-calculate card positions & dimensions to avoid layout thrashing in rAF
    let containerWidth = marqueeContainer.offsetWidth || 1200;
    let cardOffsets = [];
    let singleLoopWidth = 1800;

    function measureLayout() {
      containerWidth = marqueeContainer.offsetWidth || 1200;
      cardOffsets = cards.map(c => ({
        left: c.offsetLeft,
        width: c.offsetWidth || 280
      }));
      const halfIndex = Math.floor(cards.length / 2);
      if (cards.length >= 4 && cardOffsets[halfIndex] && cardOffsets[halfIndex].left > cardOffsets[0].left) {
        singleLoopWidth = cardOffsets[halfIndex].left - cardOffsets[0].left;
      } else {
        singleLoopWidth = (marqueeTrack.scrollWidth / 2) || 3000;
      }
      if (isLTR && scrollPos === 0 && singleLoopWidth > 0) {
        scrollPos = singleLoopWidth;
      }
    }
    // Measure on load and after short delay when styles/fonts are ready
    measureLayout();
    setTimeout(measureLayout, 100);
    setTimeout(measureLayout, 500);

    // Wrap scroll position seamlessly within [0, singleLoopWidth)
    function wrapScrollPos(pos, loopWidth) {
      if (loopWidth <= 0) return pos;
      let wrapped = pos % loopWidth;
      if (wrapped < 0) wrapped += loopWidth;
      return wrapped;
    }

    // High performance 3D curvature update (0 layout reflows, 120 FPS smooth)
    function updateCurvature() {
      const halfContainer = containerWidth / 2;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const offset = cardOffsets[i] || { left: i * 308, width: 280 };
        const cardCenter = (offset.left - scrollPos) + (offset.width / 2);

        // Normalized distance from container center: -1.0 (left) to 0 (center) to +1.0 (right)
        const normDist = (cardCenter - halfContainer) / halfContainer;

        // Culling: if card is far off-screen, skip transform
        if (normDist < -1.6 || normDist > 1.6) {
          continue;
        }

        const clampedDist = Math.max(-1.3, Math.min(1.3, normDist));

        // 3D Parabolic Cylindrical Ribbon Transform (matching reference image):
        // Cards on the left tilt inward (+rotateY)
        // Cards on the right tilt inward (-rotateY)
        // Center card is upright and dips slightly down (translateY)
        const rotY = -clampedDist * 14;
        const rotZ = clampedDist * 2.2;
        const dipY = (1 - Math.pow(Math.abs(clampedDist), 1.8)) * 11;
        const scale = 1 - Math.min(0.06, Math.abs(clampedDist) * 0.045);

        card.style.transform = `perspective(1000px) translateY(${dipY.toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      }
    }

    // Main animation loop: delta-time normalized for identical speed on 60Hz/90Hz/120Hz
    function tick(now) {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;

      if (isInView) {
        if (isDragging) {
          // Track position updated directly by pointer/touch move handler
        } else if (Math.abs(dragVelocity) > 0.4) {
          // Momentum glide after flick/swipe or prev/next click
          scrollPos += dragVelocity * dt * 60;
          dragVelocity *= Math.pow(0.90, dt * 60);
          scrollPos = wrapScrollPos(scrollPos, singleLoopWidth);
          marqueeTrack.style.transform = `translate3d(-${scrollPos.toFixed(1)}px, 0, 0)`;
          updateCurvature();
        } else {
          dragVelocity = 0;
          if (!isUserPaused && !isHovered && !isTouching) {
            // Auto-scroll continuously from right to left!
            scrollPos += scrollStep * basePixelsPerSec * dt;
            scrollPos = wrapScrollPos(scrollPos, singleLoopWidth);
            marqueeTrack.style.transform = `translate3d(-${scrollPos.toFixed(1)}px, 0, 0)`;
            updateCurvature();
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    // Initial render
    marqueeTrack.style.transform = `translate3d(-${scrollPos}px, 0, 0)`;
    setTimeout(updateCurvature, 50);

    // --- MOUSE HOVER PAUSE (Desktop only, ignore touch emulation) ---
    marqueeContainer.addEventListener('mouseenter', (e) => {
      if (e.pointerType === 'mouse' || (!('ontouchstart' in window) && !isTouching)) {
        isHovered = true;
      }
    });
    marqueeContainer.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    // --- MOUSE DRAG / SCRUBBING ---
    marqueeContainer.addEventListener('mousedown', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      isDragging = true;
      hasMovedEnough = false;
      dragStartX = e.pageX;
      lastDragX = e.pageX;
      lastDragTime = performance.now();
      dragVelocity = 0;
      marqueeContainer.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const currentX = e.pageX;
      const deltaX = currentX - lastDragX;
      const totalMoved = currentX - dragStartX;

      if (Math.abs(totalMoved) > 6) {
        hasMovedEnough = true;
      }

      scrollPos -= deltaX;
      scrollPos = wrapScrollPos(scrollPos, singleLoopWidth);
      marqueeTrack.style.transform = `translate3d(-${scrollPos.toFixed(1)}px, 0, 0)`;
      updateCurvature();

      const now = performance.now();
      const dt = now - lastDragTime || 16;
      dragVelocity = -deltaX / (dt / 16);
      lastDragX = currentX;
      lastDragTime = now;
    });

    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      marqueeContainer.classList.remove('is-dragging');
      dragVelocity = Math.max(-28, Math.min(28, dragVelocity));
      setTimeout(() => { hasMovedEnough = false; }, 350);
    });

    // --- TOUCH SWIPE & MOMENTUM (MOBILE OPTIMIZED) ---
    marqueeContainer.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      isHovered = false;
      const t = e.touches[0];
      isTouching = true;
      isDragging = true;
      isDirectionLocked = false;
      isHorizontalSwipe = false;
      hasMovedEnough = false;
      dragStartX = t.clientX;
      dragStartY = t.clientY;
      lastDragX = t.clientX;
      lastDragTime = performance.now();
      dragVelocity = 0;
      clearTimeout(resumeTimeout);
    }, { passive: true });

    marqueeContainer.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const t = e.touches[0];
      const currentX = t.clientX;
      const currentY = t.clientY;

      if (!isDirectionLocked) {
        const dx = Math.abs(currentX - dragStartX);
        const dy = Math.abs(currentY - dragStartY);

        if (dy > dx && dy > 8) {
          isDragging = false;
          isTouching = false;
          return;
        } else if (dx > dy && dx > 8) {
          isHorizontalSwipe = true;
          isDirectionLocked = true;
          marqueeContainer.classList.add('is-dragging');
        } else {
          return;
        }
      }

      if (!isHorizontalSwipe) return;

      const deltaX = currentX - lastDragX;
      const totalMoved = currentX - dragStartX;
      if (Math.abs(totalMoved) > 6) {
        hasMovedEnough = true;
      }

      scrollPos -= deltaX;
      scrollPos = wrapScrollPos(scrollPos, singleLoopWidth);
      marqueeTrack.style.transform = `translate3d(-${scrollPos.toFixed(1)}px, 0, 0)`;
      updateCurvature();

      const now = performance.now();
      const dt = now - lastDragTime || 16;
      dragVelocity = -deltaX / (dt / 16);
      lastDragX = currentX;
      lastDragTime = now;
    }, { passive: true });

    marqueeContainer.addEventListener('touchend', () => {
      if (!isDragging && !isHorizontalSwipe) {
        isTouching = false;
        return;
      }
      isDragging = false;
      isHorizontalSwipe = false;
      isDirectionLocked = false;
      marqueeContainer.classList.remove('is-dragging');

      dragVelocity = Math.max(-30, Math.min(30, dragVelocity));
      setTimeout(() => { hasMovedEnough = false; }, 350);

      resumeTimeout = setTimeout(() => {
        isTouching = false;
      }, 1200);
    }, { passive: true });

    marqueeContainer.addEventListener('touchcancel', () => {
      isDragging = false;
      isTouching = false;
      isHorizontalSwipe = false;
      isDirectionLocked = false;
      marqueeContainer.classList.remove('is-dragging');
      setTimeout(() => { hasMovedEnough = false; }, 350);
    }, { passive: true });

    // --- PAUSE / PLAY TOGGLE BUTTON ---
    if (pauseBtn && pauseIcon) {
      pauseBtn.addEventListener('click', () => {
        isUserPaused = !isUserPaused;
        if (isUserPaused) {
          pauseIcon.classList.remove('fa-pause');
          pauseIcon.classList.add('fa-play');
          pauseBtn.setAttribute('title', 'Ti\u1EBFp t\u1EE5c cu\u1ED9n');
          pauseBtn.setAttribute('aria-label', 'Ti\u1EBFp t\u1EE5c cu\u1ED9n');
          if (statusText) {
            statusText.textContent = '\u0110\u00C3 T\u1EA0M D\u1EEANG (B\u1EA4M \u0110\u1EC2 PH\u00C1T TI\u1EBEP)';
            statusText.className = 'text-gold font-bold';
          }
        } else {
          pauseIcon.classList.remove('fa-play');
          pauseIcon.classList.add('fa-pause');
          pauseBtn.setAttribute('title', 'T\u1EA1m d\u1EEBng cu\u1ED9n');
          pauseBtn.setAttribute('aria-label', 'T\u1EA1m d\u1EEBng cu\u1ED9n');
          if (statusText) {
            statusText.textContent = autoScrollLabel;
            statusText.className = 'text-white font-medium';
          }
        }
      });
    }

    // --- PREV & NEXT JUMP BUTTONS ---
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        dragVelocity = -22;
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        dragVelocity = 22;
      });
    }
        // --- VIEWPORT VISIBILITY OBSERVER ---
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isInView = entry.isIntersecting;
          if (isInView) {
            lastTimestamp = performance.now();
            updateCurvature();
          }
        });
      }, { threshold: 0.01 });
      observer.observe(marqueeContainer);
    }

    // Resize recalculation
    window.addEventListener('resize', () => {
      measureLayout();
      updateCurvature();
    });

    document.addEventListener('visibilitychange', () => {
      lastTimestamp = performance.now();
    });
  }

  // 1. Initialize Subsection 01.1: Gods Of Martial Arts (GMA) - Right to Left
  setupCurvedMarquee({
    containerId: 'curvedMarqueeContainer',
    trackId: 'curvedMarqueeTrack',
    pauseBtnId: 'marqueePauseBtn',
    pauseIconId: 'marqueePauseIcon',
    prevBtnId: 'marqueePrevBtn',
    nextBtnId: 'marqueeNextBtn',
    statusTextId: 'marqueeStatusText',
    basePixelsPerSec: 95,
    direction: 'right-to-left'
  });

  // 2. Initialize Subsection 01.2: Gods Of Martial Arts Warrior (GMA Warrior) - LEFT TO RIGHT (REVERSE)
  setupCurvedMarquee({
    containerId: 'warriorMarqueeContainer',
    trackId: 'warriorMarqueeTrack',
    pauseBtnId: 'warriorPauseBtn',
    pauseIconId: 'warriorPauseIcon',
    prevBtnId: 'warriorPrevBtn',
    nextBtnId: 'warriorNextBtn',
    statusTextId: 'warriorStatusText',
    basePixelsPerSec: 95,
    direction: 'left-to-right'
  });

  // 3. Initialize Subsection 01.3: Fighters Promotion - Right to Left
  setupCurvedMarquee({
    containerId: 'fightersMarqueeContainer',
    trackId: 'fightersMarqueeTrack',
    pauseBtnId: 'fightersPauseBtn',
    pauseIconId: 'fightersPauseIcon',
    prevBtnId: 'fightersPrevBtn',
    nextBtnId: 'fightersNextBtn',
    statusTextId: 'fightersStatusText',
    basePixelsPerSec: 95,
    direction: 'right-to-left'
  });

  // =========================================================================
  // 6. HERO BACKGROUND VIDEO SOUND TOGGLE
  // =========================================================================
  const heroVideo = document.getElementById('heroVideo');
  const heroAudioToggle = document.getElementById('heroAudioToggle');
  const heroAudioIcon = document.getElementById('heroAudioIcon');
  const heroAudioText = document.getElementById('heroAudioText');

  if (heroVideo && heroAudioToggle) {
    heroAudioToggle.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      if (heroVideo.muted) {
        if (heroAudioIcon) heroAudioIcon.className = 'fa-solid fa-volume-xmark';
        if (heroAudioText) heroAudioText.textContent = 'MUTED';
        showToast('Âm thanh Showreel nền: ĐÃ TẮT');
      } else {
        if (heroAudioIcon) heroAudioIcon.className = 'fa-solid fa-volume-high text-gold';
        if (heroAudioText) heroAudioText.textContent = 'SOUND ON';
        showToast('Âm thanh Showreel nền: ĐÃ BẬT');
      }
    });
  }


  // =========================================================================
  // 8. TOAST NOTIFICATIONS
  // =========================================================================
  const toast = document.getElementById('cinematicToast');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // =========================================================================
  // 8.5. SPORTS & ACTION SUB-CATEGORY TABS
  // =========================================================================
  const subtabs = document.querySelectorAll('.sport-subtab-btn');
  subtabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      subtabs.forEach(b => {
        b.classList.remove('active');
        b.classList.add('border-white/10', 'bg-white/[0.03]', 'text-zinc-300');
        b.classList.remove('border-gold/40', 'bg-gold/10', 'text-gold');
      });
      btn.classList.add('active', 'border-gold/40', 'bg-gold/10', 'text-gold');
      btn.classList.remove('border-white/10', 'bg-white/[0.03]', 'text-zinc-300');
    });
  });

  // =========================================================================
  // 9. COPY EMAIL TO CLIPBOARD
  // =========================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'phamnguyendesign31@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Đã sao chép: ${email}`);
        }).catch(() => {
          showToast(`Email: ${email}`);
        });
      } else {
        showToast(`Email: ${email}`);
      }
    });
  }

  // =========================================================================
  // 10. BOOKING FORM SUBMISSION (INTEGRATED FORMSUBMIT AJAX API)
  // =========================================================================
  const bookingForm = document.getElementById('bookingForm');
  const bookingSubmitBtn = document.getElementById('bookingSubmitBtn') || (bookingForm ? bookingForm.querySelector('button[type="submit"]') : null);

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim() || '';
      const phone = document.getElementById('clientPhone')?.value.trim() || '';
      const email = document.getElementById('clientEmail')?.value.trim() || '';
      const projectType = document.getElementById('projectType')?.value || 'Dự án quay phim';
      const message = document.getElementById('clientMessage')?.value.trim() || 'Không có ghi chú thêm.';

      if (!name || !phone || !email) {
        showToast('Vui lòng điền đầy đủ Họ tên, SĐT và Email!');
        return;
      }

      // UI Loading state
      let originalBtnHtml = '';
      if (bookingSubmitBtn) {
        originalBtnHtml = bookingSubmitBtn.innerHTML;
        bookingSubmitBtn.disabled = true;
        bookingSubmitBtn.innerHTML = `
          <i class="fa-solid fa-circle-notch fa-spin text-sm"></i>
          <span>ĐANG GỬI DỮ LIỆU...</span>
        `;
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/phamnguyendesign31@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "Họ và tên": name,
            "Số điện thoại / Zalo": phone,
            "Email liên hệ": email,
            "Thể loại dự án": projectType,
            "Chi tiết mô tả": message,
            "_subject": `🎬 [DỰ ÁN MỚI] ${name} - ${projectType} - Portfolio Phạm Nguyên`,
            "_template": "table",
            "_captcha": "false"
          })
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true)) {
          showToast(`Cảm ơn ${name}! Yêu cầu đã được gửi đến Gmail của Phạm Nguyên.`);
          bookingForm.reset();
        } else {
          // If first submission awaits activation or server confirms
          showToast(`Đã ghi nhận yêu cầu từ ${name}! Tôi sẽ phản hồi sớm.`);
          bookingForm.reset();
        }
      } catch (err) {
        console.error('Lỗi khi gửi form:', err);
        // Fallback notification with direct contact
        showToast(`Không thể gửi tự động. Vui lòng nhắn Zalo: 0707 841 796`);
      } finally {
        if (bookingSubmitBtn) {
          bookingSubmitBtn.disabled = false;
          bookingSubmitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  // =========================================================================
  // 11. MOBILE MENU DRAWER (SMOOTH SLIDE & FADE)
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function openMobileMenu() {
    if (!mobileMenu) return;
    document.body.style.overflow = 'hidden';
    mobileMenu.classList.remove('hidden');
    // Force browser reflow to trigger CSS transition
    void mobileMenu.offsetHeight;
    mobileMenu.classList.remove('menu-closed');
    mobileMenu.classList.add('menu-open');
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    document.body.style.overflow = '';
    mobileMenu.classList.remove('menu-open');
    mobileMenu.classList.add('menu-closed');
    setTimeout(() => {
      if (mobileMenu.classList.contains('menu-closed')) {
        mobileMenu.classList.add('hidden');
      }
    }, 280);
  }

  window.closeMobileMenu = closeMobileMenu;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      if (mobileMenu.classList.contains('menu-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('menu-open')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });
  }

  // =========================================================================
  // 12. GSAP SCROLLTRIGGER REVEAL ANIMATIONS (MOBILE ACCELERATED)
  // =========================================================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Prevent recalculation jitter when mobile URL bar hides/shows on scroll
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      fastScrollEnd: true
    });

    const isMobile = window.innerWidth < 768;

    // Hero content entrance
    gsap.from('#hero h1', {
      duration: isMobile ? 0.6 : 1.2,
      y: isMobile ? 16 : 50,
      opacity: 0,
      ease: 'power2.out',
      delay: 0.1,
      clearProps: 'all'
    });

    gsap.from('#hero p, #hero .flex-wrap', {
      duration: isMobile ? 0.5 : 1.0,
      y: isMobile ? 12 : 30,
      opacity: 0,
      ease: 'power2.out',
      delay: isMobile ? 0.2 : 0.35,
      stagger: isMobile ? 0.05 : 0.12,
      clearProps: 'all'
    });

    // Scene sections reveal
    document.querySelectorAll('section[id^="scene-"], #about, #contact').forEach((section) => {
      // Reveal headings, static project cards, and carousel wrapper (do NOT hide individual slides)
      const revealTargets = section.querySelectorAll('h2, .gma-carousel-wrapper, .project-card:not(.gma-carousel-slide), .scene-watermark');
      if (revealTargets.length > 0) {
        gsap.from(revealTargets, {
          scrollTrigger: {
            trigger: section,
            start: isMobile ? 'top 92%' : 'top 85%',
            toggleActions: 'play none none none',
            fastScrollEnd: isMobile
          },
          duration: isMobile ? 0.45 : 0.85,
          y: isMobile ? 12 : 25,
          opacity: 0,
          stagger: isMobile ? 0.04 : 0.1,
          ease: 'power2.out',
          clearProps: 'opacity,visibility,transform'
        });
      }
    });
  }

  // =========================================================================
  // 12. FLOATING BACK TO TOP BUTTON WITH CIRCULAR SCROLL PROGRESS
  // =========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  const scrollProgressCircle = document.getElementById('scrollProgressCircle');

  if (backToTopBtn) {
    const circumference = 2 * Math.PI * 21; // ~131.95px
    let isScrollTicking = false;

    function updateBackToTopState() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      // Show button after scrolling down 300px
      if (scrollTop > 300) {
        backToTopBtn.classList.add('btn-visible');
      } else {
        backToTopBtn.classList.remove('btn-visible');
      }

      // Update circular scroll progress ring
      if (scrollProgressCircle && scrollHeight > 0) {
        const progress = Math.min(1, Math.max(0, scrollTop / scrollHeight));
        const offset = circumference - (progress * circumference);
        scrollProgressCircle.style.strokeDashoffset = offset.toFixed(1);
      }

      isScrollTicking = false;
    }

    window.addEventListener('scroll', () => {
      if (!isScrollTicking) {
        requestAnimationFrame(updateBackToTopState);
        isScrollTicking = true;
      }
    }, { passive: true });

    // Smooth scroll to top on click/tap
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(0);
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });

    // Check initial scroll on page load
    updateBackToTopState();
  }

});
