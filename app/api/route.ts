import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

import { Product } from '@/app/schema'

const jsonDirectory = path.join(process.cwd(), 'data')
async function getFile(): Promise<{ rows: Product[] }> {
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
  return fileContents.length > 0 ? JSON.parse(fileContents) : { rows: [] }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const params = Object.fromEntries(searchParams.entries())
  const { rows } = await getFile()
  const products = params.id ? rows.filter(product => product.id?.toString() === params.id) : rows
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const data = await req.json()
  const parsedContent = await getFile()
  await fs.writeFile(`${jsonDirectory}/data.json`, JSON.stringify({ rows: [...parsedContent.rows, data] }, null, 2))
  return NextResponse.json(data)
}

export async function PATCH(req: Request) {
  const id = await req.json()
  const parsedContent = await getFile()
  await fs.writeFile(
    `${jsonDirectory}/data.json`,
    JSON.stringify({ rows: [...parsedContent.rows.filter(product => product.id !== id)] }, null, 2)
  )
  return NextResponse.json(id)
}
