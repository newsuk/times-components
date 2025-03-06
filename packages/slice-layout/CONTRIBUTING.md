# Contributing

Please take a moment to review our main
[CONTRIBUTING.md](.github/CONTRIBUTING.md) for an extensive overview of core
ideas, conventions and information on submitting a PR

## Creating a new template

Slice layout templates sit within their own named directory within the `/templates`
directory. The Components take functions as `props` (render props) that pass
configuration objects to consumers of Slice layout. The configuration objects are
generated is from `config.js`. The objects manage JS properties _and_
responsive CSS class names for web, that provide a suggested layout and format
for the children that will be laid out in each template.

<pre>

### How it works

+----------------------------------------------------------+
|  Slice layout                                                   |
|                                                          |
|                     renderProp                           |
|  +              <-------------------+                    |
|  |                                  |                    |
|  |                                  |                    |
|  |                                  |                    |
|  |                    +-----------------------------+    |
|  |                    |  Consumer   |               |    |
|  |                    |             |               |    |
|  |                    |             |               |    |
|  |                    |             +               |    |
|  |                    -                             |    |
|  | renderProp(config)                               |    |
|  +---------------------------------->               |    |
|                       +-----------------------------+    |
|                                                          |
+----------------------------------------------------------+

</pre>

### Folder structure

An example template looks like this:

```
.
└── standard
    ├── config.js
    ├── index.js
    ├── proptypes.js
    └── responsive.js
```

### Image placeholder rules

For slices that show articles, it is important to follow the rules around
showing images:

If an article has no image available (either as the lead image or generated from
the associated video), display a new generic Times / ST logo, NOT one that is
specific to the publication (The Times / The Sunday Times)

This should not apply in the following scenarios:

- Any homepage slices
- When the article page is missing it's lead image
