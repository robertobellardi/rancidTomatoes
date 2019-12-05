        <!--
                Autore: Roberto Bellardi Gioli
                Sito: Rancid Tomamtoes
                Contenuto: pagina in cui poter leggere tutte le informazioni relative al film,commentare e leggere i commenti di altri utenti
        -->

<?php include("top.html")?>
<?php include("server_side/function.php")?>

        <!--link foglio js per film.php-->
        <script src="js/film.js"></script>
<?php 
        if(!isset($_SESSION)){
            session_start();
        }

        loggato();
        $movie=$_GET["film"];
        $titolo=remove_($movie);
        $_SESSION["film"]=$movie;
?>
        <div id=general>
            <div id=sx>
                <div id=titolo><?=$titolo; ?></div>

                <div id=rankeste>
                    <h1>Rank</h1>
                </div>

                <div id=trama>
                    <h1>Trama</h1>
                </div>    

                <div id=commenti>
                    <h1>Area commenti</h1>
                </div>

                <div id=scrivi>
                    <h1>Scrivi un commento</h1>
                    <textarea id=comm></textarea>
                    <input id="bot" type="submit" name="Pubblica" value="Pubblica" onclick="pubblica()">            
                </div>

                <a href="rancid.php">
                    <div id=back>                    
                        <img src="img/go-back-arrow.png" alt="back image" >
                        <br>
                        <p>Torna alla home page</p>
                    </div>
                </a>

            </div>       

            <div id=dx>
                <div id=img>
                    <img src="img/<?=$movie;?>Big.jpg" alt="<?=$movie;?>" >
                </div>

                <div id=genere>
                    <h1>Genere</h1>
                </div>

                <div id=direttore>
                    <h1>Direttore</h1>
                </div>

                <div id=attori>
                    <h1>Attori</h1>
                </div>
            </div>
        </div>
<?php include("bottom.php")?>