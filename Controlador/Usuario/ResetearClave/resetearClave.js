function resetearClave(e) {
    var d = capturarInputsActualizar(e);

    datos = {
        ID: d[0],
        CI: userCi
        
    }

    console.table(datos);

    x = $.ajax({
            url: "Controlador/Usuario/ResetearClave/resetearClave.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {

            console.log(typeof (dat));
            var a = 0;
            if (typeof (dat) == "string" && dat['rowAf'] == 0) {
                toastr["error"]("ERROR DE DB");
            } else {
                a = dat['rowAf'];
                $("#modalActualizarUsuariosHistorial").modal('hide');
                $("#modalActualizarUsuariosHistorial").on('hidden.bs.modal', function () {
                    notificacion();
                    if (a != 0) {
                        toastr["success"]("Clave reseteada corectamente");
                        if ($("#tablaAdministrador").is(":visible")) {
                            $("#historialUsuarioAdm").DataTable().destroy();
                            historialUsuarioAdm();
                        } else if ($("#tablaIngeniero").is(":visible")) {
                            $("#historialUsuarioIng").DataTable().destroy();
                            historialUsuarioIng();
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