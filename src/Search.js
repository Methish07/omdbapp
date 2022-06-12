import React, { useEffect, useState } from 'react'
import MovieList from './MovieList'

const Search = () => {
  let list_movie=[]
        let list_series=[]
        let list_games=[]
    const api_key='ce09cd7a'
    const [name,setname]=useState('')
    const [movielist,setmovielist]=useState([])
    const [serielist,setserielist]=useState([])
    const [gamelist,setgamelist]=useState([])

const add=async()=>{
  let page = 1;
        while (page<5) {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${api_key}&s=batman&page=${page}`
          );
          const movies =  await res.json();
          movies.Search.forEach((movie)=>{
              if(movie.Poster!='N/A' &&  movie.Type==='movie'){
                list_movie.push(movie)
                document.getElementById('text1').innerHTML="Movies"
              }
              else if(movie.Poster!='N/A' && movie.Type==='series'){
                list_series.push(movie)
                document.getElementById('text2').innerHTML="Series"
              }
              else if(movie.Poster!='N/A' && movie.Type==='game'){
                list_games.push(movie)
                document.getElementById('text3').innerHTML='Games'
              }
        })
          page++;
        }
        setmovielist(list_movie)
        setserielist(list_series)
        setgamelist(list_games)
        list_movie=[]
        list_games=[]
        list_series=[]
        
}
    useEffect(()=>{
      add()
    },[])
    const handleSubmit=async()=>{
        let page = 1;
        while (page<5) {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${api_key}&s=${name}&page=${page}`
          );
          const movies = await res.json();
          movies.Search.forEach((movie)=>{
              if(movie.Poster!='N/A' &&  movie.Type==='movie'){
                list_movie.push(movie)
                document.getElementById('text1').innerHTML="Movies"
              }
              else if(movie.Poster!='N/A' && movie.Type==='series'){
                list_series.push(movie)
                document.getElementById('text2').innerHTML="Series"
              }
              else if(movie.Poster!='N/A' && movie.Type==='game'){
                list_games.push(movie)
                document.getElementById('text3').innerHTML='Games'
              }
        })
          page++;
        }
        setname('')
        console.log("movie list is ",list_movie)
        setmovielist(list_movie)
        console.log(localStorage.getItem('movies'))
        setserielist(list_series)
        console.log("game list is ",list_games)
        console.log(localStorage.getItem('games'))
        setgamelist(list_games)
        list_movie=[]
        list_series=[]
        list_games=[]
    }

  return (
    <div>
      <nav>
        <span className='front'>MovieApp</span>
        <div className='navdiv'>
           <input type='text' value={name} onChange={(e)=>{setname(e.target.value)}} placeholder="enter movie name"></input>
           <button  onClick={handleSubmit} >search</button>
           </div>
           <span>Login</span>
           <span>About</span>
      </nav>
           
           <div className='row'>
            <div className='movies'>
            <h1 color='white' style={{textAlign:'left'}} id='text1'></h1>
            <MovieList list={movielist} />
            </div>
            <div className='series'>
              <h1 color='white' style={{textAlign:'left'}} id='text2'></h1>
            <MovieList list={serielist}  />
            </div>
            <div className='games'>
              <h1 color='white' style={{textAlign:'left'}} id='text3'></h1>
            <MovieList list={gamelist}/>
            </div>
           </div>
           
    </div>
  )

}

export default Search