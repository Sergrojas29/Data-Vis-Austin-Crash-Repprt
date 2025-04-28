import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import DataAustin, { CrashData } from "../utils/DataClass";



export default function D3Chart({prop}: prop) {
  const [Data, setData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const svgRef = useRef<SVGSVGElement>(null);

  // Initial Data to get the data from the prop.prop. Which is the CrashData[]
  useEffect(() => {
    if (prop !== undefined) {
      const updateInfo = async () => {
        const result = await DataAustin.calendarYear(prop);
        setData(result);
      };
      updateInfo();

    }
  }, [prop]);

  //Full D3 line Chart
  useEffect(() => {
    if (!Data.length) return;

    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    svg.selectAll("*").remove(); // Clear previous render

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const xScale = d3
      .scalePoint()
      .domain(months)
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(Data) ?? 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<number>()
      .x((_, i) => xScale(months[i])!)
      .y(d => yScale(d));

    svg.attr("width", width).attr("height", height);

    // X-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    // Y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // Line path
    svg
      .append("path")
      .datum(Data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

  
    svg
      .selectAll("circle")
      .data(Data)
      .enter()
      .append("circle")
      .attr("cx", (_, i) => xScale(months[i])!)
      .attr("cy", d => yScale(d))
      .attr("r", 3)
      .attr("fill", "steelblue");
  }, [Data]);

  

  return (
    <>
      <div className="d3Chart">
        <svg ref={svgRef}></svg>
      </div>
    </>
  );
}
