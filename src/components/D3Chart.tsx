import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import DataAustin, { CrashData } from "../utils/DataClass";
import { data } from "react-router-dom";

export default function D3Chart(prop) {
  const [Data, setData] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
  const svgRef = useRef();



  useEffect(() => {
    //setting svg
    const w = 800;
    const h = 125;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#d3d3d3")
      .style("margin-top", "5")
      .style("margin-left", "50")
      .style('overflow','visible');
    //setting the scaling
    const xScale =d3.scaleLinear().domain([0,Data.length -1]).range([0,w]);
    const yScale =d3.scaleLinear().domain([0,h]).range([h,0]);
    const genrateScaleLine: d3.Line<[number, number]> = d3.line<[number, number]>()
      .x((d, i: number) => xScale(i))
      .y(yScale)
      // .curve(d3.curveCardinal)

    //set axes

    const xAxis = d3.axisBottom(xScale).ticks(Data.length).tickFormat(i => i + 1)
    const yAxis = d3.axisLeft(yScale).ticks (5);

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`)
    svg.append('g')
      .call(yAxis)

    //setting up the data for svg
    svg.selectAll('.line').data([Data]).join('path').attr('d',d => genrateScaleLine(d)).attr('fill','none').attr('stroke','black')
    setData(DataAustin.calanderYear(prop.prop))
    // console.log(DataAustin.calanderYear(prop.prop))
  }, [prop.prop]);

  return (
    <>
      <div className="d3Chart">
        <svg ref={svgRef}></svg>
      </div>
    </>
  );
}
