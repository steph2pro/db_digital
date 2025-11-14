import { Project } from "../../types";
import { mobileProjects } from "./mobile";
import { webProjects } from "./web";
import { backendProjects } from "./backend";
import { fullstackProjects } from "./fullstack";

export const projects: Project[] = [
  ...mobileProjects,
  ...webProjects,
  ...backendProjects,
  ...fullstackProjects,
];