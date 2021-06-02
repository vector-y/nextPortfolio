import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { getAllPosts } from '../lib/api';
import { PostType } from '../types/post';

type IndexProps = {
  posts: PostType[];
};

export const Index = ({ posts }: IndexProps): JSX.Element => {
  const beachURL = 'https://www.csulb.edu/';
  const saseURL = 'https://www.saseconnect.org/';
  const spaceURL = 'https://labs.urspace.io/';
  return (
    <Layout>
      <h1 style={{ textAlign: 'center' }}>
        Victor is a user experience engineer based in Los Angeles. <br /> He
        enjoys Arizona Tea, finding ways to live sustainably, <br /> & building
        lego architecture sets.
      </h1>

      <dl className="list-disc pl-4 my-6" style={{ textAlign: 'center' }}>
        <dt className="mt-2">
          Studying Computer Science @{' '}
          <a
            style={{ color: '#1778F2 ', textDecoration: 'none' }}
            href={beachURL}
          >
            Long Beach State
          </a>
        </dt>
        <dt className="mt-2">
          Previously President @{' '}
          <a
            style={{ color: '#1778F2 ', textDecoration: 'none' }}
            href={saseURL}
          >
            Society of Asian Scientists and Engineers
          </a>
        </dt>
        <dt className="mt-2">
          Previously @{' '}
          <a
            style={{ color: '#1778F2 ', textDecoration: 'none' }}
            href={spaceURL}
          >
            urspace Labs
          </a>
        </dt>
      </dl>

      <p>Next.js starter for your next blog or personal site. Built with:</p>

      <a
        href="https://github.com/ChangoMan/nextjs-typescript-mdx-blog"
        className="inline-block px-7 py-3 rounded-md text-white dark:text-white bg-blue-600 hover:bg-blue-700 hover:text-white dark:hover:text-white"
      >
        Get the source code!
      </a>

      {posts.map((post) => (
        <article key={post.slug} className="mt-12">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            {format(parseISO(post.date), 'MMMM dd, yyyy')}
          </p>
          <h1 className="mb-2 text-xl">
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <a className="text-gray-900 dark:text-white dark:hover:text-blue-400">
                {post.title}
              </a>
            </Link>
          </h1>
          <p className="mb-3">{post.description}</p>
          <p>
            <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
              <a>Read More</a>
            </Link>
          </p>
        </article>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['date', 'description', 'slug', 'title']);

  return {
    props: { posts },
  };
};

export default Index;
