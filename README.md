# QTeste Integra – Landing page

Página responsiva (celular, tablet e computador). HTML, CSS e JavaScript puros, sem instalar nada.

## Como abrir
- Dê dois cliques em `index.html` (abre no navegador).
- Para editar, use o VS Code (ou outro editor). Com a extensão "Live Server" a página atualiza sozinha ao salvar.
- Funciona sem internet. Só a fonte Sora (Google Fonts) precisa de conexão; sem ela a página usa Arial.

## Estrutura
```
index.html        textos e estrutura da página
style.css         cores, tamanhos e responsividade
script.js         animações, casos de teste e formulário de contato
cadastro.html     página de cadastro (captura de clientes): destino do botão "Agendar conversa"
cadastro.js       envio do cadastro (EMAIL e FORM_ENDPOINT)
checkout.html     página de contratação do Diagnóstico (opcional)
checkout.css      estilos do checkout
checkout.js       valor, link de pagamento e envio dos dados do checkout
asset1/           imagens (troque aqui as suas fotos)
libs/             AOS (animações) e Font Awesome (ícones), já incluídos
```

## Como trocar as fotos
Todas as imagens ficam em `asset1/`. Salve a sua foto com o **mesmo nome** do arquivo que quer trocar, ou troque o nome dentro do `index.html`.

| Onde aparece | Arquivo | Dica |
|---|---|---|
| Fundo do topo | `asset1/bg.svg` | Imagem larga (ex.: 1920x1000, JPG). Se usar `bg.jpg`, troque `asset1/bg.svg` por `asset1/bg.jpg` no `style.css` (procure `.bg-home::before`). |
| "Sobre" (fotos à esquerda) | `asset1/sobre-1.svg` | No `index.html`, procure `sobre-1.svg`. Pode ser PNG/JPG: troque a extensão no HTML. |
| "Quem está por trás" (fotos à direita) | `asset1/sobre-2.svg` | No `index.html`, procure `sobre-2.svg`. |
| Logotipo (topo, rodapé, cadastro e checkout) | `asset1/logo-qteste.png` | PNG transparente na cor dos botões, feito para fundo escuro. Para trocar, salve o novo logo com o mesmo nome. O tamanho do logo está no fim do `style.css` ("CABEÇALHO"). |
| Botão do WhatsApp | `asset1/whatssapp.svg` | |

Para uma foto que ocupe o espaço corretamente em qualquer tela, use imagens de pelo menos 1000 px de largura e menos de 500 KB.

## O que editar no `index.html`
Cada seção tem um comentário (`<!--SERVICES-->`, `<!--ABOUT 2-->`, `<!--FAQ-->`, `<!--TESTIMONIALS-->`).
- **Contatos:** procure `5511958567231` (WhatsApp) e `guymartialdjoumessi@gmail.com` e troque pelos seus. Troque também os links do LinkedIn e do GitHub nos ícones.
- **Depoimentos:** os 4 cartões em `<!--TESTIMONIALS-->` são espaços reservados. Substitua o texto, o nome e o cargo somente com autorização do cliente.
- **Serviços:** cada pacote é um bloco `<div class="plan">`. Para mudar os casos de teste, edite os `<span class="chip ...">`. As cores indicam a severidade: `c` crítica, `a` alta, `m` média. O texto do atributo `title` aparece ao tocar na etiqueta.
- **Perguntas frequentes:** cada pergunta é um `<details>`.
- **Botão "Solicitar" e "Ver serviços":** os links estão em `href="#..."`. Quando tiver uma página de cadastro ou checkout, troque o `href` do botão por esse endereço.

## Cores
No `style.css`, a cor dos botões é a variável `--btn` (degradê verde-azulado para azul, tirado do símbolo), definida no topo do arquivo. Basta trocar os dois códigos de cor ali. O azul-marinho de fundo é `#06121e`.

## Responsividade
Testada em 360 px (celular), 768 px (tablet), 1024 px (tablet horizontal) e 1440 px (computador). Os ajustes ficam nos blocos `@media` do `style.css`.

## Publicar
Envie a pasta inteira para um serviço de hospedagem estática (Netlify, Vercel, GitHub Pages ou Cloudflare Pages) e aponte o seu domínio.

## Observações
- As fotos atuais são do modelo original (barbearia) e devem ser substituídas pelas suas.
- Não há preços na página, de propósito: o orçamento depende do escopo.
- O formulário de contato não existe nesta versão; o contato é feito por WhatsApp e e-mail.

## Cadastro (captura de clientes)
Todos os botões de agendar conversa, contato e "Solicitar" levam a `cadastro.html` (o "Solicitar" de cada pacote já abre o cadastro com aquele pacote selecionado). Só o botão flutuante e o ícone do WhatsApp continuam abrindo o WhatsApp direto. A página `cadastro.html` é: um formulário curto (nome, e-mail, WhatsApp, empresa, provedor, interesse e mensagem opcional) com consentimento LGPD. Não cria conta nem pede senha. Depois do envio, mostra uma confirmação com um botão para combinar o horário pelo WhatsApp.
Para receber os cadastros direto no e-mail, preencha `FORM_ENDPOINT` em `cadastro.js` (veja a seção seguinte). A seção "Vamos falar da sua integração" no fim da página continua oferecendo WhatsApp e mensagem rápida.

## Contato: papo ou mensagem
A seção "Vamos falar da sua integração" (`id="contato"`) tem dois caminhos:
- **Bater um papo:** botão que abre o WhatsApp com uma mensagem pronta.
- **Deixar uma mensagem:** formulário curto (nome, e-mail, empresa, provedor, mensagem e consentimento LGPD).

Como a mensagem chega até você (no topo do `script.js`):
1. **Modo simples (padrão):** `FORM_ENDPOINT = ''`. O formulário abre o programa de e-mail do visitante com a mensagem pronta para `EMAIL`. Funciona sem servidor, mas depende de o visitante ter um programa de e-mail configurado.
2. **Modo recomendado:** crie um formulário gratuito em um serviço como o Formspree, copie o endereço (algo como `https://formspree.io/f/xxxxxxx`) e cole em `FORM_ENDPOINT`. A mensagem chega direto no seu e-mail e o visitante não sai da página.

## Checkout do Diagnóstico (opcional)
`checkout.html` é a página para vender o Diagnóstico de Integração online. Ela **não está ligada ao site** de propósito, para você decidir quando ativar. Fica em modo demonstração (aviso no topo) até você configurar `checkout.js`:
1. `PRICE`: o valor, por exemplo `'R$ 1.500,00'`.
2. `PAYMENT_LINK`: link de pagamento criado no seu provedor (Mercado Pago, Stripe, Pagar.me, Asaas etc.). Lá o cliente escolhe Pix, cartão ou boleto.
3. `FORM_ENDPOINT` (opcional): recebe por e-mail os dados do cliente (inclusive CNPJ/CPF para a nota fiscal) antes de ir ao pagamento.

Para ligar o checkout ao site, siga o comentário `CHECKOUT` no `index.html`, no cartão do Diagnóstico.

Antes de ativar, confira com o seu contador: nota fiscal, termo de serviço e quais dados você pode guardar. A página não processa pagamentos; quem cobra é o provedor escolhido.

## Depoimentos
Os 4 cartões em `<!--TESTIMONIALS-->` são espaços reservados, sem texto inventado. Substitua apenas por depoimentos reais, com autorização do cliente. Para tirar a seção, apague de `<!--TESTIMONIALS-->` até o `</section>` dela.
