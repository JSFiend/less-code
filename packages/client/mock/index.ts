
import { MockMethod } from 'vite-plugin-mock'

export default  [
    {
      url: '/api/text',
      method: 'post',
      rawResponse: async (req, res) => {
        let reqbody = ''
        await new Promise((resolve) => {
          req.on('data', (chunk) => {
            reqbody += chunk
          })
          req.on('end', () => resolve(undefined))
        })
        res.setHeader('Content-Type', 'text/plain')
        res.statusCode = 200
        res.end(`hello, ${reqbody}`)
      },
    },
    {
      url: '/a',
      method: 'post',
      response: ({ query }) => {
        return {
          code: 0,
          data: {
            "company": "TechCorp",
            "established": 2020,
            "isPublic": false,
            "location": {
              "address": "123 Tech St",
              "city": "TechCity",
              "country": "TechLand",
              "coordinates": {
                "latitude": 40.73061,
                "longitude": -73.935242
              }
            },
            "employees": [
              {
                "name": "John",
                "age": 30,
                "role": "Developer",
                "skills": [
                  "JavaScript",
                  "Vue"
                ],
                "contact": {
                  "email": "john@techcorp.com",
                  "phoneNumber": "123-456-7890"
                }
              },
              {
                "name": "Jane",
                "age": 28,
                "role": "Designer",
                "skills": [
                  "Figma",
                  "UX/UI"
                ],
                "contact": {
                  "email": "jane@techcorp.com",
                  "phoneNumber": "098-765-4321"
                }
              }
            ]
          },
        }
      },
    },
    {
      url: '/api/a',
      method: 'get',
      response: ({ query }) => {
        return {
          code: 0,
          data: {
            name: 'vben',
          },
        }
      },
    },
    {
      url: '/api/post',
      method: 'post',
      timeout: 2000,
      response: {
        code: 0,
        data: {
          name: 'vben',
        },
      },
    },
    {
      url: '/api/text',
      method: 'post',
      rawResponse: async (req, res) => {
        let reqbody = ''
        await new Promise((resolve) => {
          req.on('data', (chunk) => {
            reqbody += chunk
          })
          req.on('end', () => resolve(undefined))
        })
        res.setHeader('Content-Type', 'text/plain')
        res.statusCode = 200
        res.end(`hello, ${reqbody}`)
      },
    },
  ] as MockMethod[]