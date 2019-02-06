import React, {Component} from 'react'
import {CreateRequest} from "./CreateRequest";

export class CardPetition extends Component {
    state = {
        donate: 0,
        petitionId: ""
    }
    handleChangeDonate = event => {
        this.setState({donate: event.target.value});
    }
    handleSubmit = (event, petitionId)=> {
        event.preventDefault();
        const valueDonate = {
            value: Number(this.state.donate),
        };
        CreateRequest({
            path: `https://until-stepuha-server.herokuapp.com/requests/${petitionId}`,
            method: "PATCH"
        }, valueDonate).then(response => {

            console.log("Баланс пополнен", valueDonate, petitionId);
        })
            .catch(() => {
                console.log("Баланс не пополнен", valueDonate, petitionId);
            });
    };
    render() {
        const dataMyPetitions = this.props.dataMyPetitions
        const dataAllUsers = this.props.dataAllUsers

        return (
            <div id="page-body_content">
                <div className="row">
                    {dataMyPetitions.map(petition =>
                        <div className={`card operation card-${petition.id}`} key={petition.id}>
                            <div className="card-body">
                                <h5 className="card-title">{petition.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{dataAllUsers.filter(user => user.id === petition.authorID).map(u => u.name)}</h6>
                                <p className="card-text">{petition.description}</p>
                                <div className="progress">
                                    {<div className="progress-bar progress-bar-striped bg-success" role="progressbar"
                                          style={{width: `${petition.balance * 100 / petition.aim}%`}} aria-valuenow="50"
                                          aria-valuemin="0" aria-valuemax="100"></div>}
                                </div>
                                <p className="aim">Цель: {petition.aim}р</p>
                                <p className="balance">Собрано: {petition.balance}р</p>
                                <form className="createDonate" onSubmit={(event) => this.handleSubmit(event, petition.id)}>
                                    <div className="row">
                                        <input type="number" name="value"
                                               className="form-control input-operations_balance col-6" onChange={this.handleChangeDonate}/>
                                        <button type="submit"
                                                className="btn btn-outline-success col-4 button-operations">Помочь
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>)}
                </div>
            </div>
        )
    }
}
