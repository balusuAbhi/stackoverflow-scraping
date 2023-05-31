import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getstackData } from "../../redux/action";
import "./Home.css";
import Chart from "../../components/Chart";

function Home({ stackData,getstackData }) {
  console.log(stackData);
  useEffect(() => {
    axios
      .get(
        "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"
      )
      .then((data) => {
        let stackData = data.data.items;
        //redux action
        getstackData(stackData);
      })
      .catch((err)=>{
        console.log(err,"error")
      })
  },[]);
  return (
    <>
    {/* {stackData && stackData.map((eachQuestion)=>{
      return <div key={eachQuestion.question_id}>
        <h1>{eachQuestion.score}</h1>
      
      </div>
    })} */}
    <Chart/>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    stackData: state.StackData,
  };
};
const mapDispatchToProps = (dispatch)=>{
  return{
    getstackData : (data)=>dispatch(getstackData(data)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);
