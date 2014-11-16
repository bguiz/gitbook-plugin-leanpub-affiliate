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
            "queryString": {
                "a": "27hVMyWVn46xaZCi6E563X",
                "subID": "gitbookPlugin"
            },
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

## Styling

The appearance of the list of Leanpub books at the bottom of each page is rudimentary.
Please add CSS styles to the theme you are using to achieve the intended styling effect.

## Notes

If you experience problems with the plugin not having any effect at all,
i.e. the links do not appear at the bottom of each page,
please check your `book.json` file.
If gitbook fails to parse that file, it will silently fail,
rendering all the pages without any plugins or themes.
This affects all gitbook plugins, not just this one.

## Licence

GPLv3

## Requests

Contributions welcome, of course!
