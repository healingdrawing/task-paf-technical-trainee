
import {
  Hono,
  throw_error,
} from "../../deps.ts"

const app = new Hono()

app.get("/",
  //todo: just to disable linter's whining
  // deno-lint-ignore require-await
  async (c) => {
    try{
      const date = new Date()
      const hours = date.getUTCHours()
      const minutes = date.getUTCMinutes()
      const seconds = date.getUTCSeconds()
      return c.json([hours, minutes, seconds])
    } catch(e){
      console.log("ERROR: vue/clock.ts -> get / -> json with time", e.toString())
      return throw_error(500, "date object damaged")
    }

  }
)

export default app
