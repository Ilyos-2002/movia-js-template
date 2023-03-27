"use strict"

let elForm = select("#form");
let elSearch = select("#search");
let elGener = select("#sortbygenre");
let elCardTemplate = select("#card-template");
let elCardTemplates = document.createDocumentFragment()
let elListCard = select("#list-card");
let elModalTemlate = select("#modal-temlate");


elForm.addEventListener("submit", evt => {
    evt.preventDefault()
    let { search, sortbygenre, sortbyw: alfa } = evt.target.elements
    let regax = new RegExp(search.value.trim(), "gi");
    let searchedFilmed = films.filter(film => film.Title.match(regax))

    if (sortbygenre.value != "All") {
        let filteredByGener = searchedFilmed.filter(film => film.genres.includes(sortbygenre.value))
        searchedFilmed = filteredByGener
    }

    if (alfa.value == "a-z") {
        searchedFilmed.sort((a, b) => {
            if (a.Title > b.Title) {
                return 1
            } else if (a.Title < b.Title) {
                return -1
            } else {
                return 0
            }
        })
    }

    if (alfa.value == "z-a") {
        searchedFilmed.sort((a, b) => {
            if (b.Title > a.Title) {
                return 1
            } else if (b.Title < a.Title) {
                return -1
            } else {
                return 0
            }
        })
    }
    renderFunc(searchedFilmed, elListCard);
});


function renArr(array, element) {
    let genArr = []
    array.forEach(film => {
        film.genres.forEach(genre => {
            !genArr.includes(genre) ? genArr.push(genre) : null
        });
    });
    genArr.forEach(genre => {

        let newOption = create("Option");
        newOption.textContent = genre;
        newOption.value = genre;
        element.append(newOption);

    });
}
renArr(films, elGener)

function renderFunc(array, element) {
    element.innerHTML = null
    array.forEach(film => {
        let cloneTemplate = elCardTemplate.cloneNode(true);

        let li = select("li", cloneTemplate.content);
        let img = select("img", cloneTemplate.content);
        let h2 = select("h2", cloneTemplate.content);
        let btn = select("button", cloneTemplate.content);

        img.src = film.Poster;
        h2.textContent = film.Title;
        btn.dataset.id = film.id;

        btn.addEventListener("click", (evt) => {
            let filmId = evt.target.dataset.id

            let cloneTemplateModal = elModalTemlate.cloneNode(true).content;
            let foundFilm = array.find(item => item.id == filmId)

            // console.log(cloneTemplateModal);
            let modal = select("#modal", cloneTemplateModal)
            let iframe = select("iframe", cloneTemplateModal)
            let h2m = select("h2", cloneTemplateModal)
            let h4 = select("h4", cloneTemplateModal)
            let p = select("p", cloneTemplateModal)
            // let delBtn = select("button", cloneTemplateModal)


            iframe.src = ` ${foundFilm.link}`
            h2m.textContent = foundFilm.Title
            h4.textContent = `Genres: ${foundFilm.genres.join(", ")}`
            p.textContent = foundFilm.overview

            document.querySelector("body").append(modal)

        })
        element.append(li)

    })

}
renderFunc(films, elListCard);



function deleteModal() {
    let elModal = select("#modal")
    elModal.remove()
}

