function HistoriaObrasFinalizadas() {
    console.log("HistoriaObrasFinalizadas");

    x = $.ajax({
        url: "Controlador/Historial/HistoriaObrasFinalizadas/historiaObrasFinalizadas.php",
        type: "POST",
        async: true,
    })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            console.log(dat);
            console.log(obj);
            var obrasPla = dat;
            printDatosObrasFinalizadas(obrasPla);
            activarDataTable('historialObrasRealizadas');

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            $("#historialObrasRealizadas .rows").empty();
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });

}

function printDatosObrasFinalizadas(datosObra) {

    tabla = 'historialObrasRealizadas';

    $("#" + tabla + " .rows").empty();
    var r = 1;
    for (var obra in datosObra) {
        var tr = $("<tr>");
        tr.append($("<th scope='row' class='align-middle'>").append(r));
        for (var datos in datosObra[obra]) {

            if (datos == 'solicitante') {
                var solicitante = datosObra[obra][datos];
                var solicitantes = solicitante.split(',');
                if (solicitantes[0] != 'null') {
                    tr.append($("<td class='align-middle'>").append(solicitantes[0]));
                } else if (solicitantes[1].length > 0) {
                    tr.append($("<td class='align-middle'>").append(solicitantes[1]));
                }
            } else if (datos == 'codigos') {
                var codigo = datosObra[obra][datos];
                var codigos = codigo.split(',');
                if (codigos[0] != '000000000000') {
                    tr.append($("<td class='align-middle'>").append(codigos[0]));
                } else if (codigos[1].length > 0) {
                    tr.append($("<td class='align-middle'>").append(codigos[1]));
                }
            } else if (datos == 'codigoPet') {
                var codigo = datosObra[obra][datos];
                tr.append($("<td class='align-middle'>").append(codigo));
            } else if (datos == 'codigoRep') {
                var codigo = datosObra[obra][datos];
                tr.append($("<td class='align-middle'>").append(codigo));
            }  else if (datos == 'tipoOrg') {
                var tipo = datosObra[obra][datos];
                if (tipo == '1') {
                    tr.append($("<td class='align-middle'>").append('PUBLICO'));
                } else if (tipo == 2) {
                    tr.append($("<td class='align-middle'>").append('PRIVADO'));
                } else if (tipo == 3) {
                    tr.append($("<td class='align-middle'>").append('PARTICULAR'));
                }
            } else if (datos == 'viaPet') {
                var informacion = datosObra[obra][datos];
                tr.append($("<td class='align-middle'>").append(informacion));
            } else if (datos == 'encargado') {
                var encargado = datosObra[obra][datos];
                tr.append($("<td class='align-middle'>").append(encargado));
            } else if (datos == 'ci') {
                var ciEncargado = datosObra[obra][datos];
                tr.append($("<td class='align-middle'>").append(ciEncargado));
            } else if (datos == 'obra') {
                var estatus = datosObra[obra][datos];
                if (estatus == 3) {
                    tr.append($("<td class='align-middle' style='color: #147503;'>").append('ATENDIDA'));
                }
            } else if (datos == 'fecha') {
                var fecha = datosObra[obra][datos];
                tr.append($("<td class='align-middle'>").append(fecha));
            } else if (datos == "idReparacion") {
                var id = datosObra[obra][datos];
                tr.append($("<td class='align-middle d-flex'>").append('<div class="btn-group text-right mx-auto" role="group" aria-label="Basic example"><button type="button" class="  info-user-view btn  btn-rounded" style="background: #fff;" ><i class="fas fa-lg fa-info-circle" style="color: #790C0C;"></i></button></div>'));
            }
        }

        $("#" + tabla + " .rows").append(tr);
        r++;
    }
}