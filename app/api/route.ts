import { promises as fs } from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import { TableProduct } from '@/components/Table/Table'

// type Dimension = {
//   thickness: number
//   width: number
//   length: number
// }
//
// type Product = {
//   id: string
//   created: string
//   usage: string
//   species: string
//   drying_method: string
//   grade: string
//   treatment?: string
//   dimensions: Dimension[]
// }
//
// type Rows = {
//   rows: Product[]
// }

// export async function fetchData() {
// const jsonDirectory = path.join(process.cwd(), 'data')
// const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
// const parsedContent = JSON.parse(fileContents)
// return parsedContent.rows
// }

// export async function saveData() {
//Find the absolute path of the json directory
// const jsonDirectory = path.join(process.cwd(), 'data')
// console.log(jsonDirectory)
// Read the json data file data.json
// const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
// Return the content of the data file in json format
// return JSON.parse(fileContents)
// }

// export async function GET(request: Request) {
//   // Do whatever you want
//   return new Response('Hello World!', {
//     status: 200,
//   })
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse<TableProduct[]>) {
  const jsonDirectory = path.join(process.cwd(), 'data')
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')
  const parsedContent = JSON.parse(fileContents)
  return res.status(200).json(parsedContent.rows)
}
