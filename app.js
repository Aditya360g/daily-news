let currentCategory = 'all';
let currentNews = [];
let particleCreationCount = 30;

function loadUserArticles() {
    const newsArticles = JSON.parse(localStorage.getItem('newsArticles') || '[]');
    localStorage.removeItem('newsData');
    localStorage.removeItem('userArticles');
    localStorage.removeItem('articleSubmissions');
    return newsArticles;
}

function getAllArticles() {
    const userArticles = loadUserArticles();
    return [...userArticles, ...newsData];
}

function init() {
    if (!localStorage.getItem('articlesCleanedUp')) {
        localStorage.removeItem('newsArticles');
        localStorage.removeItem('newsData');
        localStorage.removeItem('userArticles');
        localStorage.removeItem('articleSubmissions');
        localStorage.setItem('articlesCleanedUp', 'true');
    }
    
    updateVisitorCount();
    
    // Create particles on all pages
    createRisingBubbles();
    createFloatingParticles();
    
    if (document.getElementById('newsGrid')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        
        if (searchQuery) {
            const allArticles = getAllArticles();
            currentNews = allArticles.filter(article => 
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.author.toLowerCase().includes(searchQuery.toLowerCase())
            );
            
            const buttons = document.querySelectorAll('.cat-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            
            if (currentNews.length > 0) {
                const categories = [...new Set(currentNews.map(a => a.category))];
                if (categories.length === 1) {
                    buttons.forEach(btn => {
                        const btnText = btn.textContent.toLowerCase().trim();
                        if (btnText.includes(categories[0])) {
                            btn.classList.add('active');
                        }
                    });
                }
                displayNews(currentNews);
            } else {
                document.getElementById('newsGrid').innerHTML = `<div style="text-align: center; color: var(--text-light); font-size: 1.5rem; margin: 2rem;">No results found</div>`;
            }
        } else {
            const hash = window.location.hash.substring(1);
            if (hash && ['politics', 'technology', 'sports', 'entertainment'].includes(hash)) {
                const categoryBtn = document.querySelector(`[data-category="${hash}"]`);
                filterCategory(hash, categoryBtn);
            } else {
                const allBtn = document.querySelector('.cat-btn');
                if (allBtn) allBtn.classList.add('active');
                const allArticles = getAllArticles();
                displayNews(allArticles);
            }
        }
    }
    
    setupEventListeners();
    
    if (document.getElementById('articleDetail')) {
        displayArticle();
    }
    
    setupAnimations();
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchNews();
            }
        });
        searchInput.addEventListener('input', addTypingEffect);
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchNews();
        });
    }
    
    // Category buttons
    document.querySelectorAll('.cat-btn[data-category]').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterCategory(category, this);
        });
    });
    
    // My Articles button
    const myArticlesBtn = document.getElementById('myArticlesBtn');
    if (myArticlesBtn) {
        myArticlesBtn.addEventListener('click', () => {
            showMyArticles();
        });
    }
    
    // Reload button
    const reloadBtn = document.getElementById('reloadBtn');
    if (reloadBtn) {
        reloadBtn.addEventListener('click', () => {
            reloadPage();
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
        });
    }
    
    // Upload button (article page)
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            window.location.href = 'upload.html';
        });
    }
}



function setupAnimations() {
    const selectors = [
        '.hero',
        '.news-card',
        '.article-detail',
        '.related-news .news-card'
    ];

    const elements = selectors.flatMap(sel => Array.from(document.querySelectorAll(sel)));

    elements.forEach(el => el.classList.add('reveal'));

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.add('pulse');
        setTimeout(() => logo.classList.remove('pulse'), 3600);
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('in-view');

                io.unobserve(el);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(el => {
        if (el.closest && el.classList && el.classList.contains('news-card')) {
            const delay = (Math.random() * 120) + 60;
            el.style.transitionDelay = `${delay}ms`;
        }
        io.observe(el);
    });

    const grid = document.getElementById('newsGrid');
    if (grid) {
        const cards = Array.from(grid.querySelectorAll('.news-card'));
        cards.forEach((c, i) => {
            c.classList.add('reveal');
            c.style.transitionDelay = `${i * 80}ms`;
            io.observe(c);
        });
    }
}



function createRisingBubbles() {
    setInterval(() => {
        if (document.querySelectorAll('.rising-bubble').length < 40) {
            const bubble = document.createElement('div');
            bubble.className = 'rising-bubble';
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.width = `${30 + Math.random() * 50}px`;
            bubble.style.height = bubble.style.width;
            bubble.style.animationDuration = `${6 + Math.random() * 5}s`;
            document.body.appendChild(bubble);
            
            bubble.addEventListener('animationend', () => {
                if (bubble.parentNode) bubble.remove();
            });
        }
    }, 100);
}

function createFloatingParticles() {
    const starCount = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const animations = ['star-float', 'star-drift', 'star-sway'];
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        star.className = `star ${randomAnim}`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${3 + Math.random() * 4}s`;
        document.body.appendChild(star);
    }
}







function addTypingEffect(e) {
    const input = e.target;
    input.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
    clearTimeout(input.typingTimer);
    input.typingTimer = setTimeout(() => {
        input.style.boxShadow = '';
    }, 1000);
}



function displayNews(articles) {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    const readArticles = JSON.parse(localStorage.getItem('readArticles')) || [];
    
    articles.forEach((article) => {
        const isRead = readArticles.includes(article.id);
        const readClass = isRead ? 'read-article' : '';
        
        const cardDiv = document.createElement('div');
        cardDiv.className = `news-card glow-on-hover rgb-border scroll-animate ${readClass}`;
        cardDiv.style.cssText = 'opacity: 0; transform: translateY(30px); transition: all 0.8s ease; position: relative;';
        cardDiv.dataset.articleId = article.id;
        
        const safeTitle = escapeHtml(article.title);
        const safeExcerpt = escapeHtml(article.excerpt);
        const safeCategory = escapeHtml(article.category);
        const safeAuthor = escapeHtml(article.author);
        const safeImage = escapeHtml(article.image);
        
        cardDiv.innerHTML = `
            <img src="${safeImage}" alt="${safeTitle}" loading="lazy">
            <div class="news-card-content">
                <span class="category">${safeCategory.toUpperCase()}</span>
                <h3>${safeTitle}</h3>
                <p>${safeExcerpt}</p>
                <div class="meta">By ${safeAuthor} | ${formatDate(article.date)}</div>
            </div>
        `;
        
        cardDiv.addEventListener('click', () => openArticle(article.id));
        grid.appendChild(cardDiv);
    });
    
    // Setup scroll animation
    setupScrollAnimation();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function setupScrollAnimation() {
    const cards = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '100px'
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

function filterCategory(category, btnEl) {
    // If on article or upload page, redirect to index with category
    const currentPath = window.location.pathname;
    if (currentPath.includes('article.html') || currentPath.includes('upload.html')) {
        if (category === 'all') {
            window.location.href = 'index.html';
            return;
        } else {
            window.location.href = `index.html#${category}`;
            return;
        }
    }
    
    currentCategory = category;
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Find and activate the correct button
    if (btnEl) {
        btnEl.classList.add('active');
        btnEl.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btnEl.style.transform = '';
        }, 150);
    } else {
        // Fallback: find button by category text
        buttons.forEach(btn => {
            const btnText = btn.textContent.toLowerCase();
            if ((category === 'all' && btnText.includes('all')) ||
                (category !== 'all' && btnText.includes(category))) {
                btn.classList.add('active');
            }
        });
    }

    // Filter news without loading effect
    const allArticles = getAllArticles();
    if (category === 'all') {
        currentNews = allArticles;
    } else {
        currentNews = allArticles.filter(article => article.category === category);
    }

    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    
    if (currentNews.length > 0) {
        displayNews(currentNews);
    } else {
        grid.innerHTML = '<div style="text-align: center; color: var(--text-light); font-size: 1.5rem; margin: 2rem;">No articles found in this category</div>';
    }
}

function searchNews() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.trim() : '';
    
    // If on article or upload page, redirect to index with search
    const currentPath = window.location.pathname;
    if (currentPath.includes('article.html') || currentPath.includes('upload.html')) {
        if (query && query.length > 0) {
            window.location.href = `index.html?search=${encodeURIComponent(query)}`;
        } else {
            window.location.href = 'index.html';
        }
        return;
    }
    
    const queryLower = query.toLowerCase();
    
    if (!queryLower || queryLower.length === 0) {
        const allArticles = getAllArticles();
        currentNews = allArticles;
        displayNews(currentNews);
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        const firstBtn = document.querySelector('.cat-btn');
        if (firstBtn) firstBtn.classList.add('active');
        return;
    }
    
    // Search in title, excerpt, and content
    const allArticles = getAllArticles();
    currentNews = allArticles.filter(article => 
        article.title.toLowerCase().includes(queryLower) ||
        article.excerpt.toLowerCase().includes(queryLower) ||
        article.content.toLowerCase().includes(queryLower) ||
        article.category.toLowerCase().includes(queryLower) ||
        article.author.toLowerCase().includes(queryLower)
    );
    
    // Update category buttons - highlight based on search results
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // If all results are from same category, highlight that category
    if (currentNews.length > 0) {
        const categories = [...new Set(currentNews.map(a => a.category))];
        if (categories.length === 1) {
            buttons.forEach(btn => {
                const btnText = btn.textContent.toLowerCase().trim();
                if (btnText.includes(categories[0])) {
                    btn.classList.add('active');
                }
            });
        }
        displayNews(currentNews);
    } else {
        const safeQuery = escapeHtml(query);
        document.getElementById('newsGrid').innerHTML = `<div style="text-align: center; color: var(--text-light); font-size: 1.5rem; margin: 2rem;">No results found for "${safeQuery}"</div>`;
    }
    
    // Clear search input after search
    if (searchInput) {
        searchInput.value = '';
    }
}



function openArticle(id) {
    // Mark article as read
    let readArticles = JSON.parse(localStorage.getItem('readArticles')) || [];
    if (!readArticles.includes(id)) {
        readArticles.push(id);
        localStorage.setItem('readArticles', JSON.stringify(readArticles));
    }
    window.location.href = `article.html?id=${id}`;
}

function displayArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const allArticles = getAllArticles();
    const article = allArticles.find(a => a.id === id);
    
    if (!article) {
        document.getElementById('articleDetail').innerHTML = '<h1>Article not found</h1>';
        document.title = 'Article Not Found - Daily News';
        return;
    }
    
    // Clear search input on article page
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Set active category button based on article category
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.toLowerCase().trim();
        if (btnText.includes(article.category) && !btnText.includes('my articles')) {
            btn.classList.add('active');
        }
    });
    
    // Update page title with article title
    document.title = `${article.title} - Daily News`;
    
    const articleDetail = document.getElementById('articleDetail');
    articleDetail.style.opacity = '0';
    articleDetail.style.transform = 'translateY(50px)';
    
    // Check if article is user-uploaded (exists in localStorage)
    const userArticles = JSON.parse(localStorage.getItem('newsArticles')) || [];
    const isUserArticle = userArticles.some(a => a.id === article.id);
    
    // Add category class to article detail
    articleDetail.className = `article-detail ${escapeHtml(article.category)}`;
    
    const safeTitle = escapeHtml(article.title);
    const safeCategory = escapeHtml(article.category);
    const safeAuthor = escapeHtml(article.author);
    const safeImage = escapeHtml(article.image);
    const safeContent = article.content; // Content can contain HTML
    
    articleDetail.innerHTML = `
        ${isUserArticle ? `<div class="article-actions" style="opacity: 0; transform: translateY(30px);">
            <button class="edit-btn" data-article-id="${article.id}">Edit</button>
            <button class="delete-btn" data-article-id="${article.id}">Delete</button>
        </div>` : ''}
        <span class="category" style="opacity: 0; transform: translateX(-30px);">${safeCategory.toUpperCase()}</span>
        <h1 style="opacity: 0; transform: translateY(30px);">${safeTitle}</h1>
        <div class="meta" style="opacity: 0; transform: translateX(30px);">${safeAuthor} | ${formatDate(article.date)}</div>
        <img src="${safeImage}" alt="${safeTitle}" style="opacity: 0; transform: scale(0.9);">
        <div class="content" style="opacity: 0; transform: translateY(30px);">${safeContent}</div>
    `;
    
    // Add event listeners for edit/delete buttons
    if (isUserArticle) {
        const editBtn = articleDetail.querySelector('.edit-btn');
        const deleteBtn = articleDetail.querySelector('.delete-btn');
        if (editBtn) editBtn.addEventListener('click', () => editArticle(article.id));
        if (deleteBtn) deleteBtn.addEventListener('click', () => deleteArticle(article.id));
    }
    
    // Wave animation for article elements
    setTimeout(() => {
        articleDetail.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        articleDetail.style.opacity = '1';
        articleDetail.style.transform = 'translateY(0)';
        
        // Animate child elements with stagger
        const elements = articleDetail.querySelectorAll('.article-actions, .category, h1, .meta, img, .content');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) translateX(0) scale(1)';
            }, index * 150);
        });
    }, 100);
    
    displayRelatedNews(article.category, article.id);
}

function displayRelatedNews(category, currentId) {
    const allArticles = getAllArticles();
    const related = allArticles.filter(a => a.category === category && a.id !== currentId).slice(0, 3);
    const grid = document.getElementById('relatedNews');
    if (!grid) return;
    grid.innerHTML = '';
    
    related.forEach(article => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'news-card glow-on-hover rgb-border';
        cardDiv.dataset.articleId = article.id;
        
        const safeTitle = escapeHtml(article.title);
        const safeExcerpt = escapeHtml(article.excerpt);
        const safeCategory = escapeHtml(article.category);
        const safeAuthor = escapeHtml(article.author);
        const safeImage = escapeHtml(article.image);
        
        cardDiv.innerHTML = `
            <img src="${safeImage}" alt="${safeTitle}">
            <div class="news-card-content">
                <span class="category">${safeCategory.toUpperCase()}</span>
                <h3>${safeTitle}</h3>
                <p>${safeExcerpt}</p>
                <div class="meta">By ${safeAuthor} | ${formatDate(article.date)}</div>
            </div>
        `;
        
        cardDiv.addEventListener('click', () => openArticle(article.id));
        grid.appendChild(cardDiv);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Check if page loaded with My Articles hash
    if (window.location.hash === '#myarticles') {
        setTimeout(() => showMyArticles(), 100);
    } else if (window.location.hash) {
        // Handle category hash on page load
        const hash = window.location.hash.substring(1);
        if (['politics', 'technology', 'sports', 'entertainment'].includes(hash)) {
            setTimeout(() => {
                const categoryBtn = document.querySelector(`[data-category="${hash}"]`);
                if (categoryBtn) {
                    filterCategory(hash, categoryBtn);
                }
            }, 100);
        }
    }
});

// Handle hash changes
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    
    if (hash === 'myarticles') {
        showMyArticles();
    } else if (hash === 'myarticles-delete') {
        showMyArticlesWithDeleteMode();
    } else if (['politics', 'technology', 'sports', 'entertainment'].includes(hash)) {
        const categoryBtn = document.querySelector(`[data-category="${hash}"]`);
        if (categoryBtn) {
            filterCategory(hash, categoryBtn);
        }
    } else if (hash === '') {
        // If hash is cleared, show all articles
        const allBtn = document.querySelector('[data-category="all"]');
        if (allBtn) {
            filterCategory('all', allBtn);
        }
    }
});

// Enhanced touch and responsive support
function addTouchSupport() {
    // Detect touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
    
    // Handle orientation changes with better performance
    let orientationTimer;
    window.addEventListener('orientationchange', () => {
        clearTimeout(orientationTimer);
        orientationTimer = setTimeout(() => {
            // Force layout recalculation
            const grid = document.getElementById('newsGrid');
            if (grid) {
                grid.style.opacity = '0.8';
                requestAnimationFrame(() => {
                    grid.style.opacity = '1';
                });
            }
            
            // Adjust viewport for mobile browsers
            if (isMobile) {
                const viewport = document.querySelector('meta[name=viewport]');
                if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
                }
            }
        }, 150);
    });
    
    // Enhanced resize handling with throttling
    let resizeTimer;
    let isResizing = false;
    
    window.addEventListener('resize', () => {
        if (!isResizing) {
            isResizing = true;
            requestAnimationFrame(() => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const screenWidth = window.innerWidth;
                    
                    // Adjust particle count based on device performance
                    if (screenWidth < 480) {
                        particleCreationCount = 15;
                    } else if (screenWidth < 768) {
                        particleCreationCount = 25;
                    } else if (screenWidth < 1024) {
                        particleCreationCount = 35;
                    } else {
                        particleCreationCount = 50;
                    }
                    
                    // Optimize for low-end devices
                    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
                        particleCreationCount = Math.floor(particleCreationCount * 0.6);
                    }
                    
                    isResizing = false;
                }, 200);
            });
        }
    });
    
    // Add passive event listeners for better performance
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    
    // Prevent zoom on double tap for better UX
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Handle network status for offline functionality
    window.addEventListener('online', () => {});
    window.addEventListener('offline', () => {});
    
    // Optimize for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

function reloadPage() {
    localStorage.removeItem('readArticles');
    window.location.href = 'index.html';
}

function updateVisitorCount() {
    const hasVisited = sessionStorage.getItem('hasVisitedThisSession');
    
    if (!hasVisited) {
        let visitors = parseInt(localStorage.getItem('visitorCount') || '0');
        visitors++;
        localStorage.setItem('visitorCount', visitors.toString());
        sessionStorage.setItem('hasVisitedThisSession', 'true');
    }
    
    const visitors = parseInt(localStorage.getItem('visitorCount') || '0');
    const counterElement = document.getElementById('visitorCounter');
    if (counterElement) {
        counterElement.textContent = `Visitors: ${visitors.toLocaleString()}`;
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    sessionStorage.removeItem('hasVisitedThisSession');
    window.location.href = 'login.html';
}





function deleteArticle(id) {
    if (confirm('Are you sure you want to delete this article?')) {
        // Get all user articles
        let userArticles = loadUserArticles();
        
        // Remove the article
        userArticles = userArticles.filter(article => article.id !== id);
        
        // Save back
        localStorage.setItem('newsArticles', JSON.stringify(userArticles));
        
        alert('Article deleted successfully!');
        window.location.href = 'index.html';
    }
}

function deleteArticleFromGrid(id) {
    if (confirm('Are you sure you want to delete this article?')) {
        // Get all user articles
        let userArticles = loadUserArticles();
        
        // Remove the article
        userArticles = userArticles.filter(article => article.id !== id);
        
        // Save back
        localStorage.setItem('newsArticles', JSON.stringify(userArticles));
        
        showToast('Article deleted successfully!', 'success');
        
        // Refresh the current view
        setTimeout(() => {
            const allArticles = getAllArticles();
            if (currentCategory === 'all') {
                displayNews(allArticles);
            } else {
                const filtered = allArticles.filter(a => a.category === currentCategory);
                displayNews(filtered);
            }
        }, 500);
    }
}

function editArticle(id) {
    const userArticles = JSON.parse(localStorage.getItem('newsArticles')) || [];
    const articleIndex = userArticles.findIndex(a => a.id === id);
    
    if (articleIndex === -1) {
        alert('You can only edit your own articles!');
        return;
    }
    
    const article = userArticles[articleIndex];
    const newTitle = prompt('Edit Title:', article.title);
    if (newTitle === null) return;
    
    const newContent = prompt('Edit Content:', article.content);
    if (newContent === null) return;
    
    const newExcerpt = prompt('Edit Excerpt:', article.excerpt);
    if (newExcerpt === null) return;
    
    userArticles[articleIndex] = {
        ...userArticles[articleIndex],
        title: newTitle.trim(),
        content: newContent.trim(),
        excerpt: newExcerpt.trim()
    };
    
    localStorage.setItem('newsArticles', JSON.stringify(userArticles));
    alert('Article updated successfully!');
    location.reload();
}

function showMyArticles() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('article.html') || currentPath.includes('upload.html')) {
        window.location.href = 'index.html#myarticles';
        return;
    }
    
    const userArticles = loadUserArticles();
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    
    if (userArticles.length === 0) {
        grid.innerHTML = '<div style="text-align: center; color: var(--text-light); font-size: 1.5rem; margin: 2rem;">You have not uploaded any articles yet.</div>';
    } else {
        currentNews = userArticles;
        displayNews(currentNews);
    }
    
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim() === 'My Articles') {
            btn.classList.add('active');
        }
    });
}

function displayMyArticlesInGrid(articles) {
    const grid = document.getElementById('myArticlesGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    articles.forEach(article => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'news-card glow-on-hover rgb-border scroll-animate';
        cardDiv.style.cssText = 'opacity: 1; transform: translateY(0); position: relative;';
        cardDiv.dataset.articleId = article.id;
        
        const safeTitle = escapeHtml(article.title);
        const safeExcerpt = escapeHtml(article.excerpt);
        const safeCategory = escapeHtml(article.category);
        const safeAuthor = escapeHtml(article.author);
        const safeImage = escapeHtml(article.image);
        
        cardDiv.innerHTML = `
            <button class="delete-btn" data-article-id="${article.id}" style="position: absolute; top: 10px; right: 10px; z-index: 10; padding: 0.4rem 0.8rem; font-size: 0.8rem;">Delete</button>
            <button class="edit-btn" data-article-id="${article.id}" style="position: absolute; top: 10px; left: 10px; z-index: 10; padding: 0.4rem 0.8rem; font-size: 0.8rem;">Edit</button>
            <img src="${safeImage}" alt="${safeTitle}" loading="lazy">
            <div class="news-card-content">
                <span class="category">${safeCategory.toUpperCase()}</span>
                <h3>${safeTitle}</h3>
                <p>${safeExcerpt}</p>
                <div class="meta">By ${safeAuthor} | ${formatDate(article.date)}</div>
            </div>
        `;
        
        cardDiv.addEventListener('click', () => openArticle(article.id));
        cardDiv.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteArticle(article.id);
        });
        cardDiv.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            editArticle(article.id);
        });
        
        grid.appendChild(cardDiv);
    });
}

function showMyArticlesWithDeleteMode() {
    const userArticles = JSON.parse(localStorage.getItem('newsArticles')) || [];
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    
    if (userArticles.length === 0) {
        grid.innerHTML = '<div style="text-align: center; color: var(--text-light); font-size: 1.5rem; margin: 2rem;">You have no uploaded articles to delete!</div>';
        return;
    }
    
    grid.innerHTML = '';
    
    const headerDiv = document.createElement('div');
    headerDiv.style.cssText = 'text-align: center; margin-bottom: 2rem;';
    headerDiv.innerHTML = '<h2 style="color: #ff4444; margin-bottom: 1rem;">Select Articles to Delete</h2>';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'submit-btn';
    deleteBtn.style.cssText = 'background: #ff4444; margin-right: 1rem;';
    deleteBtn.textContent = 'Delete Selected';
    deleteBtn.addEventListener('click', deleteSelectedArticles);
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'submit-btn';
    cancelBtn.style.background = '#666';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', () => window.location.href = 'index.html');
    
    headerDiv.appendChild(deleteBtn);
    headerDiv.appendChild(cancelBtn);
    grid.appendChild(headerDiv);
    
    const cardsContainer = document.createElement('div');
    cardsContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem;';
    
    userArticles.forEach(article => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'news-card';
        cardDiv.style.position = 'relative';
        
        const safeTitle = escapeHtml(article.title);
        const safeExcerpt = escapeHtml(article.excerpt);
        const safeCategory = escapeHtml(article.category);
        const safeAuthor = escapeHtml(article.author);
        const safeImage = escapeHtml(article.image);
        
        cardDiv.innerHTML = `
            <input type="checkbox" class="article-checkbox" data-id="${article.id}" style="position: absolute; top: 10px; left: 10px; width: 25px; height: 25px; cursor: pointer; z-index: 10;">
            <img src="${safeImage}" alt="${safeTitle}" style="opacity: 0.7;">
            <div class="news-card-content">
                <span class="category">${safeCategory.toUpperCase()}</span>
                <h3>${safeTitle}</h3>
                <p>${safeExcerpt}</p>
                <div class="meta">By ${safeAuthor} | ${formatDate(article.date)}</div>
            </div>
        `;
        
        cardsContainer.appendChild(cardDiv);
    });
    
    grid.appendChild(cardsContainer);
    
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim() === 'My Articles') {
            btn.classList.add('active');
        }
    });
}

function deleteSelectedArticles() {
    const checkboxes = document.querySelectorAll('.article-checkbox:checked');
    
    if (checkboxes.length === 0) {
        alert('Please select at least one article to delete!');
        return;
    }
    
    if (!confirm(`Are you sure you want to delete ${checkboxes.length} selected article(s)?`)) {
        return;
    }
    
    const idsToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.id));
    let userArticles = JSON.parse(localStorage.getItem('newsArticles')) || [];
    
    userArticles = userArticles.filter(article => !idsToDelete.includes(article.id));
    localStorage.setItem('newsArticles', JSON.stringify(userArticles));
    
    showToast(`${checkboxes.length} article(s) deleted successfully!`, 'success');
    
    setTimeout(() => {
        if (userArticles.length === 0) {
            window.location.href = 'index.html';
        } else {
            showMyArticlesWithDeleteMode();
        }
    }, 1000);
}

function displayMyArticles(articles) {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    articles.forEach(article => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'news-card glow-on-hover rgb-border';
        
        const safeTitle = escapeHtml(article.title);
        const safeExcerpt = escapeHtml(article.excerpt);
        const safeCategory = escapeHtml(article.category);
        const safeAuthor = escapeHtml(article.author);
        const safeImage = escapeHtml(article.image);
        
        cardDiv.innerHTML = `
            <img src="${safeImage}" alt="${safeTitle}" data-article-id="${article.id}" style="cursor: pointer;">
            <div class="news-card-content">
                <div class="article-actions" style="margin-bottom: 1rem;">
                    <button class="edit-btn" data-article-id="${article.id}" style="padding: 0.4rem 1rem; margin-right: 0.5rem;">✏️ Edit</button>
                    <button class="delete-btn" data-article-id="${article.id}" style="padding: 0.4rem 1rem;">🗑️ Delete</button>
                </div>
                <span class="category">${safeCategory.toUpperCase()}</span>
                <h3 data-article-id="${article.id}" style="cursor: pointer;">${safeTitle}</h3>
                <p data-article-id="${article.id}" style="cursor: pointer;">${safeExcerpt}</p>
                <div class="meta">By ${safeAuthor} | ${formatDate(article.date)}</div>
            </div>
        `;
        
        // Add event listeners
        cardDiv.querySelector('img').addEventListener('click', () => openArticle(article.id));
        cardDiv.querySelector('h3').addEventListener('click', () => openArticle(article.id));
        cardDiv.querySelector('p').addEventListener('click', () => openArticle(article.id));
        cardDiv.querySelector('.edit-btn').addEventListener('click', () => editArticle(article.id));
        cardDiv.querySelector('.delete-btn').addEventListener('click', () => deleteArticle(article.id));
        
        grid.appendChild(cardDiv);
    });
}





function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}











function initAdvancedFeatures() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}











addTouchSupport();
initAdvancedFeatures();


