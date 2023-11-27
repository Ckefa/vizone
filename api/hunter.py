#!/usr/bin/env python3

import re
from time import time, sleep
import requests
from pytube import YouTube
import asyncio
from threading import Thread

videos_data = []
links = set()
tasks = []


async def get_title(url) -> {'title': str, 'link': str, 'thumb': str}:
  # print("getting title...")
  res = {'title': None, 'link': None, 'thumb': None}
  try:
    yt = YouTube(url)
    if yt.title and yt.thumbnail_url:
      res['link'] = url
      res['title'] = yt.title
      res['thumb'] = yt.thumbnail_url
      return res
    else:
      raise ValueError("Video unavailable")
  except Exception as e:
    print(f'Video unavailable!! {url}: {e}')
  return None


async def update_data():
  print("Updating...")

  while not tasks:
    print("no task")
    await fetch_data()

  quee = []
  num_task = len(tasks)
  limit = 10 if num_task >= 10 else num_task
  for _ in range(limit):
    url = tasks.pop()
    task = get_title(url)
    quee.append(task)

  for res in quee:
    res = await res
    if not res:
      continue
    if (link := res['link']) and (title := res['title']) and \
        (thumb := res['thumb']):
      if link in links:
        continue
      links.add(link)
      data = { 'link': link, 'title': title, 'thumb': thumb}
      videos_data.append(data)


async def fetch_data():
  print("fetching dat...")
  link = "https://www.youtube.com"
  resp = requests.get(link)
  text = resp.text

  pattern = r"watch\?v=.{11}"
  matches = re.findall(pattern, text)

  if matches:
    temp = list(set(matches))

    for url in temp:
      if url in links:
        continue
      tasks.append(url)
  else:
    print("No video links found.")


async def manager():
  print("Starting...")
  asyncio.create_task(fetch_data())
  while True:
    await update_data()
    if len(videos_data) >= 10000:
      break


def generate_data():
  print("generating data...")
  while not videos_data:
    print("waiting...")
    sleep(0.5)
  print("got", len(videos_data), "content")
  return videos_data


mt = Thread(target=asyncio.run, args=[manager()])
mt.start()

if __name__ == "__main__":
  while 1:
    a = time()
    data = generate_data()
    print(len(videos_data))
    b = time()
    print(f"Time: {b - a}")
    sleep(0.2)
    