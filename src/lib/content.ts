import profileData from "../../content/profile.json";
import projectsData from "../../content/projects.json";
import timelineData from "../../content/timeline.json";
import type { Profile, Project, TimelineEntry } from "@/types/content";

export function getProfile(): Profile {
  return {
    ...profileData,
    socialLinks: [...profileData.socialLinks]
      .filter((link) => link.visible)
      .sort((a, b) => a.order - b.order)
  } as Profile;
}

export function getProjects(): Project[] {
  return [...(projectsData as Project[])].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.startDate.localeCompare(a.startDate);
  });
}

export function getFeaturedProjects(limit = 3): Project[] {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getTimelineEntries(): TimelineEntry[] {
  return [...(timelineData as TimelineEntry[])].sort((a, b) => {
    const dateSort = b.date.localeCompare(a.date);
    return dateSort !== 0 ? dateSort : a.order - b.order;
  });
}

export function getTimelinePreview(limit = 3): TimelineEntry[] {
  return getTimelineEntries().slice(0, limit);
}
