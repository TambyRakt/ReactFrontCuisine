import axiosInstance from "./api/Api"

export function login(email : string, password : string) {
    return new Promise((resolve, reject) => {
        axiosInstance.post("/api/v1/login_check", {
            "email": email,
            "password": password
        }).then((data : any) => {
            resolve(null)
            localStorage.setItem('access-token', data.data.token)
        }).catch((err : any) => {
            if (err.data.message == "Invalid credentials.") {
                reject(err)
            }
        })
    })
}