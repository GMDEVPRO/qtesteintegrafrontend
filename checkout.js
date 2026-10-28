// ============ CONFIGURAÇÃO DO CHECKOUT (edite aqui) ============
var CONFIG = {
  // Valor exibido na página. Exemplo: 'R$ 1.500,00'. Vazio = "Valor a definir".
  PRICE: '',
  // Link de pagamento criado no seu provedor (Mercado Pago, Stripe, Pagar.me, Asaas...).
  // Exemplo: 'https://buy.stripe.com/xxxxxxxx'. Vazio = página em modo demonstração.
  PAYMENT_LINK: '',
  // (Opcional) Endereço de um serviço de formulários (ex.: Formspree) para receber os dados
  // do cliente por e-mail antes de ir para o pagamento. Vazio = não envia.
  FORM_ENDPOINT: ''
};
// ===============================================================

var form = document.getElementById('checkout-form');
var statusEl = document.getElementById('checkout-status');
var banner = document.getElementById('demo-banner');

if (CONFIG.PRICE) { document.getElementById('price').textContent = CONFIG.PRICE; }
if (CONFIG.PAYMENT_LINK && CONFIG.PRICE) { banner.style.display = 'none'; }

function mostrar(texto, tipo) { statusEl.textContent = texto; statusEl.className = 'form-status ' + (tipo || ''); }

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var dados = new FormData(form);
  if (dados.get('_gotcha')) { return; }                    // proteção contra robôs

  if (!CONFIG.PAYMENT_LINK || !CONFIG.PRICE) {
    mostrar('Modo demonstração: defina PRICE e PAYMENT_LINK em checkout.js para ativar o pagamento.', 'err');
    return;
  }

  var ir = function () { window.location.href = CONFIG.PAYMENT_LINK; };

  if (CONFIG.FORM_ENDPOINT) {
    mostrar('Enviando seus dados...', '');
    fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', body: dados, headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) { throw new Error('falha'); } ir(); })
      .catch(function () { mostrar('Não foi possível registrar seus dados. Tente de novo ou fale conosco.', 'err'); });
  } else {
    ir();
  }
});
