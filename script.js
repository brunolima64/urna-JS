let seuvotopara = document.querySelector(".d-1-1");
let titulo = document.querySelector(".d-1-2");
let numeros = document.querySelector(".d-1-3");
let numero = document.querySelector(".numero");
let info = document.querySelector(".d-1-4");
let imgs = document.querySelector(".d-1-right");
let loading = document.querySelector(".loading");

let candidato; // armazena o candidato
let digits = '';
let nextDigit = 0; // controla os digits
let nextEtapa = 0; // controla a etapa atual

// limpa os elementos da tela.
titulo.innerHTML = '';
numeros.innerHTML = '';
info.innerHTML = '';
imgs.innerHTML = '';

//inicia a etapa
const iniciarEtapa = () => {
    loading.innerHTML = '';

    if(titulo.innerHTML = etapas[nextEtapa] !== undefined) {
        titulo.innerHTML = etapas[nextEtapa].titulo;//define o titulo vereador/prefeito.

        for(let i = 0; i < etapas[nextEtapa].numeros; i++) {
            let newDigit = document.createElement("div");
            newDigit.classList.add("numero");
            numeros.append(newDigit)
        }
    } else {
        let aviso = document.createElement("p");
        aviso.classList.add("aviso--gigante");
        aviso.classList.add("pisca");
        aviso.innerHTML = 'FIM';
        seuvotopara.innerHTML = '';
        titulo.innerHTML = '';
        titulo.append(aviso);
    }
}

//seta os digits
const clicou = (n) => {
    if(etapas[nextEtapa].titulo === 'VEREADOR' && digits.length < etapas[nextEtapa].numeros) {
        digits += n;
        numeros.children[nextDigit].innerHTML = n;
        nextDigit++
    }

    if(etapas[nextEtapa].titulo === 'PREFEITO' && digits.length < etapas[nextEtapa].numeros) {
        digits += n;
        numeros.children[nextDigit].innerHTML = n;
        nextDigit++;
    }
}

//vota em branco
const branco = () => {
    digits = '*****';
    confirma();
}

//limpa os digitos
const corrige = () => {
    titulo.innerHTML = '';
    numeros.innerHTML = '';
    digits = ''
    nextDigit = 0;
    nextEtapa = nextEtapa;//etapa mantem para nao perder a etapa que ja foi votada
    iniciarEtapa();
}

//confirma os digits e verifica se a um candidato valido e manda para a proxima etapa.
const confirma = () => {
    candidato = etapas[nextEtapa].candidatos.filter((item) => item.numero === digits); // pega o candidato correto;
    
    if(candidato.length > 0) {
        candidato.map((item) => {
            info.innerHTML = `
                Nome: ${item.nome}<br/>
                Partido: ${item.partido}<br/>
                ${item.vice ? `Vice-Prefeito:  ${item.vice}` : ' '}
            `;

            imgs.innerHTML = `
                <img class="d-1-image small" src="./images/${item.fotos[0].url}" /> <p class="name">PREFEITO</p>
                ${item.vice ? `<img class="d-1-image small" src="./images/${item.fotos[1].url}" /> <p class="name">VICE-PREFEITO</p>` : ' '}
            `;
        })
    } else {
        let branco = document.createElement("p");
        branco.classList.add("aviso--grande");
        branco.classList.add("pisca");
        branco.innerHTML = 'VOTO EM BRANCO';
        titulo.innerHTML = '';
        numeros.innerHTML = '';
        seuvotopara.innerHTML = '';
        titulo.append(branco);
    }

    loading.innerHTML = `Carregando...`;

    setTimeout(()=>{
        titulo.innerHTML = '';
        numeros.innerHTML = '';
        info.innerHTML = '';
        imgs.innerHTML = '';
        candidato = [];
        digits = ''
        nextDigit = 0;

        nextEtapa++;
        iniciarEtapa();
    }, 4000)
}

iniciarEtapa();