import React, { useState } from "react";
import people from "../../team.json";
import { StaffMember, StaffMemberProps } from "./StaffMember";
import { Select } from "./Select";
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";

const teams = [...new Set(people.data.map((employee) => employee.team))];
const colors = [
  "#2962FF",
  "#9500FF",
  "#e90eff",
  "#FF0059",
  "#FF8C00",
  "#5d9f00",
  "#00a48b",
  "#008db4",
  "#444",
];
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
// TODO: Search UI
// TODO: What's with the weird text select behavior?
// TODO: Figure out if all the fonts are being pulled in correctly
export const StaffMembers = () => {
  const [selectedTeams, setSelectedTeams] = useState(teams); // maybe someday multiple departments can be selected
  const [isSearching, setIsSearching] = useState(false); // maybe someday multiple departments can be selected
  const [search, setSearch] = useState(""); // maybe someday multiple departments can be selected
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
    <div style={{ margin: "30px auto", maxWidth: 500 }}>
      <div
        className="d-flex align-items-center"
        style={{
          fontSize: ".9rem",
          padding: "0px 38px 0px 30px",
          height: 50,
          borderBottom: "1px solid #efefef",
          gap: 10,
        }}
      >
        <button onClick={() => setIsSearching(true)} style={{ lineHeight: 0 }}>
          <MagnifyingGlassIcon width={20} height={20} />
        </button>
        {isSearching && (
          <label>
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        )}
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
                  <button
                    onClick={setAllTeamsSelected}
                    className="d-flex align-items-center"
                    style={{
                      gap: ".4em",
                      fontSize: ".75rem",
                      padding: ".25em .75em",
                      border: "1px solid #ccc",
                      borderRadius: "1em",
                    }}
                    key={item}
                  >
                    {item}
                    <Cross2Icon width={10} height={10} />
                  </button>
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
  );
};
