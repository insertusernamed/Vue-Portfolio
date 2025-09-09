import axios from 'axios'
import type { ScreenshotProject } from '../types/screenshot'

const SCREENSHOT_API_BASE = 'http://localhost:8080'

export async function fetchProjectScreenshots(
    projects: { name: string, preview_url?: string | null }[],
    onProgress?: (screenshot: ScreenshotProject) => void
): Promise<ScreenshotProject[]> {
    const projectsWithUrls = projects.filter(project => project.preview_url)
    const screenshotProjects: ScreenshotProject[] = []

    // processing projects asynchronously but with priority order
    const fetchPromises = projectsWithUrls.map(async (project, index) => {
        await new Promise(resolve => setTimeout(resolve, index * 200))

        try {
            const response = await axios.get(
                `${SCREENSHOT_API_BASE}/screenshot?url=${encodeURIComponent(project.preview_url!)}&networkidle=true`,
                {
                    timeout: 16000,
                    responseType: 'blob'
                }
            )

            // Convert blob to base64 data URL for display
            const screenshotBlob = response.data
            const reader = new FileReader()

            const screenshotUrl = await new Promise<string>((resolve) => {
                reader.onloadend = () => resolve(reader.result as string)
                reader.readAsDataURL(screenshotBlob)
            })

            const screenshotProject = {
                name: project.name,
                preview_url: project.preview_url!,
                screenshot_url: screenshotUrl,
                status: 'success' as const
            }

            // Call progress callback if provided
            if (onProgress) {
                onProgress(screenshotProject)
            }

            return screenshotProject
        } catch (error: any) {
            console.error(`Failed to get screenshot for ${project.name}:`, error)

            const failedProject = {
                name: project.name,
                preview_url: project.preview_url!,
                screenshot_url: null,
                status: 'failed' as const,
                error: error.message || 'Failed to capture screenshot'
            }

            if (onProgress) {
                onProgress(failedProject)
            }

            return failedProject
        }
    })

    const results = await Promise.allSettled(fetchPromises)

    results.forEach(result => {
        if (result.status === 'fulfilled') {
            screenshotProjects.push(result.value)
        }
    })

    return screenshotProjects
} export async function fetchSingleScreenshot(url: string): Promise<string | null> {
    try {
        const response = await axios.get(
            `${SCREENSHOT_API_BASE}/screenshot?url=${encodeURIComponent(url)}`,
            {
                timeout: 10000,
                responseType: 'blob'
            }
        )

        const screenshotBlob = response.data
        const reader = new FileReader()

        return new Promise<string>((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(screenshotBlob)
        })
    } catch (error) {
        console.error('Failed to fetch screenshot:', error)
        return null
    }
}