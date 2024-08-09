// html from data
const submit = document.querySelector(".submit")
const search = document.getElementById("searchBar")

// updating variable
const ipVal = document.querySelector(".ip")
const locVal = document.querySelector(".loc")
const timeVal = document.querySelector(".time")
const ispVal = document.querySelector(".isp")

submit.addEventListener("click", async (e) => {

    e.preventDefault()

    try {
        if (!search.value) {
            throw new TypeError("Search input cannot be empty");
        }

        else {
            await fetch(`https://ipapi.co/${search.value}/json/`)
                .then(res => res.json())
                .then(data => renderResults(data))
                .catch(error => (error));

            //clearing 
            search.value = ''
        }
    } catch (e) {
        console.log(e)
    }
})

// for viewers ip
fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => renderResults(data))
    .catch(error => (error));

// for upadting page
function renderResults(data) {

    //info update
    ipVal.innerHTML = data.ip
    locVal.innerHTML = `${data.city}, ${data.region}, ${data.country_name}`
    timeVal.innerHTML = data.timezone
    ispVal.innerHTML = data.org
    console.log("update")
    // map update
    let marker = L.marker([data.latitude, data.longitude]).addTo(map)
        .bindPopup(`<b>Hello!</b><br/> WelCome to ${data.city}.`).openPopup();
    map.flyTo([data.latitude, data.longitude], 13);
}

//basic setup for map
let map = L.map('map').setView([19.0748, 72.8856], 13);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);