
Semantic HTML Explained
Semantic HTML refers to using HTML elements that carry meaning about the structure and content of a webpage, rather than just focusing on how it looks. These elements clearly describe their purpose to both browsers and developers.

Why Use Semantic HTML?
Accessibility - Screen readers can better navigate content
SEO - Search engines understand your content structure better
Maintainability - Code is more readable and easier to maintain
Future-proofing - Works better with new technologies

1. Structural / Semantic Layout Tags

These help screen readers understand page structure.

Tag	Purpose
<header>	Intro/header area of page or section
<nav>	Navigation links
<main>	Main content of page
<section>	Thematic grouping of content
<article>	Independent/self-contained content
<aside>	Sidebar or related content
<footer>	Footer information

Golden Rule
The biggest accessibility improvement usually comes from:

If something is:
visually obvious
but missing from accessibility tree
then many disabled users effectively cannot use it.
That is why accessibility is fundamentally about

Using the correct native HTML element instead of a custom <div> implementation.
Use <button> instead of clickable <div>
Use <nav> instead of generic container
Use <label> instead of placeholder-only forms
Use <details> instead of custom accordion when possible