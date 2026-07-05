const cabecalho = document.querySelector("#cabecalho");
const botaoMenu = document.querySelector("#botao-menu");
const menu = document.querySelector("#menu");
const linksMenu = document.querySelectorAll(".menu a");

const cursor = document.querySelector(".cursor");
const cursorSeguidor = document.querySelector(".cursor-seguidor");

const elementosRevelar = document.querySelectorAll(".revelar");
const hero = document.querySelector(".hero");


/* CABEÇALHO */

function controlarCabecalho() {
  if (!cabecalho) {
    return;
  }

  if (window.scrollY > 50) {
    cabecalho.classList.add("rolagem");
  } else {
    cabecalho.classList.remove("rolagem");
  }
}

window.addEventListener("scroll", controlarCabecalho);

controlarCabecalho();


/* MENU MOBILE */

function alternarMenu() {
  if (!menu || !botaoMenu) {
    return;
  }

  menu.classList.toggle("ativo");
  botaoMenu.classList.toggle("ativo");
  document.body.classList.toggle("menu-aberto");
}

if (botaoMenu) {
  botaoMenu.addEventListener("click", alternarMenu);
}

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    menu?.classList.remove("ativo");
    botaoMenu?.classList.remove("ativo");
    document.body.classList.remove("menu-aberto");
  });
});


/* ANIMAÇÃO AO ROLAR */

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("ativo");
          observador.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  elementosRevelar.forEach((elemento) => {
    observador.observe(elemento);
  });
} else {
  elementosRevelar.forEach((elemento) => {
    elemento.classList.add("ativo");
  });
}


/* CURSOR PERSONALIZADO */

let mouseX = 0;
let mouseY = 0;

let seguidorX = 0;
let seguidorY = 0;

document.addEventListener("mousemove", (evento) => {
  mouseX = evento.clientX;
  mouseY = evento.clientY;

  if (cursor) {
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  }
});

function animarCursor() {
  seguidorX += (mouseX - seguidorX) * 0.12;
  seguidorY += (mouseY - seguidorY) * 0.12;

  if (cursorSeguidor) {
    cursorSeguidor.style.left = `${seguidorX}px`;
    cursorSeguidor.style.top = `${seguidorY}px`;
  }

  requestAnimationFrame(animarCursor);
}

animarCursor();


/* CURSOR SOBRE ELEMENTOS */

const elementosClicaveis = document.querySelectorAll(
  `
  a,
  button,
  .projeto-imagem,
  .ferramenta-card,
  .servico,
  .atuacao-card,
  .canal-link,
  .grupo-canais
  `
);

elementosClicaveis.forEach((elemento) => {
  elemento.addEventListener("mouseenter", () => {
    cursorSeguidor?.classList.add("ativo");
  });

  elemento.addEventListener("mouseleave", () => {
    cursorSeguidor?.classList.remove("ativo");
  });
});


/* MOVIMENTO DO HERO */

if (hero) {
  hero.addEventListener("mousemove", (evento) => {
    if (window.innerWidth <= 950) {
      return;
    }

    const movimentoX =
      (evento.clientX / window.innerWidth - 0.5) * 12;

    const movimentoY =
      (evento.clientY / window.innerHeight - 0.5) * 12;

    hero.style.backgroundPosition =
      `calc(50% + ${movimentoX}px) calc(50% + ${movimentoY}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.backgroundPosition = "center";
  });
}


/* ROLAGEM SUAVE PARA LINKS INTERNOS */

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
  link.addEventListener("click", (evento) => {
    const destinoId = link.getAttribute("href");
    const destino = document.querySelector(destinoId);

    if (!destino) {
      return;
    }

    evento.preventDefault();

    destino.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


/* IMPEDE LINKS VAZIOS DE RECARREGAREM A PÁGINA */

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (evento) => {
    evento.preventDefault();
  });
});


/* FECHA O MENU MOBILE AO CLICAR FORA */

document.addEventListener("click", (evento) => {
  if (!menu || !botaoMenu) {
    return;
  }

  const clicouNoMenu = menu.contains(evento.target);
  const clicouNoBotao = botaoMenu.contains(evento.target);

  if (
    menu.classList.contains("ativo") &&
    !clicouNoMenu &&
    !clicouNoBotao
  ) {
    menu.classList.remove("ativo");
    botaoMenu.classList.remove("ativo");
    document.body.classList.remove("menu-aberto");
  }
});


/* FECHA O MENU MOBILE COM A TECLA ESC */

document.addEventListener("keydown", (evento) => {
  if (evento.key !== "Escape") {
    return;
  }

  menu?.classList.remove("ativo");
  botaoMenu?.classList.remove("ativo");
  document.body.classList.remove("menu-aberto");
});