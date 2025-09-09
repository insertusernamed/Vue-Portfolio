import { defineStore } from 'pinia'
import { fetchGitHubProjects } from '../services/github'
import type { CachedData, GitHubProject } from '../types/github'

const CACHE_KEY = 'github_projects_cache'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export const useGitHubStore = defineStore('github', {
    state: () => ({
        projects: [] as GitHubProject[],
        loading: false,
        error: null as string | null,
        lastFetched: null as number | null
    }),

    getters: {
        hasProjects(): boolean {
            return this.projects.length > 0
        },

        isDataStale(): boolean {
            if (!this.lastFetched) return true
            return Date.now() - this.lastFetched > CACHE_DURATION
        }
    },

    actions: {
        async fetchProjects(forceRefresh = false) {
            // Return cached data if available and not stale
            if (!forceRefresh && this.hasProjects && !this.isDataStale) {
                return this.projects
            }

            // Check localStorage cache
            if (!forceRefresh) {
                const cached = localStorage.getItem(CACHE_KEY)
                if (cached) {
                    const cachedData: CachedData = JSON.parse(cached)
                    const now = Date.now()

                    if (now - cachedData.timestamp < CACHE_DURATION) {
                        console.log('Returning cached data from localStorage')
                        this.projects = cachedData.projects
                        this.lastFetched = cachedData.timestamp
                        return this.projects
                    }
                }
            }

            // Fetch fresh data
            this.loading = true
            this.error = null

            try {
                const fetchedProjects = await fetchGitHubProjects()

                // Update store state
                this.projects = fetchedProjects
                this.lastFetched = Date.now()

                // Cache the fresh data
                const cacheData: CachedData = {
                    projects: fetchedProjects,
                    timestamp: this.lastFetched,
                }
                localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))

                return this.projects
            } catch (err) {
                this.error = 'Failed to load projects'
                console.error(err)

                // If API call fails, return cached data if available
                const cached = localStorage.getItem(CACHE_KEY)
                if (cached) {
                    const cachedData: CachedData = JSON.parse(cached)
                    this.projects = cachedData.projects
                    this.lastFetched = cachedData.timestamp
                    return this.projects
                }

                throw err
            } finally {
                this.loading = false
            }
        },

        clearCache() {
            localStorage.removeItem(CACHE_KEY)
            this.projects = []
            this.lastFetched = null
        }
    }
})