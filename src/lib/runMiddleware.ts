// lib/runMiddleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function runMiddleware(req: NextRequest, middleware: any) {
  return new Promise((resolve, reject) => {
    const res = new ResponseWritable()
    const expressReq: any = convertToExpressReq(req)

    middleware(expressReq, res, (err: any) => {
      if (err) return reject(err)
      resolve(res.toNextResponse())
    })
  })
}

function convertToExpressReq(req: NextRequest) {
  const headers = Object.fromEntries(req.headers.entries())

  return {
    method: req.method,
    headers,
    url: req.nextUrl.pathname,
    query: Object.fromEntries(req.nextUrl.searchParams.entries()),
    body: null, // elFinder sẽ tự xử lý stream/form
    is: (type: string) => {
      const contentType = headers['content-type'] || ''
      return contentType.includes(type)
    },
    on: () => {}, // mock stream
    pipe: () => {}, // mock stream
  }
}

class ResponseWritable {
  chunks: any[] = []
  statusCode: number = 200
  headers: Record<string, any> = {}

  write(chunk: any) {
    this.chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  end(chunk?: any) {
    if (chunk) this.write(chunk)
  }

  setHeader(key: string, value: any) {
    this.headers[key] = value
  }

  status(code: number) {
    this.statusCode = code
    return this
  }

  toNextResponse() {
    return new NextResponse(Buffer.concat(this.chunks), {
      status: this.statusCode,
      headers: this.headers,
    })
  }
}
