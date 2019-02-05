import React from 'react'

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
export const CreateDiv = () => {
    return(
        <div>aeprgmspr</div>
    )
}
