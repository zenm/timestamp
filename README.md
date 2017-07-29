The timestamp project
===

## Who are you?
You're a **developer** who stumbled upon my work. You're a **potential employer** who wants to see my web development chops. You're a **member of the freeCodeCamp** community who wants to give me feedback on my work.

Welcome!

## Who am I?
I'm Lino. I've worked in Project Management, and software Product Management. I'm breaking into software development. I know how to plan the work of teams to build valuable things. I want to build those things for myself, as well.

## What is this project?
You're viewing a unix-timestamp API project as part of the [freeCodeCamp curriculum](https://www.freecodecamp.com/challenges/timestamp-microservice). This is the first of ten backend web development projects.

## What will it do?
Enter a date in the URL and you'll get the [**unix time**](https://en.wikipedia.org/wiki/Unix_time) and date in `yyyy-mm-dd` format.

In the URL, if you enter a human readable date
`/January 1,2017` or `1 1 2017` or `1,1,2017` you'll see

>```
1%201%202017
{ unix: 1483228800, date: 2017-1-1 };
```

In the URL, if you enter a UNIX date
`/1234567890` you'll see
>```
1234567890
{ unix: 1234567890, date: 2009-02-13 };
```

## Why did you make the date the way you did?
I wanted to represent the date to appeal to the [widest audience possible](https://www.theguardian.com/news/datablog/2013/dec/16/why-do-americans-write-the-month-before-the-day) of users.

## What did I learn from this project?
* Routing - how your app responds to the browser's request.
* node.js
* I learned how to search for answers among nodejs's [documentation](https://nodejs.org/en/).
