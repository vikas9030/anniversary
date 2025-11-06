document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('body');

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        // Random horizontal position
        heart.style.left = Math.random() * 100 + 'vw';

        // Random animation duration
        heart.style.animationDuration = (Math.random() * 2 + 5) + 's'; // 5s to 7s

        container.appendChild(heart);

        // Remove the heart after it falls to keep the DOM clean
        setTimeout(() => {
            heart.remove();
        }, 7000); // Should be same or more than animation duration
    }

    // Create a new heart every 300 milliseconds
    setInterval(createHeart, 300);

    // Handle the click effect for the next page button
    const nextPageHeartBtn = document.getElementById('nextPageHeartBtn');
    if (nextPageHeartBtn) {
        nextPageHeartBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default navigation immediately
            nextPageHeartBtn.classList.add('clicked'); // Add class to trigger animation

            // Navigate after the animation plays
            setTimeout(() => {
                window.location.href = 'special-message.html';
            }, 500); // Match this duration to the CSS animation duration
        });
    }

    // --- Gallery Slider Logic ---
    // This code will only run if it finds a .gallery-slider element on the page
    const slider = document.querySelector('.gallery-slider');
    if (slider) {
        const wrapper = slider.querySelector('.gallery-wrapper');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const items = slider.querySelectorAll('.photo-item');
        const itemCount = items.length;
        let currentIndex = 0;

        function showSlide(index) {
            // Remove animation class from all items
            items.forEach(item => {
                const frame = item.querySelector('.vintage-frame'); // The main photo frame
                const caption = item.querySelector('.photo-caption'); // The caption text
                const date = item.querySelector('.photo-date'); // The date text

                // Reset animations so they can replay
                if (frame && caption && date) {
                    caption.style.animation = 'none';
                    date.style.animation = 'none';
                    frame.style.animation = 'none';
                }
            });

            if (index < 0) {
                index = itemCount - 1;
            } else if (index >= itemCount) {
                index = 0;
            }
            const activeFrame = items[index].querySelector('.vintage-frame');
            const activeCaption = items[index].querySelector('.photo-caption');
            const activeDate = items[index].querySelector('.photo-date');

            // Trigger the animations on the new active slide
            activeFrame.style.animation = `slideInEffect 0.6s ease-out forwards`;
            activeCaption.style.animation = `slideUpCaption 0.5s ease-out 0.5s forwards`;
            activeDate.style.animation = `fadeInDate 0.5s ease-out 0.8s forwards`;

            // Move the wrapper
            wrapper.style.transform = `translateX(-${index * 100}%)`;

            currentIndex = index;
        }

        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });

        // Swipe functionality
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) { // Swiped left
                showSlide(currentIndex + 1);
            } else if (touchEndX > touchStartX + 50) { // Swiped right
                showSlide(currentIndex - 1);
            }
        });

        // Initial animation for the first slide
        showSlide(0);
    }
});