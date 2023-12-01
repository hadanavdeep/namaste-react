import RestaurentCard from "../components/RestaurentCard";
import resList from "../utils/mockDATA";

const Body = () => {
    return(
        <div className="body">
            <div className="Search">Search</div>
            <div className="res-container">
                {
                    resList.map(restaurent => 
                    <RestaurentCard key={restaurent.info.id} resData={restaurent}/>)
                }
            </div>
        </div>
    )
}

export default Body;