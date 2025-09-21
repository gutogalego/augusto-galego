import fs from 'node:fs'
import path from 'node:path'

// types.ts
export interface PostMetadata {
  title: string
  description: string
  date: string
  url?: string
  slug?: string
  category?: string
  readTime?: string
  tags?: string[]
  featured?: boolean
}

const postsDirectory = path.join(process.cwd(), 'data', 'posts')

export const getPosts = (): PostMetadata[] => {
  const postFolders: string[] = fs.readdirSync(postsDirectory)

  return postFolders.map((folder) => {
    const metadataPath = path.join(postsDirectory, folder, 'metadata.json')
    const metadataContent = fs.readFileSync(metadataPath, 'utf8')
    const metadata: PostMetadata = JSON.parse(metadataContent)

    return {
      ...metadata,
      url: folder, // using the folder name as the URL
      slug: folder, // also set slug for consistency
    }
  })
}
