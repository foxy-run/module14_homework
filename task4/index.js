const inputWidth = document.querySelector(".sender__width");
const inputHeight = document.querySelector(".sender__height");
const btnNode = document.querySelector("button");
const textBlock = document.querySelector(".text__row");
const imagesBlock = document.querySelector(".image__row");

btnNode.addEventListener("click", checkInput);

function checkInput() {
    const width = inputWidth.value;
    const height = inputHeight.value;

    if ((width < 100 || width > 300 || isNaN(width)) || (height < 100 || height > 300 || isNaN(height))) {
        printStatus("Одно из чисел вне диапазона от 100 до 300.");
        return;
    }

    printStatus("Загружаю фото...");

    fetch(`https://picsum.photos/${width}/${height}`)
        .then((response) => response.url)
        .then((result) => {
            showrResult(result);
            printStatus("Фото загружено.");
        })
        .catch((reason) => {
            printStatus("Ошибка: " + reason);
        });
}

function printStatus(text) {
    textBlock.innerHTML = text;
}

function showrResult(photoUrl) {
    const imgBlock = `<img
                          src="${photoUrl}"
                          style="margin-right: 30px"
                        />`;

    imagesBlock.innerHTML = imgBlock;
}