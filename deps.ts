export { join } from "https://deno.land/std@0.224.0/path/mod.ts"
export { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";
export { dprint } from "./debug/debug.ts"
export { providers } from "./oauth2/utils.ts"

// const db_path = join(Deno.cwd(), "kvdb")
// console.log(db_path)
export const kvdb = await Deno.openKv() //todo now it is clear that custom Deno.KV database is not allowed on deploy, and can be used only in development. So Deno.openKv("kvdb") will fail on deploy, but fine in development.


import { join } from "https://deno.land/std@0.224.0/path/mod.ts"
import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts"
export const eta = new Eta({ views: join(Deno.cwd(), "templates") })

export { serveStatic } from "https://deno.land/x/hono@v4.3.11/middleware.ts"
export { cors } from 'https://deno.land/x/hono@v4.3.11/middleware/cors/index.ts'

export { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts"
export { type RedirectStatusCode } from "https://deno.land/x/hono@v4.3.11/utils/http-status.ts"
export { csrf } from "https://deno.land/x/hono@v4.3.11/middleware/csrf/index.ts"
export { bodyLimit } from "https://deno.land/x/hono@v4.3.11/middleware/body-limit/index.ts"
export { secureHeaders } from 'https://deno.land/x/hono@v4.3.11/middleware/secure-headers/index.ts'

export { loadSync } from "https://deno.land/std@0.194.0/dotenv/mod.ts"

export {
  getSessionId,
  handleCallback,
} from "https://deno.land/x/deno_kv_oauth@v0.10.0/mod.ts"
export { type Tokens } from "https://deno.land/x/deno_kv_oauth@v0.10.0/deps.ts"

export { z } from "https://deno.land/x/zod@v3.23.8/mod.ts"

export { provider_oauth_config_redirect_uri } from "./oauth2/utils.ts"

export {
  google_oauth_config,
  fetch_google_profile_data,
  type Google_Profile_Data,
} from "./oauth2/utils_google.ts"

export {
  x_oauth_config,
  fetch_x_profile_data,
  type X_Profile_Data,
} from "./oauth2/utils_x.ts"

export {
  fetch_profile_data,
  type Profile_Data,
} from "./oauth2/utils.ts"


export { default as home } from "./ends/home/home.ts"
export { is_admin } from "./ends/admin/utils.ts"
export { default as admin } from "./ends/admin/admin.ts"
export { get_all_data_records, get_data_by_id, set_data_by_id, delete_data_by_id } from "./ends/admin/utils.ts"
export { default as export_file } from "./ends/export/export_file.ts"
export { default as import_file } from "./ends/import/import_file.ts"
export { default as manage } from "./ends/admin/manage.ts"
export { error_handler, throw_error, custom_http_exception, get_csrf_origin } from "./error/error.ts"

export { type Data, data_placeholder, data_schema, data_schema_array, type Key_Data, data_with_id_schema } from "./ends/data/utils.ts"
export { get_data, set_data, data_form_limits } from "./ends/data/utils.ts"
export { default as data } from "./ends/data/data.ts"

export { default as signout } from "./oauth2/signout.ts"
export { default as signin_google } from "./oauth2/signin_google.ts"
export { default as signin_x } from "./oauth2/signin_x.ts"

export { default as callback_google } from "./oauth2/callback_google.ts"
export { default as callback_x } from "./oauth2/callback_x.ts"

/* manage vue3 specific requests */
export { default as vue_slideshow } from "./ends/vue/slideshow.ts"
export { default as vue_clock } from "./ends/vue/clock.ts"