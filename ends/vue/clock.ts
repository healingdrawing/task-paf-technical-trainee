
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
      const timezoneOffset = Math.round(date.getTimezoneOffset())
      const hours = date.getHours() + (timezoneOffset / 60) // UTC+0
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return c.json([hours, minutes, seconds]);
    } catch(e){
      console.log("ERROR: vue/clock.ts -> get / -> json with time", e.toString())
      return throw_error(500, "date object damaged")
    }

  }
)

export default app
