export interface GitHubProject {
    name: string
    description: string | null
    url: string
    homepageUrl?: string | null
    languages: {
        nodes: {
            name: string
            color: string
        }[]
    }
    preview_url?: string
}

export interface Language {
    language: string
    percent: number
    color: string
}

export interface GraphQLResponse {
    data: {
        pinnedRepos: GitHubProject[]
        otherRepos: GitHubProject[]
    }
}

export interface CachedData {
    pinnedProjects: GitHubProject[]
    otherProjects: GitHubProject[]
    timestamp: number
}