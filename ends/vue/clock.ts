
import {
  Hono, join,
  throw_error,
} from "../../deps.ts"

const app = new Hono()

app.get("/",
  async (c) => {
    try{
      const date = new Date();
      const hours = date.getHours();
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
