"use client";
import { useState , useEffect, useContext, createContext} from "react";
import axios from "axios";

const ProductContext = createContext()
export function ProductProvider({Children}){

    return( 
        <ProductContext.Provider>
            {Children}
        </ProductContext.Provider>
    ) 

} 

export function UseProduct(){
    return useContext (ProductContext) 

}