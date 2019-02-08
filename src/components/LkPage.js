import React, {Component, Fragment} from 'react'
import Profile from "./Profile";
import {CreateRequest} from "./CreateRequest";
import {CardPetition} from "./CardPetition";
import {CardUser} from "./CardUser";
import {BASE_PATH, ALL_PETITION_PATH, ALL_USERS_PATH} from "./App"

class LkPage extends Component {
    state = {
        title: "",
        flagPetitions: true,
        myPetitions: [],
        allUsersForPetition: []
    }
    updateDataPetitions = (value) => {
        this.setState({ myPetitions: value })
    }
    handleClickGetAllPetitions = () => {
        /*Просьбы всех пользователей*/
        CreateRequest({
            path: `${BASE_PATH}${ALL_PETITION_PATH}`,
            method: "GET"
        }).then(response => {
            this.setState({title: "Просьбы всех пользователей", myPetitions: response, flagPetitions: true})
            console.log("Просьбы всех пользователей получены", response);
        })
            .catch(() => {
                console.log("Просьбы всех пользователей не получены");
            })
        /*Данные о всех пользователях*/
        CreateRequest({
            path: `${BASE_PATH}${ALL_USERS_PATH}`,
            method: "GET"
        }).then(responseUsers => {
            this.setState({allUsersForPetition: responseUsers})
            console.log("Данные о всех пользователях получены", responseUsers);
        })
            .catch(() => {
                console.log("Данные о всех пользователях не получены");
            })
    }
    handleClickGetMyPetitions = () => {
        /*Мои просьбы*/
        CreateRequest({
            path: `${BASE_PATH}${ALL_PETITION_PATH}?userId=${localStorage.getItem('id')}`,
            method: "GET"
        }).then(response => {
            this.setState({title: "Мои просьбы", myPetitions: response, flagPetitions: true})
            console.log("Мои просьбы получены", response);
        })
            .catch(() => {
                console.log("Мои просьбы не получены");
            })
        /*Данные о всех пользователях*/
        CreateRequest({
            path: `${BASE_PATH}${ALL_USERS_PATH}`,
            method: "GET"
        }).then(response => {
            this.setState({allUsersForPetition: response})
            console.log("Данные о всех пользователях получены", response);
        })
            .catch(() => {
                console.log("Данные о всех пользователях не получены");
            })
    }
    handleClickGetAllUsers = () => {
        /*Данные о всех пользователях*/
        CreateRequest({
            path: `${BASE_PATH}${ALL_USERS_PATH}`,
            method: "GET"
        }).then(response => {
            this.setState({title: "Все пользователи", allUsersForPetition: response, flagPetitions: false})
            console.log("Данные о всех пользователях получены", response);
        })
            .catch(() => {
                console.log("Данные о всех пользователях не получены");
            })
    }
    componentWillMount() {
        this.handleClickGetMyPetitions()
    }

    render() {
        const dataMyPetitions = this.state.myPetitions
        const dataTitle = this.state.title
        const dataFlagPetitions = this.state.flagPetitions
        const dataAllUsers = this.state.allUsersForPetition
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                    <a className="navbar-brand" href="index.html">Until Stipuha</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" onClick={this.handleClickGetMyPetitions}>Мои просьбы <span
                                    className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleClickGetAllPetitions}>Просьбы всех
                                    пользователей</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.handleClickGetAllUsers}>Все пользователи</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="fluid-container lk-page">
                    <div className="row">
                        <Profile />
                        <div className="page-body col-md-8">
                            <div className="row">
                                <b className="b_font col-lg-8 col-md-6 col-4">{dataTitle}</b>
                            </div>
                            <br/><br/>
                            {/*Компонент для карточки просьбы*/}
                            {dataFlagPetitions ? <CardPetition dataMyPetitions={dataMyPetitions} dataAllUsers={dataAllUsers} updateDataPetitions={this.updateDataPetitions}/> : CardUser(dataAllUsers)}

                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default LkPage