
import RestaurentCard from "../components/RestaurentCard";
import resList   from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {

    const [listOfRestaurents,setListOfRestaurents] = useState([]);
    const [searchText,setSearchText]=useState("");
    const [filteredRestaurent,setFilteredRestaurent] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING#"
            );
        const json = await data.json();
        
        setListOfRestaurents(json?.data?.cards?.[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurent(json?.data?.cards?.[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

   

    return listOfRestaurents == 0 ? ( <Shimmer/>) :(
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input
                        type="text"
                        className="search-box"
                        value={searchText}
                        onChange={(e)=>{
                            setSearchText(e.target.value);
                        }}  
                    />
                    <button
                    onClick={()=>{
                        const filteredRestaurent = listOfRestaurents.filter((res)=>
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurent(filteredRestaurent);
                    }}>
                        Search
                    </button>
                </div>
                
                <button
                className="filter-btn"
                onClick={() => {
                    const filteredList=listOfRestaurents.filter(
                        (res) => res.info.avgRating > 4.1
                    );
                    setFilteredRestaurent(filteredList);
                }}>
                    Top Rated Restaurents
                </button>
            </div>
            <div className="res-container">
                {
                    filteredRestaurent?.map(restaurent => 
                    <RestaurentCard key={restaurent?.info?.id} resData={restaurent}/>)
                }
            </div>
        </div>
    )
}

export default Body;