function InformacionPeticionesA(a, b) {

    console.log("informacionPeticiones");

    datos = {
        COD: a,
        EST: b
    }

    console.log(datos);

    x = $.ajax({
            url: "Controlador/InformacionPeticiones/InformacionPeticionesAtendidas/informacionPeticionesAtendidas.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {
            console.log(dat);
            console.log("Estado de peticion= " + est);
            console.log("DONE");
            console.log("---------------------------------------------------------");
            status = est;
            if (dat['rowAf'] == 0) {
                toastr["error"]("ERROR DE DB");
            } else {

                activarModalInformacionPeticionA(dat);

            }

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}

function activarModalInformacionPeticionA(peticiones) {

    var ubi = peticiones[0]['coordenadasPet'].split(",");

    //initializeMap("mapInfoPeticion", ubi[0], ubi[1], false, 17);

    $("#modalInformacionPeticion div[class='card-body']").empty();


    $("#Codigo").text(peticiones[0]['codigo']);
    for (var peticion in peticiones) {
        for (var datos in peticiones[peticion]) {
            var div = $('<div class="row text-center">');
            var data = peticiones[peticion][datos];
            switch (datos) {
                case 'organismo':
                    if (data != 'null') {
                        div.append($("<div class='col-12'>").append($('<p class="text-capitalize">').append('Orgaminsmo: ' + peticiones[peticion][datos])));
                    }
                    break;
                case 'rif':
                    if (data != '000000000000') {
                        div.append($("<div class='col-12'>").append($('<p>').append('Rif: ' + peticiones[peticion][datos])));
                    }
                    break;
                case 'tipoOrg':
                    if (data == "1") {
                        div.append($("<div class='col-12'>").append($('<p>').append('Solicitante: PUBLICO')));
                    } else if (data == "2") {
                        div.append($("<div class='col-12'>").append($('<p>').append('Solicitante: PRIVADO')));
                    } else if (data == "3") {
                        div.append($("<div class='col-12'>").append($('<p>').append('Solicitante: PARTICULAR')));
                    }
                    break;
                case 'obra':
                    if (data == "1") {
                        div.append($("<div class='col-12'>").append($('<p>').append('Obra en Espera')));
                    } else if (data == "2") {
                        div.append($("<div class='col-12'>").append($('<p>').append('Obra Planificada')));
                    } else if (data == "3") {
                        div.append($("<div class='col-12'>").append($('<p>').append('Obra Finalizada')));
                    }
                    break;
                case 'estatus':
                    if (data == "1") {
                        div.append($("<div class='col-12 mb-4' style='border-bottom: 1px solid #e9ecef;'>").append($('<p>').append('Estado: ACTIVO')));
                    } else if (data == "2") {
                        div.append($("<div class='col-12 mb-4' style='border-bottom: 1px solid #e9ecef;'>").append($('<p>').append('Estado: INACTIVO')));
                    }
                    break;
                case 'representante':
                    div.append($("<div class='col-12'>").append($('<p>').append('Representante: ' + peticiones[peticion][datos])));
                    break;
                case 'ci':
                    div.append($("<div class='col-12'>").append($('<p>').append('CI: ' + peticiones[peticion][datos])));
                    break;
                case 'correo':
                    div.append($("<div class='col-12'>").append($('<p>').append('Correo: ' + peticiones[peticion][datos])));
                    break;
                case 'estatusPet':
                    if (data == "2") {
                        div.append($("<div class='col-12'>").append($('<p>').append('Peticion PLANIFICADA')));
                    }
                    break;
                case 'fecha':
                    div.append($("<div class='col-12'>").append($('<p>').append('Fecha de emicion: ' + peticiones[peticion][datos])));
                    break;
                case 'fechaAten':
                    div.append($("<div class='col-12'>").append($('<p>').append('Fecha de atencion: ' + peticiones[peticion][datos])));
                    break;
                case 'fechaPr':
                    div.append($("<div class='col-12'>").append($('<p>').append('Fecha planificada: ' + peticiones[peticion][datos])));
                    break;
                case 'fecharep':
                    div.append($("<div class='col-12'>").append($('<p>').append('Fecha de realizacion: ' + peticiones[peticion][datos])));
                    break;
                case 'encargado':
                    div.append($("<div class='col-12'>").append($('<p>').append('Encargado de Inspeccion: ' + peticiones[peticion][datos])));
                    break;
                case 'ciEnc':
                    div.append($("<div class='col-12'>").append($('<p>').append('ci: ' + peticiones[peticion][datos])));
                    break;
                case 'encargadoO':
                    div.append($("<div class='col-12'>").append($('<p>').append('Encargado de Obra: ' + peticiones[peticion][datos])));
                    break;
                case 'ciEncO':
                    div.append($("<div class='col-12'>").append($('<p>').append('ci: ' + peticiones[peticion][datos])));
                    break;
                case 'motivo':
                    div.append($("<div class='col-12 mb-4' style='border-bottom: 1px solid #e9ecef;'>").append($('<p>').append('Motivo: ' + peticiones[peticion][datos])));
                    break;
                case 'via':
                    div.append($("<div class='col-12'>").append($('<p>').append('Ubicacion: ' + peticiones[peticion][datos])));
                    break;
                case 'viaPet':
                    div.append($("<div class='col-12'>").append($('<p>').append('Ubicacion: ' + peticiones[peticion][datos])));
                    break;
                case 'tlf':
                    var tlf = peticiones[peticion][datos].split(",");
                    if (tlf[1] == 1) {
                        div.append($("<div class='col-12'>").append($('<p>').append('tlf: ' + tlf[0] + " MOVIL")));
                    } else if (tlf[1] == 2) {
                        div.append($("<div class='col-12'>").append($('<p>').append('tlf: ' + tlf[0] + " LOCAL")));
                    }

                    break;
                case 'tlfEnc':
                    var tlf = peticiones[peticion][datos].split(",");
                    if (datos != 'tlfEncO') {
                        if (tlf[1] == 1) {
                            div.append($("<div class='col-12 mb-4' style='border-bottom: 1px solid #e9ecef;'>").append($('<p>').append('tlf: ' + tlf[0] + " MOVIL")));
                        } else if (tlf[1] == 2) {
                            div.append($("<div class='col-12 mb-4' style='border-bottom: 1px solid #e9ecef;'>").append($('<p>').append('tlf: ' + tlf[0] + " LOCAL")));
                        }
                    } else {
                        if (tlf[1] == 1) {
                            div.append($("<div class='col-12'>").append($('<p>').append('tlf: ' + tlf[0] + " MOVIL")));
                        } else if (tlf[1] == 2) {
                            div.append($("<div class='col-12'>").append($('<p>').append('tlf: ' + tlf[0] + " LOCAL")));
                        }
                    }
                    break;
                case 'tlfEncO':
                    var tlf = peticiones[peticion][datos].split(",");
                    if (tlf[1] == 1) {
                        div.append($("<div class='col-12 mb-4' style='border-bottom: 1px solid #e9ecef;'>").append($('<p>').append('tlf: ' + tlf[0] + " MOVIL")));
                    } else if (tlf[1] == 2) {
                        div.append($("<div class='col-12 mb-4' style='border-bottom: 1px solid #e9ecef;'>").append($('<p>').append('tlf: ' + tlf[0] + " LOCAL")));
                    }

                    break;
                case 'codigoAten':
                    div.append($("<div class='col-12'>").append($('<p>').append('Cod.Atencion: ' + peticiones[peticion][datos])));
                    break;
                case 'codigoRep':
                    div.append($("<div class='col-12'>").append($('<p>').append('Cod.Atencion: ' + peticiones[peticion][datos])));
                    break;

            }

            $("#modalInformacionPeticion div[class='card-body']").append(div);
        }
    }


    $("#modalInformacionPeticion").modal();

}