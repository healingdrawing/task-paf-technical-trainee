import {
  secureHeaders,
  Hono, csrf, bodyLimit, serveStatic, home, data, admin, export_file, import_file, manage,
  error_handler, get_csrf_origin,
  signout,
  signin_google, callback_google,
  signin_x, callback_x,
  custom_http_exception,
  vue_slideshow,
} from "./deps.ts"

const app = new Hono()
//app.use(csrf({ origin: [get_csrf_origin()], }))
// app.use(csrf({ origin: (origin) => { console.log("IT IS ALIVE!",origin); return true }}))


app.use(secureHeaders({strictTransportSecurity: false})) // todo: requires precised configuration

app.use(bodyLimit({maxSize: 11*1024, onError: async (c) => {
  return await error_handler(custom_http_exception(413), c)
},})) //11kb max for request body

app.use('/static/*', serveStatic({root:""})) //todo try support vue

app.route("/vue-slideshow", vue_slideshow)

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

app.onError(error_handler)

Deno.serve(app.fetch)
