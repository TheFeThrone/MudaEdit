from os import getenv
from requests import get

def get_public_ip():
    response = get('https://ipinfo.io/ip')
    response.raise_for_status()
    return response.text.strip()

def update_dns(hostname, token):
    public_ip = get_public_ip()
    url = f"https://nouser:{token}@www.duckdns.org/v3/update?hostname={hostname}&myip={public_ip}"
    response = get(url)
    if response.status_code == 200:
        print(f"DNS record updated successfully. Status code: {response.status_code}")
    else:
        print(f"DNS record update failed! Status code: {response.status_code}")

def main():
    hostname = getenv('DUCKDNS_HOSTNAME')
    token = getenv('DUCKDNS_TOKEN')
    update_dns(hostname, token)

if __name__ == '__main__':
    main()
