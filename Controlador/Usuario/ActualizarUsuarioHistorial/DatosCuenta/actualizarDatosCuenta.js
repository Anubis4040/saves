function actualizarDatosCuenta(e) {
    var d = capturarInputsActualizar(e);

    if (d[3] == null) {
        datos = {
            ID: d[0],
            LOGIN: d[1],
            TUSER: d[2],
            CIV: false,
            EMAIL: d[4],
            TLF: d[5],
            TTLF: d[6]
        }
    } else {
        datos = {
            ID: d[0],
            LOGIN: d[1],
            TUSER: d[2],
            CIV: d[3],
            EMAIL: d[4],
            TLF: d[5],
            TTLF: d[6]
        }
    }


    console.table(datos);

    x = $.ajax({
            url: "Controlador/Usuario/ActualizarUsuarioHistorial/DatosCuenta/actualizarDatosCuenta.php",
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
                        toastr["success"]("Daatos privados actualizados corectamente");
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