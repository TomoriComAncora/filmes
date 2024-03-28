import { useState, useEffect } from "react";
import api from "../../services/api";
import "./Home.css"
import { Link } from "react-router-dom";

//url da api: /movie/now_playing?api_key=0d0050b740e6965ebe0a42fd3c463578&language=pt-BR
function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilme(){
      const response = await api.get('movie/now_playing', {
        params:{
          api_key: '0d0050b740e6965ebe0a42fd3c463578',
          language: 'pt-BR',
          page: 1,
        }
      })

      //console.log(response.data.results.slice(0, 10));
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadFilme();
  }, [])

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((item)=>(
          <article key={item.id}>
            <strong>{item.title}</strong>
            <img className="poster" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
            <Link to={`/filme/${item.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Home