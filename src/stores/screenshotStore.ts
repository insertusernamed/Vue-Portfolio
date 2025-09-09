import { defineStore } from 'pinia'
import { fetchProjectScreenshots, fetchSingleScreenshot } from '../services/screenshot'
import type { ScreenshotProject } from '../types/screenshot'

interface CachedScreenshotData {
    screenshots: ScreenshotProject[]
    timestamp: number
}

const CACHE_KEY = 'project_screenshots_cache'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export const useScreenshotStore = defineStore('screenshot', {
    state: () => ({
        screenshots: [] as ScreenshotProject[],
        loading: false,
        error: null as string | null,
        lastFetched: null as number | null
    }),

    getters: {
        hasScreenshots(): boolean {
            return this.screenshots.length > 0
        },

        isDataStale(): boolean {
            if (!this.lastFetched) return true
            return Date.now() - this.lastFetched > CACHE_DURATION
        },

        getScreenshotByName(): (name: string) => ScreenshotProject | undefined {
            return (name: string) => this.screenshots.find(s => s.name === name)
        },

        successfulScreenshots(): ScreenshotProject[] {
            return this.screenshots.filter(s => s.status === 'success')
        },

        failedScreenshots(): ScreenshotProject[] {
            return this.screenshots.filter(s => s.status === 'failed')
        }
    },

    actions: {
        async fetchScreenshots(projects: { name: string, preview_url?: string | null }[], forceRefresh = false) {
            // Return cached data if available and not stale
            if (!forceRefresh && this.hasScreenshots && !this.isDataStale) {
                return this.screenshots
            }

            // Check localStorage cache
            if (!forceRefresh) {
                const cached = localStorage.getItem(CACHE_KEY)
                if (cached) {
                    try {
                        const cachedData: CachedScreenshotData = JSON.parse(cached)
                        const now = Date.now()

                        if (now - cachedData.timestamp < CACHE_DURATION) {
                            this.screenshots = cachedData.screenshots
                            this.lastFetched = cachedData.timestamp
                            return this.screenshots
                        }
                    } catch (e) {
                        console.error('Error parsing cached screenshot data:', e)
                    }
                }
            }

            // Fetch fresh screenshots with progress updates
            this.loading = true
            this.error = null

            try {
                const fetchedScreenshots = await fetchProjectScreenshots(
                    projects,
                    (screenshot: ScreenshotProject) => {
                        // Add screenshot to array as it loads (top to bottom)
                        const existingIndex = this.screenshots.findIndex(s => s.name === screenshot.name)
                        if (existingIndex >= 0) {
                            this.screenshots[existingIndex] = screenshot
                        } else {
                            this.screenshots.push(screenshot)
                        }
                    }
                )

                // Update store state with final results
                this.screenshots = fetchedScreenshots
                this.lastFetched = Date.now()

                // Cache the fresh data
                const cacheData: CachedScreenshotData = {
                    screenshots: fetchedScreenshots,
                    timestamp: this.lastFetched,
                }
                localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))

                return this.screenshots
            } catch (err: any) {
                console.error('Screenshot API Error:', err)
                this.error = 'Failed to load project screenshots'

                // If API call fails, return cached data if available
                const cached = localStorage.getItem(CACHE_KEY)
                if (cached) {
                    const cachedData: CachedScreenshotData = JSON.parse(cached)
                    this.screenshots = cachedData.screenshots
                    this.lastFetched = cachedData.timestamp
                    return this.screenshots
                }

                throw err
            } finally {
                this.loading = false
            }
        },

        async fetchSingleScreenshotUrl(url: string): Promise<string | null> {
            try {
                return await fetchSingleScreenshot(url)
            } catch (error) {
                console.error('Failed to fetch single screenshot:', error)
                return null
            }
        },

        clearCache() {
            localStorage.removeItem(CACHE_KEY)
            this.screenshots = []
            this.lastFetched = null
        },

        // Clean up blob URLs to prevent memory leaks
        cleanupBlobUrls() {
            this.screenshots.forEach(screenshot => {
                if (screenshot.screenshot_url && screenshot.screenshot_url.startsWith('blob:')) {
                    URL.revokeObjectURL(screenshot.screenshot_url)
                }
            })
        }
    }
})