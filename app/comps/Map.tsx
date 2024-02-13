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
    // TODO: swap out the pin design add scale animation
    // TODO: add even more active hover state
    return (
      <g transform={`translate(${x - 2} ${y - 2})`} key={i}>
        <circle
          r={5}
          fill={feat.properties?.active ? feat.properties?.fill : "transparent"}
          style={{ transition: ".2s" }}
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
