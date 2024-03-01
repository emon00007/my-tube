const btnContainer = document.getElementById('btn-container')
const cardContainer = document.getElementById('card-container')
const errorElement = document.getElementById('error-element')
const sortBtn = document.getElementById('sort-btn')

let selectedCatagori = 1000;
let sortByView = false;

sortBtn.addEventListener('click',()=>{
    // console.log('alhamdullah')
    sortByView = true;
    fetchDataByCategories(selectedCatagori, sortByView)
})

const fetchCategories = () => {
    const url = 'https://openapi.programming-hero.com/api/videos/categories'
    fetch(url)
        .then((res) => res.json())
        .then(({ data }) => {
            data.forEach((card) => {

                console.log(card)
                const newBtn = document.createElement('button')
                newBtn.className = 'category-button btn  btn-ghost bg-slate-700 text-white text-lg'
                newBtn.innerText = card.category
                newBtn.addEventListener('click', () => {
                    fetchDataByCategories(card.category_id)
                    const allBtns = document.querySelectorAll('.category-button')
                    for (const btn of allBtns) {
                        btn.classList.remove('bg-red-600')

                    }
                    newBtn.classList.add('bg-red-600')
                })
                btnContainer.appendChild(newBtn)
            });
        })
}

const fetchDataByCategories = (categorieID, sortByView) => {
    selectedCatagori = categorieID;
    const url = `https://openapi.programming-hero.com/api/videos/category/${categorieID}`
    fetch(url)
        .then((res) => res.json())
        .then(({ data }) => {
            if (sortByView) {
                data.sort((a, b) => {
                    const totalviewFirst = a.others?.views;
                    const totalviewsecond = b.others?.views;
                    const totalviewFirstNumber = parseFloat(totalviewFirst.replace("k",'') )|| 0;
                    const totalviewSecondNumber = parseFloat(totalviewsecond.replace("k",'') )|| 0;

                    return  totalviewSecondNumber -totalviewFirstNumber 
                })
            }


            if (data.length === 0) {
                errorElement.classList.remove('hidden')
            }
            else {
                errorElement.classList.add('hidden')
            }
            cardContainer.innerHTML = ''
            data.forEach((video) => {

                let verifyedBadge = ''
                if (video.authors[0].verified) {
                    verifyedBadge = `<img class="w-6 h-6" src="./images/verify.png" alt=""></img>`
                }
                console.log(video)
                const newCard = document.createElement('div')
                newCard.innerHTML = ` <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72">
                    <img class="w-full" src="${video.thumbnail}" alt="Shoes" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" />
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex mt-3">
                                <p class="">${video.authors[0].profile_name}</p>
                                ${verifyedBadge}
                            </div>
                            <p class="mt-3">${video.others.views}</p>
                        </div>
                    </div>
                </div>
            </div>`

                cardContainer.appendChild(newCard)
            })
        })
}


fetchCategories()
fetchDataByCategories(selectedCatagori, sortByView)