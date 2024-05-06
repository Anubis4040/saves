<?php namespace Modelo\Reparacion;

    use Modelo\BaseDatos\ConexionBaseDatos;   
 
    class Reparacion extends ConexionBaseDatos{

        protected $idReparacion;  
        protected $idPlanificacionReparacion;     

        protected $fechaAtencion; 

        protected $fechaRealizacion;  
        protected $codigo;          
        protected $informe;         
   
        protected $materiales;        
        protected $maquinarias;
        
        protected $imagenes;
        
        protected $conexion;
        
        


        public function __construct($idReparacion = '', $idPlanificacionReparacion = ' ', $fechaAtencion = '', $fechaRealizacion = '',
                                    $informe = '', $codigo = '', $materiales = '', $maquinarias = '', $imagenes = ''){
            parent::__Construct();
            $this->conexion = self::$conexionBD;  
            $this->idReparacion = $idReparacion;  
            $this->idPlanificacionReparacion = $idPlanificacionReparacion;
            $this->fechaAtencion = $fechaAtencion;      
            $this->fechaRealizacion = $fechaRealizacion;  
            $this->informe = $informe;
            $this->codigo = $codigo;        
            $this->materiales = $materiales;
            $this->maquinarias = $maquinarias;
            $this->imagenes = $imagenes;
        }

        function SetPlanificacionObra($fechaAtencion){
            $this->fechaAtencion = $fechaAtencion;      
        }     

        function SetMM($maquinarias,$materiales){
            $this->materiales = $materiales;
            $this->maquinarias = $maquinarias;
        }

        function SetImagenes($imagenes){
            $this->imagenes = $imagenes;
        }

        public function SetFinalizacionObra($codigo, $fechaRealizacion, $informe){
            $this->codigo = $codigo;
            $this->fechaRealizacion = $fechaRealizacion;  
            $this->informe = $informe;         
        }

        public function SetCodigo($codigo){
            $this->codigo = $codigo;
        }

        function PlanificarObra($encargado,$codInsp){
             // Inicio de la trasasccion
             $this->conexion->beginTransaction();

             $informe = array();
            
             try{               
                 
                $sql = "SELECT insp.idInspeccion FROM inspeccion AS insp WHERE insp.codigo = :cod";
                 
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(
                     ":cod" => $codInsp
                 ));
                 
                 $resultado = $query;   
                 
                  
                 while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                     $idInspeccion = $registro['idInspeccion'];                    
                 }        

                 $sql = "INSERT INTO planificacion_reparacion (fecha,idInspeccion) VALUES (:f, :idIns)";
 
                 $query = $this->conexion->prepare($sql);
                
                 $query->execute(array(                     
                     ":f" => $this->fechaAtencion,                  
                     ":idIns" => $idInspeccion           
                 ));	
                 
                 $this->idPlanificacionReparacion = $this->conexion->lastInsertId();               

                 $cod = $codInsp.$this->idPlanificacionReparacion;
 
                 $sql = "UPDATE planificacion_reparacion SET codigo = :cod WHERE idPlanificacionReparacion = :idPIns";                
 
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(                     
                     ":cod" => $cod,
                     ":idPIns" => $this->idPlanificacionReparacion                    
                 ));	 

                 $sql = "SELECT pet.idPeticion from inspeccion as insp
                 join planificacion_inspeccion as planInsp on insp.idPlanificacionInspeccion = planInsp.idPlanificacionInspeccion
                 join peticion as pet on  planInsp.idPeticion = pet.idPeticion where insp.codigo = :cod";                 
                 
                 $sql = "UPDATE inspeccion SET obra = 2 WHERE idInspeccion = :idInp";                
 
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(                     
                     ":idInp" => $idInspeccion           
                 ));	 
 
                 $sql = "SELECT ing.idIngeniero FROM persona AS per 
                 JOIN usuario AS user ON per.idPersona =  user.idPersona
                 JOIN ingeniero AS ing ON user.idUsuario = ing.idUsuario
                 WHERE ci = :cd";
                 
                 $query = $this->conexion->prepare($sql);
                 
                 $query->execute(array(
                     ":cd" => $encargado
                 ));
                 
                 $resultado = $query;   
                 
                 while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                     $idIngeniero = $registro['idIngeniero'];
                 }  
              
                 $sql = "INSERT INTO reparacion_ingeniero (idIngeniero,idPlanificacionReparacion) VALUES (:idI,:idPI)";
 
                 $query = $this->conexion->prepare($sql);

                 $query->execute(array(           
                     ":idI" => $idIngeniero,
                     ":idPI" => $this->idPlanificacionReparacion
                 ));	       

                $resultado = $query;   
        
                 $rowAfIn = $resultado->rowCount();
                 
                 if ($rowAfIn == 0) {
                     $informe['rowAf']    = $rowAfIn;
                     $informe['errorSms'] = $resultado->errorInfo();
                 } else {
                     $informe['rowAf'] = $rowAfIn;
                 }             
 
                 //Realizar cambios a la Base de Datos
                 $this->conexion->commit();  
             }catch(\PDOException $e){
                //Calcelar consultas
                $this->conexion->rollback();
                die("Error: " . $e->getMessage() . '<br>' . $e->getFile() . ' - ' . $e->getLine());
                return $e->getMessage();               
             }             
           
          return $informe;
        }

        public  function HistoriaObrasPlanificadas(){
            try {           
                
                $obra = array(); /* almacena lo que regresa el registro */       
                
                $sql = "SELECT codigo, codigoPlanRep as obra, concat(nombre,' ',apellido) as encargado, 
                ci, solicitante, codigos, tipo, informacion, obra as estatus, 
                fechaObraPlan as fecha, idPlanificacionReparacion from planificacionObra where obra = 2;";
                                               
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $obra[] = $registro;
                }        
                 
                return $obra;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        }

        public  function HistoriaObrasFinalizadas(){
            try {           
                
                $obra = array(); /* almacena lo que regresa el registro */       
                
                $sql = "SELECT * FROM obrasfinalizadas;";
                                               
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $obra[] = $registro;
                }        
                 
                return $obra;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        }

        function FinalizarReparacion(){
            // Inicio de la trasasccion
            $this->conexion->beginTransaction();

            $informe = array();
           
            try{            
                
                $sql = "SELECT plani.idPlanificacionReparacion FROM planificacion_reparacion  AS plani WHERE codigo = :cod";
                 
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cod" => $this->codigo
                ));
                
                $resultado = $query;   
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $this->idPlanificacionReparacion = $registro['idPlanificacionReparacion'];
                }  

                // echo $idPlanificacion;
              
                $sql = "INSERT INTO reparacion (fecha,informe,idPlanificacionReparacion) VALUES (:f, :info, :idPlani)";

                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(                    
                    ":f" => $this->fechaRealizacion,
                    ":info" => $this->informe,                                                  
                    ":idPlani" => $this->idPlanificacionReparacion           
                ));	
                
                $this->idReparacion = $this->conexion->lastInsertId();               

                $cod = $this->codigo .'-'. $this->idReparacion;

                $sql = "UPDATE reparacion SET codigo = :cod WHERE idReparacion = :idR";                

                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(                     
                    ":cod" => $cod,
                    ":idR" => $this->idReparacion                    
                ));	 

                $sql = "SELECT idInspeccion FROM planificacionobra where codigoPlanRep = :cod";
                 
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cod" => $this->codigo
                ));
                
                $resultado = $query;   
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $idInspeccion = $registro['idInspeccion'];
                } 

                $sql = "UPDATE inspeccion SET obra = 3 WHERE idInspeccion = :idIns";                

                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(                     
                    ":idIns" => $idInspeccion    
                ));	 

                foreach($this->maquinarias as $data){     
                    foreach ($data as $d) {
                        $sql = "INSERT INTO reparacion_maquinaria (idReparacion,idMaquinaria) VALUES (:idRep, :idMaq)";
                        $query = $this->conexion->prepare($sql);
                        $query->execute(array(                     
                            ':idRep' => $this->idReparacion,
                            ':idMaq' => $d         
                        ));	
                    }
                }
               
                foreach($this->materiales as $data){        
                    $sql = "INSERT INTO reparacion_material (cantidad,uCant,idMaterial,idReparacion) VALUES (:c, :uc, :idM, :idR)";

                    $query = $this->conexion->prepare($sql);
                    
                    $query->execute(array(                     
                        ':c' => $data[1],
                        ':uc' => $data[2],
                        ':idM' => $data[0],
                        ':idR' => $this->idReparacion       
                    ));	
                }       
                
                foreach($this->imagenes as $data){  
                    $target_dir = "imagenes/" . $this->idReparacion; 
                    if (!file_exists($target_dir)) {
                        mkdir($target_dir, 0777, true);
                    } 
                    $target_file = $target_dir .'/'. basename($data["name"]);
                    $check = getimagesize($data["tmp_name"]);
                    if($check !== false) {                    
                        if (move_uploaded_file($data["tmp_name"], $target_file)) {
                            $sql = "INSERT INTO imagenreparacion (img, idReparacion) VALUES (:img, :idRep)";

                            $query = $this->conexion->prepare($sql);
                            
                            $query->execute(array(  
                                ':img' => $this->idReparacion.'/'.$data["name"],
                                ':idRep' => $this->idReparacion,        
                            ));
                        }else{
                            $this->conexion->rollback();
                            return 1;
                        }
                    } else {
                        $this->conexion->rollback();
                        return 0;
                    }
                    
                } 
         
               $resultado = $query;   
       
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['rowAf']    = $rowAfIn;
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                }             

                // Realizar cambios a la Base de Datos
                $this->conexion->commit(); 
                return $informe; 
            }catch(\PDOException $e){
               //Calcelar consultas
               $this->conexion->rollback();
               die("Error: " . $e->getMessage() . '<br>' . $e->getFile() . ' - ' . $e->getLine());
               return $e->getMessage();               
            }     
       }

       public function DashBoard(){
            try {           
                
                $dashBoard = array(); /* almacena lo que regresa el registro */             
                // SELECT count(pet.estatus) as espera from peticion as pet where pet.estatus = 1;
                $sql = "SELECT espera from cantidadesperarep";                
                $query = $this->conexion->prepare($sql);                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $dashBoard['ESPERA'] = $registro;
                }   
                // SELECT count(pet.estatus) as planificadas from peticion as pet where pet.estatus = 2;
                $sql = "SELECT planificadas from cantidadplanificadarep";                
                $query = $this->conexion->prepare($sql);                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $dashBoard['PLANIFICADAS'] = $registro;
                }  
                // SELECT count(pet.estatus) as atendidas from peticion as pet where pet.estatus = 3;
                $sql = "SELECT atendidas from cantidadfinalizadarep";                
                $query = $this->conexion->prepare($sql);                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $dashBoard['ATENDIDAS'] = $registro;
                }  
                
                return $dashBoard;         
        
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        }

        public function InformacionObrasAF($a){
            try {           
                
                $obra = array(); /* almacena lo que regresa el registro */  
                
               if($a == 1){
                    $sql = "SELECT pet.codigo,pet.estatusPet,insp.codigo as codigoAten, pet.fecha, insp.fecha as fechaAten,obra,
                    planr.fecha as fechaPr,
                    pet.viaPet, pet.motivo,concat(user.nombre,' ', user.apellido) as encargado, user.ci as ciEnc, 
                    concat(user.tlf,',',user.tTlf) as tlfEnc,
                    concat(users.nombre,' ', users.apellido) as encargadoO, users.ci as ciEncO, 
                    concat(users.tlf,',',users.tTlf) as tlfEncO,
                    pet.organismo,pet.via,pet.rif,pet.tipoOrg, pet.estatus,
                    concat(pet.nombre,' ', pet.apellido) as representante,
                    pet.ci,pet.correo, concat(pet.tlf,',',pet.tTlf) as tlf, 
                    concat(pet.latitudPet,',',pet.longitudPet) as coordenadasPet, insp.idInspeccion FROM peticiones as pet
                    join planificacioninspeccion as plani on pet.idPeticion = plani.idPeticion
                    join usuarios as user on user.idIngeniero = plani.idIngeniero
                    join inspeccion as insp on plani.idPlanificacionInspeccion = insp.idPlanificacionInspeccion
                    join planificacion_reparacion as planr on insp.idInspeccion = planr.idInspeccion
                    join reparacion_ingeniero as repI on planr.idPlanificacionReparacion = repI.idPlanificacionReparacion
                    join usuarios as users on users.idIngeniero = repI.idIngeniero group by (codigo) WHERE pet.codigo = :cod;";
                }  else if($a == 2){
                    $sql = "SELECT pet.codigo,pet.estatusPet,insp.codigo as codigoAten, pet.fecha, insp.fecha as fechaAten,obra, rep.codigo as codigoRep,
                    planr.fecha as fechaPr, rep.fecha as fecharep,
                    pet.viaPet, pet.motivo,concat(user.nombre,' ', user.apellido) as encargado, user.ci as ciEnc, 
                    concat(user.tlf,',',user.tTlf) as tlfEnc,
                    concat(users.nombre,' ', users.apellido) as encargadoO, users.ci as ciEncO, 
                    concat(users.tlf,',',users.tTlf) as tlfEncO,
                    pet.organismo, pet.via,pet.rif,pet.tipoOrg, pet.estatus,
                    concat(pet.nombre,' ', pet.apellido) as representante,
                    pet.ci,pet.correo, concat(pet.tlf,',',pet.tTlf) as tlf, 
                    concat(pet.latitudPet,',',pet.longitudPet) as coordenadasPet, insp.idInspeccion, rep.idReparacion FROM peticiones as pet
                    join planificacioninspeccion as plani on pet.idPeticion = plani.idPeticion
                    join usuarios as user on user.idIngeniero = plani.idIngeniero
                    join inspeccion as insp on plani.idPlanificacionInspeccion = insp.idPlanificacionInspeccion
                    join planificacion_reparacion as planr on insp.idInspeccion = planr.idInspeccion
                    join reparacion_ingeniero as repI on planr.idPlanificacionReparacion = repI.idPlanificacionReparacion
                    join usuarios as users on users.idIngeniero = repI.idIngeniero,
                    planificacion_reparacion as planre
                    join reparacion as rep on planre.idPlanificacionReparacion =  rep.idPlanificacionReparacion  WHERE pet.codigo = :cod group by (codigo);";
                }          
              
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cod" => $this->codigo
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $obra[] = $registro;
                }        
                 
                return $obra;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function imagenesReparacion($a){
            try {           
                
                $Imagenes = array(); /* almacena lo que regresa el registro */                
          
                $sql = "SELECT img FROM imagenreparacion where idReparacion = :id";         
                              
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":id" => $a
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $Imagenes[] = $registro;
                }        
                 
                return $Imagenes;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }
        
    }

?>