import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const initalValues = {
    id: 0,
    title: "",
    director: "",
    metascore: "",
    stars: []

}

const AddMovie = props => {
    const [newMovie, setNewMovie] = useState(initalValues)
    const { push } = useHistory()

    const handleChange = e => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios
            .post("http://localhost:5000/api/movies", newMovie)
            .then(res => {
                console.log(res)
                props.setUpdateMe(props.updateMe + 1)
            })
            .catch(err => console.log(err))

        push("/")
    }

    return (
        <form onSubmit={handleSubmit} className="add-movie-wrapper">
            <label>
                Title: {"  "}
                <input
                    type="text"
                    name="title"
                    value={newMovie.title}
                    onChange={handleChange}
                />
            </label>
            <label>
                Director : {"  "}
                <input
                    type="text"
                    name="director"
                    value={newMovie.director}
                    onChange={handleChange}
                />
            </label>
            <label>
                Metascore: {"  "}
                <input
                    type="number"
                    name="metascore"
                    value={newMovie.metascore}
                    onChange={handleChange}
                />
            </label>
            <button>Add Movie</button>
        </form>
    )
}

export default AddMovie