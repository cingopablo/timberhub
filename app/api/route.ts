import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

import { Product } from '@/app/new/schema'

const jsonDirectory = path.join(process.cwd(), 'data')
async function getFile(): Promise<{ rows: Product[] }> {
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
  return fileContents.length > 0 ? JSON.parse(fileContents) : { rows: [] }
}
export async function GET() {
  const parsedContent = await getFile()
  return NextResponse.json(parsedContent.rows)
}

export async function POST(req: Request) {
  const data = await req.json()
  const parsedContent = await getFile()
  await fs.writeFile(`${jsonDirectory}/data.json`, JSON.stringify({ rows: [...parsedContent.rows, data] }, null, 4))
}
