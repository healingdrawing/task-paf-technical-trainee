import { HTTPException } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { ErrorHandler } from "https://deno.land/x/hono@v4.3.11/mod.ts"
import { StatusCode } from "https://deno.land/x/hono@v4.3.11/utils/http-status.ts";
import { eta, dprint } from "../deps.ts"

export const error_handler:ErrorHandler = async (err, c) => {
  console.log(dprint("ERROR_HANDLER", err.toString())) // todo: remove later
  
  let e = err as HTTPException
  
  if (e.status === undefined || e.message === undefined){
    e = {status:500, message:"Internal Server Error"} as HTTPException
    return c.html(
      await eta.renderAsync("error", {code:e.status, info:e.message}),
      500
    )
  }else{
    return c.html(await eta.renderAsync("error", {code:e.status, info:e.message, name:e.name}),e.status)
  }
  
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

class Custom_HTTP_Error extends HTTPException {
  constructor(status_code: StatusCode, message?:string) {
    super(status_code);
    this.name = message || ""
    this.message = (message !== undefined) ? message : error_message(status_code)
  }
}

export function custom_error(status_code:StatusCode, message?:string):Error{
  console.log(dprint(
    "CUSTOM_ERROR",
    status_code.toString() + " | " + message
  ))
  
  return new Custom_HTTP_Error(status_code, message)
}

function error_message(status_code:StatusCode):string{
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
export function get_csrf_origin() {
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
