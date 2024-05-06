function historialUsuarioIng() {

    console.log("ViewUsers");

    x = $.ajax({
            url: "Controlador/Historial/HistorialUsuarioIng/historialUsuarioIng.php",
            type: "POST",
            async: true
        })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            console.log(dat);
            console.log(obj);
            var datosUsuariosIng = dat;
            printUsuariosIng(datosUsuariosIng);
            activarDataTable('historialUsuarioIng');

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            $("#historialUsuarioIng .rows").empty();
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });

}

function printUsuariosIng(datosUsuario) {
    $("#historialUsuarioIng .rows").empty();
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
                    tr.append($("<td class='align-middle d-flex'>").append('<div class="btn-group text-right mx-auto" role="group" aria-label="Basic example"><button type="button" class="  info-user-view btn  btn-rounded" style="background: #fff;" ><i class="fas fa-lg fa-info-circle" style="color: #790C0C;"></i></button><button type="button" class=" adm  edt-user-view btn  btn-rounded" style="background: #fff;" value="' + datosUsuario[usuario][datos] + '"><i class="fas fa-lg fa-user-edit" style="color: #790C0C;"></i></button><button type="button"  class=" adm est-user-view btn btn-rounded" style="background: #fff;" value="' + datosUsuario[usuario][datos] + '"><i class="fas fa fa-lg fa-user-slash " style="color:#790C0C;"></i></button></div>'));
                }
            } else {
                tr.append($("<td class='align-middle'>").append(datosUsuario[usuario][datos]));
            }
        }

        $("#historialUsuarioIng .rows").append(tr);
        r++;
    }
}