import fs from 'fs'
import path from 'path'

// types.ts
export interface PostMetadata {
  title: string
  description: string
  date: string
  url?: string
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
    }
  })
}
