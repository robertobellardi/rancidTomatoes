        <!--
                Autore: Roberto Bellardi Gioli
                Sito: Rancid Tomamtoes
                Contenuto: pagina profilo dell'utente, si possono vedere i propri commenti emodificare alcune informazioni dell'utente
        -->

<?php include("top.html")?>
<?php include("server_side/function.php")?>

<!--link foglio js per profilo.php-->
<script src="js/profilo.js"></script>

<?php
        if(!isset($_SESSION)){
            session_start();
                }
        loggato();
        $nome=$_SESSION["nome"];
        $cognome=$_SESSION["cognome"];
?>
        <div id=bache>
            <div id=sx>
                <h1 id=nometit><?=$nome?> </h1>
                <h1 id=cognometit><?=$cognome?></h1>
                
                <div id="arcom">
                    
                    <h3>I tuoi commenti</h3>              
                    
                </div>
            
            </div>
            
            <div id=dx>
                <div id=infoutente>
                    
                    <h5 id=infoutentetit>Info utente</h5>
                
                </div>
                <div id=textedit>
                    <div id=edit>
                        <button class="invia" type="button" onclick="edit()">Modifica</button>
                    </div>
                </div>
            </div>
            
            <a href="rancid.php">
                    <div id=indietro>                    
                        <img src="img/go-back-arrow.png" alt="back image" >
                        <br>
                        <p>Torna alla home page</p>
                    </div>
                </a>
        </div>
<?php include("bottom.php")?>