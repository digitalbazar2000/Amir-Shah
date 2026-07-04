/**
 * Luxury Personal Portfolio - Interactive Scripts
 * Pure Vanilla JavaScript with Smooth Animations & Cinematic Feel
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modular elements
  initPreloader();
  initCustomCursor();
  initMouseGlow();
  initScrollReveals();
  initActiveNavHighlighting();
  initPortfolioFilters();
  initProjectModals();
  initContactForm();
});

/* --- Preloader --- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Let the CSS animation complete, then fade out
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      // Trigger animations for the Hero title after preloader clears
      document.querySelectorAll('.hero-title-text').forEach(el => {
        el.style.animationPlayState = 'running';
      });
    }, 2000);
  });

  // Fallback in case loading takes too long
  setTimeout(() => {
    if (!preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  }, 4000);
}

/* --- Custom Cursor Physics --- */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const outline = document.querySelector('.custom-cursor-outline');
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0; // Target position (mouse coordinates)
  let outlineX = 0, outlineY = 0; // Current position of the delayed outline
  let dotX = 0, dotY = 0; // Current position of the dot

  // Track actual mouse movement
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Render loop using requestAnimationFrame for smooth 60fps interpolation
  function updateCursor() {
    // Lerp dot position (very fast catchup)
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    
    // Lerp outline position (slow, smooth spring-like delay)
    outlineX += (mouseX - outlineX) * 0.12;
    outlineY += (mouseY - outlineY) * 0.12;

    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  // Hover effect states for all interactive tags
  const clickables = document.querySelectorAll('a, button, .interactive-item, input, textarea, select');
  clickables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    item.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

/* --- Interactive Mouse Glow Tracker --- */
function initMouseGlow() {
  const glow = document.querySelector('.mouse-tracker-glow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animate glow with a slight delay for fluid movement
  function animateGlow() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;

    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* --- Reveal on Scroll --- */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, no need to keep observing
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.12, // Trigger when 12% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly offset bottom threshold
  });

  reveals.forEach(el => revealObserver.observe(el));
}

/* --- Active Navbar Navigation Highlighting --- */
function initActiveNavHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserverCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('nav-link-active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-link-active');
          }
        });
      }
    });
  };

  // Observe active sections
  const navObserver = new IntersectionObserver(navObserverCallback, {
    root: null,
    threshold: 0.3, // Highlight when section occupies 30% of view
    rootMargin: '-20% 0px -40% 0px' // Offset to match main sightline
  });

  sections.forEach(section => navObserver.observe(section));
}

/* --- Portfolio Project Filtering System --- */
function initPortfolioFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectItems = document.querySelectorAll('.work-grid-item');
  const gridContainer = document.querySelector('.work-grid-container');

  if (filterTabs.length === 0 || projectItems.length === 0) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs, add to clicked
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedCategory = tab.getAttribute('data-filter');

      // Animate grid items out first, then toggle visibility and animate in
      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* --- Project Modals --- */
// Comprehensive portfolio projects data with high-end architectural descriptions
const projectData = {
  1: {
    title: "33kV Distribution Grid Commissioning",
    category: "Electrical Networks",
    client: "Gas Transmission & Distribution Corp",
    year: "2025",
    description: "Erection, commissioning, and operational management of high-voltage substation networks. Handled load profiling, protective relay coordination schemes, and safety testing parameters to secure resilient power feeds for critical gas compressor stations.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Grid Erection", "Substation Protection", "Commissioning Protocols", "Network Optimization"],
    link: "#"
  },
  2: {
    title: "Gas Compressor Power Plant Integration",
    category: "Project Management",
    client: "Federal Gas Distribution Union",
    year: "2024",
    description: "Comprehensive design-to-delivery project management of industrial gas distribution power hubs. Coordinated multi-disciplinary engineering guilds to integrate redundant generator clusters, main switchgear interfaces, and remote telemetry control boards.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    tags: ["Project Management", "Industrial Switchgear", "Redundant Generators", "Critical Infrastructure"],
    link: "#"
  },
  3: {
    title: "High-Power Induction Machine Diagnostics",
    category: "Machine Operations",
    client: "Industrial Transmission Guild",
    year: "2023",
    description: "Maintenance, preventative insulation diagnostics, and operational optimization of high-power induction machines. Integrated thermal tracking models and automated vibration sensors to extend mechanical lifecycles and avoid catastrophic failure windows.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    tags: ["Induction Machines", "Predictive Maintenance", "Insulation Testing", "Thermal Telemetry"],
    link: "#"
  },
  4: {
    title: "Substation Telecontrol Switchgear",
    category: "Electrical Networks",
    client: "Gas Distribution Network",
    year: "2025",
    description: "Modernization and commissioning of medium-voltage digital switchgear units. Configured automated busbar transfer switches, remote control RTUs, and real-time power quality monitors, maximizing system uptime across distribution pipelines.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    tags: ["MV Switchgear", "RTU Integration", "Power Quality Analysis", "Commissioning"],
    link: "#"
  },
  5: {
    title: "Synchronous Machine Refurbishment",
    category: "Machine Operations",
    client: "Heavy Industries Power",
    year: "2024",
    description: "On-site stator winding refurbishment and excitation system tuning for a main standby synchronous generator. Re-aligned rotor-stator air gaps and calibrated digital automatic voltage regulators (AVR) to secure grid-compliant voltage tolerances.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    tags: ["Standby Generators", "AVR Calibration", "Rotor-Stator Alignment", "Machine Maintenance"],
    link: "#"
  },
  6: {
    title: "Integrated Operations Control Center",
    category: "Project Management",
    client: "State Transmission Authority",
    year: "2025",
    description: "Architected a state-of-the-art power distribution control room. Managed physical site erection, integrated dual-redundant UPS backup stations, and set up dynamic video walls displaying unified SCADA grid telemetry parameters.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    tags: ["SCADA Command Center", "UPS Systems", "Operations Erection", "Telemetry Integration"],
    link: "#"
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const openBtns = document.querySelectorAll('.open-project-detail');

  if (!modal || !closeBtn || openBtns.length === 0) return;

  // Modal template elements
  const modalImage = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalClient = document.getElementById('modal-client');
  const modalYear = document.getElementById('modal-year');
  const modalCategory = document.getElementById('modal-category');
  const modalDescription = document.getElementById('modal-desc');
  const modalTagsContainer = document.getElementById('modal-tags');
  const modalLink = document.getElementById('modal-link');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const data = projectData[projectId];

      if (!data) return;

      // Populate modal with accurate luxury data
      if (modalImage) {
        modalImage.setAttribute('src', data.image);
        modalImage.setAttribute('alt', data.title);
      }
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalClient) modalClient.textContent = data.client;
      if (modalYear) modalYear.textContent = data.year;
      if (modalCategory) modalCategory.textContent = data.category;
      if (modalDescription) modalDescription.textContent = data.description;
      
      if (modalTagsContainer) {
        modalTagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
          const span = document.createElement('span');
          span.className = 'px-3 py-1 text-xs border border-white/5 bg-white/5 rounded-full text-slate-300 font-mono';
          span.textContent = tag;
          modalTagsContainer.appendChild(span);
        });
      }

      if (modalLink) {
        modalLink.setAttribute('href', '#contact');
        // Close modal when clicked to allow scrolling
        modalLink.onclick = () => {
          closeModalFunc();
        };
      }

      // Show modal with animation
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden'; // Lock background scroll
      
      // Animate modal panel content opacity
      setTimeout(() => {
        const panel = modal.querySelector('.modal-panel');
        if (panel) {
          panel.classList.remove('opacity-0', 'translate-y-10');
          panel.classList.add('opacity-100', 'translate-y-0');
        }
      }, 50);
    });
  });

  const closeModalFunc = () => {
    const panel = modal.querySelector('.modal-panel');
    if (panel) {
      panel.classList.remove('opacity-100', 'translate-y-0');
      panel.classList.add('opacity-0', 'translate-y-10');
    }
    
    setTimeout(() => {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto'; // Restore background scroll
    }, 400);
  };

  closeBtn.addEventListener('click', closeModalFunc);

  // Close modal when clicking outside of panel
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });

  // Close on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModalFunc();
    }
  });
}

/* --- Contact Form Interaction & Success Toast --- */
function initContactForm() {
  const form = document.getElementById('concierge-form');
  const toast = document.getElementById('success-toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Verify fields are valid
    const nameInput = document.getElementById('field-name');
    const emailInput = document.getElementById('field-email');
    const messageInput = document.getElementById('field-message');

    if (!nameInput || !emailInput || !messageInput) return;

    // Elegant submission animation feedback
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="animate-pulse">TRANSMITTING INQUIRY...</span>`;

    setTimeout(() => {
      // Simulate receipt feedback
      btn.innerHTML = `<span>INQUIRY RECEIVED</span>`;
      btn.classList.add('btn-luxury-solid');

      // Show luxury feedback toast
      if (toast) {
        toast.classList.remove('hidden', 'translate-y-10', 'opacity-0');
        toast.classList.add('flex', 'translate-y-0', 'opacity-100');

        // Automatically slide toast out after 5 seconds
        setTimeout(() => {
          toast.classList.remove('translate-y-0', 'opacity-100');
          toast.classList.add('translate-y-10', 'opacity-0');
          setTimeout(() => {
            toast.classList.add('hidden');
          }, 500);
        }, 5000);
      }

      // Reset form fields elegantly
      form.reset();
      
      // Reset button state
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.classList.remove('btn-luxury-solid');
      }, 4000);

    }, 1800);
  });
}
