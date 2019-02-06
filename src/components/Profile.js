import React, {Component, Fragment} from 'react'
import {CreateRequest} from "./CreateRequest";
import {CreatePetition} from "./CreatePetition";
import {BASE_PATH, ALL_USERS_PATH, BALANCE_PATH} from "./App"

class Profile extends Component {
    state = {
        data: [],
        valueToUpBalance: 0
    }
    handleChangeToUpBalance = event => {
        this.setState({valueToUpBalance: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        const toUpBalanceData = {
            delta: Number(this.state.valueToUpBalance),
        };
        CreateRequest({
            path: `${BASE_PATH}${BALANCE_PATH}`,
            method: "PATCH"
        }, toUpBalanceData).then(response => {

            console.log("Баланс пополнен", response);
        })
            .catch(() => {
                console.log("Баланс не пополнен", toUpBalanceData);
            });
    };
    componentDidMount() {
        CreateRequest({
            path: `${BASE_PATH}${ALL_USERS_PATH}/${localStorage.getItem("id")}`,
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
                <CreatePetition />
            </Fragment>

        )
    }
}

export default Profile