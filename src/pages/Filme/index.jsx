import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Filme.css";

function Filme() {
  const [filme, setFilme] = useState({});
  const [load, setLoad] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: "0d0050b740e6965ebe0a42fd3c463578",
            language: "pt-BR",
          },
        })
        .then((response) => {
          // console.log(response.data);
          setFilme(response.data);
          setLoad(false);
        })
        .catch(() => {
          console.log("filme não encontrado");
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("Componente desmontado");
    };
  }, [navigate, id]);

  const salvarFilme = () => {
    const minhaLista = localStorage.getItem("@filmes");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const filmeRepitido = filmesSalvos.some((filmes) =>  filmes.id === filme.id);

    console.log(filmeRepitido);

    if (filmeRepitido) {
      alert("Filme já existe na lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@filmes", JSON.stringify(filmesSalvos));
    alert("Filme salvo com sucesso");
  };

  if (load) {
    return (
      <div className="filme-info">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse:</h3>
      <p>{filme.overview}</p>
      <strong>Avaliação: {filme.vote_average.toFixed(2)}/10</strong>

      <div className="buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Vídeo
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
