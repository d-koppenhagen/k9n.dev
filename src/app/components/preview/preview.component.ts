import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PostAttributes } from '../../types';
import { ContentFile } from '@analogjs/content';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'dk-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  imports: [RouterLink, CardComponent],
  standalone: true,
})
export class PreviewComponent implements OnInit, OnChanges {
  @Input({ required: true }) content!: string;
  @Input() max!: number;
  @Input() keyword: string = '';
  @Input() search: string = '';
  @Input({ required: true }) posts: ContentFile<PostAttributes>[] = [];

  postsFiltered: ContentFile<PostAttributes>[] = [];
  reducedPostList: ContentFile<PostAttributes>[] = [];

  updatePosts() {
    this.postsFiltered = this.posts
      .filter((post) =>
        this.content ? post.filename.includes(`/${this.content}/`) : true,
      )
      .filter((post) => post.attributes.published !== false)
      .filter((post) =>
        this.keyword
          ? !!post.attributes.keywords?.includes(this.keyword)
          : true,
      )
      .filter((post) => {
        const searchTerm = this.search.toLowerCase();
        return searchTerm
          ? post.attributes.keywords?.includes(this.search) ||
              post.attributes.title.toLowerCase().includes(searchTerm) ||
              post.attributes.description.toLowerCase().includes(searchTerm) ||
              post.attributes.author.name.toLowerCase().includes(searchTerm) ||
              post.attributes.author.mail.toLowerCase().includes(searchTerm)
          : true;
      })
      .sort((a, b) => {
        const aCreated = +new Date(a.attributes.created);
        const bCreated = +new Date(b.attributes.created);
        return aCreated - bCreated;
      })
      .reverse();
    this.reducedPostList = this.postsFiltered.slice(0, this.max);
  }

  ngOnInit() {
    this.updatePosts();
  }

  ngOnChanges() {
    this.updatePosts();
  }
}
