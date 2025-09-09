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

export interface Language {
    language: string
    percent: number
    color: string
}

export interface CachedData {
    projects: GitHubProject[]
    timestamp: number
}