import { signOut } from "https://deno.land/x/deno_kv_oauth@v0.10.0/mod.ts"
import { Hono, RedirectStatusCode, getSessionId, kvdb } from "../deps.ts"

const app = new Hono()

app.get("/",
  async (c) => {
    const session_id = await getSessionId(c.req.raw)
    .then(entry => entry as string | undefined)
    console.log("signout session_id", session_id)

    if (session_id !== undefined){
      await kvdb.delete(["tokens", session_id])
      await kvdb.delete(["oauth2-providers", session_id])
    } else {
      console.log("ERROR: signout failed", session_id)
    }

    const response = await signOut(c.req.raw)
    c.header("set-cookie", response.headers.get("set-cookie")!)
    return c.redirect(response.headers.get("location")!, response.status as RedirectStatusCode)
  }
)

export default app
