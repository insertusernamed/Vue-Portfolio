export interface ScreenshotProject {
    name: string
    preview_url: string
    screenshot_url: string | null
    status: 'success' | 'failed' | 'loading'
    error?: string
}