# disocrd.pt

A tiny static comedy site built around an intentionally unhelpful redirect joke. The landing page shows a fixed label and runs a redirect progress bar that never finishes.

## Project layout

```text
.
|-- index.html              # Landing page
|-- meme.html               # Second joke page
+-- assets/
    |-- css/site.css        # Shared deliberately chaotic styling
    |-- images/             # Favicon and original SVG joke graphics
    +-- js/site.js          # Optional label fetch and endless loading gag
```

The site has no build step or package dependencies. It is served as static files. The landing page's large label is fixed as plain text. The visible action button starts the endless loading gag.

## Run locally

Serve this directory with any static HTTP server. The second page is `meme.html`.
