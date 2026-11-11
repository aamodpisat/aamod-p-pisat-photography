'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { StoryPost } from '@/lib/types';
import { ImagePresets } from '@/lib/image-utils';
import { safeTextContent } from '@/lib/richtext-renderer';
import { InquiryBand, PageHero, SectionHeader } from '@/components/editorial';

type StoryCategory = { uid: string; name: string };

// The Sushmita story thumbnail is landscape. Use its published portrait
// from the same story gallery for the portrait listing.
const SUSHMITA_STORY_UID = 'blt893a452ec6a42859';
const SUSHMITA_PORTRAIT_UID = 'bltafbf7258cac0247c';

function cardImage(story: StoryPost): string | undefined {
  if (story.uid === SUSHMITA_STORY_UID) {
    return story.gallery_images?.find(image => image.uid === SUSHMITA_PORTRAIT_UID)?.url || story.thumbnail_image?.url || story.featured_image?.url;
  }
  return story.thumbnail_image?.url || story.featured_image?.url;
}

function categoryLabel(category: StoryCategory): string {
  if (category.uid === 'prewedding') return 'Pre-wedding';
  return category.name.charAt(0).toUpperCase() + category.name.slice(1);
}

export default function StoriesClient({ stories, categories }: { stories: StoryPost[]; categories: StoryCategory[] }) {
  const [category, setCategory] = useState('all');
  const shown = category === 'all'
    ? stories
    : stories.filter(story => story.taxonomies?.some(item => item.term_uid === category || item.name?.toLowerCase().includes(category.toLowerCase())));
  const featured = stories[0];

  return <>
    <PageHero
      eyebrow="Real celebrations"
      title="The stories behind the photographs"
      description="Weddings, pre-weddings, and meaningful family ceremonies, told through honest images."
      image={featured?.featured_image?.url}
      tag={featured?.title}
      ctaText="Browse stories"
      ctaHref="#stories"
    />
    <section id="stories" className="section stories-page">
      <div className="inner">
        <SectionHeader
          eyebrow="The stories"
          title="Every celebration has its own rhythm"
          description="People, places, and moments worth returning to. Find the story that speaks to you."
        />
        <div className="stories-filterbar" role="group" aria-label="Filter stories">
          <button type="button" className={category === 'all' ? 'active' : ''} aria-pressed={category === 'all'} onClick={() => setCategory('all')}>All stories</button>
          {categories.filter(item => item.uid !== 'all').map(item => <button
            type="button"
            key={item.uid}
            className={category === item.uid ? 'active' : ''}
            aria-pressed={category === item.uid}
            onClick={() => setCategory(item.uid)}
          >{categoryLabel(item)}</button>)}
        </div>
        <div className={`stories-gallery-grid ${shown.length === 1 ? 'is-single' : ''}`}>
          {shown.map(story => {
            const image = cardImage(story);
            const href = `/stories${story.url.startsWith('/') ? story.url : `/${story.url}`}`;
            const term = story.taxonomies?.[0];
            const label = term ? categoryLabel({ uid: term.term_uid, name: term.name || term.term_uid }) : 'Story';
            return <Link className="stories-gallery-card" key={story.uid} href={href}>
              <div className="stories-gallery-image">
                {image && <Image src={ImagePresets.portrait(image)} alt={story.title} fill sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw" />}
              </div>
              <div className="stories-gallery-body">
                <p className="stories-gallery-category">{label}</p>
                <h2>{story.title}</h2>
                <p className="stories-gallery-excerpt">{story.excerpt ? safeTextContent(story.excerpt) : ''}</p>
                <span className="stories-gallery-link">Read the story ↗</span>
              </div>
            </Link>;
          })}
        </div>
        {shown.length === 0 && <p className="copy stories-empty">No stories in this category yet.</p>}
      </div>
    </section>
    <InquiryBand />
  </>;
}
