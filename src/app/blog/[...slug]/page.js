import Blogdetails from "./Blogdetailpage";
import Custom404 from "@/app/404/page";

// Function to fetch the slugs that you want to generate static pages for
export async function generateStaticParams() {
  const response = await fetch('https://www.admin777.pny-trainings.com/api/featuredposts', {
    cache: 'no-store'
  });
  const posts = await response.json();

  return posts.featured_posts.map(post => ({
    slug: [post.category_slug, post.url_slug] // Adjust the property according to your API response
  }));
}

// Fetching metadata for each blog post
export default async function Blogdetailsnew({ params }) {
  const [categorySlug, urlSlug] = params.slug;

  const response = await fetch(`https://www.admin777.pny-trainings.com/api/featuredposts/${urlSlug}`, { cache: 'no-store' });

  if (response.status !== 200) {
    // If the response status is not 200, render the 404 page
    return (
      <Custom404 />
    );
  }

  const data = await response.json();

  if (!data.post_detail) {
    // If post_detail is null, render the NoData component
    return (
      <Custom404 />
    );
  }

  const metadata = {
    metatitle: data.post_detail.meta_title,
    metadescription: data.post_detail.meta_description,
    canonicalUrl: `https://www.pnytrainings.com/blog/${data.post_detail?.category_slug}/${data.post_detail?.url_slug}`
  };

  return (
    <>
      <title>{metadata.metatitle}</title>
      <meta name="description" content={metadata.metadescription} />
      {metadata.canonicalUrl && (
        <link rel="canonical" href={metadata.canonicalUrl} />
      )}
      <Blogdetails params={urlSlug} />
    </>
  );
}
