function estatusUsuario(login, estatus) {

    datos = {
        LOGIN: login,
        ESTATUS: estatus
    }


    event.stopPropagation();
    x = $.ajax({
            url: "Controlador/Usuario/EstatusUsuario/estatusUsuario.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {
            notificacion();
            console.log(typeof (dat));
            var a = 0;
            if (typeof (dat) == "string" || dat['rowAf'] == 0) {
                toastr["error"]("ERROR DE DB");
            } else {
                a = dat['rowAf'];
                $("#modalEstatus").modal('hide');
                $("#modalEstatus").on('hidden.bs.modal', function () {
                    if (a != 0) {
                        if ($("#tablaAdministrador").is(":visible")) {
                            toastr["success"]("Usuario Inavilitado exitosamente");
                            $("#historialUsuarioAdm").DataTable().destroy();
                            historialUsuarioAdm();
                        } else if ($("#tablaIngeniero").is(":visible")) {
                            toastr["success"]("Usuario Inavilitado exitosamente");
                            $("#historialUsuarioIng").DataTable().destroy();
                            historialUsuarioIng();
                        } else if ($("#tablasInactivos").is(":visible")) {
                            toastr["success"]("Usuario Avilitado exitosamente");
                            $("#historialUsuarioInactivo").DataTable().destroy();
                            historialUsuarioInactivo();
                        }
                        a = 0;
                    }
                });
            }
            console.log(dat);
            console.log("Estado de peticion= " + est);
            console.log("DONE");
            console.log("---------------------------------------------------------");

            status = est;
        })
        .fail(function (obj, est) {
            toastr["warning"]("ERROR DE PETICION");
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });


}