import {
  useShopQuery,
  flattenConnection,
  ProductProviderFragment,
  Image,
  // Link,
  Seo,
  CacheDays,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../../components/layouts/Layout.server';
import Hero2 from '../../components/Hero/Hero2/Hero2';
import Collection1 from '../../components/Collections/Collection1/Collection1';
// import FeaturedCollection from '../components/FeaturedCollection';
// import ProductCard from '../components/ProductCard';
// import Welcome from '../components/Welcome.server';
import {Suspense} from 'react';

export default function Index({country = {isoCode: 'US'}}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const hero2Collections = collections.filter(
    (collection) => collection.handle == 'men' || collection.handle == 'women',
  );

  const mostPopularProducts = data ? flattenConnection(data.products) : [];
  console.log(mostPopularProducts);
  return (
    <Layout>
      <Hero2 collectionsData={hero2Collections} />
      <h2>Most Popular Products</h2>
      <Collection1 mostPopularProducts={mostPopularProducts} columns={2} />
      <Suspense fallback={null}>
        <SeoForHomepage />
      </Suspense>
      {/* <div className="relative mb-12">
        <Welcome />
        <Suspense fallback={<BoxFallback />}>
          <FeaturedProductsBox country={country} />
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
          <FeaturedCollectionBox country={country} />
        </Suspense>
      </div> */}
    </Layout>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {
        name: shopName,
        primaryDomain: {url: shopUrl},
      },
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title: shopName,
        url: shopUrl,
      }}
    />
  );
}

// function BoxFallback() {
//   return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
// }

// function FeaturedProductsBox({country}) {
//   const {data} = useShopQuery({
//     query: QUERY,
//     variables: {
//       country: country.isoCode,
//     },
//     preload: true,
//   });

//   const collections = data ? flattenConnection(data.collections) : [];
//   // const hero2Collections = collections.filter(
//   //   (collection) => collection.handle == 'men' || collection.handle == 'women',
//   // );
//   const featuredProductsCollection = collections[1];
//   const featuredProducts = featuredProductsCollection
//     ? flattenConnection(featuredProductsCollection.products)
//     : null;

//   // console.log('feattured products collection: ', collections);
//   // console.log('hero2  : ', hero2Collections);

//   return (
//     <div className="bg-white p-12 shadow-xl rounded-xl mb-10">
//       {featuredProductsCollection ? (
//         <>
//           <div className="flex justify-between items-center mb-8 text-md font-medium">
//             <span className="text-black uppercase">
//               {featuredProductsCollection.title}
//             </span>
//             <span className="hidden md:inline-flex">
//               <Link
//                 to={`/collections/${featuredProductsCollection.handle}`}
//                 className="text-blue-600 hover:underline"
//               >
//                 Shop all
//               </Link>
//             </span>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
//             {featuredProducts.map((product) => (
//               <div key={product.id}>
//                 <ProductCard product={product} />
//               </div>
//             ))}
//           </div>
//           <div className="md:hidden text-center">
//             <Link
//               to={`/collections/${featuredProductsCollection.handle}`}
//               className="text-blue-600"
//             >
//               Shop all
//             </Link>
//           </div>
//         </>
//       ) : null}
//     </div>
//   );
// }

// function FeaturedCollectionBox({country}) {
//   const {data} = useShopQuery({
//     query: QUERY,
//     variables: {
//       country: country.isoCode,
//     },
//     preload: true,
//   });

//   // console.log('data returned from shopquery: ', data);

//   const collections = data ? flattenConnection(data.collections) : [];
//   // console.log('cllections: ', collections);
//   const featuredCollection =
//     collections && collections.length > 1 ? collections[1] : collections[0];

//   return <FeaturedCollection collection={featuredCollection} />;
// }

// function GradientBackground() {
//   return (
//     <div className="fixed top-0 w-full h-3/5 overflow-hidden">
//       <div className="absolute w-full h-full bg-gradient-to-t from-gray-50 z-10" />

//       <svg
//         viewBox="0 0 960 743"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         xmlnsXlink="http://www.w3.org/1999/xlink"
//         className="filter blur-[30px]"
//         aria-hidden="true"
//       >
//         <defs>
//           <path fill="#fff" d="M0 0h960v540H0z" id="reuse-0" />
//         </defs>
//         <g clipPath="url(#a)">
//           <use xlinkHref="#reuse-0" />
//           <path d="M960 0H0v743h960V0Z" fill="#7CFBEE" />
//           <path
//             d="M831 380c200.48 0 363-162.521 363-363s-162.52-363-363-363c-200.479 0-363 162.521-363 363s162.521 363 363 363Z"
//             fill="#4F98D0"
//           />
//           <path
//             d="M579 759c200.479 0 363-162.521 363-363S779.479 33 579 33 216 195.521 216 396s162.521 363 363 363Z"
//             fill="#7CFBEE"
//           />
//           <path
//             d="M178 691c200.479 0 363-162.521 363-363S378.479-35 178-35c-200.4794 0-363 162.521-363 363s162.5206 363 363 363Z"
//             fill="#4F98D0"
//           />
//           <path
//             d="M490 414c200.479 0 363-162.521 363-363S690.479-312 490-312 127-149.479 127 51s162.521 363 363 363Z"
//             fill="#4F98D0"
//           />
//           <path
//             d="M354 569c200.479 0 363-162.521 363-363 0-200.47937-162.521-363-363-363S-9 5.52063-9 206c0 200.479 162.521 363 363 363Z"
//             fill="#7CFBEE"
//           />
//           <path
//             d="M630 532c200.479 0 363-162.521 363-363 0-200.4794-162.521-363-363-363S267-31.4794 267 169c0 200.479 162.521 363 363 363Z"
//             fill="#4F98D0"
//           />
//         </g>
//         <path fill="#fff" d="M0 540h960v203H0z" />
//         <defs>
//           <clipPath id="a">
//             <use xlinkHref="#reuse-0" />
//           </clipPath>
//         </defs>
//       </svg>
//     </div>
//   );
// }

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      name
      description
      primaryDomain {
        url
      }
    }
  }
`;

const QUERY = gql`
  query indexContent(
    $country: CountryCode
    $numCollections: Int = 20
    $numProducts: Int = 3
    $includeReferenceMetafieldDetails: Boolean = false
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 250
    $numProductMedia: Int = 1
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    collections(first: $numCollections) {
      edges {
        node {
          descriptionHtml
          description
          handle
          id
          title
          image {
            ...ImageFragment
          }
          products(first: $numProducts) {
            edges {
              node {
                ...ProductProviderFragment
              }
            }
          }
        }
      }
    }

    products(first: 9, sortKey: BEST_SELLING) {
      edges {
        cursor
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
          featuredImage {
            url
          }
          variants(first: 3) {
            edges {
              cursor
              node {
                id
                title
              }
            }
          }
        }
      }
    }
  }

  ${ProductProviderFragment}
  ${Image.Fragment}
`;
