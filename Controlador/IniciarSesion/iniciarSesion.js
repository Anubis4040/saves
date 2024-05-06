function iniciarSesion(e) {

    var d = capturarInputs(e);

    datos = {
        USUARIO: d[0],
        CLAVE: d[1]
    }

    console.log("IniSess");

    console.table(datos);
    x = $.ajax({
            url: "Controlador/IniciarSesion/iniciarSesion.php",
            type: "POST",
            async: true,
            data: datos
        })
        .done(function (dat, est, obj) {
            notificacion();
            console.log(typeof (dat));
            if (typeof (dat) == "string") {
                toastr["error"]("ERROR DE DB");
            } else if (Object.keys(dat).length == 2 && dat['rowAf'] != 0) {
                toastr["warning"]("Su Clave o Usuario son incorrectos");
            } else if (Object.keys(dat).length > 2 && dat['estatus'] == 1) {
                datosDelUsuario = dat;
                inicioDeUsuario();
                resetearModal(e);
                toastr["success"]("Bienvenido " + dat['login']);
            } else if (Object.keys(dat).length > 2 && dat['estatus'] != 1) {               
                toastr["warning"](dat['login'] + " Su cuenta esta inavilidata");
                cerrarSesion();
            } else if (dat['rowAf'] == 0) {
                toastr["warning"]("Su Clave o Usuario son incorrectos");
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

function inicioDeUsuario() {
    $("#iniciar").load("Vista/Contenido/Sesion/inicioDeUsuario.html", function () {
        $("#inicioUsuarioNombre").text(datosDelUsuario['nombre'] + " " + datosDelUsuario['apellido']);
        $("#salir").click(cerrarSesion);
        // $("#miCuenta").click(miCuenta);
        cargarOpcionesUsuarios();
    });
}

function cargarOpcionesUsuarios() {
    if (datosDelUsuario['tuser'] == "1" || datosDelUsuario['tuser'] == "4") {
        $("#opcionUsuarios ,#opcionInspecciones, #opcionDañosEquipos, #opcionObra").removeClass("d-none").addClass("d-block");
        $("#opcionUsuarios a, #opcionInspecciones a,#opcionDañosEquipos a, #opcionObra a").removeClass("disabled").attr("aria-disabled", "false");
    } else if (datosDelUsuario['tuser'] == "2") {
        $("#opcionInspecciones, #opcionDañosEquipos, #opcionObra").removeClass("d-none").addClass("d-block");
        $("#opcionInspecciones a,#opcionDañosEquipos a, #opcionObra a").removeClass("disabled").attr("aria-disabled", "false");
    } 
}

function miCuenta() {
    $("#barraLateral ul li a").removeClass("active");
    $("#barraLateral ul li a ~ div.collapsible-body").attr("style", "display: none; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px;");
    $("#main").removeClass("m-0 p-0").load("Vistas/miCuenta.html", function () {
        canvas();
        $("#infNomUser").text(datosDelUsuario['nombre'] + " " + datosDelUsuario['apellido']);
        $("#datPublic div.md-form label, #datAcco div.md-form label").addClass("active");
        $("#updataCi").attr("placeholder", datosDelUsuario['ci']);
        $("#upDataNom").attr("placeholder", datosDelUsuario['nombre']);
        $("#upDataApe").attr("placeholder", datosDelUsuario['apellido']);
        $("#upDataUs").attr("placeholder", datosDelUsuario['login']);
        $("#upDatEmail").attr("placeholder", datosDelUsuario['email']);
        $("#pass2,#pass3").hide();
        $("#editUser .next").on("click", function () {
            if ($("#pass1").is(":visible")) {
                $("#pass1").hide(600);
                $("#pass2").show(600);
                $("#editUser .back").removeAttr("data-dismiss").html("atras");
            } else if ($("#pass2").is(":visible")) {
                $("#pass2").hide(600);
                $("#pass3").show(600);
            }
        });
        $("#editUser .back").on("click", function () {
            if ($("#pass3").is(":visible")) {
                $("#pass3").hide(600);
                $("#pass2").show(600);
            } else if ($("#pass2").is(":visible")) {
                $("#pass2").hide(600);
                $("#pass1").show(600);
                $("#editUser .back").html("salir");
                setTimeout(function () {
                    $("#editUser .back").attr("data-dismiss", "modal");
                }, 1000);

            }
        });

        if (datosDelUsuario['sexo'] == 1) {
            $("#upDataSexMas").addClass("is-valid");
        } else {
            $("#upDataSexFem").addClass("is-valid");
        }

        $("#estadisticas").click(function () {
            $("#est").addClass("animated fadeInRight").show();
            $("#informacion").hide();
        });

        $("#peticiones").click(function () {
            $("#est").hide();
            $("#info").load("Vistas/visualizarHistorialPeticiones.html", function () {
                activarDataTable()
                soliInspe()
                //inicializa los selects               
                $('#dataTable tbody').on('dblclick', 'tr', function () {
                    var data = table.row(this).data();
                    $("#pet").load("Vistas/formularioInspeccionVia.html", function () {
                        // Select Initialization
                        $('#via .mdb-select').material_select();
                    }).hide();
                    $("#info").hide();
                    $("#pet").addClass("animated fadeInRight").show();
                });
            }).show();
            $("#informacion").addClass("animated fadeInRight").show();

        });

    });

}



function canvas() {
    //line
    var ctxL = document.getElementById("lineChart").getContext('2d');
    var myLineChart = new Chart(ctxL, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                    label: "My First dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: [
                        'rgba(105, 0, 132, .2)',
                    ],
                    borderColor: [
                        'rgba(200, 99, 132, .7)',
                    ],
                    borderWidth: 2
                },
                {
                    label: "My Second dataset",
                    data: [28, 48, 40, 19, 86, 27, 90],
                    backgroundColor: [
                        'rgba(0, 137, 132, .2)',
                    ],
                    borderColor: [
                        'rgba(0, 10, 130, .7)',
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true
        }
    });
}