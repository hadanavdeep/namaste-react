import { useContext } from "react";
import UserContext from "../utils/UserContext";
import {CDN_URL} from "../utils/constants"

const RestaurentCard = (props) => {
    const {resData}=props;
    const {name,cuisines,avgRating,costForTwo,sla}=resData?.info;
    const {deliveryTime} = resData.info?.sla;
    const {loggedInUser} = useContext(UserContext);
    return (
        <div data-testid="resCard" className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-400" >
            <img 
                className="res-logo rounded-lg"
                alt = "res-logo"
                src={CDN_URL+resData.info.cloudinaryImageId}
            />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(",")}</h4>
            <h4>{avgRating} Stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{deliveryTime} minutes</h4>
            <h4>User : {loggedInUser} </h4>
        </div>
    )
}

export const withVegLabel=(RestaurentCard)=>{
    return (props) => {
        return(
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
                    Open Now
                </label>
                <RestaurentCard {...props}/>
            </div>
        )
    }
}


export default RestaurentCard;