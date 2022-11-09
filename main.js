//task1
let button_cat = document.querySelector(".get-random-cat"),
button_dog = document.querySelector(".get-random-dog"),
imgs = document.querySelectorAll(".random-generate-box"),
img_cat = imgs[0].querySelector("img"),
img_dog = imgs[1].querySelector("img");
const url_cat = "http://aws.random.cat/meow",
url_dog = "https://dog.ceo/api/breeds/image/random";

button_cat.addEventListener('click',async function() {
    try {
        let response_cat = await fetch(url_cat);
        let data_cat = await response_cat.json();
        img_cat.src = data_cat.file;
    } catch (error) {
        console.log(error);
    }
});
button_dog.addEventListener('click',async function() {
    try {
        let response_dog = await fetch(url_dog);
        let data_dog = await response_dog.json();
        img_dog.src = data_dog.message;
    } catch (error) {
        console.log(error);
    }
});

//task2
let select = document.querySelectorAll(".currency"),
button_convert = document.getElementById("convert-btn"),
input = document.getElementById("input"),
result = document.getElementById("result");

fetch("https://www.cbr-xml-daily.ru/daily_json.js").then(function (result) {
    return result.json();
}).then(function (data) {
    display(data.Valute);
});

function display(data) {
    const entries = Object.entries(data);
    for(let i = 0; i < entries.length; i++) {
        select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    } 
}

button_convert.addEventListener('click', function() {
    let currency1 = select[0].value;
    let currency2 = select[1].value;
    let value = input.value;

    if(currency1 != currency2) {
        convert(currency1, currency2, value);
    }
    else{
        alert("Выберите отличающиеся валюты");
    }
});

async function convert(currency1, currency2, value) {
    let response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    let datav = await response.json();
    let nominal1 = await datav.Valute[`${currency1}`].Nominal;
    let nominal2 = await datav.Valute[`${currency2}`].Nominal;
    let value1 = await datav.Valute[`${currency1}`].Value;
    value1 = value1 / nominal1;
    value1 = value1 * value;
    let value2 = await datav.Valute[`${currency2}`].Value;
    value2 = value2 / nominal2;
    result.value = (Math.floor((value1 / value2) * 10000) / 10000);
}