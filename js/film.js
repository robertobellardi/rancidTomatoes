window.onload = function() {
    rank();
    read_trama();
    read_commenti();
    read_genere();
    read_direttore();
    read_attori();
}

function rank() {
    var ajax=$.post("server_side/ajax.php",{rank:"true"},function(ajaxObj,status){
        console.log("status: "+status);
    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
        console.log("status "+ajaxStatus);
        errorerispo("Errore lettura rank.Riprova");
    }).done(function(ajaxO,ajaxStatus,ajaxObj){
        var risp=ajaxO;
        
        if(risp.erroredb=="false"){
            var div=document.createElement("div");
            var p=document.createElement("p");

            if(risp.rank==null){
                div.setAttribute("id","rankgreen");

                $(div).css("width","100px");
                div.append(document.createTextNode("Null"));
            }
            else{
                div.setAttribute("id","rankred");
                var rankpx=risp.rank*100+"px";
                var rankper=risp.rank*10+"%";

                $(div).css("width",rankpx);
                div.append(document.createTextNode(rankper));
            }      
            div.append(p);
            $("#rankeste").append(div);
        }else
            errorerispo("Errore lettura rank.Riprova");          
    });
}

function read_trama() {
   var ajax=$.post("server_side/ajax.php",{trama:"true"},function(ajaxObj,status){
        console.log("status: "+status);

    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
        console.log("status "+ajaxStatus);
        errorerispo("Errore lettura trama.Riprova");
    }).done(function(ajaxO,ajaxStatus,ajaxObj){
       var risp=ajaxO;
       
       if(risp.erroredb=="false"){
           var p=document.createElement("p");
           p.append(document.createTextNode(risp.trama));       

           $("#trama").append(p);
       }else
           errorerispo("Errore lettura rank.Riprova");
    });
}

function read_commenti() {
   var ajax=$.post("server_side/ajax.php",{commenti:"true"},function(ajaxObj,status){
        console.log("status: "+status);
    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
        console.log("status "+ajaxStatus);
        errorerispo("Errore lettura commenti.Riprova");
    }).done(function(ajaxO,ajaxStatus,ajaxObj){
       var risp=ajaxO;
      
       if(risp[0].erroredb=="false"){
           for(i=0;i<risp.length && risp[0].nome;i++){
               var div=document.createElement("div");
               div.setAttribute("class","commento");
               var h=document.createElement("h3");
               var text=document.createElement("textarea");
               h.append(document.createTextNode(risp[i].nome+" "+risp[i].cognome));
               text.append(document.createTextNode(risp[i].testo));
               text.readOnly=true;
               div.append(h);
               div.append(text);
               $("#commenti").append(div);         
           }
       }else
           errorerispo("Errore lettura commenti.Riprova");       
    });
}

function read_genere() {
   var ajax=$.post("server_side/ajax.php",{genere:"true"},function(ajaxObj,status){
        console.log("status: "+status);
    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
        console.log("status "+ajaxStatus);
        errorerispo("Errore lettura genere.Riprova");
    }).done(function(ajaxO,ajaxStatus,ajaxObj){
        var risp=ajaxO;
              
        if(risp[0].erroredb == "false"){

            var ul=document.createElement("ul");

            for(i=0;i<risp.length;i++){                
                var li=document.createElement("li");
                li.append(document.createTextNode(risp[i].genere));
                ul.append(li);
            }
            $("#genere").append(ul);
        }else
            errorerispo("Errore lettura genere.Riprova");
    });
}

function read_direttore() {
   var ajax=$.post("server_side/ajax.php",{direttore:"true"},function(ajaxObj,status){
        console.log("status: "+status);
    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
        console.log("status "+ajaxStatus);
        errorerispo("Errore lettura direttore.Riprova");
    }).done(function(ajaxO,ajaxStatus,ajaxObj){
        var risp=ajaxO;
    
        if(risp[0].erroredb=="false"){

            var ul=document.createElement("ul");
            
            for(i=0;i<risp.length;i++){
                var li=document.createElement("li");
                li.append(document.createTextNode(risp[i].nome+" "+risp[i].cognome));
                ul.append(li);
            }
            $("#direttore").append(ul);
        }else
             errorerispo("Errore lettura direttore.Riprova");
    });
}

function read_attori() {    
   var ajax=$.post("server_side/ajax.php",{attori:"true"},function(ajaxObj,status){
        console.log("status: "+status);
    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
        console.log("status "+ajaxStatus);
        errorerispo("Errore lettura attori.Riprova");
    }).done(function(ajaxO,ajaxStatus,ajaxObj){
        var risp=ajaxO;

        if(risp[0].erroredb=="false"){

            var ul=document.createElement("ul");

            for(i=0;i<risp.length;i++){
                var li=document.createElement("li");
                li.append(document.createTextNode(risp[i].ruolo+": "+risp[i].nome+" "+risp[i].cognome));
                ul.append(li);
            }
            $("#attori").append(ul);
        }else
             errorerispo("Errore lettura attori.Riprova");
    });
}

function pubblica() {
    var x = document.getElementById("comm").value;    
    document.getElementById("comm").value="";
    var ajax=$.post("server_side/ajax.php",{commento:x},function(ajaxObj,status){
        console.log("status: "+status);
    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
        console.log("status "+ajaxStatus);
        console.log(ajaxO);
        errorerispo("Errore pubblicazione commento.Riprova");
    }).done(function(ajaxO,ajaxStatus,ajaxObj){
        var risp=ajaxO;
        if(risp.erroredb=="false"){        
            var div=document.createElement("div");
            div.setAttribute("class","commento");

            var h=document.createElement("h3");
            h.append(document.createTextNode(risp.nome+" "+risp.cognome));

            var text=document.createElement("textarea");
            text.readOnly=true;
            text.append(document.createTextNode(risp.commento));            
            div.append(h);
            div.append(text);
            $("#commenti").append(div);
            
        }else
             errorerispo("Errore pubblicazione commento.Riprova");
    });
}

function errorerispo(str){
    var errore=document.querySelector("#errorerispo");
    
    if(!errore){
        errore=document.createElement("h1");
        errore.setAttribute("id","errorerispo");
        errore.append(document.createTextNode(str));
        $("#banner").after(errore);
    }
}