<?php namespace Controlador\InfoDashBoard;

    require_once('../../autoload.php');        
    use Modelo\Peticion\Peticion;   
    use Modelo\Reparacion\Reparacion;

    //echo __FILE__; 
    $op = $_POST['OP'];  

    if($op == 1){
        $dashBoard = new Peticion();
        $info = $dashBoard->DashBoard();   
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info); 
    }else if($op == 2){
        $dashBoard = new Reparacion();    
        $info = $dashBoard->DashBoard();            
        header('Content-type: application/json; charset=utf-8');
        echo json_encode($info); 
    }
        


?>