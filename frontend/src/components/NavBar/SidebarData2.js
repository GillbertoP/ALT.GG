import React from "react";
import * as FaIcons from "react-icons/fa";

const SidebarData2 = [
  {
    menuIcon: <FaIcons.FaGamepad />,
    menuText: "Games",
    to: "#",
    subMenus: [
      {
        menuIcon:
          "https://res.cloudinary.com/seproject/image/upload/v1648037548/Games/Icons/mhrlogo_ez00kk.png",
        menuText: "Monster Hunter: Rise",
        to: "/mhr",
      },
      {
        menuIcon:
          "https://res.cloudinary.com/seproject/image/upload/v1648037547/Games/Icons/dota2logo_ipdspr.png",
        menuText: "Dota 2",
        to: "/dota2",
      },
    ],
  },
  {
    menuIcon: <FaIcons.FaBookOpen />,
    menuText: "Guides",
    to: "/guidepage",
  },
  {
    menuIcon: <FaIcons.FaPodcast />,
    menuText: "Discussions",
    to: "/discussions",
  },
];

export default SidebarData2;
