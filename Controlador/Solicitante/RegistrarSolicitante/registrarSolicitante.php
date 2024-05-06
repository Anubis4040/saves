<?php namespace Controlador\Solicitante\RegistrarSolicitante;

    require_once('../../../autoload.php');        
    use Modelo\Solicitante\Solicitante;   

      //echo __FILE__;   
      $a = $_POST['TSOLI'];
      $b = $_POST['RIF'];    
      $c = $_POST['NOMBREORG'];
      $d = $_POST['CI'];    
      $e = $_POST['NOMBREREP'];
      $f = $_POST['APELLIDOREP'];
      $g = $_POST['EMAIL'];
      $h = $_POST['TLF'];
      $i = $_POST['TTLF'];
      $j = $_POST['CORDS'];
      $k = $_POST['VISIBLE'];
      $l = $_POST['INFO'];
      $m = $_POST['IDR'];

      $info = \explode(',',$l); 

      $cord = \explode(',',$j);       
      
     if($a != NULL && $b != NULL && $c != NULL && $d != NULL && $e != NULL && $f != NULL && $g != NULL && $h != NULL && $i != NULL && $j != NULL && $k != NULL && $l != NULL && $m != NULL ){
        if($k == 1){
            $solicitante = new Solicitante();
            $solicitante->SetPersonaId($m);
            $solicitante->SetSolicitantePP($a,$b,$c,$g);
            $solicitante->SetPersonaIn($d,$e,$f);
            $solicitante->SetPersonaTlf($h,$i);
            $solicitante->SetCoordenadas($cord[0],$cord[1],$info[0]);
            $info = $solicitante->RegistrarSolicitantePP();
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info);     
          }else if($k == 0){
            $solicitante = new Solicitante();
            $solicitante->SetPersonaId($m);
            $solicitante->SetSolicitanteP($a,$g);
            $solicitante->SetPersonaIn($d,$e,$f);
            $solicitante->SetPersonaTlf($h,$i);
            $solicitante->SetCoordenadas($cord[0],$cord[1],$info[0]);
            $info = $solicitante->RegistrarSolicitanteP();
            header('Content-type: application/json; charset=utf-8');
            echo json_encode($info);   
          }
     }

    

?>