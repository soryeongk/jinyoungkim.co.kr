import type { Profile } from '../types/profile'

export function getSiteTitle(profile: Profile): string {
  return `${profile.name.ko} · ${profile.name.en}`
}

export function getSiteDescription(profile: Profile): string {
  return profile.description ?? getSiteTitle(profile)
}
