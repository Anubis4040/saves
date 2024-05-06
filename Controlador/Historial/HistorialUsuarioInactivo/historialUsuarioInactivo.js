function historialUsuarioInactivo() {

    console.log("ViewUsers");

    x = $.ajax({
            url: "Controlador/Historial/HistorialUsuarioInactivo/historialUsuarioInactivo.php",
            type: "POST",
            async: true
        })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            console.log(dat);
            console.log(obj);
            var datosUsuariosInactivo = dat;
            printUsuariosInactivo(datosUsuariosInactivo);
            activarDataTable('historialUsuarioInactivo');

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            $("#historialUsuarioInactivo .rows").empty();
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}

function printUsuariosInactivo(datosUsuario) {
    $("#historialUsuarioInactivo .rows").empty();
    var r = 1;
    for (var usuario in datosUsuario) {
        var tr = $("<tr>");
        tr.append($("<th scope='row' class='align-middle'>").append(r));
        for (var datos in datosUsuario[usuario]) {
            if (datos == 'estatus') {
                if (datosUsuario[usuario][datos] == 2) {
                    tr.append($("<td class='align-middle' style='color: #ff2905;'>").append("INACTIVO"));
                }
            } else if (datos == 'tUser') {
                if (datosUsuario[usuario][datos] == 1) {
                    tr.append($("<td class='align-middle'>").append("ADMINISTRADOR"));
                } else if (datosUsuario[usuario][datos] == 2) {
                    tr.append($("<td class='align-middle'>").append("INGENIERO"));
                }
            } else if (datos == "idPersona") {
                if (datosDelUsuario['tuser'] == 2) {
                    tr.append($("<td class='align-middle d-flex'>").append('<div class="mx-auto btn-group text-right"><button type="button" class=" info-user-view btn  btn-rounded" style="background: #fff;" ><i class="fas fa-lg fa-info-circle" style="color: #790C0C;"></i></button></div>'));
                } else {
                    tr.append($("<td class='align-middle d-flex'>").append('<div class="mx-auto btn-group text-right"><button type="button" class=" info-user-view btn  btn-rounded" style="background: #fff;" ><i class="fas fa-lg fa-info-circle" style="color: #790C0C;"></i></button><button type="button" class=" adm  est-user-view btn  btn-rounded" style="background: #fff;" value="' + datosUsuario[usuario][datos] + '"><i class="fas fa-lg fa-user-check" style="color: #790C0C;"></i></button><button type="button" class="  dlt-user-view btn  btn-rounded" style="background: #fff;"><i class="fas fa-trash-alt fa-lg " style="color: #790C0C;"></i></button></div>'));
                }
            } else {
                tr.append($("<td class='align-middle'>").append(datosUsuario[usuario][datos]));
            }
        }

        $("#historialUsuarioInactivo .rows").append(tr);
        r++;
    }
}