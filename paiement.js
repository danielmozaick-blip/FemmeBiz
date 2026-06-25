// ============================================================
// PAIEMENT.JS – FEMMEBIZ
// Système de paiement Premium et Publicité
// WhatsApp contact : 0997764989
// WhatsApp paiement : Airtel 0993636691 / Orange 0847764989
// ============================================================

// ---------- CHOISIR L'OPÉRATEUR ----------
function choisirOperateur(op, type) {
    const container = document.getElementById('instructionsPaiement');
    if (!container) return;

    document.querySelectorAll('.operateur-btn').forEach(btn => btn.classList.remove('actif'));
    event.target.closest('.operateur-btn').classList.add('actif');

    const numeroAirtel = '0993636691';
    const numeroOrange = '0847764989';
    const montant = type === 'grossiste' ? '25 000 FC' : '5 000 FC';
    const montantNum = type === 'grossiste' ? 25000 : 5000;
    const motif = type === 'grossiste' ? 'FEMMEBIZ GROSSISTE' : 'FEMMEBIZ PREMIUM';

    let html = '';

    if (op === 'airtel') {
        html = `
            <h4><i class="fas fa-phone" style="color: #E21A26;"></i> 📱 Airtel Money</h4>
            <ol>
                <li>Composez le <strong>*501#</strong></li>
                <li>Sélectionnez <strong>"Envoyer argent"</strong></li>
                <li>Entrez le numéro : <strong>${numeroAirtel}</strong></li>
                <li>Entrez le montant : <strong>${montant}</strong></li>
                <li>Motif : <strong>${motif} + Votre nom</strong></li>
                <li>Validez avec votre <strong>code PIN</strong></li>
            </ol>
            <div class="numero-compte">📞 ${numeroAirtel}</div>
            <div class="capture-ecran">
                📸 <strong>Important :</strong> Après avoir effectué votre paiement, prenez une capture d'écran et envoyez-la sur WhatsApp lors de la confirmation.
            </div>
        `;
    } else if (op === 'orange') {
        html = `
            <h4><i class="fas fa-phone" style="color: #FF6600;"></i> 📱 Orange Money</h4>
            <ol>
                <li>Composez le <strong>*144#</strong></li>
                <li>Sélectionnez <strong>"Transfert d'argent"</strong></li>
                <li>Entrez le numéro : <strong>${numeroOrange}</strong></li>
                <li>Entrez le montant : <strong>${montant}</strong></li>
                <li>Motif : <strong>${motif} + Votre nom</strong></li>
                <li>Validez avec votre <strong>code PIN</strong></li>
            </ol>
            <div class="numero-compte">📞 ${numeroOrange}</div>
            <div class="capture-ecran">
                📸 <strong>Important :</strong> Après avoir effectué votre paiement, prenez une capture d'écran et envoyez-la sur WhatsApp lors de la confirmation.
            </div>
        `;
    }

    container.innerHTML = html;
    container.style.display = 'block';
    localStorage.setItem('femmeBiz_operateur', op);
    localStorage.setItem('femmeBiz_type_paiement', type);
    localStorage.setItem('femmeBiz_montant_paiement', montantNum);
}

// ---------- CONFIRMER LE PAIEMENT PREMIUM ----------
function confirmerPaiementPremium() {
    const nom = document.getElementById('nomPaiement')?.value.trim();
    const prenom = document.getElementById('prenomPaiement')?.value.trim();
    const sexe = document.querySelector('input[name="sexe"]:checked')?.value || 'Féminin';
    const besoin = document.querySelector('input[name="besoin"]:checked')?.value || 'Premium';

    if (!nom || !prenom) {
        alert('⚠️ Veuillez entrer votre prénom et votre nom.');
        return;
    }

    const date = new Date().toLocaleDateString('fr-FR');
    const operateur = localStorage.getItem('femmeBiz_operateur') || 'Airtel Money';
    const montant = besoin === 'Grossiste' ? '25 000 FC' : '5 000 FC';

    const message = `Bonjour FemmeBiz ! 👋%0A%0A` +
        `Je confirme avoir effectué un paiement.%0A%0A` +
        `👤 Prénom : *${prenom}*%0A` +
        `👤 Nom : *${nom}*%0A` +
        `🚻 Sexe : ${sexe}%0A` +
        `📅 Date : ${date}%0A` +
        `📦 Besoin : *${besoin}*%0A` +
        `💰 Montant payé : *${montant}*%0A` +
        `📱 Opérateur : ${operateur}%0A%0A` +
        `📸 Je joins ma capture d'écran de paiement.%0A%0A` +
        `Merci de valider ma demande ! 🙏`;

    window.open('https://wa.me/243997764989?text=' + message, '_blank');

    const demandes = JSON.parse(localStorage.getItem('femmeBiz_demandes') || '[]');
    demandes.push({
        id: Date.now(),
        prenom: prenom,
        nom: nom,
        sexe: sexe,
        date: date,
        besoin: besoin,
        montant: montant,
        operateur: operateur,
        statut: 'en attente'
    });
    localStorage.setItem('femmeBiz_demandes', JSON.stringify(demandes));

    alert('✅ Votre confirmation a été envoyée sur WhatsApp !\n\nNous vérifierons votre paiement et vous répondrons rapidement.');
}

// ---------- CONFIRMER LE PAIEMENT PUBLICITÉ ----------
function confirmerPaiementPub() {
    const nom = document.getElementById('nomPubPaiement')?.value.trim();
    const prenom = document.getElementById('prenomPubPaiement')?.value.trim();
    const sexe = document.querySelector('input[name="sexePub"]:checked')?.value || 'Féminin';
    const typePub = document.querySelector('input[name="typePub"]:checked')?.value || 'Détaillante';
    const categorie = document.getElementById('categoriePub')?.value || 'commercante';

    if (!nom || !prenom) {
        alert('⚠️ Veuillez entrer votre prénom et votre nom.');
        return;
    }

    const date = new Date().toLocaleDateString('fr-FR');
    const operateur = localStorage.getItem('femmeBiz_operateur') || 'Airtel Money';
    const montant = typePub === 'Grossiste' ? '25 000 FC' : '5 000 FC';

    const message = `Bonjour FemmeBiz ! 👋%0A%0A` +
        `Je confirme avoir effectué un paiement pour une publicité.%0A%0A` +
        `👤 Prénom : *${prenom}*%0A` +
        `👤 Nom : *${nom}*%0A` +
        `🚻 Sexe : ${sexe}%0A` +
        `📅 Date : ${date}%0A` +
        `📦 Type : *${typePub}*%0A` +
        `📂 Catégorie : ${categorie}%0A` +
        `💰 Montant payé : *${montant}*%0A` +
        `📱 Opérateur : ${operateur}%0A%0A` +
        `📸 Je joins ma capture d'écran de paiement.%0A%0A` +
        `Merci de mettre ma publicité en ligne ! 🙏`;

    window.open('https://wa.me/243847764989?text=' + message, '_blank');

    const demandes = JSON.parse(localStorage.getItem('femmeBiz_demandes') || '[]');
    demandes.push({
        id: Date.now(),
        prenom: prenom,
        nom: nom,
        sexe: sexe,
        date: date,
        besoin: 'Publicité ' + typePub,
        categorie: categorie,
        montant: montant,
        operateur: operateur,
        statut: 'en attente'
    });
    localStorage.setItem('femmeBiz_demandes', JSON.stringify(demandes));

    alert('✅ Votre confirmation a été envoyée sur WhatsApp !\n\nNous vérifierons votre paiement et mettrons votre publicité en ligne rapidement.');
}

// ---------- CONTACTER FEMMEBIZ ----------
function contacterFemmeBiz(sujet) {
    const message = `Bonjour FemmeBiz ! 👋%0A%0A` +
        `Je suis intéressée par : *${sujet}*.%0A%0A` +
        `Merci de me donner plus d'informations.`;

    window.open('https://wa.me/243847764989?text=' + message, '_blank');
}