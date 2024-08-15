import zmq
import requests
import random
import os
from datetime import datetime
import pytz

def load_habits(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            return [line.strip() for line in f if line.strip()]
    return ["Meditation", "Reading", "Exercise", "Journaling", "Drinking water", "Lifting", "Running", "Walking", "Yoga", "Stretching", "Writing", "Drawing", "Painting", "Cooking", "Cleaning", "Organizing", "Meditating", "Praying", "Reflecting", "Thinking", "Dreaming"]

def save_device_id(device_id):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    device_id_file = os.path.join(script_dir, 'device_ids.txt')
    with open(device_id_file, 'a') as f:
        f.write(f"{device_id}\n")
    print(f"**SERVER**: Saved device ID: {device_id}")

def get_current_time():
    tz = pytz.timezone('US/Pacific') 
    current_time = datetime.now(tz)
    time_str = current_time.strftime("%Y-%m-%d %H:%M:%S")
    print(f"**SERVER**: Getting current time: {time_str} {tz}")
    return f"{time_str} {tz}"

def server(ip: str = 'localhost', port: int = 6969):
    context = zmq.Context()
    svc_string = "**SERVER**"
    socket = context.socket(zmq.REP)
    socket.bind(f"tcp://{ip}:{port}")
    print(f"{svc_string}: Connecting to tcp://{ip}:{port}")

    script_dir = os.path.dirname(os.path.abspath(__file__))
    habits_file = os.path.join(script_dir, 'habit_recommendations.txt')
    habits = load_habits(habits_file)

    while True:
        message = socket.recv().decode('utf-8')
        print(f"{svc_string}: message from client - {message}")

        if message.lower() == "get habit":
            response = random.choice(habits)
            response_type = "habit recommendation"
        elif message.lower().startswith("save device id:"):
            device_id = message.split(":", 1)[1].strip()
            save_device_id(device_id)
            response = "Device ID saved successfully"
            response_type = "device ID save confirmation"
        elif message.lower() == "get time":
            response = get_current_time()
            response_type = "current time"
        else:
            try:
                response = requests.get("http://www.forbes.com/forbesapi/thought/uri.json?enrich=true&query=1&relatedlimit=5")
                data = response.json()
                
                quotes = [data['thought']['quote']]
                quotes.extend([thought['quote'] for thought in data['thought'].get('relatedAuthorThoughts', [])])
                quotes.extend([thought['quote'] for thought in data['thought'].get('relatedThemeThoughts', [])])
                
                response = random.choice(quotes)
                response_type = "quote"
            except Exception as e:
                response = f"Error fetching quote: {str(e)}"
                response_type = "error"

        socket.send_string(response)
        new_message = f"{svc_string}: sending {response_type} to client - '{response}'"
        print(new_message)

if __name__ == '__main__':
    server()