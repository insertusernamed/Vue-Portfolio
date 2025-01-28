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
}

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
      }) => {
        const languagesResponse = await axios.get(repo.languages_url)
        const languagesData = languagesResponse.data

        const totalChars = (Object.values(languagesData) as number[]).reduce(
          (acc: number, curr: number) => acc + curr,
          0,
        )

        const topLanguages = Object.entries(languagesData)
          .sort(([, a], [, b]) => Number(b) - Number(a))
          .slice(0, 3)
          .map(([language, chars]) => ({
            language,
            percent: Math.round((Number(chars) / totalChars) * 100),
            color: COLORS[language as keyof typeof COLORS] || '#000',
          }))

        return {
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          languages_url: repo.languages_url,
          topLanguages,
        }
      },
    ),
  )

  return projects
}
