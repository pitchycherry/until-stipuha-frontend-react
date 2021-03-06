import React from 'react'
import {BASE_PATH, ALL_PETITION_PATH} from "./App"

export const CreateRequest = (options, body) => {
    return fetch(options.path, {
        headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            "WWW-Authenticate": localStorage.getItem('token')
        }),
        method: options.method || "GET",
        body: body ? JSON.stringify(body) : undefined
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw response.status;
        }
    });
};

export const getPetitionOfConcretePerson = (userId) => {
    CreateRequest({
        path: `${BASE_PATH}${ALL_PETITION_PATH}?userId=${userId}`,
        method: "GET"
    }).then(response => {
        //this.setState({title: "Просьбы всех пользователей", myPetitions: response, flagPetitions: true})
        console.log("Просьбы конкретного пользователя получены", response);
    })
        .catch(() => {
            console.log("Просьбы конкретного пользователя не получены");
        })
}
export const CreateDiv = () => {
    console.log("rctfvygbhnjmk,")
}
