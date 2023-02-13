from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from deta import Deta
from pydantic import BaseModel


app = FastAPI()
deta = Deta()
db = deta.Base("notes")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


class Item(BaseModel):
    name: str
    note: str


@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/items/{item_key}")
def read_item(item_key: str):
    item_read = db.get(item_key)

    return item_read if item_read else {
        "error": "Item Not Found"
    }


@app.post("/items")
async def post_item(item: Item):
    item_put = db.put({
        "name": item.name,
        "note": item.note
    })

    return item_put


@app.get("/api/items/all")
async def read_all_items():
    items_read = db.fetch()

    return items_read