document.addEventListener("DOMContentLoaded", function () {
  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById("menu");
  const navbar = document.querySelector(".navbar");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", function () {
      menuBtn.classList.toggle("fa-times");
      navbar.classList.toggle("nav-toggle");
    });
  }

  // Close mobile menu on nav link click
  document.querySelectorAll(".navbar ul li a").forEach(link => {
    link.addEventListener("click", () => {
      if (menuBtn && navbar) {
        menuBtn.classList.remove("fa-times");
        navbar.classList.remove("nav-toggle");
      }
    });
  });

  // 2. Scroll Events (Header blur, Scroll Progress, Back to Top, Scrollspy)
  const header = document.querySelector("header");
  const scrollTopBtn = document.getElementById("scroll-top");
  const scrollProgress = document.querySelector(".scroll-progress");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    // Header styling on scroll
    if (header) {
      if (scrollY > 60) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // Back to top button visibility
    if (scrollTopBtn) {
      if (scrollY > 300) {
        scrollTopBtn.classList.add("active");
      } else {
        scrollTopBtn.classList.remove("active");
      }
    }

    // Scroll progress bar
    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = (scrollY / docHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
      }
    }

    // Scrollspy for active nav link
    let currentSectionId = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      document.querySelectorAll(".navbar ul li a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  // 3. Dynamic Typed.js
  if (document.querySelector(".typing-text") && typeof Typed !== "undefined") {
    new Typed(".typing-text", {
      strings: [
        "AI & Computer Vision Research",
        "Edge AI & YOLO Architectures",
        "Flutter & Mobile App Engineering",
        "Data Science & Machine Learning"
      ],
      loop: true,
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1400
    });
  }

  // 4. Vanilla Tilt Init
  function initTilt() {
    if (typeof VanillaTilt !== "undefined") {
      VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.15
      });
    }
  }
  initTilt();

  // 5. Load Skills dynamically
  async function loadSkills() {
    const container = document.getElementById("skillsContainer");
    if (!container) return;

    try {
      const res = await fetch("/skills.json");
      const skills = await res.json();

      container.innerHTML = skills.map(skill => `
        <div class="bar tilt">
          <div class="info">
            <img src="${skill.icon}" alt="${skill.name}" loading="lazy" />
            <span>${skill.name}</span>
          </div>
        </div>
      `).join("");

      initTilt();
    } catch (e) {
      console.warn("Could not load skills:", e);
    }
  }
  loadSkills();

  // 5.5 Load Achievements dynamically with Category Filtering & View All Toggle
  let allAchievements = [];
  let currentAchievementFilter = "all";
  let isShowingAllAchievements = false;

  async function loadAchievements() {
    const container = document.getElementById("achievementsContainer");
    if (!container) return;

    try {
      const res = await fetch("/achievements.json");
      allAchievements = await res.json();
      renderAchievements();
      setupAchievementFilters();
      setupViewAllToggle();
    } catch (e) {
      console.warn("Could not load achievements:", e);
    }
  }

  function renderAchievements() {
    const container = document.getElementById("achievementsContainer");
    const viewAllBtn = document.getElementById("viewAllCertsBtn");
    if (!container) return;

    // Filter by selected category
    const categoryList = currentAchievementFilter === "all"
      ? allAchievements
      : allAchievements.filter(item => item.category === currentAchievementFilter);

    // Determine what to display:
    // If on "all" tab and not showing all, only show top featured major certificates/awards
    let displayList = categoryList;
    if (currentAchievementFilter === "all" && !isShowingAllAchievements) {
      displayList = categoryList.filter(item => item.featured);
    }

    // Configure the View All button
    if (viewAllBtn && viewAllBtn.parentElement) {
      if (currentAchievementFilter !== "all") {
        viewAllBtn.parentElement.style.display = "none";
      } else {
        viewAllBtn.parentElement.style.display = "flex";
        if (isShowingAllAchievements) {
          viewAllBtn.innerHTML = `
            <i class="fas fa-compress-alt"></i>
            <span>Show Featured Only</span>
            <i class="fas fa-chevron-up toggle-icon"></i>
          `;
        } else {
          viewAllBtn.innerHTML = `
            <i class="fas fa-layer-group"></i>
            <span>View All Certificates & Honors (${allAchievements.length})</span>
            <i class="fas fa-chevron-down toggle-icon"></i>
          `;
        }
      }
    }

    container.innerHTML = displayList.map(item => `
      <div class="achieve-box tilt" data-category="${item.category}">
        <div class="achieve-header">
          <div class="category-pill ${item.category}">
            <i class="${item.categoryIcon}"></i>
            <span>${item.categoryLabel}</span>
          </div>
          <span class="achieve-year"><i class="far fa-calendar-alt"></i> ${item.year}</span>
        </div>

        <div class="achieve-badge-row">
          <span class="badge-pill ${item.badgeColor || 'cyan'}">${item.badge}</span>
        </div>

        <div class="achieve-main">
          <div class="icon-avatar">
            <i class="${item.icon}"></i>
          </div>
          <div class="title-group">
            <h3>${item.title}</h3>
            <p class="organization"><i class="fas fa-landmark"></i> ${item.organization}</p>
          </div>
        </div>

        ${item.highlightMetric ? `
          <div class="metric-capsule">
            <span class="metric-val">${item.highlightMetric}</span>
            <span class="metric-divider">|</span>
            <span class="metric-name">${item.metricLabel}</span>
          </div>
        ` : ''}

        <p class="achieve-desc">${item.description}</p>

        <div class="achieve-actions">
          <a href="${item.proofUrl || 'https://www.is.vnu.edu.vn/'}" target="_blank" rel="noopener noreferrer" class="achieve-proof-btn">
            <i class="fas fa-external-link-alt"></i>
            <span>${item.proofLabel || 'View Proof'}</span>
          </a>
          ${item.credentialId ? `
            <span class="achieve-cred-id" title="${item.credentialId}">
              <i class="fas fa-fingerprint"></i> ${item.credentialId}
            </span>
          ` : ''}
        </div>
      </div>
    `).join("");

    initTilt();
  }

  function setupAchievementFilters() {
    const filterButtons = document.querySelectorAll(".achieve-tab");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", function () {
        filterButtons.forEach(b => b.classList.remove("is-active"));
        this.classList.add("is-active");
        currentAchievementFilter = this.getAttribute("data-filter");
        // When user explicitly selects a specific category tab, show all in that category
        renderAchievements();
      });
    });
  }

  function setupViewAllToggle() {
    const viewAllBtn = document.getElementById("viewAllCertsBtn");
    if (!viewAllBtn) return;

    viewAllBtn.addEventListener("click", function () {
      isShowingAllAchievements = !isShowingAllAchievements;
      renderAchievements();
      if (!isShowingAllAchievements) {
        const section = document.getElementById("achievements");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }

  loadAchievements();

  // 6. Load Projects dynamically
  async function loadProjects() {
    const container = document.getElementById("projectsContainer");
    if (!container) return;

    try {
      const res = await fetch("/projects/projects.json");
      const projects = await res.json();

      container.innerHTML = projects.map(project => `
        <div class="box tilt">
          <div class="project-img-wrapper">
            <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="${project.name}" loading="lazy" />
            ${project.badge ? `<span class="project-badge">${project.badge}</span>` : ''}
          </div>
          <div class="content">
            <div class="tag">
              <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.desc}</p>
              ${project.tags && project.tags.length ? `
                <div class="project-tags">
                  ${project.tags.map(t => `<span class="tech-pill">${t}</span>`).join('')}
                </div>
              ` : ''}
              <div class="btns">
                <a href="${project.links.view}" class="btn"><i class="fas fa-eye"></i> View</a>
                <a href="${project.links.code}" class="btn" target="_blank" rel="noopener noreferrer">Code <i class="fas fa-code"></i></a>
              </div>
            </div>
          </div>
        </div>
      `).join("");

      initTilt();
    } catch (e) {
      console.warn("Could not load projects:", e);
    }
  }
  loadProjects();

  // 7. Contact Form Handler with Feedback Toast
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <i class="fas fa-spinner fa-spin"></i>`;

      setTimeout(() => {
        submitBtn.innerHTML = `Sent Successfully! <i class="fas fa-check"></i>`;
        submitBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
        }, 3500);
      }, 900);
    });
  }
});
