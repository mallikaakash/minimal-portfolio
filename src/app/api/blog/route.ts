import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllBlogPosts();
  return NextResponse.json({ posts });
}
