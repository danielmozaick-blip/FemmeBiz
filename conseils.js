// ============================================================
// CONSEILS.JS – FEMMEBIZ
// 20 conseils de base + conseils admin
// ============================================================

const conseilsData = [
    { id: 1, secteur: 'commercante', titre: '💰 Fixez vos prix intelligemment', contenu: 'Pour fixer un prix juste, additionnez votre prix d\'achat, vos frais (transport, électricité) et votre bénéfice souhaité (30% minimum). Exemple : achat 10 000 FC + frais 2 000 FC = 12 000 FC + 30% = 15 600 FC.' },
    { id: 2, secteur: 'commercante', titre: '📦 Achetez en gros', contenu: 'Acheter en grande quantité réduit vos coûts unitaires. Regroupez-vous avec d\'autres commerçantes pour acheter ensemble et bénéficier de prix de gros.' },
    { id: 3, secteur: 'commercante', titre: '🤝 Fidélisez vos clientes', contenu: 'Offrez des réductions de 5% à vos clientes régulières. Proposez un système de points : pour 10 achats, 1 gratuit. Elles reviendront !' },
    { id: 4, secteur: 'commercante', titre: '📝 Notez vos ventes chaque jour', contenu: 'Tenez un petit carnet (ou utilisez FemmeBiz) pour noter chaque vente. Cela vous aide à savoir ce qui marche et à ajuster vos stocks.' },
    { id: 5, secteur: 'commercante', titre: '🤝 Négociez avec vos fournisseurs', contenu: 'N\'ayez pas peur de négocier. Demandez des remises pour les commandes importantes ou pour les paiements en espèces.' },
    { id: 6, secteur: 'coiffeuse', titre: '⏱️ Calculez votre temps', contenu: 'Pour fixer vos prix, calculez le temps passé (2h de tresses = 10 000 FC de main-d\'œuvre) + le coût des produits (mèches, huile, etc.). Ajoutez 20% de bénéfice.' },
    { id: 7, secteur: 'coiffeuse', titre: '🎁 Proposez des forfaits', contenu: 'Attirez plus de clientes avec des forfaits : "Tresses + Soin capillaire" à prix réduit. Les clientes aiment les offres groupées.' },
    { id: 8, secteur: 'coiffeuse', titre: '🔧 Entretenez vos outils', contenu: 'Nettoyez vos ciseaux et peignes après chaque cliente. Cela prolonge leur durée de vie et assure un service de qualité.' },
    { id: 9, secteur: 'coiffeuse', titre: '👂 Écoutez vos clientes', contenu: 'Demandez à vos clientes ce qu\'elles aiment et ce qu\'elles aimeraient améliorer. Une cliente écoutée est une cliente fidèle.' },
    { id: 10, secteur: 'coiffeuse', titre: '💆 Offrez un petit plus', contenu: 'Ajoutez un petit massage du cuir chevelu ou un soin express à la fin de la prestation. Cela fait la différence !' },
    { id: 11, secteur: 'foyer', titre: '📊 Établissez un budget mensuel', contenu: 'Listez vos revenus (salaire, petits commerces) et vos dépenses (alimentation, loyer, électricité). Fixez des limites pour chaque poste et respectez-les.' },
    { id: 12, secteur: 'foyer', titre: '📝 Suivez vos dépenses', contenu: 'Notez chaque dépense, même les petites (biscuit, transport). Au bout du mois, vous saurez où part votre argent.' },
    { id: 13, secteur: 'foyer', titre: '💰 Épargnez 10%', contenu: 'Dès que vous recevez un revenu, mettez 10% de côté. Ne touchez pas à cette épargne sauf en cas d\'urgence.' },
    { id: 14, secteur: 'foyer', titre: '🛒 Achetez en promotion', contenu: 'Repérez les promotions sur les produits de base (riz, huile, savon). Achetez en quantité raisonnable pour économiser sur le long terme.' },
    { id: 15, secteur: 'foyer', titre: '🚫 Réduisez les dépenses inutiles', contenu: 'Identifiez ce qui n\'est pas essentiel (snacks, habits). Remplacez par des alternatives moins coûteuses (cuisine maison, vêtements de seconde main).' },
    { id: 16, secteur: 'bien-etre', titre: '💧 Buvez de l\'eau régulièrement', contenu: 'Buvez au moins 1,5 litre d\'eau par jour. L\'eau hydrate votre peau, améliore votre concentration et votre digestion.' },
    { id: 17, secteur: 'bien-etre', titre: '🍎 Mangez des fruits et légumes', contenu: 'Les fruits et légumes sont riches en vitamines. Essayez d\'en manger à chaque repas. Une alimentation variée renforce votre immunité.' },
    { id: 18, secteur: 'bien-etre', titre: '🌿 Prenez du temps pour vous', contenu: 'Accordez-vous 15 minutes par jour pour faire une activité relaxante (lecture, méditation, musique). Cela réduit le stress et améliore votre humeur.' },
    { id: 19, secteur: 'bien-etre', titre: '🧘 Pratiquez une activité relaxante', contenu: 'Essayez le yoga, la marche, ou simplement respirer profondément. Ces pratiques aident à réduire le stress et à trouver l\'équilibre.' },
    { id: 20, secteur: 'bien-etre', titre: '😴 Dormez suffisamment', contenu: 'Dormez 7 à 8 heures par nuit. Un bon sommeil est essentiel pour votre santé physique et mentale.' }
];

// ---------- AFFICHER LES CONSEILS ----------
function afficherConseils(filtre) {
    const container = document.getElementById('conseilsContainer');
    if (!container) return;

    // Fusionner conseils de base + conseils admin
    const conseilsAdmin = JSON.parse(localStorage.getItem('femmeBiz_conseils') || '[]');
    const tousConseils = conseilsData.concat(conseilsAdmin);

    let conseilsFiltres = tousConseils;
    if (filtre !== 'tous') {
        conseilsFiltres = tousConseils.filter(c => c.secteur === filtre);
    }

    if (conseilsFiltres.length === 0) {
        container.innerHTML = '<p style="color: var(--gris-fonce);"><em>Aucun conseil pour ce secteur.</em></p>';
        return;
    }

    const secteursNoms = {
        'commercante': '💼 Pour les commerçantes',
        'coiffeuse': '✂️ Pour les coiffeuses',
        'foyer': '🏠 Gestion du foyer',
        'bien-etre': '🌿 Bien-être'
    };

    let html = '';

    if (filtre === 'tous') {
        ['commercante', 'coiffeuse', 'foyer', 'bien-etre'].forEach(secteur => {
            const conseils = conseilsFiltres.filter(c => c.secteur === secteur);
            if (conseils.length > 0) {
                html += '<h3 style="margin-top: 24px; color: var(--rose);">' + secteursNoms[secteur] + '</h3>';
                conseils.forEach(c => {
                    html += '<div class="tool-card" style="margin-bottom: 12px;"><h4 style="color: var(--noir);">' + c.titre + '</h4><p style="color: var(--gris-fonce); line-height: 1.6;">' + c.contenu + '</p></div>';
                });
            }
        });
    } else {
        html += '<h3 style="margin-bottom: 16px; color: var(--rose);">' + (secteursNoms[filtre] || 'Conseils') + '</h3>';
        conseilsFiltres.forEach(c => {
            html += '<div class="tool-card" style="margin-bottom: 12px;"><h4 style="color: var(--noir);">' + c.titre + '</h4><p style="color: var(--gris-fonce); line-height: 1.6;">' + c.contenu + '</p></div>';
        });
    }

    container.innerHTML = html;
}

// ---------- INITIALISATION ----------
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('conseilsContainer')) {
        afficherConseils('tous');
    }
});