<?php namespace Controlador\Usuario\ActualizarUsuarioHistorial\DatosPublicos;

    require_once('../../../../autoload.php');    
    use Modelo\Usuario\Usuario; 

    //echo __FILE__;

    $a = $_POST['ID'];
    $b = $_POST['CI'];
    $c = $_POST['NAME'];
    $d = $_POST['LNAME'];
    $e = $_POST['SEX'];  

    if($a != NULL && $b != NULL && $c != NULL && $d != NULL && $e != NULL){  
        $usuario = new Usuario();     
        $usuario->SetPersonaUp($a,$b,$c,$d); 
        $usuario->SetSexo($e); 
        $info = $usuario->ActualizarDatosPublicos();     
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);   
    }
?>