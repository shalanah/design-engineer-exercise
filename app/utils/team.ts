export const teamColors = [
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

export const getShorthandCountry = (country: string) => {
  switch (country) {
    case "United States":
      return "USA";
    case "United Kingdom":
      return "UK";
    default:
      return country;
  }
};

export type StaffMemberProps = {
  team: string;
  name: string;
  role: string;
  location: string;
  salary: string;
  avatar: string;
  start_date: string;
  country: string;
  city: string;
  emoji: string;
};
