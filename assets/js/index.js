document.addEventListener('DOMContentLoaded', function () {
    const playPauseButton = document.getElementById('playPauseButton');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const heroVideo = document.querySelector('.hero-video');
    const heroBanner = document.querySelector('.hero-banner');

    playPauseButton.addEventListener('click', () => {
        if (heroVideo.paused) {
            // Play the video
            heroVideo.play();
            // Change to the pause icon
            playPauseIcon.src = "assets/images/icons/video-pause-icon.svg"; // Update this path for the pause icon
            // Hide the static banner image
            heroBanner.classList.add('video-playing');
        } else {
            // Pause the video
            heroVideo.pause();
            // Change to the play icon
            playPauseIcon.src = "assets/images/icons/video-play-icon.svg"; // Update this path for the play icon

            // Reset the video and force the poster to show up
            heroVideo.currentTime = 0;

            // Hide video and show the poster image manually
            heroVideo.load(); // This will force the video to reload and show the poster
            heroBanner.classList.remove('video-playing'); // Shows the static banner image
        }
    });

    document.querySelectorAll('.product-change').forEach(item => {
        item.addEventListener('click', function() {
          // Get the target content ID
          const targetId = this.getAttribute('data-target');
          
          // Hide all content containers
          document.querySelectorAll('.content-container').forEach(container => {
            container.classList.remove('show');
            container.style.display = 'none';
          });
      
          // Show the selected content with fade effect
          const targetContent = document.getElementById(targetId);
          targetContent.style.display = 'block';
          setTimeout(() => {
            targetContent.classList.add('show');
          }, 10); // Small delay to trigger the fade-in effect
        });
      });

    // Get the tractor images and the footer element
    const tractorStartImg = document.querySelector('.footer-tractor-start-img');
    const tractorEndImg = document.querySelector('.footer-tractor-end-img');
    const footer = document.querySelector('.footer');
  
    // let lastScrollTop = 0;  // To track the previous scroll position
  
    if (tractorStartImg && tractorEndImg && footer) {  // Ensure elements exist on the page
        console.log(tractorStartImg,tractorEndImg,footer,"checkkkk")
        let lastScrollTop = 0;
    
        window.addEventListener('scroll', function () {
          const footerTop = footer.getBoundingClientRect().top;
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
          if (footerTop <= window.innerHeight) {
            if (scrollTop > lastScrollTop) {
              tractorStartImg.style.transform = 'translateX(-100px)';
              tractorEndImg.style.transform = 'translateX(-100px)';
            } else {
              tractorStartImg.style.transform = 'translateX(100px)';
              tractorEndImg.style.transform = 'translateX(100px)';
            }
          }
    
          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
      }

    // Function to initialize a slider at homepage
    function initHomeSlider(sliderWrapperSelector, nextBtnSelector, prevBtnSelector, dotsContainerSelector) {
        const sliderWrapper = document.querySelector(sliderWrapperSelector);
        const nextBtn = document.querySelector(nextBtnSelector);
        const prevBtn = document.querySelector(prevBtnSelector);
        const dots = document.querySelectorAll(`${dotsContainerSelector} .home-indicator`);
        let activeIndex = 0;
        const totalCards = sliderWrapper.children.length;
  
        // Function to update the active dot
        function updateActiveDot(index) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
  
        // Set the initial active dot
        updateActiveDot(activeIndex);
  
        nextBtn.addEventListener('click', () => {
            const firstCard = sliderWrapper.firstElementChild;
            const sliderWidth = sliderWrapper.offsetWidth; // Get the width of the slider wrapper
            const cardWidth = firstCard.offsetWidth; // Get the width of one card
            const translatePercentage = (cardWidth / sliderWidth) * 100; // Calculate translateX based on card width
  
            sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
            sliderWrapper.style.transform = `translateX(-${translatePercentage}%)`;
  
            sliderWrapper.addEventListener('transitionend', () => {
                sliderWrapper.style.transition = 'none';
                sliderWrapper.appendChild(firstCard); // Move first card to the end
                sliderWrapper.style.transform = 'translateX(0)'; // Reset the position
  
                // Update the active dot
                activeIndex = (activeIndex + 1) % totalCards;
                updateActiveDot(activeIndex);
            }, { once: true });
        });

        prevBtn.addEventListener('click', () => {
            const lastCard = sliderWrapper.lastElementChild;
            const sliderWidth = sliderWrapper.offsetWidth; // Get the width of the slider wrapper
            const cardWidth = lastCard.offsetWidth; // Get the width of one card
            const translatePercentage = (cardWidth / sliderWidth) * 100; // Calculate translateX based on card width

            // Move the last card to the beginning instantly without animation
            sliderWrapper.style.transition = 'none';
            sliderWrapper.prepend(lastCard);

            // Position the slider to the left before animating it back to 0
            sliderWrapper.style.transform = `translateX(-${translatePercentage}%)`;

            setTimeout(() => {
                sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
                sliderWrapper.style.transform = 'translateX(0)'; // Animate back to the original position
            }, 0);

            // Update the active dot and handle index wrap-around
            activeIndex = (activeIndex - 1 + totalCards) % totalCards;
            updateActiveDot(activeIndex);
        });
      }
  
        // Initialize the sliders
        initHomeSlider('#homeSlider .home-slider-wrapper', '#nextBtnHome', '#prevBtnHome', '.home-indicators-container');

});
