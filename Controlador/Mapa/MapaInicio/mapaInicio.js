function inicializarMapaInicio() {
    var localizacion = new google.maps.LatLng(10.645556,-63.038889);

    var opciones = {
        center: localizacion,
        zoom: 10
    };

    var mapa = new google.maps.Map(document.getElementById("maps"),
        opciones);

    var marcador = new google.maps.Marker({
        position: localizacion,
        map: mapa,
        title: "Cumaná"
    });    
}
