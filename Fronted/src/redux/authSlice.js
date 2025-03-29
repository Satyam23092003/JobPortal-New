import { createSlice } from '@reduxjs/toolkit'

 const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // user:null,
    loading:false,
  },
  reducers: {
     setLoading:(state,action)=>{
        state.loading = action.payload
     },


  }
})

// Action creators are generated for each case reducer function
export const {setLoading} = authSlice.actions



export default authSlice.reducer