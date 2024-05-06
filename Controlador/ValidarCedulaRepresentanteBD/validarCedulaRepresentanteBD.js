function validarCedulaRepresentanteBD(ci) {

    console.log("valCiBD");

    datos = {
        CEDULA: ci.val()
    }

    var id = ci.attr("id");

    console.table(datos);

    x = $.ajax({
            url: "Controlador/ValidarCedulaRepresentanteBD/validarCedulaRepresentanteBD.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {
            console.log(dat);
            console.log("Estado de peticion= " + est);
            console.log("DONE");
            console.log("---------------------------------------------------------");
            status = est;

            if (dat['rowAfR'] == 0) {
                if (dat['rowAfU'] == 0) {
                    noCiPrep(id)
                    $("#nombreRep").removeAttr("disabled");
                    $("#apellidoRep").removeAttr("disabled");
                    $("#correoRep").removeAttr("disabled");
                    $("#telSoli").removeAttr("disabled");
                    $("#tTelSoli").removeAttr("disabled");
                } else if (dat['rowAfU'] == 1) {
                    notificacion2();
                    $("#ciRep").attr("disabled", 'true');
                    toastr["warning"]("Esta cedula esta relacionada con un Usuario, desea agregarla como cedula de un Representante de un organismo ?<br><br><button type='button' id='addSoliN' class='btn clear'>No</button><button type='button' id='addSoliS' class='btn clear'>Si</button>", "Alerta");
                    $("#addSoliN").click(function () {
                        $("#ciRep").val('').removeClass("invalid valid").siblings("label").removeClass("active");
                        $("#ciRep").removeAttr("disabled");                        
                        $("#nombreRep").attr("disabled", 'true');
                        $("#apellidoRep").attr("disabled", 'true');
                        $("#correoRep").attr("disabled", 'true');
                        $("#telSoli").attr("disabled", 'true');
                        $("#tTelSoli").attr("disabled", 'true');
                        toastr.clear();
                    });
                    $("#addSoliS").click(function () {
                        $("#divCancelarRep").show(600); 
                        $("#CambiosRep").show(600);                      
                        $("#ciRep").removeAttr("disabled");
                        $("#nombreRep").removeAttr("disabled").val(dat['nombre']).siblings("label").addClass("active");;
                        $("#apellidoRep").removeAttr("disabled").val(dat['apellido']).siblings("label").addClass("active");
                        $("#correoRep").removeAttr("disabled");
                        $("#telSoli").removeAttr("disabled").val(dat['tlf']).siblings("label").addClass("active");       
                        $("#idPersonaRep").val(dat['idPR']);                                        
                        toastr.clear();
                    });

                }
            } else if (dat['rowAfR'] == 1) {
                siCiRep(id, ci);
            }


        })
        .fail(function (obj, est) {
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}

function noCiPrep(id) {
    if (id == "ciRep") {
        $("#" + id + " ~ label").attr("data-success", "Correcto");
        $("#" + id + "").removeClass("invalid").addClass("valid");
        $("#" + id + " ~ .infoErBD").hide(600);
    }
}

function siCiRep(id, ci) {
    if (id == "ciRep") {
        $("#" + id + " ~ label").removeAttr("data-success");
        $("#" + id + "").removeClass("valid").addClass("invalid");
        $("#" + id + " ~ .infoErBD").show(600);
        $("#" + id + " ~ .infoEr").hide(600);
        $("#" + id + " ~ info").hide(600);
    }
}

function notificacion2() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": 300,
        "hideDuration": 1000,
        "timeOut": 0,
        "extendedTimeOut": 0,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "tapToDismiss": false
    }
};