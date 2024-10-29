const postagens = [];

const botaoPostar = document.getElementById('botao-postar');

const receberFotoGatinho = async () => {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    const url = data[0].url;
    return url
}

const adicionarPostagem = async () => {
    const texto = document.getElementById('conteudo').value

    const novoPost = {
        data: new Date(),
        usuario: 'Alysson',
        texto,
        avatar: 'avatar-png.webp',
        imagemGatinho: await receberFotoGatinho(),
        likes: 0
    }
    postagens.unshift(novoPost);
    atualizarFeed();
    document.getElementById("conteudo-post").value = "";
}

const atualizarFeed = () => {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';
    postagens.forEach((postagem, index) => {
        const post = document.createElement('div');
        post.innerHTML = `
            <img src = ${postagem.avatar} width='40' height='40'    >
            <strong>${postagem.usuario}</strong>
            <div id = 'conteudo-post'>
                ${postagem.texto}
                <p id='imagem-gato'>
                    <img src= ${postagem.imagemGatinho} width="150" height="150">;
                </p>
            </div>
            <div id='footer'>
                <button id='botao-curtir' onclick='curtirPost(${index})'>Curtir</button>
                <span>${postagem.likes} curtidas</span>
            </div>
        `
        feed.appendChild(post);
    })
}

function curtirPost(index) {
    postagens[index].likes += 1;
    atualizarFeed();
}

botaoPostar.addEventListener('click', adicionarPostagem);