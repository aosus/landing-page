# Writing posts

Put images in the same folder as `index.en.md` or `index.ar.md`.

Use normal markdown image syntax:

```md
![Firefox screenshot](screenshot.png)
```

Use a relative `image:` value in front matter too:

```yaml
image: "cover.png"
```

The build rewrites those paths so they work in the exported site.

Discourse comments are opt-in per post. Add this to a post's front matter only when you want the site to create and embed a Discourse discussion for that article:

```yaml
commentsEnabled: true
```
