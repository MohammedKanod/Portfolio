import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohammed Kanod — Builder, Cybersecurity & Technology",
    short_name: "Kanod",
    description:
      "Portfolio and experimental laboratory of Mohammed Kanod — Computer Science & Cybersecurity student, systems builder, and experimenter.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F4EF",
    theme_color: "#F5F4EF",
    icons: [
      {
        src: "/profile.jpg",
        sizes: "192x192 512x512",
        type: "image/jpeg",
      },
    ],
  };
}
