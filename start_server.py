import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 9527

def run():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(base_dir)

    # 綁定 0.0.0.0，無論工作台通過 127.0.0.1、localhost 還是本機 IP 探活，均可 100% 成功連通
    server_address = ('0.0.0.0', PORT)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

    print(f"[*] 組織架構服務運行中: http://127.0.0.1:{PORT}", flush=True)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        sys.exit(0)

if __name__ == '__main__':
    run()
