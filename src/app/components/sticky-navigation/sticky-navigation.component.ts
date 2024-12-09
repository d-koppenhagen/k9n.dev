import { NgClass } from '@angular/common';
import { AfterViewChecked, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeadingData, getHeadingList } from 'marked-gfm-heading-id';
import { A11yModule } from '@angular/cdk/a11y';
import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkTreeModule, NestedTreeControl } from '@angular/cdk/tree';

interface TreeNode {
  level: number;
  text: string;
  id: string;
  children?: TreeNode[];
}

@Component({
  selector: 'dk-sticky-navigation',
  imports: [RouterLink, NgClass, A11yModule, CdkTreeModule],
  templateUrl: './sticky-navigation.component.html',
  styleUrl: './sticky-navigation.component.scss',
})
export class StickyNavigationComponent implements AfterViewChecked {
  readonly content = input<string>();
  readonly contentLang = input<string>();

  headlines: TreeNode[] = [];
  menuOpen = false;
  treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  dataSource?: ArrayDataSource<TreeNode>;

  constructor() {}

  ngAfterViewChecked() {
    const list = getHeadingList();
    const tree = this.convertToTree(list);
    this.dataSource = new ArrayDataSource(tree);
  }

  getNavTextFromHeadline(input: string) {
    return input.replace(/<[^>]*>/g, '');
  }

  hasChild = (node: TreeNode) => !!node.children && node.children.length > 0;

  private convertToTree(headlines: HeadingData[]): TreeNode[] {
    const root: TreeNode[] = [];
    const stack: TreeNode[] = [];

    headlines.forEach((heading) => {
      const newNode: TreeNode = {
        level: heading.level,
        text: heading.text,
        id: heading.id,
      };

      while (
        stack.length > 0 &&
        stack[stack.length - 1].level >= newNode.level
      ) {
        stack.pop();
      }

      if (stack.length > 0) {
        if (!stack[stack.length - 1].children) {
          stack[stack.length - 1].children = [];
        }
        stack[stack.length - 1].children?.push(newNode);
      } else {
        root.push(newNode);
      }

      stack.push(newNode);
    });

    return root;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
