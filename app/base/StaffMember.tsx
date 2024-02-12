import React from "react";

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
};

export const StaffMember = ({
  team = "Engineering",
  name = "Adnan",
  role = "Software Engineer",
  location = "Global Cost of Living ",
  salary = "$157,827",
  avatar = "Placeholder_avatar.jpg",
  start_date = "Jan 4, 2016",
  country = "",
  city = "Church Of Living Grace (Cheung Sha Wan) 基督教恩霖堂(長沙灣堂)",
}: StaffMemberProps) => {
  // use dd/dt html tag
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{location}</p>
    </div>
  );
};
