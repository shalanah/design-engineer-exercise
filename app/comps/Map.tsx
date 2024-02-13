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
          style={{ color: "#f0f0f0" }}
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
      <circle
        key={i}
        cx={x}
        cy={y}
        r={2}
        fill="none"
        stroke={feat.properties?.active ? feat.properties?.fill : "#777"}
        // stroke={"#888"}
        strokeOpacity={0.5}
      />
    );
  });

  return (
    <svg
      width={width}
      height={height}
      // style={{ outline: "1px solid red" }}
    >
      {allSvgPaths}
      {allMarkers}
    </svg>
  );
};
