<?php namespace Modelo\Usuario;

    use Modelo\Persona\Persona;

    class Usuario extends Persona{

        protected $idUsuario;        
        protected $login;
        protected $email;
        protected $sexo;
        protected $pass;
        protected $pass_cifrado;
        protected $tUser;
        protected $estatus;

        public function __construct($idPersona = '', $ci = 99999999, $nombre = '', $apellido = '', 
                                    $tlf = 00000000000, $tTlf = 1,
                                    $idUsuario = '', $login = '', $email = '', $sexo = '1',$pass = '', 
                                    $tUser = 1 , $estatus = 1){

            parent::__Construct($idPersona, $ci, $nombre, $apellido,$tlf ,$tTlf);  

            $this->idUsuario = $idUsuario;
            $this->login = htmlentities(addslashes($login));
            $this->email = htmlentities(addslashes($email));
            $this->pass =  htmlentities(addslashes($pass));                            
            $this->tUser = $tUser;
            $this->estatus = $estatus;   

        }

        public function SetSesion($login,$pass){
            $this->login = htmlentities(addslashes($login));
            $this->pass =  htmlentities(addslashes($pass));       
        }

        public function SetUsuarioIn($login,$tUser,$email,$sexo,$pass){
            $this->login = htmlentities(addslashes($login));
            $this->tUser = $tUser;
            $this->email = htmlentities(addslashes($email));
            $this->sexo      = $sexo; 
            $this->pass =  htmlentities(addslashes($pass));            
        }

        public function SetLogin($login){
            $this->login = htmlentities(addslashes($login));
        }

        public function SetEmail($email){
            $this->email = htmlentities(addslashes($email));
        }

        public function SetEstatus($estatus){
            $this->estatus = $estatus;  
        }

        public function SetSexo($sexo){
            $this->sexo  = $sexo; 
        }

        public function SetTUser($tUser){
            $this->tUser = $tUser;
        }

        public function SetPass($pass){
            $this->pass_cifrado = password_hash($pass, PASSWORD_DEFAULT, array(
                "cost" => 12
            ));            
        }  

        public function RegistrarUsuario(){
            // Inicio de la trasasccion
            $this->conexion->beginTransaction();

            $informe = array();        

            $this->pass_cifrado = password_hash($this->pass, PASSWORD_DEFAULT, array(
                "cost" => 12
            ));

            try{

                $sql = "INSERT INTO usuario (login,tUser,email,sexo,pass,idPersona) VALUES (:lg, :tu, :em, :sex, :pss, :id)";
        
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":lg" => $this->login,
                    ":tu" => $this->tUser,
                    ":em" => $this->email,
                    ":sex" => $this->sexo,
                    ":pss" => $this->pass_cifrado,
                    ":id" => $this->idPersona              
                ));
    
                $resultado = $query;
               
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
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
        

        public function ValidarSesion(){
            session_start(); 
            if(isset($_SESSION["usuario"])){            
                return $_SESSION["usuario"];
            }else{
                return false;
            }
        }
        
         public function IniciarSesion(){                  

            try{
                $c = 0;

                $datosDelUsuario;

                $informe = array();

                $sql = "SELECT * FROM usuarios  WHERE login = :lg";

                $query = $this->conexion->prepare($sql);
            
                $query->execute(array(
                    ":lg" => $this->login
                ));

                $resultado = $query;

                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                
                    if (password_verify($this->pass, $registro['pass'])) {
                        $c++;
                        $datosDelUsuario = array(
                            'idUser' => $registro['idUsuario'],
                            'login' => $registro['login'],
                            'tuser' => $registro['tUser'],
                            'email' => $registro['email'],
                            'idPer' => $registro['idPersona'],
                            'ci' => $registro['ci'],
                            'estatus' => $registro['estatus'],
                            'nombre' => $registro['nombre'],
                            'apellido' => $registro['apellido'],
                            'sexo' => $registro['sexo'],
                            'tlf' => $registro['tlf'],
                            'tTlf' => $registro['tTlf'],
                            'civ' => $registro['civ'],
                            'rowAf' => $resultado->rowCount()
                        );
                    }
                }

                if ($c > 0) {
                    session_start();              
                    $_SESSION["usuario"] = $datosDelUsuario;
                    return $_SESSION["usuario"];                
                    
                } else {
                    $informe['rowAf']    = $resultado->rowCount();
                    $informe['errorSms'] = $resultado->errorInfo();
                    return $informe;                
                }

            }catch(\PDOException $e){
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }            
        
        }

        public function CerrarSesion(){
            session_start();             
            return session_destroy();
        }

        public function ValidarUsuarioBD() {

            $informe = array();

            try{                
            
                $sql = "SELECT * FROM usuarios WHERE login = :user";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":user" => $this->login
                ));
                
                $resultado = $query;               
                
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['rowAf']    = $rowAfIn;
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                }

            }catch(\PDOException $e){
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }                  
            
            return $informe;
        }

        public function ValidarCorreoUsuarioaBD() {

            $informe = array();

            try{                
            
                $sql = "SELECT * FROM usuarios WHERE email = :email";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":email" => $this->email
                ));
                
                $resultado = $query;               
                
                $rowAfIn = $resultado->rowCount();
                
                if ($rowAfIn == 0) {
                    $informe['rowAf']    = $rowAfIn;
                    $informe['errorSms'] = $resultado->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfIn;
                }

            }catch(\PDOException $e){
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }                  
            
            return $informe;
        }

        public function HistorialUsuarioAdm(){
            
            try {           
                
                $usuario = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT concat(nombre,' ',apellido) as nombre, ci, 
                email, login, estatus, idPersona FROM usuarios WHERE tUser = 1 AND estatus = 1";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $usuario[] = $registro;
                }        
                 
                return $usuario;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
           
        }

        public function HistorialUsuarioIng(){
            
            try {           
                
                $usuario = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT concat(nombre,' ',apellido) as nombre, ci, 
                email, login, estatus, idPersona FROM usuarios WHERE tUser = 2 AND estatus = 1";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $usuario[] = $registro;
                }        
                 
                return $usuario;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
           
        }
        public function HistorialUsuarioInactivo(){
            
            try {           
                
                $usuario = array(); /* almacena lo que regresa el registro */             
                
                $sql = "SELECT concat(nombre,' ',apellido) AS nombre,ci,
                email, login, tUser, estatus, 
                idPersona FROM usuarios 
                WHERE tUser = 1 AND estatus = 2 OR 
                tUser = 2 AND estatus = 2";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute();
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $usuario[] = $registro;
                }        
                 
                return $usuario;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
           
        }       

        public function InformacionUsuario($tipo){
            try {           
                
                $usuario = array();/* almacena lo que regresa el registro */             
                
                $sql = "SELECT idPersona, concat(nombre,' ',apellido) as nombre, 
                ci, sexo, tlf, tTlf, idUsuario, login, 
                email, tUser, estatus,idIngeniero,civ 
                FROM usuarios WHERE login = :lg AND tUser = :tu ";
                
                $query = $this->conexion->prepare($sql);
                
                $query->execute(array(
                    ":lg" => $this->login,
                    ":tu" => $tipo
                ));
                
                $resultado = $query;
                
                while ($registro = $resultado->fetch(\PDO::FETCH_ASSOC)) {
                    $usuario[] = $registro;
                }        
                 
                return $usuario;         
           
            }
            catch (\PDOException $e) {
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function EstatusUsuario(){
            $informe = array();   
            $this->conexion->beginTransaction();
            try{

                $sqlUp = "UPDATE usuario SET estatus = :est WHERE login = :lg";
            
                $queryUp = $this->conexion->prepare($sqlUp);
                
                $queryUp->execute(array(        
                    ":est" => $this->estatus,          
                    ":lg" => $this->login
                ));
                
                $resultadoUp = $queryUp;
                
                $rowAfUp = $queryUp->rowCount();
                
                if ($rowAfUp == 0) {
                    $informe['rowAf']    = $rowAfUp;
                    $informe['errorSms'] = $queryUp->errorInfo();
                } else {
                    $informe['rowAf'] = $rowAfUp;
                }

                //Realizar cambios a la Base de Datos
                $this->conexion->commit();  
                
                return $informe;

            }catch(\PDOException $e){
                //Calcelar consultas
                $this->conexion->rollback();
                die("Error: " . $e->getMessage());
                return $e->getMessage();
            }
        }

        public function ActualizarDatosPublicos(){
            $informe = array();
			$this->conexion->beginTransaction();
			try {
				
				$sqlUp = "UPDATE persona AS per 
                          JOIN usuario AS user 
                          USING (idPersona)
                          SET per.ci = :ci, 
                          per.nombre = :n,
                          per.apellido = :ln,
                          user.sexo = :sex                                            
                          WHERE per.idPersona = :id";
				
                $queryUp = $this->conexion->prepare($sqlUp);        

				$queryUp->execute(array(
					":ci" => $this->ci,
					":n" => $this->nombre,
                    ":ln" => $this->apellido,
                    ":sex"=> $this->sexo,					
					":id" => $this->idPersona
				));
				
				$resultadoUp = $queryUp;
				
				$rowAfUp = $queryUp->rowCount();
				
				if ($rowAfUp == 0) {
					$informe['rowAf']    = $rowAfUp;
					$informe['errorSms'] = $queryUp->errorInfo();
				} else {
					$informe['rowAf'] = $rowAfUp;
				}
				
				$this->conexion->commit();
				
				return $informe;
				
			}
			catch (\PDOException $e) {
				$this->conexion->rollback();
				die("Error: " . $e->getMessage());
				return $e->getMessage();
			}
        }

        public function ActualizarDatosCuenta(){
            $informe = array();
			$this->conexion->beginTransaction();
			try {
				
				$sqlUp = "UPDATE persona AS per 
                          JOIN usuario AS user 
                          USING (idPersona)
                          SET per.tlf = :tlf,
                          per.tTlf = :tTlf,
                          user.login = :lg,
                          user.email = :em,
                          user.tUser = :tUs
                          WHERE per.idPersona = :id";
				
                $queryUp = $this->conexion->prepare($sqlUp);        

				$queryUp->execute(array(
					":tlf" => $this->tlf,
					":tTlf" => $this->tTlf,
                    ":lg" => $this->login,
                    ":em"=> $this->email,	
                    ":tUs"=> $this->tUser,				
					":id" => $this->idPersona
				));
				
				$resultadoUp = $queryUp;
				
				$rowAfUp = $queryUp->rowCount();
				
				if ($rowAfUp == 0) {
					$informe['rowAf']    = $rowAfUp;
					$informe['errorSms'] = $queryUp->errorInfo();
				} else {
					$informe['rowAf'] = $rowAfUp;
				}
				
				$this->conexion->commit();
				
				return $informe;
				
			}
			catch (\PDOException $e) {
				$this->conexion->rollback();
				die("Error: " . $e->getMessage());
				return $e->getMessage();
			}
        }

        public function ResetearClave() {
        
            $errorInfo = array(); 

            $this->conexion->beginTransaction();
            try{

                $sqlUp = "UPDATE usuario SET pass = :pss                                       
                WHERE idPersona = :id";

                $query = $this->conexion->prepare($sqlUp);

                $query->execute(array(            
                    ":pss" => $this->pass_cifrado,
                    ":id" => $this->idPersona
                ));

                $resultado = $query;

                $rowAfIn = $resultado->rowCount();

                if ($rowAfIn == 0) {
                    $errorInfo['errorSms'] = $resultado->errorInfo();
                } else {
                    $errorInfo['rowAf'] = $rowAfIn;
                }

                $this->conexion->commit();

                return $errorInfo;

            }catch (\PDOException $e) {
				$this->conexion->rollback();
				die("Error: " . $e->getMessage());
				return $e->getMessage();
			}     
          
        }
    
    }

?>