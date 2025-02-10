import axios from 'axios'
import colors from '../assets/colors.json'

interface Language {
    language: string
    percent: number
    color: string
}

export interface GitHubProject {
    name: string
    description: string | null
    html_url: string
    languages_url: string
    topLanguages: Language[]
    homepage: string | null
    has_pages: boolean
    preview_url?: string
}

interface CachedData {
    projects: GitHubProject[]
    timestamp: number
}

const COLORS = colors as unknown as Record<string, string>
const CACHE_KEY = 'github_projects_cache'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes

export async function fetchGitHubProjects(): Promise<GitHubProject[]> {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
        const cachedData: CachedData = JSON.parse(cached)
        const now = Date.now()

        // Return cached data if it's still fresh
        if (now - cachedData.timestamp < CACHE_DURATION) {
            console.log('Returning cached data')
            return cachedData.projects
        }
    }

    // Fetch fresh data if cache is empty or stale
    try {
        const response = await axios.get(
            'https://api.github.com/users/insertusernamed/repos?sort=updated&direction=desc',
        )

        const projects = await Promise.all(
            response.data.map(
                async (repo: {
                    name: string
                    description: string | null
                    html_url: string
                    languages_url: string
                    homepage: string | null
                    has_pages: boolean
                }) => {
                    const languagesResponse = await axios.get(repo.languages_url)
                    const languagesData = languagesResponse.data

                    const totalChars = (Object.values(languagesData) as number[]).reduce(
                        (acc: number, curr: number) => acc + curr,
                        0,
                    )

                    const topLanguages = Object.entries(languagesData)
                        .sort(([, a], [, b]) => Number(b) - Number(a))
                        .map(([language, chars]) => ({
                            language,
                            percent: Math.round((Number(chars) / totalChars) * 100),
                            color: COLORS[language] || '#000',
                        }))

                    // Determine preview URL
                    let preview_url = null
                    if (repo.homepage) {
                        preview_url = repo.homepage
                    } else if (repo.has_pages) {
                        preview_url = `https://${repo.name}.github.io/${repo.name}`
                    }

                    return {
                        name: repo.name,
                        description: repo.description,
                        html_url: repo.html_url,
                        languages_url: repo.languages_url,
                        topLanguages,
                        homepage: repo.homepage,
                        has_pages: repo.has_pages,
                        preview_url
                    }
                },
            ),
        )

        // Cache the fresh data
        const cacheData: CachedData = {
            projects,
            timestamp: Date.now(),
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))

        return projects
    } catch (error) {
        // If API call fails, return cached data if available
        if (cached) {
            return JSON.parse(cached).projects
        }
        throw error
    }
}
