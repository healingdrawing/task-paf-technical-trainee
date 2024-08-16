import {
  secureHeaders, get_csrf_origin, // csrf,
  Hono, bodyLimit, serveStatic, home, data, admin, export_file, import_file, manage,
  error_handler,
  signout,
  signin_google, callback_google,
  signin_x, callback_x,
  custom_error,
  vue_slideshow,
  vue_clock,
  cors,
} from "./deps.ts"

const app = new Hono()
// app.use(csrf({ origin: [get_csrf_origin()], })) // todo: in some reasons csrf conflicting with secureHeaders. So only one can work in same time. Confirmed localhost + deployed. Community keep silent. Docs not clear. Since OAuth2 tokens and session_id checks used for post request, the csrf is turned off, to allow secureHeaders work properly.
// app.use(csrf({ origin: (origin) => { console.log("IT IS ALIVE!",origin); return true }}))


// app.use(secureHeaders({strictTransportSecurity: false})) // todo: probably requires precised configuration if use in couple with csrf.
app.use(secureHeaders())// todo: in some reasons, with this instead of csrf, the redirect to home page happens when logout from admin panel, so error of authentication skipped or managed automatically.

app.use(bodyLimit({maxSize: 11*1024, onError: async (c) => {
  return await error_handler(custom_error(413), c)
},})) //11kb max for request body

app.use(cors({ origin: get_csrf_origin() }))

/* raw patch for /static and /static/ case when the browser navigation became frozen. But it should not happen without extra hands activity ;). Reported to the community */
app.get('/static', async (c) => { return await error_handler(custom_error(404, "Use buttons, creature!"), c) })
app.get('/static/', async (c) => { return await error_handler(custom_error(404, "Use buttons, creature!"), c) })
/* end of the patch */

app.use('/static/*', serveStatic({root:""}))

app.route("/vue-slideshow", vue_slideshow)
app.route("/vue-clock", vue_clock)

app.route('/', home)
app.route("/data", data)
app.route("/admin", admin)
app.route("/export-file", export_file)
app.route("/import-file", import_file)
app.route("/manage", manage)

app.route("/signout", signout)

app.route("/signin-google", signin_google)
app.route("/signin-x", signin_x)

app.route("/callback-google", callback_google)
app.route("/callback-x", callback_x)

app.get('*', async (c) => {
  return await error_handler(custom_error(404, "Use buttons, creature!"), c)
})

app.onError(error_handler)

Deno.serve(app.fetch)
