import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
            count:0,
            count2:2,
            userInfo:{
                name:"Dummy",
                location:"default",
            },
        };
    }

    async componentDidMount(){
        const data=await fetch("https://api.github.com/users/hadanavdeep");
        const json=await data.json();

        this.setState({
            userInfo:json,
        });
    } 

    render(){
        //const {name,location}=this.props;
        const {count,count2}=this.state;

        const{name,location,avatar_url}=this.state.userInfo;

        return(
            <div className="user-card">
                <h1>Count:{count}</h1>
                <h1>Count2:{count2}</h1>
                <button
                    onClick={()=>{
                    this.setState({
                        count:this.state.count+1,
                        count2:this.state.count2+1,
                    });
                 }}>
                Count Increase
                </button>
                <img src={avatar_url}/>
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h3>Contact: @navdeephada</h3>
            </div>
        );  
    }
}



export default UserClass;