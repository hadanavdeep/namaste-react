import React, { lazy,Suspense, useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart"
import Contact from "./components/Contact";



const Grocery = lazy(()=>import("./components/Grocery"));



const AppLayout = () => {

    const[userName,setUserName]=useState();
    //Authentication
    useEffect(()=>{
        const data={name:"Navdeep Hada",};
        setUserName(data.name);
    },[]);

    return (
        <Provider store={appStore}>
            <UserContext.Provider value={{loggedInUser:userName,setUserName}}>
                <div>
                    <Header />
                    <Outlet/>
                </div>
            </UserContext.Provider>
        </Provider>
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
            },
            {
                path:"/contact",
                element:<Contact/>
            },
            {
                path:"/cart",
                element:<Cart/>
            },
        ],
        errorElement:<Error/>
    }
    
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);




