import React, { useEffect, useState } from "react";
import axios from "axios";
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
      <h1 style={{ textAlign: "center" }}>top 5 tags</h1>
      <table>
        <thead>
          <tr>
            <th>TAG</th>
            <th>COUNT</th>
            <th>AVERAGE VIEWS</th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((eachObj) => {
              return (
                <tr key={eachObj.tag}>
                  <td>{eachObj.tag}</td>
                  <td>{eachObj.count}</td>
                  <td>{eachObj.averageViews}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {barData ? <Chart chartData={barData} /> : <h1>loading graph...</h1>}
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
