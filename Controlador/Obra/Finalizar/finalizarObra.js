function finalizarObra(e) {

    var d = capturarInputs(e);
    var divs = $("#secMatr div.row");
    var b = [];
    for (let i = 0; i < divs.length; i++) {
        var temp = capturarInputs($('#' + divs[i].id).find("input:visible:not(.select-dropdown):not(.controls), select:hidden:not(.off), textarea:visible"));
        b.push(temp);
    }
    d.push(b);

    var form_data = new FormData();

    form_data.append('codPlanRep', d[0]);
    form_data.append('fecha', d[2]);
    form_data.append('informe', d[3]);
    form_data.append('maquinarias', d[4]);

    for (var i = 0; i < d[5].length; i++) {
        form_data.append('imagenes' + i, d[5][i]);
    }

    for (var i = 0; i < d[7].length; i++) {
        form_data.append('material' + i, d[7][i]);
    }

    $.ajax({
        url: "Controlador/Obra/Finalizar/finalizarObra.php",
        type: "POST",
        async: true,
        data: form_data,
        processData: false,
        cache: false,
        contentType: false,
    }).done(function (dat, est, obj) {

        if (typeof (dat) == "string" || dat['rowAf'] == 0) {
            toastr["error"]("ERROR DE DB");
        } else if (dat == 0) {
            toastr["error"]("Se esta subiendo un archivo invalido");
            $('#plaseHolderFileObra').addClass('invalid').removeClass('valid');
        } else if (dat == 1) {
            toastr["error"]("No se puedo guardar la imagen");
        } else {
            console.log("Peticion Exitosa");
            $("#historialObrasPlanificadas").DataTable().destroy();
            HistoriaObrasPlanificadas();
            $("#modalFinalizarReparacion").modal('hide');
            $("#FormFinalizarReparacion")[0].reset();
            $("#FormFinalizarReparacion input:not(.cords):not(.tlf) + label").removeClass("active");
            toastr["success"]("La inspeccion fue finalizada exitosamente");
            console.log(dat);
        }

    }).fail(function (obj, est) {
        console.log("Peticion Fallida");
        console.log(est);
    });



}