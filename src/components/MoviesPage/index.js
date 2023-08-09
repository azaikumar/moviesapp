import {Component} from 'react'
import MovieItemCard from '../MovieItemCard'
import { Pagination } from 'antd';
import './index.css'



const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MoviesPage extends Component {
  state = {
    searchInput: "",
    pageNum: 1,
    apiStatus: apiStatusConstants.initial,
    moviesdata: [],
    totalPages: 0
  }

  getMovieDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {searchInput, pageNum} = this.state


    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6853209411dfe3b5b320d8df880cfa0e&query=${searchInput}&page=${pageNum}`

    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log("fetchedData", fetchedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        moviesdata: fetchedData.results,
        totalPages: fetchedData.total_pages
      })

    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  handleSearch = inputValue => {
    this.setState({
      searchInput: inputValue
    }, this.getMovieDetails)
  }

  handlePage = page => {
    this.setState({
      pageNum: page
    }, this.getMovieDetails)
  }

  render() {
    const {searchInput, moviesdata, totalPages, pageNum} = this.state
    return (
      <div className="app-bg">
        <div className='search-bar'>
          <p>MOVIE NAME</p>
          <input type="search" className='input-bar' placeholder='Jurasic Park' value={searchInput} onChange={e => this.handleSearch(e.target.value)} />
          <button className='search-btn'>Search!</button>
        </div>
        <ul className='movie-item-container'>
          {moviesdata.map(eachMovie => <MovieItemCard data={eachMovie} key={eachMovie.id} />)}
        </ul>
        <div className='pagination'>
          <Pagination defaultCurrent={pageNum} total={totalPages} showSizeChanger={false} onChange={(page) => this.handlePage(page)} />
        </div>
      </div>
    )
  }
}

export default MoviesPage