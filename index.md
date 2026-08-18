---
layout: home
---

<!-- testing to see if the configuration works ! -->

This is where I post my CTF writeups.

## Filter by category

<div id="category-filters">
<a href="#" data-category="all">all</a>

{% for category in site.data.categories %}
    / <a href="#" data-category="{{ category[0] }}">{{ category[1] }}</a>
{% endfor %}
</div>

## Writeups

<div id="post-list">
{% for post in site.posts %}
<article class="post-item" data-categories="{{ post.categories | join: ' ' }}">
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small>{{ post.date | date: "%Y-%m-%d" }}</small>
</article>
{% endfor %}
</div>

<script src="{{ '/assets/js/filter.js' | relative_url }}"></script>

