import './index.css'

const MovieItemCard = (props) => {
    const {data} = props
    return (
        <li className='movie-card'>
            <div className='image-container'>
            <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt="movie posture" className='movie-image' />

            </div>
            <div className='movie-info-container'>
            <h2>{data.title}</h2>
            <p>RELEASAE DATE: {data.release_date}</p>
            <p>RATING: {data.vote_average}</p>
            <p>{data.overview}</p>
            </div>
        </li>
    )
}

export default MovieItemCard