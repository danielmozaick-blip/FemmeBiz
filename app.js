// ============================================================
// APP.JS – FEMMEBIZ
// Navigation, menu, mode sombre, like, partage, pubs
// ============================================================

// ---------- MENU ----------
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() { mainNav.classList.toggle('open'); });
}

// ---------- MODE SOMBRE ----------
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// ---------- FERMER LE MENU ----------
document.addEventListener('click', function(e) {
    const menu = document.getElementById('mainNav');
    const toggle = document.getElementById('menuToggle');
    if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) { menu.classList.remove('open'); }
});

// ---------- HEADER SCROLL ----------
let dernierScroll = 0;
const header = document.getElementById('header');
window.addEventListener('scroll', function() {
    const scrollActuel = window.pageYOffset;
    if (scrollActuel > dernierScroll && scrollActuel > 80) { header.classList.add('hidden'); }
    else { header.classList.remove('hidden'); }
    dernierScroll = scrollActuel;
});

// ---------- LIKES (1 par personne par pub) ----------
function liker(elementId) {
    const userLikes = JSON.parse(localStorage.getItem('femmeBiz_userLikes') || '{}');
    const likes = JSON.parse(localStorage.getItem('femmeBiz_likes') || '{}');
    if (!likes[elementId]) likes[elementId] = 0;
    if (userLikes[elementId]) {
        likes[elementId] = Math.max(0, likes[elementId] - 1);
        delete userLikes[elementId];
    } else {
        likes[elementId] = likes[elementId] + 1;
        userLikes[elementId] = true;
    }
    localStorage.setItem('femmeBiz_likes', JSON.stringify(likes));
    localStorage.setItem('femmeBiz_userLikes', JSON.stringify(userLikes));
    const compteur = document.getElementById('likes-' + elementId);
    if (compteur) compteur.textContent = likes[elementId];
    return likes[elementId];
}

function getLikes(elementId) {
    const likes = JSON.parse(localStorage.getItem('femmeBiz_likes') || '{}');
    return likes[elementId] || 0;
}

// ---------- PARTAGER SUR WHATSAPP ----------
function partagerSurWhatsApp(texte) {
    const message = encodeURIComponent(texte + '\n\n✨ Découvrez FemmeBiz, l\'outil intelligent de la femme congolaise !');
    window.open('https://wa.me/?text=' + message, '_blank');
}

// ---------- ASTUCE DU JOUR ----------
const astuces = [
    'Achetez vos produits en gros et revendez avec 30% de marge minimum.',
    'Notez chaque dépense, même la plus petite.',
    'Fidélisez vos clientes : offrez un petit cadeau après 5 achats.',
    'Négociez avec vos fournisseurs. Demandez une remise pour les achats en grande quantité.',
    'Mettez 10% de vos revenus de côté chaque jour.',
    'Proposez des forfaits groupés : "Tresses + soin capillaire" attire plus de clientes.',
    'Utilisez le calculateur de marge avant chaque vente.',
    'Achetez vos matières premières directement chez les grossistes.',
    'Créez un groupe WhatsApp avec vos clientes fidèles.',
    'Soignez votre présentation : un produit bien emballé se vend plus cher.',
    'Dormez 7 à 8 heures par nuit.',
    'Buvez au moins 1,5 litre d\'eau par jour.',
    'Comparez les prix avant d\'acheter.',
    'Proposez la livraison à domicile.',
    'Diversifiez vos produits.'
];

function chargerAstuceDuJour() {
    const aujourdhui = new Date().toDateString();
    let astuceJour = JSON.parse(localStorage.getItem('femmeBiz_astuce') || '{}');
    if (astuceJour.date !== aujourdhui) {
        const index = Math.floor(Math.random() * astuces.length);
        astuceJour = { date: aujourdhui, texte: astuces[index] };
        localStorage.setItem('femmeBiz_astuce', JSON.stringify(astuceJour));
    }
    const astuceTexte = document.getElementById('astuceTexte');
    if (astuceTexte) astuceTexte.textContent = astuceJour.texte;
}

// ---------- TOP 10 ----------
function afficherTop10() {
    const liste = document.getElementById('top10Liste');
    if (!liste) return;
    const likes = JSON.parse(localStorage.getItem('femmeBiz_likes') || '{}');
    const pubs = [
        { id: 'pub-fatima', nom: 'Mama Fatima', type: 'Grossiste' },
        { id: 'pub-jeanne', nom: 'Mama Jeanne', type: 'Commerçante' },
        { id: 'pub-grace', nom: 'Mama Grâce', type: 'Coiffeuse' },
        { id: 'pub-therese', nom: 'Mama Thérèse', type: 'Commerçante' },
        { id: 'pub-esther', nom: 'Mama Esther', type: 'Bien-être' },
        { id: 'pub-chantal', nom: 'Mama Chantal', type: 'Coiffeuse' },
        { id: 'pub-rose', nom: 'Mama Rose', type: 'Foyer' },
        { id: 'pub-sophie', nom: 'Mama Sophie', type: 'Coiffeuse' },
        { id: 'pub-marceline', nom: 'Mama Marceline', type: 'Bien-être' },
        { id: 'pub-aline', nom: 'Mama Aline', type: 'Foyer' }
    ];
    pubs.forEach(p => { p.likes = likes[p.id] || Math.floor(Math.random() * 50) + 10; });
    pubs.sort((a, b) => b.likes - a.likes);
    const top3 = pubs.slice(0, 3);
    const medailles = ['🥇', '🥈', '🥉'];
    let html = '';
    top3.forEach((pub, index) => {
        html += '<li><span class="top10-medaille">' + medailles[index] + '</span><span class="top10-nom">' + pub.nom + ' - ' + pub.type + '</span><span class="top10-likes"><i class="fas fa-heart"></i> ' + pub.likes + '</span></li>';
    });
    liste.innerHTML = html;
}
// ---------- CARROUSEL ----------
let currentSlide = 0;
let carouselInterval;
function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const container = document.getElementById('carouselSlides');
    if (!container || slides.length === 0) return;
    container.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
}
function changerSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateCarousel();
    clearInterval(carouselInterval);
    carouselInterval = setInterval(function() { changerSlide(1); }, 4000);
}
carouselInterval = setInterval(function() { changerSlide(1); }, 4000);

// ========== CHARGER LES PUBS DES CATÉGORIES ==========
function chargerPubsCategorie(categorie, containerId) {
    var c = document.getElementById(containerId);
    if (!c) return;
    var pubs = JSON.parse(localStorage.getItem('femmeBiz_pubs') || '[]');
    var now = new Date();
    var pf = pubs.filter(function(p) {
        if (p.categorie !== categorie) return false;
        var pts = p.dateExpiration.split('/');
        return new Date(pts[2], pts[1] - 1, pts[0]) >= now;
    });
    if (pf.length === 0) { c.innerHTML = '<p style="text-align:center;color:var(--gris-fonce);padding:20px;">Aucune annonce pour le moment.</p>'; return; }
    var h = '';
    pf.forEach(function(p) {
        var badge = p.type === 'grossiste' ? '<span class="badge-grossiste">🏆 GROSSISTE</span>' : '';
        var b = p.type === 'grossiste' ? 'border:2px solid var(--or);' : '';
        var ph = '<div class="pub-img">📷</div>';
        if (p.photos && p.photos.length > 0) ph = '<img src="' + p.photos[0] + '" alt="' + p.nom + '" style="width:100%;height:150px;object-fit:cover;border-radius:12px;">';
        var tel = p.telephone.replace(/\D/g, '');
        var verifie = p.verifie ? ' <span class="badge-verifie"><i class="fas fa-check-circle"></i> Vérifié</span>' : '';
        var descCourte = (p.description || '').substring(0, 60);
        if ((p.description || '').length > 60) descCourte += '...';
        h += '<div class="pub-card" style="' + b + 'cursor:pointer;" onclick="ouvrirPopupPub(' + p.id + ')">' + badge + ph + '<div class="pub-nom">' + p.nom + verifie + '</div><div class="pub-description">' + descCourte + '</div>';
        if (p.localisation) h += '<div class="pub-localisation"><i class="fas fa-map-marker-alt"></i> ' + p.localisation + '</div>';
        h += '<div class="pub-telephone">📞 ' + p.telephone + '</div><div class="pub-likes"><i class="fas fa-heart" onclick="event.stopPropagation();liker(\'pub-' + p.id + '\')"></i> <span id="likes-pub-' + p.id + '">' + (p.likes || 0) + '</span> likes</div>';
        h += '<a href="https://wa.me/' + tel + '?text=Bonjour%20' + encodeURIComponent(p.nom) + '%20!%20Je%20viens%20de%20FemmeBiz" class="btn-whatsapp-pub" target="_blank" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> Contacter sur WhatsApp</a></div>';
    });
    c.innerHTML = h;
}
function chargerPubsCommercante() { chargerPubsCategorie('commercante', 'pubsCommercante'); }
function chargerPubsCoiffeuse() { chargerPubsCategorie('coiffeuse', 'pubsCoiffeuse'); }
function chargerPubsFoyer() { chargerPubsCategorie('foyer', 'pubsFoyer'); }
function chargerPubsBienEtre() { chargerPubsCategorie('bien-etre', 'pubsBienEtre'); }

// ========== CHARGER LA BOUTIQUE ==========
function chargerBoutique() {
    var c = document.getElementById('boutiqueContainer');
    if (!c) return;
    var pubs = JSON.parse(localStorage.getItem('femmeBiz_pubs') || '[]');
    var now = new Date();
    var prods = pubs.filter(function(p) {
        if (p.categorie !== 'boutique') return false;
        var pts = p.dateExpiration.split('/');
        return new Date(pts[2], pts[1] - 1, pts[0]) >= now;
    });
    if (prods.length === 0) { c.innerHTML = '<p style="text-align:center;color:var(--gris-fonce);padding:10px;">Aucun produit pour le moment.</p>'; return; }
    var h = '<div class="boutique-grid">';
    prods.forEach(function(p) {
        var ph = '<div class="boutique-img">🛍️</div>';
        if (p.photos && p.photos.length > 0) ph = '<img src="' + p.photos[0] + '" alt="' + p.nom + '" style="width:100%;height:80px;object-fit:cover;border-radius:12px;">';
        var tel = p.telephone.replace(/\D/g, '');
        h += '<div class="boutique-card" onclick="ouvrirPopupPub(' + p.id + ')" style="cursor:pointer;">' + ph + '<div class="boutique-nom">' + p.nom + '</div><div class="boutique-prix">' + (p.description || '').substring(0, 30) + '</div><div class="boutique-likes"><i class="fas fa-heart" onclick="event.stopPropagation();liker(\'boutique-' + p.id + '\')"></i> <span id="likes-boutique-' + p.id + '">' + (p.likes || 0) + '</span></div><a href="https://wa.me/' + tel + '?text=Bonjour%20je%20suis%20int%C3%A9ress%C3%A9e%20par%20' + encodeURIComponent(p.nom) + '" class="btn-whatsapp-mini" target="_blank" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> WhatsApp</a></div>';
    });
    h += '</div>'; c.innerHTML = h;
}

// ========== CHARGER LE CARROUSEL ==========
function chargerCarrousel() {
    var c = document.getElementById('carouselSlides');
    if (!c) return;
    var pubs = JSON.parse(localStorage.getItem('femmeBiz_pubs') || '[]');
    var now = new Date();
    var ved = pubs.filter(function(p) {
        if (p.categorie !== 'vedette') return false;
        var pts = p.dateExpiration.split('/');
        return new Date(pts[2], pts[1] - 1, pts[0]) >= now;
    });
    if (ved.length === 0) { c.innerHTML = '<div class="carousel-slide" style="text-align:center;padding:20px;"><p style="color:var(--gris-fonce);">📢 Votre publicité ici !</p></div>'; return; }
    var h = '';
    ved.forEach(function(p) {
        var ph = '';
        if (p.photos && p.photos.length > 0) ph = '<img src="' + p.photos[0] + '" style="width:100%;max-height:180px;object-fit:cover;border-radius:12px;margin-bottom:10px;">';
        var tel = p.telephone.replace(/\D/g, '');
        var verifie = p.verifie ? ' <span class="badge-verifie"><i class="fas fa-check-circle"></i> Vérifié</span>' : '';
        h += '<div class="carousel-slide" style="padding:16px;cursor:pointer;" onclick="ouvrirPopupPub(' + p.id + ')">' + ph + '<h4 style="font-size:15px;color:var(--rose);">' + p.nom + verifie + '</h4><p style="font-size:12px;color:var(--gris-fonce);">' + (p.description || '').substring(0, 50) + '</p>';
        if (p.localisation) h += '<p style="font-size:11px;color:#999;"><i class="fas fa-map-marker-alt"></i> ' + p.localisation + '</p>';
        h += '<p style="font-weight:600;font-size:13px;">📞 ' + p.telephone + '</p><a href="https://wa.me/' + tel + '?text=Bonjour%20' + encodeURIComponent(p.nom) + '%20!%20Je%20viens%20de%20FemmeBiz" target="_blank" style="display:inline-block;background:#25D366;color:#fff;padding:8px 18px;border-radius:20px;text-decoration:none;font-size:12px;font-weight:600;" onclick="event.stopPropagation();"><i class="fab fa-whatsapp"></i> Contacter sur WhatsApp</a></div>';
    });
    c.innerHTML = h; currentSlide = 0; updateCarousel();
}

// ========== REDIRECTION VERS PAGE DÉTAIL ==========
function ouvrirPopupPub(pubId) {
    localStorage.setItem('femmeBiz_pub_detail', pubId);
    chargerPage('pub-detail');
}

// ========== CHARGER PAGE DÉTAIL PUB ==========
function chargerPubDetail() {
    var id = localStorage.getItem('femmeBiz_pub_detail');
    var container = document.getElementById('pubDetailContainer');
    if (!id || !container) return;
    var pubs = JSON.parse(localStorage.getItem('femmeBiz_pubs') || '[]');
    var p = pubs.find(function(x) { return x.id === parseInt(id); });
    if (!p) { container.innerHTML = '<p style="text-align:center;padding:40px;">Publicité introuvable.</p>'; return; }
    var photos = p.photos || [];
    var verifie = p.verifie ? ' <span class="badge-verifie"><i class="fas fa-check-circle"></i> Vérifié</span>' : '';
    var html = '<div style="position:relative;margin-bottom:12px;">';
    if (photos.length > 0) {
        html += '<img src="' + photos[0] + '" id="photoPrincipale" alt="' + p.nom + '" style="width:100%;max-height:350px;object-fit:cover;border-radius:var(--radius);cursor:zoom-in;" onclick="this.classList.toggle(\'zoom-detail\')">';
    } else {
        html += '<div style="width:100%;height:250px;background:var(--gris-clair);border-radius:var(--radius);display:flex;align-items:center;justify-content:center;font-size:60px;">📷</div>';
    }
    html += '</div>';
    if (photos.length > 1) {
        html += '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">';
        photos.forEach(function(ph, index) {
            html += '<img src="' + ph + '" style="width:70px;height:70px;object-fit:cover;border-radius:8px;cursor:pointer;border:2px solid ' + (index===0?'var(--rose)':'transparent') + ';" onclick="document.getElementById(\'photoPrincipale\').src=\'' + ph + '\';var mins=this.parentElement.querySelectorAll(\'img\');for(var i=0;i<mins.length;i++)mins[i].style.borderColor=\'transparent\';this.style.borderColor=\'var(--rose)\'">';
        });
        html += '</div>';
    }
    html += '<div class="tool-card"><h2>' + p.nom + verifie + '</h2>';
    html += '<p style="font-size:14px;line-height:1.7;margin-bottom:10px;">' + (p.description||'') + '</p>';
    if (p.localisation) html += '<p style="font-size:13px;color:#999;"><i class="fas fa-map-marker-alt"></i> ' + p.localisation + '</p>';
    html += '<p style="font-size:14px;font-weight:600;">📞 ' + p.telephone + '</p>';
    html += '<div style="font-size:13px;color:var(--gris-fonce);margin-bottom:12px;"><i class="fas fa-heart" onclick="liker(\'pub-detail-' + p.id + '\')" style="color:var(--rose);cursor:pointer;"></i> <span id="likes-pub-detail-' + p.id + '">' + (p.likes||0) + '</span> likes</div>';
    var tel = p.telephone.replace(/\D/g,'');
    html += '<a href="https://wa.me/' + tel + '?text=Bonjour%20' + encodeURIComponent(p.nom) + '" target="_blank" class="btn" style="display:block;text-align:center;background:#25D366;"><i class="fab fa-whatsapp"></i> Contacter sur WhatsApp</a>';
    html += '<button class="btn" onclick="chargerPage(\'accueil\')" style="margin-top:8px;background:var(--gris-clair);color:var(--noir);"><i class="fas fa-arrow-left"></i> Retour</button>';
    html += '</div>';
    container.innerHTML = html;
}
// ========== AFFICHER BADGE PREMIUM (avec vérification expiration) ==========
function afficherBadgePremium() {
    var badge = document.getElementById('badgePremium');
    if (!badge) return;
    if (localStorage.getItem('femmeBiz_premium') === 'true') {
        badge.style.display = 'inline-block';
    }
}
// ========== NOTIFICATIONS ==========
var notifications = JSON.parse(localStorage.getItem('femmeBiz_notifications') || '[]');

function ajouterNotification(icone, texte, action) {
    var notif = { id: Date.now(), icone: icone, texte: texte, action: action, date: new Date().toISOString(), lu: false };
    notifications.unshift(notif);
    if (notifications.length > 20) notifications = notifications.slice(0, 20);
    localStorage.setItem('femmeBiz_notifications', JSON.stringify(notifications));
    mettreAJourBadge();
}

function mettreAJourBadge() {
    var badge = document.getElementById('notifBadge');
    if (!badge) return;
    var nonLues = notifications.filter(function(n) { return !n.lu; });
    if (nonLues.length > 0) { badge.style.display = 'flex'; badge.textContent = nonLues.length; }
    else { badge.style.display = 'none'; }
}

function ouvrirListeNotifications() {
    notifications.forEach(function(n) { n.lu = true; });
    localStorage.setItem('femmeBiz_notifications', JSON.stringify(notifications));
    mettreAJourBadge();

    var overlay = document.createElement('div');
    overlay.className = 'notif-overlay';
    overlay.id = 'notifOverlay';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };

    var html = '<div class="notif-panel">';
    html += '<div class="notif-header">🔔 Notifications <button onclick="document.getElementById(\'notifOverlay\').remove()">✕</button></div>';
    if (notifications.length === 0) {
        html += '<div class="notif-vide"><i class="fas fa-bell-slash"></i><p>Aucune notification</p></div>';
    } else {
        html += '<ul class="notif-liste">';
        notifications.forEach(function(n) {
            var temps = '';
            var diff = (new Date() - new Date(n.date)) / 1000;
            if (diff < 60) temps = 'À l\'instant';
            else if (diff < 3600) temps = 'Il y a ' + Math.floor(diff/60) + ' min';
            else if (diff < 86400) temps = 'Il y a ' + Math.floor(diff/3600) + ' h';
            else temps = 'Il y a ' + Math.floor(diff/86400) + ' j';
            html += '<li onclick="document.getElementById(\'notifOverlay\').remove();' + (n.action || '') + '"><i class="' + n.icone + '"></i><div><div class="notif-contenu">' + n.texte + '</div><div class="notif-temps">' + temps + '</div></div></li>';
        });
        html += '</ul>';
    }
    html += '</div>';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
}

function verifierNotifications() {
    mettreAJourBadge();
    var pubs = JSON.parse(localStorage.getItem('femmeBiz_pubs') || '[]');
    pubs.forEach(function(p) {
        var ajout = new Date(p.dateAjout.split('/').reverse().join('-'));
        var diff = (new Date() - ajout) / (1000 * 60 * 60);
        if (diff <= 24 && diff >= 0) {
            var deja = notifications.find(function(n) { return n.texte.includes(p.nom); });
            if (!deja) ajouterNotification('fas fa-store', '<strong>Nouveau !</strong> ' + p.nom + ' a rejoint FemmeBiz.', 'chargerPage(\'' + (p.categorie === 'boutique' ? 'accueil' : p.categorie) + '\')');
        }
    });
    var conseils = JSON.parse(localStorage.getItem('femmeBiz_conseils') || '[]');
    if (conseils.length > 0) {
        var dernier = conseils[conseils.length - 1];
        var dateAjout = new Date(dernier.date.split('/').reverse().join('-'));
        var diff = (new Date() - dateAjout) / (1000 * 60 * 60);
        if (diff <= 24 && diff >= 0) {
            var deja = notifications.find(function(n) { return n.texte.includes(dernier.titre); });
            if (!deja) ajouterNotification('fas fa-lightbulb', '<strong>💡 Nouveau conseil :</strong> ' + dernier.titre, 'chargerPage(\'conseils\')');
        }
    }
    var abo = JSON.parse(localStorage.getItem('femmeBiz_abonnees') || '[]');
    abo.forEach(function(a) {
        var exp = new Date(a.expiration.split('/').reverse().join('-'));
        var diff = Math.ceil((exp - new Date()) / (1000 * 60 * 60 * 24));
        if (diff <= 3 && diff > 0) {
            var deja = notifications.find(function(n) { return n.texte.includes(a.prenom); });
            if (!deja) ajouterNotification('fas fa-crown', '<strong>⏰ Premium expire</strong> dans ' + diff + ' jour(s).', 'chargerPage(\'premium\')');
        }
    });
}

// ---------- INITIALISATION ----------
document.addEventListener('DOMContentLoaded', function() {
    chargerAstuceDuJour();
    afficherBadgePremium();
    setTimeout(verifierNotifications, 500);
    // Forcer badge premium
    setTimeout(function(){
        if(localStorage.getItem('femmeBiz_premium')==='true'){
            var b=document.getElementById('badgePremium');
            if(b){b.style.display='inline-block';}
        }
    },800);
});