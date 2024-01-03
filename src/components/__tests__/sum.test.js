import {sum} from "../sum"

test("Sum function to check sum of two numbera",()=>{
    const result = sum(3,4);

    //Assertion
    expect(result).toBe(7);
});