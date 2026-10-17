(() => {
  // 1) Crée ta clé gratuite sur https://web3forms.com (elle t'est envoyée par e-mail) et colle-la ici.
  //    Tant que la clé n'est pas remplacée, le formulaire ouvre simplement ton application e-mail.
  const ACCESS_KEY = 'VOTRE_CLE_WEB3FORMS';
  const TO_EMAIL = 'dinazuber05@gmail.com';

  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = form.querySelector('.status');
  const btn = form.querySelector('button');
  const say = (msg, cls = '') => { status.textContent = msg; status.className = 'status ' + cls; };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.botcheck.checked) return;               // anti-spam : champ piège
    if (!form.reportValidity()) return;
    const d = { name: form.name.value.trim(), email: form.email.value.trim(), message: form.message.value.trim() };

    // Mode de secours : pas de clé configurée → ouverture de l'application e-mail
    if (ACCESS_KEY.startsWith('VOTRE')) {
      const subject = encodeURIComponent('Message depuis ton site – ' + d.name);
      const body = encodeURIComponent(d.message + '\n\n' + d.name + ' (' + d.email + ')');
      location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
      say('Ton application e-mail va s\u2019ouvrir pour envoyer le message.', 'ok');
      return;
    }

    btn.disabled = true; say('Envoi en cours…');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY, subject: 'Nouveau message depuis ton site CV',
          from_name: 'Site CV', name: d.name, email: d.email, message: d.message, botcheck: ''
        })
      });
      const json = await res.json();
      if (res.ok && json.success) { form.reset(); say('Merci ! Ton message a bien été envoyé.', 'ok'); }
      else throw new Error(json.message || 'Erreur');
    } catch (err) {
      say('L\u2019envoi a échoué. Écris-moi directement à ' + TO_EMAIL + '.', 'err');
    } finally { btn.disabled = false; }
  });
})();
