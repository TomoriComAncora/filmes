import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Favoritos.css";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@filmes");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  const excluir = (id) =>{
    let filmesNaoExcluidos = filmes.filter((item)=>{
      return (item.id !== id);
    });
    setFilmes(filmesNaoExcluidos);
    localStorage.setItem("@filmes", JSON.stringify(filmesNaoExcluidos));
  }

  return (
    <div className="meus-filmes">
      <h1>Meus filmes</h1>
      {filmes.length === 0 && <span>Você não tem nenhum filme salvo 😥</span>}
      <ul>
        {filmes.map((filmes) => (
          <li key={filmes.id}>
            <div className="logo-titulo">
              <Link to={`/filme/${filmes.id}`}>
                <img
                  id="logo"
                  src={`https://image.tmdb.org/t/p/original/${filmes.poster_path}`}
                  alt={filmes.title}
                />
              </Link>
              <span>{filmes.title}</span>
            </div>
            <div className="acoes">
              <Link to={`/filme/${filmes.id}`}>Ver detalhes</Link>
              <button onClick={(()=>excluir(filmes.id))}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favoritos;
