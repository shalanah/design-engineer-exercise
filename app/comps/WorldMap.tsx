// import React, { useRef, useEffect } from "react";
// import * as d3 from "d3";

// const WorldMap = ({ data }: { data: any }) => {
//   const svgRef = useRef<SVGSVGElement | null>(null);

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);

//     // Define the projection (Mercator)
//     const projection = d3.geoMercator();

//     // Define path generator
//     const path = d3.geoPath().projection(projection);

//     // Load world map data
//     d3.json(
//       "https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.v1.json"
//     ).then((world) => {
//       // Draw world map
//       svg
//         .append("path")
//         .datum({ type: "Sphere" })
//         .attr("class", "sphere")
//         // @ts-ignore
//         .attr("d", path);
//       svg
//         .append("path")
//         .datum(d3.geoGraticule())
//         .attr("class", "graticule")
//         .attr("d", path);
//       svg
//         .append("g")
//         .selectAll("circle")
//         .data(data)
//         .enter()
//         .append("circle")
//         // @ts-ignore
//         .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
//         // @ts-ignore
//         .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
//         .attr("r", 4)
//         .style("fill", "red");
//     });
//   }, [data]);

//   return <svg ref={svgRef} />;
// };

// export default WorldMap;
