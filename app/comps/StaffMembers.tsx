import React, { useEffect, useState } from "react";
import people from "../../team.json";
import { StaffMember } from "./StaffMember";
import { Select } from "./Select";
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import "./StaffMembers.css";
import { teamColors as colors, StaffMemberProps } from "../utils/team";
import { TeamButton } from "./TeamButton";
import { Map } from "./Map";
import { useMeasure, useWindowSize } from "react-use";

const teams = [...new Set(people.data.map((employee) => employee.team))];

const teamData = Object.fromEntries(
  teams.map((department, i) => [
    department,
    {
      bg: colors[i],
      color: colors[i],
      count: people.data.filter((employee) => employee.team === department)
        .length,
    },
  ])
);
const selectItems = [
  { text: "All", value: "all" },
  ...teams.map((v) => {
    return {
      text: (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ minWidth: 120 }}
        >
          <span>{v}</span>
          <span
            className="heading"
            style={{
              fontSize: ".6rem",
              padding: "8px 3px",
              lineHeight: 0,
              borderRadius: 100,
              minWidth: 22,
              textAlign: "center",
              background: teamData[v].color,
              color: "#fff",
            }}
          >
            {teamData[v].count}
          </span>
        </div>
      ),
      value: v,
    };
  }),
];

// Function to normalize strings by removing accents
function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
const textSearch = (member: StaffMemberProps, cleanSearch: string) =>
  (
    [
      "name",
      "team",
      "role",
      "location",
      "country",
      "city",
    ] as (keyof StaffMemberProps)[]
  ).some((key) =>
    normalizeString(member[key]).includes(normalizeString(cleanSearch))
  );

// TODO: Code clean up
// TODO: Animation tidy up
export const StaffMembers = () => {
  const [selectedTeams, setSelectedTeams] = useState(teams); // maybe someday multiple departments can be selected
  const [{ search, isSearching }, setSearch] = useState({
    search: "",
    isSearching: false,
  });
  const setAllTeamsSelected = () => setSelectedTeams(teams);
  const total = people.data.length;
  const showAllTeams = selectedTeams.length === teams.length;
  const cleanSearch = search.trim();
  const useSearch = cleanSearch.length > 0;
  const filteredPeople = people.data.filter(
    (member) =>
      selectedTeams.includes(member.team) &&
      (!isSearching || !useSearch || textSearch(member, cleanSearch))
  );
  const count = filteredPeople.length;
  const outsideSearch =
    count === 0
      ? people.data.filter((member) => textSearch(member, cleanSearch))
      : [];
  const [mapRef, { width, height }] = useMeasure();
  // const { width: winWidth, height: winHeight } = useWindowSize();

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
  }, []); // Empty array ensures that effect is only run on mount

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
          style={{ width: 400, flex: horizSetUp ? "" : 1 }}
          className="d-flex flex-column"
        >
          <div
            className="d-flex align-items-center"
            style={{
              fontSize: ".9rem",
              padding: "0px 38px 0px 30px",
              height: 50,
              borderBottom: "1px solid #efefef",
              gap: 10,
              position: "relative",
            }}
          >
            {/* TODO: Add label text */}
            <label
              className="search-icon"
              htmlFor="search"
              onClick={() => {
                setSearch((prev) => {
                  return {
                    search: "",
                    isSearching: !prev.isSearching,
                  };
                });
                const searchEl = document.getElementById(
                  "search"
                ) as HTMLInputElement;
                if (searchEl) searchEl.value = "";
              }}
              style={{ lineHeight: 0 }}
            >
              {!isSearching ? (
                <MagnifyingGlassIcon width={20} height={20} />
              ) : (
                <Cross2Icon width={20} height={20} />
              )}
            </label>
            <input
              className={isSearching ? "show" : "hide"}
              id={"search"}
              type="search"
              placeholder="Search"
              autoComplete="off"
              onChange={(e) =>
                setSearch(() => {
                  return {
                    isSearching: true,
                    search: e.target.value,
                  };
                })
              }
            />
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: 5 }}
            >
              <Select
                onValueChange={(value) => {
                  if (value === "all") setAllTeamsSelected();
                  else setSelectedTeams([value]);
                }}
                value={showAllTeams ? "all" : selectedTeams[0]}
                button={
                  <button
                    className="d-flex align-items-center teams-button"
                    style={{ gap: 3, fontSize: "0.75rem" }}
                  >
                    Teams <ChevronDownIcon style={{ marginTop: "-2" }} />
                  </button>
                }
                items={selectItems}
              />
              <span>
                {showAllTeams ? null : (
                  <>
                    {selectedTeams.map((item) => (
                      <TeamButton
                        key={item}
                        onClick={setAllTeamsSelected}
                        color={teamData[item].color}
                        team={item}
                        includeClose
                      />
                    ))}
                  </>
                )}
              </span>
            </div>
            <span style={{ margin: "auto 0 auto auto", fontSize: ".75rem" }}>
              {count} of {total}
            </span>
          </div>
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
