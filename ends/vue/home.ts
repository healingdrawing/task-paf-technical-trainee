
import {
  Hono, join,
  throw_error,
} from "../../deps.ts"

const app = new Hono()

app.get("/",
  async (c) => {
    try{
      const slidesDir = join(Deno.cwd(), "static", "img", "slides")
      const files: string[] = []
      for await (const dirEntry of Deno.readDir(slidesDir)) {
        console.log(dirEntry.name) //todo remove later
        if (!dirEntry.name.endsWith('.md')){
          files.push(dirEntry.name)
        }
      }
      const imageUrls = files.map((file) => `/static/img/slides/${file}`)
      return c.json(imageUrls)
    } catch(e){
      console.log("ERROR: vue/home.ts -> get / -> json with image urls", e.toString())
      return throw_error(500, "expected file structure damaged")
    }

  }
)

export default app
