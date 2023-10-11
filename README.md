# ts-vacationRenterLinks
Typescript Repo that parses a URL to test for valid nested URLs

Install dependencies with `npm install`

Compile with `npm run build`

You can debug this w/VSCode with the default launch configuration, or run

`node dist/index.js ${linkParam}`

e.g.: 

`node dist/index.js http://www.vacationrenter.com`

The result should look something like this: 

```
starting...
evaluating URL http://www.vacationrenter.com/
Searching through 122 links:
Result: found 1 broken links:
brokenLink: https://twitter.com/vacationrenter_
```
