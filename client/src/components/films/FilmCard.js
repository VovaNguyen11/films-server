import React, {useState, useContext} from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import Featured from "./Featured"
import FilmContext from "../context/FilmContext"

const FilmCard = ({film}) => {
  const [confirm, setConfirm] = useState(false)
  const showConfirm = () => setConfirm(true)
  const hideConfirm = () => setConfirm(false)

  const {deleteFilm, user} = useContext(FilmContext)

  const adminActions = (
    <div className="ui two buttons">
      {confirm ? (
        <>
          <span className="ui red basic button" onClick={deleteFilm(film)}>
            <i className="ui icon check" />
            YES
          </span>
          <span className="ui grey basic button" onClick={hideConfirm}>
            <i className="ui icon close" /> NO
          </span>
        </>
      ) : (
        <>
          <Link
            to={`/films/edit/${film._id}`}
            className="ui green basic button"
          >
            <i className="ui icon edit"></i>
          </Link>
          <span className="ui red basic button" onClick={showConfirm}>
            <i className="ui icon trash"></i>
          </span>
        </>
      )}
    </div>
  )

  const userActions = (
    <div className="ui center aligned">
      <Link to={`/films/details/${film._id}`} className="ui basic teal button">
        Details
      </Link>
    </div>
  )

  return (
    <div className="ui card">
      <span className="ui right corner label">
        <i className="empty star icon"></i>
      </span>
      <div className="image">
        <span className="ui green label ribbon">$ {film.price} </span>
        <Featured featured={film.featured} id={film._id} />
        <img src={film.img} alt={film.title} />
      </div>

      <div className="content">
        <span className="header">{film.title}</span>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration} min
          </span>
        </div>
      </div>

      <div className="extra content">
        {user.token && user.role === "admin" && adminActions}
        {user.token && user.role === "user" && userActions}
      </div>
    </div>
  )
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
}

export default React.memo(FilmCard)
