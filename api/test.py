import os

import asyncio
from rustplus import RustSocket, ServerDetails
from dotenv import load_dotenv

load_dotenv()

# Rust server details
server_ip = os.getenv('SERVER_IP')
server_port = int(os.getenv('SERVER_PORT'))
steam_id = os.getenv('STEAM_ID')
player_token = int(os.getenv('PLAYER_TOKEN'))


async def fetch_map_info():
    server_details = ServerDetails(server_ip, server_port, steam_id, player_token)
    socket = RustSocket(server_details)
    await socket.connect()

    map_info = await socket.get_map_info()

    await socket.disconnect()
    result = {
        'width': map_info.width,
        'height': map_info.height,
        'margin': map_info.margin,
        'background': map_info.background,
    }

    print(result)


if __name__ == '__main__':
    asyncio.run(fetch_map_info())
