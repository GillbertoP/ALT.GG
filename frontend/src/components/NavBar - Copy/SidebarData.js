import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Games",
    path: "/games",
    icon: <FaIcons.FaGamepad />,
    cName: "nav-text",
  },
  {
    title: "Guides",
    path: "/guidepage",
    icon: <AiIcons.AiFillBook />,
    cName: "nav-text",
  },
  {
    title: "Blog",
    path: "/blog",
    icon: <AiIcons.AiFillAccountBook />,
    cName: "nav-text",
  },
];
