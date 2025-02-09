import axiosInstance from "./api/Api";

const ip= ""

export const getAllPlat= () => {
    return  new Promise((resolve ,reject)=>{
        axiosInstance.get(ip + "/api/v1/plats").then((data)=>{
            console.log(data)
            resolve(data.data)
        })
    }) 
}
export const getPlatById = (id: any) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(ip + "/api/v1/plats/" + id).then((data) =>
            resolve(data.data)
    )}
)}

export const addpanier = (idClient : any, idPlat: any,quantite: any) => {
    return new Promise((resolve, reject) => {
        axiosInstance.post(ip + "/api/v1/paniers" ,{
            idClient: idClient,
            idPlat: idPlat,
            quantite: quantite
        }).then((data) =>
            resolve(data.data)
    )}
)}
export const getAllPanier= () => {
    return  new Promise((resolve ,reject)=>{
        axiosInstance.get(ip + "/api/v1/paniers").then((data)=>{
            console.log(data)
            resolve(data.data)
        })
    }) 
}

export const addCommande = (idClient : any) => {
    return new Promise((resolve, reject) => {
        axiosInstance.post(ip + "/api/v1/Commande" ,{
            idClient: idClient,
        }).then((data) =>
            resolve(data.data)
    )}
)}
export const getAllCommande= () => {
    return new Promise((resolve ,reject)=>{
        axiosInstance.get(ip + "/api/v1/Commande").then((data)=>{
            console.log(data)
            resolve(data.data)
        })
    }) 
}
