---
layout: default
title: Bолонтерське об'єднання <br> "Lastivka"
navigation_text: Про нас
navigation_link: contacts
---
<div class="container">
  <h2 class="project-tagline">{{ page.description | default: site.description | default: site.github.project_tagline }}</h2>
  {%- for color in site.data.palette -%}
  {%- assign index = forloop.index -%}
    <h2>{{color.name}}</h2>
    <ul class="image-gallery">
      {%- for image in site.static_files -%}
        {%- capture path %}images/nets/big/{{ color.id }}/{% endcapture -%}
        {%- if image.path contains path -%}
          <li>
            <a href="{{ site.baseurl }}{{ image.path }}">
              {%- assign imgIndex = image.basename | plus: 0 -%}
              {%- if site.count_of_not_lazy_loaded_img >= imgIndex -%}
                <img src="{{ site.baseurl }}{{ image.path | replace: 'big', 'small'}}" alt="{{ color.id }}_{{ image.basename }}"/>
              {%- else -%}
                <img loading="lazy" src="{{ site.baseurl }}{{ image.path | replace: 'big', 'small'}}" alt="{{ color.id }}_{{ image.basename }}"/>
              {%- endif -%}
            </a>
          </li>
        {%- endif -%}
      {%- endfor -%}
    </ul>
  {%- endfor -%}
</div>
