function HistorialPeticionFinalizadas() {

    console.log("historialPeticionFinalizadas");

    x = $.ajax({
            url: "Controlador/Historial/HistorialPeticionFinalizadas/historialPeticionFinalizadas.php",
            type: "POST",
            async: true,
        })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            console.log(dat);
            console.log(obj);
            var peticionFin = dat;
            printDatosPeticionFinalizada(peticionFin);
            activarDataTable('historialPeticionesFinalizadas');

        })
        .fail(function (obj, est) {
            console.log("FAIL");

            $("#historialPeticionesFinalizadas .rows").empty();

            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });

}

function printDatosPeticionFinalizada(datosPeticion) {

    tabla = 'historialPeticionesFinalizadas';

    $("#" + tabla + " .rows").empty();
    var r = 1;
    for (var peticion in datosPeticion) {
        var tr = $("<tr>");
        tr.append($("<th scope='row' class='align-middle'>").append(r));
        for (var datos in datosPeticion[peticion]) {

            if (datos == 'solicitante') {
                var solicitante = datosPeticion[peticion][datos];
                var solicitantes = solicitante.split(',');
                if (solicitantes[0] != 'null') {
                    tr.append($("<td class='align-middle'>").append(solicitantes[0]));
                } else if (solicitantes[1].length > 0) {
                    tr.append($("<td class='align-middle'>").append(solicitantes[1]));
                }
            } else if (datos == 'codigos') {
                var codigo = datosPeticion[peticion][datos];
                var codigos = codigo.split(',');
                if (codigos[0] != '000000000000') {
                    tr.append($("<td class='align-middle'>").append(codigos[0]));
                } else if (codigos[1].length > 0) {
                    tr.append($("<td class='align-middle'>").append(codigos[1]));
                }
            } else if (datos == 'codigo') {
                var codigo = datosPeticion[peticion][datos];
                tr.append($("<td class='align-middle'>").append(codigo));
            } else if (datos == 'atencion') {
                var codigo = datosPeticion[peticion][datos];
                tr.append($("<td class='align-middle'>").append(codigo));
            } else if (datos == 'tipo') {
                var tipo = datosPeticion[peticion][datos];
                if (tipo == '1') {
                    tr.append($("<td class='align-middle'>").append('PUBLICO'));
                } else if (tipo == 2) {
                    tr.append($("<td class='align-middle'>").append('PRIVADO'));
                } else if (tipo == 3) {
                    tr.append($("<td class='align-middle'>").append('PARTICULAR'));
                }
            } else if (datos == 'informacion') {
                var informacion = datosPeticion[peticion][datos];
                tr.append($("<td class='align-middle'>").append(informacion));
            } else if (datos == 'encargado') {
                var encargado = datosPeticion[peticion][datos];
                tr.append($("<td class='align-middle'>").append(encargado));
            } else if (datos == 'ciEnc') {
                var ciEncargado = datosPeticion[peticion][datos];
                tr.append($("<td class='align-middle'>").append(ciEncargado));
            } else if (datos == 'estatus') {
                var estatus = datosPeticion[peticion][datos];
                if (estatus == 3) {
                    tr.append($("<td class='align-middle' style='color: #147503;'>").append('ATENDIDA'));
                }
            } else if (datos == 'obra') {
                var estatus = datosPeticion[peticion][datos];
                if (estatus == 1) {
                    tr.append($("<td class='align-middle' style='color: #da0909;'>").append('ESPERA'));
                } else if (estatus == 2) {
                    tr.append($("<td class='align-middle' style='color: #f80;'>").append('PLANIFICADA'));
                } else if (estatus == 3) {
                    tr.append($("<td class='align-middle' style='color: #147503;'>").append('ATENDIDA'));
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