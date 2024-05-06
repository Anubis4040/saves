function historialSolicitantePart() {

    console.log("historialSolicitantePart");

    x = $.ajax({
            url: "Controlador/Historial/HistorialSolicitantePart/historialSolicitantePart.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            console.log(dat);
            console.log(obj);
            var datosSolicitantePart = dat;
            printSolicitantePart(datosSolicitantePart);
            activarDataTable('historialSolicitantePart');



        })
        .fail(function (obj, est) {
            console.log("FAIL");
            $("#historialSolicitantePart .rows").empty();
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });

}

function printSolicitantePart(datosSolicitante) {

    tabla = 'historialSolicitantePart';

    $("#" + tabla + " .rows").empty();
    var r = 1;
    for (var solicitante in datosSolicitante) {
        var tr = $("<tr>");
        tr.append($("<th scope='row' class='align-middle'>").append(r));
        for (var datos in datosSolicitante[solicitante]) {
            if (datos == 'estatus') {
                if (datosSolicitante[solicitante][datos] == 1) {
                    tr.append($("<td class='align-middle' style='color: #02980f;'>").append("ACTIVO"));
                }
            } else if (datos == 'tlf') {
                var tlf = datosSolicitante[solicitante][datos];
                tlf = tlf.split(',');
                if (tlf[1] == 1) {
                    tr.append($("<td class='align-middle'>").append(tlf[0] + ' MOVIL'));
                } else if (tlf[1] == 2) {
                    tr.append($("<td class='align-middle'>").append(tlf[0] + ' LOCAL'));
                }

            } else if (datos == "idSolicitante") {
                tr.append($("<td class='align-middle d-flex'>").append('<div class="btn-group text-right mx-auto" role="group" aria-label="Basic example"><button type="button" class="  info-user-view btn  btn-rounded" style="background: #fff;" ><i class="fas fa-lg fa-info-circle" style="color: #790C0C;"></i></button>'+
                // '<button type="button" class="  edt-user-view btn  btn-rounded" style="background: #fff;"><i class="fas fa-lg fa-user-edit" style="color: #790C0C;"></i></button>'+
                '<button type="button"  class=" est-user-view btn btn-rounded" style="background: #fff;"><i class="fas fa fa-lg fa-user-slash " style="color:#790C0C;"></i></button></div>'));
            } else {
                tr.append($("<td class='align-middle'>").append(datosSolicitante[solicitante][datos]));
            }
        }

        $("#" + tabla + " .rows").append(tr);
        r++;
    }
}