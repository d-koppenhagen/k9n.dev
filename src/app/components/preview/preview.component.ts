import { Component, OnChanges, OnInit, input } from '@angular/core';
import { PostAttributes } from '../../types';
import { ContentFile } from '@analogjs/content';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'dk-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  imports: [RouterLink, CardComponent],
})
export class PreviewComponent implements OnInit, OnChanges {
  readonly content = input.required<string>();
  readonly posts = input.required<ContentFile<PostAttributes>[]>();
  readonly keyword = input<string>('');
  readonly search = input<string>('');
  readonly max = input<number>();

  postsFiltered: ContentFile<PostAttributes>[] = [];
  reducedPostList: ContentFile<PostAttributes>[] = [];

  updatePosts() {
    this.postsFiltered = (this.posts() || [])
      .filter((post) => {
        const content = this.content();
        return content ? post.filename.includes(`/${content}/`) : true;
      })
      .filter((post) => post.attributes.published !== false)
      .filter((post) => {
        const keyword = this.keyword();
        return keyword ? !!post.attributes.keywords?.includes(keyword) : true;
      })
      .filter((post) => {
        const searchTerm = this.search().toLowerCase();
        return searchTerm
          ? post.attributes.keywords?.includes(this.search()) ||
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
    this.reducedPostList = this.postsFiltered.slice(0, this.max());
  }

  ngOnInit() {
    this.updatePosts();
  }

  ngOnChanges() {
    this.updatePosts();
  }
}
