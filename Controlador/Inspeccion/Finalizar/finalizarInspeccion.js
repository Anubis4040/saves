function FinalizarInspeccion(e) {
    var d = capturarInputs(e);

    // console.log(d);

    var form_data = new FormData();

    form_data.append('codPlanInsp', d[0]);
    form_data.append('fecha', d[2]);
    form_data.append('informe', d[3]);
    form_data.append('largo', d[4]);
    form_data.append('lUni ', d[5]);
    form_data.append('ancho', d[6]);
    form_data.append('aUni ', d[7]);
    form_data.append('danos', d[8]);
    form_data.append('materiales', d[9]);
    form_data.append('maquinarias', d[10]);

    for (var i = 0; i < d[11].length; i++) {
        form_data.append('imagenes' + i, d[11][i]);
    }

    console.log(typeof (d[11]));
    console.log(d[11]);

    $.ajax({
        url: "Controlador/Inspeccion/Finalizar/finalizarInspeccion.php",
        type: "POST",
        async: true,
        data: form_data,
        processData: false,
        cache: false,
        contentType: false,
    }).done(function (dat, est, obj) {
        console.log("Peticion Exitosa");
        if (typeof (dat) == "string" || dat['rowAf'] == 0) {
            toastr["error"]("ERROR DE DB");
        } else if (dat == 0) {
            toastr["error"]("Se esta subiendo un archivo invalido");
            $('#plaseHolderFile').addClass('invalid').removeClass('valid');
        } else if (dat == 1) {
            toastr["error"]("No se puedo guardar la imagen");
        } else {
            $("#historialInspeccionesPlanificadas").DataTable().destroy();
            historiaInspeccionPlanificadas();
            $("#modalFinalizarInspeccion").modal('hide');
            $("#FormFinalizarInspeccion")[0].reset();
            $("#FormFinalizarInspeccion input:not(.cords):not(.tlf) + label").removeClass("active");
            toastr["success"]("La inspeccion fue finalizada exitosamente");
        }
        console.log(dat);
    }).fail(function (obj, est) {
        console.log("Peticion Fallida");
        console.log(est);
    });
}