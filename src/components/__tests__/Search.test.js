import { fireEvent, render,screen } from "@testing-library/react"
import Body from "../Body"
import MOCK_DATA from "../mocks/mockResListData.json"
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom"

global.fetch=jest.fn(()=>{
    return Promise.resolve({
        json:()=>{
            return Promise.resolve(MOCK_DATA);
        },
    });
});

it("It shoudd search res list for Cafe input",async()=>{
    await act(async ()=>
    render(
        <BrowserRouter>
            <Body/>
        </BrowserRouter>
    ));
    
    const cardsBefore = screen.getAllByTestId("resCard");
    expect(cardsBefore.length).toBe(9);

    const searchBtn=screen.getByRole("button",{name:"Search"});

    const searchInput=screen.getByTestId("searchInput");

    fireEvent.change(searchInput,{target:{value:"Cafe"}});
    fireEvent.click(searchBtn);
    const cardsAfter = screen.getAllByTestId("resCard");

    expect(cardsAfter.length).toBe(2);
})

it("It shoudd filter top rated restaurant",async()=>{
    await act(async ()=>
    render(
        <BrowserRouter>
            <Body/>
        </BrowserRouter>
    ));
    
    const cardsBefore = screen.getAllByTestId("resCard");
    expect(cardsBefore.length).toBe(9);

    const topRatedBtn=screen.getByRole("button",{name:"Top Rated Restaurents"});

    fireEvent.click(topRatedBtn);
    const cardsAfter = screen.getAllByTestId("resCard");

    expect(cardsAfter.length).toBe(4);
})