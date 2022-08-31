# This is just a trivial static server.
# Don't do any _real_ work here.

import os
from bottle import default_app, redirect, route, static_file

@route("/")
def redirect_to_static():
    redirect("/static/index.html")

@route("/<filepath:path>")
def static(filepath):
    # This is just to keep React Router happy
    return static_file("index.html", root="build")

app = default_app()
