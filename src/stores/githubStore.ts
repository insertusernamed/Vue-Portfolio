import { defineStore } from 'pinia'
import { fetchGitHubProjects } from '../services/github'
import type { CachedData, GitHubProject } from '../types/github'

const CACHE_KEY = 'github_projects_cache'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export const useGitHubStore = defineStore('github', {
    state: () => ({
        pinnedProjects: [] as GitHubProject[],
        otherProjects: [] as GitHubProject[],
        loading: false,
        error: null as string | null,
        lastFetched: null as number | null
    }),

    getters: {
        hasProjects(): boolean {
            return this.pinnedProjects.length > 0 || this.otherProjects.length > 0
        },

        isDataStale(): boolean {
            if (!this.lastFetched) return true
            return Date.now() - this.lastFetched > CACHE_DURATION
        },

        allProjects(): GitHubProject[] {
            return [...this.pinnedProjects, ...this.otherProjects]
        }
    },

    actions: {
        async fetchProjects(forceRefresh = false) {
            // Return cached data if available and not stale
            if (!forceRefresh && this.hasProjects && !this.isDataStale) {
                return { pinned: this.pinnedProjects, other: this.otherProjects }
            }

            // Check localStorage cache
            if (!forceRefresh) {
                const cached = localStorage.getItem(CACHE_KEY)
                if (cached) {
                    try {
                        const cachedData: CachedData = JSON.parse(cached)
                        const now = Date.now()

                        if (now - cachedData.timestamp < CACHE_DURATION) {
                            this.pinnedProjects = cachedData.pinnedProjects
                            this.otherProjects = cachedData.otherProjects
                            this.lastFetched = cachedData.timestamp
                            return { pinned: this.pinnedProjects, other: this.otherProjects }
                        }
                    } catch (e) {
                        console.error('Error parsing cached data:', e)
                    }
                }
            }            // Fetch fresh data
            this.loading = true
            this.error = null

            try {
                const { pinned, other } = await fetchGitHubProjects()

                // Update store state
                this.pinnedProjects = pinned
                this.otherProjects = other
                this.lastFetched = Date.now()

                // Cache the fresh data
                const cacheData: CachedData = {
                    pinnedProjects: pinned,
                    otherProjects: other,
                    timestamp: this.lastFetched,
                }
                localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))

                return { pinned: this.pinnedProjects, other: this.otherProjects }
            } catch (err: any) {
                console.error('GitHub GraphQL API Error:', err)

                this.error = 'Failed to load projects'

                // If API call fails, return cached data if available
                const cached = localStorage.getItem(CACHE_KEY)
                if (cached) {
                    const cachedData: CachedData = JSON.parse(cached)
                    this.pinnedProjects = cachedData.pinnedProjects
                    this.otherProjects = cachedData.otherProjects
                    this.lastFetched = cachedData.timestamp
                    return { pinned: this.pinnedProjects, other: this.otherProjects }
                }

                throw err
            } finally {
                this.loading = false
            }
        },

        clearCache() {
            localStorage.removeItem(CACHE_KEY)
            this.pinnedProjects = []
            this.otherProjects = []
            this.lastFetched = null
        }
    }
})