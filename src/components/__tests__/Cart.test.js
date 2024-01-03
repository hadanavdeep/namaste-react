import { fireEvent, render,screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RestaurantMenu from "../RestaurantMenu"
import MOCK_DATA from "../mocks/mockResMenu.json"
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom"
import Cart from "../Cart"


global.fetch=jest.fn(()=>
Promise.resolve({
    json:()=>Promise.resolve(MOCK_DATA),
}));

it("Should complete cart flow",async ()=>{
    await act(async()=>render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
                <RestaurantMenu/>
                <Cart/>
            </Provider>
        </BrowserRouter>
        
    ));

const accordionHeader=screen.getByText("All Day Breakfast (9)");
fireEvent.click(accordionHeader);

expect(screen.getAllByTestId("foodItems").length).toBe(9);
expect(screen.getByText("Cart (0 items)")).toBeInTheDocument();

const addBtn=screen.getAllByRole("button",{name:"Add +"});

fireEvent.click(addBtn[0]);
expect(screen.getByText("Cart (1 items)")).toBeInTheDocument();

fireEvent.click(addBtn[1]);
expect(screen.getByText("Cart (2 items)")).toBeInTheDocument();

expect(screen.getAllByTestId("foodItems").length).toBe(11);

fireEvent.click(screen.getByRole("button",{name:"Clear Cart"}));
expect(screen.getAllByTestId("foodItems").length).toBe(9);
expect(screen.getByText("Cart is empty. Add items to the cart")).toBeInTheDocument();
});