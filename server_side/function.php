<?php 

     if(!isset($_SESSION)) {
         session_start();
     }

    function redirect($url, $flash_message) {
        if ($flash_message) {
            $_SESSION["flash"] = $flash_message;
        }
        header("Location: $url");
        die;
    }

    function remove_($movie){
        
        for($i=0;$i<strlen($movie);$i++){
            if($movie[$i]=="_")
                $movie[$i]=" ";
        }
        return $movie;        
    }
    
    function connection($config){
        $dbname=$config["dbname"];
        $host=$config["host"];
        $user=$config["username"];
        $pass=$config["password"];
        $db=null;
        try{
            $db = new PDO("mysql:dbname=$dbname;host=$host", $user,$pass);
            $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $ex){
?>
            <p>Errore Connessione database prova a ricaricare la pagina</p>
<?php
            return null;
        }
        return $db;
    }

    function query_utente($db,$nome,$cognome){
        $rispo=null;
        if($db){
            try{
                $risp=$db->prepare("select u.nome,u.cognome,u.password,u.genere,u.giorno,u.mese,u.anno from utenti u where u.nome=? && u.cognome=?");
                $risp->execute(array($nome,$cognome));
            }catch(PDOException $ex){
                return null;
            }
            $rispo=$risp->fetchAll();
        }
        return $rispo;
    }

    function query($db,$query,$movie){
        $row=null;
        if($db){
            try{
                $rows = $db->prepare($query."?");
                $rows->execute(array($movie));

            }catch(PDOException $ex){
                return null;
            }
            $row=$rows->fetchAll();
        }
        return $row;
    }

    function queryprofilo($db,$nome,$cognome){
        $row=null;
        if($db){
            try{
                $rows = $db->prepare("SELECT u.nome,u.cognome,c.commento,m.name from utenti u join commenti c on u.nome=c.nome_autore && u.cognome=c.cognome_autore join movies m on c.film_id=m.id WHERE u.nome=? && u.cognome=? group by m.name,c.commento");
                $rows->execute(array($nome,$cognome));
            }catch(PDOException $ex){
                return null;
            }
            $row=$rows->fetchAll(); 
        }
        return $row;
    }

    function loggato() {
        if (!isset($_SESSION["nome"])) {
            redirect("index.php", "Registrati o accedi prima di utilizzare questo sito");
        }
    }

    function read_trama($nome){
        $myFile = "../file/Trama/".$nome.".txt";
        $file=@fopen($myFile,"r");
        $trama="";
        if($file !=null){
            $riga=fgets($file);

            while($riga){
                $trama.=$riga;
                $riga=fgets($file);
            }
            fclose($file);
            return $trama;
        }
        else
            return null;
    }

    function require_id($db,$film){
        $rispo=null;
        if($db){
            try{
                $risp=$db->prepare("select id from movies where name=?");
                $risp->execute(array($film));
            }catch(PDOException $ex){
                return null;
            }
            $rispo=$risp->fetchAll();
        }
        return $rispo[0];      
    }

    function write_comment($db,$nome,$cognome,$testo,$id){
        $qnome=$db->quote($nome);
        $qcognome=$db->quote($cognome);
        $qid=$db->quote($id);
        $qtesto=$db->quote($testo); 
        if($db){
            try{        
                $db->query("insert into commenti(commento,film_id,nome_autore,cognome_autore) values ($qtesto,$id,$qnome,$qcognome)");
            }catch(PDOException $ex){
                return null;
            }
        }
        return $db;
    }

    function modificaprofilo($query,$modifica,$nome,$cognome){
        $config=require("../db/config.php");
        $db=connection($config);
        $risp=null;
        if($db){
            try{
                $risp=$db->prepare((String)$query);
                $risp->execute(array($modifica,$nome,$cognome));
            }catch(PDOException $ex){
                return null;
            }
        }
        return $risp;
    }

    function read_commenti($db,$nome){
        $mat=null;
        if($db){
            try{
                $risp=$db->prepare("select c.commento,c.nome_autore,c.cognome_autore from movies m join commenti c on m.id=c.film_id where m.name=?");
                $risp->execute(array($nome));
            }catch(PDOException $ex){
                return null;
            }
            $mat=array(array("","",""));
            $i=0;
            foreach($risp as $rispo){
                $mat[$i][0]=$rispo["nome_autore"];
                $mat[$i][1]=$rispo["cognome_autore"];
                $mat[$i][2]=$rispo["commento"];
                $i++;
             }
        }
		return $mat;
    }
?>