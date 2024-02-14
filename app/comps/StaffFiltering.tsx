import React from "react";
import { Select } from "./Select";
import {
  Cross2Icon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import { TeamButton } from "./TeamButton";
import { teams, teamData } from "../utils/team";
import "./StaffFiltering.css";

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

export const StaffFiltering = ({
  setSearch,
  isSearching,
  showAllTeams,
  selectedTeams,
  setSelectedTeams,
  setAllTeamsSelected,
  count,
  total,
}: {
  setSearch: React.Dispatch<
    React.SetStateAction<{
      search: string;
      isSearching: boolean;
    }>
  >;
  isSearching: boolean;
  showAllTeams: boolean;
  selectedTeams: string[];
  setSelectedTeams: React.Dispatch<React.SetStateAction<string[]>>;
  setAllTeamsSelected: () => void;
  count: number;
  total: number;
}) => {
  return (
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
  );
};
