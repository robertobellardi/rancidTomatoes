window.onload = function() {
    info();
    filmcommenti(); 
}

function info(){    //recupera e mostra le informazioni dell'utente sulla sua pagina   
    var ajax=$.post("server_side/ajax.php",{profiloinfo:"true"},function(ajaxObj,status){
        console.log("status: "+status);
    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
        console.log("status "+ajaxStatus);
        errorerispo("Errore lettura informazioni utente.Riprova");
    }).done(function(ajaxO,ajaxStatus,ajaxObj){
        var risp=ajaxO;
        if(risp.erroredb=="false"){
            var ul=document.createElement("ul");
            var li=document.createElement("li");
            var labelsx=document.createElement("label");
            var labeldx=document.createElement("label");
            
            ul.setAttribute("id","infoul");
            li.setAttribute("id","nomeli");
            labeldx.setAttribute("id","valnome");
            labelsx.append(document.createTextNode("Nome : "));
            labeldx.append(document.createTextNode(risp.nome));
            li.append(labelsx);
            li.append(labeldx);
            ul.append(li);

            li=document.createElement("li");
            labelsx=document.createElement("label");
            labeldx=document.createElement("label");
            li.setAttribute("id","cognomeli");
            labeldx.setAttribute("id","valcognome");
            labelsx.append(document.createTextNode("Cognome : "));
            labeldx.append(document.createTextNode(risp.cognome));
            li.append(labelsx);
            li.append(labeldx);
            ul.append(li);

            li=document.createElement("li");
            labelsx=document.createElement("label");
            labeldx=document.createElement("label");
            li.setAttribute("id","genereli");
            labeldx.setAttribute("id","valgenere");
            labelsx.append(document.createTextNode("Genere : "));
            labeldx.append(document.createTextNode(risp.genere));
            li.append(labelsx);
            li.append(labeldx);
            ul.append(li);

            li=document.createElement("li");
            labelsx=document.createElement("label");
            labeldx=document.createElement("label");
            li.setAttribute("id","giornoli");
            labeldx.setAttribute("id","valgiorno");
            labelsx.append(document.createTextNode("Giorno : "));
            labeldx.append(document.createTextNode(risp.giorno));
            li.append(labelsx);
            li.append(labeldx);
            ul.append(li);

            li=document.createElement("li");
            labelsx=document.createElement("label");
            labeldx=document.createElement("label");
            li.setAttribute("id","meseli");
            labeldx.setAttribute("id","valmese");
            labelsx.append(document.createTextNode("Mese : "));
            labeldx.append(document.createTextNode(risp.mese));
            li.append(labelsx);
            li.append(labeldx);
            ul.append(li);

            li=document.createElement("li");
            labelsx=document.createElement("label");
            labeldx=document.createElement("label");
            li.setAttribute("id","annoli");
            labeldx.setAttribute("id","valanno");
            labelsx.append(document.createTextNode("Anno : "));
            labeldx.append(document.createTextNode(risp.anno));
            li.append(labelsx);
            li.append(labeldx);
            ul.append(li);
            $("#infoutentetit").append(ul);
        }
        else{
            errorerispo("Errore nel recuperare le informazioni dell'utente.Riprova")
        }
    });
}

function filmcommenti() {   //recupera e mostra i commenti dell'utente sulla sua pagina   
   var ajax=$.post("server_side/ajax.php",{filmcommenti:"true"},function(ajaxObj,status){
        console.log("status: "+status);
    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
        console.log("status "+ajaxStatus);
        errorerispo("Errore lettura commenti.Riprova");
    }).done(function(ajaxO,ajaxStatus,ajaxObj){
       var risp=ajaxO;
       if(risp[0].erroredb=="false"){
            if(risp[0].commento){     //creo il primo elemento 
                risp[0].film=replace(risp[0].film);

                var div=document.createElement("div");
                div.setAttribute("class","com");

                var tit=document.createElement("h2");

                var testo=document.createTextNode(risp[0].film);
                tit.append(testo);
                div.append(tit);

                var ul=document.createElement("ul");
                ul.setAttribute("id",risp[0].film)

                var li=document.createElement("li");

                li.append(document.createTextNode(risp[0].commento));
                ul.append(li);
                div.append(ul);

                $("#arcom").append(div);         

                for(i=1;i<risp.length;i++){
                    risp[i].film=replace(risp[i].film);                

                    if(risp[i].film == risp[i-1].film){
                        var ul=document.getElementById(risp[i].film);
                        var li=document.createElement("li");
                        li.append(document.createTextNode(risp[i].commento));
                        ul.append(li);
                    }
                    else{
                        var div=document.createElement("div");
                        div.setAttribute("class","com");

                        var tit=document.createElement("h2");

                        tit.append(document.createTextNode(risp[i].film));
                        div.append(tit);

                        var ul=document.createElement("ul");
                        ul.setAttribute("id",risp[i].film);
                        var li=document.createElement("li");
                        li.append(document.createTextNode(risp[i].commento));
                        ul.append(li);
                        div.append(ul);

                        $("#arcom").append(div);
                    }
                }

            }
       } else{
           errorerispo("Errore nel recuperare i commenti.Riprova");
       }
    });
}

function replace(risp){     //sostituisce gli '_' con uno spazio
    var count=0; 
    for(j=0;j<risp.length;j++){
                if(risp[j]=="_")
                    count++;
    }
    for(j=0;j<count;j++)
        risp=risp.replace("_"," ");
    return risp;   
}

function edit(){     //modifica i dati dell'utente e gli aggiorna
    var div=document.getElementById("edit");
    div.parentNode.removeChild(div);
    
    var avviso=document.createElement("h4");
    avviso.setAttribute("id","avviso");
    avviso.append(document.createTextNode("Scrivi solo nei campi che vuoi modificare"));
    
    var edit=document.createElement("div");
    edit.setAttribute("id","editcampi");    
    
    var genere=document.createElement("textarea");
    genere.setAttribute("id","genere");
    genere.setAttribute("placeholder","genere");
    
    var giorno=document.createElement("textarea");
    giorno.setAttribute("id","giorno");
    giorno.setAttribute("placeholder","giorno");
    
    var mese=document.createElement("textarea");
    mese.setAttribute("id","mese");
    mese.setAttribute("placeholder","mese");
    
    var anno=document.createElement("textarea");
    anno.setAttribute("id","anno");
    anno.setAttribute("placeholder","anno");
    
    edit.append(avviso);
    edit.append(genere);
    edit.append(giorno);
    edit.append(mese);
    edit.append(anno);

    var invia=document.createElement("button");
    invia.setAttribute("class","invia");
    invia.setAttribute("onclick","send()");
    invia.append(document.createTextNode("Invia"));
    edit.append(invia);
    
    $("#textedit").append(edit);   
}

function send(){   
    var divgen=document.querySelector("#erroregenere");
    var divg=document.querySelector("#erroregiorno");
    var divm=document.querySelector("#erroremese");
    var diva=document.querySelector("#erroreanno");
    var exit=false;
    var errorerispdb;

    if(divgen)
        divgen.parentNode.removeChild(divgen);    
    if(divg)
        divg.parentNode.removeChild(divg);
    
    if(divm)
        divm.parentNode.removeChild(divm);
    
    if(diva)
        diva.parentNode.removeChild(diva);
    
    var genere=document.getElementById("genere");
    var giorno=document.getElementById("giorno");
    var mese=document.getElementById("mese");
    var anno=document.getElementById("anno");
    var nome=document.querySelector("#nometit").textContent;
    var cognome=document.querySelector("#cognometit").textContent;

    if(genere.value!="" && !exit){
        if(genere.value=="M" || genere.value=="F"){
            inviodb("update utenti set genere=? where nome=? && cognome=?","genere",genere.value,nome,cognome);
        }
        else{
            exit=true;
            var errore=document.createElement("h6");
            errore.setAttribute("id","erroregenere");
            errore.append(document.createTextNode("Genere non valido"));
            $("#genere").after(errore);
        }
    }
    if(giorno.value!="" && !exit){
        if(giorno.value>0 && giorno.value<=31){
            if(mese.value==""){
                mese.value=document.querySelector("#valmese").textContent;
            }
            if(anno.value==""){
                anno.value=document.querySelector("#valanno").textContent;
            }
            var okay=isdata(giorno.value,mese.value,anno.value);

            if(okay){
                inviodb("update utenti set giorno=? where nome=? && cognome=?","giorno",giorno.value,nome,cognome);
            }
            else{
                exit=true;
                var errore=document.createElement("h6");
                errore.setAttribute("id","erroregiorno");
                errore.append(document.createTextNode("Giorno non valido"));
                $("#giorno").after(errore);
            }
        }
        else{
            exit=true;
            var errore=document.createElement("h6");
            errore.setAttribute("id","erroregiorno");
            errore.append(document.createTextNode("Giorno non valido"));
            $("#giorno").after(errore);
        }
    }
    if(mese.value!="" && !exit){ 
        if(mese.value>0 && mese.value<=12){
            if(giorno.value==""){
                giorno.value=document.querySelector("#valgiorno").textContent;           
            }
            if(anno.value==""){
                anno.value=document.querySelector("#valanno").textContent;           
            }
            var okay=isdata(giorno.value,mese.value,anno.value);
            if(okay){
                inviodb("update utenti set mese=? where nome=? && cognome=?","mese",mese.value,nome,cognome);
            }
            else{
                exit=true;
                var errore=document.createElement("h6");
                errore.setAttribute("id","erroremese");
                errore.append(document.createTextNode("Mese non valido"));
                $("#mese").after(errore);
            }
        }
        else{
            exit=true;
            var errore=document.createElement("h6");
            errore.setAttribute("id","erroremese");
            errore.append(document.createTextNode("Mese non valido"));
            $("#mese").after(errore);
        }
    }
    if(anno.value!="" && !exit){
        if(anno.value>1900 && anno.value<=2019){
            if(giorno.value==""){
                giorno.value=document.querySelector("#valgiorno").textContent;           
            }
            if(mese.value==""){
                mese.value=document.querySelector("#valmese").textContent;           
            }
            var okay=isdata(giorno.value,mese.value,anno.value);
            if(okay){                
                inviodb("update utenti set anno=? where nome=? && cognome=?","anno",anno.value,nome,cognome);
            }
            else{
                exit=true;
                var errore=document.createElement("h6");
                errore.setAttribute("id","erroreanno");
                errore.append(document.createTextNode("Anno non valido"));
                $("#anno").after(errore);
            }
        }
        else{
            exit=true;
            var errore=document.createElement("h6");
            errore.setAttribute("id","erroreanno");
            errore.append(document.createTextNode("Anno non valido"));
            $("#anno").after(errore);
        }
    }
    if(genere.value=="" && giorno.value=="" && mese.value=="" && anno.value==""){
        pulisci();
    }    
}

function modificagenere(genere){                            //modifico e aggiorno il genere(LISTA)
    var genereli=document.querySelector("#valgenere");
        if(genereli){
        genereli.parentNode.removeChild(genereli);

        var label=document.createElement("label");
        label.setAttribute("id","valgenere");
        label.append(document.createTextNode(genere));
        $("#genereli").append(label); 
    }
}

function modificagiorno(giorno){                            //modifico e aggiorno il giorno(LISTA)
    var giornoli=document.querySelector("#valgiorno");
    if(giornoli){
        giornoli.parentNode.removeChild(giornoli);
        
        var label=document.createElement("label");
        label.setAttribute("id","valgiorno");
        label.append(document.createTextNode(giorno));
        $("#giornoli").append(label);
    }   
}

function modificamese(mese){                                //modifico e aggiorno il mese(LISTA)
    var meseli=document.querySelector("#valmese");
    if(meseli){
        meseli.parentNode.removeChild(meseli);
        
        var label=document.createElement("label");
        label.setAttribute("id","valmese");
        label.append(document.createTextNode(mese));
        $("#meseli").append(label);
    }
}

function modificaanno(anno){                                //modifico e aggiorno l' anno(LISTA)
    var annoli=document.querySelector("#valanno"); 
    if(annoli){
        annoli.parentNode.removeChild(annoli);
        
        var label=document.createElement("label");
        label.setAttribute("id","valanno");
        label.append(document.createTextNode(anno));
        $("#annoli").append(label); 
    }
}

function inviodb(query,mod,modifica,nome,cognome){

     var ajax=$.post("server_side/ajax.php",{querydb: query,modifica: modifica,nomedb: nome,cognomedb: cognome},function(ajaxObj,status){
        console.log("status: "+status);
    }).fail(function(ajaxO,ajaxStatus,ajaxObj){
        console.log("status "+ajaxStatus);
        errorerispo("Errore invio dati.Riprova");
    }).done(function(ajaxO,ajaxStatus,ajaxObj){
         console.log("status "+ajaxStatus);
         pulisci();
         var risp=ajaxO;
         if(risp.erroredb=="true")
            errorerispo("Errore invio dati.Riprova");
         else{
             if(mod=="genere")
                modificagenere(modifica);
             else
                 if(mod=="giorno")
                    modificagiorno(modifica);
                else
                     if(mod=="mese")
                        modificamese(modifica);
                    else
                        modificaanno(modifica);
         }
    });
}

function isdata(giorno,mese,anno){
    var okay=false;
    var data=new Date();
        var g=data.getDate();
        var m=data.getMonth()+1;
        var a=data.getFullYear();
    if(anno < a || (anno == a && mese < m) || (anno == a && mese == m && giorno <= g)){
        if(mese=="02" || mese==2){
            if(giorno<=28)
                okay=true;
            else{
                if(giorno==29){
                    if((anno%100)!=0){
                        if((anno%4)==0)
                            okay=true;
                    }
                    else{
                        if((anno%400)==0)
                            okay=true;
                    }
                }
            }
        }
        else{
            if(mese==4 || mese==6 || mese==9 || mese==11 || mese=="04" || mese=="06" || mese=="09"){
                if(giorno<=30){
                    okay=true;
                }
            }
            else{
                okay=true;
            }
        }
    }
    return okay;
}

function pulisci(){
    var div=document.getElementById("textedit");
    div.parentNode.removeChild(div);

    var divest=document.createElement("div");
    divest.setAttribute("id","textedit");

    var div=document.createElement("div");
    div.setAttribute("id","edit");

    var invia=document.createElement("button");
    invia.setAttribute("class","invia");
    invia.setAttribute("type","button");
    invia.setAttribute("onclick","edit()");
    invia.append(document.createTextNode("Edit"));

    div.append(invia);
    divest.append(div);
    $("#dx").append(divest);    
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