import {
  kvdb, Hono, RedirectStatusCode,
  handleCallback, x_oauth_config,
  dprint,
  throw_error,
} from "../deps.ts"

const app = new Hono()

app.get("/",
  async (c) => {
    try{
      const { response, sessionId, tokens } = await handleCallback(c.req.raw, x_oauth_config)
      
      await kvdb.set(["tokens",sessionId], tokens)
      await kvdb.set(["oauth2-providers",sessionId], "x")
      
      c.header("set-cookie", response.headers.get("set-cookie")!)
      return c.redirect(response.headers.get("location")!, response.status as RedirectStatusCode)
    } catch(e) {
      if (e instanceof Error){
        console.log(dprint("callback_x.ts -> handleCallback()", e.toString()))
        return throw_error(502, "Incorrect response from X OAuth API")
      } else {
        console.log(dprint("callback_x.ts", `unknown error: [${e.toString()}]`))
        return throw_error(500, "Internal Server Error")
      }
    }
  }
)

export default app
