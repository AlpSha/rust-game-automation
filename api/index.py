import asyncio
import json
import os
import uuid
from flask import Flask, jsonify
from rustplus import RustSocket, ServerDetails
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Rust server details
server_ip = os.getenv('SERVER_IP')
server_port = int(os.getenv('SERVER_PORT'))
steam_id = os.getenv('STEAM_ID')
player_token = int(os.getenv('PLAYER_TOKEN'))


# Function to load items from JSON file
def load_items():
    with open('api/items.json', 'r') as file:
        return json.load(file)


async def fetch_map_info():
    server_details = ServerDetails(server_ip, server_port, steam_id, player_token)
    socket = RustSocket(server_details)
    await socket.connect()

    map_info = await socket.get_map_info()

    await socket.disconnect()
    return {
        'width': map_info.width,
        'height': map_info.height,
        'margin': map_info.margin,
    }


# Asynchronous function to fetch orders from the server
async def fetch_orders():
    items = load_items()
    server_details = ServerDetails(server_ip, server_port, steam_id, player_token)
    socket = RustSocket(server_details)
    await socket.connect()

    markers = await socket.get_markers()
    orders = []

    for marker in markers:
        for order in marker.sell_orders:
            # Generate uuid for each order
            order_id = uuid.uuid4()
            item_name = items.get(str(order.item_id), "Unknown Item")
            currency_item_name = items.get(str(order.currency_id), "Unknown Item")
            order_details = {
                "id": order_id,
                "quantity": order.quantity,
                "item_name": item_name,
                "currency_item_name": currency_item_name,
                "cost_per_item": order.cost_per_item,
                "amount_in_stock": order.amount_in_stock,
                "coordinates": {"x": marker.x, "y": marker.y},
                "marker_name": marker.name
            }
            orders.append(order_details)

    await socket.disconnect()
    return orders


# Flask route to fetch and return orders as JSON
@app.route('/api/orders', methods=['GET'])
def get_orders():
    orders = asyncio.run(fetch_orders())
    return jsonify(orders)


@app.route('/api/map', methods=['GET'])
def get_map_info():
    map_info = asyncio.run(fetch_map_info())
    return jsonify(map_info)


if __name__ == '__main__':
    app.run()
