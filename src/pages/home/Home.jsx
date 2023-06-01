import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import { getstackData, setFiltiredData } from "../../redux/action";
import "./Home.css";
import Chart from "../../components/Chart";
import { data } from "./data";

function Home({ stackData, getstackData, setFiltiredData, filteredData }) {
  const [barData, setBarData] = useState(null);

  // useEffect(() => {
  //   axios.get(
  //       "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflowRun"
  //     )
  //     .then((data) => {
  //       let stackData = data.data.items;
  //       //redux action
  //       getstackData(stackData);
  //     })
  //     .catch((err) => {
  //       console.log(err, "error");
  //     });
  // }, []);

  //alternative
  useEffect(() => {
    getstackData(data);
  }, []);

  useEffect(() => {
    setFiltiredData();
  }, [stackData]);

  useEffect(() => {
    if (filteredData.length !== 0) {
      setBarData({
        labels: filteredData.map((obj) => obj.tag),
        datasets: [
          {
            label: "count",
            data: filteredData.map((obj) => obj.count),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            yAxisID: "y",
          },
          {
            label: "averageViews",
            data: filteredData.map((obj) => obj.averageViews),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            yAxisID: "y1",
          },
        ],
      });
    }
  }, [filteredData]);

  console.log(filteredData);
  return (
    <>
      <h1 style={{ textAlign: "center" }} className="h1">Top 5 Tags</h1>
      <div className="container">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">TAG</th>
            <th scope="col">COUNT and TOTAL QUESTIONS</th>
            <th scope="col">AVERAGE VIEWS</th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((eachObj) => {
              return (
                <tr scope="row" key={eachObj.tag}>
                  <td>{eachObj.tag}</td>
                  <td>{eachObj.count}</td>
                  <td>{eachObj.averageViews}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </div>
      {barData ? <div className="d-flex justify-content-center"><Chart chartData={barData} /></div> : <h1>loading graph...</h1>}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    stackData: state.StackData,
    filteredData: state.filteredData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getstackData: (data) => dispatch(getstackData(data)),
    setFiltiredData: () => dispatch(setFiltiredData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
