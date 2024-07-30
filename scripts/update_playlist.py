from googleapiclient.discovery import build
from os import getenv
from json import dump


API_KEY = getenv("API_KEY")
PLAYLIST_ID = getenv("PLAYLIST_ID")

youtube = build('youtube', 'v3', developerKey=API_KEY)

request = youtube.playlistItems().list(
    part='snippet',
    playlistId=PLAYLIST_ID,
    maxResults=50
)
response = request.execute()
print("Fethced playlist data")


if 'items' in response:
    print(response[0].keys())
    
    with open("./static/playlist_data.json", "w") as f:
        dump(response , f, indent=4)
        
        print("Updated playlist data")
