import React, { useEffect, useState } from "react";
import { StaffMember } from "./StaffMember";
import "./StaffMembers.css";
import { teamData } from "../utils/team";
import { Map } from "./Map";
import { useMeasure } from "react-use";
import { StaffFiltering } from "./StaffFiltering";
import people from "../../team.json";
import useStaffContext from "../hooks/useStaffContext";

// TODO: Code clean up
// TODO: Animation tidy up
export const StaffMembers = () => {
  const {
    selectedTeams,
    count,
    total,
    isSearching,
    setSelectedTeams,
    filteredPeople,
    outsideSearch,
    cleanSearch,
  } = useStaffContext();

  const [mapRef, { width, height }] = useMeasure();
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const horizSetUp = windowSize.width >= 1400;

  if (windowSize.width === 0) return null; // let's not render anything if we don't have a window size yet
  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        padding: horizSetUp ? "max(16vmin, 15px)" : 20,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: horizSetUp ? 1400 : 400,
          margin: "0 auto",
          gap: horizSetUp ? "max(3vmin, 15px)" : 5,
          display: "flex",
          flexDirection: horizSetUp ? "row" : "column",
          height: horizSetUp ? "100%" : "calc(100dvh - 40px)",
        }}
      >
        {/* Map */}
        <div
          style={{
            flex: horizSetUp ? 1 : 0,
            height: horizSetUp ? "100%" : "auto",
            padding: "0px 15px",
          }}
        >
          <div
            // @ts-ignore
            ref={mapRef}
            style={{
              width: "100%",
              height: horizSetUp ? "100%" : 210 + 30,
              background:
                "linear-gradient(45deg, oklch(from rgb(41, 98, 255) 0.95 0.05 h), oklch(from #008db4 0.95 0.05 h))",
              boxShadow: "0 0 50px inset rgb(41, 98, 255, .1)",
              borderRadius: 20,
              padding: horizSetUp ? "40px" : "15px",
            }}
          >
            <div>
              <Map
                width={horizSetUp ? width - 40 : width - 30}
                height={horizSetUp ? height - 40 : 210}
                people={{
                  type: "FeatureCollection",
                  features: people.data.map((employee) => {
                    return {
                      type: "Feature",
                      properties: {
                        fill: teamData[employee.team].color,
                        active: filteredPeople.includes(employee),
                      },
                      geometry: {
                        type: "Point",
                        coordinates: [employee.coord.lng, employee.coord.lat],
                      },
                    };
                  }),
                }}
              />
            </div>
          </div>
        </div>
        {/* List */}
        <div
          style={{
            width: horizSetUp ? 400 : "100%",
            flex: horizSetUp ? "" : 1,
          }}
          className="d-flex flex-column"
        >
          <StaffFiltering />
          <section
            className="staff-members-container"
            key={selectedTeams.join("-")}
            style={{
              overscrollBehavior: "contain",
              flex: horizSetUp ? 1 : "",
              overflowY: "auto",
              position: "relative",
              gap: 10,
              display: "flex",
              flexDirection: "column",
              scrollMargin: "10px",
              borderBottom: "1px solid #efefef",
              height: horizSetUp ? "" : "calc(100dvh - 340px)",
            }}
          >
            <div
              style={{
                height: 10,
                flexShrink: 0,
              }}
            />
            {filteredPeople.map((member, i: number) => (
              // might be nice to add id attached to each member - good for animation
              <StaffMember
                noAnimation={isSearching}
                itemIndex={i}
                key={`${member.name}-${i}-${selectedTeams.join("-")}`}
                onTeamClick={() => setSelectedTeams([member.team])}
                teamData={teamData}
                {...member}
              />
            ))}
            <div
              className="d-flex justify-content-between align-items-center"
              key={`${selectedTeams.join("-")}-${count}-${total}`}
              style={{
                margin: "10px 40px",
                fontSize: ".75rem",
                animation: `fadeIn .5s ${count * 0.15}s both`,
              }}
            >
              {filteredPeople.length === 0 ? (
                <div>
                  No matches for &quot;{cleanSearch}&quot;
                  {outsideSearch.length > 0 && selectedTeams.length !== 0
                    ? ` within ${selectedTeams.join(", ")}`
                    : ""}
                </div>
              ) : (
                <div />
              )}
              <div>
                {count} of {total}
              </div>
            </div>
            {outsideSearch.length > 0 && (
              <>
                <div
                  style={{
                    padding: "20px 40px",
                    fontSize: ".75rem",
                    borderTop: "1px dotted #ccc",
                  }}
                >
                  Other results for &quot;{cleanSearch}&quot;
                </div>
                {outsideSearch.map((member, i: number) => (
                  // might be nice to add id attached to each member - good for animation
                  <StaffMember
                    itemIndex={i}
                    key={`${member.name}-${i}-${selectedTeams.join("-")}`}
                    onTeamClick={() => setSelectedTeams([member.team])}
                    teamData={teamData}
                    {...member}
                  />
                ))}
              </>
            )}
            <div
              style={{
                height: 0,
                flexShrink: 0,
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
};
