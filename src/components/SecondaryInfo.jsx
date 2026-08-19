import notFound from "../assets/notFound.png";
import "../styles/Info.css"
function SecondaryInfo({ secondaryInfo }) {
  const i = secondaryInfo;
  console.log(i);
  return (<>
    <section class="section">
      <div class="section-title">
        <h2>Información</h2>
      </div>
      <div class="details">
        <div class="detail-card">
          <div class="detail-row">
            <span class="detail-label">Título original</span>
            <span class="detail-value">{i.title}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Duración</span>
            <span class="detail-value">{i.length} minutos</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Presupuesto</span>
            <span class="detail-value">{i.budget}</span>
          </div>
        </div>
        <div class="detail-card">
          <div class="detail-row">
            <span class="detail-label">Géneros</span>
            <div class="tags">
              {i.genres.map((genre, i) => (
                <span class="tag" key={i}>{genre.name}</span>
              ))}
            </div>
          </div>
          <div class="detail-row">
            <span class="detail-label">Productoras</span>
            <div class="tags">
              {i.producers.map((producer, i) => (
                <span class="tag" key={i}>{producer.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section-title">
        <h2>Reparto principal</h2>
      </div>
      <div class="cast">
        {i.cast.map((actor, i) => (
          <div key={i} class="actor">
            <img
              class="actor-image"
              src={"https://image.tmdb.org/t/p/w185" + actor.profile_path}
              onError={(e) => {
                e.target.src = notFound;
                e.target.onError = null;
              }}
            />
            <strong>
              {actor.name}
            </strong>
          </div>
        ))}
      </div>
    </section> <section class="section">
      <div class="section-title">
        <h2>Vídeos</h2>
      </div>
      <div class="trailers">
        {i.videos.results.map((video, i) => (
          <div key={i} class="trailer">
            <iframe
              allow="fullscreen"
              src={
                "https://www.youtube.com/embed/" +
                video.key +
                "?rel=0&amp;amp;controls=1&amp;amp;showinfo=0"
              }
            ></iframe>
          </div>
        ))}</div>
    </section>
  </>
  );
}

export default SecondaryInfo;
