import requests
import json

payload = {
    "message": 'write the name "Test Agent" and the message "Hello from multi-task test" and click send',
    "page_content": '''
    <html>
      <body>
        <section id="contact">
          <input id="contact-name" placeholder="Name">
          <textarea id="contact-message" placeholder="Message"></textarea>
          <button id="contact-submit">Send</button>
        </section>
      </body>
    </html>
    ''',
    "history": []
}

try:
    res = requests.post("http://localhost:8000/chat", json=payload)
    print("Status Code:", res.status_code)
    print("Response JSON:")
    print(json.dumps(res.json(), indent=2))
except Exception as e:
    print("Error:", e)
