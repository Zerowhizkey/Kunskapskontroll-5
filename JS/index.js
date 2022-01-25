const results = document.querySelector(".results");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const pageIndicator = document.querySelector(".page-indicator");

const settings = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.thecatapi.com/v1/images/search`,
    "method": "GET",
    "headers": {
        "x-api-key": "9d39b0f1-0d9d-4153-a75e-eff9234ec1f0"
    },
    "page": 0,
    "limit": 12,
    "order": "asc"
}

$.ajax(settings).done(function (response) {
    console.log(response);
});

function showCats(data) {
    results.textContent = null;

    data.forEach(({ url }) => {
        const $img = document.createElement("img");
        $img.src = url;
        results.append($img);
    });
}

async function getCats() {
    const url = new URL(settings.url);

    url.searchParams.append("limit", settings.limit);
    url.searchParams.append("page", settings.page);
    url.searchParams.append("order", settings.order);

    pageIndicator.textContent = `Showing page ${settings.page}`;
    results.textContent = "Loading..";

    toggleButtons(true);

    try {
        const response = await fetch(url, {
            headers: {
                "x-api-key": "9d39b0f1-0d9d-4153-a75e-eff9234ec1f0",
            },
        });
        const data = await response.json();
        showCats(data);
    } catch (err) {
        results.textContent =
            "Something went wrong while fetching data from the server";
    } finally {
        toggleButtons(false);
        previous.disabled = settings.page === 0;
    }
}

function toggleButtons(disabled) {
    previous.disabled = disabled;
    next.disabled = disabled;
}

previous.addEventListener("click", () => {
    settings.page--;
    getCats();
});

next.addEventListener("click", () => {
    settings.page++;
    getCats();
});

getCats();