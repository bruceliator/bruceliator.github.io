---
layout: default
title: BO "Lastivka"
navigation_text: Зробити внесок
navigation_link: contacts
---
<div class="container">
  {% for color in site.data.palette %}
    <h2>{{color.name}}</h2>
    <ul class="image-gallery">
      {% for image in site.static_files %}
        {% capture path %}images/big/{{ color.id }}/{% endcapture %}
        {% if image.path contains path %}
          <li>
            <a href="{{ site.baseurl }}{{ image.path }}">
              <img loading="lazy" src="{{ site.baseurl }}{{ image.path | replace: 'big', 'small'}}" alt="{{ color.id }}_{{ image.basename }}"/>
            </a>
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  {% endfor %}
</div>
