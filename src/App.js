import React, { lazy,Suspense, useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";



const Grocery = lazy(()=>import("./components/Grocery"));



const AppLayout = () => {

    const[userName,setUserName]=useState();
    //Authentication
    useEffect(()=>{
        const data={name:"Navdeep Hada",};
        setUserName(data.name);
    },[]);

    return (
        
            <div>
            <UserContext.Provider value={{loggedInUser:userName,setUserName}}>
                <Header />
                <Outlet/>
            </UserContext.Provider>
                
            </div>
        
        
    )
}

const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
                path:"/",
                element:<Body/>
            },
            {
                path:"/about",
                element:<About/>
            },
            {
                path:"/restaurants/:resId",
                element:<RestaurantMenu/>
            },
            {
                path:"/grocery",
                element:(<Suspense fallback={<h1>Loading....</h1>}>
                    <Grocery/>
                </Suspense>)
            }
        ],
        errorElement:<Error/>
    }
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);




