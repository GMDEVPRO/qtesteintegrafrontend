// ============ CONFIGURAÇÃO (edite aqui) ============
// E-mail que recebe as mensagens do formulário quando não há FORM_ENDPOINT.
var EMAIL = 'guymartialdjoumessi@gmail.com';
// Endereço de um serviço de formulários (ex.: Formspree: https://formspree.io/f/xxxxxxx).
// Com ele, a mensagem chega no seu e-mail sem abrir o programa de e-mail do visitante.
// Deixe vazio ('') para usar o modo simples: abre o e-mail do visitante com a mensagem pronta.
var FORM_ENDPOINT = '';
// ===================================================

// 1) Casos de teste: ao tocar (ou apertar Enter) numa etiqueta colorida,
//    mostra a explicação logo abaixo. Funciona no celular e no computador.
document.querySelectorAll('.chip[title]').forEach(function (chip) {
  chip.tabIndex = 0;
  chip.setAttribute('role', 'button');
  var mostrar = function () {
    var caixa = chip.closest('.chips');
    var desc = caixa.querySelector('.chip-desc');
    if (!desc) {
      desc = document.createElement('div');
      desc.className = 'chip-desc';
      caixa.appendChild(desc);
    }
    desc.textContent = chip.title;
  };
  chip.addEventListener('click', mostrar);
  chip.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mostrar(); }
  });
});

// 2) Formulário de contato
var form = document.getElementById('contact-form');
if (form) {
  var statusEl = document.getElementById('form-status');
  var mostrarStatus = function (texto, tipo) { statusEl.textContent = texto; statusEl.className = 'form-status ' + tipo; };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var dados = new FormData(form);
    if (dados.get('_gotcha')) { return; }               // proteção contra robôs
    if (FORM_ENDPOINT) {
      mostrarStatus('Enviando...', '');
      fetch(FORM_ENDPOINT, { method: 'POST', body: dados, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) { throw new Error('falha'); }
          form.reset();
          mostrarStatus('Mensagem enviada! Responderemos por e-mail em breve.', 'ok');
        })
        .catch(function () {
          mostrarStatus('Não foi possível enviar agora. Escreva para ' + EMAIL + ' ou use o WhatsApp.', 'err');
        });
    } else {
      var corpo = 'Nome: ' + dados.get('nome') + '\nE-mail: ' + dados.get('email') +
        '\nEmpresa: ' + dados.get('empresa') + '\nProvedor: ' + dados.get('provedor') +
        '\n\n' + dados.get('mensagem');
      var assunto = 'Contato pelo site - ' + (dados.get('empresa') || dados.get('nome'));
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(assunto) + '&body=' + encodeURIComponent(corpo);
      mostrarStatus('Abrimos o seu programa de e-mail com a mensagem pronta. Se nada abriu, escreva para ' + EMAIL + '.', 'ok');
    }
  });
}

// 3) Animações ao rolar a página (biblioteca AOS)
AOS.init();
