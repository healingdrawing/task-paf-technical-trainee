import { HTTPException } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { ErrorHandler } from "https://deno.land/x/hono@v4.3.11/mod.ts"
import { StatusCode } from "https://deno.land/x/hono@v4.3.11/utils/http-status.ts";
import { eta, dprint } from "../deps.ts"

export const error_handler:ErrorHandler = async (err, c) => {
  console.log(dprint("ERROR_HANDLER", err.toString())) // todo: remove later
  
  // console.log( err.name, "\n-------\n", err.message, "\n-------\n", err.cause, "\n-------\n", err.stack, "\n-------\n")
  
  let e = catch_user_oauth2_cancellation(err)

  if (e === null) e = err as HTTPException // error is not cancellation
  
  if (e.status === undefined || e.message === undefined){
    e = {status:500, message:"Internal Server Error"} as HTTPException
    return c.html(
      await eta.renderAsync("error", {code:e.status, info:e.message}),
      500
    )
  }
  
  return c.html(await eta.renderAsync("error", {code:e.status, info:e.message}),e.status)
}

/** try to catch user cancellation of oauth2 and convert 500 to 502, to manage cancellation properly. */
function catch_user_oauth2_cancellation(err:Error):HTTPException | null{
  /* case of X cancellation */
  if (
    err.name.trim() === "Error"
    && err.message.trim() === "access_denied"
    // probably bottom statements can be omitted
    && err.cause === undefined
    && err.stack
    && err.stack.includes("oauth2_client")
    && err.stack.includes("validateAuthorizationResponse")
    && err.stack.includes("eventLoopTick")
  ){
    if (err.stack.includes("callback_x.ts")){
      console.log(dprint("catch_user_oauth2_cancellation()", "user cancelled X OAuth2 request"))
      return {status:502, message:"Bad Gateway. X OAuth2 access denied"} as HTTPException
    } else if (err.stack.includes("callback_google.ts")){
      console.log(dprint("catch_user_oauth2_cancellation()", "user cancelled Google OAuth2 request"))
      return {status:502, message:"Bad Gateway. Google OAuth2 access denied"} as HTTPException
    }
  } 

  return null
}

/** throw an error properly to handle using app.onError()
 * 
 * 400: "Bad Request"
 * 
 * 401: "Unauthorized"
 * 
 * 403: "Forbidden" - have no access rights
 * 
 * 404: "Not Found"
 * 
 * 413: "Payload Too Large"
 * 
 * 511: "Network Authentication Required"
 * 
 * 502: "Bad Gateway" - invalid response from outside of app (f.e. api)
 * 
 * 500: "Internal Server Error"
 */
export function throw_error(status_code:StatusCode, message?:string){
  if (message) throw new HTTPException(status_code, { message: error_message(status_code) + " [" + message + "]" })
  else throw new HTTPException(status_code, { message: error_message(status_code) })
}

export const custom_http_exception = (status_code:StatusCode):HTTPException => {
  console.log(dprint(
    "CUSTOM_HTTP_EXCEPTION",
    status_code.toString() + " | " + error_message(status_code)
  ))
  return new HTTPException(status_code, {message: error_message(status_code)})
}

const error_message = (status_code:StatusCode):string => {
  let r:string
  
  switch(status_code){
    case 400: r = "Bad Request"; break
    case 401: r = "Unauthorized"; break
    case 403: r = "Forbidden"; break // have no access rights
    case 404: r = "Not Found"; break
    case 413: r = "Payload Too Large"; break
    case 511: r = "Network Authentication Required"; break
    case 502: r = "Bad Gateway"; break
    case 500: r = "Internal Server Error"; break
    default: r = "Internal Server Error"
    }

  return r
}

/** return csrf origin from .env(+print it) or throw an error */
export const get_csrf_origin = () => {
  const raw = Deno.env.get("CSRF_ORIGIN")
  if (raw === undefined || raw === ""){
    console.log(dprint("ENV ERROR", "CSRF_ORIGIN is undefined"))
    Deno.exit(2)
  } 
  
  try{
    console.log(dprint("CSRF_ORIGIN", raw))
    new URL(raw)
    return raw
  }catch{
    console.log(dprint("ENV ERROR", "CSRF_ORIGIN is incorrect"))
    Deno.exit(2)
  }
}
