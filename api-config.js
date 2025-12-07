// GNews API Configuration (Free for production use)
const NEWS_API_KEY = 'ea753438374e589cf0cd2aabdfdf0267'; // Get free API key from https://gnews.io
const NEWS_API_URL = 'https://gnews.io/api/v4/top-headlines';

// Fetch latest news from API
async function fetchLatestNews() {
    try {
        const response = await fetch(`${NEWS_API_URL}?lang=en&max=5&apikey=${NEWS_API_KEY}`);
        const data = await response.json();
        
        if (data.articles) {
            return data.articles.map((article, index) => ({
                id: Date.now() + index,
                title: article.title,
                excerpt: article.description || article.title.substring(0, 150) + '...',
                content: article.content || article.description || 'Read full article at source.',
                category: getCategoryFromSource(article.source.name),
                author: article.source.name,
                date: article.publishedAt.split('T')[0],
                image: article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800'
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

// Map source to category
function getCategoryFromSource(source) {
    const categories = {
        'TechCrunch': 'technology',
        'Wired': 'technology',
        'The Verge': 'technology',
        'ESPN': 'sports',
        'BBC Sport': 'sports',
        'CNN': 'politics',
        'BBC News': 'politics',
        'Entertainment Weekly': 'entertainment',
        'Variety': 'entertainment'
    };
    return categories[source] || 'politics';
}

// Update news daily
async function updateDailyNews() {
    const lastUpdate = localStorage.getItem('lastNewsUpdate');
    const today = new Date().toDateString();
    
    // Check if already updated today
    if (lastUpdate === today) {
        return;
    }
    
    // Fetch new articles
    const newArticles = await fetchLatestNews();
    
    if (newArticles.length > 0) {
        // Get existing news
        let existingNews = JSON.parse(localStorage.getItem('newsData')) || newsData;
        
        // Add new articles at the beginning
        existingNews = [...newArticles, ...existingNews];
        
        // Keep only last 50 articles
        existingNews = existingNews.slice(0, 50);
        
        // Save to localStorage
        localStorage.setItem('newsData', JSON.stringify(existingNews));
        localStorage.setItem('lastNewsUpdate', today);
        
        console.log(`Added ${newArticles.length} new articles`);
    }
}

// Auto-update on page load
if (NEWS_API_KEY !== 'YOUR_API_KEY_HERE') {
    updateDailyNews();
}
