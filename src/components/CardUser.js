import React from 'react'
import {getPetitionOfConcretePerson} from './CreateRequest'

export const CardUser = (allUsersForPetition) => {
    return (
        <div id="page-body_content">
            <div className="row">
                {allUsersForPetition.map(user =>
                    <div className={`card operation card-{user.id}`} key={user.id}>
                        <div className="card-body">
                            <div className="about-user">
                                <b className="card-title">{user.name}</b><br/><br/>
                                <p>Карма: {user.karma}</p>
                                <p>Максимальный запрос: {user.maxRequest}</p>
                                <button type="button" className="btn btn-outline-success col-12" onClick={() => getPetitionOfConcretePerson(user.id)}>Получить просьбы
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}