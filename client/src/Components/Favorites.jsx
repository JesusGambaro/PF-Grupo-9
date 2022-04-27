import React from 'react'
import "../Css/Favorities.scss"
const Favorites = () => {
  return (
    <div className='favorites'>
        <h1>Favorites</h1>
        <div className='favoritesContainer' >
            <div className="cardFavs">Cards</div>
            <div className="cardFavs">Cards</div>
            <div className="cardFavs">Cards</div>
            <div className="cardFavs">Cards</div>
        </div>
        <div className="fav-buttons">
            <button className="deleteAll-button">
                <i className="bi bi-trash"></i> Delete all
            </button>
        </div>
    </div>
  )
}

export default Favorites