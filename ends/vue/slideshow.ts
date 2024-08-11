
import {
  Hono, join,
  throw_error,
} from "../../deps.ts"

const app = new Hono()

app.get("/:id",
  async (c) => {
    try{
      const id = c.req.param("id")
      const slidesDir = join(Deno.cwd(), "static", "img", "slides",id)
      const files: string[] = []
      for await (const dirEntry of Deno.readDir(slidesDir)) {
        if (!dirEntry.name.endsWith('.md')){
          files.push(dirEntry.name)
        }
      }
      const imageUrls = files.map((file) => `/static/img/slides/${id}/${file}`)
      return c.json(imageUrls)
    } catch(e){
      console.log("ERROR: vue/slideshow.ts -> get / -> json with image urls", e.toString())
      return throw_error(500, "expected file structure damaged")
    }

  }
)

export default app
