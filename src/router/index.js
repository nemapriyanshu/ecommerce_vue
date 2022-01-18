import vue from 'vue';
import Router from 'vue-router';
import Home from '../components/admin/Home'
import RegisterLogin from '../components/admin/RegisterLogin'
import Contact from '../components/admin/Contact'
import Category from '../components/admin/Category'
import Brand from '../components/admin/Brand'
import Checkcategory from '../components/admin/Checkcategory'
import Profile from '../components/admin/Profile'
import Productdetail from '../components/admin/Productdetail'
import Showproduct from '../components/admin/Showproduct'
import Check from '../components/admin/Check'
import Cart from '../components/admin/Cart'
import Checkout from '../components/admin/Checkout'
import Orderreview from '../components/admin/Orderreview'
import Wishlist from '../components/admin/Wishlist'
import Moreinfo from '../components/admin/Moreinfo'
import Socialmedia from '../components/admin/Socialmedia'
import Myorder from '../components/admin/Myorder'
import Brandfilter from '../components/admin/Brandfilter'
import More from '../components/More'
import Swal from 'sweetalert2'

vue.use(Router);

function myGaurd(to, from, next) {
    if (localStorage.getItem('emailid') != undefined) {
        next();
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Login First',
          })
        next('/Login');
    }
}


function checklogin(to, from, next) {
    if (localStorage.getItem('emailid') != undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You are already logged in',
          })
        next('/');
    }
    else
    {
        next()
    }
    
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            beforeEnter:checklogin,
            path: '/Login',
            name: 'RegisterLogin',
            component: RegisterLogin,
        },
        {
            path: '/category',
            name: 'category',
            component: Category,
        },
        {
            path: '/orderreview',
            name: 'Orderreview',
            component: Orderreview,
        },
        {
            path: '/brand',
            name: 'Brand',
            component: Brand,
        },
        {
            path: '/productdetail/:id?',
            name: 'Productdetail',
            component: Productdetail,
        },
        {
            path: '/product/',
            name: 'Showproduct',
            component: Showproduct,
        },
        {
            path: '/check/',
            name: 'Check',
            component: Check,
        },
        {
            path: '/cart/',
            name: 'Cart',
            component: Cart,
        },
        {
            beforeEnter: myGaurd,
            path: '/checkout/',
            name: 'Checkout',
            component: Checkout,
        },
        {
            path:'/checkcategory/:id',
            name:"Checkout",
            component:Checkcategory,
        },
        {
            path:'/brandcategory/:id',
            name:"Brandfilter",
            component:Brandfilter,
        },
        {
            beforeEnter: myGaurd,
            path:'/profile',
            component:Profile,
        },
       
        {
            // beforeEnter: myGaurd,
            path: '/Contactus',
            name: 'Contact',
            component: Contact,
        },
        {
            path: '/moreinfo/:id',
            name: 'Moreinfo',
            component: Moreinfo,
        },
        {
            beforeEnter: myGaurd,
            path: '/wishlist',
            name: 'Wishlist',
            component: Wishlist,
        },
        {
            beforeEnter: myGaurd,
            path: '/myorder',
            name: 'Myorder',
            component: Myorder,
        },
        {
            
            path: '/social',
            name: 'Socialmedia',
            component: Socialmedia,
        },
        {
            
            path: '/more',
            name: 'More',
            component: More,
        },

    ]
})