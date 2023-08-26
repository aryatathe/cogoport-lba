# Blogs App

Language Based Assessment (Cogoport)

## Features (by routemap)

- `/`

  - show all blogs / top blogs / recommended blogs
  - search blogs
  - filter by one or more authors, one or more topics
  - search for topics and authors in the filter tab
  - sort by views, likes, or comments (all ascending or descending)
  - (search, sort, and filter simultaneously)

- `/login`

  - login / signup, fetches basic user details and saves auth token to redux state
  - all urls redirect here if logged out

- `/profile`

  - `/:id`
    - show user details, followers, following users, and published blogs
    - for logged in user:
      - show edit profile button, logout button
      - show bookmarks, drafts
      - show remaining blog views, payment option
    - for other users:
      - show follow button
  - `/edit`
    - update photo, name, about, and change password

- `/blog/:id`

  - show blog + details, comments
  - for own blogs:
    - show edit button
  - for other user's blogs:
    - show like button, bookmark button, add to lists button
    - add to lists popup to add / remove from multiple lists
    - show add comment option

- `/editor`

  - edit / create blogs, input fields for image, title, content, topic
  - publish or save as draft
  - `/new`
    - creates new blog
  - `/:id`
    - updates blog with given id, redirects if not own blog
    - show delete button
    - show versions history
    - load content from a previous version

- `/lists`
  - view / create lists

## Backend on branch `backend`

Used code from [this repo](https://github.com/rudrakshsattabhayya/BlogPost-Assignment-Backend) with several minor bug fixes (except those I couldn't figure out how to resolve)

Issues:

- no way to delete user, delete list, etc.
- deleting a blog doesn't remove it from other users bookmarks, lists, and similar issues which crash server
- payment works as pay-per-view basis, user starts with 5 blogs and

## Incomplete Story Points

- payment (api returns an order id, can't find out how to integrate razorpay with that)
- delete lists, delete users, share lists (bugged or no backend support)
- reading time (backend has an api to blog reading time, can't figure out when / how to use that)
