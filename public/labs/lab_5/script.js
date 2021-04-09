function mapInit() {
    const mymap = L.map('mapid').setView([51.505, -0.09], 13);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia3ZuMTc1IiwiYSI6ImNrbmFxam85bDAwc2IydnBoa2owaWtqbHQifQ.jmECV75ko97-7r3QAGVNTw'
    }).addTo(mymap);
    console.log('mymap', mymap);

    return mymap;
}

async function dataHandler(mapObjectFromFunction) {
    const form = document.querySelector("#search-form");
    const search = document.querySelector("#search");
    const targetList = document.querySelector(".target-list");

    const request = await fetch('/api');
    const data = await request.json();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const filtered = data.filter((record) => record.zip.includes(search.value));
        filtered.forEach((item) => {
            const longLat = item.geocoded_column_1.coordinates;
            console.log('markerLongLat', longLat[0], longLat[1]);
            const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromMapFunction);
        
            const appendItem = document.createElement('li');
            appendItem.classList.add('block');
            appendItem.classList.add('list-item');
            appendItem.innerHTML = `<div class="list-header is-size-5">${item.name}</div><address class="is-size-6">${item.address_line_1}</address>`;
            targetList.append(appendItem);
        });
    });
}

async function windowActions() {
    const map = mapInit();
    // await dataHandler(map);
}

window.onload = windowActions;