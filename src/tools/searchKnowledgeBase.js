import faqData from "../data/faqs.json" with { type: "json" };

export default function searchKnowledgeBase(query) {

    const keywords = query
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(Boolean);

    let bestArticle = null;
    let highestScore = 0;

    for (const article of faqData.articles) {

        let score = 0;

        const title = article.title.toLowerCase();
        const category = article.category.toLowerCase();
        const content = article.content.toLowerCase();
        const tags = article.tags.map(tag => tag.toLowerCase());

        for (const word of keywords) {

            if (title.includes(word))
                score += 5;

            if (category.includes(word))
                score += 4;

            if (tags.some(tag => tag.includes(word)))
                score += 3;

            if (content.includes(word))
                score += 1;
        }

        if (score > highestScore) {
            highestScore = score;
            bestArticle = article;
        }
    }

    if (!bestArticle || highestScore === 0) {
        return {
            found: false,
            message: "No relevant FAQ found."
        };
    }

    return {
        found: true,
        article: {
            id: bestArticle.id,
            title: bestArticle.title,
            category: bestArticle.category,
            content: bestArticle.content
        }
    };
}