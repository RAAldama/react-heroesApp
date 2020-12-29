import React from 'react'
import { Link } from 'react-router-dom'

const HeroCard = ({id, superhero, alter_ego, first_appearance, characters}) => {
    return (
        <div className="col">
            <div className="card" style={{maxWidth: 540}}>
                <img src={`./assets/${id}.jpg`} className="card-img-top" alt={superhero} />
                <div className="card-body">
                    <h5 className="card-title">{superhero}</h5>
                    <p className="card-text">
                        {alter_ego}
                    </p>

                    {
                        (alter_ego !== characters) && <p className="card-text">
                            <b>Conocido también como:</b> {characters}
                        </p>
                    }

                    <Link to={`./hero/${id}`}>
                        Más información del héroe...
                    </Link>
                </div>

                <div className="card-footer">
                    <small className="text-muted">{first_appearance}</small>
                </div>
            </div>
        </div>
    )
}

export default HeroCard
