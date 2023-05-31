import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getstackData } from "../../redux/action";
import "./Home.css";

function Home({ stackData,getstackData }) {
  console.log(stackData);
  useEffect(() => {
    axios
      .get(
        "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"
      )
      .then((data) => {
        let overFlowData = data.data.items;
        getstackData(overFlowData)
      });
  },[]);
  return (
    <>
    {stackData && stackData.map((eachQuestion)=>{
      return <div key={eachQuestion.question_id}>
        <h1>{eachQuestion.score}</h1>
      
      </div>
    })}
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
