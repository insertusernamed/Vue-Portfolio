import axios from 'axios'
import type { GitHubProject, GraphQLResponse } from '../types/github'

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT

const QUERY = `
query {
  pinnedRepos {
    name
    description
    homepageUrl
    url
    languages {
      nodes {
        name
        color
      }
    }
  }
  otherRepos {
    name
    description
    url
    homepageUrl
    languages {
      nodes {
        name
        color
      }
    }
  }
}
`

export async function fetchGitHubProjects(): Promise<{ pinned: GitHubProject[], other: GitHubProject[] }> {
    const response = await axios.post<GraphQLResponse>(GRAPHQL_ENDPOINT, {
        query: QUERY
    })

    const { pinnedRepos, otherRepos } = response.data.data

    const processProjects = (repos: GitHubProject[]) => {
        return repos.map(repo => ({
            ...repo,
            preview_url: repo.homepageUrl || undefined
        }))
    }

    return {
        pinned: processProjects(pinnedRepos),
        other: processProjects(otherRepos)
    }
}