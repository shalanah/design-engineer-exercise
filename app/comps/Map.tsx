import { FeatureCollection } from "geojson";
import { geoMercator, geoPath } from "d3-geo";
import { data } from "../utils/mapData";

type MapProps = {
  width: number;
  height: number;
  people: FeatureCollection;
};

// Good place to start: https://www.react-graph-gallery.com/connection-map
export const Map = ({ width, height, people }: MapProps) => {
  const projection = geoMercator().fitSize(
    [width, height],
    data as FeatureCollection
  );

  const geoPathGenerator = geoPath().projection(projection);
  const allSvgPaths = data.features
    .filter((shape) => shape.id !== "ATA")
    .map((shape) => {
      return (
        <path
          key={shape.id}
          // @ts-ignore
          d={geoPathGenerator(shape)}
          style={{ color: "#fff" }}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1}
          fillOpacity={1}
        />
      );
    });

  const allMarkers = people.features.map((feat, i) => {
    // @ts-ignore
    const [x, y] = projection(feat.geometry.coordinates);
    return (
      <g transform={`translate(${x - 1.5} ${y - 4})`} key={i}>
        <path
          style={{
            transformOrigin: "bottom center",
            transform: feat.properties?.active ? `scale(5)` : `scale(2)`,
            transition: ".2s",
          }}
          fill={feat.properties?.active ? feat.properties?.fill : "transparent"}
          d="M1.5-0.1C0.7-0.1,0,0.6,0,1.4c0,0.8,0.7,2,1.4,2.5c0.1,0,0.1,0,0.2,0C2.3,3.5,3,2.2,3,1.4C3,0.6,2.3-0.1,1.5-0.1z M1.5,2.2
	c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C2.2,1.9,1.9,2.2,1.5,2.2z"
        />
      </g>
    );
  });

  return (
    <svg width={width} height={height}>
      {allSvgPaths}
      {allMarkers}
    </svg>
  );
};
