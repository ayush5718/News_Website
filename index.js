const API_KEY = "65e0afaa92ea49c299041d32a8e91eb5";
const url = "https://newsapi.org/v2/everything?q=";

const todayDate = new Date();
const TodayDate = todayDate.toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"

})


window.addEventListener("load", () => fetchNews(`India  news`));

// this function is just fetching the date from the website 
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);  //  calling the function named bindData() 

}


function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    })


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsSource.innerHTML = `${article.source.name}- ${date}`;
    newsDesc.innerHTML = article.description;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}
let CurrentSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navitem = document.getElementById(id);
    CurrentSelectedNav?.classList.remove('active');
    CurrentSelectedNav = navitem;
    CurrentSelectedNav.classList.add('active');
}


const searchText = document.getElementById('search-text');
const searchBtn = document.getElementById('search-btn');

console.log(searchText + searchBtn);

searchBtn.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
})