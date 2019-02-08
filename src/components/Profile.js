import React, {Component, Fragment} from 'react'
import {CreateRequest} from "./CreateRequest";
import {CreatePetition} from "./CreatePetition";
import {BASE_PATH, ALL_USERS_PATH, BALANCE_PATH} from "./App"

class Profile extends Component {
    state = {
        profileName: "",
        profileKarma: "",
        profileMaxRequest: "",
        profileBalance: "",
        valueToUpBalance: 0
    }
    handleChangeToUpBalance = event => {
        this.setState({valueToUpBalance: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        const toUpBalanceData = {
            value: Number(this.state.valueToUpBalance),
        };
        CreateRequest({
            path: `${BASE_PATH}${BALANCE_PATH}`,
            method: "PATCH"
        }, toUpBalanceData).then(
            this.setState({profileBalance: Number(this.state.valueToUpBalance) + Number(this.state.profileBalance)})
        )
            .catch(() => {
                console.log("Баланс не пополнен");
            });
    };

    componentDidMount() {
        CreateRequest({
            path: `${BASE_PATH}${ALL_USERS_PATH}/${localStorage.getItem("id")}`,
            method: "GET"
        }).then(response => {
            this.setState({
                profileName: response.name,
                profileKarma: response.karma,
                profileMaxRequest: response.maxRequest,
                profileBalance: response.balance
            })
            console.log("Данные о профиле получены", response);
        })
            .catch(() => {
                console.log("Данные о профиле не получены");
            })
    }

    render() {
        const profileName = this.state.profileName
        const profileKarma = this.state.profileKarma
        const profileMaxRequest = this.state.profileMaxRequest
        const profileBalance = this.state.profileBalance

        return (
            <Fragment>
                <div className="profile col-md-3">
                    <div className="about-user">
                        <b className="b_font">{profileName}</b><br/><br/>
                        <p>Карма: {profileKarma}</p>
                        <p>Максимальный запрос: {profileMaxRequest}</p>
                        <p>Баланс: {profileBalance}</p>
                        <button className="btn btn-outline-success btn_info-user" type="button"
                                data-toggle="modal" data-target="#createPetitionModal">Создать новую просьбу
                        </button>
                        <br/><br/>
                        <form className="addBalanceForm" onSubmit={this.handleSubmit}>
                            <b className="b_font">Пополнить кошелек</b><br/><br/>
                            <input type="text" name="delta" className="form-control btn_info-user"
                                   placeholder="Введите сумму" onChange={this.handleChangeToUpBalance}/>
                            <button className="btn btn-outline-success btn_info-user" type="submit">Пополнить баланс
                            </button>
                        </form>
                    </div>
                </div>

                {/*Модальное окно создания новой просьбы*/}
                <CreatePetition/>
            </Fragment>

        )
    }
}

export default Profile