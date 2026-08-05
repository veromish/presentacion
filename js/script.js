/* ==========================================================================
   Vero's Personal Web Application - JavaScript (Multi-page version)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // -----------------------------------------------------------------------
    // 1. Image Modal Lightbox — works on every page
    // -----------------------------------------------------------------------
    const imageModalEl = document.getElementById('imageViewerModal');
    if (imageModalEl) {
        const imageModal  = new bootstrap.Modal(imageModalEl);
        const modalImage  = document.getElementById('modalImagePreview');
        const modalTitle  = document.getElementById('modalImageTitle');

        document.querySelectorAll('.viewable-img, .collage-item img, .profile-avatar').forEach(function (img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function () {
                if (modalImage && modalTitle) {
                    modalImage.src = this.getAttribute('src');
                    modalTitle.textContent = this.getAttribute('alt') || 'Fotografía de Vero';
                    imageModal.show();
                }
            });
        });
    }

    // -----------------------------------------------------------------------
    // 2. Vinyl / Music Player toggle — only on musica.html
    // -----------------------------------------------------------------------
    var playBtn   = document.getElementById('playMusicBtn');
    var vinyl     = document.getElementById('vinylDisc');
    var audioBars = document.getElementById('audioBars');
    var isPlaying = false;

    if (playBtn && vinyl && audioBars) {
        playBtn.addEventListener('click', function () {
            isPlaying = !isPlaying;
            if (isPlaying) {
                vinyl.classList.add('vinyl-spinning');
                audioBars.style.display = 'flex';
                this.innerHTML = '<i class="bi bi-pause-fill"></i> Pausar Vibes';
                showToast('🎵 Reproduciendo los mejores temas de Kenia OS...');
            } else {
                vinyl.classList.remove('vinyl-spinning');
                audioBars.style.display = 'none';
                this.innerHTML = '<i class="bi bi-play-fill"></i> Reproducir Vibes';
                showToast('⏸️ Música pausada');
            }
        });
    }

    // -----------------------------------------------------------------------
    // 3. Interactive Sticker Click Handler — only on stickers.html
    // -----------------------------------------------------------------------
    document.querySelectorAll('.sticker-item').forEach(function (sticker) {
        sticker.addEventListener('click', function () {
            var labelEl = this.querySelector('.sticker-label');
            var label   = labelEl ? labelEl.textContent : 'Sticker';

            // Bounce animation
            this.style.transform = 'scale(1.28) rotate(-5deg)';
            var self = this;
            setTimeout(function () {
                self.style.transform = '';
            }, 320);

            showToast('✨ ¡Sticker "' + label + '" seleccionado! ❤️');
        });
    });

    // -----------------------------------------------------------------------
    // 4. Song card hover feedback — only on musica.html
    // -----------------------------------------------------------------------
    document.querySelectorAll('.song-card').forEach(function (card) {
        card.addEventListener('click', function () {
            var titleEl = this.querySelector('.song-title');
            var title   = titleEl ? titleEl.textContent : 'Canción';
            showToast('🎵 Escuchando: ' + title);
        });
    });

    // -----------------------------------------------------------------------
    // 5. Highlight active nav link based on current page filename
    // -----------------------------------------------------------------------
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#veroNavbar .nav-link').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentFile) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // -----------------------------------------------------------------------
    // 6. Toast helper — available globally on every page
    // -----------------------------------------------------------------------
    window.showToast = function (message) {
        var toastEl   = document.getElementById('liveToast');
        var toastBody = document.getElementById('toastMessageBody');
        if (toastEl && toastBody) {
            toastBody.textContent = message;
            var toast = new bootstrap.Toast(toastEl, { delay: 2500 });
            toast.show();
        }
    };

    // -----------------------------------------------------------------------
    // 7. Fade-in animation on page load for .hero-card and .feature-card
    // -----------------------------------------------------------------------
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity    = '1';
                entry.target.style.transform  = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hero-card, .feature-card, .song-card').forEach(function (el) {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

});
