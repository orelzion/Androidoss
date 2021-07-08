// Using synchronous function versions makes things a bit simpler and
// is perfectly suitable for a one-time-use migration script
const { readdirSync, readFileSync } = require('fs')
const { basename } = require('path')

// I have my posts in the `content/codebase` directory
const listPosts = () => {
    return readdirSync(`${__dirname}/content/post`)
        .map(el => `${__dirname}/content/post/${el}`)
}

// Creates a post in Ghost's JSON format described here:
// https://ghost.org/docs/api/v3/migration/#json-file-structure
const createPost = (image, title, slug, publishedAt, markdown) => {
    return {
        "title": title,
        "slug": slug,
        "feature_image": image,
        "mobiledoc": JSON.stringify({
            version: '0.3.1',
            markups: [],
            atoms: [],
            cards: [['markdown', {cardName: 'markdown', markdown }]],
            sections: [[10, 0]]
        }),
        "status": "published",
        // These dates end up somewhat of an approximation, because
        // I would have to extract them from the .md files' metadata
        // which is more work and of little use in my case
        "published_at":  publishedAt,
        "created_at":  publishedAt,
        "updated_at":  publishedAt,
    }
}

// Extracts post data from the Markdown files used in Hugo
//
// The original Hugo files look somewhat like this:
//
// <example lang="hugo">
//   +++
//   title = "Hello world"
//   slug = "hello-world-url"
//   date = "2019-04-16"
//   +++
//   Post content is here...
// </example>
const createPostDataFromFileContent = (filename, fileContent) => {
    const contentRegexp = /^\-\-\-((.|\n)+)\-\-\-((.|\n)+)$/m
    const titleRegexp = /title: "(.+)"/
    const dateRegexp = /date: (.+)/

    const contentMatches = fileContent.match(contentRegexp)

    const header = contentMatches[1]
    const titleMatches = header.match(titleRegexp)
    const dateMatches = header.match(dateRegexp)

    const title = titleMatches[1]
    const date = (new Date(dateMatches[1])).getTime()
    const markdown = contentMatches[3].trim()
    // In my case, the filenames are the same as the slug
    const slug = basename(filename.substring(0, filename.length - ('.md'.length)))
    const image = slug

    return createPost(
        image,
        title,
        slug,
        date,
        markdown
    )
}

const postsData = listPosts()
    .map(filename => ({ filename, fileContent: readFileSync(filename).toString() }))
    .map(({ filename, fileContent }) => createPostDataFromFileContent(filename, fileContent))

// Prints the posts in JSON format for Ghost, which can be used to debug
// or create a .json file to import into Ghost, like so:
//
// <example lang="shell">
//   node hugo-to-ghost.js > ghost.json
// </example>
console.log(JSON.stringify(
        {
        "meta": {
            "exported_on":1408552443891,
            "version":"3.1.0",
        },
        "data": {
            "posts": postsData,
        },
    }
))
