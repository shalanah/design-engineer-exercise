import React, { useContext, createContext, useState, ReactNode } from "react";
import people from "../../team.json";
import { teams, StaffMemberProps } from "../utils/team";

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

interface StaffContextInterface {
  setSearch: React.Dispatch<
    React.SetStateAction<{
      search: string;
      isSearching: boolean;
    }>
  >;
  total: number;
  showAllTeams: boolean;
  outsideSearch: StaffMemberProps[];
  setAllTeamsSelected: () => void;
  selectedTeams: string[];
  count: number;
  isSearching: boolean;
  setSelectedTeams: React.Dispatch<React.SetStateAction<string[]>>;
  filteredPeople: StaffMemberProps[];
  cleanSearch: string;
}

// Game state... could probably be broken out into smaller files / hooks
export const StaffContext = createContext<StaffContextInterface | null>(null);
export const StaffContextProvider = ({ children }: { children: ReactNode }) => {
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
    <StaffContext.Provider
      value={{
        setSearch,
        total,
        showAllTeams,
        outsideSearch,
        setAllTeamsSelected,
        selectedTeams,
        count,
        isSearching,
        setSelectedTeams,
        filteredPeople,
        cleanSearch,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};

const useStaffContext = () => {
  const context = useContext(StaffContext);
  if (!context) {
    // Let's yell at ourselves to make sure we use our Provider wrapper
    throw new Error(
      "Oooops, I'm guessing your forgot to use the Provider for this context"
    );
  }
  return context;
};

export default useStaffContext;
