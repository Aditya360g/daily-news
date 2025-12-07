const newsData = [
    {
       id: 1,
        title: "Global Climate Summit Reaches Historic Agreement",
        excerpt: "World leaders commit to ambitious carbon reduction targets in landmark deal.",
        content: "In a groundbreaking development, world leaders from over 190 countries have reached a historic agreement at the Global Climate Summit. The accord includes ambitious carbon reduction targets aimed at limiting global warming to 1.5 degrees Celsius. Key provisions include transitioning to renewable energy sources by 2040, establishing a $500 billion climate fund for developing nations, and implementing strict regulations on industrial emissions. Environmental groups have praised the agreement as a crucial step forward, though some critics argue the targets may not be ambitious enough to prevent catastrophic climate change.",
        category: "politics",
        author: "Sarah Johnson",
        date: "2024-01-15",
        image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800"
    },
    {
        id: 2,
        title: "Revolutionary AI Breakthrough in Medical Diagnosis",
        excerpt: "New artificial intelligence system detects diseases with 99% accuracy.",
        content: "Researchers at leading tech companies have unveiled a revolutionary AI system capable of detecting multiple diseases with unprecedented accuracy. The system, trained on millions of medical images and patient records, can identify early signs of cancer, heart disease, and neurological conditions with 99% accuracy. Medical professionals are hailing this as a game-changer that could save millions of lives through early detection. The technology is expected to be deployed in hospitals worldwide within the next two years, making advanced diagnostic capabilities accessible to underserved communities.",
        category: "technology",
        author: "Michael Chen",
        date: "2024-01-14",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
    },
    {
        id: 3,
        title: "Championship Finals Set Record Viewership",
        excerpt: "Historic match draws over 500 million viewers worldwide.",
        content: "The championship finals have shattered all previous viewership records, with over 500 million people tuning in from around the globe. The thrilling match, which went into overtime, showcased exceptional athleticism and sportsmanship. The winning team's comeback from a 20-point deficit in the final quarter has been described as one of the greatest performances in sports history. Analysts attribute the record-breaking viewership to the global appeal of both teams and the high-stakes nature of the competition. The event generated over $2 billion in revenue, setting new benchmarks for sports broadcasting.",
        category: "sports",
        author: "David Martinez",
        date: "2024-01-13",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800"
    },
    {
        id: 4,
        title: "Blockbuster Film Breaks Box Office Records",
        excerpt: "Latest superhero movie earns $300 million in opening weekend.",
        content: "The highly anticipated superhero film has demolished box office records, earning an astounding $300 million in its opening weekend. The movie, which features cutting-edge visual effects and an all-star cast, has received critical acclaim for its storytelling and character development. Fans lined up for hours at theaters worldwide, with many screenings selling out weeks in advance. Industry experts predict the film will surpass $2 billion globally, potentially becoming the highest-grossing movie of all time. The success has already prompted the studio to greenlight two sequels.",
        category: "entertainment",
        author: "Emma Wilson",
        date: "2024-01-12",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800"
    },
    {
        id: 5,
        title: "Major Economic Reform Package Announced",
        excerpt: "Government unveils comprehensive plan to boost economic growth.",
        content: "The government has announced a sweeping economic reform package designed to stimulate growth and create jobs. The plan includes tax incentives for small businesses, infrastructure investments totaling $1 trillion, and measures to reduce regulatory burdens. Economists have offered mixed reactions, with some praising the bold approach while others express concerns about potential inflation. The reforms are expected to create 5 million new jobs over the next three years and increase GDP growth by 2.5%. Opposition parties have called for more detailed analysis before the measures are implemented.",
        category: "politics",
        author: "Robert Taylor",
        date: "2024-01-11",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800"
    },
    {
        id: 6,
        title: "Quantum Computing Achieves Major Milestone",
        excerpt: "Scientists demonstrate quantum supremacy in practical applications.",
        content: "In a landmark achievement, researchers have successfully demonstrated quantum supremacy in solving real-world problems. The quantum computer solved complex optimization problems in minutes that would take classical supercomputers thousands of years. This breakthrough has profound implications for drug discovery, financial modeling, and cryptography. Tech giants are racing to commercialize the technology, with the first quantum computing services expected to launch next year. Experts believe this marks the beginning of a new era in computing that will revolutionize multiple industries.",
        category: "technology",
        author: "Lisa Anderson",
        date: "2024-01-10",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800"
    },
    {
        id: 7,
        title: "Olympic Athlete Breaks World Record",
        excerpt: "Sprinter shatters 100-meter record that stood for 15 years.",
        content: "In an electrifying performance, a young sprinter has broken the 100-meter world record that had stood for 15 years. The athlete completed the distance in an astonishing 9.48 seconds, beating the previous record by 0.10 seconds. Sports scientists are analyzing the performance to understand the biomechanics behind this extraordinary achievement. The record-breaking run has sparked discussions about the limits of human performance and the role of advanced training techniques. The athlete has become an instant global sensation, with endorsement deals reportedly worth over $50 million.",
        category: "sports",
        author: "James Brown",
        date: "2024-01-09",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800"
    },
    {
        id: 8,
        title: "Music Festival Announces Star-Studded Lineup",
        excerpt: "Biggest names in music to perform at summer festival.",
        content: "Organizers of the world's largest music festival have unveiled a star-studded lineup featuring the biggest names in the industry. The three-day event will showcase over 200 artists across multiple genres, from pop and rock to hip-hop and electronic music. Early bird tickets sold out within minutes, with fans eager to secure their spot at what's being called the concert event of the decade. The festival is expected to attract 500,000 attendees and generate significant economic impact for the host city. Special sustainability initiatives will make this the first carbon-neutral major music festival.",
        category: "entertainment",
        author: "Sophia Lee",
        date: "2024-01-08",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800"
    },
    {
        id: 9,
        title: "Space Mission Discovers New Exoplanet",
        excerpt: "NASA telescope finds potentially habitable world 100 light-years away.",
        content: "NASA's latest space telescope has discovered a potentially habitable exoplanet located 100 light-years from Earth. The planet, designated Kepler-442c, orbits within the habitable zone of its star and shows signs of having liquid water. Scientists are excited about the discovery as it represents one of the most Earth-like planets found to date. The planet has a similar size and composition to Earth, with temperatures that could support life as we know it. Further observations are planned to study the planet's atmosphere and search for biosignatures.",
        category: "technology",
        author: "Dr. Amanda Rodriguez",
        date: "2024-01-07",
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800"
    },
    {
        id: 10,
        title: "International Trade Agreement Signed",
        excerpt: "Major economies unite in historic trade partnership.",
        content: "Representatives from 15 major economies have signed a groundbreaking trade agreement that will reshape global commerce. The partnership aims to reduce tariffs, streamline regulations, and promote sustainable trade practices. Economists predict the agreement will boost global GDP by $2.5 trillion over the next decade. The deal includes provisions for digital trade, environmental protection, and labor rights. Critics argue that some smaller nations may be disadvantaged, while supporters claim it will create millions of jobs worldwide.",
        category: "politics",
        author: "Thomas Anderson",
        date: "2024-01-06",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
    },
    {
        id: 11,
        title: "Virtual Reality Gaming Revolution",
        excerpt: "New VR technology promises ultra-realistic gaming experiences.",
        content: "Gaming companies have unveiled revolutionary VR technology that creates unprecedented levels of immersion. The new systems feature haptic feedback suits, 8K resolution per eye, and neural interface capabilities. Beta testers report experiences so realistic they sometimes forget they're in a virtual world. The technology is expected to transform not just gaming but also education, training, and social interaction. Pre-orders have already exceeded 2 million units despite the $3,000 price tag.",
        category: "technology",
        author: "Kevin Park",
        date: "2024-01-05",
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800"
    },
    {
        id: 12,
        title: "Tennis Championship Delivers Epic Final",
        excerpt: "Five-set thriller captivates millions of viewers worldwide.",
        content: "The tennis championship final delivered one of the most memorable matches in sports history. The five-set thriller lasted over four hours, with both players showcasing incredible skill and determination. The match featured 47 aces, 156 winners, and multiple momentum swings that kept fans on the edge of their seats. The victory marks the winner's first Grand Slam title after years of near-misses. Tennis analysts are calling it a match that will be remembered for generations.",
        category: "sports",
        author: "Maria Santos",
        date: "2024-01-04",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800"
    },
    {
        id: 13,
        title: "Hollywood Studio Announces Mega-Budget Film",
        excerpt: "$500 million production to feature cutting-edge technology.",
        content: "A major Hollywood studio has announced its most ambitious project yet: a $500 million science fiction epic that will push the boundaries of filmmaking technology. The movie will be shot entirely in virtual production stages using advanced LED walls and real-time rendering. The cast includes A-list actors from around the world, and the story spans multiple planets and time periods. Industry experts believe this could set a new standard for big-budget filmmaking and potentially revolutionize how movies are made.",
        category: "entertainment",
        author: "Rachel Green",
        date: "2024-01-03",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800"
    },
    {
        id: 14,
        title: "Renewable Energy Milestone Achieved",
        excerpt: "Solar and wind power now generate 50% of global electricity.",
        content: "For the first time in history, renewable energy sources now generate more than 50% of the world's electricity. Solar and wind power have seen dramatic cost reductions and efficiency improvements over the past decade. The milestone represents a crucial step toward global carbon neutrality goals. Energy experts predict that renewables could reach 80% of global electricity generation by 2035. The transition has created millions of jobs in the clean energy sector while reducing dependence on fossil fuels.",
        category: "politics",
        author: "Dr. Elena Petrov",
        date: "2024-01-02",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800"
    },
    {
        id: 15,
        title: "Cryptocurrency Market Reaches New Heights",
        excerpt: "Digital currencies surge as institutional adoption grows.",
        content: "The cryptocurrency market has reached unprecedented levels as major institutions continue to embrace digital assets. Bitcoin and Ethereum have both hit new all-time highs, driven by increased corporate adoption and regulatory clarity. Central banks worldwide are also developing their own digital currencies, signaling a fundamental shift in the financial landscape. Analysts predict that crypto assets could represent 20% of global financial markets within the next five years. However, volatility remains a concern for many investors.",
        category: "technology",
        author: "Alex Chen",
        date: "2024-01-01",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800"
    }
];
