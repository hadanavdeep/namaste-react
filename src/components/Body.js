
import RestaurentCard,{withVegLabel} from "./RestaurentCard";
import { useEffect, useState,useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Body = () => {

    const [listOfRestaurents,setListOfRestaurents] = useState([]);
    const [searchText,setSearchText]=useState("");
    const [filteredRestaurent,setFilteredRestaurent] = useState([]);

    const RestaurantCardVeg=withVegLabel(RestaurentCard);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING#"
            );
        const json = await data.json();
        
        setListOfRestaurents(json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurent(json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    }

    const onlineStatus=useOnlineStatus();
    if(onlineStatus===false)
    {
        return <h1>You are offline</h1>
    }

    const {loggedInUser,setUserName} = useContext(UserContext);

    return listOfRestaurents == 0 ? ( <Shimmer/>) :(
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4 ">
                    <input
                        type="text"
                        className="border border-solid border-black"
                        value={searchText}
                        data-testid="searchInput"
                        onChange={(e)=>{
                            setSearchText(e.target.value);
                        }}  
                    />
                    <button className="px-4 py-2 bg-green-100 rounded-lg"
                    onClick={()=>{
                        const filteredRestaurent = listOfRestaurents.filter((res)=>
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurent(filteredRestaurent);
                    }}>
                        Search
                    </button>
                </div>
                <div className="m-4 p-4 flex items-center">
                <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={() => {
                    const filteredList=listOfRestaurents.filter(
                        (res) => res.info.avgRating > 4.5
                    );
                    setFilteredRestaurent(filteredList);
                }}>
                    Top Rated Restaurents
                </button>
                </div>
                <div>
                    <label>Username: </label>
                    <input className="border border-black p-2 bg-gray-200 rounded-lg" 
                    value={loggedInUser} 
                    onChange={(e)=>setUserName(e.target.value)}/>
                </div>
                
            </div>
            <div className="flex flex-wrap">
                {
                    filteredRestaurent?.map((restaurent) => (
                    <Link 
                    key={restaurent?.info?.id} 
                    to={"/restaurants/"+restaurent?.info?.id}
                    >
                    {restaurent?.info?.isOpen ? (<RestaurantCardVeg resData={restaurent}/>) : (<RestaurentCard  resData={restaurent}/>)}
                    
                    </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Body;