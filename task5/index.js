const inputPageNumber = document.querySelector(".page-number");
const inputLimit = document.querySelector(".limit");
const btnNode = document.querySelector("button");
const textBlock = document.querySelector(".text__row");
const imagesBlock = document.querySelector(".image__row");

btnNode.addEventListener("click", checkInput);

if (loadPhotosFromLocalStorage())
    printStatus("Загружены последние просмотренные фото.");

function checkInput() {
    const pageNumber = inputPageNumber.value;
    const limit = inputLimit.value;

    if ((pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        printStatus("Номер страницы и лимит вне диапазона от 1 до 10.");
        return;
    } else
        if (pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) {
            printStatus("Номер страницы вне диапазона от 1 до 10.");
            return;
        } else
            if (limit < 1 || limit > 10 || isNaN(limit)) {
                printStatus("Лимит вне диапазона от 1 до 10.");
                return;
            }

    printStatus("Загружаю фото...");

    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
        .then((response) => response.json())
        .then((json) => {
            showResult(json);
            savePhotosToLocalStorage();
            printStatus("Фото загружены.");
        })
        .catch((reason) => {
            printStatus("Ошибка: " + reason);
        });
}

function printStatus(text) {
    textBlock.innerHTML = text;
}

function showResult(apiData) {
    let img = '';

    apiData.forEach(item => {
        const imgBlock = `<div>
                                <img
                                  src="${item.download_url}"
                                  style="width: 150px; margin-right: 30px"
                                />
                                <p>${item.author}</p>
                              </div>`;
        img += imgBlock;
    });

    imagesBlock.innerHTML = img;
}

function savePhotosToLocalStorage() {
    localStorage.setItem("last_photos", imagesBlock.innerHTML);
}

function loadPhotosFromLocalStorage() {
    imagesBlock.innerHTML = localStorage.getItem("last_photos");
    return imagesBlock.innerHTML.length > 0;
}