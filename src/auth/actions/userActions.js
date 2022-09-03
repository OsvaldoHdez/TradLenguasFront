import axios from 'axios';

import { sessionService } from 'redux-react-session';

// remote endpoint
// const remoteUrl = "https://lengua-residencia.herokuapp.com";
// const localUrl = "http://localhost:5000";
const currentUrl = "https://backendresi.herokuapp.com";

export const loginUser = (credentials, history, setFieldError, setSubmitting) => {
    return () => {

    // Verificar datos
    axios.post(`${currentUrl}/user/signin`, credentials, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const {data} = response;

        if (data.status === "FAILED") {
            const {message} = data;

            //Verificar un error específico
            if (message.includes("Datos", "existencia")) {
                setFieldError("email", message);
                setFieldError("password", message);
            } else if (message.includes("Contraseña","contraseña")) {
                setFieldError("password", message);
            } else if (message.toLowerCase().includes("bandeja")) {
                setFieldError("email", message);
            }
        } else if (data.status === "SUCCESS") {
            const userData = data.data[0];

            const token = userData._id;

            sessionService.saveSession(token).then(() => {
                sessionService.saveUser(userData).then(() => {
                    history.push('/dashboard');
                }).catch(err => console.error(err))
            }).catch(err => console.error(err))
        }
        setSubmitting(false);
    }).catch(err => console.error(err))
}
}


export const signupUser = (credentials, history, setFieldError, setSubmitting) => {

    return (dispatch) => {

     // Verificar datos
     axios.post(`${currentUrl}/user/signup`, credentials, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const { data } = response;

        if (data.status === "FAILED") {
            const {message} = data;

            //Error especifico
            if (message.includes("Nombre")) {
                setFieldError("nombre", message);
            } else if (message.includes("Apellido")) {
                setFieldError("apellido", message);
            } else if (message.includes("fecha")) {
                setFieldError("birthday", message);
            } else if (message.includes("correo", "electrónico")) {
                setFieldError("email", message);
            } else if (message.includes("contraseña")) {
                setFieldError("password", message);
            }
        } else if (data.status === "PENDING") {
            // Mostrar mensaje para la confirmación de correo electrónico
            const { email } = credentials;
            history.push(`/emailsent/${email}`)
        }
        // submission
        setSubmitting(false);
    })
    .catch(err => console.error(err))
}
}

export const logoutUser = (history) => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        history.push('/');
    }

}

export const forgottenPassword = (credentials, history, setFieldError, setSubmitting) => {
    return () => {

    // Verificar datos
    axios.post(`${currentUrl}/user/requestPasswordReset`, credentials, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const {data} = response;

        if (data.status === "FAILED") {
            const {message} = data;

            //Verificar un error específico
            if (message.toLowerCase().includes("usuario") || message.toLowerCase().includes("correo", "contraseña") || message.toLowerCase().includes("bandeja")) {
                setFieldError("email", message);
            } 
        } else if (data.status === "PENDING") {
           const { email } = credentials;
           history.push(`/emailsent/${email}/${true}`);
        }
        setSubmitting(false);
    }).catch(err => console.error(err))
}
}

export const resetPassword = (credentials, history, setFieldError, setSubmitting) => {
    return () => {

    // Verificar datos
    axios.post(`${currentUrl}/user/resetPassword`, credentials, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const {data} = response;

        if (data.status === "FAILED") {
            const {message} = data;

            //Verificar un error específico
            if (message.toLowerCase().includes("contraseña")) {
                setFieldError("newPassword", message);
            } 
        } else if (data.status === "SUCCESS") {
           history.push(`/emailsent`);
        }
        setSubmitting(false);
    }).catch(err => console.error(err))
}
}