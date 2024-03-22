const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        displayNews(data.articles);
    } catch (error) {
        console.error('There was an error!', error);
    }
}

fetchNews();

function displayNews(articles) {
    const newsDiv = document.querySelector("#news");

    for (const article of articles) {
        if (article.title !== "[Removed]") {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');

            // Create and append an image to the articleDiv
            const image = document.createElement('img');
            image.src = article.urlToImage;
            image.alt = article.title; // Set alt text for accessibility
            image.height = 300; // Set height
            image.width = 300; // Set width
            articleDiv.appendChild(image);

            // Create and append a headline to the articleDiv
            const title = document.createElement('h4');
            title.textContent = article.title;
            articleDiv.appendChild(title);

            // Create and append text below the image
            const description = document.createElement('p');
            description.textContent = article.description; // Use the article's description
            articleDiv.appendChild(description);

            // Append the articleDiv to the newsDiv
            newsDiv.appendChild(articleDiv);
        }
    }
}