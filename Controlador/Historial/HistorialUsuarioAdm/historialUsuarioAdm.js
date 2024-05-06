function historialUsuarioAdm() {

    console.log("ViewUsers");

    x = $.ajax({
            url: "Controlador/Historial/HistorialUsuarioAdm/historialUsuarioAdm.php",
            type: "POST",
            async: true
        })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            console.log(dat);
            console.log(obj);
            var datosUsuariosAdm = dat;
            printUsuariosAdm(datosUsuariosAdm);
            activarDataTable('historialUsuarioAdm');

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            $("#historialUsuarioAdm .rows").empty();
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });

}

function printUsuariosAdm(datosUsuario) {
    $("#historialUsuarioAdm .rows").empty();
    var r = 1;
    for (var usuario in datosUsuario) {
        var tr = $("<tr>");
        tr.append($("<th scope='row' class='align-middle'>").append(r));
        for (var datos in datosUsuario[usuario]) {
            if (datos == 'estatus') {
                if (datosUsuario[usuario][datos] == 1) {
                    tr.append($("<td class='align-middle' style='color: #02980f;'>").append("ACTIVO"));
                }
            } else if (datos == "idPersona") {
                if (datosDelUsuario['tuser'] == 2) {
                    tr.append($("<td class='align-middle d-flex'>").append('<div class="btn-group text-right mx-auto" role="group" aria-label="Basic example"><button type="button" class="  info-user-view btn  btn-rounded" style="background: #fff;" ><i class="fas fa-lg fa-info-circle" style="color: #790C0C;"></i></button></div>'));
                } else {
                    tr.append($("<td class='align-middle d-flex'>").append('<div class="btn-group text-right mx-auto" role="group" aria-label="Basic example"><button type="button" class="  info-user-view btn  btn-rounded" style="background: #fff;" ><i class="fas fa-lg fa-info-circle" style="color: #790C0C;"></i></button><button type="button" class=" adm edt-user-view btn  btn-rounded" style="background: #fff;"><i class="fas fa-lg fa-user-edit" style="color: #790C0C;"></i></button><button type="button"  class=" adm est-user-view btn btn-rounded" style="background: #fff;"><i class="fas fa fa-lg fa-user-slash " style="color:#790C0C;"></i></button></div>'));
                }
            } else {
                tr.append($("<td class='align-middle'>").append(datosUsuario[usuario][datos]));
            }
        }

        $("#historialUsuarioAdm .rows").append(tr);
        r++;
    }
}