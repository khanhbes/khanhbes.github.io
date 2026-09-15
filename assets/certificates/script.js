$(document).ready(function () {
  // Mobile navbar toggle
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');
  });

  // State
  let allCertificates = [];
  let currentFiltered = [];
  let currentModalIndex = 0;
  let activeCategory = 'all';
  let searchQuery = '';

  // Load Certificate Manifest
  async function loadCertificates() {
    try {
      const response = await fetch('/assets/certificates/manifest.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      allCertificates = await response.json();
      currentFiltered = [...allCertificates];

      updateCategoryCounts();
      renderGallery();

      // Check if URL specifies a cert ID to open directly
      checkUrlCertParam();
    } catch (err) {
      console.error('Failed to load certificates manifest:', err);
      $('#certGalleryGrid').html(`
        <div class="cert-loading-state">
          <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
          <p>Unable to load certificate archive.</p>
          <a href="/certificates" class="btn-reset-filter" style="display:inline-block; margin-top: 1rem;">Retry</a>
        </div>
      `);
    }
  }

  function updateCategoryCounts() {
    const total = allCertificates.length;
    const certs = allCertificates.filter(c => c.category === 'certifications').length;
    const awards = allCertificates.filter(c => c.category === 'awards').length;
    const leadership = allCertificates.filter(c => c.category === 'leadership').length;

    $('#countAll').text(total);
    $('#countCerts').text(certs);
    $('#countAwards').text(awards);
    $('#countLeadership').text(leadership);
  }

  function getBadgeClass(color) {
    switch (color) {
      case 'gold': return 'badge-gold';
      case 'indigo': return 'badge-indigo';
      case 'cyan': return 'badge-cyan';
      case 'emerald': return 'badge-emerald';
      case 'blue': return 'badge-blue';
      case 'purple': return 'badge-purple';
      default: return 'badge-indigo';
    }
  }

  function renderGallery() {
    const container = $('#certGalleryGrid');
    const noResults = $('#noResultsNotice');

    // Filter by active category & search query
    currentFiltered = allCertificates.filter(cert => {
      const matchesCategory = (activeCategory === 'all') || (cert.category === activeCategory);
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        (cert.title && cert.title.toLowerCase().includes(q)) ||
        (cert.organization && cert.organization.toLowerCase().includes(q)) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(q)) ||
        (cert.primaryMetric && cert.primaryMetric.toLowerCase().includes(q)) ||
        (cert.year && cert.year.toLowerCase().includes(q))
      );

      return matchesCategory && matchesSearch;
    });

    if (currentFiltered.length === 0) {
      container.empty();
      noResults.show();
      return;
    }

    noResults.hide();

    const html = currentFiltered.map((cert, index) => {
      const badgeClass = getBadgeClass(cert.badgeColor);
      return `
        <article class="cert-card" data-index="${index}" data-id="${cert.id}">
          <!-- Thumbnail Preview -->
          <div class="cert-card-media" onclick="window.openCertModalByIndex(${index})">
            <img 
              src="${cert.pngFile}" 
              alt="${cert.title}" 
              class="cert-thumb-img" 
              loading="lazy"
            >
            <div class="cert-media-overlay">
              <span class="cert-overlay-action">
                <i class="fas fa-search-plus"></i> Inspect Certificate
              </span>
            </div>
          </div>

          <!-- Header Tags -->
          <div class="cert-card-header">
            <span class="cert-badge-tag ${badgeClass}">
              ${cert.badge || 'Verified Credential'}
            </span>
            <span class="cert-year-tag">
              <i class="far fa-calendar-alt"></i> ${cert.year || cert.date}
            </span>
          </div>

          <!-- Body Info -->
          <div class="cert-card-body">
            <h3 class="cert-card-title">${cert.title}</h3>
            <p class="cert-card-org">
              <i class="fas fa-university"></i>
              <span>${cert.organization}</span>
            </p>
            <div class="cert-cred-id-capsule" title="Official Credential ID">
              <i class="fas fa-fingerprint"></i>
              <span>${cert.credentialId}</span>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="cert-card-footer">
            <button class="btn-card-view" onclick="window.openCertModalByIndex(${index})">
              <i class="fas fa-eye"></i> View Certificate
            </button>
            <a 
              href="${cert.pngFile}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-card-link" 
              title="Open direct file link in new tab"
            >
              <i class="fas fa-external-link-alt"></i>
            </a>
            <a 
              href="${cert.pngFile}" 
              download="${cert.filename}.png" 
              class="btn-card-download" 
              title="Download Certificate PNG"
            >
              <i class="fas fa-download"></i>
            </a>
          </div>
        </article>
      `;
    }).join('');

    container.html(html);
  }

  // Filter Category Tabs
  $('#categoryTabs').on('click', '.cat-tab', function () {
    $('#categoryTabs .cat-tab').removeClass('is-active');
    $(this).addClass('is-active');
    activeCategory = $(this).data('category');
    renderGallery();
  });

  // Search Input Handler
  $('#certSearchInput').on('input', function () {
    searchQuery = $(this).val();
    if (searchQuery.trim().length > 0) {
      $('#clearSearchBtn').show();
    } else {
      $('#clearSearchBtn').hide();
    }
    renderGallery();
  });

  $('#clearSearchBtn').on('click', function () {
    $('#certSearchInput').val('');
    searchQuery = '';
    $(this).hide();
    renderGallery();
  });

  $('#resetSearchBtn').on('click', function () {
    $('#certSearchInput').val('');
    searchQuery = '';
    $('#clearSearchBtn').hide();
    activeCategory = 'all';
    $('#categoryTabs .cat-tab').removeClass('is-active');
    $('#categoryTabs .cat-tab[data-category="all"]').addClass('is-active');
    renderGallery();
  });

  // Modal Lightbox Handlers
  window.openCertModalByIndex = function (index) {
    if (!currentFiltered[index]) return;
    currentModalIndex = index;
    populateModal(currentFiltered[index]);
    $('#certModal').addClass('is-open').attr('aria-hidden', 'false');
    $('body').css('overflow', 'hidden');
  };

  function populateModal(cert) {
    $('#modalTitle').text(cert.title);
    $('#modalSubtitle').text(`${cert.organization} · ${cert.year || cert.date}`);
    $('#modalCategoryBadge').text((cert.badge || cert.category || 'Credential').toUpperCase());
    
    // Image
    $('#modalCertImage').attr('src', cert.pngFile).attr('alt', cert.title).removeClass('is-zoomed');
    
    // Sidebar Details
    $('#modalIssuer').text(cert.organization);
    $('#modalDate').text(cert.date || cert.year);
    $('#modalCredId').text(cert.credentialId);
    $('#modalMetric').text(cert.primaryMetric || 'Verified Award');
    $('#modalDescription').text(cert.bodyText || cert.subtitle || 'Official credential certificate awarded to Phan Thanh Khanh.');
    
    // Paths
    $('#modalFilePath').text(cert.pngFile);
    $('#modalDirectLink').attr('href', cert.pngFile);
    $('#modalDownloadBtn').attr('href', cert.pngFile).attr('download', `${cert.filename}.png`);
    $('#modalDownloadPngBtn').attr('href', cert.pngFile).attr('download', `${cert.filename}.png`);
    $('#modalDownloadSvgBtn').attr('href', cert.svgFile).attr('target', '_blank');

    // Counter
    $('#modalCounter').text(`${currentModalIndex + 1} of ${currentFiltered.length}`);

    // Update URL hash without reload
    if (history.replaceState) {
      history.replaceState(null, null, `#${cert.id || cert.filename}`);
    }
  }

  function closeModal() {
    $('#certModal').removeClass('is-open').attr('aria-hidden', 'true');
    $('body').css('overflow', '');
    $('#modalCertImage').removeClass('is-zoomed');
    if (history.replaceState) {
      history.replaceState(null, null, ' ');
    }
  }

  $('#modalCloseBtn').click(closeModal);

  // Click outside to close
  $('#certModal').click(function (e) {
    if ($(e.target).is('#certModal')) {
      closeModal();
    }
  });

  // Toggle Zoom
  $('#modalZoomBtn, #modalCertImage').click(function () {
    $('#modalCertImage').toggleClass('is-zoomed');
  });

  // Next / Previous Navigation
  $('#modalNextBtn').click(function () {
    if (currentFiltered.length <= 1) return;
    currentModalIndex = (currentModalIndex + 1) % currentFiltered.length;
    populateModal(currentFiltered[currentModalIndex]);
  });

  $('#modalPrevBtn').click(function () {
    if (currentFiltered.length <= 1) return;
    currentModalIndex = (currentModalIndex - 1 + currentFiltered.length) % currentFiltered.length;
    populateModal(currentFiltered[currentModalIndex]);
  });

  // Keyboard navigation
  $(document).keydown(function (e) {
    if (!$('#certModal').hasClass('is-open')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      $('#modalNextBtn').trigger('click');
    } else if (e.key === 'ArrowLeft') {
      $('#modalPrevBtn').trigger('click');
    }
  });

  // Copy Credential ID button
  $('#copyCredIdBtn').click(function () {
    const credId = $('#modalCredId').text();
    navigator.clipboard.writeText(credId).then(() => {
      const btn = $(this);
      btn.html('<i class="fas fa-check" style="color: #10b981;"></i>');
      setTimeout(() => {
        btn.html('<i class="far fa-copy"></i>');
      }, 2000);
    });
  });

  // Check URL param or hash on page load
  function checkUrlCertParam() {
    const hash = window.location.hash.replace('#', '').trim();
    if (!hash) return;

    const foundIndex = allCertificates.findIndex(c => c.id === hash || c.filename === hash);
    if (foundIndex !== -1) {
      window.openCertModalByIndex(foundIndex);
    }
  }

  // Initialize
  loadCertificates();
});
