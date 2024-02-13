import React, { useState } from "react";
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

// TODO: Deploy
// TODO: Code clean up
// TODO: Animation tidy up
// TODO: What's with the weird text select behavior?
// TODO: Figure out if all the fonts are being pulled in correctly
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
  return (
    <div>
      <div style={{ margin: "30px auto", maxWidth: 500 }}>
        <div
          style={{
            width: "100%",
            padding: "0px 15px",
            marginBottom: 15,
          }}
        >
          <div
            style={{
              width: "100%",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
              background: "#fff",
              borderRadius: 20,
              padding: "20px 20px",
            }}
          >
            <Map
              width={420}
              height={250}
              people={{
                type: "FeatureCollection",
                features: people.data.map((employee) => {
                  return {
                    type: "Feature",
                    properties: {
                      fill: teamData[employee.team].color,
                      active: false,
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
                if (prev.isSearching)
                  return {
                    search: "",
                    isSearching: false,
                  };
                else {
                  return {
                    ...prev,
                    isSearching: true,
                  };
                }
              });
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
          key={textSearch + selectedTeams.join("-")}
          style={{
            overscrollBehavior: "contain",
            height: "500px",
            overflowY: "auto",
            position: "relative",
            gap: 10,
            display: "flex",
            flexDirection: "column",
            scrollMargin: "10px",
            borderBottom: "1px solid #efefef",
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
  );
};
