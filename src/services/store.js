import { configureStore } from "@reduxjs/toolkit";
import { articleApi} from "./article";


//we are configuring the store here- a store is a place where the global state of the application is stored

//most of the time you dont need the entire state but simply a slice of the state 

export const store = configureStore({

    //your store needs a reducer
    //the store is like a whole cake while the reducer is like a slice of the cake
    //the store is the whole state of the application while the reducer allows you to take only what you need 
    //we just want this articleApi reducer
    reducer: {articleApi: articleApi.reducer},
    
    //the middleware allows you to do something with the state before you get it 

    //default middleware gotten from documentation
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
});