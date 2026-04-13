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
