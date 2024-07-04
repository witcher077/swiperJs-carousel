
var ApiData = null;
const product_container = document.getElementById('product-container');
const store_search_box = document.getElementById('store_search_box');

const getApiData = (searchText = "") => {
    fetch("https://fakestoreapi.com/products")
        .catch(err => console.log(err))
        .then((d) => d.json())
        .then((data) => {
            ApiData = data;
            // console.log(ApiData);

            if (ApiData == null) {
                let card = '<h1 style="width:100%;text-align:center;" class="loading">Loading.....</h1>';
                product_container.insertAdjacentHTML('beforeend', card)
            }
            else {
                let filteredData = ApiData.filter(ele => ele.title.toLowerCase().includes(searchText.toLowerCase()));

                ShowData(filteredData);

            }

        })
}

getApiData();

document.getElementById("store_search_box").addEventListener('input', (e) => {
    // console.log(e.target.value);
    getApiData(e.target.value);

})
const ShowData = (data) => {
    console.log(data);
    data.forEach(element => {
        let card = document.createElement('div');
        card.classList.add("swiper-slide");
        card.classList.add("card");
        card.style.backgroundColor = "rgb(241 245 249)";
        let content = ` 
    <img src=${element.image} />
    <div class="details">
        <h5 class="tittle">${element.title}</h5>
        <div class="price-and-rating"><h6>₹ ${element.price} /-</h6><h6>${element.rating.rate} ⭐</h6></div>

        <p class="discription">${element.description}</p>
        <button>Add to Cart</button>

    </div>`;
        card.innerHTML = content;

        product_container.appendChild(card);

    })
}
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    centeredSlides: false,
    slidesPerGroupSkip: 1,
    grabCursor: true,
    keyboard: {
        enabled: true,
    },
    breakpoints: {
        480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 10,
        },
        980: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20,
        },
        1280: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 10,
            resistanceRatio: 0.85
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});


