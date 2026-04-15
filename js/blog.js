// MoneyCalcPro - Blog Functionality

document.addEventListener('DOMContentLoaded', () => {
    initializeBlog();
});

function initializeBlog() {
    // Search functionality
    const searchInput = document.getElementById('blogSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchBlogPosts, 300));
    }

    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterByCategory);
    }

    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePosts);
    }

    // Reading progress bar
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
        createReadingProgressBar();
    }
}

// Search blog posts
function searchBlogPosts(e) {
    const searchTerm = e.target.value.toLowerCase();
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const excerpt = card.querySelector('p').textContent.toLowerCase();
        const category = card.querySelector('.blog-category').textContent.toLowerCase();

        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter by category
function filterByCategory(e) {
    const category = e.target.value;
    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
        const cardCategory = card.querySelector('.blog-category').textContent.toLowerCase();

        if (category === 'all' || cardCategory === category.toLowerCase()) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Load more posts (pagination simulation)
let visiblePosts = 6;
function loadMorePosts() {
    const allCards = document.querySelectorAll('.blog-card');
    const loadMoreBtn = document.getElementById('loadMore');

    for (let i = visiblePosts; i < visiblePosts + 3 && i < allCards.length; i++) {
        allCards[i].style.display = 'block';
    }

    visiblePosts += 3;

    if (visiblePosts >= allCards.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Reading progress bar for articles
function createReadingProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'readingProgress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #2563eb, #10b981);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return;

        const articleTop = articleContent.offsetTop;
        const articleHeight = articleContent.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY;

        const progress = ((scrolled - articleTop + windowHeight) / articleHeight) * 100;
        const clampedProgress = Math.min(Math.max(progress, 0), 100);

        progressBar.style.width = clampedProgress + '%';
    });
}

// Share article
function shareArticle(platform) {
    const url = window.location.href;
    const title = document.querySelector('.article-content h1').textContent;
    let shareUrl = '';

    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Related articles (simple implementation)
function showRelatedArticles(currentArticleId) {
    // This would typically fetch from a database
    // For now, we'll just suggest random articles
    const allArticles = Array.from({length: 20}, (_, i) => i + 1);
    const related = allArticles
        .filter(id => id !== currentArticleId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    return related;
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Estimate reading time
function estimateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

// Format article date
function formatArticleDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Back to blog list button
function addBackToBlogButton() {
    const container = document.querySelector('.article-content');
    if (!container) return;

    const backBtn = document.createElement('a');
    backBtn.href = 'blog.html';
    backBtn.className = 'btn btn-secondary';
    backBtn.style.marginTop = '2rem';
    backBtn.style.display = 'inline-block';
    backBtn.textContent = '← Back to Blog';
    
    container.insertBefore(backBtn, container.firstChild);
}

// Initialize back button on article pages
if (document.querySelector('.article-content')) {
    document.addEventListener('DOMContentLoaded', addBackToBlogButton);
}

console.log('MoneyCalcPro - Blog JavaScript loaded');
