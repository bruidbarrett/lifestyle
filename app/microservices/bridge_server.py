from flask import Flask, jsonify, request
from flask_cors import CORS
import zmq
import os
import traceback
from datetime import datetime
import pytz

app = Flask(__name__)
CORS(app)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEVICE_ID_FILE = os.path.join(SCRIPT_DIR, 'device_ids.txt')

def zmq_client(send_message: str, ip: str = 'localhost', port: int = 6969):
    context = zmq.Context()
    socket = context.socket(zmq.REQ)
    socket.connect(f"tcp://{ip}:{port}")
    socket.send(send_message.encode('utf-8'))
    message = socket.recv()
    return message.decode('utf-8')

@app.route('/save_device_id', methods=['POST'])
def save_device_id():
    device_id = request.json.get('device_id')
    if not device_id:
        return jsonify({'success': False, 'error': 'No device ID provided'}), 400
    
    response = zmq_client(f"save device id: {device_id}")
    return jsonify({'success': True, 'message': response})

@app.route('/get_current_time')
def get_current_time():
    response = zmq_client("get time")
    time, zone = response.rsplit(" ", 1)
    return jsonify({'current_time': time, 'time_zone': zone})

@app.route('/get_quote')
def get_quote():
    try:
        quote = zmq_client('get quote')
        return jsonify({'quote': quote})
    except Exception as e:
        app.logger.error(f"Error in get_quote: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/get_habit_recommendation')
def get_habit_recommendation():
    try:
        habit = zmq_client('get habit')
        return jsonify({'habit': habit})
    except Exception as e:
        app.logger.error(f"Error in get_habit_recommendation: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)