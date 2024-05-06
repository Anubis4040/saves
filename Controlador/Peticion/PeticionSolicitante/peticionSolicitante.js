function PeticionSolicitante(d) {

    datos = {
        COD: d
    }

    x = $.ajax({
            url: "Controlador/Peticion/PeticionSolicitante/peticionSolicitante.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {
            var peticionSoli = dat;      
            $("#historialPeticionesSolicitante").DataTable().destroy();    
            printDatosPeticionSoli(peticionSoli);
            activarDataTable('historialPeticionesSolicitante');
        })
        .fail(function (obj, est) {
            console.log("FAIL");
            $("#historialPeticionesEspera .rows").empty();
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });

}

function printDatosPeticionSoli(datosPeticion) {

    tabla = 'historialPeticionesSolicitante';

    $("#" + tabla + " .rows").empty();
    var r = 1;
    for (var peticion in datosPeticion) {
        var tr = $("<tr>");
        tr.append($("<th scope='row' class='align-middle'>").append(r));
        for (var datos in datosPeticion[peticion]) {

            if (datos == 'codigo') {
                var codigo = datosPeticion[peticion][datos];
                tr.append($("<td class='align-middle'>").append(codigo));
            } else if (datos == 'informacion') {
                var informacion = datosPeticion[peticion][datos];
                tr.append($("<td class='align-middle'>").append(informacion));
            } else if (datos == 'estatus') {
                var estatus = datosPeticion[peticion][datos];
                if (estatus == 1) {
                    tr.append($("<td class='align-middle' style='color: #da0909;'>").append('ESPERA'));
                } else if (estatus == 2) {
                    tr.append($("<td class='align-middle' style='color: #f80;'>").append('PLANIFICADA'));
                } else if (estatus == 3) {
                    tr.append($("<td class='align-middle' style='color: #007e33;'>").append('ATENDIDA'));
                }
            } else if (datos == 'fecha') {
                var fecha = datosPeticion[peticion][datos];
                tr.append($("<td class='align-middle'>").append(fecha));
            } else if (datos == "idPeticion") {
                var id = datosPeticion[peticion][datos];
                tr.append($("<td class='align-middle d-flex'>").append('<div class="btn-group text-right mx-auto" role="group" aria-label="Basic example"><button type="button" class="  info-user-view btn  btn-rounded" style="background: #fff;" ><i class="fas fa-lg fa-info-circle" style="color: #790C0C;"></i></button></div>'));
            }
        }

        $("#" + tabla + " .rows").append(tr);
        r++;
    }
}