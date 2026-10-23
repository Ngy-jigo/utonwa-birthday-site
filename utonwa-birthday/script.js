const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
let musicStarted = false;

musicToggle.addEventListener('click', async () => {
  if (!musicStarted) {
    try {
      await music.play();
      musicStarted = true;
      musicLabel.textContent = 'Pause music';
      musicToggle.setAttribute('aria-label', 'Pause background music');
    } catch (error) {
      musicLabel.textContent = 'Add MP3 first';
      const note = document.getElementById('shareNote');
      note.textContent = 'To enable music, add a licensed instrumental file at music/soft-instrumental.wav, then reload the page.';
    }
  } else if (music.paused) {
    await music.play();
    musicLabel.textContent = 'Pause music';
    musicToggle.setAttribute('aria-label', 'Pause background music');
  } else {
    music.pause();
    musicLabel.textContent = 'Play music';
    musicToggle.setAttribute('aria-label', 'Play background music');
  }
});
music.addEventListener('ended', () => {
  musicStarted = false;
  musicLabel.textContent = 'Play music';
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
document.querySelectorAll('.gallery-card').forEach(card => {
  card.addEventListener('click', () => {
    lightboxImage.src = card.dataset.full;
    lightbox.showModal();
  });
});
document.getElementById('closeLightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});

document.getElementById('shareButton').addEventListener('click', async () => {
  const shareData = {
    title: 'Happy Birthday, Utonwa!',
    text: 'Celebrate Amanze Chidinma — a beautiful soul and a treasured childhood friend. Happy birthday, Utonwa! ❤️',
    url: window.location.href
  };
  const note = document.getElementById('shareNote');
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      note.textContent = 'Thank you for sharing Utonwa’s celebration.';
    } catch (error) {
      if (error.name !== 'AbortError') note.textContent = 'You can copy this page link and share it on WhatsApp.';
    }
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      note.textContent = 'Website link copied. You can now share it on WhatsApp.';
    } catch (error) {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + ' ')}${url}`, '_blank', 'noopener');
    }
  }
});
