<?php namespace Controlador\ValidarRifOrganismoBD;
    require_once('../../autoload.php');
    
    use Modelo\Organizacion\Organizacion;  

    //echo __FILE__;

    $a = $_POST['RIF'];    

    if($a != NULL){       
        $organismo = new Organizacion();
        $organismo->SetRif($a);
        $info = $organismo->ValidarRifOrganismoBD(); 
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info);      
    }
    
    
    
?>