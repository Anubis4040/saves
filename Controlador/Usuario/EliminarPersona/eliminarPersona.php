<?php namespace Controlador\Usuario\EliminarPerona;

    require_once('../../../autoload.php');
    use Modelo\Usuario\Usuario;          

    //echo __FILE__;

    $a = $_POST['ID'];    

    if($a != NULL){  
        $usuario = new Usuario();     
        $usuario->SetPersonaId($a);  
        $info = $usuario->EliminarPerona(); 
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);
    }
    
 
    
?>