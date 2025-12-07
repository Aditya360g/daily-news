# Daily News Website

## Auto News Update Setup

### Step 1: Get Free API Key
1. Visit https://newsapi.org
2. Sign up for free account
3. Get your API key (100 requests/day free)

### Step 2: Configure API
1. Open `api-config.js`
2. Replace `YOUR_API_KEY_HERE` with your actual API key
3. Example: `const NEWS_API_KEY = 'abc123xyz456';`

### Step 3: How It Works
- Automatically fetches 5 latest news articles daily
- Updates only once per day
- Stores news in browser localStorage
- Keeps last 50 articles
- Works on any hosting (GitHub Pages, Netlify, etc.)

### Features
- ✅ Auto-update daily news
- ✅ No backend required
- ✅ Free API (100 requests/day)
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Search functionality
- ✅ Category filtering

### Note
Without API key, website will use default static news from `news-data.js`
