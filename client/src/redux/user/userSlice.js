import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    curruntUser:null,
    error:null,
    loading:false
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.curruntUser =action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.error =action.payload;
            state.loading=false;
        }
    }
});
export const {signInFailure,signInSuccess,signInStart} =userSlice.actions;
export default userSlice.reducer;