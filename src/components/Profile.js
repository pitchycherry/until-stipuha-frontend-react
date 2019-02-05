import React, {Component, Fragment} from 'react'
import {CreateRequest} from "./CreateRequest";

class Profile extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        CreateRequest({
            path: `https://until-stepuha-server.herokuapp.com/users/${localStorage.getItem("id")}`,
            method: "GET"
        }).then(response => {
            this.setState({data: response})
            console.log("Данные о профиле получены", response);
        })
            .catch(() => {
                console.log("Данные о профиле не получены");
            })
    }

    render() {
        const data = this.state.data
        return (
            <Fragment>
                <div className="profile col-md-3">
                    <div className="about-user">
                        <b className="b_font">{data.name}</b><br/><br/>
                        <p>Карма: {data.karma}</p>
                        <p>Максимальный запрос: {data.maxRequest}</p>
                        <p>Баланс: {data.balance}</p>
                        <button className="btn btn-outline-success btn_info-user" type="button"
                                data-toggle="modal" data-target="#createPetitionModal"
                                >Создать новую просьбу
                        </button>
                        <br/><br/>
                        <form className="addBalanceForm">
                            <b className="b_font">Пополнить кошелек</b><br/><br/>
                            <input type="text" name="delta" className="form-control btn_info-user"
                                   placeholder="Введите сумму"/>
                            <button className="btn btn-outline-success btn_info-user" type="submit"
                                    onSubmit="addBalance()">Пополнить баланс
                            </button>
                        </form>
                    </div>
                </div>

                {/*Модальное окно создания новой просьбы*/}
                <div className="modal fade" id="createPetitionModal" tabindex="-1" role="dialog" aria-labelledby="createPetitionModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form id="createPetition">
                                <div className="modal-header bg-success text-white">
                                    <h5 className="modal-title" id="createPetitionModalLabel">Создание новой просьбы</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label for="createPetitionName">Название</label>
                                        <input className="form-control" type="text" name="name" id="createPetitionName" placeholder="Введите название" />
                                    </div>
                                    <div className="form-group">
                                        <label for="createPetitionDonate">Требуемая сумма</label>
                                        <input className="form-control" type="number" name="value" id="createPetitionDonate" placeholder="Введите сумму" />
                                    </div>
                                    <div className="form-group">
                                        <label for="createPetitionDescription">Описание</label>
                                        <textarea className="form-control" name="description" id="createPetitionDescription" placeholder="Опишите просьбу" rows="5"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-success">Создать</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}

export default Profile