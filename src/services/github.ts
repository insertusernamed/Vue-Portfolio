import axios from 'axios'
import colors from '../assets/colors.json'
import type { GitHubProject } from '../types/github'

const COLORS = colors as unknown as Record<string, string>

export async function fetchGitHubProjects(): Promise<GitHubProject[]> {
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
                let preview_url: string | null = null
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

    return projects
}
