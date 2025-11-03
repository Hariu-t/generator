/**
 * Common UI Components Library
 * Vanilla JavaScript implementation for all UI interactions
 * No dependencies required
 */

(function() {
  'use strict';

  // Initialize all components when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
  } else {
    initializeAll();
  }

  function initializeAll() {
    try {
      initAccordions();
      initSliders();
      initTabs();
      initModals();
      initToggleExpanded();
      initSmoothScroll();
      console.log('Common UI components initialized successfully');
    } catch (error) {
      console.error('Error initializing components:', error);
    }
  }

  /**
   * Accordion functionality
   * Uses data-accordion-trigger and data-accordion-content attributes
   */
  function initAccordions() {
    const triggers = document.querySelectorAll('[data-accordion-trigger]');

    triggers.forEach(trigger => {
      const id = trigger.getAttribute('data-accordion-trigger');
      const content = document.querySelector(`[data-accordion-content="${id}"]`);
      const icon = document.querySelector(`[data-accordion-icon="${id}"]`);

      if (!content) {
        console.warn(`Accordion content not found for ID: ${id}`);
        return;
      }

      // Set initial ARIA attributes
      const isOpen = content.classList.contains('is-open');
      trigger.setAttribute('aria-expanded', isOpen);
      content.setAttribute('aria-hidden', !isOpen);

      trigger.addEventListener('click', function() {
        const isCurrentlyOpen = content.classList.contains('is-open');

        // Toggle open state
        content.classList.toggle('is-open');
        trigger.classList.toggle('is-active');

        // Update ARIA attributes
        trigger.setAttribute('aria-expanded', !isCurrentlyOpen);
        content.setAttribute('aria-hidden', isCurrentlyOpen);

        // Rotate icon if present
        if (icon) {
          icon.classList.toggle('is-rotated');
        }
      });
    });
  }

  /**
   * Slider functionality
   * Uses data-slider attributes for carousel/slideshow
   */
  function initSliders() {
    const sliders = document.querySelectorAll('[data-slider]');

    sliders.forEach(slider => {
      const sliderId = slider.getAttribute('data-slider');
      const slides = slider.querySelectorAll('[data-slider-item]');
      const prevBtn = slider.querySelector('[data-slider-prev]');
      const nextBtn = slider.querySelector('[data-slider-next]');
      const dots = slider.querySelectorAll('[data-slider-dot]');
      const autoplayDelay = parseInt(slider.getAttribute('data-slider-autoplay')) || 8000;

      if (slides.length === 0) {
        console.warn(`No slides found for slider: ${sliderId}`);
        return;
      }

      let currentIndex = 0;
      let autoplayTimer = null;

      function showSlide(index) {
        // Normalize index
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        currentIndex = index;

        // Hide all slides
        slides.forEach(slide => {
          slide.classList.remove('is-active');
          slide.setAttribute('aria-hidden', 'true');
        });

        // Show current slide
        slides[currentIndex].classList.add('is-active');
        slides[currentIndex].setAttribute('aria-hidden', 'false');

        // Update dots
        dots.forEach((dot, i) => {
          dot.classList.toggle('is-active', i === currentIndex);
          dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
        });
      }

      function nextSlide() {
        showSlide(currentIndex + 1);
      }

      function prevSlide() {
        showSlide(currentIndex - 1);
      }

      function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, autoplayDelay);
      }

      function stopAutoplay() {
        if (autoplayTimer) {
          clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      }

      // Previous button
      if (prevBtn) {
        prevBtn.addEventListener('click', function() {
          prevSlide();
          stopAutoplay();
        });
      }

      // Next button
      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          nextSlide();
          stopAutoplay();
        });
      }

      // Dot navigation
      dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
          showSlide(index);
          stopAutoplay();
        });
      });

      // Pause autoplay on hover
      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);

      // Initialize
      showSlide(0);
      startAutoplay();
    });
  }

  /**
   * Tab functionality
   * Uses data-tab-trigger and data-tab-content attributes
   */
  function initTabs() {
    const tabGroups = document.querySelectorAll('[data-tab-group]');

    tabGroups.forEach(group => {
      const groupId = group.getAttribute('data-tab-group');
      const triggers = group.querySelectorAll('[data-tab-trigger]');

      triggers.forEach(trigger => {
        const tabId = trigger.getAttribute('data-tab-trigger');
        const content = document.querySelector(`[data-tab-content="${tabId}"]`);

        if (!content) {
          console.warn(`Tab content not found for ID: ${tabId}`);
          return;
        }

        trigger.addEventListener('click', function() {
          // Deactivate all tabs in this group
          triggers.forEach(t => {
            t.classList.remove('is-active');
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
          });

          // Hide all content in this group
          const allContent = document.querySelectorAll(`[data-tab-content][data-tab-group="${groupId}"]`);
          allContent.forEach(c => {
            c.classList.remove('is-active');
            c.setAttribute('aria-hidden', 'true');
          });

          // Activate current tab
          trigger.classList.add('is-active');
          trigger.setAttribute('aria-selected', 'true');
          trigger.setAttribute('tabindex', '0');
          content.classList.add('is-active');
          content.setAttribute('aria-hidden', 'false');
        });

        // Keyboard navigation
        trigger.addEventListener('keydown', function(e) {
          let targetTrigger = null;
          const triggersArray = Array.from(triggers);
          const currentIndex = triggersArray.indexOf(trigger);

          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            targetTrigger = triggersArray[currentIndex + 1] || triggersArray[0];
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            targetTrigger = triggersArray[currentIndex - 1] || triggersArray[triggersArray.length - 1];
          } else if (e.key === 'Home') {
            e.preventDefault();
            targetTrigger = triggersArray[0];
          } else if (e.key === 'End') {
            e.preventDefault();
            targetTrigger = triggersArray[triggersArray.length - 1];
          }

          if (targetTrigger) {
            targetTrigger.click();
            targetTrigger.focus();
          }
        });
      });

      // Set initial ARIA attributes
      if (triggers.length > 0) {
        triggers[0].setAttribute('aria-selected', 'true');
        triggers[0].setAttribute('tabindex', '0');
        triggers.forEach((t, i) => {
          if (i > 0) {
            t.setAttribute('aria-selected', 'false');
            t.setAttribute('tabindex', '-1');
          }
        });
      }
    });
  }

  /**
   * Modal functionality
   * Uses data-modal-open, data-modal-close, and data-modal attributes
   */
  function initModals() {
    const openButtons = document.querySelectorAll('[data-modal-open]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');

    openButtons.forEach(button => {
      const modalId = button.getAttribute('data-modal-open');
      const modal = document.querySelector(`[data-modal="${modalId}"]`);

      if (!modal) {
        console.warn(`Modal not found for ID: ${modalId}`);
        return;
      }

      button.addEventListener('click', function() {
        openModal(modal);
      });
    });

    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const modal = button.closest('[data-modal]');
        if (modal) {
          closeModal(modal);
        }
      });
    });

    // Close on overlay click
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal-overlay')) {
        const modal = e.target.querySelector('[data-modal]');
        if (modal) {
          closeModal(modal);
        }
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('[data-modal].is-open');
        if (openModal) {
          closeModal(openModal);
        }
      }
    });

    function openModal(modal) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');

      // Focus first focusable element
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length > 0) {
        focusable[0].focus();
      }

      // Setup focus trap
      setupFocusTrap(modal);
    }

    function closeModal(modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }

    function setupFocusTrap(modal) {
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;

      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      modal.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      });
    }
  }

  /**
   * Toggle expanded functionality
   * Uses data-toggle-expanded attribute
   */
  function initToggleExpanded() {
    const toggleButtons = document.querySelectorAll('[data-toggle-expanded]');

    toggleButtons.forEach(button => {
      const contentId = button.getAttribute('data-toggle-expanded');
      const content = document.querySelector(`[data-expanded-content="${contentId}"]`);
      const showMoreText = button.getAttribute('data-show-more-text') || 'もっと見る';
      const showLessText = button.getAttribute('data-show-less-text') || '閉じる';

      if (!content) {
        console.warn(`Expanded content not found for ID: ${contentId}`);
        return;
      }

      button.addEventListener('click', function() {
        const isExpanded = content.classList.contains('is-expanded');

        content.classList.toggle('is-expanded');
        button.textContent = isExpanded ? showMoreText : showLessText;
        button.setAttribute('aria-expanded', !isExpanded);
        content.setAttribute('aria-hidden', isExpanded);
      });
    });
  }

  /**
   * Smooth scroll functionality
   * Automatically applied to all anchor links
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          const offset = 80; // Offset for fixed headers
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

})();
