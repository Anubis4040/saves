ciSoli = '';

function validarCedulaBD(ci) {

    console.log("valCiBD");

    datos = {
        CEDULA: ci.val()
    }

    var id = ci.attr("id");

    console.table(datos);
    
    x = $.ajax({
            url: "Controlador/ValidarCedulaBD/validarCedulaBD.php",
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
            if (dat['rowAfU'] == 0) {
                if (dat['rowAfS'] == 0) {
                    noCi(id);
                    $("#nombrePersona").removeAttr("disabled");
                    $("#apellidoPersona").removeAttr("disabled");
                    $("#sexoUsuarioM").removeAttr("disabled");
                    $("#sexoUsuarioF").removeAttr("disabled");
                } else if (dat['rowAfS'] == 1 && ciSoli == false) {
                    notificacion2();
                    toastr["warning"]("Esta cedula esta relacionada con un Solicitante, desea agregarla como cedula de un Usuario del sistema ?<br><br><button type='button' id='addSoliN' class='btn clear'>No</button><button type='button' id='addSoliS' class='btn clear'>Si</button>", "Alerta");
                    $("#addSoliN").click(function () {
                        $("#nuevoUsuario")[0].reset();
                        $("#nuevoUsuario label").removeClass("active");
                        $("#nombrePersona").attr("disabled", 'true');
                        $("#apellidoPersona").attr("disabled", 'true');
                        $("#sexoUsuarioM").attr("disabled", 'true');
                        $("#sexoUsuarioF").attr("disabled", 'true');
                        idPersona = '';
                        ciSoli = false;
                        toastr.clear();
                    });
                    $("#addSoliS").click(function () {
                        if (update == true) {
                            eliminarPersona();
                        }
                        update = true;
                        idPersona = dat['idPS'];
                        ciSoli = true;
                        $("#Cambios").show(600);
                        $("#divCancelar").show(600);
                        $("#nombrePersona").removeAttr("disabled").val(dat['nombre']).siblings("label").addClass("active");
                        $("#apellidoPersona").removeAttr("disabled").val(dat['apellido']).siblings("label").addClass("active");
                        $("#sexoUsuarioM").removeAttr("disabled");
                        $("#sexoUsuarioF").removeAttr("disabled");
                        toastr.clear();
                    });

                }
            } else if (dat['rowAfU'] == 1 && update == false) {
                siCi(id,ci);
            } else if (dat['rowAfU'] == 1 && update == true && ciAux == dat['ciU']) {
                noCi(id);
            } else if (dat['rowAfU'] == 1 && update == true && ciAux != dat['ciU']) {
                siCi(id,ci);
            }

        })
        .fail(function (obj, est) {
            console.log("FAIL");
            status = est;
            console.log(obj);
            console.log("---------------------------------------------------------");
        });
}

function noCi(id) {
    if (id == "cedulaUsuario") {
        $("#" + id + " ~ label").attr("data-success", "Correcto");
        $("#" + id + "").removeClass("invalid").addClass("valid");
        $("#" + id + " ~ .infoErBD").hide(600);
    } else if (id == "actualizarCedulaUsuario") {
        $("#" + id + " ~ label").attr("data-success", "Correcto");
        $("#" + id + "").removeClass("invalid").addClass("valid");
        $("#" + id + " ~ .infoErBD").hide(600);
    }
}

function siCi(id,ci) {
    if (id == "cedulaUsuario") {
        $("#" + id + " ~ label").removeAttr("data-success");
        $("#" + id + "").removeClass("valid").addClass("invalid");
        $("#" + id + " ~ .infoErBD").show(600);
        $("#" + id + " ~ .infoEr").hide(600);
        $("#" + id + " ~ info").hide(600);
    } else if (id == "actualizarCedulaUsuario") {
        if (ci.val() != ci.attr("placeholder")) {
            $("#" + id + " ~ label").removeAttr("data-success");
            $("#" + id + "").removeClass("valid").addClass("invalid");
            $("#" + id + " ~ .infoErBD").show(600);
            $("#" + id + " ~ .infoEr").hide(600);
            $("#" + id + " ~ .info").hide(600);
        } else {
            $("#" + id + " ~ label").attr("data-success", "Correcto");
            $("#" + id + "").removeClass("invalid").addClass("valid");
            $("#" + id + " ~ .infoErBD").hide(600);
        }

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