// Get all info cards
const infoCards = document.querySelectorAll('.info-card');
const fullscreenModal = document.getElementById('fullscreen-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.modal-close');
const mainImage = document.getElementById('main-image');
const backButton = document.getElementById('back-button');

// Store the original image source
const originalImageSrc = 'Frame 1.png';
let currentImageSrc = originalImageSrc;

// Add click event listeners to each card
infoCards.forEach(card => {
    const cardHeader = card.querySelector('.card-header');

    cardHeader.addEventListener('click', (e) => {
        e.stopPropagation();

        // Check if this is an image switch card
        if (card.classList.contains('image-switch-card')) {
            const newImageSrc = card.getAttribute('data-switch-image');
            if (newImageSrc) {
                mainImage.src = newImageSrc;
                currentImageSrc = newImageSrc;
                backButton.classList.add('visible');
                // Hide all other clickable cards when viewing detail image
                infoCards.forEach(c => {
                    if (!c.classList.contains('image-switch-card')) {
                        c.style.display = 'none';
                    }
                });
            }
        } else {
            // Regular popup behavior
            // Check if this card is already active
            const isActive = card.classList.contains('active');

            // Close all other cards
            infoCards.forEach(c => c.classList.remove('active'));

            // Toggle this card (close if it was open, open if it was closed)
            if (!isActive) {
                card.classList.add('active');
            }
        }
    });
});

// Back button functionality
backButton.addEventListener('click', (e) => {
    e.stopPropagation();
    mainImage.src = originalImageSrc;
    currentImageSrc = originalImageSrc;
    backButton.classList.remove('visible');
    // Show all cards again
    infoCards.forEach(c => {
        c.style.display = '';
    });
});

// Close modal when clicking the X button
if (modalClose) {
    modalClose.addEventListener('click', () => {
        fullscreenModal.classList.remove('active');
    });
}

// Close modal when clicking outside the image
if (fullscreenModal) {
    fullscreenModal.addEventListener('click', (e) => {
        if (e.target === fullscreenModal) {
            fullscreenModal.classList.remove('active');
        }
    });
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.info-card')) {
        infoCards.forEach(card => card.classList.remove('active'));
    }
});

// Close popup when clicking inside the popup itself (optional behavior)
// Comment out if you want popups to stay open when clicked inside
document.querySelectorAll('.card-popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Optional: Add keyboard support (ESC to close)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Check if we're viewing a different image and go back
        if (backButton.classList.contains('visible')) {
            backButton.click();
        } else if (fullscreenModal && fullscreenModal.classList.contains('active')) {
            // Close modal if it's open
            fullscreenModal.classList.remove('active');
        } else {
            // Otherwise close popups
            infoCards.forEach(card => card.classList.remove('active'));
        }
    }

    // Press 'D' key to toggle debug mode (shows clickable areas)
    if (e.key === 'd' || e.key === 'D') {
        document.body.classList.toggle('debug');
        console.log('Debug mode:', document.body.classList.contains('debug') ? 'ON' : 'OFF');
    }
});

// Optional: Auto-close popups after a certain time (useful for kiosk mode)
// Uncomment the following code if you want auto-close functionality
/*
let autoCloseTimer;

infoCards.forEach(card => {
    const cardHeader = card.querySelector('.card-header');

    cardHeader.addEventListener('click', () => {
        // Clear any existing timer
        if (autoCloseTimer) {
            clearTimeout(autoCloseTimer);
        }

        // Set new timer to auto-close after 10 seconds
        autoCloseTimer = setTimeout(() => {
            card.classList.remove('active');
        }, 10000); // 10 seconds
    });
});
*/
