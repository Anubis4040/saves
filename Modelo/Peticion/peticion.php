<?php namespace Modelo\Peticion;

    use Modelo\BaseDatos\ConexionBaseDatos;    
    use Modelo\Coordenada\Coordenada;

    class Peticion extends ConexionBaseDatos {

        protected $idPeticion;  
        protected $fecha;      
        protected $motivo;
        protected $estatus;
        protected $codigo;

        protected $objCoordenadas;
        protected $objSolicitante;
        
        protected $conexion;

        public function __construct($idPeticion = '', $fecha = ' ' , $motivo = ' ', $estatus = ' ', $codigo = ' '){
            parent::__Construct();
            $this->conexion = self::$conexionBD;  
            $this->idPeticion = $idPeticion;
            $this->fecha = $fecha;
            $this->motivo = $motivo;
            $this->estatus = $estatus;     
            $this->codigo = $codigo;     
            $this->objCoordenadas = new Coordenada();              

        }

        public function SetCoordenadas($lat,$long,$info){
            $this->objCoordenadas->SetCoordenadas($lat,$long,$info);        
        }

        function SetPeticion($fecha,$motivo){
            $this->fecha = $fecha;
            $this->motivo = $motivo;
        }

        function SetCodigo($codigo){
            $this->codigo = $codigo;
        }


        public function SolicitudInspeccion($codigo){    

            // Inicio de la trasasccion
            $this->conexion->beginTransaction();

            $informe = array();
           
            try{                

                $sql = "SELECT idSolicitante FROM solicitante AS soli
                JOIN persona AS per USING (idPersona)
                JOIN organizacion AS org USING (idOrganizacion)
                JOIN coordenada AS coor USING (idCoordenada) 
                WHERE rif = :cd OR 
                ci = :cd ";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cd" => $codigo
                ));
                
                $resultado = $query;   
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
					$idSolicitante = $registro['idSolicitante'];
				}       
               
                $this->objCoordenadas->AgregarCoordenada();

                $idCoordenada = $this->objCoordenadas->GetIdCoordenadas();

                if($idCoordenada == null  || $idSolicitante == null){
                    return "idCoordenada es NULL";
                }   

                $sql = "INSERT INTO peticion (fecha,motivo,idCoordenada,idSolicitante) VALUES (:f,:m,:idc,:ids)";

                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(                     
                    ":f" => $this->fecha,
                    ":m" => $this->motivo,
                    ":idc" => $idCoordenada, 
                    ":ids" => $idSolicitante           
                ));	
                
                $this->idPeticion = $this->conexion->lastInsertId(); 

                $cod = '00' . substr($codigo, 0, -(strlen($codigo) - 3)) . '-' . $idSolicitante . '-' .  $this->idPeticion;

                $sql = "UPDATE peticion SET codigo = :codPet WHERE idPeticion = :idPet";                

                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(                     
                    ":codPet" => $cod,
                    ":idPet" => $this->idPeticion                       
                ));	

                
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
               die("Error: " . $e->getMessage());
               return $e->getMessage();
            }                  

            return $informe;
        }

        public  function HistorialPeticionEspera(){
            try {           
                
                $peticion = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT codigo, concat(organismo,',',concat(nombre,' ',apellido)) as solicitante, concat(rif,',',ci) as codigos,
                tipoOrg as tipo, viaPet as informacion, estatusPet as estatus, fecha, idPeticion  FROM peticiones where estatusPet = 1 ;";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $peticion[] = $registro;
                }        
                 
                return $peticion;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        }

        public  function HistorialPeticionPlanificada(){
            try {           
                
                $peticion = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT pet.codigo, codigoPlan as planificacion,
                concat(organismo,',',concat(pet.nombre,' ',pet.apellido)) as solicitante, 
                concat(pet.rif, ',',pet.ci) as codigos, tipoOrg as tipo, viaPet as informacion, concat(user.nombre,' ',user.apellido) as encargado,
                user.ci as ciEnc, pet.estatusPet as estatus, plani.fechaPlan as fecha, pet.idPeticion
                FROM peticiones as pet 
                join planificacioninspeccion as plani on pet.idPeticion = plani.idPeticion
                join usuarios as user on plani.idIngeniero = user.idIngeniero where pet.estatusPet = 2;";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $peticion[] = $registro;
                }        
                 
                return $peticion;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        }

        public  function HistorialPeticionFinalizadas(){
            try {           
                
                $peticion = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT * from inspecciones where estatus = 3";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $peticion[] = $registro;
                }        
                 
                return $peticion;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        }

        public function InformacionPeticionesEspera(){
            try {           
                
                $Peticion = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT codigo, estatusPet, fecha, viaPet, motivo,
                organismo,via,rif,tipoOrg, estatus,
                concat(nombre,' ', apellido) as representante,
                ci,correo, concat(tlf,',',tTlf) as tlf, 
                concat(latitudPet,',',longitudPet) as coordenadasPet
                FROM peticiones WHERE codigo = :cod;";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cod" => $this->codigo
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $Peticion[] = $registro;
                }        
                 
                return $Peticion;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function InformacionPeticionesPlanificada(){
            try {           
                
                $Peticion = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT pet.codigo,pet.estatusPet,plani.codigoPlan, pet.fecha, plani.fechaPlan, 
                pet.viaPet, pet.motivo,concat(user.nombre,' ', user.apellido) as encargado, user.ci as ciEnc, 
                concat(user.tlf,',',user.tTlf) as tlfEnc,
                pet.organismo, pet.via,pet.rif,pet.tipoOrg, pet.estatus,
                concat(pet.nombre,' ', pet.apellido) as representante,
                pet.ci,pet.correo, concat(pet.tlf,',',pet.tTlf) as tlf, 
                concat(pet.latitudPet,',',pet.longitudPet) as coordenadasPet FROM peticiones as pet
                join planificacioninspeccion as plani on pet.idPeticion = plani.idPeticion
                join usuarios as user on plani.idIngeniero = user.idIngeniero WHERE codigo = :cod;";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cod" => $this->codigo
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $Peticion[] = $registro;
                }        
                 
                return $Peticion;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function InformacionPeticionesAtendidas($a){
            try {           
                
                $Peticion = array(); /* almacena lo que regresa el registro */  
                
                if($a == 1){
                    $sql = "SELECT pet.codigo,pet.estatusPet,insp.codigo as codigoAten, pet.fecha, insp.fecha as fechaAten,obra, 
                    pet.viaPet, pet.motivo,concat(user.nombre,' ', user.apellido) as encargado, user.ci as ciEnc, 
                    concat(user.tlf,',',user.tTlf) as tlfEnc,
                    pet.organismo,pet.via,pet.rif,pet.tipoOrg, pet.estatus,
                    concat(pet.nombre,' ', pet.apellido) as representante,
                    pet.ci,pet.correo, concat(pet.tlf,',',pet.tTlf) as tlf, 
                    concat(pet.latitudPet,',',pet.longitudPet) as coordenadasPet,insp.idInspeccion FROM peticiones as pet
                    join planificacioninspeccion as plani on pet.idPeticion = plani.idPeticion
                    join usuarios as user on user.idIngeniero = plani.idIngeniero
                    join inspeccion as insp on plani.idPlanificacionInspeccion = insp.idPlanificacionInspeccion WHERE pet.codigo = :cod;";
                } else if($a == 2){
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
                    join usuarios as users on users.idIngeniero = repI.idIngeniero WHERE pet.codigo = :cod;";
                }  else if($a == 3){
                    $sql = "SELECT pet.codigo,pet.estatusPet,insp.codigo as codigoAten, pet.fecha, insp.fecha as fechaAten,obra, rep.codigo as codigoRep,
                    planr.fecha as fechaPr, rep.fecha as fecharep,
                    pet.viaPet, pet.motivo,concat(user.nombre,' ', user.apellido) as encargado, user.ci as ciEnc, 
                    concat(user.tlf,',',user.tTlf) as tlfEnc,
                    concat(users.nombre,' ', users.apellido) as encargadoO, users.ci as ciEncO, 
                    concat(users.tlf,',',users.tTlf) as tlfEncO,
                    pet.organismo, pet.via,pet.rif,pet.tipoOrg, pet.estatus,
                    concat(pet.nombre,' ', pet.apellido) as representante,
                    pet.ci,pet.correo, concat(pet.tlf,',',pet.tTlf) as tlf, 
                    concat(pet.latitudPet,',',pet.longitudPet) as coordenadasPet, insp.idInspeccion FROM peticiones as pet
                    join planificacioninspeccion as plani on pet.idPeticion = plani.idPeticion
                    join usuarios as user on user.idIngeniero = plani.idIngeniero
                    join inspeccion as insp on plani.idPlanificacionInspeccion = insp.idPlanificacionInspeccion
                    join planificacion_reparacion as planr on insp.idInspeccion = planr.idInspeccion
                    join reparacion_ingeniero as repI on planr.idPlanificacionReparacion = repI.idPlanificacionReparacion
                    join usuarios as users on users.idIngeniero = repI.idIngeniero,
                    planificacion_reparacion as planre
                    join reparacion as rep on planre.idPlanificacionReparacion =  rep.idPlanificacionReparacion WHERE pet.codigo = :cod group by(codigo);";
                }          
              
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cod" => $this->codigo
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $Peticion[] = $registro;
                }        
                 
                return $Peticion;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function DashBoard(){
            try {           
                
                $dashBoard = array(); /* almacena lo que regresa el registro */             
                // SELECT count(pet.estatus) as espera from peticion as pet where pet.estatus = 1;
                $sql = "SELECT espera from cantidadEsperaPI";                
                $query = $this->conexion->prepare($sql);                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $dashBoard['ESPERA'] = $registro;
                }   
                // SELECT count(pet.estatus) as planificadas from peticion as pet where pet.estatus = 2;
                $sql = "SELECT planificadas from cantidadPlanificadaPI";                
                $query = $this->conexion->prepare($sql);                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $dashBoard['PLANIFICADAS'] = $registro;
                }  
                // SELECT count(pet.estatus) as atendidas from peticion as pet where pet.estatus = 3;
                $sql = "SELECT atendidas from cantidadAtendidaPI";                
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

        public function CoordenadasPet(){
            try {           
                
                $Peticion = array(); /* almacena lo que regresa el registro */  
                
        
                $sql = "select latitudPet, longitudPet from peticiones where codigo = :cod";
            
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cod" => $this->codigo
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $Peticion[] = $registro;
                }        
                 
                return $Peticion;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function PeticionSolicitante($codigo){
            try {           
                
                $Peticion = array(); /* almacena lo que regresa el registro */                  
        
                $sql = "SELECT codigo,viaPet as informacion, estatusPet as estatus, fecha, idPeticion  FROM peticiones where rif  = :cod or ci = :cod";
            
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":cod" => $codigo
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $Peticion[] = $registro;
                }        
                 
                return $Peticion;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }



    }

?>