function mapInit() {
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    return mymap;
  
}

async function dataHandler(mapObjectFromFunction) {}

async function windowActions() {
    const map = mapInit();
    await dataHandler(map);
}

window.onload = windowActions;