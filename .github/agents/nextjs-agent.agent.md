---
name: nextjs-agent
description: This agent writes and updates codes based on users prompt, mainly focused on Next.js code.
argument-hint: create dummy data based on typescript type definition.
tools: [read, search, web] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

Write, update or fix code in specified file.

Focus on:

- Exactly what the user prompted to be done

Report any findings or better implementations for user.
