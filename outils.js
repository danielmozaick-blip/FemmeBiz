// ============================================================
// OUTILS.JS – FEMMEBIZ (Partie 1)
// ============================================================

function afficherOutil(id){
    var tous=document.querySelectorAll('.outil-box');
    for(var i=0;i<tous.length;i++)tous[i].style.display='none';
    var outil=document.getElementById('outil-'+id);
    if(outil)outil.style.display='block';
    if(id==='carnet')setTimeout(function(){if(typeof afficherDettes==='function')afficherDettes();},100);
    if(id==='agenda')setTimeout(function(){if(typeof afficherRdvs==='function')afficherRdvs();},100);
    if(id==='recus')setTimeout(function(){if(typeof afficherHistoriqueRecus==='function')afficherHistoriqueRecus();},100);
}

function calculerMarge() {
    const achat = parseFloat(document.getElementById('prixAchat').value);
    const vente = parseFloat(document.getElementById('prixVente').value);
    const transport = parseFloat(document.getElementById('fraisTransport')?.value) || 0;
    const autres = parseFloat(document.getElementById('autresFrais')?.value) || 0;
    const resultat = document.getElementById('resultatMarge');
    if (isNaN(achat) || isNaN(vente) || achat <= 0 || vente <= 0) {
        resultat.innerHTML = '<span style="color: #E74C3C;">⚠️ Veuillez entrer des montants valides.</span>';return;
    }
    const coutTotal = achat + transport + autres;
    const benefice = vente - coutTotal;
    const marge = (benefice / vente) * 100;
    let couleur = benefice >= 0 ? '#2ECC71' : '#E74C3C';
    let statut = benefice >= 0 ? '✅ Bénéfice' : '⚠️ Perte';
    let conseil = benefice >= 0 ? '💡 Pour 10 articles : ' + (benefice * 10).toFixed(0) + ' FC de bénéfice' : '💡 Ajustez votre prix de vente pour être rentable.';
    resultat.innerHTML = '<div style="position:relative;"><button class="btn-fermer" onclick="fermerResultat(\'resultatMarge\')" title="Fermer">✕</button><strong style="color:'+couleur+';font-size:15px;">'+statut+'</strong><br>Coût total : <strong>'+coutTotal.toFixed(0)+' FC</strong><br>Bénéfice net : <strong>'+benefice.toFixed(0)+' FC</strong><br>Marge : <strong>'+marge.toFixed(1)+'%</strong><br><em style="font-size:12px;">'+conseil+'</em><br><span class="btn-partager" onclick="partagerResultat(\'Marge\',\'Bénéfice: '+benefice.toFixed(0)+' FC | Marge: '+marge.toFixed(1)+'%\')"><i class="fas fa-share-alt"></i> Partager</span></div>';
}

function calculerPrixRevient() {
    const achatTotal = parseFloat(document.getElementById('prixAchatTotal').value);
    const quantite = parseFloat(document.getElementById('quantite').value);
    const transport = parseFloat(document.getElementById('fraisTransportRevient')?.value) || 0;
    const margeSouhaitee = parseFloat(document.getElementById('margeSouhaitee')?.value) || 30;
    const resultat = document.getElementById('resultatPrixRevient');
    if (isNaN(achatTotal) || isNaN(quantite) || achatTotal <= 0 || quantite <= 0) {
        resultat.innerHTML = '<span style="color: #E74C3C;">⚠️ Veuillez entrer des valeurs valides.</span>';return;
    }
    const prixRevientUnitaire = (achatTotal + transport) / quantite;
    const prixVenteConseille = prixRevientUnitaire * (1 + margeSouhaitee / 100);
    const beneficeUnitaire = prixVenteConseille - prixRevientUnitaire;
    resultat.innerHTML = '<div style="position:relative;"><button class="btn-fermer" onclick="fermerResultat(\'resultatPrixRevient\')" title="Fermer">✕</button><strong style="color:var(--rose);font-size:15px;">💰 Prix de revient</strong><br>Prix de revient unitaire : <strong>'+prixRevientUnitaire.toFixed(0)+' FC</strong><br>Prix de vente conseillé : <strong style="color:#2ECC71;">'+prixVenteConseille.toFixed(0)+' FC</strong><br>Marge : <strong>'+margeSouhaitee+'%</strong><br>Bénéfice/unité : <strong>'+beneficeUnitaire.toFixed(0)+' FC</strong><br><span class="btn-partager" onclick="partagerResultat(\'Prix de revient\',\'Prix conseillé: '+prixVenteConseille.toFixed(0)+' FC | Bénéfice: '+beneficeUnitaire.toFixed(0)+' FC\')"><i class="fas fa-share-alt"></i> Partager</span></div>';
}

function calculerEpargne() {
    const montantJour = parseFloat(document.getElementById('montantEpargne').value);
    const resultat = document.getElementById('resultatEpargne');
    if (isNaN(montantJour) || montantJour <= 0) {
        resultat.innerHTML = '<span style="color: #E74C3C;">⚠️ Veuillez entrer un montant valide.</span>';return;
    }
    const mois1 = montantJour * 30;const mois6 = montantJour * 180;const an1 = montantJour * 365;
    resultat.innerHTML = '<div style="position:relative;"><button class="btn-fermer" onclick="fermerResultat(\'resultatEpargne\')" title="Fermer">✕</button><strong style="color:var(--vert);font-size:15px;">💰 Projection d\'épargne</strong><br>📅 Dans 1 mois : <strong>'+mois1.toFixed(0)+' FC</strong><br>📅 Dans 6 mois : <strong style="color:var(--or);">'+mois6.toFixed(0)+' FC</strong><br>📅 Dans 1 an : <strong style="color:var(--rose);">'+an1.toFixed(0)+' FC</strong><br><em style="font-size:12px;">💡 Chaque jour compte pour votre avenir.</em><br><span class="btn-partager" onclick="partagerResultat(\'Épargne\',\''+montantJour+' FC/jour | 1 an: '+an1.toFixed(0)+' FC\')"><i class="fas fa-share-alt"></i> Partager</span></div>';
}

function calculerPrixGros() {
    const prixLot = parseFloat(document.getElementById('prixLot').value);
    const quantiteLot = parseFloat(document.getElementById('quantiteLot').value);
    const transport = parseFloat(document.getElementById('fraisTransportGros')?.value) || 0;
    const marge = parseFloat(document.getElementById('margeGros')?.value) || 30;
    const resultat = document.getElementById('resultatPrixGros');
    if (isNaN(prixLot) || isNaN(quantiteLot) || prixLot <= 0 || quantiteLot <= 0) {
        resultat.innerHTML = '<span style="color: #E74C3C;">⚠️ Veuillez entrer des valeurs valides.</span>';return;
    }
    const prixUnitaireAchat = (prixLot + transport) / quantiteLot;
    const prixVente = prixUnitaireAchat * (1 + marge / 100);
    const beneficeTotal = (prixVente - prixUnitaireAchat) * quantiteLot;
    resultat.innerHTML = '<div style="position:relative;"><button class="btn-fermer" onclick="fermerResultat(\'resultatPrixGros\')" title="Fermer">✕</button><strong style="color:var(--rose);font-size:15px;">📦 Prix de gros</strong><br>Prix unitaire achat : <strong>'+prixUnitaireAchat.toFixed(0)+' FC</strong><br>Prix vente conseillé : <strong style="color:#2ECC71;">'+prixVente.toFixed(0)+' FC</strong><br>Bénéfice total si tout vendu : <strong>'+beneficeTotal.toFixed(0)+' FC</strong><br><span class="btn-partager" onclick="partagerResultat(\'Prix de gros\',\'Vendez à '+prixVente.toFixed(0)+' FC | Bénéfice: '+beneficeTotal.toFixed(0)+' FC\')"><i class="fas fa-share-alt"></i> Partager</span></div>';
}

function convertirDollar() {
    const fc = parseFloat(document.getElementById('montantFC').value);
    const taux = parseFloat(document.getElementById('tauxDollar').value) || 2800;
    const resultat = document.getElementById('resultatConvertisseur');
    if (isNaN(fc) || fc <= 0) {
        resultat.innerHTML = '<span style="color: #E74C3C;">⚠️ Veuillez entrer un montant valide.</span>';return;
    }
    const dollars = fc / taux;
    resultat.innerHTML = '<div style="position:relative;"><button class="btn-fermer" onclick="fermerResultat(\'resultatConvertisseur\')" title="Fermer">✕</button><strong style="color:var(--rose);font-size:15px;">💱 Conversion</strong><br><strong>'+fc.toFixed(0)+' FC</strong> = <strong style="color:#2ECC71;">'+dollars.toFixed(2)+' $</strong><br>Taux utilisé : 1$ = '+taux+' FC<br><span class="btn-partager" onclick="partagerResultat(\'Conversion\',\''+fc.toFixed(0)+' FC = '+dollars.toFixed(2)+' $\')"><i class="fas fa-share-alt"></i> Partager</span></div>';
}

function calculerBenefice() {
    const parJour = parseFloat(document.getElementById('beneficeJour').value);
    const resultat = document.getElementById('resultatBenefice');
    if (isNaN(parJour) || parJour <= 0) {
        resultat.innerHTML = '<span style="color: #E74C3C;">⚠️ Veuillez entrer un montant valide.</span>';return;
    }
    const semaine = parJour * 6;const mois = parJour * 26;const an = parJour * 312;
    resultat.innerHTML = '<div style="position:relative;"><button class="btn-fermer" onclick="fermerResultat(\'resultatBenefice\')" title="Fermer">✕</button><strong style="color:var(--vert);font-size:15px;">📅 Projection</strong><br>📅 Par semaine : <strong>'+semaine.toFixed(0)+' FC</strong><br>📅 Par mois : <strong style="color:var(--or);">'+mois.toFixed(0)+' FC</strong><br>📅 Par an : <strong style="color:var(--rose);">'+an.toFixed(0)+' FC</strong><br><span class="btn-partager" onclick="partagerResultat(\'Bénéfice\',\''+parJour+' FC/jour | '+mois.toFixed(0)+' FC/mois | '+an.toFixed(0)+' FC/an\')"><i class="fas fa-share-alt"></i> Partager</span></div>';
}

function calculerCredit() {
    const montant = parseFloat(document.getElementById('montantCredit').value);
    const duree = parseFloat(document.getElementById('dureeCredit').value);
    const resultat = document.getElementById('resultatCredit');
    if (isNaN(montant) || isNaN(duree) || montant <= 0 || duree <= 0) {
        resultat.innerHTML = '<span style="color: #E74C3C;">⚠️ Veuillez entrer des valeurs valides.</span>';return;
    }
    const parMois = montant / duree;const parJour = parMois / 30;
    resultat.innerHTML = '<div style="position:relative;"><button class="btn-fermer" onclick="fermerResultat(\'resultatCredit\')" title="Fermer">✕</button><strong style="color:var(--rose);font-size:15px;">🏦 Remboursement</strong><br>À payer par mois : <strong>'+parMois.toFixed(0)+' FC</strong><br>Soit par jour : <strong>'+parJour.toFixed(0)+' FC</strong><br>Durée : <strong>'+duree+' mois</strong><br><span class="btn-partager" onclick="partagerResultat(\'Crédit\',\''+parMois.toFixed(0)+' FC/mois pendant '+duree+' mois\')"><i class="fas fa-share-alt"></i> Partager</span></div>';
}

function calculerTransport() {
    const fraisTotal = parseFloat(document.getElementById('fraisTransportTotal').value);
    const nbArticles = parseFloat(document.getElementById('nbArticlesTransport').value);
    const resultat = document.getElementById('resultatTransport');
    if (isNaN(fraisTotal) || isNaN(nbArticles) || fraisTotal <= 0 || nbArticles <= 0) {
        resultat.innerHTML = '<span style="color: #E74C3C;">⚠️ Veuillez entrer des valeurs valides.</span>';return;
    }
    const parArticle = fraisTotal / nbArticles;
    resultat.innerHTML = '<div style="position:relative;"><button class="btn-fermer" onclick="fermerResultat(\'resultatTransport\')" title="Fermer">✕</button><strong style="color:var(--rose);font-size:15px;">🚛 Coût de transport</strong><br>Par article : <strong>'+parArticle.toFixed(0)+' FC</strong><br>Total pour '+nbArticles+' articles : <strong>'+fraisTotal.toFixed(0)+' FC</strong><br><em style="font-size:12px;">💡 Ajoutez ce coût à votre prix de vente.</em><br><span class="btn-partager" onclick="partagerResultat(\'Transport\',\''+parArticle.toFixed(0)+' FC/article | Total: '+fraisTotal.toFixed(0)+' FC\')"><i class="fas fa-share-alt"></i> Partager</span></div>';
}
// ============================================================
// OUTILS.JS – FEMMEBIZ (Partie 2)
// Carnet, Agenda, Reçus (sans téléchargement)
// ============================================================

// ---------- 9. CARNET DE CRÉDIT ----------
let dettes = JSON.parse(localStorage.getItem('femmeBiz_dettes') || '[]');

function afficherDettes() {
    const liste = document.getElementById('listeDettes');
    const totalEl = document.getElementById('totalDettes');
    if (!liste || !totalEl) return;
    const dettesNonPayees = dettes.filter(d => !d.payee);
    const total = dettesNonPayees.reduce((s, d) => s + d.montant, 0);
    if (dettesNonPayees.length === 0) {
        liste.innerHTML = '<p style="color: var(--gris-fonce);"><em>Aucune dette en attente.</em></p>';
    } else {
        let html = '<table class="dette-table"><thead><tr><th>Nom</th><th>Date</th><th>Montant</th><th></th></tr></thead><tbody>';
        dettesNonPayees.forEach(d => {
            html += '<tr><td><strong>' + d.nom + '</strong></td><td>' + d.date + '</td><td>' + d.montant.toFixed(0) + ' FC</td><td><button class="btn-payer" onclick="payerDette(' + d.id + ')">Payée</button></td></tr>';
        });
        html += '</tbody></table>';
        liste.innerHTML = html;
    }
    totalEl.textContent = 'Total dû : ' + total.toFixed(0) + ' FC';
}

function ajouterDette() {
    const nom = document.getElementById('nomClient').value.trim();
    const montant = parseFloat(document.getElementById('montantDette').value);
    if (!nom || isNaN(montant) || montant <= 0) { alert('⚠️ Veuillez entrer un nom et un montant valides.'); return; }
    const estPremium = localStorage.getItem('femmeBiz_premium') === 'true';
    const dettesNonPayees = dettes.filter(d => !d.payee);
    if (!estPremium && dettesNonPayees.length >= 3) { alert('⚠️ Version gratuite : 3 clientes maximum.\n\nPassez Premium pour un carnet illimité ! 👑'); return; }
    dettes.push({ id: Date.now(), nom: nom, montant: montant, date: new Date().toLocaleDateString('fr-FR'), payee: false });
    localStorage.setItem('femmeBiz_dettes', JSON.stringify(dettes));
    afficherDettes();
    document.getElementById('nomClient').value = '';
    document.getElementById('montantDette').value = '';
}

function payerDette(id) {
    const dette = dettes.find(d => d.id === id);
    if (dette) { dette.payee = true; localStorage.setItem('femmeBiz_dettes', JSON.stringify(dettes)); afficherDettes(); }
}

// ---------- 10. AGENDA RENDEZ-VOUS ----------
let rdvs = JSON.parse(localStorage.getItem('femmeBiz_rdvs') || '[]');

function afficherRdvs() {
    const liste = document.getElementById('listeRdvs');
    if (!liste) return;
    rdvs.sort((a, b) => new Date(a.date + 'T' + a.heure) - new Date(b.date + 'T' + b.heure));
    if (rdvs.length === 0) { liste.innerHTML = '<p style="color: var(--gris-fonce);"><em>Aucun rendez-vous.</em></p>'; return; }
    let html = '<table class="dette-table"><thead><tr><th>Date</th><th>Heure</th><th>Cliente</th><th>Type</th><th></th></tr></thead><tbody>';
    rdvs.forEach(r => {
        html += '<tr><td>' + r.date + '</td><td>' + r.heure + '</td><td><strong>' + r.nom + '</strong></td><td>' + r.type + '</td><td><button class="btn-payer" onclick="marquerRdvFait(' + r.id + ')" style="margin-right:2px;">Fait</button><button class="btn-payer" style="background:#E74C3C;" onclick="supprimerRdv(' + r.id + ')">✕</button></td></tr>';
    });
    html += '</tbody></table>';
    liste.innerHTML = html;
}

function ajouterRdv() {
    const nom = document.getElementById('rdvNom').value.trim();
    const date = document.getElementById('rdvDate').value;
    const heure = document.getElementById('rdvHeure').value;
    const type = document.getElementById('rdvType').value.trim();
    if (!nom || !date || !heure || !type) { alert('⚠️ Veuillez remplir tous les champs.'); return; }
    rdvs.push({ id: Date.now(), nom: nom, date: date, heure: heure, type: type, fait: false });
    localStorage.setItem('femmeBiz_rdvs', JSON.stringify(rdvs));
    afficherRdvs();
    document.getElementById('rdvNom').value = ''; document.getElementById('rdvDate').value = ''; document.getElementById('rdvHeure').value = ''; document.getElementById('rdvType').value = '';
}

function marquerRdvFait(id) { rdvs = rdvs.filter(r => r.id !== id); localStorage.setItem('femmeBiz_rdvs', JSON.stringify(rdvs)); afficherRdvs(); }
function supprimerRdv(id) { rdvs = rdvs.filter(r => r.id !== id); localStorage.setItem('femmeBiz_rdvs', JSON.stringify(rdvs)); afficherRdvs(); }

// ---------- 11. GÉNÉRATEUR DE REÇUS (SANS TÉLÉCHARGEMENT) ----------
let recus = JSON.parse(localStorage.getItem('femmeBiz_recus') || '[]');

function afficherHistoriqueRecus() {
    const container = document.getElementById('historiqueRecus');
    if (!container) return;
    if (recus.length === 0) { container.innerHTML = '<p style="color: var(--gris-fonce); font-size: 12px;"><em>Aucun reçu sauvegardé.</em></p>'; return; }
    let html = '';
    recus.slice().reverse().forEach((r) => {
        html += '<div style="background: var(--gris-clair); border-radius: 8px; padding: 8px 10px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 11px;">';
        html += '<span>📅 ' + r.date + ' | ' + r.client + ' | ' + r.montant + ' FC</span>';
        html += '<button class="btn-payer" style="background:#E74C3C; padding:2px 8px;" onclick="supprimerRecu(' + r.id + ')">✕</button>';
        html += '</div>';
    });
    const estPremium = localStorage.getItem('femmeBiz_premium') === 'true';
    const limite = estPremium ? 'illimité' : 5;
    const restant = estPremium ? 'illimité' : Math.max(0, 5 - recus.length);
    html += '<p style="font-size: 10px; color: var(--gris-fonce); margin-top: 4px;">💡 ' + recus.length + '/' + limite + ' reçus utilisés' + (estPremium ? ' (Premium)' : ' - ' + restant + ' restant(s)') + '</p>';
    container.innerHTML = html;
}

function partagerRecuWhatsApp(vendeur, client, montant, motif, date) {
    var message = '%F0%9F%93%9D%20*RE%C3%87U%20DE%20PAIEMENT*%0A%0A' +
        '%F0%9F%8F%AA%20*FemmeBiz*%0A%0A' +
        '%F0%9F%91%A4%20*Re%C3%A7u%20de%20:*%20' + encodeURIComponent(vendeur) + '%0A' +
        '%F0%9F%91%A4%20*Pour%20:*%20' + encodeURIComponent(client) + '%0A' +
        '%F0%9F%92%B0%20*Montant%20:*%20' + montant + '%20FC%0A' +
        '%F0%9F%93%9D%20*Motif%20:*%20' + encodeURIComponent(motif) + '%0A' +
        '%F0%9F%93%85%20*Date%20:*%20' + date + '%0A%0A' +
        '%E2%9C%A8%20_G%C3%A9n%C3%A9r%C3%A9%20par%20FemmeBiz_';
    window.open('https://wa.me/?text=' + message, '_blank');
}

function genererRecu() {
    const vendeur = document.getElementById('recuVendeur').value.trim();
    const tel = document.getElementById('recuTel').value.trim();
    const client = document.getElementById('recuClient').value.trim();
    const montant = parseFloat(document.getElementById('recuMontant').value);
    const motif = document.getElementById('recuMotif').value.trim();
    const resultat = document.getElementById('resultatRecu');
    const contenu = document.getElementById('contenuRecu');

    if (!vendeur || !tel || !client || isNaN(montant) || montant <= 0 || !motif) {
        alert('⚠️ Veuillez remplir tous les champs.');
        return;
    }

    const estPremium = localStorage.getItem('femmeBiz_premium') === 'true';
    if (!estPremium && recus.length >= 5) {
        alert('⚠️ Vous avez atteint la limite de 5 reçus gratuits.\n\nPassez Premium pour des reçus illimités ! 👑');
        return;
    }

    const date = new Date().toLocaleDateString('fr-FR');
    const heure = new Date().toLocaleTimeString('fr-FR');
    const idRecu = Date.now();

    recus.push({ id: idRecu, date: date, client: client, montant: montant.toFixed(0), vendeur: vendeur, motif: motif });
    localStorage.setItem('femmeBiz_recus', JSON.stringify(recus));

    const recuHTML = `
        <div style="background: white; border: 2px dashed var(--rose); border-radius: 12px; padding: 16px; text-align: center;">
            <h3 style="color: var(--rose); margin-bottom: 8px;">📝 REÇU DE PAIEMENT</h3>
            <p style="font-weight: 700; color: var(--noir);">FemmeBiz</p>
            <hr style="border: 1px dashed #ccc; margin: 8px 0;">
            <p><strong>Reçu de :</strong> ${vendeur}</p>
            <p><strong>Tél :</strong> ${tel}</p>
            <p><strong>Pour :</strong> ${client}</p>
            <p><strong>Montant :</strong> <span style="color: var(--rose); font-size: 18px; font-weight: 700;">${montant.toFixed(0)} FC</span></p>
            <p><strong>Motif :</strong> ${motif}</p>
            <hr style="border: 1px dashed #ccc; margin: 8px 0;">
            <p style="font-size: 11px;">Date : ${date} à ${heure}</p>
            <p style="font-size: 10px; color: #999;">Reçu généré par FemmeBiz</p>
        </div>
    `;

    contenu.innerHTML = recuHTML;
    resultat.style.display = 'block';

    contenu.innerHTML += `
        <div style="text-align: center; margin-top: 10px;">
            <button onclick="partagerRecuWhatsApp('${vendeur.replace(/'/g, "\\'")}', '${client.replace(/'/g, "\\'")}', '${montant.toFixed(0)}', '${motif.replace(/'/g, "\\'")}', '${date}')" 
                style="background: #25D366; color: white; border: none; padding: 10px 20px; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer;">
                <i class="fab fa-whatsapp"></i> Partager sur WhatsApp
            </button>
        </div>
    `;

    afficherHistoriqueRecus();
}

function supprimerRecu(id) {
    if (!confirm('Supprimer ce reçu ?')) return;
    recus = recus.filter(r => r.id !== id);
    localStorage.setItem('femmeBiz_recus', JSON.stringify(recus));
    afficherHistoriqueRecus();
}

// ---------- FONCTIONS COMMUNES ----------
function fermerResultat(id) {
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = '<em>Remplissez les champs et cliquez sur Calculer.</em>';
        if (id === 'resultatRecu') el.style.display = 'none';
    }
}

function partagerResultat(type, details) {
    const message = '📊 FemmeBiz - ' + type + '%0A%0A' + details + '%0A%0A✨ Faites vos calculs sur FemmeBiz !';
    window.open('https://wa.me/?text=' + message, '_blank');
}

// ---------- INITIALISATION ----------
document.addEventListener('DOMContentLoaded', function() {
    afficherDettes();
    afficherRdvs();
    afficherHistoriqueRecus();
});