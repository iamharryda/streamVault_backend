
# STREAMVAULT- A REACT NATIVE APP

A react native app for movie browsing.

## Tech Stack

**Client:** React, 

**Server:** Node, Express, MongoDB




## How to set up backend

I have added the .env file with this repo since its private for easier approach. 

just navigate to backend

```bash
  npm intall
  npm run dev
```


## posts interface
{
  "id": 1,
  "postType": "text",
  "body": "Grateful for the incredible experience...",
  "image": null,
  "movieId": 603692,
  "author": {
    "id": 7,
    "email": "sam@example.com",
    "firstname": "Sam",
    "lastname": "Lee"
  },
  "comments": [
    { "id": 11, "userId": 2, "body": "Nice!", "createdAt": "2025-09-16T10:03:00Z" } // parent id needed for threaded, isReply
  ],
  "likes": [2, 5, 9],
  "createdAt": "2025-09-16T10:00:00Z"
}
// reaction count, comment count
// threaded comment
## user interface
{
  "id": 7,
  "email": "sam@example.com",
  "firstname": "Sam",
  "lastname": "Lee",
  "postIds": [1, 4, 9],
  "followerIds": [2,3,4],
}

