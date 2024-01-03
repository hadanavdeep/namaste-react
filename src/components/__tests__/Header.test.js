import { fireEvent,render,screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import appStore from "../../utils/appStore"
import Header from "../Header";
import "@testing-library/jest-dom"

it("Should load header component with login button",()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
              <Header/>
            </Provider>
        </BrowserRouter>
    );
    const loginButton=screen.getByRole("button",{name:"Login"});
    expect(loginButton).toBeInTheDocument();
})

it("Should load header component with cart items 0",()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
              <Header/>
            </Provider>
        </BrowserRouter>
    );
    const cartItems=screen.getByText("Cart (0 items)");
    expect(cartItems).toBeInTheDocument();
})

it("Should change login to logout on click",()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
              <Header/>
            </Provider>
        </BrowserRouter>
    );
    const loginButton=screen.getByRole("button",{name:"Login"});
    fireEvent.click(loginButton);
    const logoutButton=screen.getByRole("button",{name:"Logout"});
    expect(logoutButton).toBeInTheDocument();
})