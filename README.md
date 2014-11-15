# Leanpub Affiliate Links for GitBook

This plugin allows you to add Leanpub affiliate links
to the bottom of every page in your gitbook.

## Installation

Install as a global NodeJs package.

```
$ npm install -g gitbook-plugin-leanpub-affilate
```

## Use in a gitbook

To use in your book, add to plugins list in `book.json` in your gitbook directory:

```json
{
    "plugins": ["leanpub-affiliate"]
}
```

## Configuration

You can configure the plugin is `book.json`:

```json
{
    "pluginsConfig": {
        "leanpubAffiliate": {
            "queryString": "?a=27hVMyWVn46xaZCi6E563X&subID=gitbookPlugin",
            "image": {
                "display": true,
                "width": 102,
                "height": 150
            },
            "count": 3
        }
    }
}
```

* `queryString`
    * Gets suffixed to every affiliate link
* `count`
    * Number of affiliate links to show per page
* `image`
    * Whether or not images should be displayed, and their dimensions

## Licence

GPLv3

## Requests

Contributions welcome, of course!
