import { writable, type Writable } from 'svelte/store';
const blog = {
  date: '1 Nov 2021',
  heading: 'What is LTL shipping?',
  image: '/images/blog/ltl-shipping.jpg',
  subheading:
    "LTL freight is a cost-effective way to ship pallets. LTL refers to “less than truckload” freight, which means that you'll be shipping pallets in a trailer with other items.",
  content: 'Read More'
};
export let blog_article_provider: Writable<any> = writable(blog);

export function onReadBlog(blog: any) {
  blog_article_provider = writable(blog);
}
