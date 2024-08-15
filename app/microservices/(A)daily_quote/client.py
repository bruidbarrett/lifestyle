import zmq

def client(send_message: str, ip: str = 'localhost', port: int = 6969):
    context = zmq.Context()
    client_string = "**CLIENT**"
    socket = context.socket(zmq.REQ)
    socket.connect(f"tcp://{ip}:{port}")
    send_bytes = bytes(send_message, 'utf-8')

    print(f"{client_string}: pinging server '{send_message}'")
    socket.send(send_bytes)
    print(f"{client_string}: waiting for server response..")
    message = socket.recv()
    print(f"{client_string}: response from serve: {message.decode('utf-8')}")

if __name__ == '__main__':
    print(client(send_message='Please quote me'))
