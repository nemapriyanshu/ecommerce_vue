import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);



export default new Vuex.Store({
    state:{
        email:'',
        inCart:(JSON.parse(localStorage.getItem('myCart')))??[],
    },
    
    mutations:
    {
        updateemail(state,payroll)
        {
            state.email=payroll.newmail
        },
        initialiseStore(state) {
			if(localStorage.getItem('emailid')) {
				state.email = localStorage.getItem('emailid');
			}
            else
            {
                state.email = '';
            }
		},
        ADD_TO_CART(state,payroll){ 
            // console.log(payroll.array);
            state.inCart=payroll.array
        },
        orderplaced(state,payroll){ 
            // console.log(payroll.array);
            state.inCart=payroll.array
        },
      

    },
    actions:{
    changeemail(context,payroll){context.commit("updateemail",payroll)},
    addToCart(context,payroll) {context.commit('ADD_TO_CART',payroll)},
    orderplaced(context,payroll) {context.commit('orderplaced',payroll)},
  
}
});