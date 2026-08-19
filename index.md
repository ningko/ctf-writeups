---
layout: home
---

<!-- testing to see if the configuration works ! -->

This is where I post my CTF writeups.

Writeups are divided by challenge type (network, cryptography, programming, etc) and not by website, though I will be including it in each post, and I will make my best not to include flags, credentials or any other "sensitive" information.

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

