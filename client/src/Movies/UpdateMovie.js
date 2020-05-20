import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initalState = {
    id: 0,
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateMovie = props => {
    // get the movie from the array passed into this component
    const [movie, setMovie] = useState(initalState)
    const { id } = useParams()
    const { push } = useHistory()

    const { movieList, setMovieList } = props

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log({ err }))
    }, [id])

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                let movielListClone = [...movieList]
                movielListClone.forEach(item => {
                    if (item.id === res.data.id) {
                        item = res.data
                    }
                })

                setMovieList(movielListClone)
                props.setUpdateMe(props.updateMe + 1)
                push('/')
            })
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="director"
                    value={movie.director}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="metascore"
                    value={movie.metascore}
                    onChange={handleChange}
                />
                {/* <input 
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                /> */}
                <button>Update Entry</button>

            </form>
        </>
    )
}

export default UpdateMovie