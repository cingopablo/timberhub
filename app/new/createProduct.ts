import { redirect } from 'next/navigation'

export async function createProduct(data: FormData) {
  const title = data.get('title')?.valueOf()
  console.log('title')
  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('Invalid Title')
  }

  console.log(title)
  //await prisma.todo.create({ data: { title, complete: false } })
  redirect('/')
}
