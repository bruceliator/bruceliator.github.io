---
layout: default
title: BO "Lastivka"
---
<div class="container">
  {% for color in site.data.palette %}
    <h2>{{color.name}}</h2>
    <ul class="image-gallery">
      {% for image in site.static_files %}
        {% capture path %}images/{{ color.id }}{% endcapture %}
        {% if image.path contains path %}
          <li>
            <a href="{{ site.baseurl }}{{ image.path }}">
              <img src="{{ site.baseurl }}{{ image.path }}" alt="" />
            </a>
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  {% endfor %}
</div>
