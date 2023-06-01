import {  Posts, User, Videos } from '../typings'

export const fetchVideos = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/getVideo`)

  const data = await res.json()
  const posts: Videos[] = data.videos
  return posts
}