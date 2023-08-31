import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";
import Header from "../Header";

const BreakdownCheckTypeChart = ({ isDashboard = false }) => {

  const allChecks = useSelector((state) => state.checks);

  const checks = allChecks.filter(item => item.type === "Chèque");
  const traites = allChecks.filter(item => item.type === "Traite");

  const colors = ["#2663a9", "#6ea8cc"];
  const initData = {
    "Chèque": checks.length,
    "Traite": traites.length
  }

  const formattedData = Object.entries(initData).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i]
    })
  );

  let sum = 0;
  for (let key in initData) {
    if (initData.hasOwnProperty(key)) {
      sum += parseFloat(initData[key]);
    }
  }

  // console.log("valuesArray", sum);
  const valueFormatter = (value) =>
    `${value} (${((value / sum) * 100).toFixed(0)}%)`;

  return (
    <div
      style={{
        height: isDashboard ? "460px" : "100%",
        width: "400px",
        minHeight: isDashboard ? "325px" : undefined,
        minWidth: isDashboard ? "325px" : undefined,
        position: "relative",
      }}
    >
      <Header title="Chèques VS Traites" subtitle="Nombre de Ch/Tr" />
      <ResponsivePie
        data={formattedData}
        valueFormat={valueFormatter}
        cornerRadius={0}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: "#ff7e86"
              }
            },
            legend: {
              text: {
                fill: "#ff7e86"
              }
            },
            ticks: {
              line: {
                stroke: "#ff7e86",
                strokeWidth: 1
              },
              text: {
                fill: "#ff7e86"
              }
            }
          },
          legends: {
            text: {
              fill: "#ff7e86"
            }
          },
          tooltip: {
            container: {
              color: "#000000"
            }
          }
        }}
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 0, bottom: 100, left: 120 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]]
        }}
        enableArcLinkLabels={!isDashboard}
        enableRadialLabels={true}
        arcLinkLabelsTextColor={"#ff7e86"}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]]
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#2663a9"
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
};

export default BreakdownCheckTypeChart;
