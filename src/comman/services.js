import axios from 'axios';
import { URL_USER } from './url';
export function userLogin(data) {
    return axios.post(`${URL_USER}login`, data)
}
export function userRegister(data) {
    return axios.post(`${URL_USER}register`, data)
}
export function contactus(data) {
    return axios.post(`${URL_USER}contact`, data)
}

export function allcategory() {
    return axios.get(`${URL_USER}allcategory`)
}



export function allproduct() {
    return axios.get(`${URL_USER}allproduct`)
}

export function category(id) {
    return axios.get(`${URL_USER}categoryproducts` + '/' + id)
}


export function getprofile() {
    var token = localStorage.getItem('id_token');
    // alert(token)
    return axios.post(`${URL_USER}profile`, {}, { headers: { "Authorization": `Bearer ${token}` } })
}



export function productdetails(id) {
    return axios.get(`${URL_USER}productdetail` + '/' + id)
}


//coupon

export function getcoupon(data) {
    return axios.post(`${URL_USER}checkcoupon`, data)
}

export function updatecartinfo(data) {
    return axios.post(`${URL_USER}updatecoupon`, data)
}

export function orderdetail(data){
    return axios.post(`${URL_USER}order`, data)
}

export function product_address(data){
    return axios.post(`${URL_USER}product_address`, data)
}

export function product_orders(data){
    return axios.post(`${URL_USER}product_orders`, data)
}

export function checkwishlist(data){
    return axios.post(`${URL_USER}wishlist`, data)
}

export function showwishlist(data){
    return axios.get(`${URL_USER}showwishlist`, data)
}


export function deletewishlist(id) {
    return axios.get(`${URL_USER}deletewishlist` + '/' + id)
}


// CMS


export function getcms() {
    return axios.get(`${URL_USER}getcms`)
}



export function getcmsbyid(id) {
    return axios.get(`${URL_USER}getcmsbyid` + '/' + id)
}


// MY ORDER

export function getmyorder(id) {
    return axios.get(`${URL_USER}myorder` + '/' + id)
}



// export default {userLogin,userRegister,contactus,allcategory};



// Brand 

export function allbrand() {
    return axios.get(`${URL_USER}allbrand`)
}



export function brandbyid(id) {
    return axios.get(`${URL_USER}brandproductbyid` + '/' + id)
}
