import {Link} from '@shopify/hydrogen';

export default function Collection1({mostPopularProducts, columns}) {
  let columnsClasses = 'col-sm-12 col-md-4';

  const setColumns = (function () {
    switch (columns) {
      case 1:
        columnsClasses = 'col-sm-12';
        break;

      case 2:
        columnsClasses = 'col-sm-12 col-md-6';
        break;

      case 3:
        columnsClasses = 'col-sm-12 col-md-4';
        break;

      case 4:
        columnsClasses = 'col-sm-12 col-md-3';
        break;

      case 6:
        columnsClasses = 'col-sm-12 col-md-2';
        break;

      default:
        break;
    }
  })();

  return (
    <div className="collection collection1">
      <div className="container">
        <div className="row">
          {mostPopularProducts.map((product) => {
            let itemColors = [];
            console.log(`item=================== ${product.title}`);
            product.variants.edges.map((edge) => {
              let variantColor = '';
              variantColor = edge.node.title.replace(/\s/g, '');
              variantColor = variantColor.match(/[^/]*/gi)[2];
              itemColors.push(variantColor);
            });
            itemColors = [...new Set(itemColors)];
            console.log('itemcolorafterSET: ', itemColors);
            return (
              <div key={product.id} className={columnsClasses}>
                <div className="collection1__collection-item">
                  <Link
                    to={`/products/${product.handle}`}
                    className="collection1__product-img collection1__product-img--rectangle"
                  >
                    <div className="collection1__product-img collection1__product-img--rectangle">
                      <div className="collection1__heart">
                        <i className="far fa-heart"></i>
                      </div>
                      <img
                        src={product.featuredImage.url}
                        alt={product.title}
                      />
                    </div>
                  </Link>
                  <div className="collection1__product-info">
                    <div className="collection1__product-details">
                      <span className="collection1__product-title">
                        {product.title}
                      </span>
                      <span className="collection1__product-price">
                        {`$ ${Math.floor(
                          product.priceRange.minVariantPrice.amount,
                        )}`}
                      </span>
                    </div>
                    <div className="collection1__colors">
                      {itemColors.map((color) => {
                        return (
                          <div
                            className={`collection1__color collection1__color--${color}`}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
