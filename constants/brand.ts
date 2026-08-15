import {
  Blocks,
  BookOpen,
  Code2,
  HeartHandshake,
  Lightbulb,
  Presentation,
} from "lucide-react";

export const navItems = [
  { id: "#home", label: "Home" },
  { id: "#capabilities", label: "What we do" },
  { id: "#about-us", label: "Collective" },
  { id: "#our-works", label: "Projects" },
  { id: "#announcements", label: "Journal" },
  { id: "#contact", label: "Join us" },
];

export const focusAreas = [
  {
    icon: Code2,
    number: "01",
    title: "Product lab",
    description:
      "We turn real social needs into testable digital products through research, prototyping, and open documentation.",
  },
  {
    icon: Blocks,
    number: "02",
    title: "Creative technology",
    description:
      "We use code, interaction, and new media to design experiences that keep people at the center.",
  },
  {
    icon: HeartHandshake,
    number: "03",
    title: "Social impact",
    description:
      "We build ideas with measurable value for education, accessibility, and better urban life.",
  },
  {
    icon: Lightbulb,
    number: "04",
    title: "Open workshops",
    description:
      "Short, hands-on, cross-disciplinary learning spaces where curiosity is the only prerequisite.",
  },
  {
    icon: BookOpen,
    number: "05",
    title: "Shared knowledge",
    description:
      "We document the process, the wrong turns, and what worked to build a useful collective memory.",
  },
  {
    icon: Presentation,
    number: "06",
    title: "Demo nights",
    description:
      "We put unfinished work in the room and use honest feedback to find its strongest next move.",
  },
];

export const collectiveStats = [
  { value: "120+", label: "active makers" },
  { value: "18", label: "open projects" },
  { value: "36", label: "workshops hosted" },
  { value: "9", label: "disciplines" },
];

export const demoProjects = [
  {
    id: "demo-breathing-map",
    title: "Breathing Map",
    content:
      "An open-data experience that turns neighborhood air quality readings into clear, actionable insight.",
    tag: "Open data",
    accent: "from-[#ff6b35] via-[#ff8c5a] to-[#ffc46b]",
    createdAt: "2026-04-18",
    updatedAt: "2026-04-18",
  },
  {
    id: "demo-threshold",
    title: "Threshold",
    content:
      "A participatory research platform for documenting accessibility barriers across public spaces.",
    tag: "Urban technology",
    accent: "from-[#6c5ce7] via-[#8678ef] to-[#b8afff]",
    createdAt: "2026-03-06",
    updatedAt: "2026-03-06",
  },
  {
    id: "demo-city-sound",
    title: "Sound of the City",
    content:
      "An interactive archive and new-media installation composed from the everyday sounds of the city.",
    tag: "New media",
    accent: "from-[#10253f] via-[#164e63] to-[#22d3a7]",
    createdAt: "2026-01-22",
    updatedAt: "2026-01-22",
  },
];

export const demoNotes = [
  {
    id: "demo-1",
    category: "Open call",
    title: "Spring project teams are now forming",
    preview:
      "We are looking for new collaborators across design, engineering, research, and communications.",
    date: "May 12, 2026",
    accent: "from-[#ff6b35] via-[#f05a2a] to-[#992b11]",
  },
  {
    id: "demo-2",
    category: "Workshop",
    title: "From an idea to a prototype in 48 hours",
    preview:
      "A practical weekend on rapid research, sharp scoping, and building just enough to learn.",
    date: "April 28, 2026",
    accent: "from-[#6c5ce7] via-[#493aa8] to-[#17112f]",
  },
  {
    id: "demo-3",
    category: "Studio note",
    title: "Designing products that communities can own",
    preview:
      "The principles we use to treat participation as the product's core behavior—not a feature.",
    date: "April 9, 2026",
    accent: "from-[#173e47] via-[#0d7377] to-[#16a085]",
  },
];
