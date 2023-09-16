from flask import Flask, render_template
from flask_socketio import SocketIO, send
import subprocess as sp
import re

app = Flask(__name__)

socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on("message")
def sendMessage(message_value):
    send(f" {getIpAddress()} says : "+message_value , broadcast=True)


@app.route("/")
def HandleHome():
    return render_template("index.html")


@app.route("/message")
def HandleMessage():
    return render_template("message.html")


# Catching IP address
def getIpAddress():
    result = str(sp.run(["ipconfig"], capture_output=True, text=True).stdout)
    ip_address = extractIpAddress(result)
    return ip_address


def extractIpAddress(network_info):
    pattern = r'Wireless LAN adapter Wi-Fi:[\s\S]*?IPv4 Address\. . . . . . . . . . . : (\d+\.\d+\.\d+\.\d+)'
    match = re.search(pattern, network_info)

    if match:
        ipv4_address = match.group(1)
        return str(ipv4_address)
    else:
        return "IP address not found"


if __name__ == "__main__":
    app.run(debug=True)
