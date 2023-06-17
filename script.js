
let lat = 0
let lng = 0



//loading api request
async function loadApi() {
    let ip = search.value
    return (
        await fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=at_OI2BK3MLwyGUD2MOyNBwqrNTyjIWr&ipAddress=${ip}`
        )
    ).json();
}

// getting ip
const submit = document.querySelector(".submit")
const search = document.getElementById("searchBar")


submit.addEventListener("click", async (e) => {
    let data 

    const ipVal = document.querySelector(".ip")
    const locVal = document.querySelector(".loc")
    const timeVal = document.querySelector(".time")
    const ispVal = document.querySelector(".isp")

    e.preventDefault()

    try {

        if (!search.value) {
            
            throw new TypeError("Search input cannot be empty");
        }
        else {

            //api request
            data = await loadApi()//wait karege jub tak answer nhi mil jata

            // display
            ipVal.innerHTML = data.ip
            locVal.innerHTML = data.location.country + " " + data.location.city
            timeVal.innerHTML = data.location.timezone
            ispVal.innerHTML = data.isp

            //setting map
            lat = parseFloat(data.location.lat)
            lng = parseFloat(data.location.lng)

            //marker pointer
            let marker = L.marker([lat, lng]).addTo(map)
                .bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();
            map.flyTo([lat, lng], 13);

            //clearing 
            search.value = ''
        }


    } catch (e) {
        console.log(e)
    }

})

//basic setup for map
let map = L.map('map').setView([lat, lng], 13);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);








// function getIP() {
//     const ip = document.getElementById("searchBar").value;
//     alert(typeof(ip));
//     const url = "https://geo.ipify.org/api/v2/country,city?apiKey=at_8qm81JZtUM8YIeG6kawnualbmRpIS&ipAddress=" + ip;

//     // Create the XMLHttpRequest object
//     let request = new XMLHttpRequest();
//     request.open("GET", url);
//     request.send();

//     request.onload = () => {
//         if (request.status >= 200 && request.status < 400) {
//             console.log(request.responseText);
//         } else {
//             alert("onload");
//             console.log("Request returned an error status.");
//         }
//     };

//     request.onerror = () => {
//         console.log("Error occurred during the request.");
//     };
// }


