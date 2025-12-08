// app/rss/route.ts
import { getAllPosts } from '@/lib/ghost';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const posts = await getAllPosts();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blogs-puce-nine.vercel.app';

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>DeepLearnHQ - AI &amp; Prompt Engineering Blog</title>
    <description>Learn practical AI, prompt engineering, and ChatGPT workflows for real business applications.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>DeepLearnHQ</title>
      <link>${baseUrl}</link>
    </image>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt || post.meta_description || '')}</description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${post.published_at ? new Date(post.published_at).toUTCString() : new Date().toUTCString()}</pubDate>
      ${post.feature_image ? `<enclosure url="${post.feature_image}" type="image/jpeg"/>` : ''}
      <content:encoded><![CDATA[${post.html || ''}]]></content:encoded>
    </item>
    `).join('')}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}

