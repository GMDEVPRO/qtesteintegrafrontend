// ============ CONFIGURAÇÃO (edite aqui) ============
// E-mail que recebe os cadastros quando não há FORM_ENDPOINT.
var EMAIL = 'guymartialdjoumessi@gmail.com';
// Endereço de um serviço de formulários (ex.: Formspree: https://formspree.io/f/xxxxxxx).
// Com ele, o cadastro chega no seu e-mail sem o visitante sair da página.
// Vazio ('') = modo simples: abre o e-mail do visitante com os dados prontos.
var FORM_ENDPOINT = '';
// ===================================================

var form = document.getElementById('cadastro-form');
var statusEl = document.getElementById('cadastro-status');
var okBox = document.getElementById('cadastro-ok');
var okMsg = document.getElementById('cadastro-ok-msg');

// Se o visitante veio do botão "Solicitar" de um pacote, já deixa esse pacote selecionado.
var interesse = new URLSearchParams(window.location.search).get('interesse');
if (interesse) {
  var campo = form.querySelector('[name=interesse]');
  Array.prototype.forEach.call(campo.options, function (o) { if (o.value === interesse) { campo.value = interesse; } });
}

function mostrarStatus(texto, tipo) { statusEl.textContent = texto; statusEl.className = 'form-status ' + (tipo || ''); }
function concluir(msg) {
  form.hidden = true;
  if (msg) { okMsg.textContent = msg; }
  okBox.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var dados = new FormData(form);
  if (dados.get('_gotcha')) { return; }                    // proteção contra robôs

  if (FORM_ENDPOINT) {
    mostrarStatus('Enviando...', '');
    fetch(FORM_ENDPOINT, { method: 'POST', body: dados, headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) { throw new Error('falha'); } concluir(); })
      .catch(function () { mostrarStatus('Não foi possível enviar agora. Tente de novo ou chame no WhatsApp.', 'err'); });
  } else {
    var corpo = 'Nome: ' + dados.get('nome') + '\nE-mail: ' + dados.get('email') +
      '\nWhatsApp: ' + dados.get('telefone') + '\nEmpresa: ' + dados.get('empresa') +
      '\nProvedor: ' + dados.get('provedor') + '\nInteresse: ' + dados.get('interesse') +
      '\n\n' + (dados.get('mensagem') || '');
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Cadastro pelo site - ' + dados.get('empresa')) + '&body=' + encodeURIComponent(corpo);
    concluir('Abrimos o seu programa de e-mail com os dados prontos. Envie a mensagem para finalizar. Se nada abriu, escreva para ' + EMAIL + ' ou chame no WhatsApp.');
  }
});
