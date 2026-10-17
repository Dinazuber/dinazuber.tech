(() => {
  // Colle ici ta clé gratuite Web3Forms (https://web3forms.com : elle t'est envoyée par e-mail).
  const ACCESS_KEY = 'VOTRE_CLE_WEB3FORMS';
  const TO_EMAIL = 'dinazuber05@gmail.com';

  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = form.querySelector('.status');
  const btn = form.querySelector('button[type="submit"]');
  const say = (msg, cls = '') => { status.textContent = msg; status.className = 'status ' + cls; };

  // Écran de remerciement (créé ici, aucun changement de HTML nécessaire)
  const thanks = document.createElement('div');
  thanks.className = 'thanks';
  thanks.setAttribute('role', 'status');
  thanks.hidden = true;
  thanks.innerHTML = '<h3>Merci !</h3><p>Ton message a bien été envoyé. Je te réponds dès que possible.</p>';
  const again = document.createElement('button');
  again.type = 'button';
  again.className = 'again';
  again.textContent = 'Envoyer un autre message';
  thanks.appendChild(again);
  form.appendChild(thanks);
  again.addEventListener('click', () => {
    form.classList.remove('sent'); thanks.hidden = true; say('');
    form.name.focus();
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.botcheck.checked) return;               // anti-spam : champ piège
    if (!form.reportValidity()) return;

    if (ACCESS_KEY.startsWith('VOTRE')) {
      console.warn('contact.js : la clé Web3Forms est manquante (ACCESS_KEY).');
      say('Le formulaire n\u2019est pas encore activé. Écris-moi à ' + TO_EMAIL + '.', 'err');
      return;
    }

    const d = { name: form.name.value.trim(), email: form.email.value.trim(), message: form.message.value.trim() };
    btn.disabled = true; btn.textContent = 'Envoi en cours…'; say('');
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
      if (!res.ok || !json.success) throw new Error(json.message || 'Erreur');
      form.reset();
      form.classList.add('sent'); thanks.hidden = false; again.focus();
    } catch (err) {
      say('L\u2019envoi a échoué. Réessaie, ou écris-moi à ' + TO_EMAIL + '.', 'err');
    } finally { btn.disabled = false; btn.textContent = 'Envoyer le message'; }
  });
})();
