// ============================================================
// ADMIN.JS – FEMMEBIZ
// Connexion + toutes fonctions admin + Badge vérifié
// ============================================================

// ========== CONNEXION ==========
function verifierAdmin(){
    var pwd=document.getElementById('adminPassword').value;
    var msg=document.getElementById('adminMessage');
    if(!pwd){msg.innerHTML='<span style="color:#E74C3C;">Veuillez entrer un mot de passe.</span>';return;}
    if(pwd==='Daniel2004'){
        document.getElementById('adminLogin').style.display='none';
        document.getElementById('adminContent').style.display='block';
        chargerAdmin();
    }else{
        msg.innerHTML='<span style="color:#E74C3C;">❌ Mot de passe incorrect.</span>';
    }
}

function deconnexionAdmin(){
    document.getElementById('adminLogin').style.display='block';
    document.getElementById('adminContent').style.display='none';
    document.getElementById('adminPassword').value='';
}

function chargerAdmin(){chargerDemandesAdmin('en attente');chargerPubsAdmin();chargerPubsExpireesAdmin();chargerConseilsAdmin('tous');chargerAbonneesAdmin();chargerStatsAdmin();}

// ========== RECHERCHE ==========
function rechercherElement(){
    var r=document.getElementById('rechercheInput').value.trim().toLowerCase();
    var res=document.getElementById('resultatRecherche');
    if(!r){res.style.display='none';return;}
    var pubs=JSON.parse(localStorage.getItem('femmeBiz_pubs')||'[]');
    var abo=JSON.parse(localStorage.getItem('femmeBiz_abonnees')||'[]');
    var h='';
    pubs.forEach(function(p){if(p.nom.toLowerCase().includes(r)||p.telephone.includes(r))h+='<div style="background:var(--gris-clair);padding:8px;border-radius:8px;margin-bottom:4px;font-size:12px;"><strong>📢 '+p.nom+'</strong> - 📞 '+p.telephone+' - '+p.categorie+' - Exp: '+p.dateExpiration+'</div>';});
    abo.forEach(function(a){if((a.prenom+' '+a.nom).toLowerCase().includes(r))h+='<div style="background:var(--gris-clair);padding:8px;border-radius:8px;margin-bottom:4px;font-size:12px;"><strong>👑 '+a.prenom+' '+a.nom+'</strong> - Exp: '+a.expiration+'</div>';});
    if(!h)h='<p style="color:#999;">Aucun résultat.</p>';
    res.innerHTML=h;res.style.display='block';
}

// ========== DEMANDES ==========
function filtrerDemandes(f){chargerDemandesAdmin(f);}
function chargerDemandesAdmin(filtre){
    var d=JSON.parse(localStorage.getItem('femmeBiz_demandes')||'[]');
    var l=document.getElementById('adminDemandes');if(!l)return;
    var df=d;if(filtre!=='tous')df=d.filter(function(x){return x.statut===filtre;});
    if(df.length===0){l.innerHTML='<li style="color:#999;">Aucune demande.</li>';return;}
    var h='';
    df.forEach(function(x){
        var idx=d.indexOf(x);
        var col=x.statut==='validé'?'#2ECC71':x.statut==='refusé'?'#E74C3C':'var(--or)';
        var tel=(x.tel||x.numero||'').replace(/\D/g,'');
        h+='<li><div style="flex:1;"><strong>'+x.prenom+' '+x.nom+'</strong> <span style="color:'+col+';font-size:10px;">('+x.statut+')</span><br><small>📱 '+(x.operateur||'N/A')+' | 📅 '+x.date+' | 📦 '+x.besoin+' | 💰 '+x.montant+'</small>';
        if(tel)h+='<br><a href="https://wa.me/243'+tel+'" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:3px 10px;border-radius:12px;text-decoration:none;font-size:10px;margin-top:4px;"><i class="fab fa-whatsapp"></i> WhatsApp</a>';
        h+='</div>';
        if(x.statut==='en attente')h+='<div style="display:flex;gap:6px;"><button class="admin-btn admin-btn-success" onclick="validerDemandeAdmin('+idx+')">✅</button><button class="admin-btn admin-btn-danger" onclick="refuserDemandeAdmin('+idx+')">❌</button></div>';
        h+='</li>';
    });
    l.innerHTML=h;
}
function validerDemandeAdmin(idx){
    if(!confirm('Valider ?'))return;
    var d=JSON.parse(localStorage.getItem('femmeBiz_demandes')||'[]');
    if(d[idx]){d[idx].statut='validé';localStorage.setItem('femmeBiz_demandes',JSON.stringify(d));
    if(d[idx].besoin==='Premium'){var a=JSON.parse(localStorage.getItem('femmeBiz_abonnees')||'[]');var e=new Date();e.setMonth(e.getMonth()+1);a.push({prenom:d[idx].prenom,nom:d[idx].nom,date:d[idx].date,expiration:e.toLocaleDateString('fr-FR')});localStorage.setItem('femmeBiz_abonnees',JSON.stringify(a));localStorage.setItem('femmeBiz_premium','true');}
    chargerAdmin();}
}
function refuserDemandeAdmin(idx){
    if(!confirm('Refuser ?'))return;
    var d=JSON.parse(localStorage.getItem('femmeBiz_demandes')||'[]');
    if(d[idx]){d[idx].statut='refusé';localStorage.setItem('femmeBiz_demandes',JSON.stringify(d));chargerAdmin();}
}

// ========== AJOUTER PUB (avec badge vérifié) ==========
function ajouterPubliciteAdmin(){
    var n=document.getElementById('pubNom').value.trim();
    var t=document.getElementById('pubTelephone').value.trim();
    var d=document.getElementById('pubDescription').value.trim();
    var loc=document.getElementById('pubLocalisation').value.trim();
    var cat=document.getElementById('pubCategorie').value;
    var typ=document.querySelector('input[name="pubType"]:checked').value;
    var ver=document.getElementById('pubVerifie').checked;
    var ph=[];
    for(var i=1;i<=5;i++){var p=document.getElementById('pubPhoto'+i).value.trim();if(p)ph.push(p);}
    if(!n||!t){alert('⚠️ Nom et téléphone obligatoires.');return;}
    var pubs=JSON.parse(localStorage.getItem('femmeBiz_pubs')||'[]');
    var e=new Date();e.setMonth(e.getMonth()+1);
    pubs.push({id:Date.now(),nom:n,telephone:t,description:d,localisation:loc,categorie:cat,type:typ,photos:ph,verifie:ver,dateAjout:new Date().toLocaleDateString('fr-FR'),dateExpiration:e.toLocaleDateString('fr-FR'),likes:0});
    localStorage.setItem('femmeBiz_pubs',JSON.stringify(pubs));
    document.getElementById('pubNom').value='';document.getElementById('pubTelephone').value='';document.getElementById('pubDescription').value='';document.getElementById('pubLocalisation').value='';document.getElementById('pubVerifie').checked=false;
    for(var i=1;i<=5;i++)document.getElementById('pubPhoto'+i).value='';
    chargerAdmin();alert('✅ Publicité ajoutée !');
}

// ========== LISTE PUBS ==========
function chargerPubsAdmin(){
    var pubs=JSON.parse(localStorage.getItem('femmeBiz_pubs')||'[]');
    var l=document.getElementById('adminPubs');if(!l)return;
    var now=new Date();
    var act=pubs.filter(function(p){var pts=p.dateExpiration.split('/');return new Date(pts[2],pts[1]-1,pts[0])>=now;});
    if(act.length===0){l.innerHTML='<li style="color:#999;">Aucune pub active.</li>';return;}
    var h='';
    act.forEach(function(p){
        var badge=p.type==='grossiste'?'<span class="badge-grossiste">Grossiste</span>':'<span style="color:var(--rose);font-size:10px;">Détaillante</span>';
        if(p.verifie)badge+=' <span class="badge-verifie"><i class="fas fa-check-circle"></i> Vérifié</span>';
        var nb=p.photos?p.photos.length:0;
        h+='<li><div style="flex:1;">'+badge+' <strong>'+p.nom+'</strong><br><small>📞 '+p.telephone+' | 📂 '+p.categorie+' | ❤️ '+(p.likes||0)+' likes</small><br><small>📸 '+nb+' photo(s) | 📅 Exp: '+p.dateExpiration+'</small></div><div style="display:flex;gap:4px;"><button class="admin-btn" onclick="ouvrirModifierPub('+p.id+')">✏️</button><button class="admin-btn admin-btn-danger" onclick="supprimerPubAdmin('+p.id+')">❌</button></div></li>';
    });
    l.innerHTML=h;
}
function supprimerPubAdmin(id){if(!confirm('Supprimer ?'))return;var pubs=JSON.parse(localStorage.getItem('femmeBiz_pubs')||'[]');pubs=pubs.filter(function(p){return p.id!==id;});localStorage.setItem('femmeBiz_pubs',JSON.stringify(pubs));chargerAdmin();}

// ========== MODIFIER PUB ==========
function ouvrirModifierPub(id){
    var pubs=JSON.parse(localStorage.getItem('femmeBiz_pubs')||'[]');
    var p=pubs.find(function(x){return x.id===id;});if(!p)return;
    document.getElementById('modifPubId').value=p.id;document.getElementById('modifPubNom').value=p.nom;document.getElementById('modifPubTelephone').value=p.telephone;document.getElementById('modifPubDescription').value=p.description||'';document.getElementById('modifPubLocalisation').value=p.localisation||'';document.getElementById('modifPubCategorie').value=p.categorie;document.getElementById('modifPubType').value=p.type;
    var elVerifie=document.getElementById('modifPubVerifie');if(elVerifie)elVerifie.checked=p.verifie||false;
    var ph=p.photos||[];for(var i=1;i<=5;i++){var c=document.getElementById('modifPubPhoto'+i);if(c)c.value=ph[i-1]||'';}
    document.getElementById('popupModifierPub').style.display='block';
}
function fermerModifierPub(){document.getElementById('popupModifierPub').style.display='none';}
function sauvegarderModificationPub(){
    var id=parseInt(document.getElementById('modifPubId').value);
    var pubs=JSON.parse(localStorage.getItem('femmeBiz_pubs')||'[]');
    var p=pubs.find(function(x){return x.id===id;});if(!p)return;
    p.nom=document.getElementById('modifPubNom').value.trim();p.telephone=document.getElementById('modifPubTelephone').value.trim();p.description=document.getElementById('modifPubDescription').value.trim();p.localisation=document.getElementById('modifPubLocalisation').value.trim();p.categorie=document.getElementById('modifPubCategorie').value;p.type=document.getElementById('modifPubType').value;
    var elVerifie=document.getElementById('modifPubVerifie');if(elVerifie)p.verifie=elVerifie.checked;
    var ph=[];for(var i=1;i<=5;i++){var c=document.getElementById('modifPubPhoto'+i);if(c&&c.value.trim())ph.push(c.value.trim());}
    p.photos=ph;localStorage.setItem('femmeBiz_pubs',JSON.stringify(pubs));
    fermerModifierPub();chargerAdmin();alert('✅ Pub modifiée !');
}

// ========== PUBS EXPIRÉES ==========
function chargerPubsExpireesAdmin(){
    var pubs=JSON.parse(localStorage.getItem('femmeBiz_pubs')||'[]');
    var l=document.getElementById('adminPubsExpirees');if(!l)return;
    var now=new Date();
    var exp=pubs.filter(function(p){var pts=p.dateExpiration.split('/');return new Date(pts[2],pts[1]-1,pts[0])<now;});
    if(exp.length===0){l.innerHTML='<li style="color:#999;">✅ Aucune pub expirée.</li>';return;}
    var h='';
    exp.forEach(function(p){h+='<li><div style="flex:1;"><strong>'+p.nom+'</strong><br><small>📞 '+p.telephone+' | Exp: '+p.dateExpiration+'</small></div><div style="display:flex;gap:4px;"><button class="admin-btn admin-btn-success" onclick="relancerPub('+p.id+')">🔄</button><button class="admin-btn admin-btn-danger" onclick="supprimerPubAdmin('+p.id+')">❌</button></div></li>';});
    l.innerHTML=h;
}
function relancerPub(id){
    if(!confirm('Renouveler 1 mois ?'))return;
    var pubs=JSON.parse(localStorage.getItem('femmeBiz_pubs')||'[]');
    var p=pubs.find(function(x){return x.id===id;});if(!p)return;
    var e=new Date();e.setMonth(e.getMonth()+1);p.dateExpiration=e.toLocaleDateString('fr-FR');
    localStorage.setItem('femmeBiz_pubs',JSON.stringify(pubs));chargerAdmin();alert('✅ Pub renouvelée !');
}

// ========== CONSEILS ==========
function filtrerConseils(f){chargerConseilsAdmin(f);}
function chargerConseilsAdmin(filtre){
    var c=JSON.parse(localStorage.getItem('femmeBiz_conseils')||'[]');
    var l=document.getElementById('adminConseils');if(!l)return;
    var cf=c;if(filtre!=='tous')cf=c.filter(function(x){return x.secteur===filtre;});
    if(cf.length===0){l.innerHTML='<li style="color:#999;">Aucun conseil.</li>';return;}
    var noms={commercante:'🏪',coiffeuse:'✂️',foyer:'🏠','bien-etre':'🌸'};var h='';
    cf.forEach(function(x){h+='<li><div style="flex:1;"><strong>'+(noms[x.secteur]||'')+' '+x.titre+'</strong><br><small>'+x.contenu.substring(0,80)+'...</small><br><small>📅 '+(x.date||'N/A')+'</small></div><button class="admin-btn admin-btn-danger" onclick="supprimerConseilAdmin('+x.id+')">❌</button></li>';});
    l.innerHTML=h;
}
function ajouterConseilAdmin(){
    var t=document.getElementById('conseilTitre').value.trim();
    var c=document.getElementById('conseilContenu').value.trim();
    var s=document.getElementById('conseilSecteur').value;
    if(!t||!c){alert('⚠️ Remplissez tous les champs.');return;}
    var cons=JSON.parse(localStorage.getItem('femmeBiz_conseils')||'[]');
    cons.push({id:Date.now(),titre:t,contenu:c,secteur:s,date:new Date().toLocaleDateString('fr-FR')});
    localStorage.setItem('femmeBiz_conseils',JSON.stringify(cons));
    document.getElementById('conseilTitre').value='';document.getElementById('conseilContenu').value='';
    chargerConseilsAdmin('tous');alert('✅ Conseil publié !');
}
function supprimerConseilAdmin(id){
    if(!confirm('Supprimer ?'))return;
    var c=JSON.parse(localStorage.getItem('femmeBiz_conseils')||'[]');
    c=c.filter(function(x){return x.id!==id;});
    localStorage.setItem('femmeBiz_conseils',JSON.stringify(c));chargerConseilsAdmin('tous');
}

// ========== ABONNÉES ==========
function chargerAbonneesAdmin(){
    var a=JSON.parse(localStorage.getItem('femmeBiz_abonnees')||'[]');
    var l=document.getElementById('adminAbonnees');if(!l)return;
    if(a.length===0){l.innerHTML='<li style="color:#999;">Aucune abonnée.</li>';return;}
    var h='';a.forEach(function(x){h+='<li><span><strong>'+x.prenom+' '+x.nom+'</strong> — Expire le '+x.expiration+'</span></li>';});
    l.innerHTML=h;
}

// ========== STATS ==========
function chargerStatsAdmin(){
    var p=JSON.parse(localStorage.getItem('femmeBiz_pubs')||'[]');
    var a=JSON.parse(localStorage.getItem('femmeBiz_abonnees')||'[]');
    var r=0;p.forEach(function(x){r+=x.type==='grossiste'?25000:5000;});r+=a.length*5000;
    var sp=document.getElementById('statsPubs'),sa=document.getElementById('statsPremium'),sr=document.getElementById('statsRevenu');
    if(sp)sp.textContent=p.length;if(sa)sa.textContent=a.length;if(sr)sr.textContent=r.toLocaleString()+' FC';
}

// ========== EXPORT ==========
function exporterDonnees(){
    var d={pubs:JSON.parse(localStorage.getItem('femmeBiz_pubs')||'[]'),abonnees:JSON.parse(localStorage.getItem('femmeBiz_abonnees')||'[]'),demandes:JSON.parse(localStorage.getItem('femmeBiz_demandes')||'[]'),conseils:JSON.parse(localStorage.getItem('femmeBiz_conseils')||'[]'),likes:JSON.parse(localStorage.getItem('femmeBiz_likes')||'{}'),dateExport:new Date().toLocaleDateString('fr-FR')};
    var b=new Blob([JSON.stringify(d,null,2)],{type:'application/json'});
    var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='FemmeBiz_'+new Date().toLocaleDateString('fr-FR').replace(/\//g,'-')+'.json';
    document.body.appendChild(a);a.click();document.body.removeChild(a);alert('✅ Données exportées !');
}

// ========== RÉINITIALISER ==========
function reinitialiserDonnees(){
    var c=prompt('⚠️ IRRÉVERSIBLE ! Tapez "SUPPRIMER" :');
    if(c==='SUPPRIMER'){localStorage.removeItem('femmeBiz_pubs');localStorage.removeItem('femmeBiz_abonnees');localStorage.removeItem('femmeBiz_demandes');localStorage.removeItem('femmeBiz_conseils');localStorage.removeItem('femmeBiz_likes');localStorage.removeItem('femmeBiz_userLikes');chargerAdmin();alert('✅ Données effacées.');}
    else if(c!==null){alert('❌ Annulé.');}
}