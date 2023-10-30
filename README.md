__GitHub Repo:__ https://github.com/kevinwheeler/notes-app  
__*Live site__ https://notes-app.kevinwheeler.net  
*You will have to login. I didn’t want users to be able to pollute my homepage with potentially malicious notes. You will need a Google account to login through Google.

To run locally:  
`cp .env.example .env`  

Edit .env and fill in the following OAUTH credentials. ChatGPT can walk you through generating them. If you are with the company who I am in the job application process with, I included my own credentials that you can use. They are included in the attachment I included with my project submission.  

OAUTH_GOOGLE_ID=  
OAUTH_GOOGLE_SECRET=  

Have Docker installed and run `docker compose up` in the project root directory.

# Tech:
Docker, AWS Elastic Container Service, AWS RDS PostgreSQL database, NestJS, Next.js (Server-Side Rendering), React, TypeScript, Tailwind, Prettier + ESLint + Prettier, GraphQL, TypeORM, Setup with Jest and Cypress for testing and “.github/workflows/ci.yml” for continuous integration, but I didn’t get around to implementing tests and CI.

Honestly the reason I chose this stack is I wanted to gain experience with it. I hadn’t used NestJS, Next.js, GraphQL, AWS ECS, and other minor technologies (like TypeORM, etc) before, and obviously not this starter-kit before either. I guess this can be looked at as a bad thing or a good thing. It does show experience that I lacked, but it also shows that I can pick up lots of new technologies and a new codebase quickly, and I can then deliver a simple app in three weeks with decent infrastructure features and an aesthetic UI while also taking time to learn along the way.

# Architecture

__Client-Side__
My basic client-side architecture was to have pages/notes.tsx be my Notes page/view component. It has three main subcomponents: a NoteCreator, a NotesSelector, and a NotesGrid.

The NotesGrid has NoteCard components which then in turn each have a NoteFormModal component to edit the notes. The NoteFormModal is also used/re-used by the NoteCreator component. The NoteFormModal calls out to a Redux action/thunk to do any data manipulations. Thus, our data layer logic is separate from our presentation layer and is encapsulated in our notes-slice.tsx file. Having our NoteFormModal use Redux to update a note was the way I chose to avoid prop drilling the notes data from back upwards from NoteModal → NoteCard → NoteGrid → Note.tsx to propagate the change when a note is updated. (You can look at this as prop drilling by passing a callback downwards too). Our NoteGrid takes in its notes data as a prop, however, thus potentially enabling future re-use of this component and also keeping it decoupled from what data it needs to display. This is in contrast to having the NoteGrid pull data from Redux itself, which would not be good design and would make the NoteGrid un-reusable and coupled to the specific data that it is supposed to present.

The top level note.tsx / note page is responsible for wiring up the NoteGrid. It grabs data from the Redux store (initially using server-side rendering, and later on the client-side for updates) and passes it as a prop to the NoteGrid. The top level note.tsx / note page also contains a NoteSelector component which itself contains a SearchBar which will update the Redux store to add a search query. I wanted to keep the data logic encapsulated in notes-slice.tsx, so my SearchBar only job is to update Redux to set the search query.

__Server-Side__
My server-side architecture was mostly fairly straightforward. In addition to using Next.js for SSR, I used NestJS conventions of controllers, entities, modules, resolvers (since I was using GraphQL), and services. The starter-kit I based my project on used Apollo and automatically generated my schema.gql file based on my entities and resolvers. Graphql-zeus allowed me to make TypeScript type safe queries to my graphql service. I stuck to best practices to keep my routes/controllers, services, and data layer decoupled.

# Misc:

My notes page was built with accessibility in mind, and I tested it using VoiceOver on MacOS. The notes page can be easily operated using a screen reader by someone who is vision impaired.

I made “tags” an attribute of the note entity for simplicity. For a production grade application, I would have made tags a separate entity to keep data normalized. I haven’t implemented the tags feature on the client-side yet.

I used a hero element from Code Stitch. I could have rewritten it from scratch to use tailwind, BEM, or Web Components, but I didn't spend the time to do it, so the css styles are what they are. I did, however, tweak their styles to make sure the content stays centered and the hero background takes up a full screen.

This TypeORM bug cost me a ton of development time, unfortunately, until I realized TypeORM itself was the problem. https://github.com/typeorm/typeorm/issues/9761 TypeORM didn’t like the certificate that my AWS RDS database was using, despite me registering the certificate authority / certificate chain with TypeORM.

If I had more time, I could probably have used a headless data table library with my own UI to get all sorts of filtering and sorting behavior for free. (ie filters and sorting ability on any attribute of a note, like the title, or the content, for instance, and filters like contains, doesn’t contain, starts with, doesn’t start with, ends with, doesn’t end with, etc etc. You could then use AND queries or OR queries to combine filters from different attributes.

^ I actually made an open source contribution (found here: https://github.com/kevinwheeler/primevue-datatables) to the Savannabits/primevue-datatables library that does server-side pagination, filtering, and sorting in Laravel for the PrimeVue DataTable library (which I have of course also used), so I am familiar with using data table libraries.

# Original starter-kit documentation below:
## NestJS Starter
[![CI](https://github.com/thisismydesign/nestjs-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/thisismydesign/nestjs-starter/actions/workflows/ci.yml)

#### NestJS MVC boilerplate for rapid development with battle-tested standards.

[Use this template](https://github.com/thisismydesign/nestjs-starter/generate)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Stack

It has
- Example REST and GraphQL modules, DB using TypeORM as seen on https://docs.nestjs.com/
- [Next.js](https://nextjs.org/) integration for React on the frontend ([howto article](https://csaba-apagyi.medium.com/nestjs-react-next-js-in-one-mvc-repo-for-rapid-prototyping-faed42a194ca))
- Typed queries & results with GraphQL out of the box ([howto article](https://csaba-apagyi.medium.com/automagically-typed-graphql-queries-and-results-with-apollo-3731bad989aa))
- Authentication via [Passport.js](http://www.passportjs.org/) including Social providers ([howto article](https://medium.com/csaba.apagyi/oauth2-in-nestjs-for-social-login-google-facebook-twitter-etc-8b405d570fd2)), [AWS Cognito](https://aws.amazon.com/cognito/) ([howto article](https://medium.com/csaba.apagyi/cognito-via-oauth2-in-nestjs-outsourcing-authentication-without-vendor-lock-in-ce908518f547)), and JWT strategy for REST and GraphQL
- Docker setup
- Typescript, ESLint
- CI via GitHub Actions
- Running tasks (e.g. DB seeding) via [nestjs-console](https://github.com/Pop-Code/nestjs-console)
- Unit and integration testing via Jest
- Heroku deployment setup
- Google Analytics 4

## Usage

The deployments below are probably in sleep mode and will take a minute to come online when you open them.

### Production

https://nestjs-starter-production.herokuapp.com/

### Staging

https://nestjs-starter-staging.herokuapp.com/

### Dev

```sh
cp .env.example .env
docker-compose up
docker-compose exec web yarn lint
docker-compose exec web yarn test
docker-compose exec web yarn test:request
docker-compose exec web yarn build
docker run -it -v $PWD:/e2e -w /e2e --entrypoint=cypress cypress/included:10.0.3 run --config-file cypress.docker.config.ts
```

## Functionality

REST endpoint via Nest
- http://localhost:3000/

JWT-protected REST endpoint via Nest
- http://localhost:3000/private

GraphQL playground (`query WhoAmI` is JWT-protected)
- http://localhost:3000/graphql
```qgl
query Public {
  things {
    id
    name
  }

  users {
    id
    provider
  }
}

# Add Header: { "Authorization": "Bearer <token>" }
query Private {
  whoAmI {
    id,
    provider,
    providerId,
    username,
    name
  }

  notes {
    id

    alias
    thing {
      name
    }
  }
}

mutation createOrder {
  createOrder(alias: "myname", thingName: "this is a thing you can order") {
    id
    alias
  }
}
```

Cognito auth (redirects to hosted Cognito UI)
- http://localhost:3000/auth/cognito

Google auth
- http://localhost:3000/auth/google

Next.js page
- http://localhost:3000/home

JWT-protected Next.js page
- http://localhost:3000/profile

### Useful commands

Nest CLI:
```
docker-compose exec web yarn nest -- --help
```

TypeORM CLI:
```
docker-compose exec web yarn typeorm -- --help
```

## Resources

- https://github.com/jmcdo29/testing-nestjs
