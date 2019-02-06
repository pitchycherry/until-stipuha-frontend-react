import React, {Component} from 'react'
import {CreateRequest} from "./CreateRequest";
import $ from "jquery";
export class CreatePetition extends Component {
    state = {
        name: "",
        description: "",
        value: ""
    }
    handleChangeName = event => {
        this.setState({name: event.target.value});
    }
    handleChangeDescription = event => {
        this.setState({description: event.target.value});
    }
    handleChangeValue = event => {
        this.setState({value: event.target.value});
    }
    handleSubmitForm = event => {
        event.preventDefault();
        const newPetitionData = {
            name: this.state.name,
            description: this.state.description,
            value: this.state.value
        };
        CreateRequest({
            path: `https://until-stepuha-server.herokuapp.com/requests`,
            method: "POST"
        }, newPetitionData).then(response => {

            $(function () {
                $('#createPetitionModal').modal('toggle');
            });
            console.log("Просьбы создана", response);
        })
            .catch(() => {
                console.log("Просьбы не создана");
            });
    };
    render() {
        return (
            <div className="modal fade" id="createPetitionModal" tabIndex="-1" role="dialog"
                 aria-labelledby="createPetitionModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form id="createPetition" onSubmit={this.handleSubmitForm}>
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title" id="createPetitionModalLabel">Создание новой просьбы</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="createPetitionName">Название</label>
                                    <input className="form-control" type="text" name="name" id="createPetitionName"
                                           placeholder="Введите название" onChange={this.handleChangeName}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="createPetitionDonate">Требуемая сумма</label>
                                    <input className="form-control" type="number" name="value" id="createPetitionDonate"
                                           placeholder="Введите сумму" onChange={this.handleChangeValue}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="createPetitionDescription">Описание</label>
                                    <textarea className="form-control" name="description" id="createPetitionDescription"
                                              placeholder="Опишите просьбу" rows="5" onChange={this.handleChangeDescription} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-success">Создать</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}